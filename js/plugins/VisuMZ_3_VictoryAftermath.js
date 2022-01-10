//=============================================================================
// VisuStella MZ - Victory Aftermath
// VisuMZ_3_VictoryAftermath.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_VictoryAftermath = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VictoryAftermath = VisuMZ.VictoryAftermath || {};
VisuMZ.VictoryAftermath.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.01] [VictoryAftermath]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Victory_Aftermath_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Victory Aftermath plugin consolidates the rewards granted upon finishing
 * a battle successfully into one screen (or more if there are level ups).
 * This helps reduce the amount of button presses needed to display similar
 * information by default. The level up screens will also display parameter
 * changes and new skills acquired in addition to victory quotes.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Consolidates EXP, Gold, and Items acquired through battle rewards into one
 *   battle screen.
 * * EXP gauges for currently active battle party will be displayed on the same
 *   screen to indicate progress.
 * * Upon leveling up, individual screens can be shown (optionally) to display
 *   parameter changes, new skills acquired, and level up quotes.
 * * Plugin Commands can be used to clear/add new quotes at any time.
 * * Plugin Commands can be used by bypass certain parts of the Victory
 *   Aftermath segments or the entire thing completely.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * - VisuMZ_1_BattleCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
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
 * VisuMZ_0_CoreEngine
 *
 * - The EXP gauge colors will match the color settings found in the Core
 * Engine's Plugin Parameters instead of defaulting to specific colors.
 *
 * - The continue message will display any changed input keys designated by
 * the Core Engine's Plugin Parameters.
 *
 * ---
 *
 * VisuMZ_1_MainMenuCore
 *
 * - Upon leveling up, the Menu Image will show up (optional) as a bust during
 * the quote segment.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 *
 * <Level Up Quotes>
 *  text
 *  text
 *  text
 *  text
 *  <New Quote>
 *  text
 *  text
 *  text
 *  text
 *  <New Quote>
 *  text
 *  text
 *  text
 *  text
 * </Level Up Quotes>
 *
 * - Used for: Actor Notetags
 * - Description
 * - Replace 'text' with the text you'd want the actor to say when leveling up.
 * - The <New Quote> tag is used between the <Level Up Quotes> notetags to
 *   separate quotes.
 * - If an actor has multiple quotes (due to the <New Quote> notetag), then a
 *   random quote will be selected upon level up.
 * - If this notetag is not found inside an actor's notebox, a random level up
 *   quote will be selected from the Plugin Parameters => Level Up => Quotes =>
 *   Level Up Quotes plugin parameter.
 *
 * ---
 *
 * <New Skill Quotes>
 *  text
 *  text
 *  text
 *  text
 *  <New Quote>
 *  text
 *  text
 *  text
 *  text
 *  <New Quote>
 *  text
 *  text
 *  text
 *  text
 * </New Skill Quotes>
 *
 * - Used for: Actor Notetags
 * - Description
 * - Replace 'text' with the text you'd want the actor to say when leveling up
 *   in addition to learning a new skill upon leveling up.
 * - The <New Quote> tag is used between the <New Skill Quotes> notetags to
 *   separate quotes.
 * - If an actor has multiple quotes (due to the <New Quote> notetag), then a
 *   random quote will be selected upon level up and learning a new skill.
 * - If this notetag is not found inside an actor's notebox, a random new skill
 *   quote will be selected from the Plugin Parameters => Level Up => Quotes =>
 *   New Skill Quotes plugin parameter.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Add Level Up Quotes
 * - Add new entries target actor's level up quotes.
 *
 *   Actor ID:
 *   - Select ID of target actor to add quotes for.
 *
 *   New Quotes:
 *   - Add new entries to actor's level up quotes.
 *   - Text codes allowed. %1 - Actor's Name
 *
 * ---
 *
 * Actor: Add New Skill Quotes
 * - Add new entries target actor's new skill quotes.
 *
 *   Actor ID:
 *   - Select ID of target actor to add quotes for.
 *
 *   New Quotes:
 *   - Add new entries to actor's new skill quotes.
 *   - Text codes allowed. %1 - Actor's Name
 *
 * ---
 *
 * Actor: Clear Level Up Quotes
 * - Clear target actor's level up quotes.
 *
 *   Actor ID:
 *   - Select ID of target actor to clear quotes for.
 *
 * ---
 *
 * Actor: Clear New Skill Quotes
 * - Clear target actor's new skill quotes.
 *
 *   Actor ID:
 *   - Select ID of target actor to clear quotes for.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Bypass Victory Motion
 * - Bypass actors performing their victory motion?
 *
 *   Bypass?:
 *   - Bypass actors performing their victory motion?
 *
 * ---
 *
 * System: Bypass Victory Music
 * - Bypass playing the victory music?
 *
 *   Bypass?:
 *   - Bypass playing the victory music?
 *
 * ---
 *
 * System: Bypass Victory Phase
 * - Bypass the entire victory phase and all aspects about it?
 *
 *   Bypass?:
 *   - Bypass the entire victory phase and all aspects about it?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * The general settings Plugin Parameters control the overall settings found
 * within the main aspects of the Victory Aftermath sequence.
 *
 * ---
 *
 * General Settings
 * 
 *   Fade In Speed:
 *   - Fade in speed for the victory window.
 * 
 *   Hide Delay (MS):
 *   - Delay in milliseconds before hiding the UI Windows.
 * 
 *   Show Delay (MS):
 *   - Delay in milliseconds before showing the Victory Windows.
 * 
 *   Update Duration:
 *   - Duration in frames on updating actor EXP gauges.
 * 
 *   Victory BGM:
 *   - Background music to play during the victory sequence.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Level Up Settings
 * ============================================================================
 *
 * When actors level up, extra screens will be displayed in the Victory
 * Aftermath sequence. Alter these settings to best fit your game.
 *
 * ---
 *
 * General
 * 
 *   Enable?:
 *   - Enable the Level Up portion of the Victory Aftermath phase?
 * 
 *   Show Face?:
 *   - Show the actor's face?
 * 
 *   Show Param Change?:
 *   - Show an extra column for parameter value differences?
 * 
 *   Shown Max Skills:
 *   - The maximum amount of skills that are displayed.
 *   - This is due to limited screen space.
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
 * Quotes
 * 
 *   Level Up Quotes:
 *   - A list of generic level up quotes for those who don't have the
 *     <Level Up Quote> notetags.
 *   - %1 - Actor Name
 * 
 *   New Skill Quotes:
 *   - A list of generic level up quotes for those who don't have the
 *     <New Skill Quote> notetags.
 *   - %1 - Actor Name
 *
 * ---
 *
 * VisuMZ_1_MainMenuCore
 * - The following Plugin Parameters require VisuMZ_1_MainMenuCore.
 * 
 *   Show Bust?:
 *   - Show the actor's menu image as a bust?
 * 
 *   Bust Position X:
 *   - Positon to center the actor's menu image bust.
 *   - You may use JavaScript code.
 * 
 *   Bust Position Y:
 *   - Positon to anchor the actor's menu image bust.
 *   - You may use JavaScript code.
 * 
 *   Bust Scale:
 *   - The amount to scale the actor's menu image bust.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * There's certain diction used in the Victory Aftermath plugin that's not set
 * anywhere else in the game. Change the settings to make it fit your game.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Continue Format:
 *   - Text format for continue message.
 *   - %1 - OK key, %2 - Cancel key
 * 
 *   OK Button:
 *   - Text used to represent the OK button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Cancel Button:
 *   - Text used to represent the Cancel button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Level Format:
 *   - Text format for actor level.
 *   - %1 - Level
 * 
 *   Level Up:
 *   - Text format for reaching a level up.
 * 
 *   Sound Effect:
 *   - Sound effect played when a level up occurs.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors
 *     from the Window Skin.
 * 
 *   New Skill Format:
 *   - Text format describing that a new skill has been learned.
 *   - %1 - Actor Name
 * 
 *   Reward Items:
 *   - Text displayed for items rewarded.
 * 
 *   Victory Title:
 *   - Text displayed at the top of the victory screen.
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
 * Version 1.01: September 6, 2020
 * * New Features!
 * ** New Plugin Parameters added in Level Up Settings for disabling
 *    the back rectangles and/or changing their colors.
 *
 * Version 1.00: August 26, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorQuotesLevelUpAdd
 * @text Actor: Add Level Up Quotes
 * @desc Add new entries target actor's level up quotes.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select ID of target actor to add quotes for.
 * @default 1
 *
 * @arg NewQuotes:arrayjson
 * @text New Quotes
 * @type note[]
 * @desc Add new entries to actor's level up quotes.
 * Text codes allowed. %1 - Actor's Name
 * @default ["\"\\\\c[6]%1\\\\c[0]\\n\\\"Text\\\"\""]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorQuotesNewSkillAdd
 * @text Actor: Add New Skill Quotes
 * @desc Add new entries target actor's new skill quotes.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select ID of target actor to add quotes for.
 * @default 1
 *
 * @arg NewQuotes:arrayjson
 * @text New Quotes
 * @type note[]
 * @desc Add new entries to actor's new skill quotes.
 * Text codes allowed. %1 - Actor's Name
 * @default ["\"\\\\c[6]%1\\\\c[0]\\n\\\"Text\\\"\""]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorQuotesLevelUpClear
 * @text Actor: Clear Level Up Quotes
 * @desc Clear target actor's level up quotes.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select ID of target actor to clear quotes for.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorQuotesNewSkillClear
 * @text Actor: Clear New Skill Quotes
 * @desc Clear target actor's new skill quotes.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select ID of target actor to clear quotes for.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemBypassVictoryMotion
 * @text System: Bypass Victory Motion
 * @desc Bypass actors performing their victory motion?
 *
 * @arg Bypass:eval
 * @text Bypass?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypass actors performing their victory motion?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemBypassVictoryMusic
 * @text System: Bypass Victory Music
 * @desc Bypass playing the victory music?
 *
 * @arg Bypass:eval
 * @text Bypass?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypass playing the victory music?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemBypassVictoryPhase
 * @text System: Bypass Victory Phase
 * @desc Bypass the entire victory phase and all aspects about it?
 *
 * @arg Bypass:eval
 * @text Bypass?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypass the entire victory phase and all aspects about it?
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
 * @param VictoryAftermath
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
 * @desc General settings pertaining to the Victory Aftermath phase.
 * @default {"FadeInSpeed:num":"8","HideDelayMS:num":"1500","ShowDelayMS:num":"2000","UpdateDuration:num":"180","Bgm:str":"Ship3"}
 *
 * @param LevelUp:struct
 * @text Level Up Settings
 * @type struct<LevelUp>
 * @desc Settings pertaining to the Level Up portion of the Victory Aftermath phase.
 * @default {"General":"","Enable:eval":"true","ShowFace:eval":"false","ShowParamDiff:eval":"true","MaxSkills:num":"8","DelayBuffer:num":"200","DrawBackRect:eval":"true","BackRectColor:str":"19","Quotes":"","LevelUpQuotes:arrayjson":"[\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Alright! A level up!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Yes! I've leveled up!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Oh? I've leveled up!?\\\\n This is awesome!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Looks like I've become stronger!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"I feel like I'm getting used to battle.\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"The power! I can feel it!\\\\\\\"\\\"\"]","NewSkillQuotes:arrayjson":"[\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Looks like I've acquired a new skill!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"This new skill should come in handy.\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"It seems I've learned something new!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"I've acquired a new power!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"This should be useful for future battles.\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"I wonder what this new skill is like?\\\\\\\"\\\"\"]","MainMenuCore":"","ShowBust:eval":"true","BustPosX:str":"Graphics.width * 0.25","BustPosY:str":"Graphics.height","BustScale:num":"1.20"}
 *
 * @param Vocab:struct
 * @text Vocabulary
 * @type struct<Vocab>
 * @desc The vocabulary used for this plugin and related settings.
 * @default {"ContinueFmt:str":"Press %1 or %2 to continue","KeyOK:str":"OK","KeyCancel:str":"Cancel","LvFmt:str":"LV %1","LvUp:str":"LEVEL UP!","LvUpSfx:str":"Up4","LvUpColor:str":"17","NewSkill:str":"%1 has learned:","RewardItems:str":"Items Obtained","Victory:str":"Victory!"}
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
 * @param FadeInSpeed:num
 * @text Fade In Speed
 * @desc Fade in speed for the victory window.
 * @default 8
 *
 * @param HideDelayMS:num
 * @text Hide Delay (MS)
 * @desc Delay in milliseconds before hiding the UI Windows.
 * @default 1500
 *
 * @param ShowDelayMS:num
 * @text Show Delay (MS)
 * @desc Delay in milliseconds before showing the Victory Windows.
 * @default 2000
 *
 * @param UpdateDuration:num
 * @text Update Duration
 * @desc Duration in frames on updating actor EXP gauges.
 * @default 180
 *
 * @param Bgm:str
 * @text Victory BGM
 * @type file
 * @dir audio/bgm/
 * @desc Background music to play during the victory sequence.
 * @default Ship3
 *
 */
/* ----------------------------------------------------------------------------
 * Level Up Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LevelUp:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the Level Up portion of the Victory Aftermath phase?
 * @default true
 *
 * @param ShowFace:eval
 * @text Show Face?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the actor's face?
 * @default false
 *
 * @param ShowParamDiff:eval
 * @text Show Param Change?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show an extra column for parameter value differences?
 * @default true
 *
 * @param MaxSkills:num
 * @text Shown Max Skills
 * @parent General
 * @desc The maximum amount of skills that are displayed.
 * This is due to limited screen space.
 * @default 8
 *
 * @param DelayBuffer:num
 * @text Delay Buffer
 * @parent General
 * @type number
 * @desc How many milliseconds to wait in between playing
 * each level up sound effect?
 * @default 200
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
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
 * @param Quotes
 *
 * @param LevelUpQuotes:arrayjson
 * @text Level Up Quotes
 * @parent Quotes
 * @type note[]
 * @desc A list of generic level up quotes for those who don't
 * have the <Level Up Quote> notetags. %1 - Actor Name
 * @default ["\"\\\\c[6]%1\\\\c[0]\\n\\\"Alright! A level up!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"Yes! I've leveled up!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"Oh? I've leveled up!?\\n This is awesome!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"Looks like I've become stronger!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"I feel like I'm getting used to battle.\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"The power! I can feel it!\\\"\""]
 *
 * @param NewSkillQuotes:arrayjson
 * @text New Skill Quotes
 * @parent Quotes
 * @type note[]
 * @desc A list of generic level up quotes for those who don't
 * have the <New Skill Quote> notetags. %1 - Actor Name
 * @default ["\"\\\\c[6]%1\\\\c[0]\\n\\\"Looks like I've acquired a new skill!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"This new skill should come in handy.\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"It seems I've learned something new!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"I've acquired a new power!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"This should be useful for future battles.\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"I wonder what this new skill is like?\\\"\""]
 *
 * @param MainMenuCore
 * @text VisuMZ_1_MainMenuCore
 *
 * @param ShowBust:eval
 * @text Show Bust?
 * @parent MainMenuCore
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the actor's menu image as a bust?
 * @default true
 *
 * @param BustPosX:str
 * @text Bust Position X
 * @parent MainMenuCore
 * @desc Positon to center the actor's menu image bust.
 * You may use JavaScript code.
 * @default Graphics.width * 0.25
 *
 * @param BustPosY:str
 * @text Bust Position Y
 * @parent MainMenuCore
 * @desc Positon to anchor the actor's menu image bust.
 * You may use JavaScript code.
 * @default Graphics.height
 *
 * @param BustScale:num
 * @text Bust Scale
 * @parent MainMenuCore
 * @desc The amount to scale the actor's menu image bust.
 * @default 1.20
 *
 */
/* ----------------------------------------------------------------------------
 * Vocabulary Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param ContinueFmt:str
 * @text Continue Format
 * @desc Text format for continue message.
 * %1 - OK key, %2 - Cancel key
 * @default Press %1 or %2 to continue
 *
 * @param KeyOK:str
 * @text OK Button
 * @parent ContinueFmt:str
 * @desc Text used to represent the OK button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default OK
 *
 * @param KeyCancel:str
 * @text Cancel Button
 * @parent ContinueFmt:str
 * @desc Text used to represent the Cancel button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default Cancel
 *
 * @param LvFmt:str
 * @text Level Format
 * @desc Text format for actor level.
 * %1 - Level
 * @default LV %1
 *
 * @param LvUp:str
 * @text Level Up
 * @desc Text format for reaching a level up.
 * @default LEVEL UP!
 *
 * @param LvUpSfx:str
 * @text Sound Effect
 * @parent LvUp:str
 * @type file
 * @dir audio/se/
 * @desc Sound effect played when a level up occurs.
 * @default Up4
 *
 * @param LvUpColor:str
 * @text Text Color
 * @parent LvUp:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param NewSkill:str
 * @text New Skill Format
 * @desc Text format describing that a new skill has been learned.
 * %1 - Actor Name
 * @default %1 has learned:
 *
 * @param RewardItems:str
 * @text Reward Items
 * @desc Text displayed for items rewarded.
 * @default Items Obtained
 *
 * @param Victory:str
 * @text Victory Title
 * @desc Text displayed at the top of the victory screen.
 * @default Victory!
 *
 */
//=============================================================================

const _0x4d8c=['actor%1-gauge','maxVisibleItems','BattleManager_isBusy','BattleVictoryJS','General','oFAuw','quoteLevelUp','clamp','innerWidth','nextLevelExp','LvFmt','makeItemGainWindow','prepareVictoryAftermathTransition','eMqtT','victoryRewardBitmap','center','setActor','isActor','min','drawItemGainTitle','CoreEngine','itemCount','max','jJXUn','paramValueByName','setupVictoryLevelUpNextActor','drawRewardStrip','_fullWidth','addInnerChild','maxLvGaugeColor2','AosMx','quoteLevelSkill','_showLevelUp','drawItemNumber','dTSJL','playSe','createVictoryRewardsWindow','isEnabled','width','ActorID','drawNewLearnedSkills','NIwkE','_victoryLevelUpBuffer','closeCommandWindows','Enable','_victoryUpdateDuration','victoryNameBitmap','_data','status','_colorCache','_victoryTempActorsA','ShowDelayMS','KpLjS','_delayDuration','push','Game_Actor_isBattleMember','victoryContinueFmt','vVHHR','drawNewLearnedSkillsList','gold','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','MAX\x20LEVEL','mainFontSize','ActorQuotesNewSkillAdd','victoryKeyCancel','makeDeepCopy','dttNL','SystemBypassVictoryMusic','isVictoryLevelUpPhaseEnabled','Settings','drawExpValues','levelups','Victory','drawText','drawParamDiffValue','HideDelayMS','drawItemName','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','levelUp','gradientFillRect','victoryNewSkillFmt','LevelUp','KeyOK','rgba(0,\x200,\x200,\x201)','_victoryWindows','getVictoryAftermathBackColor','getColor','_showFace','allowUpdateBattleAniSpeed','navwK','bypassVictoryMotion','isItem','dykZh','processVictoryAftermath','translucentOpacity','onVictoryStepLevelUpMember','createActorSprite','victoryDisplayLvUp','ConvertParams','updatePadding','#%1','removeBattleStates','removeVictoryLevelUpBuffer','isRepeated','makeRewards','_index','Game_System_initialize','isShowNew','victoryDisplayItem','_scene','_currentlevel','STR','MessageCore','paintOpacity','victoryDisplayLvFmt','isWeapon','ActorQuotesLevelUpClear','LbGQM','expGaugeColor1','length','_additionalSprites','drawParamAfterValue','BLear','performVictory','cancel','move','systemColor','resetFontSettings','Scene_Battle_update','isBattleMember','victoryKeyOk','ARRAYFUNC','items','right','iTscP','MessageWidth','return\x200','includes','scale','KeyCancel','clearRect','lineHeight','isFastForwarded','drawActorName','dimColor2','POIbM','pop','QoL','Param','loadPicture','_victoryBgm','actor','ShowParamDiff','VictoryAftermath','ARRAYJSON','toLowerCase','nextVictoryLevelUpActor','mainFontFace','processVictoryAftermathParty','makeTempActors','ARRAYEVAL','itemPadding','pRmXX','_victoryActorIndex','cjRle','LevelUpQuotes','drawActorFace','Game_Actor_performVictory','DigitGroupingStandardText','_showBust','left','getQuoteWidth','activate','hideWindowsForVictoryAftermath','_itemGainWindow','victoryFullScreenWindowRect','battleMembers','_actorSprite','map','WJtGS','ItemQuantityFmt','fillRect','drawParamBeforeValue','drawItemBackground','JSON','done','isVictoryContinueReady','boxWidth','isBusy','victoryDisplayTitle','parameters','param','changeTextColor','Bypass','_victoryRewardsWindow','itemHeight','_victoryLevelUpWindow','setBackgroundType','AxIPs','ItemsEquipsCore','NewSkillQuotes','_mainWindow','VISdr','createVictorySteps','initialize','uWBUw','_victoryPhase','isBypassVictoryAftermathPhase','isMaxLevel','BalpH','IMgcE','_victoryContinueWindow','VisuMZ_1_MainMenuCore','_victoryLevelUpSFX','rewards','Game_Actor_shouldDisplayLevelUp','currentExp','Vocab','floor','FadeInSpeed','llaXj','contentsOpacity','victory-level-up-color','filter','contents','VJkrX','BustPosY','updateContentsOpacity','registerCommand','IAFIv','rgba(0,\x200,\x200,\x200.4)','_phase','createSubWindow','STRUCT','textSizeEx','gSwUo','fontSize','newSkillQuotes','CKgvR','drawCircle','KmpwP','initVictoryAftermath','rEIkv','_rewards','ByriE','victoryLevelUpColor','description','oKEwl','name','updateExpGain','parse','exit','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','bypassVictoryMusic','CvWtq','finishVictoryPhase','playVictoryBgm','expRate','round','isVictoryPhase','findNewSkills','drawExpGauge','(+%1)','NUM','LBHHQ','refresh','changeExp','LvUpSfx','victoryContinueMessageWindowRect','RewardItems','makeFontBigger','createGaugeSprite','getQuoteText','getMenuImage','_drawParamDiff','version','normalColor','isPressed','members','skipVictoryAftermathTransition','eVROL','ItemScene','trim','height','textWidth','gainTempExp','shift','actorParams','_victoryAftermathCopy','IOAaM','paramValueFontSize','index','level','addChildToBack','finalExpRate','processVictoryStep','BackRectColor','match','_victoryAftermathSettings','drawLevelMessage','isBypassVictoryAftermathMusic','_victoryAftermathLevelUpQuotes','blt','constructor','LddsU','ShowBust','_victoryAftermathNewSkillQuotes','createVictoryStepLevelUps','processVictoryAftermathMusic','makeVictoryCopy','caWRE','maxBattleMembers','EVAL','mTrjP','drawParamChanges','Scene_Battle_allowUpdateBattleAniSpeed','gaugeHeight','playBgm','drawTextEx','drawPartyExpGauges','tfsvL','addChild','sort','VisuMZ_1_ItemsEquipsCore','setup','_opacitySpeed','ActorQuotesNewSkillClear','FUNC','drawItemDarkRect','drawActorNameStrip','faceWidth','textColor','NewQuotes','drawBackgroundElements','huVHO','updateVictoryPhase','DrawBackRect','fontFace','_actorId','setupVictoryAftermathQuotes','call','makeItemList','bitmap','updateOpacity','BustScale','processPostBattleCommonEvents','_victoryTempActorsB','processVictory','currentLevelExp','anchor','_actor','isSceneBattle','ContinueFmt','format','_subWindow','beforeActor','bypassVictoryPhase','clear','_victorySteps','LvUp','padding','exp','createVictoryContinueMessageWindow','tdyDM','setActionState','playVictoryLevelUpSFX','paramchangeTextColor','gzevt','gainRewards','gaugeBackColor','split','drawParamName','create','initMembers','ARRAYSTRUCT','bNcDV','GroupDigits','gaugeColor1','VisuMZ_0_CoreEngine','indexOf','loadFaceImages','_victoryStep','lVeBV','drawActorLevel','ActorQuotesLevelUpAdd','update','_duration','toUpperCase','rgba(0,\x200,\x200,\x200.8)','isContinueReady','drawLevelUpQuote','bind','yoMLi','opacity','ShowFace','createBitmap','(%1)','expGaugeColor2','BattleManager_initMembers','drawRewards','gaugeColor2','JzXLs','replayBgmAndBgs','victoryAftermathSettings','isBypassVictoryAftermathMotion','levelUpQuotes','note','UpdateDuration','createVictoryStepRewards','VisuMZ_1_MessageCore','drawNewLearnedSkillsBackground','createVictoryLevelUpWindow','ExtDisplayedParams','aBttQ','prototype','maxLvGaugeColor1','randomInt','_tempActorExpGain','updateVictorySteps','setDelayDuration','skills','ARRAYSTR','createVictoryAftermathWindows'];(function(_0x183d34,_0x4d8c48){const _0x22da9b=function(_0x401261){while(--_0x401261){_0x183d34['push'](_0x183d34['shift']());}};_0x22da9b(++_0x4d8c48);}(_0x4d8c,0xc9));const _0x22da=function(_0x183d34,_0x4d8c48){_0x183d34=_0x183d34-0x0;let _0x22da9b=_0x4d8c[_0x183d34];return _0x22da9b;};var label=_0x22da('0x177'),tier=tier||0x0,dependencies=['VisuMZ_1_BattleCore'],pluginData=$plugins[_0x22da('0x16')](function(_0x234a80){return _0x234a80[_0x22da('0x10e')]&&_0x234a80[_0x22da('0x2d')][_0x22da('0x167')]('['+label+']');})[0x0];VisuMZ[label][_0x22da('0x123')]=VisuMZ[label][_0x22da('0x123')]||{},VisuMZ[_0x22da('0x140')]=function(_0x40d36d,_0x53689d){for(const _0xad11f8 in _0x53689d){if(_0xad11f8['match'](/(.*):(.*)/i)){if(_0x22da('0xbf')==='GuybQ'){function _0x16d8f9(){return!![];}}else{const _0x1b9a0d=String(RegExp['$1']),_0x1e36ad=String(RegExp['$2'])[_0x22da('0xba')]()[_0x22da('0x51')]();let _0x3ea4b1,_0x2d931d,_0x4a5e6f;switch(_0x1e36ad){case _0x22da('0x3e'):_0x3ea4b1=_0x53689d[_0xad11f8]!==''?Number(_0x53689d[_0xad11f8]):0x0;break;case'ARRAYNUM':_0x2d931d=_0x53689d[_0xad11f8]!==''?JSON[_0x22da('0x31')](_0x53689d[_0xad11f8]):[],_0x3ea4b1=_0x2d931d['map'](_0x419e53=>Number(_0x419e53));break;case _0x22da('0x6f'):_0x3ea4b1=_0x53689d[_0xad11f8]!==''?eval(_0x53689d[_0xad11f8]):null;break;case _0x22da('0x17e'):_0x2d931d=_0x53689d[_0xad11f8]!==''?JSON[_0x22da('0x31')](_0x53689d[_0xad11f8]):[],_0x3ea4b1=_0x2d931d[_0x22da('0x190')](_0x5b4fed=>eval(_0x5b4fed));break;case _0x22da('0x196'):_0x3ea4b1=_0x53689d[_0xad11f8]!==''?JSON[_0x22da('0x31')](_0x53689d[_0xad11f8]):'';break;case _0x22da('0x178'):_0x2d931d=_0x53689d[_0xad11f8]!==''?JSON[_0x22da('0x31')](_0x53689d[_0xad11f8]):[],_0x3ea4b1=_0x2d931d[_0x22da('0x190')](_0x2123f9=>JSON[_0x22da('0x31')](_0x2123f9));break;case _0x22da('0x7e'):_0x3ea4b1=_0x53689d[_0xad11f8]!==''?new Function(JSON[_0x22da('0x31')](_0x53689d[_0xad11f8])):new Function(_0x22da('0x166'));break;case _0x22da('0x161'):_0x2d931d=_0x53689d[_0xad11f8]!==''?JSON[_0x22da('0x31')](_0x53689d[_0xad11f8]):[],_0x3ea4b1=_0x2d931d[_0x22da('0x190')](_0x53e71a=>new Function(JSON[_0x22da('0x31')](_0x53e71a)));break;case _0x22da('0x14d'):_0x3ea4b1=_0x53689d[_0xad11f8]!==''?String(_0x53689d[_0xad11f8]):'';break;case _0x22da('0xdc'):_0x2d931d=_0x53689d[_0xad11f8]!==''?JSON[_0x22da('0x31')](_0x53689d[_0xad11f8]):[],_0x3ea4b1=_0x2d931d[_0x22da('0x190')](_0x32d916=>String(_0x32d916));break;case _0x22da('0x20'):_0x4a5e6f=_0x53689d[_0xad11f8]!==''?JSON[_0x22da('0x31')](_0x53689d[_0xad11f8]):{},_0x3ea4b1=VisuMZ[_0x22da('0x140')]({},_0x4a5e6f);break;case _0x22da('0xad'):_0x2d931d=_0x53689d[_0xad11f8]!==''?JSON[_0x22da('0x31')](_0x53689d[_0xad11f8]):[],_0x3ea4b1=_0x2d931d[_0x22da('0x190')](_0x44ddf4=>VisuMZ[_0x22da('0x140')]({},JSON['parse'](_0x44ddf4)));break;default:continue;}_0x40d36d[_0x1b9a0d]=_0x3ea4b1;}}}return _0x40d36d;},(_0x11fe27=>{const _0x170558=_0x11fe27[_0x22da('0x2f')];for(const _0x4e8015 of dependencies){if(!Imported[_0x4e8015]){alert(_0x22da('0x11a')[_0x22da('0x98')](_0x170558,_0x4e8015)),SceneManager['exit']();break;}}const _0x2e5270=_0x11fe27[_0x22da('0x2d')];if(_0x2e5270[_0x22da('0x60')](/\[Version[ ](.*?)\]/i)){if('gakMX'===_0x22da('0xe3')){function _0x38cc4f(){_0x55b578[_0x22da('0xd5')]['update'][_0x22da('0x8b')](this),this[_0x22da('0x1a')]();}}else{const _0x512b0c=Number(RegExp['$1']);_0x512b0c!==VisuMZ[label][_0x22da('0x4a')]&&(alert(_0x22da('0x33')[_0x22da('0x98')](_0x170558,_0x512b0c)),SceneManager[_0x22da('0x32')]());}}if(_0x2e5270[_0x22da('0x60')](/\[Tier[ ](\d+)\]/i)){if(_0x22da('0x1')===_0x22da('0x27')){function _0x47c7de(){_0xec2bfd[_0x22da('0x177')][_0x22da('0x72')]=_0x4fb5e0[_0x22da('0xd5')][_0x22da('0x136')],_0x4bcc2d[_0x22da('0xd5')][_0x22da('0x136')]=function(){if(_0x118cea[_0x22da('0x3a')]())return![];return _0x170fda['VictoryAftermath'][_0x22da('0x72')]['call'](this);};}}else{const _0x43ddc9=Number(RegExp['$1']);_0x43ddc9<tier?(alert(_0x22da('0x12b')[_0x22da('0x98')](_0x170558,_0x43ddc9,tier)),SceneManager[_0x22da('0x32')]()):tier=Math['max'](_0x43ddc9,tier);}}VisuMZ[_0x22da('0x140')](VisuMZ[label][_0x22da('0x123')],_0x11fe27[_0x22da('0x19c')]);})(pluginData),PluginManager[_0x22da('0x1b')](pluginData[_0x22da('0x2f')],_0x22da('0xb7'),_0x1fb67f=>{VisuMZ[_0x22da('0x140')](_0x1fb67f,_0x1fb67f);const _0x223d1e=$gameActors[_0x22da('0x175')](_0x1fb67f[_0x22da('0x105')]),_0x1ce357=_0x1fb67f[_0x22da('0x83')];if(_0x223d1e)while(_0x1ce357[_0x22da('0x155')]>0x0){if(_0x22da('0x16f')==='POIbM')_0x223d1e[_0x22da('0xcc')]()[_0x22da('0x114')](_0x1ce357[_0x22da('0x55')]());else{function _0x26f18c(){_0x36d850['prototype'][_0x22da('0x40')][_0x22da('0x8b')](this),this['contents']['clear'](),this[_0x22da('0x15d')](),this[_0x22da('0x84')](),this[_0x22da('0xc6')](),this[_0x22da('0xf1')](),this[_0x22da('0xe9')](),this[_0x22da('0x76')]();}}}}),PluginManager[_0x22da('0x1b')](pluginData[_0x22da('0x2f')],_0x22da('0x11d'),_0x4196d7=>{VisuMZ[_0x22da('0x140')](_0x4196d7,_0x4196d7);const _0x96b52=$gameActors[_0x22da('0x175')](_0x4196d7[_0x22da('0x105')]),_0x3992bf=_0x4196d7['NewQuotes'];if(_0x96b52)while(_0x3992bf[_0x22da('0x155')]>0x0){if(_0x22da('0x107')!=='CRdeV')_0x96b52[_0x22da('0x24')]()[_0x22da('0x114')](_0x3992bf[_0x22da('0x55')]());else{function _0x308e5c(){const _0x1514de=this[_0x22da('0x156')];if(_0x1514de[_0x8ac2ba])return _0x1514de[_0x55063c];else{const _0x555368=new _0x5bb452(_0x220b5d,this,_0x146a16);return _0x1514de[_0x47db3f]=_0x555368,this['addInnerChild'](_0x555368),_0x555368;}}}}}),PluginManager[_0x22da('0x1b')](pluginData['name'],_0x22da('0x152'),_0x49880a=>{VisuMZ[_0x22da('0x140')](_0x49880a,_0x49880a);const _0x360227=$gameActors['actor'](_0x49880a[_0x22da('0x105')]);if(_0x360227){if(_0x22da('0x29')===_0x22da('0xa6')){function _0x444e09(){_0x503471[_0x22da('0x177')][_0x22da('0x15e')]['call'](this),this[_0x22da('0x86')]();}}else while(_0x360227[_0x22da('0xcc')]()['length']>0x0){if(_0x22da('0x137')!=='sooZu')_0x360227[_0x22da('0xcc')]()[_0x22da('0x55')]();else{function _0x3c5b27(){this[_0x22da('0x14')]-=_0x4e6afa['_opacitySpeed'];}}}}}),PluginManager[_0x22da('0x1b')](pluginData[_0x22da('0x2f')],_0x22da('0x7d'),_0x25e3e7=>{VisuMZ[_0x22da('0x140')](_0x25e3e7,_0x25e3e7);const _0x457200=$gameActors[_0x22da('0x175')](_0x25e3e7[_0x22da('0x105')]);if(_0x457200)while(_0x457200[_0x22da('0x24')]()[_0x22da('0x155')]>0x0){_0x457200[_0x22da('0x24')]()[_0x22da('0x55')]();}}),PluginManager[_0x22da('0x1b')](pluginData[_0x22da('0x2f')],'SystemBypassVictoryMotion',_0x2a1210=>{VisuMZ[_0x22da('0x140')](_0x2a1210,_0x2a1210),$gameSystem['victoryAftermathSettings']()[_0x22da('0x138')]=_0x2a1210[_0x22da('0x19f')];}),PluginManager[_0x22da('0x1b')](pluginData[_0x22da('0x2f')],_0x22da('0x121'),_0x2438bd=>{VisuMZ[_0x22da('0x140')](_0x2438bd,_0x2438bd),$gameSystem[_0x22da('0xca')]()['bypassVictoryMusic']=_0x2438bd['Bypass'];}),PluginManager[_0x22da('0x1b')](pluginData['name'],'SystemBypassVictoryPhase',_0x9b573e=>{VisuMZ[_0x22da('0x140')](_0x9b573e,_0x9b573e),$gameSystem[_0x22da('0xca')]()[_0x22da('0x9b')]=_0x9b573e[_0x22da('0x19f')];}),TextManager[_0x22da('0x116')]=VisuMZ[_0x22da('0x177')][_0x22da('0x123')][_0x22da('0x10')][_0x22da('0x97')],TextManager[_0x22da('0x160')]=VisuMZ[_0x22da('0x177')][_0x22da('0x123')][_0x22da('0x10')][_0x22da('0x130')],TextManager[_0x22da('0x11e')]=VisuMZ['VictoryAftermath'][_0x22da('0x123')][_0x22da('0x10')][_0x22da('0x169')],TextManager[_0x22da('0x150')]=VisuMZ[_0x22da('0x177')][_0x22da('0x123')]['Vocab'][_0x22da('0xe8')],TextManager[_0x22da('0x13f')]=VisuMZ[_0x22da('0x177')][_0x22da('0x123')][_0x22da('0x10')][_0x22da('0x9e')],TextManager['victoryDisplayItem']=VisuMZ[_0x22da('0x177')][_0x22da('0x123')][_0x22da('0x10')][_0x22da('0x44')],TextManager[_0x22da('0x19b')]=VisuMZ['VictoryAftermath'][_0x22da('0x123')][_0x22da('0x10')][_0x22da('0x126')],TextManager[_0x22da('0x12e')]=VisuMZ['VictoryAftermath'][_0x22da('0x123')][_0x22da('0x10')]['NewSkill'],TextManager[_0x22da('0xe4')]=function(_0x184234){const _0xf3bf0e=VisuMZ[_0x22da('0x177')][_0x22da('0x123')][_0x22da('0x12f')][_0x22da('0x183')];if(!_0x184234)return _0xf3bf0e[Math['randomInt'](_0xf3bf0e[_0x22da('0x155')])];if(!_0x184234[_0x22da('0xef')]())return _0xf3bf0e[Math[_0x22da('0xd7')](_0xf3bf0e[_0x22da('0x155')])];const _0x1e0c9c=_0x184234[_0x22da('0xcc')]();if(_0x1e0c9c[_0x22da('0x155')]>0x0)return _0x1e0c9c[Math[_0x22da('0xd7')](_0x1e0c9c[_0x22da('0x155')])];return _0xf3bf0e[Math[_0x22da('0xd7')](_0xf3bf0e[_0x22da('0x155')])];},TextManager[_0x22da('0xfd')]=function(_0x297446){const _0x17041f=VisuMZ['VictoryAftermath'][_0x22da('0x123')][_0x22da('0x12f')][_0x22da('0x1a6')];if(!_0x297446)return _0x17041f[Math[_0x22da('0xd7')](_0x17041f[_0x22da('0x155')])];if(!_0x297446[_0x22da('0xef')]())return _0x17041f[Math[_0x22da('0xd7')](_0x17041f[_0x22da('0x155')])];const _0x4864a8=_0x297446[_0x22da('0x24')]();if(_0x4864a8[_0x22da('0x155')]>0x0)return _0x4864a8[Math[_0x22da('0xd7')](_0x4864a8[_0x22da('0x155')])];return _0x17041f[Math[_0x22da('0xd7')](_0x17041f[_0x22da('0x155')])];},ColorManager['getColorDataFromPluginParameters']=function(_0x373b23,_0x1e63ba){return _0x1e63ba=String(_0x1e63ba),this[_0x22da('0x10f')]=this['_colorCache']||{},_0x1e63ba['match'](/#(.*)/i)?this[_0x22da('0x10f')][_0x373b23]=_0x22da('0x142')['format'](String(RegExp['$1'])):this['_colorCache'][_0x373b23]=this[_0x22da('0x82')](Number(_0x1e63ba)),this[_0x22da('0x10f')][_0x373b23];},ColorManager[_0x22da('0x134')]=function(_0x106fab){return _0x106fab=String(_0x106fab),_0x106fab[_0x22da('0x60')](/#(.*)/i)?_0x22da('0x142')[_0x22da('0x98')](String(RegExp['$1'])):this[_0x22da('0x82')](Number(_0x106fab));},ColorManager[_0x22da('0x2c')]=function(){const _0x61cd21=_0x22da('0x15');this[_0x22da('0x10f')]=this['_colorCache']||{};if(this[_0x22da('0x10f')][_0x61cd21])return this['_colorCache'][_0x61cd21];const _0x302083=VisuMZ[_0x22da('0x177')][_0x22da('0x123')][_0x22da('0x10')]['LvUpColor'];return this['getColorDataFromPluginParameters'](_0x61cd21,_0x302083);},SoundManager[_0x22da('0xa4')]=function(){if(this[_0x22da('0x108')])return;!this[_0x22da('0xc')]&&(this[_0x22da('0xc')]={'name':VisuMZ[_0x22da('0x177')][_0x22da('0x123')][_0x22da('0x10')][_0x22da('0x42')]||'','volume':0x5a,'pitch':0x64,'pan':0x0}),this[_0x22da('0xc')]['name']!==''&&(AudioManager[_0x22da('0x101')](this[_0x22da('0xc')]),this[_0x22da('0x108')]=!![],setTimeout(this[_0x22da('0x144')][_0x22da('0xbe')](this),0xc8));},SoundManager[_0x22da('0x144')]=function(){this[_0x22da('0x108')]=![];},SoundManager[_0x22da('0x37')]=function(){!this[_0x22da('0x174')]&&(this[_0x22da('0x174')]={'name':VisuMZ['VictoryAftermath']['Settings']['General']['Bgm']||'','volume':0x5a,'pitch':0x64,'pan':0x0}),this[_0x22da('0x174')]['name']!==''&&AudioManager[_0x22da('0x74')](this['_victoryBgm']);},BattleManager['_victoryUpdateDuration']=VisuMZ[_0x22da('0x177')][_0x22da('0x123')]['General'][_0x22da('0xce')]||0x1,VisuMZ[_0x22da('0x177')][_0x22da('0xc5')]=BattleManager[_0x22da('0xac')],BattleManager['initMembers']=function(){VisuMZ[_0x22da('0x177')][_0x22da('0xc5')][_0x22da('0x8b')](this),this[_0x22da('0x5')]=![],this[_0x22da('0x181')]=-0x1;},VisuMZ[_0x22da('0x177')][_0x22da('0xe0')]=BattleManager[_0x22da('0x19a')],BattleManager['isBusy']=function(){return this[_0x22da('0x3a')]()?!![]:VisuMZ[_0x22da('0x177')][_0x22da('0xe0')][_0x22da('0x8b')](this);},BattleManager[_0x22da('0x3a')]=function(){return this[_0x22da('0x1e')]==='battleEnd'&&this[_0x22da('0x5')];},BattleManager[_0x22da('0x92')]=function(){this['processBattleCoreJS'](_0x22da('0xe1')),this[_0x22da('0x90')]('Victory'),this['processVictoryAftermath']();},BattleManager[_0x22da('0x13b')]=function(){this[_0x22da('0x17c')](),this['processVictoryAftermathMusic'](),this['processVictoryAftermathRewards'](),this[_0x22da('0xea')]();},BattleManager[_0x22da('0x17c')]=function(){$gameParty[_0x22da('0x143')](),$gameParty[_0x22da('0x159')]();},BattleManager[_0x22da('0x6b')]=function(){if(this[_0x22da('0x63')]())return;this['playVictoryMe'](),SoundManager[_0x22da('0x37')]();},BattleManager[_0x22da('0x63')]=function(){return $gameSystem['victoryAftermathSettings']()[_0x22da('0x34')]||$gameSystem[_0x22da('0xca')]()[_0x22da('0x9b')];},BattleManager['processVictoryAftermathRewards']=function(){this[_0x22da('0x17d')](),this[_0x22da('0x146')](),this[_0x22da('0xa7')]();},BattleManager[_0x22da('0x17d')]=function(){this[_0x22da('0x110')]=$gameParty[_0x22da('0x18e')]()[_0x22da('0x190')](_0x1b0889=>_0x1b0889[_0x22da('0x6c')]()),this['_victoryTempActorsB']=JsonEx[_0x22da('0x11f')](this[_0x22da('0x110')]);},BattleManager[_0x22da('0xea')]=function(){this['endBattle'](0x0),this[_0x22da('0x5')]=!![],this[_0x22da('0x6')]()?this[_0x22da('0x4e')]():this['processVictoryAftermathTransition']();},BattleManager['isBypassVictoryAftermathPhase']=function(){return $gameSystem[_0x22da('0xca')]()[_0x22da('0x9b')];},BattleManager[_0x22da('0x4e')]=function(){const _0x5e7dc6=VisuMZ[_0x22da('0x177')][_0x22da('0x123')]['General'],_0x15ae4f=SceneManager[_0x22da('0x14b')];setTimeout(_0x15ae4f[_0x22da('0x36')][_0x22da('0xbe')](_0x15ae4f),_0x5e7dc6['ShowDelayMS']);},BattleManager['processVictoryAftermathTransition']=function(){const _0xe76ef7=VisuMZ[_0x22da('0x177')][_0x22da('0x123')][_0x22da('0xe2')],_0x4984cf=SceneManager[_0x22da('0x14b')];this[_0x22da('0xd8')]=this[_0x22da('0x2a')][_0x22da('0xa0')]/(BattleManager['_victoryUpdateDuration']||0x1),Window_StatusBase[_0x22da('0xd5')][_0x22da('0xb3')](),setTimeout(_0x4984cf[_0x22da('0x18b')][_0x22da('0xbe')](_0x4984cf),_0xe76ef7[_0x22da('0x129')]),setTimeout(_0x4984cf[_0x22da('0xdd')][_0x22da('0xbe')](_0x4984cf),_0xe76ef7[_0x22da('0x111')]);},BattleManager['nextVictoryLevelUpActor']=function(){for(;;){if(_0x22da('0x25')===_0x22da('0x25')){this[_0x22da('0x181')]++;if(this[_0x22da('0x181')]>=$gameParty['maxBattleMembers']())return null;const _0x4f29e8=$gameParty[_0x22da('0x18e')]()[this[_0x22da('0x181')]],_0x4da734=this[_0x22da('0x91')][this['_victoryActorIndex']];if(_0x4f29e8[_0x22da('0x5b')]!==_0x4da734[_0x22da('0x5b')]){if(_0x22da('0x153')!==_0x22da('0x158'))return _0x4f29e8;else{function _0x3ef40e(){this[_0x22da('0x3')](...arguments);}}}}else{function _0x4065dc(){_0x4634fa[_0x22da('0x24')]()[_0x22da('0x114')](_0x1873d3[_0x22da('0x55')]());}}}return null;},VisuMZ[_0x22da('0x177')]['Game_System_initialize']=Game_System['prototype'][_0x22da('0x3')],Game_System[_0x22da('0xd5')][_0x22da('0x3')]=function(){VisuMZ['VictoryAftermath'][_0x22da('0x148')][_0x22da('0x8b')](this),this[_0x22da('0x28')]();},Game_System[_0x22da('0xd5')]['initVictoryAftermath']=function(){this[_0x22da('0x61')]={'bypassVictoryMusic':![],'bypassVictoryPhase':![],'bypassVictoryMotion':![]};},Game_System[_0x22da('0xd5')][_0x22da('0xca')]=function(){if(this[_0x22da('0x61')]===undefined)this['initVictoryAftermath']();return this['_victoryAftermathSettings'];},VisuMZ[_0x22da('0x177')]['Game_Actor_setup']=Game_Actor[_0x22da('0xd5')][_0x22da('0x7b')],Game_Actor[_0x22da('0xd5')][_0x22da('0x7b')]=function(_0x4e80e7){VisuMZ[_0x22da('0x177')]['Game_Actor_setup'][_0x22da('0x8b')](this,_0x4e80e7),this[_0x22da('0x8a')]();},Game_Actor[_0x22da('0xd5')]['setupVictoryAftermathQuotes']=function(){this[_0x22da('0x64')]=[],this[_0x22da('0x69')]=[];const _0x4eb297=this[_0x22da('0x175')]()[_0x22da('0xcd')];if(_0x4eb297[_0x22da('0x60')](/<LEVEL UP (?:QUOTE|QUOTES)>\s*([\s\S]*)\s*<\/LEVEL UP (?:QUOTE|QUOTES)>/i)){if('UkSsS'!=='mhTip')this['_victoryAftermathLevelUpQuotes']=String(RegExp['$1'])[_0x22da('0xa9')](/<NEW QUOTE>[\r\n]+/i);else{function _0x39b0ba(){return 0x1;}}}if(_0x4eb297[_0x22da('0x60')](/<NEW SKILL (?:QUOTE|QUOTES)>\s*([\s\S]*)\s*<\/NEW SKILL (?:QUOTE|QUOTES)>/i)){if('JzXLs'===_0x22da('0xc8'))this[_0x22da('0x69')]=String(RegExp['$1'])[_0x22da('0xa9')](/<NEW QUOTE>[\r\n]+/i);else{function _0x4463ab(){const _0x521866=_0x33075d['actor'](_0x34c6d5[_0x22da('0x89')]);_0x330cd9[_0x22da('0x41')](_0x521866[_0x22da('0xf')](),![]);}}}},Game_Actor[_0x22da('0xd5')][_0x22da('0xcc')]=function(){if(this[_0x22da('0x64')]===undefined)this[_0x22da('0x8a')]();return this[_0x22da('0x64')];},Game_Actor[_0x22da('0xd5')][_0x22da('0x24')]=function(){if(this[_0x22da('0x69')]===undefined)this[_0x22da('0x8a')]();return this[_0x22da('0x69')];},Game_Actor['prototype'][_0x22da('0x38')]=function(){if(this[_0x22da('0x7')]())return 0x1;const _0x3150af=this['nextLevelExp']()-this[_0x22da('0x93')](),_0x36a795=this[_0x22da('0xf')]()-this[_0x22da('0x93')]();return(_0x36a795/_0x3150af)[_0x22da('0xe5')](0x0,0x1);},VisuMZ[_0x22da('0x177')][_0x22da('0xe')]=Game_Actor[_0x22da('0xd5')]['shouldDisplayLevelUp'],Game_Actor[_0x22da('0xd5')]['shouldDisplayLevelUp']=function(){return SceneManager[_0x22da('0x96')]()?![]:VisuMZ[_0x22da('0x177')][_0x22da('0xe')][_0x22da('0x8b')](this);},Game_Actor[_0x22da('0xd5')][_0x22da('0x6c')]=function(){const _0x48f837=JsonEx[_0x22da('0x11f')](this);return _0x48f837[_0x22da('0x57')]=!![],_0x48f837;},VisuMZ[_0x22da('0x177')][_0x22da('0x115')]=Game_Actor[_0x22da('0xd5')]['isBattleMember'],Game_Actor[_0x22da('0xd5')][_0x22da('0x15f')]=function(){if(this[_0x22da('0x57')]){if(_0x22da('0x13a')===_0x22da('0x2b')){function _0x4d3750(){_0x2b219b[_0x22da('0xd5')][_0x22da('0x3')]['call'](this,_0x49f8d6),this['setBackgroundType'](0x2),this[_0x22da('0x40')]();}}else return!![];}else return VisuMZ[_0x22da('0x177')][_0x22da('0x115')][_0x22da('0x8b')](this);},VisuMZ[_0x22da('0x177')]['Game_Actor_performVictory']=Game_Actor[_0x22da('0xd5')][_0x22da('0x159')],Game_Actor[_0x22da('0xd5')][_0x22da('0x159')]=function(){if(this['isBypassVictoryAftermathMotion']())this[_0x22da('0xa3')](_0x22da('0x197'));else{if(_0x22da('0x35')!==_0x22da('0x35')){function _0x559518(){const _0xb9f416=this[_0x22da('0x16b')]()-0x2,_0x47d0c1=_0x40ed09[_0x22da('0x11')](_0xb9f416/0x2),_0x3db4aa='rgba(0,\x200,\x200,\x201)',_0x1cdbc2=_0x3bbb0e['dimColor2'](),_0x56fc3c=0x50,_0x14adb7=_0x2b5630-_0x47d0c1-_0x56fc3c;!_0x14ba1b[_0x22da('0xec')]&&(_0x42b172[_0x22da('0xec')]=new _0x73ac2f(_0x4e97e8,_0xb9f416),_0x10061a[_0x22da('0xec')][_0x22da('0x14f')]=this[_0x22da('0x13c')](),_0x1a7ea3[_0x22da('0xec')][_0x22da('0x26')](_0x47d0c1,_0x47d0c1,_0x47d0c1,_0x3db4aa),_0x1cee6b[_0x22da('0xec')][_0x22da('0x16a')](_0x47d0c1,0x0,_0xb9f416,_0xb9f416),_0x1f14fe[_0x22da('0xec')][_0x22da('0x193')](_0x47d0c1,0x0,_0x14adb7,_0xb9f416,_0x3db4aa),_0x156279[_0x22da('0xec')]['gradientFillRect'](_0x47d0c1+_0x14adb7,0x0,_0x56fc3c,_0xb9f416,_0x3db4aa,_0x1cdbc2)),this[_0x22da('0x17')][_0x22da('0x65')](_0x253587[_0x22da('0xec')],0x0,0x0,_0x4e129a,_0xb9f416,_0xf40c2,_0x170c80,_0x111c14,_0xb9f416);}}else VisuMZ[_0x22da('0x177')][_0x22da('0x185')][_0x22da('0x8b')](this);}},Game_Actor[_0x22da('0xd5')][_0x22da('0xcb')]=function(){return $gameSystem['victoryAftermathSettings']()[_0x22da('0x138')]||$gameSystem[_0x22da('0xca')]()[_0x22da('0x9b')];},Scene_Battle[_0x22da('0xd5')][_0x22da('0x18b')]=function(){this['setVisibleUI'](![]),this[_0x22da('0x109')](),this['hideSubInputWindows'](),this['_statusWindow']['y']=Graphics[_0x22da('0x52')]*0xa;},Scene_Battle[_0x22da('0xd5')][_0x22da('0xdd')]=function(){this[_0x22da('0x132')]=[],this[_0x22da('0x2')](),this['createVictoryContinueMessageWindow'](),this[_0x22da('0xd9')]();},Scene_Battle[_0x22da('0xd5')][_0x22da('0x2')]=function(){this[_0x22da('0x9d')]=[],this[_0x22da('0xcf')](),this['createVictoryStepLevelUps']();},Scene_Battle[_0x22da('0xd5')][_0x22da('0xcf')]=function(){this[_0x22da('0x9d')][_0x22da('0x114')](_0x22da('0xd'));},Scene_Battle[_0x22da('0xd5')][_0x22da('0x6a')]=function(){if(!this[_0x22da('0x122')]())return;for(const _0x266610 of $gameParty[_0x22da('0x18e')]()){if(_0x22da('0x1a4')===_0x22da('0x13')){function _0x5c0d86(){this[_0x22da('0x10f')][_0x36a419]=this[_0x22da('0x82')](_0x42df55(_0x1b3a1b));}}else{if(!_0x266610)continue;const _0x287141=BattleManager[_0x22da('0x110')][_0x266610[_0x22da('0x5a')]()];if(_0x266610['level']>_0x287141[_0x22da('0x5b')]){if('yRGQZ'!==_0x22da('0x4f'))this[_0x22da('0x13d')](_0x266610);else{function _0x9d09d8(){_0x4d3b5f=_0x121f72[_0x22da('0xf0')](_0x4092f3,_0x1a5e3f[_0x22da('0x14e')][_0x22da('0x123')][_0x22da('0xe2')]['MessageWidth']);}}}}}},Scene_Battle[_0x22da('0xd5')][_0x22da('0x13d')]=function(_0x5e5a50){Imported[_0x22da('0xb')]&&Window_VictoryLevelUp[_0x22da('0x187')]&&ImageManager[_0x22da('0x173')](_0x5e5a50[_0x22da('0x48')]()),this['_victorySteps']['push']('levelups');},Scene_Battle[_0x22da('0xd5')][_0x22da('0x122')]=function(){return VisuMZ[_0x22da('0x177')][_0x22da('0x123')][_0x22da('0x12f')][_0x22da('0x10a')];},Scene_Battle['prototype'][_0x22da('0xd9')]=function(){this[_0x22da('0xb4')]=this[_0x22da('0x9d')][_0x22da('0x55')]()||'',this['processVictoryStep']();},Scene_Battle[_0x22da('0xd5')][_0x22da('0x5e')]=function(){switch(this[_0x22da('0xb4')][_0x22da('0x179')]()[_0x22da('0x51')]()){case _0x22da('0xd'):this[_0x22da('0x102')](),this[_0x22da('0xa')][_0x22da('0xda')](BattleManager['_victoryUpdateDuration']);break;case _0x22da('0x125'):this[_0x22da('0xd2')](),this[_0x22da('0xf7')](),this[_0x22da('0xa')][_0x22da('0xda')](0x0);break;default:this[_0x22da('0x36')]();break;}this[_0x22da('0x78')](this[_0x22da('0xa')]);},Scene_Battle['prototype'][_0x22da('0x43')]=function(){const _0x4502a5=Window_Base[_0x22da('0xd5')][_0x22da('0x16b')](),_0x5c1c2d=Math[_0x22da('0x39')](Graphics[_0x22da('0x104')]/0x2)-0x64,_0x55c46e=Math[_0x22da('0x39')](Graphics[_0x22da('0x52')]-_0x4502a5*1.25),_0x4426a4=Math[_0x22da('0x39')](Graphics[_0x22da('0x104')]/0x2),_0x1699d4=_0x4502a5;return new Rectangle(_0x5c1c2d,_0x55c46e,_0x4426a4,_0x1699d4);},Scene_Battle[_0x22da('0xd5')][_0x22da('0x18d')]=function(){const _0x57cc68=0x0,_0x31457e=0x0,_0x484eeb=Graphics['width'],_0x56bb48=Graphics[_0x22da('0x52')];return new Rectangle(_0x57cc68,_0x31457e,_0x484eeb,_0x56bb48);},Scene_Battle[_0x22da('0xd5')][_0x22da('0xa1')]=function(){if(this['_victoryContinueWindow'])return;const _0x39c2b8=this[_0x22da('0x43')](),_0x35d6d1=new Window_VictoryContinueMessage(_0x39c2b8);this[_0x22da('0x78')](_0x35d6d1),this[_0x22da('0x132')][_0x22da('0x114')](_0x35d6d1),this[_0x22da('0xa')]=_0x35d6d1;},Scene_Battle[_0x22da('0xd5')][_0x22da('0x102')]=function(){if(this[_0x22da('0x1a0')])return;const _0x46dce6=this[_0x22da('0x18d')](),_0x1e8475=new Window_VictoryRewards(_0x46dce6);this[_0x22da('0x78')](_0x1e8475),this[_0x22da('0x132')][_0x22da('0x114')](_0x1e8475),this[_0x22da('0x1a0')]=_0x1e8475;},Scene_Battle[_0x22da('0xd5')]['createVictoryLevelUpWindow']=function(){if(this['_victoryLevelUpWindow'])return;const _0x30775f=this[_0x22da('0x18d')](),_0x41c296=new Window_VictoryLevelUp(_0x30775f);this['addChild'](_0x41c296),this[_0x22da('0x132')][_0x22da('0x114')](_0x41c296),this[_0x22da('0x1a2')]=_0x41c296;},Scene_Battle[_0x22da('0xd5')]['setupVictoryLevelUpNextActor']=function(){const _0x59d1bf=BattleManager[_0x22da('0x17a')]();this[_0x22da('0x1a2')]['setActor'](_0x59d1bf);},Scene_Battle['prototype'][_0x22da('0x36')]=function(){BattleManager[_0x22da('0xc9')](),BattleManager[_0x22da('0x5')]=![];};Imported['VisuMZ_1_OptionsCore']&&(VisuMZ[_0x22da('0x177')]['Scene_Battle_allowUpdateBattleAniSpeed']=Scene_Battle['prototype'][_0x22da('0x136')],Scene_Battle[_0x22da('0xd5')][_0x22da('0x136')]=function(){if(BattleManager[_0x22da('0x3a')]())return![];return VisuMZ['VictoryAftermath'][_0x22da('0x72')][_0x22da('0x8b')](this);});;Scene_Battle[_0x22da('0xd5')][_0x22da('0x198')]=function(){return this[_0x22da('0xa')]&&this[_0x22da('0xa')][_0x22da('0xbc')]();},VisuMZ[_0x22da('0x177')][_0x22da('0x15e')]=Scene_Battle[_0x22da('0xd5')][_0x22da('0xb8')],Scene_Battle[_0x22da('0xd5')][_0x22da('0xb8')]=function(){VisuMZ[_0x22da('0x177')][_0x22da('0x15e')][_0x22da('0x8b')](this),this[_0x22da('0x86')]();},Scene_Battle[_0x22da('0xd5')][_0x22da('0x86')]=function(){if(!BattleManager['isVictoryPhase']())return;if(!this[_0x22da('0x198')]())return;(Input[_0x22da('0x145')]('ok')||Input[_0x22da('0x145')](_0x22da('0x15a'))||TouchInput[_0x22da('0x145')]())&&(Input[_0x22da('0x9c')](),TouchInput[_0x22da('0x9c')](),this[_0x22da('0xd9')]());};function Sprite_VictoryGauge(){this['initialize'](...arguments);}Sprite_VictoryGauge[_0x22da('0xd5')]=Object['create'](Sprite[_0x22da('0xd5')]),Sprite_VictoryGauge[_0x22da('0xd5')][_0x22da('0x66')]=Sprite_VictoryGauge,Sprite_VictoryGauge[_0x22da('0xd5')][_0x22da('0x3')]=function(_0x3d50de,_0x140bcd,_0x108e5f){this[_0x22da('0x147')]=_0x3d50de,this[_0x22da('0x0')]=_0x140bcd,this[_0x22da('0xf9')]=_0x108e5f,Sprite[_0x22da('0xd5')][_0x22da('0x3')][_0x22da('0x8b')](this),this[_0x22da('0xac')](),this[_0x22da('0xc2')](),this['refresh'](),this[_0x22da('0x8e')]();},Sprite_VictoryGauge[_0x22da('0xd5')][_0x22da('0xac')]=function(){this[_0x22da('0xb9')]=BattleManager['_victoryUpdateDuration'],this[_0x22da('0x14c')]=this[_0x22da('0x175')]()[_0x22da('0x5b')],this[_0x22da('0xfe')]=![];},Sprite_VictoryGauge[_0x22da('0xd5')][_0x22da('0xc2')]=function(){this['bitmap']=new Bitmap(this[_0x22da('0xf9')],this[_0x22da('0x16b')]()*0x2);},Sprite_VictoryGauge[_0x22da('0xd5')][_0x22da('0x16b')]=function(){return Window_Base['prototype']['lineHeight']();},Sprite_VictoryGauge[_0x22da('0xd5')][_0x22da('0x175')]=function(){return BattleManager[_0x22da('0x110')][this[_0x22da('0x147')]];},Sprite_VictoryGauge[_0x22da('0xd5')][_0x22da('0xb8')]=function(){Sprite[_0x22da('0xd5')][_0x22da('0xb8')][_0x22da('0x8b')](this),this[_0x22da('0x30')](),this[_0x22da('0x8e')]();},Sprite_VictoryGauge[_0x22da('0xd5')][_0x22da('0x30')]=function(){if(this[_0x22da('0xb9')]<=0x0)return;const _0xcf4383=this[_0x22da('0x175')]();this[_0x22da('0xb9')]--;this[_0x22da('0x16c')]()&&(this[_0x22da('0xb9')]=0x0);if(this[_0x22da('0xb9')]<=0x0){const _0x15d9fa=$gameActors[_0x22da('0x175')](_0xcf4383[_0x22da('0x89')]);_0xcf4383[_0x22da('0x41')](_0x15d9fa[_0x22da('0xf')](),![]);}else _0xcf4383['gainTempExp'](BattleManager[_0x22da('0xd8')]);if(this[_0x22da('0x14c')]!==_0xcf4383[_0x22da('0x5b')]){if(_0x22da('0x100')==='xGppL'){function _0x3db01b(){return _0x491483[_0x22da('0xd5')][_0x22da('0x16b')]();}}else this[_0x22da('0x14c')]=_0xcf4383[_0x22da('0x5b')],this[_0x22da('0xfe')]=!![],SoundManager[_0x22da('0xa4')]();}this[_0x22da('0x40')]();},Game_Actor[_0x22da('0xd5')][_0x22da('0x54')]=function(_0x85719b){const _0x403485=this[_0x22da('0xf')]()+_0x85719b*this[_0x22da('0x5d')]();this[_0x22da('0x41')](_0x403485,this['shouldDisplayLevelUp']());},Sprite_VictoryGauge['prototype'][_0x22da('0x16c')]=function(){return SceneManager[_0x22da('0x14b')]['isVictoryContinueReady']();},Sprite_VictoryGauge[_0x22da('0xd5')][_0x22da('0x8e')]=function(){this[_0x22da('0xc0')]=this[_0x22da('0x0')][_0x22da('0x14')];},Sprite_VictoryGauge[_0x22da('0xd5')][_0x22da('0x40')]=function(){this[_0x22da('0x8d')][_0x22da('0x9c')](),this[_0x22da('0x15d')](),this[_0x22da('0x16d')](),this[_0x22da('0xb6')](),this[_0x22da('0x3c')](),this[_0x22da('0x124')]();},Sprite_VictoryGauge[_0x22da('0xd5')][_0x22da('0x15d')]=function(){this[_0x22da('0x8d')][_0x22da('0x88')]=$gameSystem[_0x22da('0x17b')](),this[_0x22da('0x8d')][_0x22da('0x23')]=$gameSystem[_0x22da('0x11c')](),this[_0x22da('0x8d')][_0x22da('0x82')]=ColorManager[_0x22da('0x4b')]();},Sprite_VictoryGauge['prototype']['drawActorName']=function(){this[_0x22da('0x15d')]();const _0x224be9=this[_0x22da('0x16b')](),_0x21dac8=Math[_0x22da('0x39')](_0x224be9/0x2),_0xeda662=0x0,_0x398439=this[_0x22da('0x8d')]['width']-_0x224be9,_0xd1c8e0=_0x22da('0x188'),_0x23ada9=this['actor']()[_0x22da('0x2f')]();this['bitmap']['drawText'](_0x23ada9,_0x21dac8,_0xeda662,_0x398439,_0x224be9,_0xd1c8e0);},Sprite_VictoryGauge['prototype'][_0x22da('0xb6')]=function(){this[_0x22da('0x15d')]();const _0x210f7f=this[_0x22da('0x16b')](),_0x3ae524=Math[_0x22da('0x39')](_0x210f7f/0x2),_0x2e8800=0x0,_0x4197ff=this[_0x22da('0x8d')][_0x22da('0x104')]-_0x210f7f,_0x246d39=_0x22da('0x163'),_0x5177bc=TextManager[_0x22da('0x150')]['format'](this[_0x22da('0x175')]()[_0x22da('0x5b')]);if(this[_0x22da('0xfe')]){if(_0x22da('0x120')===_0x22da('0xb5')){function _0x4b70de(){const _0x1b0195=_0x121a9a[_0x22da('0xd5')][_0x22da('0x16b')](),_0x2c09d6=_0x598177[_0x22da('0x39')](_0x2d3b65[_0x22da('0x104')]/0x2)-0x64,_0x287b10=_0x44c889[_0x22da('0x39')](_0x2c3212[_0x22da('0x52')]-_0x1b0195*1.25),_0x302a89=_0xf5bed1[_0x22da('0x39')](_0x4f4b9e[_0x22da('0x104')]/0x2),_0x2164b1=_0x1b0195;return new _0x4c2f22(_0x2c09d6,_0x287b10,_0x302a89,_0x2164b1);}}else this[_0x22da('0x8d')][_0x22da('0x82')]=ColorManager['powerUpColor']();}this[_0x22da('0x8d')][_0x22da('0x127')](_0x5177bc,_0x3ae524,_0x2e8800,_0x4197ff,_0x210f7f,_0x246d39);},Sprite_VictoryGauge[_0x22da('0xd5')][_0x22da('0x3c')]=function(){const _0x261d32=this['lineHeight'](),_0x11dc21=this[_0x22da('0x8d')][_0x22da('0x104')]-_0x261d32,_0x59c878=Sprite_Gauge[_0x22da('0xd5')][_0x22da('0x73')](),_0x5ed47e=Math[_0x22da('0x39')](_0x261d32/0x2),_0x51de21=_0x261d32*0x2-_0x59c878-0x2,_0x286056=Math[_0x22da('0x11')]((_0x11dc21-0x2)*this['actor']()[_0x22da('0x38')]()),_0x3242fa=_0x59c878-0x2,_0x2c342c=this[_0x22da('0xa8')](),_0x17f5aa=this[_0x22da('0xb0')](),_0x4045c2=this[_0x22da('0xc7')]();this[_0x22da('0x8d')][_0x22da('0x193')](_0x5ed47e,_0x51de21,_0x11dc21,_0x59c878,_0x2c342c),this[_0x22da('0x8d')][_0x22da('0x12d')](_0x5ed47e+0x1,_0x51de21+0x1,_0x286056,_0x3242fa,_0x17f5aa,_0x4045c2);},Sprite_VictoryGauge[_0x22da('0xd5')][_0x22da('0xa8')]=function(){return ColorManager[_0x22da('0xa8')]();},Sprite_VictoryGauge[_0x22da('0xd5')]['gaugeColor1']=function(){if(this[_0x22da('0x175')]()[_0x22da('0x7')]()){if(_0x22da('0xf5')!==_0x22da('0xf5')){function _0x2d0fff(){this['_duration']=_0x42e07a[_0x22da('0x10b')],this[_0x22da('0x14c')]=this['actor']()[_0x22da('0x5b')],this[_0x22da('0xfe')]=![];}}else return Imported[_0x22da('0xb1')]?ColorManager[_0x22da('0xd6')]():ColorManager[_0x22da('0x82')](0xe);}else return Imported[_0x22da('0xb1')]?ColorManager[_0x22da('0x154')]():ColorManager['textColor'](0x1e);},Sprite_VictoryGauge[_0x22da('0xd5')][_0x22da('0xc7')]=function(){return this[_0x22da('0x175')]()[_0x22da('0x7')]()?Imported[_0x22da('0xb1')]?ColorManager[_0x22da('0xfb')]():ColorManager[_0x22da('0x82')](0x6):Imported['VisuMZ_0_CoreEngine']?ColorManager[_0x22da('0xc4')]():ColorManager[_0x22da('0x82')](0x1f);},Sprite_VictoryGauge[_0x22da('0xd5')][_0x22da('0x124')]=function(){this['resetFontSettings']();const _0x435f19=this[_0x22da('0x16b')](),_0x46e397=_0x435f19,_0x54ee62=_0x435f19;let _0x4f853b=this[_0x22da('0x8d')][_0x22da('0x104')]-_0x435f19*0x2;const _0x100bf1=this[_0x22da('0x175')]();let _0x104728=Math[_0x22da('0x39')](_0x100bf1[_0x22da('0xf')]()-_0x100bf1[_0x22da('0x93')]()),_0x48dc70='/'+Math[_0x22da('0x39')](_0x100bf1[_0x22da('0xe7')]()-_0x100bf1[_0x22da('0x93')]());if(Imported[_0x22da('0xb1')]&&VisuMZ[_0x22da('0xf2')][_0x22da('0x123')][_0x22da('0x171')][_0x22da('0x186')]){if('FOCMt'!==_0x22da('0x182'))_0x104728=VisuMZ[_0x22da('0xaf')](_0x104728),_0x48dc70=VisuMZ[_0x22da('0xaf')](_0x48dc70);else{function _0x3627e7(){_0x43f0df=_0x51ab6f['level'];}}}this[_0x22da('0xfe')]?(this[_0x22da('0x8d')][_0x22da('0x82')]=ColorManager[_0x22da('0x2c')](),this[_0x22da('0x8d')][_0x22da('0x127')](TextManager[_0x22da('0x13f')],_0x46e397,_0x54ee62,_0x4f853b,_0x435f19,_0x22da('0x188'))):this[_0x22da('0x8d')][_0x22da('0x127')](TextManager[_0x22da('0xa0')],_0x46e397,_0x54ee62,_0x4f853b,_0x435f19,_0x22da('0x188'));this[_0x22da('0x15d')]();if(_0x100bf1[_0x22da('0x7')]()){this[_0x22da('0x8d')][_0x22da('0x127')](_0x22da('0x11b'),_0x46e397,_0x54ee62,_0x4f853b,_0x435f19,_0x22da('0x163'));return;}this[_0x22da('0x8d')][_0x22da('0x23')]-=0x8,this[_0x22da('0x8d')][_0x22da('0x82')]=ColorManager[_0x22da('0x82')](0x8),this[_0x22da('0x8d')][_0x22da('0x127')](_0x48dc70,_0x46e397,_0x54ee62,_0x4f853b,_0x435f19,_0x22da('0x163')),_0x4f853b-=this['bitmap']['measureTextWidth'](_0x48dc70),this[_0x22da('0x15d')](),this[_0x22da('0x8d')][_0x22da('0x127')](_0x104728,_0x46e397,_0x54ee62,_0x4f853b,_0x435f19,_0x22da('0x163'));};function Window_VictoryContinueMessage(){this[_0x22da('0x3')](...arguments);}Window_VictoryContinueMessage['prototype']=Object[_0x22da('0xab')](Window_Base[_0x22da('0xd5')]),Window_VictoryContinueMessage[_0x22da('0xd5')][_0x22da('0x66')]=Window_VictoryContinueMessage,Window_VictoryContinueMessage[_0x22da('0xd5')]['initialize']=function(_0x131f19){Window_Base['prototype'][_0x22da('0x3')]['call'](this,_0x131f19),this[_0x22da('0x1a3')](0x2),this[_0x22da('0x40')]();},Window_VictoryContinueMessage[_0x22da('0xd5')]['setDelayDuration']=function(_0x1a6bc6){this[_0x22da('0x113')]=_0x1a6bc6,this[_0x22da('0x14')]=0x0;},Window_VictoryContinueMessage[_0x22da('0xd5')][_0x22da('0x141')]=function(){this[_0x22da('0x9f')]=0x0;},Window_VictoryContinueMessage[_0x22da('0xd5')][_0x22da('0xb8')]=function(){Window_Base[_0x22da('0xd5')]['update'][_0x22da('0x8b')](this),this[_0x22da('0x1a')]();},Window_VictoryContinueMessage['prototype'][_0x22da('0x1a')]=function(){if(this[_0x22da('0x113')]>0x0&&this[_0x22da('0x16c')]()){if(_0x22da('0xeb')!==_0x22da('0x180'))this[_0x22da('0x113')]=0x0,Input['clear'](),TouchInput[_0x22da('0x9c')]();else{function _0x51841d(){if(this[_0x22da('0x1a2')])return;const _0x45d911=this['victoryFullScreenWindowRect'](),_0x2016b5=new _0x5a5cec(_0x45d911);this[_0x22da('0x78')](_0x2016b5),this[_0x22da('0x132')][_0x22da('0x114')](_0x2016b5),this[_0x22da('0x1a2')]=_0x2016b5;}}}if(this[_0x22da('0x113')]-->0x0)return;this[_0x22da('0x14')]+=Window_VictoryRewards[_0x22da('0x7c')];},Window_VictoryContinueMessage[_0x22da('0xd5')][_0x22da('0x16c')]=function(){return Input[_0x22da('0x4c')]('ok')||Input[_0x22da('0x4c')](_0x22da('0x15a'))||TouchInput['isPressed']();},Window_VictoryContinueMessage[_0x22da('0xd5')][_0x22da('0x40')]=function(){this[_0x22da('0x17')]['clear']();const _0x17d732=TextManager[_0x22da('0x116')];let _0x1b4570=TextManager[_0x22da('0x160')],_0x24ea02=TextManager[_0x22da('0x11e')];if(Imported[_0x22da('0xb1')]){if(_0x22da('0xd4')!=='YQZIO')_0x1b4570=TextManager['getInputButtonString']('ok'),_0x24ea02=TextManager['getInputButtonString'](_0x22da('0x15a'));else{function _0x12ebfe(){return this[_0x22da('0x57')]?!![]:_0x43f6ed[_0x22da('0x177')][_0x22da('0x115')][_0x22da('0x8b')](this);}}}const _0x1834a3=_0x17d732[_0x22da('0x98')](_0x1b4570,_0x24ea02),_0x3b2483=this[_0x22da('0x21')](_0x1834a3)['width'],_0x4bc0cb=Math[_0x22da('0x39')]((this[_0x22da('0xe6')]-_0x3b2483)/0x2);this['drawTextEx'](_0x1834a3,_0x4bc0cb,0x0,_0x3b2483);},Window_VictoryContinueMessage[_0x22da('0xd5')]['isContinueReady']=function(){return this['_delayDuration']<=0x0;};function Window_VictoryRewards(){this[_0x22da('0x3')](...arguments);}Window_VictoryRewards[_0x22da('0x7c')]=VisuMZ[_0x22da('0x177')]['Settings']['General'][_0x22da('0x12')],Window_VictoryRewards[_0x22da('0xd5')]=Object[_0x22da('0xab')](Window_StatusBase[_0x22da('0xd5')]),Window_VictoryRewards[_0x22da('0xd5')][_0x22da('0x66')]=Window_VictoryRewards,Window_VictoryRewards[_0x22da('0xd5')][_0x22da('0x3')]=function(_0x535252){Window_StatusBase[_0x22da('0xd5')][_0x22da('0x3')][_0x22da('0x8b')](this,_0x535252),this[_0x22da('0x1a3')](0x2),this['contentsOpacity']=0x0,this[_0x22da('0x40')]();},Window_VictoryRewards[_0x22da('0xd5')]['updatePadding']=function(){this[_0x22da('0x9f')]=0x0;},Window_VictoryRewards[_0x22da('0xd5')]['update']=function(){Window_StatusBase[_0x22da('0xd5')][_0x22da('0xb8')][_0x22da('0x8b')](this),this[_0x22da('0x1a')]();},Window_VictoryRewards[_0x22da('0xd5')][_0x22da('0x1a')]=function(){SceneManager[_0x22da('0x14b')]['_victoryStep']===_0x22da('0xd')?this[_0x22da('0x14')]+=Window_VictoryRewards[_0x22da('0x7c')]:this[_0x22da('0x14')]-=Window_VictoryRewards[_0x22da('0x7c')];},Window_VictoryRewards[_0x22da('0xd5')][_0x22da('0x40')]=function(){Window_StatusBase['prototype'][_0x22da('0x40')][_0x22da('0x8b')](this),this['contents'][_0x22da('0x9c')](),this[_0x22da('0x15d')](),this[_0x22da('0x84')](),this[_0x22da('0xc6')](),this[_0x22da('0xf1')](),this[_0x22da('0xe9')](),this[_0x22da('0x76')]();},Window_VictoryRewards[_0x22da('0xd5')][_0x22da('0x84')]=function(){const _0x3e5c0b=this[_0x22da('0x16b')](),_0x438175=0x0,_0x4f4ae1=_0x3e5c0b*2.5,_0x3319a5='rgba(0,\x200,\x200,\x200.8)',_0x5d7b27='rgba(0,\x200,\x200,\x200.4)',_0x2d9192=ColorManager[_0x22da('0x4b')]();this['contents'][_0x22da('0x12d')](_0x438175,_0x4f4ae1,this[_0x22da('0x104')],this[_0x22da('0x52')]-_0x4f4ae1-_0x3e5c0b*1.5,_0x3319a5,_0x5d7b27),this['contents'][_0x22da('0x193')](0x0,_0x4f4ae1-0x1,this[_0x22da('0x104')],0x2,_0x2d9192),this[_0x22da('0x17')][_0x22da('0x193')](0x0,this[_0x22da('0x52')]-_0x3e5c0b*1.5-0x1,this['width'],0x2,_0x2d9192);const _0x5ef386=0x64,_0x550255=_0x4f4ae1-_0x3e5c0b*0.75,_0x20400b=TextManager[_0x22da('0x19b')];this[_0x22da('0x45')](),this[_0x22da('0x45')](),this[_0x22da('0x127')](_0x20400b,_0x5ef386,_0x550255,this[_0x22da('0x104')]);},Window_VictoryRewards[_0x22da('0xd5')][_0x22da('0xc6')]=function(){this[_0x22da('0x15d')]();const _0xd8e909=this[_0x22da('0x16b')](),_0x43ba1e=Math[_0x22da('0x11')](_0xd8e909/0x2),_0x1f5ecb=0x64,_0x200227=Math[_0x22da('0x39')](_0xd8e909*3.5),_0x3a928b=Math[_0x22da('0x39')](this[_0x22da('0x104')]/0x2-0x8c),_0x57ad46=_0x3a928b-_0x43ba1e-0x50;let _0x2de9e3=_0x200227;this[_0x22da('0xf8')](_0x1f5ecb,_0x2de9e3,_0x3a928b),this[_0x22da('0x19e')](ColorManager['systemColor']()),this[_0x22da('0x127')](TextManager['exp'],_0x1f5ecb+_0x43ba1e,_0x2de9e3,_0x57ad46),this[_0x22da('0x19e')](ColorManager[_0x22da('0x4b')]()),this['drawText'](BattleManager[_0x22da('0x2a')][_0x22da('0xa0')],_0x1f5ecb+_0x43ba1e,_0x2de9e3,_0x57ad46,_0x22da('0x163')),_0x2de9e3+=_0xd8e909,this[_0x22da('0xf8')](_0x1f5ecb,_0x2de9e3,_0x3a928b),this[_0x22da('0x19e')](ColorManager[_0x22da('0x15c')]()),this['drawText'](TextManager['currencyUnit'],_0x1f5ecb+_0x43ba1e,_0x2de9e3,_0x57ad46),this['changeTextColor'](ColorManager[_0x22da('0x4b')]()),this[_0x22da('0x127')](BattleManager['_rewards'][_0x22da('0x119')],_0x1f5ecb+_0x43ba1e,_0x2de9e3,_0x57ad46,_0x22da('0x163')),_0x2de9e3+=_0xd8e909;},Window_VictoryRewards[_0x22da('0xd5')][_0x22da('0xf8')]=function(_0x56d264,_0x104c9b,_0x265238){const _0x2d5f5a=this['lineHeight']()-0x2,_0x668894=Math['floor'](_0x2d5f5a/0x2),_0x3c7970=_0x22da('0x131'),_0xfbff12=ColorManager[_0x22da('0x16e')](),_0x3b0037=0x50,_0x508d14=_0x265238-_0x668894-_0x3b0037;if(!ImageManager[_0x22da('0xec')]){if(_0x22da('0x117')!==_0x22da('0x117')){function _0x4b57c6(){_0x3166de[_0x22da('0x9c')](),_0x264015[_0x22da('0x9c')](),this[_0x22da('0xd9')]();}}else ImageManager[_0x22da('0xec')]=new Bitmap(_0x265238,_0x2d5f5a),ImageManager[_0x22da('0xec')][_0x22da('0x14f')]=this['translucentOpacity'](),ImageManager['victoryRewardBitmap']['drawCircle'](_0x668894,_0x668894,_0x668894,_0x3c7970),ImageManager[_0x22da('0xec')][_0x22da('0x16a')](_0x668894,0x0,_0x2d5f5a,_0x2d5f5a),ImageManager[_0x22da('0xec')][_0x22da('0x193')](_0x668894,0x0,_0x508d14,_0x2d5f5a,_0x3c7970),ImageManager[_0x22da('0xec')]['gradientFillRect'](_0x668894+_0x508d14,0x0,_0x3b0037,_0x2d5f5a,_0x3c7970,_0xfbff12);}this['contents'][_0x22da('0x65')](ImageManager['victoryRewardBitmap'],0x0,0x0,_0x265238,_0x2d5f5a,_0x56d264,_0x104c9b,_0x265238,_0x2d5f5a);},Window_VictoryRewards[_0x22da('0xd5')][_0x22da('0xf1')]=function(){this[_0x22da('0x15d')]();if(BattleManager[_0x22da('0x2a')][_0x22da('0x162')][_0x22da('0x155')]<=0x0)return;const _0x532d83=this[_0x22da('0x16b')](),_0x228f93=Math[_0x22da('0x39')](this[_0x22da('0x104')]/0x2+0x28),_0x555cfa=Math[_0x22da('0x39')](_0x532d83*0x3),_0x283e08=Math[_0x22da('0x39')](this['width']/0x2-0x8c),_0x440a9d=TextManager[_0x22da('0x14a')],_0xa0b89f=ColorManager[_0x22da('0x4b')]();this[_0x22da('0x45')](),this[_0x22da('0x127')](_0x440a9d,_0x228f93,_0x555cfa,_0x283e08,_0x22da('0x188'));const _0x4908a1=Math[_0x22da('0x39')](this[_0x22da('0x104')]/0x2),_0x3749bc=_0x555cfa+_0x532d83*1.5,_0x9ee267=Math[_0x22da('0x39')](this[_0x22da('0x104')]/0x2)-0x64;this[_0x22da('0x17')][_0x22da('0x193')](_0x4908a1,_0x3749bc,_0x9ee267,0x2,_0xa0b89f);},Window_VictoryRewards[_0x22da('0xd5')][_0x22da('0xe9')]=function(){const _0x564c00=this['lineHeight'](),_0x17b9aa=Math[_0x22da('0x39')](this[_0x22da('0x104')]/0x2+0x28),_0x16a12d=Math['round'](_0x564c00*0x5),_0x454aa4=Math[_0x22da('0x39')](this['width']/0x2-0x8c),_0x1f7bf6=this[_0x22da('0x52')]-_0x16a12d-_0x564c00*0x2,_0x5df6a5=new Rectangle(_0x17b9aa,_0x16a12d,_0x454aa4,_0x1f7bf6);this[_0x22da('0x18c')]=new Window_VictoryItem(_0x5df6a5,this),this[_0x22da('0x78')](this[_0x22da('0x18c')]);},Window_VictoryRewards['prototype']['drawPartyExpGauges']=function(){this[_0x22da('0x15d')]();const _0x3b3945=this['lineHeight'](),_0x3506fa=$gameParty[_0x22da('0x6e')](),_0x105f70=0x64,_0x1bc360=this[_0x22da('0x52')]-1.5-_0x3b3945*0x2*(_0x3506fa+0x1),_0x35a5e7=Math[_0x22da('0x39')](this[_0x22da('0x104')]/0x2-0x8c);let _0x7f1bc1=_0x1bc360;for(let _0x518508=0x0;_0x518508<_0x3506fa;_0x518508++){if(!$gameParty[_0x22da('0x4d')]()[_0x518508])continue;this[_0x22da('0x80')](_0x105f70,_0x7f1bc1,_0x35a5e7),this['placeActorGauges'](_0x518508,_0x105f70,_0x7f1bc1,_0x35a5e7),_0x7f1bc1+=_0x3b3945*0x2;}},Window_VictoryRewards[_0x22da('0xd5')][_0x22da('0x80')]=function(_0x43f0d0,_0x3e02a4,_0x556e49){const _0xd160c=this['lineHeight']()-0x2,_0x5c8d77=Math[_0x22da('0x11')](_0xd160c/0x2),_0x48df39=_0x22da('0x131'),_0x137221=ColorManager[_0x22da('0x16e')](),_0x3ac4d4=_0x556e49-_0xd160c;!ImageManager[_0x22da('0x10c')]&&(ImageManager[_0x22da('0x10c')]=new Bitmap(_0x556e49,_0xd160c),ImageManager[_0x22da('0x10c')][_0x22da('0x14f')]=this[_0x22da('0x13c')](),ImageManager[_0x22da('0x10c')][_0x22da('0x26')](_0x5c8d77,_0x5c8d77,_0x5c8d77,_0x48df39),ImageManager[_0x22da('0x10c')][_0x22da('0x26')](_0x5c8d77+_0x3ac4d4,_0x5c8d77,_0x5c8d77,_0x48df39),ImageManager[_0x22da('0x10c')][_0x22da('0x16a')](_0x5c8d77,0x0,_0x3ac4d4,_0xd160c),ImageManager[_0x22da('0x10c')]['fillRect'](_0x5c8d77,0x0,_0x3ac4d4,_0xd160c,_0x48df39)),this[_0x22da('0x17')][_0x22da('0x65')](ImageManager[_0x22da('0x10c')],0x0,0x0,_0x556e49,_0xd160c,_0x43f0d0,_0x3e02a4,_0x556e49,_0xd160c);},Window_VictoryRewards[_0x22da('0xd5')]['placeActorGauges']=function(_0x372402,_0x2de6a0,_0x298456,_0x4dfb82){const _0x4c589c=_0x22da('0xde')['format'](_0x372402),_0x56f33f=this[_0x22da('0x46')](_0x4c589c,_0x372402,_0x4dfb82);_0x56f33f[_0x22da('0x15b')](_0x2de6a0,_0x298456),_0x56f33f['show']();},Window_VictoryRewards[_0x22da('0xd5')][_0x22da('0x46')]=function(_0x380961,_0x2a773a,_0x55f44b){const _0x4f3fd6=this[_0x22da('0x156')];if(_0x4f3fd6[_0x380961])return _0x4f3fd6[_0x380961];else{if(_0x22da('0x1c')!==_0x22da('0x67')){const _0x71b4f4=new Sprite_VictoryGauge(_0x2a773a,this,_0x55f44b);return _0x4f3fd6[_0x380961]=_0x71b4f4,this[_0x22da('0xfa')](_0x71b4f4),_0x71b4f4;}else{function _0x5541c8(){if(this[_0x22da('0x61')]===_0x100bb8)this['initVictoryAftermath']();return this[_0x22da('0x61')];}}}};function Window_VictoryItem(){this['initialize'](...arguments);}Window_VictoryItem[_0x22da('0xd5')]=Object['create'](Window_ItemList[_0x22da('0xd5')]),Window_VictoryItem[_0x22da('0xd5')][_0x22da('0x66')]=Window_VictoryItem,Window_VictoryItem[_0x22da('0xd5')][_0x22da('0x3')]=function(_0x435e9a,_0x3d40ba){this[_0x22da('0x0')]=_0x3d40ba,Window_ItemList[_0x22da('0xd5')][_0x22da('0x3')][_0x22da('0x8b')](this,_0x435e9a),this[_0x22da('0x1a3')](0x2),this[_0x22da('0x40')](),this[_0x22da('0x1a')]();if(this[_0x22da('0x10d')][_0x22da('0x155')]>this[_0x22da('0xdf')]()){if(_0x22da('0xa2')!=='tdyDM'){function _0x54353e(){while(_0x37f173[_0x22da('0x24')]()[_0x22da('0x155')]>0x0){_0x2670c8[_0x22da('0x24')]()[_0x22da('0x55')]();}}}else this[_0x22da('0x18a')](),this['select'](0x0);}},Window_VictoryItem['prototype'][_0x22da('0x1a1')]=function(){return Window_Base[_0x22da('0xd5')][_0x22da('0x1a1')]['call'](this);},Window_VictoryItem[_0x22da('0xd5')]['updatePadding']=function(){this[_0x22da('0x9f')]=0x0;},Window_VictoryItem[_0x22da('0xd5')]['maxCols']=function(){return 0x1;},Window_VictoryItem[_0x22da('0xd5')]['colSpacing']=function(){return 0x0;},Window_VictoryItem[_0x22da('0xd5')]['update']=function(){Window_ItemList[_0x22da('0xd5')]['update'][_0x22da('0x8b')](this),this[_0x22da('0x1a')]();},Window_VictoryItem[_0x22da('0xd5')][_0x22da('0x1a')]=function(){this[_0x22da('0x14')]=this[_0x22da('0x0')]['contentsOpacity'];},Window_VictoryItem[_0x22da('0xd5')][_0x22da('0x8c')]=function(){const _0x3ca00a=BattleManager[_0x22da('0x2a')][_0x22da('0x162')];_0x3ca00a[_0x22da('0x79')]((_0x28daf4,_0x40ce16)=>_0x28daf4['id']-_0x40ce16['id']);const _0x17e86e=_0x3ca00a[_0x22da('0x16')](_0x4221dd=>DataManager[_0x22da('0x139')](_0x4221dd)),_0xd1d1e3=_0x3ca00a[_0x22da('0x16')](_0x5e387b=>DataManager[_0x22da('0x151')](_0x5e387b)),_0x558dd1=_0x3ca00a[_0x22da('0x16')](_0x5233f7=>DataManager['isArmor'](_0x5233f7));this[_0x22da('0x10d')]=_0x17e86e['concat'](_0xd1d1e3)['concat'](_0x558dd1),this[_0x22da('0x10d')]=this[_0x22da('0x10d')][_0x22da('0x16')]((_0x3345c2,_0x3fd1f0,_0x4c9486)=>_0x4c9486[_0x22da('0xb2')](_0x3345c2)===_0x3fd1f0);},Window_VictoryItem[_0x22da('0xd5')][_0x22da('0x103')]=function(_0x1a3d45){return!![];},Window_VictoryItem['prototype'][_0x22da('0x149')]=function(){return![];},Window_VictoryItem['prototype'][_0x22da('0xf3')]=function(_0x1bbdb7){return BattleManager[_0x22da('0x2a')][_0x22da('0x162')][_0x22da('0x16')](_0x61e98e=>_0x61e98e===_0x1bbdb7)['length'];},Window_VictoryItem[_0x22da('0xd5')][_0x22da('0x195')]=function(_0x4726e0){},Window_VictoryItem[_0x22da('0xd5')][_0x22da('0xff')]=function(_0x55ef71,_0x5d6cc2,_0x2f1d72,_0x191aa7){let _0x5d72ac='x%1';Imported[_0x22da('0x7a')]&&(_0x5d72ac=VisuMZ[_0x22da('0x1a5')][_0x22da('0x123')][_0x22da('0x50')][_0x22da('0x192')]);let _0x20bf8f=_0x5d72ac['format'](this[_0x22da('0xf3')](_0x55ef71));this[_0x22da('0x127')](_0x20bf8f,_0x5d6cc2,_0x2f1d72,_0x191aa7,'right');};function Window_VictoryLevelUp(){this[_0x22da('0x3')](...arguments);}Window_VictoryLevelUp[_0x22da('0x7c')]=Window_VictoryRewards['_opacitySpeed'],Window_VictoryLevelUp[_0x22da('0x187')]=VisuMZ[_0x22da('0x177')][_0x22da('0x123')]['LevelUp'][_0x22da('0x68')],Window_VictoryLevelUp[_0x22da('0xd5')]=Object[_0x22da('0xab')](Window_StatusBase['prototype']),Window_VictoryLevelUp[_0x22da('0xd5')][_0x22da('0x66')]=Window_VictoryLevelUp,Window_VictoryLevelUp[_0x22da('0xd5')]['initialize']=function(_0x448783){Window_StatusBase['prototype']['initialize'][_0x22da('0x8b')](this,_0x448783),this['setBackgroundType'](0x2),this[_0x22da('0x14')]=0x0,this[_0x22da('0x40')](),this[_0x22da('0x13e')](),this[_0x22da('0x1f')]();},Window_VictoryLevelUp[_0x22da('0xd5')][_0x22da('0x141')]=function(){this[_0x22da('0x9f')]=0x0;},Window_VictoryLevelUp[_0x22da('0xd5')][_0x22da('0xb8')]=function(){Window_StatusBase[_0x22da('0xd5')][_0x22da('0xb8')][_0x22da('0x8b')](this),this[_0x22da('0x1a')]();},Window_VictoryLevelUp[_0x22da('0xd5')][_0x22da('0x1a')]=function(){if(SceneManager[_0x22da('0x14b')][_0x22da('0xb4')]===_0x22da('0x125')){if(_0x22da('0xae')!==_0x22da('0xae')){function _0x18e4b1(){_0x3a8ee2=_0x15866e||this['lineHeight'](),this[_0x22da('0x17')][_0x22da('0x14f')]=0xa0;const _0x1b95dc=_0x5ab9c9[_0x22da('0x133')]();this[_0x22da('0x17')][_0x22da('0x193')](_0x40af6e+0x1,_0x25c791+0x1,_0x28a871-0x2,_0x5bd5a1-0x2,_0x1b95dc),this[_0x22da('0x17')][_0x22da('0x14f')]=0xff;}}else this[_0x22da('0x14')]+=Window_VictoryLevelUp[_0x22da('0x7c')];}else this['contentsOpacity']-=Window_VictoryLevelUp[_0x22da('0x7c')];this[_0x22da('0x18f')]&&(this[_0x22da('0x18f')][_0x22da('0xc0')]=this['contentsOpacity']);},Window_VictoryLevelUp[_0x22da('0xd5')][_0x22da('0x40')]=function(){Window_StatusBase[_0x22da('0xd5')][_0x22da('0x40')][_0x22da('0x8b')](this),this[_0x22da('0x17')][_0x22da('0x9c')](),this[_0x22da('0x15d')](),this[_0x22da('0x84')]();},Window_VictoryLevelUp[_0x22da('0xd5')][_0x22da('0x84')]=function(){const _0x2a55b8=this['lineHeight'](),_0x2eec64=_0x22da('0xbb'),_0x3d7a94=_0x22da('0x1d'),_0xdc0958=ColorManager[_0x22da('0x4b')](),_0x3e6159=SceneManager[_0x22da('0x14b')]['_victoryContinueWindow']['x'],_0x39c4ad=Math[_0x22da('0x39')](this[_0x22da('0x104')]/0x2);this[_0x22da('0x17')][_0x22da('0x12d')](_0x3e6159,0x0,_0x39c4ad,this[_0x22da('0x52')],_0x3d7a94,_0x2eec64,!![]),this[_0x22da('0x17')][_0x22da('0x193')](_0x3e6159-0x1,0x0,0x2,this[_0x22da('0x52')],_0xdc0958),this[_0x22da('0x17')][_0x22da('0x193')](_0x3e6159+_0x39c4ad-0x1,0x0,0x2,this['height'],_0xdc0958);const _0x52427b=_0x2a55b8,_0x42ebc5=_0x2a55b8*0x1;this[_0x22da('0x17')]['gradientFillRect'](0x0,_0x52427b,this[_0x22da('0x104')],_0x42ebc5,_0x2eec64,_0x3d7a94),this[_0x22da('0x17')][_0x22da('0x193')](0x0,_0x52427b-0x1,this['width'],0x2,_0xdc0958),this[_0x22da('0x17')][_0x22da('0x193')](0x0,_0x52427b+_0x42ebc5-0x1,this[_0x22da('0x104')],0x2,_0xdc0958);const _0x51abde=this[_0x22da('0x52')]-_0x2a55b8*5.5,_0x29141b=_0x2a55b8*0x4;this['contents'][_0x22da('0x12d')](0x0,_0x51abde,this[_0x22da('0x104')],_0x29141b,_0x2eec64,_0x3d7a94),this[_0x22da('0x17')][_0x22da('0x12d')](0x0,_0x51abde,this[_0x22da('0x104')],_0x29141b,_0x3d7a94,_0x2eec64),this[_0x22da('0x17')][_0x22da('0x193')](0x0,_0x51abde-0x2,this[_0x22da('0x104')],0x2,_0xdc0958),this[_0x22da('0x17')][_0x22da('0x193')](0x0,_0x51abde+_0x29141b,this[_0x22da('0x104')],0x2,_0xdc0958);},Window_VictoryLevelUp[_0x22da('0xd5')][_0x22da('0x13e')]=function(){const _0x32f819=VisuMZ[_0x22da('0x177')][_0x22da('0x123')][_0x22da('0x12f')];this['_actorSprite']=new Sprite(),this[_0x22da('0x18f')][_0x22da('0x94')]['x']=0.5,this[_0x22da('0x18f')][_0x22da('0x94')]['y']=0x1,this[_0x22da('0x18f')][_0x22da('0xc0')]=0x0,this[_0x22da('0x18f')]['x']=Math[_0x22da('0x39')](eval(_0x32f819['BustPosX'])),this[_0x22da('0x18f')]['y']=Math[_0x22da('0x39')](eval(_0x32f819[_0x22da('0x19')])),this['_actorSprite'][_0x22da('0x168')]['x']=_0x32f819[_0x22da('0x8f')],this[_0x22da('0x18f')][_0x22da('0x168')]['y']=_0x32f819[_0x22da('0x8f')],this[_0x22da('0x5c')](this[_0x22da('0x18f')]);},Window_VictoryLevelUp[_0x22da('0xd5')][_0x22da('0x1f')]=function(){const _0x56860b=new Rectangle(0x0,0x0,this[_0x22da('0x104')],this['height']);this[_0x22da('0x99')]=new Window_VictoryLevelUpActor(_0x56860b,this),this[_0x22da('0x78')](this[_0x22da('0x99')]);},Window_VictoryLevelUp[_0x22da('0xd5')][_0x22da('0xee')]=function(_0x30467a){if(Imported[_0x22da('0xb')]&&Window_VictoryLevelUp[_0x22da('0x187')]){if(_0x22da('0x22')===_0x22da('0x22'))this[_0x22da('0x18f')][_0x22da('0x8d')]=ImageManager[_0x22da('0x173')](_0x30467a[_0x22da('0x48')]());else{function _0x2c9c53(){this[_0x22da('0xc')]={'name':_0x19c816[_0x22da('0x177')]['Settings']['Vocab'][_0x22da('0x42')]||'','volume':0x5a,'pitch':0x64,'pan':0x0};}}}SoundManager[_0x22da('0xa4')](),this[_0x22da('0x99')]['setActor'](_0x30467a);};function Window_VictoryLevelUpActor(){this[_0x22da('0x3')](...arguments);}Window_VictoryLevelUpActor[_0x22da('0x7c')]=Window_VictoryRewards[_0x22da('0x7c')],Window_VictoryLevelUpActor[_0x22da('0x49')]=VisuMZ[_0x22da('0x177')]['Settings']['LevelUp'][_0x22da('0x176')],Window_VictoryLevelUpActor[_0x22da('0x135')]=VisuMZ['VictoryAftermath'][_0x22da('0x123')][_0x22da('0x12f')][_0x22da('0xc1')],Window_VictoryLevelUpActor[_0x22da('0xd5')]=Object[_0x22da('0xab')](Window_StatusBase[_0x22da('0xd5')]),Window_VictoryLevelUpActor[_0x22da('0xd5')][_0x22da('0x66')]=Window_VictoryLevelUpActor,Window_VictoryLevelUpActor[_0x22da('0xd5')]['initialize']=function(_0x426c4d,_0x48ea60){this['_mainWindow']=_0x48ea60,Window_StatusBase[_0x22da('0xd5')][_0x22da('0x3')][_0x22da('0x8b')](this,_0x426c4d),this[_0x22da('0x1a3')](0x2),this['contentsOpacity']=0x0,this[_0x22da('0x95')]=null,this[_0x22da('0x40')]();},Window_VictoryLevelUpActor[_0x22da('0xd5')][_0x22da('0x141')]=function(){this[_0x22da('0x9f')]=0x0;},Window_VictoryLevelUpActor[_0x22da('0xd5')][_0x22da('0xb8')]=function(){Window_StatusBase[_0x22da('0xd5')][_0x22da('0xb8')]['call'](this),this['updateContentsOpacity']();},Window_VictoryLevelUpActor[_0x22da('0xd5')][_0x22da('0x1a')]=function(){this[_0x22da('0x14')]=this[_0x22da('0x0')][_0x22da('0x14')];},Window_VictoryLevelUpActor[_0x22da('0xd5')]['setActor']=function(_0x268cb7){this[_0x22da('0x95')]=_0x268cb7,this['refresh']();},Window_VictoryLevelUpActor[_0x22da('0xd5')][_0x22da('0x9a')]=function(){const _0x4b7fe2=this[_0x22da('0x95')][_0x22da('0x5a')]();return BattleManager[_0x22da('0x91')][_0x4b7fe2];},Window_VictoryLevelUpActor['prototype']['afterActor']=function(){const _0x239fae=this['_actor'][_0x22da('0x5a')]();return BattleManager[_0x22da('0x110')][_0x239fae];},Window_VictoryLevelUpActor[_0x22da('0xd5')]['refresh']=function(){Window_StatusBase[_0x22da('0xd5')]['refresh']['call'](this),this['contents'][_0x22da('0x9c')](),this[_0x22da('0x15d')]();if(!this[_0x22da('0x95')])return;this[_0x22da('0x62')](),this['drawParamChanges'](),this[_0x22da('0x106')](),this[_0x22da('0xbd')]();},Window_VictoryLevelUpActor[_0x22da('0xd5')][_0x22da('0x62')]=function(){const _0x101574=this[_0x22da('0x16b')](),_0x45f16d=TextManager[_0x22da('0x12c')][_0x22da('0x98')](this[_0x22da('0x95')]['name'](),TextManager[_0x22da('0x5b')],this[_0x22da('0x95')][_0x22da('0x5b')]),_0x77dd18=this[_0x22da('0x21')](_0x45f16d)['width'],_0x2dd888=SceneManager[_0x22da('0x14b')][_0x22da('0xa')]['x']+Math[_0x22da('0x39')]((this[_0x22da('0x104')]/0x2-_0x77dd18)/0x2),_0x352de7=_0x101574;this[_0x22da('0x75')](_0x45f16d,_0x2dd888,_0x352de7,_0x77dd18);},Window_VictoryLevelUpActor[_0x22da('0xd5')][_0x22da('0x7f')]=function(_0x322476,_0x2eee55,_0x696d40,_0x3d9709,_0x58b7df){if(VisuMZ['VictoryAftermath'][_0x22da('0x123')][_0x22da('0x12f')][_0x22da('0x87')]===![])return;_0x58b7df=Math[_0x22da('0xf4')](_0x58b7df||0x1,0x1);while(_0x58b7df--){if(_0x22da('0x3f')!==_0x22da('0x58')){_0x3d9709=_0x3d9709||this[_0x22da('0x16b')](),this['contents'][_0x22da('0x14f')]=0xa0;const _0x3f1c2a=ColorManager[_0x22da('0x133')]();this[_0x22da('0x17')][_0x22da('0x193')](_0x322476+0x1,_0x2eee55+0x1,_0x696d40-0x2,_0x3d9709-0x2,_0x3f1c2a),this[_0x22da('0x17')][_0x22da('0x14f')]=0xff;}else{function _0xdf2a2b(){if(this[_0x22da('0x1a0')])return;const _0x47de5e=this[_0x22da('0x18d')](),_0x35c759=new _0x3f0612(_0x47de5e);this[_0x22da('0x78')](_0x35c759),this[_0x22da('0x132')][_0x22da('0x114')](_0x35c759),this[_0x22da('0x1a0')]=_0x35c759;}}}},ColorManager[_0x22da('0x133')]=function(){const _0x1ead85=VisuMZ[_0x22da('0x177')]['Settings'][_0x22da('0x12f')];let _0x2a5ac7=_0x1ead85['BackRectColor']!==undefined?_0x1ead85[_0x22da('0x5f')]:0x13;return ColorManager['getColor'](_0x2a5ac7);},Window_VictoryLevelUpActor[_0x22da('0xd5')][_0x22da('0x71')]=function(){const _0x158c44=this[_0x22da('0x16b')](),_0x3ff4db='→',_0x653233=this[_0x22da('0x56')](),_0x429ccd=_0x158c44*0x2,_0x55ef81=this['height']-_0x158c44*5.5,_0x96b415=this[_0x22da('0x53')](_0x3ff4db)+this['itemPadding']()*0x2,_0x4e2047=Window_VictoryLevelUpActor[_0x22da('0x49')]?0x4:0x3,_0x10f8c9=Math[_0x22da('0x39')]((this[_0x22da('0x104')]/0x2-_0x96b415-this[_0x22da('0x17f')]()*0x2)/_0x4e2047),_0x5a336b=_0x55ef81-_0x429ccd,_0x36deac=SceneManager[_0x22da('0x14b')][_0x22da('0xa')]['x']+this[_0x22da('0x17f')](),_0x40c6ea=_0x36deac+_0x10f8c9,_0x287e2e=_0x40c6ea+_0x10f8c9,_0x4347f9=_0x287e2e+_0x96b415,_0x25cbfb=_0x4347f9+_0x10f8c9;let _0x23d978=Math[_0x22da('0x39')](_0x429ccd+(_0x5a336b-(_0x653233[_0x22da('0x155')]+0x1)*_0x158c44)/0x2),_0x166fc3=0x2;this[_0x22da('0x15d')]();VisuMZ['ItemsEquipsCore']&&(this[_0x22da('0x17')][_0x22da('0x23')]=Window_EquipStatus[_0x22da('0xd5')][_0x22da('0x59')]());this['drawItemDarkRect'](_0x36deac,_0x23d978,_0x10f8c9,_0x158c44,_0x166fc3),this[_0x22da('0xaa')](_0x22da('0x5b'),_0x36deac,_0x23d978,_0x10f8c9),this[_0x22da('0x7f')](_0x40c6ea,_0x23d978,_0x10f8c9,_0x158c44,_0x166fc3),this[_0x22da('0x194')](_0x22da('0x5b'),_0x40c6ea,_0x23d978,_0x10f8c9),this[_0x22da('0x7f')](_0x287e2e,_0x23d978,_0x96b415,_0x158c44,_0x166fc3),this[_0x22da('0x19e')](ColorManager['systemColor']()),this[_0x22da('0x127')](_0x3ff4db,_0x287e2e,_0x23d978,_0x96b415,'center'),this[_0x22da('0x7f')](_0x4347f9,_0x23d978,_0x10f8c9,_0x158c44,_0x166fc3),this[_0x22da('0x157')](_0x22da('0x5b'),_0x4347f9,_0x23d978,_0x10f8c9);if(Window_VictoryLevelUpActor[_0x22da('0x49')]){if(_0x22da('0x70')===_0x22da('0x9')){function _0x20f58b(){this[_0x22da('0x17')]['fontSize']=_0x411dc1[_0x22da('0xd5')][_0x22da('0x59')]();}}else this['drawItemDarkRect'](_0x25cbfb,_0x23d978,_0x10f8c9,_0x158c44,_0x166fc3),this[_0x22da('0x128')](_0x22da('0x5b'),_0x25cbfb,_0x23d978,_0x10f8c9);}_0x23d978+=_0x158c44,_0x166fc3=_0x166fc3===0x2?0x1:0x2;for(const _0x240e2b of _0x653233){if(_0x22da('0x164')===_0x22da('0x2e')){function _0x15d923(){this[_0x22da('0x19e')](_0x5b708b[_0x22da('0x15c')]());let _0x148ebe='';_0x3f0b95===_0x22da('0x5b')?_0x148ebe=_0x5e6a6f[_0x22da('0x5b')]:_0x148ebe=_0x13fe9d[_0x22da('0x19d')](_0x56938b),this['drawText'](_0x148ebe,_0x4e336a+this['itemPadding'](),_0x56e9d3,_0x2d0140-this[_0x22da('0x17f')]()*0x2);}}else this[_0x22da('0x15d')](),VisuMZ['ItemsEquipsCore']&&(this[_0x22da('0x17')][_0x22da('0x23')]=Window_EquipStatus[_0x22da('0xd5')][_0x22da('0x59')]()),this[_0x22da('0x7f')](_0x36deac,_0x23d978,_0x10f8c9,_0x158c44,_0x166fc3),this[_0x22da('0xaa')](_0x240e2b,_0x36deac,_0x23d978,_0x10f8c9),this['drawItemDarkRect'](_0x40c6ea,_0x23d978,_0x10f8c9,_0x158c44,_0x166fc3),this[_0x22da('0x194')](_0x240e2b,_0x40c6ea,_0x23d978,_0x10f8c9),this[_0x22da('0x7f')](_0x287e2e,_0x23d978,_0x96b415,_0x158c44,_0x166fc3),this[_0x22da('0x19e')](ColorManager[_0x22da('0x15c')]()),this['drawText'](_0x3ff4db,_0x287e2e,_0x23d978,_0x96b415,_0x22da('0xed')),this[_0x22da('0x7f')](_0x4347f9,_0x23d978,_0x10f8c9,_0x158c44,_0x166fc3),this[_0x22da('0x157')](_0x240e2b,_0x4347f9,_0x23d978,_0x10f8c9),Window_VictoryLevelUpActor[_0x22da('0x49')]&&(this['drawItemDarkRect'](_0x25cbfb,_0x23d978,_0x10f8c9,_0x158c44,_0x166fc3),this['drawParamDiffValue'](_0x240e2b,_0x25cbfb,_0x23d978,_0x10f8c9)),_0x23d978+=_0x158c44,_0x166fc3=_0x166fc3===0x2?0x1:0x2;}},Window_VictoryLevelUpActor[_0x22da('0xd5')]['actorParams']=function(){if(Imported['VisuMZ_0_CoreEngine']){if('KpLjS'===_0x22da('0x112'))return VisuMZ[_0x22da('0xf2')][_0x22da('0x123')][_0x22da('0x172')][_0x22da('0xd3')];else{function _0x179409(){return _0x2d7891['_scene']['isVictoryContinueReady']();}}}else return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_VictoryLevelUpActor[_0x22da('0xd5')]['drawParamName']=function(_0x393ad8,_0x387d32,_0x31068f,_0x459d5f){this[_0x22da('0x19e')](ColorManager[_0x22da('0x15c')]());let _0x297b3f='';if(_0x393ad8===_0x22da('0x5b')){if(_0x22da('0x85')!=='huVHO'){function _0xac7a9d(){_0x497068[_0x22da('0x173')](_0x1124b2[_0x22da('0x48')]());}}else _0x297b3f=TextManager[_0x22da('0x5b')];}else{if(_0x22da('0x6d')!=='TTRer')_0x297b3f=TextManager['param'](_0x393ad8);else{function _0x452ae7(){return _0x5d6d6f[_0x22da('0x177')][_0x22da('0x123')]['LevelUp'][_0x22da('0x10a')];}}}this[_0x22da('0x127')](_0x297b3f,_0x387d32+this[_0x22da('0x17f')](),_0x31068f,_0x459d5f-this[_0x22da('0x17f')]()*0x2);},Window_VictoryLevelUpActor[_0x22da('0xd5')]['drawParamBeforeValue']=function(_0x38f890,_0x5b7b11,_0x2749ea,_0x2d8df2){const _0x4b3f94=this[_0x22da('0x9a')]();let _0x141eed='';if(_0x38f890===_0x22da('0x5b')){if('nTgkZ'!==_0x22da('0xfc'))_0x141eed=_0x4b3f94[_0x22da('0x5b')];else{function _0x4142ad(){this[_0x22da('0x3')](...arguments);}}}else _0x141eed=Imported[_0x22da('0xb1')]?_0x4b3f94[_0x22da('0xf6')](_0x38f890,!![]):_0x4b3f94[_0x22da('0x19d')](_0x38f890);this[_0x22da('0x19e')](ColorManager[_0x22da('0x4b')]()),this[_0x22da('0x127')](_0x141eed,_0x5b7b11+this['itemPadding'](),_0x2749ea,_0x2d8df2-this[_0x22da('0x17f')]()*0x2,_0x22da('0x163'));},Window_VictoryLevelUpActor['prototype'][_0x22da('0x157')]=function(_0x3b429a,_0x47ed1f,_0x1b5810,_0x3091c3){const _0x208b15=this[_0x22da('0x9a')](),_0x190bf9=this[_0x22da('0x95')];let _0x5e7c08=0x0,_0x3583ee=0x0;if(_0x3b429a===_0x22da('0x5b'))_0x5e7c08=_0x208b15[_0x22da('0x5b')],_0x3583ee=_0x190bf9[_0x22da('0x5b')];else{if(_0x22da('0x8')===_0x22da('0x4')){function _0x3bcf7c(){_0x35161b[_0x22da('0xd5')][_0x22da('0xb8')][_0x22da('0x8b')](this),this[_0x22da('0x1a')]();}}else _0x5e7c08=Imported[_0x22da('0xb1')]?_0x208b15[_0x22da('0xf6')](_0x3b429a,![]):_0x208b15[_0x22da('0x19d')](_0x3b429a),_0x3583ee=Imported[_0x22da('0xb1')]?_0x190bf9[_0x22da('0xf6')](_0x3b429a,![]):_0x190bf9[_0x22da('0x19d')](_0x3b429a);}let _0x1e7811=_0x3583ee;const _0x2459fc=_0x3583ee-_0x5e7c08;this[_0x22da('0x19e')](ColorManager['paramchangeTextColor'](_0x2459fc)),this[_0x22da('0x127')](_0x1e7811,_0x47ed1f+this[_0x22da('0x17f')](),_0x1b5810,_0x3091c3-this[_0x22da('0x17f')]()*0x2,'right');},Window_VictoryLevelUpActor[_0x22da('0xd5')][_0x22da('0x128')]=function(_0xb93ae9,_0x1335aa,_0x36bfce,_0x1f9c7b){const _0x2a4b0c=this[_0x22da('0x9a')](),_0x19c98e=this[_0x22da('0x95')];let _0x406dd7=0x0,_0x36d84f=0x0;if(_0xb93ae9===_0x22da('0x5b')){if(_0x22da('0x77')===_0x22da('0x77'))_0x406dd7=_0x2a4b0c[_0x22da('0x5b')],_0x36d84f=_0x19c98e['level'];else{function _0x443807(){this['_victoryWindows']=[],this[_0x22da('0x2')](),this[_0x22da('0xa1')](),this[_0x22da('0xd9')]();}}}else _0x406dd7=Imported[_0x22da('0xb1')]?_0x2a4b0c['paramValueByName'](_0xb93ae9,![]):_0x2a4b0c['param'](_0xb93ae9),_0x36d84f=Imported[_0x22da('0xb1')]?_0x19c98e[_0x22da('0xf6')](_0xb93ae9,![]):_0x19c98e[_0x22da('0x19d')](_0xb93ae9);const _0x58512e=_0x36d84f-_0x406dd7;let _0x2f3ea2=_0x58512e;if(_0x406dd7%0x1!==0x0)_0x2f3ea2=Math[_0x22da('0x39')](_0x58512e*0x64)+'%';_0x58512e!==0x0&&(this[_0x22da('0x19e')](ColorManager[_0x22da('0xa5')](_0x58512e)),_0x2f3ea2=(_0x58512e>=0x0?_0x22da('0x3d'):_0x22da('0xc3'))[_0x22da('0x98')](_0x2f3ea2),this[_0x22da('0x127')](_0x2f3ea2,_0x1335aa+this['itemPadding'](),_0x36bfce,_0x1f9c7b-this[_0x22da('0x17f')]()*0x2,_0x22da('0x188')));},Window_VictoryLevelUpActor[_0x22da('0xd5')][_0x22da('0x106')]=function(){this['resetFontSettings']();const _0x203dc8=this[_0x22da('0x3b')]();if(_0x203dc8[_0x22da('0x155')]<=0x0)return;const _0x3ff251=VisuMZ[_0x22da('0x177')][_0x22da('0x123')][_0x22da('0x12f')]['MaxSkills'];while(_0x203dc8[_0x22da('0x155')]>_0x3ff251){_0x203dc8[_0x22da('0x170')]();}this[_0x22da('0xd1')](_0x203dc8),this[_0x22da('0x118')](_0x203dc8);},Window_VictoryLevelUpActor['prototype'][_0x22da('0x3b')]=function(){const _0x448a47=this[_0x22da('0x9a')]()[_0x22da('0xdb')]();return this[_0x22da('0x95')][_0x22da('0x3b')](_0x448a47);},Window_VictoryLevelUpActor[_0x22da('0xd5')][_0x22da('0xd1')]=function(_0xd0c51a){const _0x7260b7=this['lineHeight'](),_0x54d4b0='rgba(0,\x200,\x200,\x200.8)',_0x337da8=_0x22da('0x1d'),_0x5e1d0b=ColorManager[_0x22da('0x4b')](),_0x4427aa=Math['round'](this[_0x22da('0x104')]/0x2)-0x64-_0x7260b7*0x2,_0x5bcbd5=(_0xd0c51a['length']+0x1)*_0x7260b7,_0x569eed=_0x7260b7,_0x51da91=this['height']-_0x7260b7*6.5-_0x5bcbd5;this[_0x22da('0x17')][_0x22da('0x193')](_0x569eed-0x2,_0x51da91-0x2,_0x4427aa+0x4,_0x5bcbd5+0x4,_0x5e1d0b),this['contents']['clearRect'](_0x569eed,_0x51da91,_0x4427aa,_0x5bcbd5),this[_0x22da('0x17')][_0x22da('0x12d')](_0x569eed,_0x51da91,_0x4427aa,_0x5bcbd5,_0x54d4b0,_0x337da8);},Window_VictoryLevelUpActor[_0x22da('0xd5')][_0x22da('0x118')]=function(_0x495872){const _0x117780=this[_0x22da('0x16b')](),_0x2f7ccf='rgba(0,\x200,\x200,\x200.8)',_0x436496=_0x22da('0x1d'),_0x13cdc8=ColorManager[_0x22da('0x4b')](),_0x1f3509=Math[_0x22da('0x39')](this[_0x22da('0x104')]/0x2)-0x64-(_0x117780+this[_0x22da('0x17f')]())*0x2,_0x5d85ac=(_0x495872[_0x22da('0x155')]+0x1)*_0x117780;let _0x1abe3d=_0x117780+this[_0x22da('0x17f')](),_0x2f229b=this[_0x22da('0x52')]-_0x117780*6.5-_0x5d85ac;const _0x287120=TextManager[_0x22da('0x12e')][_0x22da('0x98')](this[_0x22da('0x95')]['name']()),_0x2ce6a0=this[_0x22da('0x21')](_0x287120)[_0x22da('0x104')],_0xe912a7=Math[_0x22da('0x39')](_0x1abe3d+(_0x1f3509-_0x2ce6a0)/0x2);this['drawTextEx'](_0x287120,_0xe912a7,_0x2f229b,_0x2ce6a0),_0x2f229b+=_0x117780,this[_0x22da('0x17')][_0x22da('0x193')](_0x1abe3d,_0x2f229b-0x1,_0x1f3509,0x2,_0x13cdc8);for(const _0x4e7443 of _0x495872){if(_0x22da('0x191')===_0x22da('0x191')){if(!_0x4e7443)continue;this['resetFontSettings'](),this[_0x22da('0x12a')](_0x4e7443,_0x1abe3d+this[_0x22da('0x17f')](),_0x2f229b,_0x1f3509-this[_0x22da('0x17f')]()*0x2),_0x2f229b+=_0x117780;}else{function _0x2fcca8(){return this['isVictoryPhase']()?!![]:_0x571a3c[_0x22da('0x177')][_0x22da('0xe0')][_0x22da('0x8b')](this);}}}},Window_VictoryLevelUpActor['prototype'][_0x22da('0xbd')]=function(){const _0x5f5d5e=this[_0x22da('0x16b')](),_0x3a1a4e=Window_VictoryLevelUpActor[_0x22da('0x135')],_0x12d800=this[_0x22da('0x189')](),_0x31df5a=_0x5f5d5e*0x4,_0x333fd1=Math[_0x22da('0x39')]((this[_0x22da('0x104')]-_0x12d800)/0x2),_0xf459f3=_0x333fd1+(_0x3a1a4e?ImageManager[_0x22da('0x81')]+0x14:0x0),_0xe35212=this[_0x22da('0x52')]-_0x5f5d5e*5.5;let _0x2ecbb4=this[_0x22da('0x47')]();_0x3a1a4e&&this[_0x22da('0x184')](this[_0x22da('0x95')],_0x333fd1,_0xe35212,ImageManager[_0x22da('0x81')],ImageManager['faceHeight']),this[_0x22da('0x75')](_0x2ecbb4,_0xf459f3,_0xe35212,_0x12d800-_0xf459f3);},Window_VictoryLevelUpActor[_0x22da('0xd5')][_0x22da('0x189')]=function(){let _0xac8dc3=Graphics[_0x22da('0x199')];return Imported[_0x22da('0xd0')]&&(_0xac8dc3=Math[_0x22da('0xf0')](_0xac8dc3,VisuMZ[_0x22da('0x14e')][_0x22da('0x123')]['General'][_0x22da('0x165')])),_0xac8dc3-this['itemPadding']()*0x2;},Window_VictoryLevelUpActor['prototype'][_0x22da('0x47')]=function(){if(this[_0x22da('0x3b')]()['length']>0x0)return TextManager[_0x22da('0xfd')](this['_actor'])['format'](this['_actor'][_0x22da('0x2f')]());else{if(_0x22da('0x18')===_0x22da('0x18'))return TextManager[_0x22da('0xe4')](this[_0x22da('0x95')])[_0x22da('0x98')](this[_0x22da('0x95')]['name']());else{function _0x408dff(){const _0x35894f=new _0x1d3f81(_0x1b3158,this,_0x194ba3);return _0x3095ae[_0x4010b6]=_0x35894f,this['addInnerChild'](_0x35894f),_0x35894f;}}}};