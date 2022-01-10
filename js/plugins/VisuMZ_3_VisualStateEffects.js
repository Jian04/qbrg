//=============================================================================
// VisuStella MZ - Visual State Effects
// VisuMZ_3_VisualStateEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_VisualStateEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualStateEffects = VisuMZ.VisualStateEffects || {};
VisuMZ.VisualStateEffects.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.01] [VisualStateEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_State_Effects_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * States, buffs, and debuffs are amongst one of the most important aspects of
 * the battle system. Therefore, relaying proper information to the player is
 * extremely important. RPG Maker MZ does relay information to the player about
 * the various states and effects, but it is far from perfect. This plugin
 * allows you to add more detail and visual effects regarding states to relay
 * proper data.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Choose to display State Overlays and State Icons over actors and enemies.
 * * Create text popups for Buffs, Debuffs, and States along with full control
 *   over their color, flash, and flash duration.
 * * Play animations upon receiving or removing Buffs, Debuffs, and States.
 * * States can have repeating animations.
 * * States can change the tone of a sprite.
 * * States can freeze a sprite in place.
 * * Hovering effects that can be visibly applied to trait objects.
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
 * - VisuMZ_0_CoreEngine
 * - VisuMZ_1_BattleCore
 * - VisuMZ_1_SkillsStatesCore
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * State Motion Index and State Overlay Index
 * 
 * - The original RPG Maker MZ functions have been overwritten because they
 * only display the motions and overlays of the highest priority state even if
 * it does not have any motions while lower priority states with motions and
 * overlays will be hidden.
 * 
 * - The changed code will now take the highest priority state motion index (or
 * a custom one defined by a notetag) and the highest priority state overlay
 * index to show those instead.
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
 * === State-Related Notetags ===
 * 
 * The following notetags are made for states.
 * 
 * ---
 * 
 * <Hide State Popup>
 *
 * - Used for: State Notetags
 * - Don't display any of the popups for this state.
 * 
 * ---
 * 
 * <State Popup>
 *  text color: c
 *  flash color: r, g, b, a
 *  flash duration: d
 * </State Popup>
 *
 * - Used for: State Notetags
 * - Changes the settings of the state popup from the defaults declared by the
 *   Plugin Parameters. Each of the settings are optional. If the lines do not
 *   appear in the notetag, then the default values from the Plugin Parameters
 *   will be used instead.
 * - Replace 'c' #rrggbb for custom colors or insert a regular number for text
 *   colors from the Window Skin.
 * - Replace 'r', 'g', 'b', 'a' with number values ranging from 0 to 255 for
 *   'red', 'green', 'blue', and 'alpha' to determine the flash color.
 * - Replace 'd' with a number representing the amount of frames you want the
 *   flash duration to last for.
 * 
 * Examples:
 * 
 * <State Popup>
 *  text color: 3
 * </State Popup>
 * 
 * <State Popup>
 *  text color: #abcdef
 *  flash color: 255, 255, 0, 160
 * </State Popup>
 * 
 * <State Popup>
 *  flash color: 0, 255, 255, 160
 *  flash duration: 90
 * </State Popup>
 * 
 * <State Popup>
 *  flash duration: 777
 * </State Popup>
 * 
 * ---
 * 
 * <Add Animation: x>
 *
 * - Used for: State Notetags
 * - Determines the battle animation to play when the state is applied.
 * - Replace 'x' with a number representing the ID of the animation you wish
 *   to play when the state is added.
 * - This does not work for states without icons nor the death state.
 * 
 * ---
 * 
 * <Erase Animation: x>
 *
 * - Used for: State Notetags
 * - Determines the battle animation to play when the state is removed.
 * - Replace 'x' with a number representing the ID of the animation you wish
 *   to play when the state is removed.
 * - This does not work for states without icons nor the death state.
 * 
 * ---
 * 
 * <Repeat Animation: x>
 *
 * - Used for: State Notetags
 * - Determines the battle animation to play in intervals when the battler is
 *   affected by it.
 * - Replace 'x' with a number representing the ID of the animation you wish
 *   to play on repeat while the battler is affected by the state.
 * - The battler will cycle through the various repeating state animations
 *   available through states.
 * - WARNING: Abusing Repeat Animations can jeopardize game performance.
 * 
 * ---
 * 
 * <Repeat Animation Cycle: x>
 *
 * - Used for: State Notetags
 * - Determines the cycle/duration of this specific state's repeating animation
 *   if you do not wish to use the plugin parameter's default setting.
 * - Replace 'x' with the number of frames you wish to play this animation for
 *   before moving onto the next animation.
 * - WARNING: Lower numbers can jeopardize game performance.
 * 
 * ---
 * 
 * <State Motion: Walk>
 * <State Motion: Wait>
 * <State Motion: Chant>
 * <State Motion: Guard>
 * <State Motion: Damage>
 * <State Motion: Evade>
 * <State Motion: Thrust>
 * <State Motion: Swing>
 * <State Motion: Missile>
 * <State Motion: Skill>
 * <State Motion: Spell>
 * <State Motion: Item>
 * <State Motion: Escape>
 * <State Motion: Victory>
 * <State Motion: Dying>
 * <State Motion: Abnormal>
 * <State Motion: Sleep>
 * <State Motion: Dead>
 *
 * - Used for: State Notetags
 * - Lets you determine what kind of state motion to play when the battler is
 *   affected by the state.
 * - The battler will only play the highest priority state motion.
 * 
 * ---
 * 
 * <State Motion Lock>
 * 
 * - Used for: State Notetags
 * - If an actor or animated sideview enemy is affected by a state that has
 *   this notetag, their animation will be locked in place while this state
 *   is in effect.
 * 
 * ---
 * 
 * <State Tone: red, green, blue, gray>
 *
 * - Used for: State Notetags
 * - Tints the battler with a tone determined by the state.
 * - Replace 'red', 'green', 'blue' with a value between -255 and 255.
 * - Replace 'gray' with a value between 0 and 255.
 * - If a battler has multiple states with tones, then the state with the
 *   highest priority value is applied to the battler.
 * 
 * ---
 * 
 * <Visual Hover Effect>
 *  Base: x
 *  Speed: y
 *  Rate: z
 *  Death: case
 * </Visual Hover Effect>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Creates a hover effect when tied to a trait object.
 * - The 'base' value determines the minimum height above the ground for the
 *   hover effect. Replace 'x' with a number representing the pixel height.
 * - The 'speed' value determines the flat adjustment towards the wobbling
 *   change. Replace 'y' with a number representing the speed. Lower values
 *   move faster while higher values move slower.
 * - The 'rate' determines the fluctuation rate when the hover effect bobbles
 *   up and down. Replace 'z' with a number representing the fluctuation rate.
 * - The 'death' scenario lets you decide if you want the hovering battler to
 *   remain hovering if they're dead or fall down to the floor. Replace 'case'
 *   with 'Hover' or 'Floor'.
 * 
 * Example:
 * 
 * <Visual Hover Effect>
 *  Base: 100
 *  Speed: 20
 *  Rate: 5.0
 *  Death: floor
 * </Visual Hover Effect>
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for Visual State Effects.
 *
 * ---
 *
 * Actors
 * 
 *   Show State Overlay?:
 *   - Show state overlays over an actor's head?
 * 
 *   Show State Icons?:
 *   - Show state icons over an actor's head?
 *
 * ---
 *
 * Enemies
 * 
 *   Show State Overlay?:
 *   - Show state overlays over an enemy's head?
 * 
 *   Show State Icons?:
 *   - Show state icons over an enemy's head?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Buff/Debuff Settings Settings
 * ============================================================================
 *
 * Buff/Debuff settings for Visual State Effects.
 *
 * ---
 *
 * Popups
 * 
 *   Show Popups?:
 *   - Show Buff/Debuff Popups when applied?
 * 
 *     Buff Format:
 *     - How do you want the buff text to appear?
 *     - %1 - Parameter Name
 * 
 *       Text Color:
 *       - Use #rrggbb for custom colors or regular numbers for text colors
 *         from the Window Skin.
 * 
 *       Flash Color:
 *       - Adjust the popup's flash color.
 *       - Format: [red, green, blue, alpha]
 * 
 *       Flash Duration:
 *       - What is the frame duration of the flash effect?
 * 
 *     Debuff Format:
 *     - How do you want the debuff text to appear?
 *     - %1 - Parameter Name
 * 
 *       Text Color:
 *       - Use #rrggbb for custom colors or regular numbers for text colors
 *         from the Window Skin.
 * 
 *       Flash Color:
 *       - Adjust the popup's flash color.
 *       - Format: [red, green, blue, alpha]
 * 
 *       Flash Duration:
 *       - What is the frame duration of the flash effect?
 * 
 * ---
 * 
 * Animations
 * 
 *   Show Animations?:
 *   - Show Buff/Debuff Animations when applied?
 * 
 *     Mirror Animations?:
 *     - Mirror animations for buffs/debuffs?
 * 
 *     Mute Animations?:
 *     - Mute animations for buffs/debuffs?
 * 
 * ---
 * 
 * Buff Animations
 * 
 *   MaxHP Buff:
 *   MaxMP Buff:
 *   ATK Buff:
 *   DEF Buff:
 *   MAT Buff:
 *   MDF Buff:
 *   AGI Buff:
 *   LUK Buff:
 *   - Animation played when applying specific Buffs.
 * 
 * Debuff Animations
 * 
 *   MaxHP Debuff:
 *   MaxMP Debuff:
 *   ATK Debuff:
 *   DEF Debuff:
 *   MAT Debuff:
 *   MDF Debuff:
 *   AGI Debuff:
 *   LUK Debuff:
 *   - Animation played when applying specific Debuff.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: State Settings
 * ============================================================================
 *
 * Default State settings for Visual State Effects.
 *
 * ---
 *
 * Popups
 * 
 *   Show Popups?:
 *   - Show States Popups when applied and removed?
 * 
 *     Add State Format:
 *     - How do you want added states to appear?
 *     - %1 - State Name
 * 
 *     Erase State Format:
 *     - How do you want erased states to appear?
 *     - %1 - State Name
 * 
 *     Default Text Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *       Match Turn Count?:
 *       - Match turn count color by default?
 * 
 *     Flash Color:
 *     - Adjust the popup's default flash color.
 *     - Format: [red, green, blue, alpha]
 * 
 *       Flash Duration:
 *       - What is the frame duration of the default flash effect?
 *
 * ---
 *
 * State Animations
 * 
 *   Add/Erase Animations
 * 
 *     Mirror Animations?:
 *     - Mirror animations for states?
 * 
 *     Mute Animations?:
 *     - Mute animations for states?
 * 
 *   Repeating Animations
 * 
 *     Cycle Time:
 *     - The amount of frames to wait before each animation cycle.
 *     - WARNING: Lower numbers can jeopardize game performance.
 * 
 *     Mirror Animations?:
 *     - Mirror repeating animations for states by default?
 * 
 *     Mute Animations?:
 *     - Mute repeating animations for states by default?
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
 * * Compatibility Update
 * ** Added compatibility with Battle Core's newest update for the
 *    <Battle UI Offset: +x, +y> notetags. Update made by Yanfly.
 *
 * Version 1.00: September 2, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param VisualStateEffects
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
 * @desc General settings for Visual State Effects.
 * @default {"Actors":"","ActorOverlay:eval":"true","ActorStateIcon:eval":"true","Enemies":"","EnemyOverlay:eval":"true","EnemyStateIcon:eval":"true"}
 *
 * @param BuffDebuff:struct
 * @text Buff/Debuff Settings
 * @type struct<BuffDebuff>
 * @desc Buff/Debuff settings for Visual State Effects.
 * @default {"ShowPopups:eval":"true","BuffPopupFmt:str":"%1▲","BuffTextColor:str":"24","BuffFlashColor:eval":"[0, 255, 0, 160]","BuffFlashDuration:num":"60","DebuffPopupFmt:str":"%1▼","DebuffTextColor:str":"27","DebuffFlashColor:eval":"[255, 0, 0, 160]","DebuffFlashDuration:num":"60","ShowAnimations:eval":"true","AnimationMirror:eval":"false","AnimationMute:eval":"false","BuffAnimations":"","Buff0Animation:num":"52","Buff1Animation:num":"53","Buff2Animation:num":"52","Buff3Animation:num":"52","Buff4Animation:num":"53","Buff5Animation:num":"53","Buff6Animation:num":"51","Buff7Animation:num":"51","DebuffAnimations":"","Debuff0Animation:num":"55","Debuff1Animation:num":"56","Debuff2Animation:num":"55","Debuff3Animation:num":"55","Debuff4Animation:num":"56","Debuff5Animation:num":"56","Debuff6Animation:num":"54","Debuff7Animation:num":"54"}
 *
 * @param State:struct
 * @text State Defaults
 * @type struct<State>
 * @desc Default State settings for Visual State Effects.
 * @default {"ShowPopups:eval":"true","AddPopupFmt:str":"+%1","ErasePopupFmt:str":"-%1","TextColor:str":"0","MatchTurnCountColor:eval":"true","FlashColor:eval":"[0, 0, 0, 0]","FlashDuration:num":"60","StateAnimations":"","AddEraseAnimations":"","AnimationMirror:eval":"false","AnimationMute:eval":"false","RepeatingAnimations":"","CycleTime:num":"300","RepeatMirror:eval":"false","RepeatMute:eval":"true"}
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
 * @param Actors
 *
 * @param ActorOverlay:eval
 * @text Show State Overlay?
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show state overlays over an actor's head?
 * @default true
 *
 * @param ActorStateIcon:eval
 * @text Show State Icons?
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show state icons over an actor's head?
 * @default true
 *
 * @param Enemies
 *
 * @param EnemyOverlay:eval
 * @text Show State Overlay?
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show state overlays over an enemy's head?
 * @default true
 *
 * @param EnemyStateIcon:eval
 * @text Show State Icons?
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show state icons over an enemy's head?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BuffDebuff:
 *
 * @param ShowPopups:eval
 * @text Show Popups?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Buff/Debuff Popups when applied?
 * @default true
 *
 * @param BuffPopupFmt:str
 * @text Buff Format
 * @parent ShowPopups:eval
 * @desc How do you want the buff text to appear?
 * %1 - Parameter Name
 * @default %1▲
 *
 * @param BuffTextColor:str
 * @text Text Color
 * @parent BuffPopupFmt:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param BuffFlashColor:eval
 * @text Flash Color
 * @parent BuffPopupFmt:str
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 255, 0, 160]
 * 
 * @param BuffFlashDuration:num
 * @text Flash Duration
 * @parent BuffPopupFmt:str
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param DebuffPopupFmt:str
 * @text Debuff Format
 * @parent ShowPopups:eval
 * @desc How do you want the debuff text to appear?
 * %1 - Parameter Name
 * @default %1▼
 *
 * @param DebuffTextColor:str
 * @text Text Color
 * @parent DebuffPopupFmt:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param DebuffFlashColor:eval
 * @text Flash Color
 * @parent DebuffPopupFmt:str
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param DebuffFlashDuration:num
 * @text Flash Duration
 * @parent DebuffPopupFmt:str
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param ShowAnimations:eval
 * @text Show Animations?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Buff/Debuff Animations when applied?
 * @default true
 *
 * @param AnimationMirror:eval
 * @text Mirror Animations?
 * @parent ShowAnimations:eval
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror animations for buffs/debuffs?
 * @default false
 *
 * @param AnimationMute:eval
 * @text Mute Animations?
 * @parent ShowAnimations:eval
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute animations for buffs/debuffs?
 * @default false
 * 
 * @param BuffAnimations
 * @text Buff Animations
 * @parent ShowAnimations:eval
 *
 * @param Buff0Animation:num
 * @text MaxHP Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying MaxHP Buffs.
 * @default 52
 *
 * @param Buff1Animation:num
 * @text MaxMP Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying MaxMP Buffs.
 * @default 53
 *
 * @param Buff2Animation:num
 * @text ATK Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying ATK Buffs.
 * @default 52
 *
 * @param Buff3Animation:num
 * @text DEF Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying DEF Buffs.
 * @default 52
 *
 * @param Buff4Animation:num
 * @text MAT Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying MAT Buffs.
 * @default 53
 *
 * @param Buff5Animation:num
 * @text MDF Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying MDF Buffs.
 * @default 53
 *
 * @param Buff6Animation:num
 * @text AGI Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying AGI Buffs.
 * @default 51
 *
 * @param Buff7Animation:num
 * @text LUK Buff
 * @parent BuffAnimations
 * @type animation
 * @desc Animation played when applying LUK Buffs.
 * @default 51
 * 
 * @param DebuffAnimations
 * @text Debuff Animations
 * @parent ShowAnimations:eval
 *
 * @param Debuff0Animation:num
 * @text MaxHP Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying MaxHP Debuffs.
 * @default 55
 *
 * @param Debuff1Animation:num
 * @text MaxMP Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying MaxMP Debuffs.
 * @default 56
 *
 * @param Debuff2Animation:num
 * @text ATK Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying ATK Debuffs.
 * @default 55
 *
 * @param Debuff3Animation:num
 * @text DEF Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying DEF Debuffs.
 * @default 55
 *
 * @param Debuff4Animation:num
 * @text MAT Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying MAT Debuffs.
 * @default 56
 *
 * @param Debuff5Animation:num
 * @text MDF Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying MDF Debuffs.
 * @default 56
 *
 * @param Debuff6Animation:num
 * @text AGI Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying AGI Debuffs.
 * @default 54
 *
 * @param Debuff7Animation:num
 * @text LUK Debuff
 * @parent DebuffAnimations
 * @type animation
 * @desc Animation played when applying LUK Debuffs.
 * @default 54
 *
 */
/* ----------------------------------------------------------------------------
 * State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~State:
 *
 * @param ShowPopups:eval
 * @text Show Popups?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show States Popups when applied and removed?
 * @default true
 *
 * @param AddPopupFmt:str
 * @text Add State Format
 * @parent ShowPopups:eval
 * @desc How do you want added states to appear?
 * %1 - State Name
 * @default +%1
 *
 * @param ErasePopupFmt:str
 * @text Erase State Format
 * @parent ShowPopups:eval
 * @desc How do you want erased states to appear?
 * %1 - State Name
 * @default -%1
 *
 * @param TextColor:str
 * @text Default Text Color
 * @parent ShowPopups:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param MatchTurnCountColor:eval
 * @text Match Turn Count?
 * @parent TextColor:str
 * @type boolean
 * @on Match
 * @off Don't
 * @desc Match turn count color by default?
 * @default true
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent ShowPopups:eval
 * @desc Adjust the popup's default flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 0, 0, 0]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type Number
 * @desc What is the frame duration of the default flash effect?
 * @default 60
 * 
 * @param StateAnimations
 * @text State Animations
 * 
 * @param AddEraseAnimations
 * @text Add/Erase Animations
 * @parent StateAnimations
 *
 * @param AnimationMirror:eval
 * @text Mirror Animations?
 * @parent AddEraseAnimations
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror animations for states?
 * @default false
 *
 * @param AnimationMute:eval
 * @text Mute Animations?
 * @parent AddEraseAnimations
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute animations for states?
 * @default false
 * 
 * @param RepeatingAnimations
 * @text Repeating Animations
 * @parent StateAnimations
 *
 * @param CycleTime:num
 * @text Cycle Time
 * @parent RepeatingAnimations
 * @type number
 * @min 1
 * @desc The amount of frames to wait before each animation cycle.
 * WARNING: Lower numbers can jeopardize game performance.
 * @default 300
 *
 * @param RepeatMirror:eval
 * @text Mirror Animations?
 * @parent RepeatingAnimations
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror repeating animations for states by default?
 * @default false
 *
 * @param RepeatMute:eval
 * @text Mute Animations?
 * @parent RepeatingAnimations
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute repeating animations for states by default?
 * @default true
 *
 */
//=============================================================================

const _0x2174=['%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','visualRepeatingStateAniCycle','EVAL','states','Game_BattlerBase_increaseBuff','FlashColor','kJiZN','createVisualRepeatingStateAnimationCycle','Sprite_Enemy_setBattler','NUM','ConvertParams','_hoverRand','status','deathHover','hoverHeight','initMembers','customizeStatePopup','tkGae','nFTzp','_customStateMotion','onAddState','hover','_cache','MTRwq','_svBattlerSprite','isDead','isActor','Sprite_Actor_setBattler','setupStateAnimation','yoAmE','ICON_DEBUFF_START','overlay','RepeatMute','SomFP','updateVisualStateTone','isSpriteVisible','updateFrame','onRemoveState','_actor','description','CycleTime','STR','Game_BattlerBase_refresh','Sprite_Actor_updateFrame','checkCacheKey','stateOverlayIndex','VisuMZ_1_SkillsStatesCore','visualRepeatingStateAnimation','setupVisualStateEffectsPopup','update','_dragonbones','Sprite_Enemy_update','Sprite_Actor_createStateSprite','ARRAYSTR','createStateIconSprite','GtHSu','utdEz','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','RepeatMirror','LNnRT','toUpperCase','call','textColor','getVisualRepeatingStateAnimation','_stateSprite','isActing','MatchTurnCountColor','push','_visualStateAnimationRepeatDuration','Sprite_Enemy_createStateIconSprite','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','JgPxH','Sprite_Actor_update','yvjIA','format','ulUKx','createStateSprite','createVisualRepeatingStateAnimation','getStateMotionIndex','Settings','getStateOverlayIndex','AnimationMirror','Game_BattlerBase_decreaseBuff','refreshMotion','vOhlB','constructor','setupVisualStateEffect','%1PopupFmt','trim','IconSet','kRdyf','Game_BattlerBase_initMembers','toLowerCase','flashColor','length','updateVisualStateEffectsIcons','flashDuration','bind','ARRAYJSON','loadSystem','decreaseBuff','EnemyOverlay','isInputting','updateDragonbonesTimeScale','updateVisualStateEffectsOverlay','setupIconTextPopup','Sprite_Battler_updateDragonbonesTimeScale','updateVisualStateEffects','exsxa','name','max','_dragonbonesSpriteContainer','battleUIOffsetY','setupBuffDebuffPopup','includes','note','extraPositionY','match','speed','deathStateId','hxBBd','stateMotionLock','ARRAYFUNC','isSceneBattle','getVisualStateTone','getStateMotionLock','ShowPopups','param','Sprite_Battler_initMembers','setupVisualBuffDebuffEffect','Add','ActorStateIcon','aTTGy','_stateIconSprite','ARRAYSTRUCT','drZjl','motion','%1TextColor','increaseBuff','BuffDebuff','stateMotionIndex','RILtN','State','round','visualStateToneTargetSprite','Sprite_Battler_extraPositionY','map','STRUCT','parameters','hoverData','split','rbJTQ','lLRZT','FWJdC','VisualStateEffects','createVisualStateTone','random','startMotion','TextColor','ShowAnimations','initVisualStateEffects','setBattler','updateRepeatingVisualStateAnimation','AnimationMute','eotAe','dPgCu','Game_Battler_onRemoveState','Sprite_Actor_refreshMotion','Buff','ERorf','prototype','battleUIOffsetX','base','%1FlashColor','VisuMZ_1_BattleCore','Debuff','_battler','_visualStateAnimationIndex','%1%2Animation','ARRAYNUM','return\x200','requestFauxAnimation','height','battler','isEnemy','Game_Battler_onAddState','uJAXk','floor','_hoverMinimum','min','Erase','timeScale','hasSvBattler','iconIndex','visualStateTone','PYQZH','createVisualHoveringData','PZkKE','stateColor','initVisualHoverEffect','refresh','%1FlashDuration','setColorTone','visible','clamp','frameCount','EnemyStateIcon','General','exit','traitObjects','getVisualRepeatingStateAnimationCycle','parse','ICON_BUFF_START','addLoadListener'];(function(_0x35b1be,_0x21748d){const _0x1c4fc3=function(_0x9ec5cc){while(--_0x9ec5cc){_0x35b1be['push'](_0x35b1be['shift']());}};_0x1c4fc3(++_0x21748d);}(_0x2174,0x145));const _0x1c4f=function(_0x35b1be,_0x21748d){_0x35b1be=_0x35b1be-0x0;let _0x1c4fc3=_0x2174[_0x35b1be];return _0x1c4fc3;};var label=_0x1c4f('0x2b'),tier=tier||0x0,dependencies=['VisuMZ_0_CoreEngine',_0x1c4f('0x3f'),_0x1c4f('0x95')],pluginData=$plugins['filter'](function(_0x41dece){return _0x41dece[_0x1c4f('0x73')]&&_0x41dece[_0x1c4f('0x8e')][_0x1c4f('0x3')]('['+label+']');})[0x0];VisuMZ[label][_0x1c4f('0xb6')]=VisuMZ[label][_0x1c4f('0xb6')]||{},VisuMZ[_0x1c4f('0x71')]=function(_0x4d61aa,_0x5562e6){for(const _0x1502fb in _0x5562e6){if(_0x1502fb[_0x1c4f('0x6')](/(.*):(.*)/i)){const _0x3edb48=String(RegExp['$1']),_0x2e5c22=String(RegExp['$2'])[_0x1c4f('0xa3')]()[_0x1c4f('0xbf')]();let _0x333658,_0x2ce1d4,_0x5875aa;switch(_0x2e5c22){case _0x1c4f('0x70'):_0x333658=_0x5562e6[_0x1502fb]!==''?Number(_0x5562e6[_0x1502fb]):0x0;break;case _0x1c4f('0x44'):_0x2ce1d4=_0x5562e6[_0x1502fb]!==''?JSON[_0x1c4f('0x64')](_0x5562e6[_0x1502fb]):[],_0x333658=_0x2ce1d4['map'](_0x940565=>Number(_0x940565));break;case _0x1c4f('0x69'):_0x333658=_0x5562e6[_0x1502fb]!==''?eval(_0x5562e6[_0x1502fb]):null;break;case'ARRAYEVAL':_0x2ce1d4=_0x5562e6[_0x1502fb]!==''?JSON['parse'](_0x5562e6[_0x1502fb]):[],_0x333658=_0x2ce1d4[_0x1c4f('0x23')](_0x10ec3e=>eval(_0x10ec3e));break;case'JSON':_0x333658=_0x5562e6[_0x1502fb]!==''?JSON[_0x1c4f('0x64')](_0x5562e6[_0x1502fb]):'';break;case _0x1c4f('0xc9'):_0x2ce1d4=_0x5562e6[_0x1502fb]!==''?JSON['parse'](_0x5562e6[_0x1502fb]):[],_0x333658=_0x2ce1d4['map'](_0x14b936=>JSON['parse'](_0x14b936));break;case'FUNC':_0x333658=_0x5562e6[_0x1502fb]!==''?new Function(JSON[_0x1c4f('0x64')](_0x5562e6[_0x1502fb])):new Function(_0x1c4f('0x45'));break;case _0x1c4f('0xb'):_0x2ce1d4=_0x5562e6[_0x1502fb]!==''?JSON[_0x1c4f('0x64')](_0x5562e6[_0x1502fb]):[],_0x333658=_0x2ce1d4[_0x1c4f('0x23')](_0x1b02eb=>new Function(JSON[_0x1c4f('0x64')](_0x1b02eb)));break;case _0x1c4f('0x90'):_0x333658=_0x5562e6[_0x1502fb]!==''?String(_0x5562e6[_0x1502fb]):'';break;case _0x1c4f('0x9c'):_0x2ce1d4=_0x5562e6[_0x1502fb]!==''?JSON['parse'](_0x5562e6[_0x1502fb]):[],_0x333658=_0x2ce1d4[_0x1c4f('0x23')](_0x23ed2e=>String(_0x23ed2e));break;case _0x1c4f('0x24'):_0x5875aa=_0x5562e6[_0x1502fb]!==''?JSON[_0x1c4f('0x64')](_0x5562e6[_0x1502fb]):{},_0x333658=VisuMZ[_0x1c4f('0x71')]({},_0x5875aa);break;case _0x1c4f('0x17'):_0x2ce1d4=_0x5562e6[_0x1502fb]!==''?JSON[_0x1c4f('0x64')](_0x5562e6[_0x1502fb]):[],_0x333658=_0x2ce1d4['map'](_0x53023d=>VisuMZ[_0x1c4f('0x71')]({},JSON[_0x1c4f('0x64')](_0x53023d)));break;default:continue;}_0x4d61aa[_0x3edb48]=_0x333658;}}return _0x4d61aa;},(_0x1698af=>{const _0x24c6be=_0x1698af[_0x1c4f('0xd4')];for(const _0x4c6cda of dependencies){if(!Imported[_0x4c6cda]){alert(_0x1c4f('0xad')[_0x1c4f('0xb1')](_0x24c6be,_0x4c6cda)),SceneManager[_0x1c4f('0x61')]();break;}}const _0x190d73=_0x1698af[_0x1c4f('0x8e')];if(_0x190d73[_0x1c4f('0x6')](/\[Version[ ](.*?)\]/i)){if(_0x1c4f('0x18')!==_0x1c4f('0x18')){function _0x3252c8(){_0x33045e[_0x1c4f('0x5b')](_0x3e70f9);}}else{const _0x168353=Number(RegExp['$1']);_0x168353!==VisuMZ[label]['version']&&(alert(_0x1c4f('0xa0')['format'](_0x24c6be,_0x168353)),SceneManager[_0x1c4f('0x61')]());}}if(_0x190d73[_0x1c4f('0x6')](/\[Tier[ ](\d+)\]/i)){const _0x56fc95=Number(RegExp['$1']);_0x56fc95<tier?(alert(_0x1c4f('0x67')[_0x1c4f('0xb1')](_0x24c6be,_0x56fc95,tier)),SceneManager['exit']()):tier=Math['max'](_0x56fc95,tier);}VisuMZ[_0x1c4f('0x71')](VisuMZ[label][_0x1c4f('0xb6')],_0x1698af[_0x1c4f('0x25')]);})(pluginData),VisuMZ['VisualStateEffects']['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x1c4f('0x3b')][_0x1c4f('0x76')],Game_BattlerBase['prototype'][_0x1c4f('0x76')]=function(){this[_0x1c4f('0x7d')]={},VisuMZ[_0x1c4f('0x2b')][_0x1c4f('0xc2')]['call'](this);},VisuMZ[_0x1c4f('0x2b')][_0x1c4f('0x91')]=Game_BattlerBase['prototype']['refresh'],Game_BattlerBase['prototype'][_0x1c4f('0x59')]=function(){this[_0x1c4f('0x7d')]={},VisuMZ[_0x1c4f('0x2b')][_0x1c4f('0x91')][_0x1c4f('0xa4')](this);},Game_BattlerBase['prototype']['checkCacheKey']=function(_0x2a8275){return this[_0x1c4f('0x7d')]=this[_0x1c4f('0x7d')]||{},this[_0x1c4f('0x7d')][_0x2a8275]!==undefined;},VisuMZ[_0x1c4f('0x2b')][_0x1c4f('0x6b')]=Game_BattlerBase[_0x1c4f('0x3b')][_0x1c4f('0x1b')],Game_BattlerBase['prototype'][_0x1c4f('0x1b')]=function(_0x4c96c0){VisuMZ['VisualStateEffects'][_0x1c4f('0x6b')][_0x1c4f('0xa4')](this,_0x4c96c0),this[_0x1c4f('0x12')](_0x4c96c0,!![]);},VisuMZ[_0x1c4f('0x2b')][_0x1c4f('0xb9')]=Game_BattlerBase[_0x1c4f('0x3b')][_0x1c4f('0xcb')],Game_BattlerBase[_0x1c4f('0x3b')]['decreaseBuff']=function(_0x336e7c){VisuMZ[_0x1c4f('0x2b')]['Game_BattlerBase_decreaseBuff'][_0x1c4f('0xa4')](this,_0x336e7c),this[_0x1c4f('0x12')](_0x336e7c,![]);},Game_BattlerBase['prototype'][_0x1c4f('0x12')]=function(_0x4d1399,_0x271c9a){if(!SceneManager[_0x1c4f('0xc')]())return;if(!this[_0x1c4f('0x48')]())return;const _0x6a30ef=VisuMZ[_0x1c4f('0x2b')][_0x1c4f('0xb6')][_0x1c4f('0x1c')],_0x502a21=_0x271c9a?'Buff':_0x1c4f('0x40');if(_0x6a30ef[_0x1c4f('0xf')]){if('JSdJI'===_0x1c4f('0x9')){function _0x4b3ab3(){this['_battler'][_0x1c4f('0x51')]()?(_0x4d3148[_0x1c4f('0x5c')]=![],this['_svBattlerSprite'][_0x1c4f('0xa7')][_0x1c4f('0x5c')]=!![]):(this['_svBattlerSprite'][_0x1c4f('0xa7')][_0x1c4f('0x5c')]=![],_0x453c78[_0x1c4f('0x5c')]=_0x123807[_0x1c4f('0xcc')]);}}else this['battler']()['setupBuffDebuffPopup'](_0x4d1399,_0x271c9a);}if(_0x6a30ef['ShowAnimations']){if(_0x1c4f('0x36')===_0x1c4f('0x88')){function _0x562521(){this[_0x1c4f('0x0')]['setColorTone'](_0x2de5b3);}}else{const _0x23c4c6=[this],_0x4da374=_0x6a30ef[_0x1c4f('0x43')[_0x1c4f('0xb1')](_0x502a21,_0x4d1399)]||0x0,_0x23fc0a=_0x6a30ef[_0x1c4f('0xb8')],_0x24d45c=_0x6a30ef[_0x1c4f('0x34')];$gameTemp['requestFauxAnimation'](_0x23c4c6,_0x4da374,_0x23fc0a,_0x24d45c);}}},Game_BattlerBase[_0x1c4f('0x3b')][_0x1c4f('0xbd')]=function(_0x1cf839,_0x487ef4){if(!SceneManager[_0x1c4f('0xc')]())return;if(_0x1cf839===this[_0x1c4f('0x8')]())return;if(_0x487ef4&&!this['isStateAffected'](_0x1cf839))return;if(!_0x487ef4&&this['isStateAffected'](_0x1cf839))return;if(!this[_0x1c4f('0x48')]())return;const _0xde5219=VisuMZ[_0x1c4f('0x2b')][_0x1c4f('0xb6')][_0x1c4f('0x1f')],_0x173b57=$dataStates[_0x1cf839];if(!_0x173b57)return;_0xde5219['ShowPopups']&&!_0x173b57[_0x1c4f('0x4')][_0x1c4f('0x6')](/<HIDE STATE POPUP>/i)&&this[_0x1c4f('0x48')]()[_0x1c4f('0x97')](_0x1cf839,_0x487ef4),_0xde5219[_0x1c4f('0x30')]&&VisuMZ['VisualStateEffects'][_0x1c4f('0x83')](this,_0x173b57,_0x487ef4);},VisuMZ[_0x1c4f('0x2b')]['setupStateAnimation']=function(_0x4fe394,_0x1f7fb6,_0x4561d9){const _0x106a4b=VisuMZ['VisualStateEffects'][_0x1c4f('0xb6')][_0x1c4f('0x1f')],_0x222ca6=_0x106a4b[_0x1c4f('0xb8')],_0x386e41=_0x106a4b[_0x1c4f('0x34')],_0x1fe1c1=_0x1f7fb6[_0x1c4f('0x4')];if(_0x4561d9&&_0x1fe1c1[_0x1c4f('0x6')](/(?:ADD|APPLY) ANIMATION:[ ](\d+)/i)){const _0x124a55=Number(RegExp['$1']);$gameTemp[_0x1c4f('0x46')]([_0x4fe394],_0x124a55,_0x222ca6,_0x386e41);}if(!_0x4561d9&&_0x1fe1c1['match'](/(?:ERASE|REMOVE) ANIMATION:[ ](\d+)/i)){const _0x2d563d=Number(RegExp['$1']);$gameTemp[_0x1c4f('0x46')]([_0x4fe394],_0x2d563d,_0x222ca6,_0x386e41);}},Game_BattlerBase['prototype'][_0x1c4f('0xa6')]=function(){const _0x84ad3d='visualRepeatingStateAnimation';if(this[_0x1c4f('0x93')](_0x84ad3d))return this['_cache'][_0x84ad3d];return this['_cache'][_0x84ad3d]=this[_0x1c4f('0xb4')](),this[_0x1c4f('0x7d')][_0x84ad3d];},Game_BattlerBase['prototype'][_0x1c4f('0xb4')]=function(){let _0x459c8c=[];for(const _0x1b2bb1 of this[_0x1c4f('0x6a')]()){if(!_0x1b2bb1)continue;_0x1b2bb1['note'][_0x1c4f('0x6')](/<(?:REPEAT|REPEATING|CYCLE|STATE) ANIMATION:[ ](\d+)>/i)&&_0x459c8c[_0x1c4f('0xaa')](Number(RegExp['$1'])||0x0);}return _0x459c8c;},Game_BattlerBase[_0x1c4f('0x3b')][_0x1c4f('0x63')]=function(){const _0x35cda=_0x1c4f('0x68');if(this[_0x1c4f('0x93')](_0x35cda))return this[_0x1c4f('0x7d')][_0x35cda];return this[_0x1c4f('0x7d')][_0x35cda]=this[_0x1c4f('0x6e')](),this[_0x1c4f('0x7d')][_0x35cda];},Game_BattlerBase['prototype'][_0x1c4f('0x6e')]=function(){let _0x3cdde2=[];for(const _0xffed5a of this[_0x1c4f('0x6a')]()){if(!_0xffed5a)continue;if(_0xffed5a[_0x1c4f('0x4')][_0x1c4f('0x6')](/<(?:REPEAT|REPEATING|CYCLE|STATE) ANIMATION CYCLE:[ ](\d+)>/i)){if(_0x1c4f('0x84')!==_0x1c4f('0x4b'))_0x3cdde2[_0x1c4f('0xaa')](Number(RegExp['$1'])||0x0);else{function _0x195b97(){const _0x36a258=_0x1c4f('0xa');if(this['checkCacheKey'](_0x36a258))return this[_0x1c4f('0x7d')][_0x36a258];return this[_0x1c4f('0x7d')][_0x36a258]=this[_0x1c4f('0xe')](),this['_cache'][_0x36a258];}}}else _0x3cdde2[_0x1c4f('0xaa')](VisuMZ[_0x1c4f('0x2b')][_0x1c4f('0xb6')][_0x1c4f('0x1f')][_0x1c4f('0x8f')]);}return _0x3cdde2;},Game_BattlerBase[_0x1c4f('0x3b')][_0x1c4f('0x1d')]=function(){const _0x149cfa='stateMotionIndex';if(this[_0x1c4f('0x93')](_0x149cfa))return this[_0x1c4f('0x7d')][_0x149cfa];return this[_0x1c4f('0x7d')][_0x149cfa]=this[_0x1c4f('0xb5')](),this['_cache'][_0x149cfa];},Game_BattlerBase[_0x1c4f('0x3b')][_0x1c4f('0xb5')]=function(){const _0x16a22e=this[_0x1c4f('0x6a')]();for(const _0xc3160e of _0x16a22e){if(!_0xc3160e)continue;if(_0xc3160e[_0x1c4f('0x4')][_0x1c4f('0x6')](/<STATE MOTION:[ ](.*)>/i))return this[_0x1c4f('0x7a')]=String(RegExp['$1'])[_0x1c4f('0xc3')]()[_0x1c4f('0xbf')](),0x4;else{if(_0xc3160e[_0x1c4f('0x19')]!==0x0){if(_0x1c4f('0x9e')===_0x1c4f('0x7e')){function _0x217fd1(){let _0x2916fc=_0x1ecf8d(_0xd98e96['$1'])[_0x1c4f('0xbf')]()['split'](',')[_0x1c4f('0x23')](_0x3167ed=>_0x19a30e(_0x3167ed)||0x0);while(_0x2916fc[_0x1c4f('0xc5')]<0x4)_0x2916fc[_0x1c4f('0xaa')](0x0);return _0x2916fc[0x0]=_0x2916fc[0x0]['clamp'](-0xff,0xff),_0x2916fc[0x1]=_0x2916fc[0x1][_0x1c4f('0x5d')](-0xff,0xff),_0x2916fc[0x2]=_0x2916fc[0x2][_0x1c4f('0x5d')](-0xff,0xff),_0x2916fc[0x3]=_0x2916fc[0x3][_0x1c4f('0x5d')](0x0,0xff),_0x2916fc;}}else return _0xc3160e[_0x1c4f('0x19')];}}}return 0x0;},Game_BattlerBase[_0x1c4f('0x3b')]['stateMotionLock']=function(){const _0x4f5733=_0x1c4f('0xa');if(this['checkCacheKey'](_0x4f5733))return this[_0x1c4f('0x7d')][_0x4f5733];return this[_0x1c4f('0x7d')][_0x4f5733]=this[_0x1c4f('0xe')](),this[_0x1c4f('0x7d')][_0x4f5733];},Game_BattlerBase[_0x1c4f('0x3b')][_0x1c4f('0xe')]=function(){const _0x271131=this[_0x1c4f('0x6a')]();for(const _0x218803 of _0x271131){if(!_0x218803)continue;if(_0x218803[_0x1c4f('0x4')][_0x1c4f('0x6')](/<STATE MOTION (?:LOCK|LOCKED)>/i)){if(_0x1c4f('0x79')===_0x1c4f('0x79'))return!![];else{function _0x3fc5ef(){this[_0x1c4f('0x16')]?_0x35b9c5['y']=this[_0x1c4f('0x16')]['y']+_0x34f714[_0x1c4f('0x47')]:_0x5cea79['y']=-this[_0x1c4f('0x47')]+_0x315070[_0x1c4f('0x47')];}}}}return![];},Game_BattlerBase[_0x1c4f('0x3b')][_0x1c4f('0x94')]=function(){const _0x46bb14=_0x1c4f('0x94');if(this['checkCacheKey'](_0x46bb14))return this[_0x1c4f('0x7d')][_0x46bb14];return this[_0x1c4f('0x7d')][_0x46bb14]=this[_0x1c4f('0xb7')](),this[_0x1c4f('0x7d')][_0x46bb14];},Game_BattlerBase[_0x1c4f('0x3b')]['getStateOverlayIndex']=function(){const _0x224189=this[_0x1c4f('0x6a')]();for(const _0x5728d4 of _0x224189){if(!_0x5728d4)continue;if(_0x5728d4[_0x1c4f('0x86')]!==0x0)return _0x5728d4[_0x1c4f('0x86')];}return 0x0;},Game_BattlerBase['prototype'][_0x1c4f('0xd')]=function(){const _0x180e3f=_0x1c4f('0x53');if(this[_0x1c4f('0x93')](_0x180e3f))return this[_0x1c4f('0x7d')][_0x180e3f];return this[_0x1c4f('0x7d')][_0x180e3f]=this['createVisualStateTone'](),this[_0x1c4f('0x7d')][_0x180e3f];},Game_BattlerBase[_0x1c4f('0x3b')][_0x1c4f('0x2c')]=function(){for(const _0x4d76c6 of this['states']()){if(!_0x4d76c6)continue;if(_0x4d76c6[_0x1c4f('0x4')][_0x1c4f('0x6')](/<STATE TONE:[ ](.*)>/i)){if(_0x1c4f('0xae')!=='HrldW'){let _0x3bfeeb=String(RegExp['$1'])[_0x1c4f('0xbf')]()[_0x1c4f('0x27')](',')['map'](_0x2a47d8=>Number(_0x2a47d8)||0x0);while(_0x3bfeeb[_0x1c4f('0xc5')]<0x4)_0x3bfeeb[_0x1c4f('0xaa')](0x0);return _0x3bfeeb[0x0]=_0x3bfeeb[0x0][_0x1c4f('0x5d')](-0xff,0xff),_0x3bfeeb[0x1]=_0x3bfeeb[0x1]['clamp'](-0xff,0xff),_0x3bfeeb[0x2]=_0x3bfeeb[0x2][_0x1c4f('0x5d')](-0xff,0xff),_0x3bfeeb[0x3]=_0x3bfeeb[0x3][_0x1c4f('0x5d')](0x0,0xff),_0x3bfeeb;}else{function _0x5e6039(){_0x5b9fa3[_0x1c4f('0x2b')][_0x1c4f('0x9a')]['call'](this),this[_0x1c4f('0xd2')]();}}}}return[0x0,0x0,0x0,0x0];},Game_BattlerBase[_0x1c4f('0x3b')][_0x1c4f('0x26')]=function(){const _0x17f89e=_0x1c4f('0x26');if(this[_0x1c4f('0x93')](_0x17f89e))return this['_cache'][_0x17f89e];return this[_0x1c4f('0x7d')][_0x17f89e]=this[_0x1c4f('0x55')](),this[_0x1c4f('0x7d')][_0x17f89e];},Game_BattlerBase['prototype']['createVisualHoveringData']=function(){const _0x65396=/<VISUAL (?:HOVER|FLOAT) EFFECT>\s*([\s\S]*)\s*<\/VISUAL (?:HOVER|FLOAT) EFFECT>/i,_0x4672ed={'hover':![],'base':0x64,'speed':0x14,'rate':0x5,'deathHover':![]};for(const _0x3bf381 of this[_0x1c4f('0x62')]()){if(!_0x3bf381)continue;if(_0x3bf381[_0x1c4f('0x4')][_0x1c4f('0x6')](_0x65396)){_0x4672ed[_0x1c4f('0x7c')]=!![];const _0x2e10dc=String(RegExp['$1']);if(_0x2e10dc[_0x1c4f('0x6')](/BASE:[ ](.*)/i)){if('SJelm'!==_0x1c4f('0x35'))_0x4672ed[_0x1c4f('0x3d')]=Number(RegExp['$1'])||0x0;else{function _0x1e5032(){let _0x53d5da=_0x50059d['VisualStateEffects'][_0x1c4f('0x22')][_0x1c4f('0xa4')](this);return _0x53d5da-=_0x1cbd7e[_0x1c4f('0x4c')](this['hoverHeight']()),_0x53d5da;}}}_0x2e10dc[_0x1c4f('0x6')](/SPEED:[ ](.*)/i)&&(_0x4672ed[_0x1c4f('0x7')]=Number(RegExp['$1'])||0x0);_0x2e10dc[_0x1c4f('0x6')](/RATE:[ ](.*)/i)&&(_0x4672ed['rate']=Number(RegExp['$1'])||0x0);if(_0x2e10dc['match'](/DEATH: HOVER/i)){if(_0x1c4f('0xa2')===_0x1c4f('0xa2'))_0x4672ed[_0x1c4f('0x74')]=!![];else{function _0x2971cf(){this[_0x1c4f('0x7d')]={},_0x10e144[_0x1c4f('0x2b')][_0x1c4f('0x91')][_0x1c4f('0xa4')](this);}}}else _0x2e10dc[_0x1c4f('0x6')](/DEATH: FLOOR/i)&&(_0x4672ed[_0x1c4f('0x74')]=![]);break;}}return _0x4672ed;},VisuMZ[_0x1c4f('0x2b')][_0x1c4f('0x4a')]=Game_Battler[_0x1c4f('0x3b')]['onAddState'],Game_Battler[_0x1c4f('0x3b')][_0x1c4f('0x7b')]=function(_0x368039){VisuMZ['VisualStateEffects']['Game_Battler_onAddState']['call'](this,_0x368039),this[_0x1c4f('0xbd')](_0x368039,!![]);},VisuMZ[_0x1c4f('0x2b')][_0x1c4f('0x37')]=Game_Battler[_0x1c4f('0x3b')][_0x1c4f('0x8c')],Game_Battler['prototype'][_0x1c4f('0x8c')]=function(_0x219d5d){this[_0x1c4f('0xbd')](_0x219d5d,![]),VisuMZ['VisualStateEffects'][_0x1c4f('0x37')][_0x1c4f('0xa4')](this,_0x219d5d);},VisuMZ[_0x1c4f('0x2b')][_0x1c4f('0x11')]=Sprite_Battler[_0x1c4f('0x3b')][_0x1c4f('0x76')],Sprite_Battler[_0x1c4f('0x3b')][_0x1c4f('0x76')]=function(){VisuMZ[_0x1c4f('0x2b')][_0x1c4f('0x11')][_0x1c4f('0xa4')](this),this[_0x1c4f('0x31')](),this[_0x1c4f('0x58')]();},Sprite_Battler['prototype'][_0x1c4f('0x31')]=function(){this['_visualStateAnimationRepeatDuration']=0x0,this[_0x1c4f('0x42')]=0x0;},Sprite_Battler[_0x1c4f('0x3b')][_0x1c4f('0x2')]=function(_0x53ec3e,_0x57ff66){const _0x40c0c6=VisuMZ[_0x1c4f('0x2b')][_0x1c4f('0xb6')][_0x1c4f('0x1c')],_0x2a3a95=_0x57ff66?_0x1c4f('0x39'):'Debuff',_0x44a713=_0x57ff66?Game_BattlerBase[_0x1c4f('0x65')]:Game_BattlerBase[_0x1c4f('0x85')],_0x56d19c=_0x44a713+_0x53ec3e,_0x4d0828=TextManager[_0x1c4f('0x10')](_0x53ec3e),_0x47dba6=_0x40c0c6[_0x1c4f('0xbe')['format'](_0x2a3a95)];if(_0x47dba6[_0x1c4f('0xc5')]<=0x0)return;let _0x5c0506=_0x47dba6[_0x1c4f('0xb1')](_0x4d0828);const _0x537c0a={'textColor':_0x40c0c6[_0x1c4f('0x1a')[_0x1c4f('0xb1')](_0x2a3a95)]||0x0,'flashColor':_0x40c0c6[_0x1c4f('0x3e')[_0x1c4f('0xb1')](_0x2a3a95)]||[0x0,0x0,0x0,0x0],'flashDuration':_0x40c0c6[_0x1c4f('0x5a')[_0x1c4f('0xb1')](_0x2a3a95)]||0x0},_0x4d994c=ImageManager['loadSystem']('IconSet');_0x4d994c[_0x1c4f('0x66')](this['setupIconTextPopup'][_0x1c4f('0xc8')](this,_0x56d19c,_0x5c0506,_0x537c0a));},Sprite_Battler[_0x1c4f('0x3b')][_0x1c4f('0x97')]=function(_0x1bf2be,_0x1c7955){const _0x5e18ae=VisuMZ[_0x1c4f('0x2b')][_0x1c4f('0xb6')][_0x1c4f('0x1f')],_0x110f16=$dataStates[_0x1bf2be];if(!_0x110f16)return;const _0x45637a=_0x1c7955?_0x1c4f('0x13'):_0x1c4f('0x4f'),_0x68693e=_0x110f16[_0x1c4f('0x52')];if(_0x68693e<=0x0)return;const _0x506362=_0x5e18ae[_0x1c4f('0xbe')[_0x1c4f('0xb1')](_0x45637a)];if(_0x506362[_0x1c4f('0xc5')]<=0x0)return;let _0x29a9de=_0x506362[_0x1c4f('0xb1')](_0x110f16[_0x1c4f('0xd4')]);const _0x23f126={'textColor':_0x5e18ae[_0x1c4f('0x2f')]||0x0,'flashColor':_0x5e18ae[_0x1c4f('0x6c')]||[0x0,0x0,0x0,0x0],'flashDuration':_0x5e18ae['FlashDuration']||0x0};if(_0x5e18ae[_0x1c4f('0xa9')]){if(_0x1c4f('0x28')!==_0x1c4f('0xb2'))_0x23f126[_0x1c4f('0xa5')]=ColorManager[_0x1c4f('0x57')](_0x110f16);else{function _0x1687b8(){const _0x2f0081=_0x1c4f('0x26');if(this[_0x1c4f('0x93')](_0x2f0081))return this[_0x1c4f('0x7d')][_0x2f0081];return this[_0x1c4f('0x7d')][_0x2f0081]=this[_0x1c4f('0x55')](),this[_0x1c4f('0x7d')][_0x2f0081];}}}VisuMZ[_0x1c4f('0x2b')][_0x1c4f('0x77')](_0x110f16,_0x23f126);const _0x45ce14=ImageManager[_0x1c4f('0xca')](_0x1c4f('0xc0'));_0x45ce14['addLoadListener'](this[_0x1c4f('0xd0')][_0x1c4f('0xc8')](this,_0x68693e,_0x29a9de,_0x23f126));},VisuMZ[_0x1c4f('0x2b')]['customizeStatePopup']=function(_0x2e3f6f,_0x40b744){const _0x26be7b=_0x2e3f6f['note'];if(_0x26be7b[_0x1c4f('0x6')](/<STATE POPUP>\s*([\s\S]*)\s*<\/STATE POPUP>/i)){const _0x12dec3=String(RegExp['$1'])[_0x1c4f('0xbf')]()[_0x1c4f('0x27')](/[\r\n]+/);for(const _0x52e508 of _0x12dec3){if('rQrtA'!==_0x1c4f('0x9f')){_0x52e508[_0x1c4f('0x6')](/(?:TEXT COLOR|TEXTCOLOR):[ ](.*)/i)&&(_0x40b744[_0x1c4f('0xa5')]=String(RegExp['$1'])[_0x1c4f('0xbf')]());if(_0x52e508[_0x1c4f('0x6')](/(?:FLASH COLOR|FLASHCOLOR):[ ](.*)/i)){if(_0x1c4f('0x54')!==_0x1c4f('0x54')){function _0x54ba94(){const _0x5352b=_0x1c4f('0x96');if(this[_0x1c4f('0x93')](_0x5352b))return this['_cache'][_0x5352b];return this['_cache'][_0x5352b]=this['createVisualRepeatingStateAnimation'](),this[_0x1c4f('0x7d')][_0x5352b];}}else{_0x40b744[_0x1c4f('0xc4')]=String(RegExp['$1'])[_0x1c4f('0xbf')]()[_0x1c4f('0x27')](',')[_0x1c4f('0x23')](_0x3f88bb=>Number(_0x3f88bb));while(_0x40b744[_0x1c4f('0xc4')][_0x1c4f('0xc5')]<=0x4){if(_0x1c4f('0xc1')!==_0x1c4f('0xc1')){function _0x408aad(){_0x154087[_0x1c4f('0x2b')][_0x1c4f('0xaf')][_0x1c4f('0xa4')](this),this['updateVisualStateEffects']();}}else _0x40b744[_0x1c4f('0xc4')][_0x1c4f('0xaa')](0x0);};_0x40b744['flashDuration']=_0x40b744['flashDuration']||0x1;}}_0x52e508[_0x1c4f('0x6')](/(?:FLASH DURATION|FLASHDURATION):[ ](\d+)/i)&&(_0x40b744[_0x1c4f('0xc7')]=Number(RegExp['$1']));}else{function _0x554ff2(){const _0x42bf52=_0x1c4f('0x1d');if(this[_0x1c4f('0x93')](_0x42bf52))return this[_0x1c4f('0x7d')][_0x42bf52];return this['_cache'][_0x42bf52]=this[_0x1c4f('0xb5')](),this[_0x1c4f('0x7d')][_0x42bf52];}}}}},Sprite_Battler[_0x1c4f('0x3b')][_0x1c4f('0x33')]=function(){if(!this[_0x1c4f('0x41')])return;if(!this[_0x1c4f('0x41')][_0x1c4f('0x8a')]())return;if(this[_0x1c4f('0xab')]>0x0){this[_0x1c4f('0xab')]--;return;}const _0x401901=this[_0x1c4f('0x41')]['getVisualRepeatingStateAnimation'](),_0x51cbb6=this['_battler'][_0x1c4f('0x63')]();if(_0x401901[_0x1c4f('0xc5')]<=0x0)return;if(this[_0x1c4f('0x42')]>=_0x401901[_0x1c4f('0xc5')]){if(_0x1c4f('0x15')===_0x1c4f('0x15'))this[_0x1c4f('0x42')]=0x0;else{function _0x52cc01(){_0x1498ca['y']=this['_stateIconSprite']['y']+_0x337107[_0x1c4f('0x47')];}}}const _0x4fedde=_0x401901[this['_visualStateAnimationIndex']],_0x1696e1=VisuMZ['VisualStateEffects'][_0x1c4f('0xb6')][_0x1c4f('0x1f')],_0x6061dd=[this['_battler']],_0x9f8f38=_0x1696e1[_0x1c4f('0xa1')],_0x29e83e=_0x1696e1['RepeatMute'];$gameTemp[_0x1c4f('0x46')](_0x6061dd,_0x4fedde,_0x9f8f38,_0x29e83e);const _0x4da279=_0x51cbb6[this['_visualStateAnimationIndex']]||_0x1696e1['CycleTime'];this['_visualStateAnimationRepeatDuration']=_0x4da279,this[_0x1c4f('0x42')]++;},Sprite_Battler['prototype'][_0x1c4f('0xd2')]=function(){if(this['_stateIconSprite']){if(_0x1c4f('0x56')===_0x1c4f('0x56'))this[_0x1c4f('0xc6')]();else{function _0x1708c0(){if(!_0x522557[_0x1c4f('0xc')]())return;if(!this['battler']())return;const _0x3ea440=_0x1d2af3[_0x1c4f('0x2b')][_0x1c4f('0xb6')][_0x1c4f('0x1c')],_0x5e3e54=_0x468d76?_0x1c4f('0x39'):'Debuff';_0x3ea440[_0x1c4f('0xf')]&&this[_0x1c4f('0x48')]()[_0x1c4f('0x2')](_0x4d6cd2,_0x2ad132);if(_0x3ea440[_0x1c4f('0x30')]){const _0x4bd083=[this],_0x5c46f=_0x3ea440[_0x1c4f('0x43')['format'](_0x5e3e54,_0xf30d7)]||0x0,_0x2b1f44=_0x3ea440[_0x1c4f('0xb8')],_0x1795fd=_0x3ea440[_0x1c4f('0x34')];_0x223ce0['requestFauxAnimation'](_0x4bd083,_0x5c46f,_0x2b1f44,_0x1795fd);}}}}this[_0x1c4f('0xa7')]&&this[_0x1c4f('0xcf')](),this[_0x1c4f('0x33')](),this[_0x1c4f('0x89')]();},Sprite_Battler['prototype'][_0x1c4f('0xc6')]=function(){if(!this['_battler'])return;const _0x3c25b7=VisuMZ[_0x1c4f('0x2b')][_0x1c4f('0xb6')][_0x1c4f('0x60')],_0x3f42ca=this[_0x1c4f('0x16')];_0x3f42ca[_0x1c4f('0x5c')]=this[_0x1c4f('0x41')]['isActor']()?_0x3c25b7[_0x1c4f('0x14')]:_0x3c25b7[_0x1c4f('0x5f')];if(this[_0x1c4f('0x41')][_0x1c4f('0x81')]()){_0x3f42ca['x']=0x0;if(this[_0x1c4f('0x41')][_0x1c4f('0x3c')]){if(_0x1c4f('0x29')===_0x1c4f('0x78')){function _0x1de63f(){const _0x43dde0=_0x2100fd['VisualStateEffects'][_0x1c4f('0xb6')][_0x1c4f('0x1f')],_0x417d89=_0x43dde0['AnimationMirror'],_0x283754=_0x43dde0['AnimationMute'],_0x4ebea=_0x3af1b5[_0x1c4f('0x4')];if(_0x2d4083&&_0x4ebea[_0x1c4f('0x6')](/(?:ADD|APPLY) ANIMATION:[ ](\d+)/i)){const _0x3c932b=_0xcb1567(_0x28c1de['$1']);_0x1e5cc1[_0x1c4f('0x46')]([_0x11e33f],_0x3c932b,_0x417d89,_0x283754);}if(!_0x55779e&&_0x4ebea[_0x1c4f('0x6')](/(?:ERASE|REMOVE) ANIMATION:[ ](\d+)/i)){const _0x483f12=_0x3e332c(_0x1ed62e['$1']);_0x4223be[_0x1c4f('0x46')]([_0x583609],_0x483f12,_0x417d89,_0x283754);}}}else _0x3f42ca['x']+=this[_0x1c4f('0x41')][_0x1c4f('0x3c')]();}_0x3f42ca['y']=-Math[_0x1c4f('0x20')]((this[_0x1c4f('0x47')]+0x28)*0.9),_0x3f42ca['y']<0x14-this['y']&&(_0x3f42ca['y']=0x14-this['y']),this['_battler'][_0x1c4f('0x1')]&&(_0x3f42ca['y']+=this[_0x1c4f('0x41')][_0x1c4f('0x1')]());}},Sprite_Battler['prototype'][_0x1c4f('0xcf')]=function(){if(!this[_0x1c4f('0x41')])return;const _0x20e992=VisuMZ['VisualStateEffects']['Settings'][_0x1c4f('0x60')],_0x118880=this['_stateSprite'];_0x118880[_0x1c4f('0x5c')]=this[_0x1c4f('0x41')][_0x1c4f('0x81')]()?_0x20e992['ActorOverlay']:_0x20e992[_0x1c4f('0xcc')];if(this['_svBattlerSprite']){if(this['_battler'][_0x1c4f('0x51')]())_0x118880[_0x1c4f('0x5c')]=![],this[_0x1c4f('0x7f')]['_stateSprite'][_0x1c4f('0x5c')]=!![];else{if(_0x1c4f('0xd3')===_0x1c4f('0xd3'))this[_0x1c4f('0x7f')][_0x1c4f('0xa7')][_0x1c4f('0x5c')]=![],_0x118880[_0x1c4f('0x5c')]=_0x20e992[_0x1c4f('0xcc')];else{function _0x3727d5(){this[_0x1c4f('0x4d')]=-0x1;}}}}if(this[_0x1c4f('0x41')][_0x1c4f('0x49')]()&&!this['_battler'][_0x1c4f('0x51')]()){if(this[_0x1c4f('0x16')]){if(_0x1c4f('0xb0')!==_0x1c4f('0xb0')){function _0x3c6026(){this[_0x1c4f('0xab')]=0x0,this[_0x1c4f('0x42')]=0x0;}}else _0x118880['y']=this[_0x1c4f('0x16')]['y']+_0x118880[_0x1c4f('0x47')];}else _0x118880['y']=-this[_0x1c4f('0x47')]+_0x118880[_0x1c4f('0x47')];};},Sprite_Battler[_0x1c4f('0x3b')][_0x1c4f('0x89')]=function(){if(!this['_battler'])return;const _0x4f2add=this[_0x1c4f('0x21')](),_0x29634c=this[_0x1c4f('0x41')][_0x1c4f('0xd')]();_0x4f2add&&_0x4f2add[_0x1c4f('0x5b')](_0x29634c),this[_0x1c4f('0x0')]&&this[_0x1c4f('0x0')][_0x1c4f('0x5b')](_0x29634c);},Sprite_Battler[_0x1c4f('0x3b')][_0x1c4f('0x21')]=function(){return this['_mainSprite']||this;},VisuMZ[_0x1c4f('0x2b')][_0x1c4f('0xd1')]=Sprite_Battler[_0x1c4f('0x3b')][_0x1c4f('0xce')],Sprite_Battler['prototype'][_0x1c4f('0xce')]=function(){if(!this[_0x1c4f('0x99')])return;if(this[_0x1c4f('0x41')]['stateMotionLock']()){if(_0x1c4f('0x6d')==='HinqN'){function _0x4fdcba(){_0x1255ba[_0x1c4f('0x2b')][_0x1c4f('0x4a')][_0x1c4f('0xa4')](this,_0x41ae02),this[_0x1c4f('0xbd')](_0x12712c,!![]);}}else this[_0x1c4f('0x99')]['animation'][_0x1c4f('0x50')]=0x0;}else{if(_0x1c4f('0xbb')===_0x1c4f('0x2a')){function _0x5310ca(){if(!this[_0x1c4f('0x41')])return;if(!this[_0x1c4f('0x41')][_0x1c4f('0x8a')]())return;if(this[_0x1c4f('0xab')]>0x0){this[_0x1c4f('0xab')]--;return;}const _0x5ed156=this['_battler'][_0x1c4f('0xa6')](),_0xe00d6f=this[_0x1c4f('0x41')][_0x1c4f('0x63')]();if(_0x5ed156[_0x1c4f('0xc5')]<=0x0)return;this[_0x1c4f('0x42')]>=_0x5ed156[_0x1c4f('0xc5')]&&(this['_visualStateAnimationIndex']=0x0);const _0x56db82=_0x5ed156[this[_0x1c4f('0x42')]],_0x23b95f=_0x5f0a2c[_0x1c4f('0x2b')][_0x1c4f('0xb6')][_0x1c4f('0x1f')],_0x21460d=[this[_0x1c4f('0x41')]],_0x418d79=_0x23b95f[_0x1c4f('0xa1')],_0x1412e1=_0x23b95f[_0x1c4f('0x87')];_0x1c0545['requestFauxAnimation'](_0x21460d,_0x56db82,_0x418d79,_0x1412e1);const _0x16a133=_0xe00d6f[this['_visualStateAnimationIndex']]||_0x23b95f[_0x1c4f('0x8f')];this[_0x1c4f('0xab')]=_0x16a133,this[_0x1c4f('0x42')]++;}}else VisuMZ[_0x1c4f('0x2b')]['Sprite_Battler_updateDragonbonesTimeScale']['call'](this);}},Sprite_Battler[_0x1c4f('0x3b')]['initVisualHoverEffect']=function(){this['_hoverMinimum']=-0x1;},VisuMZ[_0x1c4f('0x2b')][_0x1c4f('0x22')]=Sprite_Battler[_0x1c4f('0x3b')][_0x1c4f('0x5')],Sprite_Battler['prototype']['extraPositionY']=function(){let _0x23f046=VisuMZ[_0x1c4f('0x2b')][_0x1c4f('0x22')][_0x1c4f('0xa4')](this);return _0x23f046-=Math[_0x1c4f('0x4c')](this[_0x1c4f('0x75')]()),_0x23f046;},Sprite_Battler['prototype'][_0x1c4f('0x75')]=function(){if(this['constructor']===Sprite_SvEnemy)return 0x0;if(!this[_0x1c4f('0x41')])return 0x0;const _0x44d235=this[_0x1c4f('0x41')][_0x1c4f('0x26')]();let _0x584ad5=0x0;this[_0x1c4f('0x72')]=this[_0x1c4f('0x72')]||Math[_0x1c4f('0x4c')](Math[_0x1c4f('0x2d')]()*0x2710);const _0x5dc412=Graphics[_0x1c4f('0x5e')]+this[_0x1c4f('0x72')],_0x2fd58a=_0x44d235[_0x1c4f('0x7')],_0x48c47c=_0x44d235['rate'];let _0x31b846=_0x44d235[_0x1c4f('0x7c')];if(_0x31b846&&this[_0x1c4f('0x41')][_0x1c4f('0x80')]())_0x31b846=_0x44d235[_0x1c4f('0x74')];if(_0x31b846){_0x584ad5+=Math['cos'](_0x5dc412/(_0x2fd58a||0x1))*_0x48c47c,_0x584ad5+=_0x44d235[_0x1c4f('0x3d')];if(this[_0x1c4f('0x4d')]<0x0)this[_0x1c4f('0x4d')]=_0x584ad5;const _0x29bd95=this[_0x1c4f('0x4d')]+_0x2fd58a/Math['max'](0x1,_0x48c47c**1.5);this[_0x1c4f('0x4d')]=Math[_0x1c4f('0x4e')](_0x29bd95,_0x584ad5);}else{const _0x529440=this[_0x1c4f('0x4d')]-_0x2fd58a/Math[_0x1c4f('0xd5')](0x1,_0x48c47c/0x2);this['_hoverMinimum']=Math[_0x1c4f('0xd5')](_0x529440,0x0);}return Math[_0x1c4f('0xd5')](0x0,this[_0x1c4f('0x4d')]);},VisuMZ[_0x1c4f('0x2b')][_0x1c4f('0x9b')]=Sprite_Actor[_0x1c4f('0x3b')][_0x1c4f('0xb3')],Sprite_Actor['prototype'][_0x1c4f('0xb3')]=function(){VisuMZ['VisualStateEffects'][_0x1c4f('0x9b')][_0x1c4f('0xa4')](this),this[_0x1c4f('0x9d')]();},Sprite_Actor[_0x1c4f('0x3b')][_0x1c4f('0x9d')]=function(){if(this[_0x1c4f('0xbc')]!==Sprite_Actor)return;this['_stateIconSprite']=new Sprite_StateIcon(),this['addChild'](this[_0x1c4f('0x16')]);},VisuMZ[_0x1c4f('0x2b')][_0x1c4f('0x38')]=Sprite_Actor[_0x1c4f('0x3b')][_0x1c4f('0xba')],Sprite_Actor[_0x1c4f('0x3b')][_0x1c4f('0xba')]=function(){const _0x5b77a6=this[_0x1c4f('0x8d')];if(!_0x5b77a6)return;const _0x5f136c=_0x5b77a6[_0x1c4f('0x1d')]();if(_0x5f136c>=0x4){if(!_0x5b77a6[_0x1c4f('0xcd')]()&&!_0x5b77a6[_0x1c4f('0xa8')]()){if(_0x1c4f('0x1e')!==_0x1c4f('0x3a'))return this[_0x1c4f('0x2e')](_0x5b77a6['_customStateMotion']);else{function _0x1f5010(){return!![];}}}}VisuMZ['VisualStateEffects'][_0x1c4f('0x38')][_0x1c4f('0xa4')](this);},VisuMZ[_0x1c4f('0x2b')]['Sprite_Actor_setBattler']=Sprite_Actor['prototype'][_0x1c4f('0x32')],Sprite_Actor['prototype']['setBattler']=function(_0x33cb59){VisuMZ['VisualStateEffects'][_0x1c4f('0x82')][_0x1c4f('0xa4')](this,_0x33cb59);if(this['_stateIconSprite'])this[_0x1c4f('0x16')]['setup'](_0x33cb59);},VisuMZ[_0x1c4f('0x2b')][_0x1c4f('0xaf')]=Sprite_Actor['prototype'][_0x1c4f('0x98')],Sprite_Actor['prototype']['update']=function(){VisuMZ[_0x1c4f('0x2b')][_0x1c4f('0xaf')]['call'](this),this[_0x1c4f('0xd2')]();},VisuMZ[_0x1c4f('0x2b')][_0x1c4f('0x92')]=Sprite_Actor['prototype'][_0x1c4f('0x8b')],Sprite_Actor['prototype'][_0x1c4f('0x8b')]=function(){if(this[_0x1c4f('0x41')]['stateMotionLock']())return;VisuMZ['VisualStateEffects'][_0x1c4f('0x92')][_0x1c4f('0xa4')](this);},VisuMZ[_0x1c4f('0x2b')][_0x1c4f('0xac')]=Sprite_Enemy['prototype'][_0x1c4f('0x9d')],Sprite_Enemy[_0x1c4f('0x3b')][_0x1c4f('0x9d')]=function(){this[_0x1c4f('0xb3')](),VisuMZ['VisualStateEffects']['Sprite_Enemy_createStateIconSprite'][_0x1c4f('0xa4')](this);},Sprite_Enemy[_0x1c4f('0x3b')][_0x1c4f('0xb3')]=function(){this[_0x1c4f('0xa7')]=new Sprite_StateOverlay(),this['addChild'](this[_0x1c4f('0xa7')]);},VisuMZ['VisualStateEffects'][_0x1c4f('0x6f')]=Sprite_Enemy[_0x1c4f('0x3b')][_0x1c4f('0x32')],Sprite_Enemy[_0x1c4f('0x3b')]['setBattler']=function(_0x33e4f3){VisuMZ[_0x1c4f('0x2b')][_0x1c4f('0x6f')][_0x1c4f('0xa4')](this,_0x33e4f3);if(this[_0x1c4f('0xa7')])this[_0x1c4f('0xa7')]['setup'](_0x33e4f3);},VisuMZ[_0x1c4f('0x2b')]['Sprite_Enemy_update']=Sprite_Enemy['prototype']['update'],Sprite_Enemy[_0x1c4f('0x3b')][_0x1c4f('0x98')]=function(){VisuMZ['VisualStateEffects']['Sprite_Enemy_update'][_0x1c4f('0xa4')](this),this['updateVisualStateEffects']();};