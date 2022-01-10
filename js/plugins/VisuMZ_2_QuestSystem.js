//=============================================================================
// VisuStella MZ - Quest Journal System
// VisuMZ_2_QuestSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_QuestSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.QuestSystem = VisuMZ.QuestSystem || {};
VisuMZ.QuestSystem.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.01] [QuestSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Quest_Journal_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * A quest journal is a very important tool provided by game developers for the
 * players. It lists various quests, missions, and objectives that the player
 * can pursue in order to progress further into the game. This can be helpful
 * in reminding the player what needs to be done in the event the player can
 * forget what things there are to do in a vast and large RPG world.
 *
 * This plugin places a quest journal system into your RPG Maker MZ game. You
 * can set up how the quest journal appears, move its windows around and/or
 * reshape them to fit your game.
 *
 * You can adjust the quest's title, display a difficulty level, remind the
 * player who the quest is from, where that quest is from, various dynamic
 * descriptions explaining the quest, a list of objectives to make, a list of
 * rewards that will be given to the player once the quest is complete, and any
 * subtext footnotes and quotes you may wish to insert into each quest.
 *
 * *NOTE*
 *
 * Keep in mind that while this plugin does enable a quest journal system into
 * your game, this plugin will NOT automate it. If you have a quest enabled, it
 * is still up to you to add the quest properly into the journal, set its many
 * objectives, when the other objectives appear, what the rewards are, and then
 * giving out the rewards yourself manually. The purpose of this plugin is to
 * simply serve as a visual record for your player to see what quests have been
 * handed down to him or her.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Unlimited quest categories.
 * * Unlimited quest slots.
 * * Full control over what appears in the quest journal system and how it
 *   appears in-game.
 * * Update quest descriptions, objectives, rewards, subtexts, etc. mid-game
 *   through the use of Plugin Commands.
 * * A dedicated quest menu that's accessible from the Main Menu or by
 *   Plugin Command call.
 * * A quest tracker that appears in the map scene to keep the player updated
 *   on how far they are progressing in their current quest.
 * * Options for the player to show/hide the quest tracker and reposition its
 *   location on the screen.
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
 * Explanation - Categories and Quests
 * ============================================================================
 *
 * The following is an explanation on the differences between Categories and
 * Quests for the usage of this plugin.
 *
 * ---
 *
 * Categories
 *
 * Quest Categories separate the quest types in your game. These can be used to
 * help players differentiate which are story-driven quests, which are optional
 * quests, recurring quests, etc. These have limited settings, but serve as
 * containers for quests that fall under its category.
 *
 * ---
 *
 * Plugin Parameters > Categories > Category Name:
 *
 * This is the category's name. It appears however you type it using text
 * codes, allowing you to color-code it if needed.
 *
 * ---
 *
 * Plugin Parameters > Categories > Quests:
 * 
 * These contain the quests that are listed under this category. Enter in as
 * many as needed/desired.
 *
 * ---
 *
 * Quests
 *
 * Each Quest Category will contain a list of quests that can appear in-game.
 * These individual quests make up the meat and bones of the Quest System and
 * will serve to relay information to the player on what he/she needs to do in
 * order to make progress in your game.
 *
 * ---
 *
 * Plugin Parameters > General > Log Window > Quest Log
 *
 * This determines how the template used by the quest logs to parse information
 * regarding the quests themselves. By default, they are formatted like such:
 *
 * ---
 *
 * \{[[Title]]\}
 * \c[4]Level:\c[0] [[Difficulty]]
 * \c[4]From:\c[0] [[From]]
 * \c[4]Location:\c[0] [[Location]]
 * 
 * \c[4]Description:\c[0]
 * [[Description]]
 * 
 * \c[4]Objectives:\c[0]
 * [[Objectives]]
 * 
 * \c[4]Rewards:\c[0]
 * [[Rewards]]
 * 
 * [[Subtext]]
 * 
 * [[Quote]]
 *
 * ---
 * 
 * Each [[Marker]] is to be replaced by the quest date related to them.
 *
 * - [[Title]] - Inserts the title of the quest.
 *
 * - [[Difficulty]] - Inserts the quest difficulty text.
 *
 * - [[From]] - Inserts the quest origin text.
 *
 * - [[Location]] - Inserts the quest location text.
 *
 * - [[Description]] - Inserts the currently active quest description.
 *   - The quest description can change depending on which Description ID
 *     is currently active for that quest.
 *
 * - [[Objectives]] - Inserts a list of the visible quest objectives.
 *   - The quest objectives visible to the player will be determined by
 *     the quest's Visible Objectives settings and any Plugin Commands
 *     used to alter which objectives are visible and what state they are
 *     currently in (known, completed, failed).
 *
 * - [[Rewards]] - Inserts a list of visible quest rewards.
 *   - The quest rewards visible to the player will be determined by the
 *     quest's Visible Rewards settings and any Plugin Commands used to
 *     alter which rewards are visible and what state they are currently
 *     in (known, claimed, denied).
 *
 * - [[Subtext]] - Inserts the currently active quest subtext.
 *   - The quest subtext can change depending on which Subtext ID is
 *     currently active for that quest.
 *
 * - [[Quote]] - Inserts the currently active quest quote.
 *   - The quest quote can change depending on which Quote ID is
 *     currently active for that quest.
 *
 * ---
 *
 * Each of the following aspects of the quests can be changed through the usage
 * of Plugin Commands:
 *
 * - Description
 * - Objectives
 * - Rewards
 * - Subtext
 * - Quote
 *
 * The following are the Plugin Commands that can change them:
 *
 * - Quest: Description Change
 * - Quest: Objectives Change
 * - Quest: Rewards Change
 * - Quest: Subtext Change
 * - Quest: Quote Change
 *
 * ---
 *
 * More information will be explained in their respective Plugin Parameter
 * sections further down in the help file.
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
 * === Quest Plugin Commands ===
 * 
 * ---
 *
 * Quest: Add/Complete/Fail/Remove
 * - Adds quest(s) to be known/completed/failed.
 * - Or removes them.
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Status:
 *   - Change the status to this.
 *     - Add to Known
 *     - Add to Completed
 *     - Add to Failed
 *     - Remove from All
 *
 * ---
 *
 * Quest: Description Change
 * - Changes the description of the quest(s) to a ID.
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Description ID:
 *   - Change the description of the quest(s) to a different ID.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Quest: Objectives Change
 * - Changes the objective(s) status of the quest(s).
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Objective ID(s):
 *   - Select the objective ID(s) to change.
 *   - You may use JavaScript code.
 *
 *   Status:
 *   - Change the status of the objective(s) to this.
 *     - Show Objective(s)
 *     - Complete Objective(s)
 *     - Fail Objective(s)
 *     - Remove Objective(s)
 *
 * ---
 *
 * Quest: Quote Change
 * - Changes the quote of the quest(s) to a ID.
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Subtext ID:
 *   - Change the quote of the quest(s) to a different ID.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Quest: Rewards Change
 * - Changes the reward(s) status of the quest(s).
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Reward ID(s):
 *   - Select the reward ID(s) to change.
 *   - You may use JavaScript code.
 *
 *   Status:
 *   - Change the status of the reward(s) to this.
 *     - Show Reward(s)
 *     - Claim Reward(s)
 *     - Deny Reward(s)
 *     - Remove Reward(s)
 *
 * ---
 *
 * Quest: Subtext Change
 * - Changes the subtext of the quest(s) to a ID.
 *
 *   Quest Keys:
 *   - Insert the quest key(s) here.
 *   - Each quest key must be unique.
 *
 *   Subtext ID:
 *   - Change the subtext of the quest(s) to a different ID.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Tracker Plugin Commands ===
 * 
 * ---
 *
 * Tracker: Change Quest
 * - Changes the tracked quest.
 *
 *   Quest Key:
 *   - Insert the quest key here.
 *
 * ---
 *
 * Tracker: Refresh Window
 * - Refreshes the quest tracker window.
 *
 * ---
 *
 * Tracker: Show/Hide Window
 * - Can forcefully hide window.
 * - Showing will depend on the player's Options setting.
 *
 *   Show/Hide?:
 *   - Shows/hides the tracker window on the map.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Call Scene_Quest
 * - Opens Scene_Quest for the player.
 * - Does not work in battle.
 *
 * ---
 *
 * System: Enable Quests in Menu?
 * - Enables/disables quest menu inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables quest menu inside the main menu.
 *
 * ---
 *
 * System: Show Quests in Menu?
 * - Shows/hides quest menu inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides quest menu inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * The general settings determine various aspects of the Quest System plugin
 * from the quests that appear at the start of the game to how it's displayed
 * inside menus.
 *
 * ---
 *
 * Starting Quests
 * 
 *   Known Quests:
 *   - Which quests are known at the start of the game?
 *   - Insert their keys here.
 * 
 *   Completed Quests:
 *   - Which quests are completed at the start of the game?
 *   - Insert their keys here.
 * 
 *   Failed Quests:
 *   - Which quests are failed at the start of the game?
 *   - Insert their keys here.
 * 
 *   Tracked Quest:
 *   - Which quest is tracked at the start of the game?
 *
 * ---
 *
 * Scene_Quest
 *
 * ---
 * 
 * Scene_Quest > Background Settings:
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
 * Scene_Quest > Vocab
 *
 * ---
 * 
 * Scene_Quest > Vocab > Command Window
 * 
 *   Command: Known:
 *   - Text used to display known quests.
 *
 *   Command: Completed:
 *   - Text used to display completed quests.
 * 
 *   Command: Failed:
 *   - Text used to display failed quests.
 *
 * ---
 *
 * Scene_Quest > Vocab > Label Window
 * 
 *   Empty Title:
 *   - Text displayed in the Label Window when no quest is selected.
 *
 * ---
 *
 * Scene_Quest > Vocab > List Window
 * 
 *   Open Categories:
 *   - Text format for an open category.
 *   - %1 - Category Name, %2 - Quest Amount
 * 
 *   Closed Categories:
 *   - Text format for a closed category.
 *   - %1 - Category Name, %2 - Quest Amount
 * 
 *   No Quest Listed:
 *   - Text when no quest is listed.
 * 
 *   Tracked Quest:
 *   - Text format for a tracked quest.
 *   - %1 - Tracked Quest's Name
 *
 * ---
 *
 * Scene_Quest > Vocab > Log Window
 * 
 *   Empty Message:
 *   - Text displayed when no quest is selected.
 *
 *     JS: On Load:
 *     - Runs code upon making the empty message.
 *     - Useful for setting up variables.
 * 
 *   Quest Log:
 *   - Text format for Quest Log Window.
 *   - Instructions:
 *     - Insert the [[Keyword]] marks in the text where you want certain parts
 *       of the quest to appear.
 *
 *       - [[Title]] - Inserts the title of the quest.
 *
 *       - [[Difficulty]] - Inserts the quest difficulty text.
 *
 *       - [[From]] - Inserts the quest origin text.
 *
 *       - [[Location]] - Inserts the quest location text.
 *
 *       - [[Description]] - Inserts the currently active quest description.
 *         - The quest description can change depending on which Description ID
 *           is currently active for that quest.
 *
 *       - [[Objectives]] - Inserts a list of the visible quest objectives.
 *         - The quest objectives visible to the player will be determined by
 *           the quest's Visible Objectives settings and any Plugin Commands
 *           used to alter which objectives are visible and what state they are
 *           currently in (known, completed, failed).
 *
 *       - [[Rewards]] - Inserts a list of visible quest rewards.
 *         - The quest rewards visible to the player will be determined by the
 *           quest's Visible Rewards settings and any Plugin Commands used to
 *           alter which rewards are visible and what state they are currently
 *           in (known, claimed, denied).
 *
 *       - [[Subtext]] - Inserts the currently active quest subtext.
 *         - The quest subtext can change depending on which Subtext ID is
 *           currently active for that quest.
 *
 *       - [[Quote]] - Inserts the currently active quest quote.
 *         - The quest quote can change depending on which Quote ID is
 *           currently active for that quest.
 * 
 *   Objective (Known):
 *   - Text format for known objectives.
 *   - %1 - Objective Text
 * 
 *   Objective (Done):
 *   - Text format for complete objectives.
 *   - %1 - Objective Text
 * 
 *   Objective (Failed):
 *   - Text format for failed objectives.
 *   - %1 - Objective Text
 * 
 *   Reward (Known):
 *   - Text format for normal rewards.
 *   - %1 - Reward Text
 * 
 *   Reward (Claimed):
 *   - Text format for claimed rewards.
 *   - %1 - Reward Text
 * 
 *   Reward (Denied):
 *   - Text format for denied rewards.
 *   - %1 - Reward Text
 *
 * ---
 *
 * Scene_Quest > Vocab > Button Assist Window
 * 
 *   Scroll Up/Down:
 *   - Text for Page Up/Down to scroll log window.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Tracker:
 *   - Text for tracking quests.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Expand:
 *   - Text for expanding categories.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Collapse:
 *   - Text for collapsing categories.
 *   - Requires VisuMZ_0_CoreEngine!
 *
 * ---
 *
 * Scene_Quest > Icons
 * 
 *   Icon: Known:
 *   - Icon used for this command.
 * 
 *   Icon: Completed:
 *   - Icon used for this command.
 * 
 *   Icon: Failed:
 *   - Icon used for this command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quest Category Settings
 * ============================================================================
 *
 * Quest Categories separate the quest types in your game. These can be used to
 * help players differentiate which are story-driven quests, which are optional
 * quests, recurring quests, etc. These have limited settings, but serve as
 * containers for quests that fall under its category.
 *
 * ---
 *
 * Category
 * 
 *   Category Name:
 *   - This category's name.
 *   - You may use text codes.
 * 
 *   Quests:
 *   - A list of quests listed under this category.
 *   - Quests will be listed in the same order as this parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quest Settings
 * ============================================================================
 *
 * Each Quest Category will contain a list of quests that can appear in-game.
 * These individual quests make up the meat and bones of the Quest System and
 * will serve to relay information to the player on what he/she needs to do in
 * order to make progress in your game.
 *
 * ---
 *
 * Quest
 * 
 *   Quest ID Key:
 *   - This quest's identification key. Quests require unique keys for the
 *     plugin to differentiate them.
 *   - It is VERY important that you keep this key unique from other quests in
 *     order for the Quest System to operate properly in your game.
 *
 * ---
 *
 * Header
 * 
 *   Title:
 *   - The quest of the title. This is what appears in-game.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Title]] marker.
 * 
 *   Difficulty:
 *   - Difficulty level for this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Difficulty]] marker.
 * 
 *   From:
 *   - Insert the name of the one who issued this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[From]] marker.
 * 
 *   Location:
 *   - Insert location name where this quest was issued.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Location]] marker.
 * 
 *   Description:
 *   - Type out the description(s) used for this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Description]] marker.
 *   - The displayed description will depend on the Description ID set through
 *     Plugin Command.
 *   - If no Description ID is set through Plugin Commands, it will default to
 *     a default ID value of 1.
 *
 * ---
 *
 * Lists
 * 
 *   Objectives List:
 *   - The objectives to be completed for this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Objectives]] marker.
 *   - Depending on which ID's are set to visible, a list will created at the
 *     marker displaying each of the objectives.
 *    - This can be done thorugh the Visible Objectives parameter or through
 *      Plugin Commands.
 * 
 *   Visible Objectives:
 *   - The objectives that are visible from the start.
 * 
 *   Rewards List:
 *   - The reward list for this quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Rewards]] marker.
 *   - Depending on which ID's are set to visible, a list will created at the
 *     marker displaying each of the rewards.
 *    - This can be done thorugh the Visible Rewards parameter or through
 *      Plugin Commands.
 * 
 *   Visible Rewards:
 *   - The rewards that are visible from the start.
 *
 * ---
 *
 * Footer
 * 
 *   Subtext:
 *   - Subtext to be displayed with the quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Subtext]] marker.
 *   - The displayed description will depend on the Subtext ID set through
 *     Plugin Command.
 *   - If no Subtext ID is set through Plugin Commands, it will default to
 *     a default ID value of 1.
 * 
 *   Quotes:
 *   - Quotes to be displayed with the quest.
 *   - You may use text codes.
 *   - In Plugin Parameters => General => Vocab => Log Window => Quest Log,
 *     this will replace the [[Quote]] marker.
 *   - The displayed description will depend on the Quote ID set through
 *     Plugin Command.
 *   - If no Quote ID is set through Plugin Commands, it will default to
 *     a default ID value of 1.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: On Load:
 *   - Runs code upon loading the quest in Scene_Quest.
 *   - Useful for setting up variables.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quest Tracker Settings
 * ============================================================================
 *
 * The Quest Tracker Window is a window that appears on the map scene to
 * display the objectives (and other desired information) of the currently
 * tracked quest decided by the player.
 *
 * ---
 *
 * Options
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Add Show Tracker?:
 *   - Add the 'Show Tracker' option to the Options menu?
 * 
 *     Option Name:
 *     - Command name of the option.
 * 
 *   Add Position Tracker?:
 *   - Add the 'Position Tracker' option to the Options menu?
 * 
 *     Option Name:
 *     - Command name of the option.
 * 
 *     Option OFF:
 *     - Text displayed when the option is OFF.
 * 
 *     Option ON:
 *     - Text displayed when the option is ON.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Menu Settings
 * ============================================================================
 *
 * Set up the main menu defaults.
 *
 * ---
 *
 * Main Menu Settings
 * 
 *   Command Name:
 *   - Name of the 'Quest' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'Quest' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'Quest' option to the Main Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_Quest.
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
 * These settings let you control the various windows that appear in the
 * Scene_Quest menu and the Quest Tracker Window that appears in Scene_Map.
 *
 * ---
 *
 * Command Window
 * 
 *   Show Failed Quests?:
 *   - Show/hide Failed Quests in the command window.
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Quest Label
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Log Window
 * 
 *   PageUp/Down Speed:
 *   - Scroll speed for PageUp/Down.
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 * 
 *   EXPERIMENTAL:
 * 
 *     Automatic Word Wrap?:
 *     - Enables/disables automatic word wrap.
 *     - Requires VisuMZ_1_MessageCore!
 *     - This feature is experimental. Word Wrap does not worth perfectly
 *       with the Log Window, although it performs well enough. This feature
 *       will be updated and completed at a later point in the future. Use it
 *       at your own discretion.
 *
 * ---
 *
 * List Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Tracker Window
 * 
 *   Window Scale:
 *   - How much do you want to scale the Tracker Window's size by?
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * JavaScript Functions
 * ============================================================================
 *
 * These are some new JavaScript functions that you can use for the
 * 'JS: On Load' Plugin Parameter found in the Quest settings.
 *
 * Using these require you to have an adequate understanding of how JavaScript
 * works in order to successfully use it.
 *
 * ---
 *
 * $gameSystem.setQuestStatus(key, status)
 * - Changes the quest's completion status.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'status' with one of the following strings (include quotes):
 *   - 'known'
 *   - 'completed'
 *   - 'failed'
 *   - 'removed'
 *
 * Example: $gameSystem.setQuestStatus('exampleName', 'completed')
 *
 * ---
 *
 * $gameSystem.setQuestDescription(key, id)
 * - Changes the quest's description.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'id' with description ID to use.
 *
 * Example: $gameSystem.setQuestDescription('exampleName', 2)
 *
 * ---
 *
 * $gameSystem.setQuestObjectives(key, ids, status)
 * - Changes the quest's objectives.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'ids' with an array of ID's to use.
 * - Replace 'status' with one of the following strings (include quotes):
 *   - 'known'
 *   - 'completed'
 *   - 'failed'
 *   - 'removed'
 *
 * Example: $gameSystem.setQuestDescription('exampleName', [1, 2, 3], 'failed')
 *
 * ---
 *
 * $gameSystem.setQuestRewards(key, ids, status)
 * - Changes the quest's rewards.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'ids' with an array of ID's to use.
 * - Replace 'status' with one of the following strings (include quotes):
 *   - 'known'
 *   - 'claimed'
 *   - 'denied'
 *   - 'removed'
 *
 * Example: $gameSystem.setQuestRewards('exampleName', [1, 3, 5], 'claimed')
 *
 * ---
 *
 * $gameSystem.setQuestSubtext(key, id)
 * - Changes the quest's subtext.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'id' with subtext ID to use.
 *
 * Example: $gameSystem.questSubtext('exampleName', 3)
 *
 * ---
 *
 * $gameSystem.setQuestQuote(key, id)
 * - Changes the quest's quote.
 * - Replace 'key' with Quest Key (include quotes).
 * - Replace 'id' with quote ID to use.
 *
 * Example: $gameSystem.setQuestQuote('exampleName', 4)
 *
 * ---
 *
 * DISCLAIMER:
 *
 * Keep in mind that VisuStella is NOT responsible for your proficiency (or
 * otherwise) of JavaScript.
 *
 * If you get any errors with the custom code, it is up to YOU to fix it.
 * 
 * If you do not understand how any of this section works, do not be afraid.
 * It's not the end of the world.
 * 
 * You can still change the status of the quests and its objectives through the
 * usage of Plugin Commands.
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
 * * Bug Fixed!
 * ** Disabled track windows no longer appear on the screen for one frame after
 *    leaving a menu of any sort. Fix made by Yanfly.
 * ** Viewing the failed quests no longer crash the game. Fix made by Yanfly.
 * * Feature Update!
 * ** The following Plugin Commands will now automatically update the tracker
 *    if needed. Feature update by Yanfly.
 * *** Quest: Add/Complete/Fail/Remove
 * *** Quest: Description Change
 * *** Quest: Objectives Change
 * *** Quest: Quote Change
 * *** Quest: Rewards Change
 * *** Quest: Subtext Change
 *
 * Version 1.00: August 31, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestSet
 * @text Quest: Add/Complete/Fail/Remove
 * @desc Adds quest(s) to be known/completed/failed.
 * Or removes them.
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg Status:str
 * @text Status
 * @type select
 * @option Add to Known
 * @value known
 * @option Add to Completed
 * @value completed
 * @option Add to Failed
 * @value failed
 * @option Remove from All
 * @value remove
 * @desc Change the status to this.
 * @default known
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestDescription
 * @text Quest: Description Change
 * @desc Changes the description of the quest(s) to a ID.
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetID:eval
 * @text Description ID
 * @desc Change the description of the quest(s) to a different ID.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestObjectives
 * @text Quest: Objectives Change
 * @desc Changes the objective(s) status of the quest(s).
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetIDs:arrayeval
 * @text Objective ID(s)
 * @type string[]
 * @desc Select the objective ID(s) to change.
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Status:str
 * @text Status
 * @type select
 * @option Show Objective(s)
 * @value show
 * @option Complete Objective(s)
 * @value complete
 * @option Fail Objective(s)
 * @value fail
 * @option Remove Objective(s)
 * @value remove
 * @desc Change the status of the objective(s) to this.
 * @default show
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestQuote
 * @text Quest: Quote Change
 * @desc Changes the quote of the quest(s) to a ID.
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetID:eval
 * @text Quote ID
 * @desc Change the quote of the quest(s) to a different ID.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestRewards
 * @text Quest: Rewards Change
 * @desc Changes the reward(s) status of the quest(s).
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetIDs:arrayeval
 * @text Reward ID(s)
 * @type string[]
 * @desc Select the reward ID(s) to change.
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Status:str
 * @text Status
 * @type select
 * @option Show Reward(s)
 * @value show
 * @option Claim Reward(s)
 * @value claim
 * @option Deny Reward(s)
 * @value deny
 * @option Remove Reward(s)
 * @value remove
 * @desc Change the status of the reward(s) to this.
 * @default show
 *
 * @ --------------------------------------------------------------------------
 *
 * @command QuestSubtext
 * @text Quest: Subtext Change
 * @desc Changes the subtext of the quest(s) to a ID.
 *
 * @arg Keys:arraystr
 * @text Quest Keys
 * @type string[]
 * @desc Insert the quest key(s) here.
 * Each quest key must be unique.
 * @default []
 *
 * @arg TargetID:eval
 * @text Subtext ID
 * @desc Change the subtext of the quest(s) to a different ID.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TrackerChangeQuest
 * @text Tracker: Change Quest
 * @desc Changes the tracked quest.
 *
 * @arg Key:str
 * @text Quest Key
 * @desc Insert the quest key here.
 * @default Example
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TrackerRefreshWindow
 * @text Tracker: Refresh Window
 * @desc Refreshes the quest tracker window.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TrackerShowHide
 * @text Tracker: Show/Hide Window
 * @desc Can forcefully hide window.
 * Showing will depend on the player's Options setting.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Shows/hides the tracker window on the map.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemCallSceneQuest
 * @text System: Call Scene_Quest
 * @desc Opens Scene_Quest for the player.
 * Does not work in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableQuestMenu
 * @text System: Enable Quests in Menu?
 * @desc Enables/disables quest menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables quest menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowQuestMenu
 * @text System: Show Quests in Menu?
 * @desc Shows/hides quest menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides quest menu inside the main menu.
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
 * @param QuestSystem
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
 * @desc General settings for the Quest System.
 * @default {"StartingQuests":"","KnownQuests:arraystr":"[\"Welcome\",\"Example\",\"Plugin_Tutorial_Title\",\"Plugin_Tutorial_Difficulty\",\"Plugin_Tutorial_From\",\"Plugin_Tutorial_Description\",\"Plugin_Tutorial_Objectives\",\"Plugin_Tutorial_Rewards\",\"Plugin_Tutorial_Subtext\",\"Plugin_Tutorial_Quote\",\"Challenge_Plugin_Variables\",\"Challenge_Plugin_Switches\"]","CompletedQuests:arraystr":"[]","FailedQuests:arraystr":"[]","TrackedQuest:str":"Welcome","SceneQuest":"","Vocab":"","VocabCommandWindow":"","CommandWindow_Known_Text:str":"Available","CommandWindow_Completed_Text:str":"Completed","CommandWindow_Failed_Text:str":"Failed","VocabLabelWindow":"","EmptyTitleLabel:str":"\\i[186]Quest Journal","VocabListWindow":"","ListWindowCategoryOpenFmt:str":"- %1(%2)","ListWindowCategoryCloseFmt:str":"+ %1(%2)","NoQuestListed:str":"(No Quests Listed)","ListWindowTrackedQuest:str":"\\c[17]%1\\c[0]","VocabLogWindow":"","LogEmpty:json":"\"\\\\c[5]Main Quests\\\\c[0] are quests that must be\\ncompleted in order to progress further\\ninto the game's story.\\n\\n\\\\c[6]Side Quests\\\\c[0] are optional quests that can\\nbe completed at your discretion. Upon\\ncompleting a side quest, you can receive\\nuseful rewards that may assist you on\\nyour journey.\"","OnLoadQuestJS:func":"\"// Insert JavaScript code here.\"","LogFmt:json":"\"\\\\{[[Title]]\\\\}\\n\\\\c[4]Level:\\\\c[0] [[Difficulty]]\\n\\\\c[4]From:\\\\c[0] [[From]]\\n\\\\c[4]Location:\\\\c[0] [[Location]]\\n\\n\\\\c[4]Description:\\\\c[0]\\n[[Description]]\\n\\n\\\\c[4]Objectives:\\\\c[0]\\n[[Objectives]]\\n\\n\\\\c[4]Rewards:\\\\c[0]\\n[[Rewards]]\\n\\n[[Subtext]]\\n\\n[[Quote]]\"","Objective_Normal_Fmt:str":"◎%1","Objective_Completed_Fmt:str":"\\c[24]<ColorLock>✔%1</ColorLock>\\c[0]","Objective_Failed_Fmt:str":"\\c[25]<ColorLock>✘%1</ColorLock>\\c[0]","Reward_Normal_Fmt:str":"◎%1","Reward_Completed_Fmt:str":"\\c[24]<ColorLock>✔%1</ColorLock>\\c[0]","Reward_Failed_Fmt:str":"\\c[25]<ColorLock>✘%1</ColorLock>\\c[0]","ButtonAssistWindow":"","ButtonAssistPageUpDown:str":"Scroll Up/Down","questButtonAssistActive:str":"Track","ButtonAssistExpand:str":"Expand","ButtonAssistCollapse:str":"Collapse","CommandWindowIcons":"","CommandWindow_Known_Icon:num":"193","CommandWindow_Completed_Icon:num":"192","CommandWindow_Failed_Icon:num":"194"}
 *
 * @param Categories:arraystruct
 * @text Quest Categories
 * @type struct<Category>[]
 * @desc A list of categories and their quests.
 * @default ["{\"CategoryName:str\":\"\\\\C[5]Main Quests\",\"Quests:arraystruct\":\"[\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Welcome\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Welcome Quest\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Thank you for using the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest System\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nplugin made by \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]VisuStella MZ\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nThis is an example quest to demonstrate\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nhow the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest System\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] works. It functions\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nprimarily as a log book for the various\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nadventures inside your game.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Take a look at the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] menu.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]tracked quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to something else.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[186]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest System\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] for your game!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[84]Helping support \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]VisuStella\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Example\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[87]Example Quest\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"This is where the quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ngoes. Type in whatever text you need\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nhere in order to explain to the player\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nabout the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Describe each of the quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nhere for the player.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can have multiple quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nout at once.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"If you do, make sure you have the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Visible Objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] list the ID's of\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthe objectives you want visible from\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthe very beginning.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Here, you can list all the rewards the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ngame will give the player upon the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncompletion of the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can list the rewards however you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nlike, but do keep it concise.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can list multiple rewards, too.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"If you do, make sure you have the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Visible Rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] list the ID's of the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nrewards you want visible from the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nvery beginning.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"This is a \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]. It is used as extra\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ntext that you may want to place on your\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nquest journal that differs from the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"We learn by example and by direct\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nexperience because there are real limits\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nto the adequacy of verbal instruction.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Malcolm Gladwell\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}","{\"CategoryName:str\":\"\\\\c[6]Side Quests\",\"Quests:arraystruct\":\"[\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Title\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Titles\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"The quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]title\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is listed in three\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ndifferent places in the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest Scene\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n1. The top of the screen.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n2. The top of the quest log entry.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n3. The quest list on the side.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nBe sure to put some thought in deciding\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nyour titles as they are there to convey\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nwhat the quest is all about.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change the title through the quest's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Title\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Title\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can use icons in the quest title by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[x]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] text code. Keep in mind\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthat the icon will be removed from the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nquest log entry.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A good title is the title of a\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsuccessful book.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Raymond Chandler\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Difficulty\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Difficulty\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]difficulty\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] can be used to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nconvey what kinds of expectations they\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nshould have regarding challenge.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nThese can range from star ratings like:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[87]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[87]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[88]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[88]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[88]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nto\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nLevel ranges like:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[24]Level 20+\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change the difficulty through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nquest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Difficulty\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Difficulty\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A quest's difficulty is often used to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nrelay the expected level of conflict a\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nplayer may face.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A pessimist sees the difficulty in\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nevery opportunity; an optimist sees the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nopportunity in every difficulty.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Winston Churchill\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_From\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]From\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Easy\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Explaining which \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]NPC\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] the quest is from\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncan help remind the player its origin\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nand also help save the player some time\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nin trying to find that \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]NPC\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] again when\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ngoing to claim the quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"from\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\" text through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nquest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]From\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]From\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Use the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest System\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] as a means to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nstreamline your player's experience.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"More important than the quest for\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncertainty is the quest for clarity.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Francois Gautier\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Description\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Descriptions\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Insert the quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] here.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nThe displayed \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] will\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ndepend on the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Description ID\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] that is\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncurrently active for the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"This is the updated quest description. This\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncan only be seen when it is Description ID #2.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the Description ID by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Description Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Try changing it to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] see what it becomes.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Description Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Descriptions are valuable tools that can\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nbe used to help remind the player the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\npurpose of the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Description begins in the writer's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nimagination but should finish in the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nreader's.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Stephen King\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Objectives\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Objectives\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium-Hard\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] are used to streamline\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthe goals the player needs to achieve in\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\norder to make progress.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the status of each\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest Objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Known\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0], \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[24]Completed\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nor \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[25]Failed\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can also \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]remove\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] objectives from\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nbeing viewed.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can determine the default \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nobjectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Visible\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nObjectives \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can reveal new \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthrough the use of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Objectives Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]The following are examples:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Known Objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Completed Objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Failed Objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"6\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Objectives Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Treat \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] like a set of\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ninstructions or outline for the player\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nto follow in order to get the desired\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nresult both of you want.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"People with objectives succeed because\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthey know where they're going.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Earl Nightingale\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\\nconst key = 'Plugin_Tutorial_Objectives';\\\\\\\\\\\\\\\\n$gameSystem.setQuestObjectives(key, [5], 'show');\\\\\\\\\\\\\\\\n$gameSystem.setQuestObjectives(key, [6], 'complete');\\\\\\\\\\\\\\\\n$gameSystem.setQuestObjectives(key, [7], 'fail');\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Rewards\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Rewards\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium-Hard\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] are the goodies that are\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\npromised to be given to the player upon\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthe completion of the quest.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the status of each\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quest Reward\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Known\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0], \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[24]Claimed\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nor \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[25]Denied\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can also \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]remove\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] rewardsfrom\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nbeing viewed.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can determine the default \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nrewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Visible\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nRewards \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Rewards Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can reveal new \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quest rewards\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthrough the use of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Rewards Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]The following are examples:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Known Reward\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Claimed Reward\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Denied Reward\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"6\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Rewards are incentives for the player to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncomplete them, especially quests of\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nhigher difficulty levels.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Reward the behavior you want repeated.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Larry Winget\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\\nconst key = 'Plugin_Tutorial_Rewards';\\\\\\\\\\\\\\\\n$gameSystem.setQuestRewards(key, [4], 'show');\\\\\\\\\\\\\\\\n$gameSystem.setQuestRewards(key, [5], 'claim');\\\\\\\\\\\\\\\\n$gameSystem.setQuestRewards(key, [6], 'deny');\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Subtext\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Subtexts\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"The \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] section can be used in a\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nnumber of ways, from hints to summaries,\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nto warnings.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nAnd like the quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0], you can\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nchange the text displayed in the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthrough changing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Subtext ID\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the Subtext ID by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Subtext Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Try changing it to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] see what it becomes.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Subtext Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Subtexts\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] can serve as hints, summaries,\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nwarnings, reminders, you name it.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"After all, reminding a player to do\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsomething only means you want them to\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsucceed at it.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"A discerning eye needs only a hint, and\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nunderstatement leaves the imagination\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nfree to build its own elaborations.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Russell Page\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Plugin_Tutorial_Quote\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[193]Quotes\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Medium\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quotes\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] can be used to reference specific\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nlines of dialogue that could help the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nplayer understand what's needed to be\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ndone.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nOr they could just be \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quotes\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] made by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\njust about anyone.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nAnd like quest \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]descriptions and quest\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]subtexts\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0], the quest quotes can also be\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nchanged to display something else based\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\non the quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Quote ID\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You can change the Quote ID by\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusing the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Quote Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Try changing it to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] see what it becomes.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Subtext\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Mastery of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Command\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]Quest: Subtext Change\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"How you want to use them is up to you.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"You miss 100% of the shots you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ndon't take.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Micahel Scott\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"If at first you don't succeed, then\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nskydiving definitely isn't for you.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n~Steven Wright\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}","{\"CategoryName:str\":\"\\\\c[2]Challenge Quests\",\"Quests:arraystruct\":\"[\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Challenge_Plugin_Variables\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[5]Variables\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Hard\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Using the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nyou can run \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] code prior to the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncreation of the text written here.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIn this example, game variables are set\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nup to automatically equal the number of\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nof the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]first item\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] in the inventory.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nThe \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objective\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] will automatically set\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nitself to completed if the variable's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nvalue is determined to be over 10.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Obtain \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\v[1]/10x First Database Item!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Knowledge for \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[2]DISCLAIMER:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nKeep in mind that \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]VisuStella\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is NOT\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nresponsible for your proficiency (or\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\notherwise) of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIf you get any errors with the custom\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncode, it is up to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to fix it.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIf you do not understand how any of this\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsection works, do not be afraid. It's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nnot the end of the world.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nYou can still change the status of the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quests\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] and its \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusage of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Commands\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\\nconst value = $gameParty.numItems($dataItems[1])\\\\\\\\\\\\\\\\nconst status = value >= 10 ? 'completed' : 'known';\\\\\\\\\\\\\\\\nconst key = 'Challenge_Plugin_Variables';\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\n$gameVariables.setValue(1, value);\\\\\\\\\\\\\\\\n$gameSystem.setQuestObjectives(key, [1], status)\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Key:str\\\\\\\":\\\\\\\"Challenge_Plugin_Switches\\\\\\\",\\\\\\\"Header\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Title:str\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\\i[5]Switches\\\\\\\",\\\\\\\"Difficulty:str\\\\\\\":\\\\\\\"Hard\\\\\\\",\\\\\\\"From:str\\\\\\\":\\\\\\\"VisuStella\\\\\\\",\\\\\\\"Location:str\\\\\\\":\\\\\\\"RPG Maker MZ\\\\\\\",\\\\\\\"Description:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Using the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nyou can run \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] code prior to the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncreation of the text written here.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIn this example, game switch 1's ON/OFF\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nstatus will determine which description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthis quest will use.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nGame Switch 1 is now \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[25]OFF\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nDescription ID \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]1\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is being used.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Using the \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0],\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nyou can run \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] code prior to the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncreation of the text written here.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIn this example, game switch 1's ON/OFF\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nstatus will determine which description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nthis quest will use.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nGame Switch 1 is now \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[24]ON\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nDescription ID \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]2\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is being used.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Lists\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Objectives:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Change Switch 1's ON/OFF status.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"View this quest's \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]description\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleObjectives:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Rewards:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\i[79]Knowledge for \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[6]JS: On Load\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Parameter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"VisibleRewards:arraynum\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Footer\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Subtext:arrayjson\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[2]DISCLAIMER:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nKeep in mind that \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]VisuStella\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] is NOT\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nresponsible for your proficiency (or\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\notherwise) of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]JavaScript\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIf you get any errors with the custom\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ncode, it is up to \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]you\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] to fix it.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nIf you do not understand how any of this\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nsection works, do not be afraid. It's\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nnot the end of the world.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nYou can still change the status of the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]quests\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] and its \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]objectives\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0] through the\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\nusage of \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[4]Plugin Commands\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\c[0].\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"Quotes:arrayjson\\\\\\\":\\\\\\\"[]\\\\\\\",\\\\\\\"JavaScript\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"OnLoadQuestJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"// Insert JavaScript code here.\\\\\\\\\\\\\\\\nconst key = 'Challenge_Plugin_Switches';\\\\\\\\\\\\\\\\nconst id = $gameSwitches.value(1) ? 2 : 1;\\\\\\\\\\\\\\\\n\\\\\\\\\\\\\\\\n$gameSystem.setQuestDescription(key, id)\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\"}"]
 *
 * @param Tracker:struct
 * @text Quest Tracker Settings
 * @type struct<Tracker>
 * @desc Setup how all the quest tracker works.
 * @default {"Options":"","AdjustRect:eval":"true","AddShowOption:eval":"true","ShowName:str":"Show Quest Tracker","AddPositionOption:eval":"true","PositionName:str":"Quest Tracker Position","PositionOff:str":"←","PositionOn:str":"→"}
 *
 * @param MainMenu:struct
 * @text Main Menu Settings
 * @type struct<MainMenu>
 * @desc Set up the main menu defaults.
 * @default {"Name:str":"Quest","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_Quest.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Setup how all the windows appear in-game.
 * @default {"CommandWindow":"","ShowFailed:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CommandWindow_BgType:num":"0","CommandWindow_Rect:func":"\"const ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(Window_QuestCommand.prototype.totalCommands(), true);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","QuestLabel":"","QuestLabel_BgType:num":"0","QuestLabel_Rect:func":"\"const ww = Graphics.boxWidth - this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(1, false);\\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","LogWindow":"","LogWindow_Auto_WordWrap:eval":"false","LogWindow_ScrollSpeed:num":"0.20","LogWindow_BgType:num":"0","LogWindow_Rect:func":"\"const ww = Graphics.boxWidth - this.mainCommandWidth();\\nconst wh = this.mainAreaHeight() - this.questLabelWindowRect().height;\\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\\nconst wy = this.mainAreaTop() + this.questLabelWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","ListWindow":"","ListWindow_BgType:num":"0","ListWindow_Rect:func":"\"const ww = this.mainCommandWidth();\\nconst wh = this.mainAreaHeight() - this.commandWindowRect().height;\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nconst wy = this.mainAreaTop() + this.commandWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","TrackerWindow":"","TrackerWindow_Scale:num":"0.50","TrackerWindow_BgType:num":"0","TrackerWindow_Rect:func":"\"const ww = 560;\\nconst wh = Graphics.height / Window_QuestTracker.scale;\\nconst wx = this.questTrackerOnRight() ? Graphics.width - Math.ceil(ww * Window_QuestTracker.scale) : 0;\\nconst wy = this.buttonAreaHeight() + 8;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
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
 * @param StartingQuests
 * @text Starting Quests
 *
 * @param KnownQuests:arraystr
 * @text Known Quests
 * @parent StartingQuests
 * @type string[]
 * @desc Which quests are known at the start of the game?
 * Insert their keys here.
 * @default ["Welcome","Example","Plugin_Tutorial_Title","Plugin_Tutorial_Difficulty","Plugin_Tutorial_From","Plugin_Tutorial_Description","Plugin_Tutorial_Objectives","Plugin_Tutorial_Rewards","Plugin_Tutorial_Subtext","Plugin_Tutorial_Quote","Challenge_Plugin_Variables","Challenge_Plugin_Switches"]
 *
 * @param CompletedQuests:arraystr
 * @text Completed Quests
 * @parent StartingQuests
 * @type string[]
 * @desc Which quests are completed at the start of the game?
 * Insert their keys here.
 * @default []
 *
 * @param FailedQuests:arraystr
 * @text Failed Quests
 * @parent StartingQuests
 * @type string[]
 * @desc Which quests are failed at the start of the game?
 * Insert their keys here.
 * @default []
 *
 * @param TrackedQuest:str
 * @text Tracked Quest
 * @parent StartingQuests
 * @desc Which quest is tracked at the start of the game?
 * @default Welcome
 *
 * @param SceneQuest
 * @text Scene_Quest
 *
 * @param Vocab
 * @parent SceneQuest
 *
 * @param VocabCommandWindow
 * @text Command Window
 * @parent Vocab
 *
 * @param CommandWindow_Known_Text:str
 * @text Command: Known
 * @parent VocabCommandWindow
 * @desc Text used to display known quests.
 * @default Available
 *
 * @param CommandWindow_Completed_Text:str
 * @text Command: Completed
 * @parent VocabCommandWindow
 * @desc Text used to display completed quests.
 * @default Completed
 *
 * @param CommandWindow_Failed_Text:str
 * @text Command: Failed
 * @parent VocabCommandWindow
 * @desc Text used to display failed quests.
 * @default Failed
 *
 * @param VocabLabelWindow
 * @text Label Window
 * @parent Vocab
 *
 * @param EmptyTitleLabel:str
 * @text Empty Title
 * @parent VocabLabelWindow
 * @desc Text displayed in the Label Window when no quest is selected.
 * @default \i[186]Quest Journal
 *
 * @param VocabListWindow
 * @text List Window
 * @parent Vocab
 *
 * @param ListWindowCategoryOpenFmt:str
 * @text Open Categories
 * @parent VocabListWindow
 * @desc Text format for an open category.
 * %1 - Category Name, %2 - Quest Amount
 * @default - %1(%2)
 *
 * @param ListWindowCategoryCloseFmt:str
 * @text Closed Categories
 * @parent VocabListWindow
 * @desc Text format for a closed category.
 * %1 - Category Name, %2 - Quest Amount
 * @default + %1(%2)
 *
 * @param NoQuestListed:str
 * @text No Quest Listed
 * @parent VocabListWindow
 * @desc Text when no quest is listed.
 * @default (No Quests Listed)
 *
 * @param ListWindowTrackedQuest:str
 * @text Tracked Quest
 * @parent VocabListWindow
 * @desc Text format for a tracked quest.
 * %1 - Tracked Quest's Name
 * @default \c[17]%1\c[0]
 *
 * @param VocabLogWindow
 * @text Log Window
 * @parent Vocab
 *
 * @param LogEmpty:json
 * @text Empty Message
 * @parent VocabLogWindow
 * @type note
 * @desc Text displayed when no quest is selected.
 * @default "\\c[5]Main Quests\\c[0] are quests that must be\ncompleted in order to progress further\ninto the game's story.\n\n\\c[6]Side Quests\\c[0] are optional quests that can\nbe completed at your discretion. Upon\ncompleting a side quest, you can receive\nuseful rewards that may assist you on\nyour journey."
 *
 * @param OnLoadQuestJS:func
 * @text JS: On Load
 * @parent LogEmpty:json
 * @type note
 * @desc Runs code upon making the empty message.
 * Useful for setting up variables.
 * @default "// Insert JavaScript code here."
 *
 * @param LogFmt:json
 * @text Quest Log
 * @parent VocabLogWindow
 * @type note
 * @desc Text format for Quest Log Window.
 * Read help file for instructions.
 * @default "\\{[[Title]]\\}\n\\c[4]Level:\\c[0] [[Difficulty]]\n\\c[4]From:\\c[0] [[From]]\n\\c[4]Location:\\c[0] [[Location]]\n\n\\c[4]Description:\\c[0]\n[[Description]]\n\n\\c[4]Objectives:\\c[0]\n[[Objectives]]\n\n\\c[4]Rewards:\\c[0]\n[[Rewards]]\n\n[[Subtext]]\n\n[[Quote]]"
 *
 * @param Objective_Normal_Fmt:str
 * @text Objective (Known)
 * @parent LogFmt:json
 * @desc Text format for known objectives.
 * %1 - Objective Text
 * @default ◎%1
 *
 * @param Objective_Completed_Fmt:str
 * @text Objective (Done)
 * @parent LogFmt:json
 * @desc Text format for complete objectives.
 * %1 - Objective Text
 * @default \c[24]<ColorLock>✔%1</ColorLock>\c[0]
 *
 * @param Objective_Failed_Fmt:str
 * @text Objective (Failed)
 * @parent LogFmt:json
 * @desc Text format for failed objectives.
 * %1 - Objective Text
 * @default \c[25]<ColorLock>✘%1</ColorLock>\c[0]
 *
 * @param Reward_Normal_Fmt:str
 * @text Reward (Known)
 * @parent LogFmt:json
 * @desc Text format for normal rewards.
 * %1 - Reward Text
 * @default ◎%1
 *
 * @param Reward_Completed_Fmt:str
 * @text Reward (Claimed)
 * @parent LogFmt:json
 * @desc Text format for claimed rewards.
 * %1 - Reward Text
 * @default \c[24]<ColorLock>✔%1</ColorLock>\c[0]
 *
 * @param Reward_Failed_Fmt:str
 * @text Reward (Denied)
 * @parent LogFmt:json
 * @desc Text format for denied rewards.
 * %1 - Reward Text
 * @default \c[25]<ColorLock>✘%1</ColorLock>\c[0]
 *
 * @param ButtonAssistWindow
 * @text Button Assist Window
 * @parent Vocab
 *
 * @param ButtonAssistPageUpDown:str
 * @text Scroll Up/Down
 * @parent ButtonAssistWindow
 * @desc Text for Page Up/Down to scroll log window.
 * Requires VisuMZ_0_CoreEngine!
 * @default Scroll Up/Down
 *
 * @param questButtonAssistActive:str
 * @text Tracker
 * @parent ButtonAssistWindow
 * @desc Text for tracking quests.
 * Requires VisuMZ_0_CoreEngine!
 * @default Track
 *
 * @param ButtonAssistExpand:str
 * @text Expand
 * @parent ButtonAssistWindow
 * @desc Text for expanding categories.
 * Requires VisuMZ_0_CoreEngine!
 * @default Expand
 *
 * @param ButtonAssistCollapse:str
 * @text Collapse
 * @parent ButtonAssistWindow
 * @desc Text for collapsing categories.
 * Requires VisuMZ_0_CoreEngine!
 * @default Collapse
 *
 * @param CommandWindowIcons
 * @text Icons
 * @parent SceneQuest
 *
 * @param CommandWindow_Known_Icon:num
 * @text Icon: Known
 * @parent CommandWindowIcons
 * @desc Icon used for this command.
 * @default 193
 *
 * @param CommandWindow_Completed_Icon:num
 * @text Icon: Completed
 * @parent CommandWindowIcons
 * @desc Icon used for this command.
 * @default 192
 *
 * @param CommandWindow_Failed_Icon:num
 * @text Icon: Failed
 * @parent CommandWindowIcons
 * @desc Icon used for this command.
 * @default 194
 *
 */
/* ----------------------------------------------------------------------------
 * Quest Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param CategoryName:str
 * @text Category Name
 * @desc This category's name.
 * You may use text codes.
 * @default Untitled
 *
 * @param Quests:arraystruct
 * @text Quests
 * @type struct<Quest>[]
 * @desc A list of quests listed under this category.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Individual Quest Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Quest:
 *
 * @param Key:str
 * @text Quest ID Key
 * @desc This quest's identification key. Quests require
 * unique keys for the plugin to differentiate them.
 * @default (Needs Key)
 *
 * @param Header
 *
 * @param Title:str
 * @text Title
 * @parent Header
 * @desc The quest of the title. This is what appears in-game.
 * You may use text codes.
 * @default \i[87]Untitled Quest
 *
 * @param Difficulty:str
 * @text Difficulty
 * @parent Header
 * @desc Difficulty level for this quest.
 * You may use text codes.
 * @default Easy Peasy
 *
 * @param From:str
 * @text From
 * @parent Header
 * @desc Insert the name of the one who issued this quest.
 * You may use text codes.
 * @default NPC Name
 *
 * @param Location:str
 * @text Location
 * @parent Header
 * @desc Insert location name where this quest was issued.
 * You may use text codes.
 * @default Location Name
 *
 * @param Description:arrayjson
 * @text Description
 * @parent Header
 * @type note[]
 * @desc Type out the description(s) used for this quest.
 * You may use text codes.
 * @default ["\"This is the \\\\c[4]default\\\\c[0] quest description.\"","\"This is the \\\\c[4]default\\\\c[0] quest description.\\n\\nYou can insert multiple description entries in case you\\never want to update the quest description midway while the\\nquest is in progress.\""]
 *
 * @param Lists
 *
 * @param Objectives:arrayjson
 * @text Objectives List
 * @parent Lists
 * @type note[]
 * @desc The objectives to be completed for this quest.
 * You may use text codes.
 * @default ["\"\\\\c[4]First\\\\c[0] objective to be cleared.\"","\"\\\\c[4]Second\\\\c[0] objective, but it's hidden.\"","\"To make other objectives appear,\\nenable them through the \\\\c[4]'Visible\\nObjectives'\\\\c[0] plugin parameter or by\\nusing a plugin command to make\\nthem appear\""]
 *
 * @param VisibleObjectives:arraynum
 * @text Visible Objectives
 * @parent Objectives:arrayjson
 * @type number[]
 * @min 1
 * @desc The objectives that are visible from the start.
 * @default ["1"]
 *
 * @param Rewards:arrayjson
 * @text Rewards List
 * @parent Lists
 * @type note[]
 * @desc The reward list for this quest.
 * You may use text codes.
 * @default ["\"\\\\i[176]Potion x5\"","\"\\\\i[178]Ether x3\"","\"To make other rewards appear,\\nenable them through the \\\\c[4]'Visible\\nRewards'\\\\c[0] plugin parameter or by\\nusing a plugin command to make\\nthem appear\""]
 *
 * @param VisibleRewards:arraynum
 * @text Visible Rewards
 * @parent Rewards:arrayjson
 * @type number[]
 * @min 1
 * @desc The rewards that are visible from the start.
 * @default ["1"]
 *
 * @param Footer
 *
 * @param Subtext:arrayjson
 * @text Subtext
 * @parent Footer
 * @type note[]
 * @desc Subtext to be displayed with the quest.
 * You may use text codes.
 * @default ["\"\"","\"This is a \\\\c[4]subtext\\\\c[0]. It is used as extra\\ntext that you may want to place on your\\nquest journal that differs from the\\n\\\\c[4]description\\\\c[0].\""]
 *
 * @param Quotes:arrayjson
 * @text Quotes
 * @parent Footer
 * @type note[]
 * @desc Quotes to be displayed with the quest.
 * You may use text codes.
 * @default ["\"\"","\"Insert the quotes of NPC's here.\""]
 *
 * @param JavaScript
 *
 * @param OnLoadQuestJS:func
 * @text JS: On Load
 * @parent JavaScript
 * @type note
 * @desc Runs code upon loading the quest in Scene_Quest.
 * Useful for setting up variables.
 * @default "// Insert JavaScript code here."
 *
 */
/* ----------------------------------------------------------------------------
 * Quest Tracker Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Tracker:
 *
 * @param Options
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param AddShowOption:eval
 * @text Add Show Tracker?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Tracker' option to the Options menu?
 * @default true
 *
 * @param ShowName:str
 * @text Option Name
 * @parent AddShowOption:eval
 * @desc Command name of the option.
 * @default Show Quest Tracker
 *
 * @param AddPositionOption:eval
 * @text Add Position Tracker?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Position Tracker' option to the Options menu?
 * @default true
 *
 * @param PositionName:str
 * @text Option Name
 * @parent AddPositionOption:eval
 * @desc Command name of the option.
 * @default Quest Tracker Position
 *
 * @param PositionOff:str
 * @text Option OFF
 * @parent AddPositionOption:eval
 * @desc Text displayed when the option is OFF.
 * @default ←
 *
 * @param PositionOn:str
 * @text Option ON
 * @parent AddPositionOption:eval
 * @desc Text displayed when the option is ON.
 * @default →
 *
 */
/* ----------------------------------------------------------------------------
 * MainMenu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Quest' option in the Main Menu.
 * @default Quest
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Quest' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Quest' option to the Main Menu by default?
 * @default true
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
 * @param CommandWindow
 * @text Command Window
 *
 * @param ShowFailed:eval
 * @text Show Failed Quests?
 * @parent CommandWindow
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show/hide Failed Quests in the command window.
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent CommandWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent CommandWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CommandWindow_BgType:num
 * @text Background Type
 * @parent CommandWindow
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
 * @param CommandWindow_Rect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(Window_QuestCommand.prototype.totalCommands(), true);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param QuestLabel
 * @text Quest Label
 *
 * @param QuestLabel_BgType:num
 * @text Background Type
 * @parent QuestLabel
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
 * @param QuestLabel_Rect:func
 * @text JS: X, Y, W, H
 * @parent QuestLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this.mainCommandWidth();\nconst wh = this.calcWindowHeight(1, false);\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param LogWindow
 * @text Log Window
 *
 * @param LogWindow_ScrollSpeed:num
 * @text PageUp/Down Speed
 * @parent LogWindow
 * @desc Scroll speed for PageUp/Down.
 * @default 0.20
 *
 * @param LogWindow_BgType:num
 * @text Background Type
 * @parent LogWindow
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
 * @param LogWindow_Rect:func
 * @text JS: X, Y, W, H
 * @parent LogWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this.mainCommandWidth();\nconst wh = this.mainAreaHeight() - this.questLabelWindowRect().height;\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\nconst wy = this.mainAreaTop() + this.questLabelWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param LogWindowExperimental
 * @text EXPERIMENTAL
 * @parent LogWindow
 *
 * @param LogWindow_Auto_WordWrap:eval
 * @text Automatic Word Wrap?
 * @parent LogWindowExperimental
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables automatic word wrap.
 * Requires VisuMZ_1_MessageCore!
 * @default false
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindow_BgType:num
 * @text Background Type
 * @parent ListWindow
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
 * @param ListWindow_Rect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this.mainCommandWidth();\nconst wh = this.mainAreaHeight() - this.commandWindowRect().height;\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nconst wy = this.mainAreaTop() + this.commandWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param TrackerWindow
 * @text Tracker Window
 *
 * @param TrackerWindow_Scale:num
 * @text Window Scale
 * @parent TrackerWindow
 * @desc How much do you want to scale the Tracker Window's size by?
 * @default 0.50
 *
 * @param TrackerWindow_BgType:num
 * @text Background Type
 * @parent TrackerWindow
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
 * @param TrackerWindow_Rect:func
 * @text JS: X, Y, W, H
 * @parent TrackerWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = 560;\nconst wh = Graphics.height / Window_QuestTracker.scale;\nconst wx = this.questTrackerOnRight() ? Graphics.width - Math.ceil(ww * Window_QuestTracker.scale) : 0;\nconst wy = this.buttonAreaHeight() + 8;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

const _0x1a9e=['ButtonAssistPageUpDown','questCategoryClosedFmt','ButtonAssistExpand','isCategoryOpen','OnLoadQuestJS','nLoDC','isQuestTrackerVisible','updateDelayRefresh','Scene_Menu_createCommandWindow','smoothScrollDown','VisibleObjectives','initQuestSystem','TrackerWindow_Rect','rhiFG','_scrollBaseX','Game_System_initialize','STR','inBattle','_questTrackerWindow','CmdTextAlign','XtzjQ','join','clear','Subtext','setQuestForQuestTrackerWindow','itemLineRect','applyWordWrapEntry','unshift','uiMenuStyle','addChild','process_VisuMZ_QuestSystem_Notetags','General','TrackedQuest','_categoryStatus','createQuestTrackerWindow','fail','iVLdM','createQuestRewards','concat','bitmap','DjVbP','ipZoD','drawItemStyleIcon','buttonAssistText4','setListWindow','questDescription','QuestRewards','getEmptyLogFmt','isPressed','_labelWindow','registerCommand','<WORDWRAP>%1','Keys','contentsHeight','questTrackerPosOff','TrackerWindow_BgType','isquestMenuShown','isQuestKnown','questButtonAssistPageUpDn','makeQuestList','HAkzC','xXoPH','TargetID','ObQYk','_categoryFilter','setQuestTrackerVisible','ListWindow_BgType','setLogWindow','opacity','BgFilename2','LineBreakSpace','QuestDescription','auto','objectivesFailed','ListWindowTrackedQuest','helpAreaHeight','setHandler','OVwRt','questObjectivesFailed','QuestLabel_Rect','addQuestSystemquestTrackerPositionCommand','_commandNameWindow','updateOpacity','SzZnY','wQGNg','_scrollY','FUNC','prototype','questKnownCmd','TrackerChangeQuest','addQuestSystemquestTrackerShowCommand','addOriginalCommands','questsKnown','questListWindowRect','CommandWindow_Rect','drawItemStyleIconText','process_VisuMZ_QuestSystem_Data','left','name','ListWindow_Rect','pagedown','quest','Window','adjustSprite','callUpdateHelp','CommandWindow_Completed_Icon','doesCategoryHaveQuestsAvailable','textSizeEx','index','ConfigManager_applyData','Rewards','QuestData','push','createCommandNameWindow','SystemCallSceneQuest','rjHce','AddShowOption','AdjustRect','Name','onListQuest','questCompletedCmd','PositionOn','addKnownQuestsCommand','deselect','questRewardsDenied','cancel','Settings','createQuestLogWindow','questButtonAssistExpand','ConfigManager_makeData','resetFontSettings','questRewardsClaimed','MainMenu','setQuestSubtext','addQuestCommandAutomatically','addGeneralOptions','commandStyleCheck','createQuestText','createQuestLabelWindow','questEmptyText','setQuestQuote','height','ButtonAssistCollapse','\x5cI[%1]%2','questLogWindowRect','CommandWindow_Known_Text','map','LogWindow_ScrollSpeed','replace','Game_Map_requestRefresh','_quests','requestRefresh','overallHeight','removed','ShowMainMenu','isQuestCommandEnabled','_textHeight','setQuestStatus','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','VisibleRewards','sort','isOkEnabled','paint','WrapBreak[0]','Title','origin','_scrollX','isCommandEnabled','rewardsClaimed','createQuestDescription','constructor','totalCommands','denied','_backSprite1','isQuestCommandVisible','createSpriteset','questTrackerOnRight','filter','questFailedIcon','innerWidth','tracked','questLogFmt','QWqjP','SystemShowQuestMenu','max','failed','mainCommandWidth','questRewards','questButtonAssistCollapse','boxWidth','finalizeWordWrapSupport','questRewardsClaimedFmt','Scene_Boot_onDatabaseLoaded','setTrackedQuest','description','status','QuestOrder','qsFbf','questTrackerShow','showTracker','ZOugK','refreshQuestTrackerWindow','ARRAYSTR','loadTitle2','createEmptyText','LogWindow_Auto_WordWrap','VisuMZ_1_MessageCore','setQuestObjectives','setQuestRewards','itemPadding','ARRAYSTRUCT','Description','trackedQuest','isRightInputMode','BgSettings','setQuest','drawText','Objective_Completed_Fmt','createQuestListWindow','center','toUpperCase','questLabelWindowRect','Window_MenuCommand_addOriginalCommands','Scene_Map_createSpriteset','AYhcF','convertLineBreaksForWordWrap','createCommandWindow','_logWindow','addQuestCommand','addCommand','LogEmpty','EnableMainMenu','active','_list','scrollBlockHeight','QuestSubtext','claimed','currentQuest','Reward_Normal_Fmt','onDatabaseLoaded','EVAL','trim','getTotalCategoryQuests','questCompletedIcon','joinQuestEntries','CompletedQuests','NUM','questObjectiveFailedFmt','QuestSystem','popScene','_quest','rewards','itemTextAlign','makeDeepCopy','questCategoryOpenedFmt','baseTextRect','initialize','UZsoU','maxCommands','BgFilename1','noQuestsListed','scale','TJRcr','Quests','match','updateCommandNameWindow','Scene_Options_maxCommands','Window_Options_statusText','length','uiInputPosition','version','processWheelScroll','width','addLoadListener','BozYw','opacityLevel','questKnownIcon','Location','text','CmdStyle','makeCommandList','claim','commandName','wordWrapSupport','rewardsDenied','TargetIDs','createCustomBackgroundImages','addCompletedQuestsCommand','ListWindowCategoryOpenFmt','cursorPagedown','_scene','questSubtext','scaleSprite','ARRAYFUNC','questTrackerFmt','create','ShowName','questButtonAssistActive','commandStyle','drawIcon','format','<BR>','questObjectiveClearedFmt','CategoryName','yvkbE','createBackground','_listWindow','BtMuz','createContents','known','isBusy','categoryList','axgAW','subtext','KJGqB','KhxGp','TrackerRefreshWindow','LxdDL','activeBgType','IkXsi','remove','onListCancel','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','round','TrackerWindow_Scale','openCloseCurrentCategory','Key','QuestQuote','applyWordWrap','exit','OvWvN','smoothSelect','isFailedQuestsVisible','currentCategory','MessageCore','BgzeK','getConfigValue','isKnownQuestsEnabled','activate','onCommandOk','commandNameWindowCenter','changePaintOpacity','PositionOff','CommandWindow_BgType','Window_Options_addGeneralOptions','objectives','updateLogWindow','NoQuestListed','FailedQuests','statusText','update','setBackgroundType','completed','drawItem','ConvertParams','updateOrigin','EapMj','addQuestSystemCommands','HQndM','contents','GlVqa','PuhZp','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Enable','WNzpP','commandQuest','questTrackerPosOn','questTrackedQuestFmt','iconText','questTrackerPosition','refresh','shown','ZYyvS','icon','applyData','commandNameWindowDrawBackground','AddPositionOption','isFailedQuestsEnabled','_backSprite2','BhAhY','Status','floor','initCategories','getBackgroundOpacity','windowPadding','EmptyTitleLabel','updateScrollBase','CommandWindow_Failed_Text','questQuote','QuestSet','isSceneMap','maxItems','objectivesCompleted','VUIWM','questCommandName','GGAnM','makeData','STRUCT','ssCzA','CommandWindow_Failed_Icon','parse','_delayDraw','RUZlv','iconHeight','setCategoryFilter','scrollSpeed','questRewardsNormalFmt','Objectives','buttonAssistText1','onListCategory','includes','smoothScrollUp','wnuHa','XlzGs','_commandWindow','drawTextEx','addFailedQuestsCommand','Tracker','bind','addNoQuestsListedCommand','clamp','category','ListWindowCategoryCloseFmt','currentSymbol','questObjectives','scrollBlockWidth','isCompletedQuestsEnabled','CommandWindow_Completed_Text','createQuestObjectives','QRnHH','ARRAYEVAL','Show','Categories','lineHeight','loadTitle1','WordWrap','ARRAYJSON','currentExt','innerHeight','setBackgroundOpacity','From','TrackerShowHide','Objective_Failed_Fmt','createQuestQuote','deny','PpxwY','isQuestFailed','questTrackerWindow','TwhTD','paqjz','commandWindowRect','call','questObjectiveNormalFmt','OEKYn','questsFailed','questObjectivesCompleted','Quotes','questFailedCmd','setLabelWindow','SnapshotOpacity','show','getQuestLogFmt','noQuestsLabel','isquestMenuEnabled','questsCompleted','jlBUA','QuestObjectives','quotes','jIwVp','enabled','pageup','commandNameWindowDrawText','right','questData','gFtRb','HUoeF','addWindow','iuBmH','iconWidth','complete','isQuestCompleted','pGdDG','Exclw','createQuestSubtext','isCurrentCategoryOpen','_scrollBaseY'];(function(_0x4aa383,_0x1a9e71){const _0x4f1459=function(_0x121296){while(--_0x121296){_0x4aa383['push'](_0x4aa383['shift']());}};_0x4f1459(++_0x1a9e71);}(_0x1a9e,0x19d));const _0x4f14=function(_0x4aa383,_0x1a9e71){_0x4aa383=_0x4aa383-0x0;let _0x4f1459=_0x1a9e[_0x4aa383];return _0x4f1459;};var label=_0x4f14('0x141'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x4f14('0xfa')](function(_0x22c298){return _0x22c298[_0x4f14('0x10c')]&&_0x22c298[_0x4f14('0x10b')]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x4f14('0xc7')]||{},VisuMZ[_0x4f14('0x1ab')]=function(_0x10fb05,_0x87b7fc){for(const _0x262b05 in _0x87b7fc){if(_0x4f14('0x40')===_0x4f14('0x1b5')){function _0x3e9b09(){if(!this[_0x4f14('0x5b')])return;_0x1a5d80=_0x14f334['toUpperCase']()[_0x4f14('0x13a')]();const _0x4aff02=_0x486616[_0x4f14('0xae')](_0x31a4ef);this[_0x4f14('0x5b')]['setQuest'](_0x4aff02);}}else{if(_0x262b05['match'](/(.*):(.*)/i)){if(_0x4f14('0x85')!==_0x4f14('0x85')){function _0x3edd7f(){this[_0x4f14('0x73')](_0x3477b0);}}else{const _0xfc4778=String(RegExp['$1']),_0x91e5fc=String(RegExp['$2'])[_0x4f14('0x125')]()[_0x4f14('0x13a')]();let _0x35a9fe,_0x553656,_0x1de7b0;switch(_0x91e5fc){case _0x4f14('0x13f'):_0x35a9fe=_0x87b7fc[_0x262b05]!==''?Number(_0x87b7fc[_0x262b05]):0x0;break;case'ARRAYNUM':_0x553656=_0x87b7fc[_0x262b05]!==''?JSON[_0x4f14('0x1d9')](_0x87b7fc[_0x262b05]):[],_0x35a9fe=_0x553656[_0x4f14('0xdb')](_0x42b62d=>Number(_0x42b62d));break;case _0x4f14('0x139'):_0x35a9fe=_0x87b7fc[_0x262b05]!==''?eval(_0x87b7fc[_0x262b05]):null;break;case _0x4f14('0x11'):_0x553656=_0x87b7fc[_0x262b05]!==''?JSON[_0x4f14('0x1d9')](_0x87b7fc[_0x262b05]):[],_0x35a9fe=_0x553656[_0x4f14('0xdb')](_0x1b399a=>eval(_0x1b399a));break;case'JSON':_0x35a9fe=_0x87b7fc[_0x262b05]!==''?JSON[_0x4f14('0x1d9')](_0x87b7fc[_0x262b05]):'';break;case _0x4f14('0x17'):_0x553656=_0x87b7fc[_0x262b05]!==''?JSON[_0x4f14('0x1d9')](_0x87b7fc[_0x262b05]):[],_0x35a9fe=_0x553656['map'](_0x48e72a=>JSON['parse'](_0x48e72a));break;case _0x4f14('0x9f'):_0x35a9fe=_0x87b7fc[_0x262b05]!==''?new Function(JSON['parse'](_0x87b7fc[_0x262b05])):new Function('return\x200');break;case _0x4f14('0x16e'):_0x553656=_0x87b7fc[_0x262b05]!==''?JSON[_0x4f14('0x1d9')](_0x87b7fc[_0x262b05]):[],_0x35a9fe=_0x553656[_0x4f14('0xdb')](_0x48485c=>new Function(JSON[_0x4f14('0x1d9')](_0x48485c)));break;case _0x4f14('0x59'):_0x35a9fe=_0x87b7fc[_0x262b05]!==''?String(_0x87b7fc[_0x262b05]):'';break;case _0x4f14('0x113'):_0x553656=_0x87b7fc[_0x262b05]!==''?JSON[_0x4f14('0x1d9')](_0x87b7fc[_0x262b05]):[],_0x35a9fe=_0x553656[_0x4f14('0xdb')](_0x3c82d8=>String(_0x3c82d8));break;case _0x4f14('0x1d6'):_0x1de7b0=_0x87b7fc[_0x262b05]!==''?JSON['parse'](_0x87b7fc[_0x262b05]):{},_0x35a9fe=VisuMZ[_0x4f14('0x1ab')]({},_0x1de7b0);break;case _0x4f14('0x11b'):_0x553656=_0x87b7fc[_0x262b05]!==''?JSON[_0x4f14('0x1d9')](_0x87b7fc[_0x262b05]):[],_0x35a9fe=_0x553656[_0x4f14('0xdb')](_0x5709f1=>VisuMZ['ConvertParams']({},JSON[_0x4f14('0x1d9')](_0x5709f1)));break;default:continue;}_0x10fb05[_0xfc4778]=_0x35a9fe;}}}}return _0x10fb05;},(_0x558543=>{const _0x5687c8=_0x558543[_0x4f14('0xab')];for(const _0xb056cc of dependencies){if(_0x4f14('0x45')===_0x4f14('0x45')){if(!Imported[_0xb056cc]){if('UZsoU'===_0x4f14('0x14a')){alert(_0x4f14('0x18b')['format'](_0x5687c8,_0xb056cc)),SceneManager[_0x4f14('0x192')]();break;}else{function _0x2120cf(){let _0x4231db=_0x1d4ab0[_0x4f14('0x141')][_0x4f14('0x153')][_0x4f14('0x26')](this);if(_0x179077[_0x4f14('0x141')][_0x4f14('0xc7')][_0x4f14('0x4')][_0x4f14('0xbe')]){if(_0x1850c5[_0x4f14('0x141')][_0x4f14('0xc7')]['Tracker']['AddShowOption'])_0x4231db++;if(_0x16b6db[_0x4f14('0x141')][_0x4f14('0xc7')][_0x4f14('0x4')][_0x4f14('0x1c1')])_0x4231db++;}return _0x4231db;}}}}else{function _0xa8e137(){return _0x17f093[_0x4f14('0xd4')];}}}const _0x9d48ba=_0x558543[_0x4f14('0x10b')];if(_0x9d48ba['match'](/\[Version[ ](.*?)\]/i)){const _0x4d860e=Number(RegExp['$1']);if(_0x4d860e!==VisuMZ[label][_0x4f14('0x157')]){if('LELzX'==='TIjBT'){function _0x147ff3(){const _0x5097ac=_0x5a5032[_0x4f14('0x10f')],_0x3f2753=_0x4f14('0x10f');this[_0x4f14('0x12e')](_0x5097ac,_0x3f2753);}}else alert(_0x4f14('0x1b3')[_0x4f14('0x175')](_0x5687c8,_0x4d860e)),SceneManager['exit']();}}if(_0x9d48ba[_0x4f14('0x151')](/\[Tier[ ](\d+)\]/i)){if(_0x4f14('0x1b1')===_0x4f14('0x1b1')){const _0x31dfb9=Number(RegExp['$1']);if(_0x31dfb9<tier){if(_0x4f14('0x111')===_0x4f14('0x0')){function _0x50ddbb(){this['drawTextEx'](_0x33b466,_0x4154e8['x']+_0x8c1450[_0x4f14('0x159')]-_0x51144a,_0x82c7ed['y'],_0x1f45e0);}}else alert(_0x4f14('0xe7')[_0x4f14('0x175')](_0x5687c8,_0x31dfb9,tier)),SceneManager[_0x4f14('0x192')]();}else{if('ssCzA'===_0x4f14('0x1d7'))tier=Math['max'](_0x31dfb9,tier);else{function _0x429df6(){let _0x1987f4=_0x7c7d10[_0x4f14('0xed')];_0x41c006===_0x357404[_0x4f14('0x11d')]()&&(_0x1987f4=_0xcd4f61[_0x4f14('0x1b8')][_0x4f14('0x175')](_0x1987f4)),this[_0x4f14('0x12e')](_0x1987f4,_0x4f14('0xae'),!![],_0x44a917);}}}}else{function _0x2ac60e(){this[_0x4f14('0x17b')][_0x4f14('0x19b')](),this[_0x4f14('0x17b')]['smoothSelect'](0x0);}}}VisuMZ[_0x4f14('0x1ab')](VisuMZ[label][_0x4f14('0xc7')],_0x558543['parameters']);})(pluginData),PluginManager['registerCommand'](pluginData[_0x4f14('0xab')],_0x4f14('0x1ce'),_0xb429ed=>{VisuMZ['ConvertParams'](_0xb429ed,_0xb429ed);const _0x3a79e5=_0xb429ed['Keys'],_0x56c3a0=_0xb429ed['Status'];for(const _0xca7c14 of _0x3a79e5){if(_0x4f14('0x56')!==_0x4f14('0x56')){function _0x14b30c(){_0x3940d2[_0x4f14('0x16b')][_0x4f14('0x112')]();}}else $gameSystem[_0x4f14('0xe6')](_0xca7c14,_0x56c3a0);}if(SceneManager[_0x4f14('0x1cf')]()){if(_0x4f14('0x14f')!==_0x4f14('0xbc'))SceneManager['_scene'][_0x4f14('0x112')]();else{function _0x116de4(){_0x4f5cc8['rewards'][_0x37a95b]=_0x236c35['makeDeepCopy'](_0x4c969d[_0x4f14('0xe8')]);}}}}),PluginManager[_0x4f14('0x7b')](pluginData['name'],_0x4f14('0x90'),_0x4e9453=>{VisuMZ[_0x4f14('0x1ab')](_0x4e9453,_0x4e9453);const _0x170a96=_0x4e9453[_0x4f14('0x7d')],_0x1bf05a=_0x4e9453[_0x4f14('0x87')];for(const _0x1a532a of _0x170a96){$gameSystem['setQuestDescription'](_0x1a532a,_0x1bf05a);}if(SceneManager[_0x4f14('0x1cf')]()){if(_0x4f14('0x10e')==='qsFbf')SceneManager[_0x4f14('0x16b')]['refreshQuestTrackerWindow']();else{function _0x2913b9(){_0x550c0d[_0x4f14('0x119')](_0x141d70,_0x37ac87,_0x3bb785);}}}}),PluginManager['registerCommand'](pluginData[_0x4f14('0xab')],_0x4f14('0x35'),_0x4a15f7=>{VisuMZ[_0x4f14('0x1ab')](_0x4a15f7,_0x4a15f7);const _0x33b10f=_0x4a15f7[_0x4f14('0x7d')],_0x5f4225=_0x4a15f7[_0x4f14('0x166')],_0x786d67=_0x4a15f7[_0x4f14('0x1c5')];for(const _0x492d2d of _0x33b10f){$gameSystem[_0x4f14('0x118')](_0x492d2d,_0x5f4225,_0x786d67);}if(SceneManager[_0x4f14('0x1cf')]()){if(_0x4f14('0x9d')!==_0x4f14('0x9d')){function _0x1ff4a2(){_0x32175b['QuestSystem'][_0x4f14('0x128')][_0x4f14('0x26')](this),this[_0x4f14('0x6b')]();}}else SceneManager[_0x4f14('0x16b')][_0x4f14('0x112')]();}}),PluginManager[_0x4f14('0x7b')](pluginData['name'],_0x4f14('0x190'),_0x2cfa27=>{VisuMZ[_0x4f14('0x1ab')](_0x2cfa27,_0x2cfa27);const _0x2123b8=_0x2cfa27[_0x4f14('0x7d')],_0x5648fd=_0x2cfa27[_0x4f14('0x87')];for(const _0x6528c7 of _0x2123b8){if(_0x4f14('0x183')!==_0x4f14('0x183')){function _0x75ee31(){const _0x171aa4=this[_0x4f14('0x62')](this[_0x4f14('0xb5')]());let _0x38c5ec=this[_0x4f14('0x163')](this[_0x4f14('0xb5')]());_0x38c5ec=_0x38c5ec[_0x4f14('0xdd')](/\\I\[(\d+)\]/gi,''),_0x68e935[_0x4f14('0xcb')](),this[_0x4f14('0x1c0')](_0x38c5ec,_0x171aa4),this['commandNameWindowDrawText'](_0x38c5ec,_0x171aa4),this[_0x4f14('0x19d')](_0x38c5ec,_0x171aa4);}}else $gameSystem[_0x4f14('0xd5')](_0x6528c7,_0x5648fd);}if(SceneManager[_0x4f14('0x1cf')]()){if('qPhZs'!==_0x4f14('0x3d'))SceneManager[_0x4f14('0x16b')][_0x4f14('0x112')]();else{function _0x3e357e(){_0x3b2df0['_scene'][_0x4f14('0x112')]();}}}}),PluginManager[_0x4f14('0x7b')](pluginData[_0x4f14('0xab')],_0x4f14('0x77'),_0x1f151c=>{VisuMZ[_0x4f14('0x1ab')](_0x1f151c,_0x1f151c);const _0x5901c5=_0x1f151c[_0x4f14('0x7d')],_0x43c304=_0x1f151c[_0x4f14('0x166')],_0x1f2bc0=_0x1f151c[_0x4f14('0x1c5')];for(const _0x193def of _0x5901c5){if(_0x4f14('0x4e')!==_0x4f14('0x86'))$gameSystem[_0x4f14('0x119')](_0x193def,_0x43c304,_0x1f2bc0);else{function _0x1ee5ad(){_0x3e0aee=_0x1c01d8[_0x4f14('0x1b8')][_0x4f14('0x175')](_0xb88be9);}}}SceneManager['isSceneMap']()&&SceneManager['_scene']['refreshQuestTrackerWindow']();}),PluginManager[_0x4f14('0x7b')](pluginData['name'],_0x4f14('0x134'),_0x2d090=>{VisuMZ[_0x4f14('0x1ab')](_0x2d090,_0x2d090);const _0x40be2d=_0x2d090[_0x4f14('0x7d')],_0x2c1d71=_0x2d090[_0x4f14('0x87')];for(const _0x582835 of _0x40be2d){$gameSystem[_0x4f14('0xce')](_0x582835,_0x2c1d71);}if(SceneManager['isSceneMap']()){if(_0x4f14('0x1d2')!==_0x4f14('0x71'))SceneManager[_0x4f14('0x16b')]['refreshQuestTrackerWindow']();else{function _0x5ee72e(){return _0x37d88b[_0x4f14('0x83')];}}}}),PluginManager[_0x4f14('0x7b')](pluginData[_0x4f14('0xab')],_0x4f14('0xa2'),_0x53595e=>{VisuMZ[_0x4f14('0x1ab')](_0x53595e,_0x53595e);const _0x4fddf8=_0x53595e[_0x4f14('0x18f')];$gameSystem[_0x4f14('0x10a')](_0x4fddf8);if(SceneManager[_0x4f14('0x1cf')]()){if(_0x4f14('0x179')!==_0x4f14('0x179')){function _0x3e9604(){_0x530dd6[_0x4f14('0x1ab')](_0x2bcd6c,_0xd0135b);const _0x56882e=_0x1989e0['Keys'],_0x3b3a90=_0x282eca[_0x4f14('0x1c5')];for(const _0x5d1829 of _0x56882e){_0x4bdc3a[_0x4f14('0xe6')](_0x5d1829,_0x3b3a90);}_0x34951e[_0x4f14('0x1cf')]()&&_0x1fe4f0[_0x4f14('0x16b')][_0x4f14('0x112')]();}}else SceneManager['_scene'][_0x4f14('0x112')]();}}),PluginManager[_0x4f14('0x7b')](pluginData['name'],_0x4f14('0x185'),_0x56b549=>{if(!SceneManager['isSceneMap']())return;SceneManager[_0x4f14('0x16b')][_0x4f14('0x112')]();}),PluginManager[_0x4f14('0x7b')](pluginData[_0x4f14('0xab')],_0x4f14('0x1c'),_0x223fc1=>{VisuMZ['ConvertParams'](_0x223fc1,_0x223fc1),$gameSystem[_0x4f14('0x8a')](_0x223fc1[_0x4f14('0x12')]),SceneManager[_0x4f14('0x1cf')]()&&SceneManager['_scene'][_0x4f14('0x112')]();}),PluginManager[_0x4f14('0x7b')](pluginData[_0x4f14('0xab')],_0x4f14('0xbb'),_0x2d1f41=>{if($gameParty[_0x4f14('0x5a')]())return;SceneManager[_0x4f14('0xb9')](Scene_Quest);}),PluginManager['registerCommand'](pluginData[_0x4f14('0xab')],'SystemEnableQuestMenu',_0x355287=>{VisuMZ[_0x4f14('0x1ab')](_0x355287,_0x355287),$gameSystem[_0x4f14('0x3c')]()[_0x4f14('0x38')]=_0x355287[_0x4f14('0x1b4')];}),PluginManager[_0x4f14('0x7b')](pluginData[_0x4f14('0xab')],_0x4f14('0x100'),_0x4e9f4f=>{VisuMZ[_0x4f14('0x1ab')](_0x4e9f4f,_0x4e9f4f),$gameSystem[_0x4f14('0x3c')]()[_0x4f14('0x1bc')]=_0x4e9f4f[_0x4f14('0x12')];}),VisuMZ[_0x4f14('0x141')][_0x4f14('0x109')]=Scene_Boot[_0x4f14('0xa0')]['onDatabaseLoaded'],Scene_Boot[_0x4f14('0xa0')][_0x4f14('0x138')]=function(){VisuMZ[_0x4f14('0x141')][_0x4f14('0x109')][_0x4f14('0x26')](this),this[_0x4f14('0x67')]();},Scene_Boot[_0x4f14('0xa0')][_0x4f14('0x67')]=function(){this[_0x4f14('0xa9')]();},VisuMZ[_0x4f14('0x141')][_0x4f14('0x10d')]=[],VisuMZ['QuestSystem'][_0x4f14('0xb8')]={},Scene_Boot[_0x4f14('0xa0')][_0x4f14('0xa9')]=function(){for(const _0x21ba67 of VisuMZ['QuestSystem']['Settings']['Categories']){if(!_0x21ba67)continue;for(const _0x5699ad of _0x21ba67[_0x4f14('0x150')]){if(!_0x5699ad)continue;_0x5699ad[_0x4f14('0x8')]=_0x21ba67,_0x5699ad[_0x4f14('0x11c')][_0x4f14('0x64')](''),_0x5699ad[_0x4f14('0x1e0')][_0x4f14('0x64')](''),_0x5699ad[_0x4f14('0xb7')]['unshift'](''),_0x5699ad[_0x4f14('0x60')][_0x4f14('0x64')](''),_0x5699ad[_0x4f14('0x2b')][_0x4f14('0x64')]('');const _0x2cd1a5=_0x5699ad[_0x4f14('0x18f')]['toUpperCase']()[_0x4f14('0x13a')]();VisuMZ['QuestSystem']['QuestOrder'][_0x4f14('0xb9')](_0x2cd1a5),VisuMZ['QuestSystem'][_0x4f14('0xb8')][_0x2cd1a5]=_0x5699ad;}}},ConfigManager[_0x4f14('0x10f')]=!![],ConfigManager['questTrackerPosition']=!![],VisuMZ[_0x4f14('0x141')][_0x4f14('0xca')]=ConfigManager[_0x4f14('0x1d5')],ConfigManager[_0x4f14('0x1d5')]=function(){const _0x3eacc9=VisuMZ[_0x4f14('0x141')][_0x4f14('0xca')]['call'](this);return _0x3eacc9[_0x4f14('0x10f')]=this['questTrackerShow'],_0x3eacc9[_0x4f14('0x1ba')]=this[_0x4f14('0x1ba')],_0x3eacc9;},VisuMZ[_0x4f14('0x141')]['ConfigManager_applyData']=ConfigManager[_0x4f14('0x1bf')],ConfigManager[_0x4f14('0x1bf')]=function(_0x3d62ae){VisuMZ[_0x4f14('0x141')][_0x4f14('0xb6')]['call'](this,_0x3d62ae),_0x4f14('0x10f')in _0x3d62ae?this[_0x4f14('0x10f')]=_0x3d62ae[_0x4f14('0x10f')]:this['questTrackerShow']=!![],_0x4f14('0x1ba')in _0x3d62ae?this[_0x4f14('0x1ba')]=_0x3d62ae['questTrackerPosition']:this[_0x4f14('0x1ba')]=!![];},ImageManager[_0x4f14('0x15d')]=VisuMZ[_0x4f14('0x141')]['Settings'][_0x4f14('0x68')]['CommandWindow_Known_Icon'],ImageManager[_0x4f14('0x13c')]=VisuMZ['QuestSystem'][_0x4f14('0xc7')][_0x4f14('0x68')][_0x4f14('0xb2')],ImageManager[_0x4f14('0xfb')]=VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')][_0x4f14('0x68')][_0x4f14('0x1d8')],TextManager[_0x4f14('0x1d3')]=VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')]['MainMenu'][_0x4f14('0xbf')],TextManager[_0x4f14('0xa1')]=VisuMZ[_0x4f14('0x141')]['Settings'][_0x4f14('0x68')][_0x4f14('0xda')],TextManager[_0x4f14('0xc1')]=VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')][_0x4f14('0x68')][_0x4f14('0xe')],TextManager['questFailedCmd']=VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')]['General'][_0x4f14('0x1cc')],TextManager[_0x4f14('0x147')]=VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')][_0x4f14('0x68')][_0x4f14('0x169')],TextManager[_0x4f14('0x4a')]=VisuMZ['QuestSystem'][_0x4f14('0xc7')][_0x4f14('0x68')][_0x4f14('0x9')],TextManager[_0x4f14('0x31')]=VisuMZ['QuestSystem'][_0x4f14('0xc7')][_0x4f14('0x68')][_0x4f14('0x1ca')],TextManager[_0x4f14('0x14d')]=VisuMZ['QuestSystem'][_0x4f14('0xc7')][_0x4f14('0x68')][_0x4f14('0x1a4')],TextManager[_0x4f14('0xfe')]=VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')]['General']['LogFmt'],TextManager[_0x4f14('0xd4')]=VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')][_0x4f14('0x68')][_0x4f14('0x12f')],TextManager[_0x4f14('0x27')]=VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')]['General']['Objective_Normal_Fmt'],TextManager[_0x4f14('0x177')]=VisuMZ['QuestSystem'][_0x4f14('0xc7')][_0x4f14('0x68')][_0x4f14('0x122')],TextManager['questObjectiveFailedFmt']=VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')][_0x4f14('0x68')][_0x4f14('0x1d')],TextManager[_0x4f14('0x1df')]=VisuMZ['QuestSystem']['Settings'][_0x4f14('0x68')][_0x4f14('0x137')],TextManager[_0x4f14('0x108')]=VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')][_0x4f14('0x68')]['Reward_Completed_Fmt'],TextManager['questRewardsDeniedFmt']=VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')]['General']['Reward_Failed_Fmt'],TextManager[_0x4f14('0x83')]=VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')][_0x4f14('0x68')][_0x4f14('0x49')],TextManager[_0x4f14('0x172')]=VisuMZ['QuestSystem'][_0x4f14('0xc7')][_0x4f14('0x68')]['questButtonAssistActive'],TextManager[_0x4f14('0xc9')]=VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')]['General'][_0x4f14('0x4b')],TextManager[_0x4f14('0x105')]=VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')]['General'][_0x4f14('0xd7')],TextManager[_0x4f14('0x16f')]='\x0a\x5c{[[Title]]\x5c}\x0a[[Objectives]]\x0a',TextManager[_0x4f14('0x1b8')]=VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')][_0x4f14('0x68')][_0x4f14('0x93')],TextManager['questTrackerShow']=VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')][_0x4f14('0x4')][_0x4f14('0x171')],TextManager[_0x4f14('0x1ba')]=VisuMZ['QuestSystem'][_0x4f14('0xc7')]['Tracker']['PositionName'],TextManager[_0x4f14('0x7f')]=VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')][_0x4f14('0x4')][_0x4f14('0x19f')],TextManager[_0x4f14('0x1b7')]=VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')][_0x4f14('0x4')][_0x4f14('0xc2')],SceneManager[_0x4f14('0x1cf')]=function(){return this[_0x4f14('0x16b')]&&this['_scene'][_0x4f14('0xf3')]===Scene_Map;},VisuMZ[_0x4f14('0x141')][_0x4f14('0x58')]=Game_System[_0x4f14('0xa0')][_0x4f14('0x149')],Game_System[_0x4f14('0xa0')][_0x4f14('0x149')]=function(){VisuMZ[_0x4f14('0x141')][_0x4f14('0x58')]['call'](this),this[_0x4f14('0x54')]();},Game_System[_0x4f14('0xa0')]['initQuestSystem']=function(){const _0x4518d2=VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')][_0x4f14('0x68')],_0x14a7b1=VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')][_0x4f14('0xcd')];this[_0x4f14('0xdf')]={'shown':_0x14a7b1[_0x4f14('0xe3')],'enabled':_0x14a7b1[_0x4f14('0x130')],'known':[],'completed':[],'failed':[],'description':{},'objectives':{},'objectivesCompleted':{},'objectivesFailed':{},'rewards':{},'rewardsClaimed':{},'rewardsDenied':{},'subtext':{},'quotes':{},'tracked':_0x4518d2[_0x4f14('0x69')][_0x4f14('0x125')]()['trim'](),'showTracker':!![]};for(const _0x37e6a5 of _0x4518d2['KnownQuests']){this[_0x4f14('0xe6')](_0x37e6a5,_0x4f14('0x17e'));}for(const _0x361692 of _0x4518d2[_0x4f14('0x13e')]){if(_0x4f14('0x5d')===_0x4f14('0x5d'))this[_0x4f14('0xe6')](_0x361692,'completed');else{function _0x58044a(){this[_0x4f14('0x1cb')](_0x40d0a1,_0x7a7dab),this['paint']();}}}for(const _0x34a67f of _0x4518d2[_0x4f14('0x1a5')]){if(_0x4f14('0x1af')===_0x4f14('0x1af'))this[_0x4f14('0xe6')](_0x34a67f,_0x4f14('0x102'));else{function _0x765119(){_0x54fa6c[_0x4f14('0xa0')][_0x4f14('0x1aa')][_0x4f14('0x26')](this,_0x2c320c);}}}},Game_System[_0x4f14('0xa0')][_0x4f14('0xae')]=function(_0x5169e9){return _0x5169e9=_0x5169e9[_0x4f14('0x125')]()['trim'](),VisuMZ[_0x4f14('0x141')][_0x4f14('0xb8')][_0x5169e9];},Game_System[_0x4f14('0xa0')][_0x4f14('0x3c')]=function(){if(this[_0x4f14('0xdf')]===undefined)this['initQuestSystem']();return this[_0x4f14('0xdf')];},Game_System[_0x4f14('0xa0')][_0x4f14('0x81')]=function(){return this[_0x4f14('0x3c')]()[_0x4f14('0x1bc')];},Game_System[_0x4f14('0xa0')]['isquestMenuEnabled']=function(){return this[_0x4f14('0x3c')]()[_0x4f14('0x38')];},Game_System[_0x4f14('0xa0')][_0x4f14('0xe6')]=function(_0x513996,_0x4d8fed){_0x513996=_0x513996[_0x4f14('0x125')]()[_0x4f14('0x13a')]();if(!VisuMZ[_0x4f14('0x141')][_0x4f14('0xb8')][_0x513996])return;const _0x2cb5e3=this[_0x4f14('0x3c')]();_0x2cb5e3[_0x4f14('0x17e')]=_0x2cb5e3[_0x4f14('0x17e')]||[],_0x2cb5e3['completed']=_0x2cb5e3[_0x4f14('0x1a9')]||[],_0x2cb5e3[_0x4f14('0x102')]=_0x2cb5e3[_0x4f14('0x102')]||[],_0x2cb5e3[_0x4f14('0x17e')][_0x4f14('0x189')](_0x513996),_0x2cb5e3[_0x4f14('0x1a9')][_0x4f14('0x189')](_0x513996),_0x2cb5e3['failed']['remove'](_0x513996);if(_0x4d8fed!==_0x4f14('0x189'))_0x2cb5e3[_0x4d8fed][_0x4f14('0xb9')](_0x513996);_0x4d8fed!=='known'&&_0x513996===_0x2cb5e3[_0x4f14('0xfd')]&&this[_0x4f14('0x10a')]('');},Game_System['prototype']['questsKnown']=function(){const _0x4f13a5=this[_0x4f14('0x3c')]();return _0x4f13a5[_0x4f14('0x17e')]=_0x4f13a5[_0x4f14('0x17e')]||[],_0x4f13a5[_0x4f14('0x17e')][_0x4f14('0xdb')](_0x19aa2b=>this[_0x4f14('0xae')](_0x19aa2b))['remove'](null);},Game_System['prototype'][_0x4f14('0x82')]=function(_0x2fcb37){const _0x4f6131=this[_0x4f14('0x3c')]();return _0x4f6131[_0x4f14('0x17e')]=_0x4f6131[_0x4f14('0x17e')]||[],_0x2fcb37=_0x2fcb37[_0x4f14('0x125')]()[_0x4f14('0x13a')](),_0x4f6131['known'][_0x4f14('0x1e3')](_0x2fcb37);},Game_System[_0x4f14('0xa0')]['questsCompleted']=function(){const _0x13ea09=this[_0x4f14('0x3c')]();return _0x13ea09[_0x4f14('0x1a9')]=_0x13ea09[_0x4f14('0x1a9')]||[],_0x13ea09[_0x4f14('0x1a9')]['map'](_0x5644be=>this[_0x4f14('0xae')](_0x5644be))[_0x4f14('0x189')](null);},Game_System['prototype'][_0x4f14('0x43')]=function(_0x437613){const _0x4e7cbc=this[_0x4f14('0x3c')]();return _0x4e7cbc[_0x4f14('0x1a9')]=_0x4e7cbc[_0x4f14('0x1a9')]||[],_0x437613=_0x437613[_0x4f14('0x125')]()[_0x4f14('0x13a')](),_0x4e7cbc['completed'][_0x4f14('0x1e3')](_0x437613);},Game_System[_0x4f14('0xa0')][_0x4f14('0x29')]=function(){const _0x5b7e87=this[_0x4f14('0x3c')]();return _0x5b7e87[_0x4f14('0x102')]=_0x5b7e87[_0x4f14('0x102')]||[],_0x5b7e87[_0x4f14('0x102')][_0x4f14('0xdb')](_0x2b72ac=>this[_0x4f14('0xae')](_0x2b72ac))[_0x4f14('0x189')](null);},Game_System[_0x4f14('0xa0')][_0x4f14('0x21')]=function(_0x1acbe4){const _0x327321=this[_0x4f14('0x3c')]();return _0x327321[_0x4f14('0x102')]=_0x327321[_0x4f14('0x102')]||[],_0x1acbe4=_0x1acbe4[_0x4f14('0x125')]()[_0x4f14('0x13a')](),_0x327321[_0x4f14('0x102')]['includes'](_0x1acbe4);},Game_System[_0x4f14('0xa0')][_0x4f14('0x76')]=function(_0x30ecce){_0x30ecce=_0x30ecce[_0x4f14('0x125')]()[_0x4f14('0x13a')]();const _0x359a5c=this[_0x4f14('0xae')](_0x30ecce);if(!_0x359a5c)return'';const _0x1fe789=this[_0x4f14('0x3c')]()[_0x4f14('0x10b')];_0x1fe789[_0x30ecce]=_0x1fe789[_0x30ecce]||0x1;const _0x211bfc=_0x1fe789[_0x30ecce];return _0x359a5c[_0x4f14('0x11c')][_0x211bfc]||'';},Game_System['prototype']['setQuestDescription']=function(_0x56e2e9,_0x33c051){_0x56e2e9=_0x56e2e9[_0x4f14('0x125')]()[_0x4f14('0x13a')]();const _0x3ff3a3=this[_0x4f14('0xae')](_0x56e2e9);if(!_0x3ff3a3)return'';const _0x2065a7=this[_0x4f14('0x3c')]()[_0x4f14('0x10b')];_0x2065a7[_0x56e2e9]=_0x33c051;},Game_System[_0x4f14('0xa0')][_0x4f14('0xb')]=function(_0x4903ba){_0x4903ba=_0x4903ba['toUpperCase']()['trim']();const _0x2ba762=this['quest'](_0x4903ba);if(!_0x2ba762)return'';const _0x52a09d=this[_0x4f14('0x3c')]();_0x52a09d[_0x4f14('0x1a2')]=_0x52a09d[_0x4f14('0x1a2')]||{};if(!_0x52a09d['objectives'][_0x4903ba]){if(_0x4f14('0x1c4')!=='iXVKw')_0x52a09d[_0x4f14('0x1a2')][_0x4903ba]=JsonEx[_0x4f14('0x146')](_0x2ba762[_0x4f14('0x53')]);else{function _0x193e1f(){let _0x4bd62e=_0x2b9053[_0x4f14('0x16c')](_0x3446d1);return _0x4bd62e=_0x7ac725[_0x4f14('0x141')][_0x4f14('0x107')](_0x4bd62e),_0x4bd62e[_0x4f14('0x13a')]();}}}return _0x52a09d[_0x4f14('0x1a2')][_0x4903ba][_0x4f14('0xe9')]((_0x21e694,_0x1179f1)=>_0x21e694-_0x1179f1);},Game_System[_0x4f14('0xa0')][_0x4f14('0x118')]=function(_0x54ae5e,_0x370a21,_0x14ec83){_0x54ae5e=_0x54ae5e['toUpperCase']()['trim']();const _0x4aaf41=this[_0x4f14('0xae')](_0x54ae5e);if(!_0x4aaf41)return'';const _0x103936=this[_0x4f14('0x3c')]();_0x103936[_0x4f14('0x1a2')]=_0x103936[_0x4f14('0x1a2')]||{};!_0x103936[_0x4f14('0x1a2')][_0x54ae5e]&&(_0x103936[_0x4f14('0x1a2')][_0x54ae5e]=JsonEx['makeDeepCopy'](_0x4aaf41['VisibleObjectives']));_0x103936[_0x4f14('0x1a2')][_0x54ae5e]=_0x103936[_0x4f14('0x1a2')][_0x54ae5e]||[],_0x103936[_0x4f14('0x1d1')][_0x54ae5e]=_0x103936[_0x4f14('0x1d1')][_0x54ae5e]||[],_0x103936[_0x4f14('0x92')][_0x54ae5e]=_0x103936[_0x4f14('0x92')][_0x54ae5e]||[];for(const _0x3afe9e of _0x370a21){_0x103936['objectives'][_0x54ae5e][_0x4f14('0x189')](_0x3afe9e),_0x103936['objectivesCompleted'][_0x54ae5e][_0x4f14('0x189')](_0x3afe9e),_0x103936[_0x4f14('0x92')][_0x54ae5e][_0x4f14('0x189')](_0x3afe9e);switch(_0x14ec83){case _0x4f14('0x2f'):case _0x4f14('0x17e'):_0x103936[_0x4f14('0x1a2')][_0x54ae5e][_0x4f14('0xb9')](_0x3afe9e);break;case _0x4f14('0x42'):case'completed':_0x103936['objectivesCompleted'][_0x54ae5e][_0x4f14('0xb9')](_0x3afe9e);break;case _0x4f14('0x6c'):case'failed':_0x103936[_0x4f14('0x92')][_0x54ae5e]['push'](_0x3afe9e);break;case _0x4f14('0x189'):case _0x4f14('0xe2'):break;}}},Game_System[_0x4f14('0xa0')][_0x4f14('0x2a')]=function(_0x171b77){_0x171b77=_0x171b77[_0x4f14('0x125')]()[_0x4f14('0x13a')]();const _0x5446c4=this[_0x4f14('0xae')](_0x171b77);if(!_0x5446c4)return'';const _0x2076dc=this['questData']();return _0x2076dc[_0x4f14('0x1d1')]=_0x2076dc[_0x4f14('0x1d1')]||{},_0x2076dc[_0x4f14('0x1d1')][_0x171b77]=_0x2076dc[_0x4f14('0x1d1')][_0x171b77]||[],_0x2076dc[_0x4f14('0x1d1')][_0x171b77]['sort']((_0x266161,_0x502692)=>_0x266161-_0x502692);},Game_System[_0x4f14('0xa0')][_0x4f14('0x97')]=function(_0x2c1db3){_0x2c1db3=_0x2c1db3[_0x4f14('0x125')]()[_0x4f14('0x13a')]();const _0x14df80=this['quest'](_0x2c1db3);if(!_0x14df80)return'';const _0x223db3=this[_0x4f14('0x3c')]();return _0x223db3[_0x4f14('0x92')]=_0x223db3[_0x4f14('0x92')]||{},_0x223db3[_0x4f14('0x92')][_0x2c1db3]=_0x223db3['objectivesFailed'][_0x2c1db3]||[],_0x223db3[_0x4f14('0x92')][_0x2c1db3][_0x4f14('0xe9')]((_0x14542a,_0x2c4357)=>_0x14542a-_0x2c4357);},Game_System[_0x4f14('0xa0')][_0x4f14('0x104')]=function(_0x5b58f3){_0x5b58f3=_0x5b58f3[_0x4f14('0x125')]()['trim']();const _0x226431=this[_0x4f14('0xae')](_0x5b58f3);if(!_0x226431)return'';const _0x5945d9=this[_0x4f14('0x3c')]();return _0x5945d9[_0x4f14('0x144')]=_0x5945d9[_0x4f14('0x144')]||{},!_0x5945d9[_0x4f14('0x144')][_0x5b58f3]&&(_0x5945d9[_0x4f14('0x144')][_0x5b58f3]=JsonEx[_0x4f14('0x146')](_0x226431[_0x4f14('0xe8')])),_0x5945d9[_0x4f14('0x144')][_0x5b58f3][_0x4f14('0xe9')]((_0x4a961e,_0xebc028)=>_0x4a961e-_0xebc028);},Game_System[_0x4f14('0xa0')][_0x4f14('0x119')]=function(_0x30675b,_0x5bb844,_0x13be9f){_0x30675b=_0x30675b[_0x4f14('0x125')]()[_0x4f14('0x13a')]();const _0xc5314=this[_0x4f14('0xae')](_0x30675b);if(!_0xc5314)return'';const _0x415230=this['questData']();_0x415230[_0x4f14('0x144')]=_0x415230[_0x4f14('0x144')]||{};!_0x415230[_0x4f14('0x144')][_0x30675b]&&(_0x415230[_0x4f14('0x144')][_0x30675b]=JsonEx['makeDeepCopy'](_0xc5314[_0x4f14('0xe8')]));_0x415230[_0x4f14('0x144')][_0x30675b]=_0x415230[_0x4f14('0x144')][_0x30675b]||[],_0x415230[_0x4f14('0xf1')][_0x30675b]=_0x415230[_0x4f14('0xf1')][_0x30675b]||[],_0x415230[_0x4f14('0x165')][_0x30675b]=_0x415230[_0x4f14('0x165')][_0x30675b]||[];for(const _0x2fcc73 of _0x5bb844){if(_0x4f14('0x193')!==_0x4f14('0x193')){function _0x14950f(){this[_0x4f14('0x6a')]={};for(const _0x14f3b6 of _0x197c8a['QuestSystem'][_0x4f14('0xc7')][_0x4f14('0x13')]){this[_0x4f14('0x6a')][_0x14f3b6[_0x4f14('0x178')]]=!![];}this[_0x4f14('0x89')]='known';}}else{_0x415230[_0x4f14('0x144')][_0x30675b][_0x4f14('0x189')](_0x2fcc73),_0x415230[_0x4f14('0xf1')][_0x30675b]['remove'](_0x2fcc73),_0x415230[_0x4f14('0x165')][_0x30675b]['remove'](_0x2fcc73);switch(_0x13be9f){case _0x4f14('0x2f'):case'known':_0x415230[_0x4f14('0x144')][_0x30675b][_0x4f14('0xb9')](_0x2fcc73);break;case _0x4f14('0x162'):case _0x4f14('0x135'):_0x415230[_0x4f14('0xf1')][_0x30675b]['push'](_0x2fcc73);break;case _0x4f14('0x1f'):case _0x4f14('0xf5'):_0x415230['rewardsDenied'][_0x30675b][_0x4f14('0xb9')](_0x2fcc73);break;case'remove':case _0x4f14('0xe2'):break;}}}},Game_System[_0x4f14('0xa0')][_0x4f14('0xcc')]=function(_0x5c03fd){_0x5c03fd=_0x5c03fd[_0x4f14('0x125')]()[_0x4f14('0x13a')]();const _0x2b1252=this['quest'](_0x5c03fd);if(!_0x2b1252)return'';const _0x3de475=this['questData']();return _0x3de475[_0x4f14('0xf1')]=_0x3de475[_0x4f14('0xf1')]||{},_0x3de475[_0x4f14('0xf1')][_0x5c03fd]=_0x3de475[_0x4f14('0xf1')][_0x5c03fd]||[],_0x3de475[_0x4f14('0xf1')][_0x5c03fd][_0x4f14('0xe9')]((_0x1e532b,_0x4c45b4)=>_0x1e532b-_0x4c45b4);},Game_System[_0x4f14('0xa0')][_0x4f14('0xc5')]=function(_0xbe0b03){_0xbe0b03=_0xbe0b03[_0x4f14('0x125')]()[_0x4f14('0x13a')]();const _0x4ee881=this[_0x4f14('0xae')](_0xbe0b03);if(!_0x4ee881)return'';const _0x305436=this[_0x4f14('0x3c')]();return _0x305436['rewardsDenied']=_0x305436[_0x4f14('0x165')]||{},_0x305436[_0x4f14('0x165')][_0xbe0b03]=_0x305436[_0x4f14('0x165')][_0xbe0b03]||[],_0x305436['rewardsDenied'][_0xbe0b03][_0x4f14('0xe9')]((_0x460203,_0x318c2c)=>_0x460203-_0x318c2c);},Game_System[_0x4f14('0xa0')]['questSubtext']=function(_0x54a32f){_0x54a32f=_0x54a32f['toUpperCase']()[_0x4f14('0x13a')]();const _0x2b70b5=this[_0x4f14('0xae')](_0x54a32f);if(!_0x2b70b5)return'';const _0x41d3aa=this[_0x4f14('0x3c')]()[_0x4f14('0x182')];_0x41d3aa[_0x54a32f]=_0x41d3aa[_0x54a32f]||0x1;const _0x111cd8=_0x41d3aa[_0x54a32f];return _0x2b70b5[_0x4f14('0x60')][_0x111cd8]||'';},Game_System[_0x4f14('0xa0')][_0x4f14('0xce')]=function(_0x579b78,_0x359505){_0x579b78=_0x579b78[_0x4f14('0x125')]()['trim']();const _0x14ad5c=this[_0x4f14('0xae')](_0x579b78);if(!_0x14ad5c)return'';const _0x24f779=this[_0x4f14('0x3c')]()['subtext'];_0x24f779[_0x579b78]=_0x359505;},Game_System['prototype']['questQuote']=function(_0x3d32e7){_0x3d32e7=_0x3d32e7['toUpperCase']()[_0x4f14('0x13a')]();const _0x5a1cb9=this['quest'](_0x3d32e7);if(!_0x5a1cb9)return'';const _0x3b76d4=this[_0x4f14('0x3c')]()['quotes'];_0x3b76d4[_0x3d32e7]=_0x3b76d4[_0x3d32e7]||0x1;const _0x25dd6b=_0x3b76d4[_0x3d32e7];return _0x5a1cb9[_0x4f14('0x2b')][_0x25dd6b]||'';},Game_System[_0x4f14('0xa0')][_0x4f14('0xd5')]=function(_0x384433,_0x54a0fa){_0x384433=_0x384433[_0x4f14('0x125')]()['trim']();const _0x9dd1d=this[_0x4f14('0xae')](_0x384433);if(!_0x9dd1d)return'';const _0x1ed8c4=this[_0x4f14('0x3c')]()[_0x4f14('0x36')];_0x1ed8c4[_0x384433]=_0x54a0fa;},Game_System[_0x4f14('0xa0')]['trackedQuest']=function(){const _0x1e51a9=this[_0x4f14('0x3c')]();return this['quest'](_0x1e51a9[_0x4f14('0xfd')]);},Game_System['prototype'][_0x4f14('0x10a')]=function(_0x39f727,_0x2486fb){const _0x342589=this['questData']();if(_0x2486fb&&_0x342589[_0x4f14('0xfd')]===_0x39f727)_0x39f727='';_0x342589[_0x4f14('0xfd')]=_0x39f727;if(SceneManager[_0x4f14('0x1cf')]()){if(_0x4f14('0x37')===_0x4f14('0x37'))SceneManager[_0x4f14('0x16b')][_0x4f14('0x61')](_0x39f727);else{function _0x5fac57(){const _0x1ccd4d=this[_0x4f14('0xd1')](_0x3a57f7);if(_0x1ccd4d===_0x4f14('0x1b9'))this[_0x4f14('0xa8')](_0x2275f5);else _0x1ccd4d===_0x4f14('0x1be')?this[_0x4f14('0x73')](_0x32a809):_0x50c7c0[_0x4f14('0xa0')][_0x4f14('0x1aa')][_0x4f14('0x26')](this,_0x544e45);}}}},Game_System['prototype']['isQuestTrackerVisible']=function(){const _0x2175e6=this[_0x4f14('0x3c')]();return _0x2175e6[_0x4f14('0x110')];},Game_System[_0x4f14('0xa0')][_0x4f14('0x8a')]=function(_0x6222cc){const _0x5502a5=this[_0x4f14('0x3c')]();_0x5502a5[_0x4f14('0x110')]=_0x6222cc;},VisuMZ[_0x4f14('0x141')][_0x4f14('0xde')]=Game_Map[_0x4f14('0xa0')][_0x4f14('0xe0')],Game_Map[_0x4f14('0xa0')][_0x4f14('0xe0')]=function(){VisuMZ[_0x4f14('0x141')][_0x4f14('0xde')][_0x4f14('0x26')](this);if(SceneManager[_0x4f14('0x1cf')]()){if(_0x4f14('0x1e5')===_0x4f14('0x1e5'))SceneManager['_scene'][_0x4f14('0x112')]();else{function _0x4c5115(){_0x931b33[_0x4f14('0x16b')][_0x4f14('0x112')]();}}}},VisuMZ[_0x4f14('0x141')][_0x4f14('0x128')]=Scene_Map[_0x4f14('0xa0')][_0x4f14('0xf8')],Scene_Map[_0x4f14('0xa0')]['createSpriteset']=function(){VisuMZ[_0x4f14('0x141')]['Scene_Map_createSpriteset'][_0x4f14('0x26')](this),this[_0x4f14('0x6b')]();},Scene_Map[_0x4f14('0xa0')][_0x4f14('0x6b')]=function(){if(!SceneManager[_0x4f14('0x1cf')]())return;const _0x3f88bb=this[_0x4f14('0x22')](),_0x35814f=new Window_QuestTracker(_0x3f88bb);this['addChild'](_0x35814f),this['_questTrackerWindow']=_0x35814f;},Scene_Map[_0x4f14('0xa0')][_0x4f14('0xf9')]=function(){return ConfigManager[_0x4f14('0x1ba')];},Scene_Map['prototype'][_0x4f14('0x22')]=function(){return VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')][_0x4f14('0xaf')][_0x4f14('0x55')][_0x4f14('0x26')](this);},Scene_Map[_0x4f14('0xa0')]['refreshQuestTrackerWindow']=function(){if(!this['_questTrackerWindow'])return;this['_questTrackerWindow'][_0x4f14('0x1bb')]();},Scene_Map[_0x4f14('0xa0')]['setQuestForQuestTrackerWindow']=function(_0x527fab){if(!this[_0x4f14('0x5b')])return;_0x527fab=_0x527fab[_0x4f14('0x125')]()[_0x4f14('0x13a')]();const _0x26a291=$gameSystem[_0x4f14('0xae')](_0x527fab);this[_0x4f14('0x5b')][_0x4f14('0x120')](_0x26a291);},VisuMZ[_0x4f14('0x141')][_0x4f14('0x51')]=Scene_Menu[_0x4f14('0xa0')][_0x4f14('0x12b')],Scene_Menu['prototype'][_0x4f14('0x12b')]=function(){VisuMZ[_0x4f14('0x141')][_0x4f14('0x51')][_0x4f14('0x26')](this),this[_0x4f14('0x1')][_0x4f14('0x95')](_0x4f14('0xae'),this[_0x4f14('0x1b6')][_0x4f14('0x5')](this));},Scene_Menu[_0x4f14('0xa0')][_0x4f14('0x1b6')]=function(){SceneManager[_0x4f14('0xb9')](Scene_Quest);},VisuMZ[_0x4f14('0x141')]['Scene_Options_maxCommands']=Scene_Options[_0x4f14('0xa0')][_0x4f14('0x14b')],Scene_Options[_0x4f14('0xa0')][_0x4f14('0x14b')]=function(){let _0x49b42e=VisuMZ[_0x4f14('0x141')]['Scene_Options_maxCommands'][_0x4f14('0x26')](this);if(VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')]['Tracker'][_0x4f14('0xbe')]){if(VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')][_0x4f14('0x4')][_0x4f14('0xbd')])_0x49b42e++;if(VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')][_0x4f14('0x4')][_0x4f14('0x1c1')])_0x49b42e++;}return _0x49b42e;};function Scene_Quest(){this[_0x4f14('0x149')](...arguments);}Scene_Quest['prototype']=Object[_0x4f14('0x170')](Scene_MenuBase[_0x4f14('0xa0')]),Scene_Quest[_0x4f14('0xa0')][_0x4f14('0xf3')]=Scene_Quest,Scene_Quest['prototype']['initialize']=function(){Scene_MenuBase[_0x4f14('0xa0')]['initialize'][_0x4f14('0x26')](this);},Scene_Quest['prototype'][_0x4f14('0x94')]=function(){return 0x0;},Scene_Quest[_0x4f14('0xa0')][_0x4f14('0x11e')]=function(){if(ConfigManager[_0x4f14('0x65')]&&ConfigManager[_0x4f14('0x156')]!==undefined){if('BozYw'===_0x4f14('0x15b'))return ConfigManager[_0x4f14('0x156')];else{function _0x3d8e32(){_0x1e30ac[_0x4f14('0x141')]['Settings'][_0x4f14('0x4')][_0x4f14('0xbd')]&&this[_0x4f14('0xa3')](),_0x5a1a19['QuestSystem'][_0x4f14('0xc7')][_0x4f14('0x4')][_0x4f14('0x1c1')]&&this['addQuestSystemquestTrackerPositionCommand']();}}}else return ConfigManager[_0x4f14('0x65')]===![]?![]:Scene_MenuBase['prototype'][_0x4f14('0x11e')]['call'](this);},Scene_Quest[_0x4f14('0xa0')][_0x4f14('0x103')]=function(){return(Graphics[_0x4f14('0x106')]-0x230)[_0x4f14('0x7')](0xf0,Math[_0x4f14('0x1c6')](Graphics[_0x4f14('0x106')]/0x2));},Scene_Quest['prototype']['create']=function(){Scene_MenuBase['prototype'][_0x4f14('0x170')][_0x4f14('0x26')](this),this[_0x4f14('0x12b')](),this[_0x4f14('0xd3')](),this['createQuestLogWindow'](),this['createQuestListWindow']();},Scene_Quest[_0x4f14('0xa0')][_0x4f14('0x12b')]=function(){const _0x190142=this[_0x4f14('0x25')](),_0x2ddbf5=new Window_QuestCommand(_0x190142);_0x2ddbf5['setHandler']('known',this[_0x4f14('0x19c')][_0x4f14('0x5')](this)),_0x2ddbf5[_0x4f14('0x95')](_0x4f14('0x1a9'),this[_0x4f14('0x19c')]['bind'](this)),_0x2ddbf5[_0x4f14('0x95')](_0x4f14('0x102'),this[_0x4f14('0x19c')][_0x4f14('0x5')](this)),_0x2ddbf5[_0x4f14('0x95')](_0x4f14('0xc6'),this[_0x4f14('0x142')]['bind'](this)),this['addWindow'](_0x2ddbf5),this[_0x4f14('0x1')]=_0x2ddbf5,_0x2ddbf5[_0x4f14('0x1a8')](VisuMZ['QuestSystem'][_0x4f14('0xc7')][_0x4f14('0xaf')][_0x4f14('0x1a0')]);},Scene_Quest[_0x4f14('0xa0')][_0x4f14('0x25')]=function(){return VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')][_0x4f14('0xaf')][_0x4f14('0xa7')][_0x4f14('0x26')](this);},Scene_Quest[_0x4f14('0xa0')][_0x4f14('0xd3')]=function(){const _0x4b80fc=this['questLabelWindowRect'](),_0x102a1b=new Window_Base(_0x4b80fc);this[_0x4f14('0x3f')](_0x102a1b),this[_0x4f14('0x7a')]=_0x102a1b,_0x102a1b[_0x4f14('0x1a8')](VisuMZ['QuestSystem'][_0x4f14('0xc7')][_0x4f14('0xaf')]['QuestLabel_BgType']);},Scene_Quest[_0x4f14('0xa0')][_0x4f14('0x126')]=function(){return VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')][_0x4f14('0xaf')][_0x4f14('0x98')][_0x4f14('0x26')](this);},Scene_Quest['prototype'][_0x4f14('0xc8')]=function(){const _0x33306b=this[_0x4f14('0xd9')](),_0x4e2db4=new Window_QuestLog(_0x33306b);this[_0x4f14('0x3f')](_0x4e2db4),this[_0x4f14('0x12c')]=_0x4e2db4,_0x4e2db4['setBackgroundType'](VisuMZ[_0x4f14('0x141')]['Settings'][_0x4f14('0xaf')]['LogWindow_BgType']);},Scene_Quest['prototype'][_0x4f14('0xd9')]=function(){return VisuMZ[_0x4f14('0x141')]['Settings'][_0x4f14('0xaf')]['LogWindow_Rect'][_0x4f14('0x26')](this);},Scene_Quest[_0x4f14('0xa0')][_0x4f14('0x123')]=function(){const _0xf7147a=this[_0x4f14('0xa6')](),_0x2bb8d8=new Window_QuestList(_0xf7147a);_0x2bb8d8[_0x4f14('0x95')](_0x4f14('0x8'),this[_0x4f14('0x1e2')]['bind'](this)),_0x2bb8d8[_0x4f14('0x95')](_0x4f14('0xae'),this[_0x4f14('0xc0')][_0x4f14('0x5')](this)),_0x2bb8d8[_0x4f14('0x95')]('cancel',this[_0x4f14('0x18a')][_0x4f14('0x5')](this)),this[_0x4f14('0x3f')](_0x2bb8d8),this[_0x4f14('0x17b')]=_0x2bb8d8,_0x2bb8d8[_0x4f14('0x1a8')](VisuMZ['QuestSystem'][_0x4f14('0xc7')][_0x4f14('0xaf')][_0x4f14('0x8b')]),this[_0x4f14('0x1')][_0x4f14('0x75')](this[_0x4f14('0x17b')]),this[_0x4f14('0x17b')][_0x4f14('0x2d')](this['_labelWindow']),this['_listWindow'][_0x4f14('0x8c')](this[_0x4f14('0x12c')]);},Scene_Quest[_0x4f14('0xa0')][_0x4f14('0xa6')]=function(){return VisuMZ[_0x4f14('0x141')]['Settings'][_0x4f14('0xaf')][_0x4f14('0xac')][_0x4f14('0x26')](this);},Scene_Quest[_0x4f14('0xa0')][_0x4f14('0x19c')]=function(){this[_0x4f14('0x17b')][_0x4f14('0x19b')](),this[_0x4f14('0x17b')][_0x4f14('0x194')](0x0);},Scene_Quest['prototype'][_0x4f14('0x1e2')]=function(){this[_0x4f14('0x17b')][_0x4f14('0x18e')](),this[_0x4f14('0x17b')][_0x4f14('0x19b')]();},Scene_Quest['prototype'][_0x4f14('0xc0')]=function(){const _0x27d9ca=this[_0x4f14('0x17b')][_0x4f14('0x136')](),_0x590221=_0x27d9ca[_0x4f14('0x18f')][_0x4f14('0x125')]()[_0x4f14('0x13a')]();$gameSystem[_0x4f14('0x10a')](_0x590221,!![]),this[_0x4f14('0x17b')][_0x4f14('0x1bb')](),this[_0x4f14('0x17b')][_0x4f14('0x19b')]();},Scene_Quest[_0x4f14('0xa0')][_0x4f14('0x18a')]=function(){this[_0x4f14('0x17b')]['deselect'](),this[_0x4f14('0x1')][_0x4f14('0x19b')]();},Scene_Quest[_0x4f14('0xa0')][_0x4f14('0x1e1')]=function(){return TextManager[_0x4f14('0x83')];},Scene_Quest[_0x4f14('0xa0')][_0x4f14('0x74')]=function(){if(this[_0x4f14('0x17b')]&&this[_0x4f14('0x17b')][_0x4f14('0x131')]){if(_0x4f14('0x44')===_0x4f14('0x181')){function _0x499e48(){_0x174f0a[_0x4f14('0x79')]('pagedown')&&this['smoothScrollDown'](_0xb16ba4[_0x4f14('0x1de')]),_0x25ea5e[_0x4f14('0x79')](_0x4f14('0x39'))&&this[_0x4f14('0x1e4')](_0x497663['scrollSpeed']);}}else{if(this[_0x4f14('0x17b')]['currentQuest']())return this[_0x4f14('0x17b')][_0x4f14('0xea')]()?TextManager['questButtonAssistActive']:'';else{if(this[_0x4f14('0x17b')][_0x4f14('0x47')]()){if(_0x4f14('0x186')!==_0x4f14('0x186')){function _0x4346ba(){this[_0x4f14('0xe6')](_0x5dcd1c,_0x4f14('0x102'));}}else return TextManager[_0x4f14('0x105')];}else{if(_0x4f14('0x188')!==_0x4f14('0x34'))return TextManager[_0x4f14('0xc9')];else{function _0x5aa403(){this[_0x4f14('0xd6')]=this['contentsHeight']()+_0x2140b6['windowPadding']()*0x2,_0xd67e45[_0x4f14('0xa0')][_0x4f14('0x17d')][_0x4f14('0x26')](this);}}}}}}return Scene_MenuBase[_0x4f14('0xa0')][_0x4f14('0x74')][_0x4f14('0x26')](this);},Scene_Quest[_0x4f14('0xa0')][_0x4f14('0x17a')]=function(){Scene_MenuBase[_0x4f14('0xa0')][_0x4f14('0x17a')]['call'](this),this[_0x4f14('0x1a')](this[_0x4f14('0x1c8')]()),this[_0x4f14('0x167')]();},Scene_Quest['prototype'][_0x4f14('0x1c8')]=function(){return VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')][_0x4f14('0x11f')][_0x4f14('0x2e')];},Scene_Quest[_0x4f14('0xa0')][_0x4f14('0x167')]=function(){const _0x30335c={'BgFilename1':VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')][_0x4f14('0x11f')][_0x4f14('0x14c')],'BgFilename2':VisuMZ[_0x4f14('0x141')]['Settings'][_0x4f14('0x11f')][_0x4f14('0x8e')]};_0x30335c&&(_0x30335c[_0x4f14('0x14c')]!==''||_0x30335c[_0x4f14('0x8e')]!=='')&&(this['_backSprite1']=new Sprite(ImageManager[_0x4f14('0x15')](_0x30335c[_0x4f14('0x14c')])),this[_0x4f14('0x1c3')]=new Sprite(ImageManager[_0x4f14('0x114')](_0x30335c[_0x4f14('0x8e')])),this[_0x4f14('0x66')](this[_0x4f14('0xf6')]),this[_0x4f14('0x66')](this[_0x4f14('0x1c3')]),this[_0x4f14('0xf6')][_0x4f14('0x70')][_0x4f14('0x15a')](this[_0x4f14('0xb0')][_0x4f14('0x5')](this,this['_backSprite1'])),this[_0x4f14('0x1c3')][_0x4f14('0x70')][_0x4f14('0x15a')](this[_0x4f14('0xb0')][_0x4f14('0x5')](this,this[_0x4f14('0x1c3')])));},Scene_Quest[_0x4f14('0xa0')][_0x4f14('0xb0')]=function(_0xde2bb9){this[_0x4f14('0x16d')](_0xde2bb9),this['centerSprite'](_0xde2bb9);},VisuMZ[_0x4f14('0x141')]['Window_MenuCommand_addOriginalCommands']=Window_MenuCommand[_0x4f14('0xa0')][_0x4f14('0xa4')],Window_MenuCommand[_0x4f14('0xa0')][_0x4f14('0xa4')]=function(){VisuMZ[_0x4f14('0x141')][_0x4f14('0x127')]['call'](this),this[_0x4f14('0x12d')]();},Window_MenuCommand[_0x4f14('0xa0')][_0x4f14('0x12d')]=function(){if(!this[_0x4f14('0xcf')]())return;if(!this[_0x4f14('0xf7')]())return;const _0x308baa=TextManager[_0x4f14('0x1d3')],_0x3313fd=this[_0x4f14('0xe4')]();this[_0x4f14('0x12e')](_0x308baa,_0x4f14('0xae'),_0x3313fd);},Window_MenuCommand[_0x4f14('0xa0')][_0x4f14('0xcf')]=function(){return Imported['VisuMZ_1_MainMenuCore']?![]:!![];},Window_MenuCommand[_0x4f14('0xa0')][_0x4f14('0xf7')]=function(){return $gameSystem[_0x4f14('0x81')]();},Window_MenuCommand['prototype'][_0x4f14('0xe4')]=function(){return $gameSystem[_0x4f14('0x32')]();},VisuMZ[_0x4f14('0x141')][_0x4f14('0x1a1')]=Window_Options['prototype']['addGeneralOptions'],Window_Options[_0x4f14('0xa0')][_0x4f14('0xd0')]=function(){VisuMZ[_0x4f14('0x141')][_0x4f14('0x1a1')][_0x4f14('0x26')](this),this['addQuestSystemCommands']();},Window_Options[_0x4f14('0xa0')][_0x4f14('0x1ae')]=function(){if(VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')][_0x4f14('0x4')][_0x4f14('0xbd')]){if(_0x4f14('0x24')!==_0x4f14('0x24')){function _0x58e59f(){const _0x53d954=_0x2d0cd6[_0x4f14('0x141')][_0x4f14('0xca')][_0x4f14('0x26')](this);return _0x53d954[_0x4f14('0x10f')]=this[_0x4f14('0x10f')],_0x53d954[_0x4f14('0x1ba')]=this[_0x4f14('0x1ba')],_0x53d954;}}else this[_0x4f14('0xa3')]();}VisuMZ['QuestSystem'][_0x4f14('0xc7')][_0x4f14('0x4')][_0x4f14('0x1c1')]&&this[_0x4f14('0x99')]();},Window_Options[_0x4f14('0xa0')]['addQuestSystemquestTrackerShowCommand']=function(){const _0x52040c=TextManager[_0x4f14('0x10f')],_0xcf2cac='questTrackerShow';this['addCommand'](_0x52040c,_0xcf2cac);},Window_Options[_0x4f14('0xa0')][_0x4f14('0x99')]=function(){const _0x4110e3=TextManager['questTrackerPosition'],_0xbaae43=_0x4f14('0x1ba');this[_0x4f14('0x12e')](_0x4110e3,_0xbaae43);},VisuMZ['QuestSystem'][_0x4f14('0x154')]=Window_Options[_0x4f14('0xa0')][_0x4f14('0x1a6')],Window_Options[_0x4f14('0xa0')][_0x4f14('0x1a6')]=function(_0x301c7a){const _0x11d0be=this['commandSymbol'](_0x301c7a);if(_0x11d0be===_0x4f14('0x1ba')){if(_0x4f14('0x1ad')!==_0x4f14('0x1ad')){function _0x209fd9(){this[_0x4f14('0xa9')]();}}else{const _0x377344=this[_0x4f14('0x199')](_0x11d0be);return _0x377344?TextManager[_0x4f14('0x1b7')]:TextManager[_0x4f14('0x7f')];}}return VisuMZ[_0x4f14('0x141')][_0x4f14('0x154')][_0x4f14('0x26')](this,_0x301c7a);};function Window_QuestCommand(){this[_0x4f14('0x149')](...arguments);}Window_QuestCommand[_0x4f14('0xa0')]=Object[_0x4f14('0x170')](Window_Command[_0x4f14('0xa0')]),Window_QuestCommand[_0x4f14('0xa0')][_0x4f14('0xf3')]=Window_QuestCommand,Window_QuestCommand[_0x4f14('0xa0')][_0x4f14('0x149')]=function(_0x393447){Window_Command[_0x4f14('0xa0')][_0x4f14('0x149')][_0x4f14('0x26')](this,_0x393447),this[_0x4f14('0xba')](_0x393447);},Window_QuestCommand[_0x4f14('0xa0')][_0x4f14('0xba')]=function(_0x4d5da3){const _0x244db0=new Rectangle(0x0,0x0,_0x4d5da3[_0x4f14('0x159')],_0x4d5da3[_0x4f14('0xd6')]);this[_0x4f14('0x9a')]=new Window_Base(_0x244db0),this[_0x4f14('0x9a')]['opacity']=0x0,this['addChild'](this[_0x4f14('0x9a')]),this[_0x4f14('0x152')]();},Window_QuestCommand[_0x4f14('0xa0')][_0x4f14('0xb1')]=function(){Window_Command['prototype']['callUpdateHelp'][_0x4f14('0x26')](this);if(this['_commandNameWindow'])this[_0x4f14('0x152')]();if(this[_0x4f14('0x17b')])this[_0x4f14('0x17b')]['setCategoryFilter'](this[_0x4f14('0xa')]());},Window_QuestCommand[_0x4f14('0xa0')][_0x4f14('0x152')]=function(){const _0x100e81=this[_0x4f14('0x9a')];_0x100e81['contents'][_0x4f14('0x5f')]();const _0x3beeab=this[_0x4f14('0xd1')](this[_0x4f14('0xb5')]());if(_0x3beeab===_0x4f14('0x1be')){const _0x248f07=this['itemLineRect'](this['index']());let _0x39204b=this[_0x4f14('0x163')](this[_0x4f14('0xb5')]());_0x39204b=_0x39204b['replace'](/\\I\[(\d+)\]/gi,''),_0x100e81[_0x4f14('0xcb')](),this[_0x4f14('0x1c0')](_0x39204b,_0x248f07),this[_0x4f14('0x3a')](_0x39204b,_0x248f07),this[_0x4f14('0x19d')](_0x39204b,_0x248f07);}},Window_QuestCommand[_0x4f14('0xa0')]['commandNameWindowDrawBackground']=function(_0x5db773,_0x5641c7){},Window_QuestCommand[_0x4f14('0xa0')][_0x4f14('0x3a')]=function(_0x29476c,_0x1be902){const _0x4a5a58=this[_0x4f14('0x9a')];_0x4a5a58[_0x4f14('0x121')](_0x29476c,0x0,_0x1be902['y'],_0x4a5a58[_0x4f14('0xfc')],_0x4f14('0x124'));},Window_QuestCommand[_0x4f14('0xa0')][_0x4f14('0x19d')]=function(_0x50dc74,_0x5dae00){const _0x32296=this[_0x4f14('0x9a')],_0x4abddb=$gameSystem[_0x4f14('0x1c9')](),_0x213734=_0x5dae00['x']+Math['floor'](_0x5dae00[_0x4f14('0x159')]/0x2)+_0x4abddb;_0x32296['x']=_0x32296[_0x4f14('0x159')]/-0x2+_0x213734,_0x32296['y']=Math[_0x4f14('0x1c6')](_0x5dae00[_0x4f14('0xd6')]/0x2);},Window_QuestCommand['prototype'][_0x4f14('0x161')]=function(){this[_0x4f14('0xc3')](),this[_0x4f14('0x168')](),this[_0x4f14('0x3')]();},Window_QuestCommand['prototype'][_0x4f14('0xc3')]=function(){const _0x335945=_0x4f14('0x17e'),_0xdaaa7d=ImageManager[_0x4f14('0x15d')];let _0x594728=TextManager[_0x4f14('0xa1')];_0xdaaa7d>0x0&&this[_0x4f14('0x173')]()!==_0x4f14('0x15f')&&(_0x594728=_0x4f14('0xd8')['format'](_0xdaaa7d,_0x594728));const _0x3b9d84=this[_0x4f14('0x19a')]();this['addCommand'](_0x594728,_0x335945,_0x3b9d84);},Window_QuestCommand[_0x4f14('0xa0')][_0x4f14('0x19a')]=function(){return $gameSystem[_0x4f14('0xa5')]()[_0x4f14('0x155')]>0x0;},Window_QuestCommand[_0x4f14('0xa0')][_0x4f14('0x168')]=function(){const _0x2f8457=_0x4f14('0x1a9'),_0x42bcbd=ImageManager[_0x4f14('0x13c')];let _0x382f72=TextManager[_0x4f14('0xc1')];if(_0x42bcbd>0x0&&this[_0x4f14('0x173')]()!=='text'){if(_0x4f14('0x23')==='yZyYi'){function _0x2548d1(){return 0x0;}}else _0x382f72=_0x4f14('0xd8')[_0x4f14('0x175')](_0x42bcbd,_0x382f72);}const _0x29b724=this[_0x4f14('0xd')]();this['addCommand'](_0x382f72,_0x2f8457,_0x29b724);},Window_QuestCommand[_0x4f14('0xa0')]['isCompletedQuestsEnabled']=function(){return $gameSystem[_0x4f14('0x33')]()[_0x4f14('0x155')]>0x0;},Window_QuestCommand[_0x4f14('0xa0')][_0x4f14('0x3')]=function(){if(!this[_0x4f14('0x195')]())return;const _0x58762c=_0x4f14('0x102'),_0x1ec653=ImageManager[_0x4f14('0xfb')];let _0x132606=TextManager[_0x4f14('0x2c')];_0x1ec653>0x0&&this['commandStyle']()!=='text'&&(_0x132606=_0x4f14('0xd8')['format'](_0x1ec653,_0x132606));const _0x2e69cc=this[_0x4f14('0x1c2')]();this[_0x4f14('0x12e')](_0x132606,_0x58762c,_0x2e69cc);},Window_QuestCommand[_0x4f14('0xa0')][_0x4f14('0x195')]=function(){return VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')][_0x4f14('0xaf')]['ShowFailed'];},Window_QuestCommand[_0x4f14('0xa0')][_0x4f14('0x1c2')]=function(){return $gameSystem['questsFailed']()['length']>0x0;},Window_QuestCommand[_0x4f14('0xa0')][_0x4f14('0xf4')]=function(){return this[_0x4f14('0x195')]()?0x3:0x2;},Window_QuestCommand['prototype'][_0x4f14('0x145')]=function(){return VisuMZ[_0x4f14('0x141')]['Settings']['Window'][_0x4f14('0x5c')];},Window_QuestCommand[_0x4f14('0xa0')][_0x4f14('0x1aa')]=function(_0x17e968){const _0x4324ef=this[_0x4f14('0xd1')](_0x17e968);if(_0x4324ef===_0x4f14('0x1b9')){if(_0x4f14('0x198')!==_0x4f14('0x198')){function _0x247697(){const _0x3d44f0=this[_0x4f14('0x9a')];_0x3d44f0[_0x4f14('0x1b0')][_0x4f14('0x5f')]();const _0xaf434a=this[_0x4f14('0xd1')](this[_0x4f14('0xb5')]());if(_0xaf434a===_0x4f14('0x1be')){const _0x9e5063=this[_0x4f14('0x62')](this[_0x4f14('0xb5')]());let _0x52549a=this[_0x4f14('0x163')](this[_0x4f14('0xb5')]());_0x52549a=_0x52549a[_0x4f14('0xdd')](/\\I\[(\d+)\]/gi,''),_0x3d44f0[_0x4f14('0xcb')](),this[_0x4f14('0x1c0')](_0x52549a,_0x9e5063),this[_0x4f14('0x3a')](_0x52549a,_0x9e5063),this[_0x4f14('0x19d')](_0x52549a,_0x9e5063);}}}else this['drawItemStyleIconText'](_0x17e968);}else _0x4324ef===_0x4f14('0x1be')?this['drawItemStyleIcon'](_0x17e968):Window_HorzCommand[_0x4f14('0xa0')][_0x4f14('0x1aa')][_0x4f14('0x26')](this,_0x17e968);},Window_QuestCommand[_0x4f14('0xa0')][_0x4f14('0x173')]=function(){return VisuMZ[_0x4f14('0x141')]['Settings'][_0x4f14('0xaf')][_0x4f14('0x160')];},Window_QuestCommand[_0x4f14('0xa0')][_0x4f14('0xd1')]=function(_0x5eb39a){if(_0x5eb39a<0x0)return _0x4f14('0x15f');const _0x249bcd=this['commandStyle']();if(_0x249bcd!==_0x4f14('0x91')){if('WHQxs'===_0x4f14('0x1b2')){function _0x248c7d(){const _0x259848=this[_0x4f14('0x3c')]();return _0x259848[_0x4f14('0x17e')]=_0x259848[_0x4f14('0x17e')]||[],_0x259848[_0x4f14('0x17e')]['map'](_0x278533=>this[_0x4f14('0xae')](_0x278533))['remove'](null);}}else return _0x249bcd;}else{if(this[_0x4f14('0x1d0')]()>0x0){const _0x959d89=this['commandName'](_0x5eb39a);if(_0x959d89[_0x4f14('0x151')](/\\I\[(\d+)\]/i)){const _0x848ad6=this[_0x4f14('0x62')](_0x5eb39a),_0x1ffb5f=this['textSizeEx'](_0x959d89)[_0x4f14('0x159')];if(_0x1ffb5f<=_0x848ad6[_0x4f14('0x159')]){if(_0x4f14('0x3e')!==_0x4f14('0x3e')){function _0x2be789(){if(!_0x28d2cf[_0x4f14('0x164')])return _0x82ebba;if(!_0x5b58ac['VisuMZ_1_MessageCore'])return _0x5bd79d;return _0x25cb5f=_0x4f14('0x7c')[_0x4f14('0x175')](_0x2943aa),_0x2a49e2;}}else return'iconText';}else return _0x4f14('0x1be');}}}return _0x4f14('0x15f');},Window_QuestCommand[_0x4f14('0xa0')][_0x4f14('0xa8')]=function(_0x1c91d4){const _0x16fbec=this['itemLineRect'](_0x1c91d4),_0x31f356=this[_0x4f14('0x163')](_0x1c91d4),_0xcc7727=this[_0x4f14('0xb4')](_0x31f356)['width'];this[_0x4f14('0x19e')](this[_0x4f14('0xf0')](_0x1c91d4));const _0x400159=this[_0x4f14('0x145')]();if(_0x400159===_0x4f14('0x3b'))this['drawTextEx'](_0x31f356,_0x16fbec['x']+_0x16fbec[_0x4f14('0x159')]-_0xcc7727,_0x16fbec['y'],_0xcc7727);else{if(_0x400159==='center'){const _0x4a31c7=_0x16fbec['x']+Math['floor']((_0x16fbec[_0x4f14('0x159')]-_0xcc7727)/0x2);this[_0x4f14('0x2')](_0x31f356,_0x4a31c7,_0x16fbec['y'],_0xcc7727);}else{if(_0x4f14('0x184')!==_0x4f14('0x184')){function _0x18d7a8(){_0x26f912=_0x1a5fe7[_0x4f14('0x125')]()[_0x4f14('0x13a')]();const _0x3e3a05=this[_0x4f14('0xae')](_0x1a4b1b);if(!_0x3e3a05)return'';const _0xd47a28=this['questData']();return _0xd47a28[_0x4f14('0x1a2')]=_0xd47a28[_0x4f14('0x1a2')]||{},!_0xd47a28[_0x4f14('0x1a2')][_0x3da2c9]&&(_0xd47a28[_0x4f14('0x1a2')][_0x46c69b]=_0x1efc69[_0x4f14('0x146')](_0x3e3a05['VisibleObjectives'])),_0xd47a28['objectives'][_0x322980][_0x4f14('0xe9')]((_0x5e5c27,_0x5c7a48)=>_0x5e5c27-_0x5c7a48);}}else this['drawTextEx'](_0x31f356,_0x16fbec['x'],_0x16fbec['y'],_0xcc7727);}}},Window_QuestCommand[_0x4f14('0xa0')]['drawItemStyleIcon']=function(_0x5d33aa){this[_0x4f14('0x163')](_0x5d33aa)[_0x4f14('0x151')](/\\I\[(\d+)\]/i);const _0x1c69a6=Number(RegExp['$1'])||0x0,_0x2d9759=this[_0x4f14('0x62')](_0x5d33aa),_0x6d9894=_0x2d9759['x']+Math[_0x4f14('0x1c6')]((_0x2d9759[_0x4f14('0x159')]-ImageManager[_0x4f14('0x41')])/0x2),_0x2ca836=_0x2d9759['y']+(_0x2d9759[_0x4f14('0xd6')]-ImageManager[_0x4f14('0x1dc')])/0x2;this[_0x4f14('0x174')](_0x1c69a6,_0x6d9894,_0x2ca836);},Window_QuestCommand[_0x4f14('0xa0')][_0x4f14('0x75')]=function(_0xa494d0){this[_0x4f14('0x17b')]=_0xa494d0,this[_0x4f14('0xb1')]();};function Window_QuestList(){this['initialize'](...arguments);}Window_QuestList[_0x4f14('0x180')]=VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')]['Categories'],Window_QuestList[_0x4f14('0xa0')]=Object['create'](Window_Command[_0x4f14('0xa0')]),Window_QuestList[_0x4f14('0xa0')]['constructor']=Window_QuestList,Window_QuestList[_0x4f14('0xa0')][_0x4f14('0x149')]=function(_0x5597a5){this['initCategories'](),Window_Command['prototype'][_0x4f14('0x149')][_0x4f14('0x26')](this,_0x5597a5),this[_0x4f14('0xba')](_0x5597a5),this['deactivate'](),this[_0x4f14('0xc4')]();},Window_QuestList['prototype'][_0x4f14('0x1c7')]=function(){this['_categoryStatus']={};for(const _0x293a7f of VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')][_0x4f14('0x13')]){this[_0x4f14('0x6a')][_0x293a7f['CategoryName']]=!![];}this[_0x4f14('0x89')]=_0x4f14('0x17e');},Window_QuestList['prototype'][_0x4f14('0x1dd')]=function(_0x18844e){if(this[_0x4f14('0x89')]===_0x18844e)return;this[_0x4f14('0x89')]=_0x18844e,this[_0x4f14('0x1bb')]();},Window_QuestList[_0x4f14('0xa0')][_0x4f14('0x18e')]=function(){const _0x2d0e6b=this[_0x4f14('0x196')]();this[_0x4f14('0x6a')][_0x2d0e6b[_0x4f14('0x178')]]=!this[_0x4f14('0x6a')][_0x2d0e6b[_0x4f14('0x178')]],this[_0x4f14('0x1bb')](),this[_0x4f14('0xb1')]();},Window_QuestList[_0x4f14('0xa0')][_0x4f14('0x47')]=function(){const _0x4902f5=this[_0x4f14('0x196')]();return this['_categoryStatus'][_0x4902f5]&&this[_0x4f14('0x6a')][_0x4902f5['CategoryName']];},Window_QuestList['prototype'][_0x4f14('0xba')]=function(_0x120200){const _0x50a253=new Rectangle(0x0,0x0,_0x120200[_0x4f14('0x159')],_0x120200[_0x4f14('0xd6')]);this[_0x4f14('0x9a')]=new Window_Base(_0x50a253),this['_commandNameWindow'][_0x4f14('0x8d')]=0x0,this[_0x4f14('0x66')](this[_0x4f14('0x9a')]),this[_0x4f14('0x152')]();},Window_QuestList[_0x4f14('0xa0')][_0x4f14('0xb1')]=function(){Window_Command[_0x4f14('0xa0')][_0x4f14('0xb1')][_0x4f14('0x26')](this);if(this[_0x4f14('0x9a')])this[_0x4f14('0x152')]();if(this[_0x4f14('0x7a')])this['updateLabelWindow']();if(this[_0x4f14('0x12c')])this[_0x4f14('0x1a3')]();},Window_QuestList[_0x4f14('0xa0')][_0x4f14('0x152')]=function(){const _0x3dfca3=this['_commandNameWindow'];_0x3dfca3['contents'][_0x4f14('0x5f')]();const _0xa6412f=this[_0x4f14('0xd1')](this['index']());if(_0xa6412f===_0x4f14('0x1be')){const _0x1ee20a=this[_0x4f14('0x62')](this[_0x4f14('0xb5')]());let _0x2f281f=this[_0x4f14('0x163')](this[_0x4f14('0xb5')]());_0x2f281f=_0x2f281f['replace'](/\\I\[(\d+)\]/gi,''),_0x3dfca3[_0x4f14('0xcb')](),this[_0x4f14('0x1c0')](_0x2f281f,_0x1ee20a),this['commandNameWindowDrawText'](_0x2f281f,_0x1ee20a),this[_0x4f14('0x19d')](_0x2f281f,_0x1ee20a);}},Window_QuestList[_0x4f14('0xa0')][_0x4f14('0x1c0')]=function(_0x279f87,_0x2bf0af){},Window_QuestList[_0x4f14('0xa0')]['commandNameWindowDrawText']=function(_0x2378a2,_0x4b9dd5){const _0x764a78=this[_0x4f14('0x9a')];_0x764a78[_0x4f14('0x121')](_0x2378a2,0x0,_0x4b9dd5['y'],_0x764a78['innerWidth'],_0x4f14('0x124'));},Window_QuestList[_0x4f14('0xa0')][_0x4f14('0x19d')]=function(_0x45891c,_0x240f7a){const _0x545e80=this[_0x4f14('0x9a')],_0x1591d6=$gameSystem[_0x4f14('0x1c9')](),_0xdb9ca0=_0x240f7a['x']+Math[_0x4f14('0x1c6')](_0x240f7a[_0x4f14('0x159')]/0x2)+_0x1591d6;_0x545e80['x']=_0x545e80[_0x4f14('0x159')]/-0x2+_0xdb9ca0,_0x545e80['y']=Math[_0x4f14('0x1c6')](_0x240f7a[_0x4f14('0xd6')]/0x2);},Window_QuestList[_0x4f14('0xa0')]['makeCommandList']=function(){for(const _0x4dc583 of Window_QuestList[_0x4f14('0x180')]){if(!_0x4dc583)continue;if(!this[_0x4f14('0xb3')](_0x4dc583))continue;this['addCategoryCommand'](_0x4dc583),this[_0x4f14('0x84')](_0x4dc583);}this[_0x4f14('0x132')][_0x4f14('0x155')]<=0x0&&this[_0x4f14('0x6')]();},Window_QuestList[_0x4f14('0xa0')][_0x4f14('0x6')]=function(){this[_0x4f14('0x12e')](TextManager['noQuestsListed'],_0x4f14('0xc6'),![]);},Window_QuestList[_0x4f14('0xa0')][_0x4f14('0xb3')]=function(_0x2c7358){for(const _0x20ac72 of _0x2c7358[_0x4f14('0x150')]){if(_0x4f14('0x28')==='OEKYn'){if(!_0x20ac72)continue;switch(this[_0x4f14('0x89')]){case _0x4f14('0x17e'):if($gameSystem[_0x4f14('0x82')](_0x20ac72[_0x4f14('0x18f')]))return!![];break;case _0x4f14('0x1a9'):if($gameSystem[_0x4f14('0x43')](_0x20ac72['Key']))return!![];break;case _0x4f14('0x102'):if($gameSystem[_0x4f14('0x21')](_0x20ac72[_0x4f14('0x18f')]))return!![];break;}}else{function _0x33e1e5(){return _0x5dcefd['replace'](/<(?:BR|LINEBREAK)>/gi,'');}}}return![];},Window_QuestList[_0x4f14('0xa0')]['addCategoryCommand']=function(_0x41bfad){const _0x94fe39=this[_0x4f14('0x4c')](_0x41bfad)?TextManager['questCategoryOpenedFmt']:TextManager[_0x4f14('0x4a')],_0x1f4c82=this['getTotalCategoryQuests'](_0x41bfad)[_0x4f14('0x155')],_0x24cc03=_0x94fe39[_0x4f14('0x175')](_0x41bfad[_0x4f14('0x178')],_0x1f4c82);this[_0x4f14('0x12e')](_0x24cc03,_0x4f14('0x8'),!![],_0x41bfad);},Window_QuestList[_0x4f14('0xa0')][_0x4f14('0x13b')]=function(_0x14aa11){switch(this[_0x4f14('0x89')]){case _0x4f14('0x17e'):return $gameSystem['questsKnown']()[_0x4f14('0xfa')](_0x3e85ee=>_0x3e85ee[_0x4f14('0x8')]===_0x14aa11);break;case _0x4f14('0x1a9'):return $gameSystem[_0x4f14('0x33')]()[_0x4f14('0xfa')](_0x399b07=>_0x399b07[_0x4f14('0x8')]===_0x14aa11);break;case _0x4f14('0x102'):return $gameSystem[_0x4f14('0x29')]()[_0x4f14('0xfa')](_0x23af1b=>_0x23af1b[_0x4f14('0x8')]===_0x14aa11);break;}return[];},Window_QuestList['prototype']['makeQuestList']=function(_0x4cd8f8){if(!this[_0x4f14('0x4c')](_0x4cd8f8))return;for(const _0x3a4fdb of _0x4cd8f8[_0x4f14('0x150')]){if(!_0x3a4fdb)continue;switch(this['_categoryFilter']){case'known':if($gameSystem['isQuestKnown'](_0x3a4fdb[_0x4f14('0x18f')]))this[_0x4f14('0x12d')](_0x3a4fdb);break;case _0x4f14('0x1a9'):if($gameSystem['isQuestCompleted'](_0x3a4fdb[_0x4f14('0x18f')]))this[_0x4f14('0x12d')](_0x3a4fdb);break;case _0x4f14('0x102'):if($gameSystem[_0x4f14('0x21')](_0x3a4fdb[_0x4f14('0x18f')]))this[_0x4f14('0x12d')](_0x3a4fdb);break;}}},Window_QuestList[_0x4f14('0xa0')]['isCategoryOpen']=function(_0x42e477){return this[_0x4f14('0x6a')][_0x42e477['CategoryName']];},Window_QuestList[_0x4f14('0xa0')][_0x4f14('0x12d')]=function(_0x532291){let _0x4833c4=_0x532291[_0x4f14('0xed')];if(_0x532291===$gameSystem[_0x4f14('0x11d')]()){if(_0x4f14('0x20')===_0x4f14('0x88')){function _0x57dc26(){return _0x583e61[_0x4f14('0x16f')];}}else _0x4833c4=TextManager[_0x4f14('0x1b8')][_0x4f14('0x175')](_0x4833c4);}this[_0x4f14('0x12e')](_0x4833c4,_0x4f14('0xae'),!![],_0x532291);},Window_QuestList[_0x4f14('0xa0')][_0x4f14('0x145')]=function(){return _0x4f14('0xaa');},Window_QuestList[_0x4f14('0xa0')][_0x4f14('0x1aa')]=function(_0x4dd126){const _0x34a026=this[_0x4f14('0xd1')](_0x4dd126);if(_0x34a026===_0x4f14('0x1b9')){if(_0x4f14('0x72')==='NJWzR'){function _0x12cfdc(){this[_0x4f14('0x17b')][_0x4f14('0x18e')](),this[_0x4f14('0x17b')][_0x4f14('0x19b')]();}}else this[_0x4f14('0xa8')](_0x4dd126);}else _0x34a026===_0x4f14('0x1be')?this['drawItemStyleIcon'](_0x4dd126):Window_HorzCommand[_0x4f14('0xa0')][_0x4f14('0x1aa')][_0x4f14('0x26')](this,_0x4dd126);},Window_QuestList[_0x4f14('0xa0')][_0x4f14('0x173')]=function(){return _0x4f14('0x1b9');},Window_QuestList[_0x4f14('0xa0')][_0x4f14('0xd1')]=function(_0x21a3fc){if(_0x21a3fc<0x0)return _0x4f14('0x15f');const _0x12f2cf=this[_0x4f14('0x173')]();if(_0x12f2cf!==_0x4f14('0x91')){if(_0x4f14('0x129')!=='AYhcF'){function _0x55a47f(){return _0x568b27[_0x4f14('0xa5')]()[_0x4f14('0x155')]>0x0;}}else return _0x12f2cf;}else{if(this[_0x4f14('0x1d0')]()>0x0){if(_0x4f14('0x9c')!==_0x4f14('0x1bd')){const _0x5e9da5=this[_0x4f14('0x163')](_0x21a3fc);if(_0x5e9da5[_0x4f14('0x151')](/\\I\[(\d+)\]/i)){const _0x18def7=this[_0x4f14('0x62')](_0x21a3fc),_0x4cd048=this[_0x4f14('0xb4')](_0x5e9da5)[_0x4f14('0x159')];if(_0x4cd048<=_0x18def7[_0x4f14('0x159')]){if(_0x4f14('0x10')!==_0x4f14('0x10')){function _0xdb75d3(){const _0x2ed9d6=this[_0x4f14('0x9a')];_0x2ed9d6[_0x4f14('0x1b0')][_0x4f14('0x5f')]();const _0x1750c6=this[_0x4f14('0xd1')](this[_0x4f14('0xb5')]());if(_0x1750c6===_0x4f14('0x1be')){const _0x1e5863=this[_0x4f14('0x62')](this['index']());let _0x46f931=this[_0x4f14('0x163')](this[_0x4f14('0xb5')]());_0x46f931=_0x46f931[_0x4f14('0xdd')](/\\I\[(\d+)\]/gi,''),_0x2ed9d6['resetFontSettings'](),this[_0x4f14('0x1c0')](_0x46f931,_0x1e5863),this[_0x4f14('0x3a')](_0x46f931,_0x1e5863),this[_0x4f14('0x19d')](_0x46f931,_0x1e5863);}}}else return _0x4f14('0x1b9');}else return _0x4f14('0x1be');}}else{function _0xfe514(){if(!_0x57924e[_0x4f14('0x10f')])return 0x0;if(_0x3003a6[_0x4f14('0x17f')]())return 0x0;if(!this[_0x4f14('0x143')])return 0x0;return _0x2d2093[_0x4f14('0x4f')]()?0xff:0x0;}}}}return _0x4f14('0x15f');},Window_QuestList[_0x4f14('0xa0')][_0x4f14('0xa8')]=function(_0x23f902){const _0x53f452=this[_0x4f14('0x62')](_0x23f902),_0x48d7ca=this[_0x4f14('0x163')](_0x23f902),_0x31775b=this[_0x4f14('0xb4')](_0x48d7ca)['width'];this[_0x4f14('0x19e')](this[_0x4f14('0xf0')](_0x23f902));const _0x2f421c=this[_0x4f14('0x145')]();if(_0x2f421c===_0x4f14('0x3b')){if(_0x4f14('0x96')!=='SevLA')this[_0x4f14('0x2')](_0x48d7ca,_0x53f452['x']+_0x53f452[_0x4f14('0x159')]-_0x31775b,_0x53f452['y'],_0x31775b);else{function _0x1007b6(){_0x4c026a['prototype'][_0x4f14('0x1a7')]['call'](this),this['updateOpacity']();}}}else{if(_0x2f421c===_0x4f14('0x124')){if(_0x4f14('0x1db')===_0x4f14('0x17c')){function _0x38469a(){this[_0x4f14('0x12c')]=_0x32dc08,this[_0x4f14('0xb1')]();}}else{const _0x516b70=_0x53f452['x']+Math[_0x4f14('0x1c6')]((_0x53f452[_0x4f14('0x159')]-_0x31775b)/0x2);this[_0x4f14('0x2')](_0x48d7ca,_0x516b70,_0x53f452['y'],_0x31775b);}}else this[_0x4f14('0x2')](_0x48d7ca,_0x53f452['x'],_0x53f452['y'],_0x31775b);}},Window_QuestList[_0x4f14('0xa0')][_0x4f14('0x73')]=function(_0x2331db){this[_0x4f14('0x163')](_0x2331db)[_0x4f14('0x151')](/\\I\[(\d+)\]/i);const _0x33958e=Number(RegExp['$1'])||0x0,_0x512ad7=this['itemLineRect'](_0x2331db),_0x4a05e0=_0x512ad7['x']+Math[_0x4f14('0x1c6')]((_0x512ad7[_0x4f14('0x159')]-ImageManager[_0x4f14('0x41')])/0x2),_0x5cf5f6=_0x512ad7['y']+(_0x512ad7[_0x4f14('0xd6')]-ImageManager[_0x4f14('0x1dc')])/0x2;this[_0x4f14('0x174')](_0x33958e,_0x4a05e0,_0x5cf5f6);},Window_QuestList[_0x4f14('0xa0')][_0x4f14('0x196')]=function(){return this['currentSymbol']()===_0x4f14('0x8')?this['currentExt']():null;},Window_QuestList[_0x4f14('0xa0')][_0x4f14('0x136')]=function(){return this[_0x4f14('0xa')]()===_0x4f14('0xae')?this[_0x4f14('0x18')]():null;},Window_QuestList[_0x4f14('0xa0')][_0x4f14('0x2d')]=function(_0x4dcd31){this[_0x4f14('0x7a')]=_0x4dcd31,this['callUpdateHelp']();},Window_QuestList[_0x4f14('0xa0')]['updateLabelWindow']=function(){const _0x2a061c=this[_0x4f14('0x136')](),_0x3b50f0=this[_0x4f14('0x7a')];_0x3b50f0[_0x4f14('0x1b0')][_0x4f14('0x5f')]();const _0x2ccc75=_0x2a061c?_0x2a061c[_0x4f14('0xed')]:TextManager[_0x4f14('0x31')],_0x52c31e=_0x3b50f0[_0x4f14('0xb4')](_0x2ccc75)[_0x4f14('0x159')],_0x176f3c=_0x3b50f0[_0x4f14('0x11a')]()+Math[_0x4f14('0x18c')]((_0x3b50f0[_0x4f14('0xfc')]-_0x52c31e)/0x2);_0x3b50f0[_0x4f14('0x2')](_0x2ccc75,_0x176f3c,0x0,_0x3b50f0[_0x4f14('0xfc')]);},Window_QuestList[_0x4f14('0xa0')][_0x4f14('0x8c')]=function(_0x26d758){this['_logWindow']=_0x26d758,this[_0x4f14('0xb1')]();},Window_QuestList['prototype'][_0x4f14('0x1a3')]=function(){const _0x7a1e32=this[_0x4f14('0x136')](),_0x7fddd0=this[_0x4f14('0x12c')];_0x7fddd0['setQuest'](_0x7a1e32);},Window_QuestList[_0x4f14('0xa0')][_0x4f14('0x16a')]=function(){},Window_QuestList['prototype']['cursorPageup']=function(){},Window_QuestList['prototype']['isOkEnabled']=function(){return this[_0x4f14('0x136')]()?this[_0x4f14('0x89')]===_0x4f14('0x17e'):Window_Command[_0x4f14('0xa0')]['isOkEnabled'][_0x4f14('0x26')](this);};function Window_QuestLog(){this[_0x4f14('0x149')](...arguments);}Window_QuestLog[_0x4f14('0x164')]=VisuMZ['QuestSystem'][_0x4f14('0xc7')][_0x4f14('0xaf')][_0x4f14('0x116')],Window_QuestLog[_0x4f14('0x1de')]=VisuMZ['QuestSystem'][_0x4f14('0xc7')][_0x4f14('0xaf')][_0x4f14('0xdc')],Window_QuestLog[_0x4f14('0xa0')]=Object['create'](Window_Scrollable[_0x4f14('0xa0')]),Window_QuestLog[_0x4f14('0xa0')][_0x4f14('0xf3')]=Window_QuestLog,Window_QuestLog[_0x4f14('0x1da')]=0x19,Window_QuestLog[_0x4f14('0xa0')][_0x4f14('0x149')]=function(_0x174e19){this[_0x4f14('0xe5')]=0x0,this[_0x4f14('0x1da')]=0x0,Window_Scrollable[_0x4f14('0xa0')]['initialize'][_0x4f14('0x26')](this,_0x174e19),this[_0x4f14('0x143')]=null,this[_0x4f14('0x1bb')]();},Window_QuestLog[_0x4f14('0xa0')][_0x4f14('0x7e')]=function(){return Math[_0x4f14('0x101')](this[_0x4f14('0x19')],this[_0x4f14('0xe5')]);},Window_QuestLog[_0x4f14('0xa0')][_0x4f14('0xe1')]=function(){return this['contentsHeight']();},Window_QuestLog[_0x4f14('0xa0')][_0x4f14('0x1a7')]=function(){Window_Scrollable[_0x4f14('0xa0')][_0x4f14('0x1a7')][_0x4f14('0x26')](this),this['updateDelayRefresh']();},Window_QuestLog[_0x4f14('0xa0')][_0x4f14('0x50')]=function(){if(this['_delayDraw']--===0x0)this[_0x4f14('0x1bb')]();},Window_QuestLog[_0x4f14('0xa0')][_0x4f14('0x1ac')]=function(){const _0x3a73a0=this[_0x4f14('0xc')]()||0x1,_0x1beada=this[_0x4f14('0x133')]()||0x1,_0x29acdc=this[_0x4f14('0xef')]-this[_0x4f14('0xef')]%_0x3a73a0,_0x4a97d3=this[_0x4f14('0x9e')]-this[_0x4f14('0x9e')]%_0x1beada;(_0x29acdc!==this[_0x4f14('0x57')]||_0x4a97d3!==this[_0x4f14('0x48')])&&(this[_0x4f14('0x1cb')](_0x29acdc,_0x4a97d3),this[_0x4f14('0xeb')]()),this[_0x4f14('0xee')]['x']=this['_scrollX'],this[_0x4f14('0xee')]['y']=this['_scrollY'];},Window_QuestLog[_0x4f14('0xa0')]['processWheelScroll']=function(){Window_Scrollable[_0x4f14('0xa0')][_0x4f14('0x158')][_0x4f14('0x26')](this),this['updatePageUpDownScroll']();},Window_QuestLog[_0x4f14('0xa0')]['updatePageUpDownScroll']=function(){if(Input[_0x4f14('0x79')](_0x4f14('0xad'))){if('MIuxL'!=='uTJHG')this[_0x4f14('0x52')](Window_QuestLog[_0x4f14('0x1de')]);else{function _0x580291(){_0x357dab[_0x4f14('0x141')][_0x4f14('0x51')][_0x4f14('0x26')](this),this[_0x4f14('0x1')][_0x4f14('0x95')](_0x4f14('0xae'),this[_0x4f14('0x1b6')]['bind'](this));}}}Input[_0x4f14('0x79')](_0x4f14('0x39'))&&this['smoothScrollUp'](Window_QuestLog[_0x4f14('0x1de')]);},Window_QuestLog[_0x4f14('0xa0')][_0x4f14('0x120')]=function(_0x525a68){if(this['_quest']===_0x525a68)return;this[_0x4f14('0x143')]=_0x525a68,this[_0x4f14('0x1da')]=Window_QuestLog['_delayDraw'];},Window_QuestLog['prototype'][_0x4f14('0x1bb')]=function(){this[_0x4f14('0x1b0')][_0x4f14('0x5f')]();const _0x4a104b=this[_0x4f14('0x148')](),_0x418c6e=this[_0x4f14('0x143')]?this[_0x4f14('0xd2')]():this[_0x4f14('0x115')](),_0x3cf165=this['textSizeEx'](_0x418c6e[_0x4f14('0x13a')]());this[_0x4f14('0xe5')]=_0x3cf165['height'];if(this[_0x4f14('0xf3')]===Window_QuestLog){if(_0x4f14('0x6d')===_0x4f14('0x6d'))this[_0x4f14('0xe5')]+=this[_0x4f14('0x14')](),Window_QuestLog[_0x4f14('0x164')]&&(this[_0x4f14('0xe5')]+=this[_0x4f14('0x14')]()*0x4);else{function _0x3983bb(){this['drawTextEx'](_0x12f882,_0x202e32['x'],_0x2cc91b['y'],_0x45f1e5);}}}this[_0x4f14('0x17d')](),this[_0x4f14('0x2')](_0x418c6e,_0x4a104b['x'],_0x4a104b['y'],_0x4a104b[_0x4f14('0x159')]),this[_0x4f14('0x9e')]=0x0,this[_0x4f14('0xee')]['y']=0x0;},Window_QuestLog['prototype'][_0x4f14('0x115')]=function(){VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')][_0x4f14('0x68')][_0x4f14('0x4d')]();let _0x37c2d3=this[_0x4f14('0x78')]();return _0x37c2d3=VisuMZ[_0x4f14('0x141')]['applyWordWrap'](_0x37c2d3),_0x37c2d3=VisuMZ[_0x4f14('0x141')][_0x4f14('0x107')](_0x37c2d3),_0x37c2d3;},Window_QuestLog[_0x4f14('0xa0')][_0x4f14('0x78')]=function(){return TextManager[_0x4f14('0xd4')];},Window_QuestLog[_0x4f14('0xa0')][_0x4f14('0xd2')]=function(){const _0x16ad2a=this[_0x4f14('0x143')],_0x15ca76=_0x16ad2a[_0x4f14('0x18f')]['toUpperCase']()['trim']();if(_0x16ad2a[_0x4f14('0x4d')])_0x16ad2a[_0x4f14('0x4d')][_0x4f14('0x26')](this);let _0x21f526=this[_0x4f14('0x30')]();return _0x21f526=VisuMZ['QuestSystem'][_0x4f14('0x12a')](_0x21f526),_0x21f526=_0x21f526[_0x4f14('0xdd')](/\[\[TITLE\]\]/gi,_0x16ad2a[_0x4f14('0xed')][_0x4f14('0xdd')](/\\I\[(\d+)\]/gi,'')[_0x4f14('0x13a')]()),_0x21f526=_0x21f526[_0x4f14('0xdd')](/\[\[DIFFICULTY\]\]/gi,_0x16ad2a['Difficulty'][_0x4f14('0x13a')]()),_0x21f526=_0x21f526[_0x4f14('0xdd')](/\[\[FROM\]\]/gi,_0x16ad2a[_0x4f14('0x1b')][_0x4f14('0x13a')]()),_0x21f526=_0x21f526['replace'](/\[\[LOCATION\]\]/gi,_0x16ad2a[_0x4f14('0x15e')][_0x4f14('0x13a')]()),_0x21f526=_0x21f526[_0x4f14('0xdd')](/\[\[DESCRIPTION\]\]/gi,this[_0x4f14('0xf2')](_0x15ca76)),_0x21f526=_0x21f526[_0x4f14('0xdd')](/\[\[OBJECTIVES\]\]/gi,this['createQuestObjectives'](_0x16ad2a,_0x15ca76)),_0x21f526=_0x21f526['replace'](/\[\[REWARDS\]\]/gi,this[_0x4f14('0x6e')](_0x16ad2a,_0x15ca76)),_0x21f526=_0x21f526[_0x4f14('0xdd')](/\[\[SUBTEXT\]\]/gi,this[_0x4f14('0x46')](_0x15ca76)),_0x21f526=_0x21f526['replace'](/\[\[QUOTE\]\]/gi,this['createQuestQuote'](_0x15ca76)),_0x21f526=VisuMZ['QuestSystem'][_0x4f14('0x107')](_0x21f526),_0x21f526[_0x4f14('0x13a')]();},Window_QuestLog[_0x4f14('0xa0')][_0x4f14('0x30')]=function(){return TextManager[_0x4f14('0xfe')];},Window_QuestLog[_0x4f14('0xa0')][_0x4f14('0xf2')]=function(_0x4a6e98){let _0x4eecff=$gameSystem[_0x4f14('0x76')](_0x4a6e98);return _0x4eecff=VisuMZ['QuestSystem'][_0x4f14('0x107')](_0x4eecff),_0x4eecff[_0x4f14('0x13a')]();},Window_QuestLog[_0x4f14('0xa0')][_0x4f14('0xf')]=function(_0x5be59f,_0x182245){const _0x1892c1=[],_0x4d41aa=$gameSystem[_0x4f14('0xb')](_0x182245),_0x4e39c4=$gameSystem[_0x4f14('0x2a')](_0x182245),_0x50656b=$gameSystem[_0x4f14('0x97')](_0x182245),_0x5a50e1=_0x4d41aa['concat'](_0x4e39c4)['concat'](_0x50656b)[_0x4f14('0xe9')]((_0x5200e1,_0x57a443)=>_0x5200e1-_0x57a443);for(const _0x1e2dfb of _0x5a50e1){if(!_0x5be59f[_0x4f14('0x1e0')][_0x1e2dfb])continue;const _0x4b8a45=_0x5be59f[_0x4f14('0x1e0')][_0x1e2dfb];let _0x5c13e0=TextManager[_0x4f14('0x27')];if(_0x4e39c4[_0x4f14('0x1e3')](_0x1e2dfb))_0x5c13e0=TextManager['questObjectiveClearedFmt'];if(_0x50656b[_0x4f14('0x1e3')](_0x1e2dfb))_0x5c13e0=TextManager[_0x4f14('0x140')];_0x1892c1[_0x4f14('0xb9')](VisuMZ[_0x4f14('0x141')][_0x4f14('0x63')](_0x5c13e0[_0x4f14('0x175')](_0x4b8a45)['trim']()));}let _0x41b6c2=VisuMZ['QuestSystem'][_0x4f14('0x13d')](_0x1892c1);return _0x41b6c2;},Window_QuestLog[_0x4f14('0xa0')][_0x4f14('0x6e')]=function(_0x10eb0e,_0x48c83d){const _0x394977=[],_0x53fd22=$gameSystem['questRewards'](_0x48c83d),_0x3fbeb6=$gameSystem[_0x4f14('0xcc')](_0x48c83d),_0x212f7f=$gameSystem['questRewardsDenied'](_0x48c83d),_0xbac0b2=_0x53fd22[_0x4f14('0x6f')](_0x3fbeb6)[_0x4f14('0x6f')](_0x212f7f)[_0x4f14('0xe9')]((_0x9d937f,_0x3c3373)=>_0x9d937f-_0x3c3373);for(const _0x5889a9 of _0xbac0b2){if('QWqjP'===_0x4f14('0xff')){if(!_0x10eb0e['Rewards'][_0x5889a9])continue;const _0x402a2a=_0x10eb0e[_0x4f14('0xb7')][_0x5889a9];let _0x362a8d=TextManager[_0x4f14('0x1df')];if(_0x3fbeb6[_0x4f14('0x1e3')](_0x5889a9))_0x362a8d=TextManager[_0x4f14('0x108')];if(_0x212f7f[_0x4f14('0x1e3')](_0x5889a9))_0x362a8d=TextManager['questRewardsDeniedFmt'];_0x394977[_0x4f14('0xb9')](VisuMZ[_0x4f14('0x141')][_0x4f14('0x63')](_0x362a8d[_0x4f14('0x175')](_0x402a2a)['trim']()));}else{function _0x5c2805(){this[_0x4f14('0xf6')]=new _0x2a1de1(_0x40c8ea['loadTitle1'](_0x5f4248[_0x4f14('0x14c')])),this[_0x4f14('0x1c3')]=new _0x1b529d(_0x1d70fd['loadTitle2'](_0x5b386d[_0x4f14('0x8e')])),this[_0x4f14('0x66')](this[_0x4f14('0xf6')]),this[_0x4f14('0x66')](this[_0x4f14('0x1c3')]),this[_0x4f14('0xf6')]['bitmap'][_0x4f14('0x15a')](this['adjustSprite'][_0x4f14('0x5')](this,this[_0x4f14('0xf6')])),this[_0x4f14('0x1c3')]['bitmap'][_0x4f14('0x15a')](this[_0x4f14('0xb0')]['bind'](this,this[_0x4f14('0x1c3')]));}}}let _0x376c11=VisuMZ['QuestSystem'][_0x4f14('0x13d')](_0x394977);return _0x376c11;},Window_QuestLog[_0x4f14('0xa0')]['createQuestSubtext']=function(_0x1067bb){let _0x58c545=$gameSystem[_0x4f14('0x16c')](_0x1067bb);return _0x58c545=VisuMZ[_0x4f14('0x141')][_0x4f14('0x107')](_0x58c545),_0x58c545[_0x4f14('0x13a')]();},Window_QuestLog['prototype'][_0x4f14('0x1e')]=function(_0x461178){let _0x1270f7=$gameSystem[_0x4f14('0x1cd')](_0x461178);return _0x1270f7=VisuMZ[_0x4f14('0x141')]['finalizeWordWrapSupport'](_0x1270f7),_0x1270f7[_0x4f14('0x13a')]();};function Window_QuestTracker(){this[_0x4f14('0x149')](...arguments);}Window_QuestTracker[_0x4f14('0xa0')]=Object['create'](Window_QuestLog[_0x4f14('0xa0')]),Window_QuestTracker[_0x4f14('0xa0')][_0x4f14('0xf3')]=Window_QuestTracker,Window_QuestTracker[_0x4f14('0x14e')]=VisuMZ['QuestSystem']['Settings'][_0x4f14('0xaf')][_0x4f14('0x18d')],Window_QuestTracker[_0x4f14('0x187')]=VisuMZ[_0x4f14('0x141')][_0x4f14('0xc7')][_0x4f14('0xaf')][_0x4f14('0x80')],Window_QuestTracker[_0x4f14('0xa0')][_0x4f14('0x149')]=function(_0x357b3b){Window_QuestLog[_0x4f14('0xa0')][_0x4f14('0x149')][_0x4f14('0x26')](this,_0x357b3b),this[_0x4f14('0x120')]($gameSystem[_0x4f14('0x11d')]()),this[_0x4f14('0x14e')]['x']=this[_0x4f14('0x14e')]['y']=Window_QuestTracker[_0x4f14('0x14e')],this[_0x4f14('0x9b')]();},Window_QuestTracker[_0x4f14('0xa0')][_0x4f14('0x7e')]=function(){return this[_0x4f14('0xe5')]||0x0;},Window_QuestTracker[_0x4f14('0xa0')][_0x4f14('0x78')]=function(){return'';},Window_QuestTracker[_0x4f14('0xa0')][_0x4f14('0x30')]=function(){return TextManager[_0x4f14('0x16f')];},Window_QuestTracker['prototype']['createContents']=function(){this[_0x4f14('0xd6')]=this[_0x4f14('0x7e')]()+$gameSystem['windowPadding']()*0x2,Window_QuestLog['prototype'][_0x4f14('0x17d')]['call'](this);},Window_QuestTracker[_0x4f14('0xa0')]['setQuest']=function(_0x3b340a){if(this['_quest']===_0x3b340a)return;this[_0x4f14('0x143')]=_0x3b340a,this[_0x4f14('0x1bb')]();},Window_QuestTracker[_0x4f14('0xa0')][_0x4f14('0x1bb')]=function(){Window_QuestLog[_0x4f14('0xa0')][_0x4f14('0x1bb')][_0x4f14('0x26')](this),this[_0x4f14('0x1a8')](this[_0x4f14('0x143')]?Window_QuestTracker[_0x4f14('0x187')]:0x2);},Window_QuestTracker[_0x4f14('0xa0')][_0x4f14('0x1a7')]=function(){Window_QuestLog[_0x4f14('0xa0')][_0x4f14('0x1a7')][_0x4f14('0x26')](this),this[_0x4f14('0x9b')]();},Window_QuestTracker[_0x4f14('0xa0')][_0x4f14('0x9b')]=function(){this[_0x4f14('0x8d')]=Window_QuestTracker['activeBgType']===0x0?this[_0x4f14('0x15c')]():0x0,this['contentsOpacity']=this[_0x4f14('0x15c')]();},Window_QuestTracker[_0x4f14('0xa0')][_0x4f14('0x15c')]=function(){if(!ConfigManager[_0x4f14('0x10f')])return 0x0;if($gameMessage[_0x4f14('0x17f')]())return 0x0;if(!this[_0x4f14('0x143')])return 0x0;return $gameSystem['isQuestTrackerVisible']()?0xff:0x0;},VisuMZ['QuestSystem'][_0x4f14('0x107')]=function(_0x55ade3){if(!Window_QuestLog[_0x4f14('0x164')])return _0x55ade3;if(!Imported[_0x4f14('0x117')])return _0x55ade3;return _0x55ade3=_0x4f14('0x7c')[_0x4f14('0x175')](_0x55ade3),_0x55ade3;},VisuMZ[_0x4f14('0x141')][_0x4f14('0x191')]=function(_0x5c88d3){if(!Window_QuestLog['wordWrapSupport'])return _0x5c88d3['replace'](/<(?:BR|LINEBREAK)>/gi,'');if(!Imported[_0x4f14('0x117')])return _0x5c88d3[_0x4f14('0xdd')](/<(?:BR|LINEBREAK)>/gi,'');if(VisuMZ[_0x4f14('0x197')][_0x4f14('0xc7')][_0x4f14('0x16')][_0x4f14('0x8f')])_0x5c88d3=_0x5c88d3['replace'](/[\n\r]+/g,_0x4f14('0xec'));else{if('onPMJ'===_0x4f14('0x1d4')){function _0x2ba646(){return _0x271d0f[_0x4f14('0x101')](this[_0x4f14('0x19')],this[_0x4f14('0xe5')]);}}else _0x5c88d3=_0x5c88d3['replace'](/[\n\r]+/g,'');}return _0x5c88d3;},VisuMZ[_0x4f14('0x141')]['convertLineBreaksForWordWrap']=function(_0x598d37){if(!Window_QuestLog[_0x4f14('0x164')])return _0x598d37;if(!Imported[_0x4f14('0x117')])return _0x598d37;return _0x598d37[_0x4f14('0x13a')]()[_0x4f14('0xdd')](/[\n\r]/g,_0x4f14('0x176'));},VisuMZ[_0x4f14('0x141')]['applyWordWrapEntry']=function(_0x1a82c7){if(!Window_QuestLog[_0x4f14('0x164')])return _0x1a82c7;if(!Imported[_0x4f14('0x117')])return _0x1a82c7;return VisuMZ['QuestSystem'][_0x4f14('0x191')](_0x1a82c7[_0x4f14('0x13a')]());},VisuMZ[_0x4f14('0x141')][_0x4f14('0x13d')]=function(_0x2edd6c){if(!Window_QuestLog[_0x4f14('0x164')])return _0x2edd6c['join']('\x0a')['trim']();if(!Imported[_0x4f14('0x117')])return _0x2edd6c[_0x4f14('0x5e')]('\x0a')[_0x4f14('0x13a')]();return _0x2edd6c['join']('<BR>')['trim']();};