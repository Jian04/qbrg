//=============================================================================
// RPG Maker MZ - 战斗加速插件
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 飞猫云工作室-<战斗加速插件>
 * @author 飞猫云工作室（Fly_Cat/Fly_Roc）
 * 
 * @param speedBattle
 * @text 初始是否开启战斗加速
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭
 * @default false
 * 
 * @param speedBattleImg
 * @text 战斗加速图片
 * @type file
 * @dir  img/system/
 * @desc 
 * @default 
 * 
 * @param imgX
 * @text 显示坐标X
 * @type number
 * @desc 显示坐标X
 * @default 200
 * 
 * @param imgY
 * @text 显示坐标Y
 * @type number
 * @desc 显示坐标Y
 * @default 600
 * 
 * @param speed
 * @text 设置速度倍数
 * @type number
 * @desc 系统默认：1 设置倍数：2 
 * @default 2
 * 
 * @help
 * ==============================使用条款==================================
 * 1.本插件免费用于免费游戏和商业游戏
 * 2.游戏中必须致谢Fly_Cat/Fly_Roc
 * ==============================使用说明==================================
 * 即插即用战斗中控制按钮即可
 * 1.承接MV、MZ定制插件  QQ：903516931
 * =======================================================================
 */
'use strict';
var Imported = Imported || {};
Imported.FlyCat_SpeedBattle = true;

var FlyCat = FlyCat || {};
FlyCat.SpeedBattle = {};
FlyCat.SpeedBattle.parameters = PluginManager.parameters('FlyCat_SpeedBattle');
FlyCat.SpeedBattle.speedBattle = String(FlyCat.SpeedBattle.parameters['speedBattle'] || "false");
FlyCat.SpeedBattle.speedBattleImg = FlyCat.SpeedBattle.parameters['speedBattleImg'];
FlyCat.SpeedBattle.imgX = Number(FlyCat.SpeedBattle.parameters['imgX'] || 200);
FlyCat.SpeedBattle.imgY = Number(FlyCat.SpeedBattle.parameters['imgY'] || 600);
FlyCat.SpeedBattle.speed = Number(FlyCat.SpeedBattle.parameters['speed'] || 2);
FlyCat.SpeedBattle.Scene_Battle_start = Scene_Battle.prototype.start;
Scene_Battle.prototype.start = function () {
    FlyCat.SpeedBattle.Scene_Battle_start.call(this);
    this.createSpeedBattleSprtie();
};

Scene_Battle.prototype.createSpeedBattleSprtie = function () {
    this._speedBattleSprite = new Sprite_autoBattleButton();
    this.addChild(this._speedBattleSprite);
    this._speedBattleSprite.bitmap = ImageManager.loadSystem(FlyCat.SpeedBattle.speedBattleImg)
    if (!$gameSystem._speedBattle) {
        $gameSystem._speedBattle = eval(FlyCat.SpeedBattle.speedBattle);
    }
    this._speedBattleSprite.setClickHandler(this.startSpeedBattle.bind(this));
    this._speedBattleSprite.x = FlyCat.SpeedBattle.imgX;
    this._speedBattleSprite.y = FlyCat.SpeedBattle.imgY;
    this._speedBattleSprite.visible = true;
    if ($gameSystem._speedBattle == true) Graphics._app.ticker.speed = FlyCat.SpeedBattle.speed;
};
Scene_Battle.prototype.startSpeedBattle = function () {
    $gameSystem._speedBattle = $gameSystem._speedBattle ? false : true;
    if ($gameSystem._speedBattle == false) Graphics._app.ticker.speed = 1;
    if ($gameSystem._speedBattle == true) Graphics._app.ticker.speed = FlyCat.SpeedBattle.speed;
};

FlyCat.SpeedBattle.Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function () {
    FlyCat.SpeedBattle.Scene_Battle_update.call(this);
    if (BattleManager.isBattleEnd()) {
        Graphics._app.ticker.speed = 1;
        this._speedBattleSprite.visible = false;
    }
    if ($gameSystem._speedBattle == false && this._speedBattleSprite) {
        this._speedBattleSprite.setFrame(0, 0, this._speedBattleSprite.bitmap.width / 2, this._speedBattleSprite.bitmap.height);

    }
    if ($gameSystem._speedBattle == true && this._speedBattleSprite) {
        this._speedBattleSprite.setFrame(this._speedBattleSprite.bitmap.width / 2, 0, this._speedBattleSprite.bitmap.width / 2, this._speedBattleSprite.bitmap.height);

    }
};