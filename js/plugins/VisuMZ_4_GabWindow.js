//=============================================================================
// VisuStella MZ - Gab Window
// VisuMZ_4_GabWindow.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_GabWindow = true;

var VisuMZ = VisuMZ || {};
VisuMZ.GabWindow = VisuMZ.GabWindow || {};
VisuMZ.GabWindow.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.00] [GabWindow]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Gab_Window_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Sometimes there's random jibber jabber that does not warrant a message box.
 * The Gab Window fulfills that jibber jabber by placing such text outside of
 * the message window box and at the corner of the screen. The gab text will
 * appear briefly and then disappear, not showing up again until the gab text
 * is updated with something else.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Create gab text that does not interrupt gameplay.
 * * Gabs can be queued together to create a streamlined conversation.
 * * Gabs can play sound effects when played, allowing you to attach voices to
 *   them if desired.
 * * Multiple lines can be used per gab to display more text.
 * * Attach faces, map sprites, sideview sprites, and even pictures to gabs.
 * * Gabs can be automatically positioned above specific events, actors, and
 *   even enemies.
 * * Turn on switches after a gab is completed.
 * * Run custom JavaScript code upon displaying or finish a gab.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 * 
 * === Gab Plugin Commands ===
 *
 * ---
 *
 * Gab: Text Only
 * - Show a Gab Window with the specified settings.
 *
 *   Text:
 *   - The text to be shown in the Gab Window.
 *
 *   Force Gab?:
 *   - Forced gabs will clear other gabs and display immediately.
 *
 *   Optional Settings:
 *   - Change the settings you want to override with this gab.
 *     Blank settings will use default Plugin Parameter settings.
 *
 * ---
 *
 * Gab: Gab: Text + Face (Any)
 * - Show a Gab Window with the specified settings.
 * - Any face graphic can be displayed next to text.
 *
 *   Text:
 *   - The text to be shown in the Gab Window.
 *
 *   Filename:
 *   - The filename of the face graphic to use.
 *
 *   Index:
 *   - This is the index of the face graphic.
 *   - Index values start at 0.
 *
 *   Force Gab?:
 *   - Forced gabs will clear other gabs and display immediately.
 *
 *   Optional Settings:
 *   - Change the settings you want to override with this gab.
 *     Blank settings will use default Plugin Parameter settings.
 *
 * ---
 *
 * Gab: Text + Face (Actor)
 * - Show a Gab Window with the specified settings.
 * - Pick an actor's face graphic to show with it.
 *
 *   Text:
 *   - The text to be shown in the Gab Window.
 *
 *   Actor ID:
 *   - This is the ID of the actor you want the face graphic of.
 *
 *   Force Gab?:
 *   - Forced gabs will clear other gabs and display immediately.
 *
 *   Optional Settings:
 *   - Change the settings you want to override with this gab.
 *     Blank settings will use default Plugin Parameter settings.
 *
 * ---
 *
 * Gab: Text + Face (Party)
 * - Show a Gab Window with the specified settings.
 * - Pick a party member's face graphic to show with it.
 *
 *   Text:
 *   - The text to be shown in the Gab Window.
 *
 *   Party Member Index:
 *   - This is the index of the party member you want the face graphic of.
 *   - Index values start at 0.
 *
 *   Force Gab?:
 *   - Forced gabs will clear other gabs and display immediately.
 *
 *   Optional Settings:
 *   - Change the settings you want to override with this gab.
 *     Blank settings will use default Plugin Parameter settings.
 *
 * ---
 *
 * Gab: Text + Map Sprite (Any)
 * - Show a Gab Window with the specified settings.
 * - Any map sprite can be displayed next to text.
 *
 *   Text:
 *   - The text to be shown in the Gab Window.
 *
 *   Filename:
 *   - The filename of the sprite graphic to use.
 *
 *   Index:
 *   - This is the index of the sprite graphic.
 *   - Index values start at 0.
 *
 *   Force Gab?:
 *   - Forced gabs will clear other gabs and display immediately.
 *
 *   Optional Settings:
 *   - Change the settings you want to override with this gab.
 *     Blank settings will use default Plugin Parameter settings.
 *
 * ---
 *
 * Gab: Text + Map Sprite (Actor)
 * - Show a Gab Window with the specified settings.
 * - Pick an actor's sprite graphic to show with it.
 *
 *   Text:
 *   - The text to be shown in the Gab Window.
 *
 *   Actor ID:
 *   - This is the ID of the actor you want the map sprite of.
 *
 *   Force Gab?:
 *   - Forced gabs will clear other gabs and display immediately.
 *
 *   Optional Settings:
 *   - Change the settings you want to override with this gab.
 *     Blank settings will use default Plugin Parameter settings.
 *
 * ---
 *
 * Gab: Text + Map Sprite (Party)
 * - Show a Gab Window with the specified settings.
 * - Pick a party member's sprite graphic to show with it.
 *
 *   Text:
 *   - The text to be shown in the Gab Window.
 *
 *   Party Member Index:
 *   - This is the index of the party member you want the map sprite of.
 *   - Index values start at 0.
 *
 *   Force Gab?:
 *   - Forced gabs will clear other gabs and display immediately.
 *
 *   Optional Settings:
 *   - Change the settings you want to override with this gab.
 *     Blank settings will use default Plugin Parameter settings.
 *
 * ---
 *
 * Gab: Text + Sideview Actor (Any)
 * - Show a Gab Window with the specified settings.
 * - Any Sideview Actor can be displayed next to text.
 *
 *   Text:
 *   - The text to be shown in the Gab Window.
 *
 *   Filename:
 *   - The filename of the Sideview Actor graphic to use.
 *
 *   Force Gab?:
 *   - Forced gabs will clear other gabs and display immediately.
 *
 *   Optional Settings:
 *   - Change the settings you want to override with this gab.
 *     Blank settings will use default Plugin Parameter settings.
 *
 * ---
 *
 * Gab: Text + Sideview Actor (Actor)
 * - Show a Gab Window with the specified settings.
 * - Pick an actor's sideview graphic to show with it.
 *
 *   Text:
 *   - The text to be shown in the Gab Window.
 *
 *   Actor ID:
 *   - This is the ID of the actor you want the sideview graphic of.
 *
 *   Force Gab?:
 *   - Forced gabs will clear other gabs and display immediately.
 *
 *   Optional Settings:
 *   - Change the settings you want to override with this gab.
 *     Blank settings will use default Plugin Parameter settings.
 *
 * ---
 *
 * Gab: Text + Sideview Actor (Party)
 * - Show a Gab Window with the specified settings.
 * - Pick a party member's sideview graphic to show with it.
 *
 *   Text:
 *   - The text to be shown in the Gab Window.
 *
 *   Party Member Index:
 *   - This is the index of the party member you want the sideview graphic of.
 *   - Index values start at 0.
 *
 *   Force Gab?:
 *   - Forced gabs will clear other gabs and display immediately.
 *
 *   Optional Settings:
 *   - Change the settings you want to override with this gab.
 *     Blank settings will use default Plugin Parameter settings.
 *
 * ---
 *
 * Gab: Text + Picture
 * - Show a Gab Window with the specified settings.
 * - Any picture graphic can be displayed next to text.
 *
 *   Text:
 *   - The text to be shown in the Gab Window.
 *
 *   Filename:
 *   - The filename of the face graphic to use.
 *
 *   Stretch Picture:
 *   - Stretch the picture to fit the window?
 *
 *   Force Gab?:
 *   - Forced gabs will clear other gabs and display immediately.
 *
 *   Optional Settings:
 *   - Change the settings you want to override with this gab.
 *     Blank settings will use default Plugin Parameter settings.
 *
 * ---
 * 
 * === Optional Settings ===
 * 
 * These settings appear in the above Gab Plugin Commands. Opening up the
 * Optional Settings will yield the following:
 * 
 * ---
 *
 * DimColor
 * 
 *   Dim Color 1:
 *   Dim Color 2:
 *   - The dim colors to use for this Gab Window.
 *   - Format: rgba(red, green, blue, alpha)
 *
 * ---
 *
 * Fade
 * 
 *   Fade Rate:
 *   - How fast this Gab Window fades away.
 * 
 *   Fade Direction:
 *   - The direction this Gab Window fades out in.
 *
 * ---
 *
 * Font
 * 
 *   Font Name:
 *   - The font name to use for this Gab Window.
 * 
 *   Font Size:
 *   - The font size to use for this Gab Window.
 *
 * ---
 *
 * Position
 * 
 *   Y Location:
 *   - The Y coordinate this Gab Window will appear in.
 *   - Ignore if you are using a locked sprite position.
 * 
 *   Actor ID:
 *   - The ID of the actor to display this Gab Window above.
 *   - For Map/Battle. 
 * 
 *   Party Index:
 *   - Index of the party member to display Gab Window above.
 *   - For Map/Battle. Index values start at 0. Ignore under 0.
 * 
 *   Enemy Index:
 *   - Index of an enemy battler to display Gab Window above.
 *   - Battle only. Index values start at 0. Ignore under 0.
 * 
 *   Event ID:
 *   - The ID of the event to display this Gab Window above.
 *   - Map only.
 *
 * ---
 *
 * On Display
 * 
 *   Bypass Anti-Repeat:
 *   - Allows this gab to bypass the Anti-Repeat settings.
 * 
 *   Sound Filename:
 *   - The filename of the SE to play when the Gab Window shows.
 * 
 *   JS: On Display:
 *   - Runs this code once this Gab Window shows up.
 *
 * ---
 *
 * On Finish
 * 
 *   Gab Switch:
 *   - The specified switch will be turned ON when the Gab Window finishes.
 * 
 *   JS: On Finish:
 *   - Runs this code once this Gab Window finishes.
 *
 * ---
 *
 * Waiting
 * 
 *   Wait Time:
 *   - The number of frames this Gab Window stays visible.
 * 
 *   Time Per Character:
 *   - Frames added per Text Character in this Gab Window.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Clear Gabs
 * - Clears out the current Gab and any which are queued.
 *
 * ---
 *
 * System: Wait For Gab Completion
 * - Causes the game to wait until all gabs are finished playing.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings regarding the Gab Window.
 *
 * ---
 *
 * General
 * 
 *   Anti-Repeat:
 *   - Stops gabs of the same settings from being queued.
 * 
 *   Center Graphics:
 *   - Centers graphics vertically if there are multiple lines.
 *
 * ---
 *
 * Fade
 * 
 *   Fade Rate:
 *   - How fast the gab window fades away.
 * 
 *   Fade Direction:
 *   - The direction to move the window in when fading out.
 *
 * ---
 *
 * Font
 * 
 *   Gab Font Name:
 *   - The font name used for the text of the Gab Window
 *   - Leave empty to use the default game's font.
 * 
 *   Gab Font Size:
 *   - The font size used for the text of the Gab Window.
 *   - Default: 28
 *
 * ---
 *
 * Sprites > Character Sprites
 * 
 *   X Position:
 *   - X position of the character.
 * 
 *   Y Position:
 *   - Y position of the character.
 *
 * ---
 *
 * Sprites > Sideview Sprites
 * 
 *   X Position:
 *   - X position of the Sideview Actor.
 * 
 *   Y Position:
 *   - Y position of the Sideview Actor.
 *
 * ---
 *
 * Waiting
 * 
 *   Base Wait Time:
 *   - Minimum frames the Gab Window stays visible.
 *   - Default: 90
 * 
 *   Time Per Character:
 *   - Frames added per Text Character.
 *   - Default: 4
 *
 * ---
 * 
 * JavaScript
 * 
 *   JS: On Display:
 *   - Runs this code once this Gab Window shows up.
 *   - This applies to every single gab.
 * 
 *   JS: On Finish:
 *   - Runs this code once this Gab Window finishes.
 *   - This applies to every single gab.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Map Settings
 * ============================================================================
 *
 * Settings related to the gab window while in the map scene.
 *
 * ---
 *
 * Map
 * 
 *   Y Location:
 *   - This is the Y location of the Gab Window.
 * 
 *   Dim Color 1:
 *   Dim Color 2:
 *   - These are the dim colors used for maps.
 *   - Format: rgba(red, green, blue, alpha)
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Settings
 * ============================================================================
 *
 * Settings related to the gab window while in the battle scene.
 *
 * ---
 *
 * Battle
 * 
 *   Y Location:
 *   - This is the Y location of the Gab Window.
 * 
 *   Dim Color 1:
 *   Dim Color 2:
 *   - These are the dim colors used for battles.
 *   - Format: rgba(red, green, blue, alpha)
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
 * * Yanfly
 * * Trihan
 * * Arisu
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00: September 10, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GabTextOnly
 * @text Gab: Text Only
 * @desc Show a Gab Window with the specified settings.
 * Only text is displayed.
 * 
 * @arg Text:json
 * @text Text
 * @type note
 * @desc The text to be shown in the Gab Window.
 * @default "Hello!"
 * 
 * @arg ForceGab:eval
 * @text Force Gab?
 * @type boolean
 * @on Force this Gab
 * @off Queue this Gab
 * @desc Forced gabs will clear other gabs and display immediately.
 * @default false
 *
 * @arg Override:struct
 * @text Optional Settings
 * @type struct<Override>
 * @desc Change the settings you want to override with this gab.
 * Blank settings will use default Plugin Parameter settings.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GabTextFaceAny
 * @text Gab: Text + Face (Any)
 * @desc Show a Gab Window with the specified settings.
 * Any face graphic can be displayed next to text.
 * 
 * @arg Text:json
 * @text Text
 * @type note
 * @desc The text to be shown in the Gab Window.
 * @default "Hello!"
 * 
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/faces/
 * @desc The filename of the face graphic to use.
 * @default Actor1
 * 
 * @arg ID:num
 * @text Index
 * @parent Filename:str
 * @type number
 * @desc This is the index of the face graphic.
 * Index values start at 0.
 * @default 0
 * 
 * @arg ForceGab:eval
 * @text Force Gab?
 * @type boolean
 * @on Force this Gab
 * @off Queue this Gab
 * @desc Forced gabs will clear other gabs and display immediately.
 * @default false
 *
 * @arg Override:struct
 * @text Optional Settings
 * @type struct<Override>
 * @desc Change the settings you want to override with this gab.
 * Blank settings will use default Plugin Parameter settings.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GabTextFaceActor
 * @text Gab: Text + Face (Actor)
 * @desc Show a Gab Window with the specified settings.
 * Pick an actor's face graphic to show with it.
 * 
 * @arg Text:json
 * @text Text
 * @type note
 * @desc The text to be shown in the Gab Window.
 * @default "Hello!"
 * 
 * @arg ID:num
 * @text Actor ID
 * @type actor
 * @desc This is the ID of the actor you want the face graphic of.
 * @default 1
 * 
 * @arg ForceGab:eval
 * @text Force Gab?
 * @type boolean
 * @on Force this Gab
 * @off Queue this Gab
 * @desc Forced gabs will clear other gabs and display immediately.
 * @default false
 *
 * @arg Override:struct
 * @text Optional Settings
 * @type struct<Override>
 * @desc Change the settings you want to override with this gab.
 * Blank settings will use default Plugin Parameter settings.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GabTextFaceParty
 * @text Gab: Text + Face (Party)
 * @desc Show a Gab Window with the specified settings.
 * Pick a party member's face graphic to show with it.
 * 
 * @arg Text:json
 * @text Text
 * @type note
 * @desc The text to be shown in the Gab Window.
 * @default "Hello!"
 * 
 * @arg ID:num
 * @text Party Member Index
 * @type number
 * @desc This is the index of the party member you want the face
 * graphic of. Index values start at 0.
 * @default 0
 * 
 * @arg ForceGab:eval
 * @text Force Gab?
 * @type boolean
 * @on Force this Gab
 * @off Queue this Gab
 * @desc Forced gabs will clear other gabs and display immediately.
 * @default false
 *
 * @arg Override:struct
 * @text Optional Settings
 * @type struct<Override>
 * @desc Change the settings you want to override with this gab.
 * Blank settings will use default Plugin Parameter settings.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GabTextSpriteAny
 * @text Gab: Text + Map Sprite (Any)
 * @desc Show a Gab Window with the specified settings.
 * Any map sprite can be displayed next to text.
 * 
 * @arg Text:json
 * @text Text
 * @type note
 * @desc The text to be shown in the Gab Window.
 * @default "Hello!"
 * 
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/characters/
 * @desc The filename of the sprite graphic to use.
 * @default Actor1
 * 
 * @arg ID:num
 * @text Index
 * @parent Filename:str
 * @type number
 * @desc This is the index of the sprite graphic.
 * Index values start at 0.
 * @default 0
 * 
 * @arg ForceGab:eval
 * @text Force Gab?
 * @type boolean
 * @on Force this Gab
 * @off Queue this Gab
 * @desc Forced gabs will clear other gabs and display immediately.
 * @default false
 *
 * @arg Override:struct
 * @text Optional Settings
 * @type struct<Override>
 * @desc Change the settings you want to override with this gab.
 * Blank settings will use default Plugin Parameter settings.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GabTextSpriteActor
 * @text Gab: Text + Map Sprite (Actor)
 * @desc Show a Gab Window with the specified settings.
 * Pick an actor's sprite graphic to show with it.
 * 
 * @arg Text:json
 * @text Text
 * @type note
 * @desc The text to be shown in the Gab Window.
 * @default "Hello!"
 * 
 * @arg ID:num
 * @text Actor ID
 * @type actor
 * @desc This is the ID of the actor you want the map sprite of.
 * @default 1
 * 
 * @arg ForceGab:eval
 * @text Force Gab?
 * @type boolean
 * @on Force this Gab
 * @off Queue this Gab
 * @desc Forced gabs will clear other gabs and display immediately.
 * @default false
 *
 * @arg Override:struct
 * @text Optional Settings
 * @type struct<Override>
 * @desc Change the settings you want to override with this gab.
 * Blank settings will use default Plugin Parameter settings.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GabTextSpriteParty
 * @text Gab: Text + Map Sprite (Party)
 * @desc Show a Gab Window with the specified settings.
 * Pick a party member's sprite graphic to show with it.
 * 
 * @arg Text:json
 * @text Text
 * @type note
 * @desc The text to be shown in the Gab Window.
 * @default "Hello!"
 * 
 * @arg ID:num
 * @text Party Member Index
 * @type number
 * @desc This is the index of the party member you want the map
 * sprite of. Index values start at 0.
 * @default 0
 * 
 * @arg ForceGab:eval
 * @text Force Gab?
 * @type boolean
 * @on Force this Gab
 * @off Queue this Gab
 * @desc Forced gabs will clear other gabs and display immediately.
 * @default false
 *
 * @arg Override:struct
 * @text Optional Settings
 * @type struct<Override>
 * @desc Change the settings you want to override with this gab.
 * Blank settings will use default Plugin Parameter settings.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GabTextSvActorAny
 * @text Gab: Text + Sideview Actor (Any)
 * @desc Show a Gab Window with the specified settings.
 * Any Sideview Actor can be displayed next to text.
 * 
 * @arg Text:json
 * @text Text
 * @type note
 * @desc The text to be shown in the Gab Window.
 * @default "Hello!"
 * 
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/sv_actors/
 * @desc The filename of the Sideview Actor graphic to use.
 * @default Actor1_1
 * 
 * @arg ForceGab:eval
 * @text Force Gab?
 * @type boolean
 * @on Force this Gab
 * @off Queue this Gab
 * @desc Forced gabs will clear other gabs and display immediately.
 * @default false
 *
 * @arg Override:struct
 * @text Optional Settings
 * @type struct<Override>
 * @desc Change the settings you want to override with this gab.
 * Blank settings will use default Plugin Parameter settings.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GabTextSvActorActor
 * @text Gab: Text + Sideview Actor (Actor)
 * @desc Show a Gab Window with the specified settings.
 * Pick an actor's sideview graphic to show with it.
 * 
 * @arg Text:json
 * @text Text
 * @type note
 * @desc The text to be shown in the Gab Window.
 * @default "Hello!"
 * 
 * @arg ID:num
 * @text Actor ID
 * @type actor
 * @desc This is the ID of the actor you want the sideview graphic of.
 * @default 1
 * 
 * @arg ForceGab:eval
 * @text Force Gab?
 * @type boolean
 * @on Force this Gab
 * @off Queue this Gab
 * @desc Forced gabs will clear other gabs and display immediately.
 * @default false
 *
 * @arg Override:struct
 * @text Optional Settings
 * @type struct<Override>
 * @desc Change the settings you want to override with this gab.
 * Blank settings will use default Plugin Parameter settings.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GabTextSvActorParty
 * @text Gab: Text + Sideview Actor (Party)
 * @desc Show a Gab Window with the specified settings.
 * Pick a party member's sideview graphic to show with it.
 * 
 * @arg Text:json
 * @text Text
 * @type note
 * @desc The text to be shown in the Gab Window.
 * @default "Hello!"
 * 
 * @arg ID:num
 * @text Party Member Index
 * @type number
 * @desc This is the index of the party member you want the
 * sideview graphic of. Index values start at 0.
 * @default 0
 * 
 * @arg ForceGab:eval
 * @text Force Gab?
 * @type boolean
 * @on Force this Gab
 * @off Queue this Gab
 * @desc Forced gabs will clear other gabs and display immediately.
 * @default false
 *
 * @arg Override:struct
 * @text Optional Settings
 * @type struct<Override>
 * @desc Change the settings you want to override with this gab.
 * Blank settings will use default Plugin Parameter settings.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GabTextPicture
 * @text Gab: Text + Picture
 * @desc Show a Gab Window with the specified settings.
 * Any picture graphic can be displayed next to text.
 * 
 * @arg Text:json
 * @text Text
 * @type note
 * @desc The text to be shown in the Gab Window.
 * @default "Hello!"
 * 
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc The filename of the face graphic to use.
 * @default Untitled
 * 
 * @arg Stretched:eval
 * @text Stretch Picture
 * @type boolean
 * @on Stretch Picture
 * @off Don't Stretch
 * @desc Stretch the picture to fit the window?
 * @default true
 * 
 * @arg ForceGab:eval
 * @text Force Gab?
 * @type boolean
 * @on Force this Gab
 * @off Queue this Gab
 * @desc Forced gabs will clear other gabs and display immediately.
 * @default false
 *
 * @arg Override:struct
 * @text Optional Settings
 * @type struct<Override>
 * @desc Change the settings you want to override with this gab.
 * Blank settings will use default Plugin Parameter settings.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command ClearGab
 * @text System: Clear Gabs
 * @desc Clears out the current Gab and any which are queued.
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command WaitForGab
 * @text System: Wait For Gab Completion
 * @desc Causes the game to wait until all gabs are finished playing.
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
 * @param GabWindow
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
 * @desc General settings regarding the Gab Window.
 * @default {"General":"","AntiRepeat:eval":"true","CenterGraphics:eval":"true","Fade":"","FadeRate:num":"16","FadeDirection:str":"None","Font":"","GabFontName:str":"","GabFontSize:num":"28","Sprites":"","Character":"","CharacterXPos:num":"36","CharacterYPos:num":"60","SVActor":"","SvActorXPos:num":"44","SvActorYPos:num":"68","Waiting":"","BaseWaitTime:num":"90","TimePerCharacter:num":"4","JavaScript":"","OnDisplayJS:func":"\"// Declare Constants\\nconst gabWindow = this;\\nconst lastGab = arguments[0];\\n\\n// Perform Actions\\n\"","OnFinishJS:func":"\"// Declare Constants\\nconst gabWindow = this;\\nconst lastGab = arguments[0];\\n\\n// Perform Actions\\n\""}
 *
 * @param Map:struct
 * @text Map Settings
 * @type struct<Map>
 * @desc Settings related to the gab window while in the map scene.
 * @default {"MapYLocation:num":"72","MapDimColor1:str":"rgba(0, 0, 0, 0.6)","MapDimColor2:str":"rgba(0, 0, 0, 0)"}
 *
 * @param Battle:struct
 * @text Battle Settings
 * @type struct<Battle>
 * @desc Settings related to the gab window while in the battle scene.
 * @default {"BattleYLocation:num":"108","BattleDimColor1:str":"rgba(0, 0, 0, 0.6)","BattleDimColor2:str":"rgba(0, 0, 0, 0)"}
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
 * @param AntiRepeat:eval
 * @text Anti-Repeat
 * @parent General
 * @type boolean
 * @on Anti-Repeat
 * @off Allow Repeat
 * @desc Stops gabs of the same settings from being queued.
 * @default true
 * 
 * @param CenterGraphics:eval
 * @text Center Graphics
 * @parent General
 * @type boolean
 * @on Center Graphics
 * @off Align Top
 * @desc Centers graphics vertically if there are multiple lines.
 * @default true
 * 
 * @param Fade
 * 
 * @param FadeRate:num
 * @text Fade Rate
 * @parent Fade
 * @type number
 * @min 1
 * @desc How fast the gab window fades away.
 * Default: 16
 * @default 16
 * 
 * @param FadeDirection:str
 * @text Fade Direction
 * @parent Fade
 * @type select
 * @option None
 * @option Up
 * @option Down
 * @option Left
 * @option Right
 * @desc The direction to move the window in when fading out.
 * @default None
 *
 * @param Font
 * 
 * @param GabFontName:str
 * @text Gab Font Name
 * @parent Font
 * @desc The font name used for the text of the Gab Window
 * Leave empty to use the default game's font.
 * @default 
 * 
 * @param GabFontSize:num
 * @text Gab Font Size
 * @parent Font
 * @type number
 * @min 1
 * @desc The font size used for the text of the Gab Window.
 * Default: 28
 * @default 28
 * 
 * @param Sprites
 * 
 * @param Character
 * @text Character Sprites
 * @parent Sprites
 * 
 * @param CharacterXPos:num
 * @text X Position
 * @parent Character
 * @type number
 * @desc X position of the character.
 * Default: 36
 * @default 36
 * 
 * @param CharacterYPos:num
 * @text Y Position
 * @parent Character
 * @type number
 * @desc Y position of the character.
 * Default: 60
 * @default 60
 * 
 * @param SVActor
 * @text Sideview Sprites
 * @parent Sprites
 * 
 * @param SvActorXPos:num
 * @text X Position
 * @parent SVActor
 * @type number
 * @desc X position of the Sideview Actor.
 * Default: 44
 * @default 44
 * 
 * @param SvActorYPos:num
 * @text Y Position
 * @parent SVActor
 * @type number
 * @desc Y position of the Sideview Actor.
 * Default: 68
 * @default 68
 * 
 * @param Waiting
 * 
 * @param BaseWaitTime:num
 * @text Base Wait Time
 * @parent Waiting
 * @type number
 * @min 0
 * @desc Minimum frames the Gab Window stays visible.
 * Default: 90
 * @default 90
 * 
 * @param TimePerCharacter:num
 * @text Time Per Character
 * @parent Waiting
 * @type number
 * @min 0
 * @desc Frames added per Text Character.
 * Default: 4
 * @default 4
 * 
 * @param JavaScript
 *
 * @param OnDisplayJS:func
 * @text JS: On Display
 * @parent OnDisplay
 * @type note
 * @desc Runs this code once this Gab Window shows up.
 * This applies to every single gab.
 * @default "// Declare Constants\nconst gabWindow = this;\nconst lastGab = arguments[0];\n\n// Perform Actions\n"
 *
 * @param OnFinishJS:func
 * @text JS: On Finish
 * @parent OnFinish
 * @type note
 * @desc Runs this code once this Gab Window finishes.
 * This applies to every single gab.
 * @default "// Declare Constants\nconst gabWindow = this;\nconst lastGab = arguments[0];\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Map Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Map:
 * 
 * @param MapYLocation:num
 * @type number
 * @text Y Location
 * @desc This is the Y location of the Gab Window.
 * Default: 72
 * @default 72
 * 
 * @param MapDimColor1:str
 * @text Dim Color 1
 * @desc This is the dim color 1 used for maps.
 * Default: rgba(0, 0, 0, 0.6)
 * @default rgba(0, 0, 0, 0.6)
 * 
 * @param MapDimColor2:str
 * @text Dim Color 2
 * @desc This is the dim color 2 used for maps.
 * Default: rgba(0, 0, 0, 0)
 * @default rgba(0, 0, 0, 0)
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Battle:
 * 
 * @param BattleYLocation:num
 * @type number
 * @text Y Location
 * @desc This is the Y location of the Gab Window.
 * Default: 108
 * @default 108
 * 
 * @param BattleDimColor1:str
 * @text Dim Color 1
 * @desc This is the dim color 1 used for battles.
 * Default: rgba(0, 0, 0, 0.6)
 * @default rgba(0, 0, 0, 0.6)
 * 
 * @param BattleDimColor2:str
 * @text Dim Color 2
 * @desc This is the dim color 2 used for battles.
 * Default: rgba(0, 0, 0, 0)
 * @default rgba(0, 0, 0, 0)
 *
 */
/* ----------------------------------------------------------------------------
 * Override Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Override:
 * 
 * @param DimColor
 * @text Dim Color
 * 
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent DimColor
 * @desc The dim color 1 to use for this Gab Window.
 * Format: rgba(red, green, blue, alpha)
 * @default 
 * 
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent DimColor
 * @desc The dim color 2 to use for this Gab Window.
 * Format: rgba(red, green, blue, alpha)
 * @default 
 * 
 * @param Fade
 * 
 * @param FadeRate:num
 * @text Fade Rate
 * @parent Fade
 * @type number
 * @desc How fast this Gab Window fades away.
 * @default 
 * 
 * @param FadeDirection:str
 * @text Fade Direction
 * @parent Fade
 * @type select
 * @option None
 * @option Up
 * @option Down
 * @option Left
 * @option Right
 * @desc The direction this Gab Window fades out in.
 * @default 
 *
 * @param Font
 * 
 * @param FontName:str
 * @text Font Name
 * @parent Font
 * @desc The font name to use for this Gab Window.
 * @default 
 * 
 * @param FontSize:num
 * @text Font Size
 * @parent Font
 * @type number
 * @desc The font size to use for this Gab Window.
 * @default 
 * 
 * @param Position
 * 
 * @param YLocation:num
 * @text Y Location
 * @parent Position
 * @type number
 * @desc The Y coordinate this Gab Window will appear in.
 * Ignore if you are using a locked sprite position.
 * @default 
 * 
 * @param ActorID:num
 * @text Actor ID
 * @parent Position
 * @type actor
 * @desc The ID of the actor to display this Gab Window above.
 * For Map/Battle. 
 * @default 0
 * 
 * @param PartyIndex:num
 * @text Party Index
 * @parent ActorID:num
 * @desc Index of the party member to display Gab Window above.
 * For Map/Battle. Index values start at 0. Ignore under 0.
 * @default -1
 * 
 * @param EnemyIndex:num
 * @text Enemy Index
 * @parent Position
 * @desc Index of an enemy battler to display Gab Window above.
 * Battle only. Index values start at 0. Ignore under 0.
 * @default -1
 * 
 * @param EventID:num
 * @text Event ID
 * @parent Position
 * @type number
 * @desc The ID of the event to display this Gab Window above.
 * Map only.
 * @default 0
 *
 * @param OnDisplay
 * @text On Display
 * 
 * @param BypassAntiRepeat:eval
 * @text Bypass Anti-Repeat
 * @parent OnDisplay
 * @type boolean
 * @on Bypass
 * @off Use Anti-Repeat
 * @desc Allows this gab to bypass the Anti-Repeat settings.
 * @default false
 * 
 * @param SoundFilename:str
 * @text Sound Filename
 * @parent OnDisplay
 * @type file
 * @dir audio/se
 * @desc The filename of the SE to play when the Gab Window shows.
 * @default 
 *
 * @param OnDisplayJS:func
 * @text JS: On Display
 * @parent OnDisplay
 * @type note
 * @desc Runs this code once this Gab Window shows up.
 * @default 
 *
 * @param OnFinish
 * @text On Finish
 * 
 * @param GabSwitch:num
 * @text Gab Switch
 * @parent OnFinish
 * @type switch
 * @desc The specified switch will be turned ON when the Gab Window finishes.
 * @default 
 *
 * @param OnFinishJS:func
 * @text JS: On Finish
 * @parent OnFinish
 * @type note
 * @desc Runs this code once this Gab Window finishes.
 * @default 
 * 
 * @param Waiting
 * 
 * @param WaitTime:num
 * @text Wait Time
 * @parent Waiting
 * @type number
 * @desc The number of frames this Gab Window stays visible.
 * @default 
 * 
 * @param TimePerCharacter:num
 * @text Time Per Character
 * @parent Waiting
 * @type number
 * @desc Frames added per Text Character in this Gab Window.
 * @default 
 *
 */
//=============================================================================

const _0x587d=['gradientFillRect','ZzIRw','startCountdown','_gabQueue','_stretchPicture','members','GabFontName','_showCount','gOQoF','drawSvActor','fittingHeight','lineHeight','includes','dKKSj','character','drawGabBackground','GabTextSvActorActor','face','call','GabTextOnly','svActorHorzCells','Wbrcs','innerHeight','RBMbr','_gabLoaded','CenterGraphics','findTargetSprite','Battle','repositionNormal','DimColor2','gab','_fadeDirOverride','cArfl','width','wJUoA','constructor','_currentGab','prototype','_text','_gabRunning','BaseWaitTime','name','checkCurrentGab','battlerName','SvActorXPos','GabTextSvActorAny','min','MapDimColor2','_lockedToTarget','length','isBattleMember','faceName','SvActorYPos','refresh','create','Override','RIGHT','updateFadeOut','_waitTimeOverride','determineLockToSprite','GabWindow','isSceneMap','opacity','loadCharacter','processNewGabData','GabTextSpriteParty','AntiRepeat','svActorVertCells','_graphicIndex','forceGabData','FUNC','ARRAYSTRUCT','command357','playSound','drawGabGraphic','format','_jsOnFinish','setupLoadGraphic','padding','_graphicName','ActorID','MapYLocation','initMembers','resetTextColor','mode','CharacterYPos','Text','GabTextFaceAny','EVAL','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','XoIVd','_enemyIndex','BattleYLocation','mQWtw','mainSprite','_graphicBitmap','registerCommand','Game_Interpreter_updateWaitMode','_victoryPhase','Width','OnDisplayJS','match','mainFontFace','turnOnGabSwitch','height','getLastPluginCommandInterpreter','UMUqn','setWaitMode','hide','_currentMapGab','clearGabData','kQnUj','checheckLastGab','playSe','dimColor2','onFinish','_fadeRateOverride','_storedBattleGabs','BgcJH','_dimColor2Override','Game_Interpreter_PluginCommand','SceneManager_push','onDisplayJS','_fontSizeOverride','exit','_gabWindow','characterIndex','YhMcj','parameters','ConvertParams','FadeDirection','ZNOGM','TimePerCharacter','ScKBd','ARRAYSTR','repositionToMapEvent','legnth','inBattle','isAppeared','mtmVR','reposition','NjujJ','_widthOVerride','initialize','isGabRunning','dwcFK','_eventID','trim','DyFLe','QVJXB','_dimColor1Override','DJqsg','drawGabSvActor','boxHeight','updateWaitMode','IngXt','xkNZV','_jsOnDisplay','Map','addGabData','CharacterXPos','General','itemPadding','actor','_waitMode','GabTextFaceActor','max','characterName','repositionToBattleTarget','contentsOpacity','ARRAYNUM','sv_actor','UOiJp','drawGabPicture','HorXq','gPsHN','push','drawGabCharacter','VzSQe','drawBackground','GabTextSpriteAny','adjustWidth','repositionToTarget','hUmjS','DiEbA','picture','DimColor1','_widthOverride','BattleDimColor1','onFinishJS','xEOxP','forceGabWindow','ARRAYFUNC','Settings','Filename','textSizeEx','stringify','GxBCX','ForceGab','GabTextPicture','_ignoreMask','boxWidth','xLgvT','adjustDimensions','onDisplay','oznCf','drawGabFace','blt','drawGabText','restoreGabs','loadSvActor','slice','loadNewGabData','NUM','createAllWindows','GabSwitch','RLUPF','aRsOH','yTyHj','ARRAYJSON','_lines','isSideView','_soundName','Stretched','_yLocOverride','faceWidth','innerWidth','none','_actorID','index','uYHrE','_currentBattleGab','_scene','parse','GabFontSize','updateFadeIn','faceIndex','MapDimColor1','ARRAYEVAL','kehTW','startGabWindow','toUpperCase','JSON','repositionToMapTarget','GabTextSpriteActor','follower','isStoreGabs','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','drawCharacter','PartyIndex','description','YPSFi','ClearGab','_graphicLoading','CNtxu','contentsWidth','actorId','dimColor1','fontFace','screenY','toLowerCase','map','_spriteset','aBcTq','clear','_lastPluginCommandInterpreter','ceil','isRepositionToBattleEnemy','OnFinishJS','LEFT','filter','EnemyIndex','createGabWindow','isRepositionToMapEvent','_graphicType','STR','AmrNp','XahpI','isSceneBattle','return\x200','FontSize','unshift','Scene_Battle_createAllWindows','status','createRect','split','storeGabs','_gabSwitch','EventID','followers','XPlYn','BattleDimColor2','isRepositionToActor','STRUCT','_storedMapGabs','faceHeight','Scene_Map_createAllWindows','_fontNameOverride','clearGabWindow','getPictureScale','_tpcOverride','GabTextFaceParty','FadeRate','_battle','OLMiU','checkDuplicateGab','contents','QHdlT','setValue','event','setLastPluginCommandInterpreter','fontSize','screenX'];(function(_0x3af641,_0x587d06){const _0x49c8cf=function(_0x5e93fe){while(--_0x5e93fe){_0x3af641['push'](_0x3af641['shift']());}};_0x49c8cf(++_0x587d06);}(_0x587d,0x15b));const _0x49c8=function(_0x3af641,_0x587d06){_0x3af641=_0x3af641-0x0;let _0x49c8cf=_0x587d[_0x3af641];return _0x49c8cf;};var label=_0x49c8('0x1a'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x49c8('0xec')](function(_0x2921be){return _0x2921be[_0x49c8('0xf9')]&&_0x2921be['description']['includes']('['+label+']');})[0x0];VisuMZ[label][_0x49c8('0x9f')]=VisuMZ[label][_0x49c8('0x9f')]||{},VisuMZ[_0x49c8('0x5f')]=function(_0x11dc26,_0x4c51d4){for(const _0x2fd822 in _0x4c51d4){if(_0x49c8('0x75')===_0x49c8('0x7a')){function _0x5a3dcc(){if(_0x451edd['inBattle']()&&_0x2a9a91[_0x49c8('0x40')])return!![];return![];}}else{if(_0x2fd822['match'](/(.*):(.*)/i)){const _0x18305f=String(RegExp['$1']),_0x2638b0=String(RegExp['$2'])[_0x49c8('0xcf')]()[_0x49c8('0x71')]();let _0x4ccb5d,_0x57d010,_0x3634de;switch(_0x2638b0){case _0x49c8('0xb3'):_0x4ccb5d=_0x4c51d4[_0x2fd822]!==''?Number(_0x4c51d4[_0x2fd822]):0x0;break;case _0x49c8('0x88'):_0x57d010=_0x4c51d4[_0x2fd822]!==''?JSON['parse'](_0x4c51d4[_0x2fd822]):[],_0x4ccb5d=_0x57d010[_0x49c8('0xe3')](_0x449942=>Number(_0x449942));break;case _0x49c8('0x36'):_0x4ccb5d=_0x4c51d4[_0x2fd822]!==''?eval(_0x4c51d4[_0x2fd822]):null;break;case _0x49c8('0xcc'):_0x57d010=_0x4c51d4[_0x2fd822]!==''?JSON[_0x49c8('0xc7')](_0x4c51d4[_0x2fd822]):[],_0x4ccb5d=_0x57d010[_0x49c8('0xe3')](_0x18e82c=>eval(_0x18e82c));break;case _0x49c8('0xd0'):_0x4ccb5d=_0x4c51d4[_0x2fd822]!==''?JSON[_0x49c8('0xc7')](_0x4c51d4[_0x2fd822]):'';break;case _0x49c8('0xb9'):_0x57d010=_0x4c51d4[_0x2fd822]!==''?JSON[_0x49c8('0xc7')](_0x4c51d4[_0x2fd822]):[],_0x4ccb5d=_0x57d010['map'](_0x2063ba=>JSON[_0x49c8('0xc7')](_0x2063ba));break;case _0x49c8('0x24'):_0x4ccb5d=_0x4c51d4[_0x2fd822]!==''?new Function(JSON['parse'](_0x4c51d4[_0x2fd822])):new Function(_0x49c8('0xf5'));break;case _0x49c8('0x9e'):_0x57d010=_0x4c51d4[_0x2fd822]!==''?JSON[_0x49c8('0xc7')](_0x4c51d4[_0x2fd822]):[],_0x4ccb5d=_0x57d010[_0x49c8('0xe3')](_0x56ba2e=>new Function(JSON['parse'](_0x56ba2e)));break;case _0x49c8('0xf1'):_0x4ccb5d=_0x4c51d4[_0x2fd822]!==''?String(_0x4c51d4[_0x2fd822]):'';break;case _0x49c8('0x64'):_0x57d010=_0x4c51d4[_0x2fd822]!==''?JSON[_0x49c8('0xc7')](_0x4c51d4[_0x2fd822]):[],_0x4ccb5d=_0x57d010['map'](_0x19e6a2=>String(_0x19e6a2));break;case _0x49c8('0x103'):_0x3634de=_0x4c51d4[_0x2fd822]!==''?JSON[_0x49c8('0xc7')](_0x4c51d4[_0x2fd822]):{},_0x4ccb5d=VisuMZ[_0x49c8('0x5f')]({},_0x3634de);break;case _0x49c8('0x25'):_0x57d010=_0x4c51d4[_0x2fd822]!==''?JSON[_0x49c8('0xc7')](_0x4c51d4[_0x2fd822]):[],_0x4ccb5d=_0x57d010[_0x49c8('0xe3')](_0x4adf3d=>VisuMZ[_0x49c8('0x5f')]({},JSON['parse'](_0x4adf3d)));break;default:continue;}_0x11dc26[_0x18305f]=_0x4ccb5d;}}}return _0x11dc26;},(_0x561fd7=>{const _0x1a5e29=_0x561fd7[_0x49c8('0x7')];for(const _0x63eb87 of dependencies){if(_0x49c8('0x12e')===_0x49c8('0x12e')){if(!Imported[_0x63eb87]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x49c8('0x29')](_0x1a5e29,_0x63eb87)),SceneManager['exit']();break;}}else{function _0x5e8445(){_0x33df0f['forceGabWindow'](_0x4c359a);}}}const _0x461893=_0x561fd7[_0x49c8('0xd8')];if(_0x461893['match'](/\[Version[ ](.*?)\]/i)){const _0x3374cc=Number(RegExp['$1']);_0x3374cc!==VisuMZ[label]['version']&&(alert(_0x49c8('0xd5')[_0x49c8('0x29')](_0x1a5e29,_0x3374cc)),SceneManager['exit']());}if(_0x461893[_0x49c8('0x43')](/\[Tier[ ](\d+)\]/i)){const _0x58f10b=Number(RegExp['$1']);_0x58f10b<tier?(alert(_0x49c8('0x37')['format'](_0x1a5e29,_0x58f10b,tier)),SceneManager[_0x49c8('0x5a')]()):tier=Math[_0x49c8('0x84')](_0x58f10b,tier);}VisuMZ[_0x49c8('0x5f')](VisuMZ[label][_0x49c8('0x9f')],_0x561fd7[_0x49c8('0x5e')]);})(pluginData),PluginManager[_0x49c8('0x3e')](pluginData[_0x49c8('0x7')],_0x49c8('0x12a'),_0x22e948=>{VisuMZ[_0x49c8('0x5f')](_0x22e948,_0x22e948);const _0x574bb4=SceneManager[_0x49c8('0xc6')];if(!_0x574bb4[_0x49c8('0x5b')])return;if(_0x22e948[_0x49c8('0xa4')]){if('MvfSu'===_0x49c8('0x96')){function _0x2b24f7(){_0x2a045c+=(this[_0x49c8('0xba')]-0x1)*this[_0x49c8('0x122')]()/0x2;}}else _0x574bb4['forceGabWindow'](_0x22e948);}else _0x574bb4[_0x49c8('0xce')](_0x22e948);}),PluginManager[_0x49c8('0x3e')](pluginData['name'],_0x49c8('0x35'),_0xbcfe6a=>{VisuMZ[_0x49c8('0x5f')](_0xbcfe6a,_0xbcfe6a);const _0xdae2b4=SceneManager[_0x49c8('0xc6')];if(!_0xdae2b4[_0x49c8('0x5b')])return;_0xbcfe6a[_0x49c8('0x32')]=_0x49c8('0x128'),_0xbcfe6a[_0x49c8('0xa4')]?_0xdae2b4[_0x49c8('0x9d')](_0xbcfe6a):_0xdae2b4['startGabWindow'](_0xbcfe6a);}),PluginManager[_0x49c8('0x3e')](pluginData[_0x49c8('0x7')],_0x49c8('0x83'),_0x258bd1=>{VisuMZ[_0x49c8('0x5f')](_0x258bd1,_0x258bd1);const _0x551fef=SceneManager[_0x49c8('0xc6')];if(!_0x551fef[_0x49c8('0x5b')])return;_0x258bd1[_0x49c8('0x32')]=_0x49c8('0x128');const _0x22a631=$gameActors[_0x49c8('0x81')](_0x258bd1['ID']);if(_0x22a631){if(_0x49c8('0x100')===_0x49c8('0x100'))_0x258bd1[_0x49c8('0xa0')]=_0x22a631['faceName'](),_0x258bd1['ID']=_0x22a631['faceIndex']();else{function _0x481e60(){let _0x11d9da=this['padding']*-0x1,_0x2d1d29=0x0;this[_0x49c8('0x10d')]?_0x2d1d29=_0x3dcdb2[_0x49c8('0x1a')][_0x49c8('0x9f')][_0x49c8('0x132')]['BattleYLocation']:_0x2d1d29=_0x51d0f1['GabWindow'][_0x49c8('0x9f')]['Map'][_0x49c8('0x2f')],_0x2d1d29-=this[_0x49c8('0x2c')],_0x2d1d29=this[_0x49c8('0xbe')]||_0x2d1d29,this['x']=_0x11d9da,this['y']=_0x2d1d29,this['_lockedToTarget']=null;}}}else _0x258bd1[_0x49c8('0x32')]='none';if(_0x258bd1[_0x49c8('0xa4')]){if(_0x49c8('0xb8')!==_0x49c8('0xb7'))_0x551fef[_0x49c8('0x9d')](_0x258bd1);else{function _0x170253(){_0x71b417[_0x49c8('0x9d')](_0x774b96);}}}else{if(_0x49c8('0x6b')!==_0x49c8('0x6b')){function _0x5368da(){return _0x5aa41f[_0x49c8('0xf9')]&&_0x3129dc[_0x49c8('0xd8')][_0x49c8('0x123')]('['+_0x19085e+']');}}else _0x551fef[_0x49c8('0xce')](_0x258bd1);}}),PluginManager[_0x49c8('0x3e')](pluginData[_0x49c8('0x7')],_0x49c8('0x10b'),_0x162b43=>{VisuMZ[_0x49c8('0x5f')](_0x162b43,_0x162b43);const _0x41a81b=SceneManager[_0x49c8('0xc6')];if(!_0x41a81b['_gabWindow'])return;_0x162b43[_0x49c8('0x32')]=_0x49c8('0x128');const _0x5a1306=$gameParty['members']()[_0x162b43['ID']];_0x5a1306?(_0x162b43[_0x49c8('0xa0')]=_0x5a1306[_0x49c8('0x11')](),_0x162b43['ID']=_0x5a1306[_0x49c8('0xca')]()):_0x162b43[_0x49c8('0x32')]='none',_0x162b43[_0x49c8('0xa4')]?_0x41a81b[_0x49c8('0x9d')](_0x162b43):_0x41a81b[_0x49c8('0xce')](_0x162b43);}),PluginManager['registerCommand'](pluginData[_0x49c8('0x7')],_0x49c8('0x92'),_0x20ae40=>{VisuMZ['ConvertParams'](_0x20ae40,_0x20ae40);const _0x5790d9=SceneManager['_scene'];if(!_0x5790d9['_gabWindow'])return;_0x20ae40[_0x49c8('0x32')]='character',_0x20ae40[_0x49c8('0xa4')]?_0x5790d9[_0x49c8('0x9d')](_0x20ae40):_0x5790d9[_0x49c8('0xce')](_0x20ae40);}),PluginManager['registerCommand'](pluginData[_0x49c8('0x7')],_0x49c8('0xd2'),_0x2b8237=>{VisuMZ[_0x49c8('0x5f')](_0x2b8237,_0x2b8237);const _0xb0fcc7=SceneManager[_0x49c8('0xc6')];if(!_0xb0fcc7[_0x49c8('0x5b')])return;_0x2b8237[_0x49c8('0x32')]=_0x49c8('0x125');const _0x43705d=$gameActors[_0x49c8('0x81')](_0x2b8237['ID']);if(_0x43705d)_0x2b8237[_0x49c8('0xa0')]=_0x43705d[_0x49c8('0x85')](),_0x2b8237['ID']=_0x43705d[_0x49c8('0x5c')]();else{if(_0x49c8('0x3b')!==_0x49c8('0x3b')){function _0x4c28d8(){return _0x47b418[_0x49c8('0xc')](this[_0x49c8('0xc0')]/this[_0x49c8('0x3d')][_0x49c8('0x138')],this[_0x49c8('0x12d')]/this[_0x49c8('0x3d')][_0x49c8('0x46')]);}}else _0x2b8237[_0x49c8('0x32')]=_0x49c8('0xc1');}if(_0x2b8237[_0x49c8('0xa4')]){if('tWJEV'===_0x49c8('0x8c')){function _0x30ce38(){_0x3966e3[_0x49c8('0xa0')]=_0x1ffd42['battlerName']();}}else _0xb0fcc7[_0x49c8('0x9d')](_0x2b8237);}else{if('SHAfM'!==_0x49c8('0x6f'))_0xb0fcc7[_0x49c8('0xce')](_0x2b8237);else{function _0x3e0cc8(){this[_0x49c8('0x49')](_0x49c8('0x135'));}}}}),PluginManager['registerCommand'](pluginData['name'],_0x49c8('0x1f'),_0x38313a=>{VisuMZ['ConvertParams'](_0x38313a,_0x38313a);const _0x263821=SceneManager[_0x49c8('0xc6')];if(!_0x263821[_0x49c8('0x5b')])return;_0x38313a['mode']=_0x49c8('0x125');const _0x355425=$gameParty['members']()[_0x38313a['ID']];_0x355425?(_0x38313a[_0x49c8('0xa0')]=_0x355425[_0x49c8('0x85')](),_0x38313a['ID']=_0x355425[_0x49c8('0x5c')]()):_0x38313a[_0x49c8('0x32')]=_0x49c8('0xc1');if(_0x38313a['ForceGab'])_0x263821[_0x49c8('0x9d')](_0x38313a);else{if(_0x49c8('0x11f')!==_0x49c8('0x4d'))_0x263821[_0x49c8('0xce')](_0x38313a);else{function _0x3f3a90(){if(this['_graphicLoading']&&this['_graphicBitmap'][_0x49c8('0x138')]<=0x0)return;this[_0x49c8('0x13')]();}}}}),PluginManager[_0x49c8('0x3e')](pluginData[_0x49c8('0x7')],_0x49c8('0xb'),_0x4bc365=>{VisuMZ[_0x49c8('0x5f')](_0x4bc365,_0x4bc365);const _0x525b62=SceneManager[_0x49c8('0xc6')];if(!_0x525b62['_gabWindow'])return;_0x4bc365['mode']='sv_actor',_0x4bc365['ForceGab']?_0x525b62['forceGabWindow'](_0x4bc365):_0x525b62['startGabWindow'](_0x4bc365);}),PluginManager[_0x49c8('0x3e')](pluginData[_0x49c8('0x7')],_0x49c8('0x127'),_0x5d14a3=>{VisuMZ[_0x49c8('0x5f')](_0x5d14a3,_0x5d14a3);const _0x3647c3=SceneManager[_0x49c8('0xc6')];if(!_0x3647c3[_0x49c8('0x5b')])return;_0x5d14a3[_0x49c8('0x32')]='sv_actor';const _0x14785f=$gameActors[_0x49c8('0x81')](_0x5d14a3['ID']);if(_0x14785f)_0x5d14a3[_0x49c8('0xa0')]=_0x14785f[_0x49c8('0x9')]();else{if(_0x49c8('0xa3')==='GxBCX')_0x5d14a3['mode']=_0x49c8('0xc1');else{function _0x2bceeb(){_0x4472af['Filename']=_0x135d8c[_0x49c8('0x85')](),_0x1f33db['ID']=_0x3dfd4d['characterIndex']();}}}_0x5d14a3['ForceGab']?_0x3647c3[_0x49c8('0x9d')](_0x5d14a3):_0x3647c3[_0x49c8('0xce')](_0x5d14a3);}),PluginManager[_0x49c8('0x3e')](pluginData[_0x49c8('0x7')],'GabTextSvActorParty',_0x14ef65=>{VisuMZ[_0x49c8('0x5f')](_0x14ef65,_0x14ef65);const _0x41632f=SceneManager[_0x49c8('0xc6')];if(!_0x41632f[_0x49c8('0x5b')])return;_0x14ef65[_0x49c8('0x32')]=_0x49c8('0x89');const _0x5e1bab=$gameParty[_0x49c8('0x11c')]()[_0x14ef65['ID']];_0x5e1bab?_0x14ef65[_0x49c8('0xa0')]=_0x5e1bab[_0x49c8('0x9')]():_0x14ef65[_0x49c8('0x32')]='none',_0x14ef65[_0x49c8('0xa4')]?_0x41632f['forceGabWindow'](_0x14ef65):_0x41632f[_0x49c8('0xce')](_0x14ef65);}),PluginManager[_0x49c8('0x3e')](pluginData[_0x49c8('0x7')],_0x49c8('0xa5'),_0xcada94=>{VisuMZ[_0x49c8('0x5f')](_0xcada94,_0xcada94);const _0x9f9bed=SceneManager[_0x49c8('0xc6')];if(!_0x9f9bed[_0x49c8('0x5b')])return;_0xcada94[_0x49c8('0x32')]=_0x49c8('0x97');if(_0xcada94[_0x49c8('0xa4')])_0x9f9bed[_0x49c8('0x9d')](_0xcada94);else{if('ExTwW'!==_0x49c8('0xe5'))_0x9f9bed['startGabWindow'](_0xcada94);else{function _0x5ab455(){if(this['_jsOnDisplay'])this[_0x49c8('0x7b')]['call'](this);const _0x4b7447=_0x48de21['GabWindow']['Settings']['General'];if(_0x4b7447[_0x49c8('0x42')])_0x4b7447[_0x49c8('0x42')][_0x49c8('0x129')](this,this['_currentGab']);}}}}),PluginManager[_0x49c8('0x3e')](pluginData[_0x49c8('0x7')],'WaitForGab',_0x170c42=>{const _0x4ea8ca=$gameTemp[_0x49c8('0x47')]();_0x4ea8ca['waitForGab']();}),PluginManager[_0x49c8('0x3e')](pluginData[_0x49c8('0x7')],_0x49c8('0xda'),_0x7c72bb=>{const _0x4bf69d=SceneManager[_0x49c8('0xc6')];if(_0x4bf69d[_0x49c8('0x5b')])_0x4bf69d[_0x49c8('0x108')]();}),VisuMZ[_0x49c8('0x1a')][_0x49c8('0x57')]=SceneManager[_0x49c8('0x8e')],SceneManager[_0x49c8('0x8e')]=function(_0x4a774a){if(this[_0x49c8('0xd4')](_0x4a774a)){if(_0x49c8('0x95')!==_0x49c8('0x95')){function _0x191472(){_0x5c82aa[_0x49c8('0x9d')](_0x2b9089);}}else this[_0x49c8('0xc6')][_0x49c8('0x5b')][_0x49c8('0xfc')]();}VisuMZ[_0x49c8('0x1a')]['SceneManager_push'][_0x49c8('0x129')](this,_0x4a774a);},SceneManager[_0x49c8('0xd4')]=function(_0x5531c5){return _0x5531c5===Scene_Map&&!this[_0x49c8('0x1b')]()||_0x5531c5===Scene_Battle&&this[_0x49c8('0x1b')]();},SceneManager[_0x49c8('0xf4')]=function(){return this[_0x49c8('0xc6')]&&this['_scene'][_0x49c8('0x1')]===Scene_Battle;},SceneManager[_0x49c8('0x1b')]=function(){return this[_0x49c8('0xc6')]instanceof Scene_Map;},Game_Temp['prototype']['setLastPluginCommandInterpreter']=function(_0x20bbc2){this[_0x49c8('0xe7')]=_0x20bbc2;},Game_Temp[_0x49c8('0x3')][_0x49c8('0x47')]=function(){return this['_lastPluginCommandInterpreter'];},VisuMZ[_0x49c8('0x1a')][_0x49c8('0x56')]=Game_Interpreter['prototype'][_0x49c8('0x26')],Game_Interpreter['prototype'][_0x49c8('0x26')]=function(_0x28df6c){return $gameTemp[_0x49c8('0x114')](this),VisuMZ['GabWindow'][_0x49c8('0x56')]['call'](this,_0x28df6c);},Game_Interpreter['prototype']['waitForGab']=function(){this[_0x49c8('0x49')](_0x49c8('0x135'));},VisuMZ[_0x49c8('0x1a')][_0x49c8('0x3f')]=Game_Interpreter[_0x49c8('0x3')]['updateWaitMode'],Game_Interpreter[_0x49c8('0x3')][_0x49c8('0x78')]=function(){if(this['_waitMode']===_0x49c8('0x135'))return this[_0x49c8('0x6e')]();else{if(_0x49c8('0xb6')===_0x49c8('0xb6'))return VisuMZ[_0x49c8('0x1a')][_0x49c8('0x3f')][_0x49c8('0x129')](this);else{function _0x105233(){return this['_scene']instanceof _0x5c0e78;}}}},Game_Interpreter[_0x49c8('0x3')][_0x49c8('0x6e')]=function(){const _0x1535aa=SceneManager['_scene'],_0x14b9ea=_0x1535aa['_gabWindow'];return _0x14b9ea?_0x14b9ea[_0x49c8('0x11a')][_0x49c8('0xf')]>0x0||_0x14b9ea[_0x49c8('0x5')]:![];},Scene_Base[_0x49c8('0x3')][_0x49c8('0xee')]=function(_0x5b898d){this['_gabWindow']=new Window_Gab(_0x5b898d),this['addChild'](this[_0x49c8('0x5b')]);},Scene_Base[_0x49c8('0x3')]['startGabWindow']=function(_0x52ab5d){this[_0x49c8('0x5b')]['addGabData'](_0x52ab5d);},Scene_Base[_0x49c8('0x3')][_0x49c8('0x9d')]=function(_0x5400d2){this[_0x49c8('0x5b')][_0x49c8('0x23')](_0x5400d2);},Scene_Base[_0x49c8('0x3')][_0x49c8('0x108')]=function(){this[_0x49c8('0x5b')][_0x49c8('0x4c')]();},VisuMZ[_0x49c8('0x1a')]['Scene_Map_createAllWindows']=Scene_Map[_0x49c8('0x3')][_0x49c8('0xb4')],Scene_Map[_0x49c8('0x3')][_0x49c8('0xb4')]=function(){VisuMZ[_0x49c8('0x1a')][_0x49c8('0x106')][_0x49c8('0x129')](this),this[_0x49c8('0xee')](![]);},VisuMZ[_0x49c8('0x1a')][_0x49c8('0xf8')]=Scene_Battle[_0x49c8('0x3')][_0x49c8('0xb4')],Scene_Battle[_0x49c8('0x3')][_0x49c8('0xb4')]=function(){VisuMZ[_0x49c8('0x1a')][_0x49c8('0xf8')][_0x49c8('0x129')](this),this['createGabWindow'](!![]);},ImageManager[_0x49c8('0x12b')]=0x9,ImageManager[_0x49c8('0x21')]=0x6,Window_Base['prototype']['drawSvActor']=function(_0x3d0f3e,_0x20688b,_0x41e527){const _0x43a23c=ImageManager['loadSvActor'](_0x3d0f3e),_0x1223ca=_0x43a23c[_0x49c8('0x138')]/ImageManager[_0x49c8('0x12b')],_0x290231=_0x43a23c[_0x49c8('0x46')]/ImageManager['svActorVertCells'],_0x395709=0x0,_0x1c3942=0x0;this[_0x49c8('0x110')][_0x49c8('0xad')](_0x43a23c,_0x395709,_0x1c3942,_0x1223ca,_0x290231,_0x20688b-_0x1223ca/0x2,_0x41e527-_0x290231);};function Window_Gab(){this[_0x49c8('0x6d')](...arguments);}Window_Gab[_0x49c8('0x3')]=Object[_0x49c8('0x14')](Window_Base[_0x49c8('0x3')]),Window_Gab[_0x49c8('0x3')][_0x49c8('0x1')]=Window_Gab,Window_Gab[_0x49c8('0x3')][_0x49c8('0x6d')]=function(_0x2173f6){this[_0x49c8('0x30')](_0x2173f6);const _0x483f2c=this['createRect'](_0x2173f6);Window_Base[_0x49c8('0x3')][_0x49c8('0x6d')]['call'](this,_0x483f2c),this[_0x49c8('0xaf')](),this[_0x49c8('0xe6')]();},Window_Gab[_0x49c8('0x3')][_0x49c8('0x30')]=function(_0xc256cd){this[_0x49c8('0x10d')]=_0xc256cd,this[_0x49c8('0xfd')]=0x0,this['_showCount']=0x0,this[_0x49c8('0xa6')]=!![],this[_0x49c8('0x11a')]=[],this[_0x49c8('0x2')]=[],this[_0x49c8('0x5')]=![];},Window_Gab[_0x49c8('0x3')]['createRect']=function(_0x300960){let _0x380e4d=this[_0x49c8('0x2c')]*-0x1,_0x3a764b=0x0;const _0x110b39=VisuMZ[_0x49c8('0x1a')][_0x49c8('0x9f')];if(_0x300960){if(_0x49c8('0xc4')===_0x49c8('0x63')){function _0x1ac7cf(){this['contents'][_0x49c8('0xe6')](),this[_0x49c8('0x19')](),this['adjustDimensions'](),this['reposition'](),this[_0x49c8('0x126')](),this['drawGabGraphic'](),this[_0x49c8('0xae')](),this[_0x49c8('0x119')](),this[_0x49c8('0xaa')](),this[_0x49c8('0xe6')]();}}else _0x3a764b=_0x110b39[_0x49c8('0x132')][_0x49c8('0x3a')];}else _0x3a764b=_0x110b39[_0x49c8('0x7c')][_0x49c8('0x2f')];_0x3a764b-=this['padding'];let _0x2b0a86=Graphics[_0x49c8('0xa7')]+this[_0x49c8('0x2c')]*0x2,_0x2f0b02=this[_0x49c8('0x121')](0x2);return new Rectangle(_0x380e4d,_0x3a764b,_0x2b0a86,_0x2f0b02);},Window_Gab[_0x49c8('0x3')][_0x49c8('0xe6')]=function(){this[_0x49c8('0x12f')]=![],this['_graphicLoading']=![],this[_0x49c8('0x1c')]=0x0,this[_0x49c8('0x87')]=0x0,this[_0x49c8('0x4')]='',this[_0x49c8('0xf0')]=_0x49c8('0xc1'),this[_0x49c8('0x2d')]='',this['_graphicIndex']=0x0,this['_soundName']='',delete this[_0x49c8('0x3d')],delete this[_0x49c8('0x107')],delete this[_0x49c8('0x59')],delete this[_0x49c8('0x18')],delete this[_0x49c8('0x10a')],delete this[_0x49c8('0xbe')],delete this[_0x49c8('0x6c')],delete this[_0x49c8('0x74')],delete this[_0x49c8('0x55')],delete this[_0x49c8('0x7b')];},Window_Gab['prototype']['resetFontSettings']=function(){const _0x24370d=VisuMZ[_0x49c8('0x1a')][_0x49c8('0x9f')];this[_0x49c8('0x110')][_0x49c8('0xe0')]=this[_0x49c8('0x107')]||_0x24370d[_0x49c8('0x7f')][_0x49c8('0x11d')]||$gameSystem[_0x49c8('0x44')](),this['contents'][_0x49c8('0x115')]=this[_0x49c8('0x59')]||_0x24370d[_0x49c8('0x7f')][_0x49c8('0xc8')]||0x1c,this[_0x49c8('0x31')]();},Window_Gab['prototype']['update']=function(){Window_Base[_0x49c8('0x3')]['update'][_0x49c8('0x129')](this);if(this[_0x49c8('0x87')]>0x0){if(this[_0x49c8('0xe')])this[_0x49c8('0x6a')]();}if(this['isHideGabWindow']()){if(_0x49c8('0x12c')!==_0x49c8('0x12c')){function _0x5e08d5(){this[_0x49c8('0xe')]=null,this[_0x49c8('0x45')](),this[_0x49c8('0x9b')]();}}else this[_0x49c8('0x4a')]();}else{if(this[_0x49c8('0x12f')]){if(_0x49c8('0x61')!==_0x49c8('0x61')){function _0xd4f62(){_0x53eccd[_0x49c8('0x32')]=_0x49c8('0xc1');}}else{if(this[_0x49c8('0xdb')]&&this['_graphicBitmap'][_0x49c8('0x138')]<=0x0)return;this['refresh']();}}else{if(this[_0x49c8('0x11e')]>0x0){if(_0x49c8('0xa8')===_0x49c8('0x79')){function _0x334b9d(){_0x510b76[_0x49c8('0x32')]='none';}}else this[_0x49c8('0xc9')](),--this[_0x49c8('0x11e')];}else{if(this['contentsOpacity']>0x0){if('rOGvx'!=='rOGvx'){function _0x4378ed(){if(!_0x470be8['isSceneMap']())return![];if(this[_0x49c8('0x70')]>0x0&&!!_0x4e93ac[_0x49c8('0x113')](this[_0x49c8('0x70')]))return this[_0x49c8('0xe')]=_0xe76a73['event'](this[_0x49c8('0x70')]),!![];return![];}}else this[_0x49c8('0x17')]();}else{if(this[_0x49c8('0x11a')][_0x49c8('0xf')]>0x0)this[_0x49c8('0x1e')]();else{if('AmrNp'!==_0x49c8('0xf2')){function _0x2323b7(){if(_0x25f1af[_0x49c8('0xf4')]())return this[_0x49c8('0x86')]();else{if(_0x80903c['isSceneMap']())return this[_0x49c8('0xd1')]();}}}else this[_0x49c8('0x5')]=![],delete this[_0x49c8('0x70')];}}}}}},Window_Gab[_0x49c8('0x3')]['isHideGabWindow']=function(){if($gameParty[_0x49c8('0x67')]()&&BattleManager['_victoryPhase'])return!![];return![];},Window_Gab['prototype'][_0x49c8('0xc9')]=function(){this[_0x49c8('0x87')]+=this['_fadeRateOverride']||VisuMZ[_0x49c8('0x1a')][_0x49c8('0x9f')][_0x49c8('0x7f')]['FadeRate'];},Window_Gab[_0x49c8('0x3')][_0x49c8('0x17')]=function(){const _0x1e7f1f=this['_fadeRateOverride']||VisuMZ['GabWindow']['Settings'][_0x49c8('0x7f')][_0x49c8('0x10c')],_0x5e3fa=this[_0x49c8('0x136')]||VisuMZ['GabWindow'][_0x49c8('0x9f')][_0x49c8('0x7f')]['FadeDirection'],_0x3abf77=this[_0x49c8('0x87')];this[_0x49c8('0x87')]-=_0x1e7f1f;switch(_0x5e3fa[_0x49c8('0xcf')]()[_0x49c8('0x71')]()){case'UP':this['y']-=_0x1e7f1f;break;case'DOWN':this['y']+=_0x1e7f1f;break;case _0x49c8('0xeb'):this['x']-=_0x1e7f1f;break;case _0x49c8('0x16'):this['x']+=_0x1e7f1f;break;}if(this[_0x49c8('0x87')]>0x0)return;if(_0x3abf77>0x0)this[_0x49c8('0x51')]();},Window_Gab[_0x49c8('0x3')]['onFinish']=function(){this[_0x49c8('0xe')]=null,this['turnOnGabSwitch'](),this['onFinishJS']();},Window_Gab['prototype'][_0x49c8('0x45')]=function(){$gameSwitches[_0x49c8('0x112')](this[_0x49c8('0xfd')],!![]),this[_0x49c8('0xfd')]=0x0;},Window_Gab[_0x49c8('0x3')][_0x49c8('0x9b')]=function(){if(this['_jsOnFinish'])this[_0x49c8('0x2a')]['call'](this);delete this[_0x49c8('0x2a')];const _0x5987ef=VisuMZ[_0x49c8('0x1a')][_0x49c8('0x9f')][_0x49c8('0x7f')];if(_0x5987ef[_0x49c8('0xea')])_0x5987ef[_0x49c8('0xea')][_0x49c8('0x129')](this,this[_0x49c8('0x2')]);},Window_Gab['prototype'][_0x49c8('0x7d')]=function(_0x1e0fc1){if(!_0x1e0fc1)return;if(this['checkDuplicateGab'](_0x1e0fc1))return;this[_0x49c8('0x11a')][_0x49c8('0x8e')](_0x1e0fc1);},Window_Gab[_0x49c8('0x3')][_0x49c8('0x23')]=function(_0x3ff95c){if(!_0x3ff95c)return;this[_0x49c8('0x4c')](),this[_0x49c8('0x11a')][_0x49c8('0x8e')](_0x3ff95c);},Window_Gab[_0x49c8('0x3')][_0x49c8('0x4c')]=function(){this[_0x49c8('0x11a')]=[],this[_0x49c8('0x2')]=[],this['_showCount']=0x0;},Window_Gab[_0x49c8('0x3')][_0x49c8('0x10f')]=function(_0x46537a){if(!VisuMZ[_0x49c8('0x1a')][_0x49c8('0x9f')][_0x49c8('0x7f')][_0x49c8('0x20')])return![];const _0x407c45=_0x46537a[_0x49c8('0x15')];if(_0x407c45&&_0x407c45['BypassAntiRepeat'])return![];if(this[_0x49c8('0x8')](_0x46537a))return!![];if(this[_0x49c8('0x4e')](_0x46537a))return!![];return![];},Window_Gab[_0x49c8('0x3')]['checkCurrentGab']=function(_0x282489){return JSON['stringify'](this[_0x49c8('0x2')])===JSON[_0x49c8('0xa2')](_0x282489);},Window_Gab['prototype'][_0x49c8('0x4e')]=function(_0x2a2e43){this[_0x49c8('0x11a')]=this['_gabQueue']||[];for(const _0x388a59 of this['_gabQueue']){const _0x153857=this[_0x49c8('0x11a')][this[_0x49c8('0x11a')][_0x49c8('0xf')]-0x1]||{};if(JSON[_0x49c8('0xa2')](_0x153857)===JSON[_0x49c8('0xa2')](_0x2a2e43))return!![];}return![];},Window_Gab[_0x49c8('0x3')][_0x49c8('0x1e')]=function(){const _0x4d9fa4=this[_0x49c8('0x11a')]['shift']();this['_gabRunning']=!![],this[_0x49c8('0x2')]=_0x4d9fa4,this[_0x49c8('0xb2')](_0x4d9fa4),this[_0x49c8('0x2b')](),this['_gabLoaded']=!![];},Window_Gab[_0x49c8('0x3')][_0x49c8('0xb2')]=function(_0x461d89){this[_0x49c8('0x4')]=_0x461d89[_0x49c8('0x34')]||'',this[_0x49c8('0xba')]=this[_0x49c8('0x4')][_0x49c8('0xfb')](/[\r\n]+/)[_0x49c8('0xf')],this[_0x49c8('0xf0')]=_0x461d89[_0x49c8('0x32')]||_0x49c8('0xc1'),this[_0x49c8('0x2d')]=_0x461d89[_0x49c8('0xa0')]||'',this[_0x49c8('0x22')]=_0x461d89['ID']||0x0,this[_0x49c8('0x11b')]=_0x461d89[_0x49c8('0xbd')]||![];const _0x6939cf=_0x461d89['Override']||{};this[_0x49c8('0xbc')]=_0x6939cf['SoundFilename']||'',this[_0x49c8('0x7b')]=_0x6939cf['OnDisplayJS']||null,this[_0x49c8('0xfd')]=_0x6939cf[_0x49c8('0xb5')]||0x0,this[_0x49c8('0x2a')]=_0x6939cf[_0x49c8('0xea')]||null,this[_0x49c8('0x107')]=_0x6939cf['FontName'],this[_0x49c8('0x59')]=_0x6939cf[_0x49c8('0xf6')],this[_0x49c8('0x18')]=_0x6939cf['WaitTime'],this[_0x49c8('0x10a')]=_0x6939cf[_0x49c8('0x62')],this[_0x49c8('0x52')]=_0x6939cf[_0x49c8('0x10c')],this[_0x49c8('0x136')]=_0x6939cf[_0x49c8('0x60')],this[_0x49c8('0xbe')]=_0x6939cf['YLocation'],this[_0x49c8('0x99')]=_0x6939cf[_0x49c8('0x41')],this['_dimColor1Override']=_0x6939cf[_0x49c8('0x98')],this[_0x49c8('0x55')]=_0x6939cf[_0x49c8('0x134')],this[_0x49c8('0xc2')]=_0x6939cf[_0x49c8('0x2e')];if(_0x6939cf['PartyIndex']!==undefined&&_0x6939cf[_0x49c8('0xd7')]>=0x0){if(_0x49c8('0x5d')!==_0x49c8('0x5d')){function _0x4a733f(){const _0x358e0f=_0x1fcd9a[_0x49c8('0xc6')],_0x3922db=_0x358e0f[_0x49c8('0x5b')];return _0x3922db?_0x3922db[_0x49c8('0x11a')][_0x49c8('0xf')]>0x0||_0x3922db[_0x49c8('0x5')]:![];}}else{const _0x4ed0a7=_0x6939cf[_0x49c8('0xd7')],_0x490b1b=$gameParty[_0x49c8('0x11c')]()[_0x4ed0a7];if(_0x490b1b)this[_0x49c8('0xc2')]=_0x490b1b[_0x49c8('0xde')]();}}this[_0x49c8('0x70')]=_0x6939cf[_0x49c8('0xfe')],this[_0x49c8('0x39')]=-0x1,_0x6939cf[_0x49c8('0xed')]!==undefined&&_0x6939cf[_0x49c8('0xed')]>=0x0&&(this['_enemyIndex']=_0x6939cf[_0x49c8('0xed')]);},Window_Gab[_0x49c8('0x3')][_0x49c8('0x2b')]=function(){this[_0x49c8('0xdb')]=![];const _0x31cf39=this[_0x49c8('0x2d')];this['_graphicLoading']=!![];switch(this[_0x49c8('0xf0')][_0x49c8('0xe2')]()['trim']()){case _0x49c8('0x125'):this[_0x49c8('0x3d')]=ImageManager[_0x49c8('0x1d')](_0x31cf39);break;case _0x49c8('0x128'):this[_0x49c8('0x3d')]=ImageManager['loadFace'](_0x31cf39);break;case _0x49c8('0x89'):this[_0x49c8('0x3d')]=ImageManager[_0x49c8('0xb0')](_0x31cf39);break;case _0x49c8('0x97'):this[_0x49c8('0x3d')]=ImageManager['loadPicture'](_0x31cf39);break;default:this[_0x49c8('0xdb')]=![];break;}},Window_Gab[_0x49c8('0x3')][_0x49c8('0x13')]=function(){this['contents'][_0x49c8('0xe6')](),this[_0x49c8('0x19')](),this[_0x49c8('0xa9')](),this['reposition'](),this[_0x49c8('0x126')](),this[_0x49c8('0x28')](),this['drawGabText'](),this[_0x49c8('0x119')](),this[_0x49c8('0xaa')](),this['clear']();},Window_Gab[_0x49c8('0x3')][_0x49c8('0x19')]=function(){this[_0x49c8('0xe')]=null;if(this[_0x49c8('0x102')]()){if(_0x49c8('0x8d')!==_0x49c8('0x90'))return!![];else{function _0x3219c4(){this[_0x49c8('0xe')]=null;if(this[_0x49c8('0x102')]())return!![];else{if(this[_0x49c8('0xef')]())return!![];else{if(this[_0x49c8('0xe9')]())return!![];}}return![];}}}else{if(this[_0x49c8('0xef')]()){if(_0x49c8('0x111')===_0x49c8('0xcd')){function _0x38f6e6(){if(!_0x1bd579)return;if(this['checkDuplicateGab'](_0x4bef56))return;this[_0x49c8('0x11a')][_0x49c8('0x8e')](_0x4b20f6);}}else return!![];}else{if(this[_0x49c8('0xe9')]()){if('QmIAo'===_0x49c8('0xdc')){function _0x56bc23(){_0x159949[_0x49c8('0x9d')](_0x2ccf91);}}else return!![];}}}return![];},Window_Gab[_0x49c8('0x3')]['isRepositionToActor']=function(){if(this['_actorID']<=0x0)return![];const _0x56aebf=$gameActors[_0x49c8('0x81')](this[_0x49c8('0xc2')]);if(!_0x56aebf)return![];if(!_0x56aebf[_0x49c8('0x10')]())return![];if(SceneManager[_0x49c8('0xf4')]()){if(_0x49c8('0x54')===_0x49c8('0x73')){function _0x16c57c(){_0x413ed6[_0x49c8('0xce')](_0x304cc2);}}else return $gameSystem[_0x49c8('0xbb')]()&&_0x56aebf[_0x49c8('0x68')]()&&(this[_0x49c8('0xe')]=_0x56aebf),!![];}else{if(SceneManager['isSceneMap']()){if(_0x49c8('0x118')===_0x49c8('0x118')){if(_0x56aebf[_0x49c8('0xc3')]()===0x0)return this[_0x49c8('0xe')]=$gamePlayer,!![];if($gamePlayer[_0x49c8('0xff')]()['isVisible']()){if(_0x49c8('0x137')!==_0x49c8('0x137')){function _0x1e78a1(){this[_0x49c8('0x30')](_0x572d01);const _0x310792=this[_0x49c8('0xfa')](_0xfb387a);_0x3348a8[_0x49c8('0x3')][_0x49c8('0x6d')][_0x49c8('0x129')](this,_0x310792),this[_0x49c8('0xaf')](),this[_0x49c8('0xe6')]();}}else return this[_0x49c8('0xe')]=$gamePlayer['followers']()[_0x49c8('0xd3')](_0x56aebf[_0x49c8('0xc3')]()-0x1),!![];}}else{function _0x200e58(){return this[_0x49c8('0x74')]||_0x17f5c9[_0x49c8('0x1a')]['Settings']['Battle'][_0x49c8('0x9a')];}}}}return![];},Window_Gab[_0x49c8('0x3')]['isRepositionToMapEvent']=function(){if(!SceneManager[_0x49c8('0x1b')]())return![];if(this[_0x49c8('0x70')]>0x0&&!!$gameMap['event'](this[_0x49c8('0x70')]))return this[_0x49c8('0xe')]=$gameMap[_0x49c8('0x113')](this[_0x49c8('0x70')]),!![];return![];},Window_Gab[_0x49c8('0x3')]['isRepositionToBattleEnemy']=function(){if(!SceneManager[_0x49c8('0xf4')]())return![];if(this[_0x49c8('0x39')]>=0x0){if(_0x49c8('0x9c')===_0x49c8('0x9c')){const _0x423e43=$gameTroop['members']()[this['_enemyIndex']];if(_0x423e43&&_0x423e43['isAppeared']())return this[_0x49c8('0xe')]=_0x423e43,!![];}else{function _0x5e91ec(){return this[_0x49c8('0x82')]===_0x49c8('0x135')?this[_0x49c8('0x6e')]():_0x2200ab[_0x49c8('0x1a')][_0x49c8('0x3f')][_0x49c8('0x129')](this);}}}return![];},Window_Gab[_0x49c8('0x3')][_0x49c8('0xa9')]=function(){const _0x2b6a3f=VisuMZ[_0x49c8('0x1a')][_0x49c8('0x9f')];let _0x28e924=Graphics['boxWidth']+this['padding']*0x2;this[_0x49c8('0x138')]=this['adjustWidth'](_0x28e924);let _0x1267ad=this['fittingHeight'](this[_0x49c8('0xba')]+0x1);this['height']=_0x1267ad,this['createContents']();},Window_Gab[_0x49c8('0x3')][_0x49c8('0x93')]=function(_0x24ff0e){if(this[_0x49c8('0xe')]){if(_0x49c8('0xab')==='oznCf'){_0x24ff0e=this[_0x49c8('0xa1')](this[_0x49c8('0x4')])[_0x49c8('0x138')],_0x24ff0e+=this['padding']*0x2,_0x24ff0e+=this[_0x49c8('0x80')]()*0x4;switch(this[_0x49c8('0xf0')][_0x49c8('0xe2')]()[_0x49c8('0x71')]()){case _0x49c8('0x125'):_0x24ff0e+=settings[_0x49c8('0x7f')][_0x49c8('0x7e')]*0x2,_0x24ff0e-=this[_0x49c8('0x80')]()*0x2;break;case _0x49c8('0x128'):_0x24ff0e+=ImageManager[_0x49c8('0xbf')];break;case _0x49c8('0x89'):_0x24ff0e+=settings[_0x49c8('0x7f')]['SvActorXPos']*0x2,_0x24ff0e-=this[_0x49c8('0x80')]()*0x2;break;case _0x49c8('0x97'):let _0x165fda=this[_0x49c8('0x3d')]?this[_0x49c8('0x3d')][_0x49c8('0x138')]:0x0;if(this[_0x49c8('0x11b')]){if(_0x49c8('0x38')!==_0x49c8('0x38')){function _0x11af6c(){if(!_0x16b0db[_0x49c8('0x1a')][_0x49c8('0x9f')][_0x49c8('0x7f')]['AntiRepeat'])return![];const _0x5d9c3b=_0x3d41a1[_0x49c8('0x15')];if(_0x5d9c3b&&_0x5d9c3b['BypassAntiRepeat'])return![];if(this[_0x49c8('0x8')](_0x192cc8))return!![];if(this[_0x49c8('0x4e')](_0x1fcccb))return!![];return![];}}else _0x165fda*=this['getPictureScale']();}_0x24ff0e+=Math[_0x49c8('0xe8')](_0x165fda);break;}}else{function _0x9bc137(){if(this[_0x49c8('0xbc')]==='')return;const _0x5038cb={'name':this[_0x49c8('0xbc')],'volume':0x5a,'pitch':0x64,'pan':0x0};_0x248900[_0x49c8('0x4f')](_0x5038cb);}}}return _0x24ff0e;},Window_Gab['prototype'][_0x49c8('0x6a')]=function(){if(this[_0x49c8('0xe')]){if(SceneManager[_0x49c8('0xf4')]())return this[_0x49c8('0x86')]();else{if(SceneManager[_0x49c8('0x1b')]())return this[_0x49c8('0xd1')]();}}this['repositionNormal']();},Window_Gab[_0x49c8('0x3')][_0x49c8('0x86')]=function(){const _0x5da2ad=SceneManager[_0x49c8('0xc6')];if(!_0x5da2ad)return;const _0xd7b103=_0x5da2ad[_0x49c8('0xe4')];if(!_0xd7b103)return;const _0x11f3f3=_0xd7b103[_0x49c8('0x131')](this[_0x49c8('0xe')]),_0x2b7057=_0x11f3f3[_0x49c8('0x3c')]()||_0x11f3f3;let _0x523982=_0x11f3f3['x'],_0x3856f6=_0x11f3f3['y']-_0x2b7057[_0x49c8('0x46')];_0x523982+=Math[_0x49c8('0xe8')]((Graphics[_0x49c8('0x138')]-Graphics[_0x49c8('0xa7')])/0x2),_0x3856f6+=Math['ceil']((Graphics[_0x49c8('0x46')]-Graphics[_0x49c8('0x77')])/0x2)+this['lineHeight']()/0x2,this[_0x49c8('0x94')](_0x523982,_0x3856f6);},Window_Gab['prototype']['repositionToMapTarget']=function(){const _0x375cfe=this[_0x49c8('0xe')];this[_0x49c8('0x94')](_0x375cfe[_0x49c8('0x116')](),_0x375cfe[_0x49c8('0xe1')]());},Window_Gab[_0x49c8('0x3')][_0x49c8('0x65')]=function(){let _0x1e6aba=$gameMap['event'](this[_0x49c8('0x70')]);this[_0x49c8('0x94')](_0x1e6aba[_0x49c8('0x116')](),_0x1e6aba[_0x49c8('0xe1')]());},Window_Gab[_0x49c8('0x3')][_0x49c8('0x94')]=function(_0x20f371,_0x5a8f35){let _0x127319=_0x20f371-this['width']/0x2,_0x29a008=_0x5a8f35-this['height']-0x20;this['x']=_0x127319,this['y']=_0x29a008;},Window_Gab['prototype'][_0x49c8('0x133')]=function(){let _0x36403c=this['padding']*-0x1,_0x43c0a1=0x0;this[_0x49c8('0x10d')]?_0x43c0a1=VisuMZ['GabWindow'][_0x49c8('0x9f')][_0x49c8('0x132')][_0x49c8('0x3a')]:_0x43c0a1=VisuMZ[_0x49c8('0x1a')]['Settings'][_0x49c8('0x7c')][_0x49c8('0x2f')],_0x43c0a1-=this[_0x49c8('0x2c')],_0x43c0a1=this[_0x49c8('0xbe')]||_0x43c0a1,this['x']=_0x36403c,this['y']=_0x43c0a1,this[_0x49c8('0xe')]=null;},Window_Gab['prototype'][_0x49c8('0x119')]=function(){const _0x27fa25=VisuMZ[_0x49c8('0x1a')][_0x49c8('0x9f')];this[_0x49c8('0xdb')]=![],this[_0x49c8('0x87')]=0xff,this[_0x49c8('0x11e')]=this[_0x49c8('0x18')]||_0x27fa25['General'][_0x49c8('0x6')]||0x0;const _0x4fa964=this[_0x49c8('0x4')]['replace'](/\\(.*?)\[(.*?)\]/gi,'');this[_0x49c8('0x11e')]+=_0x4fa964[_0x49c8('0xf')]*(this[_0x49c8('0x10a')]||_0x27fa25['General'][_0x49c8('0x62')]||0x0);},Window_Gab[_0x49c8('0x3')][_0x49c8('0x126')]=function(){const _0xc49143=this[_0x49c8('0xdd')]();this[_0x49c8('0x91')](0x0,0x0,_0xc49143,this[_0x49c8('0x12d')]);},Window_Gab[_0x49c8('0x3')][_0x49c8('0xdf')]=function(){if($gameParty['inBattle']())return this['_dimColor1Override']||VisuMZ['GabWindow']['Settings'][_0x49c8('0x132')]['BattleDimColor1'];else{if(_0x49c8('0x0')===_0x49c8('0x0'))return this[_0x49c8('0x74')]||VisuMZ[_0x49c8('0x1a')][_0x49c8('0x9f')][_0x49c8('0x7c')][_0x49c8('0xcb')];else{function _0x27e589(){this[_0x49c8('0x11a')]=_0x1dd6f4[_0x49c8('0x53')],delete _0x289dda[_0x49c8('0x53')];}}}},Window_Gab[_0x49c8('0x3')][_0x49c8('0x50')]=function(){if($gameParty[_0x49c8('0x67')]()){if(_0x49c8('0x72')!==_0x49c8('0x72')){function _0x2e7354(){const _0x3fd738=this[_0x49c8('0xdf')](),_0x3f47b7=this[_0x49c8('0xe')]?this['dimColor1']():this[_0x49c8('0x50')](),_0x5326ca=_0x5e530f['ceil'](_0x2ef277*0.25),_0x480423=_0x5c2c25['ceil'](_0x2e20e5*0.75);this['contents'][_0x49c8('0x117')](_0x4a3ad5,_0x3dbf3e,_0x5326ca,_0x23a608,_0x3fd738,_0x3fd738),this['contents'][_0x49c8('0x117')](_0x5326ca,_0xe0c4ae,_0x480423,_0x1dacb5,_0x3fd738,_0x3f47b7);}}else return this[_0x49c8('0x55')]||VisuMZ[_0x49c8('0x1a')][_0x49c8('0x9f')]['Battle'][_0x49c8('0x101')];}else return this[_0x49c8('0x55')]||VisuMZ[_0x49c8('0x1a')][_0x49c8('0x9f')]['Map'][_0x49c8('0xd')];},Window_Gab[_0x49c8('0x3')]['drawBackground']=function(_0xef6921,_0x26cad5,_0x4d8ef4,_0x35ce82){const _0x58d3d8=this[_0x49c8('0xdf')](),_0x1fafe4=this[_0x49c8('0xe')]?this[_0x49c8('0xdf')]():this[_0x49c8('0x50')](),_0xe69345=Math[_0x49c8('0xe8')](_0x4d8ef4*0.25),_0x1f1a00=Math[_0x49c8('0xe8')](_0x4d8ef4*0.75);this[_0x49c8('0x110')][_0x49c8('0x117')](_0xef6921,_0x26cad5,_0xe69345,_0x35ce82,_0x58d3d8,_0x58d3d8),this[_0x49c8('0x110')][_0x49c8('0x117')](_0xe69345,_0x26cad5,_0x1f1a00,_0x35ce82,_0x58d3d8,_0x1fafe4);},Window_Gab[_0x49c8('0x3')][_0x49c8('0x28')]=function(){if(this[_0x49c8('0x2d')]==='')return;switch(this[_0x49c8('0xf0')][_0x49c8('0xe2')]()['trim']()){case'face':this[_0x49c8('0xac')]();break;case'character':this['drawGabCharacter']();break;case _0x49c8('0x89'):this[_0x49c8('0x76')]();break;case'picture':this[_0x49c8('0x8b')]();break;}},Window_Gab[_0x49c8('0x3')][_0x49c8('0xac')]=function(){const _0x5e5ebe=VisuMZ[_0x49c8('0x1a')][_0x49c8('0x9f')]['General'],_0x5cdbf1=0x0;let _0x1d8fc0=0x0;const _0x33f4ad=ImageManager[_0x49c8('0xbf')];let _0x10f367=this[_0x49c8('0x12d')];if(!_0x5e5ebe[_0x49c8('0x130')]){_0x10f367=Math['min'](this[_0x49c8('0x12d')],ImageManager[_0x49c8('0x105')]);if(this[_0x49c8('0x12d')]>_0x10f367)_0x1d8fc0=this[_0x49c8('0x122')]()/0x2;}this['drawFace'](this[_0x49c8('0x2d')],this['_graphicIndex'],_0x5cdbf1,_0x1d8fc0,_0x33f4ad,_0x10f367);},Window_Gab[_0x49c8('0x3')][_0x49c8('0x8f')]=function(){const _0x3fba5a=VisuMZ[_0x49c8('0x1a')][_0x49c8('0x9f')][_0x49c8('0x7f')],_0x28d6ba=_0x3fba5a[_0x49c8('0x7e')];let _0x483e51=_0x3fba5a[_0x49c8('0x33')];_0x3fba5a[_0x49c8('0x130')]&&(_0x483e51+=(this[_0x49c8('0xba')]-0x1)*this[_0x49c8('0x122')]()/0x2),this[_0x49c8('0xd6')](this[_0x49c8('0x2d')],this[_0x49c8('0x22')],_0x28d6ba,_0x483e51);},Window_Gab['prototype'][_0x49c8('0x76')]=function(){const _0x4794c9=VisuMZ[_0x49c8('0x1a')][_0x49c8('0x9f')][_0x49c8('0x7f')],_0x27a6d0=_0x4794c9[_0x49c8('0xa')];let _0x25cbca=_0x4794c9[_0x49c8('0x12')];_0x4794c9[_0x49c8('0x130')]&&(_0x25cbca+=(this[_0x49c8('0xba')]-0x1)*this[_0x49c8('0x122')]()/0x2),this[_0x49c8('0x120')](this[_0x49c8('0x2d')],_0x27a6d0,_0x25cbca);},Window_Gab[_0x49c8('0x3')]['drawGabPicture']=function(){if(!this[_0x49c8('0x3d')])return;let _0x129ffb=this[_0x49c8('0x109')]();const _0x1349a7=Math[_0x49c8('0xe8')](this[_0x49c8('0x3d')][_0x49c8('0x138')]*_0x129ffb),_0x398170=Math['ceil'](this['_graphicBitmap'][_0x49c8('0x46')]*_0x129ffb);let _0x4ee3e6=0x0,_0x3e5651=0x0;const _0x365550=this[_0x49c8('0x3d')];this[_0x49c8('0x110')][_0x49c8('0xad')](_0x365550,0x0,0x0,_0x365550[_0x49c8('0x138')],_0x365550['height'],_0x4ee3e6,_0x3e5651,_0x1349a7,_0x398170);},Window_Gab['prototype'][_0x49c8('0x109')]=function(){if(!this[_0x49c8('0x3d')])return 0x1;if(this[_0x49c8('0x11b')]){if(_0x49c8('0x8a')===_0x49c8('0x10e')){function _0x5a83de(){_0x11ad92[_0x49c8('0xce')](_0x3ffed0);}}else return Math['min'](this[_0x49c8('0xc0')]/this[_0x49c8('0x3d')][_0x49c8('0x138')],this[_0x49c8('0x12d')]/this[_0x49c8('0x3d')][_0x49c8('0x46')]);}else return 0x1;},Window_Gab[_0x49c8('0x3')]['drawGabText']=function(){const _0x58e7d9=VisuMZ['GabWindow'][_0x49c8('0x9f')];let _0x1d19dc=this[_0x49c8('0x80')]()*0x2;switch(this[_0x49c8('0xf0')][_0x49c8('0xe2')]()[_0x49c8('0x71')]()){case'face':_0x1d19dc+=ImageManager['faceWidth'];break;case _0x49c8('0x125'):_0x1d19dc+=_0x58e7d9['General'][_0x49c8('0x7e')]*0x2,_0x1d19dc-=this[_0x49c8('0x80')]()*0x2;break;case _0x49c8('0x89'):_0x1d19dc+=_0x58e7d9[_0x49c8('0x7f')][_0x49c8('0xa')]*0x2,_0x1d19dc-=this[_0x49c8('0x80')]()*0x2;break;case _0x49c8('0x97'):let _0x42f456=this[_0x49c8('0x3d')]?this[_0x49c8('0x3d')][_0x49c8('0x138')]:0x0;_0x42f456*=this['getPictureScale'](),_0x1d19dc+=Math[_0x49c8('0xe8')](_0x42f456);break;}const _0xe0fd2=this['lineHeight']()/0x2;this['drawTextEx'](this[_0x49c8('0x4')],_0x1d19dc,_0xe0fd2);},Window_Gab[_0x49c8('0x3')][_0x49c8('0xaa')]=function(){this['playSound'](),this['onDisplayJS']();},Window_Gab[_0x49c8('0x3')][_0x49c8('0x27')]=function(){if(this[_0x49c8('0xbc')]==='')return;const _0x5bcc59={'name':this[_0x49c8('0xbc')],'volume':0x5a,'pitch':0x64,'pan':0x0};AudioManager['playSe'](_0x5bcc59);},Window_Gab[_0x49c8('0x3')][_0x49c8('0x58')]=function(){if(this[_0x49c8('0x7b')])this['_jsOnDisplay'][_0x49c8('0x129')](this);const _0x59525c=VisuMZ['GabWindow']['Settings'][_0x49c8('0x7f')];if(_0x59525c['OnDisplayJS'])_0x59525c[_0x49c8('0x42')]['call'](this,this[_0x49c8('0x2')]);},Window_Gab[_0x49c8('0x3')]['storeGabs']=function(){if(this[_0x49c8('0x10d')]){if(_0x49c8('0xf3')===_0x49c8('0x69')){function _0xea0134(){const _0x5df5d0=_0x920f6b[_0x49c8('0x1a')][_0x49c8('0x9f')];let _0x507412=_0x307666[_0x49c8('0xa7')]+this[_0x49c8('0x2c')]*0x2;this[_0x49c8('0x138')]=this[_0x49c8('0x93')](_0x507412);let _0x29ac44=this[_0x49c8('0x121')](this[_0x49c8('0xba')]+0x1);this[_0x49c8('0x46')]=_0x29ac44,this['createContents']();}}else $gameTemp[_0x49c8('0x53')]=this['_gabQueue'][_0x49c8('0xb1')](),$gameTemp[_0x49c8('0xc5')]=this[_0x49c8('0x87')]>0x0?this['_currentGab']:{};}else $gameTemp[_0x49c8('0x104')]=this[_0x49c8('0x11a')][_0x49c8('0xb1')](),$gameTemp[_0x49c8('0x4b')]=this[_0x49c8('0x87')]>0x0?this[_0x49c8('0x2')]:{};},Window_Gab[_0x49c8('0x3')][_0x49c8('0xaf')]=function(){if(this['_battle']){if($gameTemp['_storedBattleGabs']){if(_0x49c8('0xd9')==='YPSFi')this[_0x49c8('0x11a')]=$gameTemp[_0x49c8('0x53')],delete $gameTemp[_0x49c8('0x53')];else{function _0x5a66ba(){return this[_0x49c8('0x55')]||_0x3b7927[_0x49c8('0x1a')][_0x49c8('0x9f')][_0x49c8('0x7c')][_0x49c8('0xd')];}}}$gameTemp[_0x49c8('0xc5')]&&$gameTemp[_0x49c8('0xc5')][_0x49c8('0xf')]>0x0&&(this['_gabQueue'][_0x49c8('0xf7')]($gameTemp[_0x49c8('0xc5')]),delete $gameTemp['_currentBattleGab']);}else{if($gameTemp['_storedMapGabs']){if(_0x49c8('0x48')==='UMUqn')this[_0x49c8('0x11a')]=$gameTemp[_0x49c8('0x104')],delete $gameTemp[_0x49c8('0x104')];else{function _0x4066a8(){const _0x517144=_0x488202(_0x5db92a['$1']);_0x517144!==_0x2efb95[_0x214fec]['version']&&(_0x51e684('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x49c8('0x29')](_0x30f27c,_0x517144)),_0x48c09f[_0x49c8('0x5a')]());}}}if($gameTemp['_currentMapGab']&&$gameTemp[_0x49c8('0x4b')][_0x49c8('0x66')]>0x0){if(_0x49c8('0x124')!=='dKKSj'){function _0xc439dd(){this[_0x49c8('0x11a')]=this[_0x49c8('0x11a')]||[];for(const _0x4ad0ca of this[_0x49c8('0x11a')]){const _0x4a6556=this[_0x49c8('0x11a')][this['_gabQueue']['length']-0x1]||{};if(_0x59b249['stringify'](_0x4a6556)===_0x3874cb[_0x49c8('0xa2')](_0x4424e0))return!![];}return![];}}else this['_gabQueue'][_0x49c8('0xf7')]($gameTemp[_0x49c8('0x4b')]),delete $gameTemp[_0x49c8('0x4b')];}}};