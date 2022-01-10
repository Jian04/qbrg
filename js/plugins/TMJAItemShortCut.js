//=============================================================================
// TMVplugin - 对象快捷键（跳跃动作扩展）
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 0.11b
// 最終更新日: 2016/XX/XX
//=============================================================================

/*:
 * @plugindesc 添加用对象快捷键功能
 * (必须将JumpAction引入)
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param slotNumber
 * @desc 对象插槽的数目。
 * 初期値: 8
 * @default 8
 *
 * @param windowX
 * @desc 快捷键窗口X坐标。
 * 初期値: 408（ -1 显示在玩家的头上）
 * @default 408
 *
 * @param windowY
 * @desc 快捷键窗口的Y坐标
 * 初期値: 0
 * @default 0
 *
 * @param windowWidth
 * @desc 快捷键窗口宽度。
 * 初期値: 408
 * @default 408
 *
 * @param windowHeight
 * @desc 快捷键窗口的高度。
 * 初期値: 64
 * @default 64
 *
 * @param windowHide
 * @desc 在操作中隐藏快捷键窗口。
 * 初期値: 1（ 0 不隐藏）
 * @default 1
 *
 * @help 大致意思是MV的plugin-跳跃动作Ver0.2b以上
 *需要把这个插件丢到plugin文件夹下面
 *
 * 插件命令:
 *   JumpAction setItemSC 0 1     # 将对象1号登录到插槽0号
 *
 */
var Imported = Imported || {};
Imported.TMJAItemShortCut = true;

(function() {

  var parameters = PluginManager.parameters('TMJAItemShortCut');
  var slotNumber = Number(parameters['slotNumber'] || 8);
  var windowX = Number(parameters['windowX'] || 408);
  var windowY = Number(parameters['windowY'] || 0);
  var windowWidth = Number(parameters['windowWidth'] || 408);
  var windowHeight = Number(parameters['windowHeight'] || 64);
  var windowHide = parameters['windowHide'] === '1' ? true : false;

  //-----------------------------------------------------------------------------
  // Input
  //

  Input._isEscapeCompatible = function(keyName) {
    return keyName === 'cancel';
  };
  
  Input._isItemShortCut = function() {
    return this.isPressed('shift') || this.isPressed('menu');
  };

  //-----------------------------------------------------------------------------
  // Game_Party
  //

  // 初始化对象

  var _Game_Party_initialize = Game_Party.prototype.initialize;
  Game_Party.prototype.initialize = function() {
    _Game_Party_initialize.call(this);
    this.initShortCut();
  };
  
  // 快捷键初始化
  Game_Party.prototype.initShortCut = function() {
    this._shortCut = [];
    for (var i = 0; i < slotNumber; i++) {
      this._shortCut[i] = 0;
    }
  };
  
  //快捷键设置
  Game_Party.prototype.setShortCut = function(index, itemId) {
    this._shortCut[index] = itemId;
  };

  //-----------------------------------------------------------------------------
  // Game_Player
  //
  
  // 返回是否可移动
  var _Game_Player_canMove = Game_Player.prototype.canMove;
  Game_Player.prototype.canMove = function() {
    if (Input._isItemShortCut()) {
      return false;
    }
    return _Game_Player_canMove.call(this);
  };
  
  //-----------------------------------------------------------------------------
  // Window_Item
  //
  
  var _Window_ItemList_processHandling = Window_ItemList.prototype.processHandling;
  Window_ItemList.prototype.processHandling = function() {
    _Window_ItemList_processHandling.call(this);
    if (this.isOpen() && this.active) {
      if (Input.isTriggered('shift') || Input.isTriggered('menu')) {
        this.playOkSound();
        this.updateInputData();
        this.deactivate();
        this.callHandler('menu');
      }
    }
  };
  
  //-----------------------------------------------------------------------------
  // Window_ShortCut
  //
  
  function Window_ShortCut() {
    this.initialize.apply(this, arguments);
  }
  
  Window_ShortCut.prototype = Object.create(Window_Selectable.prototype);
  Window_ShortCut.prototype.constructor = Window_ShortCut;
  
  // 初始化对象
  Window_ShortCut.prototype.initialize = function(mapFlag) {
    Window_Selectable.prototype.initialize.call(this, windowX, windowY,
                                                windowWidth, windowHeight);
    this._mapFlag = mapFlag;
    this._data = [];
    this.refresh();
    if (this._mapFlag) {
      if (windowHide) {
        this.openness = 0;
      }
    } else {
      this.hide();
    }
    this.select(0);
  };
  
  // 获得标准填充
  Window_ShortCut.prototype.standardPadding = function() {
    return 12;
  };

  // 获取列数
  Window_ShortCut.prototype.maxCols = function() {
    return 8;
  };
  
  // 获得对象数
  Window_ShortCut.prototype.maxItems = function() {
    return slotNumber;
  };
  
  // 对象的间隔
  Window_ShortCut.prototype.spacing = function() {
    return 0;
  };

  // 对象的高度
  Window_ShortCut.prototype.itemHeight = function() {
    return 40;
  };

  // 当前选中的对象
  Window_ShortCut.prototype.item = function() {
    return $dataItems[$gameParty._shortCut[this.index()]];
  };

  // 绘制条目
  Window_ShortCut.prototype.drawItem = function(index) {
    Window_Selectable.prototype.drawItem.call(this, index);
    var item = $dataItems[$gameParty._shortCut[index]];
    if (item) {
      var rect = this.itemRect(index);
      var n = $gameParty.numItems(item);
      this.changePaintOpacity(n > 0);
      this.drawIcon(item.iconIndex, rect.x + rect.width / 2 - 16,
                    rect.y + rect.height / 2 - 16);
      if (n > 0) {
        this.contents.fontSize = 20;
        this.contents.drawText('' + n, rect.x, rect.y + 16, rect.width - 2,
                               24, 'right');
      }
      this._data[index] = n;
    } else {
      this._data[index] = 0;
    }
  };
  
  // 更新框架
  Window_ShortCut.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    if (this._mapFlag) {
      if (windowX === -1) {
        this.x = $gamePlayer.screenX() - this.width / 2;
        this.x = this.x.clamp(0, Graphics.width - this.width);
        this.y = $gamePlayer.screenY() - 64 - this.height;
        this.y = this.y.clamp(0, Graphics.height - this.height);
      }
      if (!$gameMap.isEventRunning() && !$gameMessage.isBusy() &&
          Input._isItemShortCut()) {
        this.activate();
        if (windowHide) {
          this.open();
        }
      } else {
        this.deactivate();
        if (windowHide) {
          this.close();
        }
      }
      var index = Graphics.frameCount % slotNumber;
      var item = $gameParty._shortCut[index];
      if (this._data[index] !== $gameParty.numItems(item)) {
        this.redrawItem(index);
      }
    }
  };
  
  Window_ShortCut.prototype.playOkSound = function() {
  };

  //-----------------------------------------------------------------------------
  // Scene_Map
  //
  
  // 创建视图
  var _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function() {
    _Scene_Map_createDisplayObjects.call(this);
    this.createShortCutWindow();
  };
  
  // 创建快捷键窗口
  Scene_Map.prototype.createShortCutWindow = function() {
    this._shortCutWindow = new Window_ShortCut(true);
    this._shortCutWindow.setHandler('ok', this.onShortCutOk.bind(this));
    this.addChild(this._shortCutWindow);
  };

  // 释放
  var _Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    if (!SceneManager.isNextScene(Scene_Battle)) {
      this._shortCutWindow.hide();
    }
    _Scene_Map_terminate.call(this);
  };
  
  // 菜单调用判定
  Scene_Map.prototype.isMenuCalled = function() {
    return Input.isTriggered('cancel') || TouchInput.isCancelled();
  };
  
  // 执行快捷键
  Scene_Map.prototype.onShortCutOk = function() {
    var item = this._shortCutWindow.item();
    var actor = $gamePlayer.actor();
    if (actor.canUse(item) && (item.scope === 0 || this.isItemEffectsValid())) {
      actor.useItem(item);
      var action = new Game_Action(actor);
      action.setItemObject(item);
      this.itemTargetActors().forEach(function(target) {
        for (var i = 0; i < action.numRepeats(); i++) {
          action.apply(target);
        }
      }, this);
      $gamePlayer.requestAnimation(item.animationId);
      action.applyGlobal();
    } else {
      SoundManager.playBuzzer();
    }
  };

  Scene_Map.prototype.itemTargetActors = function() {
    var item = this._shortCutWindow.item();
    var actor = $gamePlayer.actor();
    var action = new Game_Action(actor);
    action.setItemObject(item);
    if (!action.isForFriend()) {
        return [];
    } else if (action.isForAll()) {
        return $gameParty.members();
    } else {
        return [actor];
    }
  };

  Scene_Map.prototype.isItemEffectsValid = function() {
    var item = this._shortCutWindow.item();
    var actor = $gamePlayer.actor();
    var action = new Game_Action(actor);
    action.setItemObject(item);
    return this.itemTargetActors().some(function(target) {
        return action.testApply(target);
    }, this);
  };

  //-----------------------------------------------------------------------------
  // Scene_Item
  //

  var _Scene_Item_create = Scene_Item.prototype.create;
  Scene_Item.prototype.create = function() {
    _Scene_Item_create.call(this);
    this.createShortCutWindow();
  };

  var _Scene_Item_createItemWindow = Scene_Item.prototype.createItemWindow;
  Scene_Item.prototype.createItemWindow = function() {
    _Scene_Item_createItemWindow.call(this);
    this._itemWindow.setHandler('menu', this.onItemShortCut.bind(this));
  };

  Scene_Item.prototype.createShortCutWindow = function() {
    this._shortCutWindow = new Window_ShortCut(false);
    this._shortCutWindow.setHandler('ok',     this.onShortCutOk.bind(this));
    this._shortCutWindow.setHandler('cancel', this.onShortCutCancel.bind(this));
    this.addWindow(this._shortCutWindow);
  };

  Scene_Item.prototype.onItemShortCut = function() {
    this._shortCutWindow.show();
    this._shortCutWindow.activate();
    this._shortCutWindow.select(0);
    var index = this._itemWindow.index();
    var rect = this._itemWindow.itemRect(index);
    this._shortCutWindow.x = this._itemWindow.x + this._itemWindow.padding + rect.x;
    this._shortCutWindow.y = this._itemWindow.y + this._itemWindow.padding + rect.y -
                             this._shortCutWindow.height - 4;
  };

  Scene_Item.prototype.onShortCutOk = function() {
    if (this.isShortCutOk()) {
      SoundManager.playEquip();
      $gameParty.setShortCut(this._shortCutWindow.index(), this.item().id);
      this._shortCutWindow.refresh();
    } else {
      SoundManager.playBuzzer();
    }
    this._shortCutWindow.activate();
  };

  Scene_Item.prototype.isShortCutOk = function() {
    var item = this.item();
    if (DataManager.isItem(item)) {
      return item.occasion !== 1;
    }
    return false;
  };
  
  Scene_Item.prototype.onShortCutCancel = function() {
    this.hideSubWindow(this._shortCutWindow);
  };

})();
