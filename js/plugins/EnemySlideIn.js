/*:
 * @target MZ
 * @plugindesc 敌方出场演出翻复刻SV队伍
 * @author Lib
 *
 * @param slideinSpeed
 * @desc 出场演出速度(数值越高越慢)
 * 初始值: 66
 * @default 66
 *
 * @help
 * 不含插件指令。
 * 己方队伍出场稍稍优先。
 *
 */

(function() {

var parameters = PluginManager.parameters('EnemySlideIn');
Sprite_Actor.slideinSpeed = eval(String(parameters['slideinSpeed']));
Sprite_Enemy.slideinSpeed = eval(String(parameters['slideinSpeed']));

Sprite_Actor.prototype.startEntryMotion = function() {
    if (this._actor && this._actor.canMove()) {
        this.startMotion('walk');
        this.startMove(0, 0, Sprite_Actor.slideinSpeed);
    } else if (!this.isMoving()) {
        this.refreshMotion();
        this.startMove(0, 0, 0);
    };
};

var _Sprite_Enemy_prototype_setBattler = Sprite_Enemy.prototype.setBattler
Sprite_Enemy.prototype.setBattler = function(battler) {
	_Sprite_Enemy_prototype_setBattler.call(this, battler);
	if($gameSystem.isSideView()){
    	this._offsetX = -Graphics.boxWidth;			//スクリーンサイズによって差が出るのはよくない？
   		this.startMove(0, 0, Sprite_Enemy.slideinSpeed);	//差分動く
	};
};

})();
