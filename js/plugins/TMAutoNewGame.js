//=============================================================================
// TMVplugin - 自動ニューゲーム
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.1
// 最終更新日: 2015/12/25
//=============================================================================

/*:
 * @plugindesc 启动时自动启动游戏。
 *  Web用迷你游戏等不需要标题时可以使用。
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param autoNewGame
 * @desc 自动开始游戏
 * 初期値: 1（ 0 关闭 / 1 启动）
 * @default 1
 *
 * @param allwaysOnTop
 * @desc 总是在最前面显示游戏窗口
 * 初期値: 1（ 0 关闭 / 1 启动）
 * @default 1
 *
 * @param autoDevTool
 * @desc 自动打开解析工具。
 * 初期値: 1（ 0 关闭 / 1 启动）
 * @default 1
 *
 * @help 没有插件命令。
 * 
 */

var Imported = Imported || {};
Imported.TMAutoNewGame = true;

(function() {

  var parameters = PluginManager.parameters('TMAutoNewGame');
  var autoNewGame  = parameters['autoNewGame'] === '1' ? true : false;
  var allwaysOnTop = parameters['allwaysOnTop'] === '1' ? true : false;
  var autoDevTool  = parameters['autoDevTool'] === '1' ? true : false;

  Scene_Boot.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SoundManager.preloadImportantSounds();
    if (DataManager.isBattleTest()) {
      DataManager.setupBattleTest();
      SceneManager.goto(Scene_Battle);
    } else if (DataManager.isEventTest()) {
      DataManager.setupEventTest();
      SceneManager.goto(Scene_Map);
    } else {
      this.checkPlayerLocation();
      DataManager.setupNewGame();
      if (Utils.isNwjs() && Utils.isOptionValid('test') && autoDevTool) {
        require('nw.gui').Window.get().showDevTools().moveTo(0, 0);
        require('nw.gui').Window.get().setAlwaysOnTop(allwaysOnTop);
        window.focus();
      }
      SceneManager.goto(autoNewGame ? Scene_Map : Scene_Title);
      Window_TitleCommand.initCommandPosition();
    }
    this.updateDocumentTitle();
  };

})();
