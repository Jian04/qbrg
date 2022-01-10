//=============================================================================
// TMVplugin - 跳跃动作 (也就是其他插件需要的基本插件,其他插件需要此插件高于0.2b)
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 0.3b (当前插件的版本)
// 最終更新日: 2016/01/19
//=============================================================================
//此文本大多为机翻，不过也大致能看懂啥意思
/*:
 * @plugindesc 那个动作游戏地图景色
 * 详细规格等请参照发布网站。(大致就是下面这个)
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param Gravity
 * @desc 重力强度(几倍压力)
 * 初期値: 0.004
 * @default 0.004
 *
 * @param Friction
 * @desc 通常的地形和事件的摩擦强度。
 * 初期値: 0.001
 * @default 0.001
 *
 * @param Tile Margin Top
 * @desc 用来判断与地形接触的坐标向上移动了多少
 * 初期値: 0.5
 * @default 0.5
 *
 * @param Steps For Turn
 * @desc 移动几格后经过一个回合
 * 初期値: 20
 * @default 20
 *
 * @param All Dead Event
 * @desc 全灭时启动的comon事件号码。
 * 初期値: 1
 * @default 1
 *
 * @param Event Collapse
 * @desc 战斗失败时使用倒地动画
 * 初期値: true（ false 无效果）
 * @default true
 *
 * @param Floor Damage
 * @desc 掉落的伤害
 * 初期値: 10
 * @default 10
 *
 * @param Flick Weight
 * @desc 击飞比自己轻的物体
 * 初期値: 1（ 0 如果重量相等就能击飞）
 * @default 1
 *
 * @param Flick Skill
 * @desc 击飞的伤害计算使用的技能编号。
 * 初期値: 1（ 0 击飞没有伤害）
 * @default 1
 *
 * @param Stage Region
 * @desc 作为立足点使用的版本号
 * 初期値: 60
 * @default 60
 *
 * @param Wall Region
 * @desc 作为墙壁处理的版本号。
 * 初期値: 61
 * @default 61
 *
 * @param Slip Wall Region
 * @desc 墙壁跳跃不能当作墙壁来使用的版本号。
 * 初期値: 62
 * @default 62
 *
 * @param Slip Floor Region
 * @desc 作为滑地板使用的区域号码。
 * 初期値: 63
 * @default 63
 *
 * @param Rough Floor Region
 * @desc 作为移动速度减半的地板处理的区域编号。
 * 初期値: 64
 * @default 64
 *
 * @param Marsh Floor Region
 * @desc 不能移动的地板的区域编号。
 * 初期値: 65
 * @default 65
 *
 * @param Water Terrain Tag
 * @desc 作为水中处理的地形标签编号。
 * 初期値: 1
 * @default 1
 *
 * @param levelupPopup
 * @desc 升级时显示的弹出。
 * 初期値: LEVEL UP!!
 * @default LEVEL UP!!
 *
 * @param levelupAnimationId
 * @desc 升级时要显示的动画编号。
 * 初期値: 46
 * @default 46
 *
 * @param Use Event Se Swim
 * @desc 在事件上设置进入水中的音效
 * 初期値: true（ false 不应用）
 * @default true
 *
 * @param Se Jump
 * @desc 跳跃时调用的音效
 * 初期値: {name: "Crossbow", volume: 90, pitch: 100, pan: 0}
 * @default {name: "Crossbow", volume: 90, pitch: 100, pan: 0}
 *
 * @param Se Dash
 * @desc 冲刺时调用的音效
 * 初期値: {name: "Wind4", volume: 90, pitch: 50, pan: 0}
 * @default {name: "Wind4", volume: 90, pitch: 50, pan: 0}
 *
 * @param Se Flick
 * @desc 冲刺中把敌人撞飞时的音效
 * 初期値: {name: "Damage1", volume: 90, pitch: 100, pan: 0}
 * @default {name: "Damage1", volume: 90, pitch: 100, pan: 0}
 *
 * @param Se Swim
 * @desc 进入水中和出水时调用的音效
 * 初期値: {name: "Water1", volume: 90, pitch: 100, pan: 0}
 * @default {name: "Water1", volume: 90, pitch: 100, pan: 0}
 *
 * @param Se Change
 * @desc 切换角色时调用的音效
 * 初期値: {name: "Sword1", volume: 90, pitch: 100, pan: 0}
 * @default {name: "Sword1", volume: 90, pitch: 100, pan: 0}
 *
 * @help 横向和纵向都不支持环图。
 *
 * 使用备忘录栏设置动作参数（例如跳跃能力）。

*主角、装备、状态的备忘录栏中标记为参数。

*但是，如果主角没有标记，则会自动设置初始值。
 *
 * 备忘录栏（角色、装备、状态）标签：
 *   <move_speed:0.05>        # 歩行速度
 *   <jump_speed:0.14>        # 跳跃力
 *   <swim_speed:0.02>        # 游泳速度
 *   <ladder_speed:0.04>      # 爬梯子速度
 *   <accele:0.003>           # 歩行加速度
 *   <ladder_accele:0.003>    # 爬梯子加速
 *   <jump_input:0>           # 跳跃添加输入时间
 *   <swim_jump:0.1>          # 水下跳跃力
 *   <mulch_jump:1>           # 连续跳跃次数
 *   <weigth:2>               # 重量
 *   <gravity:0.0045>         # 重力
 *   <friction:0>             # 摩擦
 *   <wall_jump>              # 墙壁跳跃
 *   <dash_speed_x:0.14>      # 冲刺速度（横方向）
 *   <dash_speed_y:0.03>      # 冲刺速度（縦方向）
 *   <dash_count:15>          # 冲刺時間
 *   <dash_delay:30>          # 冲刺後硬直時間
 *
 * 笔记栏（事件）标签:
 *   <w:0.375>                # 平均判定(从中心到左右边缘的尺寸)
 *   <h:0.75>                 # 平均判定（从脚部到头部的尺寸）
 *   <enemy:1>                # 敌人编号
 *   <dead:A>                 # 再起不能的自动开关
 *   <lift>                   # 升降属性
 *   <weigth:1>               # 重量
 *   <gravity:0.004>          # 重力
 *
 * 插件命令:
 *   JumpAction hp_damage -1 5     # 给予玩家5点伤害。
 *   JumpAction hp_damage 1 100    # 给予事件1号100点伤害。
 *   JumpAction hp 1 2             # 将活动1号的HP代入游戏变量2号。
 *   JumpAction force_x -1 0.1     # 玩家的X速度强制变更为0.1。
 *   JumpAction force_y 1 -0.15    # 事件1号的Y速度-0.15强制变更。
 *   JumpAction change_actor 2     # 操作角色变更为动作2号。
 *   JumpAction addPopup -1 文本 #ff0000
 *                                 # 向玩家弹出红色文本
 *
 */

var Imported = Imported || {};
Imported.TMJumpAction = true;

var Tomoaky = Tomoaky || {};
Tomoaky.JA = Tomoaky.JA || {};

Tomoaky.Parameters = PluginManager.parameters('TMJumpAction');
Tomoaky.Param = Tomoaky.Param || {};

Tomoaky.Param.JAGravity = Number(Tomoaky.Parameters['Gravity']);
Tomoaky.Param.JAFriction = Number(Tomoaky.Parameters['Friction']);
Tomoaky.Param.JATileMarginTop = Number(Tomoaky.Parameters['Tile Margin Top']);
Tomoaky.Param.JAStepsForTurn = Number(Tomoaky.Parameters['Steps For Turn']);
Tomoaky.Param.JAAllDeadEvent = Number(Tomoaky.Parameters['All Dead Event']);
Tomoaky.Param.JAEventCollapse = (Tomoaky.Parameters['Event Collapse']) === 'true' ? true : false;
Tomoaky.Param.JAFloorDamage = Number(Tomoaky.Parameters['Floor Damage']);
Tomoaky.Param.JAFlickWeight = Number(Tomoaky.Parameters['Flick Weight']);
Tomoaky.Param.JAFlickSkill = Number(Tomoaky.Parameters['Flick Skill']);
Tomoaky.Param.JAStageRegion = Number(Tomoaky.Parameters['Stage Region']);
Tomoaky.Param.JAWallRegion = Number(Tomoaky.Parameters['Wall Region']);
Tomoaky.Param.JASlipWallRegion = Number(Tomoaky.Parameters['Slip Wall Region']);
Tomoaky.Param.JASlipFloorRegion = Number(Tomoaky.Parameters['Slip Floor Region']);
Tomoaky.Param.JARoughFloorRegion = Number(Tomoaky.Parameters['Rough Floor Region']);
Tomoaky.Param.JAMarshFloorRegion = Number(Tomoaky.Parameters['Marsh Floor Region']);
Tomoaky.Param.JAWaterTerrainTag = Number(Tomoaky.Parameters['Water Terrain Tag']);
Tomoaky.Param.JALevelupPopup = Tomoaky.Parameters['levelupPopup'];
Tomoaky.Param.JALevelupAnimationId = Number(Tomoaky.Parameters['levelupAnimationId']);
Tomoaky.Param.JAUseEventSeSwim = (Tomoaky.Parameters['Use Event Se Swim']) === 'true' ? true : false;
Tomoaky.Param.JASeJump = (new Function("return " + Tomoaky.Parameters['Se Jump']))();
Tomoaky.Param.JASeDash = (new Function("return " + Tomoaky.Parameters['Se Dash']))();
Tomoaky.Param.JASeFlick = (new Function("return " + Tomoaky.Parameters['Se Flick']))();
Tomoaky.Param.JASeSwim = (new Function("return " + Tomoaky.Parameters['Se Swim']))();
Tomoaky.Param.JASeChange = (new Function("return " + Tomoaky.Parameters['Se Change']))();

if (!Imported.TMEventBase) {
  Imported.TMEventBase = true;
  (function() {
  
    //-----------------------------------------------------------------------------
    // Game_Event
    //
  
    var _Game_Event_setupPage = Game_Event.prototype.setupPage;
    Game_Event.prototype.setupPage = function() {
      _Game_Event_setupPage.call(this);
      if (this._pageIndex >= 0) {
        this.loadCommentParams();
      }
    };

    Game_Event.prototype.loadCommentParams = function() {
      this._commentParams = {};
      var re = /<([^<>:]+)(:?)([^>]*)>/g;
      var list = this.list();
      for (var i = 0; i < list.length; i++) {
        var command = list[i];
        if (command && command.code == 108 || command.code == 408) {
          for (;;) {
            var match = re.exec(command.parameters[0]);
            if (match) {
              if (match[2] === ':') {
                this._commentParams[match[1]] = match[3];
              } else {
                this._commentParams[match[1]] = true;
              }
            } else {
              break;
            }
          }
        } else {
          break;
        }
      }
    };

    Game_Event.prototype.loadTagParam = function(paramName) {
      if (this._commentParams[paramName]) {
        return this._commentParams[paramName];
      } else if (this.event().meta[paramName]) {
        return this.event().meta[paramName];
      } else {
        return null;
      }
    };

  })();
}

(function() {

  //-----------------------------------------------------------------------------
  // Input
  //

  Input.keyMapper[65] = 'attack';
  Input.keyMapper[83] = 'jump';
  Input.keyMapper[68] = 'dash';

  Input.gamepadMapper = {
    0: 'ok',        // A 按键A
    1: 'cancel',    // B
    2: 'dash',      // X
    3: 'jump',      // Y
    4: 'pageup',    // LB
    5: 'pagedown',  // RB
    6: 'menu',      // LT
    7: 'attack',    // RT
    12: 'up',       // D-pad up
    13: 'down',     // D-pad down
    14: 'left',     // D-pad left
    15: 'right',    // D-pad right
  };

  //-----------------------------------------------------------------------------
  // Game_Battler
  //

  // 成员变量的初始化
  var _Game_Battler_initMembers = Game_Battler.prototype.initMembers;
  Game_Battler.prototype.initMembers = function() {
    _Game_Battler_initMembers.call(this);
    this._actionResult = new Game_ActionResult();
  };

  // 清除狗齿(优化马赛克)
  var _Game_Battler_clearResult = Game_Battler.prototype.clearResult;
  Game_Battler.prototype.clearResult = function() {
    this._actionResult.hpDamage += this._result.hpDamage;
    this._actionResult.missed |= this._result.missed;
    this._actionResult.evaded |= this._result.evaded;
    this._actionResult.critical |= this._result.critical;
    this._actionResult.addedStates = this._actionResult.addedStates.concat(this._result.addedStates);
    this._actionResult.removedStates = this._actionResult.removedStates.concat(this._result.removedStates);
    _Game_Battler_clearResult.call(this);
  };

  // 战斗结束处理
  var _Game_Battler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
  Game_Battler.prototype.onBattleEnd = function() {
    _Game_Battler_onBattleEnd.call(this);
    this.clearActionResult();
  };

  // 清除跳跃动作
  Game_Battler.prototype.clearActionResult = function() {
    this._actionResult.clear();
  };
  
  //-----------------------------------------------------------------------------
  // Game_Actor
  //

  // 从伤害地板受到的伤害
  Game_Actor.prototype.basicFloorDamage = function() {
    return Tomoaky.Param.JAFloorDamage;
  };

  // 移动几格后经过一个回合
  Game_Actor.prototype.stepsForTurn = function() {
    return Tomoaky.Param.JAStepsForTurn;
  };

  // 显示附加状态
  var _Game_Actor_showAddedStates = Game_Actor.prototype.showAddedStates;
  Game_Actor.prototype.showAddedStates = function() {
    if ($gameParty.inBattle()) {
      _Game_Actor_showAddedStates.call(this);
    }
  };

  // 显示升级
  var _Game_Actor_displayLevelUp = Game_Actor.prototype.displayLevelUp;
  Game_Actor.prototype.displayLevelUp = function(newSkills) {
    if ($gameParty.inBattle()) {
      _Game_Actor_displayLevelUp.call(this, newSkills);
    } else {
      $gamePlayer.setMapPopup(Tomoaky.Param.JALevelupPopup, '#ffffff');
      $gamePlayer.requestAnimation(Tomoaky.Param.JALevelupAnimationId);
    }
  };

  // 显示已解除的语句
  var _Game_Actor_showRemovedStates = Game_Actor.prototype.showRemovedStates;
  Game_Actor.prototype.showRemovedStates = function() {
    if ($gameParty.inBattle()) {
      _Game_Actor_showRemovedStates.call(this);
    }
  };

  // 从动作（+装备、状态）的标签加载参数（数值）
  Game_Actor.prototype.loadTagParam = function(param_name, default_value) {
    var result = this.actor().meta[param_name];
    result = result ? Number(result) : default_value;
    var equips = this.equips().concat(this.states());
    for (var i = 0; i < equips.length; i++) {
      var item = equips[i];
      if (item && item.meta[param_name]) {
        result += Number(item.meta[param_name]);
      }
    }
    return result;
  };

  // 从动作(+装备，状态)的标签加载参数(真伪值)
  Game_Actor.prototype.loadTagBool = function(param_name) {
    var equips = this.equips().concat(this.states(), this.actor());
    for (var i = 0; i < equips.length; i++) {
      var item = equips[i];
      if (item && item.meta[param_name]) {
        return true;
      }
    }
    return false;
  };

  // 从动作（＋装备、状态）的标签加载参数（字符串）
  Game_Actor.prototype.loadTagString = function(param_name, default_value) {
    var equips = this.states().concat(this.equips(), this.actor());
    for (var i = equips.length - 1; i >= 0; i--) {
      var item = equips[i];
      if (item && item.meta[param_name]) {
        return item.meta[param_name];
      }
    }
    return default_value;
  };

  //-----------------------------------------------------------------------------
  // Game_Map
  //

  // 不制作交通工具
  Game_Map.prototype.createVehicles = function() {
      this._vehicles = [];
  };

  // 判定壁跳是否可能
  Game_Map.prototype.canWallJump = function(x, y, d) {
    if (!this.isValid(x, y)) {
      return false;
    }
    if (this.tileId(x, y, 5) == Tomoaky.Param.JASlipWallRegion) {
      return false;
    }
    return !this.isPassable(x, y, d);
  };

  // 检测可以通行
  Game_Map.prototype.checkPassage = function(x, y, bit) {
    if (!this.isValid(x, y)) {
      return false;
    }
    var rg = this.tileId(x, y, 5);
    if (rg == Tomoaky.Param.JAWallRegion) {
      return false;
    }
    var flags = this.tilesetFlags();
    var tiles = this.allTiles(x, y);
    for (var i = 0; i < tiles.length; i++) {
      var flag = flags[tiles[i]];
      if (rg == Tomoaky.Param.JAStageRegion) {
        flag |= 1;
      }
      if ((flag & 0x10) !== 0)  // [*] No effect on passage
        continue;
      if ((flag & bit) === 0)   // [o] Passable
        return true;
      if ((flag & bit) === bit) // [x] Impassable
        return false;
    }
    return false;
  };

  //-----------------------------------------------------------------------------
  // Game_CharacterBase
  //

  // 成员变量的初始化
  var _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
  Game_CharacterBase.prototype.initMembers = function() {
    _Game_CharacterBase_initMembers.call(this);
    this._needsRefresh = false;
    this._mapPopups = [];
    this._vx = 0;
    this._vy = 0;
    this._vxPlus = 0;
    this._lastY = 0;
    this._lastSwim = false;
    this._collideW = 0.375;
    this._collideH = 0.75;
    this._collideIds = [];
    this._landingObject = null;
    this._landingRegion = 0;
    this._ladder = false;
    this._lift = false;
    this._lockCount = 0;
    this._moveCount = 0;
    this._jumpInput = 0;
    this._dashCount = 0;
    this._friction = 0;
    this._moveSpeed = 0.05;
    this._jumpSpeed = 0.14;
    this._swimSpeed = 0.02;
    this._dashSpeedX = 0.1;
    this._dashSpeedY = 0.03;
    this._ladderSpeed = 0.04;
    this._accele = 0.003
    this._ladderAccele = 0.003;
    this._jumpInputTime = 0;
    this._dashCountTime = 30;
    this._swimJump = 0.1;
    this._mulchJump = 1;
    this._weight = 0;
    this._gravity = Tomoaky.Param.JAGravity;
  };

  // 取得方法
  Game_CharacterBase.prototype.battler = function() {
    return null;
  };

  // 是否设置了跟踪器
  Game_CharacterBase.prototype.isBattler = function() {
    return this.battler() !== null;
  };

  // 移动状态判定
  Game_CharacterBase.prototype.isMoving = function() {
    return this._moveCount > 0;
  };

  // 小跑状态判定
  Game_CharacterBase.prototype.isDashing = function() {
    return this._dashCount > 0;
  };

  // 站在地面上
  Game_CharacterBase.prototype.isLanding = function() {
    return this._landingObject !== null;
  };

  // 横向状态判定
  Game_CharacterBase.prototype.isSwimming = function() {
    return this.terrainTag() == Tomoaky.Param.JAWaterTerrainTag;
  };

  // 锁定状态判定

  Game_CharacterBase.prototype.isLocking = function() {
    return this._lockCount > 0;
  };

  // 检查自己的重量是否能将对手弹飞
  Game_CharacterBase.prototype.checkFlickWeight = function(weight) {
    return this._weight >= weight + Tomoaky.Param.JAFlickWeight;
  };

  // 刷新标志

  Game_CharacterBase.prototype.requestRefresh = function() {
    this._needsRefresh = true;
  };

  // 移动速度设置
  Game_CharacterBase.prototype.setMoveSpeed = function(moveSpeed) {
    this._moveSpeed = moveSpeed / 100 + 0.02;
  };

  // 更新框架

  Game_CharacterBase.prototype.update = function() {
    this.updateMove();
    this.updateAnimation();
    this.updateCollideIds();
    if (this.isDashing()) {
      this.updateDashCount();
    }
    if (this.isMoving()) {
      this.updateMoveCount();
    } else {
      this.updateStop();
    }
    if (this.isSwimming() != this._lastSwim) {
      this.updateSwiming();
    }
    if (this._needsRefresh) {
      this.refresh();
    }
  };

  // 画面X坐标取得
  Game_CharacterBase.prototype.screenX = function() {
    var tw = $gameMap.tileWidth();
    return Math.round(this.scrolledX() * tw);
  };

  // 画面Y坐标的取得
  Game_CharacterBase.prototype.screenY = function() {
    var th = $gameMap.tileHeight();
    return Math.round(this.scrolledY() * th);
  };

  // 移动处理
  Game_CharacterBase.prototype.updateMove = function() {
    this.updateGravity();
    this.updateFriction();
    if (this._vx != 0 || this._vxPlus != 0) {
      this._realX += this._vx + this._vxPlus;
      if (this._vx > 0) {
        this.collideMapRight();
        if (!this._through) {
            this.collideCharacterRight();
        }
      } else {
        this.collideMapLeft();
        if (!this._through) {
            this.collideCharacterLeft();
        }
      }
      this._x = Math.floor(this._realX);
    }
    if (this._vy != 0) {
      this._landingObject = null;
      this._realY += this._vy;
      if (this._vy > 0) {
        this.collideMapDown();
        if (!this._through) {
            this.collideCharacterDown();
        }
      } else {
        this.collideMapUp();
        if (!this._through) {
            this.collideCharacterUp();
        }
      }
      this._y = Math.floor(this._realY);
      this._lastY = Math.floor(this._realY + Tomoaky.Param.JATileMarginTop);
    }
  };

  // 重力处理
  Game_CharacterBase.prototype.updateGravity = function() {
    this._vy = Math.min(this._vy + this._gravity, this.maxFallSpeed());
  };

  // 获取最大掉落速度
  Game_CharacterBase.prototype.maxFallSpeed = function() {
    return this.isSwimming() ? 0.04 : 0.6;
  };

  // 摩擦的处理
  Game_CharacterBase.prototype.updateFriction = function() {
    if (this.isLanding()) {
      if (Object.prototype.toString.call(this._landingObject) !== '[object Array]') {
        if (this._landingObject._lift) {
          this._vxPlus = this._landingObject._vx;
        }
      }
    } else {
      this._vxPlus = 0;
    }
  };

  // 移动计数处理
  Game_CharacterBase.prototype.updateMoveCount = function() {
    this._moveCount--;
    if (this._moveCount == 0 && !this.isDashing()) {
      this._vx = 0;
      if (this._gravity == 0) {
        this._vy = 0;
      }
    }
  };

  // 冲刺计数处理
  Game_CharacterBase.prototype.updateDashCount = function() {
    this._dashCount--;
  };

  // 碰撞角色的处理
  Game_CharacterBase.prototype.updateCollideIds = function() {
    for(var i = this._collideIds.length - 1; i >= 0; i--) {
      var id = this._collideIds[i];
      var character = id < 0 ? $gamePlayer : $gameMap.event(id);
      if (!this.isCollide(character)) {
        this._collideIds.splice(i, 1);
      }
    }
  };

  // 返回与角色的直线距离
  Game_CharacterBase.prototype.distFromCharacter = function(character) {
    var x = this._realX - character._realX;
    var y = this._realY - character._realY;
    return Math.sqrt(x * x + y * y);
  };

  // 与地图的碰撞判定（上方向）
  Game_CharacterBase.prototype.collideMapUp = function() {
    var lx = Math.floor(this._realX - this._collideW);
    var rx = Math.floor(this._realX + this._collideW);
    var y = Math.floor(this._realY - this._collideH);
    for (var x = lx; x <= rx; x++) {
      if (!$gameMap.isPassable(x, y, 8)) {
        this._realY = y + 1.001 + this._collideH;
        this._vy = 0;
        this._jumpInput = 0;
        return;
      }
    }
  };

  // 与地图的碰撞判定（下方向）
  Game_CharacterBase.prototype.collideMapDown = function() {
    var y = Math.floor(this._realY + Tomoaky.Param.JATileMarginTop);
    if (y == this._lastY) {
      return;
    }
    var lx = Math.floor(this._realX - this._collideW);
    var rx = Math.floor(this._realX + this._collideW);
    var y = Math.floor(this._realY + Tomoaky.Param.JATileMarginTop);
    for (var x = lx; x <= rx; x++) {
      if (!$gameMap.isPassable(x, y, 2)) {
        if (this._ladder && $gameMap.isLadder(x, y)) {
          continue;
        }
        this._landingObject = [x, y];
        this._landingRegion = $gameMap.regionId(x, y);
        this.getLand(y - Tomoaky.Param.JATileMarginTop - 0.001);
        return;
      }
    }
  };

  // 与地图的碰撞判定（左方向）
  Game_CharacterBase.prototype.collideMapLeft = function() {
    var ty = Math.floor(this._realY - this._collideH);
    var by = Math.floor(this._realY + Tomoaky.Param.JATileMarginTop);
    var x = Math.floor(this._realX - this._collideW);
    for (var y = ty; y <= by; y++) {
      if (!$gameMap.isPassable(x, y, 4)) {
        this._realX = x + 1.001 + this._collideW;
        this._vx = 0;
        return;
      }
    }
  };

  // 与地图的碰撞判定（右方向）
  Game_CharacterBase.prototype.collideMapRight = function() {
    var ty = Math.floor(this._realY - this._collideH);
    var by = Math.floor(this._realY + Tomoaky.Param.JATileMarginTop);
    var x = Math.floor(this._realX + this._collideW);
    for (var y = ty; y <= by; y++) {
      if (!$gameMap.isPassable(x, y, 6)) {
        this._realX = x - 0.001 - this._collideW;
        this._vx = 0;
        return;
      }
    }
  };

  // 与地图的碰撞判定（上方向）
  Game_CharacterBase.prototype.collideCharacterUp = function() {
    var targets = this.collideTargets();
    for (var i = 0; i < targets.length; i++) {
      var character = targets[i];
      if (this.isCollide(character)) {
        this.addCollideId(character.eventId());
        if (!character._through) {
          if (this._lift) {
            character._realY = this._realY - this._collideH - 0.001;
            character._vy = this._vy;
            character._landingObject = this;
            character.resetJump();
          } else {
            this._realY = character._realY + this._collideH + 0.001;
            this._vy = 0;
            this._jumpInput = 0;
          }
        }
      }
    }
  };

  // 与地图的碰撞判定（下方向）
  Game_CharacterBase.prototype.collideCharacterDown = function() {
    var targets = this.collideTargets();
    for (var i = 0; i < targets.length; i++) {
      var character = targets[i];
      if (this.isCollide(character)) {
        this.addCollideId(character.eventId());
        if (!character._through) {
          if (this._lift) {
            character._realY = this._realY + character._collideH + 0.001;
            character._jumpInput = 0;
            character._vy = this._vy;
          } else {
            this._landingObject = character;
            this._landingRegion = -1;
            this.getLand(character._realY - character._collideH - 0.001);
          }
        }
      }
    }
  };

  // 与地图的碰撞判定（左方向）
  Game_CharacterBase.prototype.collideCharacterLeft = function() {
    var targets = this.collideTargets();
    for (var i = 0; i < targets.length; i++) {
      var character = targets[i];
      if (this.isCollide(character)) {
        this.addCollideId(character.eventId());
        if (!character._through) {
          if (this._lift || this._ladder) {
            character._realX = this._realX - this._collideW - 0.001 - character._collideW;
            character._vx = this._vx;
          } else {
            if (this.isDashing() && this.checkFlickWeight(character._weight)) {
              character.flick(this);
            }
            this._realX = character._realX + character._collideW + 0.001 + this._collideW;
            this._vx = 0;
          }
        }
      }
    }
  };

  // 与地图的碰撞判定（右方向）
  Game_CharacterBase.prototype.collideCharacterRight = function() {
    var targets = this.collideTargets();
    for (var i = 0; i < targets.length; i++) {
      var character = targets[i];
      if (this.isCollide(character)) {
        this.addCollideId(character.eventId());
        if (!character._through) {
          if (this._lift || this._ladder) {
            character._realX = this._realX + this._collideW + 0.001 + character._collideW;
            character._vx = this._vx;
          } else {
            if (this.isDashing() && this.checkFlickWeight(character._weight)) {
              character.flick(this);
            }
            this._realX = character._realX - character._collideW - 0.001 - this._collideW;
            this._vx = 0;
          }
        }
      }
    }
  };

  // 与地图的碰撞判定
  Game_CharacterBase.prototype.isCollide = function(character) {
    if (this.eventId() == character.eventId()) {
      return false;
    }
    if (this._realX - this._collideW <= character._realX + character._collideW) {
      if (this._realX + this._collideW >= character._realX - character._collideW) {
        if (this._realY - this._collideH <= character._realY) {
          if (this._realY >= character._realY - character._collideH) {
            return true;
          }
        }
      }
    }
    return false;
  };

  // 返回碰撞判定的对象
  Game_CharacterBase.prototype.collideTargets = function() {
    return $gameMap.events().concat($gamePlayer);
  };

  // 添加碰撞的对象
  Game_CharacterBase.prototype.addCollideId = function(id) {
    if (this._collideIds.indexOf(id) == -1) {
      this._collideIds.push(id);
      this.checkEventTriggerCollide(id);
    }
  };

  // 站立(下地?)
  Game_CharacterBase.prototype.getLand = function(y) {
    this._realY = y;
    this._vy = 0;
    this.resetJump();
    if (this._ladder) {
      this.getOffLadder();
    }
  };
  // 跳数复位

  Game_CharacterBase.prototype.resetJump = function() {
    this._jumpCount = this._mulchJump;
    this._jumpInput = 0;
  };

  // 游泳状态
  Game_CharacterBase.prototype.updateSwiming = function() {
    this._lastSwim = !this._lastSwim;
  };

  // 笔直移动
  Game_CharacterBase.prototype.moveStraight = function(d) {
    this.setDirection(d);
    this._moveCount = Math.floor(1 / this._moveSpeed);
    switch (d) {
    case 2:
      this._vy = this._moveSpeed;
      return;
    case 4:
      this._vx = -this._moveSpeed;
      return;
    case 6:
      this._vx = this._moveSpeed;
      return;
    default:
      this._vy = -this._moveSpeed;
      return;
    }
  };

  // 跳跃
  Game_CharacterBase.prototype.jump = function(xPlus, yPlus) {
    if (this._jumpCount <= 0) {
      return;
    }
    this._jumpCount--;
    if (xPlus < 0) {
      this.setDirection(4);
      var speed = this._moveSpeed / 100 + 0.02;
      this._moveCount = Math.floor(1 / speed);
      this._vx = -speed;
    } else if (xPlus > 0) {
      this.setDirection(6);
      var speed = this._moveSpeed / 100 + 0.02;
      this._moveCount = Math.floor(1 / speed);
      this._vx = speed;
    }
    if (yPlus != 0) {
      this._vy = -Math.abs(yPlus) / 100;
    } else {
      this._vy = this.isSwimming() ? -this._swimJump : -this._jumpSpeed;
    }
    this.resetStopCount();
    this.straighten();
  };

  // ————————————————
  Game_CharacterBase.prototype.dash = function(direction) {
    this._dashCount = this._dashCountTime;
    if (direction == 4) {
      this._vx = -this._dashSpeedX;
    } else {
      this._vx = this._dashSpeedX;
    }
    this._vy = -this._dashSpeedY;
    this._moveCount = this._dashCount / 2;
    this.resetStopCount();
    this.straighten;
  };

  // 弹簧
  Game_CharacterBase.prototype.flick = function(user) {
    if (Tomoaky.Param.JAFlickSkill > 0 && user.isBattler() && this.isBattler()) {
      this.applySkill(user, Tomoaky.Param.JAFlickSkill);
    }
    this._vx = user._vx;
    var n = 1 + (user._weight - this._weight - Tomoaky.Param.JAFlickWeight) / 2;
    this._moveCount = Math.floor(n / Math.abs(this._vx));
    AudioManager.playSe(Tomoaky.Param.JASeFlick);
  };

  // 应用技能
  Game_CharacterBase.prototype.applySkill = function(user, skillId) {
    user.battler().clearActions();
    var action = new Game_Action(user.battler());
    action.setSkill(skillId);
    user.battler().setAction(0, action);
    user.battler().action(0).apply(this.battler());
  };

  // 伤害的处理
  Game_CharacterBase.prototype.updateDamage = function() {
    this.battler().clearResult();
    if (this.battler()._actionResult.hpDamage != 0) {
      this.battler()._actionResult.hpAffected = true;
      this.battler()._actionResult.missed = false;
      this.battler()._actionResult.evaded = false;
      this.damaged();
      if (this.battler()._actionResult.hpDamage > 0) {
        if (this.battler().isActor()) {
          SoundManager.playActorDamage();
        } else {
          SoundManager.playEnemyDamage();
        }
      } else {
        SoundManager.playRecovery();
      }
    } else if (this.battler()._actionResult.missed ||
               this.battler()._actionResult.evaded) {
      this.damaged();
      SoundManager.playMiss();
    }
    if (this.battler()._actionResult.isStatusAffected()) {
      this.requestRefresh();
    }
  };

  // 伤害后的处理
  Game_CharacterBase.prototype.damaged = function() {
  //  if (this.isLocking()) {
  //    return;
  //  }
    this.battler().startDamagePopup();
    if (this.battler()._actionResult.isStateAdded(this.battler().deathStateId())) {
      this.battlerDead();
    }
  };

  // 设置坐标
  Game_CharacterBase.prototype.setPosition = function(x, y) {
    this._x = Math.floor(x);
    this._y = Math.floor(y);
    this._realX = x;
    this._realY = y;
  };

  // 移动到指定位置
  var _Game_CharacterBase_locate = Game_CharacterBase.prototype.locate;
  Game_CharacterBase.prototype.locate = function(x, y) {
    _Game_CharacterBase_locate.call(this, x, y);
    this._vx = 0;
    this._vy = 0;
    this._lastY = -1;
    this._lastSwim = this.isSwimming();
    this._collideIds = [];
  };

  // 设置地图弹出
  Game_CharacterBase.prototype.setMapPopup = function(text, color, ry, dy, g) {
    var popup = {};
    popup.text = text;
    popup.color = color;
    popup.ry = ry === undefined ? -40 : ry;
    popup.dy = dy === undefined ? -4 : dy;
    popup.g = g === undefined ? 0.5 : g;
    this._mapPopups.push(popup);
  };
  
  // 判断地图是否已弹出
  Game_CharacterBase.prototype.isMapPopupExist = function() {
    return this._mapPopups.length > 0;
  };

  // 返回弹出的地图
  Game_CharacterBase.prototype.getMapPopup = function() {
    return this._mapPopups.shift();
  };

  //-----------------------------------------------------------------------------
  // Game_Character
  //

  // 随机移动
  Game_Character.prototype.moveRandom = function() {
    if (this._gravity == 0) {
      this.moveStraight(2 + Math.randomInt(4) * 2);
    } else {
      this.moveStraight(4 + Math.randomInt(2) * 2);
    }
  };

  // 面向角色
  Game_Character.prototype.turnTowardCharacter = function(character) {
      var sx = this._realX - character._realX;
      var sy = this._realY - character._realY;
      if (Math.abs(sx) > Math.abs(sy)) {
          this.setDirection(sx > 0 ? 4 : 6);
      } else if (sy !== 0) {
          this.setDirection(sy > 0 ? 8 : 2);
      }
  };

  // 背向角色
  Game_Character.prototype.turnAwayFromCharacter = function(character) {
      var sx = this._realX - character._realX;
      var sy = this._realY - character._realY;
      if (Math.abs(sx) > Math.abs(sy)) {
          this.setDirection(sx > 0 ? 6 : 4);
      } else if (sy !== 0) {
          this.setDirection(sy > 0 ? 2 : 8);
      }
  };

  //-----------------------------------------------------------------------------
  // Game_Player
  //

  // 成员变量初始化
  var _Game_Player_initMembers = Game_Player.prototype.initMembers;
  Game_Player.prototype.initMembers = function() {
    _Game_Player_initMembers.call(this);
    this._memberIndex = 0;
    this._realSteps = 0;
    this._wallJump = false;
    this._dashDelay = 0;
    this._dashDelayTime = 30;
  };

  // 获取画面中央的X
  Game_Player.prototype.centerX = function() {
      return (Graphics.width / $gameMap.tileWidth() - 1) / 2.0 + 0.5;
  };

  // 获取画面中央的Y
  Game_Player.prototype.centerY = function() {
      return (Graphics.height / $gameMap.tileHeight() - 1) / 2.0 + 0.5;
  };

  // 返回事件ID
  Game_Player.prototype.eventId = function() {
    return -1;
  };

  // 拿到主角
  Game_Player.prototype.actor = function() {
    return $gameParty.allMembers()[this._memberIndex];
  };

  // 战斗
  Game_Player.prototype.battler = function() {
    return this.actor();
  };

  // 是否设置追踪器
  Game_Player.prototype.isBattler = function() {
    return this.actor() ? true : false;
  };

  // 小号状态判定
  Game_Player.prototype.isDashing = function() {
    return this._dashCount > 0;
  };

  // 返回冲刺的对象
  Game_Player.prototype.collideTargets = function() {
    return $gameMap.events();
  };

  // 抓住梯子
  Game_Player.prototype.getOnLadder = function(downFlag) {
    this._ladder = true;
    this._landingObject = null;
    this.setDirection(8);
    var lastRealX = this._realX;
    this._realX = Math.floor(this._realX) + 0.5;
    if (downFlag) {
      this._realY += 0.04;
    }
    this._lastY = Math.floor(this._realY + Tomoaky.Param.JATileMarginTop);
    if (lastRealX < this._realX) {
      this.collideCharacterLeft();
    } else if (lastRealX > this._realX) {
      this.collideCharacterRight();
    }
    this._vx = 0;
    this._vy = 0;
    this.resetJump();
  };

  // 从梯子上下来
  Game_Player.prototype.getOffLadder = function() {
    this._ladder = false;
    this.setDirection(Input.isPressed('left') ? 4 : 6);
  };

  // 开始碰撞
  Game_Player.prototype.checkEventTriggerCollide = function(id) {
    if (!$gameMap.isEventRunning()) {
      var event = $gameMap.event(id);
  //    if (event.isTriggerIn([1, 2]) && event.isNormalPriority() === normal) {
      if (event.isTriggerIn([1, 2])) {
        event.start();
      }
    }
  };

  // 框架更新
  Game_Player.prototype.update = function(sceneActive) {
    var lastScrolledX = this.scrolledX();
    var lastScrolledY = this.scrolledY();
    if (this.isLocking()) {
      this.updateLock();
    } else {
      if (sceneActive && this.canMove()) {
        this.updateInput();
      }
      var lastRealX = this._realX;
      var lastRealY = this._realY;
      Game_Character.prototype.update.call(this);
      this.updateSteps(lastRealX, lastRealY);
    }
    this.updateScroll(lastScrolledX, lastScrolledY);
    if (this.isBattler()) {
      this.updateDamage();
    }
  //  this._followers.update();
  };

  // 输入处理
  Game_Player.prototype.updateInput = function() {
    this.changeByInput();
    this.moveByInput();
    this.jumpByInput();
    this.dashByInput();
    this.triggerButtonAction();
  };

  // 重力处理
  Game_Player.prototype.updateGravity = function() {
    if (!this._ladder) {
      Game_CharacterBase.prototype.updateGravity.call(this);
    }
  };

  // 摩擦处
  Game_Player.prototype.updateFriction = function() {
    Game_Character.prototype.updateFriction.call(this);
    this._friction = 0;
    if (this._ladder) {
      var n = this.isMoving() ? 0 : Tomoaky.Param.JAFriction;
      if (this._vy != 0) {
        if (this._vy > 0) {
          this._vy = Math.max(this._vy - n, 0);
        } else {
          this._vy = Math.min(this._vy + n, 0);
        }
      }
    } else {
      // 如果不是小跑状态,设置为不超过移动速度
      if (!this.isDashing()) {
        var n = this.isSwimming() ? this._swimSpeed : this._moveSpeed;
        if (this._vx < -n) {
          this._vx = Math.min(this._vx + 0.005, -n);
        } else if (this._vx > n) {
          this._vx = Math.max(this._vx - 0.005, n);
        }
      }
      if (this.isLanding()) {
        var n = Tomoaky.Param.JAFriction;
        switch (this._landingRegion) {
        case Tomoaky.Param.JASlipFloorRegion:
          this._friction = 0.0025;
          return;
        case Tomoaky.Param.JARoughFloorRegion:
          if (Math.abs(this._vx) > this._moveSpeed / 2) {
            this._vx = this._vx > 0 ? this._moveSpeed / 2 : -this._moveSpeed / 2;
          }
          break;
        case Tomoaky.Param.JAMarshFloorRegion:
          this._vx = 0;
          return;
        }
        if (!this.isMoving()) {
          if (this._vx > 0) {
            this._vx = Math.max(this._vx - n, 0);
          } else if (this._vx < 0) {
            this._vx = Math.min(this._vx + n, 0);
          }
        }
      }
    }
  };

  //移动计数处理
  Game_Player.prototype.updateMoveCount = function() {
    this._moveCount--;
  };

  // 锁定状态处理
  Game_Player.prototype.updateLock = function() {
    this._lockCount--;
    if (this._lockCount == 0) {
      if (this.battler().isDead()) {
        this.changeMember(1);
      }
    }
  };

  // 通过输入按钮来改变操作
  Game_Player.prototype.changeByInput = function() {
    if (Input.isTriggered('pageup')) {
      this.changeMember(-1);
    } else if (Input.isTriggered('pagedown')) {
      this.changeMember(1);
    }
  };

  // 切换人物
  Game_Player.prototype.changeMember = function(shift) {
    if ($gameParty.isAllDead()) {
      return;
    }
    this._memberIndex = (this._memberIndex + shift + $gameParty.size()) % $gameParty.size();
    while (this.actor().isDead()) {
      this._memberIndex = (this._memberIndex + shift + $gameParty.size()) % $gameParty.size();
    }
    this.refresh();
    this.battler().requestEffect('appear');
    AudioManager.playSe(Tomoaky.Param.JASeChange);
  };

  // 通过输入方向按钮的移动处理
  Game_Player.prototype.moveByInput = function() {
    if (this._ladder) {
      if (Input.isPressed('up')) {
        this.setDirection(8);
        this._vy = Math.max(this._vy - this._ladderAccele, -this._ladderSpeed);
        this._moveCount = 4;
        this.resetStopCount();
      } else if (Input.isPressed('down')) {
        this.setDirection(8);
        this._vy = Math.min(this._vy + this._ladderAccele, this._ladderSpeed);
        this._moveCount = 4;
        this.resetStopCount();
      }
      if (!this.isCollideLadder(false)) {
        this.getOffLadder();
      }
    } else {
      if (!this.isDashing()) {
        if (Input.isPressed('left')) {
          this.setDirection(4);
          if (this._vx > -this._moveSpeed) {
            var accele = Math.max(this._accele - this._friction, 0);
            this._vx = Math.max(this._vx - accele, -this._moveSpeed);
          }
          this._moveCount = 4;
        } else if (Input.isPressed('right')) {
          this.setDirection(6);
          if (this._vx < this._moveSpeed) {
            var accele = Math.max(this._accele - this._friction, 0);
            this._vx = Math.min(this._vx + accele, this._moveSpeed);
          }
          this._moveCount = 4;
        }
      }
      if (Input.isPressed('up')) {
        if (this.isCollideLadder(false)) {
          this.getOnLadder(false);
        }
      } else if (Input.isPressed('down')) {
        if (this.isCollideLadder(true)) {
          this.getOnLadder(true);
        }
      }
    }
  };

  // 按钮输入的跳跃处理
  Game_Player.prototype.jumpByInput = function() {
    if (this._jumpInput > 0) {
      this._jumpInput--;
      if (Input.isPressed('jump')) {
        this._vy = -this._jumpSpeed;
      } else {
        this._jumpInput = 0;
      }
    }
    if (Input.isTriggered('jump')) {
      if (this.isSwimming()) {
        this.resetJump();
        this._jumpCount--;
      } else if (this._jumpCount > 0) {
        this._jumpCount--;
      } else {
        if (!this._wallJump) {
          return;
        }
        if (this._direction == 4) {
          var x = Math.floor(this._realX - this._collideW - 0.16);
        } else {
          var x = Math.floor(this._realX + this._collideW + 0.16);
        }
        var y = Math.floor(this._realY);
        if (!$gameMap.canWallJump(x, y, this._direction)) {
          return;
        }
        this.wallJump();
      }
      if (this._ladder) {
        this.getOffLadder();
        if (Input.isPressed('down')) {
          return;
        }
      }
      this._jumpInput = this._jumpInputTime;
      if (this.isDashing()) {
        this._dashCount = this._dashCountTime;
        this._vx = this._direction == 4 ? -this._dashSpeedX : this._dashSpeedX
      }
      this._vy = this.isSwimming() ? -this._swimJump : -this._jumpSpeed;
      this.resetStopCount();
      this.straighten();
      AudioManager.playSe(Tomoaky.Param.JASeJump);
    }
  };

  // 墙跳跃X方向处理
  Game_Player.prototype.wallJump = function() {
    this._vx = this._direction == 4 ? this._moveSpeed : -this._moveSpeed;
    this.setDirection(this.reverseDir(this._direction));
  };

  // 按钮输入的冲刺处理
  Game_Player.prototype.dashByInput = function() {
    if (this._dashDelay > 0) {
      this._dashDelay--;
    } else {
      if (Input.isTriggered('dash') && !this.isSwimming()) {
        if (!$gameMap.isDashDisabled()) {
          if (this._ladder) {
            this.getOffLadder()
            if (Input.isPressed('left')) {
              this.setDirection(4);
            } else if (Input.isPressed('right')) {
              this.setDirection(6);
            }
          } else {
            if (!this._direction == 4) {
              this.setDirection(6);
            }
          }
          this.dash(this._direction);
          this._dashDelay = this._dashDelayTime;
          AudioManager.playSe(Tomoaky.Param.JASeDash);
        }
      }
    }
  };

  // 步数处理
  Game_Player.prototype.updateSteps = function(lastRealX, lastRealY) {
    this._realSteps += Math.max(Math.abs(this._realX - lastRealX), Math.abs(this._realY - lastRealY));
    if (this._realSteps >= 1) {
      if (this.isNormal()) {
        $gameParty.increaseSteps();
        if (this.actor()) {
          this.actor().onPlayerWalk();
        }
      }
      this._realSteps = 0;
    }
  };

  // 游泳状态更新
  Game_Player.prototype.updateSwiming = function() {
    Game_Character.prototype.updateSwiming.call(this);
    AudioManager.playSe(Tomoaky.Param.JASeSwim);
  };

  // 启动地图事件
  Game_Player.prototype.startMapEvent = function(triggers, normal) {
    if (!$gameMap.isEventRunning()) {
      var targets = this.collideTargets();
      for (var i = 0; i < targets.length; i++) {
        var character = targets[i];
        if (this.isCollide(character)) {
          if (character.isTriggerIn(triggers) && character.isNormalPriority() === normal) {
            if (character.isBattler() && character.battler().isDead()) {
              continue;
            }
            character.start();
          }
        }
      }
    }
  };

  // 正在接触的事件的起动判定
  Game_Player.prototype.checkEventTriggerHere = function(triggers) {
      if (this.canStartLocalEvents()) {
          this.startMapEvent(triggers, false);
      }
  };

  // 正面接触的事件判定
  Game_Player.prototype.checkEventTriggerThere = function(triggers) {
    var lastRealX = this._realX;
    this._realX += this._direction == 4 ? -this._collideW : this._collideW
    this.startMapEvent(triggers, true);
    this._realX += this._direction == 4 ? -0.5 : 0.5;
    if (!$gameMap.isAnyEventStarting() && $gameMap.isCounter(Math.floor(this._realX), this._y)) {
      this._realX += this._direction == 4 ? -0.5 : 0.5;
      this.startMapEvent(triggers, true);
    }
    this._realX = lastRealX;
  };

  // はしごと接触しているか
  Game_Player.prototype.isCollideLadder = function(downFlag) {
    var x = Math.floor(this._realX);
    if (downFlag) {
      if (!this.isLanding()) {
        return false;
      }
      var y = Math.floor(this._realY + Tomoaky.Param.JATileMarginTop + 0.1);
      return $gameMap.isLadder(x, y);
    } else {
      var ty = Math.floor(this._realY - this._collideH);
      var by = Math.floor(this._realY + Tomoaky.Param.JATileMarginTop);
      for (var y = ty; y <= by; y++) {
        if ($gameMap.isLadder(x, y)) {
          return true;
        }
      }
      return false;
    }
  };

  // 移动场景
  Game_Player.prototype.performTransfer = function() {
    if (this.isTransferring()) {
      this.setDirection(this._newDirection);
      if (this._newMapId !== $gameMap.mapId() || this._needsMapReload) {
        $gameMap.setup(this._newMapId);
        this._needsMapReload = false;
      }
      this.locate(this._newX + 0.5, this._newY + 0.99 - Tomoaky.Param.JATileMarginTop);
      this.refresh();
      this.clearTransferInfo();
    }
  };

  // 恢复状态
  Game_Player.prototype.refresh = function() {
    var actor = this.actor();
    if (actor) {
      var characterName = actor.characterName();
      var characterIndex = actor.characterIndex();
      this._moveSpeed = actor.loadTagParam('move_speed', 0.05);
      this._jumpSpeed = actor.loadTagParam('jump_speed', 0.14);
      this._swimSpeed = actor.loadTagParam('swim_speed', 0.02);
      this._ladderSpeed = actor.loadTagParam('ladder_speed', 0.04);
      this._accele = actor.loadTagParam('accele', 0.003);
      this._ladderAccele = actor.loadTagParam('ladder_accele', 0.003);
      this._jumpInputTime = actor.loadTagParam('jump_input', 0);
      this._swimJump = actor.loadTagParam('swim_jump', 0.1);
      this._mulchJump = actor.loadTagParam('mulch_jump', 1);
      this._weight = actor.loadTagParam('weight', 0);
      this._gravity = actor.loadTagParam('gravity', 0.0045);
      this._wallJump = actor.loadTagBool('wall_jump');
      this._dashSpeedX = actor.loadTagParam('dash_speed_x', 0.14);
      this._dashSpeedY = actor.loadTagParam('dash_speed_y', 0.03);
      this._dashCountTime = actor.loadTagParam('dash_count', 15);
      this._dashDelayTime = actor.loadTagParam('dash_delay', 30);
    } else {
      var characterName = '';
      var characterIndex = 0;
    }
    this.setImage(characterName, characterIndex);
    this._followers.refresh();
    this._needsRefresh = false;
  };

  // 飞行器降落
  Game_Player.prototype.getOnOffVehicle = function() {
    return false;
  };

  // 笔直移动
  Game_Player.prototype.moveStraight = function(d) {
    Game_Character.prototype.moveStraight.call(this, d);
  };

  // 再起不能处理方法
  Game_Player.prototype.battlerDead = function() {
    this._lockCount = 32;
    this.battler().requestEffect('collapse');
    SoundManager.playActorCollapse();
    if ($gameParty.isAllDead()) {
      $gameTemp.reserveCommonEvent(Tomoaky.Param.JAAllDeadEvent);
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Event
  //

  // 初期化
  Game_Event.prototype.initialize = function(mapId, eventId) {
      Game_Character.prototype.initialize.call(this);
      this._mapId = mapId;
      this._eventId = eventId;
      this._repopCount = 0;
      this.locate(this.event().x + 0.5, this.event().y + 1);
      this.refresh();
  };

  // 成员变量的初始化
  var _Game_Event_initMembers = Game_Event.prototype.initMembers;
  Game_Event.prototype.initMembers = function() {
    _Game_Event_initMembers.call(this);
    this._enemyId = 0;
    this._battler = null;
    this._deadSelfSwitch = null;
    this._commentParams = {};
  };

  // 取得方法
  Game_Event.prototype.battler = function() {
    return this._battler;
  };

  // 启动碰撞事件
  Game_Event.prototype.checkEventTriggerCollide = function(id) {
    if (!$gameMap.isEventRunning() && id < 0) {
      if (this.isTriggerIn([1, 2]) && this.isNormalPriority() === normal) {
        this.start();
      }
    }
  };

  // 恢复状态
  var _Game_Event_refresh = Game_Event.prototype.refresh;
  Game_Event.prototype.refresh = function() {
    _Game_Event_refresh.call(this);
    this._needsRefresh = false;
  };

  // 设置事件页面
  var _Game_Event_setupPage = Game_Event.prototype.setupPage;
  Game_Event.prototype.setupPage = function() {
    _Game_Event_setupPage.call(this);
    if (this._pageIndex >= 0) {
      this._enemyId  = Number(this.loadTagParam('enemy')) || 0;
      this._deadSelfSwitch = this.loadTagParam('dead');
      this._repopTimer = Number(this.loadTagParam('repop')) || 0;
      if (this._repopTimer > 0) {
        this._repopCount = this._repopTimer;
      }
      this._collideW = Number(this.loadTagParam('w')) || 0.375;
      this._collideH = Number(this.loadTagParam('h')) || 0.75;
      this._weight   = Number(this.loadTagParam('weight')) || 0;
      var param = this.loadTagParam('gravity');
      this._gravity  = param ? Number(param) : Tomoaky.Param.JAGravity;
      this._lift     = this.loadTagParam('lift') || false;
      this.setupBattler();
    }
  };

  // 战斗设置
  Game_Event.prototype.setupBattler = function() {
    if (this._enemyId > 0) {
      this._battler = new Game_Enemy(this._enemyId, this.eventId(), 0);
    } else {
      this._battler = null;
    }
  };

  // 更新框架
  var _Game_Event_update = Game_Event.prototype.update;
  Game_Event.prototype.update = function() {
    if (this.isLocking()) {
      this.updateLock();
    } else {
      _Game_Event_update.call(this);
      if (this._repopCount > 0) {
        this.updateRepop();
      }
    }
    if (this.isBattler()) {
      this.updateDamage();
    }
  };

  // 摩擦处理
  Game_Event.prototype.updateFriction = function() {
    Game_Character.prototype.updateFriction.call(this);
    if (!this.isMoving() && this._vx != 0) {
      if (!this.isDashing()) {
        var n = this.isSwimming() ? this._swimSpeed : this._moveSpeed;
        if (this._vx < -n) {
          this._vx = Math.min(this._vx + 0.005, -n);
        }
        if (this._vx > n) {
          this._vx = Math.max(this._vx - 0.005, n);
        }
      }
      if (this.isLanding()) {
        var n = Tomoaky.Param.JAFriction;
        switch (this._landingRegion) {
        case Tomoaky.Param.JASlipFloorRegion:
          return;
        case Tomoaky.Param.JARoughFloorRegion:
          if (Math.abs(this._vx) > this._moveSpeed / 2) {
            this._vx = this._vx > 0 ? this._moveSpeed / 2 : -this._moveSpeed / 2;
          }
          break;
        case Tomoaky.Param.JAMarshFloorRegion:
          this._vx = 0;
          return;
        }
        if (this._vx > 0) {
          this._vx = Math.max(this._vx - n, 0);
        } else {
          this._vx = Math.min(this._vx + n, 0);
        }
      }
    }
  };

  // 剪贴计数处理
  Game_Event.prototype.updateRepop = function() {
    this._repopCount--;
    if (this._repopCount === 0) {
      var key = [$gameMap.mapId(), this._eventId, this._deadSelfSwitch];
      if ($gameSelfSwitches.value(key)) {
        $gameSelfSwitches.setValue(key, false);
        this.refresh();
        this.requestAppear();
      }
    }
  };

  // 出现特效的要求
  Game_Event.prototype.requestAppear = function() {
    if (this.isBattler()) {
      if (Tomoaky.Param.JAEventCollapse) {
        this.battler().requestEffect('appear');
      }
    } else {
    }
  };
  
  // 战斗再起不能的处理
  Game_Event.prototype.battlerDead = function() {
    if (Tomoaky.Param.JAEventCollapse) {
      this._lockCount = 32;
      this.battler().requestEffect('collapse');
      SoundManager.playEnemyCollapse();
    } else {
      this._lockCount = 1;
    }
  };

  // 锁定状态
  Game_Event.prototype.updateLock = function() {
    this._lockCount--;
    if (this._lockCount == 0) {
      if (this.battler().isDead()) {
        this.gainRewards();
        if (this._deadSelfSwitch !== null) {
          var key = [$gameMap.mapId(), this._eventId, this._deadSelfSwitch];
          $gameSelfSwitches.setValue(key, true);
          this.refresh();
          this.requestAppear();
        } else {
          this.erase();
        }
      }
    }
  };
  
  // 击杀敌人后处理
  Game_Event.prototype.gainRewards = function() {
    var exp = this.battler().exp();
    if (exp > 0) {
      this.gainRewardExp(exp);
    }
    var gold = this.battler().gold();
    if (gold > 0) {
      this.gainRewardGold(gold);
    }
    var items = this.battler().makeDropItems();
    for (var i = 0; i < items.length; i++) {
      this.gainRewardItem(items[i], -16 - (items.length - i) * 24);
    }
  };

  // 击杀敌人后经验值
  Game_Event.prototype.gainRewardExp = function(exp) {
    $gameParty.allMembers().forEach(function(actor) {
      actor.gainExp(exp);
    });
    this.setMapPopup('' + exp + TextManager.exp, '#ffe0ff', -40, -0.2, 0);
  };
  
  // 击杀敌人后金币
  Game_Event.prototype.gainRewardGold = function(gold) {
    $gameParty.gainGold(gold);
    this.setMapPopup('' + gold + TextManager.currencyUnit, '#ffffe0', -64, -0.2, 0);
  };
  
  // 击杀敌人后道具掉落
  Game_Event.prototype.gainRewardItem = function(item, y) {
    $gameParty.gainItem(item, 1);
    this.setMapPopup('\\I[' + item.iconIndex + ']', '#000000', y, -4, 0.5);
  };
  
  // 游泳状态更新
  Game_Event.prototype.updateSwiming = function() {
    Game_Character.prototype.updateSwiming.call(this);
    if (Tomoaky.Param.JAUseEventSeSwim) {
      var origin_volume = Tomoaky.Param.JASeSwim.volume;
      var volume = Math.floor(origin_volume * ((15 - this.distFromCharacter($gamePlayer))) / 15);
      var se = {};
      se.name = Tomoaky.Param.JASeSwim.name;
      se.volume = Math.min(Math.max(volume, 0), 100);
      se.pitch = Tomoaky.Param.JASeSwim.pitch;
      if (this._realX < $gamePlayer._realX) {
        se.pan = Math.max(Math.floor((this._realX - $gamePlayer._realX) * 10, -100));
      } else {
        se.pan = Math.min(Math.floor((this._realX - $gamePlayer._realX) * 10, 100));
      }
      AudioManager.playSe(se);
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  // 更改事件的位置
  Game_Interpreter.prototype.command203 = function() {
      var character = this.character(this._params[0]);
      if (character) {
          if (this._params[1] === 0) {  // Direct designation
              character.locate(this._params[2] + 0.5, this._params[3] + 1);
          } else if (this._params[1] === 1) {  // Designation with variables
              var x = $gameVariables.value(this._params[2] + 0.5);
              var y = $gameVariables.value(this._params[3] + 1);
              character.locate(x, y);
          } else {  // Exchange with another event
              var character2 = this.character(this._params[2]);
              if (character2) {
                  character.swap(character2);
              }
          }
          if (this._params[4] > 0) {
              character.setDirection(this._params[4]);
          }
      }
      return true;
  };

  // 更换装备
  var _Game_Interpreter_command319 = Game_Interpreter.prototype.command319;
  Game_Interpreter.prototype.command319 = function() {
    _Game_Interpreter_command319.call(this);
    if (!$gameParty.inBattle()) {
      $gamePlayer.requestRefresh();
    }
    return true;
  };

  // 插件命令
  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'JumpAction') {
      switch (args[0]) {
      case 'hp_damage':
        var character = this.character(args[1]);
        if (character && character.isBattler()) {
          character.battler().clearResult();
          character.battler().gainHp(-Number(args[2]));
        }
        break;
      case 'hp':
        var character = this.character(args[1]);
        if (character && character.isBattler()) {
          $gameVariables.setValue(Number(args[2]), character.battler().hp);
        }
        break;
      case 'force_x':
        var character = this.character(args[1]);
        if (character) {
          character._vx = Number(args[2]);
        }
        break;
      case 'force_y':
        var character = this.character(args[1]);
        if (character) {
          character._vy = Number(args[2]);
        }
        break;
      case 'change_actor':
        var actor = $gameActors.actor(Number(args[1]));
        if (actor && actor.isAlive() && $gameParty.members().contains(actor)) {
          var newIndex = $gameParty.members().indexOf(actor);
          if ($gamePlayer._memberIndex != newIndex) {
            $gamePlayer._memberIndex = newIndex;
            $gamePlayer.refresh();
            $gamePlayer.battler().requestEffect('appear');
          }
        }
        break;
      case 'addPopup':
        var character = this.character(args[1]);
        if (character) {
          character.setMapPopup(args[2], args[3]);
        }
        break;
      }
    }
  };

  //-----------------------------------------------------------------------------
  // Sprite_Character
  //

  // 成员变量的初始化
  var _Sprite_Character_initMembers = Sprite_Character.prototype.initMembers;
  Sprite_Character.prototype.initMembers = function() {
    _Sprite_Character_initMembers.call(this);
    this._damages = [];
    this._popups = [];
    this._effectType = null;
    this._effectDuration = 0;
    this._shake = 0;
  };

  // 更新框架
  var _Sprite_Character_update = Sprite_Character.prototype.update;
  Sprite_Character.prototype.update = function() {
    _Sprite_Character_update.call(this);
    this.updateDamagePopup();
    this.updateMapPopup();
    if (this._character.isBattler()) {
      this.updateEffect();
    }
  };

  // 其他更新
  var _Sprite_Character_updateOther = Sprite_Character.prototype.updateOther;
  Sprite_Character.prototype.updateOther = function() {
    if (!this.isEffecting()) {
      _Sprite_Character_updateOther.call(this);
    }
  };

  // 伤害弹出更新
  Sprite_Character.prototype.updateDamagePopup = function() {
    if (this._character.isBattler()) {
      this.setupDamagePopup();
    }
    if (this._damages.length > 0) {
      for (var i = 0; i < this._damages.length; i++) {
        this._damages[i].update();
        this._damages[i].x = this.x;
        this._damages[i].y = this.y;
      }
      if (!this._damages[0].isPlaying()) {
        this.parent.removeChild(this._damages[0]);
        this._damages.shift();
      }
    }
  };

  // 伤害弹出设定
  Sprite_Character.prototype.setupDamagePopup = function() {
    var battler = this._character.battler();
    if (battler.isDamagePopupRequested()) {
      var sprite = new Sprite_MapDamage();
      sprite.x = this.x;
      sprite.y = this.y;
      sprite.z = this.z + 1;
      sprite.setup(battler);
      this._damages.push(sprite);
      this.parent.addChild(sprite);
      battler.clearDamagePopup();
      battler.clearActionResult();
    }
  };

  // 更新弹出到地图
  Sprite_Character.prototype.updateMapPopup = function() {
    this.setupMapPopup();
    if (this._popups.length > 0) {
      for (var i = this._popups.length - 1; i >= 0; i--) {
        this._popups[i].update();
        this._popups[i].x = this.x;
        this._popups[i].y = this.y;
        if (!this._popups[i].isPlaying()) {
          this.parent.removeChild(this._popups[i]);
          this._popups.splice(i, 1);
        }
      }
    }
  };
  
  // 地图弹出设置
  Sprite_Character.prototype.setupMapPopup = function() {
    while (this._character.isMapPopupExist()) {
      var sprite = new Sprite_MapPopup();
      sprite.x = this.x;
      sprite.y = this.y;
      var popup = this._character.getMapPopup();
      var re = /\\I\[(\d+)\]/i;
      var match = re.exec(popup.text);
      if (match) {
        sprite.z = this.z + 1;
        sprite.setup(popup, Number(match[1]));
      } else {
        sprite.z = this.z + 2;
        sprite.setup(popup, -1);
      }
      this._popups.push(sprite);
      this.parent.addChild(sprite);
    }
  };

  // 效果设置
  Sprite_Character.prototype.setupEffect = function() {
    if (this._character.battler().isEffectRequested()) {
      this.startEffect(this._character.battler().effectType());
      this._character.battler().clearEffect();
    }
  };

  // 开始效果
  Sprite_Character.prototype.startEffect = function(effectType) {
    this._effectType = effectType;
    switch (this._effectType) {
    case 'appear':
      this.startAppear();
      break;
    case 'whiten':
      this.startWhiten();
      break;
    case 'blink':
      this.startBlink();
      break;
    case 'collapse':
      this.startCollapse();
      break;
    case 'bossCollapse':
      this.startBossCollapse();
      break;
    }
    this.revertToNormal();
  };

  // 登场
  Sprite_Character.prototype.startAppear = function() {
    this._effectDuration = 16;
  };

  // 登场时白色闪光
  Sprite_Character.prototype.startWhiten = function() {
    this._effectDuration = 16;
  };

  // 闪烁特效
  Sprite_Character.prototype.startBlink = function() {
    this._effectDuration = this._character._invincibleTime;
  };

  // 崩溃特效
  Sprite_Character.prototype.startCollapse = function() {
    this._effectDuration = 32;
    this._appeared = false;
  };

  // BOSS崩溃特效
  Sprite_Character.prototype.startBossCollapse = function() {
    this._effectDuration = this.bitmap.height;
    this._appeared = false;
  };

  // 更新效果
  Sprite_Character.prototype.updateEffect = function() {
    this.setupEffect();
    if (this._effectDuration > 0) {
      this._effectDuration--;
      switch (this._effectType) {
      case 'appear':
        this.updateAppear();
        break;
      case 'whiten':
        this.updateWhiten();
        break;
      case 'blink':
        this.updateBlink();
        break;
      case 'collapse':
        this.updateCollapse();
        break;
      case 'bossCollapse':
        this.updateBossCollapse();
        break;
      }
      if (this._effectDuration === 0) {
        this._effectType = null;
        this.setBlendColor([0, 0, 0, 0]);
      }
    }
  };

  // 是否正在执行效果
  Sprite_Character.prototype.isEffecting = function() {
    return this._effectType !== null;
  };

  // 撤消特效的效果设置
  Sprite_Character.prototype.revertToNormal = function() {
    this._shake = 0;
    this.blendMode = 0;
    this.opacity = 255;
    this.setBlendColor([0, 0, 0, 0]);
  };

  // 更新出现效果
  Sprite_Character.prototype.updateAppear = function() {
    this.opacity = (16 - this._effectDuration) * 16;
  };

  // 更新白色闪光效果
  Sprite_Character.prototype.updateWhiten = function() {
    var alpha = 128 - (16 - this._effectDuration) * 10;
    this.setBlendColor([255, 255, 255, alpha]);
  };

  // 更新闪烁效果
  Sprite_Character.prototype.updateBlink = function() {
    this.opacity = (this._effectDuration % 10 < 5) ? 255 : 0;
  };

  // 更新崩溃效果
  Sprite_Character.prototype.updateCollapse = function() {
    this.blendMode = Graphics.BLEND_ADD;
    this.setBlendColor([255, 128, 128, 128]);
    this.opacity *= this._effectDuration / (this._effectDuration + 1);
  };

  // BOSS崩溃效果更新
  Sprite_Character.prototype.updateBossCollapse = function() {
    this._shake = this._effectDuration % 2 * 4 - 2;
    this.blendMode = Graphics.BLEND_ADD;
    this.opacity *= this._effectDuration / (this._effectDuration + 1);
    this.setBlendColor([255, 255, 255, 255 - this.opacity]);
    if (this._effectDuration % 20 === 19) {
      SoundManager.playBossCollapse2();
    }
  };

  //-----------------------------------------------------------------------------
  // Sprite_MapDamage
  //

  function Sprite_MapDamage() {
    this.initialize.apply(this, arguments);
  }

  Sprite_MapDamage.prototype = Object.create(Sprite_Damage.prototype);
  Sprite_MapDamage.prototype.constructor = Sprite_MapDamage;

  // 设置
  Sprite_MapDamage.prototype.setup = function(target) {
    var result = target._actionResult;
    if (result.missed || result.evaded) {
      this.createMiss();
    } else if (result.hpAffected) {
      this.createDigits(0, result.hpDamage);
    } else if (target.isAlive() && result.mpDamage !== 0) {
      this.createDigits(2, result.mpDamage);
    }
    if (result.critical) {
      this.setupCriticalEffect();
    }
  };

  //-----------------------------------------------------------------------------
  // Sprite_MapPopup
  //

  function Sprite_MapPopup() {
    this.initialize.apply(this, arguments);
  }

  Sprite_MapPopup.prototype = Object.create(Sprite.prototype);
  Sprite_MapPopup.prototype.constructor = Sprite_MapPopup;

  Sprite_MapPopup.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._duration = 150;
  };

  Sprite_MapPopup.prototype.setup = function(popup, iconIndex) {
    var sprite = new Sprite();
    if (iconIndex >= 0) {
      sprite.bitmap = ImageManager.loadSystem('IconSet');
      var pw = Window_Base._iconWidth;
      var ph = Window_Base._iconHeight;
      var sx = iconIndex % 16 * pw;
      var sy = Math.floor(iconIndex / 16) * ph;
      sprite.setFrame(sx, sy, pw, ph);
    } else {
      sprite.bitmap = new Bitmap(160, 32);
      sprite.bitmap.outlineColor = 'black';
      sprite.bitmap.outlineWidth = 5;
      sprite.bitmap.fontSize = 28;
      sprite.bitmap.textColor = popup.color;
      sprite.bitmap.drawText(popup.text, 0, 0, 160, 32, 'center');
    }
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 1;
    sprite.y = popup.ry;
    sprite.ry = sprite.y;
    sprite.by = sprite.y + 40;
    sprite.dy = popup.dy;
    sprite.g = popup.g;
    this.addChild(sprite);
  };

  Sprite_MapPopup.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this._duration > 0) {
      this._duration--;
      for (var i = 0; i < this.children.length; i++) {
        var sprite = this.children[i];
        sprite.dy += sprite.g;
        sprite.ry += sprite.dy;
        if (sprite.ry >= sprite.by) {
            sprite.ry = sprite.by;
            sprite.dy *= -0.6;
        }
        sprite.y = Math.round(sprite.ry);
      }
    }
    this.updateOpacity();
  };

  Sprite_MapPopup.prototype.updateOpacity = function() {
    if (this._duration < 10) {
        this.opacity = 255 * this._duration / 10;
    }
  };

  Sprite_MapPopup.prototype.isPlaying = function() {
    return this._duration > 0;
  };

  //-----------------------------------------------------------------------------
  // Spriteset_Map
  //

  // 生成飞行船的影子
  Spriteset_Map.prototype.createShadow = function() {
  };

  // 更新飞行船的影子
  Spriteset_Map.prototype.updateShadow = function() {
  };

  //-----------------------------------------------------------------------------
  // Scene_Map
  //

  var _Scene_Map_start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function() {
    _Scene_Map_start.call(this);
    $gamePlayer.refresh();
  };

  Scene_Base.prototype.checkGameover = function() {
  };

  Scene_Map.prototype.processMapTouch = function() {
  };

})();
