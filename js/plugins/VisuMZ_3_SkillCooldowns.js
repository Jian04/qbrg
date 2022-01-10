//=============================================================================
// VisuStella MZ - Skill Cooldowns
// VisuMZ_3_SkillCooldowns.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_SkillCooldowns = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillCooldowns = VisuMZ.SkillCooldowns || {};
VisuMZ.SkillCooldowns.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.00] [SkillCooldowns]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skill_Cooldowns_VisuStella_MZ
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Skill Cooldowns are a mechanic added by the game to prevent repeated skill
 * usage (or as some gamers call it, skill spamming). Upon usage in battle, a
 * skill with a cooldown will become unselectable for a duration of time set by
 * either notetags and/or Plugin Commands. This duration would have to pass in
 * order for the skill to become usable once again.
 *
 * Skill Warmups are another addition by this plugin. Skills with warmups will
 * start the battle unusable until a certain duration has passed. This can help
 * prevent strong skills from being used from the very start of battle.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Add cooldowns and warmups to skills.
 * * Control the way they're displayed in game through the Plugin Parameters.
 * * Create trait object effects that alter the finalized values of cooldowns
 *   and warmups applied to skills.
 * * Create action effects that alter the existing durations of cooldowns and
 *   warmups applied to skills.
 * * Create cooldowns for skills that are linked to other skills, skill types,
 *   and/or affect all skills globally.
 * * Plugin Commands that let you alter cooldowns and warmups as you like.
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
 * New Mechanics: Cooldowns and Warmups
 * ============================================================================
 *
 * This section will explain the key points behind cooldowns and warmups.
 *
 * ---
 *
 * Cooldowns:
 *
 * - At the start and end of battle, any and all cooldowns are cleared.
 * - Cooldowns are applied upon usage only during battle.
 * - Upon usage, skills can affect the cooldowns of an entire skill type or all
 *   of a unit's skills at once.
 *
 * ---
 *
 * Warmups:
 *
 * - Upon the start of battle, Warmups will be applied to affected skills.
 * - Upon the end of battle, any and all warmups are cleared.
 * - If the unit in battle has an advantageous start (ie. preemptive strike),
 *   then the warmup duration can be reduced. This value can be changed in the
 *   plugin parameters.
 *
 * ---
 * 
 * Both Cooldowns and Warmups:
 *
 * - While a skill is on CD/WU, it cannot be used.
 * - CD/WU are updated once per turn for each unit.
 * - CD/WU cannot be applied to Attack and Guard skills.
 * - CD/WU cannot be applied to skills with the <Bypass CD/WU> notetag.
 * - CD/WU can be affected by notetag traits found in various database objects.
 * - CD/WU can be altered by skills and items with notetag effects.
 * - CD/WU have a maximum duration that can be set in the Plugin Parameters.
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
 * === Skill-Only Notetags ===
 *
 * The following notetags are used for skills and are related to setting the
 * primary uses of Cooldowns and Warmups.
 *
 * ---
 *
 * <Bypass Cooldowns>
 * <Bypass Warmups>
 *
 * - Used for: Skill Notetags
 * - Lets the skill bypass cooldowns and/or warmups.
 *
 * ---
 *
 * <Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will gain a cooldown upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 *
 * ---
 *
 * <Skill id Cooldown: x>
 * <Skill name Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will cause listed skills to gain a cooldown upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Stype id Cooldown: x>
 * <Stype name Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will cause all skills with the skill type to gain a cooldown
 *   upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Global Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will cause all skills to gain a cooldown upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 *
 * ---
 *
 * <Warmup: x>
 *
 * - Used for: Skill Notetags
 * - The skill will gain a warmup upon the start of battle.
 * - Replace 'x' with the number of turns to set the warmup to.
 *
 * ---
 *
 * === JavaScript Notetags: Skill-Only ===
 *
 * The following are notetags made for users with JavaScript knowledge to give
 * skills dynamic cooldown or warmup durations.
 *
 * ---
 *
 * <JS Cooldown>
 *  code
 *  code
 *  turns = code
 * </JS Cooldown>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code used to determine the base cooldown
 *   for this skill.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized cooldown value.
 *
 * ---
 * 
 * <JS On Cooldown Update>
 *  code
 *  code
 *  code
 * </JS On Cooldown Update>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's cooldown updates.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized cooldown value.
 * 
 * ---
 * 
 * <JS On Cooldown Ready>
 *  code
 *  code
 *  code
 * </JS On Cooldown Ready>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's cooldown hits 0 and becomes ready.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * 
 * ---
 *
 * <JS Warmup>
 *  code
 *  code
 *  turns = code
 * </JS Warmup>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code used to determine the base warmup
 *   for this skill.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized warmup value.
 *
 * ---
 * 
 * <JS On Warmup Update>
 *  code
 *  code
 *  code
 * </JS On Warmup Update>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's warmup updates.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized warmup value.
 * 
 * ---
 * 
 * <JS On Warmup Ready>
 *  code
 *  code
 *  code
 * </JS On Warmup Ready>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's warmup hits 0 and becomes ready.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * 
 * ---
 *
 * === Cooldown/Warmup Notetag Traits ===
 *
 * These Notetag Traits help modify the finalized value of a cooldown/warmup.
 * The final cooldown/warmup duration is calculated by the following formula:
 * 
 * (base + plus) * rate + flat
 *
 * The base value is the amount calculated through the <Cooldown: x> and
 * <Warmup: x> notetags found in the section above.
 *
 * ---
 *
 * <Skill id Cooldown Plus: +x>
 * <Skill id Cooldown Plus: -x>
 *
 * <Skill name Cooldown Plus: +x>
 * <Skill name Cooldown Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Cooldown Rate: x%>
 * <Skill id Cooldown Rate: x.x>
 *
 * <Skill name Cooldown Rate: x%>
 * <Skill name Cooldown Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards this specific skill.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Cooldown Flat: +x>
 * <Skill id Cooldown Flat: -x>
 *
 * <Skill name Cooldown Flat: +x>
 * <Skill name Cooldown Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Stype id Cooldown Plus: +x>
 * <Stype id Cooldown Plus: -x>
 *
 * <Stype name Cooldown Plus: +x>
 * <Stype name Cooldown Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Cooldown Rate: x%>
 * <Stype id Cooldown Rate: x.x>
 *
 * <Stype name Cooldown Rate: x%>
 * <Stype name Cooldown Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards skills with this skill type.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Cooldown Flat: +x>
 * <Stype id Cooldown Flat: -x>
 *
 * <Stype name Cooldown Flat: +x>
 * <Stype name Cooldown Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Global Cooldown Plus: +x>
 * <Global Cooldown Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * <Global Cooldown Rate: x%>
 * <Global Cooldown Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards all skills.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 *
 * ---
 *
 * <Global Cooldown Flat: +x>
 * <Global Cooldown Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * <Skill id Warmup Plus: +x>
 * <Skill id Warmup Plus: -x>
 *
 * <Skill name Warmup Plus: +x>
 * <Skill name Warmup Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Warmup Rate: x%>
 * <Skill id Warmup Rate: x.x>
 *
 * <Skill name Warmup Rate: x%>
 * <Skill name Warmup Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards this specific skill.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Warmup Flat: +x>
 * <Skill id Warmup Flat: -x>
 *
 * <Skill name Warmup Flat: +x>
 * <Skill name Warmup Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Stype id Warmup Plus: +x>
 * <Stype id Warmup Plus: -x>
 *
 * <Stype name Warmup Plus: +x>
 * <Stype name Warmup Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Warmup Rate: x%>
 * <Stype id Warmup Rate: x.x>
 *
 * <Stype name Warmup Rate: x%>
 * <Stype name Warmup Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards skills with this skill type.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Warmup Flat: +x>
 * <Stype id Warmup Flat: -x>
 *
 * <Stype name Warmup Flat: +x>
 * <Stype name Warmup Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Global Warmup Plus: +x>
 * <Global Warmup Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * <Global Warmup Rate: x%>
 * <Global Warmup Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards all skills.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 *
 * ---
 *
 * <Global Warmup Flat: +x>
 * <Global Warmup Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * === Cooldown/Warmup Notetag Actions ===
 *
 * The following notetags are actively altering effects that target cooldowns
 * and/or warmups. Cooldown effects may be applied at any moment through these
 * while warmup effects will only affect skills on warmup currently.
 *
 * ---
 *
 * <Clear User Cooldowns>
 * <Clear Target Cooldowns>
 *
 * - Used for: Skill, Item Notetags
 * - Clears all cooldowns for the user/target.
 *
 * ---
 *
 * <Clear User Warmups>
 * <Clear Target Warmups>
 *
 * - Used for: Skill, Item Notetags
 * - Clears all warmups for the user/target.
 *
 * ---
 *
 * <User Skill id Cooldown: +x>
 * <User Skill id Cooldown: -x>
 *
 * <User Skill name Cooldown: +x>
 * <User Skill name Cooldown: -x>
 *
 * <Target Skill id Cooldown: +x>
 * <Target Skill id Cooldown: -x>
 *
 * <Target Skill name Cooldown: +x>
 * <Target Skill name Cooldown: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's cooldown duration for this specific skill.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <User Stype id Cooldown: +x>
 * <User Stype id Cooldown: -x>
 *
 * <User Stype name Cooldown: +x>
 * <User Stype name Cooldown: -x>
 *
 * <Target Stype id Cooldown: +x>
 * <Target Stype id Cooldown: -x>
 *
 * <Target Stype name Cooldown: +x>
 * <Target Stype name Cooldown: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's cooldown duration for all skills with this type.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <User Global Cooldown: +x>
 * <User Global Cooldown: -x>
 *
 * <Target Global Cooldown: +x>
 * <Target Global Cooldown: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's cooldown duration for all skills.
 * - Replace 'x' with the amount to change the duration by.
 *
 * ---
 *
 * <User Skill id Warmup: +x>
 * <User Skill id Warmup: -x>
 *
 * <User Skill name Warmup: +x>
 * <User Skill name Warmup: -x>
 *
 * <Target Skill id Warmup: +x>
 * <Target Skill id Warmup: -x>
 *
 * <Target Skill name Warmup: +x>
 * <Target Skill name Warmup: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's warmup duration for this specific skill.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 * - NOTE: Warmup changes only apply to skills that are still in warmup.
 *
 * ---
 *
 * <User Stype id Warmup: +x>
 * <User Stype id Warmup: -x>
 *
 * <User Stype name Warmup: +x>
 * <User Stype name Warmup: -x>
 *
 * <Target Stype id Warmup: +x>
 * <Target Stype id Warmup: -x>
 *
 * <Target Stype name Warmup: +x>
 * <Target Stype name Warmup: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's warmup duration for all skills with this type.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 * - NOTE: Warmup changes only apply to skills that are still in warmup.
 *
 * ---
 *
 * <User Global Warmup: +x>
 * <User Global Warmup: -x>
 *
 * <Target Global Warmup: +x>
 * <Target Global Warmup: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's warmup duration for all skills.
 * - Replace 'x' with the amount to change the duration by.
 * - NOTE: Warmup changes only apply to skills that are still in warmup.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Skill Cooldown
 * - Change cooldowns for a specific skill(s).
 *
 *   Step 1: Actor ID(s):
 *   - Select which Actor Target ID(s) to affect.
 *
 *   Step 2: Skill ID(s):
 *   - Select which Skill ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Actor: SType Cooldown
 * - Change cooldowns for all skills of a skill type(s).
 *
 *   Step 1: Actor ID(s):
 *   - Select which Actor Target ID(s) to affect.
 *
 *   Step 2: Skill Type ID(s):
 *   - Select which Skill Type ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Actor: Global Cooldown
 * - Change cooldowns for all skills for target(s).
 *
 *   Step 1: Actor ID(s):
 *   - Select which Actor Target ID(s) to affect.
 *
 *   Step 2: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 3: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Skill Cooldown
 * - Change cooldowns for a specific skill(s).
 *
 *   Step 1: Enemy Index(es):
 *   - Select which Enemy Index(es) to affect.
 *
 *   Step 2: Skill ID(s):
 *   - Select which Skill ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Enemy: SType Cooldown
 * - Change cooldowns for all skills of a skill type(s).
 *
 *   Step 1: Enemy Index(es):
 *   - Select which Enemy Index(es) to affect.
 *
 *   Step 2: Skill Type ID(s):
 *   - Select which Skill Type ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Enemy: Global Cooldown
 * - Change cooldowns for all skills for target(s).
 *
 *   Step 1: Enemy Index(es):
 *   - Select which Enemy Index(es) to affect.
 *
 *   Step 2: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 3: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Cooldown Settings
 * ============================================================================
 *
 * These are the general settings pertaining to cooldowns in-game.
 *
 * ---
 *
 * Settings
 * 
 *   Icon:
 *   - Icon used for Skill Cooldowns.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display Skill Cooldowns.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display Skill Cooldowns.
 *
 * ---
 *
 * Window Display
 * 
 *   Show Cooldowns?:
 *   - Display Skill Cooldowns?
 * 
 *   Text Format:
 *   - Text format for displaying Skill Cooldowns.
 *   - %1 - Turns, %2 - Icon
 *
 * ---
 *
 * Mechanics
 * 
 *   Max Cooldown:
 *   - Maximum turns that cooldowns can be.
 * 
 *   JS: On Cooldown Update:
 *   - Code ran when a skill's cooldown updates.
 * 
 *   JS: On Cooldown Ready:
 *   - Code ran when a skill's cooldown reaches 0.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Warmup Settings
 * ============================================================================
 *
 * These are the general settings pertaining to warmups in-game.
 *
 * ---
 *
 * Settings
 * 
 *   Icon:
 *   - Icon used for Skill Warmups.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display Skill Warmups.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display Skill Warmups.
 *
 * ---
 *
 * Window Display
 * 
 *   Show Warmups?:
 *   - Display Skill Warmups?
 * 
 *   Text Format:
 *   - Text format for displaying Skill Warmups.
 *   - %1 - Turns, %2 - Icon
 *
 * ---
 *
 * Mechanics
 * 
 *   Preemptive Bonus:
 *   - How many turns should be dropped off Warmups on a Preemptive attack?
 * 
 *   Max Warmup:
 *   - Maximum turns that warmups can be.
 * 
 *   JS: On Warmup Update:
 *   - Code ran when a skill's warmup updates.
 * 
 *   JS: On Warmup Ready:
 *   - Code ran when a skill's warmup reaches 0.
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
 * Version 1.00: September 9, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorSkillCooldown
 * @text Actor: Skill Cooldown
 * @desc Change cooldowns for a specific skill(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill ID(s)
 * @type skill[]
 * @desc Select which Skill ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorStypeCooldown
 * @text Actor: SType Cooldown
 * @desc Change cooldowns for all skills of a skill type(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill Type ID(s)
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which Skill Type ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorGlobalCooldown
 * @text Actor: Global Cooldown
 * @desc Change cooldowns for all skills for target(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Step 2: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step3:eval
 * @text Step 3: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemySkillCooldown
 * @text Enemy: Skill Cooldown
 * @desc Change cooldowns for a specific skill(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Enemy Index(es)
 * @type actor[]
 * @desc Select which Enemy Index(es) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill ID(s)
 * @type skill[]
 * @desc Select which Skill ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyStypeCooldown
 * @text Enemy: SType Cooldown
 * @desc Change cooldowns for all skills of a skill type(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Enemy Index(es)
 * @type actor[]
 * @desc Select which Enemy Index(es) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill Type ID(s)
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which Skill Type ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyGlobalCooldown
 * @text Enemy: Global Cooldown
 * @desc Change cooldowns for all skills for target(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Enemy Index(es)
 * @type actor[]
 * @desc Select which Enemy Index(es) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Step 2: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step3:eval
 * @text Step 3: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
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
 * @param SkillCooldowns
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Cooldown:struct
 * @text Skill Cooldowns
 * @type struct<Cooldown>
 * @desc Adjust cooldown settings here.
 * @default {"Settings":"","Icon:num":"0","FontColor:str":"5","FontSize:num":"22","Windows":"","Show:eval":"true","TextFmt:str":"Ready in %1T%2","Mechanics":"","MaxTurns:num":"50","OnUpdateJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\"","OnReadyJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Warmup:struct
 * @text Skill Warmups
 * @type struct<Warmup>
 * @desc Adjust warmup settings here.
 * @default {"Settings":"","Icon:num":"0","FontColor:str":"5","FontSize:num":"22","Windows":"","Show:eval":"true","TextFmt:str":"Prepared in %1T%2","Mechanics":"","Preemptive:num":"10","MaxTurns:num":"50","OnUpdateJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\"","OnReadyJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\""}
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
 * Cooldown Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cooldown:
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for Skill Cooldowns.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display Skill Cooldowns.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 5
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display Skill Cooldowns.
 * @default 22
 *
 * @param Windows
 * @text Window Display
 *
 * @param Show:eval
 * @text Show Cooldowns?
 * @parent Windows
 * @type boolean
 * @on YES
 * @off NO
 * @desc Display Skill Cooldowns?
 * @default true
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent  Windows
 * @desc Text format for displaying Skill Cooldowns.
 * %1 - Turns, %2 - Icon
 * @default Ready in %1T%2
 *
 * @param Mechanics
 *
 * @param MaxTurns:num
 * @text Max Cooldown
 * @parent Mechanics
 * @type number
 * @min 1
 * @desc Maximum turns that cooldowns can be.
 * @default 50
 *
 * @param OnUpdateJS:func
 * @text JS: On Cooldown Update
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's cooldown updates.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 * @param OnReadyJS:func
 * @text JS: On Cooldown Ready
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's cooldown reaches 0.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Warmup Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Warmup:
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for Skill Warmups.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display Skill Warmups.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 5
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display Skill Warmups.
 * @default 22
 *
 * @param Windows
 * @text Window Display
 *
 * @param Show:eval
 * @text Show Warmups?
 * @parent Windows
 * @type boolean
 * @on YES
 * @off NO
 * @desc Display Skill Warmups?
 * @default true
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent  Windows
 * @desc Text format for displaying Skill Warmups.
 * %1 - Turns, %2 - Icon
 * @default Prepared in %1T%2
 *
 * @param Mechanics
 *
 * @param Preemptive:num
 * @text Preemptive Bonus
 * @parent Mechanics
 * @type number
 * @min 0
 * @desc How many turns should be dropped off Warmups on a Preemptive attack?
 * @default 10
 *
 * @param MaxTurns:num
 * @text Max Warmup
 * @parent Mechanics
 * @type number
 * @min 1
 * @desc Maximum turns that warmups can be.
 * @default 50
 *
 * @param OnUpdateJS:func
 * @text JS: On Warmup Update
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's warmup updates.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 * @param OnReadyJS:func
 * @text JS: On Warmup Ready
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's warmup reaches 0.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 */
//=============================================================================

const _0x4477=['onWarmupReadyJS','onCooldownUpdateJS','Window_Base_drawSkillCost','attackSkillId','gRpkq','prepareUpdateSkillCooldowns','SQLSy','vrNUq','TextFmt','_skillWarmups','OnUpdateJS','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20id\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20$dataSkills[id];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.cooldown(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','zSkea','VisuMZ_1_SkillsStatesCore','startAction','resetFontSettings','process_VisuMZ_SkillsStatesCore_Skill_JS','return\x200','applyChangeStypeCooldownEffects','<STYPE\x20%1\x20%2\x20%3:[\x20]([\x5c+\x5c-]\x5cd+)>','Step1','call','Game_BattlerBase_paySkillCost','onWarmupUpdateJS','fNLhZ','Game_BattlerBase_initMembers','lzvFj','onCooldownReady','cINFs','parameters','warmupJS','applyChangeWarmupEffects','SbAmi','XzFZI','ARRAYNUM','match','ARRAYSTR','BattleManager_startAction','warmup','_skillCooldowns','isBypassWarmups','prototype','Skill_%1_%2_%3','UIPLl','subject','Preemptive','BMGsq','applyItemUserEffect','drawTextEx','ActorSkillCooldown','exit','status','ARRAYSTRUCT','LBZcG','Game_Action_applyItemUserEffect','qQPUp','item','replace','FontColor','PLUS','ITjeM','setWarmup','GxOiA','yDRsS','gBeBO','initMembers','width','meetsSkillConditions','name','OctWb','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20id\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20$dataSkills[id];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.rawWarmup(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','applyChangeStypeWarmupEffects','QWXJz','UEmVC','DMrFC','cvUGk','drawSkillCooldown','toXfC','HMLTF','trim','BrxMt','\x5cHexColor<%1>','applyCooldown','notetag2','OnReadyJS','includes','applyWarmup','getSkillTypes','GPQTj','Step2','STR','drawSkillWarmup','XoVxv','WAIT','onCooldownUpdate','LuEjy','clamp','description','drawSkillCost','addWarmup','applySkillCooldownEffects','COOLDOWN','rawWarmup','parse','areSkillWarmupsReady','FontSize','gJWkp','vISyI','Warmup','applyClearCooldownEffects','clearWarmups','eJboy','ARRAYJSON','toUpperCase','addCooldown','_instantCast','wnwVV','prepareSkillWarmups','SfxRx','applyCDWUnotetagsRate','LBsZe','guardSkillId','updateCooldowns','notetag4','yRGnX','AmSlF','HCCRb','applyStypeCooldowns','filter','scbzt','onWarmupReady','paySkillCooldown','updateWarmups','registerCommand','lVZzu','dtbWl','_subject','note','<GLOBAL\x20%1\x20%2:[\x20]%3>','applyGlobalCooldowns','Icon','FmjgS','Step4','pngLe','RegExp','skills','LDHWT','cnoVu','iBQYE','nbxrr','XPICm','<GLOBAL\x20%1\x20%2:[\x20]([\x5c+\x5c-]\x5cd+)>','WsQtj','clearCooldowns','hpGHc','applyChangeCooldownEffects','onBattleStart','cmrnK','lQdec','members','Game_Battler_onTurnEnd','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.rawWarmup(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20this.applyWarmup(skill.id,\x20turns);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','Global_%1_%2','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','notetag1','map','MaxTurns','notetag3','RATE','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.cooldown(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20this.applyCooldown(skill.id,\x20turns);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','getStypeIdWithName','CCKeN','JSON','OperateValues','PVZbx','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','max','NHsDU','cooldownJS','textSizeEx','pZIBi','CfnaT','applyChangeGlobalCooldownEffects','yEake','EoTwC','cooldown','qIFSx','ActorGlobalCooldown','VisuMZ_1_MessageCore','CsDLe','OHojE','skillTypes','zuvQX','format','Step3','lbvxP','mkNHk','ActorStypeCooldown','MIbPp','fNwrs','<SKILL\x20%1\x20%2\x20%3:[\x20]([\x5c+\x5c-]\x5cd+)>','applyCDWUnotetagsFlat','AjOVn','\x5cC[%1]','gvygi','EnemyStypeCooldown','PFXJp','CkSLe','dBEhL','ConvertParams','inBattle','SkillCooldowns','Game_Battler_onBattleStart','(\x5cd+\x5c.?\x5cd+)','Scene_Boot_process_VisuMZ_SkillsStatesCore_Skill_JS','ARRAYEVAL','tHspT','traitObjects','getSkillIdWithName','tKPve','jUkUx','applyCDWUmodifiers','Game_Battler_onBattleEnd','dDFKh','setCooldown','biZmQ','(\x5cd+)([%％])','lARno','fzxDk','FLAT','ceil','reduce','_updatedSkillCooldowns','\x5cI[%1]','Stype_%1_%2_%3','BWauL','initSkillCooldowns','LCywA','XCdfw','Show','isBypassCooldowns','paySkillCost','onBattleEnd','FUNC','uYIHN','onCooldownReadyJS','Game_BattlerBase_meetsSkillConditions','areSkillCooldownsReady','actor','\x5cFS[%1]','Cooldown','applyChangeGlobalWarmupEffects','Settings'];(function(_0xd28cb4,_0x44771f){const _0x597827=function(_0xf79421){while(--_0xf79421){_0xd28cb4['push'](_0xd28cb4['shift']());}};_0x597827(++_0x44771f);}(_0x4477,0x9b));const _0x5978=function(_0xd28cb4,_0x44771f){_0xd28cb4=_0xd28cb4-0x0;let _0x597827=_0x4477[_0xd28cb4];return _0x597827;};var label=_0x5978('0x38'),tier=tier||0x0,dependencies=[_0x5978('0x6f')],pluginData=$plugins[_0x5978('0xe2')](function(_0x1b748d){return _0x1b748d[_0x5978('0x95')]&&_0x1b748d[_0x5978('0xc3')][_0x5978('0xb7')]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x5978('0x36')]=function(_0x1bef02,_0x412045){for(const _0x5c2057 in _0x412045){if('lAimu'!==_0x5978('0xe9')){if(_0x5c2057[_0x5978('0x85')](/(.*):(.*)/i)){const _0x4b30af=String(RegExp['$1']),_0x11b4f1=String(RegExp['$2'])[_0x5978('0xd3')]()[_0x5978('0xb1')]();let _0x422e83,_0x56687d,_0x41371f;switch(_0x11b4f1){case'NUM':_0x422e83=_0x412045[_0x5c2057]!==''?Number(_0x412045[_0x5c2057]):0x0;break;case _0x5978('0x84'):_0x56687d=_0x412045[_0x5c2057]!==''?JSON['parse'](_0x412045[_0x5c2057]):[],_0x422e83=_0x56687d[_0x5978('0xa')](_0x46be93=>Number(_0x46be93));break;case'EVAL':_0x422e83=_0x412045[_0x5c2057]!==''?eval(_0x412045[_0x5c2057]):null;break;case _0x5978('0x3c'):_0x56687d=_0x412045[_0x5c2057]!==''?JSON['parse'](_0x412045[_0x5c2057]):[],_0x422e83=_0x56687d[_0x5978('0xa')](_0x21cf25=>eval(_0x21cf25));break;case _0x5978('0x11'):_0x422e83=_0x412045[_0x5c2057]!==''?JSON[_0x5978('0xc9')](_0x412045[_0x5c2057]):'';break;case _0x5978('0xd2'):_0x56687d=_0x412045[_0x5c2057]!==''?JSON[_0x5978('0xc9')](_0x412045[_0x5c2057]):[],_0x422e83=_0x56687d[_0x5978('0xa')](_0x389846=>JSON[_0x5978('0xc9')](_0x389846));break;case _0x5978('0x58'):_0x422e83=_0x412045[_0x5c2057]!==''?new Function(JSON[_0x5978('0xc9')](_0x412045[_0x5c2057])):new Function(_0x5978('0x73'));break;case'ARRAYFUNC':_0x56687d=_0x412045[_0x5c2057]!==''?JSON['parse'](_0x412045[_0x5c2057]):[],_0x422e83=_0x56687d[_0x5978('0xa')](_0x3d81ff=>new Function(JSON[_0x5978('0xc9')](_0x3d81ff)));break;case _0x5978('0xbc'):_0x422e83=_0x412045[_0x5c2057]!==''?String(_0x412045[_0x5c2057]):'';break;case _0x5978('0x86'):_0x56687d=_0x412045[_0x5c2057]!==''?JSON[_0x5978('0xc9')](_0x412045[_0x5c2057]):[],_0x422e83=_0x56687d[_0x5978('0xa')](_0x1673fd=>String(_0x1673fd));break;case'STRUCT':_0x41371f=_0x412045[_0x5c2057]!==''?JSON[_0x5978('0xc9')](_0x412045[_0x5c2057]):{},_0x422e83=VisuMZ[_0x5978('0x36')]({},_0x41371f);break;case _0x5978('0x96'):_0x56687d=_0x412045[_0x5c2057]!==''?JSON[_0x5978('0xc9')](_0x412045[_0x5c2057]):[],_0x422e83=_0x56687d['map'](_0x328ecd=>VisuMZ[_0x5978('0x36')]({},JSON[_0x5978('0xc9')](_0x328ecd)));break;default:continue;}_0x1bef02[_0x4b30af]=_0x422e83;}}else{function _0x42f655(){if(_0x137c43>0x0)this[_0x5978('0x7d')](_0x5657bb);delete this[_0x5978('0x89')][_0x21440c];}}}return _0x1bef02;},(_0x50476f=>{const _0x177f6e=_0x50476f[_0x5978('0xa6')];for(const _0x545296 of dependencies){if(_0x5978('0x2f')===_0x5978('0x48')){function _0x3d04ae(){const _0x1a63c3=_0x10aed7[_0x5978('0x38')][_0x5978('0x61')];if(_0x1a63c3[_0x5978('0xce')]['Show']&&_0x32b21c['rawWarmup'](_0x412320['id'])>0x0)this['drawSkillWarmup'](_0x2c0a20,_0x4b9d9c,_0x446535,_0x2f0564,_0x11f3ef);else _0x1a63c3['Cooldown'][_0x5978('0x54')]&&_0x46f684[_0x5978('0x1e')](_0x59d99b['id'])>0x0?this[_0x5978('0xae')](_0x2dcd5a,_0x3b008c,_0x31a6bd,_0x3cb79e,_0x4b38eb):_0x204e93[_0x5978('0x38')][_0x5978('0x64')][_0x5978('0x77')](this,_0x2b0f4e,_0x5a98dc,_0x118c9e,_0x2873e9,_0x5c3e7e);}}else{if(!Imported[_0x545296]){alert(_0x5978('0x14')[_0x5978('0x26')](_0x177f6e,_0x545296)),SceneManager[_0x5978('0x94')]();break;}}}const _0x8b63c0=_0x50476f[_0x5978('0xc3')];if(_0x8b63c0[_0x5978('0x85')](/\[Version[ ](.*?)\]/i)){const _0x4edef8=Number(RegExp['$1']);_0x4edef8!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x5978('0x26')](_0x177f6e,_0x4edef8)),SceneManager[_0x5978('0x94')]());}if(_0x8b63c0[_0x5978('0x85')](/\[Tier[ ](\d+)\]/i)){const _0x373571=Number(RegExp['$1']);_0x373571<tier?(alert(_0x5978('0x8')[_0x5978('0x26')](_0x177f6e,_0x373571,tier)),SceneManager[_0x5978('0x94')]()):tier=Math['max'](_0x373571,tier);}VisuMZ[_0x5978('0x36')](VisuMZ[label]['Settings'],_0x50476f[_0x5978('0x7f')]);})(pluginData),VisuMZ[_0x5978('0x12')]=function(_0x472093,_0x3e9422,_0x62f17){switch(_0x62f17){case'=':return _0x3e9422;break;case'+':return _0x472093+_0x3e9422;break;case'-':return _0x472093-_0x3e9422;break;case'*':return _0x472093*_0x3e9422;break;case'/':return _0x472093/_0x3e9422;break;case'%':return _0x472093%_0x3e9422;break;}return _0x472093;},PluginManager[_0x5978('0xe7')](pluginData[_0x5978('0xa6')],_0x5978('0x93'),_0x428f3c=>{if(!$gameParty[_0x5978('0x37')]())return;VisuMZ[_0x5978('0x36')](_0x428f3c,_0x428f3c);const _0x437f14=_0x428f3c[_0x5978('0x76')],_0x1dc0b1=_0x428f3c[_0x5978('0xbb')],_0xc90d22=_0x428f3c['Step3'],_0x213234=_0x428f3c[_0x5978('0xf0')];for(const _0x582649 of _0x437f14){const _0x22694d=$gameActors[_0x5978('0x5d')](_0x582649);if(!_0x22694d)continue;for(const _0x482701 of _0x1dc0b1){let _0xa450d=_0x22694d[_0x5978('0x1e')](_0x482701);_0xa450d=VisuMZ[_0x5978('0x12')](_0xa450d,_0x213234,_0xc90d22),_0x22694d['setCooldown'](_0x482701,_0xa450d);}}}),PluginManager[_0x5978('0xe7')](pluginData[_0x5978('0xa6')],_0x5978('0x2a'),_0x332741=>{if(!$gameParty[_0x5978('0x37')]())return;VisuMZ[_0x5978('0x36')](_0x332741,_0x332741);const _0x2a654a=_0x332741[_0x5978('0x76')],_0x218547=_0x332741['Step2'],_0x2591ed=_0x332741['Step3'],_0x7a2f5d=_0x332741[_0x5978('0xf0')];for(const _0x56908f of _0x2a654a){const _0x4f871d=$gameActors[_0x5978('0x5d')](_0x56908f);if(!_0x4f871d)continue;for(const _0x1e5dcf of _0x218547){if(_0x5978('0xd1')!==_0x5978('0xd1')){function _0x2e95cd(){_0x1a41e7&&_0xb97bb0[_0x5978('0xd4')](_0x3fff2f['id'],_0x234775);}}else for(const _0xe60c7f of _0x4f871d[_0x5978('0xf3')]()){if(!_0xe60c7f)continue;if(!DataManager[_0x5978('0xb9')](_0xe60c7f)['includes'](_0x1e5dcf))continue;const _0x52297f=_0xe60c7f['id'];let _0x28ac72=_0x4f871d['cooldown'](_0x52297f);_0x28ac72=VisuMZ['OperateValues'](_0x28ac72,_0x7a2f5d,_0x2591ed),_0x4f871d['setCooldown'](_0x52297f,_0x28ac72);}}}}),PluginManager[_0x5978('0xe7')](pluginData[_0x5978('0xa6')],_0x5978('0x20'),_0x5bb880=>{if(!$gameParty[_0x5978('0x37')]())return;VisuMZ[_0x5978('0x36')](_0x5bb880,_0x5bb880);const _0x27cb20=_0x5bb880[_0x5978('0x76')],_0x41bf44=_0x5bb880[_0x5978('0xbb')],_0x20e1ad=_0x5bb880[_0x5978('0x27')];for(const _0x407521 of _0x27cb20){const _0x500dc4=$gameActors[_0x5978('0x5d')](_0x407521);if(!_0x500dc4)continue;for(const _0x1514fc of _0x500dc4[_0x5978('0xf3')]()){if(!_0x1514fc)continue;const _0x119c50=_0x1514fc['id'];let _0x1c7831=_0x500dc4[_0x5978('0x1e')](_0x119c50);_0x1c7831=VisuMZ[_0x5978('0x12')](_0x1c7831,_0x20e1ad,_0x41bf44),_0x500dc4[_0x5978('0x45')](_0x119c50,_0x1c7831);}}}),PluginManager[_0x5978('0xe7')](pluginData[_0x5978('0xa6')],'EnemySkillCooldown',_0x5d64e8=>{if(!$gameParty[_0x5978('0x37')]())return;VisuMZ[_0x5978('0x36')](_0x5d64e8,_0x5d64e8);const _0x3faa9e=_0x5d64e8[_0x5978('0x76')],_0x1ddc12=_0x5d64e8[_0x5978('0xbb')],_0x47386e=_0x5d64e8[_0x5978('0x27')],_0x56ea25=_0x5d64e8[_0x5978('0xf0')];for(const _0x4ade8b of _0x3faa9e){if(_0x5978('0x28')===_0x5978('0x6e')){function _0x122e7b(){_0x4a0179=_0x173428[_0x5978('0xf')](_0x356179['$1']),_0x522a76=_0x159f24(_0x31f73d['$2']);}}else{const _0x2cd324=$gameTroop[_0x5978('0x4')]()[_0x4ade8b];if(!_0x2cd324)continue;for(const _0x55be53 of _0x1ddc12){let _0x1c5503=_0x2cd324[_0x5978('0x1e')](_0x55be53);_0x1c5503=VisuMZ[_0x5978('0x12')](_0x1c5503,_0x56ea25,_0x47386e),_0x2cd324['setCooldown'](_0x55be53,_0x1c5503);}}}}),PluginManager[_0x5978('0xe7')](pluginData[_0x5978('0xa6')],_0x5978('0x32'),_0x60fcc=>{if(!$gameParty[_0x5978('0x37')]())return;VisuMZ[_0x5978('0x36')](_0x60fcc,_0x60fcc);const _0x1a1a47=_0x60fcc[_0x5978('0x76')],_0x22e01c=_0x60fcc[_0x5978('0xbb')],_0x367e6b=_0x60fcc[_0x5978('0x27')],_0x49d537=_0x60fcc[_0x5978('0xf0')];for(const _0x2b1477 of _0x1a1a47){if('OpAwX'!=='OpAwX'){function _0x39f477(){if(this[_0x5978('0x89')]===_0x1adff1)this[_0x5978('0x51')]();this['_skillCooldowns'][_0x44e7e1]=this[_0x5978('0x89')][_0x1a1219]||0x0,this[_0x5978('0x45')](_0x4f9318,this[_0x5978('0x89')][_0x224fa2]+_0x5c92f4);}}else{const _0xe7e035=$gameTroop[_0x5978('0x4')]()[_0x2b1477];if(!_0xe7e035)continue;for(const _0x167ad7 of _0x22e01c){if(_0x5978('0x40')!==_0x5978('0x40')){function _0x56a3f6(){if(this[_0x5978('0x89')]===_0x2ad42e)this[_0x5978('0x51')]();if(this[_0x5978('0x55')]())return 0x0;return this['_skillCooldowns'][_0x46b462]||0x0;}}else for(const _0x57a4ed of _0xe7e035[_0x5978('0xf3')]()){if(!_0x57a4ed)continue;if(!DataManager['getSkillTypes'](_0x57a4ed)[_0x5978('0xb7')](_0x167ad7))continue;const _0x5aaba4=_0x57a4ed['id'];let _0x4d8ff9=_0xe7e035[_0x5978('0x1e')](_0x5aaba4);_0x4d8ff9=VisuMZ[_0x5978('0x12')](_0x4d8ff9,_0x49d537,_0x367e6b),_0xe7e035['setCooldown'](_0x5aaba4,_0x4d8ff9);}}}}}),PluginManager['registerCommand'](pluginData[_0x5978('0xa6')],'EnemyGlobalCooldown',_0x19068b=>{if(!$gameParty[_0x5978('0x37')]())return;VisuMZ[_0x5978('0x36')](_0x19068b,_0x19068b);const _0x565e28=_0x19068b[_0x5978('0x76')],_0x5f149a=_0x19068b[_0x5978('0xbb')],_0x328897=_0x19068b['Step3'];for(const _0x30e5b3 of _0x565e28){if(_0x5978('0x53')!==_0x5978('0xf5')){const _0x2d0015=$gameTroop[_0x5978('0x4')]()[_0x30e5b3];if(!_0x2d0015)continue;for(const _0x4a0b2d of _0x2d0015[_0x5978('0xf3')]()){if(_0x5978('0xbe')===_0x5978('0x23')){function _0xa109cd(){this[_0x5978('0x8e')]()[_0x5978('0xd4')](_0x28e861['id'],_0x2a57e3);}}else{if(!_0x4a0b2d)continue;const _0x1d215b=_0x4a0b2d['id'];let _0x17fe7e=_0x2d0015[_0x5978('0x1e')](_0x1d215b);_0x17fe7e=VisuMZ[_0x5978('0x12')](_0x17fe7e,_0x328897,_0x5f149a),_0x2d0015['setCooldown'](_0x1d215b,_0x17fe7e);}}}else{function _0x14a322(){const _0x8fad3d=_0x21f332[_0x5978('0xb9')](_0x3ae4e5);_0x8fad3d[_0x5978('0xb7')](_0x35a216)&&this[_0x5978('0x8e')]()[_0x5978('0xd4')](_0x7adec0['id'],_0x4188ae);}}}}),VisuMZ[_0x5978('0x38')][_0x5978('0x17')]={},VisuMZ['SkillCooldowns'][_0x5978('0x80')]={},VisuMZ[_0x5978('0x38')][_0x5978('0x63')]={},VisuMZ[_0x5978('0x38')][_0x5978('0x79')]={},VisuMZ[_0x5978('0x38')][_0x5978('0x5a')]={},VisuMZ[_0x5978('0x38')][_0x5978('0x62')]={},VisuMZ[_0x5978('0x38')][_0x5978('0x3b')]=Scene_Boot[_0x5978('0x8b')][_0x5978('0x72')],Scene_Boot['prototype'][_0x5978('0x72')]=function(_0x1bde28){VisuMZ[_0x5978('0x38')]['Scene_Boot_process_VisuMZ_SkillsStatesCore_Skill_JS'][_0x5978('0x77')](this,_0x1bde28);const _0x48959f=_0x1bde28[_0x5978('0xeb')],_0x5632bb=_0x5978('0x6d'),_0xa865e5=_0x5978('0xa8');if(_0x48959f[_0x5978('0x85')](/<JS (?:COOLDOWN|COOLDOWNS)>\s*([\s\S]*)\s*<\/JS (?:COOLDOWN|COOLDOWNS)>/i)){const _0x2ca2e0=String(RegExp['$1']),_0x3f61a0=_0x5978('0xe')[_0x5978('0x26')](_0x2ca2e0);VisuMZ[_0x5978('0x38')][_0x5978('0x17')][_0x1bde28['id']]=new Function(_0x3f61a0);}if(_0x48959f[_0x5978('0x85')](/<JS (?:WARMUP|WARMUPS)>\s*([\s\S]*)\s*<\/JS (?:WARMUP|WARMUPS)>/i)){if(_0x5978('0x13')===_0x5978('0x13')){const _0x45161c=String(RegExp['$1']),_0x38af01=_0x5978('0x6')[_0x5978('0x26')](_0x45161c);VisuMZ[_0x5978('0x38')][_0x5978('0x80')][_0x1bde28['id']]=new Function(_0x38af01);}else{function _0xeaaddf(){if(this[_0x5978('0x6b')]===_0x4d8873)this[_0x5978('0x51')]();if(this[_0x5978('0x8a')](_0x1fa666))return;_0x528298=_0xfa1744[_0x5978('0x4b')](_0x35a46f),_0xda00f1=_0x3d45e2[_0x5978('0xc2')](0x0,_0x4bbb4d[_0x5978('0x38')]['Settings'][_0x5978('0xce')][_0x5978('0xb')]);const _0x5d82fe=this[_0x5978('0xc8')](_0x5501c2);;this[_0x5978('0x6b')][_0x3550ca]=_0x36eae2;if(this[_0x5978('0x6b')][_0x4b572f]<=0x0){if(_0x5d82fe>0x0)this[_0x5978('0xe4')](_0x4e3c89);delete this[_0x5978('0x6b')][_0x1d99e7];}}}}if(_0x48959f[_0x5978('0x85')](/<JS ON COOLDOWN UPDATE>\s*([\s\S]*)\s*<\/JS ON COOLDOWN UPDATE>/i)){if(_0x5978('0xc1')!==_0x5978('0x9e')){const _0x2e44bd=String(RegExp['$1']),_0x2cdaa9=_0x5632bb['format'](_0x2e44bd);VisuMZ['SkillCooldowns']['onCooldownUpdateJS'][_0x1bde28['id']]=new Function(_0x2cdaa9);}else{function _0x241446(){_0x4dc2dd['SkillCooldowns'][_0x5978('0x5a')][_0x51ab46][_0x5978('0x77')](this,_0x5d17d8);}}}if(_0x48959f[_0x5978('0x85')](/<JS ON WARMUP UPDATE>\s*([\s\S]*)\s*<\/JS ON WARMUP UPDATE>/i)){if(_0x5978('0x83')==='XzFZI'){const _0x1f6815=String(RegExp['$1']),_0x527a3a=_0xa865e5[_0x5978('0x26')](_0x1f6815);VisuMZ[_0x5978('0x38')][_0x5978('0x79')][_0x1bde28['id']]=new Function(_0x527a3a);}else{function _0x56f43e(){_0x2d728e[_0x5978('0x38')][_0x5978('0x7b')][_0x5978('0x77')](this),this[_0x5978('0x51')]();}}}if(_0x48959f[_0x5978('0x85')](/<JS ON COOLDOWN READY>\s*([\s\S]*)\s*<\/JS ON COOLDOWN READY>/i)){const _0x3325eb=String(RegExp['$1']),_0x2790eb=_0x5632bb[_0x5978('0x26')](_0x3325eb);VisuMZ[_0x5978('0x38')][_0x5978('0x5a')][_0x1bde28['id']]=new Function(_0x2790eb);}if(_0x48959f[_0x5978('0x85')](/<JS ON WARMUP READY>\s*([\s\S]*)\s*<\/JS ON WARMUP READY>/i)){if(_0x5978('0x97')===_0x5978('0x52')){function _0x5c0a55(){if(!_0xc81df8['SkillCooldowns']['Game_BattlerBase_meetsSkillConditions'][_0x5978('0x77')](this,_0x10dd25))return![];if(!this['areSkillWarmupsReady'](_0x485a88))return![];if(!this[_0x5978('0x5c')](_0x5f1291))return![];return!![];}}else{const _0x5c2b40=String(RegExp['$1']),_0x5789fd=_0xa865e5[_0x5978('0x26')](_0x5c2b40);VisuMZ[_0x5978('0x38')][_0x5978('0x62')][_0x1bde28['id']]=new Function(_0x5789fd);}}},VisuMZ['SkillCooldowns']['BattleManager_startAction']=BattleManager[_0x5978('0x70')],BattleManager[_0x5978('0x70')]=function(){this[_0x5978('0xea')][_0x5978('0x67')](),VisuMZ[_0x5978('0x38')][_0x5978('0x87')][_0x5978('0x77')](this);},VisuMZ[_0x5978('0x38')][_0x5978('0x98')]=Game_Action[_0x5978('0x8b')][_0x5978('0x91')],Game_Action[_0x5978('0x8b')][_0x5978('0x91')]=function(_0x1188bd){VisuMZ[_0x5978('0x38')][_0x5978('0x98')]['call'](this,_0x1188bd),this[_0x5978('0xc6')](_0x1188bd);},Game_Action['prototype'][_0x5978('0xc6')]=function(_0x1e5460){this[_0x5978('0xcf')](_0x1e5460),this[_0x5978('0x0')](_0x1e5460),this['applyChangeStypeCooldownEffects'](_0x1e5460),this[_0x5978('0x1b')](_0x1e5460),this['applyChangeWarmupEffects'](_0x1e5460),this[_0x5978('0xa9')](_0x1e5460),this[_0x5978('0x60')](_0x1e5460);},Game_Action[_0x5978('0x8b')][_0x5978('0xcf')]=function(_0x466189){const _0x1a4195=this['item']()[_0x5978('0xeb')];if(_0x1a4195[_0x5978('0x85')](/<CLEAR USER COOLDOWNS>/i)){if(_0x5978('0x1d')===_0x5978('0xdf')){function _0x1a4b8b(){for(const _0x2f5dbc of this[_0x5978('0xf3')]()){if(_0x2f5dbc){const _0x579d25=_0x4c3562[_0x5978('0xb9')](_0x2f5dbc);_0x579d25[_0x5978('0xb7')](_0x2e76e8)&&this[_0x5978('0xb4')](_0x2f5dbc['id'],_0x584dcb);}}}}else this[_0x5978('0x8e')]()[_0x5978('0xfb')]();}_0x1a4195[_0x5978('0x85')](/<CLEAR TARGET COOLDOWNS>/i)&&_0x466189[_0x5978('0xfb')]();if(_0x1a4195['match'](/<CLEAR USER WARMUPS>/i)){if(_0x5978('0x10')!==_0x5978('0x10')){function _0x48fc7a(){_0x511ddd=_0x506a53(_0x329504['$1']),_0x4112fe=_0x23d59e(_0x4fc454['$2']);}}else this[_0x5978('0x8e')]()['clearWarmups']();}_0x1a4195['match'](/<CLEAR TARGET WARMUPS>/i)&&_0x466189[_0x5978('0xd0')]();},Game_Action[_0x5978('0x8b')][_0x5978('0x0')]=function(_0x1ea104){const _0x394456=this[_0x5978('0x9a')]()[_0x5978('0xeb')],_0x10fbe4=_0x394456[_0x5978('0x85')](/<USER SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x10fbe4)for(const _0x5bede5 of _0x10fbe4){let _0x54cbfc=0x0,_0x55a94f=0x0;if(_0x5bede5[_0x5978('0x85')](/<USER SKILL[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0x54cbfc=Number(RegExp['$1']),_0x55a94f=Number(RegExp['$2']);else _0x5bede5[_0x5978('0x85')](/<USER SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0x54cbfc=DataManager[_0x5978('0x3f')](RegExp['$1']),_0x55a94f=Number(RegExp['$2']));this['subject']()[_0x5978('0xd4')](_0x54cbfc,_0x55a94f);}const _0xb71457=_0x394456['match'](/<TARGET SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0xb71457)for(const _0x14c769 of _0xb71457){if(_0x5978('0xad')===_0x5978('0xad')){let _0x1cb5e5=0x0,_0x12dc0c=0x0;if(_0x14c769[_0x5978('0x85')](/<TARGET SKILL[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0x1cb5e5=Number(RegExp['$1']),_0x12dc0c=Number(RegExp['$2']);else _0x14c769[_0x5978('0x85')](/<TARGET SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0x1cb5e5=DataManager[_0x5978('0x3f')](RegExp['$1']),_0x12dc0c=Number(RegExp['$2']));_0x1ea104[_0x5978('0xd4')](_0x1cb5e5,_0x12dc0c);}else{function _0x5d67ce(){const _0xf58276=_0x36ebe0[_0x5978('0xb9')](_0x70a8e);_0xf58276[_0x5978('0xb7')](_0x5801ac)&&this[_0x5978('0xb4')](_0x2c3d4b['id'],_0x489601);}}}},Game_Action[_0x5978('0x8b')][_0x5978('0x74')]=function(_0x28d713){const _0x165859=this['item']()['note'],_0x441bd2=_0x165859[_0x5978('0x85')](/<USER STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x441bd2)for(const _0x2de889 of _0x441bd2){if(_0x5978('0xf4')!==_0x5978('0x2c')){let _0x57d8e5=0x0,_0x272c15=0x0;if(_0x2de889[_0x5978('0x85')](/<USER STYPE[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)){if(_0x5978('0x66')!==_0x5978('0x66')){function _0x3d84fc(){_0x2eb5cd=_0x2fd835[_0x5978('0x3f')](_0x288470['$1']),_0x29a358=_0x439cb5(_0x4a26ea['$2']);}}else _0x57d8e5=Number(RegExp['$1']),_0x272c15=Number(RegExp['$2']);}else{if(_0x2de889['match'](/<USER STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)){if(_0x5978('0x7a')!=='fNLhZ'){function _0x167e5d(){if(this['attackSkillId']()===_0x15c13d)return!![];if(this['guardSkillId']()===_0x4502ee)return!![];const _0x558d70=_0x451ec4[_0x372167];if(_0x558d70&&_0x558d70[_0x5978('0xeb')][_0x5978('0x85')](/<BYPASS WARMUPS>/i))return!![];if(_0x558d70&&_0x558d70[_0x5978('0xa6')][_0x5978('0xd3')]()==='WAIT')return!![];return![];}}else _0x57d8e5=DataManager[_0x5978('0x3f')](RegExp['$1']),_0x272c15=Number(RegExp['$2']);}}for(const _0x23101c of this[_0x5978('0xf3')]()){if(_0x5978('0xa0')===_0x5978('0xa0')){if(_0x23101c){if(_0x5978('0xb0')==='ChTwf'){function _0x580f11(){if(_0x4b43e5){const _0x4d0ad7=_0x5947bd[_0x5978('0xb9')](_0x1469cd);_0x4d0ad7[_0x5978('0xb7')](_0x4dab7d)&&this[_0x5978('0x8e')]()['addWarmup'](_0x455958['id'],_0x590193);}}}else{const _0x3afdde=DataManager[_0x5978('0xb9')](_0x23101c);_0x3afdde[_0x5978('0xb7')](_0x57d8e5)&&this['subject']()[_0x5978('0xd4')](_0x23101c['id'],_0x272c15);}}}else{function _0x3b0fcc(){_0x90daa9=_0x144091(_0x3e59aa['$1']),_0x3d3238=_0x442bcc(_0xd16f09['$2']);}}}}else{function _0x50232d(){_0x3707a5=_0x1fda8f[_0x5978('0x3f')](_0xb3f436['$1']),_0x30571f=_0x38fb70(_0x26c85a['$2']);}}}const _0x114f92=_0x165859[_0x5978('0x85')](/<TARGET STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x114f92)for(const _0x3f1387 of _0x114f92){if(_0x5978('0xba')!=='AyLAV'){let _0x5f4804=0x0,_0x499dd3=0x0;if(_0x3f1387[_0x5978('0x85')](/<TARGET STYPE[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0x5f4804=Number(RegExp['$1']),_0x499dd3=Number(RegExp['$2']);else{if(_0x3f1387[_0x5978('0x85')](/<TARGET STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)){if(_0x5978('0x7c')===_0x5978('0x3')){function _0x54fe70(){_0x438df4[_0x5978('0x38')][_0x5978('0x64')][_0x5978('0x77')](this,_0x42d481,_0xbdb7cb,_0x1239d1,_0x32c4d3,_0xc964c4);}}else _0x5f4804=DataManager[_0x5978('0x3f')](RegExp['$1']),_0x499dd3=Number(RegExp['$2']);}}for(const _0x3620d3 of this[_0x5978('0xf3')]()){if(_0x3620d3){const _0x38fcb3=DataManager[_0x5978('0xb9')](_0x3620d3);_0x38fcb3[_0x5978('0xb7')](_0x5f4804)&&_0x28d713['addCooldown'](_0x3620d3['id'],_0x499dd3);}}}else{function _0x8c3e1e(){_0x274d7a=_0xd2c61c(_0x3aef6e['$1']),_0x523165=_0x5a9952(_0x50355c['$2']);}}}},Game_Action[_0x5978('0x8b')][_0x5978('0x1b')]=function(_0x4496cc){const _0x299c84=this['item']()[_0x5978('0xeb')];if(_0x299c84[_0x5978('0x85')](/<USER GLOBAL COOLDOWN:[ ]([\+\-]\d+)>/i)){if(_0x5978('0x46')===_0x5978('0x46')){const _0x15673f=Number(RegExp['$1']);for(const _0x5bd6c1 of this[_0x5978('0xf3')]()){if('Ywjrz'==='RHOMY'){function _0xa411b2(){const _0x1249c5=_0x529299(_0x3e87f1['$1']),_0x5e61ac='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.cooldown(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20this.applyCooldown(skill.id,\x20turns);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x5978('0x26')](_0x1249c5);_0x17c224[_0x5978('0x38')][_0x5978('0x17')][_0x44e779['id']]=new _0x25a24e(_0x5e61ac);}}else _0x5bd6c1&&this['subject']()['addCooldown'](_0x5bd6c1['id'],_0x15673f);}}else{function _0x47f895(){_0x427703=_0x5079a7(_0x33515b['$1']),_0x17acd0=_0x2c56b0(_0x207d6a['$2']);}}}if(_0x299c84[_0x5978('0x85')](/<TARGET GLOBAL COOLDOWN:[ ]([\+\-]\d+)>/i)){if(_0x5978('0x69')==='yoSjs'){function _0x2d8296(){_0x23c58a=_0x4c78ab[_0x5978('0x15')](_0x59094e,_0x1b561d);}}else{const _0x105389=Number(RegExp['$1']);for(const _0x31fcd1 of this[_0x5978('0xf3')]()){_0x31fcd1&&_0x4496cc[_0x5978('0xd4')](_0x31fcd1['id'],_0x105389);}}}},Game_Action[_0x5978('0x8b')][_0x5978('0x81')]=function(_0x303acb){const _0x26b878=this[_0x5978('0x9a')]()['note'],_0x44eb62=_0x26b878[_0x5978('0x85')](/<USER SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x44eb62)for(const _0x55f8fb of _0x44eb62){if(_0x5978('0xaf')!==_0x5978('0xaf')){function _0x35a80e(){this[_0x5978('0x8e')]()['clearWarmups']();}}else{let _0x4fbd87=0x0,_0x3225fd=0x0;if(_0x55f8fb[_0x5978('0x85')](/<USER SKILL[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i)){if(_0x5978('0xcd')===_0x5978('0xcd'))_0x4fbd87=Number(RegExp['$1']),_0x3225fd=Number(RegExp['$2']);else{function _0x4d59b2(){const _0xecb435=_0x70661f[_0x5978('0x38')][_0x5978('0x61')][_0x5978('0xce')];let _0xb0be5e='';_0xb0be5e+=_0x5978('0x5e')[_0x5978('0x26')](_0xecb435[_0x5978('0xcb')]);const _0x4a337c=_0xecb435[_0x5978('0x9c')];_0x4a337c[_0x5978('0x85')](/#(.*)/i)&&_0x32244e['VisuMZ_1_MessageCore']?_0xb0be5e+=_0x5978('0xb3')[_0x5978('0x26')](_0x4584dc(_0x56ad4f['$1'])):_0xb0be5e+=_0x5978('0x30')['format'](_0x4a337c);const _0x37223d=_0x23d4d6[_0x5978('0x88')](_0x6c166['id']),_0x482288=_0xecb435[_0x5978('0xee')]>0x0?_0x5978('0x4e')[_0x5978('0x26')](_0xecb435['Icon']):'';_0xb0be5e+=_0xecb435[_0x5978('0x6a')][_0x5978('0x26')](_0x37223d,_0x482288);const _0x4a54ce=this[_0x5978('0x18')](_0xb0be5e,_0x1d5737,_0x2236b2,_0x4dc157),_0x3d0f6f=_0x482925+_0x19b3b6-_0x4a54ce[_0x5978('0xa4')];this[_0x5978('0x92')](_0xb0be5e,_0x3d0f6f,_0x5e12d9,_0x3aa707),this['resetFontSettings']();}}}else _0x55f8fb[_0x5978('0x85')](/<USER SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0x4fbd87=DataManager[_0x5978('0x3f')](RegExp['$1']),_0x3225fd=Number(RegExp['$2']));this[_0x5978('0x8e')]()[_0x5978('0xc5')](_0x4fbd87,_0x3225fd);}}const _0x599c02=_0x26b878[_0x5978('0x85')](/<TARGET SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x599c02){if(_0x5978('0x2')!==_0x5978('0x2')){function _0x2b56e7(){const _0x4d492c=_0x20362c[_0x5978('0xb9')](_0x27326e);_0x4d492c['includes'](_0x1f8aa4)&&_0x12a6c7['addCooldown'](_0x59ccc1['id'],_0x11daf3);}}else for(const _0x1216d6 of _0x599c02){let _0xe10bd3=0x0,_0x9aff8e=0x0;if(_0x1216d6[_0x5978('0x85')](/<TARGET SKILL[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i)){if(_0x5978('0xa1')!=='UHEVx')_0xe10bd3=Number(RegExp['$1']),_0x9aff8e=Number(RegExp['$2']);else{function _0x48d97b(){var _0x58d1f8=_0x7dea1a(_0x67c5f['$1']);_0x3d8be3*=_0x58d1f8;}}}else _0x1216d6[_0x5978('0x85')](/<TARGET SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0xe10bd3=DataManager[_0x5978('0x3f')](RegExp['$1']),_0x9aff8e=Number(RegExp['$2']));_0x303acb['addWarmup'](_0xe10bd3,_0x9aff8e);}}},Game_Action[_0x5978('0x8b')][_0x5978('0xa9')]=function(_0x27354c){const _0x2b7d91=this[_0x5978('0x9a')]()['note'],_0x3e4954=_0x2b7d91['match'](/<USER STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x3e4954){if(_0x5978('0x99')!=='zcyTm')for(const _0x619332 of _0x3e4954){let _0x3385c0=0x0,_0x4b226d=0x0;if(_0x619332[_0x5978('0x85')](/<USER STYPE[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i)){if(_0x5978('0xac')!==_0x5978('0x1a'))_0x3385c0=Number(RegExp['$1']),_0x4b226d=Number(RegExp['$2']);else{function _0x2f1b87(){if(_0x18ffe9>0x0)this[_0x5978('0xe4')](_0x50bd69);delete this[_0x5978('0x6b')][_0x4a756];}}}else _0x619332[_0x5978('0x85')](/<USER STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0x3385c0=DataManager[_0x5978('0x3f')](RegExp['$1']),_0x4b226d=Number(RegExp['$2']));for(const _0x5b4831 of this[_0x5978('0xf3')]()){if(_0x5978('0xf7')===_0x5978('0x7e')){function _0x191a0f(){if(!_0x11a219[_0x5978('0x37')]())return!![];if(this[_0x5978('0x65')]()===_0x440466)return!![];if(this[_0x5978('0xdb')]()===_0x3a9a02)return!![];const _0x55baa6=_0x2c415d[_0x510d82];if(_0x55baa6&&_0x55baa6[_0x5978('0xeb')][_0x5978('0x85')](/<BYPASS COOLDOWNS>/i))return!![];if(_0x55baa6&&_0x55baa6[_0x5978('0xa6')][_0x5978('0xd3')]()===_0x5978('0xbf'))return!![];return![];}}else{if(_0x5b4831){if(_0x5978('0xab')===_0x5978('0xab')){const _0x17335a=DataManager[_0x5978('0xb9')](_0x5b4831);_0x17335a[_0x5978('0xb7')](_0x3385c0)&&this[_0x5978('0x8e')]()[_0x5978('0xc5')](_0x5b4831['id'],_0x4b226d);}else{function _0x3a0d64(){_0x26bd7e=_0x51a9d6(_0x1d3e4f['$1']),_0x38a726=_0x1a3b69(_0x143659['$2']);}}}}}}else{function _0x47a2dc(){const _0x5ee12f=_0x405275(_0x3fd7d['$1']);this[_0x5978('0xed')](_0x5ee12f);}}}const _0x3ab4f4=_0x2b7d91[_0x5978('0x85')](/<TARGET STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x3ab4f4)for(const _0x9950f7 of _0x3ab4f4){if(_0x5978('0x50')===_0x5978('0xe8')){function _0x335999(){for(const _0x1261a0 of _0x2cb204){let _0x590e2f=0x0,_0x15f615=0x0;if(_0x1261a0[_0x5978('0x85')](/<USER SKILL[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0x590e2f=_0x1c3638(_0xbd96ee['$1']),_0x15f615=_0x1970a2(_0xc0d035['$2']);else _0x1261a0['match'](/<USER SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0x590e2f=_0x44dad1[_0x5978('0x3f')](_0x4bc181['$1']),_0x15f615=_0x108ca3(_0x56404d['$2']));this[_0x5978('0x8e')]()[_0x5978('0xd4')](_0x590e2f,_0x15f615);}}}else{let _0x32d9c3=0x0,_0x591bcc=0x0;if(_0x9950f7[_0x5978('0x85')](/<TARGET STYPE[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i)){if(_0x5978('0xde')!==_0x5978('0xde')){function _0x228517(){let _0x721cc9=0x0,_0x2f7d12=0x0;if(_0x14e10e[_0x5978('0x85')](/<SKILL[ ](\d+)[ ]COOLDOWN:[ ](\d+)>/gi))_0x721cc9=_0x45082e(_0xf562f0['$1']),_0x2f7d12=_0x14874e(_0x441bdc['$2']);else _0x2a5fb6[_0x5978('0x85')](/<SKILL[ ](.*)[ ]COOLDOWN:[ ](\d+)>/gi)&&(_0x721cc9=_0x323f5c[_0x5978('0x3f')](_0x32a201['$1']),_0x2f7d12=_0x5bdd02(_0x5881dd['$2']));const _0x56096f=_0xe588cc[_0x721cc9];_0x56096f&&this[_0x5978('0xb4')](_0x56096f['id'],_0x2f7d12);}}else _0x32d9c3=Number(RegExp['$1']),_0x591bcc=Number(RegExp['$2']);}else{if(_0x9950f7[_0x5978('0x85')](/<TARGET STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)){if(_0x5978('0xf8')!==_0x5978('0xf8')){function _0x1b2f86(){_0x2303b3=_0x4361cb(_0x19910c['$1']),_0x4431a4=_0x3c6ea1(_0x4e3d39['$2']);}}else _0x32d9c3=DataManager[_0x5978('0x3f')](RegExp['$1']),_0x591bcc=Number(RegExp['$2']);}}for(const _0x35441c of this[_0x5978('0xf3')]()){if(_0x35441c){if(_0x5978('0xd8')===_0x5978('0xd8')){const _0x2be009=DataManager[_0x5978('0xb9')](_0x35441c);_0x2be009[_0x5978('0xb7')](_0x32d9c3)&&_0x27354c[_0x5978('0xc5')](_0x35441c['id'],_0x591bcc);}else{function _0x1e9ff1(){const _0x2a3338=_0x3ef1e4(_0x48ac63['$1']);_0x2a3338<_0x46c68e?(_0x585fdc(_0x5978('0x8')[_0x5978('0x26')](_0x79cd96,_0x2a3338,_0x296e11)),_0x12e3ec[_0x5978('0x94')]()):_0x262daf=_0x49fb07[_0x5978('0x15')](_0x2a3338,_0x469f34);}}}}}}},Game_Action['prototype'][_0x5978('0x60')]=function(_0x481f80){const _0x51dc4a=this[_0x5978('0x9a')]()[_0x5978('0xeb')];if(_0x51dc4a[_0x5978('0x85')](/<USER GLOBAL WARMUP:[ ]([\+\-]\d+)>/i)){const _0x14a9ca=Number(RegExp['$1']);for(const _0x2a66a4 of this[_0x5978('0xf3')]()){if(_0x2a66a4){if(_0x5978('0xe3')===_0x5978('0xe3'))this['subject']()[_0x5978('0xc5')](_0x2a66a4['id'],_0x14a9ca);else{function _0x91b84c(){this['subject']()[_0x5978('0xc5')](_0x5463d3['id'],_0x521058);}}}}}if(_0x51dc4a[_0x5978('0x85')](/<TARGET GLOBAL WARMUP:[ ]([\+\-]\d+)>/i)){const _0xad0ea2=Number(RegExp['$1']);for(const _0x2ea90e of this[_0x5978('0xf3')]()){if(_0x2ea90e){if(_0x5978('0xf1')!==_0x5978('0x49'))_0x481f80[_0x5978('0xc5')](_0x2ea90e['id'],_0xad0ea2);else{function _0x2ec995(){_0x478c89(_0x5978('0x8')[_0x5978('0x26')](_0x4c7eeb,_0x16b4f3,_0x3ae8a1)),_0x122639[_0x5978('0x94')]();}}}}}},VisuMZ[_0x5978('0x38')][_0x5978('0x7b')]=Game_BattlerBase[_0x5978('0x8b')][_0x5978('0xa3')],Game_BattlerBase[_0x5978('0x8b')]['initMembers']=function(){VisuMZ[_0x5978('0x38')][_0x5978('0x7b')][_0x5978('0x77')](this),this['initSkillCooldowns']();},Game_BattlerBase[_0x5978('0x8b')][_0x5978('0x51')]=function(){this[_0x5978('0xfb')](),this['clearWarmups']();},Game_BattlerBase['prototype'][_0x5978('0xfb')]=function(){this['_skillCooldowns']={};},Game_BattlerBase[_0x5978('0x8b')][_0x5978('0x1e')]=function(_0x57af55){if(this[_0x5978('0x89')]===undefined)this[_0x5978('0x51')]();if(this[_0x5978('0x55')]())return 0x0;return this[_0x5978('0x89')][_0x57af55]||0x0;},Game_BattlerBase[_0x5978('0x8b')][_0x5978('0x55')]=function(_0x723780){if(!$gameParty[_0x5978('0x37')]())return!![];if(this[_0x5978('0x65')]()===_0x723780)return!![];if(this[_0x5978('0xdb')]()===_0x723780)return!![];const _0x256d6c=$dataSkills[_0x723780];if(_0x256d6c&&_0x256d6c[_0x5978('0xeb')]['match'](/<BYPASS COOLDOWNS>/i))return!![];if(_0x256d6c&&_0x256d6c['name']['toUpperCase']()===_0x5978('0xbf'))return!![];return![];},Game_BattlerBase['prototype'][_0x5978('0xc0')]=function(_0x40fd19){if(!$gameParty[_0x5978('0x37')]())return;const _0x471b67=VisuMZ[_0x5978('0x38')][_0x5978('0x61')][_0x5978('0x5f')];if(_0x471b67[_0x5978('0x6c')])_0x471b67[_0x5978('0x6c')][_0x5978('0x77')](this,_0x40fd19);VisuMZ[_0x5978('0x38')][_0x5978('0x63')][_0x40fd19]&&VisuMZ[_0x5978('0x38')]['onCooldownUpdateJS'][_0x40fd19][_0x5978('0x77')](this,_0x40fd19);},Game_BattlerBase['prototype'][_0x5978('0x7d')]=function(_0x407271){if(!$gameParty[_0x5978('0x37')]())return;const _0x3d3b4a=VisuMZ[_0x5978('0x38')][_0x5978('0x61')][_0x5978('0x5f')];if(_0x3d3b4a[_0x5978('0xb6')])_0x3d3b4a[_0x5978('0xb6')]['call'](this,_0x407271);VisuMZ[_0x5978('0x38')][_0x5978('0x5a')][_0x407271]&&VisuMZ['SkillCooldowns'][_0x5978('0x5a')][_0x407271][_0x5978('0x77')](this,_0x407271);},Game_BattlerBase[_0x5978('0x8b')][_0x5978('0x45')]=function(_0x12ab9d,_0x5e9515){if(this[_0x5978('0x89')]===undefined)this[_0x5978('0x51')]();if(this['isBypassCooldowns'](_0x12ab9d))return;_0x5e9515=Math['ceil'](_0x5e9515),_0x5e9515=_0x5e9515[_0x5978('0xc2')](0x0,VisuMZ[_0x5978('0x38')][_0x5978('0x61')][_0x5978('0x5f')][_0x5978('0xb')]);const _0x18bbc5=this[_0x5978('0x1e')](_0x12ab9d);;this[_0x5978('0x89')][_0x12ab9d]=_0x5e9515;if(this[_0x5978('0x89')][_0x12ab9d]<=0x0){if(_0x18bbc5>0x0)this[_0x5978('0x7d')](_0x12ab9d);delete this[_0x5978('0x89')][_0x12ab9d];}},Game_BattlerBase[_0x5978('0x8b')][_0x5978('0xd4')]=function(_0x45dd24,_0x5943c4){if(this[_0x5978('0x89')]===undefined)this[_0x5978('0x51')]();this['_skillCooldowns'][_0x45dd24]=this['_skillCooldowns'][_0x45dd24]||0x0,this[_0x5978('0x45')](_0x45dd24,this[_0x5978('0x89')][_0x45dd24]+_0x5943c4);},Game_BattlerBase[_0x5978('0x8b')][_0x5978('0xb4')]=function(_0x42c405,_0xf784bc){_0xf784bc=this[_0x5978('0x42')](_0x42c405,_0xf784bc,_0x5978('0xc7')),this[_0x5978('0x45')](_0x42c405,Math[_0x5978('0x15')](_0xf784bc,this[_0x5978('0x1e')](_0x42c405)));},Game_BattlerBase[_0x5978('0x8b')][_0x5978('0xe1')]=function(_0x420047,_0x3c4da6){for(const _0x1f9948 of this[_0x5978('0xf3')]()){if(_0x1f9948){if(_0x5978('0x31')===_0x5978('0x31')){const _0x216eda=DataManager[_0x5978('0xb9')](_0x1f9948);_0x216eda['includes'](_0x420047)&&this[_0x5978('0xb4')](_0x1f9948['id'],_0x3c4da6);}else{function _0x482d11(){var _0x39e07d=_0x46c564(_0x261677['$1']);_0x44f473*=_0x39e07d;}}}}},Game_BattlerBase[_0x5978('0x8b')][_0x5978('0xed')]=function(_0x4d2b59){for(const _0x12b769 of this[_0x5978('0xf3')]()){if(_0x12b769){if(_0x5978('0x82')!==_0x5978('0x82')){function _0x2a74a1(){_0x50edc4=_0x3865d9['getSkillIdWithName'](_0x40127e['$1']),_0x2901e8=_0x35e92b(_0x277ff8['$2']);}}else this[_0x5978('0xb4')](_0x12b769['id'],_0x4d2b59);}}},Game_BattlerBase[_0x5978('0x8b')][_0x5978('0xdc')]=function(_0x17faa4){_0x17faa4=_0x17faa4||0x1;for(const _0x266919 in this[_0x5978('0x89')]){if(_0x5978('0x22')!==_0x5978('0x3d')){const _0x169271=this['_skillCooldowns'][_0x266919]||0x0;this[_0x5978('0x89')][_0x266919]-=_0x17faa4,this[_0x5978('0xc0')](_0x266919);if(this[_0x5978('0x89')][_0x266919]<=0x0){if(_0x169271>0x0)this['onCooldownReady'](_0x266919);delete this['_skillCooldowns'][_0x266919];}}else{function _0x3db607(){const _0x537c04=_0x4203e3(_0x27b580['$1']);for(const _0x1a46a6 of this[_0x5978('0xf3')]()){_0x1a46a6&&_0x45a7cb[_0x5978('0xd4')](_0x1a46a6['id'],_0x537c04);}}}}},Game_BattlerBase[_0x5978('0x8b')][_0x5978('0xd0')]=function(){this[_0x5978('0x6b')]={};},Game_BattlerBase[_0x5978('0x8b')][_0x5978('0x88')]=function(_0x11f0b0){return this[_0x5978('0xc8')](_0x11f0b0)+this['cooldown'](_0x11f0b0);},Game_BattlerBase[_0x5978('0x8b')]['rawWarmup']=function(_0x4d4bf1){if(this[_0x5978('0x6b')]===undefined)this[_0x5978('0x51')]();if(this['isBypassWarmups']())return 0x0;return this[_0x5978('0x6b')][_0x4d4bf1]||0x0;},Game_BattlerBase[_0x5978('0x8b')][_0x5978('0x8a')]=function(_0x3404b6){if(this[_0x5978('0x65')]()===_0x3404b6)return!![];if(this[_0x5978('0xdb')]()===_0x3404b6)return!![];const _0x63e844=$dataSkills[_0x3404b6];if(_0x63e844&&_0x63e844['note'][_0x5978('0x85')](/<BYPASS WARMUPS>/i))return!![];if(_0x63e844&&_0x63e844[_0x5978('0xa6')][_0x5978('0xd3')]()===_0x5978('0xbf'))return!![];return![];},Game_BattlerBase[_0x5978('0x8b')]['onWarmupUpdate']=function(_0x5b92e4){if(!$gameParty[_0x5978('0x37')]())return;const _0x8d9a5c=VisuMZ['SkillCooldowns'][_0x5978('0x61')][_0x5978('0xce')];if(_0x8d9a5c[_0x5978('0x6c')])_0x8d9a5c[_0x5978('0x6c')][_0x5978('0x77')](this,_0x5b92e4);VisuMZ[_0x5978('0x38')]['onWarmupUpdateJS'][_0x5b92e4]&&VisuMZ[_0x5978('0x38')]['onWarmupUpdateJS'][_0x5b92e4][_0x5978('0x77')](this,_0x5b92e4);},Game_BattlerBase[_0x5978('0x8b')]['onWarmupReady']=function(_0x4ee380){if(!$gameParty[_0x5978('0x37')]())return;const _0x27e982=VisuMZ[_0x5978('0x38')][_0x5978('0x61')]['Warmup'];if(_0x27e982[_0x5978('0xb6')])_0x27e982[_0x5978('0xb6')]['call'](this,_0x4ee380);},Game_BattlerBase['prototype'][_0x5978('0x9f')]=function(_0x1e7f4f,_0xf31324){if(this['_skillWarmups']===undefined)this[_0x5978('0x51')]();if(this[_0x5978('0x8a')](_0x1e7f4f))return;_0xf31324=Math[_0x5978('0x4b')](_0xf31324),_0xf31324=_0xf31324[_0x5978('0xc2')](0x0,VisuMZ[_0x5978('0x38')][_0x5978('0x61')][_0x5978('0xce')][_0x5978('0xb')]);const _0x5f0cfa=this[_0x5978('0xc8')](_0x1e7f4f);;this[_0x5978('0x6b')][_0x1e7f4f]=_0xf31324;if(this[_0x5978('0x6b')][_0x1e7f4f]<=0x0){if(_0x5f0cfa>0x0)this[_0x5978('0xe4')](_0x1e7f4f);delete this[_0x5978('0x6b')][_0x1e7f4f];}},Game_BattlerBase[_0x5978('0x8b')][_0x5978('0xc5')]=function(_0x314612,_0x1829b8){if(this[_0x5978('0x6b')]===undefined)this['initSkillCooldowns']();this[_0x5978('0x6b')][_0x314612]=this[_0x5978('0x6b')][_0x314612]||0x0;if(this[_0x5978('0x88')](_0x314612)<=0x0)return;this[_0x5978('0x9f')](_0x314612,this[_0x5978('0x6b')][_0x314612]+_0x1829b8);},Game_BattlerBase[_0x5978('0x8b')][_0x5978('0xb8')]=function(_0x18823e,_0x349d8f){_0x349d8f=this[_0x5978('0x42')](_0x18823e,_0x349d8f,'WARMUP'),this[_0x5978('0x9f')](_0x18823e,Math[_0x5978('0x15')](_0x349d8f,this[_0x5978('0x88')](_0x18823e)));},Game_BattlerBase[_0x5978('0x8b')][_0x5978('0xe6')]=function(_0x5b08ca){_0x5b08ca=_0x5b08ca||0x1;for(const _0x226161 in this['_skillWarmups']){const _0x216db1=this[_0x5978('0x6b')][_0x226161]||0x0;this[_0x5978('0x6b')][_0x226161]-=_0x5b08ca;if(this[_0x5978('0x6b')][_0x226161]<=0x0){if(_0x5978('0xaa')==='WwluQ'){function _0x4fd461(){const _0x2ff4f6=_0x27a8db['SkillCooldowns'][_0x5978('0x61')][_0x5978('0xce')][_0x5978('0x8f')]||0x0;this[_0x5978('0xe6')](_0x2ff4f6);}}else{if(_0x216db1>0x0)this[_0x5978('0xe4')](_0x226161);delete this[_0x5978('0x6b')][_0x226161];}}}},VisuMZ[_0x5978('0x38')][_0x5978('0x5b')]=Game_BattlerBase[_0x5978('0x8b')][_0x5978('0xa5')],Game_BattlerBase['prototype'][_0x5978('0xa5')]=function(_0x25219d){if(!VisuMZ[_0x5978('0x38')][_0x5978('0x5b')][_0x5978('0x77')](this,_0x25219d))return![];if(!this[_0x5978('0xca')](_0x25219d))return![];if(!this[_0x5978('0x5c')](_0x25219d))return![];return!![];},Game_BattlerBase[_0x5978('0x8b')][_0x5978('0xca')]=function(_0x819fc1){return this[_0x5978('0xc8')](_0x819fc1['id'])<=0x0;},Game_BattlerBase[_0x5978('0x8b')][_0x5978('0x5c')]=function(_0x2ffe7b){return this[_0x5978('0x1e')](_0x2ffe7b['id'])<=0x0;},VisuMZ[_0x5978('0x38')][_0x5978('0x78')]=Game_BattlerBase[_0x5978('0x8b')][_0x5978('0x56')],Game_BattlerBase[_0x5978('0x8b')]['paySkillCost']=function(_0x4fa95a){VisuMZ[_0x5978('0x38')][_0x5978('0x78')][_0x5978('0x77')](this,_0x4fa95a),this[_0x5978('0xe5')](_0x4fa95a);},Game_BattlerBase[_0x5978('0x8b')][_0x5978('0xe5')]=function(_0x3d86a4){if(!$gameParty[_0x5978('0x37')]())return;const _0x2e8b33=_0x3d86a4[_0x5978('0xeb')];if(_0x2e8b33[_0x5978('0x85')](/<COOLDOWN:[ ](\d+)>/i)){if(_0x5978('0x68')!==_0x5978('0x68')){function _0x3449f1(){var _0x2af434=_0x28c97f(_0x151631['$1']);_0x46c160+=_0x2af434;}}else this[_0x5978('0xb4')](_0x3d86a4['id'],Number(RegExp['$1']));}if(VisuMZ['SkillCooldowns']['cooldownJS'][_0x3d86a4['id']]){if(_0x5978('0xcc')!==_0x5978('0xef'))VisuMZ[_0x5978('0x38')][_0x5978('0x17')][_0x3d86a4['id']][_0x5978('0x77')](this,_0x3d86a4);else{function _0xf83b9b(){_0x522e9d+=_0x5978('0xb3')[_0x5978('0x26')](_0x4eabc2(_0x47f1d8['$1']));}}}const _0x2c6292=_0x2e8b33[_0x5978('0x85')](/<SKILL[ ](.*)[ ]COOLDOWN:[ ](\d+)>/gi);if(_0x2c6292)for(const _0x4cb279 of _0x2c6292){if(_0x5978('0x29')!==_0x5978('0x44')){let _0x124e8b=0x0,_0x319977=0x0;if(_0x4cb279[_0x5978('0x85')](/<SKILL[ ](\d+)[ ]COOLDOWN:[ ](\d+)>/gi))_0x124e8b=Number(RegExp['$1']),_0x319977=Number(RegExp['$2']);else{if(_0x4cb279[_0x5978('0x85')](/<SKILL[ ](.*)[ ]COOLDOWN:[ ](\d+)>/gi)){if(_0x5978('0x25')===_0x5978('0xb2')){function _0x3088d7(){_0x25e2d7=_0x56eb5a[_0x5978('0x3f')](_0xd30b8['$1']),_0x29ed6e=_0x1749b5(_0x18ae81['$2']);}}else _0x124e8b=DataManager[_0x5978('0x3f')](RegExp['$1']),_0x319977=Number(RegExp['$2']);}}const _0x56d30a=$dataSkills[_0x124e8b];if(_0x56d30a){if(_0x5978('0x8d')!==_0x5978('0xda'))this[_0x5978('0xb4')](_0x56d30a['id'],_0x319977);else{function _0x5b64b9(){var _0x119cba=_0x3bafe9(_0x2f5260['$1']);_0x1ff4cb*=_0x119cba;}}}}else{function _0x366337(){this[_0x5978('0x8e')]()['addCooldown'](_0x1d80bf['id'],_0x5860de);}}}const _0x27690b=_0x2e8b33[_0x5978('0x85')](/<STYPE[ ](.*)[ ]COOLDOWN:[ ](\d+)>/gi);if(_0x27690b)for(const _0x47bd01 of _0x27690b){let _0x3fab0=0x0,_0x20e51b=0x0;if(_0x47bd01[_0x5978('0x85')](/<STYPE[ ](\d+)[ ]COOLDOWN:[ ](\d+)>/i))_0x3fab0=Number(RegExp['$1']),_0x20e51b=Number(RegExp['$2']);else _0x47bd01['match'](/<STYPE[ ](.*)[ ]COOLDOWN:[ ](\d+)>/i)&&(_0x3fab0=DataManager[_0x5978('0xf')](RegExp['$1']),_0x20e51b=Number(RegExp['$2']));this[_0x5978('0xe1')](_0x3fab0,_0x20e51b);}if(_0x2e8b33[_0x5978('0x85')](/<GLOBAL COOLDOWN:[ ](\d+)>/i)){const _0x5492f1=Number(RegExp['$1']);this[_0x5978('0xed')](_0x5492f1);}},Game_BattlerBase[_0x5978('0x8b')][_0x5978('0x42')]=function(_0x3223b2,_0x3913e4,_0x21c677){const _0x29033=$dataSkills[_0x3223b2];if(!_0x29033)return _0x3913e4;const _0x4a766f=this[_0x5978('0x2e')](_0x29033,_0x21c677,_0x5978('0x9d')),_0x2bae12=this[_0x5978('0xd9')](_0x29033,_0x21c677,_0x5978('0xd')),_0x22903a=this[_0x5978('0x2e')](_0x29033,_0x21c677,_0x5978('0x4a'));return Math[_0x5978('0x4b')]((_0x3913e4+_0x4a766f)*_0x2bae12+_0x22903a);},VisuMZ[_0x5978('0x38')][_0x5978('0xf2')]={},Game_BattlerBase[_0x5978('0x8b')]['applyCDWUnotetagsFlat']=function(_0x387a96,_0x16792e,_0x34e128){const _0x22e844=_0x387a96['id'],_0x5c465f=_0x387a96['name'][_0x5978('0xb1')](),_0xc80064=VisuMZ[_0x5978('0x38')][_0x5978('0xf2')],_0x15d960=_0x5978('0x8c')[_0x5978('0x26')](_0x22e844,_0x16792e,_0x34e128);_0xc80064[_0x15d960]=_0xc80064[_0x15d960]||{};const _0x1efa76=_0x5978('0x2d');_0xc80064[_0x15d960][_0x5978('0x9')]=_0xc80064[_0x15d960][_0x5978('0x9')]||new RegExp(_0x1efa76['format'](_0x22e844,_0x16792e,_0x34e128),'i'),_0xc80064[_0x15d960][_0x5978('0xb5')]=_0xc80064[_0x15d960]['notetag2']||new RegExp(_0x1efa76[_0x5978('0x26')](_0x5c465f,_0x16792e,_0x34e128),'i');const _0x2b3ed5=DataManager['getSkillTypes'](_0x387a96);for(const _0x37468b of _0x2b3ed5){const _0x177a03='Stype_%1_%2_%3'[_0x5978('0x26')](_0x37468b,_0x16792e,_0x34e128);let _0x3f8e3c=$dataSystem[_0x5978('0x24')][Number(_0x37468b)][_0x5978('0xd3')]()[_0x5978('0xb1')]();_0x3f8e3c=_0x3f8e3c[_0x5978('0x9b')](/\x1I\[(\d+)\]/gi,''),_0x3f8e3c=_0x3f8e3c[_0x5978('0x9b')](/\\I\[(\d+)\]/gi,''),_0xc80064[_0x177a03]=_0xc80064[_0x177a03]||{};const _0x36d9f1=_0x5978('0x75');_0xc80064[_0x177a03][_0x5978('0x9')]=_0xc80064[_0x177a03]['notetag1']||new RegExp(_0x36d9f1[_0x5978('0x26')](_0x37468b,_0x16792e,_0x34e128),'i'),_0xc80064[_0x177a03][_0x5978('0xb5')]=_0xc80064[_0x177a03][_0x5978('0xb5')]||new RegExp(_0x36d9f1[_0x5978('0x26')](_0x3f8e3c,_0x16792e,_0x34e128),'i');}const _0xf59b48=_0x5978('0xf9'),_0x5423e1=_0x5978('0x7')[_0x5978('0x26')](_0x16792e,_0x34e128);_0xc80064[_0x5423e1]=_0xc80064[_0x5423e1]||new RegExp(_0xf59b48[_0x5978('0x26')](_0x16792e,_0x34e128),'i');const _0x3b3265=(_0x2f947b,_0x134b07)=>{if(!_0x134b07)return _0x2f947b;const _0x4d2be6=_0x134b07['note'];if(_0x4d2be6[_0x5978('0x85')](_0xc80064[_0x15d960][_0x5978('0x9')])){var _0x5b6e4a=Number(RegExp['$1']);_0x2f947b+=_0x5b6e4a;}if(_0x4d2be6[_0x5978('0x85')](_0xc80064[_0x15d960]['notetag2'])){if('dBEhL'===_0x5978('0x35')){var _0x5b6e4a=Number(RegExp['$1']);_0x2f947b+=_0x5b6e4a;}else{function _0x4db92c(){var _0x12adba=_0x4a0bd5(_0x3a495e['$1']);_0xece734+=_0x12adba;}}}for(const _0x4a9f32 of _0x2b3ed5){const _0x5f4e0b=_0x5978('0x4f')[_0x5978('0x26')](_0x4a9f32,_0x16792e,_0x34e128);if(_0x4d2be6[_0x5978('0x85')](_0xc80064[_0x5f4e0b][_0x5978('0x9')])){var _0x5b6e4a=Number(RegExp['$1']);_0x2f947b+=_0x5b6e4a;}if(_0x4d2be6[_0x5978('0x85')](_0xc80064[_0x5f4e0b]['notetag2'])){if(_0x5978('0x59')!=='uYIHN'){function _0x533fca(){return this[_0x5978('0x1e')](_0x3ca6ce['id'])<=0x0;}}else{var _0x5b6e4a=Number(RegExp['$1']);_0x2f947b+=_0x5b6e4a;}}}if(_0x4d2be6[_0x5978('0x85')](_0xc80064[_0x5423e1])){var _0x5b6e4a=Number(RegExp['$1']);_0x2f947b+=_0x5b6e4a;}return _0x2f947b;};return this[_0x5978('0x3e')]()[_0x5978('0x4c')](_0x3b3265,0x0);},Game_BattlerBase[_0x5978('0x8b')][_0x5978('0xd9')]=function(_0x1bb186,_0x23e9f1,_0x35785e){const _0x54b5d5=_0x1bb186['id'],_0x2e95f6=_0x1bb186[_0x5978('0xa6')][_0x5978('0xb1')](),_0xbe8c63=VisuMZ['SkillCooldowns'][_0x5978('0xf2')],_0x57336c=_0x5978('0x47'),_0x37d9f0=_0x5978('0x3a'),_0x5a960d=_0x5978('0x8c')[_0x5978('0x26')](_0x54b5d5,_0x23e9f1,_0x35785e);_0xbe8c63[_0x5a960d]=_0xbe8c63[_0x5a960d]||{};const _0x21b560='<SKILL\x20%1\x20%2\x20%3:[\x20]%4>';_0xbe8c63[_0x5a960d][_0x5978('0x9')]=_0xbe8c63[_0x5a960d][_0x5978('0x9')]||new RegExp(_0x21b560[_0x5978('0x26')](_0x54b5d5,_0x23e9f1,_0x35785e,_0x57336c),'i'),_0xbe8c63[_0x5a960d][_0x5978('0xb5')]=_0xbe8c63[_0x5a960d][_0x5978('0xb5')]||new RegExp(_0x21b560[_0x5978('0x26')](_0x2e95f6,_0x23e9f1,_0x35785e,_0x57336c),'i'),_0xbe8c63[_0x5a960d][_0x5978('0xc')]=_0xbe8c63[_0x5a960d][_0x5978('0xc')]||new RegExp(_0x21b560[_0x5978('0x26')](_0x54b5d5,_0x23e9f1,_0x35785e,_0x37d9f0),'i'),_0xbe8c63[_0x5a960d][_0x5978('0xdd')]=_0xbe8c63[_0x5a960d][_0x5978('0xdd')]||new RegExp(_0x21b560['format'](_0x2e95f6,_0x23e9f1,_0x35785e,_0x37d9f0),'i');const _0x4fe834=DataManager[_0x5978('0xb9')](_0x1bb186);for(const _0x59a69a of _0x4fe834){const _0x4e5f07=_0x5978('0x4f')[_0x5978('0x26')](_0x59a69a,_0x23e9f1,_0x35785e);let _0x32af80=$dataSystem[_0x5978('0x24')][Number(_0x59a69a)]['toUpperCase']()[_0x5978('0xb1')]();_0x32af80=_0x32af80[_0x5978('0x9b')](/\x1I\[(\d+)\]/gi,''),_0x32af80=_0x32af80[_0x5978('0x9b')](/\\I\[(\d+)\]/gi,''),_0xbe8c63[_0x4e5f07]=_0xbe8c63[_0x4e5f07]||{};const _0x587191='<STYPE\x20%1\x20%2\x20%3:[\x20]%4>';_0xbe8c63[_0x4e5f07][_0x5978('0x9')]=_0xbe8c63[_0x4e5f07]['notetag1']||new RegExp(_0x587191[_0x5978('0x26')](_0x59a69a,_0x23e9f1,_0x35785e,_0x57336c),'i'),_0xbe8c63[_0x4e5f07]['notetag2']=_0xbe8c63[_0x4e5f07]['notetag2']||new RegExp(_0x587191['format'](_0x32af80,_0x23e9f1,_0x35785e,_0x57336c),'i'),_0xbe8c63[_0x4e5f07][_0x5978('0xc')]=_0xbe8c63[_0x4e5f07][_0x5978('0xc')]||new RegExp(_0x587191[_0x5978('0x26')](_0x59a69a,_0x23e9f1,_0x35785e,_0x37d9f0),'i'),_0xbe8c63[_0x4e5f07][_0x5978('0xdd')]=_0xbe8c63[_0x4e5f07]['notetag4']||new RegExp(_0x587191[_0x5978('0x26')](_0x32af80,_0x23e9f1,_0x35785e,_0x37d9f0),'i');}const _0x2adc5f=_0x5978('0xec'),_0x4d4b18=_0x5978('0x7')[_0x5978('0x26')](_0x23e9f1,_0x35785e);_0xbe8c63[_0x4d4b18]=_0xbe8c63[_0x4d4b18]||{},_0xbe8c63[_0x4d4b18][_0x5978('0x9')]=_0xbe8c63[_0x4d4b18][_0x5978('0x9')]||new RegExp(_0x2adc5f[_0x5978('0x26')](_0x23e9f1,_0x35785e,_0x57336c),'i'),_0xbe8c63[_0x4d4b18]['notetag2']=_0xbe8c63[_0x4d4b18][_0x5978('0xb5')]||new RegExp(_0x2adc5f[_0x5978('0x26')](_0x23e9f1,_0x35785e,_0x37d9f0),'i');const _0x624b12=(_0x214333,_0x44b831)=>{if(!_0x44b831)return _0x214333;const _0x41335c=_0x44b831[_0x5978('0xeb')];if(_0x41335c[_0x5978('0x85')](_0xbe8c63[_0x5a960d]['notetag1'])){var _0x5bd183=Number(RegExp['$1'])/0x64;_0x214333*=_0x5bd183;}if(_0x41335c[_0x5978('0x85')](_0xbe8c63[_0x5a960d][_0x5978('0xb5')])){if(_0x5978('0xa7')===_0x5978('0x2b')){function _0x45fee6(){_0x308e04[_0x5978('0xd4')](_0x164461['id'],_0x536449);}}else{var _0x5bd183=Number(RegExp['$1'])/0x64;_0x214333*=_0x5bd183;}}if(_0x41335c[_0x5978('0x85')](_0xbe8c63[_0x5a960d][_0x5978('0xc')])){if('fAhMz'!=='UCHpR'){var _0x5bd183=Number(RegExp['$1']);_0x214333*=_0x5bd183;}else{function _0x54fbaf(){_0x3114b7[_0x5978('0x38')][_0x5978('0x39')][_0x5978('0x77')](this,_0x55c929),this[_0x5978('0xfb')](),this[_0x5978('0xd0')](),this[_0x5978('0xd7')](_0x111494);}}}if(_0x41335c[_0x5978('0x85')](_0xbe8c63[_0x5a960d][_0x5978('0xdd')])){var _0x5bd183=Number(RegExp['$1']);_0x214333*=_0x5bd183;}for(const _0x503007 of _0x4fe834){if(_0x5978('0x41')!==_0x5978('0x1f')){const _0x47d24c=_0x5978('0x4f')[_0x5978('0x26')](_0x503007,_0x23e9f1,_0x35785e);if(_0x41335c[_0x5978('0x85')](_0xbe8c63[_0x47d24c]['notetag1'])){if(_0x5978('0xa2')!==_0x5978('0xa2')){function _0x19aa6c(){return this[_0x5978('0xc8')](_0x273993)+this['cooldown'](_0x1e178a);}}else{var _0x5bd183=Number(RegExp['$1'])/0x64;_0x214333*=_0x5bd183;}}if(_0x41335c[_0x5978('0x85')](_0xbe8c63[_0x47d24c][_0x5978('0xb5')])){if(_0x5978('0x34')===_0x5978('0x34')){var _0x5bd183=Number(RegExp['$1'])/0x64;_0x214333*=_0x5bd183;}else{function _0x51dda7(){this[_0x5978('0x8e')]()[_0x5978('0xc5')](_0x3cd456['id'],_0x8f2005);}}}if(_0x41335c[_0x5978('0x85')](_0xbe8c63[_0x47d24c][_0x5978('0xc')])){var _0x5bd183=Number(RegExp['$1']);_0x214333*=_0x5bd183;}if(_0x41335c[_0x5978('0x85')](_0xbe8c63[_0x47d24c][_0x5978('0xdd')])){if(_0x5978('0xfc')===_0x5978('0xfc')){var _0x5bd183=Number(RegExp['$1']);_0x214333*=_0x5bd183;}else{function _0x1a914e(){return this[_0x5978('0xc8')](_0x58e899['id'])<=0x0;}}}}else{function _0x2307c4(){this[_0x5978('0xb4')](_0x95d6fa['id'],_0x51b409);}}}if(_0x41335c['match'](_0xbe8c63[_0x4d4b18][_0x5978('0x9')])){if('WsQtj'===_0x5978('0xfa')){var _0x5bd183=Number(RegExp['$1'])/0x64;_0x214333*=_0x5bd183;}else{function _0x3d18fe(){var _0x4e4fb8=_0x531f3a(_0xe3f797['$1']);_0x16a5c0*=_0x4e4fb8;}}}if(_0x41335c['match'](_0xbe8c63[_0x4d4b18][_0x5978('0xb5')])){var _0x5bd183=Number(RegExp['$1']);_0x214333*=_0x5bd183;}return _0x214333;};return this[_0x5978('0x3e')]()['reduce'](_0x624b12,0x1);},VisuMZ[_0x5978('0x38')][_0x5978('0x39')]=Game_Battler[_0x5978('0x8b')][_0x5978('0x1')],Game_Battler[_0x5978('0x8b')][_0x5978('0x1')]=function(_0x40494e){VisuMZ[_0x5978('0x38')][_0x5978('0x39')][_0x5978('0x77')](this,_0x40494e),this[_0x5978('0xfb')](),this[_0x5978('0xd0')](),this[_0x5978('0xd7')](_0x40494e);},Game_Battler['prototype'][_0x5978('0xd7')]=function(_0x117089){for(const _0x35887a of this[_0x5978('0xf3')]()){if(_0x5978('0x33')!==_0x5978('0xd6')){if(!_0x35887a)continue;const _0x2f84a0=_0x35887a['id'],_0x2e9376=_0x35887a[_0x5978('0xeb')];_0x2e9376[_0x5978('0x85')](/<WARMUP:[ ](\d+)>/i)&&this[_0x5978('0xb8')](_0x2f84a0,Number(RegExp['$1']));if(VisuMZ[_0x5978('0x38')][_0x5978('0x80')][_0x35887a['id']]){if(_0x5978('0xf6')!==_0x5978('0x19'))VisuMZ[_0x5978('0x38')]['warmupJS'][_0x35887a['id']][_0x5978('0x77')](this,_0x35887a);else{function _0x3e3071(){_0x5895d1[_0x5978('0x38')][_0x5978('0x78')][_0x5978('0x77')](this,_0x532bb2),this[_0x5978('0xe5')](_0x45c765);}}}}else{function _0x44b31b(){if(this[_0x5978('0x6b')]===_0x49bdc7)this[_0x5978('0x51')]();this[_0x5978('0x6b')][_0x1be300]=this[_0x5978('0x6b')][_0x4fdba7]||0x0;if(this[_0x5978('0x88')](_0x17e516)<=0x0)return;this[_0x5978('0x9f')](_0xf812b8,this[_0x5978('0x6b')][_0x2da167]+_0x3bc2b3);}}}if(_0x117089){const _0x4fe331=VisuMZ['SkillCooldowns'][_0x5978('0x61')]['Warmup']['Preemptive']||0x0;this[_0x5978('0xe6')](_0x4fe331);}},Game_Battler[_0x5978('0x8b')][_0x5978('0x67')]=function(){if(this[_0x5978('0x4d')])return;if(this[_0x5978('0xd5')])return;this[_0x5978('0x4d')]=!![],this[_0x5978('0xdc')](),this[_0x5978('0xe6')]();},VisuMZ[_0x5978('0x38')][_0x5978('0x5')]=Game_Battler['prototype']['onTurnEnd'],Game_Battler[_0x5978('0x8b')]['onTurnEnd']=function(){this['_updatedSkillCooldowns']=![],VisuMZ[_0x5978('0x38')][_0x5978('0x5')]['call'](this);},VisuMZ[_0x5978('0x38')][_0x5978('0x43')]=Game_Battler[_0x5978('0x8b')][_0x5978('0x57')],Game_Battler[_0x5978('0x8b')][_0x5978('0x57')]=function(){VisuMZ[_0x5978('0x38')][_0x5978('0x43')]['call'](this),this[_0x5978('0xfb')](),this['clearWarmups']();},VisuMZ[_0x5978('0x38')][_0x5978('0x64')]=Window_Base[_0x5978('0x8b')][_0x5978('0xc4')],Window_Base[_0x5978('0x8b')]['drawSkillCost']=function(_0x2d6902,_0x5932b4,_0x379f7a,_0x8f4e9d,_0x4c3a5e){const _0x3ad6b0=VisuMZ[_0x5978('0x38')][_0x5978('0x61')];if(_0x3ad6b0[_0x5978('0xce')]['Show']&&_0x2d6902[_0x5978('0xc8')](_0x5932b4['id'])>0x0)this[_0x5978('0xbd')](_0x2d6902,_0x5932b4,_0x379f7a,_0x8f4e9d,_0x4c3a5e);else{if(_0x3ad6b0['Cooldown'][_0x5978('0x54')]&&_0x2d6902['cooldown'](_0x5932b4['id'])>0x0){if(_0x5978('0xe0')!==_0x5978('0xe0')){function _0x34e31e(){if(_0x301f19){const _0x2263ea=_0x3166e0[_0x5978('0xb9')](_0x4417fc);_0x2263ea[_0x5978('0xb7')](_0x24d2f4)&&_0x409699[_0x5978('0xd4')](_0x396787['id'],_0x1b0a61);}}}else this[_0x5978('0xae')](_0x2d6902,_0x5932b4,_0x379f7a,_0x8f4e9d,_0x4c3a5e);}else VisuMZ[_0x5978('0x38')][_0x5978('0x64')][_0x5978('0x77')](this,_0x2d6902,_0x5932b4,_0x379f7a,_0x8f4e9d,_0x4c3a5e);}},Window_Base[_0x5978('0x8b')][_0x5978('0xbd')]=function(_0x581971,_0x7c005c,_0x5f2dc1,_0xa0d1f0,_0x49ceff){const _0x483318=VisuMZ[_0x5978('0x38')]['Settings'][_0x5978('0xce')];let _0x2f5b34='';_0x2f5b34+=_0x5978('0x5e')[_0x5978('0x26')](_0x483318[_0x5978('0xcb')]);const _0x260109=_0x483318[_0x5978('0x9c')];_0x260109[_0x5978('0x85')](/#(.*)/i)&&Imported[_0x5978('0x21')]?_0x2f5b34+=_0x5978('0xb3')['format'](String(RegExp['$1'])):_0x2f5b34+=_0x5978('0x30')[_0x5978('0x26')](_0x260109);const _0x4e6b5a=_0x581971[_0x5978('0x88')](_0x7c005c['id']),_0x1efb17=_0x483318[_0x5978('0xee')]>0x0?'\x5cI[%1]'[_0x5978('0x26')](_0x483318[_0x5978('0xee')]):'';_0x2f5b34+=_0x483318[_0x5978('0x6a')]['format'](_0x4e6b5a,_0x1efb17);const _0x17fd9b=this[_0x5978('0x18')](_0x2f5b34,_0x5f2dc1,_0xa0d1f0,_0x49ceff),_0x464dc2=_0x5f2dc1+_0x49ceff-_0x17fd9b[_0x5978('0xa4')];this[_0x5978('0x92')](_0x2f5b34,_0x464dc2,_0xa0d1f0,_0x49ceff),this['resetFontSettings']();},Window_Base[_0x5978('0x8b')]['drawSkillCooldown']=function(_0x5fd4af,_0x5020e,_0x253dd0,_0x430fdd,_0xae1bed){const _0x200067=VisuMZ[_0x5978('0x38')][_0x5978('0x61')][_0x5978('0x5f')];let _0x4e8e02='';_0x4e8e02+='\x5cFS[%1]'[_0x5978('0x26')](_0x200067[_0x5978('0xcb')]);const _0x486134=_0x200067[_0x5978('0x9c')];if(_0x486134[_0x5978('0x85')](/#(.*)/i)&&Imported['VisuMZ_1_MessageCore']){if(_0x5978('0x1c')!==_0x5978('0x1c')){function _0x5e389b(){_0x43e7dc+=_0x5978('0x30')[_0x5978('0x26')](_0x4aa92d);}}else _0x4e8e02+=_0x5978('0xb3')[_0x5978('0x26')](String(RegExp['$1']));}else{if(_0x5978('0x16')===_0x5978('0x90')){function _0x1a02a1(){if(_0x4709c1){const _0x52749a=_0x425d8a[_0x5978('0xb9')](_0x36107a);_0x52749a['includes'](_0x576041)&&_0x5bdf02['addWarmup'](_0x40ee9a['id'],_0x5cb1e8);}}}else _0x4e8e02+='\x5cC[%1]'[_0x5978('0x26')](_0x486134);}const _0x1e6f79=_0x5fd4af[_0x5978('0x1e')](_0x5020e['id']),_0x1b773e=_0x200067[_0x5978('0xee')]>0x0?'\x5cI[%1]'[_0x5978('0x26')](_0x200067[_0x5978('0xee')]):'';_0x4e8e02+=_0x200067['TextFmt'][_0x5978('0x26')](_0x1e6f79,_0x1b773e);const _0x5531ec=this[_0x5978('0x18')](_0x4e8e02,_0x253dd0,_0x430fdd,_0xae1bed),_0xc019b3=_0x253dd0+_0xae1bed-_0x5531ec[_0x5978('0xa4')];this['drawTextEx'](_0x4e8e02,_0xc019b3,_0x430fdd,_0xae1bed),this[_0x5978('0x71')]();};