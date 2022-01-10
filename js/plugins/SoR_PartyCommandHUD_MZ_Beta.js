//=============================================================================
// SoR_PartyCommandHUD_MZ_Beta.js
// SoR License inherited from MIT License (C) 2020 蒼竜
// http://dragonflare.blue/dcave/license.php
// ---------------------------------------------------------------------------
// Latest version v1.10 (2021/03/24)
//=============================================================================
/*:
@plugindesc ＜パーティコマンドHUD単品 Type-β＞ v1.10
@author 蒼竜
@target MZ
@url http://dragonflare.blue/dcave/
@help パーティコマンドの表示形式を変更します。
機能の広範化により、製作者ごとに無駄な処理が氾濫することを抑制するため、
UIデザインの方向性ごとにスクリプトファイルを分けています。
好みのスタイルのものを1つだけ選んで導入してください。
(このスクリプトは、"Type-β"のものです。)

@param ======General Settings======
@param IsActorStatusPositionAdjust
@desc 'true'の時、デフォルトのステータス画面位置を調節します。  (default: false)
@default false
@type boolean
@param IsActorStatusPositionFixed
@desc 'true'の時、デフォルトのステータス画面位置を中央に固定します。  (default: false)
@default false
@type boolean
@param ======UI Settings======

@param UIbase_X-coordinate
@desc UI土台画像を置くx座標(default: 300)
@default 300
@type number
@param UIbase_Y-coordinate
@desc UI土台画像を置くy座標(default: 288)
@default 288
@type number

@param UIover_X-coordinate
@desc UI層に重ね置きする画像を置くx座標(default: 0)
@default 0
@type number
@param UIover_Y-coordinate
@desc UI上層に重ね置きする画像を置くy座標(default: 0)
@default 0
@type number

@param CommandPadd_X-coordinate
@desc コマンドアイコンの配置開始位置のx方向の補正量(default: 128)
@default 128
@type number
@param CommandPadd_Y-coordinate
@desc コマンドアイコンの配置開始位置のy方向の補正量(default: 108)
@default 108
@type number

@param CommandName_X-coordinate
@desc 選択中のコマンド名を表示する位置のx座標(default: 30)
@default 30
@type number
@param CommandName_Y-coordinate
@desc 選択中のコマンド名を表示する位置のy座標(default: 66)
@default 66
@type number
@param CommandName_Width
@desc 選択中のコマンド名の最大表示幅(default: 160)
@default 160
@type number

@param Commands_Radius
@desc コマンド半径(default: 108)
@default 108
@type number

@param ReverseRotationDir
@desc 'true': リング回転方向を初期設定と反対にする (default: false)
@default false
@type boolean
*/

var Imported = Imported || {};
if(Imported.SoR_PartyCommandHUD) throw new Error("[SoR_PartyCommandHUD_MZ] Do NOT import more than 2 types of <SoR_PartyCommandHUD> series.");
Imported.SoR_PartyCommandHUD = true;

var SoR = SoR || {};

(function() {
const Param = PluginManager.parameters('SoR_PartyCommandHUD_MZ_Beta');
const IsActorStatusPositionAdjust = Boolean(Param['IsActorStatusPositionAdjust'] === 'true') || false;
const IsActorStatusPositionFixed = Boolean(Param['IsActorStatusPositionFixed'] === 'true') || false;

const UIbase_X_coord = Number(Param['UIbase_X-coordinate'] || 300);
const UIbase_Y_coord = Number(Param['UIbase_Y-coordinate'] || 288);
const UIover_X_coord = Number(Param['UIover_X-coordinate'] || -15);
const UIover_Y_coord = Number(Param['UIover_Y-coordinate'] || -15);
const CommandPadd_X_coord = Number(Param['CommandPadd_X-coordinate'] || 128);
const CommandPadd_Y_coord = Number(Param['CommandPadd_Y-coordinate'] || 108);
const CommandName_X_coord = Number(Param['CommandName_X-coordinate'] || 30);
const CommandName_Y_coord = Number(Param['CommandName_Y-coordinate'] || 66);
const CommandName_Width = Number(Param['CommandName_Width'] || 160);
const Commands_Radius = Number(Param['Commands_Radius'] || 108);

//v1.10
const ReverseRotationDir = (Boolean(Param['ReverseRotationDir'] === 'true' || false)) ? -1 : 1;

	
ImageManager.loadBattleCommandSprite_party = function(filename) {
    return this.loadBitmap('img/SoRBatCom/', filename, 0, true);
}
	

const SoR_PCM_SB_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
Scene_Battle.prototype.createDisplayObjects = function(){
	SoR_PCM_SB_createDisplayObjects.call(this);
	this.SoR_PartyBatCommand_init();
}
 
Scene_Battle.prototype.SoR_PartyBatCommand_init = function() {
	
	this.SoR_PartyBcomField = new Sprite();
	this.addChild(this.SoR_PartyBcomField);		
    
	this.SoR_partybcom = new SoR_PartySpriteCommand();
	this.SoR_PartyBcomField.addChild(this.SoR_partybcom.basespr);
	if(this.SoR_partybcom.basesprU!=null) this.SoR_PartyBcomField.addChild(this.SoR_partybcom.basesprU);
	this.SoR_PartyBcomField.addChild(this.SoR_partybcom.ComNameWindow)
}

////////////////////
const SoR_PCM_SB_updateBattleProcess = Scene_Battle.prototype.updateBattleProcess;
Scene_Battle.prototype.updateBattleProcess = function() {
    SoR_PCM_SB_updateBattleProcess.call(this);
	
	if(this._partyCommandWindow.active==true){ 
	 this.SoR_partybcom.updateCommand(this._partyCommandWindow);
	}
}

const SoR_PCM_SB_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
Scene_Battle.prototype.startPartyCommandSelection = function() {
	SoR_PCM_SB_startPartyCommandSelection.call(this);
	this.startPartyCommandDelete();
	this.SoR_partybcom.setup_PartyCommand(this._partyCommandWindow);
	this.startPartyCommandInstall();
}



Scene_Battle.prototype.startPartyCommandDelete = function() {
	for(let i=0; i<this.SoR_partybcom.command_icons.length; i++){
         this.SoR_PartyBcomField.removeChild(this.SoR_partybcom.command_icons[i]);
	}
}
Scene_Battle.prototype.startPartyCommandInstall = function() {
	for(let i=0; i<this.SoR_partybcom.command_icons.length; i++){
         this.SoR_PartyBcomField.addChild(this.SoR_partybcom.command_icons[i]);
	}
	this.SoR_partybcom.setVisible();
}


///////////////////////////////////////////
Scene_Battle.prototype.partyCommandWindowRect = function() {
	const x = -1000 ; 
    const y = 0;
	const w = 1;
	const h = 1;
    return new Rectangle(x, y, w, h);
}

Window_PartyCommand.prototype.initialize = function(rect) {
    Window_Command.prototype.initialize.call(this, rect);
    this.openness = 0;
    this.deactivate();
	this.RC_basesprite_disable();
}

Window_PartyCommand.prototype.fittingHeight = function() {
    return this.numVisibleRows() * this.itemHeight() + $gameSystem.windowPadding() * 2;
	
}

Window_PartyCommand.prototype.windowWidth = function() {
    return 192;
}

Window_PartyCommand.prototype.RC_basesprite_disable = function() {
	this.contentsOpacity = 0;
	this.opacity = 0;
}

Window_PartyCommand.prototype.numVisibleRows = function() {
    return 1;
}

Window_PartyCommand.prototype.maxCols = function() {
	if(this._list) return this._list.length;
	else return 1;
}


const SoR_PC_SB_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
Scene_Battle.prototype.startActorCommandSelection = function() {
	SceneManager._scene.SoR_partybcom.setInvisible();
	SoR_PC_SB_startActorCommandSelection.call(this);
}


const SoR_PC_SB_commandEscape = Scene_Battle.prototype.commandEscape;
Scene_Battle.prototype.commandEscape = function() {
	SceneManager._scene.SoR_partybcom.setInvisible();
    SoR_PC_SB_commandEscape.call(this);
}


/////////////////////////////////////////////////////////////
// Side input
Window_PartyCommand.prototype.processCursorMove = function() {	
	let Inputting = 0;
	this._prev=0;
	if(this.comwait && this.comwait>0) return;
	
	if (this.isOpenAndActive()){
		if (Input.isRepeated('right')) Inputting = 1*ReverseRotationDir; 
		if (Input.isRepeated('left')) Inputting = -1*ReverseRotationDir;
	}	
	if(Inputting!=0){
		if((Inputting==1 && Inputting+this._index < this._list.length) ||(Inputting==-1 && Inputting+this._index >= 0)){
			SoundManager.playCursor();
			this._prev = Inputting;
			this._index += Inputting;
		}
	}
}

//wheel input
Window_PartyCommand.prototype.processWheelScroll = function() {	
	var Inputting = 0;
	this._Mprev=0;
	if(this.comwait && this.comwait>0) return;
	
    if (this.isOpenAndActive()) {
        var threshold = 25;
        if (TouchInput.wheelY >= threshold) Inputting = 1*ReverseRotationDir; 
        if (TouchInput.wheelY <= -threshold) Inputting = -1*ReverseRotationDir;
		
		if(Inputting!=0){
			if((Inputting==1 && Inputting+this._index < this._list.length) ||(Inputting==-1 && Inputting+this._index >= 0)){
				SoundManager.playCursor();
				this._Mprev = Inputting;
				this._index += Inputting;
			}		
		}
    }
	
}


Window_PartyCommand.prototype.processTouchScroll = function() {
	this._Tprev=0;
	
    if (this.isOpenAndActive()) {
		if (TouchInput.isCancelled()) {
            if (this.isCancelEnabled()) this.processCancel();
		} else if (TouchInput.isTriggered() && this.isTouchRingCom()) {
			this.comwait = 8;
			//this.processOk();
        }
	}
}

Window_PartyCommand.prototype.isTouchRingCom = function() {
	var flag = false;
	var comms = SceneManager._scene.SoR_partybcom;

	for(var i=0; i<comms.command_icons.length; i++){
		if (comms.command_enable[i]==true) {
			if(CheckIconTouch(comms.command_icons[i],i)!=-1){
				this._Tprev= i-this._index;
				this._index = i;
				flag = true;
				break;
			}
		}
	}
	
	return flag;	
}

function CheckIconTouch(currentIcon,id){
	var ret = -1;
	var Tx = TouchInput.x;
    var Ty = TouchInput.y;
	var wd = currentIcon.bitmap.width;
	var ht = currentIcon.bitmap.height;	
	if(Tx >= currentIcon.x-wd/2 && Tx <= currentIcon.x+wd/2){
	  if(Ty >= currentIcon.y-ht/2 && Ty <= currentIcon.y+ht/2){
		  ret = id;
	  }
	}
   return ret;
}


var SoR_PCM_WPC_update = Window_PartyCommand.prototype.update;
Window_PartyCommand.prototype.update = function() {
	
	if (this.comwait && this.comwait > 0) {
		this.comwait--;
		if(this.comwait==0) this.processOk();
		//return;
	}
	SoR_PCM_WPC_update.call(this);
};




/////////////////////////////////////////





if(IsActorStatusPositionAdjust){
	Scene_Battle.prototype.updateWindowPositions = function() {
		var statusX;

		if(IsActorStatusPositionFixed) statusX = Graphics.boxWidth/2 - this._statusWindow.width/2;
		else{
			if (BattleManager.isInputting() && this._actorCommandWindow.openness > 0) {
			statusX = this._actorCommandWindow.width;
			}
			else statusX = Graphics.boxWidth/2 - this._statusWindow.width/2;
		}
		
		if (this._statusWindow.x < statusX) {
			this._statusWindow.x += 16;
			if (this._statusWindow.x > statusX) {
				this._statusWindow.x = statusX;
			}
		}
		if (this._statusWindow.x > statusX) {
			this._statusWindow.x -= 16;
			if (this._statusWindow.x < statusX) {
				this._statusWindow.x = statusX;
			}
		}	
	}
}




function SoR_PartySpriteCommand(){
	this.initialize.apply(this, arguments);
}



SoR_PartySpriteCommand.prototype.initialize = function(){
	this.x = UIbase_X_coord;
	this.y = UIbase_Y_coord;
	this.current_idx = 0;
	this.ring_rotate = 0;
	
	this.ring_maxrot = 0;
	this.reserved_idx = 0;
	this.Is_ring_rot = false;
	this.rot_duration = 6;
	
	this.radius = Commands_Radius;
	this.visible = false;
	this.basespr = null;
	this.basesprU = null;
	this.maxicons = 0;	
	this.cursor_icon_emph = 0; // scale icons for current index
	
	this.command_layer_img = ImageManager.loadBattleCommandSprite_party("Layout_Party");
	this.command_icons = [];
	this.command_enable = [];
	this.command_layerU_img = ImageManager.loadBattleCommandSprite_party("Layout_Party2");
	this.com_rot = [];

	this.ComNameWindow = CreateCommandNameField(this.x,this.y);
	
	this.create_basespr();
}


// call in actor command
SoR_PartySpriteCommand.prototype.setup_PartyCommand = function(comact){
	this.loadRingCommandImages(comact);
	this.create_commandIcon_spr();
	this.Is_ring_rot = false;
	this.current_idx = 0;
	this.reserved_idx = 0;
	this.ring_rotate = 0;
	
	this.basespr.visible = true;
	this.basesprU.visible = true;
	this.stack_coms = [];
	this.com_rot = [];
}

////////////////////////////////////////////////////////
SoR_PartySpriteCommand.prototype.setVisible = function(){
	this.visible = true;
	this.setcomponents();
}
SoR_PartySpriteCommand.prototype.setInvisible = function(){
	this.visible = false;
	this.setcomponents();
}

SoR_PartySpriteCommand.prototype.setcomponents = function(){
  this.basespr.visible = this.visible;
  this.basesprU.visible = this.visible;
  this.ComNameWindow.visible = this.visible;
  for(var i=0; i<this.maxicons; i++) this.command_icons[i].visible = this.visible;
}


//prepare images
SoR_PartySpriteCommand.prototype.loadRingCommandImages = function(ActCom){
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
       this.command_imgs.push(ImageManager.loadBattleCommandSprite_party(fname));
	}
}


SoR_PartySpriteCommand.prototype.create_basespr = function(){
	this.basespr = new Sprite(this.command_layer_img);
	this.basespr.x = this.x;
	this.basespr.y = this.y;
	this.basespr.visible = this.visible;
	this.basesprU = new Sprite(this.command_layerU_img);
	this.basesprU.x = this.x +UIover_X_coord;
	this.basesprU.y = this.y +UIover_Y_coord;
	this.basesprU.visible = this.visible;
}
SoR_PartySpriteCommand.prototype.create_commandIcon_spr = function(){
	this.command_icons = [];

	let rotate_main = 2.0*Math.PI /this.maxicons;
	for(let i=0; i<this.maxicons; i++){
		this.command_icons[i] = new Sprite(this.command_imgs[i]);		
		this.command_icons[i].x = this.radius * Math.sin((-rotate_main)*i ) +this.x+CommandPadd_X_coord;
		this.command_icons[i].y = 0.25*this.radius * Math.cos((-rotate_main)*i ) +this.y+CommandPadd_Y_coord;
		this.command_icons[i].visible = true;
		this.command_icons[i].scale.x = 1.0;
		this.command_icons[i].scale.y = 1.0;
		this.command_icons[i].anchor.x = 0.5;
		this.command_icons[i].anchor.y = 0.5;
	}	
}

SoR_PartySpriteCommand.prototype.updateCommand = function(ActCom){
    let prev = ActCom._prev + ActCom._Mprev + ActCom._Tprev;
   
    if(prev !=0){ 
		this.stack_coms.push(prev);
		if(this.stack_coms[0]+this.stack_coms[1]==0){
			this.stack_coms.shift();
			this.stack_coms.shift();
		}
	}
		
	if(!this.Is_ring_rot && this.stack_coms.length > 0){
		var push = this.stack_coms[0]; //prev
		this.stack_coms.shift();

		if(push+this.current_idx >= 0 && push+this.current_idx < ActCom._list.length ){	
		
		var Dist = this.current_idx - ActCom._index;
		
		this.ring_rotate = (push>0?1:-1)*this.rot_duration;
		this.ring_maxrot = (push>0?1:-1)*this.rot_duration;
		this.reserved_idx = ActCom._index;
		this.com_rot = [];
			for(var i=0; i<this.maxicons; i++){
			var nl = this.reserved_idx; 
			var nr = this.maxicons-1-this.reserved_idx;
			
			var L_ang, R_ang;
			if(nl == 0) L_ang = 0;
			else L_ang = (Math.PI/2)/nl;
			if(nr == 0) R_ang = 0;
			else R_ang = (Math.PI/2)/nr;
			
			var newRot;
			if(i==0){//left end
				if(i!=this.reserved_idx)newRot = Math.PI/2;
				else newRot = Math.PI;							
			}
			else if(i==this.maxicons-1){//right end
				if(i!=this.reserved_idx) newRot = 3*Math.PI/2;
　　　　　　　　　　　　　　　　else newRot = Math.PI;
			}		
			else{//other icons
				if(i==this.reserved_idx) newRot = Math.PI;
				else{
					if(i<this.reserved_idx){
						newRot = Math.PI/2 + L_ang*i;					
					}
					else{
						var ri = i- this.reserved_idx;
						newRot = Math.PI + R_ang*ri;
					}
				}
			}
				
			nl = this.current_idx; 
			nr = this.maxicons-1-this.current_idx;
			
			if(nl == 0) L_ang = 0;
			else L_ang = (Math.PI/2)/nl;
			if(nr == 0) R_ang = 0;
			else R_ang = (Math.PI/2)/nr;
			
			var currentR;
			if(i==0){//left end
				if(i!=this.current_idx)	currentR = Math.PI/2;
				else currentR = Math.PI;							
			}
			else if(i==this.maxicons-1){//right end
				if(i!=this.current_idx) currentR = 3*Math.PI/2;
				else currentR = Math.PI;
			}		
			else{//other icons
				if(i==this.current_idx)	currentR = Math.PI;
				else{
					if(i<this.current_idx)	currentR = Math.PI/2 + L_ang*i;				
					else{
						var ri = i- this.current_idx;
						currentR = Math.PI + R_ang*ri;
					}
				}
			}
			
		this.com_rot.push(currentR - newRot);		
		}//loop end
		this.Is_ring_rot = true;
		}
	}
	 
	
	
	for(var i=0; i<this.maxicons; i++){
		var nleft = this.current_idx; 
		var nright = this.maxicons-1-this.current_idx;
		
		var L_angle, R_angle;
		if(nleft == 0) L_angle = 0;
		else L_angle = (Math.PI/2)/nleft;
		if(nright == 0) R_angle = 0;
		else R_angle = (Math.PI/2)/nright;

		if(this.com_rot.length != 0) var rot = -1*this.com_rot[i] *((this.ring_maxrot-this.ring_rotate)/this.ring_maxrot);
		else var rot = 0;
		var r_rad;
		
		if(i==0){//left end
			if(i!=this.current_idx)	r_rad = Math.PI/2+rot;
			else　r_rad = Math.PI+rot;
		}
		else if(i==this.maxicons-1){//right end
			if(i!=this.current_idx)	r_rad = 3*Math.PI/2+rot;
			else　r_rad = Math.PI+rot;				
		}		
		else{//other icons
			if(i==this.current_idx)	r_rad = Math.PI+rot;
			else{
				if(i<this.current_idx)　r_rad = Math.PI/2 + L_angle*i+rot;		
				else{
					let ri = i- this.current_idx;
					r_rad = Math.PI + R_angle*ri+rot;
				}
			}
		}
		
		
		this.command_icons[i].x = this.radius * Math.sin(r_rad) +this.x+CommandPadd_X_coord;
		this.command_icons[i].y = this.radius * Math.cos(r_rad) +this.y+CommandPadd_Y_coord;					
		this.command_icons[i].visible = true;
		
		this.command_icons[i].scale.x = 1.0 - Math.abs(r_rad　- Math.PI)*0.1;
		this.command_icons[i].scale.y = 1.0 - Math.abs(r_rad　- Math.PI)*0.1;
	}

	let enabled = ActCom.isCommandEnabled(this.current_idx) ? 1 : 0; // enable to use this command?
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
		  this.com_rot = [];
		  this.Is_ring_rot = false;
		}
	}
}

SoR_PartySpriteCommand.prototype.updateComName = function(ActCom){
	this.ComNameWindow.contents.clear();	
	this.ComNameWindow.drawText(ActCom._list[ActCom._index].name,CommandName_X_coord,CommandName_Y_coord, CommandName_Width  ,'center');
}

function CreateCommandNameField(baseX,baseY){
	let namefield = new Window_Base(new Rectangle(baseX+4,baseY+4,324,132));
	namefield.contents.fontSize = 22;
	namefield.drawText('', CommandName_X_coord,CommandName_Y_coord, CommandName_Width  ,'center');
	namefield.setBackgroundType(2);// not to show window (just draw name)
	return namefield;
}

}());

