//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.22;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.22] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
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
 * Action End Removal for States
 * 
 * - If your Plugin Parameter settings for "Action End Update" are enabled,
 * then "Action End" has been updated so that it actually applies per action
 * used instead of just being at the start of a battler's action set.
 * 
 * - However, there are side effects to this: if a state has the "Cannot Move"
 * restriction along with the "Action End" removal timing, then unsurprisingly,
 * the state will never wear off because it's now based on actual actions
 * ending. To offset this and remove confusion, "Action End" auto-removal
 * timings for states with "Cannot Move" restrictions will be turned into
 * "Turn End" auto-removal timings while the "Action End Update" is enabled.
 * 
 * - This automatic change won't make it behave like an "Action End" removal
 * timing would, but it's better than completely softlocking a battler.
 * 
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 * 
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a flat value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 * 
 * <Resist State Category: name>
 * <Resist State Categories: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 * 
 * <Resist State Categories>
 *  name
 *  name
 *  name
 * </Resist State Categories>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * Version 1.22: August 6, 2021
 * * Documentation Update!
 * ** "Action End Removal for States" under Major Updates is changed to:
 * *** If your Plugin Parameter settings for "Action End Update" are enabled,
 *     then "Action End" has been updated so that it actually applies per
 *     action used instead of just being at the start of a battler's action
 *     set.
 * *** However, there are side effects to this: if a state has the "Cannot
 *     Move" restriction along with the "Action End" removal timing, then
 *     unsurprisingly, the state will never wear off because it's now based on
 *     actual actions ending. To offset this and remove confusion, "Action End"
 *     auto-removal timings for states with "Cannot Move" restrictions will be
 *     turned into "Turn End" auto-removal timings while the "Action End
 *     Update" is enabled.
 * *** This automatic change won't make it behave like an "Action End" removal
 *     timing would, but it's better than completely softlocking a battler.
 * * Feature Update!
 * ** Those using "Cannot Move" states with "Action End" auto-removal will now
 *    have be automatically converted into "Turn End" auto-removal if the
 *    plugin parameter "Action End Update" is set to true. Update by Irina.
 * 
 * Version 1.21: July 30, 2021
 * * Documentation Update!
 * ** Expanded "Action End Removal for States" section in Major Changes.
 * *** These changes have been in effect since Version 1.07 but have not been
 *     explained in excess detail in the documentation since.
 * **** Action End has been updated so that it actually applies per action used
 *      instead of just being at the start of a battler's action set. However,
 *      there are side effects to this: if a state has the "Cannot Move"
 *      restriction along with the "Action End" removal timing, then
 *      unsurprisingly, the state will never wear off because it's now based on
 *      actual actions ending. There are two solutions to this:
 * **** Don't make "Cannot Move" restriction states with "Action End". This is
 *      not a workaround. This is how the state removal is intended to work
 *      under the new change.
 * **** Go to the Skills & States Core Plugin Parameters, go to State
 *      Setttings, look for "Action End Update", and set it to false. You now
 *      reverted the removal timing system back to how it originally was in RPG
 *      Maker MZ's default battle system where it only updates based on an
 *      action set rather than per actual action ending.
 * 
 * Version 1.20: June 18, 2021
 * * Feature Update!
 * ** Updated automatic caching for conditional passive states to update more
 *    efficiently. Update made by Arisu.
 * 
 * Version 1.19: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
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
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.hpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.mpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.tpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}"]
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
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
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc States with "Action End" auto-removal will also update
 * turns at the end of each action instead of all actions.
 * @default true
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0xed31=['enemyId','setStateRetainType','checkSkillTypeMatch','TRcxY','ConvertParams','applyBuffTurnManipulationEffects','onAddStateMakeCustomSlipValues','_stateData','duKaR','<troop-%1>','isStateRestrict','Buffs','DLbMX','setStatusWindow','YKzhL','skillCostSeparator','map','checkShowHideBattleNotetags','LayoutStyle','DvBDi','drawItemStyleIconText','applyDebuffTurnManipulationEffects','drawActorIconsAllTurnCounters','kkZlO','Scene_Skill_itemWindowRect','pWXCa','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','AnExe','Scene_Skill_createItemWindow','mIamQ','chzBk','_cache','setStypeId','drawParamText','esVmJ','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','setStateData','_animationIndex','qAoNH','onEraseStateJS','menuActor','recoverAll','GaugeCurrentJS','isStateExpired','stateTpSlipHealJS','wdFgN','buffLength','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','PQkrZ','tFSCg','_stateMaxTurns','createShopStatusWindow','LkoEf','drawText','isStateResist','loadBitmap','%1\x20%2\x20%3','SkillSceneStatusBgType','TextJS','iRtSe','fqgOQ','skillTypeWindowRect','setStateTurns','Actor','ANY','_classIDs','Skills','isBuffAffected','jhWWP','shift','Game_BattlerBase_increaseBuff','_currentTroopUniqueID','traitObjects','addStateTurns','add','allIcons','colSpacing','1416347LOulfb','stateHpSlipHealJS','totalStateCategory','isPassiveStateStackable','stypeId','getClassIdWithName','ARRAYSTR','overwriteBuffTurns','stateEraseJS','Game_Actor_skillTypes','includesSkillsStatesCore','<member-%1>','LUK','Game_BattlerBase_traitsSet','_itemWindow','regenerateAllSkillsStatesCore','CanPayJS','oPOqN','NEGATIVE','meetsPassiveStateGlobalConditionJS','Window_StatusBase_drawActorIcons','gtkGu','getStateOrigin','stateMpSlipDamageJS','<enemy-%1>','Sprite_StateIcon_updateFrame','States','eraseBuff','statusWindowRect','paramBuffRate','shopStatusWindowRect','windowPadding','QStzi','regenerateAll','isStateCategoryResisted','passiveStateObjects','testApply','addDebuffTurns','updatedLayoutStyle','Game_BattlerBase_skillTpCost','Parse_Notetags_Skill_Cost','ARRAYNUM','fjnrw','textColor','Parse_Notetags_State_SlipEffectJS','getColorDataFromPluginParameters','format','magicSkills','jmXEi','skills','prototype','drxkx','1Kqysnu','Game_Battler_addDebuff','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','drawActorIcons','getCurrentTroopUniqueID','resetFontSettings','mqkGz','setBackgroundType','_tempActor','Enemy','textSizeEx','Game_BattlerBase_buffIconIndex','iconIndex','myqYG','addCommand','ColorNeutral','_lastStatesActionEndFrameCount','mainFontSize','DisplayedParams','getStateReapplyRulings','QyFmP','Game_BattlerBase_eraseBuff','_skillIDs','oAQJN','onEraseBuffGlobalJS','Parse_Notetags_Skill_JS','199fahmPa','ATK','onAddStateCustomJS','buttonAssistSwitch','ParseClassIDs','_skillTypeWindow','placeExactGauge','htyJT','addPassiveStates','slipMp','itemTextAlign','MPOGn','ZWwzY','POSITIVE','death','Game_BattlerBase_resetStateCounts','active','checkSkillConditionsNotetags','VisuMZ_1_MainMenuCore','TcUVF','DwQLs','eraseState','bitmap','Game_BattlerBase_decreaseBuff','priority','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','isBottomHelpMode','onExpireDebuffJS','QPidP','skillEnableJS','Game_Troop_setup','action','log','gaugeRate','DQdfh','aBxTP','center','MxCvb','iYHjR','Scene_Boot_onDatabaseLoaded','CalcJS','Sprite_Gauge_gaugeRate','kjfwC','onEraseBuffJS','HmJbM','changeOutlineColor','setItem','Game_Actor_learnSkill','hide','Game_BattlerBase_die','push','hasStateCategory','_costSettings','ARRAYFUNC','traitsSet','5801fdTjSM','ZoKFe','stateHpSlipDamageJS','adjustItemWidthByShopStatus','SOLGb','bJktn','Game_BattlerBase_clearStates','hasSkill','_result','cCkaE','mMaoO','number','addPassiveStatesFromOtherPlugins','right','statePassiveConditionJS','debuffTurns','ejCPx','skillTypeWindowRectSkillsStatesCore','applyStateTurnManipulationEffects','createCommandNameWindow','ColorDebuff','BfYnY','makeCurrentTroopUniqueID','Game_BattlerBase_meetsSkillConditions','PGoMY','isRightInputMode','length','_stateDisplay','YjoLv','onAddDebuffJS','eyuCr','isAllDead','dwmVe','maxItems','toUpperCase','removeState','actorId','BattleManager_endAction','MDF','Costs','split','yZcBa','BlZHG','_stored_buffColor','getStypeIdWithName','makeCommandList','ceil','untitled','\x5cI[%1]%2','debuffColor','jAHbV','Iaznw','remove','FUXAh','indexOf','updateTurnDisplaySprite','getCurrentStateActiveUser','onExpireStateCustomJS','resetStateCounts','<actor-%1>','_actor','EnableLayout','isPlaytest','tatPJ','onAddState','height','ignore','onEraseStateGlobalJS','setActor','RzbDQ','HQKMS','onAddStateJS','resetTextColor','UXJaG','HiddenSkillTypes','return\x200','_buffTurns','paySkillCost','Window_StatusBase_placeGauge','skillId','_stateRetainType','isPartyAllAffectedByGroupDefeatStates','helpAreaHeight','eatwb','rQrFQ','BqciF','commandNameWindowDrawBackground','GaugeMaxJS','AGI','setDebuffTurns','skillVisibleJS','vhbUP','helpAreaTop','parameters','isStateCategoryAffected','autoRemovalTiming','Game_BattlerBase_initMembers','description','onDatabaseLoaded','anchor','process_VisuMZ_SkillsStatesCore_Skill_Notetags','drawIcon','skill','gpFoy','URRpk','getSkillTypes','QJksv','convertTargetToStateOriginKey','Game_Battler_regenerateAll','commandNameWindowDrawText','meetsStateCondition','isCommandEnabled','updateCommandNameWindow','SeTAd','clearStateDisplay','gainMp','checkShowHideSkillNotetags','Game_BattlerBase_isStateResist','stateTurns','drawActorStateTurns','_skills','setBuffTurns','onExpireBuff','isStateRemoved','parse','kBaMl','isLearnedSkill','Parse_Notetags_State_Category','stateColor','isGroupDefeatStateAffected','pRBRy','_tempBattler','eMShi','orwtY','uPmzD','aVfJH','uxLKv','EitmU','stateMpSlipHealJS','onEraseBuff','buffTurns','meetsPassiveStateConditions','meetsPassiveStateConditionJS','status','tkIUg','MAT','clearStatesWithStateRetain','none','updateFrame','pfIAT','AjUnj','stateMaximumTurns','canClearState','mWiCL','process_VisuMZ_SkillsStatesCore_State_Notetags','mRNVL','UYQvs','testSkillStatesCoreNotetags','CoreEngine','updateVisibility','784417ExawXB','removeStatesByCategory','AUoar','ARRAYJSON','onAddBuffGlobalJS','SkillSceneAdjustSkillList','makeSuccess','nBAbu','wNMuQ','JSON','uiMenuStyle','797919oBboWL','checkSkillConditionsSwitchNotetags','rglAo','makeCommandName','exit','maxSlipDamage','mpCost','includes','QAjOz','getStateRetainType','boxWidth','SkillConditionJS','_subject','DataOffsetY','drawActorBuffTurns','VisuMZ_0_CoreEngine','itemLineRect','meetsSkillConditions','maxCols','STRUCT','oaMOJ','applyItemUserEffect','MultiplierJS','states','removeStatesAuto','commandStyle','Scene_Skill_helpWindowRect','ryaPX','isStateAffected','drawItem','pArPj','item','ParseStateNotetags','Game_Battler_addState','isUseSkillsStatesCoreUpdatedLayout','clearStateOrigin','Sprite_Gauge_redraw','ARRAYEVAL','Game_Actor_forgetSkill','qechg','onExpireDebuffGlobalJS','createPassiveStatesCache','restriction','alterSkillName','QNxRv','jUBzZ','constructor','onExpireStateJS','helpWindowRectSkillsStatesCore','getStateIdWithName','createAllSkillCostText','vxjyu','onExpireDebuff','_states','kumzP','applySkillsStatesCoreEffects','drawSkillCost','text','mainAreaTop','vOxKu','TNUAa','normalColor','totalStateCategoryAffected','Sprite_StateIcon_loadBitmap','initMembersSkillsStatesCore','contents','lcesS','fuFmQ','_stored_debuffColor','setStateOrigin','increaseBuff','_checkingPassiveStates','makeAdditionalSkillCostText','onEraseDebuffJS','test','addWindow','IErxd','paramValueByName','isMaxDebuffAffected','allowCreateShopStatusWindow','YkKXI','CmdTextAlign','_colorCache','IGFaU','Window_SkillList_setActor','_checkingTraitsSetSkillsStatesCore','Scene_Skill_statusWindowRect','ShowData','commandNameWindowCenter','stateData','max','stateTpSlipDamageJS','XMHEu','WjrOZ','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','EVAL','DcIay','isBuffPrevented','onExpireBuffGlobalJS','737188wFwrSf','Game_BattlerBase_refresh','KTwbH','initMembers','skillTypes','currentMaxValue','learnSkill','APjMZ','Sprite_Gauge_currentValue','waKHL','aruBt','getSkillIdWithName','STR','iconWidth','mainAreaHeight','shopStatusWidth','greater','isSkillCostShown','endAction','value','RKHGw','changeTextColor','refresh','MAXHP','sNPXr','gaugeLineHeight','onAddStateGlobalJS','heal','isDebuffAffected','_shopStatusWindow','process_VisuMZ_SkillsStatesCore_Notetags','ShowJS','isUseModernControls','drawActorBuffRates','addState','tPlyM','Window_SkillStatus_refresh','commandStyleCheck','decreaseBuff','updateStateTurns','LgDdD','setup','onEraseDebuff','checkShowHideJS','XdTVr','clearStates','_phase','addBuff','FHoRD','Global','RuBBF','addDebuff','567991fNCSue','drawTextEx','outlineColor','PvPXw','EoTfQ','TurnOffsetX','Name','floor','Game_BattlerBase_states','Dnxse','_turnDisplaySprite','drawActorStateData','NuMYA','statusWidth','createTurnDisplaySprite','ozYcw','placeGauge','addChild','isRnb','groupDefeat','initialize','Game_Action_testApply','SRlDs','XxuGP','Game_Action_applyItemUserEffect','iconHeight','_battler','keys','GKRPb','SkillsStatesCore','_stateIDs','onAddDebuff','statusWindowRectSkillsStatesCore','Game_BattlerBase_overwriteBuffTurns','multiclasses','canUse','addPassiveStatesByPluginParameters','Game_Battler_isStateAddable','statesByCategory','Scene_Skill_skillTypeWindowRect','currentValueSkillsStatesCore','OYuxA','helpWindowRect','PICwu','PassiveStates','NZgXM','call','FlllU','DataFontSize','drawExtendedSkillsStatesCoreStatus','uiInputPosition','_stypeIDs','clearStateData','DataOffsetX','_checkingVisuMzPassiveStateObjects','addBuffTurns','checkShowHideSwitchNotetags','Sprite_Gauge_currentMaxValue','NEKOy','MaxTurns','redrawSkillsStatesCore','categories','DEF','ActionEndUpdate','useDigitGrouping','VisuMZ_2_ClassChangeSystem','RfxyE','EGuwy','currentValue','CmdStyle','eaxcl','removeStatesByCategoryAll','iconText','fontBold','clear','CquTi','fontSize','isSkillUsableForAutoBattle','isMaxBuffAffected','onAddDebuffGlobalJS','sBEls','xsQcX','drawExtendedParameter','slipHp','icon','checkCacheKey','Window_SkillList_updateHelp','frameCount','passiveStates','drawItemStyleIcon','_stateOrigin','index','Window_SkillType_initialize','Window_SkillList_maxCols','isStateAddable','rgba(0,\x200,\x200,\x201)','Sprite_Gauge_setup','stateCategoriesResisted','user','clearStateRetainType','onExpireBuffJS','updateHelp','stateId','_currentActor','GroupDigits','Fuvkr','slipTp','hNcaO','VhrRx','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','damage','TurnOffsetY','onRegenerateCustomStateDamageOverTime','LvugX','isBuffOrDebuffAffected','replace','BattleHiddenSkillTypes','isBuffExpired','itemAt','currentClass','stateAddJS','getCurrentStateOriginKey','canPaySkillCost','sRlaF','concat','addPassiveStatesTraitSets','getStateData','TEnum','applyStateCategoryRemovalEffects','equips','TurnFontSize','StackBuffMax','riTWh','dFcIk','AlvQv','innerWidth','redraw','version','buff','tpCost','pTfFw','ShowTurns','IconStypeMagic','VisuMZ_1_ItemsEquipsCore','width','_scene','trim','Window_SkillList_drawItem','LuiZb','CppOl','866876uTMBWy','onRemoveState','Game_BattlerBase_recoverAll','stateExpireJS','gainSilentTp','zECzd','onExpireState','recover\x20all','reNKc','match','members','Parse_Notetags_State_ApplyRemoveLeaveJS','hasState','convertPassiveStates','onAddBuffJS','ParseSkillNotetags','die','makeResistedStateCategories','removeBuffsAuto','_statusWindow','onAddBuff','XMeeC','Game_Battler_addBuff','_buffs','Ycidb','Game_BattlerBase_skillMpCost','clamp','buffIconIndex','convertGaugeTypeSkillsStatesCore','CheckIncompatibleStates','Window_SkillList_includes','inBattle','_stateSteps','onEraseStateCustomJS','meetsSkillConditionsEnableJS','BIvUY','itemWindowRect','ReapplyRules','bSrjg','onExpireStateGlobalJS','ColorBuff','enemy','ColorPositive','shopStatusWindowRectSkillsStatesCore','PayJS','updateStatesActionEnd','currentMaxValueSkillsStatesCore','GovAK','name','BSMHa','meetsSkillConditionsGlobalJS','SkillMenuStatusRect','Game_Unit_isAllDead','CFTUU','commandName','_commandNameWindow','_stateTurns','createSkillCostText','aeKhq','calcWindowHeight','actor','Settings','meetsPassiveStateConditionClasses','retrieveStateColor','_passiveStateResults','note','xZCwM','ALL','setPassiveStateSlipDamageJS','Parse_Notetags_State_PassiveJS','#%1','success','isActor','uiHelpPosition','skillTpCost','buffColor','BknYj','StackDebuffMax','CWCnL','buttonAssistText1','getStateDisplay','filter','BFdzN','gradientFillRect','_stypeId','YHSLk','gdUSy','%1%'];const _0x280ecb=_0xa2f0;function _0xa2f0(_0x1d782d,_0x57d0a4){return _0xa2f0=function(_0xed3161,_0xa2f0aa){_0xed3161=_0xed3161-0x6c;let _0x149557=_0xed31[_0xed3161];return _0x149557;},_0xa2f0(_0x1d782d,_0x57d0a4);}(function(_0x198522,_0x3a4a38){const _0x38e83e=_0xa2f0;while(!![]){try{const _0x563015=parseInt(_0x38e83e(0x12b))+parseInt(_0x38e83e(0x94))+parseInt(_0x38e83e(0xf7))+-parseInt(_0x38e83e(0x266))*-parseInt(_0x38e83e(0x29a))+-parseInt(_0x38e83e(0x1c1))+-parseInt(_0x38e83e(0x89))+-parseInt(_0x38e83e(0x2eb))*parseInt(_0x38e83e(0x2b4));if(_0x563015===_0x3a4a38)break;else _0x198522['push'](_0x198522['shift']());}catch(_0xa10839){_0x198522['push'](_0x198522['shift']());}}}(_0xed31,0xae419));var label=_0x280ecb(0x148),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x280ecb(0x212)](function(_0x4011dc){const _0x30a4f5=_0x280ecb;return _0x4011dc[_0x30a4f5(0x78)]&&_0x4011dc[_0x30a4f5(0x34c)][_0x30a4f5(0x9b)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x280ecb(0x21d)]=function(_0x661611,_0x187016){const _0x22e309=_0x280ecb;for(const _0x553b0 in _0x187016){if(_0x553b0[_0x22e309(0x1ca)](/(.*):(.*)/i)){const _0x1146e0=String(RegExp['$1']),_0x3984e6=String(RegExp['$2'])[_0x22e309(0x30d)]()[_0x22e309(0x1bd)]();let _0x65a9ad,_0x1fbbc5,_0x36769d;switch(_0x3984e6){case'NUM':_0x65a9ad=_0x187016[_0x553b0]!==''?Number(_0x187016[_0x553b0]):0x0;break;case _0x22e309(0x28f):_0x1fbbc5=_0x187016[_0x553b0]!==''?JSON['parse'](_0x187016[_0x553b0]):[],_0x65a9ad=_0x1fbbc5['map'](_0x2325f0=>Number(_0x2325f0));break;case _0x22e309(0xf3):_0x65a9ad=_0x187016[_0x553b0]!==''?eval(_0x187016[_0x553b0]):null;break;case _0x22e309(0xb9):_0x1fbbc5=_0x187016[_0x553b0]!==''?JSON[_0x22e309(0x367)](_0x187016[_0x553b0]):[],_0x65a9ad=_0x1fbbc5[_0x22e309(0x229)](_0x364d36=>eval(_0x364d36));break;case _0x22e309(0x92):_0x65a9ad=_0x187016[_0x553b0]!==''?JSON[_0x22e309(0x367)](_0x187016[_0x553b0]):'';break;case _0x22e309(0x8c):_0x1fbbc5=_0x187016[_0x553b0]!==''?JSON['parse'](_0x187016[_0x553b0]):[],_0x65a9ad=_0x1fbbc5[_0x22e309(0x229)](_0x2dbc4b=>JSON[_0x22e309(0x367)](_0x2dbc4b));break;case'FUNC':_0x65a9ad=_0x187016[_0x553b0]!==''?new Function(JSON[_0x22e309(0x367)](_0x187016[_0x553b0])):new Function(_0x22e309(0x336));break;case _0x22e309(0x2e9):_0x1fbbc5=_0x187016[_0x553b0]!==''?JSON['parse'](_0x187016[_0x553b0]):[],_0x65a9ad=_0x1fbbc5['map'](_0x42d32b=>new Function(JSON['parse'](_0x42d32b)));break;case _0x22e309(0x103):_0x65a9ad=_0x187016[_0x553b0]!==''?String(_0x187016[_0x553b0]):'';break;case _0x22e309(0x26c):_0x1fbbc5=_0x187016[_0x553b0]!==''?JSON[_0x22e309(0x367)](_0x187016[_0x553b0]):[],_0x65a9ad=_0x1fbbc5[_0x22e309(0x229)](_0x5bcc74=>String(_0x5bcc74));break;case _0x22e309(0xa7):_0x36769d=_0x187016[_0x553b0]!==''?JSON['parse'](_0x187016[_0x553b0]):{},_0x661611[_0x1146e0]={},VisuMZ[_0x22e309(0x21d)](_0x661611[_0x1146e0],_0x36769d);continue;case'ARRAYSTRUCT':_0x1fbbc5=_0x187016[_0x553b0]!==''?JSON[_0x22e309(0x367)](_0x187016[_0x553b0]):[],_0x65a9ad=_0x1fbbc5[_0x22e309(0x229)](_0x48548e=>VisuMZ[_0x22e309(0x21d)]({},JSON['parse'](_0x48548e)));break;default:continue;}_0x661611[_0x1146e0]=_0x65a9ad;}}return _0x661611;},(_0x517589=>{const _0x4ad035=_0x280ecb,_0x1c630b=_0x517589[_0x4ad035(0x1f1)];for(const _0x577ac6 of dependencies){if(!Imported[_0x577ac6]){alert(_0x4ad035(0x23c)[_0x4ad035(0x294)](_0x1c630b,_0x577ac6)),SceneManager[_0x4ad035(0x98)]();break;}}const _0xb65c8=_0x517589[_0x4ad035(0x34c)];if(_0xb65c8[_0x4ad035(0x1ca)](/\[Version[ ](.*?)\]/i)){if('nTykT'===_0x4ad035(0x7f))_0x35d7ae=_0x47723b(_0x3e0115['$1']),_0x216b49=_0x5a8440(_0x46a0a2['$2']);else{const _0x819ca9=Number(RegExp['$1']);_0x819ca9!==VisuMZ[label][_0x4ad035(0x1b4)]&&(alert(_0x4ad035(0x198)['format'](_0x1c630b,_0x819ca9)),SceneManager[_0x4ad035(0x98)]());}}if(_0xb65c8[_0x4ad035(0x1ca)](/\[Tier[ ](\d+)\]/i)){if(_0x4ad035(0x1a6)!==_0x4ad035(0xcf)){const _0x30f04d=Number(RegExp['$1']);if(_0x30f04d<tier)alert(_0x4ad035(0x29c)[_0x4ad035(0x294)](_0x1c630b,_0x30f04d,tier)),SceneManager['exit']();else{if(_0x4ad035(0x22c)!=='DvBDi')return!![];else tier=Math['max'](_0x30f04d,tier);}}else{if(!this[_0x4ad035(0x327)][_0x4ad035(0x2f2)](_0x5b853c))return!![];}}VisuMZ['ConvertParams'](VisuMZ[label][_0x4ad035(0x1fe)],_0x517589[_0x4ad035(0x348)]);})(pluginData),VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x2db)]=Scene_Boot[_0x280ecb(0x298)]['onDatabaseLoaded'],Scene_Boot[_0x280ecb(0x298)][_0x280ecb(0x34d)]=function(){const _0x415de7=_0x280ecb;VisuMZ['SkillsStatesCore'][_0x415de7(0x2db)][_0x415de7(0x159)](this),this['process_VisuMZ_SkillsStatesCore_Notetags'](),VisuMZ[_0x415de7(0x148)][_0x415de7(0x1de)]();},Scene_Boot[_0x280ecb(0x298)][_0x280ecb(0x115)]=function(){const _0x305b66=_0x280ecb;if(VisuMZ['ParseAllNotetags'])return;this['process_VisuMZ_SkillsStatesCore_Skill_Notetags'](),this[_0x305b66(0x83)]();},Scene_Boot['prototype'][_0x280ecb(0x34f)]=function(){const _0x3ab195=_0x280ecb;for(const _0x49e601 of $dataSkills){if(_0x3ab195(0xc0)!==_0x3ab195(0xc0))this[_0x3ab195(0xbc)](_0x110121);else{if(!_0x49e601)continue;VisuMZ['SkillsStatesCore'][_0x3ab195(0x28e)](_0x49e601),VisuMZ[_0x3ab195(0x148)]['Parse_Notetags_Skill_JS'](_0x49e601);}}},Scene_Boot['prototype'][_0x280ecb(0x83)]=function(){const _0x17b009=_0x280ecb;for(const _0x44dd58 of $dataStates){if(!_0x44dd58)continue;VisuMZ['SkillsStatesCore'][_0x17b009(0x36a)](_0x44dd58),VisuMZ[_0x17b009(0x148)][_0x17b009(0x206)](_0x44dd58),VisuMZ[_0x17b009(0x148)][_0x17b009(0x292)](_0x44dd58),VisuMZ['SkillsStatesCore']['Parse_Notetags_State_ApplyRemoveLeaveJS'](_0x44dd58);}},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x1d0)]=VisuMZ[_0x280ecb(0x1d0)],VisuMZ['ParseSkillNotetags']=function(_0x2bd6f2){const _0xa8b0b1=_0x280ecb;VisuMZ[_0xa8b0b1(0x148)]['ParseSkillNotetags'][_0xa8b0b1(0x159)](this,_0x2bd6f2),VisuMZ[_0xa8b0b1(0x148)][_0xa8b0b1(0x28e)](_0x2bd6f2),VisuMZ[_0xa8b0b1(0x148)][_0xa8b0b1(0x2b3)](_0x2bd6f2);},VisuMZ['SkillsStatesCore']['ParseStateNotetags']=VisuMZ[_0x280ecb(0xb4)],VisuMZ['ParseStateNotetags']=function(_0x350a7d){const _0x4d76b2=_0x280ecb;VisuMZ[_0x4d76b2(0x148)][_0x4d76b2(0xb4)]['call'](this,_0x350a7d),VisuMZ[_0x4d76b2(0x148)][_0x4d76b2(0x36a)](_0x350a7d),VisuMZ['SkillsStatesCore'][_0x4d76b2(0x206)](_0x350a7d),VisuMZ['SkillsStatesCore']['Parse_Notetags_State_SlipEffectJS'](_0x350a7d),VisuMZ['SkillsStatesCore'][_0x4d76b2(0x1cc)](_0x350a7d);},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x28e)]=function(_0x5606c8){const _0x5f9e84=_0x280ecb,_0x4ec608=_0x5606c8[_0x5f9e84(0x202)];if(_0x4ec608['match'](/<MP COST:[ ](\d+)>/i)){if(_0x5f9e84(0x141)!==_0x5f9e84(0x2bb))_0x5606c8[_0x5f9e84(0x9a)]=Number(RegExp['$1']);else{if(this[_0x5f9e84(0x2a2)]||this['_tempBattler'])return;const _0x2db8b0=_0x2dd35f['SkillsStatesCore']['stateExpireJS'];if(_0x2db8b0[_0x29402b])_0x2db8b0[_0x3723ed][_0x5f9e84(0x159)](this,_0x1b2d5f);}}if(_0x4ec608['match'](/<TP COST:[ ](\d+)>/i)){if('jmXEi'!==_0x5f9e84(0x296)){if(!_0x383198)return _0x3ac60d['SkillsStatesCore'][_0x5f9e84(0x1df)][_0x5f9e84(0x159)](this,_0x5dbbbe);if(!this[_0x5f9e84(0x21b)](_0x135244))return![];if(!this['checkShowHideNotetags'](_0x35a024))return![];if(!this[_0x5f9e84(0x122)](_0x757db3))return![];return!![];}else _0x5606c8['tpCost']=Number(RegExp['$1']);}},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x2d1)]={},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x345)]={},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x2b3)]=function(_0x4b508d){const _0x1143c6=_0x280ecb,_0x3e32ed=_0x4b508d[_0x1143c6(0x202)];if(_0x3e32ed[_0x1143c6(0x1ca)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x550c7e=String(RegExp['$1']),_0x5ecc19=_0x1143c6(0xf2)[_0x1143c6(0x294)](_0x550c7e);VisuMZ[_0x1143c6(0x148)][_0x1143c6(0x2d1)][_0x4b508d['id']]=new Function(_0x1143c6(0x351),_0x5ecc19);}if(_0x3e32ed[_0x1143c6(0x1ca)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){if(_0x1143c6(0x236)!==_0x1143c6(0x255)){const _0xb5b970=String(RegExp['$1']),_0x52515b=_0x1143c6(0x2cd)[_0x1143c6(0x294)](_0xb5b970);VisuMZ[_0x1143c6(0x148)][_0x1143c6(0x345)][_0x4b508d['id']]=new Function('skill',_0x52515b);}else!_0xfb93d3[_0x1143c6(0x9b)](_0x5f0c3f)&&this['drawActorStateTurns'](_0x3cd69e,_0x1fe1e4,_0x26824b,_0x274026),this['drawActorStateData'](_0xe695d7,_0x3db29e,_0x242279,_0x4dc314),_0x98e20e[_0x1143c6(0x2e6)](_0x2230a8);}},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x36a)]=function(_0x45bbc7){const _0x177d68=_0x280ecb;_0x45bbc7[_0x177d68(0x168)]=[_0x177d68(0x204),_0x177d68(0x259)];const _0x1675c6=_0x45bbc7[_0x177d68(0x202)],_0x270916=_0x1675c6[_0x177d68(0x1ca)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x270916)for(const _0x696c86 of _0x270916){if(_0x177d68(0xca)!==_0x177d68(0xca)){const _0x4b4c16=this['getCurrentStateActiveUser']();return this[_0x177d68(0x356)](_0x4b4c16);}else{_0x696c86[_0x177d68(0x1ca)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x20fac5=String(RegExp['$1'])[_0x177d68(0x30d)]()[_0x177d68(0x1bd)]()[_0x177d68(0x313)](',');for(const _0x51e4ba of _0x20fac5){_0x177d68(0x24d)!==_0x177d68(0x1fb)?_0x45bbc7[_0x177d68(0x168)][_0x177d68(0x2e6)](_0x51e4ba[_0x177d68(0x1bd)]()):(_0x9c41fa[_0x177d68(0x148)][_0x177d68(0x187)]['call'](this,_0x183ce6),this['createCommandNameWindow'](_0x4a7ba5));}}}if(_0x1675c6[_0x177d68(0x1ca)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){if(_0x177d68(0x9c)!=='QAjOz'){const _0x12ea14=_0x17c765[_0x177d68(0x367)]('['+_0x264e41['$1'][_0x177d68(0x1ca)](/\d+/g)+']');for(const _0x214db6 of _0x12ea14){if(!_0x40dcde[_0x177d68(0x10a)](_0x214db6))return![];}return!![];}else{const _0x577325=RegExp['$1'][_0x177d68(0x313)](/[\r\n]+/);for(const _0x4e2d33 of _0x577325){'NAQKa'!==_0x177d68(0x24a)?_0x45bbc7[_0x177d68(0x168)][_0x177d68(0x2e6)](_0x4e2d33[_0x177d68(0x30d)]()[_0x177d68(0x1bd)]()):this[_0x177d68(0x12c)](_0x35a188,_0x5eecde['x'],_0x17c519['y'],_0x22ae46);}}}if(_0x1675c6[_0x177d68(0x1ca)](/<POSITIVE STATE>/i)){if('EoTfQ'===_0x177d68(0x12f))_0x45bbc7[_0x177d68(0x168)][_0x177d68(0x2e6)](_0x177d68(0x2c1));else{_0x38549f['SkillsStatesCore'][_0x177d68(0x11b)][_0x177d68(0x159)](this);if(this['_actor'])this['drawExtendedSkillsStatesCoreStatus']();}}_0x1675c6[_0x177d68(0x1ca)](/<NEGATIVE STATE>/i)&&_0x45bbc7[_0x177d68(0x168)]['push'](_0x177d68(0x278));},VisuMZ['SkillsStatesCore'][_0x280ecb(0x2f9)]={},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x206)]=function(_0xa9037f){const _0x354df3=_0x280ecb,_0x2e6ef2=_0xa9037f[_0x354df3(0x202)];if(_0x2e6ef2[_0x354df3(0x1ca)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x133171=String(RegExp['$1']),_0x3e3100=_0x354df3(0x233)['format'](_0x133171);VisuMZ[_0x354df3(0x148)][_0x354df3(0x2f9)][_0xa9037f['id']]=new Function('state',_0x3e3100);}},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x2ed)]={},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x267)]={},VisuMZ['SkillsStatesCore'][_0x280ecb(0x27d)]={},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x73)]={},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0xef)]={},VisuMZ['SkillsStatesCore'][_0x280ecb(0x245)]={},VisuMZ[_0x280ecb(0x148)]['Parse_Notetags_State_SlipEffectJS']=function(_0x12db85){const _0x3d7bd2=_0x280ecb,_0x5869b0=_0x12db85['note'],_0x17b275=_0x3d7bd2(0x248);if(_0x5869b0[_0x3d7bd2(0x1ca)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x3f37eb=String(RegExp['$1']),_0x448335=_0x17b275[_0x3d7bd2(0x294)](_0x3f37eb,_0x3d7bd2(0x199),-0x1,_0x3d7bd2(0x17e));VisuMZ['SkillsStatesCore'][_0x3d7bd2(0x2ed)][_0x12db85['id']]=new Function('stateId',_0x448335);}else{if(_0x5869b0['match'](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x12404e=String(RegExp['$1']),_0x537476=_0x17b275['format'](_0x12404e,_0x3d7bd2(0x112),0x1,_0x3d7bd2(0x17e));VisuMZ[_0x3d7bd2(0x148)][_0x3d7bd2(0x267)][_0x12db85['id']]=new Function(_0x3d7bd2(0x191),_0x537476);}}if(_0x5869b0[_0x3d7bd2(0x1ca)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x1153ef=String(RegExp['$1']),_0x209a99=_0x17b275['format'](_0x1153ef,_0x3d7bd2(0x199),-0x1,'slipMp');VisuMZ[_0x3d7bd2(0x148)]['stateMpSlipDamageJS'][_0x12db85['id']]=new Function(_0x3d7bd2(0x191),_0x209a99);}else{if(_0x5869b0[_0x3d7bd2(0x1ca)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x42aad9=String(RegExp['$1']),_0xdc943e=_0x17b275[_0x3d7bd2(0x294)](_0x42aad9,_0x3d7bd2(0x112),0x1,_0x3d7bd2(0x2bd));VisuMZ[_0x3d7bd2(0x148)][_0x3d7bd2(0x73)][_0x12db85['id']]=new Function(_0x3d7bd2(0x191),_0xdc943e);}}if(_0x5869b0['match'](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){if(_0x3d7bd2(0x320)===_0x3d7bd2(0x32a)){const _0x1bca90=_0x499cf2['boxWidth']-this['shopStatusWidth'](),_0x4f2955=this[_0x3d7bd2(0x105)]()-this['_statusWindow'][_0x3d7bd2(0x32c)],_0x34adf8=this[_0x3d7bd2(0x304)]()?_0x291f2a[_0x3d7bd2(0x9e)]-_0x1bca90:0x0,_0x1c73f2=this[_0x3d7bd2(0x1d4)]['y']+this[_0x3d7bd2(0x1d4)][_0x3d7bd2(0x32c)];return new _0xc04ef9(_0x34adf8,_0x1c73f2,_0x1bca90,_0x4f2955);}else{const _0x2061dd=String(RegExp['$1']),_0x183ed6=_0x17b275[_0x3d7bd2(0x294)](_0x2061dd,'damage',-0x1,_0x3d7bd2(0x195));VisuMZ[_0x3d7bd2(0x148)][_0x3d7bd2(0xef)][_0x12db85['id']]=new Function(_0x3d7bd2(0x191),_0x183ed6);}}else{if(_0x5869b0[_0x3d7bd2(0x1ca)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x3e9b41=String(RegExp['$1']),_0x24a409=_0x17b275[_0x3d7bd2(0x294)](_0x3e9b41,_0x3d7bd2(0x112),0x1,_0x3d7bd2(0x195));VisuMZ['SkillsStatesCore']['stateTpSlipHealJS'][_0x12db85['id']]=new Function('stateId',_0x24a409);}}},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x1a3)]={},VisuMZ[_0x280ecb(0x148)]['stateEraseJS']={},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x1c4)]={},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x1cc)]=function(_0x1f3c62){const _0xec7e38=_0x280ecb,_0x1b5a92=_0x1f3c62[_0xec7e38(0x202)],_0x315b19='\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20';if(_0x1b5a92['match'](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x50494b=String(RegExp['$1']),_0x30a3c2=_0x315b19[_0xec7e38(0x294)](_0x50494b);VisuMZ[_0xec7e38(0x148)][_0xec7e38(0x1a3)][_0x1f3c62['id']]=new Function(_0xec7e38(0x191),_0x30a3c2);}if(_0x1b5a92[_0xec7e38(0x1ca)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x247186=String(RegExp['$1']),_0x526de3=_0x315b19['format'](_0x247186);VisuMZ[_0xec7e38(0x148)]['stateEraseJS'][_0x1f3c62['id']]=new Function(_0xec7e38(0x191),_0x526de3);}if(_0x1b5a92[_0xec7e38(0x1ca)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x4c539b=String(RegExp['$1']),_0x44c902=_0x315b19[_0xec7e38(0x294)](_0x4c539b);VisuMZ[_0xec7e38(0x148)][_0xec7e38(0x1c4)][_0x1f3c62['id']]=new Function(_0xec7e38(0x191),_0x44c902);}},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x1de)]=function(){const _0x421de9=_0x280ecb;if(!VisuMZ[_0x421de9(0x148)]['Settings'][_0x421de9(0x280)][_0x421de9(0x16a)])return;for(const _0x34549d of $dataStates){if(_0x421de9(0x11a)===_0x421de9(0x216)){const _0x18b76e='<enemy-%1>'[_0x421de9(0x294)](_0x4a2526[_0x421de9(0x219)]()),_0x887fb0='<member-%1>'[_0x421de9(0x294)](_0x566bea[_0x421de9(0x186)]()),_0x2c4070=_0x421de9(0x222)[_0x421de9(0x294)](_0x210cce['getCurrentTroopUniqueID']());return _0x421de9(0x251)[_0x421de9(0x294)](_0x18b76e,_0x887fb0,_0x2c4070);}else{if(!_0x34549d)continue;_0x34549d[_0x421de9(0xbe)]===0x4&&_0x34549d[_0x421de9(0x34a)]===0x1&&(_0x34549d[_0x421de9(0x34a)]=0x2);}}},DataManager['getClassIdWithName']=function(_0x58bc9d){const _0x420b5f=_0x280ecb;_0x58bc9d=_0x58bc9d['toUpperCase']()[_0x420b5f(0x1bd)](),this[_0x420b5f(0x25a)]=this[_0x420b5f(0x25a)]||{};if(this[_0x420b5f(0x25a)][_0x58bc9d])return this[_0x420b5f(0x25a)][_0x58bc9d];for(const _0x2cf00b of $dataClasses){if(!_0x2cf00b)continue;let _0x14394c=_0x2cf00b['name'];_0x14394c=_0x14394c[_0x420b5f(0x19e)](/\x1I\[(\d+)\]/gi,''),_0x14394c=_0x14394c[_0x420b5f(0x19e)](/\\I\[(\d+)\]/gi,''),this[_0x420b5f(0x25a)][_0x14394c[_0x420b5f(0x30d)]()['trim']()]=_0x2cf00b['id'];}return this[_0x420b5f(0x25a)][_0x58bc9d]||0x0;},DataManager[_0x280ecb(0x354)]=function(_0x2d7e65){const _0x5cacf4=_0x280ecb;this[_0x5cacf4(0x15e)]=this[_0x5cacf4(0x15e)]||{};if(this['_stypeIDs'][_0x2d7e65['id']])return this[_0x5cacf4(0x15e)][_0x2d7e65['id']];this['_stypeIDs'][_0x2d7e65['id']]=[_0x2d7e65[_0x5cacf4(0x26a)]];if(_0x2d7e65[_0x5cacf4(0x202)][_0x5cacf4(0x1ca)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('TSKAf'!=='iDCqX'){const _0x5e8898=JSON[_0x5cacf4(0x367)]('['+RegExp['$1'][_0x5cacf4(0x1ca)](/\d+/g)+']');this[_0x5cacf4(0x15e)][_0x2d7e65['id']]=this[_0x5cacf4(0x15e)][_0x2d7e65['id']][_0x5cacf4(0x1a7)](_0x5e8898);}else this['getStateRetainType']()!==''?this[_0x5cacf4(0x7b)]():(_0x4fa829[_0x5cacf4(0x148)][_0x5cacf4(0x2f1)][_0x5cacf4(0x159)](this),this['initMembersSkillsStatesCore']());}else{if(_0x2d7e65['note'][_0x5cacf4(0x1ca)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){if('riTWh'===_0x5cacf4(0x1af)){const _0x1a2c37=RegExp['$1'][_0x5cacf4(0x313)](',');for(const _0x4fb7a2 of _0x1a2c37){if(_0x5cacf4(0x11f)!==_0x5cacf4(0x84)){const _0x44474d=DataManager[_0x5cacf4(0x317)](_0x4fb7a2);if(_0x44474d)this[_0x5cacf4(0x15e)][_0x2d7e65['id']][_0x5cacf4(0x2e6)](_0x44474d);}else return!![];}}else{_0x13e81d[_0x5cacf4(0x148)][_0x5cacf4(0x2cb)][_0x5cacf4(0x159)](this,_0x40f257);if(!this['isBuffOrDebuffAffected'](_0x59155f))this['eraseBuff'](_0x5d4d84);}}}return this['_stypeIDs'][_0x2d7e65['id']];},DataManager['getStypeIdWithName']=function(_0x38fd4b){const _0x414b3b=_0x280ecb;_0x38fd4b=_0x38fd4b[_0x414b3b(0x30d)]()[_0x414b3b(0x1bd)](),this[_0x414b3b(0x15e)]=this[_0x414b3b(0x15e)]||{};if(this[_0x414b3b(0x15e)][_0x38fd4b])return this[_0x414b3b(0x15e)][_0x38fd4b];for(let _0x13619c=0x1;_0x13619c<0x64;_0x13619c++){if(_0x414b3b(0x17c)!==_0x414b3b(0x17c))_0xd18174['SkillsStatesCore']['Game_Battler_addDebuff'][_0x414b3b(0x159)](this,_0x1d9625,_0x2c3470),this[_0x414b3b(0x113)](_0x15cb12)&&this['onAddDebuff'](_0xdb2bc6,_0x3e139e);else{if(!$dataSystem['skillTypes'][_0x13619c])continue;let _0x24c2b9=$dataSystem[_0x414b3b(0xfb)][_0x13619c][_0x414b3b(0x30d)]()[_0x414b3b(0x1bd)]();_0x24c2b9=_0x24c2b9[_0x414b3b(0x19e)](/\x1I\[(\d+)\]/gi,''),_0x24c2b9=_0x24c2b9['replace'](/\\I\[(\d+)\]/gi,''),this['_stypeIDs'][_0x24c2b9]=_0x13619c;}}return this[_0x414b3b(0x15e)][_0x38fd4b]||0x0;},DataManager[_0x280ecb(0x102)]=function(_0x297140){const _0x2a71d6=_0x280ecb;_0x297140=_0x297140[_0x2a71d6(0x30d)]()[_0x2a71d6(0x1bd)](),this[_0x2a71d6(0x2b0)]=this[_0x2a71d6(0x2b0)]||{};if(this[_0x2a71d6(0x2b0)][_0x297140])return this[_0x2a71d6(0x2b0)][_0x297140];for(const _0x196b29 of $dataSkills){if(!_0x196b29)continue;this[_0x2a71d6(0x2b0)][_0x196b29[_0x2a71d6(0x1f1)][_0x2a71d6(0x30d)]()[_0x2a71d6(0x1bd)]()]=_0x196b29['id'];}return this['_skillIDs'][_0x297140]||0x0;},DataManager['getStateIdWithName']=function(_0x4f38dd){const _0x421f32=_0x280ecb;_0x4f38dd=_0x4f38dd[_0x421f32(0x30d)]()[_0x421f32(0x1bd)](),this[_0x421f32(0x149)]=this['_stateIDs']||{};if(this[_0x421f32(0x149)][_0x4f38dd])return this[_0x421f32(0x149)][_0x4f38dd];for(const _0x24bdcb of $dataStates){if(!_0x24bdcb)continue;this[_0x421f32(0x149)][_0x24bdcb[_0x421f32(0x1f1)][_0x421f32(0x30d)]()[_0x421f32(0x1bd)]()]=_0x24bdcb['id'];}return this[_0x421f32(0x149)][_0x4f38dd]||0x0;},DataManager[_0x280ecb(0x80)]=function(_0x3e35cd){const _0x1c537c=_0x280ecb;this[_0x1c537c(0x24b)]=this['_stateMaxTurns']||{};if(this[_0x1c537c(0x24b)][_0x3e35cd])return this[_0x1c537c(0x24b)][_0x3e35cd];return $dataStates[_0x3e35cd]['note'][_0x1c537c(0x1ca)](/<MAX TURNS:[ ](\d+)>/i)?this['_stateMaxTurns'][_0x3e35cd]=Number(RegExp['$1']):this[_0x1c537c(0x24b)][_0x3e35cd]=VisuMZ['SkillsStatesCore'][_0x1c537c(0x1fe)][_0x1c537c(0x280)][_0x1c537c(0x166)],this['_stateMaxTurns'][_0x3e35cd];},ColorManager[_0x280ecb(0x293)]=function(_0x121775,_0x472bd6){const _0x1ca867=_0x280ecb;_0x472bd6=String(_0x472bd6),this[_0x1ca867(0xe6)]=this['_colorCache']||{};if(_0x472bd6[_0x1ca867(0x1ca)](/#(.*)/i))this['_colorCache'][_0x121775]=_0x1ca867(0x207)[_0x1ca867(0x294)](String(RegExp['$1']));else{if(_0x1ca867(0x79)==='tkIUg')this[_0x1ca867(0xe6)][_0x121775]=this['textColor'](Number(_0x472bd6));else{const _0x1704c8=_0x1ca867(0x316);this[_0x1ca867(0xe6)]=this[_0x1ca867(0xe6)]||{};if(this[_0x1ca867(0xe6)][_0x1704c8])return this[_0x1ca867(0xe6)][_0x1704c8];const _0x384e9c=_0x11f134[_0x1ca867(0x148)][_0x1ca867(0x1fe)][_0x1ca867(0x224)][_0x1ca867(0x1e9)];return this[_0x1ca867(0x293)](_0x1704c8,_0x384e9c);}}return this[_0x1ca867(0xe6)][_0x121775];},ColorManager['getColor']=function(_0x4fd59e){const _0x43cd9d=_0x280ecb;return _0x4fd59e=String(_0x4fd59e),_0x4fd59e[_0x43cd9d(0x1ca)](/#(.*)/i)?_0x43cd9d(0x207)[_0x43cd9d(0x294)](String(RegExp['$1'])):this[_0x43cd9d(0x291)](Number(_0x4fd59e));},ColorManager[_0x280ecb(0x36b)]=function(_0x59d8a1){const _0x396395=_0x280ecb;if(typeof _0x59d8a1===_0x396395(0x2f6))_0x59d8a1=$dataStates[_0x59d8a1];const _0x2a0fd1='_stored_state-%1-color'[_0x396395(0x294)](_0x59d8a1['id']);this[_0x396395(0xe6)]=this[_0x396395(0xe6)]||{};if(this[_0x396395(0xe6)][_0x2a0fd1])return this[_0x396395(0xe6)][_0x2a0fd1];const _0x479e33=this[_0x396395(0x200)](_0x59d8a1);return this[_0x396395(0x293)](_0x2a0fd1,_0x479e33);},ColorManager['retrieveStateColor']=function(_0x56ac8d){const _0x40cfd9=_0x280ecb,_0x5cddd9=_0x56ac8d[_0x40cfd9(0x202)];if(_0x5cddd9[_0x40cfd9(0x1ca)](/<TURN COLOR:[ ](.*)>/i)){if(_0x40cfd9(0x227)===_0x40cfd9(0x13a)){for(_0x5b198c of _0x9a45ea[_0x40cfd9(0x148)][_0x40cfd9(0x1fe)][_0x40cfd9(0x312)]){if(_0x257d0c['Name'][_0x40cfd9(0x30d)]()==='MP')return _0x2155cc[_0x40cfd9(0x2dc)]['call'](this,_0x449be9);}return _0xfeed28[_0x40cfd9(0x148)][_0x40cfd9(0x1da)][_0x40cfd9(0x159)](this,_0x4a3710);}else return String(RegExp['$1']);}else{if(_0x5cddd9[_0x40cfd9(0x1ca)](/<POSITIVE STATE>/i))return VisuMZ[_0x40cfd9(0x148)]['Settings']['States'][_0x40cfd9(0x1eb)];else return _0x5cddd9['match'](/<NEGATIVE STATE>/i)?VisuMZ[_0x40cfd9(0x148)][_0x40cfd9(0x1fe)][_0x40cfd9(0x280)]['ColorNegative']:VisuMZ['SkillsStatesCore'][_0x40cfd9(0x1fe)][_0x40cfd9(0x280)][_0x40cfd9(0x2a9)];}},ColorManager[_0x280ecb(0x20c)]=function(){const _0x1b691c=_0x280ecb,_0x1d0115=_0x1b691c(0x316);this[_0x1b691c(0xe6)]=this['_colorCache']||{};if(this[_0x1b691c(0xe6)][_0x1d0115])return this['_colorCache'][_0x1d0115];const _0x5b4c81=VisuMZ[_0x1b691c(0x148)]['Settings']['Buffs'][_0x1b691c(0x1e9)];return this[_0x1b691c(0x293)](_0x1d0115,_0x5b4c81);},ColorManager[_0x280ecb(0x31c)]=function(){const _0xe7b45c=_0x280ecb,_0x31a4f2=_0xe7b45c(0xd8);this['_colorCache']=this[_0xe7b45c(0xe6)]||{};if(this[_0xe7b45c(0xe6)][_0x31a4f2])return this['_colorCache'][_0x31a4f2];const _0x1d5b10=VisuMZ[_0xe7b45c(0x148)][_0xe7b45c(0x1fe)][_0xe7b45c(0x224)][_0xe7b45c(0x2ff)];return this[_0xe7b45c(0x293)](_0x31a4f2,_0x1d5b10);},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x310)]=BattleManager[_0x280ecb(0x109)],BattleManager['endAction']=function(){const _0xaa153b=_0x280ecb;this[_0xaa153b(0x1ee)](),VisuMZ[_0xaa153b(0x148)]['BattleManager_endAction'][_0xaa153b(0x159)](this);},BattleManager[_0x280ecb(0x1ee)]=function(){const _0x5c7ab7=_0x280ecb,_0x130ed7=VisuMZ['SkillsStatesCore'][_0x5c7ab7(0x1fe)][_0x5c7ab7(0x280)];if(!_0x130ed7)return;if(_0x130ed7['ActionEndUpdate']===![])return;if(!this[_0x5c7ab7(0xa0)])return;this[_0x5c7ab7(0xa0)][_0x5c7ab7(0x1ee)]();},Game_Battler['prototype'][_0x280ecb(0x1ee)]=function(){const _0x25df80=_0x280ecb;if(BattleManager[_0x25df80(0x125)]!==_0x25df80(0x2d3))return;if(this[_0x25df80(0x2aa)]===Graphics[_0x25df80(0x182)])return;this[_0x25df80(0x2aa)]=Graphics[_0x25df80(0x182)];for(const _0x5ab82d of this['_states']){const _0x9bc5cc=$dataStates[_0x5ab82d];if(!_0x9bc5cc)continue;if(_0x9bc5cc[_0x25df80(0x34a)]!==0x1)continue;if(this[_0x25df80(0x1f9)][_0x5ab82d]>0x0){if(_0x25df80(0x25d)!==_0x25df80(0x25d)){const _0x18f334=this[_0x25df80(0x1a9)](_0x1f92d1['id'],_0x25df80(0x17e))||0x0,_0x2fe348=-this[_0x25df80(0x99)](),_0x48d8cf=_0x42c521['max'](_0x18f334,_0x2fe348);if(_0x48d8cf!==0x0)this['gainHp'](_0x48d8cf);const _0x315bac=this[_0x25df80(0x1a9)](_0x4f47c1['id'],_0x25df80(0x2bd))||0x0;if(_0x315bac!==0x0)this[_0x25df80(0x35e)](_0x315bac);const _0x193b0b=this[_0x25df80(0x1a9)](_0x56a3d0['id'],'slipTp')||0x0;if(_0x193b0b!==0x0)this[_0x25df80(0x1c5)](_0x193b0b);}else this['_stateTurns'][_0x5ab82d]--;}}this[_0x25df80(0xac)](0x1);},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x11e)]=function(){const _0x2a60f4=_0x280ecb,_0x1492be=VisuMZ['SkillsStatesCore'][_0x2a60f4(0x1fe)]['States'];for(const _0xda361c of this[_0x2a60f4(0xc9)]){const _0x220ec3=$dataStates[_0xda361c];if(_0x1492be&&_0x1492be['ActionEndUpdate']!==![]){if(_0x220ec3&&_0x220ec3[_0x2a60f4(0x34a)]===0x1)continue;}this[_0x2a60f4(0x1f9)][_0xda361c]>0x0&&this['_stateTurns'][_0xda361c]--;}},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x143)]=Game_Action[_0x280ecb(0x298)][_0x280ecb(0xa9)],Game_Action[_0x280ecb(0x298)]['applyItemUserEffect']=function(_0x12002d){const _0x4a28ef=_0x280ecb;VisuMZ['SkillsStatesCore']['Game_Action_applyItemUserEffect'][_0x4a28ef(0x159)](this,_0x12002d),this[_0x4a28ef(0xcb)](_0x12002d);},Game_Action[_0x280ecb(0x298)][_0x280ecb(0xcb)]=function(_0xa7ae96){const _0x51caed=_0x280ecb;this['applyStateCategoryRemovalEffects'](_0xa7ae96),this[_0x51caed(0x2fd)](_0xa7ae96),this[_0x51caed(0x21e)](_0xa7ae96),this[_0x51caed(0x22e)](_0xa7ae96);},VisuMZ[_0x280ecb(0x148)]['Game_Action_testApply']=Game_Action[_0x280ecb(0x298)][_0x280ecb(0x28a)],Game_Action[_0x280ecb(0x298)][_0x280ecb(0x28a)]=function(_0x1c0d59){const _0x5c2ec0=_0x280ecb;if(this[_0x5c2ec0(0x86)](_0x1c0d59))return!![];return VisuMZ[_0x5c2ec0(0x148)][_0x5c2ec0(0x140)][_0x5c2ec0(0x159)](this,_0x1c0d59);},Game_Action['prototype'][_0x280ecb(0x86)]=function(_0x584d58){const _0x31306a=_0x280ecb,_0x53fd40=this['item']()[_0x31306a(0x202)];if(_0x53fd40[_0x31306a(0x1ca)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){const _0xcb59f0=String(RegExp['$1']);if(_0x584d58[_0x31306a(0x349)](_0xcb59f0))return!![];}if(_0x53fd40[_0x31306a(0x1ca)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){if(_0x31306a(0x134)==='ZUcKi')return this[_0x31306a(0x260)]=this[_0x31306a(0x260)]||_0x13e0f5[_0x31306a(0x182)],this['_currentTroopUniqueID'];else{const _0x5c7bad=Number(RegExp['$1']);if(_0x584d58[_0x31306a(0xb0)](_0x5c7bad))return!![];}}else{if(_0x53fd40[_0x31306a(0x1ca)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){const _0x234940=DataManager['getStateIdWithName'](RegExp['$1']);if(_0x584d58['isStateAffected'](_0x234940))return!![];}}return![];},Game_Action[_0x280ecb(0x298)][_0x280ecb(0x1ab)]=function(_0x43430b){const _0x1dacaf=_0x280ecb;if(_0x43430b[_0x1dacaf(0xab)]()['length']<=0x0)return;const _0x549b30=this['item']()[_0x1dacaf(0x202)];if(_0x549b30[_0x1dacaf(0x1ca)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i)){const _0x4ab7fb=String(RegExp['$1']);_0x43430b[_0x1dacaf(0x172)](_0x4ab7fb);}const _0x20ba79=_0x549b30[_0x1dacaf(0x1ca)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x20ba79)for(const _0x3791dd of _0x20ba79){_0x3791dd['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x2b228b=String(RegExp['$1']),_0x36f2ad=Number(RegExp['$2']);_0x43430b[_0x1dacaf(0x8a)](_0x2b228b,_0x36f2ad);}},Game_Action['prototype']['applyStateTurnManipulationEffects']=function(_0x55cfcb){const _0xf94ee2=_0x280ecb,_0x1191af=this[_0xf94ee2(0xb3)]()[_0xf94ee2(0x202)],_0x2118cc=_0x1191af[_0xf94ee2(0x1ca)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x2118cc){if('ArSJv'===_0xf94ee2(0xfe)){if(this[_0xf94ee2(0x86)](_0x523f25))return!![];return _0x3d78d9[_0xf94ee2(0x148)][_0xf94ee2(0x140)][_0xf94ee2(0x159)](this,_0x2974f8);}else for(const _0x51342c of _0x2118cc){let _0xad4f9f=0x0,_0x133d06=0x0;if(_0x51342c['match'](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0xad4f9f=Number(RegExp['$1']),_0x133d06=Number(RegExp['$2']);else _0x51342c[_0xf94ee2(0x1ca)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0xad4f9f=DataManager[_0xf94ee2(0xc5)](RegExp['$1']),_0x133d06=Number(RegExp['$2']));_0x55cfcb[_0xf94ee2(0x257)](_0xad4f9f,_0x133d06),this[_0xf94ee2(0x8f)](_0x55cfcb);}}const _0x1194f7=_0x1191af[_0xf94ee2(0x1ca)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x1194f7)for(const _0x20234e of _0x1194f7){if(_0xf94ee2(0x7e)!=='zydPd'){let _0x522dbd=0x0,_0x1e642d=0x0;if(_0x20234e[_0xf94ee2(0x1ca)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x522dbd=Number(RegExp['$1']),_0x1e642d=Number(RegExp['$2']);else{if(_0x20234e[_0xf94ee2(0x1ca)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)){if(_0xf94ee2(0xd0)===_0xf94ee2(0xd0))_0x522dbd=DataManager['getStateIdWithName'](RegExp['$1']),_0x1e642d=Number(RegExp['$2']);else{if(!_0x4e5e90[_0xf94ee2(0x10a)](_0x3f6f59))return![];}}}_0x55cfcb[_0xf94ee2(0x262)](_0x522dbd,_0x1e642d),this[_0xf94ee2(0x8f)](_0x55cfcb);}else return this['_skillTypeWindow']&&this[_0xf94ee2(0x2b9)]['active']?_0x15cf67['buttonAssistSwitch']:'';}},Game_Action[_0x280ecb(0x298)]['applyBuffTurnManipulationEffects']=function(_0x5a5814){const _0x4fa07e=_0x280ecb,_0x5bcda5=[_0x4fa07e(0x10e),'MAXMP',_0x4fa07e(0x2b5),_0x4fa07e(0x169),'MAT',_0x4fa07e(0x311),_0x4fa07e(0x343),_0x4fa07e(0x272)],_0x13cf56=this[_0x4fa07e(0xb3)]()['note'],_0x5ab0c7=_0x13cf56['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x5ab0c7)for(const _0x32659c of _0x5ab0c7){_0x32659c[_0x4fa07e(0x1ca)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x57cfb9=_0x5bcda5[_0x4fa07e(0x321)](String(RegExp['$1'])['toUpperCase']()),_0x5be7d8=Number(RegExp['$2']);_0x57cfb9>=0x0&&(_0x4fa07e(0xb2)!==_0x4fa07e(0xb2)?(_0x32f26d=![],this[_0x4fa07e(0x201)][_0x12bbd3]=_0x1539a9):(_0x5a5814[_0x4fa07e(0x364)](_0x57cfb9,_0x5be7d8),this[_0x4fa07e(0x8f)](_0x5a5814)));}const _0x2179d0=_0x13cf56['match'](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x2179d0)for(const _0x5819b2 of _0x5ab0c7){_0x5819b2[_0x4fa07e(0x1ca)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x43be79=_0x5bcda5['indexOf'](String(RegExp['$1'])['toUpperCase']()),_0x3fcc9e=Number(RegExp['$2']);if(_0x43be79>=0x0){if(_0x4fa07e(0x1bf)!==_0x4fa07e(0x176))_0x5a5814[_0x4fa07e(0x162)](_0x43be79,_0x3fcc9e),this[_0x4fa07e(0x8f)](_0x5a5814);else{if(!this[_0x4fa07e(0x327)][_0x4fa07e(0x2f2)](_0x16e9a8))return![];}}}},Game_Action[_0x280ecb(0x298)][_0x280ecb(0x22e)]=function(_0x3b8372){const _0x5b403f=_0x280ecb,_0x4b0352=['MAXHP','MAXMP',_0x5b403f(0x2b5),_0x5b403f(0x169),_0x5b403f(0x7a),_0x5b403f(0x311),_0x5b403f(0x343),_0x5b403f(0x272)],_0x5e1dec=this[_0x5b403f(0xb3)]()['note'],_0x2f9595=_0x5e1dec['match'](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x2f9595)for(const _0x5c278b of _0x2f9595){_0x5c278b[_0x5b403f(0x1ca)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x28a90e=_0x4b0352[_0x5b403f(0x321)](String(RegExp['$1'])['toUpperCase']()),_0x3d4fdf=Number(RegExp['$2']);_0x28a90e>=0x0&&(_0x5b403f(0x16d)===_0x5b403f(0x16d)?(_0x3b8372[_0x5b403f(0x344)](_0x28a90e,_0x3d4fdf),this['makeSuccess'](_0x3b8372)):this[_0x5b403f(0x362)](_0x592045,_0x2438c3,_0x4bcd02,_0x2e42f4));}const _0x3bb572=_0x5e1dec['match'](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x3bb572){if(_0x5b403f(0x307)!=='YjoLv'){if(_0x4d8a5e['length']>0x0)_0x4eb3e8+=this[_0x5b403f(0x228)]();_0x39445a+=_0x2e7408(_0x8fa4aa['$1']);}else for(const _0x53a41d of _0x2f9595){_0x53a41d[_0x5b403f(0x1ca)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x17daf2=_0x4b0352[_0x5b403f(0x321)](String(RegExp['$1'])[_0x5b403f(0x30d)]()),_0x53d7cf=Number(RegExp['$2']);if(_0x17daf2>=0x0){if(_0x5b403f(0x10b)===_0x5b403f(0x10b))_0x3b8372[_0x5b403f(0x28b)](_0x17daf2,_0x53d7cf),this[_0x5b403f(0x8f)](_0x3b8372);else return _0x112072[_0x5b403f(0x148)][_0x5b403f(0x164)][_0x5b403f(0x159)](this);}}}},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x34b)]=Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0xfa)],Game_BattlerBase[_0x280ecb(0x298)]['initMembers']=function(){const _0x1261bb=_0x280ecb;this[_0x1261bb(0x238)]={},this[_0x1261bb(0xd4)](),VisuMZ[_0x1261bb(0x148)][_0x1261bb(0x34b)]['call'](this);},Game_BattlerBase['prototype'][_0x280ecb(0xd4)]=function(){const _0x13a105=_0x280ecb;this['_stateRetainType']='',this[_0x13a105(0x220)]={},this[_0x13a105(0x306)]={},this['_stateOrigin']={};},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x180)]=function(_0x43dba7){const _0x1562ff=_0x280ecb;return this['_cache']=this[_0x1562ff(0x238)]||{},this[_0x1562ff(0x238)][_0x43dba7]!==undefined;},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0xf8)]=Game_BattlerBase['prototype'][_0x280ecb(0x10d)],Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x10d)]=function(){const _0x48ba59=_0x280ecb;this[_0x48ba59(0x238)]={},VisuMZ[_0x48ba59(0x148)][_0x48ba59(0xf8)][_0x48ba59(0x159)](this);},VisuMZ[_0x280ecb(0x148)]['Game_BattlerBase_eraseState']=Game_BattlerBase['prototype'][_0x280ecb(0x2c9)],Game_BattlerBase[_0x280ecb(0x298)]['eraseState']=function(_0x2794e1){const _0x309032=_0x280ecb;let _0x2f6a61=this[_0x309032(0xb0)](_0x2794e1);VisuMZ[_0x309032(0x148)]['Game_BattlerBase_eraseState'][_0x309032(0x159)](this,_0x2794e1);if(_0x2f6a61&&!this['isStateAffected'](_0x2794e1))this[_0x309032(0x1c2)](_0x2794e1);},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x1c2)]=function(_0x1b9748){const _0x14e714=_0x280ecb;this['clearStateData'](_0x1b9748),this['clearStateDisplay'](_0x1b9748),this[_0x14e714(0xb7)](_0x1b9748);},VisuMZ[_0x280ecb(0x148)]['Game_BattlerBase_resetStateCounts']=Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x325)],Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x325)]=function(_0x3c0d73){const _0xd6f56b=_0x280ecb,_0x2bcc78=$dataStates[_0x3c0d73],_0x18daaf=this[_0xd6f56b(0x361)](_0x3c0d73),_0x246148=this[_0xd6f56b(0x2ad)](_0x2bcc78)['toLowerCase']()[_0xd6f56b(0x1bd)]();switch(_0x246148){case _0xd6f56b(0x32d):if(_0x18daaf<=0x0)VisuMZ['SkillsStatesCore'][_0xd6f56b(0x2c3)][_0xd6f56b(0x159)](this,_0x3c0d73);break;case'reset':VisuMZ['SkillsStatesCore']['Game_BattlerBase_resetStateCounts']['call'](this,_0x3c0d73);break;case _0xd6f56b(0x107):VisuMZ[_0xd6f56b(0x148)]['Game_BattlerBase_resetStateCounts'][_0xd6f56b(0x159)](this,_0x3c0d73),this['_stateTurns'][_0x3c0d73]=Math[_0xd6f56b(0xee)](this[_0xd6f56b(0x1f9)][_0x3c0d73],_0x18daaf);break;case _0xd6f56b(0x263):VisuMZ[_0xd6f56b(0x148)][_0xd6f56b(0x2c3)]['call'](this,_0x3c0d73),this[_0xd6f56b(0x1f9)][_0x3c0d73]+=_0x18daaf;break;default:VisuMZ[_0xd6f56b(0x148)]['Game_BattlerBase_resetStateCounts'][_0xd6f56b(0x159)](this,_0x3c0d73);break;}},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x2ad)]=function(_0x2b932b){const _0x9b04c4=_0x280ecb,_0x4cf920=_0x2b932b['note'];if(_0x4cf920[_0x9b04c4(0x1ca)](/<REAPPLY RULES:[ ](.*)>/i))return String(RegExp['$1']);else{if('YkKXI'===_0x9b04c4(0xe4))return VisuMZ[_0x9b04c4(0x148)][_0x9b04c4(0x1fe)][_0x9b04c4(0x280)]['ReapplyRules'];else _0x55dcf5[_0x9b04c4(0x148)][_0x9b04c4(0x2f1)][_0x9b04c4(0x159)](this),this['initMembersSkillsStatesCore']();}},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x14c)]=Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x26d)],Game_BattlerBase['prototype'][_0x280ecb(0x26d)]=function(_0xcf579,_0x431fbe){const _0x583996=_0x280ecb,_0x5878a2=VisuMZ[_0x583996(0x148)][_0x583996(0x1fe)]['Buffs'][_0x583996(0x1e6)],_0x32776d=this[_0x583996(0x75)](_0xcf579);switch(_0x5878a2){case _0x583996(0x32d):if(_0x32776d<=0x0)this['_buffTurns'][_0xcf579]=_0x431fbe;break;case'reset':this[_0x583996(0x337)][_0xcf579]=_0x431fbe;break;case _0x583996(0x107):this[_0x583996(0x337)][_0xcf579]=Math['max'](_0x32776d,_0x431fbe);break;case _0x583996(0x263):this[_0x583996(0x337)][_0xcf579]+=_0x431fbe;break;default:VisuMZ[_0x583996(0x148)][_0x583996(0x14c)]['call'](this,_0xcf579,_0x431fbe);break;}const _0x327180=VisuMZ[_0x583996(0x148)][_0x583996(0x1fe)][_0x583996(0x224)][_0x583996(0x166)];this[_0x583996(0x337)][_0xcf579]=this[_0x583996(0x337)][_0xcf579][_0x583996(0x1db)](0x0,_0x327180);},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x36c)]=function(){const _0x264e2e=_0x280ecb;if(this['_cache'][_0x264e2e(0x13e)]!==undefined)return this[_0x264e2e(0x238)][_0x264e2e(0x13e)];this[_0x264e2e(0x238)][_0x264e2e(0x13e)]=![];const _0x167cba=this['states']();for(const _0x3ce712 of _0x167cba){if(!_0x3ce712)continue;if(_0x3ce712[_0x264e2e(0x202)][_0x264e2e(0x1ca)](/<GROUP DEFEAT>/i)){this[_0x264e2e(0x238)][_0x264e2e(0x13e)]=!![];break;}}return this[_0x264e2e(0x238)][_0x264e2e(0x13e)];},VisuMZ[_0x280ecb(0x148)]['Game_BattlerBase_clearStates']=Game_BattlerBase['prototype'][_0x280ecb(0x124)],Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x124)]=function(){const _0x5bb52d=_0x280ecb;this[_0x5bb52d(0x9d)]()!==''?_0x5bb52d(0x1e7)!==_0x5bb52d(0x246)?this[_0x5bb52d(0x7b)]():_0x1d1e8e[_0x5bb52d(0x1b6)]=_0x31a0a0(_0x382241['$1']):(VisuMZ[_0x5bb52d(0x148)][_0x5bb52d(0x2f1)][_0x5bb52d(0x159)](this),this[_0x5bb52d(0xd4)]());},Game_Actor[_0x280ecb(0x298)]['clearStates']=function(){const _0x555191=_0x280ecb;this[_0x555191(0x1e1)]=this['_stateSteps']||{},Game_Battler[_0x555191(0x298)][_0x555191(0x124)][_0x555191(0x159)](this);},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x7b)]=function(){const _0x499806=_0x280ecb,_0x32b949=this[_0x499806(0xab)]();for(const _0xe5843f of _0x32b949){if(_0xe5843f&&this[_0x499806(0x81)](_0xe5843f))this[_0x499806(0x2c9)](_0xe5843f['id']);}this['_cache']={};},Game_BattlerBase['prototype']['canClearState']=function(_0xebd142){const _0x392c26=_0x280ecb,_0x2ec3b0=this['getStateRetainType']();if(_0x2ec3b0!==''){if('QyzcI'!==_0x392c26(0x21c)){const _0x1b2cf5=_0xebd142[_0x392c26(0x202)];if(_0x2ec3b0===_0x392c26(0x2c2)&&_0x1b2cf5[_0x392c26(0x1ca)](/<NO DEATH CLEAR>/i))return![];if(_0x2ec3b0===_0x392c26(0x1c8)&&_0x1b2cf5['match'](/<NO RECOVER ALL CLEAR>/i))return![];}else return _0x4d3118[_0x392c26(0x78)]&&_0x35e407[_0x392c26(0x34c)]['includes']('['+_0x1fec28+']');}return this[_0x392c26(0xb0)](_0xebd142['id']);},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x9d)]=function(){const _0x2f1c78=_0x280ecb;return this[_0x2f1c78(0x33b)];},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x21a)]=function(_0x3a7d9c){const _0x3fe757=_0x280ecb;this[_0x3fe757(0x33b)]=_0x3a7d9c;},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x18e)]=function(){const _0x2f752a=_0x280ecb;this[_0x2f752a(0x33b)]='';},VisuMZ['SkillsStatesCore'][_0x280ecb(0x2e5)]=Game_BattlerBase['prototype'][_0x280ecb(0x1d1)],Game_BattlerBase['prototype'][_0x280ecb(0x1d1)]=function(){const _0x56fdc8=_0x280ecb;this[_0x56fdc8(0x21a)](_0x56fdc8(0x2c2)),VisuMZ[_0x56fdc8(0x148)][_0x56fdc8(0x2e5)]['call'](this),this['clearStateRetainType']();},VisuMZ['SkillsStatesCore'][_0x280ecb(0x1c3)]=Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x242)],Game_BattlerBase[_0x280ecb(0x298)]['recoverAll']=function(){const _0x356ab7=_0x280ecb;this[_0x356ab7(0x21a)]('recover\x20all'),VisuMZ['SkillsStatesCore'][_0x356ab7(0x1c3)]['call'](this),this[_0x356ab7(0x18e)]();},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x1a5)]=function(_0x33a394){const _0x142188=_0x280ecb;for(settings of VisuMZ[_0x142188(0x148)][_0x142188(0x1fe)][_0x142188(0x312)]){const _0x2d6c16=settings[_0x142188(0x2dc)][_0x142188(0x159)](this,_0x33a394);if(!settings['CanPayJS'][_0x142188(0x159)](this,_0x33a394,_0x2d6c16))return![];}return!![];},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x338)]=function(_0x2c2186){const _0x26e675=_0x280ecb;for(settings of VisuMZ['SkillsStatesCore']['Settings']['Costs']){const _0xfc5d93=settings['CalcJS'][_0x26e675(0x159)](this,_0x2c2186);settings[_0x26e675(0x1ed)]['call'](this,_0x2c2186,_0xfc5d93);}},VisuMZ['SkillsStatesCore']['Game_BattlerBase_meetsSkillConditions']=Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0xa5)],Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0xa5)]=function(_0x9959a5){const _0x132935=_0x280ecb;if(!_0x9959a5)return![];if(!VisuMZ[_0x132935(0x148)][_0x132935(0x302)][_0x132935(0x159)](this,_0x9959a5))return![];if(!this[_0x132935(0x2c5)](_0x9959a5))return![];if(!this[_0x132935(0x1e3)](_0x9959a5))return![];if(!this[_0x132935(0x1f3)](_0x9959a5))return![];return!![];},Game_BattlerBase[_0x280ecb(0x298)]['checkSkillConditionsNotetags']=function(_0x3a173e){const _0x58095f=_0x280ecb;if(!this[_0x58095f(0x95)](_0x3a173e))return![];return!![];},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x95)]=function(_0x5e3d53){const _0x14b692=_0x280ecb,_0xf3e7c1=_0x5e3d53['note'];if(_0xf3e7c1['match'](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x480ede=JSON[_0x14b692(0x367)]('['+RegExp['$1'][_0x14b692(0x1ca)](/\d+/g)+']');for(const _0x5acf11 of _0x480ede){if(_0x14b692(0x2c8)!=='yjWPN'){if(!$gameSwitches['value'](_0x5acf11))return![];}else this['setStateRetainType'](_0x14b692(0x1c8)),_0x1d6789[_0x14b692(0x148)][_0x14b692(0x1c3)][_0x14b692(0x159)](this),this['clearStateRetainType']();}return!![];}if(_0xf3e7c1[_0x14b692(0x1ca)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x337a90=JSON[_0x14b692(0x367)]('['+RegExp['$1'][_0x14b692(0x1ca)](/\d+/g)+']');for(const _0x5da3ad of _0x337a90){if(!$gameSwitches['value'](_0x5da3ad))return![];}return!![];}if(_0xf3e7c1[_0x14b692(0x1ca)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x43eeb4=JSON[_0x14b692(0x367)]('['+RegExp['$1'][_0x14b692(0x1ca)](/\d+/g)+']');for(const _0xdd4e of _0x43eeb4){if(_0x14b692(0xf4)==='DSBIg'){const _0x17c539=_0x1515d6['x']+_0x8ce4ff['floor']((_0x1e724b[_0x14b692(0x1bb)]-_0x4ccbe1)/0x2);this[_0x14b692(0x12c)](_0x500443,_0x17c539,_0x52fc28['y'],_0x383598);}else{if($gameSwitches[_0x14b692(0x10a)](_0xdd4e))return!![];}}return![];}if(_0xf3e7c1[_0x14b692(0x1ca)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x58005c=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2257a6 of _0x58005c){if('ZoKFe'===_0x14b692(0x2ec)){if(!$gameSwitches[_0x14b692(0x10a)](_0x2257a6))return!![];}else{const _0x4bdaa3=_0x4cfe21[_0x14b692(0x148)],_0xe922ea=[_0x14b692(0x2ed),_0x14b692(0x267),'stateMpSlipDamageJS','stateMpSlipHealJS',_0x14b692(0xef),_0x14b692(0x245)];for(const _0x1f9ee3 of _0xe922ea){_0x4bdaa3[_0x1f9ee3][_0x511cbd]&&_0x4bdaa3[_0x1f9ee3][_0xccd05c][_0x14b692(0x159)](this,_0x1932d6);}}}return![];}if(_0xf3e7c1['match'](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x14b692(0x213)!==_0x14b692(0x331)){const _0x4e30c1=JSON[_0x14b692(0x367)]('['+RegExp['$1'][_0x14b692(0x1ca)](/\d+/g)+']');for(const _0x3178f2 of _0x4e30c1){if(!$gameSwitches[_0x14b692(0x10a)](_0x3178f2))return!![];}return![];}else return _0x100333[_0x14b692(0x148)][_0x14b692(0x188)][_0x14b692(0x159)](this);}if(_0xf3e7c1[_0x14b692(0x1ca)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('QjnHC'==='BEQpC'){const _0x41213b=_0x2a9061(_0x2e831f['$1']),_0x1be1d1=_0x2ebb4e[_0x14b692(0x294)](_0x41213b,_0x14b692(0x199),-0x1,'slipTp');_0x4e41bf['SkillsStatesCore'][_0x14b692(0xef)][_0x42f587['id']]=new _0x277c92(_0x14b692(0x191),_0x1be1d1);}else{const _0x228e77=JSON[_0x14b692(0x367)]('['+RegExp['$1'][_0x14b692(0x1ca)](/\d+/g)+']');for(const _0x2fd0b8 of _0x228e77){if(_0x14b692(0x196)===_0x14b692(0x19c))_0x5a6fb4=_0x4cb063[_0x14b692(0xc5)](_0x2d1289['$1']),_0x385f3d=_0x2104ab(_0x375f2b['$2']);else{if($gameSwitches[_0x14b692(0x10a)](_0x2fd0b8))return![];}}return!![];}}return!![];},Game_BattlerBase[_0x280ecb(0x298)]['meetsSkillConditionsEnableJS']=function(_0x56b647){const _0x32050e=_0x280ecb,_0x3e9259=_0x56b647[_0x32050e(0x202)],_0x483c15=VisuMZ[_0x32050e(0x148)][_0x32050e(0x2d1)];return _0x483c15[_0x56b647['id']]?_0x32050e(0x70)!==_0x32050e(0x70)?_0x5bf43d(_0x4ec48f['$1']):_0x483c15[_0x56b647['id']][_0x32050e(0x159)](this,_0x56b647):!![];},Game_BattlerBase[_0x280ecb(0x298)]['meetsSkillConditionsGlobalJS']=function(_0xc32180){const _0x297247=_0x280ecb;return VisuMZ[_0x297247(0x148)][_0x297247(0x1fe)][_0x297247(0x25b)][_0x297247(0x9f)][_0x297247(0x159)](this,_0xc32180);},VisuMZ['SkillsStatesCore'][_0x280ecb(0x1da)]=Game_BattlerBase[_0x280ecb(0x298)]['skillMpCost'],Game_BattlerBase[_0x280ecb(0x298)]['skillMpCost']=function(_0x34f99f){const _0x275bb0=_0x280ecb;for(settings of VisuMZ[_0x275bb0(0x148)][_0x275bb0(0x1fe)][_0x275bb0(0x312)]){if(_0x275bb0(0x237)!==_0x275bb0(0x237)){if(_0x1ce381['isPlaytest']())_0x4995dc[_0x275bb0(0x2d4)](_0x141b28);}else{if(settings[_0x275bb0(0x131)][_0x275bb0(0x30d)]()==='MP')return settings['CalcJS'][_0x275bb0(0x159)](this,_0x34f99f);}}return VisuMZ[_0x275bb0(0x148)][_0x275bb0(0x1da)][_0x275bb0(0x159)](this,_0x34f99f);},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x28d)]=Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x20b)],Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x20b)]=function(_0x2360b8){const _0x5914b4=_0x280ecb;for(settings of VisuMZ['SkillsStatesCore']['Settings'][_0x5914b4(0x312)]){if(_0x5914b4(0x91)===_0x5914b4(0x1b0)){if(!_0x37f681[_0x5914b4(0x10a)](_0x478786))return![];}else{if(settings['Name'][_0x5914b4(0x30d)]()==='TP')return settings[_0x5914b4(0x2dc)][_0x5914b4(0x159)](this,_0x2360b8);}}return VisuMZ[_0x5914b4(0x148)][_0x5914b4(0x28d)][_0x5914b4(0x159)](this,_0x2360b8);},Game_BattlerBase[_0x280ecb(0x298)]['hasState']=function(_0x2d2782){const _0x44394a=_0x280ecb;if(typeof _0x2d2782===_0x44394a(0x2f6))_0x2d2782=$dataStates[_0x2d2782];return this['states']()[_0x44394a(0x9b)](_0x2d2782);},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x133)]=Game_BattlerBase['prototype'][_0x280ecb(0xab)],Game_BattlerBase[_0x280ecb(0x298)]['states']=function(){const _0x168e87=_0x280ecb;let _0x3943e9=VisuMZ[_0x168e87(0x148)][_0x168e87(0x133)][_0x168e87(0x159)](this);if(this[_0x168e87(0xdb)])return _0x3943e9;return this[_0x168e87(0xdb)]=!![],this[_0x168e87(0x2bc)](_0x3943e9),this[_0x168e87(0xdb)]=undefined,_0x3943e9;},Game_BattlerBase['prototype'][_0x280ecb(0x2bc)]=function(_0x57db0f){const _0x2bef39=_0x280ecb,_0x387e59=this[_0x2bef39(0x183)]();for(state of _0x387e59){if(_0x2bef39(0x33f)!==_0x2bef39(0x290)){if(!state)continue;if(!this[_0x2bef39(0x269)](state)&&_0x57db0f[_0x2bef39(0x9b)](state))continue;_0x57db0f[_0x2bef39(0x2e6)](state);}else{if(!this[_0x2bef39(0x327)][_0x2bef39(0x369)](_0x3a8e97))return!![];}}_0x387e59['length']>0x0&&_0x57db0f['sort']((_0x4108f7,_0x1c10e2)=>{const _0x32f7b7=_0x2bef39,_0x5934ee=_0x4108f7[_0x32f7b7(0x2cc)],_0x58a4b1=_0x1c10e2['priority'];if(_0x5934ee!==_0x58a4b1)return _0x58a4b1-_0x5934ee;return _0x4108f7-_0x1c10e2;});},Game_BattlerBase['prototype'][_0x280ecb(0x269)]=function(_0x55c58b){const _0x1b6b72=_0x280ecb;return _0x55c58b[_0x1b6b72(0x202)][_0x1b6b72(0x1ca)](/<PASSIVE STACKABLE>/i);},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x273)]=Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x2ea)],Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x2ea)]=function(_0x173a61){const _0x1601df=_0x280ecb;this['_checkingTraitsSetSkillsStatesCore']=!![];let _0xed5c9f=VisuMZ[_0x1601df(0x148)][_0x1601df(0x273)][_0x1601df(0x159)](this,_0x173a61);return this[_0x1601df(0xe9)]=undefined,_0xed5c9f;},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x1ce)]=function(){const _0x336bc=_0x280ecb;let _0x3a56a0=[];this[_0x336bc(0x201)]=this['_passiveStateResults']||{};for(;;){_0x3a56a0=[];let _0x423bf2=!![];for(const _0x1a28fd of this[_0x336bc(0x238)][_0x336bc(0x183)]){if(_0x336bc(0x10f)===_0x336bc(0x10f)){const _0x285b9c=$dataStates[_0x1a28fd];if(!_0x285b9c)continue;let _0x30816d=this['meetsPassiveStateConditions'](_0x285b9c);if(this[_0x336bc(0x201)][_0x1a28fd]!==_0x30816d){if('ZWwzY'!==_0x336bc(0x2c0))for(_0x3d8723 of _0x10934c[_0x336bc(0x148)]['Settings']['Costs']){const _0x576805=_0x3cbf4e[_0x336bc(0x2dc)][_0x336bc(0x159)](this,_0x2a828a);_0x308836[_0x336bc(0x1ed)]['call'](this,_0x48057e,_0x576805);}else _0x423bf2=![],this['_passiveStateResults'][_0x1a28fd]=_0x30816d;}if(!_0x30816d)continue;_0x3a56a0[_0x336bc(0x2e6)](_0x285b9c);}else this[_0x336bc(0xd5)][_0x336bc(0x24e)](_0x313d8f,_0x37ef91,_0x878b0,_0x24946d,this['contents'][_0x336bc(0x32c)],_0x35144a);}if(_0x423bf2)break;else{if('OAqhv'==='OAqhv'){if(!this[_0x336bc(0xe9)])this[_0x336bc(0x10d)]();this['createPassiveStatesCache']();}else{const _0x544c6b=this[_0x336bc(0xa4)](this[_0x336bc(0x186)]());let _0x4c867c=this[_0x336bc(0x1f7)](this[_0x336bc(0x186)]());_0x4c867c=_0x4c867c[_0x336bc(0x19e)](/\\I\[(\d+)\]/gi,''),_0x5be496[_0x336bc(0x29f)](),this[_0x336bc(0x341)](_0x4c867c,_0x544c6b),this[_0x336bc(0x358)](_0x4c867c,_0x544c6b),this[_0x336bc(0xec)](_0x4c867c,_0x544c6b);}}}return _0x3a56a0;},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x76)]=function(_0x21653c){const _0x282cfa=_0x280ecb;if(!this[_0x282cfa(0x1ff)](_0x21653c))return![];if(!this['meetsPassiveStateConditionSwitches'](_0x21653c))return![];if(!this[_0x282cfa(0x77)](_0x21653c))return![];if(!this['meetsPassiveStateGlobalConditionJS'](_0x21653c))return![];return!![];},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x1ff)]=function(_0x3c7898){return!![];},Game_Actor[_0x280ecb(0x298)][_0x280ecb(0x1ff)]=function(_0x44df05){const _0x143c32=_0x280ecb,_0x146d0a=_0x44df05[_0x143c32(0x202)];if(_0x146d0a[_0x143c32(0x1ca)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x31dc90=String(RegExp['$1'])['split'](',')['map'](_0x18bf43=>_0x18bf43[_0x143c32(0x1bd)]()),_0x20ecc9=VisuMZ[_0x143c32(0x148)][_0x143c32(0x2b8)](_0x31dc90);return _0x20ecc9[_0x143c32(0x9b)](this[_0x143c32(0x1a2)]());}if(_0x146d0a['match'](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){if(_0x143c32(0x346)==='vhbUP'){const _0x1d9d29=String(RegExp['$1'])[_0x143c32(0x313)](',')[_0x143c32(0x229)](_0x231cad=>_0x231cad['trim']()),_0x56a9da=VisuMZ[_0x143c32(0x148)][_0x143c32(0x2b8)](_0x1d9d29);let _0x4d8a44=[this[_0x143c32(0x1a2)]()];return Imported[_0x143c32(0x16c)]&&this[_0x143c32(0x14d)]&&(_0x4d8a44=this['multiclasses']()),_0x56a9da[_0x143c32(0x212)](_0x5ecb4b=>_0x4d8a44['includes'](_0x5ecb4b))['length']>0x0;}else{const _0x3b2c8e=_0x238221[_0x143c32(0x367)]('['+_0x3d61d4['$1'][_0x143c32(0x1ca)](/\d+/g)+']');for(const _0x57b763 of _0x3b2c8e){if(!_0x3294b6[_0x143c32(0x10a)](_0x57b763))return!![];}return![];}}return Game_BattlerBase[_0x143c32(0x298)][_0x143c32(0x1ff)]['call'](this,_0x44df05);},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x2b8)]=function(_0x12a071){const _0x5bbb37=_0x280ecb,_0x4d8f3a=[];for(let _0x704f1a of _0x12a071){_0x704f1a=(String(_0x704f1a)||'')['trim']();const _0x2fa74c=/^\d+$/[_0x5bbb37(0xde)](_0x704f1a);_0x2fa74c?_0x4d8f3a[_0x5bbb37(0x2e6)](Number(_0x704f1a)):_0x4d8f3a[_0x5bbb37(0x2e6)](DataManager[_0x5bbb37(0x26b)](_0x704f1a));}return _0x4d8f3a[_0x5bbb37(0x229)](_0x54cc51=>$dataClasses[Number(_0x54cc51)])[_0x5bbb37(0x31f)](null);},Game_BattlerBase['prototype']['meetsPassiveStateConditionSwitches']=function(_0x1bffc8){const _0x4bbb88=_0x280ecb,_0x1c7973=_0x1bffc8[_0x4bbb88(0x202)];if(_0x1c7973[_0x4bbb88(0x1ca)](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x4bbb88(0x13d)===_0x4bbb88(0x13d)){const _0x1fde47=JSON['parse']('['+RegExp['$1'][_0x4bbb88(0x1ca)](/\d+/g)+']');for(const _0x54a5ac of _0x1fde47){if(_0x4bbb88(0x2d7)===_0x4bbb88(0x2d7)){if(!$gameSwitches[_0x4bbb88(0x10a)](_0x54a5ac))return![];}else this[_0x4bbb88(0x113)](_0x44d75e)&&(_0x553136+=this[_0x4bbb88(0x75)](_0x11c528),this[_0x4bbb88(0x257)](_0x5dcbc5,_0x1ac322));}return!![];}else _0x186030[_0x4bbb88(0x148)][_0x4bbb88(0x143)][_0x4bbb88(0x159)](this,_0x119ce1),this[_0x4bbb88(0xcb)](_0x49e0d6);}if(_0x1c7973[_0x4bbb88(0x1ca)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x4bbb88(0x368)!==_0x4bbb88(0x1f6)){const _0x30a26d=JSON[_0x4bbb88(0x367)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x41a24f of _0x30a26d){if(!$gameSwitches[_0x4bbb88(0x10a)](_0x41a24f))return![];}return!![];}else return this['_stateRetainType'];}if(_0x1c7973[_0x4bbb88(0x1ca)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x4bbb88(0x299)===_0x4bbb88(0x299)){const _0x5a4e2c=JSON[_0x4bbb88(0x367)]('['+RegExp['$1'][_0x4bbb88(0x1ca)](/\d+/g)+']');for(const _0x5116bb of _0x5a4e2c){if(_0x4bbb88(0xa8)===_0x4bbb88(0xa8)){if($gameSwitches[_0x4bbb88(0x10a)](_0x5116bb))return!![];}else{const _0x215c1f=_0x537e3c(_0x46437d['$1']),_0x45531c=_0x4bbb88(0x2cd)[_0x4bbb88(0x294)](_0x215c1f);_0x3b566f['SkillsStatesCore']['skillVisibleJS'][_0x3a5e24['id']]=new _0x33c27c(_0x4bbb88(0x351),_0x45531c);}}return![];}else{if(this[_0x4bbb88(0x25c)](_0x292c4)){const _0x22aeca=_0x522c66[_0x4bbb88(0x148)][_0x4bbb88(0x1fe)][_0x4bbb88(0x224)]['MaxTurns'];this[_0x4bbb88(0x337)][_0x11ca7a]=_0x287dd7[_0x4bbb88(0x1db)](0x0,_0x22aeca);}}}if(_0x1c7973['match'](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5cb0eb=JSON[_0x4bbb88(0x367)]('['+RegExp['$1'][_0x4bbb88(0x1ca)](/\d+/g)+']');for(const _0x5da906 of _0x5cb0eb){if(_0x4bbb88(0x101)!==_0x4bbb88(0x71)){if(!$gameSwitches[_0x4bbb88(0x10a)](_0x5da906))return!![];}else{const _0x34aa2a=_0x31912c[_0x4bbb88(0x367)]('['+_0x5ef589['$1']['match'](/\d+/g)+']');for(const _0x5c5bce of _0x34aa2a){if(!_0x1e991d['value'](_0x5c5bce))return!![];}return![];}}return![];}if(_0x1c7973[_0x4bbb88(0x1ca)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xedd37b=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x525921 of _0xedd37b){if(!$gameSwitches['value'](_0x525921))return!![];}return![];}if(_0x1c7973[_0x4bbb88(0x1ca)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x227a99=JSON[_0x4bbb88(0x367)]('['+RegExp['$1'][_0x4bbb88(0x1ca)](/\d+/g)+']');for(const _0x425479 of _0x227a99){if(_0x4bbb88(0x314)!=='yZcBa'){if(!_0xd852e9)return;_0x52351d[_0x4bbb88(0x148)][_0x4bbb88(0x27a)][_0x4bbb88(0x159)](this,_0x944c1a,_0x4b5518,_0x4dca99,_0x1e866d),this['drawActorIconsAllTurnCounters'](_0x5a9cdd,_0x59bdb3,_0x458f88,_0x45f2a7);}else{if($gameSwitches['value'](_0x425479))return![];}}return!![];}return!![];},Game_BattlerBase['prototype']['meetsPassiveStateConditionJS']=function(_0x14a630){const _0x272fee=_0x280ecb,_0x156df8=VisuMZ[_0x272fee(0x148)][_0x272fee(0x2f9)];if(_0x156df8[_0x14a630['id']]&&!_0x156df8[_0x14a630['id']][_0x272fee(0x159)](this,_0x14a630))return![];return!![];},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x279)]=function(_0x5f29bb){const _0x2d56e4=_0x280ecb;return VisuMZ[_0x2d56e4(0x148)]['Settings']['PassiveStates']['PassiveConditionJS']['call'](this,_0x5f29bb);},Game_BattlerBase['prototype'][_0x280ecb(0x183)]=function(){const _0x4a6f84=_0x280ecb;if(this[_0x4a6f84(0x180)](_0x4a6f84(0x183)))return this['convertPassiveStates']();if(this['_checkingVisuMzPassiveStateObjects'])return[];return this[_0x4a6f84(0x161)]=!![],this['createPassiveStatesCache'](),this['_checkingVisuMzPassiveStateObjects']=undefined,this[_0x4a6f84(0x1ce)]();},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0xbd)]=function(){const _0x4ccf2e=_0x280ecb;this[_0x4ccf2e(0x161)]=!![],this[_0x4ccf2e(0x238)][_0x4ccf2e(0x183)]=[],this['addPassiveStatesFromOtherPlugins'](),this['addPassiveStatesByNotetag'](),this['addPassiveStatesByPluginParameters'](),this[_0x4ccf2e(0x161)]=undefined;},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x2f7)]=function(){const _0x48f061=_0x280ecb;if(Imported['VisuMZ_1_ElementStatusCore'])this[_0x48f061(0x1a8)]();},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x289)]=function(){return[];},Game_BattlerBase[_0x280ecb(0x298)]['addPassiveStatesByNotetag']=function(){const _0x300400=_0x280ecb,_0x524d8f=this['passiveStateObjects']();for(const _0x4e6cfd of _0x524d8f){if(_0x300400(0x96)===_0x300400(0x123)){if(typeof _0x2b358a!=='number')_0x15bd59=_0x2745f7['id'];const _0x3ed557=this[_0x300400(0xed)](_0x29a386);_0x3ed557[_0x5e9cd7]=_0x5c1452;}else{if(!_0x4e6cfd)continue;const _0x1459e8=_0x4e6cfd[_0x300400(0x202)][_0x300400(0x1ca)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x1459e8)for(const _0x202d26 of _0x1459e8){if('BZnog'!=='KAOKt'){_0x202d26[_0x300400(0x1ca)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x116b3e=RegExp['$1'];if(_0x116b3e[_0x300400(0x1ca)](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x54d34b=JSON[_0x300400(0x367)]('['+RegExp['$1'][_0x300400(0x1ca)](/\d+/g)+']');this[_0x300400(0x238)][_0x300400(0x183)]=this[_0x300400(0x238)][_0x300400(0x183)][_0x300400(0x1a7)](_0x54d34b);}else{if(_0x300400(0x2f5)===_0x300400(0x2f5)){const _0x479872=_0x116b3e[_0x300400(0x313)](',');for(const _0x1206c6 of _0x479872){const _0x5be44d=DataManager[_0x300400(0xc5)](_0x1206c6);if(_0x5be44d)this[_0x300400(0x238)][_0x300400(0x183)][_0x300400(0x2e6)](_0x5be44d);}}else this[_0x300400(0x1d5)](_0x265606,_0x237f2a);}}else{if(!_0x3f64c6[_0x300400(0x36c)]())return![];}}}}},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x14f)]=function(){const _0x39db6b=_0x280ecb,_0x4d745f=VisuMZ[_0x39db6b(0x148)][_0x39db6b(0x1fe)]['PassiveStates'][_0x39db6b(0x128)];this[_0x39db6b(0x238)][_0x39db6b(0x183)]=this['_cache']['passiveStates'][_0x39db6b(0x1a7)](_0x4d745f);},Game_BattlerBase['prototype'][_0x280ecb(0x361)]=function(_0x1eb346){const _0x1ae896=_0x280ecb;if(typeof _0x1eb346!=='number')_0x1eb346=_0x1eb346['id'];return this[_0x1ae896(0x1f9)][_0x1eb346]||0x0;},Game_BattlerBase[_0x280ecb(0x298)]['setStateTurns']=function(_0x542e25,_0x4481d7){const _0x448d28=_0x280ecb;if(typeof _0x542e25!==_0x448d28(0x2f6))_0x542e25=_0x542e25['id'];if(this['isStateAffected'](_0x542e25)){if(_0x448d28(0x2fb)===_0x448d28(0x2a0)){const _0x2ce1c7=_0x4d9b1c(_0x54e7fd['$1']),_0x3a2f89=_0x4c25ec[_0x448d28(0x294)](_0x2ce1c7);_0x1c4071[_0x448d28(0x148)]['stateExpireJS'][_0x27244f['id']]=new _0x3a9398(_0x448d28(0x191),_0x3a2f89);}else{const _0x1a5c3a=DataManager[_0x448d28(0x80)](_0x542e25);this[_0x448d28(0x1f9)][_0x542e25]=_0x4481d7[_0x448d28(0x1db)](0x0,_0x1a5c3a);if(this[_0x448d28(0x1f9)][_0x542e25]<=0x0)this[_0x448d28(0x30e)](_0x542e25);}}},Game_BattlerBase['prototype'][_0x280ecb(0x262)]=function(_0x2ea40f,_0x296665){const _0x5c60ed=_0x280ecb;if(typeof _0x2ea40f!==_0x5c60ed(0x2f6))_0x2ea40f=_0x2ea40f['id'];this['isStateAffected'](_0x2ea40f)&&(_0x296665+=this[_0x5c60ed(0x361)](_0x2ea40f),this[_0x5c60ed(0x257)](_0x2ea40f,_0x296665));},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x2af)]=Game_BattlerBase['prototype'][_0x280ecb(0x281)],Game_BattlerBase[_0x280ecb(0x298)]['eraseBuff']=function(_0x2fc1bb){const _0x1941e1=_0x280ecb,_0x58632c=this[_0x1941e1(0x1d8)][_0x2fc1bb];VisuMZ[_0x1941e1(0x148)][_0x1941e1(0x2af)][_0x1941e1(0x159)](this,_0x2fc1bb);if(_0x58632c>0x0)this['onEraseBuff'](_0x2fc1bb);if(_0x58632c<0x0)this[_0x1941e1(0x121)](_0x2fc1bb);},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x25f)]=Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0xda)],Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0xda)]=function(_0x2d413e){const _0x5794d9=_0x280ecb;VisuMZ[_0x5794d9(0x148)][_0x5794d9(0x25f)][_0x5794d9(0x159)](this,_0x2d413e);if(!this[_0x5794d9(0x19d)](_0x2d413e))this[_0x5794d9(0x281)](_0x2d413e);},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x2cb)]=Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x11d)],Game_BattlerBase['prototype'][_0x280ecb(0x11d)]=function(_0xb4803d){const _0xef9ed5=_0x280ecb;VisuMZ['SkillsStatesCore'][_0xef9ed5(0x2cb)][_0xef9ed5(0x159)](this,_0xb4803d);if(!this[_0xef9ed5(0x19d)](_0xb4803d))this[_0xef9ed5(0x281)](_0xb4803d);},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x74)]=function(_0x2ea5ec){},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x121)]=function(_0xe031c2){},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x179)]=function(_0x3e6739){const _0x32ac1f=_0x280ecb;return this['_buffs'][_0x3e6739]===VisuMZ[_0x32ac1f(0x148)]['Settings'][_0x32ac1f(0x224)][_0x32ac1f(0x1ae)];},Game_BattlerBase['prototype'][_0x280ecb(0xe2)]=function(_0xf8573){const _0x2f47f8=_0x280ecb;return this[_0x2f47f8(0x1d8)][_0xf8573]===-VisuMZ[_0x2f47f8(0x148)][_0x2f47f8(0x1fe)][_0x2f47f8(0x224)][_0x2f47f8(0x20e)];},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x2a5)]=Game_BattlerBase['prototype'][_0x280ecb(0x1dc)],Game_BattlerBase[_0x280ecb(0x298)]['buffIconIndex']=function(_0x17bfc2,_0x2c8cbe){const _0x2289b5=_0x280ecb;return _0x17bfc2=_0x17bfc2['clamp'](-0x2,0x2),VisuMZ[_0x2289b5(0x148)]['Game_BattlerBase_buffIconIndex']['call'](this,_0x17bfc2,_0x2c8cbe);},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x283)]=function(_0x14bf8a){const _0x2624c8=_0x280ecb,_0x9ab94c=this[_0x2624c8(0x1d8)][_0x14bf8a];return VisuMZ[_0x2624c8(0x148)][_0x2624c8(0x1fe)][_0x2624c8(0x224)][_0x2624c8(0xaa)][_0x2624c8(0x159)](this,_0x14bf8a,_0x9ab94c);},Game_BattlerBase['prototype'][_0x280ecb(0x75)]=function(_0x40da9a){return this['_buffTurns'][_0x40da9a]||0x0;},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x2fa)]=function(_0x2bbeeb){const _0x20496e=_0x280ecb;return this[_0x20496e(0x75)](_0x2bbeeb);},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x364)]=function(_0x111e01,_0x229516){const _0x29afe7=_0x280ecb;if(this[_0x29afe7(0x25c)](_0x111e01)){if(_0x29afe7(0xf0)==='XMHEu'){const _0x20cbaa=VisuMZ[_0x29afe7(0x148)]['Settings'][_0x29afe7(0x224)][_0x29afe7(0x166)];this[_0x29afe7(0x337)][_0x111e01]=_0x229516['clamp'](0x0,_0x20cbaa);}else return this[_0x29afe7(0x1d8)][_0x8f64e8]===-_0x41289b[_0x29afe7(0x148)][_0x29afe7(0x1fe)]['Buffs'][_0x29afe7(0x20e)];}},Game_BattlerBase[_0x280ecb(0x298)]['addBuffTurns']=function(_0xb33d12,_0x3bc9ef){const _0x313374=_0x280ecb;this[_0x313374(0x25c)](_0xb33d12)&&(_0x3bc9ef+=this[_0x313374(0x75)](stateId),this[_0x313374(0x257)](_0xb33d12,_0x3bc9ef));},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x344)]=function(_0x547116,_0x77b360){const _0x53dc41=_0x280ecb;if(this['isDebuffAffected'](_0x547116)){if(_0x53dc41(0x249)!==_0x53dc41(0x20f)){const _0x387c6a=VisuMZ[_0x53dc41(0x148)][_0x53dc41(0x1fe)][_0x53dc41(0x224)][_0x53dc41(0x166)];this['_buffTurns'][_0x547116]=_0x77b360['clamp'](0x0,_0x387c6a);}else this[_0x53dc41(0xd5)][_0x53dc41(0x291)]=_0x4782a8;}},Game_BattlerBase['prototype'][_0x280ecb(0x28b)]=function(_0xf0e5e4,_0x263720){const _0x52e879=_0x280ecb;if(this[_0x52e879(0x113)](_0xf0e5e4)){if(_0x52e879(0x127)===_0x52e879(0x147)){this[_0x52e879(0x32b)](_0x2c711f);;}else _0x263720+=this[_0x52e879(0x75)](stateId),this[_0x52e879(0x257)](_0xf0e5e4,_0x263720);}},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0xed)]=function(_0x2d6b36){const _0x50b2ea=_0x280ecb;if(typeof _0x2d6b36!==_0x50b2ea(0x2f6))_0x2d6b36=_0x2d6b36['id'];return this[_0x50b2ea(0x220)]=this[_0x50b2ea(0x220)]||{},this[_0x50b2ea(0x220)][_0x2d6b36]=this[_0x50b2ea(0x220)][_0x2d6b36]||{},this[_0x50b2ea(0x220)][_0x2d6b36];},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x1a9)]=function(_0x5ba104,_0x275821){if(typeof _0x5ba104!=='number')_0x5ba104=_0x5ba104['id'];const _0x56081e=this['stateData'](_0x5ba104);return _0x56081e[_0x275821];},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x23d)]=function(_0x249420,_0x197fb6,_0x2b6e30){const _0x23abda=_0x280ecb;if(typeof _0x249420!==_0x23abda(0x2f6))_0x249420=_0x249420['id'];const _0x591d9e=this[_0x23abda(0xed)](_0x249420);_0x591d9e[_0x197fb6]=_0x2b6e30;},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x15f)]=function(_0x4fbbb5){const _0x4f16bf=_0x280ecb;if(typeof _0x4fbbb5!=='number')_0x4fbbb5=_0x4fbbb5['id'];this[_0x4f16bf(0x220)]=this[_0x4f16bf(0x220)]||{},this['_stateData'][_0x4fbbb5]={};},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x211)]=function(_0x2d5abd){const _0x5437d5=_0x280ecb;if(typeof _0x2d5abd!=='number')_0x2d5abd=_0x2d5abd['id'];return this[_0x5437d5(0x306)]=this[_0x5437d5(0x306)]||{},this[_0x5437d5(0x306)][_0x2d5abd]===undefined&&(this[_0x5437d5(0x306)][_0x2d5abd]=''),this[_0x5437d5(0x306)][_0x2d5abd];},Game_BattlerBase[_0x280ecb(0x298)]['setStateDisplay']=function(_0x26dc08,_0x4b85df){const _0x22a377=_0x280ecb;if(typeof _0x26dc08!==_0x22a377(0x2f6))_0x26dc08=_0x26dc08['id'];this['_stateDisplay']=this[_0x22a377(0x306)]||{},this[_0x22a377(0x306)][_0x26dc08]=_0x4b85df;},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x35d)]=function(_0x2ae501){const _0x56497d=_0x280ecb;if(typeof _0x2ae501!==_0x56497d(0x2f6))_0x2ae501=_0x2ae501['id'];this[_0x56497d(0x306)]=this[_0x56497d(0x306)]||{},this['_stateDisplay'][_0x2ae501]='';},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x27c)]=function(_0x5d0303){const _0x26ff85=_0x280ecb;if(typeof _0x5d0303!==_0x26ff85(0x2f6))_0x5d0303=_0x5d0303['id'];this[_0x26ff85(0x185)]=this[_0x26ff85(0x185)]||{},this[_0x26ff85(0x185)][_0x5d0303]=this[_0x26ff85(0x185)][_0x5d0303]||_0x26ff85(0x18d);const _0x17daf0=this[_0x26ff85(0x185)][_0x5d0303];return this['getStateOriginByKey'](_0x17daf0);},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0xd9)]=function(_0x382172,_0x3dfe10){const _0x218d18=_0x280ecb;this[_0x218d18(0x185)]=this['_stateOrigin']||{};const _0x4c5c26=_0x3dfe10?this['convertTargetToStateOriginKey'](_0x3dfe10):this[_0x218d18(0x1a4)]();this[_0x218d18(0x185)][_0x382172]=_0x4c5c26;},Game_BattlerBase[_0x280ecb(0x298)]['clearStateOrigin']=function(_0x3d8e8a){const _0x3b9153=_0x280ecb;this['_stateOrigin']=this[_0x3b9153(0x185)]||{},delete this[_0x3b9153(0x185)][_0x3d8e8a];},Game_BattlerBase[_0x280ecb(0x298)]['getCurrentStateOriginKey']=function(){const _0x35db5b=_0x280ecb,_0x3cedf3=this[_0x35db5b(0x323)]();return this['convertTargetToStateOriginKey'](_0x3cedf3);},Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x323)]=function(){const _0x2415c7=_0x280ecb;if($gameParty[_0x2415c7(0x1e0)]()){if(BattleManager[_0x2415c7(0xa0)])return BattleManager[_0x2415c7(0xa0)];else{if(BattleManager[_0x2415c7(0x192)]){if('fnTfY'===_0x2415c7(0x197))this['setStateOrigin'](_0x57fda5),this[_0x2415c7(0x21f)](_0x5ab8da),this[_0x2415c7(0x2b6)](_0x2d3d71),this[_0x2415c7(0x111)](_0x1c2d8d);else return BattleManager[_0x2415c7(0x192)];}}}else{if(_0x2415c7(0x2ae)!==_0x2415c7(0x1d6)){const _0x10e8ee=SceneManager[_0x2415c7(0x1bc)];if(![Scene_Map,Scene_Item][_0x2415c7(0x9b)](_0x10e8ee[_0x2415c7(0xc2)]))return $gameParty[_0x2415c7(0x241)]();}else{const _0x4ead64=this[_0x2415c7(0x284)]();this[_0x2415c7(0x114)]=new _0x32c359(_0x4ead64),this[_0x2415c7(0xdf)](this['_shopStatusWindow']),this[_0x2415c7(0x274)][_0x2415c7(0x226)](this[_0x2415c7(0x114)]);const _0xe9099b=_0x10ef56[_0x2415c7(0x148)][_0x2415c7(0x1fe)]['Skills'][_0x2415c7(0x252)];this[_0x2415c7(0x114)][_0x2415c7(0x2a1)](_0xe9099b||0x0);}}return this;},Game_BattlerBase['prototype'][_0x280ecb(0x356)]=function(_0x179c57){const _0x10ed46=_0x280ecb;if(!_0x179c57)return _0x10ed46(0x18d);if(_0x179c57[_0x10ed46(0x209)]())return _0x10ed46(0x326)[_0x10ed46(0x294)](_0x179c57[_0x10ed46(0x30f)]());else{const _0x1c6baa=_0x10ed46(0x27e)['format'](_0x179c57[_0x10ed46(0x219)]()),_0x22c0be=_0x10ed46(0x271)['format'](_0x179c57[_0x10ed46(0x186)]()),_0x1cb496=_0x10ed46(0x222)[_0x10ed46(0x294)]($gameTroop['getCurrentTroopUniqueID']());return'%1\x20%2\x20%3'['format'](_0x1c6baa,_0x22c0be,_0x1cb496);}return _0x10ed46(0x18d);},Game_BattlerBase[_0x280ecb(0x298)]['getStateOriginByKey']=function(_0x5c1826){const _0x59509c=_0x280ecb;if(_0x5c1826===_0x59509c(0x18d)){if(_0x59509c(0x2f4)===_0x59509c(0x2f4))return this;else{const _0x4d2077=_0x4319b4[_0x59509c(0x367)]('['+_0x23e2fa['$1'][_0x59509c(0x1ca)](/\d+/g)+']');for(const _0x5a5ba9 of _0x4d2077){if(this[_0x59509c(0x327)][_0x59509c(0x2f2)](_0x5a5ba9))return![];}return!![];}}else{if(_0x5c1826[_0x59509c(0x1ca)](/<actor-(\d+)>/i))return $gameActors[_0x59509c(0x1fd)](Number(RegExp['$1']));else{if($gameParty['inBattle']()&&_0x5c1826[_0x59509c(0x1ca)](/<troop-(\d+)>/i)){if(_0x59509c(0x23f)===_0x59509c(0x23f)){const _0x2c00a5=Number(RegExp['$1']);if(_0x2c00a5===$gameTroop[_0x59509c(0x29e)]()){if(_0x59509c(0x30b)===_0x59509c(0x352))_0x3954a6[_0x59509c(0x148)][_0x59509c(0x1fe)][_0x59509c(0x224)][_0x59509c(0x18f)][_0x59509c(0x159)](this,_0x267e0a);else{if(_0x5c1826[_0x59509c(0x1ca)](/<member-(\d+)>/i))return $gameTroop[_0x59509c(0x1cb)]()[Number(RegExp['$1'])];}}}else{let _0x51ac14=[this[_0x59509c(0x1fd)](),this[_0x59509c(0x1a2)]()];_0x51ac14=_0x51ac14['concat'](this[_0x59509c(0x1ac)]()[_0x59509c(0x212)](_0x153733=>_0x153733));for(const _0x5cc1aa of this['_skills']){const _0xdbca94=_0x487b17[_0x5cc1aa];if(_0xdbca94)_0x51ac14[_0x59509c(0x2e6)](_0xdbca94);}return _0x51ac14;}}if(_0x5c1826[_0x59509c(0x1ca)](/<enemy-(\d+)>/i)){if('AnExe'===_0x59509c(0x234))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);else{const _0x1857d2=_0x43c30b['parse']('['+_0x269ac7['$1'][_0x59509c(0x1ca)](/\d+/g)+']');for(const _0x47e8fe of _0x1857d2){if(!this['_actor'][_0x59509c(0x2f2)](_0x47e8fe))return!![];}return![];}}}}return this;},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0xb5)]=Game_Battler['prototype'][_0x280ecb(0x119)],Game_Battler[_0x280ecb(0x298)]['addState']=function(_0x580de2){const _0x4c8f5f=_0x280ecb,_0x3ed357=this['isStateAddable'](_0x580de2);VisuMZ['SkillsStatesCore'][_0x4c8f5f(0xb5)][_0x4c8f5f(0x159)](this,_0x580de2);if(_0x3ed357&&this[_0x4c8f5f(0x1cd)]($dataStates[_0x580de2])){this[_0x4c8f5f(0x32b)](_0x580de2);;}},VisuMZ['SkillsStatesCore'][_0x280ecb(0x150)]=Game_Battler[_0x280ecb(0x298)]['isStateAddable'],Game_Battler[_0x280ecb(0x298)][_0x280ecb(0x189)]=function(_0x1194c7){const _0x30f84b=_0x280ecb,_0x250e3b=$dataStates[_0x1194c7];if(_0x250e3b&&_0x250e3b[_0x30f84b(0x202)][_0x30f84b(0x1ca)](/<NO DEATH CLEAR>/i)){if(_0x30f84b(0x203)==='xZCwM')return!this[_0x30f84b(0x24f)](_0x1194c7)&&!this[_0x30f84b(0x223)](_0x1194c7)&&!this[_0x30f84b(0x2f3)][_0x30f84b(0x366)](_0x1194c7);else this['_costSettings']=null;}return VisuMZ['SkillsStatesCore'][_0x30f84b(0x150)][_0x30f84b(0x159)](this,_0x1194c7);},Game_Battler['prototype'][_0x280ecb(0x32b)]=function(_0x2115f8){const _0x2002bc=_0x280ecb;this[_0x2002bc(0xd9)](_0x2115f8),this[_0x2002bc(0x21f)](_0x2115f8),this[_0x2002bc(0x2b6)](_0x2115f8),this[_0x2002bc(0x111)](_0x2115f8);},Game_Battler[_0x280ecb(0x298)][_0x280ecb(0x1c2)]=function(_0x2ffdf9){const _0x9ccef5=_0x280ecb;Game_BattlerBase[_0x9ccef5(0x298)][_0x9ccef5(0x1c2)]['call'](this,_0x2ffdf9),this[_0x9ccef5(0x1e2)](_0x2ffdf9),this[_0x9ccef5(0x32e)](_0x2ffdf9);},Game_Battler[_0x280ecb(0x298)][_0x280ecb(0xac)]=function(_0x15bfa2){const _0x53c804=_0x280ecb;for(const _0x2f0854 of this[_0x53c804(0xab)]()){this[_0x53c804(0x244)](_0x2f0854['id'])&&_0x2f0854[_0x53c804(0x34a)]===_0x15bfa2&&(this[_0x53c804(0x30e)](_0x2f0854['id']),this[_0x53c804(0x1c7)](_0x2f0854['id']),this['onExpireStateGlobalJS'](_0x2f0854['id']));}},Game_Battler[_0x280ecb(0x298)][_0x280ecb(0x1c7)]=function(_0x458a35){const _0x4ef9cf=_0x280ecb;this[_0x4ef9cf(0x324)](_0x458a35);},Game_Battler[_0x280ecb(0x298)][_0x280ecb(0x2b6)]=function(_0x38be1f){const _0x4cf927=_0x280ecb;if(this[_0x4cf927(0x2a2)]||this['_tempBattler'])return;const _0x421b2f=VisuMZ[_0x4cf927(0x148)][_0x4cf927(0x1a3)];if(_0x421b2f[_0x38be1f])_0x421b2f[_0x38be1f][_0x4cf927(0x159)](this,_0x38be1f);},Game_Battler['prototype'][_0x280ecb(0x1e2)]=function(_0x457643){const _0x4c7bb6=_0x280ecb;if(this['_tempActor']||this[_0x4c7bb6(0x6c)])return;const _0xf0367e=VisuMZ['SkillsStatesCore'][_0x4c7bb6(0x26e)];if(_0xf0367e[_0x457643])_0xf0367e[_0x457643]['call'](this,_0x457643);},Game_Battler[_0x280ecb(0x298)][_0x280ecb(0x324)]=function(_0x3bb8d7){const _0x14f67a=_0x280ecb;if(this[_0x14f67a(0x2a2)]||this[_0x14f67a(0x6c)])return;const _0x74b2f7=VisuMZ[_0x14f67a(0x148)]['stateExpireJS'];if(_0x74b2f7[_0x3bb8d7])_0x74b2f7[_0x3bb8d7][_0x14f67a(0x159)](this,_0x3bb8d7);},Game_Battler['prototype'][_0x280ecb(0x111)]=function(_0x53a197){const _0x12f9ab=_0x280ecb;if(this['_tempActor']||this['_tempBattler'])return;try{VisuMZ[_0x12f9ab(0x148)]['Settings'][_0x12f9ab(0x280)][_0x12f9ab(0x332)][_0x12f9ab(0x159)](this,_0x53a197);}catch(_0x4dcbb3){if($gameTemp[_0x12f9ab(0x329)]())console[_0x12f9ab(0x2d4)](_0x4dcbb3);}},Game_Battler[_0x280ecb(0x298)]['onEraseStateGlobalJS']=function(_0x5f4370){const _0x97e291=_0x280ecb;if(this[_0x97e291(0x2a2)]||this[_0x97e291(0x6c)])return;try{VisuMZ[_0x97e291(0x148)][_0x97e291(0x1fe)][_0x97e291(0x280)][_0x97e291(0x240)]['call'](this,_0x5f4370);}catch(_0x2ddff7){if(_0x97e291(0x1c6)!==_0x97e291(0xe7)){if($gameTemp[_0x97e291(0x329)]())console[_0x97e291(0x2d4)](_0x2ddff7);}else for(const _0x49ccb9 of _0x151050){_0x49ccb9[_0x97e291(0x1ca)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x41022b=_0x1a31c9[_0x97e291(0x321)](_0x53f1db(_0x5b9c9d['$1'])[_0x97e291(0x30d)]()),_0x1ad81d=_0x38357b(_0x49d9e1['$2']);_0x41022b>=0x0&&(_0x572703[_0x97e291(0x162)](_0x41022b,_0x1ad81d),this['makeSuccess'](_0x4ead8b));}}},Game_Battler[_0x280ecb(0x298)][_0x280ecb(0x1e8)]=function(_0x25fdb5){const _0x45da41=_0x280ecb;if(this[_0x45da41(0x2a2)]||this[_0x45da41(0x6c)])return;try{_0x45da41(0x230)!==_0x45da41(0x85)?VisuMZ[_0x45da41(0x148)][_0x45da41(0x1fe)][_0x45da41(0x280)][_0x45da41(0xc3)]['call'](this,_0x25fdb5):_0xe09299['SkillsStatesCore'][_0x45da41(0x1fe)]['States']['onExpireStateJS'][_0x45da41(0x159)](this,_0x3f9c5a);}catch(_0x2bc1d5){if($gameTemp['isPlaytest']())console['log'](_0x2bc1d5);}},Game_Battler[_0x280ecb(0x298)][_0x280ecb(0x151)]=function(_0x464776){const _0x1edb6f=_0x280ecb;return _0x464776=_0x464776[_0x1edb6f(0x30d)]()[_0x1edb6f(0x1bd)](),this[_0x1edb6f(0xab)]()[_0x1edb6f(0x212)](_0x2e6bb0=>_0x2e6bb0[_0x1edb6f(0x168)][_0x1edb6f(0x9b)](_0x464776));},Game_Battler['prototype'][_0x280ecb(0x8a)]=function(_0x4d883b,_0x22b0b1){const _0xc4436b=_0x280ecb;_0x4d883b=_0x4d883b[_0xc4436b(0x30d)]()[_0xc4436b(0x1bd)](),_0x22b0b1=_0x22b0b1||0x0;const _0x579868=this[_0xc4436b(0x151)](_0x4d883b),_0x5eef05=[];for(const _0x4ee730 of _0x579868){if(_0xc4436b(0x2c7)==='uRFlK'){if(_0x27eaec[_0xc4436b(0x10a)](_0x41189e))return!![];}else{if(!_0x4ee730)continue;if(_0x22b0b1<=0x0)return;_0x5eef05[_0xc4436b(0x2e6)](_0x4ee730['id']),this[_0xc4436b(0x2f3)][_0xc4436b(0x208)]=!![],_0x22b0b1--;}}while(_0x5eef05[_0xc4436b(0x305)]>0x0){this[_0xc4436b(0x30e)](_0x5eef05['shift']());}},Game_Battler[_0x280ecb(0x298)][_0x280ecb(0x172)]=function(_0x13ca19){const _0x1ad764=_0x280ecb;_0x13ca19=_0x13ca19[_0x1ad764(0x30d)]()[_0x1ad764(0x1bd)]();const _0x731c95=this[_0x1ad764(0x151)](_0x13ca19),_0x1ecf9c=[];for(const _0x2739b3 of _0x731c95){if(!_0x2739b3)continue;_0x1ecf9c[_0x1ad764(0x2e6)](_0x2739b3['id']),this[_0x1ad764(0x2f3)]['success']=!![];}while(_0x1ecf9c[_0x1ad764(0x305)]>0x0){if('YPQpo'===_0x1ad764(0x254)){const _0x2f79ca=_0x15f2c4(_0x46636a['$1'])[_0x1ad764(0x313)](/[\r\n]+/)[_0x1ad764(0x229)](_0x3dc625=>_0x20444a(_0x3dc625)['toUpperCase']()[_0x1ad764(0x1bd)]());_0x4e2e12=_0x457f05['concat'](_0x2f79ca);}else this[_0x1ad764(0x30e)](_0x1ecf9c[_0x1ad764(0x25e)]());}},Game_Battler[_0x280ecb(0x298)][_0x280ecb(0x349)]=function(_0xfa327){const _0x52144a=_0x280ecb;return this[_0x52144a(0xd2)](_0xfa327)>0x0;},Game_Battler['prototype'][_0x280ecb(0x2e7)]=function(_0x49ec05){const _0x5c231a=_0x280ecb;return this[_0x5c231a(0x268)](_0x49ec05)>0x0;},Game_Battler[_0x280ecb(0x298)][_0x280ecb(0xd2)]=function(_0x3dc6cf){const _0x3a5971=_0x280ecb,_0x5eef5e=this[_0x3a5971(0x151)](_0x3dc6cf)[_0x3a5971(0x212)](_0x2657e8=>this[_0x3a5971(0xb0)](_0x2657e8['id']));return _0x5eef5e[_0x3a5971(0x305)];},Game_Battler[_0x280ecb(0x298)][_0x280ecb(0x268)]=function(_0x1a407b){const _0x5c8155=_0x280ecb,_0x4b3083=this[_0x5c8155(0x151)](_0x1a407b);return _0x4b3083[_0x5c8155(0x305)];},VisuMZ[_0x280ecb(0x148)]['Game_BattlerBase_isStateResist']=Game_BattlerBase[_0x280ecb(0x298)][_0x280ecb(0x24f)],Game_BattlerBase[_0x280ecb(0x298)]['isStateResist']=function(_0x1e6903){const _0xd78099=_0x280ecb,_0xe9572b=$dataStates[_0x1e6903];if(_0xe9572b&&_0xe9572b['categories'][_0xd78099(0x305)]>0x0){if(_0xd78099(0x2e0)==='HmJbM')for(const _0x444a6c of _0xe9572b['categories']){if(_0xd78099(0x194)!==_0xd78099(0x194))return _0x24eb24[_0xd78099(0x148)][_0xd78099(0xea)]['call'](this);else{if(this[_0xd78099(0x288)](_0x444a6c))return!![];}}else _0x1fb903[_0xd78099(0x148)][_0xd78099(0x27f)][_0xd78099(0x159)](this),this[_0xd78099(0x322)]();}return VisuMZ[_0xd78099(0x148)][_0xd78099(0x360)][_0xd78099(0x159)](this,_0x1e6903);},Game_BattlerBase[_0x280ecb(0x298)]['isStateCategoryResisted']=function(_0x24ce5d){const _0x5aaeb2=_0x280ecb;let _0x46d2ea=_0x5aaeb2(0x18c);if(this[_0x5aaeb2(0x180)](_0x46d2ea))return this[_0x5aaeb2(0x238)][_0x46d2ea][_0x5aaeb2(0x9b)](_0x24ce5d);return this[_0x5aaeb2(0x238)][_0x46d2ea]=this[_0x5aaeb2(0x1d2)](),this[_0x5aaeb2(0x238)][_0x46d2ea][_0x5aaeb2(0x9b)](_0x24ce5d);},Game_BattlerBase['prototype'][_0x280ecb(0x1d2)]=function(){const _0xd606a5=_0x280ecb,_0x2305db=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0xb00f40=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x148d95=[];for(const _0x5224b6 of this[_0xd606a5(0x261)]()){if('aOwnA'!==_0xd606a5(0x12e)){if(!_0x5224b6)continue;const _0x5d9f7d=_0x5224b6[_0xd606a5(0x202)],_0x4a9501=_0x5d9f7d[_0xd606a5(0x1ca)](_0x2305db);if(_0x4a9501){if(_0xd606a5(0x355)===_0xd606a5(0x355))for(const _0x3ca8f7 of _0x4a9501){if('qechg'!==_0xd606a5(0xbb))return this[_0xd606a5(0x270)](_0x210099);else{_0x3ca8f7[_0xd606a5(0x1ca)](_0x2305db);const _0x4d00fa=String(RegExp['$1'])[_0xd606a5(0x313)](',')[_0xd606a5(0x229)](_0x5883f8=>String(_0x5883f8)[_0xd606a5(0x30d)]()[_0xd606a5(0x1bd)]());_0x148d95=_0x148d95[_0xd606a5(0x1a7)](_0x4d00fa);}}else for(const _0x35d94d of _0x499d13){_0x35d94d['match'](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x489530=_0x54274f[_0xd606a5(0x321)](_0x1a5d92(_0x41bae3['$1'])[_0xd606a5(0x30d)]()),_0x550834=_0x4ed096(_0x39a32a['$2']);_0x489530>=0x0&&(_0x11721f['addDebuffTurns'](_0x489530,_0x550834),this[_0xd606a5(0x8f)](_0x381477));}}if(_0x5d9f7d[_0xd606a5(0x1ca)](_0xb00f40)){const _0x390404=String(RegExp['$1'])[_0xd606a5(0x313)](/[\r\n]+/)['map'](_0x410848=>String(_0x410848)[_0xd606a5(0x30d)]()['trim']());_0x148d95=_0x148d95[_0xd606a5(0x1a7)](_0x390404);}}else{if(!this[_0xd606a5(0x327)])return;const _0x22be73=this[_0xd606a5(0x327)][_0xd606a5(0xfb)]();for(const _0x2a0e52 of _0x22be73){const _0x1f9067=this[_0xd606a5(0x97)](_0x2a0e52);this[_0xd606a5(0x2a8)](_0x1f9067,_0xd606a5(0x351),!![],_0x2a0e52);}}}return _0x148d95;},VisuMZ[_0x280ecb(0x148)]['Game_Battler_addBuff']=Game_Battler['prototype']['addBuff'],Game_Battler[_0x280ecb(0x298)][_0x280ecb(0x126)]=function(_0x25be89,_0x4bf9d7){const _0x290cac=_0x280ecb;VisuMZ[_0x290cac(0x148)][_0x290cac(0x1d7)][_0x290cac(0x159)](this,_0x25be89,_0x4bf9d7),this['isBuffAffected'](_0x25be89)&&this[_0x290cac(0x1d5)](_0x25be89,_0x4bf9d7);},Game_Battler[_0x280ecb(0x298)][_0x280ecb(0xf5)]=function(_0x34c349){},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x29b)]=Game_Battler[_0x280ecb(0x298)][_0x280ecb(0x12a)],Game_Battler[_0x280ecb(0x298)][_0x280ecb(0x12a)]=function(_0x40f730,_0x48d5c2){const _0x4bd1cb=_0x280ecb;VisuMZ[_0x4bd1cb(0x148)]['Game_Battler_addDebuff'][_0x4bd1cb(0x159)](this,_0x40f730,_0x48d5c2),this[_0x4bd1cb(0x113)](_0x40f730)&&this[_0x4bd1cb(0x14a)](_0x40f730,_0x48d5c2);},Game_Battler[_0x280ecb(0x298)][_0x280ecb(0x1d3)]=function(){const _0x1c06c7=_0x280ecb;for(let _0x35f2b4=0x0;_0x35f2b4<this[_0x1c06c7(0x247)]();_0x35f2b4++){if(this[_0x1c06c7(0x1a0)](_0x35f2b4)){const _0x15bb18=this[_0x1c06c7(0x1d8)][_0x35f2b4];this['removeBuff'](_0x35f2b4);if(_0x15bb18>0x0)this[_0x1c06c7(0x365)](_0x35f2b4);if(_0x15bb18<0x0)this[_0x1c06c7(0xc8)](_0x35f2b4);}}},Game_Battler[_0x280ecb(0x298)][_0x280ecb(0x1d5)]=function(_0x1cd9ea,_0x134d1e){this['onAddBuffGlobalJS'](_0x1cd9ea,_0x134d1e);},Game_Battler[_0x280ecb(0x298)][_0x280ecb(0x14a)]=function(_0x42ef91,_0x3b7c20){const _0x5e232a=_0x280ecb;this[_0x5e232a(0x17a)](_0x42ef91,_0x3b7c20);},Game_Battler['prototype']['onEraseBuff']=function(_0x2ec388){const _0x23c026=_0x280ecb;Game_BattlerBase[_0x23c026(0x298)][_0x23c026(0x74)]['call'](this,_0x2ec388),this['onEraseBuffGlobalJS'](_0x2ec388);},Game_Battler[_0x280ecb(0x298)]['onEraseDebuff']=function(_0x3d5755){const _0x45e299=_0x280ecb;Game_BattlerBase[_0x45e299(0x298)][_0x45e299(0x121)][_0x45e299(0x159)](this,_0x3d5755),this['onEraseDebuffGlobalJS'](_0x3d5755);},Game_Battler[_0x280ecb(0x298)][_0x280ecb(0x365)]=function(_0x49c8bf){const _0x177511=_0x280ecb;this[_0x177511(0xf6)](_0x49c8bf);},Game_Battler[_0x280ecb(0x298)][_0x280ecb(0xc8)]=function(_0x59c6e4){const _0x2e3b5e=_0x280ecb;this[_0x2e3b5e(0xbc)](_0x59c6e4);},Game_Battler[_0x280ecb(0x298)][_0x280ecb(0x8d)]=function(_0x25886c,_0x5159ff){const _0x2716ba=_0x280ecb;VisuMZ['SkillsStatesCore'][_0x2716ba(0x1fe)]['Buffs'][_0x2716ba(0x1cf)][_0x2716ba(0x159)](this,_0x25886c,_0x5159ff);},Game_Battler[_0x280ecb(0x298)][_0x280ecb(0x17a)]=function(_0x499e80,_0xc85df3){const _0xd6bef9=_0x280ecb;VisuMZ[_0xd6bef9(0x148)]['Settings']['Buffs'][_0xd6bef9(0x308)][_0xd6bef9(0x159)](this,_0x499e80,_0xc85df3);},Game_BattlerBase['prototype'][_0x280ecb(0x2b2)]=function(_0x16cb88){const _0x51a68f=_0x280ecb;VisuMZ[_0x51a68f(0x148)]['Settings']['Buffs'][_0x51a68f(0x2df)][_0x51a68f(0x159)](this,_0x16cb88);},Game_BattlerBase['prototype']['onEraseDebuffGlobalJS']=function(_0x9f1f08){const _0x3e808b=_0x280ecb;VisuMZ[_0x3e808b(0x148)]['Settings'][_0x3e808b(0x224)][_0x3e808b(0xdd)][_0x3e808b(0x159)](this,_0x9f1f08);},Game_Battler[_0x280ecb(0x298)][_0x280ecb(0xf6)]=function(_0x29c1ad){const _0x59b70f=_0x280ecb;VisuMZ[_0x59b70f(0x148)]['Settings']['Buffs'][_0x59b70f(0x18f)][_0x59b70f(0x159)](this,_0x29c1ad);},Game_Battler[_0x280ecb(0x298)][_0x280ecb(0xbc)]=function(_0x5c1510){const _0xf7268d=_0x280ecb;VisuMZ[_0xf7268d(0x148)][_0xf7268d(0x1fe)][_0xf7268d(0x224)][_0xf7268d(0x2cf)][_0xf7268d(0x159)](this,_0x5c1510);},Game_Battler[_0x280ecb(0x298)][_0x280ecb(0x21f)]=function(_0x7aedc5){const _0x3fc400=_0x280ecb,_0x59f8ce=VisuMZ[_0x3fc400(0x148)],_0x4f5804=['stateHpSlipDamageJS',_0x3fc400(0x267),_0x3fc400(0x27d),'stateMpSlipHealJS',_0x3fc400(0xef),'stateTpSlipHealJS'];for(const _0xcce02c of _0x4f5804){_0x59f8ce[_0xcce02c][_0x7aedc5]&&_0x59f8ce[_0xcce02c][_0x7aedc5][_0x3fc400(0x159)](this,_0x7aedc5);}},VisuMZ[_0x280ecb(0x148)]['Game_Battler_regenerateAll']=Game_Battler[_0x280ecb(0x298)]['regenerateAll'],Game_Battler[_0x280ecb(0x298)][_0x280ecb(0x287)]=function(){const _0x43e2f0=_0x280ecb;this['recalculateSlipDamageJS'](),VisuMZ[_0x43e2f0(0x148)][_0x43e2f0(0x357)][_0x43e2f0(0x159)](this),this['setPassiveStateSlipDamageJS'](),this[_0x43e2f0(0x275)]();},Game_Battler[_0x280ecb(0x298)][_0x280ecb(0x205)]=function(){for(const _0x987820 of this['passiveStates']()){if(!_0x987820)continue;this['onAddStateMakeCustomSlipValues'](_0x987820['id']);}},Game_Battler[_0x280ecb(0x298)]['recalculateSlipDamageJS']=function(){const _0x27cba6=_0x280ecb;for(const _0x4ac3bc of this[_0x27cba6(0xab)]()){if('eyuCr'===_0x27cba6(0x309)){if(!_0x4ac3bc)continue;_0x4ac3bc[_0x27cba6(0x202)][_0x27cba6(0x1ca)](/<JS SLIP REFRESH>/i)&&this[_0x27cba6(0x21f)](_0x4ac3bc['id']);}else{if(this[_0x27cba6(0x2a2)]||this[_0x27cba6(0x6c)])return;const _0xb0cb50=_0x3ef1e9[_0x27cba6(0x148)][_0x27cba6(0x1a3)];if(_0xb0cb50[_0x2e405a])_0xb0cb50[_0xe98b86]['call'](this,_0x3472da);}}},Game_Battler[_0x280ecb(0x298)]['regenerateAllSkillsStatesCore']=function(){const _0x1ede57=_0x280ecb;if(!this['isAlive']())return;const _0x39e4ad=this[_0x1ede57(0xab)]();for(const _0x4d9246 of _0x39e4ad){if(_0x1ede57(0x6f)!==_0x1ede57(0x6f)){if(this[_0x1ede57(0x327)][_0x1ede57(0x369)](_0x14a733))return!![];}else{if(!_0x4d9246)continue;this['onRegenerateCustomStateDamageOverTime'](_0x4d9246);}}},Game_Battler['prototype'][_0x280ecb(0x19b)]=function(_0x323804){const _0x51ca3c=_0x280ecb,_0x1eff29=this['getStateData'](_0x323804['id'],_0x51ca3c(0x17e))||0x0,_0x4eeab1=-this[_0x51ca3c(0x99)](),_0xfec5a0=Math[_0x51ca3c(0xee)](_0x1eff29,_0x4eeab1);if(_0xfec5a0!==0x0)this['gainHp'](_0xfec5a0);const _0x5de6c1=this[_0x51ca3c(0x1a9)](_0x323804['id'],'slipMp')||0x0;if(_0x5de6c1!==0x0)this[_0x51ca3c(0x35e)](_0x5de6c1);const _0x512a03=this[_0x51ca3c(0x1a9)](_0x323804['id'],_0x51ca3c(0x195))||0x0;if(_0x512a03!==0x0)this['gainSilentTp'](_0x512a03);},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x26f)]=Game_Actor[_0x280ecb(0x298)][_0x280ecb(0xfb)],Game_Actor[_0x280ecb(0x298)][_0x280ecb(0xfb)]=function(){const _0x1fef3a=_0x280ecb,_0x5beb8d=VisuMZ[_0x1fef3a(0x148)][_0x1fef3a(0x26f)][_0x1fef3a(0x159)](this),_0x1fbefb=VisuMZ['SkillsStatesCore']['Settings'][_0x1fef3a(0x25b)];let _0x4c56ca=_0x1fbefb['HiddenSkillTypes'];return $gameParty[_0x1fef3a(0x1e0)]()&&(_0x4c56ca=_0x4c56ca[_0x1fef3a(0x1a7)](_0x1fbefb[_0x1fef3a(0x19f)])),_0x5beb8d[_0x1fef3a(0x212)](_0x25cce7=>!_0x4c56ca[_0x1fef3a(0x9b)](_0x25cce7));},Game_Actor[_0x280ecb(0x298)]['usableSkills']=function(){const _0x277a9e=_0x280ecb;return this[_0x277a9e(0x297)]()[_0x277a9e(0x212)](_0x384769=>this[_0x277a9e(0x178)](_0x384769));},Game_Actor['prototype'][_0x280ecb(0x178)]=function(_0x26633d){const _0x39cacb=_0x280ecb;if(!this[_0x39cacb(0x14e)](_0x26633d))return![];const _0xdd525f=this[_0x39cacb(0xfb)](),_0xfe4514=DataManager[_0x39cacb(0x354)](_0x26633d),_0x1d9703=_0xdd525f['filter'](_0x5929a5=>_0xfe4514[_0x39cacb(0x9b)](_0x5929a5));return _0x1d9703['length']>0x0;},Game_Actor[_0x280ecb(0x298)]['passiveStateObjects']=function(){const _0x3573ce=_0x280ecb;let _0x42f275=[this[_0x3573ce(0x1fd)](),this[_0x3573ce(0x1a2)]()];_0x42f275=_0x42f275[_0x3573ce(0x1a7)](this[_0x3573ce(0x1ac)]()['filter'](_0x5e89ba=>_0x5e89ba));for(const _0x578602 of this[_0x3573ce(0x363)]){if(_0x3573ce(0x2f0)!==_0x3573ce(0xc1)){const _0x19e678=$dataSkills[_0x578602];if(_0x19e678)_0x42f275[_0x3573ce(0x2e6)](_0x19e678);}else return!![];}return _0x42f275;},Game_Actor[_0x280ecb(0x298)][_0x280ecb(0x14f)]=function(){const _0x133ed1=_0x280ecb;Game_Battler['prototype'][_0x133ed1(0x14f)]['call'](this);const _0x3095cb=VisuMZ[_0x133ed1(0x148)][_0x133ed1(0x1fe)][_0x133ed1(0x157)][_0x133ed1(0x258)];this['_cache'][_0x133ed1(0x183)]=this['_cache'][_0x133ed1(0x183)][_0x133ed1(0x1a7)](_0x3095cb);},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x2e3)]=Game_Actor[_0x280ecb(0x298)][_0x280ecb(0xfd)],Game_Actor['prototype'][_0x280ecb(0xfd)]=function(_0x2a8b1e){const _0x2c4283=_0x280ecb;VisuMZ[_0x2c4283(0x148)][_0x2c4283(0x2e3)][_0x2c4283(0x159)](this,_0x2a8b1e),this[_0x2c4283(0x238)]={};},VisuMZ[_0x280ecb(0x148)]['Game_Actor_forgetSkill']=Game_Actor[_0x280ecb(0x298)]['forgetSkill'],Game_Actor[_0x280ecb(0x298)]['forgetSkill']=function(_0xcaede4){const _0x1f3424=_0x280ecb;VisuMZ[_0x1f3424(0x148)][_0x1f3424(0xba)][_0x1f3424(0x159)](this,_0xcaede4),this[_0x1f3424(0x238)]={};},Game_Enemy[_0x280ecb(0x298)][_0x280ecb(0x289)]=function(){const _0xa6cc89=_0x280ecb;let _0x217ad1=[this[_0xa6cc89(0x1ea)]()];return _0x217ad1[_0xa6cc89(0x1a7)](this['skills']());},Game_Enemy['prototype'][_0x280ecb(0x14f)]=function(){const _0x107fca=_0x280ecb;Game_Battler[_0x107fca(0x298)]['addPassiveStatesByPluginParameters']['call'](this);const _0x4f4a4d=VisuMZ[_0x107fca(0x148)][_0x107fca(0x1fe)][_0x107fca(0x157)][_0x107fca(0x2a3)];this[_0x107fca(0x238)]['passiveStates']=this['_cache'][_0x107fca(0x183)][_0x107fca(0x1a7)](_0x4f4a4d);},Game_Enemy[_0x280ecb(0x298)]['skills']=function(){const _0x11db3a=_0x280ecb,_0x2eb6fe=[];for(const _0x1aefef of this[_0x11db3a(0x1ea)]()['actions']){const _0x159597=$dataSkills[_0x1aefef[_0x11db3a(0x33a)]];if(_0x159597&&!_0x2eb6fe[_0x11db3a(0x9b)](_0x159597))_0x2eb6fe[_0x11db3a(0x2e6)](_0x159597);}return _0x2eb6fe;},Game_Enemy[_0x280ecb(0x298)][_0x280ecb(0x359)]=function(_0x385db0){const _0x76e16c=_0x280ecb;return this[_0x76e16c(0x1cd)]($dataStates[_0x385db0]);},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x1f5)]=Game_Unit[_0x280ecb(0x298)][_0x280ecb(0x30a)],Game_Unit[_0x280ecb(0x298)][_0x280ecb(0x30a)]=function(){const _0x2e88c9=_0x280ecb;if(this['isPartyAllAffectedByGroupDefeatStates']())return!![];return VisuMZ['SkillsStatesCore']['Game_Unit_isAllDead'][_0x2e88c9(0x159)](this);},Game_Unit['prototype'][_0x280ecb(0x33c)]=function(){const _0x18ca79=this['aliveMembers']();for(const _0x46482c of _0x18ca79){if(!_0x46482c['isGroupDefeatStateAffected']())return![];}return!![];},VisuMZ['SkillsStatesCore'][_0x280ecb(0x2d2)]=Game_Troop[_0x280ecb(0x298)][_0x280ecb(0x120)],Game_Troop[_0x280ecb(0x298)]['setup']=function(_0x3c24d4){const _0x1d1419=_0x280ecb;VisuMZ[_0x1d1419(0x148)][_0x1d1419(0x2d2)][_0x1d1419(0x159)](this,_0x3c24d4),this[_0x1d1419(0x301)]();},Game_Troop[_0x280ecb(0x298)][_0x280ecb(0x301)]=function(){const _0x4931ae=_0x280ecb;this[_0x4931ae(0x260)]=Graphics[_0x4931ae(0x182)];},Game_Troop[_0x280ecb(0x298)][_0x280ecb(0x29e)]=function(){const _0x5a415e=_0x280ecb;return this[_0x5a415e(0x260)]=this[_0x5a415e(0x260)]||Graphics[_0x5a415e(0x182)],this[_0x5a415e(0x260)];},Scene_Skill[_0x280ecb(0x298)][_0x280ecb(0x2ce)]=function(){const _0x411062=_0x280ecb;if(ConfigManager[_0x411062(0x93)]&&ConfigManager['uiHelpPosition']!==undefined){if(_0x411062(0x2ef)!=='SOLGb'){if(this[_0x411062(0x1a0)](_0x14490a)){const _0x2d5097=this[_0x411062(0x1d8)][_0x599813];this['removeBuff'](_0x722981);if(_0x2d5097>0x0)this[_0x411062(0x365)](_0x927661);if(_0x2d5097<0x0)this[_0x411062(0xc8)](_0x27dd05);}}else return ConfigManager[_0x411062(0x20a)];}else{if(this[_0x411062(0xb6)]())return this[_0x411062(0x28c)]()['match'](/LOWER/i);else _0x411062(0x225)===_0x411062(0x225)?Scene_ItemBase[_0x411062(0x298)]['isRightInputMode'][_0x411062(0x159)](this):(_0x2e39a8+=this[_0x411062(0x75)](_0x29bbba),this[_0x411062(0x257)](_0x3d6a75,_0x27bc3c));}},Scene_Skill[_0x280ecb(0x298)][_0x280ecb(0x304)]=function(){const _0x42ca12=_0x280ecb;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x42ca12(0x15d)]!==undefined){if('RzbDQ'===_0x42ca12(0x330))return ConfigManager[_0x42ca12(0x15d)];else this[_0x42ca12(0x260)]=_0x342aae[_0x42ca12(0x182)];}else{if(this[_0x42ca12(0xb6)]())return this[_0x42ca12(0x28c)]()['match'](/RIGHT/i);else{if(_0x42ca12(0xc7)!==_0x42ca12(0xc7)){const _0x3bbca8=_0x1c930b[_0x42ca12(0x367)]('['+_0x16ccdb['$1'][_0x42ca12(0x1ca)](/\d+/g)+']');this[_0x42ca12(0x15e)][_0x58790c['id']]=this[_0x42ca12(0x15e)][_0x31bf4e['id']][_0x42ca12(0x1a7)](_0x3bbca8);}else return Scene_ItemBase[_0x42ca12(0x298)][_0x42ca12(0x304)][_0x42ca12(0x159)](this);}}},Scene_Skill['prototype']['updatedLayoutStyle']=function(){const _0x204d67=_0x280ecb;return VisuMZ[_0x204d67(0x148)][_0x204d67(0x1fe)]['Skills'][_0x204d67(0x22b)];},Scene_Skill[_0x280ecb(0x298)][_0x280ecb(0x117)]=function(){const _0x32faa2=_0x280ecb;return this['_categoryWindow']&&this['_categoryWindow'][_0x32faa2(0x117)]();},Scene_Skill['prototype']['isUseSkillsStatesCoreUpdatedLayout']=function(){const _0x212ecd=_0x280ecb;return VisuMZ['SkillsStatesCore'][_0x212ecd(0x1fe)][_0x212ecd(0x25b)][_0x212ecd(0x328)];},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0xae)]=Scene_Skill[_0x280ecb(0x298)]['helpWindowRect'],Scene_Skill[_0x280ecb(0x298)][_0x280ecb(0x155)]=function(){const _0x4460a0=_0x280ecb;if(this[_0x4460a0(0xb6)]()){if(_0x4460a0(0x2d0)!=='QPidP')_0x5261ab[_0x4460a0(0x9a)]=_0x2750a2(_0xa5c71e['$1']);else return this[_0x4460a0(0xc4)]();}else return VisuMZ['SkillsStatesCore']['Scene_Skill_helpWindowRect'][_0x4460a0(0x159)](this);},Scene_Skill['prototype'][_0x280ecb(0xc4)]=function(){const _0x5423da=_0x280ecb,_0x118b36=0x0,_0x4b710c=this[_0x5423da(0x347)](),_0x178997=Graphics[_0x5423da(0x9e)],_0x3760f6=this[_0x5423da(0x33d)]();return new Rectangle(_0x118b36,_0x4b710c,_0x178997,_0x3760f6);},VisuMZ[_0x280ecb(0x148)]['Scene_Skill_skillTypeWindowRect']=Scene_Skill[_0x280ecb(0x298)][_0x280ecb(0x256)],Scene_Skill[_0x280ecb(0x298)][_0x280ecb(0x256)]=function(){const _0x38f26c=_0x280ecb;return this[_0x38f26c(0xb6)]()?this[_0x38f26c(0x2fc)]():VisuMZ[_0x38f26c(0x148)][_0x38f26c(0x152)][_0x38f26c(0x159)](this);},Scene_Skill[_0x280ecb(0x298)]['skillTypeWindowRectSkillsStatesCore']=function(){const _0x74f388=_0x280ecb,_0x144e8e=this['mainCommandWidth'](),_0x2919ad=this[_0x74f388(0x1fc)](0x3,!![]),_0x5d82dc=this['isRightInputMode']()?Graphics[_0x74f388(0x9e)]-_0x144e8e:0x0,_0x2a2704=this[_0x74f388(0xce)]();return new Rectangle(_0x5d82dc,_0x2a2704,_0x144e8e,_0x2919ad);},VisuMZ['SkillsStatesCore']['Scene_Skill_statusWindowRect']=Scene_Skill[_0x280ecb(0x298)][_0x280ecb(0x282)],Scene_Skill['prototype']['statusWindowRect']=function(){const _0x19bff2=_0x280ecb;if(this['isUseSkillsStatesCoreUpdatedLayout']()){if(_0x19bff2(0x303)===_0x19bff2(0x303))return this[_0x19bff2(0x14b)]();else{this[_0x19bff2(0xe9)]=!![];let _0x3df903=_0x1cbf48[_0x19bff2(0x148)][_0x19bff2(0x273)][_0x19bff2(0x159)](this,_0x4499af);return this[_0x19bff2(0xe9)]=_0x495e42,_0x3df903;}}else return VisuMZ[_0x19bff2(0x148)]['Scene_Skill_statusWindowRect']['call'](this);},Scene_Skill[_0x280ecb(0x298)][_0x280ecb(0x14b)]=function(){const _0x4aa004=_0x280ecb,_0x57b9fa=Graphics[_0x4aa004(0x9e)]-this['mainCommandWidth'](),_0x13430a=this['_skillTypeWindow']['height'],_0x8b07f6=this['isRightInputMode']()?0x0:Graphics['boxWidth']-_0x57b9fa,_0x313fd3=this[_0x4aa004(0xce)]();return new Rectangle(_0x8b07f6,_0x313fd3,_0x57b9fa,_0x13430a);},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x235)]=Scene_Skill[_0x280ecb(0x298)]['createItemWindow'],Scene_Skill[_0x280ecb(0x298)]['createItemWindow']=function(){const _0x1f654e=_0x280ecb;VisuMZ[_0x1f654e(0x148)][_0x1f654e(0x235)][_0x1f654e(0x159)](this),this[_0x1f654e(0xe3)]()&&this[_0x1f654e(0x24c)]();},VisuMZ['SkillsStatesCore'][_0x280ecb(0x231)]=Scene_Skill[_0x280ecb(0x298)][_0x280ecb(0x1e5)],Scene_Skill[_0x280ecb(0x298)]['itemWindowRect']=function(){const _0x2b5a39=_0x280ecb;if(this['isUseSkillsStatesCoreUpdatedLayout']())return this['itemWindowRectSkillsStatesCore']();else{const _0x5e68d3=VisuMZ[_0x2b5a39(0x148)][_0x2b5a39(0x231)]['call'](this);return this['allowCreateShopStatusWindow']()&&this[_0x2b5a39(0x2ee)]()&&(_0x5e68d3[_0x2b5a39(0x1bb)]-=this['shopStatusWidth']()),_0x5e68d3;}},Scene_Skill[_0x280ecb(0x298)]['itemWindowRectSkillsStatesCore']=function(){const _0x4b383e=_0x280ecb,_0x41ddd1=Graphics[_0x4b383e(0x9e)]-this['shopStatusWidth'](),_0x23620d=this[_0x4b383e(0x105)]()-this['_statusWindow'][_0x4b383e(0x32c)],_0x81094e=this[_0x4b383e(0x304)]()?Graphics[_0x4b383e(0x9e)]-_0x41ddd1:0x0,_0x3cadab=this[_0x4b383e(0x1d4)]['y']+this[_0x4b383e(0x1d4)]['height'];return new Rectangle(_0x81094e,_0x3cadab,_0x41ddd1,_0x23620d);},Scene_Skill[_0x280ecb(0x298)][_0x280ecb(0xe3)]=function(){const _0x18dfc0=_0x280ecb;if(!Imported[_0x18dfc0(0x1ba)])return![];else return this[_0x18dfc0(0xb6)]()?!![]:VisuMZ['SkillsStatesCore']['Settings'][_0x18dfc0(0x25b)]['ShowShopStatus'];},Scene_Skill[_0x280ecb(0x298)][_0x280ecb(0x2ee)]=function(){const _0x5d9974=_0x280ecb;return VisuMZ[_0x5d9974(0x148)][_0x5d9974(0x1fe)][_0x5d9974(0x25b)][_0x5d9974(0x8e)];},Scene_Skill[_0x280ecb(0x298)][_0x280ecb(0x24c)]=function(){const _0x516e82=_0x280ecb,_0xdf06c3=this[_0x516e82(0x284)]();this[_0x516e82(0x114)]=new Window_ShopStatus(_0xdf06c3),this[_0x516e82(0xdf)](this['_shopStatusWindow']),this[_0x516e82(0x274)]['setStatusWindow'](this['_shopStatusWindow']);const _0x1f06a9=VisuMZ[_0x516e82(0x148)][_0x516e82(0x1fe)][_0x516e82(0x25b)][_0x516e82(0x252)];this[_0x516e82(0x114)]['setBackgroundType'](_0x1f06a9||0x0);},Scene_Skill[_0x280ecb(0x298)][_0x280ecb(0x284)]=function(){const _0x1a60d7=_0x280ecb;return this['isUseSkillsStatesCoreUpdatedLayout']()?this['shopStatusWindowRectSkillsStatesCore']():VisuMZ[_0x1a60d7(0x148)]['Settings']['Skills'][_0x1a60d7(0x1f4)][_0x1a60d7(0x159)](this);},Scene_Skill[_0x280ecb(0x298)][_0x280ecb(0x1ec)]=function(){const _0xda72db=_0x280ecb,_0x4e3fec=this[_0xda72db(0x106)](),_0x4d69ff=this['_itemWindow'][_0xda72db(0x32c)],_0x10b49d=this['isRightInputMode']()?0x0:Graphics['boxWidth']-this[_0xda72db(0x106)](),_0x4a536a=this[_0xda72db(0x274)]['y'];return new Rectangle(_0x10b49d,_0x4a536a,_0x4e3fec,_0x4d69ff);},Scene_Skill['prototype'][_0x280ecb(0x106)]=function(){const _0x47ffdb=_0x280ecb;return Imported[_0x47ffdb(0x1ba)]?Scene_Shop[_0x47ffdb(0x298)][_0x47ffdb(0x138)]():0x0;},Scene_Skill[_0x280ecb(0x298)][_0x280ecb(0x210)]=function(){const _0x1030c0=_0x280ecb;if(this[_0x1030c0(0x2b9)]&&this[_0x1030c0(0x2b9)][_0x1030c0(0x2c4)]){if('XNSEt'===_0x1030c0(0x72))_0x2ae124[_0x1030c0(0x148)][_0x1030c0(0x1d7)]['call'](this,_0x475f61,_0x259a47),this['isBuffAffected'](_0x2d1cee)&&this[_0x1030c0(0x1d5)](_0xa316b6,_0xcd7a83);else return TextManager[_0x1030c0(0x2b7)];}else return _0x1030c0(0x100)==='waKHL'?'':_0x3020cb[_0x1030c0(0x148)][_0x1030c0(0x1fe)]['Skills'][_0x1030c0(0x22b)];},VisuMZ[_0x280ecb(0x148)]['Sprite_Gauge_initMembers']=Sprite_Gauge[_0x280ecb(0x298)][_0x280ecb(0xfa)],Sprite_Gauge['prototype']['initMembers']=function(){const _0x147e4b=_0x280ecb;VisuMZ[_0x147e4b(0x148)]['Sprite_Gauge_initMembers'][_0x147e4b(0x159)](this),this[_0x147e4b(0x2e8)]=null;},VisuMZ[_0x280ecb(0x148)]['Sprite_Gauge_setup']=Sprite_Gauge['prototype'][_0x280ecb(0x120)],Sprite_Gauge[_0x280ecb(0x298)][_0x280ecb(0x120)]=function(_0x4e4afc,_0x3004a6){const _0x3bb79d=_0x280ecb;this['setupSkillsStatesCore'](_0x4e4afc,_0x3004a6),_0x3004a6=_0x3004a6['toLowerCase'](),VisuMZ[_0x3bb79d(0x148)][_0x3bb79d(0x18b)][_0x3bb79d(0x159)](this,_0x4e4afc,_0x3004a6);},Sprite_Gauge[_0x280ecb(0x298)]['setupSkillsStatesCore']=function(_0x5e3212,_0x10c74f){const _0x5088aa=_0x280ecb,_0x29f1ee=VisuMZ['SkillsStatesCore'][_0x5088aa(0x1fe)][_0x5088aa(0x312)][_0x5088aa(0x212)](_0x226868=>_0x226868['Name'][_0x5088aa(0x30d)]()===_0x10c74f[_0x5088aa(0x30d)]());if(_0x29f1ee['length']>=0x1){if(_0x5088aa(0x2da)===_0x5088aa(0x2b1)){if(_0x54042a[_0x5088aa(0x131)][_0x5088aa(0x30d)]()==='MP')return _0xf92ad6['CalcJS']['call'](this,_0x488bf5);}else this[_0x5088aa(0x2e8)]=_0x29f1ee[0x0];}else this[_0x5088aa(0x2e8)]=null;},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0xff)]=Sprite_Gauge[_0x280ecb(0x298)]['currentValue'],Sprite_Gauge[_0x280ecb(0x298)]['currentValue']=function(){const _0x4f0eab=_0x280ecb;if(this['_battler']&&this['_costSettings'])return this[_0x4f0eab(0x153)]();else{if(_0x4f0eab(0xd6)===_0x4f0eab(0xd6))return VisuMZ[_0x4f0eab(0x148)]['Sprite_Gauge_currentValue'][_0x4f0eab(0x159)](this);else _0x5f303c[_0x4f0eab(0x148)]['Settings'][_0x4f0eab(0x224)][_0x4f0eab(0xdd)][_0x4f0eab(0x159)](this,_0x237f7a);}},Sprite_Gauge['prototype']['currentValueSkillsStatesCore']=function(){const _0x121297=_0x280ecb;return this[_0x121297(0x2e8)][_0x121297(0x243)][_0x121297(0x159)](this[_0x121297(0x145)]);},VisuMZ['SkillsStatesCore'][_0x280ecb(0x164)]=Sprite_Gauge[_0x280ecb(0x298)][_0x280ecb(0xfc)],Sprite_Gauge[_0x280ecb(0x298)][_0x280ecb(0xfc)]=function(){const _0x497cf2=_0x280ecb;return this[_0x497cf2(0x145)]&&this[_0x497cf2(0x2e8)]?this['currentMaxValueSkillsStatesCore']():VisuMZ['SkillsStatesCore'][_0x497cf2(0x164)][_0x497cf2(0x159)](this);},Sprite_Gauge['prototype'][_0x280ecb(0x1ef)]=function(){const _0x49adb8=_0x280ecb;return this[_0x49adb8(0x2e8)][_0x49adb8(0x342)][_0x49adb8(0x159)](this[_0x49adb8(0x145)]);},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x2dd)]=Sprite_Gauge['prototype'][_0x280ecb(0x2d5)],Sprite_Gauge[_0x280ecb(0x298)][_0x280ecb(0x2d5)]=function(){const _0x340da7=_0x280ecb,_0x448522=VisuMZ[_0x340da7(0x148)][_0x340da7(0x2dd)][_0x340da7(0x159)](this);return _0x448522[_0x340da7(0x1db)](0x0,0x1);},VisuMZ[_0x280ecb(0x148)]['Sprite_Gauge_redraw']=Sprite_Gauge[_0x280ecb(0x298)][_0x280ecb(0x1b3)],Sprite_Gauge['prototype']['redraw']=function(){const _0x239896=_0x280ecb;this[_0x239896(0x145)]&&this[_0x239896(0x2e8)]?(this[_0x239896(0x2ca)][_0x239896(0x175)](),this[_0x239896(0x167)]()):VisuMZ[_0x239896(0x148)][_0x239896(0xb8)][_0x239896(0x159)](this);},Sprite_Gauge[_0x280ecb(0x298)]['currentDisplayedValue']=function(){const _0x268739=_0x280ecb;let _0x36d815=this['currentValue']();return Imported[_0x268739(0xa3)]&&this['useDigitGrouping']()&&(_0x36d815=VisuMZ['GroupDigits'](_0x36d815)),_0x36d815;},Sprite_Gauge[_0x280ecb(0x298)][_0x280ecb(0x167)]=function(){const _0x54f270=_0x280ecb;this[_0x54f270(0x2e8)]['GaugeDrawJS']['call'](this);},Sprite_Gauge[_0x280ecb(0x298)]['drawFullGauge']=function(_0x465a21,_0xb37f07,_0x29befe,_0x19b441,_0x1be696,_0x4d2f41){const _0x5ec1db=_0x280ecb,_0x47839b=this[_0x5ec1db(0x2d5)](),_0x49c7f1=Math[_0x5ec1db(0x132)]((_0x1be696-0x2)*_0x47839b),_0x3c7fa0=_0x4d2f41-0x2,_0x3b53b7=this['gaugeBackColor']();this[_0x5ec1db(0x2ca)]['fillRect'](_0x29befe,_0x19b441,_0x1be696,_0x4d2f41,_0x3b53b7),this[_0x5ec1db(0x2ca)][_0x5ec1db(0x214)](_0x29befe+0x1,_0x19b441+0x1,_0x49c7f1,_0x3c7fa0,_0x465a21,_0xb37f07);},VisuMZ['SkillsStatesCore'][_0x280ecb(0xd3)]=Sprite_StateIcon['prototype'][_0x280ecb(0x250)],Sprite_StateIcon[_0x280ecb(0x298)][_0x280ecb(0x250)]=function(){const _0x422b09=_0x280ecb;VisuMZ['SkillsStatesCore'][_0x422b09(0xd3)][_0x422b09(0x159)](this),this[_0x422b09(0x139)]();},Sprite_StateIcon[_0x280ecb(0x298)][_0x280ecb(0x139)]=function(){const _0x13b8eb=_0x280ecb,_0x3dbd72=Window_Base[_0x13b8eb(0x298)]['lineHeight']();this[_0x13b8eb(0x135)]=new Sprite(),this[_0x13b8eb(0x135)][_0x13b8eb(0x2ca)]=new Bitmap(ImageManager['iconWidth'],_0x3dbd72),this['_turnDisplaySprite'][_0x13b8eb(0x34e)]['x']=this[_0x13b8eb(0x34e)]['x'],this[_0x13b8eb(0x135)]['anchor']['y']=this[_0x13b8eb(0x34e)]['y'],this[_0x13b8eb(0x13c)](this[_0x13b8eb(0x135)]),this['contents']=this[_0x13b8eb(0x135)][_0x13b8eb(0x2ca)];},VisuMZ['SkillsStatesCore']['Sprite_StateIcon_updateFrame']=Sprite_StateIcon[_0x280ecb(0x298)][_0x280ecb(0x7d)],Sprite_StateIcon[_0x280ecb(0x298)]['updateFrame']=function(){const _0xbc71d=_0x280ecb;VisuMZ['SkillsStatesCore'][_0xbc71d(0x27f)][_0xbc71d(0x159)](this),this[_0xbc71d(0x322)]();},Sprite_StateIcon[_0x280ecb(0x298)]['drawText']=function(_0x2077c7,_0x54493b,_0x5300d3,_0x371f6b,_0xf610ce){const _0x2e9bb9=_0x280ecb;this[_0x2e9bb9(0xd5)]['drawText'](_0x2077c7,_0x54493b,_0x5300d3,_0x371f6b,this[_0x2e9bb9(0xd5)]['height'],_0xf610ce);},Sprite_StateIcon[_0x280ecb(0x298)][_0x280ecb(0x322)]=function(){const _0x592de8=_0x280ecb;this[_0x592de8(0x29f)](),this[_0x592de8(0xd5)][_0x592de8(0x175)]();const _0x1a7f87=this['_battler'];if(!_0x1a7f87)return;const _0x106756=_0x1a7f87['states']()['filter'](_0x51126c=>_0x51126c[_0x592de8(0x2a6)]>0x0),_0x3381de=[...Array(0x8)['keys']()][_0x592de8(0x212)](_0x5d32b2=>_0x1a7f87[_0x592de8(0x1b5)](_0x5d32b2)!==0x0),_0x59fa85=this[_0x592de8(0x23e)],_0x48ab81=_0x106756[_0x59fa85];if(_0x48ab81)'ZCWCy'===_0x592de8(0x286)?(_0x56c285['SkillsStatesCore'][_0x592de8(0x235)]['call'](this),this['allowCreateShopStatusWindow']()&&this[_0x592de8(0x24c)]()):(Window_Base[_0x592de8(0x298)][_0x592de8(0x362)][_0x592de8(0x159)](this,_0x1a7f87,_0x48ab81,0x0,0x0),Window_Base[_0x592de8(0x298)][_0x592de8(0x136)]['call'](this,_0x1a7f87,_0x48ab81,0x0,0x0));else{if(_0x592de8(0x2a7)!==_0x592de8(0x353)){const _0x13c041=_0x3381de[_0x59fa85-_0x106756[_0x592de8(0x305)]];if(_0x13c041===undefined)return;Window_Base[_0x592de8(0x298)][_0x592de8(0xa2)][_0x592de8(0x159)](this,_0x1a7f87,_0x13c041,0x0,0x0),Window_Base[_0x592de8(0x298)]['drawActorBuffRates']['call'](this,_0x1a7f87,_0x13c041,0x0,0x0);}else{const _0x5b00e8=_0x3a0864['parse']('['+_0x46bdd5['$1'][_0x592de8(0x1ca)](/\d+/g)+']');for(const _0x1a63a2 of _0x5b00e8){if(!_0x5f0a50[_0x592de8(0x10a)](_0x1a63a2))return![];}return!![];}}},Sprite_StateIcon[_0x280ecb(0x298)]['resetFontSettings']=function(){const _0x28c557=_0x280ecb;this[_0x28c557(0xd5)]['fontFace']=$gameSystem['mainFontFace'](),this[_0x28c557(0xd5)][_0x28c557(0x177)]=$gameSystem[_0x28c557(0x2ab)](),this[_0x28c557(0x333)]();},Sprite_StateIcon[_0x280ecb(0x298)][_0x280ecb(0x333)]=function(){const _0x46bf18=_0x280ecb;this[_0x46bf18(0x10c)](ColorManager[_0x46bf18(0xd1)]()),this[_0x46bf18(0x2e1)](ColorManager[_0x46bf18(0x12d)]());},Sprite_StateIcon['prototype'][_0x280ecb(0x10c)]=function(_0x198e48){const _0x540a11=_0x280ecb;this[_0x540a11(0xd5)][_0x540a11(0x291)]=_0x198e48;},Sprite_StateIcon[_0x280ecb(0x298)][_0x280ecb(0x2e1)]=function(_0x29184c){const _0x2d042b=_0x280ecb;this[_0x2d042b(0xd5)][_0x2d042b(0x12d)]=_0x29184c;},Sprite_StateIcon[_0x280ecb(0x298)][_0x280ecb(0x2e4)]=function(){const _0x4e34be=_0x280ecb;this['_hidden']=!![],this[_0x4e34be(0x88)]();},Window_Base[_0x280ecb(0x298)][_0x280ecb(0xcc)]=function(_0x4d223f,_0x3797c3,_0x1c988f,_0x5011cf,_0x12e5de){const _0x3becb5=_0x280ecb,_0x5c3d0a=this[_0x3becb5(0xc6)](_0x4d223f,_0x3797c3),_0x1c0a5b=this[_0x3becb5(0x2a4)](_0x5c3d0a,_0x1c988f,_0x5011cf,_0x12e5de),_0x356261=_0x1c988f+_0x12e5de-_0x1c0a5b[_0x3becb5(0x1bb)];this[_0x3becb5(0x12c)](_0x5c3d0a,_0x356261,_0x5011cf,_0x12e5de),this[_0x3becb5(0x29f)]();},Window_Base[_0x280ecb(0x298)][_0x280ecb(0xc6)]=function(_0x40694d,_0x3170ea){const _0x84c2c=_0x280ecb;let _0x1416e9='';for(settings of VisuMZ[_0x84c2c(0x148)][_0x84c2c(0x1fe)][_0x84c2c(0x312)]){if(!this[_0x84c2c(0x108)](_0x40694d,_0x3170ea,settings))continue;if(_0x1416e9[_0x84c2c(0x305)]>0x0)_0x1416e9+=this[_0x84c2c(0x228)]();_0x1416e9+=this[_0x84c2c(0x1fa)](_0x40694d,_0x3170ea,settings);}_0x1416e9=this[_0x84c2c(0xdc)](_0x40694d,_0x3170ea,_0x1416e9);if(_0x3170ea['note'][_0x84c2c(0x1ca)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x1416e9[_0x84c2c(0x305)]>0x0)_0x1416e9+=this[_0x84c2c(0x228)]();_0x1416e9+=String(RegExp['$1']);}return _0x1416e9;},Window_Base[_0x280ecb(0x298)][_0x280ecb(0xdc)]=function(_0x55886b,_0x58dc81,_0xca19c5){return _0xca19c5;},Window_Base['prototype'][_0x280ecb(0x108)]=function(_0x488bea,_0x9fa42f,_0x3cd4e3){const _0x505d14=_0x280ecb,_0x3915e9=_0x3cd4e3['CalcJS']['call'](_0x488bea,_0x9fa42f);return _0x3cd4e3[_0x505d14(0x116)][_0x505d14(0x159)](_0x488bea,_0x9fa42f,_0x3915e9,_0x3cd4e3);},Window_Base['prototype']['createSkillCostText']=function(_0x44137e,_0x1e9154,_0x49b76d){const _0x235169=_0x280ecb,_0x362f2e=_0x49b76d[_0x235169(0x2dc)][_0x235169(0x159)](_0x44137e,_0x1e9154);return _0x49b76d[_0x235169(0x253)][_0x235169(0x159)](_0x44137e,_0x1e9154,_0x362f2e,_0x49b76d);},Window_Base[_0x280ecb(0x298)]['skillCostSeparator']=function(){return'\x20';},Window_Base[_0x280ecb(0x298)][_0x280ecb(0x29d)]=function(_0x4e773e,_0x30092d,_0x1231c1,_0x329ade){const _0x40c04d=_0x280ecb;if(!_0x4e773e)return;VisuMZ[_0x40c04d(0x148)][_0x40c04d(0x27a)][_0x40c04d(0x159)](this,_0x4e773e,_0x30092d,_0x1231c1,_0x329ade),this[_0x40c04d(0x22f)](_0x4e773e,_0x30092d,_0x1231c1,_0x329ade);},Window_Base[_0x280ecb(0x298)][_0x280ecb(0x22f)]=function(_0x463bd6,_0xa32317,_0x5137ab,_0x46c1de){const _0x4f6edb=_0x280ecb;_0x46c1de=_0x46c1de||0x90;const _0x1cdc90=ImageManager[_0x4f6edb(0x104)],_0x126223=_0x463bd6[_0x4f6edb(0x264)]()['slice'](0x0,Math[_0x4f6edb(0x132)](_0x46c1de/_0x1cdc90)),_0xd41fbf=_0x463bd6[_0x4f6edb(0xab)]()['filter'](_0x4f5832=>_0x4f5832[_0x4f6edb(0x2a6)]>0x0),_0x2581ff=[...Array(0x8)[_0x4f6edb(0x146)]()]['filter'](_0x5f025c=>_0x463bd6[_0x4f6edb(0x1b5)](_0x5f025c)!==0x0),_0x365ecf=[];let _0x2c34ad=_0xa32317;for(let _0x420cd=0x0;_0x420cd<_0x126223[_0x4f6edb(0x305)];_0x420cd++){if('SYkXS'===_0x4f6edb(0x15a)){const _0x460235=this[_0x4f6edb(0x1a1)](_0x400206),_0x49027c=_0x460235[_0x4f6edb(0x1f1)];if(_0x460235)this['alterSkillName'](_0x460235);_0x213392['SkillsStatesCore']['Window_SkillList_drawItem']['call'](this,_0x5c3ffa);if(_0x460235)_0x460235[_0x4f6edb(0x1f1)]=_0x49027c;}else{this[_0x4f6edb(0x29f)]();const _0x12e51b=_0xd41fbf[_0x420cd];if(_0x12e51b){if(_0x4f6edb(0x90)!=='jlaaU')!_0x365ecf['includes'](_0x12e51b)&&this[_0x4f6edb(0x362)](_0x463bd6,_0x12e51b,_0x2c34ad,_0x5137ab),this[_0x4f6edb(0x136)](_0x463bd6,_0x12e51b,_0x2c34ad,_0x5137ab),_0x365ecf[_0x4f6edb(0x2e6)](_0x12e51b);else{const _0x38cbcd=_0x8b475e['parse']('['+_0x2b1ff4['$1'][_0x4f6edb(0x1ca)](/\d+/g)+']');for(const _0xa0b6e of _0x38cbcd){if(!this[_0x4f6edb(0x327)]['isLearnedSkill'](_0xa0b6e))return!![];}return![];}}else{const _0x6ab1ab=_0x2581ff[_0x420cd-_0xd41fbf[_0x4f6edb(0x305)]];this[_0x4f6edb(0xa2)](_0x463bd6,_0x6ab1ab,_0x2c34ad,_0x5137ab),this[_0x4f6edb(0x118)](_0x463bd6,_0x6ab1ab,_0x2c34ad,_0x5137ab);}_0x2c34ad+=_0x1cdc90;}}},Window_Base[_0x280ecb(0x298)][_0x280ecb(0x362)]=function(_0xbcd49,_0x4d3455,_0x506c02,_0x37ce1e){const _0xec3879=_0x280ecb;if(!VisuMZ[_0xec3879(0x148)]['Settings'][_0xec3879(0x280)]['ShowTurns'])return;if(!_0xbcd49[_0xec3879(0xb0)](_0x4d3455['id']))return;if(_0x4d3455[_0xec3879(0x34a)]===0x0)return;if(_0x4d3455[_0xec3879(0x202)]['match'](/<HIDE STATE TURNS>/i))return;const _0x3850f2=_0xbcd49['stateTurns'](_0x4d3455['id']),_0x178126=ImageManager['iconWidth'],_0x59e5bb=ColorManager[_0xec3879(0x36b)](_0x4d3455);this[_0xec3879(0x10c)](_0x59e5bb),this[_0xec3879(0x2e1)](_0xec3879(0x18a)),this[_0xec3879(0xd5)][_0xec3879(0x174)]=!![],this[_0xec3879(0xd5)][_0xec3879(0x177)]=VisuMZ['SkillsStatesCore']['Settings'][_0xec3879(0x280)][_0xec3879(0x1ad)],_0x506c02+=VisuMZ[_0xec3879(0x148)][_0xec3879(0x1fe)][_0xec3879(0x280)][_0xec3879(0x130)],_0x37ce1e+=VisuMZ[_0xec3879(0x148)]['Settings'][_0xec3879(0x280)][_0xec3879(0x19a)],this[_0xec3879(0x24e)](_0x3850f2,_0x506c02,_0x37ce1e,_0x178126,_0xec3879(0x2f8)),this[_0xec3879(0xd5)][_0xec3879(0x174)]=![],this['resetFontSettings']();},Window_Base['prototype']['drawActorStateData']=function(_0x29ce8d,_0x1dc33e,_0x3bfe92,_0x2bde3e){const _0x16b59e=_0x280ecb;if(!VisuMZ['SkillsStatesCore'][_0x16b59e(0x1fe)]['States'][_0x16b59e(0xeb)])return;const _0x1f6350=ImageManager[_0x16b59e(0x104)],_0x4e561d=ImageManager[_0x16b59e(0x144)]/0x2,_0x10ee13=ColorManager[_0x16b59e(0xd1)]();this[_0x16b59e(0x10c)](_0x10ee13),this[_0x16b59e(0x2e1)](_0x16b59e(0x18a)),this[_0x16b59e(0xd5)]['fontBold']=!![],this['contents'][_0x16b59e(0x177)]=VisuMZ[_0x16b59e(0x148)][_0x16b59e(0x1fe)][_0x16b59e(0x280)][_0x16b59e(0x15b)],_0x3bfe92+=VisuMZ[_0x16b59e(0x148)][_0x16b59e(0x1fe)][_0x16b59e(0x280)][_0x16b59e(0x160)],_0x2bde3e+=VisuMZ[_0x16b59e(0x148)][_0x16b59e(0x1fe)][_0x16b59e(0x280)][_0x16b59e(0xa1)];const _0x84c015=String(_0x29ce8d[_0x16b59e(0x211)](_0x1dc33e['id']));this[_0x16b59e(0x24e)](_0x84c015,_0x3bfe92,_0x2bde3e,_0x1f6350,_0x16b59e(0x2d8)),this[_0x16b59e(0xd5)]['fontBold']=![],this['resetFontSettings']();},Window_Base[_0x280ecb(0x298)][_0x280ecb(0xa2)]=function(_0x41a285,_0x1dda89,_0x10f683,_0x39324e){const _0x50a75b=_0x280ecb;if(!VisuMZ[_0x50a75b(0x148)][_0x50a75b(0x1fe)][_0x50a75b(0x224)][_0x50a75b(0x1b8)])return;const _0x28c329=_0x41a285[_0x50a75b(0x1b5)](_0x1dda89);if(_0x28c329===0x0)return;const _0x44887b=_0x41a285['buffTurns'](_0x1dda89),_0x40cd59=ImageManager[_0x50a75b(0x104)],_0x2b2899=_0x28c329>0x0?ColorManager[_0x50a75b(0x20c)]():ColorManager[_0x50a75b(0x31c)]();this[_0x50a75b(0x10c)](_0x2b2899),this[_0x50a75b(0x2e1)](_0x50a75b(0x18a)),this[_0x50a75b(0xd5)][_0x50a75b(0x174)]=!![],this[_0x50a75b(0xd5)][_0x50a75b(0x177)]=VisuMZ[_0x50a75b(0x148)]['Settings']['Buffs'][_0x50a75b(0x1ad)],_0x10f683+=VisuMZ['SkillsStatesCore'][_0x50a75b(0x1fe)][_0x50a75b(0x224)][_0x50a75b(0x130)],_0x39324e+=VisuMZ[_0x50a75b(0x148)][_0x50a75b(0x1fe)][_0x50a75b(0x224)][_0x50a75b(0x19a)],this[_0x50a75b(0x24e)](_0x44887b,_0x10f683,_0x39324e,_0x40cd59,'right'),this[_0x50a75b(0xd5)]['fontBold']=![],this[_0x50a75b(0x29f)]();},Window_Base[_0x280ecb(0x298)][_0x280ecb(0x118)]=function(_0x1bdf58,_0x507121,_0x3f68c,_0x54fa2e){const _0x27afde=_0x280ecb;if(!VisuMZ[_0x27afde(0x148)][_0x27afde(0x1fe)]['Buffs'][_0x27afde(0xeb)])return;const _0x1ecff=_0x1bdf58[_0x27afde(0x283)](_0x507121),_0x448249=_0x1bdf58[_0x27afde(0x1b5)](_0x507121),_0xd8ca98=ImageManager[_0x27afde(0x104)],_0x49b625=ImageManager[_0x27afde(0x144)]/0x2,_0x36dc48=_0x448249>0x0?ColorManager[_0x27afde(0x20c)]():ColorManager[_0x27afde(0x31c)]();this[_0x27afde(0x10c)](_0x36dc48),this[_0x27afde(0x2e1)](_0x27afde(0x18a)),this[_0x27afde(0xd5)][_0x27afde(0x174)]=!![],this['contents'][_0x27afde(0x177)]=VisuMZ[_0x27afde(0x148)]['Settings'][_0x27afde(0x224)][_0x27afde(0x15b)],_0x3f68c+=VisuMZ['SkillsStatesCore'][_0x27afde(0x1fe)][_0x27afde(0x224)][_0x27afde(0x160)],_0x54fa2e+=VisuMZ[_0x27afde(0x148)]['Settings'][_0x27afde(0x224)][_0x27afde(0xa1)];const _0x4bf53d=_0x27afde(0x218)[_0x27afde(0x294)](Math['round'](_0x1ecff*0x64));this[_0x27afde(0x24e)](_0x4bf53d,_0x3f68c,_0x54fa2e,_0xd8ca98,_0x27afde(0x2d8)),this[_0x27afde(0xd5)][_0x27afde(0x174)]=![],this['resetFontSettings']();},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x339)]=Window_StatusBase[_0x280ecb(0x298)][_0x280ecb(0x13b)],Window_StatusBase[_0x280ecb(0x298)]['placeGauge']=function(_0x124860,_0x2847bd,_0x491e91,_0x1397ca){const _0x49d5a8=_0x280ecb;if(_0x124860[_0x49d5a8(0x209)]())_0x2847bd=this[_0x49d5a8(0x1dd)](_0x124860,_0x2847bd);this[_0x49d5a8(0x2ba)](_0x124860,_0x2847bd,_0x491e91,_0x1397ca);},Window_StatusBase[_0x280ecb(0x298)][_0x280ecb(0x2ba)]=function(_0x397876,_0x170000,_0x529b10,_0x389230){const _0x47155f=_0x280ecb;if([_0x47155f(0x7c),_0x47155f(0x31a)][_0x47155f(0x9b)](_0x170000['toLowerCase']()))return;VisuMZ[_0x47155f(0x148)][_0x47155f(0x339)][_0x47155f(0x159)](this,_0x397876,_0x170000,_0x529b10,_0x389230);},Window_StatusBase['prototype']['convertGaugeTypeSkillsStatesCore']=function(_0x1fbf28,_0x4938d0){const _0x18ed13=_0x280ecb,_0x24cac8=_0x1fbf28[_0x18ed13(0x1a2)]()[_0x18ed13(0x202)];if(_0x4938d0==='hp'&&_0x24cac8[_0x18ed13(0x1ca)](/<REPLACE HP GAUGE:[ ](.*)>/i))return _0x18ed13(0xd7)!==_0x18ed13(0x300)?String(RegExp['$1']):this[_0x18ed13(0x268)](_0x3cc0bf)>0x0;else{if(_0x4938d0==='mp'&&_0x24cac8[_0x18ed13(0x1ca)](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else return _0x4938d0==='tp'&&_0x24cac8['match'](/<REPLACE TP GAUGE:[ ](.*)>/i)?String(RegExp['$1']):_0x4938d0;}},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x27a)]=Window_StatusBase[_0x280ecb(0x298)][_0x280ecb(0x29d)],Window_StatusBase[_0x280ecb(0x298)][_0x280ecb(0x29d)]=function(_0x129658,_0x419589,_0x521d45,_0x46b288){const _0x3abd9c=_0x280ecb;if(!_0x129658)return;Window_Base[_0x3abd9c(0x298)][_0x3abd9c(0x29d)][_0x3abd9c(0x159)](this,_0x129658,_0x419589,_0x521d45,_0x46b288);},VisuMZ['SkillsStatesCore'][_0x280ecb(0x187)]=Window_SkillType['prototype'][_0x280ecb(0x13f)],Window_SkillType[_0x280ecb(0x298)][_0x280ecb(0x13f)]=function(_0x1c3e19){const _0x40dbe0=_0x280ecb;VisuMZ[_0x40dbe0(0x148)][_0x40dbe0(0x187)][_0x40dbe0(0x159)](this,_0x1c3e19),this[_0x40dbe0(0x2fe)](_0x1c3e19);},Window_SkillType['prototype'][_0x280ecb(0x2fe)]=function(_0x168b55){const _0x282104=_0x280ecb,_0x44b345=new Rectangle(0x0,0x0,_0x168b55[_0x282104(0x1bb)],_0x168b55[_0x282104(0x32c)]);this[_0x282104(0x1f8)]=new Window_Base(_0x44b345),this[_0x282104(0x1f8)]['opacity']=0x0,this[_0x282104(0x13c)](this['_commandNameWindow']),this['updateCommandNameWindow']();},Window_SkillType['prototype']['callUpdateHelp']=function(){const _0x4d723d=_0x280ecb;Window_Command[_0x4d723d(0x298)]['callUpdateHelp'][_0x4d723d(0x159)](this);if(this[_0x4d723d(0x1f8)])this[_0x4d723d(0x35b)]();},Window_SkillType[_0x280ecb(0x298)][_0x280ecb(0x35b)]=function(){const _0x38fe8d=_0x280ecb,_0x5d8b8e=this[_0x38fe8d(0x1f8)];_0x5d8b8e['contents'][_0x38fe8d(0x175)]();const _0x320312=this[_0x38fe8d(0x11c)](this[_0x38fe8d(0x186)]());if(_0x320312==='icon'&&this[_0x38fe8d(0x30c)]()>0x0){const _0x3ab1da=this[_0x38fe8d(0xa4)](this[_0x38fe8d(0x186)]());let _0x1de613=this['commandName'](this[_0x38fe8d(0x186)]());_0x1de613=_0x1de613[_0x38fe8d(0x19e)](/\\I\[(\d+)\]/gi,''),_0x5d8b8e[_0x38fe8d(0x29f)](),this[_0x38fe8d(0x341)](_0x1de613,_0x3ab1da),this[_0x38fe8d(0x358)](_0x1de613,_0x3ab1da),this[_0x38fe8d(0xec)](_0x1de613,_0x3ab1da);}},Window_SkillType[_0x280ecb(0x298)][_0x280ecb(0x341)]=function(_0x30efe9,_0x4cbc72){},Window_SkillType[_0x280ecb(0x298)][_0x280ecb(0x358)]=function(_0x206011,_0x5b6cdb){const _0x231500=_0x280ecb,_0x2bd1a1=this[_0x231500(0x1f8)];_0x2bd1a1[_0x231500(0x24e)](_0x206011,0x0,_0x5b6cdb['y'],_0x2bd1a1[_0x231500(0x1b2)],_0x231500(0x2d8));},Window_SkillType[_0x280ecb(0x298)][_0x280ecb(0xec)]=function(_0xfad42e,_0x108caa){const _0x253a92=_0x280ecb,_0x1b1202=this[_0x253a92(0x1f8)],_0x437f07=$gameSystem[_0x253a92(0x285)](),_0x13c608=_0x108caa['x']+Math[_0x253a92(0x132)](_0x108caa[_0x253a92(0x1bb)]/0x2)+_0x437f07;_0x1b1202['x']=_0x1b1202[_0x253a92(0x1bb)]/-0x2+_0x13c608,_0x1b1202['y']=Math[_0x253a92(0x132)](_0x108caa[_0x253a92(0x32c)]/0x2);},Window_SkillType['prototype'][_0x280ecb(0x117)]=function(){const _0x543985=_0x280ecb;return Imported[_0x543985(0xa3)]&&Window_Command[_0x543985(0x298)][_0x543985(0x117)][_0x543985(0x159)](this);},Window_SkillType['prototype'][_0x280ecb(0x318)]=function(){const _0x236cc6=_0x280ecb;if(!this[_0x236cc6(0x327)])return;const _0x3dd912=this[_0x236cc6(0x327)][_0x236cc6(0xfb)]();for(const _0x331a2a of _0x3dd912){const _0x1d72ce=this['makeCommandName'](_0x331a2a);this[_0x236cc6(0x2a8)](_0x1d72ce,_0x236cc6(0x351),!![],_0x331a2a);}},Window_SkillType[_0x280ecb(0x298)]['makeCommandName']=function(_0x8039a0){const _0x2c3797=_0x280ecb;let _0x36530c=$dataSystem[_0x2c3797(0xfb)][_0x8039a0];if(_0x36530c[_0x2c3797(0x1ca)](/\\I\[(\d+)\]/i))return _0x36530c;if(this['commandStyle']()==='text')return _0x36530c;const _0x50411b=VisuMZ['SkillsStatesCore']['Settings'][_0x2c3797(0x25b)],_0x254d51=$dataSystem[_0x2c3797(0x295)][_0x2c3797(0x9b)](_0x8039a0),_0x465ac8=_0x254d51?_0x50411b[_0x2c3797(0x1b9)]:_0x50411b['IconStypeNorm'];return _0x2c3797(0x31b)['format'](_0x465ac8,_0x36530c);},Window_SkillType[_0x280ecb(0x298)]['itemTextAlign']=function(){const _0x3b5b47=_0x280ecb;return VisuMZ[_0x3b5b47(0x148)][_0x3b5b47(0x1fe)][_0x3b5b47(0x25b)]['CmdTextAlign'];},Window_SkillType[_0x280ecb(0x298)][_0x280ecb(0xb1)]=function(_0xa823ef){const _0x2d1714=_0x280ecb,_0x18fcb4=this['commandStyleCheck'](_0xa823ef);if(_0x18fcb4==='iconText')this[_0x2d1714(0x22d)](_0xa823ef);else{if(_0x18fcb4===_0x2d1714(0x17f))_0x2d1714(0x1b1)!==_0x2d1714(0x23b)?this['drawItemStyleIcon'](_0xa823ef):this['_stateDisplay'][_0x32cf41]='';else{if(_0x2d1714(0x1c9)!==_0x2d1714(0x340))Window_Command[_0x2d1714(0x298)][_0x2d1714(0xb1)][_0x2d1714(0x159)](this,_0xa823ef);else{const _0x4e1fa8=[];for(const _0x4cb8c9 of this['enemy']()['actions']){const _0x1e1be5=_0x150184[_0x4cb8c9['skillId']];if(_0x1e1be5&&!_0x4e1fa8[_0x2d1714(0x9b)](_0x1e1be5))_0x4e1fa8['push'](_0x1e1be5);}return _0x4e1fa8;}}}},Window_SkillType['prototype'][_0x280ecb(0xad)]=function(){const _0x4464bd=_0x280ecb;return VisuMZ[_0x4464bd(0x148)][_0x4464bd(0x1fe)][_0x4464bd(0x25b)][_0x4464bd(0x170)];},Window_SkillType[_0x280ecb(0x298)][_0x280ecb(0x11c)]=function(_0x144256){const _0x3a5d3c=_0x280ecb;if(_0x144256<0x0)return _0x3a5d3c(0xcd);const _0x5756d4=this[_0x3a5d3c(0xad)]();if(_0x5756d4!=='auto'){if(_0x3a5d3c(0x2d6)===_0x3a5d3c(0x31d))this[_0x3a5d3c(0x25c)](_0x5663b1)&&(_0xd93945+=this['buffTurns'](_0x406873),this[_0x3a5d3c(0x257)](_0x1cab8f,_0x2cadb3));else return _0x5756d4;}else{if(this[_0x3a5d3c(0x30c)]()>0x0){if(_0x3a5d3c(0x232)===_0x3a5d3c(0x232)){const _0x5d31db=this[_0x3a5d3c(0x1f7)](_0x144256);if(_0x5d31db[_0x3a5d3c(0x1ca)](/\\I\[(\d+)\]/i)){if(_0x3a5d3c(0x156)===_0x3a5d3c(0x6e))return _0x448f6e[_0x3d7adc['id']]['call'](this,_0x22c6e8);else{const _0x1af184=this[_0x3a5d3c(0xa4)](_0x144256),_0x29fea0=this[_0x3a5d3c(0x2a4)](_0x5d31db)[_0x3a5d3c(0x1bb)];return _0x29fea0<=_0x1af184[_0x3a5d3c(0x1bb)]?_0x3a5d3c(0x173):_0x3a5d3c(0x129)===_0x3a5d3c(0x129)?_0x3a5d3c(0x17f):(_0xff76e9=_0x1e911b(_0x333cf8),_0x4b21cc[_0x3a5d3c(0x1ca)](/#(.*)/i)?'#%1'['format'](_0x123c18(_0x63543['$1'])):this['textColor'](_0x142ba1(_0x22a626)));}}}else _0x451e70[_0x3a5d3c(0x298)][_0x3a5d3c(0x304)]['call'](this);}}return _0x3a5d3c(0xcd);},Window_SkillType['prototype'][_0x280ecb(0x22d)]=function(_0x56239f){const _0x3f5e84=_0x280ecb,_0x29fd93=this[_0x3f5e84(0xa4)](_0x56239f),_0x2fbb6e=this[_0x3f5e84(0x1f7)](_0x56239f),_0x47a0f8=this[_0x3f5e84(0x2a4)](_0x2fbb6e)[_0x3f5e84(0x1bb)];this['changePaintOpacity'](this[_0x3f5e84(0x35a)](_0x56239f));const _0xfe54a2=this[_0x3f5e84(0x2be)]();if(_0xfe54a2===_0x3f5e84(0x2f8)){if(_0x3f5e84(0x1f2)==='aiYKc'){_0x45f2aa[_0x3f5e84(0x1ca)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x3fba2a=_0x8c0f5b(_0x25a001['$1'])[_0x3f5e84(0x30d)]()[_0x3f5e84(0x1bd)]()[_0x3f5e84(0x313)](',');for(const _0x2052cb of _0x3fba2a){_0x2d10d3[_0x3f5e84(0x168)][_0x3f5e84(0x2e6)](_0x2052cb[_0x3f5e84(0x1bd)]());}}else this['drawTextEx'](_0x2fbb6e,_0x29fd93['x']+_0x29fd93[_0x3f5e84(0x1bb)]-_0x47a0f8,_0x29fd93['y'],_0x47a0f8);}else{if(_0xfe54a2===_0x3f5e84(0x2d8)){const _0x302cad=_0x29fd93['x']+Math[_0x3f5e84(0x132)]((_0x29fd93[_0x3f5e84(0x1bb)]-_0x47a0f8)/0x2);this[_0x3f5e84(0x12c)](_0x2fbb6e,_0x302cad,_0x29fd93['y'],_0x47a0f8);}else this[_0x3f5e84(0x12c)](_0x2fbb6e,_0x29fd93['x'],_0x29fd93['y'],_0x47a0f8);}},Window_SkillType[_0x280ecb(0x298)][_0x280ecb(0x184)]=function(_0x5de565){const _0x171636=_0x280ecb;this[_0x171636(0x1f7)](_0x5de565)[_0x171636(0x1ca)](/\\I\[(\d+)\]/i);const _0x2a1931=Number(RegExp['$1'])||0x0,_0x44e55f=this[_0x171636(0xa4)](_0x5de565),_0x1b4d78=_0x44e55f['x']+Math[_0x171636(0x132)]((_0x44e55f['width']-ImageManager[_0x171636(0x104)])/0x2),_0x1326ff=_0x44e55f['y']+(_0x44e55f[_0x171636(0x32c)]-ImageManager[_0x171636(0x144)])/0x2;this[_0x171636(0x350)](_0x2a1931,_0x1b4d78,_0x1326ff);},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x11b)]=Window_SkillStatus[_0x280ecb(0x298)]['refresh'],Window_SkillStatus[_0x280ecb(0x298)][_0x280ecb(0x10d)]=function(){const _0x486180=_0x280ecb;VisuMZ[_0x486180(0x148)][_0x486180(0x11b)]['call'](this);if(this[_0x486180(0x327)])this[_0x486180(0x15c)]();},Window_SkillStatus['prototype'][_0x280ecb(0x15c)]=function(){const _0x3e0c82=_0x280ecb;if(!Imported[_0x3e0c82(0xa3)])return;if(!Imported[_0x3e0c82(0x2c6)])return;const _0x56f289=this[_0x3e0c82(0x110)]();let _0x4ae735=this[_0x3e0c82(0x265)]()/0x2+0xb4+0xb4+0xb4,_0x508ecd=this['innerWidth']-_0x4ae735-0x2;if(_0x508ecd>=0x12c){if(_0x3e0c82(0x277)!==_0x3e0c82(0x2de)){const _0x2c0815=VisuMZ[_0x3e0c82(0x87)][_0x3e0c82(0x1fe)]['Param'][_0x3e0c82(0x2ac)],_0x38b0ee=Math[_0x3e0c82(0x132)](_0x508ecd/0x2)-0x18;let _0x51029c=_0x4ae735,_0x1fe441=Math[_0x3e0c82(0x132)]((this['innerHeight']-Math[_0x3e0c82(0x319)](_0x2c0815[_0x3e0c82(0x305)]/0x2)*_0x56f289)/0x2),_0x2d50f3=0x0;for(const _0x531efe of _0x2c0815){this[_0x3e0c82(0x17d)](_0x51029c,_0x1fe441,_0x38b0ee,_0x531efe),_0x2d50f3++;if(_0x2d50f3%0x2===0x0){if(_0x3e0c82(0x1d9)===_0x3e0c82(0x154)){const _0x210dee=_0x4177cc[_0x3e0c82(0x367)]('['+_0x465f9c['$1'][_0x3e0c82(0x1ca)](/\d+/g)+']');for(const _0xfbdda3 of _0x210dee){if(!this[_0x3e0c82(0x327)][_0x3e0c82(0x369)](_0xfbdda3))return![];}return!![];}else _0x51029c=_0x4ae735,_0x1fe441+=_0x56f289;}else _0x51029c+=_0x38b0ee+0x18;}}else return this[_0x3e0c82(0x28c)]()[_0x3e0c82(0x1ca)](/RIGHT/i);}this[_0x3e0c82(0x29f)]();},Window_SkillStatus[_0x280ecb(0x298)][_0x280ecb(0x17d)]=function(_0xedbf62,_0x3e8b95,_0x29fa50,_0x5177e2){const _0x3149ed=_0x280ecb,_0x855b10=this[_0x3149ed(0x110)]();this[_0x3149ed(0x29f)](),this[_0x3149ed(0x23a)](_0xedbf62,_0x3e8b95,_0x29fa50,_0x5177e2,!![]),this[_0x3149ed(0x333)](),this[_0x3149ed(0xd5)]['fontSize']-=0x8;const _0x1784e0=this['_actor'][_0x3149ed(0xe1)](_0x5177e2,!![]);this[_0x3149ed(0xd5)][_0x3149ed(0x24e)](_0x1784e0,_0xedbf62,_0x3e8b95,_0x29fa50,_0x855b10,'right');},VisuMZ['SkillsStatesCore']['Window_SkillList_includes']=Window_SkillList['prototype'][_0x280ecb(0x9b)],Window_SkillList[_0x280ecb(0x298)][_0x280ecb(0x9b)]=function(_0x44c5c7){const _0x13e05b=_0x280ecb;return this[_0x13e05b(0x270)](_0x44c5c7);},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x188)]=Window_SkillList[_0x280ecb(0x298)][_0x280ecb(0xa6)],Window_SkillList[_0x280ecb(0x298)]['maxCols']=function(){const _0x45776f=_0x280ecb;if(SceneManager[_0x45776f(0x1bc)][_0x45776f(0xc2)]===Scene_Battle){if(_0x45776f(0x36d)===_0x45776f(0xaf)){const _0x1d171e=_0x420c64[_0xf7166b];if(_0x1d171e&&_0x1d171e[_0x45776f(0x202)]['match'](/<NO DEATH CLEAR>/i))return!this[_0x45776f(0x24f)](_0x15a79f)&&!this[_0x45776f(0x223)](_0x16579c)&&!this['_result'][_0x45776f(0x366)](_0x5dca1c);return _0x4e4fc4[_0x45776f(0x148)][_0x45776f(0x150)][_0x45776f(0x159)](this,_0x150862);}else return VisuMZ[_0x45776f(0x148)]['Window_SkillList_maxCols'][_0x45776f(0x159)](this);}else return VisuMZ[_0x45776f(0x148)][_0x45776f(0x1fe)][_0x45776f(0x25b)]['ListWindowCols'];},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0xe8)]=Window_SkillList[_0x280ecb(0x298)][_0x280ecb(0x32f)],Window_SkillList['prototype'][_0x280ecb(0x32f)]=function(_0x332a9f){const _0x51535b=_0x280ecb,_0x6e9ee9=this[_0x51535b(0x327)]!==_0x332a9f;VisuMZ[_0x51535b(0x148)]['Window_SkillList_setActor'][_0x51535b(0x159)](this,_0x332a9f);if(_0x6e9ee9){if('duKaR'!==_0x51535b(0x221)){if(typeof _0x5598dd!==_0x51535b(0x2f6))_0x2b5c42=_0x342ca3['id'];if(this['isStateAffected'](_0xb433a2)){const _0x51a117=_0x5af418[_0x51535b(0x80)](_0x143af5);this[_0x51535b(0x1f9)][_0x3958df]=_0x4dfd7c[_0x51535b(0x1db)](0x0,_0x51a117);if(this['_stateTurns'][_0x3406cc]<=0x0)this[_0x51535b(0x30e)](_0x85ade9);}}else this[_0x51535b(0x1d4)]&&this['_statusWindow'][_0x51535b(0xc2)]===Window_ShopStatus&&this[_0x51535b(0x1d4)][_0x51535b(0x2e2)](this[_0x51535b(0x1a1)](0x0));}},Window_SkillList[_0x280ecb(0x298)][_0x280ecb(0x239)]=function(_0x5c96c7){const _0x32917c=_0x280ecb;if(this[_0x32917c(0x215)]===_0x5c96c7)return;this[_0x32917c(0x215)]=_0x5c96c7,this[_0x32917c(0x10d)](),this['scrollTo'](0x0,0x0),this[_0x32917c(0x1d4)]&&this[_0x32917c(0x1d4)]['constructor']===Window_ShopStatus&&(_0x32917c(0x165)!=='NEKOy'?this['onAddDebuffGlobalJS'](_0x1b81d5,_0x1d779d):this[_0x32917c(0x1d4)][_0x32917c(0x2e2)](this[_0x32917c(0x1a1)](0x0)));},Window_SkillList[_0x280ecb(0x298)][_0x280ecb(0x270)]=function(_0x3c7a09){const _0x21df0e=_0x280ecb;if(!_0x3c7a09)return VisuMZ['SkillsStatesCore'][_0x21df0e(0x1df)]['call'](this,_0x3c7a09);if(!this[_0x21df0e(0x21b)](_0x3c7a09))return![];if(!this['checkShowHideNotetags'](_0x3c7a09))return![];if(!this[_0x21df0e(0x122)](_0x3c7a09))return![];return!![];},Window_SkillList[_0x280ecb(0x298)][_0x280ecb(0x21b)]=function(_0x1bcc58){const _0x55eec2=_0x280ecb;return DataManager[_0x55eec2(0x354)](_0x1bcc58)['includes'](this[_0x55eec2(0x215)]);},Window_SkillList[_0x280ecb(0x298)]['checkShowHideNotetags']=function(_0x2b71fb){const _0x2dee19=_0x280ecb;if(!this[_0x2dee19(0x22a)](_0x2b71fb))return![];if(!this['checkShowHideSwitchNotetags'](_0x2b71fb))return![];if(!this[_0x2dee19(0x35f)](_0x2b71fb))return![];return!![];},Window_SkillList['prototype'][_0x280ecb(0x22a)]=function(_0x56f22e){const _0x1b1147=_0x280ecb,_0x3ff185=_0x56f22e[_0x1b1147(0x202)];if(_0x3ff185[_0x1b1147(0x1ca)](/<HIDE IN BATTLE>/i)&&$gameParty[_0x1b1147(0x1e0)]())return _0x1b1147(0xf9)==='KTwbH'?![]:_0x143788[_0x573e86['id']][_0x1b1147(0x159)](this,_0x2c75b5);else return _0x3ff185['match'](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x1b1147(0x1e0)]()?![]:!![];},Window_SkillList['prototype'][_0x280ecb(0x163)]=function(_0x120b5b){const _0x420ab7=_0x280ecb,_0x453979=_0x120b5b[_0x420ab7(0x202)];if(_0x453979['match'](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4dc098=JSON[_0x420ab7(0x367)]('['+RegExp['$1'][_0x420ab7(0x1ca)](/\d+/g)+']');for(const _0x199ca2 of _0x4dc098){if(!$gameSwitches[_0x420ab7(0x10a)](_0x199ca2))return![];}return!![];}if(_0x453979[_0x420ab7(0x1ca)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4cea3e=JSON['parse']('['+RegExp['$1'][_0x420ab7(0x1ca)](/\d+/g)+']');for(const _0x87345f of _0x4cea3e){if(!$gameSwitches[_0x420ab7(0x10a)](_0x87345f))return![];}return!![];}if(_0x453979[_0x420ab7(0x1ca)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3ba169=JSON['parse']('['+RegExp['$1'][_0x420ab7(0x1ca)](/\d+/g)+']');for(const _0x5a9981 of _0x3ba169){if($gameSwitches[_0x420ab7(0x10a)](_0x5a9981))return!![];}return![];}if(_0x453979['match'](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4d91df=JSON[_0x420ab7(0x367)]('['+RegExp['$1'][_0x420ab7(0x1ca)](/\d+/g)+']');for(const _0x42cb42 of _0x4d91df){if(!$gameSwitches[_0x420ab7(0x10a)](_0x42cb42))return!![];}return![];}if(_0x453979['match'](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x25d762=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x58c4f4 of _0x25d762){if(_0x420ab7(0x8b)!==_0x420ab7(0x31e)){if(!$gameSwitches[_0x420ab7(0x10a)](_0x58c4f4))return!![];}else{this[_0x420ab7(0x185)]=this[_0x420ab7(0x185)]||{};const _0x4c400a=_0x4cd1df?this[_0x420ab7(0x356)](_0x5de831):this['getCurrentStateOriginKey']();this[_0x420ab7(0x185)][_0xa1f780]=_0x4c400a;}}return![];}if(_0x453979[_0x420ab7(0x1ca)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('tkTGk'==='awPfq')this[_0x420ab7(0x244)](_0x27585a['id'])&&_0x54c4c1[_0x420ab7(0x34a)]===_0x4c13c1&&(this[_0x420ab7(0x30e)](_0x500d4f['id']),this[_0x420ab7(0x1c7)](_0x11a58e['id']),this[_0x420ab7(0x1e8)](_0x355a19['id']));else{const _0xf61eaa=JSON[_0x420ab7(0x367)]('['+RegExp['$1'][_0x420ab7(0x1ca)](/\d+/g)+']');for(const _0x43d9e3 of _0xf61eaa){if($gameSwitches['value'](_0x43d9e3))return![];}return!![];}}return!![];},Window_SkillList['prototype']['checkShowHideSkillNotetags']=function(_0x256e93){const _0x3d00cd=_0x280ecb,_0x3e8aa4=_0x256e93[_0x3d00cd(0x202)];if(_0x3e8aa4['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x36a15b=JSON[_0x3d00cd(0x367)]('['+RegExp['$1'][_0x3d00cd(0x1ca)](/\d+/g)+']');for(const _0x521efb of _0x36a15b){if(!this[_0x3d00cd(0x327)][_0x3d00cd(0x369)](_0x521efb))return![];}return!![];}else{if(_0x3e8aa4[_0x3d00cd(0x1ca)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2cfdf1=RegExp['$1'][_0x3d00cd(0x313)](',');for(const _0x219a3b of _0x2cfdf1){if(_0x3d00cd(0x217)==='KIgPB'){_0x3c0375[_0x3d00cd(0x1ca)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x208af1=_0x1c17e9(_0x1a2d11['$1']),_0x57c22d=_0x5cc895(_0x3df0ed['$2']);_0x46d89e[_0x3d00cd(0x8a)](_0x208af1,_0x57c22d);}else{const _0x3f4fa8=DataManager[_0x3d00cd(0x102)](_0x219a3b);if(!_0x3f4fa8)continue;if(!this[_0x3d00cd(0x327)][_0x3d00cd(0x369)](_0x3f4fa8))return![];}}return!![];}}if(_0x3e8aa4[_0x3d00cd(0x1ca)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3d00cd(0x1aa)==='TEnum'){const _0x1d8192=JSON[_0x3d00cd(0x367)]('['+RegExp['$1'][_0x3d00cd(0x1ca)](/\d+/g)+']');for(const _0x5d33e2 of _0x1d8192){if(!this[_0x3d00cd(0x327)][_0x3d00cd(0x369)](_0x5d33e2))return![];}return!![];}else{for(_0x47a67d of _0x5e5102[_0x3d00cd(0x148)][_0x3d00cd(0x1fe)][_0x3d00cd(0x312)]){const _0x27316d=_0x1f2e7d[_0x3d00cd(0x2dc)]['call'](this,_0x1787cc);if(!_0x2bf78a[_0x3d00cd(0x276)][_0x3d00cd(0x159)](this,_0x5e875c,_0x27316d))return![];}return!![];}}else{if(_0x3e8aa4[_0x3d00cd(0x1ca)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x127ac3=RegExp['$1']['split'](',');for(const _0x73fe8a of _0x127ac3){if(_0x3d00cd(0x17b)!==_0x3d00cd(0x17b)){let _0x34fb66=this[_0x3d00cd(0x16f)]();return _0x140ef7[_0x3d00cd(0xa3)]&&this[_0x3d00cd(0x16b)]()&&(_0x34fb66=_0x161cc4[_0x3d00cd(0x193)](_0x34fb66)),_0x34fb66;}else{const _0x2b1504=DataManager['getSkillIdWithName'](_0x73fe8a);if(!_0x2b1504)continue;if(!this[_0x3d00cd(0x327)]['isLearnedSkill'](_0x2b1504))return![];}}return!![];}}if(_0x3e8aa4['match'](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x25d878=JSON[_0x3d00cd(0x367)]('['+RegExp['$1'][_0x3d00cd(0x1ca)](/\d+/g)+']');for(const _0x28227e of _0x25d878){if(this['_actor'][_0x3d00cd(0x369)](_0x28227e))return!![];}return![];}else{if(_0x3e8aa4[_0x3d00cd(0x1ca)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x3d00cd(0x1b7)!==_0x3d00cd(0x1b7)){if(_0x1f9ab7[_0x3d00cd(0x93)]&&_0x130c6f[_0x3d00cd(0x15d)]!==_0x23d20e)return _0x246d6e[_0x3d00cd(0x15d)];else return this[_0x3d00cd(0xb6)]()?this[_0x3d00cd(0x28c)]()[_0x3d00cd(0x1ca)](/RIGHT/i):_0x434103[_0x3d00cd(0x298)][_0x3d00cd(0x304)][_0x3d00cd(0x159)](this);}else{const _0xe6f999=RegExp['$1'][_0x3d00cd(0x313)](',');for(const _0x5d31da of _0xe6f999){const _0x5803c1=DataManager[_0x3d00cd(0x102)](_0x5d31da);if(!_0x5803c1)continue;if(this[_0x3d00cd(0x327)][_0x3d00cd(0x369)](_0x5803c1))return!![];}return![];}}}if(_0x3e8aa4[_0x3d00cd(0x1ca)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3d00cd(0x171)!=='WKwVP'){const _0x87a048=JSON[_0x3d00cd(0x367)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x571757 of _0x87a048){if(_0x3d00cd(0x6d)===_0x3d00cd(0x1e4))return _0x3d2b45[_0x3d00cd(0x148)][_0x3d00cd(0x1fe)]['Skills'][_0x3d00cd(0xe5)];else{if(!this['_actor']['isLearnedSkill'](_0x571757))return!![];}}return![];}else this[_0x3d00cd(0x21f)](_0x45696f['id']);}else{if(_0x3e8aa4[_0x3d00cd(0x1ca)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2cc3c7=RegExp['$1']['split'](',');for(const _0x5a464d of _0x2cc3c7){if(_0x3d00cd(0x20d)!=='Suhtw'){const _0x399597=DataManager['getSkillIdWithName'](_0x5a464d);if(!_0x399597)continue;if(!this['_actor'][_0x3d00cd(0x369)](_0x399597))return!![];}else _0x39a5ce[_0x3d00cd(0x148)][_0x3d00cd(0x1fe)]['States'][_0x3d00cd(0x240)][_0x3d00cd(0x159)](this,_0x29baee);}return![];}}if(_0x3e8aa4[_0x3d00cd(0x1ca)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xdbff72=JSON[_0x3d00cd(0x367)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5633bd of _0xdbff72){if(!this['_actor'][_0x3d00cd(0x369)](_0x5633bd))return!![];}return![];}else{if(_0x3e8aa4['match'](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x321258=RegExp['$1'][_0x3d00cd(0x313)](',');for(const _0x289bc3 of _0x321258){if(_0x3d00cd(0x137)==='NuMYA'){const _0x560341=DataManager['getSkillIdWithName'](_0x289bc3);if(!_0x560341)continue;if(!this[_0x3d00cd(0x327)]['isLearnedSkill'](_0x560341))return!![];}else return this;}return![];}}if(_0x3e8aa4[_0x3d00cd(0x1ca)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3d00cd(0x82)===_0x3d00cd(0x82)){const _0x149bab=JSON[_0x3d00cd(0x367)]('['+RegExp['$1'][_0x3d00cd(0x1ca)](/\d+/g)+']');for(const _0x37de59 of _0x149bab){if(_0x3d00cd(0x315)===_0x3d00cd(0x315)){if(this[_0x3d00cd(0x327)][_0x3d00cd(0x369)](_0x37de59))return![];}else{const _0x5c128c=_0x25409f[_0x3d00cd(0x148)][_0x3d00cd(0x1fe)][_0x3d00cd(0x280)];if(!_0x5c128c)return;if(_0x5c128c['ActionEndUpdate']===![])return;if(!this['_subject'])return;this[_0x3d00cd(0xa0)][_0x3d00cd(0x1ee)]();}}return!![];}else return _0x257b69[_0x3d00cd(0x148)][_0x3d00cd(0xff)]['call'](this);}else{if(_0x3e8aa4[_0x3d00cd(0x1ca)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2a814e=RegExp['$1'][_0x3d00cd(0x313)](',');for(const _0x2c0a06 of _0x2a814e){const _0x734e75=DataManager['getSkillIdWithName'](_0x2c0a06);if(!_0x734e75)continue;if(this[_0x3d00cd(0x327)][_0x3d00cd(0x369)](_0x734e75))return![];}return!![];}}if(_0x3e8aa4['match'](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x280077=JSON[_0x3d00cd(0x367)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5645bd of _0x280077){if(!this[_0x3d00cd(0x327)]['hasSkill'](_0x5645bd))return![];}return!![];}else{if(_0x3e8aa4['match'](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4c5ea2=RegExp['$1'][_0x3d00cd(0x313)](',');for(const _0x1bc170 of _0x4c5ea2){if(_0x3d00cd(0xf1)===_0x3d00cd(0x142))return this['skills']()[_0x3d00cd(0x212)](_0x1c128f=>this[_0x3d00cd(0x178)](_0x1c128f));else{const _0x8c54c3=DataManager['getSkillIdWithName'](_0x1bc170);if(!_0x8c54c3)continue;if(!this[_0x3d00cd(0x327)][_0x3d00cd(0x2f2)](_0x8c54c3))return![];}}return!![];}}if(_0x3e8aa4[_0x3d00cd(0x1ca)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4ba26f=JSON[_0x3d00cd(0x367)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x585495 of _0x4ba26f){if(!this[_0x3d00cd(0x327)][_0x3d00cd(0x2f2)](_0x585495))return![];}return!![];}else{if(_0x3e8aa4['match'](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x3d00cd(0x16e)!==_0x3d00cd(0x1c0)){const _0x4b5c0c=RegExp['$1'][_0x3d00cd(0x313)](',');for(const _0x8afc8b of _0x4b5c0c){if('NZgXM'!==_0x3d00cd(0x158))return!![];else{const _0x57f84f=DataManager[_0x3d00cd(0x102)](_0x8afc8b);if(!_0x57f84f)continue;if(!this[_0x3d00cd(0x327)]['hasSkill'](_0x57f84f))return![];}}return!![];}else{const _0x3aa584=_0x39ad8f(_0x486dfa['$1']);if(_0x4d77ae[_0x3d00cd(0xb0)](_0x3aa584))return!![];}}}if(_0x3e8aa4[_0x3d00cd(0x1ca)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3d00cd(0xe0)===_0x3d00cd(0xe0)){const _0x4daccd=JSON['parse']('['+RegExp['$1'][_0x3d00cd(0x1ca)](/\d+/g)+']');for(const _0x55b19c of _0x4daccd){if(this[_0x3d00cd(0x327)][_0x3d00cd(0x2f2)](_0x55b19c))return!![];}return![];}else{const _0x4f18f2=_0x1b9b56[_0x3d00cd(0x148)][_0x3d00cd(0x26f)]['call'](this),_0x3e247d=_0x170d62[_0x3d00cd(0x148)][_0x3d00cd(0x1fe)][_0x3d00cd(0x25b)];let _0x947256=_0x3e247d[_0x3d00cd(0x335)];return _0x1e8fe4[_0x3d00cd(0x1e0)]()&&(_0x947256=_0x947256[_0x3d00cd(0x1a7)](_0x3e247d[_0x3d00cd(0x19f)])),_0x4f18f2['filter'](_0x4998a4=>!_0x947256[_0x3d00cd(0x9b)](_0x4998a4));}}else{if(_0x3e8aa4[_0x3d00cd(0x1ca)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x53c74b=RegExp['$1'][_0x3d00cd(0x313)](',');for(const _0x13a74b of _0x53c74b){const _0x3c56bc=DataManager[_0x3d00cd(0x102)](_0x13a74b);if(!_0x3c56bc)continue;if(this[_0x3d00cd(0x327)][_0x3d00cd(0x2f2)](_0x3c56bc))return!![];}return![];}}if(_0x3e8aa4[_0x3d00cd(0x1ca)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1a4b17=JSON[_0x3d00cd(0x367)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2ac371 of _0x1a4b17){if('MxCvb'!==_0x3d00cd(0x2d9))return _0x38479a;else{if(!this[_0x3d00cd(0x327)][_0x3d00cd(0x2f2)](_0x2ac371))return!![];}}return![];}else{if(_0x3e8aa4[_0x3d00cd(0x1ca)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x3d00cd(0x334)===_0x3d00cd(0x33e))for(const _0x5d4242 of _0x3f19c1){let _0x2dd046=0x0,_0x154ec9=0x0;if(_0x5d4242[_0x3d00cd(0x1ca)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x2dd046=_0x7c8ca3(_0xe94332['$1']),_0x154ec9=_0x4d0012(_0x13bf77['$2']);else _0x5d4242['match'](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x2dd046=_0x5c0e4b[_0x3d00cd(0xc5)](_0x4ed4fc['$1']),_0x154ec9=_0x33e496(_0x3c803e['$2']));_0x140a43[_0x3d00cd(0x262)](_0x2dd046,_0x154ec9),this[_0x3d00cd(0x8f)](_0xafff6e);}else{const _0x8f914c=RegExp['$1'][_0x3d00cd(0x313)](',');for(const _0x37ac9a of _0x8f914c){const _0x446be3=DataManager[_0x3d00cd(0x102)](_0x37ac9a);if(!_0x446be3)continue;if(!this[_0x3d00cd(0x327)][_0x3d00cd(0x2f2)](_0x446be3))return!![];}return![];}}}if(_0x3e8aa4[_0x3d00cd(0x1ca)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4454e9=JSON[_0x3d00cd(0x367)]('['+RegExp['$1'][_0x3d00cd(0x1ca)](/\d+/g)+']');for(const _0x2f355c of _0x4454e9){if(_0x3d00cd(0x27b)==='oAlzO')for(const _0x48d63c of _0x5d7353){_0x48d63c[_0x3d00cd(0x1ca)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0xe0f8e=_0x5ca0fa['indexOf'](_0x5927db(_0x121bdb['$1'])['toUpperCase']()),_0x539a9a=_0x2339c4(_0x2881d8['$2']);_0xe0f8e>=0x0&&(_0x3a549a[_0x3d00cd(0x364)](_0xe0f8e,_0x539a9a),this[_0x3d00cd(0x8f)](_0x39db2f));}else{if(!this[_0x3d00cd(0x327)][_0x3d00cd(0x2f2)](_0x2f355c))return!![];}}return![];}else{if(_0x3e8aa4[_0x3d00cd(0x1ca)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x3d00cd(0x35c)==='vMGpH'){const _0x3559b2=this[_0x3d00cd(0xa4)](_0x3a5dee),_0x210d20=this[_0x3d00cd(0x2a4)](_0x14fa05)[_0x3d00cd(0x1bb)];return _0x210d20<=_0x3559b2['width']?_0x3d00cd(0x173):_0x3d00cd(0x17f);}else{const _0x1a3e97=RegExp['$1'][_0x3d00cd(0x313)](',');for(const _0x1a25d7 of _0x1a3e97){const _0x2b48a2=DataManager['getSkillIdWithName'](_0x1a25d7);if(!_0x2b48a2)continue;if(!this[_0x3d00cd(0x327)][_0x3d00cd(0x2f2)](_0x2b48a2))return!![];}return![];}}}if(_0x3e8aa4[_0x3d00cd(0x1ca)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x439bda=JSON['parse']('['+RegExp['$1'][_0x3d00cd(0x1ca)](/\d+/g)+']');for(const _0x351f52 of _0x439bda){if('hEbfS'!=='RnlvU'){if(this['_actor'][_0x3d00cd(0x2f2)](_0x351f52))return![];}else{const _0x25bd9e=this['_commandNameWindow'];_0x25bd9e['contents'][_0x3d00cd(0x175)]();const _0x55b757=this['commandStyleCheck'](this[_0x3d00cd(0x186)]());if(_0x55b757==='icon'&&this['maxItems']()>0x0){const _0xbbdb03=this[_0x3d00cd(0xa4)](this['index']());let _0x1dd510=this[_0x3d00cd(0x1f7)](this['index']());_0x1dd510=_0x1dd510[_0x3d00cd(0x19e)](/\\I\[(\d+)\]/gi,''),_0x25bd9e[_0x3d00cd(0x29f)](),this[_0x3d00cd(0x341)](_0x1dd510,_0xbbdb03),this[_0x3d00cd(0x358)](_0x1dd510,_0xbbdb03),this[_0x3d00cd(0xec)](_0x1dd510,_0xbbdb03);}}}return!![];}else{if(_0x3e8aa4[_0x3d00cd(0x1ca)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x46a10b=RegExp['$1'][_0x3d00cd(0x313)](',');for(const _0x4efc9b of _0x46a10b){const _0x994cd7=DataManager[_0x3d00cd(0x102)](_0x4efc9b);if(!_0x994cd7)continue;if(this[_0x3d00cd(0x327)]['hasSkill'](_0x994cd7))return![];}return!![];}}return!![];},Window_SkillList[_0x280ecb(0x298)][_0x280ecb(0x122)]=function(_0x2cb34b){const _0x23780c=_0x280ecb,_0x16683c=_0x2cb34b[_0x23780c(0x202)],_0x3e7c8b=VisuMZ['SkillsStatesCore'][_0x23780c(0x345)];return _0x3e7c8b[_0x2cb34b['id']]?_0x3e7c8b[_0x2cb34b['id']][_0x23780c(0x159)](this,_0x2cb34b):!![];},VisuMZ[_0x280ecb(0x148)][_0x280ecb(0x1be)]=Window_SkillList[_0x280ecb(0x298)][_0x280ecb(0xb1)],Window_SkillList['prototype']['drawItem']=function(_0x1730aa){const _0x4523d0=_0x280ecb,_0x4f8ab1=this[_0x4523d0(0x1a1)](_0x1730aa),_0x1ead9b=_0x4f8ab1[_0x4523d0(0x1f1)];if(_0x4f8ab1)this['alterSkillName'](_0x4f8ab1);VisuMZ['SkillsStatesCore']['Window_SkillList_drawItem'][_0x4523d0(0x159)](this,_0x1730aa);if(_0x4f8ab1)_0x4f8ab1[_0x4523d0(0x1f1)]=_0x1ead9b;},Window_SkillList['prototype'][_0x280ecb(0xbf)]=function(_0x2352d2){const _0x491120=_0x280ecb;if(_0x2352d2&&_0x2352d2[_0x491120(0x202)][_0x491120(0x1ca)](/<LIST NAME:[ ](.*)>/i)){_0x2352d2['name']=String(RegExp['$1'])[_0x491120(0x1bd)]();for(;;){if(_0x2352d2[_0x491120(0x1f1)][_0x491120(0x1ca)](/\\V\[(\d+)\]/gi))'MPOGn'!==_0x491120(0x2bf)?this['_stateTurns'][_0x539f1f]--:_0x2352d2['name']=_0x2352d2['name'][_0x491120(0x19e)](/\\V\[(\d+)\]/gi,(_0x26f978,_0x2847e4)=>$gameVariables['value'](parseInt(_0x2847e4)));else{if('GovAK'===_0x491120(0x1f0))break;else{const _0x453f87=_0x2421b8['CalcJS'][_0x491120(0x159)](_0x39a47f,_0xe6a7f4);return _0x3947df[_0x491120(0x253)][_0x491120(0x159)](_0x15bc5f,_0x27a868,_0x453f87,_0x277193);}}}}},Window_SkillList['prototype'][_0x280ecb(0xcc)]=function(_0x200054,_0x45a0a9,_0x501394,_0x33df96){const _0x4b2237=_0x280ecb;Window_Base[_0x4b2237(0x298)][_0x4b2237(0xcc)]['call'](this,this[_0x4b2237(0x327)],_0x200054,_0x45a0a9,_0x501394,_0x33df96);},Window_SkillList[_0x280ecb(0x298)]['setStatusWindow']=function(_0x2ae2f6){const _0x2880f8=_0x280ecb;this[_0x2880f8(0x1d4)]=_0x2ae2f6,this['callUpdateHelp']();},VisuMZ[_0x280ecb(0x148)]['Window_SkillList_updateHelp']=Window_SkillList[_0x280ecb(0x298)][_0x280ecb(0x190)],Window_SkillList[_0x280ecb(0x298)]['updateHelp']=function(){const _0x558027=_0x280ecb;VisuMZ[_0x558027(0x148)][_0x558027(0x181)][_0x558027(0x159)](this),this['_statusWindow']&&this[_0x558027(0x1d4)]['constructor']===Window_ShopStatus&&this[_0x558027(0x1d4)][_0x558027(0x2e2)](this[_0x558027(0xb3)]());};