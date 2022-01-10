//=============================================================================
// TMVplugin -日志窗口(跳跃动作扩展)
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 0.1b
// 最終更新日: 2016/01/19
//=============================================================================

/*:
 * @plugindesc 添加用日志功能
 * (必须将JumpAction引入)
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param logWindowX
 * @desc 日志窗口的X坐标
 * 初期値: 0
 * @default 0
 *
 * @param logWindowY
 * @desc 日志窗口的Y坐标
 * 初期値: 464
 * @default 464
 *
 * @param logWindowWidth
 * @desc 日志窗口宽度
 * 初期値: 480
 * @default 480
 *
 * @param logWindowHeight
 * @desc 日志窗口的高度
 * 初期値: 160
 * @default 160
 *
 * @param lineHeight
 * @desc 日志窗口的一行高度
 * 初期値: 24
 * @default 24
 *
 * @param fontSize
 * @desc 日志窗口的字体大小。(未实现)
 * 初期値: 20
 * @default 20
 *
 * @param startVisible
 * @desc 游戏开始时的显示状态。
 * 初期値: 1（ 0 不显示）
 * @default 1
 *
 * @param collideOpacity
 * @desc 与玩家重叠时的不透明度
 * 初期値: 128（ 0 ～ 255 ）
 * @default 128
 *
 * @param messageBusyHide
 * @desc 在显示消息窗口时隐藏日志窗口
 * 初期値: 1（ 0 不隐藏）
 * @default 1
 *
 * @param eventBusyHide
 * @desc 事件启动时隐藏日志窗口
 * 初期値: 1（ 0 不隐藏）
 * @default 1
 *
 * @help 大致意思是MV的plugin-跳跃动作Ver0.2b以上
 *需要把这个插件丢到plugin文件夹下面
 *
 * 插件命令:
 *   JumpAction showLogWindow      # 显示日志窗口
 *   JumpAction hideLogWindow      # 隐藏日志窗口
 *   JumpAction addLog テキスト    # 将文本添加到日志窗口
 *
 *  一些控制字符也可以使用(V[n],N[n],P[n],G,\C[n])
 */

var Imported = Imported || {};
Imported.TMJALogWindow = true;

(function() {

  parameters = PluginManager.parameters('TMJALogWindow');

  logWindowX          = Number(parameters['logWindowX']);
  logWindowY          = Number(parameters['logWindowY']);
  logWindowWidth      = Number(parameters['logWindowWidth']);
  logWindowHeight     = Number(parameters['logWindowHeight']);
  logWindowLineHeight = Number(parameters['lineHeight']);
  logWindowFontSize   = Number(parameters['fontSize']);
  logWindowStartVisible    = parameters['startVisible'] === '1' ? true : false;
  logWindowCollideOpacity  = Number(parameters['collideOpacity']);
  logWindowMessageBusyHide = parameters['messageBusyHide'] === '1' ? true : false;
  logWindowEventBusyHide   = parameters['eventBusyHide'] === '1' ? true : false;

  //-----------------------------------------------------------------------------
  // Game_System
  //

  var _Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    _Game_System_initialize.call(this);
    this._visibleLogWindow = logWindowStartVisible;
    this._actionLog = [];
  };
  
  Game_System.prototype.isVisibleLogWindow = function() {
    return this._visibleLogWindow;
  };

  Game_System.prototype.setVisibleLogWindow = function(visible) {
    this._visibleLogWindow = visible;
  };
  
  Game_System.prototype.addActionLog = function(text) {
    this._actionLog.unshift(text);
    if (this._actionLog.length > 10) {
      this._actionLog.pop();
    }
    this._needsActionLogRefresh = true;
  };

  Game_System.prototype.actionLog = function() {
    return this._actionLog;
  };
  
  //-----------------------------------------------------------------------------
  // Game_Actor
  //

  // 显示升级
  var _Game_Actor_displayLevelUp = Game_Actor.prototype.displayLevelUp;
  Game_Actor.prototype.displayLevelUp = function(newSkills) {
    _Game_Actor_displayLevelUp.call(this, newSkills);
    if (!$gameParty.inBattle()) {
      var text = TextManager.levelUp.format(this._name, TextManager.level, this._level);
      $gameSystem.addActionLog(text);
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Event
  //

  var _Game_Event_gainRewardExp = Game_Event.prototype.gainRewardExp;
  Game_Event.prototype.gainRewardExp = function(exp) {
    var text = TextManager.obtainExp.format(exp, TextManager.exp);
    $gameSystem.addActionLog(text);
    _Game_Event_gainRewardExp.call(this, exp);
  };
  
  var _Game_Event_gainRewardGold = Game_Event.prototype.gainRewardGold;
  Game_Event.prototype.gainRewardGold = function(gold) {
    _Game_Event_gainRewardGold.call(this, gold);
    var text = TextManager.obtainGold.format(gold);
    $gameSystem.addActionLog(text);
  };
  
  var _Game_Event_gainRewardItem = Game_Event.prototype.gainRewardItem;
  Game_Event.prototype.gainRewardItem = function(item, y) {
    _Game_Event_gainRewardItem.call(this, item, y);
    var text = TextManager.obtainItem.format(item.name);
    $gameSystem.addActionLog(text);
  };
  
  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  // 插件命令
  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'JumpAction') {
      switch (args[0]) {
      case 'showLogWindow':
        $gameSystem.setVisibleLogWindow(true);
        break;
      case 'hideLogWindow':
        $gameSystem.setVisibleLogWindow(false);
        break;
      case 'addLog':
        $gameSystem.addActionLog(args[1]);
        break;
      }
    }
  };

  //-----------------------------------------------------------------------------
  // Window_MapLogWindow
  //

  function Window_MapLogWindow() {
    this.initialize.apply(this, arguments);
  }

  Window_MapLogWindow.prototype = Object.create(Window_Base.prototype);
  Window_MapLogWindow.prototype.constructor = Window_MapLogWindow;

  Window_MapLogWindow.prototype.initialize = function() {
    var x = logWindowX;
    var y = logWindowY;
    var wight = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, wight, height);
    this.openness = $gameSystem.isVisibleLogWindow() ? 255 : 0;
    this.opacity = 255;
    this.contentsOpacity = 255;
    this.refresh();
  };

  Window_MapLogWindow.prototype.standardFontSize = function() {
    return logWindowFontSize;
  };

  // 获取窗口宽度
  Window_MapLogWindow.prototype.windowWidth = function() {
    return logWindowWidth;
  };

  // 获取窗口的高度
  Window_MapLogWindow.prototype.windowHeight = function() {
    return logWindowHeight;
  };

  // 获得标准填充
  Window_MapLogWindow.prototype.standardPadding = function() {
    return 8;
  };

  // 获取窗口行高
  Window_MapLogWindow.prototype.lineHeight = function() {
    return logWindowLineHeight;
  };

  // 更新框架
  Window_MapLogWindow.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if ($gameSystem._needsActionLogRefresh) {
      this.refresh();
      $gameSystem._needsActionLogRefresh = false;
    }
    var visible = this.isVisible();
    if (visible) {
      this.open();
      this.updateOpacity();
    } else {
      this.close();
    }
  };

  // 显示窗口
  Window_MapLogWindow.prototype.isVisible = function() {
    if (logWindowEventBusyHide && $gameMap.isEventRunning()) {
      return false;
    }
    if (logWindowMessageBusyHide && $gameMessage.isBusy()) {
      return false;
    }
    return $gameSystem.isVisibleLogWindow();
  };

  // 不透明度更新
  Window_MapLogWindow.prototype.updateOpacity = function() {
    if (this.x < $gamePlayer.screenX() + 24 &&
        this.x + this.windowWidth() > $gamePlayer.screenX() - 24 &&
        this.y < $gamePlayer.screenY() &&
        this.y + this.windowHeight() > $gamePlayer.screenY() - 48) {
      this.opacity = logWindowCollideOpacity;
    } else {
      this.opacity = 255;
    }
    this.contentsOpacity = this.opacity;
  };

  // 恢复状态
  Window_MapLogWindow.prototype.refresh = function() {
    this.contents.clear();
//    this.contents.fontSize = logWindowFontSize;
    var actionLog = $gameSystem.actionLog();
    var lh = this.lineHeight();
    var n = Math.min(this.contents.height / lh, actionLog.length);
    for (var i = 0; i < n; i++) {
      var text = this.convertEscapeCharacters(actionLog[i]);
      this.drawTextEx(text, 0, (n - 1 - i) * lh);
    }
  };

  //-----------------------------------------------------------------------------
  // Scene_Map
  //

  var _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function() {
    _Scene_Map_createDisplayObjects.call(this);
    this.createMapLogWindow();
  };

  // 创建日志窗口
  Scene_Map.prototype.createMapLogWindow = function() {
    this._mapLogWindow = new Window_MapLogWindow();
    this.addChild(this._mapLogWindow);
  };

  var _Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    if (!SceneManager.isNextScene(Scene_Battle)) {
      this._mapLogWindow.hide();
    }
    _Scene_Map_terminate.call(this);
  };

  var _Scene_Map_launchBattle = Scene_Map.prototype.launchBattle;
  Scene_Map.prototype.launchBattle = function() {
    this._mapLogWindow.hide();
    this.removeChild(this._mapLogWindow);
    this._mapLogWindow = null;
    _Scene_Map_launchBattle.call(this);
  };
  
})();
