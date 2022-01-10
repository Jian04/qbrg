//=============================================================================
// BB_SVactorEntryDirector.js
// Copyright (c) 2016 BB ENTERTAINMENT
//=============================================================================

/*:
 * @plugindesc SV角色出场演出
 * @author ビービー
 * 
 * @param EntrySwitchID
 * @desc 参戦演出をONにするスイッチID
 * デフォルト：1
 * @default 1
 * 
 * @param EntryPosition1x
 * @desc EntryPosition1のX座標
 * デフォルト：300
 * @default 300
 * 
 * @param EntryPosition1y
 * @desc EntryPosition1のY座標
 * デフォルト：0
 * @default 0
 * 
 * @param EntryPosition2x
 * @desc EntryPosition2のX座標
 * デフォルト：300
 * @default 300
 * 
 * @param EntryPosition2y
 * @desc EntryPosition2のY座標
 * デフォルト：0
 * @default 0
 * 
 * @param EntryPosition3x
 * @desc EntryPosition3のX座標
 * デフォルト：300
 * @default 300
 * 
 * @param EntryPosition3y
 * @desc EntryPosition3のY座標
 * デフォルト：0
 * @default 0
 * 
 * @param EntryTime1
 * @desc EntryPosition1で移動するのにかかるフレーム数
 * デフォルト：30
 * @default 30
 * 
 * @param EntryTime2
 * @desc EntryPosition2で移動するのにかかるフレーム数
 * デフォルト：30
 * @default 30
 * 
 * @param EntryTime3
 * @desc EntryPosition3で移動するのにかかるフレーム数
 * デフォルト：30
 * @default 30
 * 
 * @param EntryAnimation1
 * @desc EntryPosition1で登場時に表示する戦闘アニメーションのID
 * デフォルト：0
 * @default 0
 * 
 * @param EntryAnimation2
 * @desc EntryPosition2で登場時に表示する戦闘アニメーションのID
 * デフォルト：0
 * @default 0
 * 
 * @param EntryAnimation3
 * @desc EntryPosition3で登場時に表示する戦闘アニメーションのID
 * デフォルト：0
 * @default 0
 * 
 * @param AnimationPosition1
 * @desc EntryAnimation1で指定したアニメーションの表示位置
 * 1=移動開始位置 2=移動終了位置 3=アクター追従 デフォルト：1
 * @default 1
 * 
 * @param AnimationPosition2
 * @desc EntryAnimation2で指定したアニメーションの表示位置
 * 1=移動開始位置 2=移動終了位置 3=アクター追従 デフォルト：1
 * @default 1
 * 
 * @param AnimationPosition3
 * @desc EntryAnimation3で指定したアニメーションの表示位置
 * 1=移動開始位置 2=移動終了位置 3=アクター追従 デフォルト：1
 * @default 1
 * 
 * @help プラグインの説明
 * 
 * 戦闘中パーティー加入などでアクターが戦闘画面に登場する際に
 * パラメータで指定したスイッチがONの場合
 * アクターがホームポジションに移動する前の最初にいる地点を変更したり
 * 登場時に任意の場所に戦闘アニメーションを再生するプラグインです。
 * 上から登場したり、左から登場させることが可能です。
 * 
 * アクターのメモ欄に
 * <EntryPosition1>
 * と記入することで
 * パラメータの【EntryPosition1x】【EntryPosition1y】
 * それぞれで指定した位置からアクターが登場します
 *（指定したスイッチがOFFの場合通常の演出で登場します）
 * 
 * 登場位置は三つまで作成できそれぞれ
 * <EntryPosition2>
 * <EntryPosition3>
 * とメモ欄に記入すればパラメータの
 * EntryPosition2x
 * EntryPosition2y
 * EntryPosition3x
 * EntryPosition3y
 * で指定した位置から登場するようになります。
 * 
 * 位置を指定する座標はx=0,y=0がアクターのホームポジションになります。
 * 上から登場させたい場合はx=0,y=-50
 * という感じになります。
 * 下からと右からが正数、上からと左からが負数になります。
 * 
 * その他のパラメータ
 * 
 * 【EntrySwitchID】
 * メモ欄に<EntryPosition1>と書くだけでは演出は変更されません
 * 必ずパーティ加入前にEntrySwitchIDで指定したスイッチをONにしてください。
 * プラグイン内でOFFにするので、イベント内でOFFにする必要はありません。
 * 例：
 *   ◆スイッチの操作：#0015 パーティ加入の瞬間 = ON
 *   ◆メンバーの入れ替え：マーシャを加える
 * 
 * 【EntryTime1、EntryTime2、EntryTime3】
 * それぞれ<EntryPosition1><EntryPosition2><EntryPosition3>の指定した位置から
 * ホームポジションまで移動するのにかかるフレーム数を指定します。
 * 
 * 【EntryAnimation1、EntryAnimation2、EntryAnimation3】
 * それぞれ<EntryPosition1><EntryPosition2><EntryPosition3>で
 * アクター登場時に指定したアニメーションIDのアニメーションを表示します。
 * 0でアニメーションを非表示にできます。
 * 
 * 【AnimationPosition1、AnimationPosition2、AnimationPosition3】
 * EntryAnimation1、EntryAnimation2、EntryAnimation3で指定したアニメーションを
 * 表示する位置を３つからそれぞれ数値で選択します。
 * 1=移動開始位置（パラメータで指定したEntryPositionの位置）
 * 2=移動終了位置（アクターのホームポジション）
 * 3=アクター追従（移動するアクターと同じ軌道で移動）
 * デフォルト：0
 * 
 * 
 * 利用规则：
 * 本插件依据MIT协议公开发布。
 * Copyright (c) 2016 BB ENTERTAINMENT
 * Released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * 
 * コンタクト：
 * BB ENTERTAINMENT Twitter: https://twitter.com/BB_ENTER/
 * BB ENTERTAINMENT BLOG   : http://bb-entertainment-blog.blogspot.jp/
 */


(function() {

//-----------------------------------------------------------------------------
// プラグインパラメータ管理
var parameters = PluginManager.parameters('BB_SVactorEntryDirector');
var EP1x = Number(parameters['EntryPosition1x']);
var EP1y = Number(parameters['EntryPosition1y']);
var ET1 = Number(parameters['EntryTime1']);
var EA1 = Number(parameters['EntryAnimation1']);
var EP2x = Number(parameters['EntryPosition2x']);
var EP2y = Number(parameters['EntryPosition2y']);
var ET2 = Number(parameters['EntryTime2']);
var EA2 = Number(parameters['EntryAnimation2']);
var EP3x = Number(parameters['EntryPosition3x']);
var EP3y = Number(parameters['EntryPosition3y']);
var ET3 = Number(parameters['EntryTime3']);
var EA3 = Number(parameters['EntryAnimation3']);
var AP1 = Number(parameters['AnimationPosition1']);
var AP2 = Number(parameters['AnimationPosition2']);
var AP3 = Number(parameters['AnimationPosition3']);
var ESID = Number(parameters['EntrySwitchID']);
//-----------------------------------------------------------------------------
// rpg_sprites.js 874行目
// エントリーポジション
//-----------------------------------------------------------------------------
var _Sprite_Actor_prototype_startEntryMotion = Sprite_Actor.prototype.startEntryMotion;
Sprite_Actor.prototype.startEntryMotion = function(index) {
    if (this._actor && this._actor.canMove()) {
        if($gameSwitches.value(ESID)){ 
            if ($dataActors[this._actor._actorId].note.match(/<EntryPosition1>/i)) {
                this.startMove(EP1x, EP1y, 0);
                if (EA1 != 0) {
                    if (AP1 == 1) {
                        var sprite = new Sprite_Base();
                        var id = $gameParty.size() - 1;
                        sprite.x = 600 + id * 32 + EP1x;//600 + index * 32; EP1x;
                        sprite.y = 280 + id * 48 + EP1y;//280 + index * 48; EP1y;
                        if(SceneManager._scene){  
                            SceneManager._scene.addChild(sprite);
                            sprite.startAnimation($dataAnimations[EA1], true, 0);
                        }
                    } else if (AP1 == 2) {
                        var sprite = new Sprite_Base();
                        var id = $gameParty.size() - 1;
                        sprite.x = 600 + id * 32;
                        sprite.y = 280 + id * 48;
                        if(SceneManager._scene){  
                            SceneManager._scene.addChild(sprite);
                            sprite.startAnimation($dataAnimations[EA1], true, 0);
                        }
                    } else if (AP1 == 3) {
                        this._actor.startAnimation(EA1, true, 0);
                    }
                }
                this.startMotion('walk');
                this.startMove(0, 0, ET1);
            } else if ($dataActors[this._actor._actorId].note.match(/<EntryPosition2>/i)) {
                this.startMove(EP2x, EP2y, 0);
                if (EA2 != 0) {
                    if (AP2 == 1) {
                        var sprite = new Sprite_Base();
                        var id = $gameParty.size() - 1;
                        sprite.x = 600 + id * 32 + EP2x;
                        sprite.y = 280 + id * 48 + EP2y;
                        if(SceneManager._scene){  
                            SceneManager._scene.addChild(sprite);
                            sprite.startAnimation($dataAnimations[EA2], true, 0);
                        }
                    } else if (AP2 == 2) {
                        var sprite = new Sprite_Base();
                        var id = $gameParty.size() - 1;
                        sprite.x = 600 + id * 32;
                        sprite.y = 280 + id * 48;
                        if(SceneManager._scene){  
                            SceneManager._scene.addChild(sprite);
                            sprite.startAnimation($dataAnimations[EA2], true, 0);
                        }
                    } else if (AP2 == 3) {
                        this._actor.startAnimation(EA2, true, 0);
                    }
                }
                this.startMotion('walk');
                this.startMove(0, 0, ET2);
            } else if ($dataActors[this._actor._actorId].note.match(/<EntryPosition3>/i)) {
                this.startMove(EP3x, EP3y, 0);
                if (EA3 != 0) {
                    if (AP3 == 1) {
                        var sprite = new Sprite_Base();
                        var id = $gameParty.size() - 1;
                        sprite.x = 600 + id * 32 + EP3x;
                        sprite.y = 280 + id * 48 + EP3y;
                        if(SceneManager._scene){  
                            SceneManager._scene.addChild(sprite);
                            sprite.startAnimation($dataAnimations[EA3], true, 0);
                        }
                    } else if (AP3 == 2) {
                        var sprite = new Sprite_Base();
                        var id = $gameParty.size() - 1;
                        sprite.x = 600 + id * 32;
                        sprite.y = 280 + id * 48;
                        if(SceneManager._scene){  
                            SceneManager._scene.addChild(sprite);
                            sprite.startAnimation($dataAnimations[EA3], true, 0);
                        }
                    } else if (AP3 == 3) {
                        this._actor.startAnimation(EA3, true, 0);
                    }
                }
                this.startMotion('walk');
                this.startMove(0, 0, ET3);
            } else {
            this.startMotion('walk');
            this.startMove(0, 0, 30);
            }
            $gameSwitches.setValue(ESID,false)
        } else {
            this.startMotion('walk');
            this.startMove(0, 0, 30);
        }
    } else if (!this.isMoving()) {
        this.refreshMotion();
        this.startMove(0, 0, 0);
    }
};

})();