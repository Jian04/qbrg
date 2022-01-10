//=============================================================================
// TMVplugin - 射击(跳跃动作扩展)
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 0.2b
// 最終更新日: 2015/11/13
//=============================================================================

/*:
 * @plugindesc 追加给玩家和事件发射子弹的功能。
 * (必须将JumpAction引入)
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param Player Bullets Max
 * @desc 玩家弹的最大数量。
 * 初期値: 32
 * @default 32
 *
 * @param Enemy Bullets Max
 * @desc 事件的子弹的最大数量。
 * 初期値: 256
 * @default 256
 *
 * @param Weapon Sprite
 * @desc 发射时显示武器图像。
 * 初期値: true（ false 无武器图像）
 * @default true
 *
 * @param Bullet Type1 Name
 * @desc 子弹1的图像文件名。
 * 初期値: Bullet1
 * @default Bullet1
 *
 * @param Bullet Type1 Size
 * @desc 子弹1的判定尺寸。
 * 初期値: 6（指定半径的大小）
 * @default 6
 *
 * @param Bullet Type2 Name
 * @desc 子弹2的图像文件名
 * 初期値: Bullet1
 * @default Bullet1
 *
 * @param Bullet Type2 Size
 * @desc 子弹2的判定尺寸。
 * 初期値: 6（指定半径的大小）
 * @default 6
 *
 * @param Bullet Type3 Name
 * @desc 子弹3的图像文件名
 * 初期値: Bullet1
 * @default Bullet1
 *
 * @param Bullet Type3 Size
 * @desc 子弹3的判定尺寸。
 * 初期値: 6（指定半径的大小）
 * @default 6
 *
 * @param Bullet Type4 Name
 * @desc 子弹4的图像文件名
 * 初期値: Bullet1
 * @default Bullet1
 *
 * @param Bullet Type4 Size
 * @desc 子弹4的判定尺寸。
 * 初期値: 6（指定半径的大小）
 * @default 6
 *
 * @help 大致意思是MV的plugin-跳跃动作Ver0.2b以上
 *需要把这个插件丢到plugin文件夹下面
 *
*A用钥匙发射子弹。

*

*将子弹横向排列8个的子弹作为弹像。

*图像文件名的首字母是!的情况下，将加法混合模式。

*

*设定为子弹的技能的备忘录栏<map_through>如果有标签，

*子弹会贯穿地形。

*

*反应器、装备、状态上没有弹射效果音的标签的情况下

*变成无声。

*反过来如果找到了多个标签，按照状态、装备、主角的顺序

*查找标签，采用最初发现的标签。(机翻,不过也能看出大致意思)
 *
 * 事件（人物、装备、状态）标签：
 *   <invincible_time:30>     # 被伤害后的无敌时间
 *   <shot_way:1>             # 同时发射的子弹数量
 *   <shot_space:0.2>         # 子弹之间的间隔（弧度）
 *   <shot_speed:0.07>        # 子弹的移动速度
 *   <shot_count:30>          # 子弹发射后的寿命
 *   <shot_type:1>            # 子弹类型
 *   <shot_index:0>           # 发射后子弹的图像索引
 *   <shot_skill:1>           # 子弹的技能编号
 *   <shot_delay:10>          # 发射后的硬直时间
 *   <shot_se_name:Attack2>   # 发射子弹的音效
 *   <shot_se_volume:90>      # 子弹飞行中的音效
 *   <shot_se_pitch:150>      # 子弹击中后的音效
 *
 * 插件命令:
 *  nway_shot插件命令
 *   JumpAction nway_shot eventId n space angle speed count type index skillId 
 *     根据下面属性替换上面插件的对应数值
 *
 *     eventId: 发射子弹的事件编号（-1
 *     n:       同时发射的子弹数量
 *     space:   子弹之间的间隔
 *     angle:   发射方向
 *     speed:   子弹的移动速度
 *     count:   子弹发射后的寿命
 *     type:    子弹类型
 *     index:   发射后子弹的图像索引
 *     skillId: 子弹的技能(应该是子弹的特效)
 * 
 *     根据上面属性替换下面插件的对应数值
 * 	   nway_aim插件命令
 *     JumpAction nway_aim eventId(发射子弹的事件编号) n(同时可以发射的数量) space(子弹发射间隔) angle(发射方向) speed(子弹的移动速度) count(子弹发射后的寿命) type(子弹类型) index(发射后子弹的图像索引) skillId(skillId(子弹的技能(应该是子弹的特效))
 *     与nway_shot相同，angle有玩家的方向
 *     自动加法。如果angle 0成为自机目标。
 * 	   案例
 * 	   JumpAction nway_aim 1 5 3 2 5 2 1 3 4
 *    
 * 
 *     nall_shot插件命令
 *     JumpAction nall_shot eventId(发射子弹的事件编号) n(同时可以发射的数量) angle(发射方向) speed(子弹的移动速度) count(子弹发射后的寿命) type(子弹类型) index(发射后子弹的图像索引) skillId(skillId(子弹的技能(应该是子弹的特效))
 *     向全方位发射子弹，子弹之间的间隔自动设定。
 * 
 *    nall_aim插件命令
 *    JumpAction nall_aim eventId(发射子弹的事件编号) n(同时可以发射的数量) space(子弹发射间隔) angle(发射方向) speed(子弹的移动速度) count(子弹发射后的寿命) type(子弹类型) index(发射后子弹的图像索引) skillId(skillId(子弹的技能(应该是子弹的特效))
 *    是nall_shot的自机狙击版。

 */

var Imported = Imported || {};
Imported.TMJAShooting = true;

var Tomoaky = Tomoaky || {};
Tomoaky.JAST = Tomoaky.JAST || {};

Tomoaky.Parameters = PluginManager.parameters('TMJAShooting');
Tomoaky.Param = Tomoaky.Param || {};

Tomoaky.Param.JASTPlayerBulletsMax = Number(Tomoaky.Parameters['Player Bullets Max']);
Tomoaky.Param.JASTEnemyBulletsMax = Number(Tomoaky.Parameters['Enemy Bullets Max']);
Tomoaky.Param.JASTWeaponSprite = (Tomoaky.Parameters['Weapon Sprite']) === 'true' ? true : false;
Tomoaky.Param.JASTBulletNames = [];
Tomoaky.Param.JASTBulletNames[1] = String(Tomoaky.Parameters['Bullet Type1 Name']);
Tomoaky.Param.JASTBulletNames[2] = String(Tomoaky.Parameters['Bullet Type2 Name']);
Tomoaky.Param.JASTBulletNames[3] = String(Tomoaky.Parameters['Bullet Type3 Name']);
Tomoaky.Param.JASTBulletNames[4] = String(Tomoaky.Parameters['Bullet Type4 Name']);
Tomoaky.Param.JASTBulletSizes = [];
Tomoaky.Param.JASTBulletSizes[1] = Number(Tomoaky.Parameters['Bullet Type1 Size']) / 48;
Tomoaky.Param.JASTBulletSizes[2] = Number(Tomoaky.Parameters['Bullet Type2 Size']) / 48;
Tomoaky.Param.JASTBulletSizes[3] = Number(Tomoaky.Parameters['Bullet Type3 Size']) / 48;
Tomoaky.Param.JASTBulletSizes[4] = Number(Tomoaky.Parameters['Bullet Type4 Size']) / 48;
Tomoaky.Param.JASTSeShot = (new Function("return " + Tomoaky.Parameters['Se Shot']))();

//-----------------------------------------------------------------------------
// Game_Map
//

// 装填
Tomoaky.JAST.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
  Tomoaky.JAST.Game_Map_setup.call(this, mapId);
  this.setupBullets();
};

// 子弹装填
Game_Map.prototype.setupBullets = function() {
  this._playerBullets = [];
  this._alivePlayerBullets = [];
  this._blankPlayerBullets = [];
  for (var i = 0; i < Tomoaky.Param.JASTPlayerBulletsMax; i++) {
    this._playerBullets.push(new Game_Bullet());
    this._blankPlayerBullets.push(i);
  }
  this._enemyBullets = [];
  this._aliveEnemyBullets = [];
  this._blankEnemyBullets = [];
  for (var i = 0; i < Tomoaky.Param.JASTEnemyBulletsMax; i++) {
    this._enemyBullets.push(new Game_Bullet());
    this._blankEnemyBullets.push(i);
  }
};

// 回收自己的子弹
Game_Map.prototype.playerBullets = function() {
  return this._playerBullets;
};

// 回收敌人的子弹
Game_Map.prototype.enemyBullets = function() {
  return this._enemyBullets;
};

// 子弹发射检测
Game_Map.prototype.checkPassageBullet = function(x, y) {
  if (!this.isValid(x, y)) {
    return false;
  }
  var rg = this.tileId(x, y, 5);
  if (rg == Tomoaky.Param.JAWallRegion) {
    return false;
  }
  var flags = this.tilesetFlags();
  var tiles = this.layeredTiles(x, y);
  for (var i = 0; i < tiles.length; i++) {
    var flag = flags[tiles[i]];
    if ((flag & 0x10) !== 0) {
      continue;
    }
    if ((flag & 0x0f) !== 0x0f) {
      return true;
    }
    if ((flag & 0x0f) !== 0) {
      return false;
    }
  }
  return false;
};

// 更新框架
Tomoaky.JAST.Game_Map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
  Tomoaky.JAST.Game_Map_update.call(this, sceneActive);
  this.updateBullets();
};

// 子弹更新
Game_Map.prototype.updateBullets = function() {
  for (var i = this._alivePlayerBullets.length - 1; i >= 0; i--) {
    var bi = this._alivePlayerBullets[i];
    if (!this._playerBullets[bi].update()) {
      this._alivePlayerBullets.splice(i, 1);
      this._blankPlayerBullets.push(bi);
    }
  }
  for (var i = this._aliveEnemyBullets.length - 1; i >= 0; i--) {
    var bi = this._aliveEnemyBullets[i];
    if (!this._enemyBullets[bi].update()) {
      this._aliveEnemyBullets.splice(i, 1);
      this._blankEnemyBullets.push(bi);
    }
  }
};

// 追加子弹
Game_Map.prototype.addBullet = function(x, y, z, vx, vy, angle, count, type, index, id, enemyFlag, skillId, owner) {
  if (enemyFlag) {
    if (this._blankEnemyBullets.length > 0) {
      var bi = this._blankEnemyBullets.shift();
      this._enemyBullets[bi].setup(x, y, z, vx, vy, angle, count, type, index, id, true, skillId, owner);
      this._aliveEnemyBullets.push(bi);
    }
  } else {
    if (this._blankPlayerBullets.length > 0) {
      var bi = this._blankPlayerBullets.shift();
      this._playerBullets[bi].setup(x, y, z, vx, vy, angle, count, type, index, id, false, skillId, owner);
      this._alivePlayerBullets.push(bi);
    }
  }
};

// 删除自己的所有子弹
Game_Map.prototype.clearPlayerBullets = function() {
  for (var i = 0; i < this._alivePlayerBullets.length; i++) {
    this._playerBullets[this._alivePlayerBullets[i]].erase();
  }
  this._blankPlayerBullets.concat(this._alivePlayerBullets);
  this._alivePlayerBullets = [];
};

// 删除敌人的所有子弹
Game_Map.prototype.clearEnemyBullets = function() {
  for (var i = 0; i < this._aliveEnemyBullets.length; i++) {
    this._enemyBullets[this._aliveEnemyBullets[i]].erase();
  }
  this._blankEnemyBullets.concat(this._aliveEnemyBullets);
  this._aliveEnemyBullets = [];
};

// 删除全部子弹
Game_Map.prototype.clearAllBullets = function() {
  this.clearPlayerBullets();
  this.clearEnemyBullets();
};

//-----------------------------------------------------------------------------
// Game_Action
//

Tomoaky.JAST.Game_Action_setSubject = Game_Action.prototype.setSubject;
Game_Action.prototype.setSubject = function(subject) {
  if (!subject.isActor() && !$gameParty.inBattle()) {
    this._subjectEnemyIndex = subject._screenX;
    this._subjectActorId = 0;
  } else {
    Tomoaky.JAST.Game_Action_setSubject.call(this, subject);
  }
};

Tomoaky.JAST.Game_Action_subject = Game_Action.prototype.subject;
Game_Action.prototype.subject = function() {
  if (this._subjectActorId == 0 && !$gameParty.inBattle()) {
    return $gameMap.event(this._subjectEnemyIndex).battler();
  } else {
    return Tomoaky.JAST.Game_Action_subject.call(this);
  }
};


//-----------------------------------------------------------------------------
// Game_Bullet
//

function Game_Bullet() {
  this.initialize.apply(this, arguments);
}

// 初始化
Game_Bullet.prototype.initialize = function() {
  this._opacity = 0;
};

// 设置
Game_Bullet.prototype.setup = function(x, y, z, vx, vy, angle, count, type, index, eventId, enemyFlag, skillId, owner) {
  this._opacity = 255;
  this._x = x;
  this._y = y;
  this._z = z;
  this._vx = vx;
  this._vy = vy;
  this._angle = angle;
  this._count = count;
  this._type = type;
  this._characterName = Tomoaky.Param.JASTBulletNames[this._type];
  this._characterIndex = index;
  this._eventId = eventId;
  this._enemyFlag = enemyFlag;
  this._skillId = skillId;
  this._owner = owner;
  this._collideSize = Tomoaky.Param.JASTBulletSizes[this._type];
  this._mapCollide = !$dataSkills[this._skillId].meta['map_through'];
};

// 判断是否存在
Game_Bullet.prototype.isExist = function() {
  return this._characterName !== '';
};

// 判断是否为敌人的子弹
Game_Bullet.prototype.isEnemy = function() {
  return this._enemyFlag;
};

// 获取子弹类型
Game_Bullet.prototype.type = function() {
  return this._type;
};

// 获取角度
Game_Bullet.prototype.angle = function() {
  return this._angle;
};

// 获取画面X坐标
Game_Bullet.prototype.screenX = function() {
  var tw = $gameMap.tileWidth();
  return Math.round($gameMap.adjustX(this._x) * tw);
};

// 获取画面Y坐标
Game_Bullet.prototype.screenY = function() {
  var th = $gameMap.tileHeight();
  return Math.round($gameMap.adjustY(this._y) * th);
};

// 获得角色所在的方向（角度）
Game_Bullet.prototype.angleToCharacter = function(character) {
  return Math.atan2(character._realY - character.collideH / 2 - this._y, character._realX - this._x);
};

// 取得玩家所在的方向（角度）
Game_Bullet.prototype.angleToPlayer = function() {
  return this.angleToCharacter($gamePlayer);
};

// 更新框架
Game_Bullet.prototype.update = function() {
  this._x += this._vx;
  this._y += this._vy;
  this._count--;
  if (this._count <= 0 || this.updateCollide()) {
    this.erase();
  }
  return this.isExist();
};

// 削除
Game_Bullet.prototype.erase = function() {
  this._characterName = '';
  this._opacity = 0;
};

// 接触判定
Game_Bullet.prototype.updateCollide = function() {
  if (this._mapCollide && this.collideMap()) {
    return true;
  } else {
    if (this._enemyFlag) {
      if (this.collideCharacter($gamePlayer)) {
        this.executeDamage($gamePlayer);
        return true;
      }
    } else {
      var targets = $gameMap.events();
      for (i = 0; i < targets.length; i++) {
        var character = targets[i];
        if (this.collideCharacter(character)) {
          this.executeDamage(character);
          return true;
        }
      }
    }
  }
  return false;
};

// 子弹的伤害处理
Game_Bullet.prototype.executeDamage = function(character) {
  if (character.isBattler() && this._owner.isBattler() && !character.isInvincible()) {
    character.applySkill(this._owner, this._skillId);
    if (character.battler()._result.isHit()) {
      character.setupInvincible();
    }
  }
};

// 返回是否与角色接触
Game_Bullet.prototype.collideCharacter = function(character) {
  if (character._through) {
    return false;
  }
  if (this._x - this._collideSize <= character._realX + character._collideW) {
    if (this._x + this._collideSize >= character._realX - character._collideW) {
      if (this._y - this._collideSize <= character._realY) {
        if (this._y + this._collideSize >= character._realY - character._collideH) {
          return true;
        }
      }
    }
  }
  return false;
};

// 返回是否与地图接触
Game_Bullet.prototype.collideMap = function() {
  var x = Math.floor(this._x);
  var y = Math.floor(this._y);
  return !$gameMap.checkPassageBullet(x, y);
}

//-----------------------------------------------------------------------------
// Game_CharacterBase
//

// 成员变量的初始化
Tomoaky.JAST.Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
  Tomoaky.JAST.Game_CharacterBase_initMembers.call(this);
  this._invincibleCount = 0;
  this._invincibleTime = 10;
};

// 被射击后的无敌判定(射击僵直状态的无敌?蛋疼的功能)
Game_CharacterBase.prototype.isInvincible = function() {
  return this._invincibleCount > 0;
};

// 设置无敌状态
Game_CharacterBase.prototype.setupInvincible = function() {
  this._invincibleCount = this._invincibleTime;
  this.battler().requestEffect('blink');
};

// 框架更新
Tomoaky.JAST.Game_CharacterBase_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function() {
  Tomoaky.JAST.Game_CharacterBase_update.call(this);
  if (this.isInvincible()) {
    this._invincibleCount--;
  }
};

//-----------------------------------------------------------------------------
// Game_Character
//

//取得角色所在的方向（角度）
Game_Character.prototype.angleToCharacter = function(character) {
  return Math.atan2(character._realY - character._collideH / 2 - (this._realY - this._collideH / 2), character._realX - this._realX);
};

// 获得玩家的方向（角度）
Game_Character.prototype.angleToPlayer = function() {
  return this.angleToCharacter($gamePlayer);
};

// 方向镜头
Game_Character.prototype.nwayShot = function(n, space, angle, speed, count, type, index, skillId) {
  angle = angle - (space * (n - 1) / 2);
  for (var i = 0; i < n; i++) {
    $gameMap.addBullet(this._realX, this._realY - this._collideH / 2, 200 + i,
      Math.cos(angle) * speed, Math.sin(angle) * speed, angle, count, type, index,
      this.eventId(), this.battler().isEnemy(), skillId, this);
    angle += space;
  }
};

// 角色瞄准n方向发射
Game_Character.prototype.nwayAim = function(n, space, angle, speed, count, type, index, skillId) {
  var a = angle + this.angleToPlayer();
  this.nwayShot(n, space, a, speed, count, type, index, skillId);
};

// 全方位镜头
Game_Character.prototype.nallShot = function(n, angle, speed, count, type, index, skillId) {
  var space = Math.PI * 2 / n;
  for (var i = 0; i < n; i++) {
    $gameMap.addBullet(this._realX, this._realY - this._collideH / 2, 200 + i,
      Math.cos(angle) * speed, Math.sin(angle) * speed, angle, count, type, index,
      this.eventId(), this.battler().isEnemy(), skillId, this);
    angle += space;
  }
};

// 角色的全方位镜头
Game_Character.prototype.nallAim = function(n, angle, speed, count, type, index, skillId) {
  var a = angle + this.angleToPlayer()
  this.nallShot(n, a, speed, count, type, index, skillId);
};

//-----------------------------------------------------------------------------
// Game_Player
//

// 成员变量的初始化
Tomoaky.JAST.Game_Player_initMembers = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function() {
  Tomoaky.JAST.Game_Player_initMembers.call(this);
  this._shotWay = 0;
  this._shotSpace = 0.2;
  this._shotSpeed = 0.1;
  this._shotCountTime = 30;
  this._shotDelayTime = 10;
  this._shotType = 1;
  this._shotIndex = 0;
  this._shotSkillId = 0;
  this._shotSeName = "";
  this._shotSeVolume = 0;
  this._shotSePitch = 0;
};

// 输入处理
Tomoaky.JAST.Game_Player_updateInput = Game_Player.prototype.updateInput;
Game_Player.prototype.updateInput = function() {
  this.attackByInput();
  Tomoaky.JAST.Game_Player_updateInput.call(this);
};

// 按键攻击
Game_Player.prototype.attackByInput = function() {
  if (this._shotDelay > 0) {
    this._shotDelay--;
  } else {
    var n = this._shotWay;
    if (Input.isTriggered('attack') && n > 0) {
      var space = this._shotSpace;
      var speed = this._shotSpeed;
      var count = this._shotCountTime;
      var type = this._shotType;
      var index = this._shotIndex;
      if (this._shotSkillId > 0) {
        var skillId = this._shotSkillId;
      } else {
        var skillId = this.battler().attackSkillId();
      }
      if (this._ladder) {
        if (Input.isPressed('left')) {
          this.setDirection(4);
        } else if (Input.isPressed('right')) {
          this.setDirection(6);
        }
      }
      var pan = 0;
      if (this._direction == 4) {
        this.nwayShot(n, space, Math.PI, speed, count, type, index, skillId)
        pan = -10;
      } else if (this._direction == 6){
        this.nwayShot(n, space, 0, speed, count, type, index, skillId)
        pan = 10;
      } else {
        this.nwayShot(n, space, Math.PI * 1.5, speed, count, type, index, skillId)
      }
      this._shotDelay = this._shotDelayTime;
      if (Tomoaky.Param.JASTWeaponSprite) {
        this.battler().performAttack();
      }
      var se = {};
      se.name = this._shotSeName;
      se.pitch = this._shotSePitch;
      se.volume = this._shotSeVolume;
      se.pan = pan;
      AudioManager.playSe(se);
    }
  }
};

// 恢复状态
Tomoaky.JAST.Game_Player_refresh = Game_Player.prototype.refresh;
Game_Player.prototype.refresh = function() {
  Tomoaky.JAST.Game_Player_refresh.call(this);
  var actor = this.actor();
  if (actor) {
    this._invincibleTime = actor.loadTagParam('invincible_time', 30);
    this._shotWay = actor.loadTagParam('shot_way', 0);
    this._shotSpace = actor.loadTagParam('shot_space', 0.2);
    this._shotSpeed = actor.loadTagParam('shot_speed', 0.1);
    this._shotCountTime = actor.loadTagParam('shot_count', 30);
    this._shotDelayTime = actor.loadTagParam('shot_delay', 10);
    this._shotType = Number(actor.loadTagString('shot_type', "1"));
    this._shotIndex = Number(actor.loadTagString('shot_index', "0"));
    this._shotSkillId = Number(actor.loadTagString('shot_skill', "0"));
    this._shotSeName = actor.loadTagString('shot_se_name', "");
    this._shotSeVolume = Number(actor.loadTagString('shot_se_volume', "90"));
    this._shotSePitch = Number(actor.loadTagString('shot_se_pitch', "100"));
  }
};

//-----------------------------------------------------------------------------
// Game_Interpreter
//

// 插件命令
Tomoaky.JAST.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Tomoaky.JAST.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'JumpAction') {
    switch (args[0]) {
    case 'nway_shot':
      var character = this.character(args[1]);
      if (character && character.isBattler()) {
        if (!args[9]) {
          args[9] = character.battler().attackSkillId();
        }
        character.nwayShot(Number(args[2]), Number(args[3]), Number(args[4]), Number(args[5]),
          Number(args[6]), Number(args[7]), Number(args[8]), Number(args[9]));
      }
      break;
    case 'nway_aim':
      var character = this.character(args[1]);
      if (character && character.isBattler()) {
        if (!args[9]) {
          args[9] = character.battler().attackSkillId();
        }
        character.nwayAim(Number(args[2]), Number(args[3]), Number(args[4]), Number(args[5]),
          Number(args[6]), Number(args[7]), Number(args[8]), Number(args[9]));
      }
      break;
    case 'nall_shot':
      var character = this.character(args[1]);
      if (character && character.isBattler()) {
        if (!args[8]) {
          args[8] = character.battler().attackSkillId();
        }
        character.nallShot(Number(args[2]), Number(args[3]), Number(args[4]), Number(args[5]),
          Number(args[6]), Number(args[7]), Number(args[8]));
      }
      break;
    case 'nall_aim':
      var character = this.character(args[1]);
      if (character && character.isBattler()) {
        if (!args[8]) {
          args[8] = character.battler().attackSkillId();
        }
        character.nallAim(Number(args[2]), Number(args[3]), Number(args[4]), Number(args[5]),
          Number(args[6]), Number(args[7]), Number(args[8]));
      }
      break;
    }
  }
};

//-----------------------------------------------------------------------------
// Sprite_Character
//

// 成员变量的初始化
Tomoaky.JAST.Sprite_Character_initMembers = Sprite_Character.prototype.initMembers;
Sprite_Character.prototype.initMembers = function() {
  Tomoaky.JAST.Sprite_Character_initMembers.call(this);
  this.createWeaponSprite();
};

// 制作武器子弹特效
Sprite_Character.prototype.createWeaponSprite = function() {
  this._weaponSprite = new Sprite_Weapon();
  this.addChild(this._weaponSprite);
};

// 设置武器动画
Sprite_Character.prototype.setupWeaponAnimation = function() {
  if (this._character.battler().isWeaponAnimationRequested()) {
    this._weaponSprite.setup(this._character.battler().weaponImageId());
    this._character.battler().clearWeaponAnimation();
  }
};

// 更新框架
Tomoaky.JAST.Sprite_Character_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
  Tomoaky.JAST.Sprite_Character_update.call(this);
  if (this._character.isBattler()) {
    this.updateMotion();
  }
};

// 动作更新
Sprite_Character.prototype.updateMotion = function() {
  this.setupWeaponAnimation();
  if (this._weaponSprite.isPlaying()) {
    if (this._character._direction == 4) {
      this._weaponSprite.scale.x = 1;
      this._weaponSprite.x = -16;
    } else {
      this._weaponSprite.scale.x = -1;
      this._weaponSprite.x = 16;
    }
  }
};


//-----------------------------------------------------------------------------
// Sprite_Bullet
//

function Sprite_Bullet() {
  this.initialize.apply(this, arguments);
}

Sprite_Bullet.prototype = Object.create(Sprite.prototype);
Sprite_Bullet.prototype.constructor = Sprite_Bullet;

// 初始化
Sprite_Bullet.prototype.initialize = function(bullet) {
  Sprite.prototype.initialize.call(this);
  this.anchor.x = 0.5;
  this.anchor.y = 0.5;
  this._bullet = bullet;
  this._characterName = '';
  this._characterIndex = 0;
};

// 更新框架
Sprite_Bullet.prototype.update = function() {
  Sprite.prototype.update.call(this);
  this.opacity = this._bullet._opacity;
  if (this.opacity > 0) {
    this.updateBitmap();
    this.x = this._bullet.screenX();
    this.y = this._bullet.screenY();
    this.z = this._bullet._z;
    this.rotation = this._bullet.angle();
  }
};

// 更新数位图
Sprite_Bullet.prototype.updateBitmap = function() {
  if (this.isImageChanged()) {
    this._characterName = this._bullet._characterName;
    this._characterIndex = this._bullet._characterIndex;
    this.setCharacterBitmap();
  }
};

// 图形的变更判定
Sprite_Bullet.prototype.isImageChanged = function() {
  if (this._characterName !== this._bullet.characterName) {
    return true;
  }
  if (this._characterIndex !== this._bullet.characterIndex) {
    return true;
  }
  return false;
};

// 设置位图
Sprite_Bullet.prototype.setCharacterBitmap = function() {
  this.bitmap = ImageManager.loadSystem(this._characterName);
  var pw = Math.floor(this.bitmap.width / 8);
  var sx = this._characterIndex * pw;
  this.setFrame(sx, 0, pw, this.bitmap.height);
  this.blendMode = this._characterName.charAt(0) === '!' ? 1 : 0;
};

//-----------------------------------------------------------------------------
// Spriteset_Map
//

Tomoaky.JAST.Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
Spriteset_Map.prototype.createLowerLayer = function() {
  Tomoaky.JAST.Spriteset_Map_createLowerLayer.call(this);
  this.createBullets();
};

// 射出自己制作的子弹
Spriteset_Map.prototype.createBullets = function() {
  this._bulletSprites = [];
  $gameMap.playerBullets().forEach(function(bullet) {
    this._bulletSprites.push(new Sprite_Bullet(bullet));
    this._baseSprite.addChild(this._bulletSprites[this._bulletSprites.length - 1]);
  }, this);
  $gameMap.enemyBullets().forEach(function(bullet) {
    this._bulletSprites.push(new Sprite_Bullet(bullet));
    this._baseSprite.addChild(this._bulletSprites[this._bulletSprites.length - 1]);
  }, this);
};

