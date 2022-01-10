//=============================================================================
// SoR_BattleRingCommand_MZ_Alpha.js
// SoR License inherited from MIT License (C) 2020 蒼竜
// http://dragonflare.blue/dcave/license.php
// ---------------------------------------------------------------------------
// Latest version v1.10 (2021/03/24)
//=============================================================================
/*:
@plugindesc ＜戦闘用アクターリングコマンド Type-α＞ v1.10
@author 蒼竜
@target MZ
@url http://dragonflare.blue/dcave/
@help 戦闘画面における、アクターのコマンド選択画面を自作UI画像を用いた
リングコマンド形式に変更します(デフォルトのウィンドウは不可視化します)。
他にある総合的プラグインの副産物の位置づけにあるものと違い、
アクターコマンド部分単体を差し替えることだけに特化（製作者個人にとって
余計な副次的機能をなるべく導入しない）しているため、
プラグイン競合の危険が下がり、製作者ごとのより細かなゲームシステムの
管理が行いやすくなります。

機能の広範化により、製作者ごとに無駄な処理が氾濫することを抑制するため、
UIデザインの方向性ごとにスクリプトファイルを分けています。
好みのスタイルのものを1つだけ選んで導入してください。
(このスクリプトは、"Type-α"のものです。)

@param Ringbase_X-coordinate
@desc リングの土台画像を置くx座標(default: 280)
@default 280
@type number
@param Ringbase_Y-coordinate
@desc リングの土台画像を置くy座標(default: 320)
@default 320
@type number

@param Ringover_X-coordinate
@desc リングの上層に重ね置きする画像を置くx座標(default: 0)
@default 0
@type number
@param Ringover_Y-coordinate
@desc リングの上層に重ね置きする画像を置くy座標(default: 0)
@default 0
@type number

@param CommandPadd_X-coordinate
@desc コマンドアイコンの配置開始位置のx方向の補正量(default: 128)
@default 128
@type number
@param CommandPadd_Y-coordinate
@desc コマンドアイコンの配置開始位置のy方向の補正量(default: 128)
@default 128
@type number

@param CommandName_X-coordinate
@desc 選択中のコマンド名を表示する位置のx座標(default: 40)
@default 40
@type number
@param CommandName_Y-coordinate
@desc 選択中のコマンド名を表示する位置のy座標(default: 94)
@default 94
@type number
@param CommandName_Width
@desc 選択中のコマンド名の最大表示幅(default: 140)
@default 140
@type number

@param RingCommands_Radius
@desc リングコマンド半径(default: 108)
@default 108
@type number

@param ReverseRotationDir
@desc 'true': リング回転方向を初期設定と反対にする (default: false)
@default false
@type boolean
*/ 
 
 
var Imported = Imported || {};
if(Imported.SoR_BattleRingCommandseries) throw new Error("[SoR_BattleRingCommand_MZ] Do NOT import more than 2 types of <SoR_BattleRingCommand> series.");

Imported.SoR_BattleRingCommandseries = true;
var SoR = SoR || {};

(function() {
	
const Param = PluginManager.parameters('SoR_BattleRingCommand_MZ_Alpha');
const Ringbase_X_coord = Number(Param['Ringbase_X-coordinate'] || 280);
const Ringbase_Y_coord = Number(Param['Ringbase_Y-coordinate'] || 320);
const Ringover_X_coord = Number(Param['Ringover_X-coordinate'] || 0);
const Ringover_Y_coord = Number(Param['Ringover_Y-coordinate'] || 0);
const CommandPadd_X_coord = Number(Param['CommandPadd_X-coordinate'] || 128);
const CommandPadd_Y_coord = Number(Param['CommandPadd_Y-coordinate'] || 128);
const CommandName_X_coord = Number(Param['CommandName_X-coordinate'] || 40);
const CommandName_Y_coord = Number(Param['CommandName_Y-coordinate'] || 94);
const CommandName_Width = Number(Param['CommandName_Width'] || 140);
const RingCommands_Radius = Number(Param['RingCommands_Radius'] || 108);

//v1.10
const ReverseRotationDir = (Boolean(Param['ReverseRotationDir'] === 'true' || false)) ? -1 : 1;


ImageManager.loadBattleCommandSprite = function(filename) {
    return this.loadBitmap("img/SoRBatCom/", filename, 0, true);
}

const SoR_BRC_SB_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
Scene_Battle.prototype.createDisplayObjects = function(){
	SoR_BRC_SB_createDisplayObjects.call(this);
	this.SoR_RingBatCommand_init();
}

 
Scene_Battle.prototype.SoR_RingBatCommand_init = function() {
	
	this.SoR_RBcomField = new Sprite();
	this.addChild(this.SoR_RBcomField);		
    
	this.SoR_ringbcom = new SoR_BattleRingCommand();
	this.SoR_RBcomField.addChild(this.SoR_ringbcom.basespr);
	if(this.SoR_ringbcom.basesprU!=null) this.SoR_RBcomField.addChild(this.SoR_ringbcom.basesprU);														  
	this.SoR_RBcomField.addChild(this.SoR_ringbcom.ComNameWindow)
}

////////////////////
const SoR_BRC_SB_updateBattleProcess = Scene_Battle.prototype.updateBattleProcess;
Scene_Battle.prototype.updateBattleProcess = function() {
    SoR_BRC_SB_updateBattleProcess.call(this);
	
	if(this._actorCommandWindow.actor()!=null && this._actorCommandWindow.active==true){ 
	 this.SoR_ringbcom.updateCommand(this._actorCommandWindow);
	}
	  
};

/////////////////////////////////////////////////////////////////
Window_ActorCommand.prototype.setup = function(actor) {
	this.x = -10000;
    this._actor = actor;
	this.select(0);
	this.selectSymbol('attack');					   
    this.refresh();
    this.activate();
    this.open();
	this.visible = true;
}

/////////////////////////////////////////////////////////////////
const SoR_BRC_WA_processCancel = Window_ActorCommand.prototype.processCancel;
Window_ActorCommand.prototype.processCancel = function() {
    SceneManager._scene.SoR_ringbcom.setInvisible();
	SoR_BRC_WA_processCancel.call(this);
}

/////////////////////////////////////////////////////////////
///// command input start
const SoR_BRC_SB_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
Scene_Battle.prototype.startActorCommandSelection = function() {
	SoR_BRC_SB_startActorCommandSelection.call(this);	

	this.startActorCommandDelete();
    this.SoR_ringbcom.setup_RingCommand(this._actorCommandWindow);
	this.startActorCommandInstall();	
}

Scene_Battle.prototype.startActorCommandDelete = function() {
	for(let i=0; i<this.SoR_ringbcom.command_icons.length; i++){
         this.SoR_RBcomField.removeChild(this.SoR_ringbcom.command_icons[i]);
	}
}
Scene_Battle.prototype.startActorCommandInstall = function() {
	for(let i=0; i<this.SoR_ringbcom.command_icons.length; i++){
         this.SoR_RBcomField.addChild(this.SoR_ringbcom.command_icons[i]);
	}
	this.SoR_ringbcom.setVisible();
}


Window_ActorCommand.prototype.numVisibleRows = function() {
    return 9;
}

/////////////////////////////////////////////////////////////
// Side input (overwrite)
Window_ActorCommand.prototype.processCursorMove = function() {
	let Inputting = 0;
	this._prev=0;
	if(this.comwait && this.comwait>0) return;	
	if (this.isOpenAndActive()){
		if (Input.isRepeated('right')) Inputting = 1*ReverseRotationDir;
		if (Input.isRepeated('left')) Inputting = -1*ReverseRotationDir;
	}	
	if(Inputting!=0){
		SoundManager.playCursor();
		this._prev = Inputting;
		this._index += Inputting;
		this._index = (this._index+this._list.length)%this._list.length;
	}
}

//wheel input
Window_ActorCommand.prototype.processWheelScroll = function() {	
	let Inputting = 0;
	this._Mprev=0;
	if(this.comwait && this.comwait>0) return;
	
    if (this.isOpenAndActive()) {
        const threshold = 25;
        if (TouchInput.wheelY >= threshold) Inputting = 1*ReverseRotationDir;
        if (TouchInput.wheelY <= -threshold) Inputting = -1*ReverseRotationDir;
		
		if(Inputting!=0){
				SoundManager.playCursor();
				this._Mprev = Inputting;
				this._index += Inputting;
				this._index = (this._index+this._list.length)%this._list.length;
		}
    }	
}

Window_ActorCommand.prototype.processTouchScroll = function() {
	this._Tprev=0;
	
	if(this.comwait && this.comwait>0) return;
	
    if (this.isOpenAndActive()) {
		if (TouchInput.isCancelled()) {
            if (this.isCancelEnabled()) this.processCancel();
		} else if (TouchInput.isTriggered() && this.isTouchRingCom()) {
			this.comwait = 9;
        }
	}
}

Window_ActorCommand.prototype.isTouchRingCom = function() {
	let flag = false;
	const comms = SceneManager._scene.SoR_ringbcom;

	for(let i=0; i<comms.command_icons.length; i++){
		if (comms.command_enable[i]==true) {
			if(CheckIconTouch(comms.command_icons[i],i)!=-1){
					
				const Dist_A = Math.abs((this._index + this._list.length) - i)%this._list.length;
				const Dist_B = Math.abs(this._index - (this._list.length + i))%this._list.length;
				this._Tprev = Dist_A < Dist_B ? -Dist_A : Dist_B;

				this._index = i;
				flag = true;
				break;
			}
		}
	}
	return flag;	
}

function CheckIconTouch(currentIcon,id){
	let ret = -1;
	const Tx = TouchInput.x;
    const Ty = TouchInput.y;
	const wd = currentIcon.bitmap.width;
	const ht = currentIcon.bitmap.height;	
	if(Tx >= currentIcon.x-wd/2 && Tx <= currentIcon.x+wd/2){
	  if(Ty >= currentIcon.y-ht/2 && Ty <= currentIcon.y+ht/2){
		  ret = id;
	  }
	}
   return ret;
}


const SoR_BRC_SB_commandItem_WA_update = Window_ActorCommand.prototype.update;
Window_ActorCommand.prototype.update = function() {
	
	if (this.comwait && this.comwait > 0) {
		this.comwait--;
		if(this.comwait==0) this.processOk();
	}
	SoR_BRC_SB_commandItem_WA_update.call(this);	
}

/////////////////////////////////////////

//close windows
const SoR_BRC_SB_commandAttack = Scene_Battle.prototype.commandAttack;
Scene_Battle.prototype.commandAttack = function() {
    this.SoR_ringbcom.setInvisible();
    SoR_BRC_SB_commandAttack.call(this);
}
const SoR_BRC_SB_commandSkill = Scene_Battle.prototype.commandSkill;
Scene_Battle.prototype.commandSkill = function() {
    this.SoR_ringbcom.setInvisible();
    SoR_BRC_SB_commandSkill.call(this);										   
}
const SoR_BRC_SB_commandGuard = Scene_Battle.prototype.commandGuard;
Scene_Battle.prototype.commandGuard = function() {
    this.SoR_ringbcom.setInvisible();
    SoR_BRC_SB_commandGuard.call(this);
}
const SoR_BRCS_SB_commandItem = Scene_Battle.prototype.commandItem;
Scene_Battle.prototype.commandItem = function() {
    this.SoR_ringbcom.setInvisible();
    SoR_BRCS_SB_commandItem.call(this);
}
//original commands by FTKR
if (Imported.FTKR_EBC) {
	const SoR_BRC_SB_commandCustom = Scene_Battle.prototype.commandCustom;
	Scene_Battle.prototype.commandCustom = function() {
		this.SoR_ringbcom.setInvisible();
		SoR_BRC_SB_commandCustom.call(this);
	}
}

//cancel target selection
const SoR_BRC_SB_onActorCancel = Scene_Battle.prototype.onActorCancel;
Scene_Battle.prototype.onActorCancel = function() {
	SoR_BRC_SB_onActorCancel.call(this);
    switch (this._actorCommandWindow.currentSymbol()) {
	case 'custom': /////// FTKR
    case 'attack':
         this.SoR_ringbcom.setVisible();
         break;
    }
	
}
const SoR_BRC_SB_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
	SoR_BRC_SB_onEnemyCancel.call(this);
    switch (this._actorCommandWindow.currentSymbol()) {
	case 'custom': /////// FTKR
    case 'attack':
         this.SoR_ringbcom.setVisible();
         break;
    }
}

//Return to actor commands from skill/item window
const SoR_BRC_SB_onSkillCancel = Scene_Battle.prototype.onSkillCancel;
Scene_Battle.prototype.onSkillCancel = function() {
	SoR_BRC_SB_onSkillCancel.call(this);
    this.SoR_ringbcom.setVisible();
}
const SoR_BRC_SB_onItemCancel = Scene_Battle.prototype.onItemCancel;
Scene_Battle.prototype.onItemCancel = function() {
	SoR_BRC_SB_onItemCancel.call(this);
    this.SoR_ringbcom.setVisible();
}

/////////////////////////////////////////////
// Back to party command
/////////////////////////////////////////////
const SoR_BRC_SB_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
Scene_Battle.prototype.startPartyCommandSelection = function() {
    SoR_BRC_SB_startPartyCommandSelection.call(this);
	this.SoR_ringbcom.setInvisible();
}



////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
function SoR_BattleRingCommand(){
	this.initialize(...arguments);
}

SoR_BattleRingCommand.prototype.initialize = function(){
	this.x = Ringbase_X_coord;
	this.y = Ringbase_Y_coord;
	this.current_idx = 0;
	this.ring_rotate = 0;
	this.ring_maxrot = 0;
	this.reserved_idx = 0;
	this.Is_ring_rot = false;
	this.rot_duration = 6;
	this.rotate_scale = 1;
	
	this.radius = RingCommands_Radius;
	this.visible = false;
	this.basespr = null;
	this.basesprU = null;
	this.maxicons = 0;	
	this.cursor_icon_emph = 0; // scale icons for current index
	
	this.command_layer_img = ImageManager.loadBattleCommandSprite("Layout");
	this.command_icons = [];
	this.command_enable = [];
	this.command_layerU_img = ImageManager.loadBattleCommandSprite("Layout2");
	this.ComNameWindow = CreateCommandNameField(this.x,this.y);
	
	this.create_basespr();
}

// call in actor command
SoR_BattleRingCommand.prototype.setup_RingCommand = function(comact){
	this.loadRingCommandImages(comact);
	this.create_commandIcon_spr();
	this.Is_ring_rot = false;
	this.current_idx = 0;
	this.reserved_idx = 0;
	this.ring_rotate = 0;
	this.rotate_scale = 1;
	this.basespr.visible = true;
	this.basesprU.visible = true;
	this.stack_coms = [];
}

////////////////////////////////////////////////////////
SoR_BattleRingCommand.prototype.setVisible = function(){
	this.visible = true;
	this.setcomponents();
}
SoR_BattleRingCommand.prototype.setInvisible = function(){
	this.visible = false;
	this.setcomponents();
}

SoR_BattleRingCommand.prototype.setcomponents = function(){
  this.basespr.visible = this.visible;
  this.basesprU.visible = this.visible;
  this.ComNameWindow.visible = this.visible;
  for(let i=0; i<this.maxicons; i++) this.command_icons[i].visible = this.visible;
}


//prepare images
SoR_BattleRingCommand.prototype.loadRingCommandImages = function(ActCom){
    this.command_imgs = [];
	this.maxicons = ActCom._list.length;
    for(let i = 0; i < this.maxicons; i++){
	   if(ActCom.isCommandEnabled(i)){
		   var fname = "Com_" + ActCom._list[i].name;
		   this.command_enable.push(true);
	   }
	   else{
		   var fname = "Com_" + ActCom._list[i].name + "_disabled";
		   this.command_enable.push(false);
	   }
       this.command_imgs.push(ImageManager.loadBattleCommandSprite(fname));
	}
}


SoR_BattleRingCommand.prototype.create_basespr = function(){
	this.basespr = new Sprite(this.command_layer_img);
	this.basespr.x = this.x;
	this.basespr.y = this.y;
	this.basespr.visible = this.visible;
	this.basesprU = new Sprite(this.command_layerU_img);
	this.basesprU.x = this.x +Ringover_X_coord;
	this.basesprU.y = this.y +Ringover_Y_coord;
	this.basesprU.visible = this.visible;
}
SoR_BattleRingCommand.prototype.create_commandIcon_spr = function(){
	this.command_icons = [];
	const rotate_main = 2.0*Math.PI /this.maxicons;
	for(let i=0; i<this.maxicons; i++){
		this.command_icons[i] = new Sprite(this.command_imgs[i]);
		this.command_icons[i].x = this.radius * Math.sin(Math.PI-(rotate_main)*i) +this.x+CommandPadd_X_coord;
		this.command_icons[i].y = this.radius * Math.cos(Math.PI-(rotate_main)*i) +this.y+CommandPadd_Y_coord;
		this.command_icons[i].visible = true;
		this.command_icons[i].scale.x = 1.0;
		this.command_icons[i].scale.y = 1.0;
		this.command_icons[i].anchor.x = 0.5;
		this.command_icons[i].anchor.y = 0.5;
	}	
}


SoR_BattleRingCommand.prototype.updateCommand = function(ActCom){
   const prev = ActCom._prev + ActCom._Mprev + ActCom._Tprev;
	
    if(prev !=0){ 
		this.stack_coms.push(prev);

						  
		for(let xx=0; xx<this.stack_coms.length; xx++){
		    if(xx+1>=this.stack_coms.length) break;
			// cancel the concurrent commands <- and ->
			if(this.stack_coms[xx]+this.stack_coms[xx+1]==0) this.stack_coms.splice(xx,2);
						   
						   
		}
		for(let xx=0; xx<this.stack_coms.length; xx++){//cancel over ring rotation
			let cmd_cnt=0;
			for(let yy=xx; yy<xx+this.maxicons; yy++){
				if(xx+this.maxicons>=this.stack_coms.length) break;	
				cmd_cnt += this.stack_coms[yy];
			}
			let zz = Math.abs(Math.floor(cmd_cnt/this.maxicons));
			if(zz>=1){ //x (mod. maxicons) in Z
				this.stack_coms.splice(xx,this.maxicons*zz);
			}
		}
		
	}
	if(!this.Is_ring_rot && this.stack_coms.length > 0){
		const push = this.stack_coms[0]; //prev
		this.stack_coms.shift();
			    
				const newid = this.current_idx + push;
				const Dist_A = Math.abs((this.current_idx + this.maxicons) - newid)%this.maxicons;
				const Dist_B = Math.abs(this.current_idx - (this.maxicons + newid))%this.maxicons;
				const Dist = Dist_A < Dist_B ? Dist_A : Dist_B;
				this.rotate_scale = Dist;
				this.ring_rotate = (push>0?-1:1)*this.rot_duration;
				this.ring_maxrot = this.ring_rotate > 0 ? this.rot_duration : -this.rot_duration;		
				
				this.reserved_idx = ActCom._index;
				this.Is_ring_rot = true;
	}
	 
	
	for(let i=0; i<this.maxicons; i++){
		const idx = (-i+this.current_idx+this.maxicons)%this.maxicons;
		const rotate_main = 2.0*Math.PI /this.maxicons;
		const rotate_com = this.Is_ring_rot ? this.rotate_scale* rotate_main *((this.ring_maxrot-this.ring_rotate)/this.rot_duration) : 0;
		this.command_icons[i].x = this.radius * Math.sin(Math.PI-(rotate_main)*idx +rotate_com) +this.x+CommandPadd_X_coord;
		this.command_icons[i].y = this.radius * Math.cos(Math.PI-(rotate_main)*idx +rotate_com) +this.y+CommandPadd_Y_coord;
		this.command_icons[i].visible = true;
				
		const dist_classA = Math.abs((this.current_idx + this.maxicons) - idx)%this.maxicons;
		const dist_classB = Math.abs(this.current_idx - (this.maxicons + idx))%this.maxicons;
		const dist = dist_classA < dist_classB ? dist_classA : dist_classB;
		this.command_icons[idx].scale.x = 1.0;
		this.command_icons[idx].scale.y = 1.0;
		this.command_icons[idx].opacity = 255 - dist * 20;
	}

	const enabled = ActCom.isCommandEnabled(this.current_idx) ? 1 : 0; // enable to use this command?
	this.cursor_icon_emph = (this.cursor_icon_emph+1)%45;
	this.command_icons[this.current_idx].scale.x = 1.2 + enabled*0.5*Math.sin( this.cursor_icon_emph * (2.0*Math.PI/45));
	this.command_icons[this.current_idx].scale.y = 1.2 + enabled*0.5*Math.sin( this.cursor_icon_emph * (2.0*Math.PI/45));
	this.updateComName(ActCom);


    if(this.Is_ring_rot){
		if(this.ring_rotate > 0) this.ring_rotate--;
		else if(this.ring_rotate < 0) this.ring_rotate++;
	
		if(this.ring_rotate == 0){// finish ring shift
		  this.current_idx = this.reserved_idx;
		  this.cursor_icon_emph = 0;
		  this.Is_ring_rot = false;
		}
	}
}


SoR_BattleRingCommand.prototype.updateComName = function(ActCom){
	this.ComNameWindow.contents.clear();	
	this.ComNameWindow.drawText(ActCom._list[ActCom._index].name,CommandName_X_coord,CommandName_Y_coord, CommandName_Width ,'center');
}

function CreateCommandNameField(baseX,baseY){
	let namefield = new Window_Base(new Rectangle(baseX+7,baseY+6,256,256));
	namefield.contents.fontSize = 24;
	namefield.drawText('', CommandName_X_coord,CommandName_Y_coord, CommandName_Width ,'center');
	namefield.setBackgroundType(2);// not to show window (just draw name)
	return namefield;
}


}());
