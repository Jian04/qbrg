//=============================================================================
// VisuStella MZ - Party System
// VisuMZ_2_PartySystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_PartySystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.PartySystem = VisuMZ.PartySystem || {};
VisuMZ.PartySystem.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.00] [PartySystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Party_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MZ only gives game projects the ability to switch party members
 * within the main menu and nothing more. There's no inherent functionality to
 * lock party members, make party members required, and/or give players the
 * ability to switch party members mid-battle.
 *
 * This plugin will add in all of those functions as well as a dedicated scene
 * for switching party members. Party switching will allow party members to be
 * removed, swapped, and sorted. Through the usage of Plugin Commands, party
 * members can also be locked and/or required for party presence.
 *
 * Those using the VisuStella MZ Battle Core will also have access to features
 * in this plugin that aren't available otherwise. These features give players
 * the functionality to switch out the whole party lineup mid-battle and/or
 * individual party member switching.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Custom scene dedicated to party management.
 * * Change the maximum number of party members that can participate in battle.
 * * Plugin Commands to lock party members.
 * * Plugin Commands to make certain party members required.
 * * Added functionality with Battle Core to switch party members mid-battle.
 * * This comes in the form of changing either the whole party at once.
 * * Or switching individual members out one at a time.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Main Menu Formation Command
 *
 * - This command is now changed to send the player to Scene_Party for the
 * player to have a dedicated scene for changing the party.
 *
 * ---
 *
 * Battle Members Array
 *
 * - Previously, the battle members are decided by which actors are lined up
 * first in the party roster. This has been changed to give players the freedom
 * to have a party size less than the maximum. This change is made by changing
 * the way the battle members are determined by using a new array. However, any
 * and all functions utilize the $gameParty.battleMembers() function will still
 * behave as normal.
 *
 * ---
 *
 * Formation Change OK Function
 *
 * - RPG Maker MZ did not do anything with the Game_Actor.isFormationChangeOk
 * function so this plugin overwrote it completely to allow for the new
 * lock and require features to work.
 *
 * ---
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_1_BattleCore
 *
 * - If the VisuStella MZ Battle Core plugin is present, players are able to 
 * access party switching functionality mid-battle at will. This can be in the
 * form of switching out the entire active party roster at once or individually
 * for each actor.
 *
 * - Switching Entire Rosters: This can be done by going into this plugin's
 * Plugin Parameters => General => Party Command Window => Add Party Command.
 * If the Party Command Window is accessible, the player will be able to see
 * the option between 'Auto Battle' and 'Options'.
 *
 * - Individual Member Switching: This requires going to VisuMZ_1_BattleCore's
 * Plugin Parameters => Actor Command Window => Battle Commands => Command List
 * and add in the "party" option. The "party" option can also be added to the
 * <Battle Commands> notetag.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Party Plugin Commands ===
 * 
 * ---
 *
 * Party: Call Party Scene
 * - Calls the party changing scene.
 *
 * ---
 *
 * Party: Change Max Battle Members
 * - Changes the number of max battle members possible.
 * - Cannot be use mid-battle.
 *
 *   Max Members:
 *   - Changes the number of max battle members possible.
 *   - Use 0 for the game's default number.
 *
 * ---
 *
 * Party: Lock/Unlock Member(s)
 * - Allows you to lock/unlock a party member.
 * - Locked actors cannot change their party position.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to lock/unlock.
 *   - Locked actors cannot change their party position.
 *
 *   Lock?:
 *   - Lock the selected actor(s)?
 *
 * ---
 *
 * Party: Require Member(s)
 * - Allows you to require/free a party member.
 * - Required actors must be in the party to exit the scene.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to require/free.
 *   - Required actors must be in the party to exit the scene.
 *
 *   Require?:
 *   - Make the selected actor(s) required?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These Plugin Parameters control the overall behaviors pertaining to the
 * Party System added with this plugin. These behaviors range from the maximum
 * number of members that can participate in battle to the availability of the
 * party switching mechanics.
 *
 * ---
 *
 * General
 * 
 *   Max Battle Members:
 *   - Maximum number of battle members.
 *
 * ---
 *
 * Party Scene
 * 
 *   Add Remove Command:
 *   - Add the 'Remove' command to the party scene?
 * 
 *   Locked Member Icon:
 *   - Icon used for a locked party member.
 * 
 *   Requiured Member Icon:
 *   - Icon used for a required party member.
 *
 * ---
 *
 * Party Command Window
 * - These require VisuMZ_1_BattleCore!
 * 
 *   Add Party Command:
 *   - Add the 'Party' command to the Party Command Window?
 * 
 *   Command Cooldown:
 *   - Cooldown (in turns) for this command to be available again.
 *
 * ---
 *
 * Actor Command Window
 * - These require VisuMZ_1_BattleCore!
 * 
 *   Add Switch Command:
 *   - Add the 'Switch' command to the Actor Command Window?
 * 
 *   Command Cooldown:
 *   - Cooldown (in turns) for this command to be available again.
 * 
 *   Switch Out Animation?:
 *   - Show the sprites switching out when using individual party
 *     member switching?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * These Plugin Parameters control the text that you see in-game related to the
 * Party System plugin.
 *
 * ---
 *
 * General
 * 
 *   Active Party:
 *   - Vocabulary used to represent the Active Party.
 * 
 *   Reserve Party:
 *   - Vocabulary used to represent the Reserve Party.
 * 
 *   Status:
 *   - Vocabulary used to represent the Status Window.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Party Scene > Windows
 * 
 *   Empty:
 *   - For the party and status windows when no actor is selected.
 * 
 *   Remove:
 *   - For the remove option.
 *
 * ---
 *
 * Party Scene > Button Assist
 * 
 *   Swap Positions:
 *   - Button assist text for the page up/down commands.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Remove:
 *   - Button assist text for the removal command.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Sort:
 *   - Button assist text for the sort command.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Swap In:
 *   - Button assist text for swapping in actors.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Swap Out:
 *   - Button assist text for swapping out actors.
 *   - Requires VisuMZ_0_CoreEngine!
 *
 * ---
 *
 * Battle Scene
 * 
 *   Party Command:
 *   - Command text for entering Party Scene.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Help: Formation:
 *   - Help text for Formation command.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Queue Message:
 *   - Message to say the Party Scene is queued.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Switch Command:
 *   - Command text for switching out members.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Help: Switch:
 *   - Help text for Switch command.
 *   - Requires VisuMZ_1_BattleCore!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_Party.
 *
 * ---
 *
 * Background Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 * 
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * If you don't like the locations of the windows in Scene_Party, change them
 * up with these Plugin Parameters, provided that you have an understanding of
 * JavaScript code.
 *
 * ---
 *
 * Active Party Label
 * Active Party Window
 * Reserve Party Label
 * Reserve Party Window
 * Status Label
 * Status Window
 * Battle Switch Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Columns:
 *   - Available only for the Reserve Party Window.
 *   - How many columns do you want there to be for the window?
 * 
 *   Actor Graphic:
 *   - Available only for Active Party Window and Reserve Party Window.
 *   - Choose how the actor graphics appear in the specific windows.
 *     - Face
 *     - Map Sprite
 *     - Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * 
 *     Map Sprite:
 *     Sideview Battler:
 * 
 *       Offset X:
 *       Offset Y:
 *       - If showing map sprites, offset the x or y coordinates.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00: September 7, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallPartyScene
 * @text Party: Call Party Scene
 * @desc Calls the party changing scene.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeMaxBattleMembers
 * @text Party: Change Max Battle Members
 * @desc Changes the number of max battle members possible.
 * Cannot be use mid-battle.
 *
 * @arg Value:eval
 * @text Max Members
 * @desc Changes the number of max battle members possible.
 * Use 0 for the game's default number.
 * @default 4
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LockPartyMembers
 * @text Party: Lock/Unlock Member(s)
 * @desc Allows you to lock/unlock a party member.
 * Locked actors cannot change their party position.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to lock/unlock.
 * Locked actors cannot change their party position.
 * @default ["1"]
 * 
 * @arg Lock:eval
 * @text Lock?
 * @type boolean
 * @on Lock
 * @off Unlock
 * @desc Lock the selected actor(s)?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RequirePartyMembers
 * @text Party: Require Member(s)
 * @desc Allows you to require/free a party member.
 * Required actors must be in the party to exit the scene.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to require/free.
 * Required actors must be in the party to exit the scene.
 * @default ["1"]
 * 
 * @arg Require:eval
 * @text Require?
 * @type boolean
 * @on Require
 * @off Don't Require
 * @desc Make the selected actor(s) required?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param PartySystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings pertaining to Party-related mechanics.
 * @default {"General":"","MaxBattleMembers:num":"4","PartyScene":"","AddRemoveCmd:eval":"true","LockIcon:num":"195","RequireIcon:num":"87","DrawBackRect:eval":"true","BackRectColor:str":"19","PartyCmdWin":"","PartyCmdWinAddParty:eval":"false","PartyCmdCooldown:num":"1","ActorCmdWin":"","ActorCmdWinAddParty:eval":"true","ActorCmdCooldown:num":"1","SwitchOutAnimation:eval":"true"}
 *
 * @param Vocab:struct
 * @text Vocabulary Settings
 * @type struct<Vocab>
 * @desc These settings let you adjust the text displayed for this plugin.
 * @default {"General":"","ActiveParty:str":"Active Party","ReserveParty:str":"Reserve Party","Status:str":"Status","PartyScene":"","Windows":"","Empty:str":"- Empty -","Remove:str":"Remove","ButtonAssist":"","AssistSwapPosition:str":"Quick Swap","AssistRemove:str":"Remove","AssistSort:str":"Sort","AssistSwapIn:str":"Swap In","AssistSwapOut:str":"Swap Out","BattleScene":"","BattlePartyCmd:str":"Party","BattleHelpFormation:json":"\"Change up your party formation.\"","QueuePartyScene:str":"%1 Menu queued after action is complete.","BattleSwitchOut:str":"Switch","BattleHelpSwitch:json":"\"Switch out this party member with another.\""}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_Party.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc These settings let you control how the windows appear in Scene_Party.
 * @default {"ActivePartyLabel":"","ActivePartyLabelBgType:num":"0","ActivePartyLabelRect:func":"\"const wx = 0;\\nconst wy = this.mainAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","ActivePartyWindow":"","ActivePartyWindowBgType:num":"0","ActivePartyGraphic:str":"face","ActivePartyMapSprite":"","ActiveSpriteOffsetX:num":"0","ActiveSpriteOffsetY:num":"4","ActivePartySvBattler":"","ActiveBattlerOffsetX:num":"0","ActiveBattlerOffsetY:num":"4","ActivePartyWindowRect:func":"\"const wx = 0;\\nconst wy = this._activePartyLabel.y + this._activePartyLabel.height;\\nconst ww = Graphics.boxWidth;\\nconst wh = ImageManager.faceHeight + $gameSystem.windowPadding() * 2 + 2;\\nreturn new Rectangle(wx, wy, ww, wh);\"","ReservePartyLabel":"","ReservePartyLabelBgType:num":"0","ReservePartyLabelRect:func":"\"const ww = Math.max(240, Math.min(Graphics.boxWidth - 576, Math.round(Graphics.boxWidth / 2)));\\nconst wx = this.isRightInputMode() ? (Graphics.boxWidth - ww) : 0;\\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","ReservePartyWindow":"","ReservePartyWindowBgType:num":"0","ReserveItemThickness:num":"2","ReservePartyGraphic:str":"face","ReservePartyMapSprite":"","ReserveSpriteOffsetX:num":"24","ReserveSpriteOffsetY:num":"4","ReservePartySvBattler":"","ReserveBattlerOffsetX:num":"48","ReserveBattlerOffsetY:num":"4","ReservePartyWindowRect:func":"\"const ww = this._reservePartyLabel.width;\\nconst wx = this._reservePartyLabel.x;\\nconst wy = this._reservePartyLabel.y + this._reservePartyLabel.height;\\nconst wh = this.mainAreaHeight() - this._reservePartyLabel.height - this._activePartyWindow.height - this._activePartyLabel.height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","StatusLabel":"","StatusLabelBgType:num":"0","StatusLabelRect:func":"\"const ww = Graphics.boxWidth - this._reservePartyLabel.width;\\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","StatusWindow":"","StatusWindowBgType:num":"0","StatusWindowDraw:func":"\"// Draw Empty\\nif (!this._actor) {\\n    this.drawItemDarkRect(0, 0, this.innerWidth, this.innerHeight);\\n    const y = Math.round((this.innerHeight - this.lineHeight()) / 2);\\n    this.changeTextColor(ColorManager.systemColor());\\n    this.drawText(TextManager.emptyPartyMember, 0, y, this.innerWidth, 'center');\\n    return;\\n}\\n\\n// Draw Face and Simple Status\\nthis.drawActorFace(this._actor, 1, 0, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorSimpleStatus(this._actor, ImageManager.faceWidth + 36, 0);\\n\\n// Declare Constants\\nconst lineHeight = this.lineHeight();\\nconst params = this.actorParams();\\nconst paramWidth = Math.round(this.innerWidth / 2);\\nconst paramHeight = Math.ceil(params.length / 2) * lineHeight;\\nconst baseX = 0;\\nlet x = 0;\\nlet y = ImageManager.faceHeight + lineHeight / 2;\\n\\n// Draw Parameters\\nfor (const param of params) {\\n    this.drawItemDarkRect(x, y, paramWidth, lineHeight);\\n    this.drawParamName(param, x, y, paramWidth);\\n    this.drawParamValue(param, x, y, paramWidth);\\n\\n    if (x === baseX) {\\n        x += paramWidth;\\n    } else {\\n        x = baseX;\\n        y += lineHeight;\\n    }\\n}\"","StatusWindowRect:func":"\"const ww = this._statusPartyLabel.width;\\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\\nconst wy = this._reservePartyWindow.y;\\nconst wh = this._reservePartyWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","BattleSwitchWindow":"","BattleSwitchWindowBgType:num":"0","BattleSwitchWindowRect:func":"\"const padding = $gameSystem.windowPadding() * 2;\\nlet ww = 516 + padding;\\nlet wh = Window_PartyBattleSwitch.prototype.itemHeight() * 4 + padding;\\nlet wx = Math.round(Graphics.boxWidth - ww) / 2;\\nlet wy = Math.round(Graphics.boxHeight - wh - this._statusWindow.height) / 2;\\nwy = wy.clamp(0, Graphics.boxHeight - wh - this._statusWindow.height);\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param General
 *
 * @param MaxBattleMembers:num
 * @text Max Battle Members
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of battle members.
 * @default 4
 *
 * @param PartyScene
 * @text Party Scene
 *
 * @param AddRemoveCmd:eval
 * @text Add Remove Command
 * @parent PartyScene
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Remove' command to the party scene?
 * @default true
 *
 * @param LockIcon:num
 * @text Locked Member Icon
 * @parent PartyScene
 * @desc Icon used for a locked party member.
 * @default 195
 *
 * @param RequireIcon:num
 * @text Requiured Member Icon
 * @parent PartyScene
 * @desc Icon used for a required party member.
 * @default 87
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent PartyScene
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param PartyCmdWin
 * @text Party Command Window
 *
 * @param PartyCmdWinAddParty:eval
 * @text Add Party Command
 * @parent PartyCmdWin
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Party' command to the Party Command Window?
 * @default false
 *
 * @param PartyCmdCooldown:num
 * @text Command Cooldown
 * @parent PartyCmdWin
 * @desc Cooldown (in turns) for this command to be available again.
 * @default 1
 *
 * @param ActorCmdWin
 * @text Actor Command Window
 *
 * @param ActorCmdWinAddParty:eval
 * @text Add Switch Command
 * @parent ActorCmdWin
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Switch' command to the Actor Command Window?
 * @default true
 *
 * @param ActorCmdCooldown:num
 * @text Command Cooldown
 * @parent ActorCmdWin
 * @desc Cooldown (in turns) for this command to be available again.
 * @default 1
 *
 * @param SwitchOutAnimation:eval
 * @text Switch Out Animation?
 * @parent ActorCmdWin
 * @type boolean
 * @on Show
 * @off Don't
 * @desc Show the sprites switching out when using individual party member switching?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Vocabulary Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param General
 *
 * @param ActiveParty:str
 * @text Active Party
 * @parent General
 * @desc Vocabulary used to represent the Active Party.
 * @default Active Party
 *
 * @param ReserveParty:str
 * @text Reserve Party
 * @parent General
 * @desc Vocabulary used to represent the Reserve Party.
 * @default Reserve Party
 *
 * @param Status:str
 * @text Status
 * @parent General
 * @desc Vocabulary used to represent the Status Window.
 * @default Status
 *
 * @param PartyScene
 * @text Party Scene
 *
 * @param Windows
 * @parent PartyScene
 *
 * @param Empty:str
 * @text Empty
 * @parent Windows
 * @desc For the party and status windows when no actor is selected.
 * @default - Empty -
 *
 * @param Remove:str
 * @text Remove
 * @parent Windows
 * @desc For the remove option.
 * @default Remove
 *
 * @param ButtonAssist
 * @text Button Assist
 * @parent PartyScene
 *
 * @param AssistSwapPosition:str
 * @text Swap Positions
 * @parent ButtonAssist
 * @desc Button assist text for the page up/down commands.
 * Requires VisuMZ_0_CoreEngine!
 * @default Quick Swap
 *
 * @param AssistRemove:str
 * @text Remove
 * @parent ButtonAssist
 * @desc Button assist text for the removal command.
 * Requires VisuMZ_0_CoreEngine!
 * @default Remove
 *
 * @param AssistSort:str
 * @text Sort
 * @parent ButtonAssist
 * @desc Button assist text for the sort command.
 * Requires VisuMZ_0_CoreEngine!
 * @default Sort
 *
 * @param AssistSwapIn:str
 * @text Swap In
 * @parent ButtonAssist
 * @desc Button assist text for swapping in actors.
 * Requires VisuMZ_0_CoreEngine!
 * @default Swap In
 *
 * @param AssistSwapOut:str
 * @text Swap Out
 * @parent ButtonAssist
 * @desc Button assist text for swapping out actors.
 * Requires VisuMZ_0_CoreEngine!
 * @default Swap Out
 *
 * @param BattleScene
 * @text Battle Scene
 *
 * @param BattlePartyCmd:str
 * @text Party Command
 * @parent BattleScene
 * @desc Command text for entering Party Scene.
 * Requires VisuMZ_1_BattleCore!
 * @default Party
 *
 * @param BattleHelpFormation:json
 * @text Help: Formation
 * @parent BattlePartyCmd:str
 * @type note
 * @desc Help text for Formation command.
 * Requires VisuMZ_1_BattleCore!
 * @default "Change up your party formation."
 *
 * @param QueuePartyScene:str
 * @text Queue Message
 * @parent BattlePartyCmd:str
 * @desc Message to say the Party Scene is queued.
 * Requires VisuMZ_1_BattleCore!
 * @default %1 Menu queued after action is complete.
 *
 * @param BattleSwitchOut:str
 * @text Switch Command
 * @parent BattleScene
 * @desc Command text for switching out members.
 * Requires VisuMZ_1_BattleCore!
 * @default Switch
 *
 * @param BattleHelpSwitch:json
 * @text Help: Switch
 * @parent BattleSwitchOut:str
 * @type note
 * @desc Help text for Switch command.
 * Requires VisuMZ_1_BattleCore!
 * @default "Switch out this party member with another."
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param ActivePartyLabel
 * @text Active Party Label
 *
 * @param ActivePartyLabelBgType:num
 * @text Background Type
 * @parent ActivePartyLabel
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActivePartyLabelRect:func
 * @text JS: X, Y, W, H
 * @parent ActivePartyLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.mainAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ActivePartyWindow
 * @text Active Party Window
 *
 * @param ActivePartyWindowBgType:num
 * @text Background Type
 * @parent ActivePartyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActivePartyGraphic:str
 * @text Actor Graphic
 * @parent ActivePartyWindow
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * @value svbattler
 * @desc Choose how the actor graphics appear in the active party menu.
 * @default face
 *
 * @param ActivePartyMapSprite
 * @text Map Sprite
 * @parent ActivePartyGraphic:str
 *
 * @param ActiveSpriteOffsetX:num
 * @text Offset X
 * @parent ActivePartyMapSprite
 * @desc If showing map sprites, offset the x coordinate here from center.
 * @default 0
 *
 * @param ActiveSpriteOffsetY:num
 * @text Offset Y
 * @parent ActivePartyMapSprite
 * @desc If showing map sprites, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ActivePartySvBattler
 * @text Sideview Battler
 * @parent ActivePartyGraphic:str
 *
 * @param ActiveBattlerOffsetX:num
 * @text Offset X
 * @parent ActivePartySvBattler
 * @desc If showing sideview battlers, offset the x coordinate here from center.
 * @default 0
 *
 * @param ActiveBattlerOffsetY:num
 * @text Offset Y
 * @parent ActivePartySvBattler
 * @desc If showing sideview battlers, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ActivePartyWindowRect:func
 * @text JS: X, Y, W, H
 * @parent ActivePartyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this._activePartyLabel.y + this._activePartyLabel.height;\nconst ww = Graphics.boxWidth;\nconst wh = ImageManager.faceHeight + $gameSystem.windowPadding() * 2 + 2;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ReservePartyLabel
 * @text Reserve Party Label
 *
 * @param ReservePartyLabelBgType:num
 * @text Background Type
 * @parent ReservePartyLabel
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ReservePartyLabelRect:func
 * @text JS: X, Y, W, H
 * @parent ReservePartyLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Math.max(240, Math.min(Graphics.boxWidth - 576, Math.round(Graphics.boxWidth / 2)));\nconst wx = this.isRightInputMode() ? (Graphics.boxWidth - ww) : 0;\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ReservePartyWindow
 * @text Reserve Party Window
 *
 * @param ReservePartyWindowBgType:num
 * @text Background Type
 * @parent ReservePartyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ReserveCol:num
 * @text Columns
 * @parent ReservePartyWindow
 * @type number
 * @min 1
 * @desc How many columns do you want there to be for the window?
 * @default 1
 *
 * @param ReserveItemThickness:num
 * @text Row Thickness
 * @parent ReservePartyWindow
 * @type number
 * @min 1
 * @desc How many rows thick do you want selectable items to be?
 * @default 2
 *
 * @param ReservePartyGraphic:str
 * @text Actor Graphic
 * @parent ReservePartyWindow
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * @value svbattler
 * @desc Choose how the actor graphics appear in the reserve party menu.
 * @default face
 *
 * @param ReservePartyMapSprite
 * @text Map Sprite
 * @parent ReservePartyGraphic:str
 *
 * @param ReserveSpriteOffsetX:num
 * @text Offset X
 * @parent ReservePartyMapSprite
 * @desc If showing map sprites, offset the x coordinate here from left.
 * @default 24
 *
 * @param ReserveSpriteOffsetY:num
 * @text Offset Y
 * @parent ReservePartyMapSprite
 * @desc If showing map sprites, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ReservePartySvBattler
 * @text Sideview Battler
 * @parent ReservePartyGraphic:str
 *
 * @param ReserveBattlerOffsetX:num
 * @text Offset X
 * @parent ReservePartySvBattler
 * @desc If showing sideview battlers, offset the x coordinate here from left.
 * @default 48
 *
 * @param ReserveBattlerOffsetY:num
 * @text Offset Y
 * @parent ReservePartySvBattler
 * @desc If showing sideview battlers, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ReservePartyWindowRect:func
 * @text JS: X, Y, W, H
 * @parent ReservePartyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this._reservePartyLabel.width;\nconst wx = this._reservePartyLabel.x;\nconst wy = this._reservePartyLabel.y + this._reservePartyLabel.height;\nconst wh = this.mainAreaHeight() - this._reservePartyLabel.height - this._activePartyWindow.height - this._activePartyLabel.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StatusLabel
 * @text Status Label
 *
 * @param StatusLabelBgType:num
 * @text Background Type
 * @parent StatusLabel
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusLabelRect:func
 * @text JS: X, Y, W, H
 * @parent StatusLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this._reservePartyLabel.width;\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusWindowBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusWindowDraw:func
 * @text JS: Draw Data
 * @parent StatusWindow
 * @type note
 * @desc Code used to draw the display data in the Status Window.
 * @default "// Draw Empty\nif (!this._actor) {\n    this.drawItemDarkRect(0, 0, this.innerWidth, this.innerHeight);\n    const y = Math.round((this.innerHeight - this.lineHeight()) / 2);\n    this.changeTextColor(ColorManager.systemColor());\n    this.drawText(TextManager.emptyPartyMember, 0, y, this.innerWidth, 'center');\n    return;\n}\n\n// Draw Face and Simple Status\nthis.drawActorFace(this._actor, 1, 0, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorSimpleStatus(this._actor, ImageManager.faceWidth + 36, 0);\n\n// Declare Constants\nconst lineHeight = this.lineHeight();\nconst params = this.actorParams();\nconst paramWidth = Math.round(this.innerWidth / 2);\nconst paramHeight = Math.ceil(params.length / 2) * lineHeight;\nconst baseX = 0;\nlet x = 0;\nlet y = ImageManager.faceHeight + lineHeight / 2;\n\n// Draw Parameters\nfor (const param of params) {\n    this.drawItemDarkRect(x, y, paramWidth, lineHeight);\n    this.drawParamName(param, x, y, paramWidth);\n    this.drawParamValue(param, x, y, paramWidth);\n\n    if (x === baseX) {\n        x += paramWidth;\n    } else {\n        x = baseX;\n        y += lineHeight;\n    }\n}"
 *
 * @param StatusWindowRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this._statusPartyLabel.width;\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\nconst wy = this._reservePartyWindow.y;\nconst wh = this._reservePartyWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param BattleSwitchWindow
 * @text Battle Switch Window
 *
 * @param BattleSwitchWindowBgType:num
 * @text Background Type
 * @parent BattleSwitchWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BattleSwitchWindowRect:func
 * @text JS: X, Y, W, H
 * @parent BattleSwitchWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * Does not apply to Border Battle Layout style.
 * @default "const padding = $gameSystem.windowPadding() * 2;\nlet ww = 516 + padding;\nlet wh = Window_PartyBattleSwitch.prototype.itemHeight() * 4 + padding;\nlet wx = Math.round(Graphics.boxWidth - ww) / 2;\nlet wy = Math.round(Graphics.boxHeight - wh - this._statusWindow.height) / 2;\nwy = wy.clamp(0, Graphics.boxHeight - wh - this._statusWindow.height);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

const _0x56e8=['rawBattleMembers','removePartyMember','canSwitchPartyInBattle','faceHeight','Game_Troop_increaseTurn','members','PRSHA','level','cursorPageup','_partySwitchDuration','commandStyle','partySwitchWindowRectBorder','match','_partySwitchBattleCommandCooldown','ReserveCol','YSYYX','Scene_Battle_updateBattleProcess','refreshAllWindows','addCommand','QueuePartyScene','drawText','onBattlePartySwitch','_partySystemSwitchOut','battlePartySwitchCooldown','systemColor','Game_Actor_setup','isShowPartySwitchOutAnimation','isShiftShortcutEnabled','currentActor','iconWidth','xfyED','isAlive','max','plStB','removeActor','SceneManager_isNextSceneBattleTransitionable','drawDarkRect','Scene_Battle_createPartyCommandWindowBattleCore','min','applyBattlePartySwitchCooldown','createStatusWindow','isPreviousSceneBattleTransitionable','StatusWindowBgType','STR','rearrangePartyActors','isCurrentItemEnabled','AssistSwapOut','duVMi','openness','ARRAYJSON','ReserveBattlerOffsetY','padding','call','Window','select','reservePartyLabelRect','Lock','_battleMaxSize','includes','setup','SnapshotOpacity','fillRect','ActiveSpriteOffsetY','itemPadding','createCustomBackgroundImages','setupBattleTestMembers','visible','JSON','addText','actor','itemLineRect','addActorToBattleMembersAtIndex','contents','PartyCmdWinAddParty','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','drawIcon','FUNC','param','faceWidth','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','AKmIq','addLoadListener','actorId','setStatusWindow','ActivePartyWindowBgType','urOTO','helpAreaHeight','activeParty','ActiveTpbFormationMessage','isPartyCommandEnabled','clearPartyBattleCommandCooldown','Game_Battler_onBattleStart','BAREo','BackRectColor','VisuMZ_1_MainMenuCore','MruuS','Value','reservePartyWindowRect','buttonAssistText1','isFormationChangeOk','changeTextColor','gradientFillRect','ReserveSpriteOffsetY','ARRAYFUNC','setBattlePartySwitchCooldown','MaxBattleMembers','drawItemImage','rujUO','AssistRemove','Settings','PartySystem','initPartySystem','smoothSelect','getBackgroundOpacity','isNextScene','updateHelp','isTriggered','commandPartyMemberSwitch','loadFaceImages','concat','removeActorFromBattleMembers','ActiveSpriteOffsetX','BToKb','xxIQO','Game_Party_initialize','ReserveBattlerOffsetX','IFBYf','lbYNS','lockPartyMemberIcon','stepForward','addFormationCommand','gyFoe','drawActorSimpleStatus','dimColor2','setPartyRequirement','drawItemEmpty','LockIcon','Game_Unit_inBattle','battlePartySwitchCmd','parse','statusLabelRect','bitmap','Window_ActorCommand_updateHelp','createPartySwitchWindow','text','_actorCommandWindow','createPartyCommandWindowBattleCore','popScene','drawActorPartyIcons','description','_actors','createActivePartyLabel','makeActions','changePaintOpacity','SApTQ','maxItems','registerCommand','imQnl','SwitchOutAnimation','getPartySystemBackColor','partySwitchWindowRect','iconHeight','buttonAssistText4','reserveMembers','BattlePartyCmd','drawItemImageSprite','_lastIndex','addWindow','MEkUs','Param','assistSwapPositions','itemRectWithPadding','Empty','changeLevel','processShiftRemoveShortcut','WsXpt','Game_Party_removeActor','BattleHelpFormation','_currentActor','createStatusLabel','onActiveOk','resetFontSettings','testBattlers','ActiveParty','height','createPageButtons','_scene','uiMenuStyle','ActorCmdCooldown','svbattler','StatusWindowRect','filter','Remove','reserveParty','windowPadding','battlePartyChangeIcon','getColor','formation','addActorToBattleMembers','defaultMaxBattleMembers','Scene_Battle_createAllWindows','onBattleStart','_statusPartyLabel','pendingIndex','drawParamName','regenerateAll','initEquips','updatePartySwitch','requiredPartyMemberIcon','battlePartyChangeCmdHelp','clear','AssistSwapIn','nVYqM','setPartyLock','lineHeight','isCancelEnabled','createReservePartyLabel','ActivePartyGraphic','buttonAssistKey3','BattleSwitchWindowBgType','SceneManager_isPreviousSceneBattleTransitionable','loadPartyImages','map','ReservePartyLabelRect','setHandler','addCustomCommands','CallPartyScene','isRightInputMode','loadFace','updateBattlePartySwitchCooldown','maxCols','setBackgroundOpacity','createActivePartyWindow','drawParamText','loadTitle2','ucuNW','format','isFormationEnabled','AssistSwapPosition','loadCharacter','partyChangeRefresh','AssistSort','commandFormation','RmfzQ','quickSwap','name','onPartySwitchCancel','createAllWindows','clearPartySwitchCommandCooldown','BattleManager_setup','createBackground','version','centerSprite','battleMembers','battlePartyChangeCmd','rYlTL','faceName','playCursorSound','sprite','update','callFormation','addChild','length','VhIhG','drawActorPartyIconsHorz','battlerName','_helpWindow','wmCoi','cursorUp','vamaW','isRequiredInParty','_reservePartyLabel','OAtHs','currentSymbol','statusWindowRect','_backSprite2','loadTitle1','checkShiftRemoveShortcut','anyRequiredPartyMembersInReserve','nameStartPosition','drawActorFace','drawItemImageSvActor','isAnyInputWindowActive','ActivePartyLabelRect','assistSwapInPartyMember','scaleSprite','ReserveSpriteOffsetX','drawItemStatus','remove','setText','initBattleMembers','startOpacity','border','setBattler','ReservePartyWindowRect','parameters','startSwitchOutAnimation','processCancel','VisuMZ_0_CoreEngine','isPreviousScene','assistSortPartyMembers','ceil','BgFilename2','battlePartySwitchCmdHelp','shift','activePartyWindowRect','RequirePartyMembers','_activePartyWindow','snapForBackground','AddRemoveCmd','round','ConvertParams','ITuwp','exit','_statusWindow','ReservePartyGraphic','push','gaugeBackColor','_logWindow','xowkL','ARRAYSTRUCT','drawActorName','actorParams','sortActors','drawParamValue','drawItemImageFace','_actor','_spriteset','isActor','playEquip','center','setupBattleTest','UihGy','ReservePartyWindowBgType','addPartyCommand','cancel','processCursorMove','refresh','Vocab','_activePartyLabel','itemRect','createActorCommandWindow','index','cursorPagedown','_partyCommandWindow','cxguM','_backSprite1','\x5cI[%1]%2','toUpperCase','_callSceneParty','initialize','battler','_subject','ARRAYSTR','terminate','awont','General','addNonBattleTestMembers','itemHeight','uiInputPosition','MRMlJ','deactivate','return\x200','isQueueFormationMenu','Actors','paintOpacity','flnpl','iIeST','textColor','activePartyLabelRect','DquAD','sort','processOk','Xpvey','ARRAYNUM','addActor','ReserveParty','activate','setBackgroundType','SWURt','_actorGraphic','skillItemWindowRectBorderStyle','BgFilename1','checkShiftSortShortcut','refreshOG','drawSvActor','drawActorCharacter','getInputButtonString','processPartySwitchMember','_reservePartyWindow','prototype','_battleMembers','drawActorClass','Scene_Battle_createActorCommandWindow','indexOf','startSwitchInAnimation','inBattle','_partyMemberSwitchWindow','kPgir','_partySystemBattleCommandCooldown','buttonAssistText3','NUM','checkInitBattleMembers','face','isSceneParty','getParamValue','width','createReservePartyWindow','_pageupButton','_statusPartyWindow','close','increaseTurn','drawItemDarkRect','slice','trim','_partySwitchTargetActor','PartyCmdCooldown','processShiftSortShortcut','allMembers','onReserveOk','drawItem','_rowThickness','recoverAll','battleLayoutStyle','Game_Party_setupBattleTest','processDrawItem','isEnabled','Require','LockPartyMembers','assistRemovePartyMember','maxBattleMembers','innerHeight','constructor','isSceneBattle','#%1','ActiveBattlerOffsetY','ensureCursorVisible','tmeKb','ActivePartyLabelBgType','dimColor1','OxYjr','create','setActor','emptyPartyMember','active','MpuOe','VisuMZ_1_BattleCore','toLowerCase','ReservePartyLabelBgType','drawActorPartyIconsVert','setupStartingMembers','isNextSceneBattleTransitionable','isFormationCommandEnabled','aZEMM','RequireIcon','changeMaxBattleMembers','hpColor','DisplayedParams','bind','deselect','drawRemoveCommand','placeBasicGauges','preparePartySwitchMember','Game_Party_addActor','CoreEngine','adjustSprite','BgSettings','cursorDown','onReserveCancel','Game_Party_setupStartingMembers','_partyRequired','LuutS','isAppeared','reselect','isShiftRemoveShortcutEnabled','assistSwapOutPartyMember','isOkEnabled','addRemoveCommand','_partyLocked','innerWidth','callUpdateHelp','partySwitchWindowRectStandard','statusParty','Window_PartyCommand_updateHelp','updatePadding','_windowLayer'];(function(_0x1cd173,_0x56e871){const _0x2bfa22=function(_0x2e1663){while(--_0x2e1663){_0x1cd173['push'](_0x1cd173['shift']());}};_0x2bfa22(++_0x56e871);}(_0x56e8,0xdd));const _0x2bfa=function(_0x1cd173,_0x56e871){_0x1cd173=_0x1cd173-0x0;let _0x2bfa22=_0x56e8[_0x1cd173];return _0x2bfa22;};var label=_0x2bfa('0x177'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2bfa('0x1c8')](function(_0x133735){return _0x133735['status']&&_0x133735['description'][_0x2bfa('0x143')]('['+label+']');})[0x0];VisuMZ[label][_0x2bfa('0x176')]=VisuMZ[label][_0x2bfa('0x176')]||{},VisuMZ['ConvertParams']=function(_0x1982a4,_0x27ecfc){for(const _0x35aff5 in _0x27ecfc){if(_0x2bfa('0x15e')!=='urOTO'){function _0x211111(){return _0xf25ab[_0x2bfa('0x115')](/#(.*)/i)?_0x2bfa('0xd5')[_0x2bfa('0xf')](_0xaa9dcc(_0x56555f['$1'])):this[_0x2bfa('0x93')](_0xe34c50(_0x133310));}}else{if(_0x35aff5[_0x2bfa('0x115')](/(.*):(.*)/i)){if('LuutS'!==_0x2bfa('0xfa')){function _0x45a415(){_0x405eb2[_0x2bfa('0x5f')](_0x4d6602);}}else{const _0x289948=String(RegExp['$1']),_0x19f588=String(RegExp['$2'])[_0x2bfa('0x7f')]()[_0x2bfa('0xc1')]();let _0x5b26a2,_0x47e1cc,_0x16631e;switch(_0x19f588){case _0x2bfa('0xb4'):_0x5b26a2=_0x27ecfc[_0x35aff5]!==''?Number(_0x27ecfc[_0x35aff5]):0x0;break;case _0x2bfa('0x99'):_0x47e1cc=_0x27ecfc[_0x35aff5]!==''?JSON[_0x2bfa('0x194')](_0x27ecfc[_0x35aff5]):[],_0x5b26a2=_0x47e1cc[_0x2bfa('0x1')](_0x228b03=>Number(_0x228b03));break;case'EVAL':_0x5b26a2=_0x27ecfc[_0x35aff5]!==''?eval(_0x27ecfc[_0x35aff5]):null;break;case'ARRAYEVAL':_0x47e1cc=_0x27ecfc[_0x35aff5]!==''?JSON[_0x2bfa('0x194')](_0x27ecfc[_0x35aff5]):[],_0x5b26a2=_0x47e1cc['map'](_0x3f1790=>eval(_0x3f1790));break;case _0x2bfa('0x14c'):_0x5b26a2=_0x27ecfc[_0x35aff5]!==''?JSON[_0x2bfa('0x194')](_0x27ecfc[_0x35aff5]):'';break;case _0x2bfa('0x13a'):_0x47e1cc=_0x27ecfc[_0x35aff5]!==''?JSON[_0x2bfa('0x194')](_0x27ecfc[_0x35aff5]):[],_0x5b26a2=_0x47e1cc[_0x2bfa('0x1')](_0x182313=>JSON[_0x2bfa('0x194')](_0x182313));break;case _0x2bfa('0x155'):_0x5b26a2=_0x27ecfc[_0x35aff5]!==''?new Function(JSON[_0x2bfa('0x194')](_0x27ecfc[_0x35aff5])):new Function(_0x2bfa('0x8d'));break;case _0x2bfa('0x170'):_0x47e1cc=_0x27ecfc[_0x35aff5]!==''?JSON[_0x2bfa('0x194')](_0x27ecfc[_0x35aff5]):[],_0x5b26a2=_0x47e1cc['map'](_0x9d012a=>new Function(JSON['parse'](_0x9d012a)));break;case _0x2bfa('0x134'):_0x5b26a2=_0x27ecfc[_0x35aff5]!==''?String(_0x27ecfc[_0x35aff5]):'';break;case _0x2bfa('0x84'):_0x47e1cc=_0x27ecfc[_0x35aff5]!==''?JSON[_0x2bfa('0x194')](_0x27ecfc[_0x35aff5]):[],_0x5b26a2=_0x47e1cc[_0x2bfa('0x1')](_0xe81b6e=>String(_0xe81b6e));break;case'STRUCT':_0x16631e=_0x27ecfc[_0x35aff5]!==''?JSON[_0x2bfa('0x194')](_0x27ecfc[_0x35aff5]):{},_0x5b26a2=VisuMZ[_0x2bfa('0x5a')]({},_0x16631e);break;case _0x2bfa('0x63'):_0x47e1cc=_0x27ecfc[_0x35aff5]!==''?JSON[_0x2bfa('0x194')](_0x27ecfc[_0x35aff5]):[],_0x5b26a2=_0x47e1cc[_0x2bfa('0x1')](_0x5ca27c=>VisuMZ['ConvertParams']({},JSON[_0x2bfa('0x194')](_0x5ca27c)));break;default:continue;}_0x1982a4[_0x289948]=_0x5b26a2;}}}}return _0x1982a4;},(_0x16e757=>{const _0x403a39=_0x16e757['name'];for(const _0x33b9f6 of dependencies){if(_0x2bfa('0x1b8')===_0x2bfa('0x1b8')){if(!Imported[_0x33b9f6]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x403a39,_0x33b9f6)),SceneManager[_0x2bfa('0x5c')]();break;}}else{function _0x184913(){const _0x20f51e=_0x25a692[_0x2bfa('0x156')](_0x2f3779);this['changeTextColor'](_0x2e821a[_0x2bfa('0x121')]()),this[_0x2bfa('0x11d')](_0x20f51e,_0xd841f3+_0x231834,_0x2069a3,_0x3f95cb);}}}const _0x120f73=_0x16e757[_0x2bfa('0x19e')];if(_0x120f73[_0x2bfa('0x115')](/\[Version[ ](.*?)\]/i)){const _0x291292=Number(RegExp['$1']);_0x291292!==VisuMZ[label][_0x2bfa('0x1e')]&&(alert(_0x2bfa('0x158')[_0x2bfa('0xf')](_0x403a39,_0x291292)),SceneManager[_0x2bfa('0x5c')]());}if(_0x120f73[_0x2bfa('0x115')](/\[Tier[ ](\d+)\]/i)){if('wIbpu'==='hJxOB'){function _0x5c2831(){if(this[_0x2bfa('0xb2')]===_0x15620d)this['clearPartyBattleCommandCooldown']();return this[_0x2bfa('0xb2')];}}else{const _0x388736=Number(RegExp['$1']);_0x388736<tier?(alert(_0x2bfa('0x153')[_0x2bfa('0xf')](_0x403a39,_0x388736,tier)),SceneManager[_0x2bfa('0x5c')]()):tier=Math['max'](_0x388736,tier);}}VisuMZ[_0x2bfa('0x5a')](VisuMZ[label][_0x2bfa('0x176')],_0x16e757[_0x2bfa('0x4a')]);})(pluginData),PluginManager[_0x2bfa('0x1a5')](pluginData[_0x2bfa('0x18')],_0x2bfa('0x5'),_0x309cf5=>{SceneManager['push'](Scene_Party);}),PluginManager[_0x2bfa('0x1a5')](pluginData['name'],'PluginCommandFunctionName',_0x2df2bb=>{if($gameParty[_0x2bfa('0xaf')]())return;VisuMZ['ConvertParams'](_0x2df2bb,_0x2df2bb);const _0x4d1a38=_0x2df2bb[_0x2bfa('0x169')];$gameParty[_0x2bfa('0xea')](_0x4d1a38);}),PluginManager['registerCommand'](pluginData[_0x2bfa('0x18')],_0x2bfa('0xcf'),_0x5e2eae=>{VisuMZ[_0x2bfa('0x5a')](_0x5e2eae,_0x5e2eae);const _0x17eb28=_0x5e2eae[_0x2bfa('0x8f')]['map'](_0x54d2e6=>$gameActors[_0x2bfa('0x14e')](_0x54d2e6))[_0x2bfa('0x43')](null),_0x32f6f7=_0x5e2eae[_0x2bfa('0x141')];for(const _0x280dc1 of _0x17eb28){if(_0x2bfa('0xd8')!==_0x2bfa('0xd8')){function _0x5d182a(){this[_0x2bfa('0x11f')]=!![],_0x3bc9ea[_0x2bfa('0x4b')](_0x34ed44);}}else{if(!_0x280dc1)continue;_0x280dc1[_0x2bfa('0x1de')](_0x32f6f7);}}}),PluginManager[_0x2bfa('0x1a5')](pluginData[_0x2bfa('0x18')],_0x2bfa('0x55'),_0x1382ba=>{VisuMZ['ConvertParams'](_0x1382ba,_0x1382ba);const _0x5cfc03=_0x1382ba[_0x2bfa('0x8f')][_0x2bfa('0x1')](_0x3d178f=>$gameActors[_0x2bfa('0x14e')](_0x3d178f))['remove'](null),_0x39ce5c=_0x1382ba[_0x2bfa('0xce')];for(const _0x126db1 of _0x5cfc03){if(_0x2bfa('0x127')===_0x2bfa('0x188')){function _0x5847e7(){_0x12d62d[_0x2bfa('0xa9')][_0x2bfa('0x73')][_0x2bfa('0x13d')](this),this[_0x2bfa('0x38')]();}}else{if(!_0x126db1)continue;_0x126db1[_0x2bfa('0x18f')](_0x39ce5c);}}}),ImageManager[_0x2bfa('0x189')]=VisuMZ['PartySystem'][_0x2bfa('0x176')][_0x2bfa('0x87')][_0x2bfa('0x191')],ImageManager[_0x2bfa('0x1d9')]=VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x87')][_0x2bfa('0xe9')],TextManager[_0x2bfa('0x160')]=VisuMZ['PartySystem'][_0x2bfa('0x176')][_0x2bfa('0x75')][_0x2bfa('0x1c0')],TextManager[_0x2bfa('0x1ca')]=VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x75')][_0x2bfa('0x9b')],TextManager['statusParty']=VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x75')]['Status'],TextManager['emptyPartyMember']=VisuMZ[_0x2bfa('0x177')]['Settings'][_0x2bfa('0x75')][_0x2bfa('0x1b5')],TextManager[_0x2bfa('0x10a')]=VisuMZ['PartySystem'][_0x2bfa('0x176')][_0x2bfa('0x75')][_0x2bfa('0x1c9')],TextManager[_0x2bfa('0x1b3')]=VisuMZ[_0x2bfa('0x177')]['Settings'][_0x2bfa('0x75')][_0x2bfa('0x11')],TextManager[_0x2bfa('0xd0')]=VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x75')][_0x2bfa('0x175')],TextManager[_0x2bfa('0x4f')]=VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')]['Vocab'][_0x2bfa('0x14')],TextManager[_0x2bfa('0x3f')]=VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x75')][_0x2bfa('0x1dc')],TextManager[_0x2bfa('0xfe')]=VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x75')][_0x2bfa('0x137')],ColorManager[_0x2bfa('0x1cd')]=function(_0x4595cb){if(_0x4595cb[_0x2bfa('0x115')](/#(.*)/i))return _0x2bfa('0xd5')['format'](String(RegExp['$1']));else{if(_0x2bfa('0x6f')!==_0x2bfa('0x62'))return this[_0x2bfa('0x93')](Number(_0x4595cb));else{function _0x2528b9(){this[_0x2bfa('0x142')]=_0x3dbb73[_0x2bfa('0x1d0')],this[_0x2bfa('0xaa')]=this[_0x2bfa('0x19f')]['slice'](0x0,this[_0x2bfa('0x142')]);while(this[_0x2bfa('0xaa')][_0x2bfa('0x29')]<this[_0x2bfa('0x142')]){this[_0x2bfa('0xaa')][_0x2bfa('0x5f')](0x0);}if(_0x4415c2)_0xbb5838[_0x2bfa('0x74')]();}}}},SceneManager[_0x2bfa('0xb7')]=function(){return this[_0x2bfa('0x1c3')]&&this[_0x2bfa('0x1c3')]['constructor']===Scene_Party;},VisuMZ[_0x2bfa('0x177')]['BattleManager_setup']=BattleManager[_0x2bfa('0x144')],BattleManager[_0x2bfa('0x144')]=function(_0x51c1b5,_0x289454,_0x135bfb){VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x1c')][_0x2bfa('0x13d')](this,_0x51c1b5,_0x289454,_0x135bfb),$gameParty['clearPartyBattleCommandCooldown']();},VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x164')]=Game_Battler[_0x2bfa('0xa9')][_0x2bfa('0x1d2')],Game_Battler[_0x2bfa('0xa9')][_0x2bfa('0x1d2')]=function(_0x5e5eaa){VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x164')][_0x2bfa('0x13d')](this,_0x5e5eaa);if(this[_0x2bfa('0x6b')]())this['clearPartySwitchCommandCooldown']();},VisuMZ[_0x2bfa('0x177')]['Game_Battler_regenerateAll']=Game_Battler[_0x2bfa('0xa9')][_0x2bfa('0x1d6')],Game_Battler[_0x2bfa('0xa9')][_0x2bfa('0x1d6')]=function(){VisuMZ[_0x2bfa('0x177')]['Game_Battler_regenerateAll'][_0x2bfa('0x13d')](this);if(this[_0x2bfa('0x6b')]())this[_0x2bfa('0x8')]();},VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x122')]=Game_Actor[_0x2bfa('0xa9')][_0x2bfa('0x144')],Game_Actor[_0x2bfa('0xa9')][_0x2bfa('0x144')]=function(_0x41ce0d){VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x122')][_0x2bfa('0x13d')](this,_0x41ce0d),this[_0x2bfa('0x178')](),this['clearPartySwitchCommandCooldown']();},Game_Actor[_0x2bfa('0xa9')][_0x2bfa('0x178')]=function(){this[_0x2bfa('0x101')]=![],this['_partyRequired']=![];},Game_Actor[_0x2bfa('0xa9')]['isFormationChangeOk']=function(){if(this[_0x2bfa('0x101')]===undefined)this[_0x2bfa('0x178')]();return!this[_0x2bfa('0x101')];},Game_Actor['prototype'][_0x2bfa('0x1de')]=function(_0x18eb24){if(this['_partyLocked']===undefined)this[_0x2bfa('0x178')]();this[_0x2bfa('0x101')]=_0x18eb24;},Game_Actor['prototype'][_0x2bfa('0x31')]=function(){if(this[_0x2bfa('0xf9')]===undefined)this[_0x2bfa('0x178')]();return this[_0x2bfa('0xf9')];},Game_Actor[_0x2bfa('0xa9')][_0x2bfa('0x18f')]=function(_0x3d1dd5){if(this['_partyRequired']===undefined)this[_0x2bfa('0x178')]();this[_0x2bfa('0xf9')]=_0x3d1dd5;},Game_Actor[_0x2bfa('0xa9')][_0x2bfa('0x1b')]=function(){this[_0x2bfa('0x116')]=0x0;},Game_Actor['prototype'][_0x2bfa('0x10b')]=function(){if(this[_0x2bfa('0x116')]===undefined)this[_0x2bfa('0x1b')]();if(!this[_0x2bfa('0x16c')]())return![];if(this[_0x2bfa('0x31')]())return![];return this[_0x2bfa('0x116')]<=0x0;},Game_Actor['prototype'][_0x2bfa('0x120')]=function(){if(this[_0x2bfa('0x116')]===undefined)this['clearPartySwitchCommandCooldown']();return this[_0x2bfa('0x116')];},Game_Actor[_0x2bfa('0xa9')][_0x2bfa('0x171')]=function(_0x3c9eda){if(this['_partySwitchBattleCommandCooldown']===undefined)this[_0x2bfa('0x1b')]();this['_partySwitchBattleCommandCooldown']=_0x3c9eda||0x0;},Game_Actor[_0x2bfa('0xa9')][_0x2bfa('0x130')]=function(){if(this[_0x2bfa('0x116')]===undefined)this[_0x2bfa('0x1b')]();const _0xc66591=VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x87')][_0x2bfa('0x1c5')];this[_0x2bfa('0x171')](_0xc66591);},Game_Actor[_0x2bfa('0xa9')][_0x2bfa('0x8')]=function(){if(this[_0x2bfa('0x116')]===undefined)this[_0x2bfa('0x1b')]();this[_0x2bfa('0x116')]--;},Game_Actor[_0x2bfa('0xa9')]['onBattlePartySwitch']=function(){},VisuMZ['PartySystem'][_0x2bfa('0x192')]=Game_Unit[_0x2bfa('0xa9')][_0x2bfa('0xaf')],Game_Unit[_0x2bfa('0xa9')]['inBattle']=function(){if(SceneManager[_0x2bfa('0xb7')]())return![];return VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x192')]['call'](this);},Game_Party[_0x2bfa('0x1d0')]=VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x87')][_0x2bfa('0x172')],VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x185')]=Game_Party['prototype'][_0x2bfa('0x81')],Game_Party[_0x2bfa('0xa9')]['initialize']=function(){VisuMZ[_0x2bfa('0x177')]['Game_Party_initialize'][_0x2bfa('0x13d')](this),this[_0x2bfa('0x163')](),this['initMaxBattleMembers'](),this[_0x2bfa('0x45')]();},Game_Party[_0x2bfa('0xa9')]['clearPartyBattleCommandCooldown']=function(){this[_0x2bfa('0xb2')]=0x0;},Game_Party['prototype']['canSwitchPartyInBattle']=function(){if(this[_0x2bfa('0xb2')]===undefined)this[_0x2bfa('0x163')]();return this[_0x2bfa('0xb2')]<=0x0;},Game_Party[_0x2bfa('0xa9')]['battlePartySwitchCooldown']=function(){if(this[_0x2bfa('0xb2')]===undefined)this[_0x2bfa('0x163')]();return this[_0x2bfa('0xb2')];},Game_Party[_0x2bfa('0xa9')]['setBattlePartySwitchCooldown']=function(_0x83e7c5){if(this[_0x2bfa('0xb2')]===undefined)this['clearPartyBattleCommandCooldown']();this[_0x2bfa('0xb2')]=_0x83e7c5;},Game_Party[_0x2bfa('0xa9')]['applyBattlePartySwitchCooldown']=function(){if(this[_0x2bfa('0xb2')]===undefined)this[_0x2bfa('0x163')]();this[_0x2bfa('0xb2')]=VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x87')][_0x2bfa('0xc3')]||0x0;},Game_Party[_0x2bfa('0xa9')][_0x2bfa('0x8')]=function(){if(this['_partySystemBattleCommandCooldown']===undefined)this[_0x2bfa('0x163')]();this[_0x2bfa('0xb2')]--;},Game_Party[_0x2bfa('0xa9')]['initMaxBattleMembers']=function(){this[_0x2bfa('0x142')]=0x0;},Game_Party['prototype'][_0x2bfa('0xea')]=function(_0x480c6a){this['_battleMaxSize']=_0x480c6a,this[_0x2bfa('0x45')]();},Game_Party[_0x2bfa('0xa9')][_0x2bfa('0xd1')]=function(){if(this[_0x2bfa('0x142')]===undefined)this[_0x2bfa('0x45')]();return this[_0x2bfa('0x142')]||Game_Party['defaultMaxBattleMembers'];},Game_Party[_0x2bfa('0xa9')][_0x2bfa('0xb5')]=function(){if(this[_0x2bfa('0x142')]===undefined)this[_0x2bfa('0x45')]();if(!this[_0x2bfa('0xaa')])this[_0x2bfa('0x45')]();},Game_Party[_0x2bfa('0xa9')]['initBattleMembers']=function(){this[_0x2bfa('0x142')]=Game_Party['defaultMaxBattleMembers'],this['_battleMembers']=this[_0x2bfa('0x19f')][_0x2bfa('0xc0')](0x0,this[_0x2bfa('0x142')]);while(this[_0x2bfa('0xaa')][_0x2bfa('0x29')]<this[_0x2bfa('0x142')]){this[_0x2bfa('0xaa')]['push'](0x0);}if($gamePlayer)$gamePlayer[_0x2bfa('0x74')]();},Game_Party[_0x2bfa('0xa9')][_0x2bfa('0x20')]=function(){return this[_0x2bfa('0x109')]()[_0x2bfa('0x1c8')](_0x2ac99b=>!!_0x2ac99b);},Game_Party[_0x2bfa('0xa9')][_0x2bfa('0x109')]=function(){this[_0x2bfa('0xb5')]();const _0x475f8e=this[_0x2bfa('0xaa')][_0x2bfa('0x1')](_0x4e5786=>$gameActors['actor'](_0x4e5786));return SceneManager['isSceneParty']()?_0x475f8e:_0x475f8e[_0x2bfa('0x1c8')](_0x1c4bf8=>_0x1c4bf8&&_0x1c4bf8[_0x2bfa('0xfb')]());},Game_Party['prototype'][_0x2bfa('0x1ac')]=function(){const _0x47281e=this[_0x2bfa('0x20')]();return this[_0x2bfa('0xc5')]()[_0x2bfa('0x1c8')](_0x55de3a=>!_0x47281e['includes'](_0x55de3a));},VisuMZ['PartySystem'][_0x2bfa('0xf8')]=Game_Party[_0x2bfa('0xa9')][_0x2bfa('0xe5')],Game_Party[_0x2bfa('0xa9')][_0x2bfa('0xe5')]=function(){VisuMZ[_0x2bfa('0x177')][_0x2bfa('0xf8')][_0x2bfa('0x13d')](this),this[_0x2bfa('0x45')]();},VisuMZ[_0x2bfa('0x177')][_0x2bfa('0xcb')]=Game_Party[_0x2bfa('0xa9')]['setupBattleTest'],Game_Party[_0x2bfa('0xa9')][_0x2bfa('0x6e')]=function(){VisuMZ[_0x2bfa('0x177')][_0x2bfa('0xcb')][_0x2bfa('0x13d')](this),this[_0x2bfa('0x88')]();},Game_Party[_0x2bfa('0xa9')][_0x2bfa('0x14a')]=function(){this[_0x2bfa('0xaa')]=[],this[_0x2bfa('0x19f')]=[];for(const _0x3c565c of $dataSystem[_0x2bfa('0x1bf')]){const _0x23a842=$gameActors[_0x2bfa('0x14e')](_0x3c565c['actorId']);if(!_0x23a842)continue;_0x23a842[_0x2bfa('0x1b6')](_0x3c565c[_0x2bfa('0x110')],![]),_0x23a842[_0x2bfa('0x1d7')](_0x3c565c['equips']),_0x23a842[_0x2bfa('0xc9')](),this[_0x2bfa('0xaa')][_0x2bfa('0x5f')](_0x3c565c[_0x2bfa('0x15b')]),this[_0x2bfa('0x19f')][_0x2bfa('0x5f')](_0x3c565c[_0x2bfa('0x15b')]);}},Game_Party['prototype'][_0x2bfa('0x88')]=function(){const _0x1c74a7=this['battleMembers']();for(let _0xb7fa45=0x1;_0xb7fa45<$dataActors[_0x2bfa('0x29')];_0xb7fa45++){const _0x430fcb=$gameActors[_0x2bfa('0x14e')](_0xb7fa45);if(!_0x430fcb)continue;if(_0x430fcb[_0x2bfa('0x18')]()['length']<=0x0)continue;if(_0x430fcb[_0x2bfa('0x18')]()[_0x2bfa('0x115')](/-----/i))continue;if(_0x1c74a7[_0x2bfa('0x143')](_0x430fcb))continue;this[_0x2bfa('0x19f')][_0x2bfa('0x5f')](_0x430fcb['actorId']());}},VisuMZ['PartySystem'][_0x2bfa('0xf2')]=Game_Party[_0x2bfa('0xa9')][_0x2bfa('0x9a')],Game_Party[_0x2bfa('0xa9')][_0x2bfa('0x9a')]=function(_0x2a7e29){VisuMZ[_0x2bfa('0x177')][_0x2bfa('0xf2')][_0x2bfa('0x13d')](this,_0x2a7e29),this['addActorToBattleMembers'](_0x2a7e29);},Game_Party[_0x2bfa('0xa9')][_0x2bfa('0x1cf')]=function(_0x31b611){this[_0x2bfa('0xb5')]();if(this[_0x2bfa('0xaa')][_0x2bfa('0x143')](_0x31b611))return;if(!this[_0x2bfa('0xaa')]['includes'](0x0))return;const _0x4fbc07=this[_0x2bfa('0xaa')][_0x2bfa('0xad')](0x0);this[_0x2bfa('0xaa')][_0x4fbc07]=_0x31b611,this[_0x2bfa('0x13')]();},Game_Party['prototype'][_0x2bfa('0x150')]=function(_0x27b3f3,_0x49e023){this[_0x2bfa('0xb5')]();if(this[_0x2bfa('0xaa')][_0x2bfa('0x143')](_0x27b3f3))return;if(!this[_0x2bfa('0xaa')][_0x2bfa('0x143')](0x0))return;this[_0x2bfa('0xaa')][_0x49e023]=_0x27b3f3,this['partyChangeRefresh']();},VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x1b9')]=Game_Party[_0x2bfa('0xa9')][_0x2bfa('0x12b')],Game_Party['prototype'][_0x2bfa('0x12b')]=function(_0x3769ff){VisuMZ['PartySystem'][_0x2bfa('0x1b9')]['call'](this,_0x3769ff),this[_0x2bfa('0x181')](_0x3769ff);},Game_Party[_0x2bfa('0xa9')][_0x2bfa('0x181')]=function(_0x2afc12){this[_0x2bfa('0xb5')]();if(!this[_0x2bfa('0xaa')]['includes'](_0x2afc12))return;if(_0x2afc12<=0x0)return;const _0x193326=this[_0x2bfa('0xaa')][_0x2bfa('0xad')](_0x2afc12);this[_0x2bfa('0xaa')][_0x193326]=0x0,this['_actors'][_0x2bfa('0x43')](_0x2afc12),this[_0x2bfa('0x19f')][_0x2bfa('0x5f')](_0x2afc12),this[_0x2bfa('0x13')]();},Game_Party['prototype'][_0x2bfa('0x13')]=function(){this[_0x2bfa('0x135')](),$gamePlayer[_0x2bfa('0x74')](),$gameMap['requestRefresh']();},Game_Party[_0x2bfa('0xa9')][_0x2bfa('0x135')]=function(){this[_0x2bfa('0xb5')]();const _0x13e434=this['battleMembers']()[_0x2bfa('0x180')](this[_0x2bfa('0x1ac')]());this['_actors']=_0x13e434[_0x2bfa('0x1')](_0x4b1cb2=>_0x4b1cb2?_0x4b1cb2[_0x2bfa('0x15b')]():0x0)['remove'](0x0);},Game_Party[_0x2bfa('0xa9')]['sortActors']=function(){this[_0x2bfa('0x19f')][_0x2bfa('0x96')]((_0x24afce,_0x54bbf9)=>_0x24afce-_0x54bbf9),this[_0x2bfa('0x135')](),this[_0x2bfa('0x13')]();},Game_Party['prototype'][_0x2bfa('0x39')]=function(){for(const _0xedbedb of this[_0x2bfa('0x1ac')]()){if(!_0xedbedb)continue;if(_0xedbedb['isRequiredInParty']())return!![];}return![];},VisuMZ[_0x2bfa('0x177')]['Game_Troop_increaseTurn']=Game_Troop[_0x2bfa('0xa9')]['increaseTurn'],Game_Troop[_0x2bfa('0xa9')][_0x2bfa('0xbe')]=function(){VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x10d')][_0x2bfa('0x13d')](this),$gameParty['updateBattlePartySwitchCooldown']();},Scene_Menu[_0x2bfa('0xa9')][_0x2bfa('0x15')]=function(){SceneManager[_0x2bfa('0x5f')](Scene_Party);};function Scene_Party(){this[_0x2bfa('0x81')](...arguments);}Scene_Party[_0x2bfa('0xa9')]=Object[_0x2bfa('0xdc')](Scene_MenuBase[_0x2bfa('0xa9')]),Scene_Party['prototype'][_0x2bfa('0xd3')]=Scene_Party,Scene_Party[_0x2bfa('0xa9')][_0x2bfa('0x81')]=function(){this['loadPartyImages'](),Scene_MenuBase[_0x2bfa('0xa9')][_0x2bfa('0x81')]['call'](this);},Scene_Party[_0x2bfa('0xa9')][_0x2bfa('0x6')]=function(){if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x2bfa('0x8a')]!==undefined)return ConfigManager['uiInputPosition'];else{if(ConfigManager[_0x2bfa('0x1c4')]===![])return![];else{if(_0x2bfa('0x33')!=='rWNjm')return Scene_MenuBase[_0x2bfa('0xa9')]['isRightInputMode'][_0x2bfa('0x13d')](this);else{function _0x55f027(){const _0x294377=this[_0x2bfa('0x14e')](_0x24ff45),_0x56b266=this[_0x2bfa('0x14e')](_0x2528fa);if(_0x294377&&!_0x294377[_0x2bfa('0x16c')]())return;if(_0x56b266&&!_0x56b266['isFormationChangeOk']())return;const _0x854eed=_0x375327[_0x2bfa('0xaa')];_0x854eed[_0x850f0e]=_0x56b266?_0x56b266[_0x2bfa('0x15b')]():0x0,_0x854eed[_0x50a5ca]=_0x294377?_0x294377[_0x2bfa('0x15b')]():0x0,this[_0x2bfa('0x74')](),this[_0x2bfa('0x24')](),this[_0x2bfa('0x179')](_0x129ce1);}}}}},Scene_Party[_0x2bfa('0xa9')][_0x2bfa('0x15f')]=function(){return 0x0;},Scene_Party['prototype']['needsPageButtons']=function(){return!![];},Scene_Party['prototype'][_0x2bfa('0x1c2')]=function(){Scene_MenuBase[_0x2bfa('0xa9')][_0x2bfa('0x1c2')][_0x2bfa('0x13d')](this),this[_0x2bfa('0xbb')]['_clickHandler']=undefined,this['_pagedownButton']['_clickHandler']=undefined;},Scene_Party[_0x2bfa('0xa9')][_0x2bfa('0x0')]=function(){for(const _0x533873 of $gameParty[_0x2bfa('0x10e')]()){ImageManager[_0x2bfa('0x7')](_0x533873[_0x2bfa('0x23')]()),ImageManager[_0x2bfa('0x12')](_0x533873['characterName']()),ImageManager['loadSvActor'](_0x533873[_0x2bfa('0x2c')]());}},Scene_Party[_0x2bfa('0xa9')][_0x2bfa('0xdc')]=function(){Scene_MenuBase[_0x2bfa('0xa9')][_0x2bfa('0xdc')][_0x2bfa('0x13d')](this),this[_0x2bfa('0x1a0')](),this[_0x2bfa('0xb')](),this[_0x2bfa('0x1e1')](),this[_0x2bfa('0xba')](),this[_0x2bfa('0x1bc')](),this['createStatusWindow']();},Scene_Party[_0x2bfa('0xa9')][_0x2bfa('0x1a0')]=function(){const _0x52bc23=this[_0x2bfa('0x94')]();this[_0x2bfa('0x76')]=new Window_PartyLabel(_0x52bc23,TextManager[_0x2bfa('0x160')]),this[_0x2bfa('0x76')][_0x2bfa('0x9d')](VisuMZ['PartySystem']['Settings']['Window'][_0x2bfa('0xd9')]),this[_0x2bfa('0x1b0')](this['_activePartyLabel']);},Scene_Party['prototype'][_0x2bfa('0x94')]=function(){return VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x13e')][_0x2bfa('0x3e')][_0x2bfa('0x13d')](this);},Scene_Party['prototype']['createActivePartyWindow']=function(){const _0x50355d=this[_0x2bfa('0x54')]();this[_0x2bfa('0x56')]=new Window_PartyActive(_0x50355d),this['_activePartyWindow'][_0x2bfa('0x9d')](VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')]['Window'][_0x2bfa('0x15d')]),this['_activePartyWindow'][_0x2bfa('0x3')]('ok',this[_0x2bfa('0x1bd')][_0x2bfa('0xed')](this)),this[_0x2bfa('0x56')]['setHandler']('cancel',this[_0x2bfa('0x19c')]['bind'](this)),this[_0x2bfa('0x1b0')](this[_0x2bfa('0x56')]);},Scene_Party[_0x2bfa('0xa9')][_0x2bfa('0x54')]=function(){return VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x13e')]['ActivePartyWindowRect'][_0x2bfa('0x13d')](this);},Scene_Party[_0x2bfa('0xa9')][_0x2bfa('0x1bd')]=function(){this[_0x2bfa('0xa8')]['activate'](),this['_reservePartyWindow'][_0x2bfa('0xfc')]();},Scene_Party[_0x2bfa('0xa9')][_0x2bfa('0x1e1')]=function(){const _0xe51147=this[_0x2bfa('0x140')]();this[_0x2bfa('0x32')]=new Window_PartyLabel(_0xe51147,TextManager[_0x2bfa('0x1ca')]),this['_reservePartyLabel']['setBackgroundType'](VisuMZ['PartySystem'][_0x2bfa('0x176')][_0x2bfa('0x13e')][_0x2bfa('0xe3')]),this['addWindow'](this['_reservePartyLabel']);},Scene_Party[_0x2bfa('0xa9')][_0x2bfa('0x140')]=function(){return VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x13e')][_0x2bfa('0x2')][_0x2bfa('0x13d')](this);},Scene_Party[_0x2bfa('0xa9')][_0x2bfa('0xba')]=function(){const _0x22e11b=this['reservePartyWindowRect']();this[_0x2bfa('0xa8')]=new Window_PartyReserve(_0x22e11b),this['_reservePartyWindow']['setBackgroundType'](VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x13e')][_0x2bfa('0x70')]),this['_reservePartyWindow'][_0x2bfa('0x3')]('ok',this['onReserveOk'][_0x2bfa('0xed')](this)),this[_0x2bfa('0xa8')]['setHandler'](_0x2bfa('0x72'),this[_0x2bfa('0xf7')]['bind'](this)),this['addWindow'](this[_0x2bfa('0xa8')]);},Scene_Party[_0x2bfa('0xa9')][_0x2bfa('0x16a')]=function(){return VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x13e')][_0x2bfa('0x49')]['call'](this);},Scene_Party[_0x2bfa('0xa9')][_0x2bfa('0xc6')]=function(){const _0x45e382=this[_0x2bfa('0xa8')][_0x2bfa('0x1d4')](),_0x322440=this[_0x2bfa('0x56')][_0x2bfa('0x125')]();if(_0x45e382<0x0){if(_0x2bfa('0x184')===_0x2bfa('0x8b')){function _0x4082c4(){_0x31fab4[_0x2bfa('0xa9')][_0x2bfa('0x2f')][_0x2bfa('0x13d')](this,_0x1111db);}}else{if(_0x322440)$gameParty[_0x2bfa('0x181')](_0x322440['actorId']());}}else{if(_0x2bfa('0x91')!==_0x2bfa('0x1a6')){const _0x39ad1f=this[_0x2bfa('0xa8')][_0x2bfa('0x125')]()[_0x2bfa('0x15b')](),_0x16802b=this['_activePartyWindow'][_0x2bfa('0x79')]();if(_0x322440)$gameParty['removeActorFromBattleMembers'](_0x322440['actorId']());$gameParty[_0x2bfa('0x150')](_0x39ad1f,_0x16802b);}else{function _0x243c18(){this[_0x2bfa('0x142')]=_0x54523e,this[_0x2bfa('0x45')]();}}}this[_0x2bfa('0x11a')](),this['onReserveCancel']();},Scene_Party[_0x2bfa('0xa9')][_0x2bfa('0x11a')]=function(){this[_0x2bfa('0x56')][_0x2bfa('0x74')](),this[_0x2bfa('0xa8')]['refresh']();},Scene_Party[_0x2bfa('0xa9')][_0x2bfa('0xf7')]=function(){this['_reservePartyWindow'][_0x2bfa('0x8c')](),this['_reservePartyWindow'][_0x2bfa('0xee')](),this[_0x2bfa('0x56')][_0x2bfa('0x9c')]();},Scene_Party[_0x2bfa('0xa9')][_0x2bfa('0x1bc')]=function(){const _0x17aeb1=this[_0x2bfa('0x195')]();this[_0x2bfa('0x1d3')]=new Window_PartyLabel(_0x17aeb1,TextManager[_0x2bfa('0x105')]),this[_0x2bfa('0x1d3')][_0x2bfa('0x9d')](VisuMZ['PartySystem'][_0x2bfa('0x176')][_0x2bfa('0x13e')]['StatusLabelBgType']),this[_0x2bfa('0x1b0')](this['_statusPartyLabel']);},Scene_Party[_0x2bfa('0xa9')][_0x2bfa('0x195')]=function(){return VisuMZ[_0x2bfa('0x177')]['Settings'][_0x2bfa('0x13e')]['StatusLabelRect'][_0x2bfa('0x13d')](this);},Scene_Party[_0x2bfa('0xa9')][_0x2bfa('0x131')]=function(){const _0x5b942d=this[_0x2bfa('0x35')]();this['_statusPartyWindow']=new Window_PartyStatus(_0x5b942d),this['_statusPartyWindow']['setBackgroundType'](VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x13e')][_0x2bfa('0x133')]),this[_0x2bfa('0x1b0')](this[_0x2bfa('0xbc')]),this[_0x2bfa('0xa8')][_0x2bfa('0x15c')](this[_0x2bfa('0xbc')]),this['_activePartyWindow'][_0x2bfa('0x15c')](this[_0x2bfa('0xbc')]);},Scene_Party[_0x2bfa('0xa9')][_0x2bfa('0x35')]=function(){return VisuMZ[_0x2bfa('0x177')]['Settings'][_0x2bfa('0x13e')][_0x2bfa('0x1c7')][_0x2bfa('0x13d')](this);},Scene_Party[_0x2bfa('0xa9')][_0x2bfa('0x1e3')]=function(){return TextManager[_0x2bfa('0xa6')](_0x2bfa('0x53'));},Scene_Party[_0x2bfa('0xa9')][_0x2bfa('0x16b')]=function(){return TextManager[_0x2bfa('0x1b3')];},Scene_Party['prototype'][_0x2bfa('0xb3')]=function(){const _0x4431e4=this['_activePartyWindow'],_0x253c85=this[_0x2bfa('0xa8')];if(_0x4431e4&&_0x4431e4[_0x2bfa('0xdf')]&&_0x4431e4[_0x2bfa('0x125')]()&&_0x4431e4[_0x2bfa('0xfd')]()){if(_0x2bfa('0x183')===_0x2bfa('0x183'))return TextManager['assistRemovePartyMember'];else{function _0x54f09a(){return _0x133d32[_0x2bfa('0x1ac')]()[_0x11f4a8];}}}else{if(_0x253c85&&_0x253c85['active']&&$gameParty[_0x2bfa('0x1ac')]()[_0x2bfa('0x29')]>0x0){if(_0x2bfa('0xe0')!==_0x2bfa('0x168'))return TextManager['assistSortPartyMembers'];else{function _0x58737b(){_0x18d39c[_0x2bfa('0x7')](_0x45fea8[_0x2bfa('0x23')]());}}}else return'';}},Scene_Party['prototype']['buttonAssistText4']=function(){if(this[_0x2bfa('0x56')]&&this['_activePartyWindow'][_0x2bfa('0xdf')]){if(_0x2bfa('0x30')!==_0x2bfa('0x22'))return TextManager[_0x2bfa('0xfe')];else{function _0x369162(){this[_0x2bfa('0x4c')]();}}}else{if(this[_0x2bfa('0xa8')]&&this['_reservePartyWindow'][_0x2bfa('0xdf')]){if(_0x2bfa('0x5b')!==_0x2bfa('0x5b')){function _0xb76935(){const _0x26c2f4=_0x3ab520[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x13e')];switch(_0x7a56f9['_actorGraphic']['toLowerCase']()['trim']()){case _0x2bfa('0xb6'):return _0x14af23['faceWidth'];case _0x2bfa('0x25'):return _0x26c2f4[_0x2bfa('0x41')]*0x2;case _0x2bfa('0x1c6'):return _0x26c2f4[_0x2bfa('0x186')]*0x2;};}}else return TextManager[_0x2bfa('0x3f')];}else return Scene_MenuBase['prototype'][_0x2bfa('0x1ab')][_0x2bfa('0x13d')](this);}},Scene_Party[_0x2bfa('0xa9')][_0x2bfa('0x1d')]=function(){Scene_MenuBase[_0x2bfa('0xa9')]['createBackground'][_0x2bfa('0x13d')](this),this[_0x2bfa('0xa')](this[_0x2bfa('0x17a')]()),this[_0x2bfa('0x149')]();},Scene_Party[_0x2bfa('0xa9')][_0x2bfa('0x17a')]=function(){return VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0xf5')][_0x2bfa('0x145')];},Scene_Party[_0x2bfa('0xa9')][_0x2bfa('0x149')]=function(){const _0x2f8fa6={'BgFilename1':VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0xf5')]['BgFilename1'],'BgFilename2':VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')]['BgSettings'][_0x2bfa('0x51')]};_0x2f8fa6&&(_0x2f8fa6[_0x2bfa('0xa1')]!==''||_0x2f8fa6[_0x2bfa('0x51')]!=='')&&(this['_backSprite1']=new Sprite(ImageManager[_0x2bfa('0x37')](_0x2f8fa6[_0x2bfa('0xa1')])),this[_0x2bfa('0x36')]=new Sprite(ImageManager[_0x2bfa('0xd')](_0x2f8fa6['BgFilename2'])),this[_0x2bfa('0x28')](this[_0x2bfa('0x7d')]),this[_0x2bfa('0x28')](this['_backSprite2']),this[_0x2bfa('0x7d')][_0x2bfa('0x196')][_0x2bfa('0x15a')](this['adjustSprite'][_0x2bfa('0xed')](this,this[_0x2bfa('0x7d')])),this[_0x2bfa('0x36')][_0x2bfa('0x196')][_0x2bfa('0x15a')](this[_0x2bfa('0xf4')][_0x2bfa('0xed')](this,this[_0x2bfa('0x36')])));},Scene_Party[_0x2bfa('0xa9')][_0x2bfa('0xf4')]=function(_0x3c23ee){this[_0x2bfa('0x40')](_0x3c23ee),this[_0x2bfa('0x1f')](_0x3c23ee);},Scene_Party[_0x2bfa('0xa9')][_0x2bfa('0x85')]=function(){Scene_MenuBase[_0x2bfa('0xa9')]['terminate'][_0x2bfa('0x13d')](this),$gameParty[_0x2bfa('0x13')]();},Window_StatusBase['prototype'][_0x2bfa('0x19d')]=function(_0x2f180a,_0x29a762,_0xfee681,_0x127f9d){if(!_0x2f180a)return;_0x127f9d?this[_0x2bfa('0xe4')](_0x2f180a,_0x29a762,_0xfee681):this[_0x2bfa('0x2b')](_0x2f180a,_0x29a762,_0xfee681);},Window_StatusBase['prototype']['drawActorPartyIconsHorz']=function(_0x404e8c,_0x51a72f,_0x1a7f20){_0x1a7f20+=Math[_0x2bfa('0x59')]((this[_0x2bfa('0x1df')]()-ImageManager[_0x2bfa('0x1aa')])/0x2),!_0x404e8c[_0x2bfa('0x16c')]()&&(this[_0x2bfa('0x154')](ImageManager[_0x2bfa('0x189')],_0x51a72f,_0x1a7f20),_0x51a72f+=ImageManager[_0x2bfa('0x126')]+0x4),_0x404e8c[_0x2bfa('0x31')]()&&(this[_0x2bfa('0x154')](ImageManager['requiredPartyMemberIcon'],_0x51a72f,_0x1a7f20),_0x51a72f+=ImageManager['iconWidth']+0x4);},Window_StatusBase[_0x2bfa('0xa9')][_0x2bfa('0xe4')]=function(_0x3e198e,_0xdfdae1,_0x523010){let _0xe35447=0x0;if(!_0x3e198e[_0x2bfa('0x16c')]())_0xe35447+=0x1;if(_0x3e198e[_0x2bfa('0x31')]())_0xe35447+=0x1;if(_0xe35447<=0x1)return this['drawActorPartyIconsHorz'](_0x3e198e,_0xdfdae1,_0x523010);_0x523010+=Math['round']((this[_0x2bfa('0x1df')]()-ImageManager[_0x2bfa('0x1aa')])/0x2),_0x523010-=Math['round'](this[_0x2bfa('0x1df')]()/0x2),this[_0x2bfa('0x154')](ImageManager[_0x2bfa('0x189')],_0xdfdae1,_0x523010),_0x523010+=this[_0x2bfa('0x1df')](),this['drawIcon'](ImageManager['requiredPartyMemberIcon'],_0xdfdae1,_0x523010);};function Window_PartyLabel(){this['initialize'](...arguments);}Window_PartyLabel[_0x2bfa('0xa9')]=Object[_0x2bfa('0xdc')](Window_Base[_0x2bfa('0xa9')]),Window_PartyLabel[_0x2bfa('0xa9')][_0x2bfa('0xd3')]=Window_PartyLabel,Window_PartyLabel[_0x2bfa('0xa9')][_0x2bfa('0x81')]=function(_0x2bfb0d,_0x1b5ead){Window_Base[_0x2bfa('0xa9')][_0x2bfa('0x81')][_0x2bfa('0x13d')](this,_0x2bfb0d),this[_0x2bfa('0x44')](_0x1b5ead);},Window_PartyLabel[_0x2bfa('0xa9')][_0x2bfa('0x107')]=function(){this[_0x2bfa('0x13c')]=0x0;},Window_PartyLabel[_0x2bfa('0xa9')][_0x2bfa('0x44')]=function(_0x54be9b){this[_0x2bfa('0x151')][_0x2bfa('0x1db')](),this[_0x2bfa('0x11d')](_0x54be9b,0x0,0x0,this['innerWidth'],_0x2bfa('0x6d'));};function Window_PartyActive(){this[_0x2bfa('0x81')](...arguments);}Window_PartyActive[_0x2bfa('0xa9')]=Object['create'](Window_StatusBase[_0x2bfa('0xa9')]),Window_PartyActive[_0x2bfa('0xa9')]['constructor']=Window_PartyActive,Window_PartyActive[_0x2bfa('0x9f')]=VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')]['Window'][_0x2bfa('0x1e2')],Window_PartyActive[_0x2bfa('0xa9')][_0x2bfa('0x81')]=function(_0x291088){Window_StatusBase[_0x2bfa('0xa9')][_0x2bfa('0x81')][_0x2bfa('0x13d')](this,_0x291088),this['refresh'](),this['activate'](),this[_0x2bfa('0x179')](0x0);},Window_PartyActive[_0x2bfa('0xa9')][_0x2bfa('0x100')]=function(){return VisuMZ['PartySystem'][_0x2bfa('0x176')][_0x2bfa('0x87')][_0x2bfa('0x58')];},Window_PartyActive[_0x2bfa('0xa9')][_0x2bfa('0x1a4')]=function(){return $gameParty[_0x2bfa('0xd1')]();},Window_PartyActive[_0x2bfa('0xa9')][_0x2bfa('0x9')]=function(){return $gameParty[_0x2bfa('0xd1')]();},Window_PartyActive[_0x2bfa('0xa9')][_0x2bfa('0x89')]=function(){return this[_0x2bfa('0xd2')];},Window_PartyActive[_0x2bfa('0xa9')][_0x2bfa('0x14e')]=function(_0x15ecd2){return $gameParty[_0x2bfa('0x109')]()[_0x15ecd2];},Window_PartyActive[_0x2bfa('0xa9')][_0x2bfa('0x125')]=function(){return this[_0x2bfa('0x14e')](this[_0x2bfa('0x79')]());},Window_PartyActive[_0x2bfa('0xa9')][_0x2bfa('0x136')]=function(){const _0x40fcb1=this['actor'](this[_0x2bfa('0x79')]());return _0x40fcb1?_0x40fcb1[_0x2bfa('0x16c')]():!![];},Window_PartyActive[_0x2bfa('0xa9')][_0x2bfa('0x1e0')]=function(){if($gameParty[_0x2bfa('0x10e')]()[_0x2bfa('0x29')]<=0x0)return!![];if($gameParty[_0x2bfa('0x39')]())return![];return $gameParty[_0x2bfa('0x20')]()['length']>0x0;},Window_PartyActive[_0x2bfa('0xa9')][_0x2bfa('0x73')]=function(){Window_StatusBase[_0x2bfa('0xa9')][_0x2bfa('0x73')]['call'](this),this[_0x2bfa('0x38')]();},Window_PartyActive[_0x2bfa('0xa9')][_0x2bfa('0xf6')]=function(_0x6af2fa){if(this[_0x2bfa('0xff')]()){if(_0x2bfa('0xe')!==_0x2bfa('0xdb'))this[_0x2bfa('0x97')]();else{function _0x2b6c50(){return this[_0x2bfa('0xd2')];}}}},Window_PartyActive[_0x2bfa('0xa9')][_0x2bfa('0x7a')]=function(){const _0x2fff5b=this[_0x2bfa('0x79')](),_0x36870c=_0x2fff5b+0x1>=this[_0x2bfa('0x1a4')]()?0x0:_0x2fff5b+0x1;this[_0x2bfa('0x17')](_0x2fff5b,_0x36870c);},Window_PartyActive[_0x2bfa('0xa9')][_0x2bfa('0x111')]=function(){const _0x555622=this[_0x2bfa('0x79')](),_0xb3b578=_0x555622-0x1<0x0?this['maxItems']()-0x1:_0x555622-0x1;this[_0x2bfa('0x17')](_0x555622,_0xb3b578);},Window_PartyActive['prototype'][_0x2bfa('0x17')]=function(_0x4e697e,_0x3b373b){const _0xc05fb5=this[_0x2bfa('0x14e')](_0x4e697e),_0x351268=this[_0x2bfa('0x14e')](_0x3b373b);if(_0xc05fb5&&!_0xc05fb5[_0x2bfa('0x16c')]())return;if(_0x351268&&!_0x351268[_0x2bfa('0x16c')]())return;const _0x367070=$gameParty[_0x2bfa('0xaa')];_0x367070[_0x4e697e]=_0x351268?_0x351268[_0x2bfa('0x15b')]():0x0,_0x367070[_0x3b373b]=_0xc05fb5?_0xc05fb5[_0x2bfa('0x15b')]():0x0,this[_0x2bfa('0x74')](),this['playCursorSound'](),this[_0x2bfa('0x179')](_0x3b373b);},Window_PartyActive[_0x2bfa('0xa9')][_0x2bfa('0x38')]=function(){if(!this[_0x2bfa('0xfd')]())return;if(Input['isTriggered'](_0x2bfa('0x53'))){if(_0x2bfa('0x118')===_0x2bfa('0x1b1')){function _0x171797(){_0xae209a=_0x326a1f[_0x2bfa('0x129')](_0x55eeba,_0x8a23f7);}}else{const _0x54acaf=this[_0x2bfa('0x125')]();this['processShiftRemoveShortcut']();}}},Window_PartyActive[_0x2bfa('0xa9')][_0x2bfa('0x1b7')]=function(){SoundManager[_0x2bfa('0x6c')]();const _0x2251fd=this['currentActor']();$gameParty[_0x2bfa('0x181')](_0x2251fd[_0x2bfa('0x15b')]()),this[_0x2bfa('0x103')](),SceneManager[_0x2bfa('0x1c3')]['refreshAllWindows']();},Window_PartyActive[_0x2bfa('0xa9')][_0x2bfa('0xfd')]=function(){if(!this[_0x2bfa('0x100')]())return![];const _0x4a9fcc=this['currentActor']();return this[_0x2bfa('0xdf')]&&_0x4a9fcc&&_0x4a9fcc[_0x2bfa('0x16c')]();},Window_PartyActive[_0x2bfa('0xa9')][_0x2bfa('0xc7')]=function(_0x2f0c0d){const _0x223586=this['actor'](_0x2f0c0d);if(!_0x223586)return this[_0x2bfa('0x190')](_0x2f0c0d);this[_0x2bfa('0x1be')]();const _0x308a89=this[_0x2bfa('0x77')](_0x2f0c0d);this[_0x2bfa('0x173')](_0x2f0c0d);const _0x4f0d49=_0x308a89['y']+_0x308a89[_0x2bfa('0x1c1')]-this['lineHeight']();this[_0x2bfa('0x12d')](_0x308a89['x'],_0x4f0d49,_0x308a89[_0x2bfa('0xb9')],0x2),this[_0x2bfa('0x19d')](_0x223586,_0x308a89['x']+0x2,_0x308a89['y']),this[_0x2bfa('0x64')](_0x223586,_0x308a89['x'],_0x4f0d49,_0x308a89[_0x2bfa('0xb9')]);},Window_PartyActive[_0x2bfa('0xa9')][_0x2bfa('0x190')]=function(_0x222872){this[_0x2bfa('0x1be')]();const _0x444156=this['itemRect'](_0x222872);this[_0x2bfa('0xbf')](_0x444156['x'],_0x444156['y'],_0x444156[_0x2bfa('0xb9')],_0x444156[_0x2bfa('0x1c1')]);const _0x40ea61=_0x444156['y']+Math[_0x2bfa('0x59')]((_0x444156[_0x2bfa('0x1c1')]-this[_0x2bfa('0x1df')]())/0x2);this[_0x2bfa('0x16d')](ColorManager[_0x2bfa('0x121')]()),this[_0x2bfa('0x11d')](TextManager[_0x2bfa('0xde')],_0x444156['x'],_0x40ea61,_0x444156[_0x2bfa('0xb9')],_0x2bfa('0x6d'));},Window_PartyActive[_0x2bfa('0xa9')][_0x2bfa('0xbf')]=function(_0x384ac8,_0x187971,_0x3c1e71,_0x3a740d,_0x12f3b0){_0x12f3b0=Math['max'](_0x12f3b0||0x1,0x1);while(_0x12f3b0--){_0x3a740d=_0x3a740d||this['lineHeight'](),this[_0x2bfa('0x151')][_0x2bfa('0x90')]=0xa0;const _0x47c066=ColorManager[_0x2bfa('0x60')]();this['contents'][_0x2bfa('0x146')](_0x384ac8+0x1,_0x187971+0x1,_0x3c1e71-0x2,_0x3a740d-0x2,_0x47c066),this['contents'][_0x2bfa('0x90')]=0xff;}},Window_PartyActive[_0x2bfa('0xa9')]['drawItemImage']=function(_0x148ac5){switch(Window_PartyActive[_0x2bfa('0x9f')][_0x2bfa('0xe2')]()[_0x2bfa('0xc1')]()){case'face':this[_0x2bfa('0x68')](_0x148ac5);break;case _0x2bfa('0x25'):this[_0x2bfa('0x1ae')](_0x148ac5);break;case _0x2bfa('0x1c6'):Imported[_0x2bfa('0x167')]&&this[_0x2bfa('0x3c')](_0x148ac5);break;};},Window_PartyActive[_0x2bfa('0xa9')][_0x2bfa('0x68')]=function(_0x380334){const _0x2c3eef=this[_0x2bfa('0x14e')](_0x380334),_0x1a4449=this[_0x2bfa('0x77')](_0x380334),_0x1cc2e8=Math['min'](ImageManager[_0x2bfa('0x157')],_0x1a4449[_0x2bfa('0xb9')]-0x2),_0x46da4b=_0x1a4449[_0x2bfa('0x1c1')]-0x2;this[_0x2bfa('0x1a2')](_0x2c3eef[_0x2bfa('0x16c')]());const _0x2faef7=Math[_0x2bfa('0x59')](_0x1a4449['x']+(_0x1a4449['width']-_0x1cc2e8)/0x2);this[_0x2bfa('0x3b')](_0x2c3eef,_0x2faef7,_0x1a4449['y']+0x1,_0x1cc2e8,_0x46da4b),this['changePaintOpacity'](!![]);},Window_PartyActive[_0x2bfa('0xa9')][_0x2bfa('0x1ae')]=function(_0xcdd1ae){const _0x26b7a4=this[_0x2bfa('0x14e')](_0xcdd1ae),_0x448978=this[_0x2bfa('0x77')](_0xcdd1ae),_0x188c4e=VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x13e')],_0x5575ab=_0x448978['x']+Math[_0x2bfa('0x59')](_0x448978[_0x2bfa('0xb9')]/0x2)+_0x188c4e[_0x2bfa('0x182')],_0x9c6f23=_0x448978['y']+_0x448978[_0x2bfa('0x1c1')]-this[_0x2bfa('0x1df')]()-_0x188c4e[_0x2bfa('0x147')];this['drawActorCharacter'](_0x26b7a4,_0x5575ab,_0x9c6f23);},Window_PartyActive[_0x2bfa('0xa9')][_0x2bfa('0x3c')]=function(_0x1c15ad){const _0x537290=this[_0x2bfa('0x14e')](_0x1c15ad),_0x302309=_0x537290[_0x2bfa('0x2c')](),_0x22af7b=this[_0x2bfa('0x77')](_0x1c15ad),_0x2ade2b=VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x13e')],_0x5804b3=_0x22af7b['x']+Math['round'](_0x22af7b['width']/0x2)+_0x2ade2b['ActiveBattlerOffsetX'],_0x45ecc4=_0x22af7b['y']+_0x22af7b[_0x2bfa('0x1c1')]-this[_0x2bfa('0x1df')]()-_0x2ade2b[_0x2bfa('0xd6')];this[_0x2bfa('0xa4')](_0x302309,_0x5804b3,_0x45ecc4);},Window_PartyActive[_0x2bfa('0xa9')][_0x2bfa('0x12d')]=function(_0x1e21d0,_0x1149d5,_0x37dcf6,_0x40815d){const _0x30faba=ColorManager[_0x2bfa('0xda')](),_0x1836f9=ColorManager[_0x2bfa('0x18e')](),_0x5355c3=_0x37dcf6/0x2,_0x12d6f2=this['lineHeight']();while(_0x40815d--){this[_0x2bfa('0x151')][_0x2bfa('0x16e')](_0x1e21d0,_0x1149d5,_0x5355c3,_0x12d6f2,_0x1836f9,_0x30faba),this[_0x2bfa('0x151')][_0x2bfa('0x16e')](_0x1e21d0+_0x5355c3,_0x1149d5,_0x5355c3,_0x12d6f2,_0x30faba,_0x1836f9);}},Window_PartyActive[_0x2bfa('0xa9')][_0x2bfa('0x64')]=function(_0x2c7583,_0x587f65,_0x465893,_0xc6bb1c){_0xc6bb1c=_0xc6bb1c||0xa8,this[_0x2bfa('0x16d')](ColorManager[_0x2bfa('0xeb')](_0x2c7583)),this[_0x2bfa('0x11d')](_0x2c7583[_0x2bfa('0x18')](),_0x587f65,_0x465893,_0xc6bb1c,_0x2bfa('0x6d'));},Window_PartyActive[_0x2bfa('0xa9')][_0x2bfa('0x15c')]=function(_0x149f6e){this[_0x2bfa('0x5d')]=_0x149f6e,this[_0x2bfa('0x103')]();},Window_PartyActive[_0x2bfa('0xa9')][_0x2bfa('0x103')]=function(){if(this[_0x2bfa('0x5d')])this[_0x2bfa('0x5d')][_0x2bfa('0xdd')](this['actor'](this['index']()));};function Window_PartyReserve(){this[_0x2bfa('0x81')](...arguments);}Window_PartyReserve[_0x2bfa('0xa9')]=Object[_0x2bfa('0xdc')](Window_StatusBase[_0x2bfa('0xa9')]),Window_PartyReserve[_0x2bfa('0xa9')][_0x2bfa('0xd3')]=Window_PartyReserve,Window_PartyReserve[_0x2bfa('0x9f')]=VisuMZ[_0x2bfa('0x177')]['Settings']['Window'][_0x2bfa('0x5e')],Window_PartyReserve[_0x2bfa('0xc8')]=VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x13e')]['ReserveItemThickness'],Window_PartyReserve[_0x2bfa('0xa9')]['initialize']=function(_0x31bb19){Window_StatusBase[_0x2bfa('0xa9')][_0x2bfa('0x81')][_0x2bfa('0x13d')](this,_0x31bb19),this[_0x2bfa('0x1af')]=0x0,this[_0x2bfa('0x74')]();},Window_PartyReserve[_0x2bfa('0xa9')][_0x2bfa('0x9')]=function(){return VisuMZ['PartySystem'][_0x2bfa('0x176')][_0x2bfa('0x13e')][_0x2bfa('0x117')]||0x1;},Window_PartyReserve[_0x2bfa('0xa9')][_0x2bfa('0x89')]=function(){return this[_0x2bfa('0x1df')]()*Window_PartyReserve[_0x2bfa('0xc8')]+0x6;},Window_PartyReserve[_0x2bfa('0xa9')][_0x2bfa('0x100')]=function(){return VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')]['General']['AddRemoveCmd'];},Window_PartyReserve['prototype']['maxItems']=function(){let _0x2f5197=$gameParty[_0x2bfa('0x1ac')]()[_0x2bfa('0x29')];if(this[_0x2bfa('0x100')]())_0x2f5197++;return _0x2f5197;},Window_PartyReserve['prototype'][_0x2bfa('0x14e')]=function(_0x585b68){return $gameParty[_0x2bfa('0x1ac')]()[_0x585b68];},Window_PartyReserve[_0x2bfa('0xa9')][_0x2bfa('0x125')]=function(){return this[_0x2bfa('0x14e')](this['index']());},Window_PartyReserve['prototype']['playOkSound']=function(){SoundManager[_0x2bfa('0x6c')]();},Window_PartyReserve[_0x2bfa('0xa9')][_0x2bfa('0x136')]=function(){const _0x508a89=this[_0x2bfa('0x14e')](this[_0x2bfa('0x79')]());return _0x508a89?_0x508a89[_0x2bfa('0x16c')]():!![];},Window_PartyReserve[_0x2bfa('0xa9')][_0x2bfa('0x73')]=function(){Window_StatusBase[_0x2bfa('0xa9')][_0x2bfa('0x73')][_0x2bfa('0x13d')](this),this[_0x2bfa('0xa2')]();},Window_PartyReserve[_0x2bfa('0xa9')][_0x2bfa('0x2f')]=function(_0x393c3c){if(this[_0x2bfa('0x79')]()<=0x0)this[_0x2bfa('0x4c')]();else{if(_0x2bfa('0x12a')===_0x2bfa('0x165')){function _0x7d4b50(){if(this[_0x2bfa('0xb2')]===_0x17e6a1)this['clearPartyBattleCommandCooldown']();this[_0x2bfa('0xb2')]=_0x5e292d;}}else Window_StatusBase[_0x2bfa('0xa9')]['cursorUp'][_0x2bfa('0x13d')](this,_0x393c3c);}},Window_PartyReserve[_0x2bfa('0xa9')][_0x2bfa('0x7a')]=function(){const _0x40876f=this[_0x2bfa('0x79')](),_0x3e71e4=_0x40876f+0x1>=this[_0x2bfa('0x1a4')]()-0x1?0x0:_0x40876f+0x1;this[_0x2bfa('0x17')](_0x40876f,_0x3e71e4);},Window_PartyReserve[_0x2bfa('0xa9')][_0x2bfa('0x111')]=function(){const _0x15c1d9=this[_0x2bfa('0x79')](),_0x20d071=_0x15c1d9-0x1<0x0?this[_0x2bfa('0x1a4')]()-0x2:_0x15c1d9-0x1;this[_0x2bfa('0x17')](_0x15c1d9,_0x20d071);},Window_PartyReserve[_0x2bfa('0xa9')][_0x2bfa('0x17')]=function(_0x529917,_0x2c2a03){const _0x3e2222=this[_0x2bfa('0x14e')](_0x529917),_0x3e7c66=this[_0x2bfa('0x14e')](_0x2c2a03);if(!_0x3e2222?.[_0x2bfa('0x16c')]()||!_0x3e7c66?.[_0x2bfa('0x16c')]())return;else{if(!_0x3e2222||!_0x3e7c66)return;}const _0x57c1f2=$gameParty[_0x2bfa('0x19f')],_0xac8b03=_0x57c1f2[_0x2bfa('0xad')](_0x3e2222['actorId']()),_0xfddf83=_0x57c1f2[_0x2bfa('0xad')](_0x3e7c66[_0x2bfa('0x15b')]());_0x57c1f2[_0xac8b03]=_0x3e7c66?_0x3e7c66[_0x2bfa('0x15b')]():0x0,_0x57c1f2[_0xfddf83]=_0x3e2222?_0x3e2222[_0x2bfa('0x15b')]():0x0,this[_0x2bfa('0x74')](),this[_0x2bfa('0x24')](),this[_0x2bfa('0x179')](_0x2c2a03);},Window_PartyReserve[_0x2bfa('0xa9')]['checkShiftSortShortcut']=function(){if(!this[_0x2bfa('0x124')]())return;if(Input[_0x2bfa('0x17d')](_0x2bfa('0x53'))){if('OFrMg'!==_0x2bfa('0x138'))this[_0x2bfa('0xc4')]();else{function _0x18ae58(){this[_0x2bfa('0xb5')]();if(!this[_0x2bfa('0xaa')][_0x2bfa('0x143')](_0x3661c0))return;if(_0x29048f<=0x0)return;const _0x499756=this['_battleMembers']['indexOf'](_0x74c34b);this[_0x2bfa('0xaa')][_0x499756]=0x0,this['_actors']['remove'](_0x441b13),this[_0x2bfa('0x19f')]['push'](_0x30159b),this['partyChangeRefresh']();}}}},Window_PartyReserve[_0x2bfa('0xa9')]['processShiftSortShortcut']=function(){SoundManager[_0x2bfa('0x6c')](),$gameParty[_0x2bfa('0x66')](),this['smoothSelect'](0x0),SceneManager[_0x2bfa('0x1c3')][_0x2bfa('0x11a')]();},Window_PartyReserve[_0x2bfa('0xa9')][_0x2bfa('0x124')]=function(){return this[_0x2bfa('0xdf')];},Window_PartyReserve['prototype']['pendingIndex']=function(){const _0xfd0023=this[_0x2bfa('0x125')]();return _0xfd0023?_0xfd0023[_0x2bfa('0x79')]():-0x1;},Window_PartyReserve[_0x2bfa('0xa9')][_0x2bfa('0x13f')]=function(_0x2ce9f1){Window_StatusBase[_0x2bfa('0xa9')][_0x2bfa('0x13f')][_0x2bfa('0x13d')](this,_0x2ce9f1);if(_0x2ce9f1>=0x0)this[_0x2bfa('0x1af')]=_0x2ce9f1;},Window_PartyReserve['prototype'][_0x2bfa('0xfc')]=function(){this[_0x2bfa('0x1af')]=Math[_0x2bfa('0x12f')](this[_0x2bfa('0x1af')],this[_0x2bfa('0x1a4')]()-0x1),this[_0x2bfa('0x179')](this[_0x2bfa('0x1af')]),this[_0x2bfa('0xd7')](!![]),this['cursorVisible']=!![];},Window_PartyReserve[_0x2bfa('0xa9')][_0x2bfa('0xc7')]=function(_0xbf0685){const _0x45d667=this['actor'](_0xbf0685);if(!_0x45d667)return this['drawRemoveCommand'](_0xbf0685);const _0x17812f=this['itemLineRect'](_0xbf0685);this['drawItemImage'](_0xbf0685);const _0x470b26=0xa8,_0x2d1801=Window_PartyReserve[_0x2bfa('0xc8')]===0x1,_0x54ce63=ImageManager[_0x2bfa('0x126')]*(_0x2d1801?0x2:0x1),_0x4a8bd8=this[_0x2bfa('0x3a')]()+this[_0x2bfa('0x148')](),_0x5a1fce=_0x17812f[_0x2bfa('0xb9')]-_0x470b26,_0x2ecb81=_0x17812f['x']+_0x54ce63+Math[_0x2bfa('0x12f')](_0x4a8bd8,_0x5a1fce),_0x1bcb29=_0x2d1801?![]:!![];this[_0x2bfa('0x1a2')](_0x45d667[_0x2bfa('0x16c')]()),this[_0x2bfa('0x19d')](_0x45d667,_0x17812f['x'],_0x17812f['y'],_0x1bcb29),this[_0x2bfa('0x64')](_0x45d667,_0x2ecb81,_0x17812f['y'],_0x470b26),this[_0x2bfa('0x1a2')](!![]);},Window_PartyReserve['prototype'][_0x2bfa('0x3a')]=function(){const _0x3048f0=VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x13e')];switch(Window_PartyReserve[_0x2bfa('0x9f')][_0x2bfa('0xe2')]()[_0x2bfa('0xc1')]()){case'face':return ImageManager[_0x2bfa('0x157')];case _0x2bfa('0x25'):return _0x3048f0[_0x2bfa('0x41')]*0x2;case _0x2bfa('0x1c6'):return _0x3048f0[_0x2bfa('0x186')]*0x2;};},Window_PartyReserve[_0x2bfa('0xa9')][_0x2bfa('0xef')]=function(_0x33a59d){const _0x1e62cd=this[_0x2bfa('0x14f')](_0x33a59d);this[_0x2bfa('0x1a2')](!![]);const _0x2f9251=TextManager['removePartyMember'];this[_0x2bfa('0x11d')](_0x2f9251,_0x1e62cd['x'],_0x1e62cd['y'],_0x1e62cd['width'],'center');},Window_PartyReserve[_0x2bfa('0xa9')][_0x2bfa('0x173')]=function(_0x385ed0){switch(Window_PartyReserve[_0x2bfa('0x9f')][_0x2bfa('0xe2')]()[_0x2bfa('0xc1')]()){case _0x2bfa('0xb6'):this[_0x2bfa('0x68')](_0x385ed0);break;case _0x2bfa('0x25'):this[_0x2bfa('0x1ae')](_0x385ed0);break;case _0x2bfa('0x1c6'):Imported['VisuMZ_1_MainMenuCore']&&this['drawItemImageSvActor'](_0x385ed0);break;};},Window_PartyReserve[_0x2bfa('0xa9')][_0x2bfa('0x68')]=function(_0x3d9aca){const _0x24885c=this[_0x2bfa('0x14e')](_0x3d9aca),_0x3a9ceb=this['itemRect'](_0x3d9aca),_0x1f0543=Window_PartyReserve[_0x2bfa('0xc8')]===0x1;_0x3a9ceb['x']+=ImageManager[_0x2bfa('0x126')]*(_0x1f0543?0x2:0x1);const _0x33d7cd=ImageManager[_0x2bfa('0x157')],_0x2e9e5f=_0x3a9ceb[_0x2bfa('0x1c1')]-0x2;this['changePaintOpacity'](_0x24885c[_0x2bfa('0x16c')]()),this[_0x2bfa('0x3b')](_0x24885c,_0x3a9ceb['x']+0x1,_0x3a9ceb['y']+0x1,_0x33d7cd,_0x2e9e5f),this[_0x2bfa('0x1a2')](!![]);},Window_PartyReserve[_0x2bfa('0xa9')][_0x2bfa('0x1ae')]=function(_0x4a2ce7){const _0x39602f=this[_0x2bfa('0x14e')](_0x4a2ce7),_0x224de5=this[_0x2bfa('0x77')](_0x4a2ce7),_0x4de16f=Window_PartyReserve['_rowThickness']===0x1;_0x224de5['x']+=ImageManager[_0x2bfa('0x126')]*(_0x4de16f?0x2:0x1);const _0x115213=VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x13e')],_0x39d3ca=_0x224de5['x']+_0x115213['ReserveSpriteOffsetX']+this['itemPadding'](),_0x5ec457=_0x224de5['y']+_0x224de5['height']-_0x115213[_0x2bfa('0x16f')];this[_0x2bfa('0xa5')](_0x39602f,_0x39d3ca,_0x5ec457);},Window_PartyReserve[_0x2bfa('0xa9')]['drawItemImageSvActor']=function(_0x1ff29f){const _0xa2f6fc=this[_0x2bfa('0x14e')](_0x1ff29f),_0x53081e=_0xa2f6fc[_0x2bfa('0x2c')](),_0x4a816a=this[_0x2bfa('0x77')](_0x1ff29f),_0x3f9892=Window_PartyReserve[_0x2bfa('0xc8')]===0x1;_0x4a816a['x']+=ImageManager['iconWidth']*(_0x3f9892?0x2:0x1);const _0x1b01ca=VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x13e')],_0x3d310b=_0x4a816a['x']+_0x1b01ca[_0x2bfa('0x186')]+this[_0x2bfa('0x148')](),_0x5d284d=_0x4a816a['y']+_0x4a816a['height']-_0x1b01ca[_0x2bfa('0x13b')];this[_0x2bfa('0xa4')](_0x53081e,_0x3d310b,_0x5d284d);},Window_PartyReserve[_0x2bfa('0xa9')][_0x2bfa('0x15c')]=function(_0x41be08){this[_0x2bfa('0x5d')]=_0x41be08,this['callUpdateHelp']();},Window_PartyReserve[_0x2bfa('0xa9')][_0x2bfa('0x103')]=function(){if(this[_0x2bfa('0x5d')]){if(_0x2bfa('0x187')==='IFBYf')this[_0x2bfa('0x5d')]['setActor'](this['actor'](this[_0x2bfa('0x79')]()));else{function _0x32c2a4(){_0x4b5fbd['playEquip'](),_0x49b7bd[_0x2bfa('0x66')](),this[_0x2bfa('0x179')](0x0),_0x802fed[_0x2bfa('0x1c3')]['refreshAllWindows']();}}}};function Window_PartyStatus(){this[_0x2bfa('0x81')](...arguments);}Window_PartyStatus[_0x2bfa('0xa9')]=Object[_0x2bfa('0xdc')](Window_StatusBase['prototype']),Window_PartyStatus['prototype'][_0x2bfa('0xd3')]=Window_PartyStatus,Window_PartyStatus['prototype'][_0x2bfa('0x81')]=function(_0x125204){this[_0x2bfa('0x69')]=null,Window_StatusBase['prototype'][_0x2bfa('0x81')][_0x2bfa('0x13d')](this,_0x125204);},Window_PartyStatus[_0x2bfa('0xa9')][_0x2bfa('0xbf')]=function(_0x1df565,_0x14231d,_0x1701bb,_0x591df1,_0x1d39af){if(VisuMZ[_0x2bfa('0x177')]['Settings'][_0x2bfa('0x87')]['DrawBackRect']===![])return;_0x1d39af=Math[_0x2bfa('0x129')](_0x1d39af||0x1,0x1);while(_0x1d39af--){if(_0x2bfa('0x2e')==='MvekG'){function _0x2e8bc4(){_0x82bbb6[_0x2bfa('0x177')][_0x2bfa('0x164')][_0x2bfa('0x13d')](this,_0x1240c2);if(this[_0x2bfa('0x6b')]())this[_0x2bfa('0x1b')]();}}else{_0x591df1=_0x591df1||this[_0x2bfa('0x1df')](),this[_0x2bfa('0x151')]['paintOpacity']=0xa0;const _0x3811c8=ColorManager[_0x2bfa('0x1a8')]();this[_0x2bfa('0x151')][_0x2bfa('0x146')](_0x1df565+0x1,_0x14231d+0x1,_0x1701bb-0x2,_0x591df1-0x2,_0x3811c8),this[_0x2bfa('0x151')][_0x2bfa('0x90')]=0xff;}}},ColorManager[_0x2bfa('0x1a8')]=function(){const _0x30cfc7=VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x87')];let _0x4d970a=_0x30cfc7[_0x2bfa('0x166')]!==undefined?_0x30cfc7[_0x2bfa('0x166')]:0x13;return ColorManager[_0x2bfa('0x1cd')](_0x4d970a);},Window_PartyStatus['prototype'][_0x2bfa('0xdd')]=function(_0x199e7e){if(this[_0x2bfa('0x69')]===_0x199e7e)return;this[_0x2bfa('0x69')]=_0x199e7e;if(_0x199e7e){const _0x20aabd=ImageManager[_0x2bfa('0x7')](_0x199e7e['faceName']());_0x20aabd['addLoadListener'](this[_0x2bfa('0x74')][_0x2bfa('0xed')](this));}else{if(_0x2bfa('0xb1')!==_0x2bfa('0x9e'))this[_0x2bfa('0x74')]();else{function _0x314784(){if(this[_0x2bfa('0x116')]===_0x23fa78)this[_0x2bfa('0x1b')]();if(!this[_0x2bfa('0x16c')]())return![];if(this['isRequiredInParty']())return![];return this[_0x2bfa('0x116')]<=0x0;}}}},Window_PartyStatus[_0x2bfa('0xa9')]['refresh']=function(){Window_StatusBase[_0x2bfa('0xa9')][_0x2bfa('0x74')][_0x2bfa('0x13d')](this),this[_0x2bfa('0x151')][_0x2bfa('0x1db')](),this[_0x2bfa('0x1be')](),VisuMZ[_0x2bfa('0x177')]['Settings'][_0x2bfa('0x13e')]['StatusWindowDraw'][_0x2bfa('0x13d')](this);},Window_PartyStatus[_0x2bfa('0xa9')][_0x2bfa('0xa3')]=function(){if(!this[_0x2bfa('0x69')]){this['drawItemDarkRect'](0x0,0x0,this[_0x2bfa('0x102')],this[_0x2bfa('0xd2')]);const _0x3e340f=Math[_0x2bfa('0x59')]((this[_0x2bfa('0xd2')]-this['lineHeight']())/0x2);this[_0x2bfa('0x16d')](ColorManager['systemColor']()),this['drawText'](TextManager[_0x2bfa('0xde')],0x0,_0x3e340f,this[_0x2bfa('0x102')],_0x2bfa('0x6d'));return;}this['drawActorFace'](this[_0x2bfa('0x69')],0x1,0x0,ImageManager[_0x2bfa('0x157')],ImageManager[_0x2bfa('0x10c')]),this[_0x2bfa('0x18d')](this[_0x2bfa('0x69')],ImageManager[_0x2bfa('0x157')]+0x24,0x0);const _0x259d04=this[_0x2bfa('0x1df')](),_0x45629e=this[_0x2bfa('0x65')](),_0x592464=Math[_0x2bfa('0x59')](this[_0x2bfa('0x102')]/0x2),_0x4bbaa2=Math[_0x2bfa('0x50')](_0x45629e[_0x2bfa('0x29')]/0x2)*_0x259d04,_0x51b46f=0x0;let _0x1047c1=0x0,_0x533304=ImageManager[_0x2bfa('0x10c')]+_0x259d04/0x2;for(const _0x34f9d0 of _0x45629e){if(_0x2bfa('0x1a3')==='SApTQ'){this[_0x2bfa('0xbf')](_0x1047c1,_0x533304,_0x592464,_0x259d04),this[_0x2bfa('0x1d5')](_0x34f9d0,_0x1047c1,_0x533304,_0x592464),this[_0x2bfa('0x67')](_0x34f9d0,_0x1047c1,_0x533304,_0x592464);if(_0x1047c1===_0x51b46f){if(_0x2bfa('0x16')===_0x2bfa('0x18c')){function _0x28bcc0(){this[_0x2bfa('0xb5')]();if(this[_0x2bfa('0xaa')][_0x2bfa('0x143')](_0x536348))return;if(!this[_0x2bfa('0xaa')][_0x2bfa('0x143')](0x0))return;this[_0x2bfa('0xaa')][_0x24fed4]=_0x32b587,this[_0x2bfa('0x13')]();}}else _0x1047c1+=_0x592464;}else _0x1047c1=_0x51b46f,_0x533304+=_0x259d04;}else{function _0x1cd067(){const _0x37da63=this[_0x2bfa('0x14e')](_0x16ad32),_0x552751=_0x37da63[_0x2bfa('0x2c')](),_0x44ad7b=this[_0x2bfa('0x77')](_0x287eb5),_0x99763a=_0x24355f[_0x2bfa('0xc8')]===0x1;_0x44ad7b['x']+=_0x40a00d[_0x2bfa('0x126')]*(_0x99763a?0x2:0x1);const _0x30dbe4=_0x10b203[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x13e')],_0x1ae5fc=_0x44ad7b['x']+_0x30dbe4[_0x2bfa('0x186')]+this[_0x2bfa('0x148')](),_0x39fc26=_0x44ad7b['y']+_0x44ad7b['height']-_0x30dbe4[_0x2bfa('0x13b')];this[_0x2bfa('0xa4')](_0x552751,_0x1ae5fc,_0x39fc26);}}}},Window_PartyStatus[_0x2bfa('0xa9')][_0x2bfa('0x65')]=function(){if(Imported[_0x2bfa('0x4d')])return VisuMZ[_0x2bfa('0xf3')][_0x2bfa('0x176')][_0x2bfa('0x1b2')][_0x2bfa('0xec')];else{if(_0x2bfa('0x95')!==_0x2bfa('0x2a'))return[0x2,0x3,0x4,0x5,0x6,0x7];else{function _0x1fb823(){if(this[_0x2bfa('0xb2')]===_0x39a5d1)this[_0x2bfa('0x163')]();this['_partySystemBattleCommandCooldown']--;}}}},Window_PartyStatus[_0x2bfa('0xa9')][_0x2bfa('0x1d5')]=function(_0x594935,_0x3fedc9,_0x213493,_0x5c9431){const _0x3771e7=this[_0x2bfa('0x148')]();_0x5c9431-=_0x3771e7*0x2;if(Imported[_0x2bfa('0x4d')]){if(_0x2bfa('0x7c')===_0x2bfa('0x1dd')){function _0x2d3579(){return _0x13a7d6[_0x2bfa('0x1ac')]()[_0x262ce0];}}else this[_0x2bfa('0xc')](_0x3fedc9+_0x3771e7,_0x213493,_0x5c9431,_0x594935,![]);}else{if(_0x2bfa('0x86')!==_0x2bfa('0x86')){function _0x2b94b5(){this[_0x2bfa('0xb0')][_0x2bfa('0x9c')]();}}else{const _0x21fa9c=TextManager[_0x2bfa('0x156')](_0x594935);this[_0x2bfa('0x16d')](ColorManager[_0x2bfa('0x121')]()),this['drawText'](_0x21fa9c,_0x3fedc9+_0x3771e7,_0x213493,_0x5c9431);}}},Window_PartyStatus[_0x2bfa('0xa9')][_0x2bfa('0x67')]=function(_0x3d07b0,_0x1dbccf,_0x3b1963,_0x2a03b7){this[_0x2bfa('0x1be')]();const _0x118c5b=this['itemPadding'](),_0x4cd308=this['getParamValue'](_0x3d07b0);this['drawText'](_0x4cd308,_0x1dbccf+_0x118c5b,_0x3b1963,_0x2a03b7-_0x118c5b*0x2,'right');},Window_PartyStatus['prototype'][_0x2bfa('0xb8')]=function(_0x2ddbfb){const _0x44be4b=this['_actor'];return Imported[_0x2bfa('0x4d')]?_0x44be4b['paramValueByName'](_0x2ddbfb,!![]):_0x44be4b[_0x2bfa('0x156')](_0x2ddbfb);};function Window_PartyBattleSwitch(){this['initialize'](...arguments);}Window_PartyBattleSwitch['prototype']=Object[_0x2bfa('0xdc')](Window_StatusBase[_0x2bfa('0xa9')]),Window_PartyBattleSwitch[_0x2bfa('0xa9')][_0x2bfa('0xd3')]=Window_PartyBattleSwitch,Window_PartyBattleSwitch[_0x2bfa('0xa9')][_0x2bfa('0x81')]=function(_0xa9f5b3){Window_StatusBase[_0x2bfa('0xa9')][_0x2bfa('0x81')][_0x2bfa('0x13d')](this,_0xa9f5b3),this[_0x2bfa('0x9d')](VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x13e')][_0x2bfa('0x1e4')]),this[_0x2bfa('0x139')]=0x0;},Window_PartyBattleSwitch[_0x2bfa('0xa9')][_0x2bfa('0x17f')]=function(){for(const _0x5077e5 of $gameParty[_0x2bfa('0xc5')]()){ImageManager[_0x2bfa('0x7')](_0x5077e5[_0x2bfa('0x23')]());}},Window_PartyBattleSwitch[_0x2bfa('0xa9')][_0x2bfa('0x9')]=function(){return 0x1;},Window_PartyBattleSwitch['prototype']['actor']=function(_0x569f4e){return $gameParty['reserveMembers']()[_0x569f4e];},Window_PartyBattleSwitch['prototype'][_0x2bfa('0x125')]=function(){return this[_0x2bfa('0x14e')](this['index']());},Window_PartyBattleSwitch['prototype'][_0x2bfa('0x89')]=function(){return this[_0x2bfa('0x1df')]()*0x2+0x8;},Window_PartyBattleSwitch[_0x2bfa('0xa9')][_0x2bfa('0x1a4')]=function(){return $gameParty[_0x2bfa('0x1ac')]()[_0x2bfa('0x29')];},Window_PartyBattleSwitch[_0x2bfa('0xa9')][_0x2bfa('0x9c')]=function(){Window_StatusBase[_0x2bfa('0xa9')]['activate'][_0x2bfa('0x13d')](this),this['open'](),this[_0x2bfa('0x74')](),this[_0x2bfa('0x179')](0x0);},Window_PartyBattleSwitch[_0x2bfa('0xa9')][_0x2bfa('0x8c')]=function(){Window_StatusBase[_0x2bfa('0xa9')]['deactivate']['call'](this),this[_0x2bfa('0xbd')]();},Window_PartyBattleSwitch[_0x2bfa('0xa9')][_0x2bfa('0x136')]=function(){return this[_0x2bfa('0xcd')](this[_0x2bfa('0x125')]());},Window_PartyBattleSwitch[_0x2bfa('0xa9')][_0x2bfa('0xcd')]=function(_0x9bcbf2){if(!_0x9bcbf2)return![];return _0x9bcbf2[_0x2bfa('0x16c')]()&&_0x9bcbf2[_0x2bfa('0x128')]();},Window_PartyBattleSwitch[_0x2bfa('0xa9')][_0x2bfa('0xc7')]=function(_0x8675f3){const _0x1b5cb4=this['actor'](_0x8675f3);if(!_0x1b5cb4)return;const _0x3fcbd4=ImageManager[_0x2bfa('0x7')](_0x1b5cb4[_0x2bfa('0x23')]());_0x3fcbd4[_0x2bfa('0x15a')](this[_0x2bfa('0xcc')][_0x2bfa('0xed')](this,_0x8675f3));},Window_PartyBattleSwitch[_0x2bfa('0xa9')][_0x2bfa('0xcc')]=function(_0x37ab63){this[_0x2bfa('0x173')](_0x37ab63),this['drawItemStatus'](_0x37ab63);},Window_PartyBattleSwitch[_0x2bfa('0xa9')][_0x2bfa('0x173')]=function(_0x23f031){const _0x22de01=this[_0x2bfa('0x14e')](_0x23f031),_0x1eb6ce=this['itemRect'](_0x23f031);this[_0x2bfa('0x1a2')](this['isEnabled'](_0x22de01)),this[_0x2bfa('0x3b')](_0x22de01,_0x1eb6ce['x']+0x1,_0x1eb6ce['y']+0x1,ImageManager[_0x2bfa('0x157')],_0x1eb6ce['height']-0x2),this[_0x2bfa('0x1a2')](!![]);},Window_PartyBattleSwitch[_0x2bfa('0xa9')][_0x2bfa('0x42')]=function(_0x1d9ca0){const _0x1137a6=this[_0x2bfa('0x14e')](_0x1d9ca0),_0x12418d=this[_0x2bfa('0x1b4')](_0x1d9ca0),_0x39d21c=_0x12418d['x']+ImageManager[_0x2bfa('0x157')]+0x24,_0x44fd08=_0x39d21c+0xb4;this[_0x2bfa('0x1a2')](this['isEnabled'](_0x1137a6)),this[_0x2bfa('0x64')](_0x1137a6,_0x39d21c,_0x12418d['y']),this[_0x2bfa('0xab')](_0x1137a6,_0x39d21c,_0x12418d['y']+this[_0x2bfa('0x1df')]()),this[_0x2bfa('0xf0')](_0x1137a6,_0x44fd08,_0x12418d['y']),this[_0x2bfa('0x1a2')](!![]);};Imported[_0x2bfa('0xe1')]&&(ImageManager[_0x2bfa('0x1cc')]=0x4b,TextManager[_0x2bfa('0x21')]=VisuMZ[_0x2bfa('0x177')]['Settings']['Vocab'][_0x2bfa('0x1ad')],TextManager['battlePartyChangeCmdHelp']=VisuMZ['PartySystem'][_0x2bfa('0x176')][_0x2bfa('0x75')][_0x2bfa('0x1ba')],TextManager[_0x2bfa('0x193')]=VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x75')]['BattleSwitchOut'],TextManager['battlePartySwitchCmdHelp']=VisuMZ[_0x2bfa('0x177')]['Settings']['Vocab']['BattleHelpSwitch'],TextManager[_0x2bfa('0x161')]=VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x75')][_0x2bfa('0x11c')],VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x1e5')]=SceneManager[_0x2bfa('0x132')],SceneManager['isPreviousSceneBattleTransitionable']=function(){if(SceneManager[_0x2bfa('0x4e')](Scene_Party))return!![];return VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x1e5')][_0x2bfa('0x13d')](this);},VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x12c')]=SceneManager[_0x2bfa('0xe6')],SceneManager[_0x2bfa('0xe6')]=function(){if(SceneManager[_0x2bfa('0x17b')](Scene_Party))return!![];return VisuMZ['PartySystem'][_0x2bfa('0x12c')][_0x2bfa('0x13d')](this);},VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x1d1')]=Scene_Battle['prototype'][_0x2bfa('0x1a')],Scene_Battle[_0x2bfa('0xa9')][_0x2bfa('0x1a')]=function(){VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x1d1')][_0x2bfa('0x13d')](this),this[_0x2bfa('0x198')]();},Scene_Battle[_0x2bfa('0xa9')][_0x2bfa('0x198')]=function(){const _0x48fb3c=this[_0x2bfa('0x1a9')]();this['_partyMemberSwitchWindow']=new Window_PartyBattleSwitch(_0x48fb3c),this[_0x2bfa('0x1b0')](this[_0x2bfa('0xb0')]),this[_0x2bfa('0xb0')][_0x2bfa('0x3')]('ok',this['onPartySwitchOk'][_0x2bfa('0xed')](this)),this[_0x2bfa('0xb0')][_0x2bfa('0x3')](_0x2bfa('0x72'),this[_0x2bfa('0x19')][_0x2bfa('0xed')](this));},Scene_Battle['prototype'][_0x2bfa('0x1a9')]=function(){const _0x5d8915=this[_0x2bfa('0xca')]();if(_0x5d8915===_0x2bfa('0x47')){if(_0x2bfa('0x174')===_0x2bfa('0x174'))return this[_0x2bfa('0x114')]();else{function _0x449751(){return'';}}}else return this[_0x2bfa('0x104')]();},Scene_Battle['prototype'][_0x2bfa('0x104')]=function(){return VisuMZ['PartySystem'][_0x2bfa('0x176')][_0x2bfa('0x13e')]['BattleSwitchWindowRect'][_0x2bfa('0x13d')](this);},Scene_Battle[_0x2bfa('0xa9')][_0x2bfa('0x114')]=function(){const _0x5b1444=this[_0x2bfa('0xa0')](),_0x502f55=$gameSystem[_0x2bfa('0x1cb')]()*0x2;return _0x5b1444[_0x2bfa('0xb9')]=0x204+_0x502f55,_0x5b1444;},VisuMZ[_0x2bfa('0x177')]['Scene_Battle_isAnyInputWindowActive']=Scene_Battle[_0x2bfa('0xa9')][_0x2bfa('0x3d')],Scene_Battle[_0x2bfa('0xa9')][_0x2bfa('0x3d')]=function(){if(this[_0x2bfa('0xb0')]&&this[_0x2bfa('0xb0')]['active'])return!![];if(this[_0x2bfa('0x11f')])return!![];return VisuMZ[_0x2bfa('0x177')]['Scene_Battle_isAnyInputWindowActive']['call'](this);},VisuMZ[_0x2bfa('0x177')]['Scene_Battle_createPartyCommandWindowBattleCore']=Scene_Battle[_0x2bfa('0xa9')][_0x2bfa('0x19b')],Scene_Battle['prototype']['createPartyCommandWindowBattleCore']=function(){VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x12e')][_0x2bfa('0x13d')](this),this[_0x2bfa('0x7b')][_0x2bfa('0x3')](_0x2bfa('0x1ce'),this[_0x2bfa('0x15')][_0x2bfa('0xed')](this));},Scene_Battle[_0x2bfa('0xa9')][_0x2bfa('0x15')]=function(){if(this[_0x2bfa('0x8e')]()){if(_0x2bfa('0xe8')!==_0x2bfa('0xe8')){function _0xadc919(){return[0x2,0x3,0x4,0x5,0x6,0x7];}}else this[_0x2bfa('0x80')]=!![],this[_0x2bfa('0x61')][_0x2bfa('0x5f')](_0x2bfa('0x14d'),TextManager[_0x2bfa('0x161')][_0x2bfa('0xf')](TextManager[_0x2bfa('0x1ce')]));}else this[_0x2bfa('0x27')]();},Scene_Battle[_0x2bfa('0xa9')][_0x2bfa('0x8e')]=function(){return BattleManager['isActiveTpb']();},Scene_Battle['prototype'][_0x2bfa('0x27')]=function(){this['_callSceneParty']=![],this[_0x2bfa('0x6a')]['update'](),this[_0x2bfa('0x108')][_0x2bfa('0x14b')]=![],SceneManager[_0x2bfa('0x57')](),SceneManager[_0x2bfa('0x5f')](Scene_Party),$gameParty[_0x2bfa('0x130')]();},VisuMZ['PartySystem'][_0x2bfa('0x119')]=Scene_Battle['prototype']['updateBattleProcess'],Scene_Battle[_0x2bfa('0xa9')]['updateBattleProcess']=function(){VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x119')]['call'](this);if(this['_callSceneParty']&&!BattleManager[_0x2bfa('0x83')])this['callFormation']();},VisuMZ[_0x2bfa('0x177')][_0x2bfa('0xac')]=Scene_Battle[_0x2bfa('0xa9')][_0x2bfa('0x78')],Scene_Battle[_0x2bfa('0xa9')][_0x2bfa('0x78')]=function(){VisuMZ[_0x2bfa('0x177')][_0x2bfa('0xac')]['call'](this),this[_0x2bfa('0x19a')][_0x2bfa('0x3')](_0x2bfa('0x1ce'),this['commandPartyMemberSwitch'][_0x2bfa('0xed')](this));},Scene_Battle[_0x2bfa('0xa9')][_0x2bfa('0x17e')]=function(){this['_partyMemberSwitchWindow']['activate']();},Scene_Battle[_0x2bfa('0xa9')]['onPartySwitchOk']=function(){const _0x1453b6=this[_0x2bfa('0xb0')][_0x2bfa('0x125')]();if(_0x1453b6){if(_0x2bfa('0x10f')!==_0x2bfa('0x10f')){function _0xed1fd7(){_0x3d01a4[_0x2bfa('0xa9')]['initialize'][_0x2bfa('0x13d')](this,_0x19a8a8),this[_0x2bfa('0x44')](_0x49cfb3);}}else this[_0x2bfa('0xf1')](_0x1453b6);}else this[_0x2bfa('0xb0')]['deactivate'](),this['_actorCommandWindow'][_0x2bfa('0x9c')]();},Scene_Battle[_0x2bfa('0xa9')][_0x2bfa('0xf1')]=function(_0x4b0615){const _0x35617a=BattleManager['actor'](),_0xff9a5e=_0x35617a[_0x2bfa('0x82')]();this[_0x2bfa('0xb0')][_0x2bfa('0x8c')](),this[_0x2bfa('0x123')]()&&_0xff9a5e?(this[_0x2bfa('0x11f')]=!![],_0xff9a5e[_0x2bfa('0x4b')](_0x4b0615)):this[_0x2bfa('0xa7')](_0x4b0615);},Scene_Battle[_0x2bfa('0xa9')][_0x2bfa('0x123')]=function(){return VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x87')][_0x2bfa('0x1a7')];},Scene_Battle['prototype'][_0x2bfa('0xa7')]=function(_0x2b8cf0){this[_0x2bfa('0x11f')]=![];const _0xbb57ad=BattleManager[_0x2bfa('0x14e')](),_0x59b479=_0xbb57ad[_0x2bfa('0x82')]();$gameParty[_0x2bfa('0xaa')][_0xbb57ad[_0x2bfa('0x79')]()]=_0x2b8cf0[_0x2bfa('0x15b')](),BattleManager[_0x2bfa('0x1bb')]=_0x2b8cf0,_0x2b8cf0['applyBattlePartySwitchCooldown'](),_0x2b8cf0[_0x2bfa('0x1a1')](),_0x2b8cf0[_0x2bfa('0x11e')](),_0x59b479&&_0x59b479[_0x2bfa('0x48')](_0x2b8cf0),this[_0x2bfa('0x5d')]['refresh'](),this[_0x2bfa('0x19a')][_0x2bfa('0x144')](_0x2b8cf0),this[_0x2bfa('0x19a')][_0x2bfa('0x179')](0x0);},Scene_Battle[_0x2bfa('0xa9')]['onPartySwitchCancel']=function(){this[_0x2bfa('0xb0')][_0x2bfa('0x8c')](),this[_0x2bfa('0x19a')][_0x2bfa('0x9c')](),this[_0x2bfa('0x19a')][_0x2bfa('0x74')]();},Sprite_Actor[_0x2bfa('0x112')]=0xc,Sprite_Actor[_0x2bfa('0xa9')][_0x2bfa('0x4b')]=function(_0x2218a2){this[_0x2bfa('0xc2')]=_0x2218a2;const _0x5d0ae4=Sprite_Actor[_0x2bfa('0x112')];this['startMove'](0x12c,0x0,_0x5d0ae4),this[_0x2bfa('0x46')](0x0,_0x5d0ae4),this[_0x2bfa('0x112')]=_0x5d0ae4;},Sprite_Actor[_0x2bfa('0xa9')][_0x2bfa('0xae')]=function(_0x22b021){if(SceneManager[_0x2bfa('0xd4')]()){if(_0x2bfa('0x92')===_0x2bfa('0x92')){SceneManager[_0x2bfa('0x1c3')]['processPartySwitchMember'](_0x22b021);const _0x53f87e=Sprite_Actor['_partySwitchDuration'];this[_0x2bfa('0x18a')](),this['startOpacity'](0xff,_0x53f87e);}else{function _0x23f893(){if(_0x102199[_0x2bfa('0xb7')]())return![];return _0x4b8018[_0x2bfa('0x177')][_0x2bfa('0x192')][_0x2bfa('0x13d')](this);}}}this[_0x2bfa('0xc2')]=null;},VisuMZ['PartySystem']['Sprite_Actor_update']=Sprite_Actor['prototype'][_0x2bfa('0x26')],Sprite_Actor[_0x2bfa('0xa9')][_0x2bfa('0x26')]=function(){VisuMZ[_0x2bfa('0x177')]['Sprite_Actor_update'][_0x2bfa('0x13d')](this);if(this[_0x2bfa('0x112')])this['updatePartySwitch']();},Sprite_Actor[_0x2bfa('0xa9')][_0x2bfa('0x1d8')]=function(){this['_partySwitchDuration']=this['_partySwitchDuration']||0x0,this[_0x2bfa('0x112')]--;if(this[_0x2bfa('0x112')]<=0x0){if(_0x2bfa('0x98')===_0x2bfa('0x159')){function _0x30f838(){return _0x5163a8[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x87')][_0x2bfa('0x152')];}}else this['startSwitchInAnimation'](this[_0x2bfa('0xc2')]);}},Window_PartyCommand[_0x2bfa('0xa9')][_0x2bfa('0x4')]=function(){this[_0x2bfa('0x18b')]();},Window_PartyCommand[_0x2bfa('0xa9')]['addFormationCommand']=function(){if(!this['isFormationCommandAdded']())return;const _0x344ccb=this[_0x2bfa('0x113')](),_0x5e2f4a=ImageManager['battlePartyChangeIcon'],_0x1e6e14=_0x344ccb===_0x2bfa('0x199')?TextManager['battlePartyChangeCmd']:_0x2bfa('0x7e')[_0x2bfa('0xf')](_0x5e2f4a,TextManager[_0x2bfa('0x21')]),_0x3fe03f=this[_0x2bfa('0xe7')]();this['addCommand'](_0x1e6e14,'formation',_0x3fe03f);},Window_PartyCommand[_0x2bfa('0xa9')]['isFormationCommandAdded']=function(){return VisuMZ['PartySystem'][_0x2bfa('0x176')][_0x2bfa('0x87')][_0x2bfa('0x152')];},Window_PartyCommand[_0x2bfa('0xa9')]['isFormationCommandEnabled']=function(){if($gameParty[_0x2bfa('0xc5')]()[_0x2bfa('0x29')]<=0x1)return![];if(!$gameParty[_0x2bfa('0x10b')]())return![];return $gameSystem[_0x2bfa('0x10')]();},VisuMZ['PartySystem'][_0x2bfa('0x176')][_0x2bfa('0x106')]=Window_PartyCommand[_0x2bfa('0xa9')]['updateHelp'],Window_PartyCommand[_0x2bfa('0xa9')][_0x2bfa('0x17c')]=function(){const _0xc2b18f=this['currentSymbol']();switch(_0xc2b18f){case _0x2bfa('0x1ce'):this[_0x2bfa('0x2d')][_0x2bfa('0x44')](TextManager[_0x2bfa('0x1da')]);break;default:VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x106')][_0x2bfa('0x13d')](this);break;}},Window_ActorCommand[_0x2bfa('0xa9')][_0x2bfa('0x71')]=function(){if(!this['isPartyCommandAdded']())return;const _0x11d84e=this[_0x2bfa('0x113')](),_0x5b5439=ImageManager[_0x2bfa('0x1cc')],_0x1b9cc9=_0x11d84e===_0x2bfa('0x199')?TextManager['battlePartySwitchCmd']:_0x2bfa('0x7e')[_0x2bfa('0xf')](_0x5b5439,TextManager[_0x2bfa('0x21')]),_0x23b175=this[_0x2bfa('0x162')]();this[_0x2bfa('0x11b')](_0x1b9cc9,_0x2bfa('0x1ce'),_0x23b175);},Window_ActorCommand[_0x2bfa('0xa9')]['isPartyCommandAdded']=function(){if(!this[_0x2bfa('0x69')])return![];return VisuMZ[_0x2bfa('0x177')]['Settings'][_0x2bfa('0x87')]['ActorCmdWinAddParty'];},Window_ActorCommand['prototype'][_0x2bfa('0x162')]=function(){if($gameParty['allMembers']()[_0x2bfa('0x29')]<=0x1)return![];if(!this[_0x2bfa('0x69')])return![];if(!this[_0x2bfa('0x69')][_0x2bfa('0x10b')]())return![];return this[_0x2bfa('0x69')][_0x2bfa('0x16c')]();},VisuMZ[_0x2bfa('0x177')]['Settings']['Window_ActorCommand_updateHelp']=Window_ActorCommand[_0x2bfa('0xa9')][_0x2bfa('0x17c')],Window_ActorCommand['prototype'][_0x2bfa('0x17c')]=function(){const _0x3dbba9=this[_0x2bfa('0x34')]();switch(_0x3dbba9){case'formation':this['_helpWindow'][_0x2bfa('0x44')](TextManager[_0x2bfa('0x52')]);break;default:VisuMZ[_0x2bfa('0x177')][_0x2bfa('0x176')][_0x2bfa('0x197')]['call'](this);break;}});;