//=============================================================================
// TMVplugin - HP显示(跳跃动作扩展)
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 0.3b
// 最終更新日: 2016/01/19
//=============================================================================

/*:
 * @plugindesc 地图上显示脸部图形和HP槽。
 * (必须将JumpAction引入)
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param Gauge Window X
 * @desc HP槽窗口的X坐标。
 * 初期値: 0
 * @default 0
 *
 * @param Gauge Window Y
 * @desc HP槽窗口的Y坐标。
 * 初期値: 0
 * @default 0
 *
 * @param Gauge Offset X
 * @desc HP槽X坐标校正值。
 * 初期値: 12
 * @default 12
 *
 * @param Gauge Offset Y
 * @desc HP槽Y坐标校正值。
 * 初期値: 0
 * @default 0
 *
 * @param Face Offset X
 * @desc 面部图形X坐标校正值。
 * 初期値: -4
 * @default -4
 *
 * @param Face Offset Y
 * @desc 面部图形Y坐标校正值。
 * 初期値: -4
 * @default -4
 *
 * @param Shake Time
 * @desc 受到损坏的时候摇晃窗口的时间。
 * 初期値: 20（ 0不会动摇）
 * @default 20
 *
 * @param Start Visible
 * @desc 游戏开始时的显示状态。
 * 初期値: 1（ 0 隐藏）
 * @default 1
 *
 * @param Collide Opacity
 * @desc 与玩家重叠时的不透明度
 * 初期値: 128（ 0 ～ 255 ）
 * @default 128
 *
 * @param messageBusyHide
 * @desc 在显示消息窗口时隐藏日志窗口。
 * 初期値: 1（ 0 で隠さない）
 * @default 1
 *
 * @param eventBusyHide
 * @desc イベント起動中はログウィンドウを隠す。
 * 初期値: 1（ 0 不隐藏）
 * @default 1
 *
 * @help 大致意思是MV的plugin-跳跃动作Ver0.2b以上

*需要把这个插件丢到plugin文件夹下面

 *
 * 插件命令:
 *   JumpAction show_hp_gauge      # 显示HP
 *   JumpAction hide_hp_gauge      # 隐藏HP
 */

var Imported = Imported || {};
Imported.TMJAHpGauge = true;

var Tomoaky = Tomoaky || {};

Tomoaky.Parameters = PluginManager.parameters('TMJAHpGauge');
Tomoaky.Param = Tomoaky.Param || {};

Tomoaky.Param.JAHGGaugeWindowX = Number(Tomoaky.Parameters['Gauge Window X']);
Tomoaky.Param.JAHGGaugeWindowY = Number(Tomoaky.Parameters['Gauge Window Y']);
Tomoaky.Param.JAHGGaugeOffsetX = Number(Tomoaky.Parameters['Gauge Offset X']);
Tomoaky.Param.JAHGGaugeOffsetY = Number(Tomoaky.Parameters['Gauge Offset Y']);
Tomoaky.Param.JAHGFaceOffsetX = Number(Tomoaky.Parameters['Face Offset X']);
Tomoaky.Param.JAHGFaceOffsetY = Number(Tomoaky.Parameters['Face Offset Y']);
Tomoaky.Param.JAHGShakeTime = Number(Tomoaky.Parameters['Shake Time']);
Tomoaky.Param.JAHGStartVisible = Tomoaky.Parameters['Start Visible'] === '1' ? true : false;
Tomoaky.Param.JAHGCollideOpacity = Number(Tomoaky.Parameters['Collide Opacity']);
Tomoaky.Param.JAHGMessageBusyHide = Tomoaky.Parameters['messageBusyHide'] === '1' ? true : false;
Tomoaky.Param.JAHGEventBusyHide = Tomoaky.Parameters['eventBusyHide'] === '1' ? true : false;

(function() {

  //-----------------------------------------------------------------------------
  // Game_System
  //

  Game_System.prototype.isVisibleMapHpGauge = function() {
    if (this._visibleMapHpGauge === undefined) {
      this._visibleMapHpGauge = Tomoaky.Param.JAHGStartVisible;
    }
    return this._visibleMapHpGauge;
  };
  
  Game_System.prototype.setVisibleMapHpGauge = function(flag) {
    this._visibleMapHpGauge = flag;
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  // Change Party Member
  var _Game_Interpreter_command129 = Game_Interpreter.prototype.command129;
  Game_Interpreter.prototype.command129 = function() {
    _Game_Interpreter_command129.call(this);
    if (this._params[1] === 0) {
      var actor = $gameActors.actor(this._params[0]);
      var bitmap = ImageManager.loadFace(actor._faceName);
    }
    return true;
  };

  // 插件命令
  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'JumpAction') {
      switch (args[0]) {
      case 'show_hp_gauge':
        $gameSystem.setVisibleMapHpGauge(true);
        break;
      case 'showHpGauge':
        $gameSystem.setVisibleMapHpGauge(true);
        break;
      case 'hide_hp_gauge':
        $gameSystem.setVisibleMapHpGauge(false);
        break;
      case 'hideHpGauge':
        $gameSystem.setVisibleMapHpGauge(false);
        break;
      }
    }
  };

  //-----------------------------------------------------------------------------
  // Window_MapHpGauge
  //

  function Window_MapHpGauge() {
    this.initialize.apply(this, arguments);
  }

  Window_MapHpGauge.prototype = Object.create(Window_Base.prototype);
  Window_MapHpGauge.prototype.constructor = Window_MapHpGauge;

  Window_MapHpGauge.prototype.initialize = function() {
    var x = Tomoaky.Param.JAHGGaugeWindowX;
    var y = Tomoaky.Param.JAHGGaugeWindowY;
    var wight = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, wight, height);
    this.openness = $gameSystem.isVisibleMapHpGauge() ? 255 : 0;
    this.opacity = 255;
    this.contentsOpacity = 255;
    this._hp = -1;
    this._mhp = -1;
    this._actorId = -1;
    this._shakeDuration = 0;
    this._baseX = x;
    this.loadImages();
    this.refresh();
  };

  // 获取窗口宽度
  Window_MapHpGauge.prototype.windowWidth = function() {
    return 288;
  };

  // 获取窗口的高度
  Window_MapHpGauge.prototype.windowHeight = function() {
    return 64;
  };

  // 填充
  Window_MapHpGauge.prototype.standardPadding = function() {
    return 0;
  };

  // 载入图像
  Window_MapHpGauge.prototype.loadImages = function() {
      $gameParty.members().forEach(function(actor) {
          ImageManager.loadFace(actor.faceName());
      }, this);
  };

  // 更新框架
  Window_MapHpGauge.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    var visible = this.isVisible();
    if (visible) {
      this.open();
      if (this.isNeedRefresh()) {
        var actor = $gamePlayer.actor();
        if (this._hp > actor.hp && this._actorId === actor.actorId()) {
          this._shakeDuration = Tomoaky.Param.JAHGShakeTime;
        }
        this._hp = actor.hp;
        this._mhp = actor.mhp;
        this._actorId = actor.actorId();
        this.refresh();
      }
      if (this._shakeDuration > 0) {
        this._shakeDuration--;
        this.x = this._baseX;
        if (this._shakeDuration > 0) {
          this.x += Math.floor(Math.sin((this._shakeDuration % 10) * Math.PI / 5) * 8);
        }
      }
      this.updateOpacity();
    } else {
      this.close();
    }
  };

  // 返回是否需要恢复状态
  Window_MapHpGauge.prototype.isNeedRefresh = function() {
    var actor = $gamePlayer.actor();
    return this._hp !== actor.hp || this._mhp !== actor.mhp ||
           this._actorId !== actor.actorId();
  };

  // 显示窗口
  Window_MapHpGauge.prototype.isVisible = function() {
    if (Tomoaky.Param.JAHGEventBusyHide && $gameMap.isEventRunning()) {
      return false;
    }
    if (Tomoaky.Param.JAHGMessageBusyHide && $gameMessage.isBusy()) {
      return false;
    }
    return $gameSystem.isVisibleMapHpGauge() && $gameParty.size() > 0;
  };

  // 设置不透明
  Window_MapHpGauge.prototype.updateOpacity = function() {
    if (this.x < $gamePlayer.screenX() + 24 &&
        this.x + this.windowWidth() > $gamePlayer.screenX() - 24 &&
        this.y < $gamePlayer.screenY() &&
        this.y + this.windowHeight() > $gamePlayer.screenY() - 48) {
      this.opacity = Tomoaky.Param.JAHGCollideOpacity;
    } else {
      this.opacity = 255;
    }
    this.contentsOpacity = this.opacity;
  };

  // 恢复状态
  Window_MapHpGauge.prototype.refresh = function() {
    this.contents.clear();
    var actor = $gamePlayer.actor();
    if (actor) {
      var x = this.windowWidth() - 144 + Tomoaky.Param.JAHGFaceOffsetX;
      var y = Tomoaky.Param.JAHGFaceOffsetY;
      this.drawFace(actor._faceName, actor._faceIndex, x, y, 144, this.windowHeight());
      x = Tomoaky.Param.JAHGGaugeOffsetX;
      y = (this.windowHeight() - this.lineHeight()) / 2 + Tomoaky.Param.JAHGGaugeOffsetY;
      this.drawActorHp(actor, x, y, 144);
    }
  };

  //-----------------------------------------------------------------------------
  // Scene_Map
  //

  var _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function() {
    _Scene_Map_createDisplayObjects.call(this);
    this.createMapHpGaugeWindow();
  };

  // 创建HP槽窗口
  Scene_Map.prototype.createMapHpGaugeWindow = function() {
    this._mapHpGaugeWindow = new Window_MapHpGauge();
    this.addChild(this._mapHpGaugeWindow);
  };

  var _Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    if (!SceneManager.isNextScene(Scene_Battle)) {
      this._mapHpGaugeWindow.hide();
    }
    _Scene_Map_terminate.call(this);
  };
  
  var _Scene_Map_launchBattle = Scene_Map.prototype.launchBattle;
  Scene_Map.prototype.launchBattle = function() {
    this._mapHpGaugeWindow.hide();
    this.removeChild(this._mapHpGaugeWindow);
    this._mapHpGaugeWindow = null;
    _Scene_Map_launchBattle.call(this);
  };
  
})();
