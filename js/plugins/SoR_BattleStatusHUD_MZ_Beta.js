//=============================================================================
// SoR_BattleStatusHUD_MZ_Beta.js
// SoR License inherited from MIT License (C) 2020 蒼竜
// http://dragonflare.blue/dcave/license.php
// ---------------------------------------------------------------------------
// Latest version v2.01 (2021/04/07)
//=============================================================================
/*:
@plugindesc ＜戦闘ステータスウィンドウ・改 Type-β＞ v2.01
@author 蒼竜
@target MZ
@url http://dragonflare.blue/dcave/
@help 戦闘画面のパーティーメンバーのステータスウィンドウ部分のみを
自作UIへ変更します(デフォルトのウィンドウは除去・不可視化します)。
他にある総合的プラグインの副産物の位置づけにあるものと違い、
プラグイン競合の危険を和らげ、製作者ごとのより細かなゲームシステムの
管理を円滑にするために「ステータスウィンドウ」単体を差し替えることだけに
特化（製作者個人にとって余計な副次的機能をなるべく導入しない）しています。

このスクリプトは"Type-β"のものです。TPBのゲージ機能が付いています。
TPB機能の反映が必要でない場合は"Type-α"を使用してください。
他の戦闘UI系の調整プラグインとの併用を前提としています。
本プラグイン単体では、レイアウトの都合で使いづらいと思われます。

※v2.00はMZ特化としてv1.xxでの多数の要望を取り込みつつ作り直した
「ほぼリメイク」品となります。v1.xxのプラグインパラメータ設定や
基本的な表示挙動は踏襲していますが、内部仕様・実装の大幅変更による
変更点が多いためpdfドキュメントを参考にするなどして、留意してください。
(基本構造は変わらないので、競合情報等はv1.xxから変更ありません)
@param =====描画全般=====
@param Maximum_NumBattlers
@desc ゲーム中を通して戦闘に参加する「最大」の人数 (default:4)
@default 4
@type number
@param Maximum_BattlersForColmun
@desc 横(1列)にHUDを並べるアクター数。1にすると完全な縦並び (default:4)
@default 4
@type number
@param Duration_DamageShake
@desc アクター被ダメージ時のHUDの減衰振動効果時間。0で機能無効化 (default:0)
@default 40
@type number
@min 0

@param IsFaceSprite_Individual
@desc 'true': 専用に用意した顔グラフィックを利用する。 'false': データベースのアクター設定を参照して利用する (default: false)
@default false
@type boolean
@param scaleX_ActorFace_onDB
@desc データベースに設定した顔グラフィック使用時、HUDで表示する際の横方向の拡大倍率(default:0.4)
@default 0.4
@type number
@param scaleY_ActorFace_onDB
@desc データベースに設定した顔グラフィック使用時、HUDで表示する際の縦方向の拡大倍率(default:0.4)
@default 0.4
@type number

@param IsAlignStates
@desc 'true': 状態変化を横並びにする 'false': 状態変化を1つのみ表示&時間ごとに表示アイコン逐次切替(default:true)
@default true
@type boolean
@param Maximum_NumAlignStates
@desc IsAlignStates='true'のとき、並べる状態変化アイコンの最大数(default:4)
@default 4
@type number

@param IsActorNameDraw
@desc 'true': HUDにアクター名を表示 'false': 表示しない (default: true)
@default true
@type boolean

@param IsAnimation_onActors
@desc 'true': アクター対象スキルアニメーションをHUD上に描画する。フロントビュー戦闘想定 (default: false)
@default false
@type boolean

@param ----基本設定----
@param Show_MaximumHP
@desc 'true': HUDに最大HPを表示する, falseの場合は関連設定無効・不要 (default: true)
@default true
@type boolean
@param Show_TPGauge
@desc 'true': HUDにTPゲージを表示する, falseの場合は関連設定無効・不要 (default: false)
@default false
@type boolean
@param Direction_HUDShowAndHide
@desc HUDを画面外へ対比させる時の移動方向 (出し入れの方向はHUD座標依存。画面外に近い方を採用する)
@type select
@option 垂直
@value 0
@option 水平
@value 1
@default 0

@param ----画像読み込み指定----
@param ImageFile_HUDBase
@desc HUD土台画像 (default: "Layout")
@type file
@dir img/SoRBatHUD/
@default Layout
@param ImageFile_HUDOver
@desc HUD土台に重ね置きする上レイヤー画像 (default: "Layout2")
@type file
@dir img/SoRBatHUD/
@default Layout2
@param ImageFile_TurnIndicator
@desc HUDに表示するコマンド入力中アクターをハイライトする画像 (default: "Turn")
@type file
@dir img/SoRBatHUD/
@default Turn
@param ImageFile_TargetIndicator
@desc HUDに表示するコマンド選択中の対象味方アクターをハイライトする画像 (default: "Targets")
@type file
@dir img/SoRBatHUD/
@default Targets

@param ImageFile_HPnormal
@desc 通常時の現在HP数値画像 (default: "HP_Number")
@type file
@dir img/SoRBatHUD/
@default HP_Number
@param ImageFile_HPfull
@desc HP最大時の現在HP数値画像，指定無しで無効
@type file
@dir img/SoRBatHUD/
@default 
@param ImageFile_HPdying
@desc 少HP時の現在HP数値画像，指定無しで無効
@type file
@dir img/SoRBatHUD/
@default 
@param ImageFile_HPdead
@desc 戦闘不能時の現在HP数値画像，指定無しで無効
@type file
@dir img/SoRBatHUD/
@default 

@param ImageFile_MaxHP
@desc 通常時の現在HP数値画像 (default: "HP_Number2")
@type file
@dir img/SoRBatHUD/
@default HP_Number2
@param ImageFile_MP
@desc 通常時の現在MP数値画像 (default: "MP_Number")
@type file
@dir img/SoRBatHUD/
@default MP_Number
@param ImageFile_TP
@desc 通常時の現在TP数値画像 (default: "TP_Number")
@type file
@dir img/SoRBatHUD/
@default TP_Number

@param ImageFile_HPmeter
@desc HPゲージ用画像 (default: "HP_Meter")
@type file
@dir img/SoRBatHUD/
@default HP_Meter
@param ImageFile_MPmeter
@desc MPゲージ用画像 (default: "MP_Meter")
@type file
@dir img/SoRBatHUD/
@default MP_Meter
@param ImageFile_TPmeter
@desc TPゲージ用画像 (default: "TP_Meter")
@type file
@dir img/SoRBatHUD/
@default TP_Meter
@param ImageFile_TPBmeter
@desc TPBゲージ用画像 (default: "TPB_Meter")
@type file
@dir img/SoRBatHUD/
@default TPB_Meter

@param =====HUD全体=====
@param base_X-coordinate
@desc １番目のキャラクターHUD全体(基準)のx座標(描画領域左上の点)(default: 10)
@default 10
@type number
@param base_Y-coordinate
@desc １番目のキャラクターHUD全体(基準)のy座標(描画領域左上の点)(default: 0)
@default 0
@type number
@param Space_width
@desc n番目とn+1番目のキャラクターHUDの間隔の横幅長さ(default: 190)
@default 190
@type number
@param Space_height
@desc HUDの間隔の縦幅長さ，HUDが縦配置になる場合のみ有効 (default: 88)
@default 88
@type number
@param ----HUD内部レイアウト----
@param これより下、base_X(Y)-coordinateの座標を基準(0,0)とする
@param ++++土台++++
@param HUDbase_X-coordinate
@desc HUD最下層に配置される土台画像を置くx座標(default: 23)
@default 23
@type number
@param HUDbase_Y-coordinate
@desc HUD最下層に配置される土台画像を置くy座標(default: 13)
@default 13
@type number

@param HUDover_X-coordinate
@desc 土台画像の上層に重ね置きする画像を置くx座標(default: 23)
@default 23
@type number
@param HUDover_Y-coordinate
@desc 土台画像の上層に重ね置きする画像を置くy座標(default: 13)
@default 13
@type number

@param turnIndicator_X-coordinate
@desc コマンド入力キャラクター用のハイライト画像を置くx座標(default: 0)
@default 0
@type number
@param turnIndicator_Y-coordinate
@desc コマンド入力キャラクター用のハイライト画像を置くy座標(default: 0)
@default 0
@type number

@param ++++メーター関係++++
@param HP_meter_X-coordinate
@desc HPメーターを置くx座標(default: 46)
@default 46
@type number
@param HP_meter_Y-coordinate
@desc HPメーターを置くy座標(default: 30)
@default 30
@type number
@param MP_meter_X-coordinate
@desc MPメーターを置くを置くx座標(default: 46)
@default 46
@type number
@param MP_meter_Y-coordinate
@desc MPメーターを置くy座標(default: 44)
@default 44
@type number
@param TP_meter_X-coordinate
@desc TPメーターを置くを置くx座標(default: 341)
@default 341
@type number
@param TP_meter_Y-coordinate
@desc TPメーターを置くy座標(default: 18)
@default 18
@type number

@param TPB_meter_X-coordinate
@desc TPBのチャージメーターを置くを置くx座標(default: 42)
@default 42
@type number
@param TPB_meter_Y-coordinate
@desc TPBのチャージメーターを置くy座標(default: 55)
@default 55
@type number

@param ++++ステータス関係++++
@param Face_X-coordinate
@desc 顔グラフィックを置くx座標(default: 0)
@default 0
@type number
@param Face_Y-coordinate
@desc 顔グラフィックを置くy座標(default: 15)
@default 15
@type number
@param StateIcon_X-coordinate
@desc 状態変化アイコンを置くx座標(default: 5)
@default 5
@type number
@param StateIcon_Y-coordinate
@desc 状態変化アイコンを置くy座標(default: 62)
@default 62
@type number

@param MHP_X-coordinate
@desc 最大HPの数値グラフィックを置く基準x座標(この数値に基づいて数値全体を配置)(default: 170)
@default 170
@type number
@param MHP_Y-coordinate
@desc 最大HPの数値グラフィックを置く基準y座標(default: 36)
@default 36
@type number
@param HP_X-coordinate
@desc 現在HPの数値グラフィックを置く基準x座標(default: 110)
@default 110
@type number
@param HP_Y-coordinate
@desc 現在HPの数値グラフィックを置く基準y座標(default: 39)
@default 39
@type number
@param MP_X-coordinate
@desc 現在MPの数値グラフィックを置く基準x座標(default: 150)
@default 150
@type number
@param MP_Y-coordinate
@desc 現在MPの数値グラフィックを置く基準y座標(default: 56)
@default 56
@type number
@param TP_X-coordinate
@desc 現在TPの数値グラフィックを置く基準x座標(default: 148)
@default 148
@type number
@param TP_Y-coordinate
@desc 現在TPの数値グラフィックを置く基準y座標(default: 69)
@default 69
@type number

@param ++名前描画(IsActorNameDraw==true時のみ)に関する調整++
@param ActorName_X-coordinate
@desc アクター名を置くx座標(default: 42)
@default 42
@type number
@param ActorName_Y-coordinate
@desc アクター名を置くy座標(default: 0)
@default 0
@type number
@param ActorName_Fontsize
@desc HUDに描画するアクター名のフォントサイズ(default: 17)
@default 17
@type number

@param +++その他微細な調整+++
@param PaddingForActorName
@desc アクター名描画用の表示位置補正(default: -14)
@default -14
@type number
@param StatusNumber_AlignWidth
@desc HPやMP等の数値の桁と桁の描画間隔補正(default: -2)
@default -2
@type number

@param ActorFaceDrawRect_Upper
@desc 顔表示領域の上端。-1のとき画像の上端
@default -1
@type number
@param ActorFaceDrawRect_Lower
@desc 顔表示領域の下端。-1のとき画像の下端
@default -1
@type number

@param Enable_ActorHUDTouch
@desc 'true': アクター選択において，HUDタッチによる選択を可能にする (default: false)
@default false
@type boolean
*/
 
var Imported = Imported || {};
if(Imported.SoR_BattleHUDseries) throw new Error("[SoR_BattleHUD] Do NOT import more than 2 types of <SoR_BattleStatusHUD> series.");

Imported.SoR_BattleHUDseries = true;
var SoR = SoR || {};

(function() {
const Param = PluginManager.parameters('SoR_BattleStatusHUD_MZ_Beta');

const IsFaceSprite = Boolean(Param['IsFaceSprite_Individual'] === 'true') || false;
const scaleX_Face_default = Number(Param['scaleX_ActorFace_onDB'] || 0.5); 
const scaleY_Face_default = Number(Param['scaleY_ActorFace_onDB'] || 0.5); 
const IsAlignStatesonHUD = Boolean(Param['IsAlignStates'] === 'true') || false;
const Num_AlignStates = Number(Param['Maximum_NumAlignStates'] || 4); 

const base_X_coord = Number(Param['base_X-coordinate'] || 20); 
const base_Y_coord = Number(Param['base_Y-coordinate'] || 0);
const Space_width = Number(Param['Space_width'] || 280);
const HUDbase_X_coord = Number(Param['HUDbase_X-coordinate'] || 60);
const HUDbase_Y_coord = Number(Param['HUDbase_Y-coordinate'] || 12);
const HUDover_X_coord = Number(Param['HUDover_X-coordinate'] || 60);
const HUDover_Y_coord = Number(Param['HUDover_Y-coordinate'] || 12);
const turnInd_X_coord = Number(Param['turnIndicator_X-coordinate'] || 0);
const turnInd_Y_coord = Number(Param['turnIndicator_Y-coordinate'] || 0);
const Face_X_coord = Number(Param['Face_X-coordinate'] || 0);
const Face_Y_coord = Number(Param['Face_Y-coordinate'] || 0);
const HPmeter_X_coord = Number(Param['HP_meter_X-coordinate'] || 19);
const HPmeter_Y_coord = Number(Param['HP_meter_Y-coordinate'] || 26);
const MPmeter_X_coord = Number(Param['MP_meter_X-coordinate'] || 40);
const MPmeter_Y_coord = Number(Param['MP_meter_Y-coordinate'] || 46);
const StateIcon_X_coord = Number(Param['StateIcon_X-coordinate'] || 0);
const StateIcon_Y_coord = Number(Param['StateIcon_Y-coordinate'] || 46);

const MHPsprite_X_coord = Number(Param['MHP_X-coordinate'] || 255);
const MHPsprite_Y_coord = Number(Param['MHP_Y-coordinate'] || 28);
const HPsprite_X_coord = Number(Param['HP_X-coordinate'] || 172);
const HPsprite_Y_coord = Number(Param['HP_Y-coordinate'] || 31);
const MPsprite_X_coord = Number(Param['MP_X-coordinate'] || 245);
const MPsprite_Y_coord = Number(Param['MP_Y-coordinate'] || 69);
const TPsprite_X_coord = Number(Param['TP_X-coordinate'] || 160);
const TPsprite_Y_coord = Number(Param['TP_Y-coordinate'] || 76);

const TPBmeter_X_coordinate = Number(Param['TPB_meter_X-coordinate'] || 42);
const TPBmeter_Y_coordinate = Number(Param['TPB_meter_Y-coordinate'] || 55);


const StatusNumber_AlignWidth = Number(Param['StatusNumber_AlignWidth'] || 0);

const IsActorNameDraw = Boolean(Param['IsActorNameDraw'] === 'true') || false;
const ActorName_X_coord = Number(Param['ActorName_X-coordinate'] || 42);
const ActorName_Y_coord = Number(Param['ActorName_Y-coordinate'] || 0);
const ActorName_FontSize = Number(Param['ActorName_Fontsize'] || 17);
const Pad_ActorName = Number(Param['PaddingForActorName'] || -15);

const ActorFaceRect_U = Number(Param['ActorFaceDrawRect_Upper'] || -1);
const ActorFaceRect_L = Number(Param['ActorFaceDrawRect_Lower'] || -1);

//v2.00
const TPmeter_X_coord = Number(Param['TP_meter_X-coordinate'] || 40);
const TPmeter_Y_coord = Number(Param['TP_meter_Y-coordinate'] || 46);
const Direction_HUDShowAndHide = Number(Param['Direction_HUDShowAndHide'] || 0);
const Space_height = Number(Param['Space_height'] || 280);
const Max_BattlePartyMembers = Number(Param['Maximum_NumBattlers'] || 4);
const NBattlersForColmun = Number(Param['Maximum_BattlersForColmun'] || 4);
const Duration_DamageShake = Number(Param['Duration_DamageShake'] || 40);

const IsAnimation_onActors = Boolean(Param['IsAnimation_onActors'] === 'true') || false;
const Show_MaximumHP = Boolean(Param['Show_MaximumHP'] === 'true') || false;
const Show_TPGauge = Boolean(Param['Show_TPGauge'] === 'true') || false;

const ImageFile_HUDBase = String(Param['ImageFile_HUDBase']) || '';
const ImageFile_HUDOver = String(Param['ImageFile_HUDOver']) || '';
const ImageFile_TurnIndicator = String(Param['ImageFile_TurnIndicator']) || '';
const ImageFile_TargetIndicator = String(Param['ImageFile_TargetIndicator']) || '';
const ImageFile_HPnormal = String(Param['ImageFile_HPnormal']) || '';
const ImageFile_HPfull = String(Param['ImageFile_HPfull']) || '';
const ImageFile_HPdying = String(Param['ImageFile_HPdying']) || '';
const ImageFile_HPdead = String(Param['ImageFile_HPdead']) || '';
const ImageFile_MaxHP = String(Param['ImageFile_MaxHP']) || '';
const ImageFile_MP = String(Param['ImageFile_MP']) || '';
const ImageFile_TP = String(Param['ImageFile_TP']) || '';
const ImageFile_HPmeter = String(Param['ImageFile_HPmeter']) || '';
const ImageFile_MPmeter = String(Param['ImageFile_MPmeter']) || '';
const ImageFile_TPmeter = String(Param['ImageFile_TPmeter']) || '';
const ImageFile_TPBmeter = String(Param['ImageFile_TPBmeter']) || '';

const Enable_ActorHUDTouch = Boolean(Param['Enable_ActorHUDTouch'] === 'true') || false;

ImageManager.loadBattleHudSprite = function(filename) {
    return this.loadBitmap('img/SoRBatHUD/', filename, 0, true);
}
ImageManager.reserveBattleHudSprite = function(filename) {
    return this.reserveBitmap('img/SoRBatHUD/', filename, 0, false, this._systemReservationId);
}

Game_Temp.prototype.hideBattleHUD = function(idx){
	if(!SceneManager._scene instanceof Scene_Battle) return; 
	const sb = SceneManager._scene;
	const nBM = Max_BattlePartyMembers;
	if(!idx){
		for(let i = 0; i < nBM; i++) sb._actor_battleHUDs[i].dismissHUD();
	}
	else{//indexed
		if(idx>=1 && idx <= nBM) sb._actor_battleHUDs[idx-1].dismissHUD();
	}
}

Game_Temp.prototype.showBattleHUD = function(idx){
	if(!SceneManager._scene instanceof Scene_Battle) return; 
	const sb = SceneManager._scene;
	const nBM = Max_BattlePartyMembers;
	if(!idx){
		for(let i = 0; i < nBM; i++) sb._actor_battleHUDs[i].appearHUD();
	}
	else{//indexed
		if(idx>=1 && idx <= nBM) sb._actor_battleHUDs[idx-1].appearHUD();
	}
}

//erase default window
const SoR_BSHUD_BS_initialize = Window_BattleStatus.prototype.initialize;
Window_BattleStatus.prototype.initialize = function(rect) { rect.x = -10000; SoR_BSHUD_BS_initialize.call(this, rect); }
Scene_Battle.prototype.updateStatusWindowPosition = function() {}
const SoR_BSHUD_BS_show = Window_BattleStatus.prototype.show;
Window_BattleStatus.prototype.show = function() { this.x = -10000; SoR_BSHUD_BS_show.call(this);}

const SoR_BSHUD_SB_create = Scene_Battle.prototype.create;
Scene_Battle.prototype.create = function() {
    SoR_BSHUD_SB_create.call(this);
	this.createSoR_BattleHUDs();
}

Scene_Battle.prototype.createSoR_BattleHUDs = function() {	
	this.SoR_createBattleStatueHUDField();	
	this.createBattleStatusHud();
	this.setInitialBattlers();
}

Scene_Battle.prototype.SoR_createBattleStatueHUDField = function() {
	this.SoR_hudField = new Sprite();
	if(IsAnimation_onActors) this._spriteset._battleField.addChildAt(this.SoR_hudField,1);
	else this.addChild(this.SoR_hudField);
}

Scene_Battle.prototype.createBattleStatusHud = function() {
	this._actor_battleHUDs = [];
	//for battle members
	const nBM = Max_BattlePartyMembers;

    for(let i = 0; i < nBM; i++) this._actor_battleHUDs.push(new BattleActorStatusHUD(i));
	this.sortHUDDrawOrder();
}

Scene_Battle.prototype.setInitialBattlers = function() {
	const nBM = Max_BattlePartyMembers;

    for(let i = 0; i < nBM; i++){
		const battler = $gameParty.battleMembers()[i];
		if(!battler) continue;
		this._actor_battleHUDs[i].setBattler(battler);
		this._actor_battleHUDs[i].drawActorBattleHUD(battler, i);// base info (as coordinate)
		this._actor_battleHUDs[i].updateActorHUDstatus(battler);
		this.drawBaseBattleStatusHud(i);
		this._actor_battleHUDs[i].state_icon = this._actor_battleHUDs[i].standby.ico;////
	}
}

Scene_Battle.prototype.setChangedBattlers = function(idx) {
	if(idx>=Max_BattlePartyMembers || idx<0) return;
	this.retreatBaseBattleStatusHud(idx);
	this._actor_battleHUDs[idx].resetBattler();

	const battler = $gameParty.battleMembers()[idx];
	this._actor_battleHUDs[idx].setBattler(battler);
	this.drawBaseBattleStatusHud(idx);
	this._actor_battleHUDs[idx].ForceappearHUD();
}

Scene_Battle.prototype.clearChangedBattlers = function(idx) {
	if(idx>=Max_BattlePartyMembers || idx<0) return;
	this._actor_battleHUDs[idx].ForcedismissHUD();
	this.retreatBaseBattleStatusHud(idx);
	this._actor_battleHUDs[idx].resetBattler();
}


const SoR_BSHUD_GB_performDamage = Game_Battler.prototype.performDamage;
Game_Battler.prototype.performDamage = function() {
	SoR_BSHUD_GB_performDamage.call(this);

	if($gameParty.inBattle()){
		//HUD SHAKE
		if (SceneManager._scene instanceof Scene_Battle) {
			const idx = $gameParty.battleMembers().indexOf(this);
			if(idx>=0) SceneManager._scene._actor_battleHUDs[idx].startDamageShake();
		}
	}
}

const SoR_BSHUD_SB_update = Scene_Battle.prototype.update
Scene_Battle.prototype.update = function() {
    this.updateSoRBattleHUD();
	SoR_BSHUD_SB_update.call(this);
}

//fix correct draw order
Scene_Battle.prototype.sortHUDDrawOrder = function() {
   this.SoR_hudField.children.sort(function(a, b){return a.prior-b.prior});
}

//draw base hud
Scene_Battle.prototype.drawBaseBattleStatusHud = function(id) {
	this.SoR_hudField.addChild(this._actor_battleHUDs[id].turnIndicator);
	this.SoR_hudField.addChild(this._actor_battleHUDs[id].targetIndicator);
		
	this.SoR_hudField.addChild(this._actor_battleHUDs[id].HUDbase);
	if(IsAnimation_onActors) this.SoR_hudField.addChild(this._actor_battleHUDs[id].HUDbaseAnchor);

	this.SoR_hudField.addChild(this._actor_battleHUDs[id].HUDover);
	this.SoR_hudField.addChild(this._actor_battleHUDs[id].face);
	
	this.SoR_hudField.addChild(this._actor_battleHUDs[id].HP_meter_dec);
	this.SoR_hudField.addChild(this._actor_battleHUDs[id].HP_meter);
	this.SoR_hudField.addChild(this._actor_battleHUDs[id].MP_meter_dec);
	this.SoR_hudField.addChild(this._actor_battleHUDs[id].MP_meter);

	if(Show_TPGauge){
		this.SoR_hudField.addChild(this._actor_battleHUDs[id].TP_meter);
		this.SoR_hudField.addChild(this._actor_battleHUDs[id].TP_meter_dec);
	}
	this.SoR_hudField.addChild(this._actor_battleHUDs[id].TPB_meter);
	if(this._actor_battleHUDs[id].namewindow)this.SoR_hudField.addChild(this._actor_battleHUDs[id].namewindow);
}

//delete base hud (for battle end, ... escape, win...)
Scene_Battle.prototype.deleteBaseBattleStatusHud = function(id) {
	this.SoR_hudField.removeChild(this._actor_battleHUDs[id].turnIndicator);
	this.SoR_hudField.removeChild(this._actor_battleHUDs[id].targetIndicatorIndicator);
	this.SoR_hudField.removeChild(this._actor_battleHUDs[id].HUDbase);
	if(IsAnimation_onActors) this.SoR_hudField.removeChild(this._actor_battleHUDs[id].HUDbaseAnchor);
	this.SoR_hudField.removeChild(this._actor_battleHUDs[id].HUDover);
	this.SoR_hudField.removeChild(this._actor_battleHUDs[id].face);
	this.SoR_hudField.removeChild(this._actor_battleHUDs[id].HP_meter);
	this.SoR_hudField.removeChild(this._actor_battleHUDs[id].MP_meter);
	this.SoR_hudField.removeChild(this._actor_battleHUDs[id].HP_meter_dec);
	this.SoR_hudField.removeChild(this._actor_battleHUDs[id].MP_meter_dec);

	this.SoR_hudField.removeChild(this._actor_battleHUDs[id].TPB_meter);
	
	if(Show_TPGauge){
		this.SoR_hudField.removeChild(this._actor_battleHUDs[id].TP_meter);
		this.SoR_hudField.removeChild(this._actor_battleHUDs[id].TP_meter_dec);
		this._actor_battleHUDs[id].TP_meter = null;
		this._actor_battleHUDs[id].TP_meter_dec = null;
	}
	if(this._actor_battleHUDs[id].namewindow) this.SoR_hudField.removeChild(this._actor_battleHUDs[id].namewindow);
	
	this._actor_battleHUDs[id].HUDbase = null;
	if(IsAnimation_onActors) this._actor_battleHUDs[id].HUDbaseAnchor = null;
	this._actor_battleHUDs[id].HUDover = null;
	this._actor_battleHUDs[id].face = null;
	this._actor_battleHUDs[id].turnIndicator = null;
	this._actor_battleHUDs[id].targetIndicator = null;
	this._actor_battleHUDs[id].HP_meter = null;
	this._actor_battleHUDs[id].MP_meter = null;
	this._actor_battleHUDs[id].HP_meter_dec = null;
	this._actor_battleHUDs[id].MP_meter_dec = null;
	
	this._actor_battleHUDs[id].TPB_meter = null;
}

//nullify retreated actor
Scene_Battle.prototype.retreatBaseBattleStatusHud = function(id) {
	const obj = this._actor_battleHUDs[id];
	this.SoR_hudField.removeChild(obj.turnIndicator);
	this.SoR_hudField.removeChild(obj.targetIndicatorIndicator);
	this.SoR_hudField.removeChild(obj.HUDbase);
	if(IsAnimation_onActors) this.SoR_hudField.removeChild(obj.HUDbaseAnchor);
	this.SoR_hudField.removeChild(obj.HUDover);
	this.SoR_hudField.removeChild(obj.face);
	this.SoR_hudField.removeChild(obj.HP_meter);
	this.SoR_hudField.removeChild(obj.MP_meter);
	this.SoR_hudField.removeChild(obj.HP_meter_dec);
	this.SoR_hudField.removeChild(obj.MP_meter_dec);
	if(Show_TPGauge){
		this.SoR_hudField.removeChild(this._actor_battleHUDs[id].TP_meter);
		this.SoR_hudField.removeChild(this._actor_battleHUDs[id].TP_meter_dec);
	}
	
	this.SoR_hudField.removeChild(this._actor_battleHUDs[id].TPB_meter);


	if(obj.namewindow) this.SoR_hudField.removeChild(obj.namewindow);

	if(obj.HPvalues != null){
		if(Show_MaximumHP) for(let i=0; i<obj.MHPvalues.length; i++) this.SoR_hudField.removeChild(obj.MHPvalues[i]);
		for(let i=0; i<obj.HPvalues.length; i++) this.SoR_hudField.removeChild(obj.HPvalues[i]);
		for(let i=0; i<obj.MPvalues.length; i++) this.SoR_hudField.removeChild(obj.MPvalues[i]);
		for(let i=0; i<obj.TPvalues.length; i++) this.SoR_hudField.removeChild(obj.TPvalues[i]);
		for(let i=0; i<obj.state_icon.length; i++) this.SoR_hudField.removeChild(obj.state_icon[i]);
	}
}


const SoR_BSHUD_SB_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function() {
	SoR_BSHUD_SB_terminate.call(this);

	const nBM = Max_BattlePartyMembers;
	for(let i = 0; i < nBM; i++){
		this.flushHUDstatus(i);
		this.deleteBaseBattleStatusHud(i);
	}
	this.removeChild(this.SoR_hudField);
}

//update hud MAIN
Scene_Battle.prototype.updateSoRBattleHUD = function() {
	const nBM = Max_BattlePartyMembers;

	if(BattleManager._phase == 'battleEnd'){
		for(let i = 0; i < nBM; i++) this._actor_battleHUDs[i].dismissHUD();
	}
	
	for(let i = 0; i < nBM; i++){
		const battler = $gameParty.battleMembers()[i];
		if(!battler && this._actor_battleHUDs[i].actor!=null) this.clearChangedBattlers(i);
		else if(battler && this._actor_battleHUDs[i].actor!=battler) this.setChangedBattlers(i);
		if(!battler) continue;
		this._actor_battleHUDs[i].drawActorBattleHUD(battler, i);// base info (as coordinate)
		this._actor_battleHUDs[i].updateActorHUDstatus(battler);
		if(this._actor_battleHUDs[i].requireUpdate == true) this.refreshHUDstatus(i);
	}
}

Scene_Battle.prototype.addHUDstatus = function(id) {
    const obj = this._actor_battleHUDs[id];
    if(Show_MaximumHP) for(let i=0; i<obj.MHPvalues.length; i++) this.SoR_hudField.addChild(obj.MHPvalues[i]);
    for(let i=0; i<obj.HPvalues.length; i++) this.SoR_hudField.addChild(obj.HPvalues[i]);
    for(let i=0; i<obj.MPvalues.length; i++) this.SoR_hudField.addChild(obj.MPvalues[i]);
    for(let i=0; i<obj.TPvalues.length; i++) this.SoR_hudField.addChild(obj.TPvalues[i]);
    for(let i=0; i<obj.state_icon.length; i++) this.SoR_hudField.addChild(obj.state_icon[i]);
}


Scene_Battle.prototype.refreshHUDstatus = function(id) {
   let obj = this._actor_battleHUDs[id];

	if(obj.HPvalues != null){
		if(Show_MaximumHP) for(let i=0; i<obj.MHPvalues.length; i++) this.SoR_hudField.removeChild(obj.MHPvalues[i]);
		for(let i=0; i<obj.HPvalues.length; i++) this.SoR_hudField.removeChild(obj.HPvalues[i]);
		for(let i=0; i<obj.MPvalues.length; i++) this.SoR_hudField.removeChild(obj.MPvalues[i]);
		for(let i=0; i<obj.TPvalues.length; i++) this.SoR_hudField.removeChild(obj.TPvalues[i]);
		for(let i=0; i<obj.state_icon.length; i++) this.SoR_hudField.removeChild(obj.state_icon[i]);
	}

	obj.MHPvalues = obj.standby.mhp;
	obj.HPvalues = obj.standby.hp;
	obj.MPvalues = obj.standby.mp;
	obj.TPvalues = obj.standby.tp;
	obj.state_icon = obj.standby.ico;

    if(Show_MaximumHP) for(let i=0; i<obj.MHPvalues.length; i++) this.SoR_hudField.addChild(obj.MHPvalues[i]);
    for(let i=0; i<obj.HPvalues.length; i++) this.SoR_hudField.addChild(obj.HPvalues[i]);
    for(let i=0; i<obj.MPvalues.length; i++) this.SoR_hudField.addChild(obj.MPvalues[i]);
    for(let i=0; i<obj.TPvalues.length; i++) this.SoR_hudField.addChild(obj.TPvalues[i]);
    for(let i=0; i<obj.state_icon.length; i++) this.SoR_hudField.addChild(obj.state_icon[i]);
}


//delete numerical sprite 
Scene_Battle.prototype.flushHUDstatus  = function(id) {
	let obj = this._actor_battleHUDs[id];
	if(obj.HPvalues != null){
	   if(Show_MaximumHP) for(let i=0; i<obj.MHPvalues.length; i++) this.SoR_hudField.removeChild(obj.MHPvalues[i]);
	   for(let i=0; i<obj.HPvalues.length; i++) this.SoR_hudField.removeChild(obj.HPvalues[i]);
	   for(let i=0; i<obj.MPvalues.length; i++) this.SoR_hudField.removeChild(obj.MPvalues[i]);
	   for(let i=0; i<obj.TPvalues.length; i++) this.SoR_hudField.removeChild(obj.TPvalues[i]);
       for(let i=0; i<obj.state_icon.length; i++) this.SoR_hudField.removeChild(obj.state_icon[i]);
	   
	   obj.MHPvalues = null;
	   obj.HPvalues = null;
	   obj.MPvalues = null;
	   obj.TPvalues = null;
	   obj.state_icon = [];
	}
}


///////////////////////////////////////////////////////////////////////////////
if(Enable_ActorHUDTouch){
	Window_BattleActor.prototype.update = function() {
		Window_BattleStatus.prototype.update.call(this);

		if (this.isOpenAndActive()) {
			this.SoR_BattleStatusHUD_touchupdate();
		}
	}

	const SoR_BSHUD_BA_select = Window_BattleActor.prototype.select;
	Window_BattleActor.prototype.select = function(index) {
		SoR_BSHUD_BA_select.call(this, index);
	}

	Window_BattleActor.prototype.SoR_BattleStatusHUD_touchupdate = function() {
		const nBM = $gameParty.battleMembers().length;
		for(let i = 0; i < nBM; i++){
			if(CheckBattleHUDTouch(SceneManager._scene._actor_battleHUDs[i],i)!=-1){
				if(TouchInput.isClicked()){
					this.select(i);
					this.processOk();
				}
				else if(this._index!=i){
					this.select(i);
					SoundManager.playCursor();
				}
			}
		}
	}

}

function CheckBattleHUDTouch(hud,id){
	let ret = -1;
	const Tx = TouchInput.x;
	const Ty = TouchInput.y;
	
	const hudspr = IsAnimation_onActors ? hud.HUDbaseAnchor : hud.HUDbase;
	const wd = hudspr.bitmap.width;
	const ht = hudspr.bitmap.height;
	
	const paddx = IsAnimation_onActors ? -hud.HUDbaseAnchor.width/2 : 0;
	const paddy = IsAnimation_onActors ? -hud.HUDbaseAnchor.height : 0;

	const hudx = hudspr.x+paddx;
	const hudy = hudspr.y+paddy;
	
	if(Tx >= hudx && Tx <= hudx+wd){
	  if(Ty >= hudy && Ty <= hudy+ht){
		  ret = id;
	  }
	}

	return ret;
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function BattleActorStatusHUD(){
	this.initialize.apply(this, arguments);
}

BattleActorStatusHUD.prototype.initialize = function(number) {
	this.actor = null;
    //this.visible = false;
    //HUD base sprites

	if(IsAnimation_onActors){
		this.HUDbase = new Sprite();
		this.HUDbaseAnchor = new Sprite(ImageManager.loadBattleHudSprite(ImageFile_HUDBase));
		this.HUDbaseAnchor.prior = 101;
	}
	else this.HUDbase = new Sprite(ImageManager.loadBattleHudSprite(ImageFile_HUDBase));
	this.HUDbase.prior = 101;

	this.HUDover = new Sprite(ImageManager.loadBattleHudSprite(ImageFile_HUDOver));
	this.HUDover.prior = 103;
	
	this.face = new Sprite();
	this.face.prior = 102;
	
	this.turnIndicator = new Sprite(ImageManager.loadBattleHudSprite(ImageFile_TurnIndicator));
	this.turnIndicator.prior = 100;
	this.turnIndicator.visible = false;
	
	this.targetIndicator = new Sprite(ImageManager.loadBattleHudSprite(ImageFile_TargetIndicator));
	this.targetIndicator.prior = 102;
	this.targetIndicator.visible = false;
	this.targetInd_time = 255;
	
	//Just READ (Cut later) for display every digit
	this.HPsprite = [ImageManager.loadBattleHudSprite(ImageFile_HPnormal)];
	if(ImageFile_HPfull!="")this.HPsprite[1] = ImageManager.loadBattleHudSprite(ImageFile_HPfull);
	if(ImageFile_HPdying!="")this.HPsprite[2] = ImageManager.loadBattleHudSprite(ImageFile_HPdying);
	if(ImageFile_HPdead!="")this.HPsprite[3] = ImageManager.loadBattleHudSprite(ImageFile_HPdead);

	this.HPsprite.prior = 104;
	if(Show_MaximumHP){
		this.MHPsprite = ImageManager.loadBattleHudSprite(ImageFile_MaxHP);
		this.MHPsprite.prior = 104;
	}
	this.MPsprite = ImageManager.loadBattleHudSprite(ImageFile_MP);
	this.MPsprite.prior = 104;
	this.TPsprite = ImageManager.loadBattleHudSprite(ImageFile_TP);
	this.TPsprite.prior = 104;

	//hp mp mhp tp 
	
	//state
	this.stateSprite = ImageManager.loadSystem("IconSet");
	this.state_icon = [];
	this.old_icons = [];
	this.display_stateIDX = 0;
	this.display_statecount = 0;
	this.display_stateInterval = 120;
	
	//meter sprite	
	this.HP_meter_spr = ImageManager.loadBattleHudSprite(ImageFile_HPmeter);
	this.MP_meter_spr = ImageManager.loadBattleHudSprite(ImageFile_MPmeter);
	this.HP_meter = new Sprite(this.HP_meter_spr);
	this.HP_meter.prior = 106;
	this.HP_meter_dec = new Sprite(this.HP_meter_spr);
	this.HP_meter_dec.prior = 105;
	this.MP_meter = new Sprite(this.MP_meter_spr);
	this.MP_meter.prior = 106;
	this.MP_meter_dec = new Sprite(this.MP_meter_spr);
	this.MP_meter_dec.prior = 105;

	this.TPB_meter_spr = ImageManager.loadBattleHudSprite(ImageFile_TPBmeter);//
	
	if(Show_TPGauge){
		this.TP_meter_spr = ImageManager.loadBattleHudSprite(ImageFile_TPmeter);
		this.TP_meter = new Sprite(this.TP_meter_spr);
		this.TP_meter.prior = 106;
		this.TP_meter_dec = new Sprite(this.TP_meter_spr);
		this.TP_meter_dec.prior = 105;	
		this.TP_meter_dec.flow = 0;	
		this.TP_meter_dec.flow = 0;
	}
	
	this.TPB_meter = new Sprite(this.TPB_meter_spr);
	this.TPB_meter.prior = 105;

	this.HP_meter.flow = 0;
	this.MP_meter.flow = 0;
	this.TPB_meter.flow = 0;
	this.MP_meter_dec.flow = 0;	
	this.HP_meter_dec.flow = 0;
	
	this.MHPvalues = null;
	this.HPvalues = null;
	this.MPvalues = null;
	this.TPvalues = null;
	this.TPBvalues = null;
	this.standby = null;

	this.slide_pad = 0;
	this.HUDvisibleFlag = 0;
	//base position of this HUD
	this.baseX = base_X_coord + number * Space_width - (IsAnimation_onActors? 4:0);
	this.baseY = base_Y_coord + this.slide_pad + (IsAnimation_onActors? 20:0);

	this.damageShakeDuration = 0;
}

BattleActorStatusHUD.prototype.startDamageShake = function() { this.damageShakeDuration = Duration_DamageShake;}
BattleActorStatusHUD.prototype.CalcDamageShake = function() {
	if(this.damageShakeDuration<=0) return 0;
	//Damped vibration
    const t = Duration_DamageShake-this.damageShakeDuration;
    const vib = 64*0.2*Math.pow(2.71828, -0.125*t)* Math.cos(t);
    this.damageShakeDuration--;
	return vib;
}

BattleActorStatusHUD.prototype.isUnset = function() { return this.actor == null? true : false; }

BattleActorStatusHUD.prototype.setBattler = function(actor) {
	this.actor = actor;
	this.id = this.actor._actorId;
	this._initialized = false;

	//for sliding display
	this.disp_mhp = this.actor.mhp;
	this.disp_hp =  this.actor.hp;
	this.disp_mp =  this.actor.mp;
	this.disp_tp =  this.actor.tp;
	
	const face_gra = "Face_" + String(this.id);
	
	if(IsFaceSprite) this.face = LoadActorFaceSprite_onFile(face_gra);
	else this.face = LoadActorFaceSprite_onDatabase(actor,this.id);
	this.face.prior = 102;
	
	//Draw Actor name on HUD
	if(IsActorNameDraw)	this.namewindow = CreateActorNameField(actor.name(),this.baseX,this.baseY);
	else this.namewindow = undefined;
}

BattleActorStatusHUD.prototype.resetBattler = function() {
	this.actor = null;
	this.id = 0;
	this._initialized = false;

	//for sliding display
	this.disp_mhp = 0;
	this.disp_hp =  0;
	this.disp_mp =  0;
	this.disp_tp =  0;
	
	const face_gra = "Face_" + String(this.id);
	this.face = new Sprite();
    this.namewindow = undefined;
}

function CreateActorNameField(name,baseX,baseY){
	var namefield = new Window_Base(new Rectangle(baseX,baseY+Pad_ActorName,Space_width,96));
	namefield.contents.fontSize = ActorName_FontSize;
	namefield.drawText(name, ActorName_X_coord, ActorName_Y_coord, 200 );
	namefield.setBackgroundType(2);// not to show window (just draw name)
	namefield.prior = 125;
	return namefield;
}

BattleActorStatusHUD.prototype.drawActorBattleHUD = function(actor,number) {
	this.baseX = base_X_coord + number%NBattlersForColmun * Space_width + this.calcHUDcorrectionH_visiblity() - (IsAnimation_onActors? 4:0);
	this.baseY = base_Y_coord + Math.floor(number/NBattlersForColmun) * Space_height + this.calcHUDcorrectionV_visiblity() + this.CalcDamageShake() + (IsAnimation_onActors?20:0);
	
	this.HUDbase.x = this.baseX+HUDbase_X_coord;
	this.HUDbase.y = this.baseY+HUDbase_Y_coord;
	if(IsAnimation_onActors){
		this.HUDbaseAnchor.anchor.x = 0.5;
		this.HUDbaseAnchor.anchor.y = 0.5;
		this.HUDbaseAnchor.x = this.baseX+HUDbase_X_coord+this.HUDbaseAnchor.width/2;
		this.HUDbaseAnchor.y = this.baseY+HUDbase_Y_coord+this.HUDbaseAnchor.height/2;
	}

	this.HUDover.x = this.baseX+HUDover_X_coord;
	this.HUDover.y = this.baseY+HUDover_Y_coord;
	
	this.face.x = this.baseX + Face_X_coord;
	this.face.y = this.baseY + Face_Y_coord;
	this.turnIndicator.x = this.baseX + turnInd_X_coord;
	this.turnIndicator.y = this.baseY + turnInd_Y_coord;
	this.targetIndicator.x = this.baseX + turnInd_X_coord;
	this.targetIndicator.y = this.baseY + turnInd_Y_coord;
	
	this.HP_meter.x = this.HUDbase.x+HPmeter_X_coord;
	this.HP_meter.y = this.HUDbase.y+HPmeter_Y_coord;
	this.HP_meter_dec.x = this.HP_meter.x;
	this.HP_meter_dec.y = this.HP_meter.y;
	this.MP_meter.x = this.HUDbase.x+MPmeter_X_coord;
	this.MP_meter.y = this.HUDbase.y+MPmeter_Y_coord;
	this.MP_meter_dec.x = this.MP_meter.x;
	this.MP_meter_dec.y = this.MP_meter.y;
	if(Show_TPGauge){
		this.TP_meter.x = this.HUDbase.x+TPmeter_X_coord;
		this.TP_meter.y = this.HUDbase.y+TPmeter_Y_coord;
		this.TP_meter_dec.x = this.TP_meter.x;
		this.TP_meter_dec.y = this.TP_meter.y;	
	}
	
	this.TPB_meter.x = this.HUDbase.x+TPBmeter_X_coordinate;
	this.TPB_meter.y = this.HUDbase.y+TPBmeter_Y_coordinate;
}

BattleActorStatusHUD.prototype.ForcedismissHUD = function() {
	this.HUDvisibleFlag=-1; 
	this.slide_pad=0;
	if(Direction_HUDShowAndHide == 0){
		if(base_Y_coord < Graphics.height*0.5){ this.MAXslide_pad=-Math.floor(Max_BattlePartyMembers/NBattlersForColmun)*Space_height-24;}
		else{ this.MAXslide_pad = Math.floor(Max_BattlePartyMembers/NBattlersForColmun)*Space_height+24;}
	}
	else{
		if(base_X_coord < Graphics.width*0.5){ this.MAXslide_pad=-NBattlersForColmun * Space_width-24;}
		else {this.MAXslide_pad=NBattlersForColmun * Space_width+24;}
	}
}
BattleActorStatusHUD.prototype.ForceappearHUD = function() { 
	this.HUDvisibleFlag=1; 
	if(Direction_HUDShowAndHide == 0){
		if(base_Y_coord < Graphics.height*0.5){ this.slide_pad=-Math.floor(Max_BattlePartyMembers/NBattlersForColmun)*Space_height-24;}
		else{ this.slide_pad = Math.floor(Max_BattlePartyMembers/NBattlersForColmun)*Space_height+24;}
	}
	else{
		if(base_X_coord < Graphics.width*0.5){ this.slide_pad=-NBattlersForColmun * Space_width-24;}
		else {this.slide_pad=NBattlersForColmun * Space_width+24;}
	}
}
BattleActorStatusHUD.prototype.dismissHUD = function() {
	this.HUDvisibleFlag=-1; 
	if(Direction_HUDShowAndHide == 0){
		if(base_Y_coord < Graphics.height*0.5){ this.MAXslide_pad=-Math.floor(Max_BattlePartyMembers/NBattlersForColmun)*Space_height-24;}
		else{ this.MAXslide_pad = Math.floor(Max_BattlePartyMembers/NBattlersForColmun)*Space_height+24;}
	}
	else{
		if(base_X_coord < Graphics.width*0.5){ this.MAXslide_pad=-NBattlersForColmun * Space_width-24;}
		else {this.MAXslide_pad=NBattlersForColmun * Space_width+24;}
	}
}
BattleActorStatusHUD.prototype.appearHUD = function() { 
	this.HUDvisibleFlag=1;
	if(Direction_HUDShowAndHide == 0){
		if(base_Y_coord < Graphics.height*0.5){ this.slide_pad=-Math.floor(Max_BattlePartyMembers/NBattlersForColmun)*Space_height-24;}
		else{ this.slide_pad = Math.floor(Max_BattlePartyMembers/NBattlersForColmun)*Space_height+24;}
	}
	else{
		if(base_X_coord < Graphics.width*0.5){ this.slide_pad=-NBattlersForColmun * Space_width-24;}
		else {this.slide_pad=NBattlersForColmun * Space_width+24;}
	}
}
BattleActorStatusHUD.prototype.calcHUDcorrectionV_visiblity = function() {
	if(Direction_HUDShowAndHide==1) return 0;
	if(this.HUDvisibleFlag==0) return this.slide_pad;

	if(this.HUDvisibleFlag==-1){
		if(Math.abs(this.slide_pad-this.MAXslide_pad)>0.1){this.slide_pad += (this.MAXslide_pad-1-this.slide_pad)*0.09;}
		else{
			this.slide_pad = this.MAXslide_pad;
			this.HUDvisibleFlag = 0;
		}
		return this.slide_pad;
	}
	//+1 (appear)
	if(Math.abs(this.slide_pad)>0.1) this.slide_pad += (1-this.slide_pad)*0.09;
	else{
		this.slide_pad = 0;
		this.HUDvisibleFlag = 0;
	}
	return this.slide_pad;
}

BattleActorStatusHUD.prototype.calcHUDcorrectionH_visiblity = function() {
	if(Direction_HUDShowAndHide==0) return 0;
	if(this.HUDvisibleFlag==0) return this.slide_pad;

	if(this.HUDvisibleFlag==-1){
		if(Math.abs(this.slide_pad-this.MAXslide_pad)>0.1){this.slide_pad += (this.MAXslide_pad-1-this.slide_pad)*0.09;}
		else{
			this.slide_pad = this.MAXslide_pad;
			this.HUDvisibleFlag = 0;
		}
		return this.slide_pad;
	}
	//+1 (appear)
	if(Math.abs(this.slide_pad)>0.1) this.slide_pad += (1-this.slide_pad)*0.09;
	else{
		this.slide_pad = 0;
		this.HUDvisibleFlag = 0;
	}
	return this.slide_pad;
}

BattleActorStatusHUD.prototype.updateActorHUDstatus = function(actor) {
	const mhp = actor.mhp;
	const hp = actor.hp;
	const mmp = actor.mmp;
	const mp = actor.mp;
	const tp = actor.tp;
	const mtp = actor.maxTp();
	let tpb;
	this.requireUpdate = true;
	
	if (actor._tpbState === "charging" || actor._tpbState === "charged"){
	 tpb = actor._tpbChargeTime;
	 this.casting_time = null;
	}
	else{
	 tpb = actor._tpbCastTime;
	 if(this.casting_time==null) this.casting_time = actor.tpbRequiredCastTime();
	}
	
	const prevs = {mh: this.disp_mhp, h: this.disp_hp, m: this.disp_mp, t: this.disp_tp};
	//diff check
	this.disp_mhp = mhp;
	this.disp_hp = CalcSlideStatusDiff(hp,this.disp_hp,30);
	this.disp_mp = CalcSlideStatusDiff(mp,this.disp_mp,30);
	this.disp_tp = CalcSlideStatusDiff(tp,this.disp_tp,30);
	this.disp_tpb = tpb;
	
	//prepare sprites
	let standbyMHP = undefined;
	if(Show_MaximumHP){standbyMHP = LoadDivNumbersFromImage(this.MHPsprite, mhp, this.baseX + MHPsprite_X_coord, this.baseY+MHPsprite_Y_coord);}

	let hpidx = 0;
	if(this.HPsprite[1] && this.disp_hp == mhp) hpidx=1;
	else if(this.HPsprite[3] && this.disp_hp == 0) hpidx=3;
	else if(this.HPsprite[2] && this.disp_hp < mhp*0.5) hpidx=2;

	const standbyHP = LoadDivNumbersFromImage(this.HPsprite[hpidx], this.disp_hp, this.baseX+HPsprite_X_coord, this.baseY+HPsprite_Y_coord);
	const standbyMP = LoadDivNumbersFromImage(this.MPsprite, this.disp_mp, this.baseX+MPsprite_X_coord, this.baseY+MPsprite_Y_coord);
	const standbyTP = LoadDivNumbersFromImage(this.TPsprite, this.disp_tp, this.baseX+TPsprite_X_coord, this.baseY+TPsprite_Y_coord);

	//meter
	SetStatusMeter(this.HP_meter_dec,this.disp_hp,mhp,1,0);
	SetStatusMeter(this.MP_meter_dec,this.disp_mp,mmp,1,0);
	if(Show_TPGauge) SetStatusMeter(this.TP_meter_dec,this.disp_tp,mtp,1,0);

	//value
	if(this.disp_hp < hp) SetStatusMeter(this.HP_meter,this.disp_hp,mhp,0,0);
	else SetStatusMeter(this.HP_meter,hp,mhp,0,0);
	if(this.disp_mp < mp) SetStatusMeter(this.MP_meter,this.disp_mp,mmp,0,0);
	else SetStatusMeter(this.MP_meter,mp,mmp,0,0);
	if(Show_TPGauge){
		if(this.disp_tp < tp) SetStatusMeter(this.TP_meter,this.disp_tp,mtp,0,0);//curret: tpmax = 100
		else SetStatusMeter(this.TP_meter,tp,mtp,0,0);
	}

	const ncurrent_icos = actor.allIcons().length;
	let state_changed = false;
	if(this.old_icons.length == ncurrent_icos){
		for(let i=0; i<ncurrent_icos; i++){
			if(this.old_icons[i]!=actor.allIcons()[i]){
				state_changed=true;
				break;
			}
		}
	}
	else state_changed = true;
	this.old_icons = actor.allIcons();
	this.old_iconspr = this.state_icon;

    let standbyIcons = this.old_iconspr;
	if(!IsAlignStatesonHUD && ncurrent_icos > 1){//states change
		this.display_statecount = (this.display_statecount+1) % this.display_stateInterval;
		if(this.display_statecount==0){ this.display_stateIDX = (this.display_stateIDX+1)%ncurrent_icos; state_changed = true;}
	}
	if(state_changed) standbyIcons = this.updateStateIcon(actor);
	else{//update position
		const nsbI = standbyIcons.length;
		for(let i=0; i<nsbI; i++){
			standbyIcons[i].x = this.HUDbase.x+ StateIcon_X_coord + (33*i);
			standbyIcons[i].y = this.HUDbase.y+ StateIcon_Y_coord;
		}
	}

    //TPB
	if (actor._tpbState === "charging" || actor._tpbState === "charged") SetStatusMeter(this.TPB_meter,this.disp_tpb,1.0,0,0);
	else if (actor._tpbState === "acting") SetStatusMeter(this.TPB_meter,1.0,1.0,0,0);
	else SetStatusMeter(this.TPB_meter,this.disp_tpb,this.casting_time,1,0);


	this.updateCommandTurnIndicator(actor);
	this.updateTargetIndicator(actor);

	if(this._initialized && this.disp_mhp == prevs.mh && prevs.h == this.disp_hp && prevs.m == this.disp_mp && prevs.t == this.disp_tp && !state_changed) this.requireUpdate = false;
	else this._initialzied = true;

	this.standby = {mhp: standbyMHP,hp: standbyHP,mp: standbyMP,tp: standbyTP, ico: standbyIcons};

	this.HP_meter.flow = updateStatusGaugeFlow(this.HP_meter);
	this.MP_meter.flow = updateStatusGaugeFlow(this.MP_meter);
	if(Show_TPGauge) this.TP_meter.flow = updateStatusGaugeFlow(this.TP_meter);
	this.TPB_meter.flow = updateStatusGaugeFlow(this.TPB_meter);
	
	if(this.namewindow){
		this.namewindow.x = this.baseX;
		this.namewindow.y = this.baseY+Pad_ActorName;
	}
}

BattleActorStatusHUD.prototype.updateCommandTurnIndicator = function(actor){
	if(BattleManager.actor() == actor) this.turnIndicator.visible = true;
	else if(this.turnIndicator.visible){
		this.turnIndicator.visible = false;
	}
}

BattleActorStatusHUD.prototype.updateTargetIndicator = function(actor){
	if (actor.isSelected()){
		if(!this.targetIndicator.visible){
			this.targetInd_time = 255;
			this.targetIndicator.visible = true;
		}
		
		this.targetIndicator.opacity = this.targetInd_time;
		this.targetInd_time-=5;
		if(this.targetInd_time==0)this.targetInd_time = 255;
		
	}
	else if(this.targetIndicator.visible){
		this.targetIndicator.visible = false;
	}
}

BattleActorStatusHUD.prototype.updateStateIcon = function(actor){
	const standbyIcons = [];
	const allicons = actor.allIcons();
	const nalli = allicons.length;
	if(nalli == 0) return standbyIcons;

	if(IsAlignStatesonHUD){
		//For display all icons in a row
		const nalli = allicons.length;
		for(let i=0; i< nalli; i++){
			const state = allicons[i];
			const icon_x = state % 16 * 32;
			const icon_y = Math.floor(state / 16) * 32;
			const state_icon = new Sprite(this.stateSprite);
			state_icon.prior = 111;
			state_icon.setFrame(icon_x, icon_y, 32, 32);
			state_icon.x = this.HUDbase.x+ StateIcon_X_coord + (33*i);
			state_icon.y = this.HUDbase.y+ StateIcon_Y_coord;
			standbyIcons.push(state_icon);
			if(i==Num_AlignStates-1) break;
		}
	}
	else{
		const state = allicons[this.display_stateIDX];
		const icon_x = state % 16 * 32;
		const icon_y = Math.floor(state / 16) * 32;
		const state_icon = new Sprite(this.stateSprite);
		state_icon.prior = 111;
		state_icon.setFrame(icon_x, icon_y, 32, 32);
		state_icon.x = this.HUDbase.x + StateIcon_X_coord;
		state_icon.y = this.HUDbase.y + StateIcon_Y_coord;
		standbyIcons.push(state_icon);						
	}

	return standbyIcons;   
}
	
function updateStatusGaugeFlow(spr){
	const wd = spr.bitmap.width/3;
	const flow = spr.flow-1;
	return flow<0? wd*2 : flow;
}

// acutual value / on display
function CalcSlideStatusDiff(param, disp, gradient){
	if(param == disp) return disp;
	const diff = disp-param;

    const spd = 1 + Math.abs(diff)/gradient;
	if(diff>0){
	    disp-=spd;
		if(disp < param) disp = param;
	}
	else{
	    disp+=spd;
		if(disp > param) disp = param;
	}	
	return Math.floor(disp);
}

function SetStatusMeter(spr,val,valMax,color_type,st_drawpoint) {
	const wd = spr.bitmap.width/3;  // gauge_length x3
	const ht = spr.bitmap.height/2; // regular/diff
    const rate = wd *(val/valMax);
	spr.setFrame(spr.flow,color_type*ht, rate, ht);
}

function LoadDivNumbersFromImage(spr, param, baseX, baseY){
	const obj_arr = [];
	const Numimg = spr;
	const wd = Numimg.width / 10;
	const ht = Numimg.height;
	
	const numarr = Math.abs(param).toString().split("");//split status
	for (let i = 0; i <  numarr.length; i++) {
		const ndigit = Number(numarr[i]);
		obj_arr[i] = new Sprite(Numimg);
		obj_arr[i].setFrame(ndigit * wd, 0, wd, ht);
        obj_arr[i].x = baseX + (i*(wd+StatusNumber_AlignWidth)) - Math.floor(((numarr.length-1) * (wd+StatusNumber_AlignWidth))); 
        obj_arr[i].y = baseY;
		obj_arr[i].anchor.x = 0.5;
		obj_arr[i].anchor.y = 0.5;
		obj_arr[i].scale.x = 1.0;
		obj_arr[i].scale.y = 1.0;
		obj_arr[i].wd = wd; //width one digit
		obj_arr[i].prior = 110;

	}
	
	return obj_arr;
}
 
function LoadActorFaceSprite_onFile(gra){
	let Face_spr;
	
	const img = ImageManager.loadBattleHudSprite(gra);
	img.addLoadListener( function() {
		Face_spr = new Sprite(img);
	}.bind(this) );
	return Face_spr;
}

function LoadActorFaceSprite_onDatabase(actor, id){
	const fname = actor.faceName();
	const fidx = actor.faceIndex();
	let Face_spr;
	
    const img = ImageManager.loadFace(fname);
		Face_spr = new Sprite(img);
		const pw = ImageManager.faceWidth;
		const ph = ImageManager.faceHeight;
		
		let upp = ActorFaceRect_U;
		let low = ActorFaceRect_L;
		if(ActorFaceRect_U <= -1) upp = 0;	
		if(ActorFaceRect_L <= -1 || ActorFaceRect_L > Window_Base._faceHeight) low = ph;
		const drawarea = Math.abs(upp-low);

		Face_spr.setFrame((fidx%4) * pw, Math.floor(fidx/4)*ph, pw, drawarea);
		Face_spr.scale.x = scaleX_Face_default;
		Face_spr.scale.y = scaleY_Face_default;
    return Face_spr;
}

///////////////////////////////////////////////////////////////////////
if(IsAnimation_onActors){

const SoR_BSHUD_SB_createAnimationSprite = Spriteset_Base.prototype.createAnimationSprite;
Spriteset_Base.prototype.createAnimationSprite = function(targets, animation, mirror, delay) {

	if($gameParty.inBattle()){
		const ntar = targets.length;
		for(let i=0; i<ntar; i++){
			if(!targets[i]) continue;
			if(targets[i].isActor()){
				this.createAnimationSpriteForHUD([targets[i]], animation, mirror, delay);
				targets.splice(i,1);
				i--;
			}
		}
	}

	SoR_BSHUD_SB_createAnimationSprite.call(this,...arguments);
}

Spriteset_Base.prototype.createAnimationSpriteForHUD = function(targets, animation, mirror, delay) {
    const mv = this.isMVAnimation(animation);
    const sprite = new (mv ? Sprite_AnimationMV : Sprite_Animation)();
    const targetSprites = this.makeTargetHUD(targets);
    const baseDelay = this.animationBaseDelay();
    const previous = delay > baseDelay ? this.lastAnimationSprite() : null;
    if (this.animationShouldMirror(targets[0])) {
        mirror = !mirror;
    }
    sprite.targetObjects = targets;
    sprite.setup(targetSprites, animation, mirror, delay, previous);
    this._effectsContainer.addChild(sprite);
    this._animationSprites.push(sprite);
}

Spriteset_Base.prototype.makeTargetHUD = function(targets) {
    const targetSprites = [];

	if (SceneManager._scene instanceof Scene_Battle) {
	    for (const target of targets) {
			const idx = $gameParty.battleMembers().indexOf(target);
			if(idx>=0) targetSprites.push(SceneManager._scene._actor_battleHUDs[idx].HUDbaseAnchor);
    	}
	}
    return targetSprites;
}

/*
Window_BattleLog.prototype.showEnemyAttackAnimation = function(subject, targets) {
	this.showNormalAnimation(targets, subject.attackAnimationId1(), false);
	this.showNormalAnimation(targets, subject.attackAnimationId2(), true);
}
*/
}
///////////////////////////////////////////////////////////////////////

}());