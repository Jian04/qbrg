//=============================================================================
// SoR_BattleTargetCursor_MZ.js
// SoR License inherited from MIT License (C) 2020 蒼竜
// http://dragonflare.blue/dcave/license.php
// ----------------------------------------------------------------------------
// Latest version v1.03 (2021/04/29)
//=============================================================================
/*:
@plugindesc ＜戦闘中行動インジケータ＞ v1.03
@author 蒼竜
@target MZ
@url http://dragonflare.blue/dcave/
@help 戦闘中にスキル名などの行動を表示する
基幹システムとは独立動作のインジケータ表示機能を付加します。
スキル（アクション）開始時に表示することが主な機能ですが、
スクリプトによる任意タイミングでの任意テキスト挿入も可能です。

独自画像の用意することで、背景画像をオリジナルのデザインに
差し替えて使用することも可能です。

なお、対象行動のメモ欄に
<NoActionIndiator>
と入力しておくと、その行動に対してインジケータは作動しません。
@param -----全般-----
@param Indicator_Style
@desc インジケータ描画スタイル (default: 0)
@type select
@option 標準スキンによるウィンドウ
@value 0
@option 独自画像使用
@value 2
@default 0

@param Indicator_PaddX
@desc インジケータ描画位置x座標補正，中心基準 (default: 0)
@type number
@default 0
@min -9999
@param Indicator_PositionY
@desc インジケータ描画位置y座標 (default: 96)
@type number
@default 96
@min -9999

@param Duration_ActionIndicator
@desc 通常スキル(行動)のインジケータ最大表示時間。-1で行動終了まで継続 (default: -1)
@type number
@default -1
@min -1

@param --独自画像UI利用時--
@param IndicatorImage_ForActor
@desc インジケータ画像(味方用)
@type file
@dir img/SoRBatHUD/
@default 
@param IndicatorImage_ForEnemy
@desc インジケータ画像(敵用)
@type file
@dir img/SoRBatHUD/
@default 
@param IndicatorImage_ForItem
@desc インジケータ画像(アイテム使用時用)
@type file
@dir img/SoRBatHUD/
@default 

@param ----特殊系----
@param Disable_AllLogMessages
@desc 全てのデフォルトログウィンドウメッセージを除去した機構に置換する (競合の心配のない場合に限り使用する事)
@default false
@type boolean

@param ShowImmediate
@desc true: アクションインジケータをオープンした状態で表示する (default: false)
@default false
@type boolean
*/

(function() {

    const pluginName = "SoR_Battle_ActionIndicator_MZ";
    const Param = PluginManager.parameters(pluginName); 
	const Indicator_Style = Number(Param['Indicator_Style']) || 0;
	const Indicator_PaddX = Number(Param['Indicator_PaddX']) || 0;
    const Indicator_PositionY = Number(Param['Indicator_PositionY']) || 0;
    const Duration_ActionIndicator = Number(Param['Duration_ActionIndicator']) || 0;

    const IndicatorImage_ForActor = String(Param['IndicatorImage_ForActor']) || '';
    const IndicatorImage_ForEnemy = String(Param['IndicatorImage_ForEnemy']) || '';
    const IndicatorImage_ForItem = String(Param['IndicatorImage_ForItem']) || '';
    const Disable_AllLogMessages = Boolean(Param['Disable_AllLogMessages'] === 'true') || false;
    const ShowImmediate = Boolean(Param['ShowImmediate'] === 'true') || false;

    ImageManager.loadBattleHudSprite = function(filename) {
        return this.loadBitmap('img/SoRBatHUD/', filename, 0, true);
    }


////////////////////////////////////////////////////////////////////////////////////////
    Game_Temp.prototype.CallActionIndicator = function(tx, iconID, Timer, Side){
        const sides = ["A", "E", "I"];
        if(Side== undefined || !sides.includes(Side)) Side = "A";
        if(!Number.isInteger(Timer)) Timer = 300;
        if(!Number.isInteger(iconID)) iconID = 0;
        SceneManager._scene._SoR_battleActIndicator.setText(iconID, Side, tx, Timer);        
    }

    Game_Temp.prototype.DismissActionIndicator = function(){
        SceneManager._scene._SoR_battleActIndicator.dismiss();        
    }
////////////////////////////////////////////////////////////////////////////////////////


    const SoR_BAI_SB_createSpriteset = Scene_Battle.prototype.createSpriteset;
    Scene_Battle.prototype.createSpriteset = function() {
        SoR_BAI_SB_createSpriteset.call(this);
        if (!this._SoRImgField) this.createSubImgField();
        this.create_SoRActionIndicator();
        this.sort_SubImgFieldLayer();
    }
    //SoRField for original images
    Scene_Base.prototype.createSubImgField = function() {
        this._SoRImgField = new Sprite();
        this._SoRImgField.z = 10;
        this.addChild(this._SoRImgField);
    }
    Scene_Base.prototype.sort_SubImgFieldLayer = function() {
        this._SoRImgField.children.sort(function(a, b){return a.mz-b.mz});
    }
     
    Scene_Battle.prototype.create_SoRActionIndicator = function() {
        this._SoR_battleActIndicator = new SoR_BattleActionIndicator();
        this._SoR_battleActIndicator.mz = 150; 
        this._SoRImgField.addChild(this._SoR_battleActIndicator);
        BattleManager._SoR_battleActIndicator = this._SoR_battleActIndicator;
    }

    const SoR_BAI_BM_startAction = BattleManager.startAction;
    BattleManager.startAction = function() {
        SoR_BAI_BM_startAction.call(this);

        if(!this._action._item.object().meta.NoActionIndiator){
            this._SoR_battleActIndicator.setAction(this._action);
        }
    }
    
    const SoR_BAI_BM_endAction = BattleManager.endAction;
    BattleManager.endAction = function() {
        SoR_BAI_BM_endAction.call(this);
        this._SoR_battleActIndicator.dismiss();
    }

    




function SoR_BattleActionIndicator() {
    this.initialize.apply(this, arguments);
}
SoR_BattleActionIndicator.prototype = Object.create(Window_Base.prototype);
SoR_BattleActionIndicator.prototype.constructor = SoR_BattleActionIndicator;
    
SoR_BattleActionIndicator.prototype.initialize = function(){
	this._text = '';
	this._timer = 0;
	this.slideX = 0;
	this.slidemX = 128;
    this.base_x = 900;
    this.displaytimer = Duration_ActionIndicator;
	
    Window_Base.prototype.initialize.call(this, new Rectangle(-1000, Indicator_PositionY, Graphics.width, Graphics.height));
    if(Indicator_Style==2)this.CreateSprites();
    this.openness = 0;
    this.padding = 2;
	this.setBackgroundType(Indicator_Style);
}

SoR_BattleActionIndicator.prototype.CreateSprites = function(){
    const ind_i = IndicatorImage_ForItem ? IndicatorImage_ForItem : IndicatorImage_ForActor;
    const ind_a = IndicatorImage_ForActor;
    const ind_e = IndicatorImage_ForEnemy ? IndicatorImage_ForEnemy : IndicatorImage_ForActor;

    this._actindsprites = [ind_a,ind_e,ind_i];
    this.actionAspr = [];

    for(let dat = 0; dat < 3; dat++){
        const sprarr = [];	
        for(let i = 0; i < 3; i++){
            sprarr[i] = new Sprite(ImageManager.loadBattleHudSprite(this._actindsprites[dat]));
        }
        this.actionAspr.push(sprarr);
    }

    for(let j = 0; j < 3; j++){
        for(let i = 0; i < 3; i++){
            this.actionAspr[j][i].visible = false;
            this.actionAspr[j][i].bitmap.addLoadListener(function() {
            this.addChildToBack(this.actionAspr[j][i]);
             }.bind(this));
        }
    }
}
 


SoR_BattleActionIndicator.prototype.setAction = function(act){
    this.InitializeIndicator();
    const action = act._item.object();
    let icon = "";
    const iconidx = action.meta.ActionIcon ? parseInt(action.meta.ActionIcon) :  action.iconIndex;

    if(action.iconIndex!=0) icon = "\\i[" + iconidx + "]";
    const name = icon + action.name;
    const drawlength = this.writeContents(name);

    this.base_x = (Graphics.width - this.width) *0.5 + Indicator_PaddX;
    this.x = this.base_x + this.slideX;

    if(Indicator_Style==2){
        let id;
        if(IndicatorImage_ForItem && act.isItem()) id = 2;
        else if(act._subjectActorId >= 1) id = 0;
        else if(act._subjectEnemyIndex >= 0) id = 1;
        this.CreateBackWindow(id,drawlength);
        for(let i = 0; i < 3; i++) this.actionAspr[id][i].visible = true;
	}

	this.slideX = this.slidemX;
    !ShowImmediate? this.open() : this.immediateOpen();
}

SoR_BattleActionIndicator.prototype.setText = function(iconID, Side, tx, timer){
    this.InitializeIndicator();
    this.displaytimer = timer;
    let icon = "";
    if(iconID>=1) icon = "\\i[" + iconID + "]";
    const text = icon + tx;
    const drawlength = this.writeContents(text);

    this.base_x = (Graphics.width - this.width) *0.5 + Indicator_PaddX;
    this.x = this.base_x + this.slideX;

    if(Indicator_Style==2){
        let id;
        if(IndicatorImage_ForItem && Side=="I") id = 2;
        else if(Side=="A") id = 0;
        else if(Side=="E") id = 1;
        this.CreateBackWindow(id,drawlength);
        for(let i = 0; i < 3; i++) this.actionAspr[id][i].visible = true;
    }
    
    this.slideX = this.slidemX;
    !ShowImmediate? this.open() : this.immediateOpen();
}

SoR_BattleActionIndicator.prototype.CreateBackWindow = function(id,length) {
//id -> 0  2    1
       let wd = this.actionAspr[id][0].bitmap.width;
       let ht = this.actionAspr[id][0].bitmap.height/3;
	   this.actionAspr[id][0].setFrame(0, ht*0, wd, ht);
       this.actionAspr[id][0].x = -32;
       this.actionAspr[id][0].y = -16;

       wd = this.actionAspr[id][2].bitmap.width;
       ht = this.actionAspr[id][2].bitmap.height/3;
       this.actionAspr[id][2].setFrame(0, ht*2, wd, ht);
       this.actionAspr[id][2].x = wd-32;
       this.actionAspr[id][2].y = -16;
       this.actionAspr[id][2].scale.x = (length-24)/wd;

       wd = this.actionAspr[id][1].bitmap.width;
       ht = this.actionAspr[id][1].bitmap.height/3;
       this.actionAspr[id][1].setFrame(0, ht*1, wd, ht);
       this.actionAspr[id][1].x = wd+ wd*this.actionAspr[id][2].scale.x-32;
       this.actionAspr[id][1].y = -16;
}

SoR_BattleActionIndicator.prototype.dismiss = function(){
    this._text = "";
    this.slideX = 1;
    this.close();
}

SoR_BattleActionIndicator.prototype.update = function(){
    Window_Base.prototype.update.call(this);
    
    this.displaytimer--;
    if(this.displaytimer==0) this.dismiss();
}

SoR_BattleActionIndicator.prototype.updateOpen = function() {
    if (this._opening) {
        this.openness += 32;
        this.slideX *= 0.5;
        this.x = this.base_x + this.slideX;
        if (this.isOpen()) {
            this._opening = false;
            this.slideX = 0;
            this.x = this.base_x + this.slideX;
        }
    }
}

SoR_BattleActionIndicator.prototype.immediateOpen = function() {
    this.openness = 255;
    this._opening = false;
    this.slideX = 0;
    this.x = this.base_x + this.slideX;
}

SoR_BattleActionIndicator.prototype.updateClose = function() {
    if (this._closing) {
        this.openness -= 32;
        this.slideX *= 2;
        this.x = this.base_x - this.slideX;
        if (this.isClosed()) {
            this._closing = false;
            this.x = this.base_x - this.slideX;
            
			if(Indicator_Style==2){
                for(let j = 0; j < 3; j++){
                    for(let i = 0; i < 3; i++){
                        this.actionAspr[j][i].visible = false;
                    }
                }
			}
			
        }
    }
}

SoR_BattleActionIndicator.prototype.InitializeIndicator = function() {
    this.contents.clear();
    this.openness = 0;
    if(Indicator_Style==2){
        for(let j = 0; j < 3; j++){
            for(let i = 0; i < 3; i++){
                this.actionAspr[j][i].visible = false;
            }
        }
    }
    this.slideX = 0;
}


SoR_BattleActionIndicator.prototype.writeContents = function(name) {
    this.contents.clear();

    this._text = name;
	this.contents.fontSize = 22;    
    const textState = this.createTextState(this._text, this.padding+24, 7, this.textWidth(this._text));
    this.processAllText(textState);

    this.width = textState.outputWidth + this.padding*2 +48 +4;
    this.height = 50;
    return textState.outputWidth;
}











///////////////////////////////////////////////////////////////////////
if(Disable_AllLogMessages){
    Window_BattleLog.prototype.displayAction = function(subject, item) {}
    Window_BattleLog.prototype.displayFailure = function(target) {}
    Window_BattleLog.prototype.displayCritical = function(target) {}
    Window_BattleLog.prototype.displayDamage = function(target) {
        if (target.result().missed) this.displayMiss(target);
        else if (target.result().evaded) this.displayEvasion(target);
        else {
            this.displayHpDamage(target);
            this.displayMpDamage(target);
            this.displayTpDamage(target);
        }
    }
    Window_BattleLog.prototype.displayMiss = function(target) {
        if (target.result().physical) this.push("performMiss", target);
    }
    Window_BattleLog.prototype.displayEvasion = function(target) {
        if (target.result().physical) this.push("performEvasion", target);
        else this.push("performMagicEvasion", target);
    }
    Window_BattleLog.prototype.displayHpDamage = function(target) {
        if (target.result().hpAffected) {
            if (target.result().hpDamage >= 0 /*&& !target.result().drain*/) this.push("performDamage", target);
            if (target.result().hpDamage < 0) this.push("performRecovery", target);
        }
    }
    Window_BattleLog.prototype.displayMpDamage = function(target) {
        if (target.isAlive() && target.result().mpDamage !== 0) {
            if (target.result().mpDamage < 0)  this.push("performRecovery", target);
        }
    }
    Window_BattleLog.prototype.displayTpDamage = function(target) {
        if (target.isAlive() && target.result().tpDamage !== 0) {
            if (target.result().tpDamage < 0) this.push("performRecovery", target);
        }
    }
    Window_BattleLog.prototype.displayAffectedStatus = function(target) {
        if (target.result().isStatusAffected()) {
            this.displayChangedStates(target);
            this.displayChangedBuffs(target);
        }
    }
    Window_BattleLog.prototype.displayAddedStates = function(target) {
        const result = target.result();
        const states = result.addedStateObjects();
        for (const state of states) {
            if (state.id === target.deathStateId()) {
                this.push("performCollapse", target);
            }
        }
    }
    Window_BattleLog.prototype.displayRemovedStates = function(target) {
        const result = target.result();
    }
    Window_BattleLog.prototype.displayAutoAffectedStatus = function(target) {
        if (target.result().isStatusAffected()) {
            this.displayAffectedStatus(target, null);
            this.push("clear");
        }
    }
    Window_BattleLog.prototype.displayChangedBuffs = function(target) {
        const result = target.result();
    }
    Window_BattleLog.prototype.displayRemovedStates = function(target) {}
    Window_BattleLog.prototype.displayBuffs = function(target, buffs, fmt) {}
    Game_BattlerBase.prototype.mostImportantStateText = function() {
        return "";
    }
}



}());