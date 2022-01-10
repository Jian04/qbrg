//=============================================================================
// TMVplugin - 抬起（跳跃动作扩展
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 0.2b
// 最終更新日: 2015/11/13
//=============================================================================

/*:
 * @plugindesc 可以举起物体进行投掷。
 * (必须将JumpAction引入)
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param Carry Weight
 * @desc 能举起比自己力量小的物体
 * 初期値: 1（ 0 能举起任何物体）
 * @default 1
 *
 * @param Se Carry
 * @desc 举起物体时发出的声音。下面是默认调用方法 第一个参数是声音文件的名字，第二个是范围，第三个是举起的高度?，第4个没看懂
 * 初期値: {name: "Cancel1", volume: 90, pitch: 70, pan: 0}
 * @default {name: "Cancel1", volume: 90, pitch: 70, pan: 0}
 *
 * @param Se Hurl
 * @desc 投掷物品时发出的声音 同上。
 * 初期値: {name: "Evasion1", volume: 90, pitch: 70, pan: 0}
 * @default {name: "Evasion1", volume: 90, pitch: 70, pan: 0}
 *
 * @help 大致意思是MV的plugin-跳跃动作Ver0.2b以上

*需要把这个插件丢到plugin文件夹下面

*

*在活动上乘坐的状态下↓一边按↓一边用A举起，

*再次投掷A所举的活动。

*

*事件的重量+Carry Weight值比玩家重时

*不能举起。

*

*已提交的事件将暂停所有操作。

*另外，和墙壁和其他活动接触的时候不能投掷。

*

*在导入扩展插件射击的情况下，在启动时

*不能投掷。

*

*没有插件命令。

*
 */

var Imported = Imported || {};
Imported.TMJACarry = true;

var Tomoaky = Tomoaky || {};
Tomoaky.JACR = Tomoaky.JACR || {};

Tomoaky.Parameters = PluginManager.parameters('TMJACarry');
Tomoaky.Param = Tomoaky.Param || {};

Tomoaky.Param.JACRCarryWeight = Number(Tomoaky.Parameters['Carry Weight']);
Tomoaky.Param.JACRSeCarry = (new Function("return " + Tomoaky.Parameters['Se Carry']))();
Tomoaky.Param.JACRSeHurl = (new Function("return " + Tomoaky.Parameters['Se Hurl']))();

//-----------------------------------------------------------------------------
// Game_CharacterBase
//

// 初始化成员变量
Tomoaky.JACR.Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
  Tomoaky.JACR.Game_CharacterBase_initMembers.call(this);
  this._carried = false;
  this._carryingObject = null;
};

//被抬起
Game_CharacterBase.prototype.carry = function() {
  this._carried = true;
  this._through = true;
};

// 被投掷
Game_CharacterBase.prototype.hurl = function() {
  this._carried = false;
  this._through = false;
  this._lastSwim = this.isSwimming();
};

// 移动到指定位置
Tomoaky.JACR.Game_CharacterBase_locate = Game_CharacterBase.prototype.locate;
Game_CharacterBase.prototype.locate = function(x, y) {
  Tomoaky.JACR.Game_CharacterBase_locate.call(this, x, y);
  this._carried = false;
  this._carryingObject = null;
};

//-----------------------------------------------------------------------------
// Game_Player
//

// 初始化成员变量
Tomoaky.JACR.Game_Player_initMembers = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function() {
  Tomoaky.JACR.Game_Player_initMembers.call(this);
  this._carryingObject = null;
};

// 提升状态
Game_Player.prototype.isCarrying = function() {
  return this._carryingObject !== null;
};

// 输入的处理
Tomoaky.JACR.Game_Player_updateInput = Game_Player.prototype.updateInput;
Game_Player.prototype.updateInput = function() {
  this.carryByInput();
  if (Imported.TMJAShooting && this.isCarrying()) {
    this._shotDelay = 1;
  }
  Tomoaky.JACR.Game_Player_updateInput.call(this);
};

// 举起物体（投掷）
Game_Player.prototype.carryByInput = function() {
  if (this.isCarrying()) {
    if (Input.isTriggered('attack')) {
      var target = this._carryingObject;
      var lastRealX = target._realX;
      target.collideMapLeft();
      if (lastRealX != target._realX) {
        target._realX = lastRealX;
        return;
      }
      target.collideMapRight();
      if (lastRealX != target._realX) {
        target._realX = lastRealX;
        return;
      }
      var lastRealY = target._realY;
      target.collideMapUp();
      if (lastRealY != target._realY) {
        target._realY = lastRealY;
        return;
      }
      target.collideMapDown();
      if (lastRealY != target._realY) {
        target._realY = lastRealY;
        return;
      }
      var targets = target.collideTargets();
      for (var i = 0; i < targets.length; i++) {
        var character = targets[i];
        if (!character._through && target.isCollide(character)) {
          return;
        }
      }
      this.executeHurl();
    }
  } else {
    if (Input.isTriggered('attack') && Input.isPressed('down') &&
        this.isLanding() &&
        Object.prototype.toString.call(this._landingObject) !== '[object Array]') {
      if (this._weight >= this._landingObject._weight + Tomoaky.Param.JACRCarryWeight) {
        this.executeCarry();
      } else {
        if (Imported.TMJAShooting) {
          this._shotDelay = 1;
        }
      }
    }
  }
};

// 抬起
Game_Player.prototype.executeCarry = function() {
  this._carryingObject = $gameMap.event(this._landingObject.eventId());
  this._carryingObject.carry();
  this._landingObject = null;
  AudioManager.playSe(Tomoaky.Param.JACRSeCarry);
};

// 投掷
Game_Player.prototype.executeHurl = function() {
  this._carryingObject.hurl();
  if (this._direction == 4) {
    this._carryingObject.dash(this._direction);
  } else if (this._direction == 6) {
    this._carryingObject.dash(this._direction);
  } else if (this._direction == 8) {
    this._carryingObject._vx = 0;
    this._carryingObject._vy = -this._carryingObject._jumpSpeed;
  } else {
    this._carryingObject._vx = 0;
    this._carryingObject._vy = 0;
  }
  this._carryingObject = null;
  if (Imported.TMJAShooting) {
    this._shotDelay = 1;
  }
  AudioManager.playSe(Tomoaky.Param.JACRSeHurl);
};

//-----------------------------------------------------------------------------
// Game_Event
//

// 更新框架
Tomoaky.JACR.Game_Event_update = Game_Event.prototype.update;
Game_Event.prototype.update = function() {
  if (this._carried) {
    this._realX = $gamePlayer._realX;
    this._realY = $gamePlayer._realY - $gamePlayer._collideH - 0.001;
    this._x = Math.floor(this._realX);
    this._y = Math.floor(this._realY);
  } else {
    Tomoaky.JACR.Game_Event_update.call(this);
  }
};
