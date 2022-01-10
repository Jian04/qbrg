//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.24;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.24] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
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
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 * 
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 * 
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 * 
 * *NOTE* These text codes do not work with Word Wrap.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Center:
 *   - Center the window X after changing its width?
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 *
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 * 
 *   End Padding:
 *   - Add extra padding to your window to make text wrap further away from the
 *     end of the window.
 *   - This will default to 0.
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
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.24: August 20, 2021
 * * Feature Update!
 * ** Macros should now work with window placement and resize options.
 *    Update made by Irina.
 * ** Macros should now work with choice-related enable and visibility options.
 *    Update made by Irina.
 * 
 * Version 1.23: July 16, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Word Wrap Settings > End Padding
 * **** Add extra padding to your window to make text wrap further away from
 *      the end of the window. This will default to 0.
 * 
 * Version 1.22: July 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Irina and sponsored by AndyL:
 * *** <Current Battle Target>
 * *** <Current Battle User>
 * **** Replaces the text code with the current target or current user's name
 *      in-battle. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * *** <Current Battle Action>
 * *** <Current Battle Action Name>
 * **** Replaces the text code with the current battle action's name with the
 *      icon or without it respectively. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * 
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 * 
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg Center:eval
 * @text Center Window X?
 * @parent Width
 * @type boolean
 * @on Center
 * @off Don't
 * @desc Center the window X after changing its width?
 * @default true
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
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
 * @param MessageCore
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
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
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
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

const _0x5573a7=_0xc913;(function(_0x5c9aca,_0x15b475){const _0x1107bb=_0xc913,_0x29cb01=_0x5c9aca();while(!![]){try{const _0x2b85a8=-parseInt(_0x1107bb(0x161))/0x1+-parseInt(_0x1107bb(0x29f))/0x2*(-parseInt(_0x1107bb(0x359))/0x3)+parseInt(_0x1107bb(0x1f3))/0x4+parseInt(_0x1107bb(0x22e))/0x5*(-parseInt(_0x1107bb(0x2d4))/0x6)+-parseInt(_0x1107bb(0x3b5))/0x7*(-parseInt(_0x1107bb(0x204))/0x8)+-parseInt(_0x1107bb(0x2d0))/0x9*(parseInt(_0x1107bb(0x2e8))/0xa)+parseInt(_0x1107bb(0x15e))/0xb;if(_0x2b85a8===_0x15b475)break;else _0x29cb01['push'](_0x29cb01['shift']());}catch(_0x24da7a){_0x29cb01['push'](_0x29cb01['shift']());}}}(_0x2491,0x2ecee));function _0x2491(){const _0x52c19a=['SQfQI','lineHeight','166xWOyyn','resetTextColor','itemRectWithPadding','NoeLd','clearFlags','Scene_Boot_onDatabaseLoaded','registerResetRect','placeCancelButton','calcMoveEasing','TvNtn','preFlushTextState','_autoPosRegExp','uVQiI','databaseObjectName','_messagePositionReset','Game_Map_initialize','makeFontBigger','follower','QAkZg','splice','victory','zUNwA','isVolumeSymbol','initMessageCore','getMessageWindowWidth','addMessageCommonEvent','EVAL','width','LineHeight','WRAPBREAK','match','GrjsP','_list','_autoSizeCheck','defeat','push','mainFontFace','message','inputtingAction','applyData','makeData','Window_ChoiceList_windowX','getChoiceListTextAlign','addCommand','messageRows','processAutoSize','prepareShowTextFollowups','_data','addExtraShowChoices','1332036PwziII','setChoiceListTextAlign','FontBiggerCap','Game_Party_initialize','1797042spbilX','process_VisuMZ_MessageCore_TextMacros','map\x20actor','return\x20\x27','PZreQ','sASRK','Undefined','processWrapBreak','lBBFu','_textDelayCount','convertTextMacros','_interpreter','Window_Base_processEscapeCharacter','changeValue','preemptive','processStoredAutoColorChanges','left','processNewLine','Window_NameBox_updatePlacement','updateBackground','10joXhZq','format','vRFfi','isChoiceVisible','MaxRows','_centerMessageWindow','uPpFf','Window_Options_statusText','map\x20event','Instant','isWordWrapEnabled','_relativePosition','Match','itemPadding','messageWordWrap','KEsHO','max','pAKoW','contentsBack','commandName','ARRAYSTR','isPressed','Game_Map_setupEvents','makeDeepCopy','isHelpWindowWordWrap','BiMEf','SortObjectByKeyLength','</RIGHT>','convertBaseEscapeCharacters','isItem','Game_Interpreter_setupChoices','nURhq','addedHeight','center','KurmR','SHOW','prepareWordWrapEscapeCharacters','IpeDj','Window_Message_processEscapeCharacter','Jozmr','textSizeExWordWrap','parse','_spriteset','_eventId','messageCoreTextSpeed','setMessageWindowWidth','true','drawBackCenteredPicture','innerWidth','updateEvents','Window_Help_refresh','HtOMG','convertBackslashCharacters','boxWidth','gainItem','getTextAlignment','onChoice','startX','stretchDimmerSprite','_targets','ALL','anchor','_resetRect','windowPadding','JSON','registerCommand','quantity','WAIT','activate','shift','setMessageWindowWordWrap','AutoColor','outlineColor','</CENTER>','code','processAutoColorWords','ZNABY','CBHMd','process_VisuMZ_MessageCore_TextCodes_Replace','_messageWindow','PREVCOLOR','maxLines','MaxCols','clearCommandList','Game_Map_updateEvents','Actors','colSpacing','startWait','addMessageCoreCommands','obtainEscapeString','TextCodeActions','isContinuePrepareShowTextCommands','constructor','gsFNI','DefaultOutlineWidth','bind','lastGainedObjectQuantity','updateAutoPosition','convertMessageCoreEscapeActions','yJpbi','setChoiceListMaxRows','min','slice','numVisibleRows','isInputting','defaultColor','UJAgU','drawItem','substr','clamp','LineBreakSpace','levelUp','battleActionName','12192tnQyFG','xueDv','ParseWeaponNotetags','processAutoPosition','maxCols','AutoColorBypassList','callOkHandler','QxXbt','paintOpacity','obtainExp','Classes','ParseAllNotetags','ConvertParams','sort','<I>','onNewPageMessageCore','clear','getChoiceListLineHeight','prepareAutoSizeEscapeCharacters','[0]','updateOffsetPosition','TEXTALIGNMENT','updateDimensions','actorName','ikELE','NameBoxWindowOffsetX','IJaZm','currentCommand','TextCodeReplace','okUPe','process_VisuMZ_MessageCore_AutoColor','itemHeight','boxHeight','Weapons','indexOf','inBattle','SWITCHES','TextSpeed','Window_Options_isVolumeSymbol','ActionJS','<LEFT>','substring','update','changeTextColor','map\x20party','name','_moveTargetY','fbNwt','TFePp','processFontChangeItalic','index','qPmha','call','setChoiceListLineHeight','openness','updateMessageCommonEvents','convertLockColorsEscapeCharacters','Window_Base_textSizeEx','prepareShowTextCommand','processDrawCenteredPicture','map','njPhU','QYVsj','processFsTextCode','changePaintOpacity','updateForcedPlacement','loadPicture','prototype','fgyDl','split','toLowerCase','convertVariableEscapeCharacters','outlineWidth','Window_Message_updatePlacement','<COLORLOCK>','battle\x20party','toUpperCase','terminateMessage','outLineColor','<BR>','bXEJC','Window_Base_processNewLine','HzzlX','processPreviousColor','ParseArmorNotetags','UfiDe','Window_Base_processAllText','processColorLock','currentExt','helpWordWrap','windowWidth','instantTextSpeed','1747389GiAwCi','ChoiceWindowLineHeight','</I>','processTextAlignmentChange','ConvertTextAutoColorRegExpFriendly','newPage','\x1bC[%1]%2\x1bPREVCOLOR[0]','processMessageCoreEscapeActions','XdAiR','Kmbvv','\x1bITALIC[1]','YeYvN','return\x200','unshift','_moveTargetWidth','updatePlacement','refreshDimmerBitmap','_autoColorActorNames','partyMemberName','Window_Base_changeTextColor','selectDefault','_index','ParseStateNotetags','battleTargetName','isChoiceEnabled','CFgvN','obtainEscapeParam','ChoiceWindowMaxCols','textCodeCheck','addGeneralOptions','makeFontSmaller','convertFontSettingsEscapeCharacters','applyMoveEasing','textSpeed','setSpeakerName','setupItemChoice','_MessageCoreSettings','setupChoices','MessageWindow','FontChangeValue','JRONV','CENTERPICTURE','NameBoxWindowOffsetY','_texts','parameters','adjustShowChoiceExtension','addMessageCoreTextSpeedCommand','_moveTargetX','JHSYm','updateRelativePosition','messageWidth','initTextAlignement','_nameBoxWindow','PvWDx','mSRiC','createContents','contents','ghiPI','AddAutoColor','round','SCJvt','false','_indent','setupEvents','makeCommandList','AddOption','setPositionType','uIOEB','_dimmerSprite','getPreservedFontSettings','synchronizeNameBox','fploc','2331186OBVkui','textCodeResult','EndPadding','345093zfMPOX','processActorNameAutoColorChanges','registerActorNameAutoColorChanges','Window_Options_addGeneralOptions','TextManager_message','(((','_commonEventId','HelpWindow','Default','CreateAutoColorFor','right','join','xSRhX','launchMessageCommonEvent','maxFontSizeInLine','ParseClassNotetags','maxCommands','processEscapeCharacter','isBreakShowTextCommands','setColorLock','Skills','processTextAlignmentX','battle\x20enemy','normalColor','KWDDT','CreateAutoColorRegExpLists','open','faceName','windowX','TextStr','Gqfyt','textWidth','ODVxf','Window_Base_initialize','_target','remove','moveBy','addWrapBreakAfterPunctuation','event','\x5c%1','postConvertEscapeCharacters','wnFAb','ChoiceWindowTextAlign','_textAlignment','\x1bWrapBreak[0]','fkTlH','TextMacros','Window_Message_terminateMessage','convertTextAlignmentEscapeCharacters','convertEscapeCharacters','Window_NameBox_refresh','COLORLOCK','maxChoiceWidth','getChoiceListMaxRows','isRTL','isBusy','choices','calcWindowHeight','startY','default','\x1bi[%1]%2','rtl','czEcL','drawing','adjustShowChoiceDefault','choiceCols','surprise','AutoColorRegExp','TextColor','\x1bITALIC[0]','status','WORD_WRAP_PADDING','ANY','Window_Base_processControlCharacter','ahkRP','setup','setMessageWindowRows','lastGainedObjectName','_textColorStack','textSizeEx','changeTextSpeed','drawBackPicture','processAllText','adjustShowChoiceCancel','processCustomWait','battle\x20actor','Window_Message_synchronizeNameBox','followers','Enemies','_wholeMoveDuration','_moveDuration','applyDatabaseAutoColor','HIDE','ParseEnemyNotetags','setWordWrap','wZFni','Game_Party_gainItem','clearActorNameAutoColor','<CENTER>','test','</WORDWRAP>','opMuu','processDrawPicture','TextAlign','gwSJm','iconIndex','ConfigManager_makeData','fontItalic','ParseSkillNotetags','PICTURE','yGuYj','oZTUk','getLastGainedItemData','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','includes','Width','ZLUGm','emerge','convertNewPageTextStateMacros','hKmfe','Settings','\x1bTEXTALIGNMENT[2]','QIYfo','processFontChangeBold','_messageCommonEvents','setTextDelay','TdGHb','dupZU','Armors','messageWindowRect','flushTextState','isAutoColorAffected','isSceneBattle','convertShowChoiceEscapeCodes','exit','rmlKm','choiceTextAlign','_lastGainedItemData','textColor','setLastGainedItemData','exec','qPcsz','isCommandEnabled','resetWordWrap','ujnxt','returnPreservedFontSettings','741860sYghlt','COMMONEVENT','obtainGold','prepareForcedPositionEscapeCharacters','STRUCT','_autoSizeRegexp','description','Items','Window_Message_clearFlags','\x1bTEXTALIGNMENT[3]','KGpJD','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','setTextAlignment','\x1bBOLD[1]','StretchDimmedBg','fontSize','fontFace','8QCkgNU','\x1bTEXTALIGNMENT[0]','_cancelButton','tnvbL','aaznP','EvpXz','RelativePXPY','createTextState','initialize','trim','drawTextEx','members','parseChoiceText','ARRAYEVAL','_textDelay','messageCoreWindowX','processCommonEvent','messagePositionReset','xXyVF','moveTo','\x1bTEXTALIGNMENT','MessageRows','fontBold','isSceneMap','isWeapon','processPxTextCode','replace','statusText','_action','isMessageWindowWordWrap','FontSmallerCap','isColorLocked','changeVolume','<B>','postFlushTextState','Window_Message_newPage','add','<RIGHT>','</B>','Type','DeNcr','GjyUR','5lhBUoj','choiceRows','onProcessCharacter','<LINE\x20BREAK>','MessageCore','list','convertChoiceMacros','canMove','textSizeExTextAlignment','map\x20player','addedWidth','General','ChoiceWindowProperties','Window_Base_update','OyOUJ','start','ceil','Window_ChoiceList_updatePlacement','HFNWj','ENABLE','nextEventCode','textSpeedStatusText','resetFontSettings','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','kXcIK','refresh','processCharacter','fGOdw','Window_Options_changeVolume','_subject','Window_Message_isTriggered','resetPositionX','updateAutoSizePosition','rRdRi','getConfigValue','CiSSd','_moveEasingType','addLoadListener','eVQIv','OMhTY','updateTransform','getMessageWindowRows','outputWidth','findTargetSprite','VisuMZ_0_CoreEngine','WordWrap','processControlCharacter','dFjQm','gkbpy','IOrYz','TextJS','blt','DISABLE','ZBWZH','_colorLock','setWaitMode','IDyWr','floor','updateOverlappingY','_scene','updateMove','setHelpWindowWordWrap','htTIv','OfqID','processPyTextCode','_forcedPosition','convertMessageCoreEscapeReplacements','filter','Game_System_initialize','getChoiceListMaxColumns','none','addContinuousShowChoices','FastForwardKey','\x1bCOLORLOCK[0]','battleUserName','outputHeight','STR','States','faceWidth','SkBrj','FLvpJ','setRelativePosition','updateNameBoxMove','<%1>','choiceLineHeight','convertHardcodedEscapeReplacements','process_VisuMZ_MessageCore_TextCodes_Action','preConvertEscapeCharacters','ChoiceWindowMaxRows','currencyUnit','_autoPositionTarget','text','value','height','wxRSh','Rows','Scene_Options_maxCommands','type','obtainItem','isRunning','ConfigManager_applyData','onDatabaseLoaded','ParseItemNotetags','clampPlacementPosition','_wordWrap','\x1bBOLD[0]','vDAod','_moveTargetHeight',')))','length','YweRC'];_0x2491=function(){return _0x52c19a;};return _0x2491();}var label=_0x5573a7(0x232),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x5573a7(0x271)](function(_0x34ea31){const _0x4c71f4=_0x5573a7;return _0x34ea31[_0x4c71f4(0x1a7)]&&_0x34ea31[_0x4c71f4(0x1f9)][_0x4c71f4(0x1d3)]('['+label+']');})[0x0];VisuMZ[label][_0x5573a7(0x1d9)]=VisuMZ[label][_0x5573a7(0x1d9)]||{},VisuMZ[_0x5573a7(0x365)]=function(_0x3214ea,_0x15e295){const _0x249a1a=_0x5573a7;for(const _0x3f05e7 in _0x15e295){if('Esrkc'===_0x249a1a(0x376))return _0x3e12f4[_0x249a1a(0x232)][_0x249a1a(0x2c8)]['call'](this);else{if(_0x3f05e7[_0x249a1a(0x2bd)](/(.*):(.*)/i)){const _0x5ee40c=String(RegExp['$1']),_0x34e9f0=String(RegExp['$2'])[_0x249a1a(0x3a5)]()[_0x249a1a(0x20d)]();let _0xe4bd72,_0x3dc9c7,_0x1be7cf;switch(_0x34e9f0){case'NUM':_0xe4bd72=_0x15e295[_0x3f05e7]!==''?Number(_0x15e295[_0x3f05e7]):0x0;break;case'ARRAYNUM':_0x3dc9c7=_0x15e295[_0x3f05e7]!==''?JSON[_0x249a1a(0x311)](_0x15e295[_0x3f05e7]):[],_0xe4bd72=_0x3dc9c7[_0x249a1a(0x395)](_0x12c25c=>Number(_0x12c25c));break;case _0x249a1a(0x2b9):_0xe4bd72=_0x15e295[_0x3f05e7]!==''?eval(_0x15e295[_0x3f05e7]):null;break;case _0x249a1a(0x211):_0x3dc9c7=_0x15e295[_0x3f05e7]!==''?JSON['parse'](_0x15e295[_0x3f05e7]):[],_0xe4bd72=_0x3dc9c7[_0x249a1a(0x395)](_0x43627e=>eval(_0x43627e));break;case _0x249a1a(0x328):_0xe4bd72=_0x15e295[_0x3f05e7]!==''?JSON['parse'](_0x15e295[_0x3f05e7]):'';break;case'ARRAYJSON':_0x3dc9c7=_0x15e295[_0x3f05e7]!==''?JSON[_0x249a1a(0x311)](_0x15e295[_0x3f05e7]):[],_0xe4bd72=_0x3dc9c7[_0x249a1a(0x395)](_0x2143b3=>JSON[_0x249a1a(0x311)](_0x2143b3));break;case'FUNC':_0xe4bd72=_0x15e295[_0x3f05e7]!==''?new Function(JSON['parse'](_0x15e295[_0x3f05e7])):new Function(_0x249a1a(0x122));break;case'ARRAYFUNC':_0x3dc9c7=_0x15e295[_0x3f05e7]!==''?JSON[_0x249a1a(0x311)](_0x15e295[_0x3f05e7]):[],_0xe4bd72=_0x3dc9c7[_0x249a1a(0x395)](_0x1372ab=>new Function(JSON['parse'](_0x1372ab)));break;case _0x249a1a(0x27a):_0xe4bd72=_0x15e295[_0x3f05e7]!==''?String(_0x15e295[_0x3f05e7]):'';break;case _0x249a1a(0x2fc):_0x3dc9c7=_0x15e295[_0x3f05e7]!==''?JSON[_0x249a1a(0x311)](_0x15e295[_0x3f05e7]):[],_0xe4bd72=_0x3dc9c7[_0x249a1a(0x395)](_0x3c604f=>String(_0x3c604f));break;case _0x249a1a(0x1f7):_0x1be7cf=_0x15e295[_0x3f05e7]!==''?JSON['parse'](_0x15e295[_0x3f05e7]):{},_0x3214ea[_0x5ee40c]={},VisuMZ[_0x249a1a(0x365)](_0x3214ea[_0x5ee40c],_0x1be7cf);continue;case'ARRAYSTRUCT':_0x3dc9c7=_0x15e295[_0x3f05e7]!==''?JSON[_0x249a1a(0x311)](_0x15e295[_0x3f05e7]):[],_0xe4bd72=_0x3dc9c7[_0x249a1a(0x395)](_0x4cac70=>VisuMZ['ConvertParams']({},JSON[_0x249a1a(0x311)](_0x4cac70)));break;default:continue;}_0x3214ea[_0x5ee40c]=_0xe4bd72;}}}return _0x3214ea;},(_0x963dd8=>{const _0x5a3f24=_0x5573a7,_0x469a10=_0x963dd8[_0x5a3f24(0x386)];for(const _0x42345f of dependencies){if(_0x5a3f24(0x263)!==_0x5a3f24(0x263))return this[_0x5a3f24(0x2f3)]=_0x1ef47d,'';else{if(!Imported[_0x42345f]){if(_0x5a3f24(0x246)!==_0x5a3f24(0x16d)){alert(_0x5a3f24(0x1fe)[_0x5a3f24(0x2e9)](_0x469a10,_0x42345f)),SceneManager[_0x5a3f24(0x1e7)]();break;}else return _0x458598[_0x5a3f24(0x196)]();}}}const _0x58e2c3=_0x963dd8[_0x5a3f24(0x1f9)];if(_0x58e2c3[_0x5a3f24(0x2bd)](/\[Version[ ](.*?)\]/i)){const _0x5a8967=Number(RegExp['$1']);if(_0x5a8967!==VisuMZ[label]['version']){if(_0x5a3f24(0x18a)==='SdDLl'){this['_autoColorActorNames']===_0x3e2a18&&this[_0x5a3f24(0x163)]();for(_0x31f7c7 of this['_autoColorActorNames']){_0x49c52e=_0x489c1d[_0x5a3f24(0x21e)](_0x2e8f9b[0x0],_0x10dab1[0x1]);}return _0x44e0bf;}else alert(_0x5a3f24(0x245)[_0x5a3f24(0x2e9)](_0x469a10,_0x5a8967)),SceneManager[_0x5a3f24(0x1e7)]();}}if(_0x58e2c3['match'](/\[Tier[ ](\d+)\]/i)){if(_0x5a3f24(0x15d)!==_0x5a3f24(0x15d)){this['_moveTargetX']=_0x5746f2,this['_moveTargetY']=_0x39cdd2,this[_0x5a3f24(0x124)]=_0x4006d8||this[_0x5a3f24(0x2ba)],this['_moveTargetHeight']=_0x19bffd||this[_0x5a3f24(0x28b)],this[_0x5a3f24(0x1bb)]=_0x8c103d||0x1;if(this[_0x5a3f24(0x1bb)]<=0x0)this[_0x5a3f24(0x1bb)]=0x1;this['_wholeMoveDuration']=this[_0x5a3f24(0x1bb)],this[_0x5a3f24(0x252)]=_0x35e8d2||0x0;if(_0x5709de<=0x0)this[_0x5a3f24(0x26a)]();}else{const _0x53115a=Number(RegExp['$1']);_0x53115a<tier?(alert(_0x5a3f24(0x1d2)[_0x5a3f24(0x2e9)](_0x469a10,_0x53115a,tier)),SceneManager['exit']()):tier=Math[_0x5a3f24(0x2f8)](_0x53115a,tier);}}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x963dd8[_0x5a3f24(0x142)]);})(pluginData),PluginManager['registerCommand'](pluginData['name'],_0x5573a7(0x23a),_0x31e7d8=>{const _0x3f7398=_0x5573a7;VisuMZ[_0x3f7398(0x365)](_0x31e7d8,_0x31e7d8);const _0x21d86d=_0x31e7d8[_0x3f7398(0x2bb)]||$gameSystem['getChoiceListLineHeight']()||0x1,_0x2aabbb=_0x31e7d8[_0x3f7398(0x2ec)]||$gameSystem[_0x3f7398(0x196)]()||0x1,_0x486983=_0x31e7d8[_0x3f7398(0x33a)]||$gameSystem[_0x3f7398(0x273)]()||0x1,_0x1014c8=_0x31e7d8[_0x3f7398(0x1c8)][_0x3f7398(0x39f)]()||_0x3f7398(0x19c);$gameSystem[_0x3f7398(0x38e)](_0x21d86d),$gameSystem['setChoiceListMaxRows'](_0x2aabbb),$gameSystem['setChoiceListMaxColumns'](_0x486983),$gameSystem[_0x3f7398(0x2d1)](_0x1014c8);}),PluginManager[_0x5573a7(0x329)](pluginData['name'],'MessageWindowProperties',_0x9927ff=>{const _0x42a7d5=_0x5573a7;VisuMZ[_0x42a7d5(0x365)](_0x9927ff,_0x9927ff);const _0x1dac69=_0x9927ff[_0x42a7d5(0x28d)]||$gameSystem[_0x42a7d5(0x257)]()||0x1,_0x46d459=_0x9927ff[_0x42a7d5(0x1d4)]||$gameSystem['getMessageWindowWidth']()||0x1;$gameTemp[_0x42a7d5(0x2ed)]=_0x9927ff['Center']||![];const _0x2f46cf=_0x9927ff[_0x42a7d5(0x25b)][_0x42a7d5(0x39f)]();$gameSystem[_0x42a7d5(0x1ad)](_0x1dac69),$gameSystem[_0x42a7d5(0x315)](_0x46d459);[_0x42a7d5(0x316),_0x42a7d5(0x153)]['includes'](_0x2f46cf)&&('QrzvZ'!==_0x42a7d5(0x23c)?$gameSystem[_0x42a7d5(0x32e)](eval(_0x2f46cf)):this[_0x42a7d5(0x326)]=_0x3fdf63['makeDeepCopy'](_0x5c77eb));const _0x149022=SceneManager[_0x42a7d5(0x269)][_0x42a7d5(0x337)];_0x149022&&(_0x149022['resetWordWrap'](),_0x149022[_0x42a7d5(0x36f)](),_0x149022[_0x42a7d5(0x14d)]());}),VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x2a4)]=Scene_Boot['prototype'][_0x5573a7(0x293)],Scene_Boot[_0x5573a7(0x39c)]['onDatabaseLoaded']=function(){const _0x4a8d4f=_0x5573a7;VisuMZ[_0x4a8d4f(0x232)][_0x4a8d4f(0x2a4)]['call'](this),this[_0x4a8d4f(0x284)](),this[_0x4a8d4f(0x336)](),this['process_VisuMZ_MessageCore_TextMacros'](),this[_0x4a8d4f(0x377)]();},VisuMZ[_0x5573a7(0x232)]['SortObjectByKeyLength']=function(_0x5935af){const _0x3d9e67=_0x5573a7,_0x5db6c7=VisuMZ[_0x3d9e67(0x232)]['Settings'][_0x5935af];_0x5db6c7['sort']((_0x47c878,_0x5e5a2a)=>{const _0x5e8354=_0x3d9e67;if(!_0x47c878||!_0x5e5a2a)return-0x1;return _0x5e5a2a[_0x5e8354(0x2f4)][_0x5e8354(0x29b)]-_0x47c878['Match']['length'];});},Scene_Boot[_0x5573a7(0x39c)]['process_VisuMZ_MessageCore_TextCodes_Action']=function(){const _0x217353=_0x5573a7;VisuMZ[_0x217353(0x232)]['SortObjectByKeyLength']('TextCodeActions');for(const _0x168609 of VisuMZ[_0x217353(0x232)][_0x217353(0x1d9)][_0x217353(0x342)]){_0x168609[_0x217353(0x2f4)]=_0x168609[_0x217353(0x2f4)][_0x217353(0x3a5)](),_0x168609[_0x217353(0x132)]=new RegExp('\x1b'+_0x168609[_0x217353(0x2f4)],'gi'),_0x168609[_0x217353(0x15f)]='\x1b'+_0x168609[_0x217353(0x2f4)];if(_0x168609[_0x217353(0x22b)]==='')_0x168609[_0x217353(0x15f)]+=_0x217353(0x36c);}},Scene_Boot['prototype']['process_VisuMZ_MessageCore_TextCodes_Replace']=function(){const _0x194715=_0x5573a7;VisuMZ[_0x194715(0x232)][_0x194715(0x302)](_0x194715(0x375));for(const _0x565cc6 of VisuMZ[_0x194715(0x232)][_0x194715(0x1d9)]['TextCodeReplace']){_0x565cc6['textCodeCheck']=new RegExp('\x1b'+_0x565cc6['Match']+_0x565cc6['Type'],'gi');if(_0x565cc6[_0x194715(0x17e)]!==''&&_0x565cc6[_0x194715(0x17e)]!==_0x194715(0x2da))_0x194715(0x1c0)!=='wZFni'?(_0x26072b['y']=this['obtainEscapeParam'](_0x4b71ad),_0x3c5729[_0x194715(0x232)][_0x194715(0x1d9)][_0x194715(0x239)]['RelativePXPY']&&(_0x2b80d8['y']+=_0x27d4cb[_0x194715(0x19b)])):_0x565cc6[_0x194715(0x15f)]=new Function('return\x20\x27'+_0x565cc6[_0x194715(0x17e)]['replace'](/\\/g,'\x1b')+'\x27');else{if('iiYnY'!==_0x194715(0x22c))_0x565cc6['textCodeResult']=_0x565cc6['TextJS'];else return _0x4fd0dd[_0x194715(0x39c)][_0x194715(0x2de)][_0x194715(0x38d)](this,_0x47d6c6);}}},Scene_Boot[_0x5573a7(0x39c)][_0x5573a7(0x2d5)]=function(){const _0x58463a=_0x5573a7;for(const _0x1c7355 of VisuMZ[_0x58463a(0x232)]['Settings'][_0x58463a(0x18f)]){if(_0x58463a(0x2ab)===_0x58463a(0x2ab)){_0x1c7355[_0x58463a(0x132)]=new RegExp('\x5c['+_0x1c7355[_0x58463a(0x2f4)]+'\x5c]','gi');if(_0x1c7355[_0x58463a(0x17e)]!==''&&_0x1c7355[_0x58463a(0x17e)]!==_0x58463a(0x2da)){if('YweRC'!==_0x58463a(0x29c)){const _0x42e6a3=_0xda53e1['parse']('['+_0x54a387['$1']['match'](/\d+/g)+']');for(const _0x2e6fcf of _0x42e6a3){if(!_0x50a34d[_0x58463a(0x28a)](_0x2e6fcf))return!![];}return![];}else _0x1c7355[_0x58463a(0x15f)]=new Function(_0x58463a(0x2d7)+_0x1c7355['TextStr']['replace'](/\\/g,'\x1b')+'\x27');}else{if(_0x58463a(0x14b)==='PvWDx')_0x1c7355[_0x58463a(0x15f)]=_0x1c7355[_0x58463a(0x260)];else{this[_0x58463a(0x2ba)]=_0xc9eff2[_0x58463a(0x2b7)]()+this[_0x58463a(0x238)]();;this[_0x58463a(0x2ba)]=_0x56b7d7[_0x58463a(0x34d)](_0x29a439[_0x58463a(0x2ba)],this[_0x58463a(0x2ba)]);const _0x10d906=_0x432a49['getMessageWindowRows']();this[_0x58463a(0x28b)]=_0x401eb4[_0x58463a(0x269)][_0x58463a(0x19a)](_0x10d906,![])+this[_0x58463a(0x308)](),this[_0x58463a(0x28b)]=_0x4f4dcf[_0x58463a(0x34d)](_0x17a3ff[_0x58463a(0x28b)],this[_0x58463a(0x28b)]);if(_0x18fb42[_0x58463a(0x2ed)])this['resetPositionX']();}}}else{_0x2e076e[_0x58463a(0x232)]['ParseWeaponNotetags']['call'](this,_0x212432);const _0x496e78=_0x4498ea[_0x58463a(0x232)][_0x58463a(0x1d9)][_0x58463a(0x32f)];_0x2554c5[_0x58463a(0x232)][_0x58463a(0x16a)](_0x33a8c7,_0x496e78[_0x58463a(0x37a)]);}}},Scene_Boot[_0x5573a7(0x39c)][_0x5573a7(0x377)]=function(){const _0x56b34d=_0x5573a7,_0xa5d861=VisuMZ[_0x56b34d(0x232)][_0x56b34d(0x1d9)][_0x56b34d(0x32f)];!VisuMZ[_0x56b34d(0x364)]&&('Kmbvv'===_0x56b34d(0x11f)?(VisuMZ[_0x56b34d(0x232)][_0x56b34d(0x150)]($dataClasses,_0xa5d861[_0x56b34d(0x363)]),VisuMZ[_0x56b34d(0x232)][_0x56b34d(0x150)]($dataSkills,_0xa5d861[_0x56b34d(0x175)]),VisuMZ[_0x56b34d(0x232)][_0x56b34d(0x150)]($dataItems,_0xa5d861[_0x56b34d(0x1fa)]),VisuMZ[_0x56b34d(0x232)][_0x56b34d(0x150)]($dataWeapons,_0xa5d861[_0x56b34d(0x37a)]),VisuMZ[_0x56b34d(0x232)][_0x56b34d(0x150)]($dataArmors,_0xa5d861['Armors']),VisuMZ['MessageCore'][_0x56b34d(0x150)]($dataEnemies,_0xa5d861[_0x56b34d(0x1b9)]),VisuMZ['MessageCore'][_0x56b34d(0x150)]($dataStates,_0xa5d861[_0x56b34d(0x27b)])):this[_0x56b34d(0x217)](this['_resetRect']['x'],this[_0x56b34d(0x326)]['y'],this[_0x56b34d(0x326)][_0x56b34d(0x2ba)],this[_0x56b34d(0x326)][_0x56b34d(0x28b)],_0x1452a9,_0x21fb81)),VisuMZ[_0x56b34d(0x232)][_0x56b34d(0x17a)]();},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x35e)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x5573a7(0x225),_0x5573a7(0x22a),_0x5573a7(0x367),_0x5573a7(0x3b7),_0x5573a7(0x381),'</LEFT>',_0x5573a7(0x1c3),_0x5573a7(0x331),_0x5573a7(0x229),_0x5573a7(0x303),_0x5573a7(0x3a3),'</COLORLOCK>',_0x5573a7(0x166),_0x5573a7(0x29a),'<WORDWRAP>',_0x5573a7(0x1c5),_0x5573a7(0x3a8),_0x5573a7(0x231),_0x5573a7(0x1ce),_0x5573a7(0x13f),_0x5573a7(0x1f4),'WAIT',_0x5573a7(0x30b),_0x5573a7(0x1bd),_0x5573a7(0x241),_0x5573a7(0x262),'SWITCH',_0x5573a7(0x37d),_0x5573a7(0x324),_0x5573a7(0x1a9)],VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x150)]=function(_0x1a578c,_0x13d144){const _0x46fa59=_0x5573a7;if(_0x13d144<=0x0)return;const _0x114a13=_0x1a578c;for(const _0x316503 of _0x114a13){if(!_0x316503)continue;VisuMZ[_0x46fa59(0x232)][_0x46fa59(0x16a)](_0x316503,_0x13d144);}},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x17a)]=function(){const _0xcfe86d=_0x5573a7;VisuMZ['MessageCore'][_0xcfe86d(0x1a4)]=[];for(let _0x4b0525=0x1;_0x4b0525<=0x1f;_0x4b0525++){if('dOfrF'!=='PkjWW'){const _0x3816d6='TextColor%1'[_0xcfe86d(0x2e9)](_0x4b0525),_0x131a9f=VisuMZ[_0xcfe86d(0x232)][_0xcfe86d(0x1d9)]['AutoColor'][_0x3816d6];_0x131a9f[_0xcfe86d(0x366)]((_0x482a2c,_0x54f3c6)=>{const _0x5b2dd1=_0xcfe86d;if('MRoKI'!==_0x5b2dd1(0x298)){if(!_0x482a2c||!_0x54f3c6)return-0x1;return _0x54f3c6[_0x5b2dd1(0x29b)]-_0x482a2c[_0x5b2dd1(0x29b)];}else{if(!this[_0x5b2dd1(0x206)])return;const _0x5c5f0d=0x8,_0x1bab41=this[_0x5b2dd1(0x206)],_0x4d9609=this['x']+this['width'],_0x536ac0=_0x1d1617[_0x5b2dd1(0x267)]((_0x3ee439[_0x5b2dd1(0x2ba)]-_0x1a11ab[_0x5b2dd1(0x31d)])/0x2);_0x4d9609>=_0x586b04['boxWidth']+_0x536ac0-_0x1bab41[_0x5b2dd1(0x2ba)]+_0x5c5f0d?_0x1bab41['x']=-_0x1bab41[_0x5b2dd1(0x2ba)]-_0x5c5f0d:_0x1bab41['x']=this[_0x5b2dd1(0x2ba)]+_0x5c5f0d,_0x1bab41['y']=this['height']/0x2-_0x1bab41[_0x5b2dd1(0x28b)]/0x2;}}),this['CreateAutoColorRegExpListEntries'](_0x131a9f,_0x4b0525);}else this['contents'][_0xcfe86d(0x203)]=_0x4fe844[_0xcfe86d(0x2c3)](),this[_0xcfe86d(0x14e)][_0xcfe86d(0x202)]=_0x2f5271['mainFontSize'](),this[_0xcfe86d(0x14e)][_0xcfe86d(0x21a)]=![],this[_0xcfe86d(0x14e)][_0xcfe86d(0x1cc)]=![],this['resetTextColor']();}},VisuMZ[_0x5573a7(0x232)]['CreateAutoColorRegExpListEntries']=function(_0x976581,_0x592f1b){const _0xbb428a=_0x5573a7;for(const _0x185ec7 of _0x976581){if(_0x185ec7[_0xbb428a(0x29b)]<=0x0)continue;if(/^\d+$/[_0xbb428a(0x1c4)](_0x185ec7))continue;let _0x2b8615=VisuMZ['MessageCore'][_0xbb428a(0x3b9)](_0x185ec7);if(_0x185ec7[_0xbb428a(0x2bd)](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g)){if(_0xbb428a(0x1e0)!=='csJVz')var _0x52be28=new RegExp(_0x2b8615,'i');else return _0x7d0872['_texts'][_0xbb428a(0x29b)]>=_0x2c9141[_0xbb428a(0x257)]()&&this['nextEventCode']()!==0x191;}else{if('AsaiW'==='AsaiW')var _0x52be28=new RegExp('\x5cb'+_0x2b8615+'\x5cb','g');else _0x4b745d[_0xbb428a(0x1f0)](),_0x2be66b[_0xbb428a(0x36f)](),_0x2e6596[_0xbb428a(0x14d)]();}VisuMZ[_0xbb428a(0x232)]['AutoColorRegExp'][_0xbb428a(0x2c2)]([_0x52be28,_0xbb428a(0x11c)[_0xbb428a(0x2e9)](_0x592f1b,_0x185ec7)]);}},VisuMZ[_0x5573a7(0x232)]['ConvertTextAutoColorRegExpFriendly']=function(_0x46475c){const _0x1ac82f=_0x5573a7;return _0x46475c=_0x46475c[_0x1ac82f(0x21e)](/(\W)/gi,(_0x3b5436,_0x3702be)=>_0x1ac82f(0x188)[_0x1ac82f(0x2e9)](_0x3702be)),_0x46475c;},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x170)]=VisuMZ[_0x5573a7(0x170)],VisuMZ[_0x5573a7(0x170)]=function(_0x2cae43){const _0x57eb24=_0x5573a7;VisuMZ[_0x57eb24(0x232)][_0x57eb24(0x170)][_0x57eb24(0x38d)](this,_0x2cae43);const _0x2f2d39=VisuMZ['MessageCore']['Settings']['AutoColor'];VisuMZ[_0x57eb24(0x232)][_0x57eb24(0x16a)](_0x2cae43,_0x2f2d39[_0x57eb24(0x363)]);},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x1cd)]=VisuMZ[_0x5573a7(0x1cd)],VisuMZ[_0x5573a7(0x1cd)]=function(_0xaecf2c){const _0x5f31ec=_0x5573a7;VisuMZ[_0x5f31ec(0x232)][_0x5f31ec(0x1cd)][_0x5f31ec(0x38d)](this,_0xaecf2c);const _0x5736c5=VisuMZ[_0x5f31ec(0x232)]['Settings'][_0x5f31ec(0x32f)];VisuMZ['MessageCore'][_0x5f31ec(0x16a)](_0xaecf2c,_0x5736c5[_0x5f31ec(0x175)]);},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x294)]=VisuMZ['ParseItemNotetags'],VisuMZ['ParseItemNotetags']=function(_0x1efa76){const _0x5cd51c=_0x5573a7;VisuMZ[_0x5cd51c(0x232)][_0x5cd51c(0x294)][_0x5cd51c(0x38d)](this,_0x1efa76);const _0x4996b3=VisuMZ[_0x5cd51c(0x232)][_0x5cd51c(0x1d9)]['AutoColor'];VisuMZ[_0x5cd51c(0x232)][_0x5cd51c(0x16a)](_0x1efa76,_0x4996b3[_0x5cd51c(0x1fa)]);},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x35b)]=VisuMZ[_0x5573a7(0x35b)],VisuMZ[_0x5573a7(0x35b)]=function(_0x21c738){const _0x26dc90=_0x5573a7;VisuMZ[_0x26dc90(0x232)][_0x26dc90(0x35b)][_0x26dc90(0x38d)](this,_0x21c738);const _0x589671=VisuMZ[_0x26dc90(0x232)][_0x26dc90(0x1d9)][_0x26dc90(0x32f)];VisuMZ[_0x26dc90(0x232)][_0x26dc90(0x16a)](_0x21c738,_0x589671['Weapons']);},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x3ad)]=VisuMZ[_0x5573a7(0x3ad)],VisuMZ[_0x5573a7(0x3ad)]=function(_0x46d44a){const _0x47606=_0x5573a7;VisuMZ[_0x47606(0x232)][_0x47606(0x3ad)][_0x47606(0x38d)](this,_0x46d44a);const _0xe77b31=VisuMZ[_0x47606(0x232)][_0x47606(0x1d9)]['AutoColor'];VisuMZ[_0x47606(0x232)][_0x47606(0x16a)](_0x46d44a,_0xe77b31['Armors']);},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x1be)]=VisuMZ[_0x5573a7(0x1be)],VisuMZ[_0x5573a7(0x1be)]=function(_0x58b443){const _0x4a3b22=_0x5573a7;VisuMZ[_0x4a3b22(0x232)]['ParseEnemyNotetags']['call'](this,_0x58b443);const _0x34ae72=VisuMZ[_0x4a3b22(0x232)]['Settings']['AutoColor'];VisuMZ['MessageCore'][_0x4a3b22(0x16a)](_0x58b443,_0x34ae72['Enemies']);},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x12c)]=VisuMZ[_0x5573a7(0x12c)],VisuMZ[_0x5573a7(0x12c)]=function(_0x41fe2b){const _0x11506e=_0x5573a7;VisuMZ[_0x11506e(0x232)][_0x11506e(0x12c)][_0x11506e(0x38d)](this,_0x41fe2b);const _0x651e6f=VisuMZ[_0x11506e(0x232)][_0x11506e(0x1d9)][_0x11506e(0x32f)];VisuMZ[_0x11506e(0x232)]['CreateAutoColorFor'](_0x41fe2b,_0x651e6f[_0x11506e(0x27b)]);},VisuMZ[_0x5573a7(0x232)]['CreateAutoColorFor']=function(_0x59055b,_0x21e47d){const _0x4765fd=_0x5573a7;if(_0x21e47d<=0x0)return;const _0x5269c3=VisuMZ['MessageCore'][_0x4765fd(0x1d9)][_0x4765fd(0x32f)][_0x4765fd(0x1a5)+_0x21e47d];let _0x59064=_0x59055b[_0x4765fd(0x386)][_0x4765fd(0x20d)]();if(/^\d+$/[_0x4765fd(0x1c4)](_0x59064))return;if(VisuMZ['MessageCore'][_0x4765fd(0x35e)]['includes'](_0x59064[_0x4765fd(0x3a5)]()))return;_0x59064=_0x59064[_0x4765fd(0x21e)](/\\I\[(\d+)\]/gi,''),_0x59064=_0x59064[_0x4765fd(0x21e)](/\x1bI\[(\d+)\]/gi,'');if(_0x59064[_0x4765fd(0x29b)]<=0x0)return;if(_0x59064[_0x4765fd(0x2bd)](/-----/i))return;_0x5269c3[_0x4765fd(0x2c2)](_0x59064);},SceneManager['isSceneBattle']=function(){const _0x1b0044=_0x5573a7;return this[_0x1b0044(0x269)]&&this[_0x1b0044(0x269)][_0x1b0044(0x344)]===Scene_Battle;},SceneManager[_0x5573a7(0x21b)]=function(){const _0x2c16b9=_0x5573a7;return this['_scene']&&this['_scene'][_0x2c16b9(0x344)]===Scene_Map;},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x165)]=TextManager[_0x5573a7(0x2c4)],TextManager[_0x5573a7(0x2c4)]=function(_0x4baa59){const _0x516407=_0x5573a7,_0x4242e4=[_0x516407(0x357),_0x516407(0x1d6),_0x516407(0x2e2),_0x516407(0x1a3),_0x516407(0x2b3),_0x516407(0x2c1),'escapeStart',_0x516407(0x362),_0x516407(0x1f5),_0x516407(0x290)];let _0x46b411=VisuMZ['MessageCore'][_0x516407(0x165)]['call'](this,_0x4baa59);return _0x4242e4[_0x516407(0x1d3)](_0x4baa59)&&(_0x46b411=_0x516407(0x1c5)+_0x46b411),_0x46b411;},ConfigManager[_0x5573a7(0x137)]=VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x1d9)]['TextSpeed'][_0x5573a7(0x169)],VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x1cb)]=ConfigManager['makeData'],ConfigManager[_0x5573a7(0x2c7)]=function(){const _0x2fd6cd=_0x5573a7,_0xc95bb3=VisuMZ[_0x2fd6cd(0x232)][_0x2fd6cd(0x1cb)][_0x2fd6cd(0x38d)](this);return _0xc95bb3['textSpeed']=this[_0x2fd6cd(0x137)],_0xc95bb3;},VisuMZ['MessageCore'][_0x5573a7(0x292)]=ConfigManager[_0x5573a7(0x2c6)],ConfigManager['applyData']=function(_0x3ccd49){const _0x437ed9=_0x5573a7;VisuMZ['MessageCore'][_0x437ed9(0x292)]['call'](this,_0x3ccd49);if(_0x437ed9(0x137)in _0x3ccd49)this[_0x437ed9(0x137)]=Number(_0x3ccd49[_0x437ed9(0x137)])[_0x437ed9(0x355)](0x1,0xb);else{if(_0x437ed9(0x2be)!==_0x437ed9(0x2be)){const _0xb8caf7=_0x19e511[_0x437ed9(0x314)],_0x3f9523=_0x437ed9(0x137);this[_0x437ed9(0x2ca)](_0xb8caf7,_0x3f9523);}else this[_0x437ed9(0x137)]=VisuMZ[_0x437ed9(0x232)][_0x437ed9(0x1d9)][_0x437ed9(0x37e)][_0x437ed9(0x169)];}},TextManager[_0x5573a7(0x314)]=VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x1d9)]['TextSpeed']['Name'],TextManager[_0x5573a7(0x3b4)]=VisuMZ[_0x5573a7(0x232)]['Settings'][_0x5573a7(0x37e)][_0x5573a7(0x2f1)],VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x272)]=Game_System[_0x5573a7(0x39c)]['initialize'],Game_System[_0x5573a7(0x39c)][_0x5573a7(0x20c)]=function(){const _0x5a69b2=_0x5573a7;VisuMZ[_0x5a69b2(0x232)][_0x5a69b2(0x272)][_0x5a69b2(0x38d)](this),this[_0x5a69b2(0x2b6)]();},Game_System['prototype'][_0x5573a7(0x2b6)]=function(){const _0x1de5d0=_0x5573a7,_0x61474c=VisuMZ[_0x1de5d0(0x232)][_0x1de5d0(0x1d9)]['General'],_0x40e0bc=VisuMZ[_0x1de5d0(0x232)]['Settings'][_0x1de5d0(0x25b)];this[_0x1de5d0(0x13a)]={'messageRows':_0x61474c[_0x1de5d0(0x219)],'messageWidth':_0x61474c['MessageWidth'],'messageWordWrap':_0x40e0bc[_0x1de5d0(0x13c)],'helpWordWrap':_0x40e0bc[_0x1de5d0(0x168)],'choiceLineHeight':_0x61474c[_0x1de5d0(0x3b6)],'choiceRows':_0x61474c[_0x1de5d0(0x286)],'choiceCols':_0x61474c[_0x1de5d0(0x131)],'choiceTextAlign':_0x61474c[_0x1de5d0(0x18b)]};},Game_System[_0x5573a7(0x39c)][_0x5573a7(0x257)]=function(){const _0x2f5a60=_0x5573a7;if(this[_0x2f5a60(0x13a)]===undefined)this[_0x2f5a60(0x2b6)]();if(this['_MessageCoreSettings'][_0x2f5a60(0x2cb)]===undefined)this[_0x2f5a60(0x2b6)]();return this[_0x2f5a60(0x13a)]['messageRows'];},Game_System[_0x5573a7(0x39c)][_0x5573a7(0x1ad)]=function(_0x2cf936){const _0x16c637=_0x5573a7;if(this[_0x16c637(0x13a)]===undefined)this[_0x16c637(0x2b6)]();if(this[_0x16c637(0x13a)]['messageRows']===undefined)this[_0x16c637(0x2b6)]();this[_0x16c637(0x13a)]['messageRows']=_0x2cf936||0x1;},Game_System[_0x5573a7(0x39c)][_0x5573a7(0x2b7)]=function(){const _0x39c883=_0x5573a7;if(this[_0x39c883(0x13a)]===undefined)this[_0x39c883(0x2b6)]();if(this[_0x39c883(0x13a)][_0x39c883(0x148)]===undefined)this['initMessageCore']();return this[_0x39c883(0x13a)][_0x39c883(0x148)];},Game_System[_0x5573a7(0x39c)][_0x5573a7(0x315)]=function(_0x53a307){const _0x33af00=_0x5573a7;if(this[_0x33af00(0x13a)]===undefined)this[_0x33af00(0x2b6)]();if(this['_MessageCoreSettings'][_0x33af00(0x148)]===undefined)this[_0x33af00(0x2b6)]();_0x53a307=Math['ceil'](_0x53a307);if(_0x53a307%0x2!==0x0)_0x53a307+=0x1;this[_0x33af00(0x13a)]['messageWidth']=_0x53a307||0x2;},Game_System[_0x5573a7(0x39c)][_0x5573a7(0x221)]=function(){const _0x49b9fc=_0x5573a7;if(this[_0x49b9fc(0x13a)]===undefined)this['initMessageCore']();if(this[_0x49b9fc(0x13a)][_0x49b9fc(0x2f6)]===undefined)this[_0x49b9fc(0x2b6)]();return this['_MessageCoreSettings'][_0x49b9fc(0x2f6)];},Game_System[_0x5573a7(0x39c)][_0x5573a7(0x32e)]=function(_0x1a4e24){const _0x19135b=_0x5573a7;if(this[_0x19135b(0x13a)]===undefined)this[_0x19135b(0x2b6)]();if(this[_0x19135b(0x13a)][_0x19135b(0x2f6)]===undefined)this[_0x19135b(0x2b6)]();this[_0x19135b(0x13a)][_0x19135b(0x2f6)]=_0x1a4e24;},Game_System['prototype'][_0x5573a7(0x300)]=function(){const _0x2fffe6=_0x5573a7;if(this[_0x2fffe6(0x13a)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings']['helpWordWrap']===undefined)this['initMessageCore']();return this[_0x2fffe6(0x13a)][_0x2fffe6(0x3b2)];},Game_System['prototype'][_0x5573a7(0x26b)]=function(_0x34498a){const _0x178a3b=_0x5573a7;if(this['_MessageCoreSettings']===undefined)this[_0x178a3b(0x2b6)]();if(this[_0x178a3b(0x13a)]['helpWordWrap']===undefined)this['initMessageCore']();this['_MessageCoreSettings'][_0x178a3b(0x3b2)]=_0x34498a;},Game_System[_0x5573a7(0x39c)][_0x5573a7(0x36a)]=function(){const _0x249222=_0x5573a7;if(this[_0x249222(0x13a)]===undefined)this[_0x249222(0x2b6)]();if(this[_0x249222(0x13a)]['choiceLineHeight']===undefined)this['initMessageCore']();return this[_0x249222(0x13a)][_0x249222(0x282)];},Game_System[_0x5573a7(0x39c)][_0x5573a7(0x38e)]=function(_0x309d33){const _0x4bbaa8=_0x5573a7;if(this[_0x4bbaa8(0x13a)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x4bbaa8(0x282)]===undefined)this['initMessageCore']();this[_0x4bbaa8(0x13a)][_0x4bbaa8(0x282)]=_0x309d33||0x1;},Game_System[_0x5573a7(0x39c)][_0x5573a7(0x196)]=function(){const _0x4df0b9=_0x5573a7;if(this['_MessageCoreSettings']===undefined)this[_0x4df0b9(0x2b6)]();if(this['_MessageCoreSettings'][_0x4df0b9(0x22f)]===undefined)this[_0x4df0b9(0x2b6)]();return this[_0x4df0b9(0x13a)][_0x4df0b9(0x22f)];},Game_System[_0x5573a7(0x39c)][_0x5573a7(0x34c)]=function(_0x49b186){const _0xc347c3=_0x5573a7;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0xc347c3(0x13a)]['choiceRows']===undefined)this[_0xc347c3(0x2b6)]();this[_0xc347c3(0x13a)][_0xc347c3(0x22f)]=_0x49b186||0x1;},Game_System[_0x5573a7(0x39c)][_0x5573a7(0x273)]=function(){const _0x4062d9=_0x5573a7;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x4062d9(0x1a2)]===undefined)this['initMessageCore']();return this[_0x4062d9(0x13a)]['choiceCols'];},Game_System[_0x5573a7(0x39c)]['setChoiceListMaxColumns']=function(_0x13f4e2){const _0x29376e=_0x5573a7;if(this[_0x29376e(0x13a)]===undefined)this[_0x29376e(0x2b6)]();if(this['_MessageCoreSettings'][_0x29376e(0x1a2)]===undefined)this[_0x29376e(0x2b6)]();this[_0x29376e(0x13a)]['choiceCols']=_0x13f4e2||0x1;},Game_System[_0x5573a7(0x39c)]['getChoiceListTextAlign']=function(){const _0x1bc011=_0x5573a7;if(this[_0x1bc011(0x13a)]===undefined)this[_0x1bc011(0x2b6)]();if(this['_MessageCoreSettings'][_0x1bc011(0x1e9)]===undefined)this[_0x1bc011(0x2b6)]();return this[_0x1bc011(0x13a)]['choiceTextAlign'];},Game_System[_0x5573a7(0x39c)][_0x5573a7(0x2d1)]=function(_0x3d8810){const _0x7c7529=_0x5573a7;if(this[_0x7c7529(0x13a)]===undefined)this[_0x7c7529(0x2b6)]();if(this[_0x7c7529(0x13a)][_0x7c7529(0x1e9)]===undefined)this['initMessageCore']();this['_MessageCoreSettings'][_0x7c7529(0x1e9)]=_0x3d8810[_0x7c7529(0x39f)]();},VisuMZ[_0x5573a7(0x232)]['Game_Party_initialize']=Game_Party['prototype']['initialize'],Game_Party[_0x5573a7(0x39c)][_0x5573a7(0x20c)]=function(){const _0x1f588b=_0x5573a7;VisuMZ[_0x1f588b(0x232)][_0x1f588b(0x2d3)]['call'](this),this[_0x1f588b(0x2b6)]();},Game_Party[_0x5573a7(0x39c)][_0x5573a7(0x2b6)]=function(){const _0x322cd1=_0x5573a7;this[_0x322cd1(0x1ea)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x5573a7(0x39c)]['getLastGainedItemData']=function(){const _0x2c6cd7=_0x5573a7;if(this[_0x2c6cd7(0x1ea)]===undefined)this[_0x2c6cd7(0x2b6)]();return this['_lastGainedItemData'];},Game_Party[_0x5573a7(0x39c)][_0x5573a7(0x1ec)]=function(_0x44fd51,_0x1b4aae){const _0x21542e=_0x5573a7;if(this[_0x21542e(0x1ea)]===undefined)this['initMessageCore']();if(!_0x44fd51)return;if(DataManager[_0x21542e(0x305)](_0x44fd51)){if('KGpJD'!==_0x21542e(0x1fd)){const _0x31e85e=['fontFace','fontSize',_0x21542e(0x21a),_0x21542e(0x1cc),'textColor',_0x21542e(0x3a7),_0x21542e(0x3a1),_0x21542e(0x361)];let _0x2d3e56={};for(const _0x27a350 of _0x31e85e){_0x2d3e56[_0x27a350]=this['contents'][_0x27a350];}return _0x2d3e56;}else this[_0x21542e(0x1ea)][_0x21542e(0x28f)]=0x0;}else{if(DataManager[_0x21542e(0x21c)](_0x44fd51))this[_0x21542e(0x1ea)]['type']=0x1;else DataManager['isArmor'](_0x44fd51)&&(this[_0x21542e(0x1ea)][_0x21542e(0x28f)]=0x2);}this['_lastGainedItemData']['id']=_0x44fd51['id'],this['_lastGainedItemData'][_0x21542e(0x32a)]=_0x1b4aae;},VisuMZ['MessageCore'][_0x5573a7(0x1c1)]=Game_Party[_0x5573a7(0x39c)][_0x5573a7(0x31e)],Game_Party['prototype'][_0x5573a7(0x31e)]=function(_0x561887,_0x57b408,_0x117458){const _0x34805f=_0x5573a7;VisuMZ[_0x34805f(0x232)]['Game_Party_gainItem'][_0x34805f(0x38d)](this,_0x561887,_0x57b408,_0x117458),_0x57b408>0x0&&this['setLastGainedItemData'](_0x561887,_0x57b408);},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x2ae)]=Game_Map[_0x5573a7(0x39c)][_0x5573a7(0x20c)],Game_Map[_0x5573a7(0x39c)]['initialize']=function(){const _0x18d653=_0x5573a7;VisuMZ[_0x18d653(0x232)][_0x18d653(0x2ae)][_0x18d653(0x38d)](this),this[_0x18d653(0x1dd)]=[];},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x2fe)]=Game_Map[_0x5573a7(0x39c)][_0x5573a7(0x155)],Game_Map[_0x5573a7(0x39c)][_0x5573a7(0x155)]=function(){const _0x1f44c2=_0x5573a7;VisuMZ[_0x1f44c2(0x232)][_0x1f44c2(0x2fe)][_0x1f44c2(0x38d)](this),this['_messageCommonEvents']=[];},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x33c)]=Game_Map['prototype'][_0x5573a7(0x319)],Game_Map['prototype'][_0x5573a7(0x319)]=function(){const _0xa56f00=_0x5573a7;VisuMZ[_0xa56f00(0x232)][_0xa56f00(0x33c)][_0xa56f00(0x38d)](this),this[_0xa56f00(0x390)]();},Game_Map[_0x5573a7(0x39c)][_0x5573a7(0x2b8)]=function(_0x42c498){const _0x5b0912=_0x5573a7;if(!$dataCommonEvents[_0x42c498])return;this[_0x5b0912(0x1dd)]=this[_0x5b0912(0x1dd)]||[];const _0x3b0575=this['_interpreter'][_0x5b0912(0x313)],_0x1013d8=new Game_MessageCommonEvent(_0x42c498,_0x3b0575);this['_messageCommonEvents'][_0x5b0912(0x2c2)](_0x1013d8);},Game_Map[_0x5573a7(0x39c)][_0x5573a7(0x390)]=function(){const _0x1580d8=_0x5573a7;this[_0x1580d8(0x1dd)]=this[_0x1580d8(0x1dd)]||[];for(const _0x5b939c of this[_0x1580d8(0x1dd)]){if(!_0x5b939c[_0x1580d8(0x2df)]){if(_0x1580d8(0x345)!==_0x1580d8(0x345)){const _0x506b0c=_0x1a9126['min'](_0x371b5c[_0x1580d8(0x2ba)],_0x465cc1[_0x1580d8(0x2b7)]()),_0xa6c1c1=_0xed298d[_0x1580d8(0x257)](),_0x34f08d=this[_0x1580d8(0x19a)](_0xa6c1c1,![]),_0x18f8a3=(_0x4059fa['boxWidth']-_0x506b0c)/0x2,_0xcad174=0x0;return new _0x291d52(_0x18f8a3,_0xcad174,_0x506b0c,_0x34f08d);}else this[_0x1580d8(0x1dd)][_0x1580d8(0x184)](_0x5b939c);}else{if(_0x1580d8(0x209)===_0x1580d8(0x3ab)){if(_0x5cc393===_0x1580d8(0x137))return this[_0x1580d8(0x1b1)](_0x3f7c2b,_0x4f01f4,_0x3811ad);_0xfee13e['MessageCore']['Window_Options_changeVolume']['call'](this,_0x4aebfb,_0x335c8d,_0x267e2b);}else _0x5b939c[_0x1580d8(0x383)]();}}},Game_Interpreter['prototype']['command101']=function(_0x478c74){const _0x53df1c=_0x5573a7;if($gameMessage[_0x53df1c(0x198)]())return![];return this[_0x53df1c(0x393)](_0x478c74),this['addContinuousShowTextCommands'](_0x478c74),this[_0x53df1c(0x2cd)](_0x478c74),this[_0x53df1c(0x265)](_0x53df1c(0x2c4)),!![];},Game_Interpreter[_0x5573a7(0x39c)]['prepareShowTextCommand']=function(_0x216550){const _0x3f84ec=_0x5573a7;$gameMessage['setFaceImage'](_0x216550[0x0],_0x216550[0x1]),$gameMessage['setBackground'](_0x216550[0x2]),$gameMessage[_0x3f84ec(0x158)](_0x216550[0x3]),$gameMessage[_0x3f84ec(0x138)](_0x216550[0x4]);},Game_Interpreter[_0x5573a7(0x39c)]['addContinuousShowTextCommands']=function(_0x59ec61){const _0x209b86=_0x5573a7;while(this[_0x209b86(0x343)]()){this[_0x209b86(0x12b)]++;this['currentCommand']()[_0x209b86(0x332)]===0x191&&$gameMessage[_0x209b86(0x228)](this['currentCommand']()['parameters'][0x0]);if(this[_0x209b86(0x173)]())break;}},Game_Interpreter[_0x5573a7(0x39c)]['isContinuePrepareShowTextCommands']=function(){const _0x43b758=_0x5573a7;return this[_0x43b758(0x242)]()===0x65&&$gameSystem[_0x43b758(0x257)]()>0x4?!![]:this[_0x43b758(0x242)]()===0x191;},Game_Interpreter['prototype'][_0x5573a7(0x173)]=function(){const _0x1bf8d0=_0x5573a7;return $gameMessage[_0x1bf8d0(0x141)][_0x1bf8d0(0x29b)]>=$gameSystem['getMessageWindowRows']()&&this['nextEventCode']()!==0x191;},Game_Interpreter[_0x5573a7(0x39c)][_0x5573a7(0x2cd)]=function(_0x432c81){const _0x50fc15=_0x5573a7;switch(this[_0x50fc15(0x242)]()){case 0x66:this[_0x50fc15(0x12b)]++,this[_0x50fc15(0x13b)](this[_0x50fc15(0x374)]()['parameters']);break;case 0x67:this[_0x50fc15(0x12b)]++,this['setupNumInput'](this['currentCommand']()[_0x50fc15(0x142)]);break;case 0x68:this['_index']++,this[_0x50fc15(0x139)](this[_0x50fc15(0x374)]()[_0x50fc15(0x142)]);break;}},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x306)]=Game_Interpreter['prototype']['setupChoices'],Game_Interpreter['prototype'][_0x5573a7(0x13b)]=function(_0x4bf655){const _0x157f81=_0x5573a7;_0x4bf655=this[_0x157f81(0x275)](),VisuMZ[_0x157f81(0x232)]['Game_Interpreter_setupChoices'][_0x157f81(0x38d)](this,_0x4bf655);},Game_Interpreter[_0x5573a7(0x39c)]['addContinuousShowChoices']=function(){const _0x3b5c0f=_0x5573a7,_0x155a92=this[_0x3b5c0f(0x12b)],_0x21e8a6=[];let _0x40f324=0x0;this[_0x3b5c0f(0x12b)]++;while(this[_0x3b5c0f(0x12b)]<this[_0x3b5c0f(0x2bf)]['length']){if('SmAdq'==='SmAdq'){if(this['currentCommand']()['indent']===this[_0x3b5c0f(0x154)]){if(_0x3b5c0f(0x1c6)===_0x3b5c0f(0x179)){const _0x3f0483=_0x353b23[_0x3b5c0f(0x1d1)]();if(_0x3f0483['id']<=0x0)return'';return _0x3f0483[_0x3b5c0f(0x32a)];}else{if(this[_0x3b5c0f(0x374)]()[_0x3b5c0f(0x332)]===0x194&&this['nextEventCode']()!==0x66)break;else{if(this[_0x3b5c0f(0x374)]()[_0x3b5c0f(0x332)]===0x66){if(_0x3b5c0f(0x352)==='UJAgU')this[_0x3b5c0f(0x143)](_0x40f324,this['currentCommand'](),_0x155a92),this[_0x3b5c0f(0x12b)]-=0x2;else return this[_0x3b5c0f(0x2cc)](_0x47ea1f,!![],!![]),this[_0x3b5c0f(0x35c)](_0x3b5c0f(0x3a4),_0x14114e(_0x12e84c)||0x0),'';}else this[_0x3b5c0f(0x374)]()[_0x3b5c0f(0x332)]===0x192&&(this['currentCommand']()[_0x3b5c0f(0x142)][0x0]=_0x40f324,_0x40f324++);}}}this[_0x3b5c0f(0x12b)]++;}else _0x1c5454(_0x3b5c0f(0x245)['format'](_0x4257b9,_0x50e1b5)),_0x323f22[_0x3b5c0f(0x1e7)]();}return this[_0x3b5c0f(0x12b)]=_0x155a92,this[_0x3b5c0f(0x374)]()[_0x3b5c0f(0x142)];},Game_Interpreter[_0x5573a7(0x39c)][_0x5573a7(0x143)]=function(_0x38eee2,_0x2731b2,_0x488acf){const _0x1d4115=_0x5573a7;this['adjustShowChoiceDefault'](_0x38eee2,_0x2731b2,_0x488acf),this[_0x1d4115(0x1b4)](_0x38eee2,_0x2731b2,_0x488acf),this[_0x1d4115(0x2cf)](_0x2731b2,_0x488acf);},Game_Interpreter[_0x5573a7(0x39c)][_0x5573a7(0x1a1)]=function(_0x3aa60e,_0xe2e8b4,_0x122321){const _0xd4c5be=_0x5573a7;if(_0xe2e8b4['parameters'][0x2]<0x0)return;const _0x5b8839=_0xe2e8b4[_0xd4c5be(0x142)][0x2]+_0x3aa60e;this[_0xd4c5be(0x2bf)][_0x122321][_0xd4c5be(0x142)][0x2]=_0x5b8839;},Game_Interpreter[_0x5573a7(0x39c)][_0x5573a7(0x1b4)]=function(_0x4ec3d1,_0x2ffda6,_0x23d4a6){const _0x43a057=_0x5573a7;if(_0x2ffda6[_0x43a057(0x142)][0x1]>=0x0){if(_0x43a057(0x373)!==_0x43a057(0x373))this[_0x43a057(0x14e)][_0xfb45eb]=_0x1c38b9[_0x767dc3];else{var _0x2b885b=_0x2ffda6['parameters'][0x1]+_0x4ec3d1;this[_0x43a057(0x2bf)][_0x23d4a6][_0x43a057(0x142)][0x1]=_0x2b885b;}}else _0x2ffda6[_0x43a057(0x142)][0x1]===-0x2&&(this[_0x43a057(0x2bf)][_0x23d4a6][_0x43a057(0x142)][0x1]=_0x2ffda6['parameters'][0x1]);},Game_Interpreter[_0x5573a7(0x39c)][_0x5573a7(0x2cf)]=function(_0x217df4,_0x383719){const _0x5bd608=_0x5573a7;for(const _0x1528c8 of _0x217df4[_0x5bd608(0x142)][0x0]){this[_0x5bd608(0x2bf)][_0x383719][_0x5bd608(0x142)][0x0][_0x5bd608(0x2c2)](_0x1528c8);}this[_0x5bd608(0x2bf)][_0x5bd608(0x2b2)](this[_0x5bd608(0x12b)]-0x1,0x2);};function Game_MessageCommonEvent(){const _0x47569c=_0x5573a7;this[_0x47569c(0x20c)](...arguments);}function _0xc913(_0x44ab78,_0x1f594f){const _0x249190=_0x2491();return _0xc913=function(_0xc913c2,_0x535970){_0xc913c2=_0xc913c2-0x11b;let _0x1e21a5=_0x249190[_0xc913c2];return _0x1e21a5;},_0xc913(_0x44ab78,_0x1f594f);}Game_MessageCommonEvent[_0x5573a7(0x39c)][_0x5573a7(0x20c)]=function(_0x51731a,_0x3d926f){const _0x3d0d69=_0x5573a7;this['_commonEventId']=_0x51731a,this['_eventId']=_0x3d926f||0x0,this[_0x3d0d69(0x247)]();},Game_MessageCommonEvent[_0x5573a7(0x39c)]['event']=function(){const _0x214ebb=_0x5573a7;return $dataCommonEvents[this[_0x214ebb(0x167)]];},Game_MessageCommonEvent['prototype'][_0x5573a7(0x233)]=function(){const _0x13dda1=_0x5573a7;return this[_0x13dda1(0x187)]()[_0x13dda1(0x233)];},Game_MessageCommonEvent['prototype'][_0x5573a7(0x247)]=function(){const _0x5a2791=_0x5573a7;this['_interpreter']=new Game_Interpreter(),this[_0x5a2791(0x2df)]['setup'](this[_0x5a2791(0x233)](),this['_eventId']);},Game_MessageCommonEvent[_0x5573a7(0x39c)][_0x5573a7(0x383)]=function(){const _0x152d97=_0x5573a7;this[_0x152d97(0x2df)]&&('EdKQP'===_0x152d97(0x255)?!_0x3d084a[_0x152d97(0x2df)]?this[_0x152d97(0x1dd)][_0x152d97(0x184)](_0x5c81a4):_0x3864ea[_0x152d97(0x383)]():this['_interpreter'][_0x152d97(0x291)]()?this[_0x152d97(0x2df)][_0x152d97(0x383)]():this[_0x152d97(0x369)]());},Game_MessageCommonEvent[_0x5573a7(0x39c)][_0x5573a7(0x369)]=function(){this['_interpreter']=null;},Scene_Message[_0x5573a7(0x39c)][_0x5573a7(0x1e2)]=function(){const _0x480b20=_0x5573a7,_0x33422a=Math['min'](Graphics['width'],$gameSystem['getMessageWindowWidth']()),_0x2cc36e=$gameSystem[_0x480b20(0x257)](),_0x655a67=this[_0x480b20(0x19a)](_0x2cc36e,![]),_0x5a87db=(Graphics['boxWidth']-_0x33422a)/0x2,_0x47befb=0x0;return new Rectangle(_0x5a87db,_0x47befb,_0x33422a,_0x655a67);},VisuMZ[_0x5573a7(0x232)]['Scene_Options_maxCommands']=Scene_Options[_0x5573a7(0x39c)]['maxCommands'],Scene_Options['prototype'][_0x5573a7(0x171)]=function(){const _0xde8263=_0x5573a7;let _0x32afcb=VisuMZ[_0xde8263(0x232)][_0xde8263(0x28e)][_0xde8263(0x38d)](this);const _0x31d227=VisuMZ['MessageCore'][_0xde8263(0x1d9)];if(_0x31d227['TextSpeed'][_0xde8263(0x157)]&&_0x31d227[_0xde8263(0x37e)]['AdjustRect'])_0x32afcb++;return _0x32afcb;},VisuMZ['MessageCore'][_0x5573a7(0x182)]=Window_Base['prototype'][_0x5573a7(0x20c)],Window_Base['prototype']['initialize']=function(_0xeca904){const _0x80dd36=_0x5573a7;this['initMessageCore'](_0xeca904),VisuMZ['MessageCore']['Window_Base_initialize'][_0x80dd36(0x38d)](this,_0xeca904);},Window_Base[_0x5573a7(0x39c)]['initMessageCore']=function(_0x47c8ba){const _0x1ce980=_0x5573a7;this['initTextAlignement'](),this[_0x1ce980(0x1f0)](),this['registerResetRect'](_0x47c8ba);},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x149)]=function(){const _0x548397=_0x5573a7;this[_0x548397(0x1ff)](_0x548397(0x19c));},Window_Base['prototype'][_0x5573a7(0x1ff)]=function(_0x19597a){const _0x5c4b4c=_0x5573a7;this[_0x5c4b4c(0x18c)]=_0x19597a;},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x31f)]=function(){const _0x50dcc4=_0x5573a7;return this[_0x50dcc4(0x18c)];},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x392)]=Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x1b0)],Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x1b0)]=function(_0x532307){const _0x5bbea5=_0x5573a7;return this[_0x5bbea5(0x1f0)](),VisuMZ[_0x5bbea5(0x232)][_0x5bbea5(0x392)][_0x5bbea5(0x38d)](this,_0x532307);},VisuMZ[_0x5573a7(0x232)]['Window_Base_processAllText']=Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x1b3)],Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x1b3)]=function(_0x42ca0f){const _0x4a454a=_0x5573a7;VisuMZ[_0x4a454a(0x232)]['Window_Base_processAllText'][_0x4a454a(0x38d)](this,_0x42ca0f);if(_0x42ca0f[_0x4a454a(0x1a0)])this[_0x4a454a(0x1ff)](_0x4a454a(0x19c));},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x1f0)]=function(){const _0x4a3b18=_0x5573a7;this[_0x4a3b18(0x1bf)](![]);},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x2f2)]=function(){const _0x12c65e=_0x5573a7;return this[_0x12c65e(0x296)];},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x1bf)]=function(_0x378ee8){const _0x404687=_0x5573a7;return this[_0x404687(0x296)]=_0x378ee8,'';},Window_Base[_0x5573a7(0x39c)]['registerResetRect']=function(_0x184b52){this['_resetRect']=JsonEx['makeDeepCopy'](_0x184b52);},Window_Base['prototype'][_0x5573a7(0x244)]=function(){const _0xeea424=_0x5573a7;this[_0xeea424(0x14e)][_0xeea424(0x203)]=$gameSystem[_0xeea424(0x2c3)](),this[_0xeea424(0x14e)][_0xeea424(0x202)]=$gameSystem['mainFontSize'](),this[_0xeea424(0x14e)][_0xeea424(0x21a)]=![],this[_0xeea424(0x14e)][_0xeea424(0x1cc)]=![],this[_0xeea424(0x2a0)]();},Window_Base[_0x5573a7(0x39c)]['resetTextColor']=function(){const _0x3319de=_0x5573a7;this[_0x3319de(0x384)](ColorManager[_0x3319de(0x178)]()),this['changeOutlineColor'](ColorManager[_0x3319de(0x330)]());const _0x15f937=VisuMZ[_0x3319de(0x232)]['Settings'][_0x3319de(0x239)];_0x15f937['DefaultOutlineWidth']===undefined&&(_0x3319de(0x307)==='nURhq'?_0x15f937[_0x3319de(0x346)]=0x3:(_0x5c860d[_0x3319de(0x232)][_0x3319de(0x272)][_0x3319de(0x38d)](this),this[_0x3319de(0x2b6)]())),this[_0x3319de(0x14e)][_0x3319de(0x3a1)]=_0x15f937[_0x3319de(0x346)],this[_0x3319de(0x174)](![]);},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x174)]=function(_0x45899f){const _0x432cab=_0x5573a7;this[_0x432cab(0x264)]=_0x45899f;},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x223)]=function(){const _0x585ef3=_0x5573a7;return this[_0x585ef3(0x264)];},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x1e4)]=function(){return![];},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x15b)]=function(){const _0x506602=_0x5573a7,_0x23022d=[_0x506602(0x203),_0x506602(0x202),'fontBold',_0x506602(0x1cc),_0x506602(0x1eb),_0x506602(0x3a7),_0x506602(0x3a1),_0x506602(0x361)];let _0x242cd0={};for(const _0x4cb778 of _0x23022d){_0x242cd0[_0x4cb778]=this[_0x506602(0x14e)][_0x4cb778];}return _0x242cd0;},Window_Base['prototype'][_0x5573a7(0x1f2)]=function(_0x4fbdb2){const _0x192c51=_0x5573a7;for(const _0x15cfa6 in _0x4fbdb2){_0x192c51(0x121)!==_0x192c51(0x121)?(this[_0x192c51(0x149)](),this[_0x192c51(0x1f0)](),this[_0x192c51(0x2a5)](_0x47fae9)):this[_0x192c51(0x14e)][_0x15cfa6]=_0x4fbdb2[_0x15cfa6];}},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x23b)]=Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x383)],Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x383)]=function(){const _0x5bd370=_0x5573a7;VisuMZ[_0x5bd370(0x232)][_0x5bd370(0x23b)][_0x5bd370(0x38d)](this),this['updateMove']();},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x235)]=function(){return![];},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x26a)]=function(){const _0x310595=_0x5573a7;if(this[_0x310595(0x1bb)]>0x0){if(_0x310595(0x13e)!==_0x310595(0x13e))this['obtainEscapeParam'](_0x2222e5);else{if(this['canMove']()){if('RGWws'===_0x310595(0x25f)){const _0x371c28=this[_0x310595(0x130)](_0x30585d);if(_0x5b3fb2['drawing'])this[_0x310595(0x174)](_0x371c28>0x0);}else this['x']=this[_0x310595(0x136)](this['x'],this['_moveTargetX']),this['y']=this[_0x310595(0x136)](this['y'],this['_moveTargetY']),this['width']=this[_0x310595(0x136)](this[_0x310595(0x2ba)],this['_moveTargetWidth']),this[_0x310595(0x28b)]=this[_0x310595(0x136)](this[_0x310595(0x28b)],this[_0x310595(0x299)]),this['clampPlacementPosition']();}this['_moveDuration']--;}}},Window_Base[_0x5573a7(0x39c)]['clampPlacementPosition']=function(_0x343ef4,_0x56e1a4){const _0x5c430c=_0x5573a7;!_0x343ef4&&(this[_0x5c430c(0x2ba)]=Math[_0x5c430c(0x34d)](this['width'],Graphics['width']),this[_0x5c430c(0x28b)]=Math[_0x5c430c(0x34d)](this[_0x5c430c(0x28b)],Graphics[_0x5c430c(0x28b)]));if(!_0x56e1a4){const _0x19f0e6=-(Math[_0x5c430c(0x267)](Graphics[_0x5c430c(0x2ba)]-Graphics[_0x5c430c(0x31d)])/0x2),_0x1219a3=_0x19f0e6+Graphics['width']-this[_0x5c430c(0x2ba)],_0x6047b2=-(Math[_0x5c430c(0x267)](Graphics[_0x5c430c(0x28b)]-Graphics['boxHeight'])/0x2),_0x2f0c72=_0x6047b2+Graphics[_0x5c430c(0x28b)]-this[_0x5c430c(0x28b)];this['x']=this['x'][_0x5c430c(0x355)](_0x19f0e6,_0x1219a3),this['y']=this['y'][_0x5c430c(0x355)](_0x6047b2,_0x2f0c72);}},Window_Base['prototype'][_0x5573a7(0x136)]=function(_0x16e0a3,_0x6c324f){const _0x309839=_0x5573a7,_0x143189=this['_moveDuration'],_0x12bfc6=this['_wholeMoveDuration'],_0x27febf=this['calcMoveEasing']((_0x12bfc6-_0x143189)/_0x12bfc6),_0x319ffb=this[_0x309839(0x2a7)]((_0x12bfc6-_0x143189+0x1)/_0x12bfc6),_0x1eb05b=(_0x16e0a3-_0x6c324f*_0x27febf)/(0x1-_0x27febf);return _0x1eb05b+(_0x6c324f-_0x1eb05b)*_0x319ffb;},Window_Base['prototype']['calcMoveEasing']=function(_0x271167){const _0x5cbc6c=_0x5573a7,_0xd73014=0x2;switch(this['_moveEasingType']){case 0x0:return _0x271167;case 0x1:return this['easeIn'](_0x271167,_0xd73014);case 0x2:return this['easeOut'](_0x271167,_0xd73014);case 0x3:return this['easeInOut'](_0x271167,_0xd73014);default:if(Imported[_0x5cbc6c(0x25a)]){if(_0x5cbc6c(0x2a2)===_0x5cbc6c(0x2a2))return VisuMZ[_0x5cbc6c(0x136)](_0x271167,this['_moveEasingType']);else{var _0x14991e=_0x5bfadc['parameters'][0x1]+_0x2e0ace;this['_list'][_0x5c429b][_0x5cbc6c(0x142)][0x1]=_0x14991e;}}else{if(_0x5cbc6c(0x2f7)!==_0x5cbc6c(0x335))return _0x271167;else _0x5a1a03(_0x5cbc6c(0x1d2)[_0x5cbc6c(0x2e9)](_0x349fb7,_0x4076ea,_0x298779)),_0x19ad7c['exit']();}}},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x217)]=function(_0x73c932,_0x5866dd,_0x858fff,_0x5d7636,_0x20bc10,_0x34d37c){const _0x34fc80=_0x5573a7;this[_0x34fc80(0x145)]=_0x73c932,this['_moveTargetY']=_0x5866dd,this[_0x34fc80(0x124)]=_0x858fff||this['width'],this[_0x34fc80(0x299)]=_0x5d7636||this['height'],this[_0x34fc80(0x1bb)]=_0x20bc10||0x1;if(this[_0x34fc80(0x1bb)]<=0x0)this['_moveDuration']=0x1;this['_wholeMoveDuration']=this[_0x34fc80(0x1bb)],this['_moveEasingType']=_0x34d37c||0x0;if(_0x20bc10<=0x0)this[_0x34fc80(0x26a)]();},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x185)]=function(_0xf89461,_0x23b34b,_0xcf47b1,_0x43ccdf,_0x1d4745,_0x5062d1){const _0x2495f2=_0x5573a7;this[_0x2495f2(0x145)]=this['x']+_0xf89461,this[_0x2495f2(0x387)]=this['y']+_0x23b34b,this[_0x2495f2(0x124)]=this[_0x2495f2(0x2ba)]+(_0xcf47b1||0x0),this[_0x2495f2(0x299)]=this[_0x2495f2(0x28b)]+(_0x43ccdf||0x0),this['_moveDuration']=_0x1d4745||0x1;if(this['_moveDuration']<=0x0)this[_0x2495f2(0x1bb)]=0x1;this[_0x2495f2(0x1ba)]=this['_moveDuration'],this[_0x2495f2(0x252)]=_0x5062d1||0x0;if(_0x1d4745<=0x0)this['updateMove']();},Window_Base['prototype']['resetRect']=function(_0x2424bd,_0x5c1830){const _0x5442a0=_0x5573a7;this[_0x5442a0(0x217)](this[_0x5442a0(0x326)]['x'],this[_0x5442a0(0x326)]['y'],this[_0x5442a0(0x326)][_0x5442a0(0x2ba)],this[_0x5442a0(0x326)]['height'],_0x2424bd,_0x5c1830);},VisuMZ['MessageCore'][_0x5573a7(0x129)]=Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x384)],Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x384)]=function(_0x4ab65b){const _0x314196=_0x5573a7;if(this['isColorLocked']())return;_0x4ab65b=_0x4ab65b[_0x314196(0x21e)](/\,/g,''),this[_0x314196(0x1af)]=this['_textColorStack']||[],this[_0x314196(0x1af)][_0x314196(0x123)](this[_0x314196(0x14e)][_0x314196(0x1eb)]),VisuMZ[_0x314196(0x232)][_0x314196(0x129)][_0x314196(0x38d)](this,_0x4ab65b);},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x3ac)]=function(_0x5db33f){const _0x4d24fe=_0x5573a7;this[_0x4d24fe(0x130)](_0x5db33f);if(this[_0x4d24fe(0x223)]())return;_0x5db33f[_0x4d24fe(0x1a0)]&&(this[_0x4d24fe(0x1af)]=this[_0x4d24fe(0x1af)]||[],this[_0x4d24fe(0x14e)][_0x4d24fe(0x1eb)]=this['_textColorStack'][_0x4d24fe(0x32d)]()||ColorManager[_0x4d24fe(0x178)]());},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x192)]=function(_0x1ad1c0){const _0x3d953a=_0x5573a7;return _0x1ad1c0=this[_0x3d953a(0x2de)](_0x1ad1c0),_0x1ad1c0=this['convertBackslashCharacters'](_0x1ad1c0),_0x1ad1c0=this[_0x3d953a(0x3a0)](_0x1ad1c0),_0x1ad1c0=this[_0x3d953a(0x285)](_0x1ad1c0),_0x1ad1c0=this[_0x3d953a(0x1e6)](_0x1ad1c0),_0x1ad1c0=this[_0x3d953a(0x135)](_0x1ad1c0),_0x1ad1c0=this['convertTextAlignmentEscapeCharacters'](_0x1ad1c0),_0x1ad1c0=this['convertLockColorsEscapeCharacters'](_0x1ad1c0),_0x1ad1c0=this[_0x3d953a(0x304)](_0x1ad1c0),_0x1ad1c0=this[_0x3d953a(0x283)](_0x1ad1c0),_0x1ad1c0=this[_0x3d953a(0x34a)](_0x1ad1c0),_0x1ad1c0=this[_0x3d953a(0x270)](_0x1ad1c0),_0x1ad1c0=this[_0x3d953a(0x189)](_0x1ad1c0),_0x1ad1c0=this['convertVariableEscapeCharacters'](_0x1ad1c0),_0x1ad1c0=this[_0x3d953a(0x333)](_0x1ad1c0),_0x1ad1c0=this[_0x3d953a(0x30c)](_0x1ad1c0),_0x1ad1c0;},Window_Base[_0x5573a7(0x39c)]['convertTextMacros']=function(_0x2229be){const _0x4e6126=_0x5573a7;for(const _0xec7921 of VisuMZ[_0x4e6126(0x232)][_0x4e6126(0x1d9)][_0x4e6126(0x18f)]){_0x4e6126(0x2b4)!==_0x4e6126(0x2b4)?(_0x3fe2c4=_0x338b70['replace'](/[\n\r]+/g,''),_0x35cf95=_0x14ad22[_0x4e6126(0x21e)](/<(?:BR|LINEBREAK)>/gi,'\x0a')):_0x2229be[_0x4e6126(0x2bd)](_0xec7921[_0x4e6126(0x132)])&&(_0x2229be=_0x2229be[_0x4e6126(0x21e)](_0xec7921[_0x4e6126(0x132)],_0xec7921['textCodeResult']['bind'](this)));}return _0x2229be;},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x31c)]=function(_0x12d18f){return _0x12d18f=_0x12d18f['replace'](/\\/g,'\x1b'),_0x12d18f=_0x12d18f['replace'](/\x1b\x1b/g,'\x5c'),_0x12d18f;},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x3a0)]=function(_0x394949){const _0x41ac96=_0x5573a7;for(;;){if(_0x394949[_0x41ac96(0x2bd)](/\\V\[(\d+)\]/gi))_0x394949=_0x394949[_0x41ac96(0x21e)](/\\V\[(\d+)\]/gi,(_0x545bb4,_0x2a4971)=>this[_0x41ac96(0x31c)](String($gameVariables[_0x41ac96(0x28a)](parseInt(_0x2a4971)))));else{if(_0x394949['match'](/\x1bV\[(\d+)\]/gi)){if(_0x41ac96(0x1d0)==='oZTUk')_0x394949=_0x394949['replace'](/\x1bV\[(\d+)\]/gi,(_0x5b8b13,_0x46d8f3)=>this[_0x41ac96(0x31c)](String($gameVariables[_0x41ac96(0x28a)](parseInt(_0x46d8f3)))));else return _0x5f5782[_0x41ac96(0x38b)]+=_0x46d207[0x0][_0x41ac96(0x29b)],_0x3eb06d(_0x3e134c[0x0]['slice'](0x1,_0xbfb05a[0x0][_0x41ac96(0x29b)]-0x1));}else break;}}return _0x394949;},Window_Base[_0x5573a7(0x39c)]['preConvertEscapeCharacters']=function(_0x7ea4e7){const _0x1e3e13=_0x5573a7;return this[_0x1e3e13(0x163)](),_0x7ea4e7;},Window_Base[_0x5573a7(0x39c)]['postConvertEscapeCharacters']=function(_0x41c749){return _0x41c749;},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x1e6)]=function(_0x15d2d2){const _0x314c7a=_0x5573a7;return _0x15d2d2=_0x15d2d2[_0x314c7a(0x21e)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/i,''),_0x15d2d2=_0x15d2d2['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x15d2d2=_0x15d2d2['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0x15d2d2;},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x135)]=function(_0x4f5936){const _0x4509b4=_0x5573a7;return _0x4f5936=_0x4f5936['replace'](/<B>/gi,_0x4509b4(0x200)),_0x4f5936=_0x4f5936[_0x4509b4(0x21e)](/<\/B>/gi,_0x4509b4(0x297)),_0x4f5936=_0x4f5936[_0x4509b4(0x21e)](/<I>/gi,_0x4509b4(0x120)),_0x4f5936=_0x4f5936[_0x4509b4(0x21e)](/<\/I>/gi,_0x4509b4(0x1a6)),_0x4f5936;},Window_Base['prototype'][_0x5573a7(0x191)]=function(_0x9584f9){const _0x2e822a=_0x5573a7;return _0x9584f9=_0x9584f9['replace'](/<LEFT>/gi,'\x1bTEXTALIGNMENT[1]'),_0x9584f9=_0x9584f9[_0x2e822a(0x21e)](/<\/LEFT>/gi,'\x1bTEXTALIGNMENT[0]'),_0x9584f9=_0x9584f9[_0x2e822a(0x21e)](/<CENTER>/gi,_0x2e822a(0x1da)),_0x9584f9=_0x9584f9[_0x2e822a(0x21e)](/<\/CENTER>/gi,_0x2e822a(0x205)),_0x9584f9=_0x9584f9['replace'](/<RIGHT>/gi,_0x2e822a(0x1fc)),_0x9584f9=_0x9584f9[_0x2e822a(0x21e)](/<\/RIGHT>/gi,'\x1bTEXTALIGNMENT[0]'),_0x9584f9;},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x391)]=function(_0x4d5656){const _0x3b9a50=_0x5573a7;return _0x4d5656=_0x4d5656['replace'](/<COLORLOCK>/gi,'\x1bCOLORLOCK[1]'),_0x4d5656=_0x4d5656['replace'](/<\/COLORLOCK>/gi,_0x3b9a50(0x277)),_0x4d5656=_0x4d5656[_0x3b9a50(0x21e)](/\(\(\(/gi,'\x1bCOLORLOCK[1]'),_0x4d5656=_0x4d5656['replace'](/\)\)\)/gi,_0x3b9a50(0x277)),_0x4d5656;},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x304)]=function(_0x2d127f){const _0x1d96a6=_0x5573a7;return _0x2d127f=_0x2d127f[_0x1d96a6(0x21e)](/\x1bN\[(\d+)\]/gi,(_0xcb0023,_0x277b22)=>this[_0x1d96a6(0x370)](parseInt(_0x277b22))),_0x2d127f=_0x2d127f['replace'](/\x1bP\[(\d+)\]/gi,(_0x26c95e,_0x3340f3)=>this[_0x1d96a6(0x128)](parseInt(_0x3340f3))),_0x2d127f=_0x2d127f[_0x1d96a6(0x21e)](/\x1bG/gi,TextManager[_0x1d96a6(0x287)]),_0x2d127f;},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x283)]=function(_0x3103f8){const _0xf302b2=_0x5573a7;return _0x3103f8=_0x3103f8[_0xf302b2(0x21e)](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this[_0xf302b2(0x12d)]()),_0x3103f8=_0x3103f8[_0xf302b2(0x21e)](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this['battleUserName']()),_0x3103f8=_0x3103f8[_0xf302b2(0x21e)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this[_0xf302b2(0x358)](!![])),_0x3103f8=_0x3103f8[_0xf302b2(0x21e)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0xf302b2(0x358)](![])),_0x3103f8;},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x12d)]=function(){const _0x50451d=_0x5573a7;if(!SceneManager[_0x50451d(0x1e5)]())return'';if(BattleManager[_0x50451d(0x183)])return BattleManager[_0x50451d(0x183)]['name']();if(BattleManager[_0x50451d(0x323)][0x0])return BattleManager[_0x50451d(0x323)][0x0][_0x50451d(0x386)]();return'';},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x278)]=function(){const _0x3eb2b6=_0x5573a7;if(!SceneManager[_0x3eb2b6(0x1e5)]())return'';let _0x5659b4=null;return _0x5659b4=BattleManager[_0x3eb2b6(0x24b)],!_0x5659b4&&BattleManager[_0x3eb2b6(0x350)]()&&(_0x3eb2b6(0x1d8)===_0x3eb2b6(0x249)?_0x45839d[_0x3eb2b6(0x2bd)](_0x2b79db['textCodeCheck'])&&(_0x3f6619=_0x943456[_0x3eb2b6(0x21e)](_0x488ed2[_0x3eb2b6(0x132)],_0x233f15[_0x3eb2b6(0x15f)]),_0x21e123=this['convertVariableEscapeCharacters'](_0x2318e8)):_0x5659b4=BattleManager['actor']()),_0x5659b4?_0x5659b4[_0x3eb2b6(0x386)]():'';},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x358)]=function(_0x60e3a6){const _0x27de51=_0x5573a7;if(!SceneManager['isSceneBattle']())return'';let _0x4c5ffb=BattleManager[_0x27de51(0x220)]||null;!_0x4c5ffb&&BattleManager[_0x27de51(0x350)]()&&(_0x4c5ffb=BattleManager[_0x27de51(0x2c5)]());if(_0x4c5ffb){if(_0x27de51(0x216)==='xXyVF'){let _0x5a750c='';if(_0x60e3a6)_0x5a750c+='\x1bI[%1]'[_0x27de51(0x2e9)](_0x4c5ffb['iconIndex']);return _0x5a750c+=_0x4c5ffb[_0x27de51(0x386)],_0x5a750c;}else this[_0x27de51(0x2b6)](_0x3cbecf),_0x45a22a['MessageCore'][_0x27de51(0x182)]['call'](this,_0x413534);}return'';},Window_Base[_0x5573a7(0x39c)]['convertMessageCoreEscapeActions']=function(_0x3b915c){const _0x138ba9=_0x5573a7;for(const _0x46c698 of VisuMZ[_0x138ba9(0x232)]['Settings']['TextCodeActions']){if(_0x138ba9(0x25d)===_0x138ba9(0x2b1))return _0x138ba9(0x11c)[_0x138ba9(0x2e9)](_0x3e4a72,_0x2f541b);else{if(_0x3b915c[_0x138ba9(0x2bd)](_0x46c698['textCodeCheck'])){if(_0x138ba9(0x360)===_0x138ba9(0x3ae)){const _0xccfe85=_0x365704['split'](',')['map'](_0x1b459d=>_0x51936d(_0x1b459d)||0x0);if(_0xccfe85[0x0]!==_0xc0ae21)this[_0x138ba9(0x26f)]['x']=_0x52d6e4(_0xccfe85[0x0]);if(_0xccfe85[0x1]!==_0x4cd9c0)this[_0x138ba9(0x26f)]['y']=_0xcca39f(_0xccfe85[0x1]);if(_0xccfe85[0x2]!==_0x35d978)this[_0x138ba9(0x26f)][_0x138ba9(0x2ba)]=_0x13ff01(_0xccfe85[0x2]);if(_0xccfe85[0x3]!==_0x47fc06)this[_0x138ba9(0x26f)][_0x138ba9(0x28b)]=_0x4bf6f7(_0xccfe85[0x3]);return'';}else _0x3b915c=_0x3b915c[_0x138ba9(0x21e)](_0x46c698[_0x138ba9(0x132)],_0x46c698[_0x138ba9(0x15f)]),_0x3b915c=this[_0x138ba9(0x3a0)](_0x3b915c);}}}return _0x3b915c;},Window_Base['prototype'][_0x5573a7(0x270)]=function(_0x22da9e){const _0x3ae195=_0x5573a7;for(const _0x2a143e of VisuMZ['MessageCore'][_0x3ae195(0x1d9)][_0x3ae195(0x375)]){_0x22da9e['match'](_0x2a143e[_0x3ae195(0x132)])&&(_0x22da9e=_0x22da9e[_0x3ae195(0x21e)](_0x2a143e[_0x3ae195(0x132)],_0x2a143e['textCodeResult']['bind'](this)),_0x22da9e=this[_0x3ae195(0x3a0)](_0x22da9e));}return _0x22da9e;},Window_Base['prototype'][_0x5573a7(0x370)]=function(_0x38d5c3){const _0x46f744=_0x5573a7,_0x4326f7=_0x38d5c3>=0x1?$gameActors['actor'](_0x38d5c3):null,_0x5d5cca=_0x4326f7?_0x4326f7[_0x46f744(0x386)]():'',_0x411c5a=Number(VisuMZ[_0x46f744(0x232)][_0x46f744(0x1d9)]['AutoColor'][_0x46f744(0x33d)]);return this[_0x46f744(0x1e4)]()&&_0x411c5a!==0x0?'\x1bC[%1]%2\x1bPREVCOLOR[0]'['format'](_0x411c5a,_0x5d5cca):_0x5d5cca;},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x128)]=function(_0x31badf){const _0x70fc33=_0x5573a7,_0x1b0981=_0x31badf>=0x1?$gameParty[_0x70fc33(0x20f)]()[_0x31badf-0x1]:null,_0x53fa49=_0x1b0981?_0x1b0981[_0x70fc33(0x386)]():'',_0x572978=Number(VisuMZ[_0x70fc33(0x232)][_0x70fc33(0x1d9)]['AutoColor']['Actors']);if(this[_0x70fc33(0x1e4)]()&&_0x572978!==0x0){if(_0x70fc33(0x28c)===_0x70fc33(0x28c))return _0x70fc33(0x11c)['format'](_0x572978,_0x53fa49);else this[_0x70fc33(0x2e1)](_0x3b4edc,0x1);}else{if(_0x70fc33(0x254)===_0x70fc33(0x254))return _0x53fa49;else _0x434380=_0x49cf1e[_0x70fc33(0x21e)](/\\V\[(\d+)\]/gi,(_0x17346b,_0x453750)=>this['convertBackslashCharacters'](_0x35c63f(_0x45c072[_0x70fc33(0x28a)](_0x48196d(_0x453750)))));}},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x333)]=function(_0x580eb0){const _0x533af6=_0x5573a7;return this[_0x533af6(0x1e4)]()&&(_0x580eb0=this['processStoredAutoColorChanges'](_0x580eb0),_0x580eb0=this[_0x533af6(0x162)](_0x580eb0)),_0x580eb0;},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x2e3)]=function(_0x3be561){const _0x52de44=_0x5573a7;for(autoColor of VisuMZ[_0x52de44(0x232)][_0x52de44(0x1a4)]){if(_0x52de44(0x371)==='wSrQv')return _0x365571[_0x52de44(0x136)](_0x217d52,this[_0x52de44(0x252)]);else _0x3be561=_0x3be561[_0x52de44(0x21e)](autoColor[0x0],autoColor[0x1]);}return _0x3be561;},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x1c2)]=function(){this['_autoColorActorNames']=[];},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x163)]=function(){const _0xc232f4=_0x5573a7;this[_0xc232f4(0x1c2)]();const _0x258905=VisuMZ[_0xc232f4(0x232)][_0xc232f4(0x1d9)][_0xc232f4(0x32f)],_0x2cf941=_0x258905[_0xc232f4(0x33d)];if(_0x2cf941<=0x0)return;for(const _0x3dd7d8 of $gameActors[_0xc232f4(0x2ce)]){if('fkTlH'!==_0xc232f4(0x18e))this[_0xc232f4(0x322)]();else{if(!_0x3dd7d8)continue;const _0x24bbe3=_0x3dd7d8['name']();if(_0x24bbe3['trim']()[_0xc232f4(0x29b)]<=0x0)continue;if(/^\d+$/['test'](_0x24bbe3))continue;if(_0x24bbe3[_0xc232f4(0x2bd)](/-----/i))continue;let _0x407ef4=VisuMZ[_0xc232f4(0x232)][_0xc232f4(0x3b9)](_0x24bbe3);const _0x44eaeb=new RegExp('\x5cb'+_0x407ef4+'\x5cb','g'),_0x7b763c=_0xc232f4(0x11c)[_0xc232f4(0x2e9)](_0x2cf941,_0x24bbe3);this['_autoColorActorNames'][_0xc232f4(0x2c2)]([_0x44eaeb,_0x7b763c]);}}},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x162)]=function(_0x5addcf){const _0x573471=_0x5573a7;this[_0x573471(0x127)]===undefined&&this['registerActorNameAutoColorChanges']();for(autoColor of this[_0x573471(0x127)]){if(_0x573471(0x17f)!=='HoCsG')_0x5addcf=_0x5addcf['replace'](autoColor[0x0],autoColor[0x1]);else return this['nextEventCode']()===0x191;}return _0x5addcf;},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x2ac)]=function(_0x48f5bf,_0x52918b,_0x274553){const _0x3fb7c6=_0x5573a7;if(!_0x48f5bf)return'';const _0x13704c=_0x48f5bf[_0x52918b];let _0x4f5088='';if(_0x13704c&&_0x274553&&_0x13704c[_0x3fb7c6(0x1ca)]){const _0x202294='\x1bi[%1]%2';_0x4f5088=_0x202294['format'](_0x13704c[_0x3fb7c6(0x1ca)],_0x13704c[_0x3fb7c6(0x386)]);}else{if(_0x13704c){if(_0x3fb7c6(0x30f)===_0x3fb7c6(0x11e))return!![];else _0x4f5088=_0x13704c[_0x3fb7c6(0x386)];}else{if(_0x3fb7c6(0x29d)==='RMokP'){for(const _0x4cc8a5 of _0x52b8b6[_0x3fb7c6(0x142)][0x0]){this[_0x3fb7c6(0x2bf)][_0x552676]['parameters'][0x0]['push'](_0x4cc8a5);}this[_0x3fb7c6(0x2bf)][_0x3fb7c6(0x2b2)](this[_0x3fb7c6(0x12b)]-0x1,0x2);}else _0x4f5088='';}}return this['isAutoColorAffected']()&&(_0x4f5088=this['applyDatabaseAutoColor'](_0x4f5088,_0x48f5bf)),_0x4f5088;},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x1ae)]=function(_0x115ec4){const _0x50bb03=_0x5573a7,_0x10a0ac=$gameParty[_0x50bb03(0x1d1)]();if(_0x10a0ac['id']<0x0)return'';let _0x2998ce=null;if(_0x10a0ac['type']===0x0)_0x2998ce=$dataItems[_0x10a0ac['id']];if(_0x10a0ac[_0x50bb03(0x28f)]===0x1)_0x2998ce=$dataWeapons[_0x10a0ac['id']];if(_0x10a0ac[_0x50bb03(0x28f)]===0x2)_0x2998ce=$dataArmors[_0x10a0ac['id']];if(!_0x2998ce)return'';return _0x115ec4?_0x50bb03(0x19d)[_0x50bb03(0x2e9)](_0x2998ce['iconIndex'],_0x2998ce[_0x50bb03(0x386)]):_0x2998ce[_0x50bb03(0x386)];},Window_Base['prototype'][_0x5573a7(0x348)]=function(){const _0x3a6468=_0x5573a7,_0x57f3cb=$gameParty[_0x3a6468(0x1d1)]();if(_0x57f3cb['id']<=0x0)return'';return _0x57f3cb[_0x3a6468(0x32a)];},Window_Base['prototype'][_0x5573a7(0x1bc)]=function(_0x49e056,_0x467614){const _0x1392d0=_0x5573a7,_0x5c1599=VisuMZ[_0x1392d0(0x232)][_0x1392d0(0x1d9)][_0x1392d0(0x32f)];let _0x157bd6=0x0;if(_0x467614===$dataActors)_0x157bd6=_0x5c1599[_0x1392d0(0x33d)];if(_0x467614===$dataClasses)_0x157bd6=_0x5c1599[_0x1392d0(0x363)];if(_0x467614===$dataSkills)_0x157bd6=_0x5c1599['Skills'];if(_0x467614===$dataItems)_0x157bd6=_0x5c1599['Items'];if(_0x467614===$dataWeapons)_0x157bd6=_0x5c1599['Weapons'];if(_0x467614===$dataArmors)_0x157bd6=_0x5c1599[_0x1392d0(0x1e1)];if(_0x467614===$dataEnemies)_0x157bd6=_0x5c1599['Enemies'];if(_0x467614===$dataStates)_0x157bd6=_0x5c1599[_0x1392d0(0x27b)];return _0x157bd6>0x0&&(_0x1392d0(0x208)===_0x1392d0(0x30d)?_0x5dee1d[_0x1392d0(0x2b8)](_0x160cb8):_0x49e056=_0x1392d0(0x11c)[_0x1392d0(0x2e9)](_0x157bd6,_0x49e056)),_0x49e056;},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x30c)]=function(_0x1924e6){const _0x14c3ef=_0x5573a7;_0x1924e6=_0x1924e6[_0x14c3ef(0x21e)](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0xf1c7db,_0x1f1a25)=>this[_0x14c3ef(0x1bf)](!![])),_0x1924e6=_0x1924e6[_0x14c3ef(0x21e)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x37cff0,_0x5264df)=>this['setWordWrap'](![])),_0x1924e6=_0x1924e6[_0x14c3ef(0x21e)](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x36ff54,_0x167300)=>this[_0x14c3ef(0x1bf)](![]));if(_0x1924e6[_0x14c3ef(0x2bd)](Window_Message[_0x14c3ef(0x1f8)]))this[_0x14c3ef(0x1bf)](![]);else{if(_0x1924e6[_0x14c3ef(0x2bd)](Window_Message[_0x14c3ef(0x2aa)])){if(_0x14c3ef(0x2d8)==='ShCqq'){_0x22d2b1[_0x14c3ef(0x232)][_0x14c3ef(0x3af)][_0x14c3ef(0x38d)](this,_0x3085f0);if(_0xe2b63d[_0x14c3ef(0x1a0)])this['setTextAlignment'](_0x14c3ef(0x19c));}else this[_0x14c3ef(0x1bf)](![]);}}if(!this[_0x14c3ef(0x2f2)]())return _0x1924e6;if(_0x1924e6[_0x14c3ef(0x29b)]<=0x0)return _0x1924e6;if(VisuMZ['MessageCore']['Settings'][_0x14c3ef(0x25b)][_0x14c3ef(0x356)])_0x1924e6=_0x1924e6['replace'](/[\n\r]+/g,'\x20'),_0x1924e6=_0x1924e6[_0x14c3ef(0x21e)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a');else{if(_0x14c3ef(0x2a8)!==_0x14c3ef(0x2a8))return 0x4;else _0x1924e6=_0x1924e6[_0x14c3ef(0x21e)](/[\n\r]+/g,''),_0x1924e6=_0x1924e6['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a');}return _0x1924e6=this[_0x14c3ef(0x186)](_0x1924e6),_0x1924e6=_0x1924e6[_0x14c3ef(0x39e)]('\x20')[_0x14c3ef(0x16c)](_0x14c3ef(0x18d)),_0x1924e6=_0x1924e6[_0x14c3ef(0x21e)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x1924e6=_0x1924e6['replace'](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x1924e6;},Window_Base[_0x5573a7(0x39c)]['addWrapBreakAfterPunctuation']=function(_0x4d6860){return _0x4d6860;},VisuMZ['MessageCore']['Window_Base_processNewLine']=Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x2e5)],Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x2e5)]=function(_0x207bf1){const _0x429ab4=_0x5573a7;VisuMZ[_0x429ab4(0x232)]['Window_Base_processNewLine'][_0x429ab4(0x38d)](this,_0x207bf1),this['processTextAlignmentX'](_0x207bf1);},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x1aa)]=Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x25c)],Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x25c)]=function(_0x2c2c73,_0x2eabea){const _0x22e356=_0x5573a7;VisuMZ[_0x22e356(0x232)][_0x22e356(0x1aa)]['call'](this,_0x2c2c73,_0x2eabea),_0x2eabea===_0x22e356(0x18d)&&this[_0x22e356(0x2db)](_0x2c2c73);},Window_Base[_0x5573a7(0x39c)]['obtainEscapeString']=function(_0x1633f5){const _0x407b82=_0x5573a7;var _0x15a847=/^\<(.*?)\>/[_0x407b82(0x1ed)](_0x1633f5[_0x407b82(0x289)]['slice'](_0x1633f5['index']));if(_0x15a847){if(_0x407b82(0x3a9)!=='bXEJC'){if(_0x10a2ab[_0x407b82(0x197)]())return;this[_0x407b82(0x2f3)]=this[_0x407b82(0x2f3)]||0x0;const _0x18a4f7=this['_messageWindow'],_0x5522fa=_0x1ff959[_0x407b82(0x267)](_0x18a4f7['width']*this[_0x407b82(0x2f3)]/0xa);this['x']=_0x18a4f7['x']+_0x5522fa-_0x4b63f6['floor'](this[_0x407b82(0x2ba)]/0x2),this['x']=this['x'][_0x407b82(0x355)](_0x18a4f7['x'],_0x18a4f7['x']+_0x18a4f7[_0x407b82(0x2ba)]-this[_0x407b82(0x2ba)]);}else return _0x1633f5[_0x407b82(0x38b)]+=_0x15a847[0x0][_0x407b82(0x29b)],String(_0x15a847[0x0][_0x407b82(0x34e)](0x1,_0x15a847[0x0][_0x407b82(0x29b)]-0x1));}else return'';},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x2e0)]=Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x172)],Window_Base['prototype'][_0x5573a7(0x172)]=function(_0x4a6f29,_0x233f8f){const _0x4a9b9f=_0x5573a7;switch(_0x4a6f29){case'C':if(_0x233f8f[_0x4a9b9f(0x1a0)])_0x4a9b9f(0x334)===_0x4a9b9f(0x334)?VisuMZ[_0x4a9b9f(0x232)][_0x4a9b9f(0x2e0)][_0x4a9b9f(0x38d)](this,_0x4a6f29,_0x233f8f):_0x1f9397=_0x48d3d8[_0x4a9b9f(0x2f8)](_0x5b5884,_0x404737);else{if(_0x4a9b9f(0x396)==='njPhU')this[_0x4a9b9f(0x130)](_0x233f8f);else{this[_0x4a9b9f(0x26f)]=this[_0x4a9b9f(0x26f)]||{};const _0x196f66=['x','y',_0x4a9b9f(0x2ba),_0x4a9b9f(0x28b)];for(const _0x185ba5 of _0x196f66){this[_0x4a9b9f(0x26f)][_0x185ba5]!==_0x42dec3&&(this[_0x185ba5]=_0x120582(this[_0x4a9b9f(0x26f)][_0x185ba5]));}}}break;case'I':case'{':case'}':VisuMZ[_0x4a9b9f(0x232)]['Window_Base_processEscapeCharacter'][_0x4a9b9f(0x38d)](this,_0x4a6f29,_0x233f8f);break;case'FS':this[_0x4a9b9f(0x398)](_0x233f8f);break;case'PX':this[_0x4a9b9f(0x21d)](_0x233f8f);break;case'PY':this['processPyTextCode'](_0x233f8f);break;case'BOLD':this[_0x4a9b9f(0x1dc)](this[_0x4a9b9f(0x130)](_0x233f8f));break;case _0x4a9b9f(0x13f):this[_0x4a9b9f(0x394)](_0x233f8f);break;case _0x4a9b9f(0x194):this[_0x4a9b9f(0x3b0)](_0x233f8f);break;case _0x4a9b9f(0x1f4):this[_0x4a9b9f(0x214)](_0x233f8f);break;case'ITALIC':this['processFontChangeItalic'](this[_0x4a9b9f(0x130)](_0x233f8f));break;case'PICTURE':this[_0x4a9b9f(0x1c7)](_0x233f8f);break;case _0x4a9b9f(0x338):this[_0x4a9b9f(0x3ac)](_0x233f8f);break;case _0x4a9b9f(0x36e):this[_0x4a9b9f(0x3b8)](_0x233f8f);break;case _0x4a9b9f(0x32b):this[_0x4a9b9f(0x1b5)](_0x233f8f);break;case _0x4a9b9f(0x2bc):this[_0x4a9b9f(0x2db)](_0x233f8f);break;default:this['processMessageCoreEscapeActions'](_0x4a6f29,_0x233f8f);}},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x11d)]=function(_0x4431de,_0x2ee840){const _0x4c5443=_0x5573a7;for(const _0x596c71 of VisuMZ[_0x4c5443(0x232)]['Settings'][_0x4c5443(0x342)]){if(_0x596c71['Match']===_0x4431de){if(_0x596c71[_0x4c5443(0x22b)]==='')this[_0x4c5443(0x130)](_0x2ee840);_0x596c71[_0x4c5443(0x380)][_0x4c5443(0x38d)](this,_0x2ee840);if(this[_0x4c5443(0x344)]===Window_Message){if(_0x4c5443(0x2d9)===_0x4c5443(0x2d9)){const _0x2b706b=_0x596c71['CommonEvent']||0x0;if(_0x2b706b>0x0)this['launchMessageCommonEvent'](_0x2b706b);}else return![];}}}},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x2af)]=function(){const _0x142293=_0x5573a7;this['contents'][_0x142293(0x202)]+=VisuMZ['MessageCore']['Settings']['General'][_0x142293(0x13d)],this['contents']['fontSize']=Math['min'](this['contents']['fontSize'],VisuMZ[_0x142293(0x232)][_0x142293(0x1d9)][_0x142293(0x239)][_0x142293(0x2d2)]);},Window_Base['prototype'][_0x5573a7(0x134)]=function(){const _0x42146a=_0x5573a7;this['contents'][_0x42146a(0x202)]-=VisuMZ[_0x42146a(0x232)][_0x42146a(0x1d9)][_0x42146a(0x239)][_0x42146a(0x13d)],this[_0x42146a(0x14e)]['fontSize']=Math[_0x42146a(0x2f8)](this[_0x42146a(0x14e)][_0x42146a(0x202)],VisuMZ[_0x42146a(0x232)][_0x42146a(0x1d9)][_0x42146a(0x239)][_0x42146a(0x222)]);},Window_Base[_0x5573a7(0x39c)]['processFsTextCode']=function(_0x213e32){const _0x3a5597=_0x5573a7,_0x541512=this[_0x3a5597(0x130)](_0x213e32);this[_0x3a5597(0x14e)]['fontSize']=_0x541512[_0x3a5597(0x355)](VisuMZ[_0x3a5597(0x232)][_0x3a5597(0x1d9)][_0x3a5597(0x239)][_0x3a5597(0x222)],VisuMZ[_0x3a5597(0x232)][_0x3a5597(0x1d9)][_0x3a5597(0x239)]['FontBiggerCap']);},Window_Base['prototype'][_0x5573a7(0x16f)]=function(_0x97b772){const _0x5152d0=_0x5573a7;let _0x3e30cb=this[_0x5152d0(0x14e)][_0x5152d0(0x202)];const _0xfeff1e=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0x2f260f=_0xfeff1e[_0x5152d0(0x1ed)](_0x97b772);if(!_0x2f260f)break;const _0x129fcb=String(_0x2f260f[0x1])[_0x5152d0(0x3a5)]();if(_0x129fcb==='{')this[_0x5152d0(0x2af)]();else{if(_0x129fcb==='}')this[_0x5152d0(0x134)]();else _0x129fcb==='FS'&&('kaluZ'!==_0x5152d0(0x34b)?this[_0x5152d0(0x14e)][_0x5152d0(0x202)]=parseInt(_0x2f260f[0x3])[_0x5152d0(0x355)](VisuMZ[_0x5152d0(0x232)][_0x5152d0(0x1d9)]['General'][_0x5152d0(0x222)],VisuMZ[_0x5152d0(0x232)][_0x5152d0(0x1d9)][_0x5152d0(0x239)]['FontBiggerCap']):this['_lastGainedItemData'][_0x5152d0(0x28f)]=0x1);}this[_0x5152d0(0x14e)]['fontSize']>_0x3e30cb&&(_0x3e30cb=this['contents'][_0x5152d0(0x202)]);}return _0x3e30cb;},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x21d)]=function(_0x363952){const _0x4c53a0=_0x5573a7;_0x363952['x']=this['obtainEscapeParam'](_0x363952);if(VisuMZ[_0x4c53a0(0x232)][_0x4c53a0(0x1d9)][_0x4c53a0(0x239)][_0x4c53a0(0x20a)]){if(_0x4c53a0(0x27d)===_0x4c53a0(0x27d))_0x363952['x']+=_0x363952['startX'];else return this[_0x4c53a0(0x2cc)](_0x3e1598,!![],!![]),this[_0x4c53a0(0x35c)]('none'),'';}},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x26e)]=function(_0x16a3cf){const _0x3fa65e=_0x5573a7;_0x16a3cf['y']=this[_0x3fa65e(0x130)](_0x16a3cf),VisuMZ[_0x3fa65e(0x232)][_0x3fa65e(0x1d9)]['General'][_0x3fa65e(0x20a)]&&(_0x16a3cf['y']+=_0x16a3cf['startY']);},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x1dc)]=function(_0x15abd1){const _0x164656=_0x5573a7;this[_0x164656(0x14e)][_0x164656(0x21a)]=!!_0x15abd1;},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x38a)]=function(_0x2252ac){const _0x396188=_0x5573a7;this[_0x396188(0x14e)]['fontItalic']=!!_0x2252ac;},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x3b8)]=function(_0x147c36){const _0x3b3793=_0x5573a7,_0x39b695=this[_0x3b3793(0x130)](_0x147c36);if(!_0x147c36['drawing'])return;switch(_0x39b695){case 0x0:this[_0x3b3793(0x1ff)]('default');return;case 0x1:this[_0x3b3793(0x1ff)]('left');break;case 0x2:this[_0x3b3793(0x1ff)](_0x3b3793(0x309));break;case 0x3:this[_0x3b3793(0x1ff)]('right');break;}this[_0x3b3793(0x176)](_0x147c36);},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x176)]=function(_0x4afaf7){const _0x3d5a63=_0x5573a7;if(!_0x4afaf7['drawing'])return;if(_0x4afaf7['rtl'])return;if(this[_0x3d5a63(0x31f)]()===_0x3d5a63(0x19c))return;let _0x3310e8=_0x4afaf7['text']['indexOf'](_0x3d5a63(0x218),_0x4afaf7[_0x3d5a63(0x38b)]+0x1),_0x196426=_0x4afaf7[_0x3d5a63(0x289)][_0x3d5a63(0x37b)]('\x0a',_0x4afaf7[_0x3d5a63(0x38b)]+0x1);if(_0x3310e8<0x0)_0x3310e8=_0x4afaf7['text'][_0x3d5a63(0x29b)]+0x1;if(_0x196426>0x0)_0x3310e8=Math[_0x3d5a63(0x34d)](_0x3310e8,_0x196426);const _0x12a524=_0x4afaf7['text'][_0x3d5a63(0x382)](_0x4afaf7['index'],_0x3310e8),_0x4d8284=this[_0x3d5a63(0x236)](_0x12a524)[_0x3d5a63(0x2ba)],_0x51ded0=_0x4afaf7['width']||this[_0x3d5a63(0x318)]-0x8,_0x5c2cf3=this['constructor']===Window_Message&&$gameMessage[_0x3d5a63(0x17c)]()!=='';switch(this['getTextAlignment']()){case _0x3d5a63(0x2e4):_0x4afaf7['x']=_0x4afaf7[_0x3d5a63(0x321)];break;case _0x3d5a63(0x309):_0x4afaf7['x']=_0x4afaf7[_0x3d5a63(0x321)],_0x4afaf7['x']+=Math[_0x3d5a63(0x267)]((_0x51ded0-_0x4d8284)/0x2);_0x5c2cf3&&(_0x4afaf7['x']-=_0x4afaf7['startX']/0x2);break;case _0x3d5a63(0x16b):_0x4afaf7['x']=_0x51ded0-_0x4d8284+_0x4afaf7[_0x3d5a63(0x321)];_0x5c2cf3&&(_0x3d5a63(0x251)!=='QMOqu'?_0x4afaf7['x']-=_0x4afaf7['startX']:(_0x5ee160[_0x3d5a63(0x39c)][_0x3d5a63(0x126)]['call'](this),_0x5aa47d[_0x3d5a63(0x232)][_0x3d5a63(0x1d9)][_0x3d5a63(0x239)][_0x3d5a63(0x201)]&&this[_0x3d5a63(0x322)]()));break;}},Window_Base[_0x5573a7(0x39c)]['textSizeExTextAlignment']=function(_0x96881c){const _0x8975fa=_0x5573a7;_0x96881c=_0x96881c[_0x8975fa(0x21e)](/\x1b!/g,''),_0x96881c=_0x96881c['replace'](/\x1b\|/g,''),_0x96881c=_0x96881c['replace'](/\x1b\./g,'');const _0x42399b=this[_0x8975fa(0x20b)](_0x96881c,0x0,0x0,0x0),_0x24c02b=this[_0x8975fa(0x15b)]();return _0x42399b['drawing']=![],this['processAllText'](_0x42399b),this['returnPreservedFontSettings'](_0x24c02b),{'width':_0x42399b[_0x8975fa(0x258)],'height':_0x42399b[_0x8975fa(0x279)]};},Window_Base[_0x5573a7(0x1a8)]=VisuMZ[_0x5573a7(0x232)]['Settings'][_0x5573a7(0x25b)][_0x5573a7(0x160)]||0x0,Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x2db)]=function(_0x589ed4){const _0x4d4fe4=_0x5573a7,_0x56fe8f=(_0x589ed4[_0x4d4fe4(0x19e)]?-0x1:0x1)*this[_0x4d4fe4(0x180)]('\x20');_0x589ed4['x']+=_0x56fe8f;if(this['obtainEscapeParam'](_0x589ed4)>0x0)_0x589ed4['x']+=_0x56fe8f;if(_0x589ed4['rtl'])return;let _0x25bab7=_0x589ed4[_0x4d4fe4(0x289)][_0x4d4fe4(0x37b)](_0x4d4fe4(0x18d),_0x589ed4[_0x4d4fe4(0x38b)]+0x1),_0x5ac2d1=_0x589ed4['text'][_0x4d4fe4(0x37b)]('\x0a',_0x589ed4[_0x4d4fe4(0x38b)]+0x1);if(_0x25bab7<0x0)_0x25bab7=_0x589ed4[_0x4d4fe4(0x289)][_0x4d4fe4(0x29b)]+0x1;if(_0x5ac2d1>0x0)_0x25bab7=Math[_0x4d4fe4(0x34d)](_0x25bab7,_0x5ac2d1);const _0x4a8204=_0x589ed4[_0x4d4fe4(0x289)][_0x4d4fe4(0x382)](_0x589ed4[_0x4d4fe4(0x38b)],_0x25bab7),_0x4d7192=this[_0x4d4fe4(0x310)](_0x4a8204)[_0x4d4fe4(0x2ba)];let _0x717b70=_0x589ed4[_0x4d4fe4(0x2ba)]||this['innerWidth'];_0x717b70-=Window_Base['WORD_WRAP_PADDING'];if(this[_0x4d4fe4(0x344)]===Window_Message){if('ZTsIX'!==_0x4d4fe4(0x389)){const _0x1cb529=$gameMessage[_0x4d4fe4(0x17c)]()===''?0x0:ImageManager[_0x4d4fe4(0x27c)]+0x14;_0x717b70-=_0x1cb529,VisuMZ[_0x4d4fe4(0x232)][_0x4d4fe4(0x1d9)][_0x4d4fe4(0x25b)]['TightWrap']&&(_0x717b70-=_0x1cb529);}else this['preFlushTextState'](_0x1714d2),_0x2d1d0f[_0x4d4fe4(0x39c)][_0x4d4fe4(0x1e3)][_0x4d4fe4(0x38d)](this,_0x4e0568),this[_0x4d4fe4(0x226)](_0x5cb748);}let _0x479bdf=![];if(_0x589ed4['x']+_0x4d7192>_0x589ed4['startX']+_0x717b70)_0x479bdf=!![];if(_0x4d7192===0x0)_0x479bdf=!![];if(_0x479bdf){if('TdGHb'!==_0x4d4fe4(0x1df))return _0x464ff4=_0x3ba358[_0x4d4fe4(0x21e)](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this[_0x4d4fe4(0x12d)]()),_0x56f0b0=_0x45690e['replace'](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this['battleUserName']()),_0x14f30b=_0x35ae8c['replace'](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this[_0x4d4fe4(0x358)](!![])),_0x5d6500=_0x243175['replace'](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0x4d4fe4(0x358)](![])),_0x232a5d;else _0x589ed4[_0x4d4fe4(0x289)]=_0x589ed4['text']['slice'](0x0,_0x589ed4[_0x4d4fe4(0x38b)])+'\x0a'+_0x589ed4[_0x4d4fe4(0x289)][_0x4d4fe4(0x354)](_0x589ed4[_0x4d4fe4(0x38b)]);}},Window_Base[_0x5573a7(0x39c)]['textSizeExWordWrap']=function(_0x5a3cb3){const _0x182fdf=_0x5573a7,_0x184555=this[_0x182fdf(0x20b)](_0x5a3cb3,0x0,0x0,0x0),_0x148603=this[_0x182fdf(0x15b)]();return _0x184555[_0x182fdf(0x1a0)]=![],this[_0x182fdf(0x1bf)](![]),this[_0x182fdf(0x1b3)](_0x184555),this['setWordWrap'](!![]),this[_0x182fdf(0x1f2)](_0x148603),{'width':_0x184555['outputWidth'],'height':_0x184555['outputHeight']};},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x214)]=function(_0x4bfeeb){const _0x324d79=_0x5573a7;return this[_0x324d79(0x130)](_0x4bfeeb);},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x1c7)]=function(_0x2aa52b){const _0x2fc34f=_0x5573a7,_0x3b9440=this['obtainEscapeString'](_0x2aa52b)[_0x2fc34f(0x39e)](',');if(!_0x2aa52b[_0x2fc34f(0x1a0)])return;const _0x3b8981=_0x3b9440[0x0][_0x2fc34f(0x20d)](),_0x1139a6=_0x3b9440[0x1]||0x0,_0x96695b=_0x3b9440[0x2]||0x0,_0x5bdd1d=ImageManager[_0x2fc34f(0x39b)](_0x3b8981),_0x9f646f=this[_0x2fc34f(0x14e)][_0x2fc34f(0x361)];_0x5bdd1d[_0x2fc34f(0x253)](this[_0x2fc34f(0x1b2)][_0x2fc34f(0x347)](this,_0x5bdd1d,_0x2aa52b['x'],_0x2aa52b['y'],_0x1139a6,_0x96695b,_0x9f646f));},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x1b2)]=function(_0x25db02,_0x325f12,_0x40457e,_0x730590,_0x424740,_0x509e71){const _0x2fa2b3=_0x5573a7;_0x730590=_0x730590||_0x25db02[_0x2fa2b3(0x2ba)],_0x424740=_0x424740||_0x25db02[_0x2fa2b3(0x28b)],this[_0x2fa2b3(0x2fa)][_0x2fa2b3(0x361)]=_0x509e71,this[_0x2fa2b3(0x2fa)]['blt'](_0x25db02,0x0,0x0,_0x25db02[_0x2fa2b3(0x2ba)],_0x25db02[_0x2fa2b3(0x28b)],_0x325f12,_0x40457e,_0x730590,_0x424740),this[_0x2fa2b3(0x2fa)]['paintOpacity']=0xff;},Window_Base['prototype'][_0x5573a7(0x394)]=function(_0x42cdf2){const _0x311018=_0x5573a7,_0x2cccc2=this[_0x311018(0x341)](_0x42cdf2)[_0x311018(0x39e)](',');if(!_0x42cdf2['drawing'])return;const _0x3e7c41=_0x2cccc2[0x0][_0x311018(0x20d)](),_0x228353=ImageManager['loadPicture'](_0x3e7c41),_0x346943=JsonEx[_0x311018(0x2ff)](_0x42cdf2),_0x156c47=this['contents'][_0x311018(0x361)];_0x228353[_0x311018(0x253)](this[_0x311018(0x317)][_0x311018(0x347)](this,_0x228353,_0x346943,_0x156c47));},Window_Base[_0x5573a7(0x39c)]['drawBackCenteredPicture']=function(_0x328437,_0x119073,_0xf7d59){const _0x3fa6e8=_0x5573a7,_0x2678e7=_0x119073[_0x3fa6e8(0x2ba)]||this[_0x3fa6e8(0x318)],_0x3b0a71=this[_0x3fa6e8(0x12b)]!==undefined?this[_0x3fa6e8(0x378)]():this['innerHeight'],_0xa1889c=_0x2678e7/_0x328437[_0x3fa6e8(0x2ba)],_0x12d128=_0x3b0a71/_0x328437[_0x3fa6e8(0x28b)],_0xefb2b3=Math[_0x3fa6e8(0x34d)](_0xa1889c,_0x12d128,0x1),_0x3268be=this['_index']!==undefined?(this['itemRectWithPadding'](0x0)[_0x3fa6e8(0x28b)]-this[_0x3fa6e8(0x29e)]())/0x2:0x0,_0x54e0f7=_0x328437['width']*_0xefb2b3,_0x36dc82=_0x328437['height']*_0xefb2b3,_0x582594=Math[_0x3fa6e8(0x267)]((_0x2678e7-_0x54e0f7)/0x2)+_0x119073[_0x3fa6e8(0x321)],_0x453c32=Math[_0x3fa6e8(0x267)]((_0x3b0a71-_0x36dc82)/0x2)+_0x119073[_0x3fa6e8(0x19b)]-_0x3268be*0x2;this[_0x3fa6e8(0x2fa)]['paintOpacity']=_0xf7d59,this[_0x3fa6e8(0x2fa)][_0x3fa6e8(0x261)](_0x328437,0x0,0x0,_0x328437[_0x3fa6e8(0x2ba)],_0x328437[_0x3fa6e8(0x28b)],_0x582594,_0x453c32,_0x54e0f7,_0x36dc82),this[_0x3fa6e8(0x2fa)][_0x3fa6e8(0x361)]=0xff;},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x3b0)]=function(_0x5da365){const _0x48e736=_0x5573a7,_0x57c8f2=this[_0x48e736(0x130)](_0x5da365);if(_0x5da365['drawing'])this[_0x48e736(0x174)](_0x57c8f2>0x0);},Window_Base[_0x5573a7(0x39c)][_0x5573a7(0x1b5)]=function(_0x4a6778){const _0x3aebbd=_0x5573a7,_0x5816c5=this[_0x3aebbd(0x130)](_0x4a6778);this[_0x3aebbd(0x344)]===Window_Message&&_0x4a6778[_0x3aebbd(0x1a0)]&&this[_0x3aebbd(0x33f)](_0x5816c5);},Window_Help[_0x5573a7(0x39c)]['resetWordWrap']=function(){const _0x47ea46=_0x5573a7;this[_0x47ea46(0x1bf)]($gameSystem[_0x47ea46(0x300)]());},Window_Help[_0x5573a7(0x39c)][_0x5573a7(0x1e4)]=function(){return!![];},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x31a)]=Window_Help[_0x5573a7(0x39c)][_0x5573a7(0x247)],Window_Help[_0x5573a7(0x39c)][_0x5573a7(0x247)]=function(){const _0x1f02e1=_0x5573a7;this[_0x1f02e1(0x1c2)](),VisuMZ['MessageCore'][_0x1f02e1(0x31a)][_0x1f02e1(0x38d)](this),this[_0x1f02e1(0x1f0)]();},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x164)]=Window_Options['prototype'][_0x5573a7(0x133)],Window_Options[_0x5573a7(0x39c)][_0x5573a7(0x133)]=function(){const _0xad08ae=_0x5573a7;VisuMZ['MessageCore'][_0xad08ae(0x164)][_0xad08ae(0x38d)](this),this['addMessageCoreCommands']();},Window_Options[_0x5573a7(0x39c)][_0x5573a7(0x340)]=function(){const _0xf06453=_0x5573a7;VisuMZ[_0xf06453(0x232)][_0xf06453(0x1d9)]['TextSpeed']['AddOption']&&this[_0xf06453(0x144)]();},Window_Options[_0x5573a7(0x39c)][_0x5573a7(0x144)]=function(){const _0x3a7c3f=_0x5573a7,_0x5c5cc1=TextManager['messageCoreTextSpeed'],_0x24aa3a=_0x3a7c3f(0x137);this['addCommand'](_0x5c5cc1,_0x24aa3a);},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x2ef)]=Window_Options['prototype'][_0x5573a7(0x21f)],Window_Options['prototype'][_0x5573a7(0x21f)]=function(_0x88d65c){const _0x5b584c=_0x5573a7,_0x5c71fd=this['commandSymbol'](_0x88d65c);if(_0x5c71fd===_0x5b584c(0x137))return this[_0x5b584c(0x243)]();return VisuMZ[_0x5b584c(0x232)][_0x5b584c(0x2ef)]['call'](this,_0x88d65c);},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x37f)]=Window_Options[_0x5573a7(0x39c)]['isVolumeSymbol'],Window_Options[_0x5573a7(0x39c)][_0x5573a7(0x2b5)]=function(_0x2ed936){const _0x22d801=_0x5573a7;if(_0x2ed936===_0x22d801(0x137))return!![];return VisuMZ[_0x22d801(0x232)][_0x22d801(0x37f)][_0x22d801(0x38d)](this,_0x2ed936);},Window_Options[_0x5573a7(0x39c)][_0x5573a7(0x243)]=function(){const _0x1946a5=_0x5573a7,_0x5619ab=this[_0x1946a5(0x250)](_0x1946a5(0x137));if(_0x5619ab>0xa){if('uLfBG'===_0x1946a5(0x240))this['contents'][_0x1946a5(0x202)]=_0x1ba4ca(_0x3e3457[0x3])[_0x1946a5(0x355)](_0x36134c[_0x1946a5(0x232)]['Settings']['General'][_0x1946a5(0x222)],_0x4c389c[_0x1946a5(0x232)]['Settings']['General'][_0x1946a5(0x2d2)]);else return TextManager['instantTextSpeed'];}else return _0x5619ab;},VisuMZ['MessageCore'][_0x5573a7(0x24a)]=Window_Options['prototype']['changeVolume'],Window_Options[_0x5573a7(0x39c)][_0x5573a7(0x224)]=function(_0x2eb2a5,_0xad4e13,_0x5b8f72){const _0x60d1c9=_0x5573a7;if(_0x2eb2a5===_0x60d1c9(0x137))return this[_0x60d1c9(0x1b1)](_0x2eb2a5,_0xad4e13,_0x5b8f72);VisuMZ['MessageCore'][_0x60d1c9(0x24a)]['call'](this,_0x2eb2a5,_0xad4e13,_0x5b8f72);},Window_Options[_0x5573a7(0x39c)][_0x5573a7(0x1b1)]=function(_0x18b719,_0x15e939,_0x1bcb47){const _0x3cbf5f=_0x5573a7,_0x2d15ca=this[_0x3cbf5f(0x250)](_0x18b719),_0x5d82e7=0x1,_0x489255=_0x2d15ca+(_0x15e939?_0x5d82e7:-_0x5d82e7);if(_0x489255>0xb&&_0x1bcb47){if(_0x3cbf5f(0x1c9)===_0x3cbf5f(0x12f)){if(this[_0x3cbf5f(0x13a)]===_0x184ae2)this['initMessageCore']();if(this[_0x3cbf5f(0x13a)]['messageWordWrap']===_0x2e1797)this[_0x3cbf5f(0x2b6)]();return this[_0x3cbf5f(0x13a)]['messageWordWrap'];}else this[_0x3cbf5f(0x2e1)](_0x18b719,0x1);}else{if(_0x3cbf5f(0x301)==='BiMEf')this[_0x3cbf5f(0x2e1)](_0x18b719,_0x489255[_0x3cbf5f(0x355)](0x1,0xb));else return this[_0x3cbf5f(0x337)]['x'];}},Window_Message[_0x5573a7(0x39c)]['refreshDimmerBitmap']=function(){const _0x51186a=_0x5573a7;Window_Base[_0x51186a(0x39c)]['refreshDimmerBitmap'][_0x51186a(0x38d)](this);if(VisuMZ[_0x51186a(0x232)][_0x51186a(0x1d9)][_0x51186a(0x239)]['StretchDimmedBg']){if(_0x51186a(0x26d)===_0x51186a(0x1ee)){for(const _0x3d9069 of _0xb70b87[_0x51186a(0x232)][_0x51186a(0x1d9)][_0x51186a(0x18f)]){_0x2309a3[_0x51186a(0x2bd)](_0x3d9069['textCodeCheck'])&&(_0x2bf8b4=_0x4814dd[_0x51186a(0x21e)](_0x3d9069[_0x51186a(0x132)],_0x3d9069[_0x51186a(0x15f)]['bind'](this)));}return _0x332d36;}else this[_0x51186a(0x322)]();}},Window_Message[_0x5573a7(0x39c)]['stretchDimmerSprite']=function(){const _0x42c9da=_0x5573a7;this[_0x42c9da(0x15a)]['x']=Math[_0x42c9da(0x151)](this[_0x42c9da(0x2ba)]/0x2),this[_0x42c9da(0x15a)][_0x42c9da(0x325)]['x']=0.5,this['_dimmerSprite']['scale']['x']=Graphics[_0x42c9da(0x2ba)];},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x1fb)]=Window_Message[_0x5573a7(0x39c)]['clearFlags'],Window_Message[_0x5573a7(0x39c)][_0x5573a7(0x2a3)]=function(){const _0xfc4469=_0x5573a7;VisuMZ['MessageCore'][_0xfc4469(0x1fb)]['call'](this),this[_0xfc4469(0x1c2)](),this[_0xfc4469(0x1f0)](),this[_0xfc4469(0x174)](![]),this['setTextAlignment'](_0xfc4469(0x19c)),this[_0xfc4469(0x1de)](VisuMZ[_0xfc4469(0x232)][_0xfc4469(0x1d9)]['General']['MessageTextDelay']);},Window_Message[_0x5573a7(0x39c)][_0x5573a7(0x1f0)]=function(){const _0x3bd1bf=_0x5573a7;this[_0x3bd1bf(0x1bf)]($gameSystem[_0x3bd1bf(0x221)]());},Window_Message[_0x5573a7(0x39c)][_0x5573a7(0x1e4)]=function(){return!![];},Window_Message[_0x5573a7(0x39c)][_0x5573a7(0x1de)]=function(_0x3345b5){const _0x4d2d66=_0x5573a7,_0x8c5078=0xb-ConfigManager[_0x4d2d66(0x137)];_0x3345b5=Math[_0x4d2d66(0x151)](_0x3345b5*_0x8c5078),this[_0x4d2d66(0x2dd)]=_0x3345b5,this[_0x4d2d66(0x212)]=_0x3345b5;},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x24c)]=Window_Message[_0x5573a7(0x39c)]['isTriggered'],Window_Message[_0x5573a7(0x39c)]['isTriggered']=function(){const _0x5e9cbb=_0x5573a7;return VisuMZ[_0x5e9cbb(0x232)][_0x5e9cbb(0x24c)][_0x5e9cbb(0x38d)](this)||Input[_0x5e9cbb(0x2fd)](VisuMZ['MessageCore']['Settings'][_0x5e9cbb(0x239)][_0x5e9cbb(0x276)]);},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x3a2)]=Window_Message[_0x5573a7(0x39c)][_0x5573a7(0x125)],Window_Message[_0x5573a7(0x39c)][_0x5573a7(0x125)]=function(){const _0x3e0562=_0x5573a7;let _0xe6c05b=this['y'];VisuMZ[_0x3e0562(0x232)]['Window_Message_updatePlacement'][_0x3e0562(0x38d)](this);if(this[_0x3e0562(0x288)])this['y']=_0xe6c05b;this[_0x3e0562(0x39a)](),this['clampPlacementPosition']();},VisuMZ['MessageCore'][_0x5573a7(0x227)]=Window_Message[_0x5573a7(0x39c)][_0x5573a7(0x11b)],Window_Message[_0x5573a7(0x39c)]['newPage']=function(_0x568afc){const _0x5995a1=_0x5573a7;this[_0x5995a1(0x1d7)](_0x568afc),this[_0x5995a1(0x368)](_0x568afc),VisuMZ[_0x5995a1(0x232)][_0x5995a1(0x227)]['call'](this,_0x568afc),this[_0x5995a1(0x14d)]();},Window_Message[_0x5573a7(0x39c)][_0x5573a7(0x1d7)]=function(_0x4cc99b){const _0x53381f=_0x5573a7;if(!_0x4cc99b)return;_0x4cc99b[_0x53381f(0x289)]=Window_Base[_0x53381f(0x39c)]['convertTextMacros'][_0x53381f(0x38d)](this,_0x4cc99b[_0x53381f(0x289)]);},Window_Message['prototype']['convertTextMacros']=function(_0x1bac1c){return _0x1bac1c;},Window_Message[_0x5573a7(0x39c)][_0x5573a7(0x368)]=function(_0x5872e7){this['prepareForcedPositionEscapeCharacters'](_0x5872e7),this['prepareAutoSizeEscapeCharacters'](_0x5872e7),this['updateDimensions']();},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x190)]=Window_Message[_0x5573a7(0x39c)][_0x5573a7(0x3a6)],Window_Message[_0x5573a7(0x39c)][_0x5573a7(0x3a6)]=function(){const _0x20b0bd=_0x5573a7;VisuMZ[_0x20b0bd(0x232)][_0x20b0bd(0x190)][_0x20b0bd(0x38d)](this),this[_0x20b0bd(0x2a3)]();if(this['_messagePositionReset'])this[_0x20b0bd(0x215)]();},Window_Message[_0x5573a7(0x39c)]['updateDimensions']=function(){const _0x37a1d9=_0x5573a7;this[_0x37a1d9(0x2ba)]=$gameSystem['getMessageWindowWidth']()+this[_0x37a1d9(0x238)]();;this[_0x37a1d9(0x2ba)]=Math[_0x37a1d9(0x34d)](Graphics[_0x37a1d9(0x2ba)],this[_0x37a1d9(0x2ba)]);const _0x31dea2=$gameSystem[_0x37a1d9(0x257)]();this[_0x37a1d9(0x28b)]=SceneManager['_scene'][_0x37a1d9(0x19a)](_0x31dea2,![])+this[_0x37a1d9(0x308)](),this['height']=Math[_0x37a1d9(0x34d)](Graphics[_0x37a1d9(0x28b)],this[_0x37a1d9(0x28b)]);if($gameTemp[_0x37a1d9(0x2ed)])this[_0x37a1d9(0x24d)]();},Window_Message['prototype']['addedWidth']=function(){return 0x0;},Window_Message['prototype'][_0x5573a7(0x308)]=function(){return 0x0;},Window_Message[_0x5573a7(0x39c)][_0x5573a7(0x24d)]=function(){const _0x2c358d=_0x5573a7;this['x']=(Graphics['boxWidth']-this['width'])/0x2,$gameTemp[_0x2c358d(0x2ed)]=undefined,this['clampPlacementPosition']();},Window_Message['prototype']['updateMove']=function(){const _0x4fd5ca=_0x5573a7,_0x5ea02e={'x':this['x'],'y':this['y']};Window_Base[_0x4fd5ca(0x39c)][_0x4fd5ca(0x26a)]['call'](this),this[_0x4fd5ca(0x280)](_0x5ea02e);},Window_Message[_0x5573a7(0x39c)][_0x5573a7(0x235)]=function(){return!![];},Window_Message[_0x5573a7(0x39c)]['updateNameBoxMove']=function(_0x2383aa){const _0x4684b8=_0x5573a7;this[_0x4684b8(0x14a)]&&(this[_0x4684b8(0x14a)]['x']+=this['x']-_0x2383aa['x'],this[_0x4684b8(0x14a)]['y']+=this['y']-_0x2383aa['y']);},Window_Message['prototype']['resetRect']=function(_0x1bb2ed,_0x2ff306){const _0x2bd322=_0x5573a7;this[_0x2bd322(0x217)](this[_0x2bd322(0x326)]['x'],this['_positionType']*(Graphics[_0x2bd322(0x379)]-this['height'])/0x2,this[_0x2bd322(0x326)][_0x2bd322(0x2ba)],this[_0x2bd322(0x326)][_0x2bd322(0x28b)],_0x1bb2ed,_0x2ff306);},Window_Message['prototype']['processCommonEvent']=function(_0xa5b319){const _0x556751=_0x5573a7,_0x3ce0a5=Window_Base[_0x556751(0x39c)]['processCommonEvent'][_0x556751(0x38d)](this,_0xa5b319);_0xa5b319['drawing']&&this[_0x556751(0x16e)](_0x3ce0a5);},Window_Message[_0x5573a7(0x39c)][_0x5573a7(0x16e)]=function(_0x5869e9){const _0x5f161e=_0x5573a7;if($gameParty[_0x5f161e(0x37c)]()){}else $gameMap[_0x5f161e(0x2b8)](_0x5869e9);},Window_Message['prototype'][_0x5573a7(0x248)]=function(_0x4734b0){const _0x5c58a8=_0x5573a7;this[_0x5c58a8(0x2dd)]--,this[_0x5c58a8(0x2dd)]<=0x0&&(this['onProcessCharacter'](_0x4734b0),Window_Base[_0x5c58a8(0x39c)][_0x5c58a8(0x248)]['call'](this,_0x4734b0));},Window_Message[_0x5573a7(0x39c)][_0x5573a7(0x230)]=function(_0x1a6399){const _0x2e7b5d=_0x5573a7;this[_0x2e7b5d(0x2dd)]=this['_textDelay'];if(this[_0x2e7b5d(0x212)]<=0x0)this['_showFast']=!![];},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x30e)]=Window_Message[_0x5573a7(0x39c)][_0x5573a7(0x172)],Window_Message[_0x5573a7(0x39c)]['processEscapeCharacter']=function(_0x17d39e,_0x422823){const _0x494141=_0x5573a7;!_0x422823[_0x494141(0x1a0)]?_0x494141(0x14c)!=='OegUf'?Window_Base[_0x494141(0x39c)]['processEscapeCharacter']['call'](this,_0x17d39e,_0x422823):_0x3036ee[_0x3fa5c9]=this[_0x494141(0x14e)][_0x4586ff]:VisuMZ[_0x494141(0x232)][_0x494141(0x30e)][_0x494141(0x38d)](this,_0x17d39e,_0x422823);},Window_Message['prototype']['prepareForcedPositionEscapeCharacters']=function(_0x53ea6d){const _0x3f9e34=_0x5573a7;let _0x1456bb=_0x53ea6d[_0x3f9e34(0x289)];this[_0x3f9e34(0x26f)]={};if(this[_0x3f9e34(0x2f2)]())return _0x1456bb;_0x1456bb=_0x1456bb[_0x3f9e34(0x21e)](/<POSITION:[ ]*(.*)>/gi,(_0x2b8827,_0x1c2183)=>{const _0x368cfa=_0x3f9e34;if(_0x368cfa(0x1f1)===_0x368cfa(0x1f1)){const _0x6612cb=_0x1c2183[_0x368cfa(0x39e)](',')[_0x368cfa(0x395)](_0xe298e8=>Number(_0xe298e8)||0x0);if(_0x6612cb[0x0]!==undefined)this[_0x368cfa(0x26f)]['x']=Number(_0x6612cb[0x0]);if(_0x6612cb[0x1]!==undefined)this[_0x368cfa(0x26f)]['y']=Number(_0x6612cb[0x1]);if(_0x6612cb[0x2]!==undefined)this['_forcedPosition'][_0x368cfa(0x2ba)]=Number(_0x6612cb[0x2]);if(_0x6612cb[0x3]!==undefined)this[_0x368cfa(0x26f)][_0x368cfa(0x28b)]=Number(_0x6612cb[0x3]);return'';}else this[_0x368cfa(0x14e)][_0x368cfa(0x202)]+=_0x24ec02[_0x368cfa(0x232)][_0x368cfa(0x1d9)][_0x368cfa(0x239)][_0x368cfa(0x13d)],this[_0x368cfa(0x14e)]['fontSize']=_0x2de5a7[_0x368cfa(0x34d)](this[_0x368cfa(0x14e)][_0x368cfa(0x202)],_0x11ac82['MessageCore']['Settings'][_0x368cfa(0x239)][_0x368cfa(0x2d2)]);}),_0x1456bb=_0x1456bb[_0x3f9e34(0x21e)](/<COORDINATES:[ ]*(.*)>/gi,(_0x565aa4,_0x2a839d)=>{const _0x57eef6=_0x3f9e34;if(_0x57eef6(0x1cf)==='feMiv')return 0x0;else{const _0x3f7687=_0x2a839d['split'](',')[_0x57eef6(0x395)](_0x527c51=>Number(_0x527c51)||0x0);if(_0x3f7687[0x0]!==undefined)this['_forcedPosition']['x']=Number(_0x3f7687[0x0]);if(_0x3f7687[0x1]!==undefined)this[_0x57eef6(0x26f)]['y']=Number(_0x3f7687[0x1]);return'';}}),_0x1456bb=_0x1456bb['replace'](/<DIMENSIONS:[ ]*(.*)>/gi,(_0x58dbb0,_0x378497)=>{const _0xc83ff2=_0x3f9e34,_0x1bdf07=_0x378497[_0xc83ff2(0x39e)](',')[_0xc83ff2(0x395)](_0x1dedf0=>Number(_0x1dedf0)||0x0);if(_0x1bdf07[0x0]!==undefined)this[_0xc83ff2(0x26f)][_0xc83ff2(0x2ba)]=Number(_0x1bdf07[0x2]);if(_0x1bdf07[0x1]!==undefined)this[_0xc83ff2(0x26f)][_0xc83ff2(0x28b)]=Number(_0x1bdf07[0x3]);return'';}),_0x53ea6d[_0x3f9e34(0x289)]=_0x1456bb;},Window_Message[_0x5573a7(0x39c)][_0x5573a7(0x39a)]=function(){const _0x31feac=_0x5573a7;this['_forcedPosition']=this[_0x31feac(0x26f)]||{};const _0x5569d9=['x','y',_0x31feac(0x2ba),_0x31feac(0x28b)];for(const _0x3d1650 of _0x5569d9){this[_0x31feac(0x26f)][_0x3d1650]!==undefined&&(this[_0x3d1650]=Number(this[_0x31feac(0x26f)][_0x3d1650]));}},Window_Message[_0x5573a7(0x39c)][_0x5573a7(0x36b)]=function(_0x25dbb9){const _0x49e8ee=_0x5573a7;let _0x57f058=_0x25dbb9['text'];_0x57f058=_0x57f058[_0x49e8ee(0x21e)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0xac78d5=_0x49e8ee;return this['processAutoSize'](_0x57f058,!![],!![]),this[_0xac78d5(0x35c)](_0xac78d5(0x274)),'';}),_0x57f058=_0x57f058[_0x49e8ee(0x21e)](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x5b8dea=_0x49e8ee;return this[_0x5b8dea(0x2cc)](_0x57f058,!![],![]),this[_0x5b8dea(0x35c)]('none'),'';}),_0x57f058=_0x57f058['replace'](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x5b47ce=_0x49e8ee;return this[_0x5b47ce(0x2cc)](_0x57f058,![],!![]),this[_0x5b47ce(0x35c)](_0x5b47ce(0x274)),'';});if(SceneManager[_0x49e8ee(0x1e5)]())'ARKBE'!==_0x49e8ee(0x1db)?(_0x57f058=_0x57f058[_0x49e8ee(0x21e)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x73607e,_0x54f2ee)=>{const _0x3aee7c=_0x49e8ee;return this[_0x3aee7c(0x2cc)](_0x57f058,!![],!![]),this['processAutoPosition']('battle\x20actor',Number(_0x54f2ee)||0x1),'';}),_0x57f058=_0x57f058[_0x49e8ee(0x21e)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x2adf89,_0xb5459e)=>{const _0x3209be=_0x49e8ee;return this[_0x3209be(0x2cc)](_0x57f058,!![],!![]),this['processAutoPosition'](_0x3209be(0x3a4),Number(_0xb5459e)||0x0),'';}),_0x57f058=_0x57f058[_0x49e8ee(0x21e)](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x691d95,_0x1d01b4)=>{const _0x2025f2=_0x49e8ee;return _0x2025f2(0x397)===_0x2025f2(0x30a)?![]:(this[_0x2025f2(0x2cc)](_0x57f058,!![],!![]),this[_0x2025f2(0x35c)]('battle\x20enemy',Number(_0x1d01b4)||0x0),'');})):(this[_0x49e8ee(0x1f6)](_0x2071e9),this[_0x49e8ee(0x36b)](_0x19f197),this[_0x49e8ee(0x36f)]());else{if(SceneManager['isSceneMap']()){if(_0x49e8ee(0x2f9)===_0x49e8ee(0x2f9))_0x57f058=_0x57f058[_0x49e8ee(0x21e)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x3cdb98,_0x5d7118)=>{const _0x1e85c1=_0x49e8ee;if('EzOue'!=='EzOue'){_0x5e320d=_0x38ffb9['replace'](_0x235028['_autoSizeRegexp'],''),_0x587a8a=_0x2e876[_0x1e85c1(0x21e)](_0x116a78[_0x1e85c1(0x2aa)],''),this[_0x1e85c1(0x2c0)]=!![];const _0x50105d=this['textSizeEx'](_0x23b72a);if(_0x39fa2b){let _0x30e53f=_0x50105d[_0x1e85c1(0x2ba)]+_0x43035d[_0x1e85c1(0x327)]()*0x2+0x6;const _0x5ca935=_0x647404['faceName']()!=='',_0xdcf035=_0x27b5d1[_0x1e85c1(0x27c)],_0x2f7867=0x14;_0x30e53f+=_0x5ca935?_0xdcf035+_0x2f7867:0x4;if(_0x30e53f%0x2!==0x0)_0x30e53f+=0x1;_0x432345[_0x1e85c1(0x315)](_0x30e53f);}if(_0x2e61db){let _0x5b7c7b=_0xa4cebf[_0x1e85c1(0x23e)](_0x50105d[_0x1e85c1(0x28b)]/this['lineHeight']());_0x289a43[_0x1e85c1(0x1ad)](_0x5b7c7b);}this['updateAutoSizePosition'](),this[_0x1e85c1(0x2c0)]=![],this[_0x1e85c1(0x2ad)]=!![];}else return this['processAutoSize'](_0x57f058,!![],!![]),this[_0x1e85c1(0x35c)](_0x1e85c1(0x237),0x0),'';}),_0x57f058=_0x57f058[_0x49e8ee(0x21e)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x5e230c,_0x2f0753)=>{const _0x69cd50=_0x49e8ee;return _0x69cd50(0x2ea)===_0x69cd50(0x1d5)?_0x1fa4d0:(this['processAutoSize'](_0x57f058,!![],!![]),this[_0x69cd50(0x35c)](_0x69cd50(0x2d6),Number(_0x2f0753)||0x1),'');}),_0x57f058=_0x57f058['replace'](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x3280fd,_0x22210c)=>{const _0x4c0f0d=_0x49e8ee;return this[_0x4c0f0d(0x2cc)](_0x57f058,!![],!![]),this[_0x4c0f0d(0x35c)](_0x4c0f0d(0x385),Number(_0x22210c)||0x0),'';}),_0x57f058=_0x57f058[_0x49e8ee(0x21e)](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x2f6862,_0x36f85)=>{const _0x2fdd05=_0x49e8ee;return this['processAutoSize'](_0x57f058,!![],!![]),this[_0x2fdd05(0x35c)](_0x2fdd05(0x2f0),Number(_0x36f85)||0x0),'';});else return this['obtainEscapeParam'](_0x4d91ac);}}_0x25dbb9[_0x49e8ee(0x289)]=_0x57f058;},Window_Message['_autoSizeRegexp']=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x5573a7(0x2aa)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0x5573a7(0x39c)][_0x5573a7(0x2cc)]=function(_0x5c77c1,_0x1d5fe3,_0x27486a){const _0x3ef079=_0x5573a7;_0x5c77c1=_0x5c77c1['replace'](Window_Message['_autoSizeRegexp'],''),_0x5c77c1=_0x5c77c1[_0x3ef079(0x21e)](Window_Message[_0x3ef079(0x2aa)],''),this[_0x3ef079(0x2c0)]=!![];const _0x5f3d98=this[_0x3ef079(0x1b0)](_0x5c77c1);if(_0x1d5fe3){if(_0x3ef079(0x266)!==_0x3ef079(0x31b)){let _0x40b29b=_0x5f3d98[_0x3ef079(0x2ba)]+$gameSystem['windowPadding']()*0x2+0x6;const _0x43e202=$gameMessage[_0x3ef079(0x17c)]()!=='',_0x2bf747=ImageManager[_0x3ef079(0x27c)],_0x2765a4=0x14;_0x40b29b+=_0x43e202?_0x2bf747+_0x2765a4:0x4;if(_0x40b29b%0x2!==0x0)_0x40b29b+=0x1;$gameSystem['setMessageWindowWidth'](_0x40b29b);}else _0x576b75[_0x3ef079(0x232)][_0x3ef079(0x3aa)][_0x3ef079(0x38d)](this,_0x12ba74),this[_0x3ef079(0x176)](_0xcba91f);}if(_0x27486a){if(_0x3ef079(0x1ab)===_0x3ef079(0x1ab)){let _0x41f48e=Math['ceil'](_0x5f3d98[_0x3ef079(0x28b)]/this[_0x3ef079(0x29e)]());$gameSystem['setMessageWindowRows'](_0x41f48e);}else{if(this['_MessageCoreSettings']===_0x44fef7)this['initMessageCore']();if(this[_0x3ef079(0x13a)][_0x3ef079(0x148)]===_0x4e5887)this[_0x3ef079(0x2b6)]();_0x1ebe40=_0x4449f4[_0x3ef079(0x23e)](_0x58093f);if(_0x19320a%0x2!==0x0)_0x527ebc+=0x1;this[_0x3ef079(0x13a)][_0x3ef079(0x148)]=_0x55bcfd||0x2;}}this[_0x3ef079(0x24e)](),this['_autoSizeCheck']=![],this[_0x3ef079(0x2ad)]=!![];},Window_Message[_0x5573a7(0x39c)][_0x5573a7(0x24e)]=function(){const _0x4d9769=_0x5573a7;this['updateDimensions'](),this[_0x4d9769(0x125)](),this['resetPositionX'](),this[_0x4d9769(0x256)](),this['contents'][_0x4d9769(0x369)](),this[_0x4d9769(0x14d)]();},Window_Message[_0x5573a7(0x39c)][_0x5573a7(0x35c)]=function(_0x37f179,_0x556e13){const _0x5295ba=_0x5573a7;switch(_0x37f179[_0x5295ba(0x39f)]()[_0x5295ba(0x20d)]()){case _0x5295ba(0x1b6):this[_0x5295ba(0x288)]=$gameActors['actor'](_0x556e13);break;case'battle\x20party':this['_autoPositionTarget']=$gameParty[_0x5295ba(0x20f)]()[_0x556e13-0x1];break;case _0x5295ba(0x177):this[_0x5295ba(0x288)]=$gameTroop[_0x5295ba(0x20f)]()[_0x556e13-0x1];break;case _0x5295ba(0x237):this[_0x5295ba(0x288)]=$gamePlayer;break;case _0x5295ba(0x2d6):const _0x2d0bc1=$gameActors['actor'](_0x556e13)['index']();_0x2d0bc1===0x0?this[_0x5295ba(0x288)]=$gamePlayer:this[_0x5295ba(0x288)]=$gamePlayer[_0x5295ba(0x1b8)]()[_0x5295ba(0x2b0)](_0x2d0bc1-0x1);break;case'map\x20party':_0x556e13===0x1?this[_0x5295ba(0x288)]=$gamePlayer:'mfrFz'!==_0x5295ba(0x38c)?this[_0x5295ba(0x288)]=$gamePlayer[_0x5295ba(0x1b8)]()[_0x5295ba(0x2b0)](_0x556e13-0x2):(this['clearActorNameAutoColor'](),_0x2d0e06[_0x5295ba(0x232)][_0x5295ba(0x31a)]['call'](this),this[_0x5295ba(0x1f0)]());break;case _0x5295ba(0x2f0):this[_0x5295ba(0x288)]=$gameMap[_0x5295ba(0x187)](_0x556e13);break;}this[_0x5295ba(0x288)]&&(_0x5295ba(0x207)!==_0x5295ba(0x207)?_0x20a192[_0x5295ba(0x232)]['Window_Base_processEscapeCharacter']['call'](this,_0x4acd1b,_0x9fc330):this['updateAutoPosition']());},VisuMZ['MessageCore'][_0x5573a7(0x1b7)]=Window_Message[_0x5573a7(0x39c)][_0x5573a7(0x15c)],Window_Message[_0x5573a7(0x39c)][_0x5573a7(0x15c)]=function(){const _0x35001d=_0x5573a7;this[_0x35001d(0x349)](),VisuMZ[_0x35001d(0x232)][_0x35001d(0x1b7)]['call'](this);},Window_Message[_0x5573a7(0x39c)]['updateAutoPosition']=function(){const _0x3444cd=_0x5573a7;if(!this[_0x3444cd(0x288)])return;const _0x138405=SceneManager[_0x3444cd(0x269)];if(!_0x138405)return;if(!_0x138405['_spriteset'])return;const _0x2b228e=_0x138405['_spriteset'][_0x3444cd(0x259)](this['_autoPositionTarget']);if(!_0x2b228e)return;let _0xb35954=_0x2b228e['x'];_0xb35954-=this['width']/0x2,_0xb35954-=(Graphics[_0x3444cd(0x2ba)]-Graphics['boxWidth'])/0x2;let _0x25d394=_0x2b228e['y'];_0x25d394-=this[_0x3444cd(0x28b)],_0x25d394-=(Graphics[_0x3444cd(0x28b)]-Graphics[_0x3444cd(0x379)])/0x2,_0x25d394-=_0x2b228e[_0x3444cd(0x28b)]+0x8,this['x']=Math[_0x3444cd(0x151)](_0xb35954),this['y']=Math[_0x3444cd(0x151)](_0x25d394),this[_0x3444cd(0x295)](!![],![]),this[_0x3444cd(0x14a)][_0x3444cd(0x125)]();},Window_Message[_0x5573a7(0x39c)]['messagePositionReset']=function(){const _0x2d5aed=_0x5573a7;this[_0x2d5aed(0x2ad)]=![],this[_0x2d5aed(0x288)]=undefined,$gameSystem['initMessageCore'](),this[_0x2d5aed(0x24e)](),this[_0x2d5aed(0x38f)]=0x0;},Window_Message[_0x5573a7(0x39c)][_0x5573a7(0x285)]=function(_0x3316d4){const _0x517b83=_0x5573a7;return Window_Base[_0x517b83(0x39c)][_0x517b83(0x285)][_0x517b83(0x38d)](this,_0x3316d4);},Window_Message[_0x5573a7(0x39c)][_0x5573a7(0x189)]=function(_0x350939){const _0xe6265e=_0x5573a7;return Window_Base['prototype']['postConvertEscapeCharacters'][_0xe6265e(0x38d)](this,_0x350939);},Window_Message[_0x5573a7(0x39c)]['flushTextState']=function(_0x7fd270){const _0x349dc9=_0x5573a7;this[_0x349dc9(0x2a9)](_0x7fd270),Window_Base[_0x349dc9(0x39c)][_0x349dc9(0x1e3)]['call'](this,_0x7fd270),this['postFlushTextState'](_0x7fd270);},Window_Message[_0x5573a7(0x39c)][_0x5573a7(0x2a9)]=function(_0x2bbe8a){},Window_Message[_0x5573a7(0x39c)][_0x5573a7(0x226)]=function(_0x2f669b){},Window_NameBox[_0x5573a7(0x39c)][_0x5573a7(0x1e4)]=function(){return![];},Window_NameBox[_0x5573a7(0x39c)]['resetTextColor']=function(){const _0x19b180=_0x5573a7;Window_Base[_0x19b180(0x39c)]['resetTextColor'][_0x19b180(0x38d)](this),this['changeTextColor'](this[_0x19b180(0x351)]());},Window_NameBox['prototype']['defaultColor']=function(){const _0x365994=_0x5573a7,_0x121f6c=VisuMZ['MessageCore']['Settings'][_0x365994(0x239)]['NameBoxWindowDefaultColor'];return ColorManager['textColor'](_0x121f6c);},VisuMZ['MessageCore'][_0x5573a7(0x2e6)]=Window_NameBox[_0x5573a7(0x39c)][_0x5573a7(0x125)],Window_NameBox[_0x5573a7(0x39c)][_0x5573a7(0x125)]=function(){const _0xfa5ddf=_0x5573a7;VisuMZ[_0xfa5ddf(0x232)]['Window_NameBox_updatePlacement'][_0xfa5ddf(0x38d)](this),this['updateRelativePosition'](),this[_0xfa5ddf(0x36d)](),this['clampPlacementPosition'](),this[_0xfa5ddf(0x268)]();},Window_NameBox[_0x5573a7(0x39c)][_0x5573a7(0x285)]=function(_0x193b4f){const _0x160777=_0x5573a7;return _0x193b4f=_0x193b4f['replace'](/<LEFT>/gi,this[_0x160777(0x27f)][_0x160777(0x347)](this,0x0)),_0x193b4f=_0x193b4f[_0x160777(0x21e)](/<CENTER>/gi,this[_0x160777(0x27f)][_0x160777(0x347)](this,0x5)),_0x193b4f=_0x193b4f[_0x160777(0x21e)](/<RIGHT>/gi,this['setRelativePosition'][_0x160777(0x347)](this,0xa)),_0x193b4f=_0x193b4f[_0x160777(0x21e)](/<POSITION:[ ](\d+)>/gi,(_0x67c255,_0x570f30)=>this[_0x160777(0x27f)](parseInt(_0x570f30))),_0x193b4f=_0x193b4f['replace'](/<\/LEFT>/gi,''),_0x193b4f=_0x193b4f['replace'](/<\/CENTER>/gi,''),_0x193b4f=_0x193b4f[_0x160777(0x21e)](/<\/RIGHT>/gi,''),Window_Base[_0x160777(0x39c)][_0x160777(0x285)][_0x160777(0x38d)](this,_0x193b4f);},Window_NameBox[_0x5573a7(0x39c)][_0x5573a7(0x27f)]=function(_0x1da3de){const _0x3dad48=_0x5573a7;return this[_0x3dad48(0x2f3)]=_0x1da3de,'';},Window_NameBox[_0x5573a7(0x39c)][_0x5573a7(0x147)]=function(){const _0x2e98e3=_0x5573a7;if($gameMessage['isRTL']())return;this[_0x2e98e3(0x2f3)]=this[_0x2e98e3(0x2f3)]||0x0;const _0x108f80=this[_0x2e98e3(0x337)],_0x60cb68=Math[_0x2e98e3(0x267)](_0x108f80['width']*this[_0x2e98e3(0x2f3)]/0xa);this['x']=_0x108f80['x']+_0x60cb68-Math[_0x2e98e3(0x267)](this[_0x2e98e3(0x2ba)]/0x2),this['x']=this['x'][_0x2e98e3(0x355)](_0x108f80['x'],_0x108f80['x']+_0x108f80[_0x2e98e3(0x2ba)]-this[_0x2e98e3(0x2ba)]);},Window_NameBox['prototype'][_0x5573a7(0x36d)]=function(){const _0x245dff=_0x5573a7;if($gameMessage[_0x245dff(0x197)]())return;this[_0x245dff(0x2f3)]=this[_0x245dff(0x2f3)]||0x0;const _0x2b14d0=VisuMZ[_0x245dff(0x232)]['Settings'][_0x245dff(0x239)][_0x245dff(0x372)],_0x54147d=VisuMZ[_0x245dff(0x232)][_0x245dff(0x1d9)]['General'][_0x245dff(0x140)],_0x17cd57=(0x5-this[_0x245dff(0x2f3)])/0x5;this['x']+=Math[_0x245dff(0x267)](_0x2b14d0*_0x17cd57),this['y']+=_0x54147d;},Window_NameBox['prototype']['updateOverlappingY']=function(){const _0x2ed519=_0x5573a7,_0x401117=this['_messageWindow'],_0x2bd93f=_0x401117['y'],_0x200b3c=VisuMZ['MessageCore'][_0x2ed519(0x1d9)][_0x2ed519(0x239)][_0x2ed519(0x140)];_0x2bd93f>this['y']&&_0x2bd93f<this['y']+this[_0x2ed519(0x28b)]-_0x200b3c&&(_0x2ed519(0x152)===_0x2ed519(0x19f)?(this[_0x2ed519(0x2df)]=new _0x414cfc(),this[_0x2ed519(0x2df)][_0x2ed519(0x1ac)](this[_0x2ed519(0x233)](),this[_0x2ed519(0x313)])):this['y']=_0x401117['y']+_0x401117[_0x2ed519(0x28b)]);},VisuMZ['MessageCore'][_0x5573a7(0x193)]=Window_NameBox[_0x5573a7(0x39c)][_0x5573a7(0x247)],Window_NameBox[_0x5573a7(0x39c)]['refresh']=function(){const _0x200ae5=_0x5573a7;this[_0x200ae5(0x2f3)]=0x0,VisuMZ['MessageCore']['Window_NameBox_refresh']['call'](this);},Window_ChoiceList['prototype']['isWordWrapEnabled']=function(){return![];},Window_ChoiceList[_0x5573a7(0x39c)]['isAutoColorAffected']=function(){return!![];},Window_ChoiceList[_0x5573a7(0x39c)][_0x5573a7(0x378)]=function(){const _0x1cfd1b=_0x5573a7;return $gameSystem[_0x1cfd1b(0x36a)]()+0x8;},Window_ChoiceList[_0x5573a7(0x39c)]['maxCols']=function(){const _0x157c6a=_0x5573a7;return $gameSystem[_0x157c6a(0x273)]();},Window_ChoiceList[_0x5573a7(0x39c)][_0x5573a7(0x23d)]=function(){const _0x4fc80e=_0x5573a7;this[_0x4fc80e(0x247)](),this[_0x4fc80e(0x12a)](),this[_0x4fc80e(0x17b)](),this[_0x4fc80e(0x32c)]();},Window_ChoiceList[_0x5573a7(0x39c)][_0x5573a7(0x247)]=function(){const _0x59092e=_0x5573a7;this[_0x59092e(0x33b)](),this[_0x59092e(0x156)](),this[_0x59092e(0x337)]&&(this[_0x59092e(0x125)](),this[_0x59092e(0x2a6)]()),this[_0x59092e(0x14d)](),this[_0x59092e(0x2e7)](),this[_0x59092e(0x126)](),Window_Selectable[_0x59092e(0x39c)][_0x59092e(0x247)][_0x59092e(0x38d)](this);},Window_ChoiceList['prototype'][_0x5573a7(0x156)]=function(){const _0x50e2fd=_0x5573a7,_0x1d5826=$gameMessage[_0x50e2fd(0x199)]();let _0x22b790=0x0;for(let _0x1fdc68 of _0x1d5826){_0x1fdc68=this[_0x50e2fd(0x234)](_0x1fdc68);if(this[_0x50e2fd(0x2eb)](_0x1fdc68)){const _0x10d29f=this[_0x50e2fd(0x210)](_0x1fdc68),_0x138bde=this[_0x50e2fd(0x12e)](_0x1fdc68);this[_0x50e2fd(0x2ca)](_0x10d29f,'choice',_0x138bde,_0x22b790);}_0x22b790++;}},Window_ChoiceList['prototype'][_0x5573a7(0x234)]=function(_0x4ee980){const _0x2c126a=_0x5573a7;return Window_Base[_0x2c126a(0x39c)][_0x2c126a(0x2de)][_0x2c126a(0x38d)](this,_0x4ee980);},Window_ChoiceList[_0x5573a7(0x39c)][_0x5573a7(0x2de)]=function(_0x16e92c){return _0x16e92c;},Window_ChoiceList[_0x5573a7(0x39c)][_0x5573a7(0x2eb)]=function(_0x571b8e){const _0x2b6cf4=_0x5573a7;if(_0x571b8e[_0x2b6cf4(0x2bd)](/<HIDE>/i))return![];if(_0x571b8e['match'](/<SHOW>/i))return!![];if(_0x571b8e[_0x2b6cf4(0x2bd)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2b6cf4(0x39d)!==_0x2b6cf4(0x39d))_0x2a2dbc-=_0x3abc48;else{const _0x590779=JSON[_0x2b6cf4(0x311)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x27e817 of _0x590779){if(!$gameSwitches[_0x2b6cf4(0x28a)](_0x27e817))return![];}return!![];}}if(_0x571b8e[_0x2b6cf4(0x2bd)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2d8d4d=JSON[_0x2b6cf4(0x311)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x28b5a2 of _0x2d8d4d){if(_0x2b6cf4(0x146)!==_0x2b6cf4(0x27e)){if(!$gameSwitches[_0x2b6cf4(0x28a)](_0x28b5a2))return![];}else return _0x3a9b83;}return!![];}if(_0x571b8e[_0x2b6cf4(0x2bd)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xed8a5=JSON[_0x2b6cf4(0x311)]('['+RegExp['$1'][_0x2b6cf4(0x2bd)](/\d+/g)+']');for(const _0x137047 of _0xed8a5){if($gameSwitches[_0x2b6cf4(0x28a)](_0x137047))return!![];}return![];}if(_0x571b8e[_0x2b6cf4(0x2bd)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x56246c=JSON[_0x2b6cf4(0x311)]('['+RegExp['$1'][_0x2b6cf4(0x2bd)](/\d+/g)+']');for(const _0x469496 of _0x56246c){if(!$gameSwitches['value'](_0x469496))return!![];}return![];}if(_0x571b8e[_0x2b6cf4(0x2bd)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('lBBFu'!==_0x2b6cf4(0x2dc))_0x58504a['prototype'][_0x2b6cf4(0x172)][_0x2b6cf4(0x38d)](this,_0xcdb7b1,_0x2e0001);else{const _0x51eb3c=JSON[_0x2b6cf4(0x311)]('['+RegExp['$1'][_0x2b6cf4(0x2bd)](/\d+/g)+']');for(const _0x5a0164 of _0x51eb3c){if(!$gameSwitches['value'](_0x5a0164))return!![];}return![];}}if(_0x571b8e[_0x2b6cf4(0x2bd)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2b6cf4(0x159)!==_0x2b6cf4(0x1e8)){const _0x4d7437=JSON[_0x2b6cf4(0x311)]('['+RegExp['$1'][_0x2b6cf4(0x2bd)](/\d+/g)+']');for(const _0x301605 of _0x4d7437){if($gameSwitches['value'](_0x301605))return![];}return!![];}else this[_0x2b6cf4(0x36f)](),this[_0x2b6cf4(0x125)](),this[_0x2b6cf4(0x24d)](),this['updateTransform'](),this[_0x2b6cf4(0x14e)]['clear'](),this[_0x2b6cf4(0x14d)]();}return!![];},Window_ChoiceList[_0x5573a7(0x39c)][_0x5573a7(0x210)]=function(_0x4124b5){const _0x3ecc2b=_0x5573a7;let _0x32ebe1=_0x4124b5;return _0x32ebe1=_0x32ebe1[_0x3ecc2b(0x21e)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x32ebe1=_0x32ebe1[_0x3ecc2b(0x21e)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x32ebe1;},Window_ChoiceList['prototype'][_0x5573a7(0x12e)]=function(_0x2bb409){const _0x1bce40=_0x5573a7;if(_0x2bb409[_0x1bce40(0x2bd)](/<DISABLE>/i))return![];if(_0x2bb409[_0x1bce40(0x2bd)](/<ENABLE>/i))return!![];if(_0x2bb409['match'](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('oQsME'!=='EjKmF'){const _0xcf8a2e=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x168811 of _0xcf8a2e){if(!$gameSwitches[_0x1bce40(0x28a)](_0x168811))return![];}return!![];}else _0x270f3c['x']=-_0x3e9b92[_0x1bce40(0x2ba)]-_0x8fe2ef;}if(_0x2bb409[_0x1bce40(0x2bd)](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('ShxCx'===_0x1bce40(0x25e))return _0x53e38d[_0x1bce40(0x1a7)]&&_0xc23035[_0x1bce40(0x1f9)][_0x1bce40(0x1d3)]('['+_0x2c9ec1+']');else{const _0x58712c=JSON['parse']('['+RegExp['$1'][_0x1bce40(0x2bd)](/\d+/g)+']');for(const _0x33ed97 of _0x58712c){if(!$gameSwitches[_0x1bce40(0x28a)](_0x33ed97))return![];}return!![];}}if(_0x2bb409[_0x1bce40(0x2bd)](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('VVpok'==='VuPJD'){_0x2c2323[_0x1bce40(0x2f4)]=_0x1fc603[_0x1bce40(0x2f4)]['toUpperCase'](),_0x3912fc[_0x1bce40(0x132)]=new _0xdd8700('\x1b'+_0x2aa198[_0x1bce40(0x2f4)],'gi'),_0x2d2ac9[_0x1bce40(0x15f)]='\x1b'+_0x5be6d5[_0x1bce40(0x2f4)];if(_0x62b1b1['Type']==='')_0x32e9d1[_0x1bce40(0x15f)]+=_0x1bce40(0x36c);}else{const _0x2da1b7=JSON[_0x1bce40(0x311)]('['+RegExp['$1'][_0x1bce40(0x2bd)](/\d+/g)+']');for(const _0x5d1d85 of _0x2da1b7){if(_0x1bce40(0x35a)!==_0x1bce40(0x35a))return 0x0;else{if($gameSwitches[_0x1bce40(0x28a)](_0x5d1d85))return!![];}}return![];}}if(_0x2bb409['match'](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x26689a=JSON['parse']('['+RegExp['$1'][_0x1bce40(0x2bd)](/\d+/g)+']');for(const _0x40ddb5 of _0x26689a){if(!$gameSwitches[_0x1bce40(0x28a)](_0x40ddb5))return!![];}return![];}if(_0x2bb409[_0x1bce40(0x2bd)](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x290f18=JSON[_0x1bce40(0x311)]('['+RegExp['$1'][_0x1bce40(0x2bd)](/\d+/g)+']');for(const _0x339943 of _0x290f18){if(!$gameSwitches[_0x1bce40(0x28a)](_0x339943))return!![];}return![];}if(_0x2bb409['match'](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x200667=JSON[_0x1bce40(0x311)]('['+RegExp['$1'][_0x1bce40(0x2bd)](/\d+/g)+']');for(const _0x5024df of _0x200667){if($gameSwitches['value'](_0x5024df))return![];}return!![];}return!![];},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x23f)]=Window_ChoiceList[_0x5573a7(0x39c)][_0x5573a7(0x125)],Window_ChoiceList[_0x5573a7(0x39c)][_0x5573a7(0x125)]=function(){const _0x477d74=_0x5573a7;VisuMZ[_0x477d74(0x232)][_0x477d74(0x23f)]['call'](this),this[_0x477d74(0x295)]();},Window_ChoiceList[_0x5573a7(0x39c)][_0x5573a7(0x2a6)]=function(){const _0x2fd5cd=_0x5573a7;if(!this['_cancelButton'])return;const _0x541d17=0x8,_0x152221=this[_0x2fd5cd(0x206)],_0x87f4f8=this['x']+this[_0x2fd5cd(0x2ba)],_0x30ee28=Math[_0x2fd5cd(0x267)]((Graphics[_0x2fd5cd(0x2ba)]-Graphics[_0x2fd5cd(0x31d)])/0x2);if(_0x87f4f8>=Graphics[_0x2fd5cd(0x31d)]+_0x30ee28-_0x152221[_0x2fd5cd(0x2ba)]+_0x541d17){if(_0x2fd5cd(0x26c)===_0x2fd5cd(0x26c))_0x152221['x']=-_0x152221[_0x2fd5cd(0x2ba)]-_0x541d17;else{if(this[_0x2fd5cd(0x13a)]===_0x44ec1e)this['initMessageCore']();if(this[_0x2fd5cd(0x13a)][_0x2fd5cd(0x2cb)]===_0x3946f3)this[_0x2fd5cd(0x2b6)]();this['_MessageCoreSettings'][_0x2fd5cd(0x2cb)]=_0x2af56c||0x1;}}else _0x152221['x']=this['width']+_0x541d17;_0x152221['y']=this[_0x2fd5cd(0x28b)]/0x2-_0x152221[_0x2fd5cd(0x28b)]/0x2;},VisuMZ[_0x5573a7(0x232)][_0x5573a7(0x2c8)]=Window_ChoiceList[_0x5573a7(0x39c)]['windowX'],Window_ChoiceList[_0x5573a7(0x39c)][_0x5573a7(0x17d)]=function(){const _0x245126=_0x5573a7;return this[_0x245126(0x337)]?_0x245126(0x22d)===_0x245126(0x22d)?this[_0x245126(0x213)]():this[_0x245126(0x269)]&&this['_scene']['constructor']===_0x3f8646:VisuMZ[_0x245126(0x232)]['Window_ChoiceList_windowX'][_0x245126(0x38d)](this);},Window_ChoiceList['prototype'][_0x5573a7(0x213)]=function(){const _0x395362=_0x5573a7,_0x58f862=$gameMessage['choicePositionType']();if(_0x58f862===0x1)return(Graphics['boxWidth']-this[_0x395362(0x3b3)]())/0x2;else{if(_0x58f862===0x2){if(_0x395362(0x388)!==_0x395362(0x388)){if(!_0x1bb11b[_0x395362(0x28a)](_0x32a339))return![];}else return this[_0x395362(0x337)]['x']+this[_0x395362(0x337)][_0x395362(0x2ba)]-this['windowWidth']();}else{if(_0x395362(0x181)===_0x395362(0x181))return this[_0x395362(0x337)]['x'];else for(const _0x59448c of _0x3da12d['MessageCore'][_0x395362(0x1d9)][_0x395362(0x18f)]){_0x59448c[_0x395362(0x132)]=new _0x444a92('\x5c['+_0x59448c[_0x395362(0x2f4)]+'\x5c]','gi'),_0x59448c['TextStr']!==''&&_0x59448c['TextStr']!==_0x395362(0x2da)?_0x59448c[_0x395362(0x15f)]=new _0x8d381a(_0x395362(0x2d7)+_0x59448c[_0x395362(0x17e)][_0x395362(0x21e)](/\\/g,'\x1b')+'\x27'):_0x59448c['textCodeResult']=_0x59448c[_0x395362(0x260)];}}}},Window_ChoiceList[_0x5573a7(0x39c)]['windowWidth']=function(){const _0x1dbce0=_0x5573a7,_0x3b0079=(this[_0x1dbce0(0x195)]()+this[_0x1dbce0(0x33e)]())*this[_0x1dbce0(0x35d)]()+this['padding']*0x2;return Math[_0x1dbce0(0x34d)](_0x3b0079,Graphics['width']);},Window_ChoiceList['prototype'][_0x5573a7(0x34f)]=function(){const _0x485820=_0x5573a7,_0x47326f=$gameMessage[_0x485820(0x199)]()[_0x485820(0x395)](_0x25e4f6=>this[_0x485820(0x234)](_0x25e4f6))[_0x485820(0x271)](_0x5cff34=>this[_0x485820(0x2eb)](_0x5cff34)),_0x178f34=Math[_0x485820(0x23e)](_0x47326f[_0x485820(0x29b)]/this[_0x485820(0x35d)]());return Math[_0x485820(0x2f8)](0x1,Math[_0x485820(0x34d)](_0x178f34,this[_0x485820(0x339)]()));},Window_ChoiceList['prototype'][_0x5573a7(0x339)]=function(){const _0x3a5494=_0x5573a7,_0x4aa165=this['_messageWindow'],_0x3a8220=_0x4aa165?_0x4aa165['y']:0x0,_0x272a32=_0x4aa165?_0x4aa165[_0x3a5494(0x28b)]:0x0,_0x5f518b=Graphics[_0x3a5494(0x379)]/0x2;if(_0x3a8220<_0x5f518b&&_0x3a8220+_0x272a32>_0x5f518b)return 0x4;else{if('ghiPI'===_0x3a5494(0x14f))return $gameSystem[_0x3a5494(0x196)]();else{if(!this[_0x3a5494(0x288)])return;const _0x3fcc5a=_0xc0e5a9[_0x3a5494(0x269)];if(!_0x3fcc5a)return;if(!_0x3fcc5a[_0x3a5494(0x312)])return;const _0x144ac9=_0x3fcc5a[_0x3a5494(0x312)][_0x3a5494(0x259)](this['_autoPositionTarget']);if(!_0x144ac9)return;let _0x3b8fc0=_0x144ac9['x'];_0x3b8fc0-=this[_0x3a5494(0x2ba)]/0x2,_0x3b8fc0-=(_0x44a9f7[_0x3a5494(0x2ba)]-_0x1f862d[_0x3a5494(0x31d)])/0x2;let _0x4ec687=_0x144ac9['y'];_0x4ec687-=this['height'],_0x4ec687-=(_0x3030fa[_0x3a5494(0x28b)]-_0x3eda22['boxHeight'])/0x2,_0x4ec687-=_0x144ac9[_0x3a5494(0x28b)]+0x8,this['x']=_0x18144e[_0x3a5494(0x151)](_0x3b8fc0),this['y']=_0x33f4e1[_0x3a5494(0x151)](_0x4ec687),this['clampPlacementPosition'](!![],![]),this[_0x3a5494(0x14a)][_0x3a5494(0x125)]();}}},Window_ChoiceList[_0x5573a7(0x39c)][_0x5573a7(0x195)]=function(){const _0x37d891=_0x5573a7;let _0x277d9d=0x60;for(const _0x377077 of this['_list']){if(_0x37d891(0x24f)!==_0x37d891(0x2ee)){const _0x4d2a9d=_0x377077[_0x37d891(0x386)],_0x14bd12=this[_0x37d891(0x1b0)](_0x4d2a9d)[_0x37d891(0x2ba)],_0x55012e=Math[_0x37d891(0x23e)](_0x14bd12)+this[_0x37d891(0x2f5)]()*0x2;_0x277d9d<_0x55012e&&(_0x277d9d=_0x55012e);}else return _0x6c9f44['getChoiceListMaxColumns']();}return _0x277d9d;},Window_ChoiceList[_0x5573a7(0x39c)][_0x5573a7(0x353)]=function(_0x2d7c35){const _0xc371fb=_0x5573a7,_0x11a9e1=this[_0xc371fb(0x2a1)](_0x2d7c35),_0x23088e=$gameSystem['getChoiceListTextAlign']()!=='default'?_0xc371fb(0x281)[_0xc371fb(0x2e9)]($gameSystem[_0xc371fb(0x2c9)]()):'',_0x4b9965=_0x23088e+this[_0xc371fb(0x2fb)](_0x2d7c35);this[_0xc371fb(0x399)](this[_0xc371fb(0x1ef)](_0x2d7c35));const _0x2319e3=this[_0xc371fb(0x1b0)](_0x4b9965)[_0xc371fb(0x28b)],_0x2ee24a=Math['max'](_0x11a9e1['y'],_0x11a9e1['y']+Math[_0xc371fb(0x151)]((_0x11a9e1[_0xc371fb(0x28b)]-_0x2319e3)/0x2));this[_0xc371fb(0x20e)](_0x4b9965,_0x11a9e1['x'],_0x2ee24a,_0x11a9e1[_0xc371fb(0x2ba)]);},Window_ChoiceList['prototype'][_0x5573a7(0x35f)]=function(){const _0x4305b6=_0x5573a7;$gameMessage[_0x4305b6(0x320)](this[_0x4305b6(0x3b1)]()),this['_messageWindow']['terminateMessage'](),this['close']();};