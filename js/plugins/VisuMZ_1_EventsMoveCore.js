//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.25;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.25] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
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
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Features: Weighted Random Movement
 * ============================================================================
 * 
 * When creating events to place on the map, you can determine what type of
 * autonomous movement the event will have. When selecting "Random", the event
 * will move randomly across the map.
 * 
 * However, with the way "Random" movement works with the RPG Maker MZ default
 * code, the event is more likely to hit a wall and then hug the said wall as
 * it maps laps around the map's outer borders making it feel very unnatural
 * for any player who's been on the map long enough.
 * 
 * This is where "Weighted Random Movement" comes in. It changes up the random
 * movement behavior to function where the farther the event is, the more
 * likely the event is to step back towards its "home" position (aka where it
 * spawned upon loading the map). This is so that a housewife NPC doesn't
 * suddenly wander off into the middle of an army's training grounds on the
 * same town map.
 * 
 * The event will stay closer to its home value depending on how high the
 * weight's value is. There are a number of ways to adjust the weighted value.
 * 
 * ---
 * 
 * Plugin Parameters > Movement > Event Movement > Random Move Weight
 * 
 * This Plugin Parameter setting allows you to set the default weight for all
 * events with "Random" autonomous movement. It is set at a default value of
 * 0.10 to give the event an understandable degree of freedom.
 * 
 * Lower numbers give events more freedom to move. Larger numbers will make the
 * events stick closer to home.
 * 
 * Change this value to 0 to disable it.
 * 
 * ---
 * 
 * You can customize this individually per event by using Notetags and/or
 * Comment Tags for the events.
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Radius: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Radius: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Blend Mode: Normal>
 * <Icon Blend Mode: Additive>
 * <Icon Blend Mode: Multiply>
 * <Icon Blend Mode: Screen>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the blend mode for the icon on the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * ---
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
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
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Activation
 * - Runs the page of a different event remotely.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change
 * - Change the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Event Timer Plugin Commands ===
 * 
 * ---
 *
 * Event Timer: Change Speed
 * - Changes the timer frame decrease (or increase) speed.
 *
 *   Speed:
 *   - How many 1/60ths of a second does each frame increase or decrease by?
 *   - Negative decreases.
 *   - Positive increases.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Expire Event Assign
 * - Sets a Common Event to run upon expiration.
 * - Bypasses the default code if one is set.
 *
 *   Common Event ID:
 *   - Select the Common Event to run upon the timer's expiration.
 *
 * ---
 *
 * Event Timer: Expire Event Clear
 * - Clears any set to expire Common Event and instead, run the default
 *   Game_Timer expiration code.
 *
 * ---
 *
 * Event Timer: Frames Gain
 * - Chooses how many frames, seconds, minutes, or hours are gained or lost for
 *   the event timer.
 *
 *   Frames:
 *   - How many 1/60ths of a second are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - How many seconds are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - How many minutes are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - How many hours are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Frames Set
 * - Chooses how many frames, seconds, minutes, or hours are set for the event
 *   timer.
 *
 *   Frames:
 *   - Set frame count to this value.
 *   - Each frame is 1/60th of a second.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - Set seconds to this value.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - Set minutes to this value.
 *   - Each minute is 60 seconds.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - Set hours to this value.
 *   - Each hour is 60 minutes.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Pause
 * - Pauses the current event timer, but does not stop it.
 *
 * ---
 *
 * Event Timer: Resume
 * - Resumes the current event timer from the paused state.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: !
 *   - Balloon: Sleep
 *   - Balloon: Heart
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events will stop moving before they make contact with the player.
 *
 * ---
 * 
 * Crash Move Lower Left Until Stop
 * Crash Move Down Until Stop
 * Crash Move Lower Right Until Stop
 * Crash Move Left Until Stop
 * Crash Move Right Until Stop
 * Crash Move Upper Left Until Stop
 * Crash Move Up Until Stop
 * Crash Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: Item
 *   - Balloon: Victory
 *   - Balloon: ?
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 * 
 * Event Movement
 * 
 *   Random Move Weight:
 *   - Use numbers between 0 and 1.
 *   - Numbers closer to 1 stay closer to their home position.
 *   - 0 to disable it.
 * 
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 * 
 * Areas marked with these regions will not allow random encounters to occur.
 * This is how RPG Maker works. Assuming you are not using plugins at all, by
 * putting on touch events all over the map, tiles with those on touch events
 * will not let random encounters trigger.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
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
 * Version 1.25: July 30, 2021
 * * Bug Fixes!
 * ** Fixed a problem that caused the 'setSelfSwitchValue' and
 *    'setSelfVariableValue' functions to not work properly. Fix made by Irina.
 * 
 * Version 1.24: June 4, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added extra clarification on which commands will go around the player
 *    character and which ones won't.
 * * New Move Route Custom Commands added by Arisu:
 * ** Crash Move (direction) Until Stop
 * ** Crash Move To: x, y
 * ** Crash Move To Event: x
 * *** These allow events to collide with the player character and trigger
 *     Event Touch events.
 * 
 * Version 1.23: May 21, 2021
 * * Bug Fixes!
 * ** Morphing by templates should no longer cause a crash. Fix made by Arisu.
 * 
 * Version 1.22: May 7, 2021
 * * Bug Fixes!
 * ** Plugin Commands for Event Label Visibility should now update without
 *    needing to take steps as per distance detection. Fix made by Arisu.
 * * Documentation Update!
 * ** Added clarity to "Common Event on Touch" Plugin Parameters.
 * *** Areas marked with these regions will not allow random encounters to
 *     occur. This is how RPG Maker works. Assuming you are not using plugins
 *     at all, by putting on touch events all over the map, tiles with those on
 *     touch events will not let random encounters trigger.
 * 
 * Version 1.21: March 12, 2021
 * * Bug Fixes!
 * ** Move until stop custom move routes should no longer cause crashes.
 *    Fix made by Arisu.
 * 
 * Version 1.20: February 26, 2021
 * * Bug Fixes!
 * ** Region Restrictions regarding Player Allow will no longer affect vehicle
 *    passability. Update made by Arisu.
 * 
 * Version 1.19: February 12, 2021
 * * Bug Fixes!
 * ** "Self Variable: Variable ID" plugin command's Map ID should now be able
 *    to use "0" to self reference the current map. Fix made by Olivia.
 * 
 * Version 1.18: February 5, 2021
 * * Bug Fixes!
 * ** Event icon plugin commands should now work properly. Fix made by Arisu.
 * * Documentation Update!
 * ** Added new "Features: Weighted Random Movement" section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Random Move Weight: x>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then the event will stick closer to their home location (where they are
 *      located upon spawning on the map). How close they stick to their home
 *      location will depend on the weighted 'x' value.
 * *** <True Random Move>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then that event will ignore the effects of weighted randomized
 *      movement.
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Event Timer: Change Speed
 * *** Event Timer: Expire Event Assign
 * *** Event Timer: Expire Event Clear
 * *** Event Timer: Frames Gain
 * *** Event Timer: Frames Set
 * *** Event Timer: Pause
 * *** Event Timer: Resume
 * **** The above Plugin Commands allow you to control the game timer better.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Movement > Event Movement > Random Move Weight
 * **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
 *      home position.
 * 
 * Version 1.17: January 29, 2021
 * * Documentation Update!
 * ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
 * ** Added Examples for extra clarification.
 * * Optimization Update!
 * ** When touch clicking an event on a map with multiple events, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
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
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Activation
 * @desc Runs the page of a different event remotely.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change
 * @desc Change the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text Event Timer: Expire Event Assign
 * @desc Sets a Common Event to run upon expiration.
 * Bypasses the default code if one is set.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Select the Common Event to run upon the timer's expiration.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text Event Timer: Change Speed
 * @desc Changes the timer frame decrease (or increase) speed.
 *
 * @arg Speed:eval
 * @text Speed
 * @desc How many 1/60ths of a second does each frame increase or
 * decrease by? Negative decreases. Positive increases.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text Event Timer: Expire Event Clear
 * @desc Clears any set to expire Common Event and instead,
 * run the default Game_Timer expiration code.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text Event Timer: Frames Gain
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are gained or lost for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc How many seconds are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc How many minutes are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc How many hours are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text Event Timer: Frames Set
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are set for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc Set frame count to this value.
 * Each frame is 1/60th of a second. JavaScript allowed.
 * @default 0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc Set seconds to this value.
 * JavaScript allowed.
 * @default 0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc Set minutes to this value.
 * Each minute is 60 seconds. JavaScript allowed.
 * @default 0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc Set hours to this value.
 * Each hour is 60 minutes. JavaScript allowed.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text Event Timer: Pause
 * @desc Pauses the current event timer, but does not stop it.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text Event Timer: Resume
 * @desc Resumes the current event timer from the paused state.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
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
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
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
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
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
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text Event Movement
 *
 * @param RandomMoveWeight:num
 * @text Random Move Weight
 * @parent EventMove
 * @desc Use numbers between 0 and 1. Numbers closer to 1 stay
 * closer to their home position. 0 to disable it.
 * @default 0.10
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
//=============================================================================

const _0xbd9f=['_lastPluginCommandInterpreter','setControlledFollowerID','outlineColor','GetMoveSynchTarget','Cldxm','processMoveSynchAway','JKhGC','_filename','findDiagonalDirectionTo','Boat','some','ZSvkF','FRUSTRATION','getDirectionToPoint','default','isTile','CiUCt','Game_Player_getInputDirection','activationProximityType','EventLabelVisible','IffqF','disable','isNormalPriority','updateEventIconSprite','PostCopyJS','Icon','eyhkC','processMoveRouteSelfVariable','SPIN\x20CW','getPosingCharacterDirection','WMSWF','updateMove','Speed','eventsXyNt','_eventIconSprite','command108','mirror\x20horz','EventId','AirshipSpeed','epNBV','timer','log','isPressed','MorphEventTo','tfxnE','vert\x20mirror','Game_Event_updateParallel','Self\x20Switch\x20%1','_EventIcons','cjAKx','MUSIC\x20NOTE','resetFontSettings','_activationProximity','nMqzE','pageId','GGVCx','setMoveRoute','WhMgg','TIEAQ','Game_System_initialize','_scene','PreloadedMaps','activationRegionList','_activationProximityAutoTriggerBypass','deltaYFrom','setDestination','isShip','processMoveRouteSetIndex','EventTimerFramesSet','_dragonbones','moveDiagonally','CPCsMet','isSelfSwitch','LCEen','smooth','fittingHeight','NOaLa','isDiagonalDirection','RegionOkTarget','Game_Troop_meetsConditionsCPC','EventTimerExpireEvent','checkValidEventerMap','Self\x20Variable\x20%1','isRegionForbidPass','_labelWindows','updateText','ZlzIr','isAirshipPassable','Game_Switches_value','5rgTBSb','isShadowVisible','inBattle','UTHpu','KNEEL','EventAllow','isPlaytest','_randomHomeY','StopAutoMoveEvents','QTdft','destinationY','moveAwayFromPoint','_commonEventId','isSupportDiagonalMovement','createSpawnedEventWithData','command357','VisuMZ_1_MessageCore','List','OngYa','_data','column','Game_CharacterBase_realMoveSpeed','updatePosition','setCommonEvent','cATXV','MessageCore','despawnRegions','Chase','makeDeepCopy','TRWVn','SPIN\x20CLOCKWISE','drawing','Fxqso','setImage','Game_Event_refresh','Game_SelfSwitches_setValue','BVUsl','_eventLabelOffsetX','setupDiagonalSupport','Game_Temp_setDestination','padZero','_saveEventLocations','sGjAF','EventAutoMovement','initialize','setMoveSpeed','constructor','string','forceMoveRoute','xDTLc','eventId','toLowerCase','SPIN\x20ANTICLOCKWISE','Game_Enemy_meetsSwitchCondition','turnAwayFromPoint','_visiblePlayerY','TRUE','AHCwW','YPyOT','adjustDir8MovementSpeed','processMoveSynchCustom','lLpdl','%1:%2','xKVCf','findTargetSprite','Game_Interpreter_executeCommand','despawnTerrainTags','trim','isWorking','dashSpeedModifier','_comments','FALSE','Hours','events','setFrames','DEHcQ','AZrNo','setCharacterBitmap','722045lVsDUA','autoEventIconBuffer','Preserve','_EventsMoveCoreSettings','length','_eventCache','USER-DEFINED\x201','distance','blendMode','updateBitmapSmoothing','1xCHSGC','determineCommonEventsWithCPC','erase','IconBufferX','setSelfValue','_PreservedEventMorphData','Game_Character_forceMoveRoute','setTileBitmap','ZMyjW','ShipSpeed','_forceDashing','roundXWithDirection','ZOznB','unlock','mapId','Game_Variables_value','iconWidth','_eventScreenY','_eventIcon','urmLu','initEventsMoveCore','advancedFunc','jqEez','Value','moveTowardCharacter','needsUpdate','_interpreter','updatePeriodicRefresh','useCarryPoseForIcons','isAutoBufferIcon','HMPH','oQRQB','BoatSpeed','pcfsO','FollowerSetGlobalChase','updateMoveSynch','vyIvU','onChange','backY','_moveSynch','setupSpawnedEvents','posNt','SWEAT','_hidden','Step2EventId','removeMorph','getInputDir8','Game_Map_setup','tMeUU','lastMovedDirection','isShadowShrink','approach','setOpacity','zcDTO','_pose','gJMaU','shiftY','_MapSpawnedEventData','processMoveRouteFadeIn','setPattern','turnRight90','SelfSwitchID','kLBNa','SpawnEventDespawnRegions','isRegionDockable','Template','exit','FOGSq','FavorHorz','isPassableByAnyDirection','conditions','VisuMZ_2_DragonbonesUnion','enable','prepareSpawnedEventAtXY','name','_moveAllowPlayerCollision','add','findProperPageIndex','setFrame','deltaY','FuGaZ','qyfgt','250692VuPoqu','XDzak','paRNz','Window_ScrollText_startMessage','376538eXfqzU','bwtcW','parameters','ARRAYNUM','isSpawnedEvent','dkcCA','VisibleRange','moveForward','PlayerMovementChange','Game_CharacterBase_setDirection','setupSpawn','reverse','isOnRope','loadSystem','hasStepAnime','checkAdvancedSwitchVariablePresent','LvaWU','vepLD','Dock','166745pypjae','gMZVp','isAdvancedVariable','EventTimerPause','_forceCarrying','setupEventsMoveCoreEffects','_visiblePlayerX','SPIN\x20COUNTERCLOCKWISE','isCollidedWithEvents','_event','Label','setupPageSettings','Fpboq','characterIndex','Setting','mirror\x20vertical','onClickTrigger','createSpawnedEvent','Game_Event_moveTypeRandom','charAt','isPreventSelfMovement','Game_Follower_initialize','BufferY','_commonEvents','resizeWindow','isValid','_counter','wlavD','gCrCY','AoElm','blt','isDashing','OffsetX','refresh','Game_Map_unlockEvent','savePreservedMorphEventDataKey','VehicleForbid','_trigger','PgIlq','RIGHT','DYssu','Game_Player_increaseSteps','_isObjectCharacter','WalkForbid','_DisablePlayerControl','processMoveRouteStepToCharacter','onExpire','executeMove','PosY','IconIndex','647094loZhPO','BlendMode','AllForbid','_cpc','setupSpawnTest','vehicle','isTurnInPlace','Visible','469082bvfqvM','CsOMF','processMoveSynchRandom','Visibility','Game_Event_initialize','textSizeEx','cZqXS','Enable','getDirectionFromPoint','isCollidedWithPlayerCharacters','onOk','ITEM','turnTowardPoint','EventTimerSpeed','aWLHl','GVGjm','despawnAtXY','FontSize','EEuvi','createIconSprite','OeVqZ','%1Allow','spriteId','_labelWindow','processMoveRouteSelfSwitch','roundY','MoveRouteIndex','slice','realMoveSpeed','Hidden','Collision','CallEvent','Step1EventId','removeChild','HEART','DefaultShadow','return\x20%1','bnQyO','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','width','variableId','turnAwayFromCharacter','Game_CharacterBase_isDashing','SelfSwitchABCD','_poseDuration','setValue','clearPose','zcwwA','LFGLG','_selfTarget','FUNC','processMoveSynch','PsPLT','processMoveRouteStepTo','FollowerReset','Game_Map_events','UmAtu','Game_Event_meetsConditionsCPC','isSpawnHitboxCollisionOk','MqZzm','getSavedEventLocation','clearStepPattern','requestBalloon','defaultFontSize','SpawnEventDespawnAtXY','updatePatternEventsMoveCore','characterPatternY','_characterName','wxNNx','MUSIC-NOTE','checkSmartEventCollision','requestRefresh','height','posEventsMoveCore','pattern','processMoveRouteMoveUntilStop','processMoveRouteTeleportToCharacter','_type','hasCPCs','Game_Message_setNumberInput','hawSK','OGRkk','SPIN\x20ACW','visible','Game_Map_isDashDisabled','kfTrb','getControlledFollowerID','Game_CharacterBase_hasStepAnime','setup','labelWindowRange','deletePreservedMorphEventDataKey','isBoat','moveRouteIndex','PlayerForbid','Game_Event_findProperPageIndex','Map%1.json','stop','jHTLx','PreMorphJS','Game_CharacterBase_direction','TiltRight','_eventMorphData','canPassDiagonally','processMoveCommand','createLowerLayer','registerSelfTarget','_moveRoute','meetsCPC','moveStraight','setItemChoice','HVCYi','isSaveEventLocations','_PlayerDiagonalSetting','initMoveSpeed','characterPatternYVS8','Game_CharacterBase_increaseSteps','determineEventOverload','Toggle','ZzbMK','EnableDashTilt','slZEO','forceCarrying','RlCWj','ship','trigger','startCallEvent','characterName','registerCommand','hideShadows','getPosingCharacterIndex','Operation','none','rwjOD','advancedValue','wkeRb','Game_Vehicle_isMapPassable','deleteSavedEventLocationKey','Game_Switches_setValue','moveAwayFromCharacter','Game_Event_start','execute','_eventCopyData','ndzFs','processMoveRouteMoveRepeat','eventLabelsVisible','getPlayerDiagonalSetting','_followerControlID','getMapSpawnedEventData','isPosing','_eventOverloadThreshold','TerrainTag','switch1Valid','refreshIfNeeded','DaQKG','RQKsa','tZzlb','NTeSE','updateSelfMovement','DCXuJ','checkEventTriggerHere','vwOpm','VisuMZ_Setup_Preload_Map','terrainTag','requestAnimation','anchor','selfValue','Game_Event_isCollidedWithPlayerCharacters','vqHqE','screenY','template','Game_Timer_initialize','ERvam','setupEventsMoveCoreNotetags','switch2Valid','yWYoH','setupSaveEventLocations','moveBackToRandomHome','processMoveRouteStepToPlayer','Vehicle','WalkAllow','correctFacingDirection','_eventOverload','despawnEverything','Sprite_Character_update','_opacity','Game_Event_meetsConditions','checkEventTriggerThere','Wpscc','deleteIconsOnEventsData','eUnsY','reverse\x20mimic','isEventClickTriggered','Game_CharacterBase_moveDiagonally','BULB','_moveRouteIndex','isAnyEventStarting','locate','EventLocationSave','VICTORY','Stop','PiAnX','metCPC','Sprite_Balloon_updatePosition','xYWfx','PreSpawnJS','_randomHomeX','Region','VariableGetSelfVariableID','addChild','parallelCommonEvents','nVPyl','SwitchId','wroXj','offsetY','Game_CharacterBase_screenY','%1DockRegionOnly','processMoveRouteJumpForward','custom','Game_Player_checkEventTriggerHere','hasClickTrigger','onDatabaseLoaded','AdvancedSwitches','mirror\x20horizontal','TargetVariableId','opacitySpeed','BYDvW','Game_CharacterBase_characterIndex','map','vHHaL','directionOnLadderSpriteVS8dir','isEventRunning','ataNz','PAnwl','searchLimit','setPlayerDiagonalSetting','setDiagonalDirection','_target','direction','_stepPattern','OVJdP','isPlayerControlDisabled','_visibleEventX','_CPCs','Game_Character_setMoveRoute','moveTowardPoint','down','isBattleTest','screenX','Game_CharacterBase_pattern','pQtBE','Frames','gltkw','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','RIGHT\x20TO\x20LEFT','Game_Event_setupPageSettings','Seconds','_tilemap','drawIcon','looLT','standing','GIILN','_chaseOff','COLLAPSE','createCharacterShadow','getPosingCharacterPattern','value','RJIWR','floor','code','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','Window_NumberInput_start','Sprite_Balloon_setup','pages','NUM','moveByInput','clear','left','NORMAL','isRegionAllowPass','isSpriteVS8dir','setPose','filter','reverseDir','spawnEventId','wKqAw','executeMoveDir8','concat','jSSNG','region','meetsConditions','spawnPreserved','processOk','Rope','processMoveRouteMoveToCharacter','_selfTargetNumberInput','EMsrT','Window_EventItem_onCancel','MapID','isActive','eraseEvent','shadowFilename','hasEventIcon','jump','NOTE','setChaseOff','AdvancedVariables','VuOqp','Game_Event_checkEventTriggerAuto','_spriteOffsetY','updateShadow','iconIndex','_mapId','getLastPluginCommandInterpreter','innerWidth','IconSet','RSZLW','GAATK','_characterSprites','start','General','switchId','UNTITLED','getEventIconIndex','TCXum','convertSelfVariableValuesInScriptCall','setupRegionRestrictions','hasAdvancedSwitchVariable','Game_SelfSwitches_value','TargetSwitchId','uhBHn','_callEventMap','loadDataFile','chaseCharacter','reserveCommonEvent','Game_Variables_setValue','SelfVariables','unlockEvent','drawTextEx','loadCPC','Letter','shadowX','isDashingEnabled','bJKkK','EventLocationCreate','_shadowOpacity','pluginCommandCallEvent','EnableTurnInPlace','oNmxi','Scene_Boot_onDatabaseLoaded','Game_Map_parallelCommonEvents','Window_EventItem_onOk','_frames','visibleRange','Game_Map_event','isBusy','airship','prepareSpawnedEventAtRegion','isBigCharacter','getSelfTarget','ANGER','WoWrs','isAllowEventAutoMovement','KuErK','SwitchGetSelfSwitchABCD','initMembers','qWjmY','Game_CharacterBase_screenX','OFF','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20<Copy\x20Event>\x20usage.','SCREEN','randomInt','createShadow','canStartLocalEvents','isEventTest','hhCNo','follower','inraK','CustomPageConditions','initEventsMoveCoreSettings','square','TiltLeft','AutoBuffer','PreCopyJS','bwcfH','DZzGk','RandomMoveWeight','pLfgE','mBLGt','_shadowSprite','yZtVB','AFmNk','scale','_screenZoomScale','oYOYy','toUpperCase','status','PSqFd','_eventLabelOffsetY','regionId','changeSpeed','removeTemporaryMapSpawnedEvents','updateOpacity','_clickTrigger','Walk','Game_Player_checkEventTriggerThere','EventID','updateRoutineMove','variables','FollowerID','Game_Vehicle_initMoveSpeed','setStopFollowerChasing','setLastPluginCommandInterpreter','isDashDisabled','VS8','setEventLabelsVisible','setEventIconData','ARRAYJSON','ZZZ','ConvertParams','SPIN\x20CCW','pos','VoImg','destinationX','process_VisuMZ_EventsMoveCore_Switches_Variables','aSnaQ','setupMorphEvent','ECofK','startEncounterEffect','_text','atkIS','LOWER\x20RIGHT','round','AxACl','Scene_Map_startEncounterEffect','createContents','checkActivationProximity','iconHeight','format','moveTypeRandom','getPreservedMorphEventData','hasDragonbones','_inputTime','_shadowGraphic','OpacitySpeed','LineHeight','delay','TmKPE','isMoving','deltaX','clearSpriteOffsets','clearCarrying','Settings','isSaveEventLocation','processMoveRouteTeleportTo','setMovementSuccess','AutoMoveEvents','setPlayerControlDisable','RegionOk','_followerChaseOff','IconBlendMode','vsnVB','IconSize','axmwa','Game_Event_updateSelfMovement','Game_Interpreter_PluginCommand','rRcLy','saveEventLocation','SLEEP','PreloadMaps','splice','regionList','SpawnEventAtXY','EventLocationDelete','_eventId','call','_selfEvent','SelfSwitches','increaseSteps','bind','setDashingEnabled','morphIntoTemplate','startMapCommonEventOnOKTarget','_encounterEffectDuration','_addedHitbox','ShowShadows','pause','getPose','Game_Message_add','meetActivationProximityConditions','list','MUSICNOTE','checkEventTriggerAuto','checkEventTriggerEventsMoveCore','_advancedSwitchVariable','mimic','deleteSavedEventLocation','Sprite_Character_setTileBitmap','Airship','WrgAe','frontY','_saveEventLocation','lMASI','forceDashing','setupEventsMoveCoreCommentTags','PlayerIconDelete','lineHeight','PlayerMovementDiagonal','setAllowEventAutoMovement','_spriteset','eGLvT','itemPadding','TerrainTags','Game_Player_isMapPassable','Game_Follower_chaseCharacter','min','COBWEB','akTUW','koASZ','ARRAYSTRUCT','VariableId','Step1MapId','Game_Map_setupEvents','bufferY','registerSelfEvent','EventTimerResume','zBCsD','Game_Troop_meetsConditions','ZIkRJ','STRUCT','getInputDirection','lastSpawnedEvent','RlUGq','FshWo','startMapCommonEventOnOK','clearDestination','followers','executeCommand','isRunning','absDistance','processMoveRouteAnimation','_spawnPreserved','clearDashing','switch2Id','push','EventTimerFramesGain','random','$preloadedMap_%1','horizontal\x20mirror','row','isMovementSucceeded','_cacheSystemVisible','DOWN','EventTemplates','Game_CharacterBase_canPass','Minutes','EVAL','xqVQF','mirror\x20vert','TurnInPlaceDelay','iqFpj','moveSynchType','parse','isJumping','player','_erased','meetActivationRegionConditions','_spawnData','_SavedEventLocations','qkQTx','RegionTouch','okUCB','lmFAm','resume','description','checkRegionEventTrigger','_working','UPPER\x20LEFT','processMoveCommandEventsMoveCore','Spriteset_Map_createShadow','meetsSwitchCondition','Sprite_Character_initMembers','despawnEventId','QFpzi','TemplateName','IVdmS','%1Forbid','MorphEventRemove','QzBNl','restoreSavedEventPosition','isEventOverloaded','turnTowardCharacter','Game_Interpreter_updateWaitMode','_regionRules','jumpHeight','_eventScreenX','Game_CharacterBase_initMembers','isAdvancedSwitch','event','copy','initMembersEventsMoveCore','clearEventCache','bufferX','isOnLadder','SpawnEventDespawnEventID','DlDvg','_eventErased','Passability','setEventIconDataKey','findDirectionTo','XFrJJ','updateVS8BalloonOffsets','processMoveSynchMimic','iEpXy','_spriteOffsetX','usEZF','activationProximityDistance','isDestinationValid','note','_moveSpeed','zoomScale','Sprite_Character_setCharacterBitmap','SuccessSwitchId','FUJvf','Window_Message_startMessage','Game_Timer_start','setDirection','_callEventData','initFollowerController','EnableDir8','qdMFp','TiltVert','_pattern','right','createLabelWindows','STR','GNSlG','reverse\x20copy','CuTAc','Game_Vehicle_isLandOk','_pageIndex','processMoveRouteJumpToCharacter','createShadows','ARRAYFUNC','hDGan','MUSIC','Step2MapId','Window_NumberInput_processOk','Ship','isInVehicle','clearSelfTarget','RyKKM','_waitMode','VisibleEventLabels','match','QZIrd','DashEnableToggle','LOWER\x20LEFT','_vehicleType','updateParallel','EventIconChange','SlowerSpeed','shadowY','isLabelVisible','_lastMovedDirection','NCCEy','SpawnEventDespawnEverything','Player','processMoveRoutePatternLock','pMQNA','bitmap','isMoveOnlyRegionPassable','_periodicRefreshTimer','_moveOnlyRegions','iOdSQ','processMoveRouteBalloon','_cacheVisibility','rotation','CPC','SpawnEventAtRegion','frontX','turn180','StopAutoMoveMessages','RemovePreserve','fontSize','JSON','DiagonalSpeedMultiplier','filename','DashingEnable','eventsXy','All','LIGHT-BULB','VisuMZ_0_CoreEngine','morphInto','SwitchGetSelfSwitchID','processDrawIcon','labelWindowText','PostSpawnJS','Map%1-Event%2','updateTilt','_transparent','EventForbid','Step2Preserve','Game_Map_update','_character','USER-DEFINED\x202','isMapPassable','CRAsi','turnLeft90','parent','updatePose','PosX','LEFT\x20TO\x20RIGHT','Game_Event_event','JoJaC','325066iPUOyz','EventIconDelete','LIGHT\x20BULB','Game_Event_locate','contents','Allow','_speed','_selfTargetItemChoice','processMoveRouteHugWall','includes','SILENCE','prototype','isPassable','moveSynchTarget','update','processMoveSynchApproach','switches','boxWidth','_eventSpawnData','remove','%1%2','setupCopyEvent','Direction','BalloonOffsetY','_patternLocked','_expireCommonEvent','PlayerIconChange','processMoveRouteMoveTo','Game_Timer_onExpire','GqTdB','clearPageSettings','getEventIconData','_seconds','onCancel','USER-DEFINED\x203','MapId','YfRsR','iconSize','autosaveEventLocation','RvpCK','processMoveRouteFadeOut','MoveAllSynchTargets','checkEventsMoveCoreStringTags','rkeSY','_spawnedEvents','sRPYE','text','roundYWithDirection','_needsPeriodicRefresh','canPass','_reflection','HURT','isLandOk','Game_Character_processMoveCommand','setBalloonPose','processMoveRouteJumpTo','EventsMoveCore','target','Game_Map_refresh','TixxR','indexOf','SelfVariableID','_visibleEventY','CommonEventID','qHaoH','Scene_Load_onLoadSuccess','_diagonalSupport','abs','Spriteset_Map_createLowerLayer','_randomMoveWeight','initEventsMoveCoreEffects','Game_Event_clearPageSettings','LEFT','OffsetY','Game_Player_executeMove','firstSpawnedEventID','Qwuvs','zbdOk','oINGF','processMoveSynchReverseMimic','apply','UWNdZ','_alwaysUpdateMove','zikmn','setupChild','LIGHTBULB','DashModifier','Movement','Game_CommonEvent_isActive','setNumberInput','hasMoveOnlyRegions','checkCollisionKeywords','isDashingAndMoving','Game_CharacterBase_update','replace','checkExistingEntitiesAt','deleteIconsOnEventsDataKey','QUESTION','MKhwD','type','ocDpM','FastForwardKey','Game_Message_setItemChoice','_paused','BufferX','StrictCollision','isSelfVariable','createLabelWindowForTarget','deleteEventLocation','contentsOpacity','startMapCommonEventOnTouch','updateShadowChanges','kJHFh','PageId','isTargetEventValidForLabelWindow','SpawnEventDespawnTerrainTags','Game_CharacterBase_moveStraight','horz\x20mirror','OEAmw','max','offsetX','setupEvents','isNearTheScreen','ABaGD','clamp','processMoveSynchMirrorVert','fontFace','Forbid','isAllowCharacterTilt','createBitmap','Game_CharacterBase_updatePattern','_eventPageIndex','lROfE','OperateValues','deltaXFrom','mcdoT','COGdD','checkNeedForPeriodicRefresh','wNCNS','windowPadding','Game_Timer_stop'];function _0x2d2b(_0x60fb0a,_0x57a349){return _0x2d2b=function(_0xbd9fb7,_0x2d2b66){_0xbd9fb7=_0xbd9fb7-0x16a;let _0x478687=_0xbd9f[_0xbd9fb7];return _0x478687;},_0x2d2b(_0x60fb0a,_0x57a349);}const _0x1b5cab=_0x2d2b;(function(_0x1cc07f,_0x4662dc){const _0x42af16=_0x2d2b;while(!![]){try{const _0x54a89f=-parseInt(_0x42af16(0x423))+parseInt(_0x42af16(0x509))*parseInt(_0x42af16(0x5ca))+-parseInt(_0x42af16(0x5fc))+-parseInt(_0x42af16(0x5b7))+-parseInt(_0x42af16(0x561))*-parseInt(_0x42af16(0x604))+parseInt(_0x42af16(0x557))+-parseInt(_0x42af16(0x5b3));if(_0x54a89f===_0x4662dc)break;else _0x1cc07f['push'](_0x1cc07f['shift']());}catch(_0x3b03e4){_0x1cc07f['push'](_0x1cc07f['shift']());}}}(_0xbd9f,0x67df6));var label='EventsMoveCore',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x158733){const _0x4cb39d=_0x2d2b;return _0x158733[_0x4cb39d(0x2e4)]&&_0x158733[_0x4cb39d(0x396)][_0x4cb39d(0x42c)]('['+label+']');})[0x0];VisuMZ[label][_0x1b5cab(0x31c)]=VisuMZ[label][_0x1b5cab(0x31c)]||{},VisuMZ[_0x1b5cab(0x2fb)]=function(_0x4c4d5e,_0x39d2c2){const _0x5782f3=_0x1b5cab;for(const _0x1ea60c in _0x39d2c2){if(_0x1ea60c[_0x5782f3(0x3e6)](/(.*):(.*)/i)){const _0x336daa=String(RegExp['$1']),_0xf80d61=String(RegExp['$2'])[_0x5782f3(0x2e3)]()['trim']();let _0x408e76,_0x180909,_0x111342;switch(_0xf80d61){case _0x5782f3(0x26a):_0x408e76=_0x39d2c2[_0x1ea60c]!==''?Number(_0x39d2c2[_0x1ea60c]):0x0;break;case _0x5782f3(0x5ba):_0x180909=_0x39d2c2[_0x1ea60c]!==''?JSON[_0x5782f3(0x38a)](_0x39d2c2[_0x1ea60c]):[],_0x408e76=_0x180909['map'](_0x75dbb1=>Number(_0x75dbb1));break;case _0x5782f3(0x384):_0x408e76=_0x39d2c2[_0x1ea60c]!==''?eval(_0x39d2c2[_0x1ea60c]):null;break;case'ARRAYEVAL':_0x180909=_0x39d2c2[_0x1ea60c]!==''?JSON[_0x5782f3(0x38a)](_0x39d2c2[_0x1ea60c]):[],_0x408e76=_0x180909['map'](_0x7945d0=>eval(_0x7945d0));break;case _0x5782f3(0x405):_0x408e76=_0x39d2c2[_0x1ea60c]!==''?JSON[_0x5782f3(0x38a)](_0x39d2c2[_0x1ea60c]):'';break;case _0x5782f3(0x2f9):_0x180909=_0x39d2c2[_0x1ea60c]!==''?JSON[_0x5782f3(0x38a)](_0x39d2c2[_0x1ea60c]):[],_0x408e76=_0x180909['map'](_0x1d2683=>JSON['parse'](_0x1d2683));break;case _0x5782f3(0x18b):_0x408e76=_0x39d2c2[_0x1ea60c]!==''?new Function(JSON[_0x5782f3(0x38a)](_0x39d2c2[_0x1ea60c])):new Function('return\x200');break;case _0x5782f3(0x3db):_0x180909=_0x39d2c2[_0x1ea60c]!==''?JSON[_0x5782f3(0x38a)](_0x39d2c2[_0x1ea60c]):[],_0x408e76=_0x180909['map'](_0x103a79=>new Function(JSON[_0x5782f3(0x38a)](_0x103a79)));break;case _0x5782f3(0x3d3):_0x408e76=_0x39d2c2[_0x1ea60c]!==''?String(_0x39d2c2[_0x1ea60c]):'';break;case'ARRAYSTR':_0x180909=_0x39d2c2[_0x1ea60c]!==''?JSON[_0x5782f3(0x38a)](_0x39d2c2[_0x1ea60c]):[],_0x408e76=_0x180909[_0x5782f3(0x23c)](_0x2e8eea=>String(_0x2e8eea));break;case _0x5782f3(0x369):_0x111342=_0x39d2c2[_0x1ea60c]!==''?JSON[_0x5782f3(0x38a)](_0x39d2c2[_0x1ea60c]):{},_0x4c4d5e[_0x336daa]={},VisuMZ[_0x5782f3(0x2fb)](_0x4c4d5e[_0x336daa],_0x111342);continue;case _0x5782f3(0x35f):_0x180909=_0x39d2c2[_0x1ea60c]!==''?JSON[_0x5782f3(0x38a)](_0x39d2c2[_0x1ea60c]):[],_0x408e76=_0x180909[_0x5782f3(0x23c)](_0x5a270e=>VisuMZ['ConvertParams']({},JSON[_0x5782f3(0x38a)](_0x5a270e)));break;default:continue;}_0x4c4d5e[_0x336daa]=_0x408e76;}}return _0x4c4d5e;},(_0x306437=>{const _0x2bc8ad=_0x1b5cab,_0xd295e7=_0x306437['name'];for(const _0x3a9f01 of dependencies){if(_0x2bc8ad(0x4c4)!==_0x2bc8ad(0x4c4)){_0x52f7f0[_0x2bc8ad(0x3fe)]===_0x4ae316&&_0x17b898['EventsMoveCore'][_0x2bc8ad(0x2d2)][_0x2bc8ad(0x2ab)](_0x287132);if(_0xf68df[_0x2bc8ad(0x3fe)][_0x2bc8ad(0x55b)]>0x0)return _0x230a87[_0x2bc8ad(0x45b)]['CustomPageConditions'][_0x2bc8ad(0x222)](_0x2a9c99['CPC'],0x0);return!![];}else{if(!Imported[_0x3a9f01]){alert(_0x2bc8ad(0x255)[_0x2bc8ad(0x30e)](_0xd295e7,_0x3a9f01)),SceneManager[_0x2bc8ad(0x5a3)]();break;}}}const _0x5b77ed=_0x306437['description'];if(_0x5b77ed['match'](/\[Version[ ](.*?)\]/i)){const _0x1620d6=Number(RegExp['$1']);_0x1620d6!==VisuMZ[label]['version']&&(alert(_0x2bc8ad(0x17f)[_0x2bc8ad(0x30e)](_0xd295e7,_0x1620d6)),SceneManager[_0x2bc8ad(0x5a3)]());}if(_0x5b77ed['match'](/\[Tier[ ](\d+)\]/i)){const _0x4a4f13=Number(RegExp['$1']);_0x4a4f13<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x2bc8ad(0x30e)](_0xd295e7,_0x4a4f13,tier)),SceneManager['exit']()):tier=Math[_0x2bc8ad(0x49a)](_0x4a4f13,tier);}VisuMZ[_0x2bc8ad(0x2fb)](VisuMZ[label][_0x2bc8ad(0x31c)],_0x306437[_0x2bc8ad(0x5b9)]);})(pluginData),VisuMZ['OperateValues']=function(_0x2f8c1e,_0x2af3e1,_0x148835){switch(_0x148835){case'=':return _0x2af3e1;break;case'+':return _0x2f8c1e+_0x2af3e1;break;case'-':return _0x2f8c1e-_0x2af3e1;break;case'*':return _0x2f8c1e*_0x2af3e1;break;case'/':return _0x2f8c1e/_0x2af3e1;break;case'%':return _0x2f8c1e%_0x2af3e1;break;}return _0x2f8c1e;},PluginManager[_0x1b5cab(0x1d8)](pluginData['name'],_0x1b5cab(0x320),_0x47d40f=>{const _0x1dfc3c=_0x1b5cab;VisuMZ['ConvertParams'](_0x47d40f,_0x47d40f);switch(_0x47d40f[_0x1dfc3c(0x578)]){case _0x1dfc3c(0x428):$gameSystem['setAllowEventAutoMovement'](!![]);break;case _0x1dfc3c(0x220):$gameSystem[_0x1dfc3c(0x354)](![]);break;case _0x1dfc3c(0x1ce):$gameSystem[_0x1dfc3c(0x354)](!$gameSystem[_0x1dfc3c(0x2c2)]());break;}}),PluginManager[_0x1b5cab(0x1d8)](pluginData['name'],_0x1b5cab(0x178),_0x24f9ae=>{const _0xa56af3=_0x1b5cab;VisuMZ[_0xa56af3(0x2fb)](_0x24f9ae,_0x24f9ae);const _0x583fb7=$gameTemp[_0xa56af3(0x291)](),_0x25d3bc={'mapId':_0x24f9ae[_0xa56af3(0x446)],'eventId':_0x24f9ae['EventId']||_0x583fb7['eventId'](),'pageId':_0x24f9ae['PageId']};if(_0x25d3bc[_0xa56af3(0x56f)]<=0x0)_0x25d3bc['mapId']=$gameMap?$gameMap[_0xa56af3(0x56f)]():0x1;$gameTemp[_0xa56af3(0x291)]()[_0xa56af3(0x2b2)](_0x25d3bc);}),PluginManager['registerCommand'](pluginData[_0x1b5cab(0x5ab)],_0x1b5cab(0x3e8),_0x55499b=>{const _0x47faa3=_0x1b5cab;VisuMZ['ConvertParams'](_0x55499b,_0x55499b);switch(_0x55499b['Value']){case'Enable':$gameSystem[_0x47faa3(0x338)](!![]);break;case'Disable':$gameSystem[_0x47faa3(0x338)](![]);break;case _0x47faa3(0x1ce):$gameSystem['setDashingEnabled'](!$gameSystem[_0x47faa3(0x2ae)]());break;}}),PluginManager[_0x1b5cab(0x1d8)](pluginData[_0x1b5cab(0x5ab)],_0x1b5cab(0x3ec),_0x42fd3c=>{const _0x4e5f=_0x1b5cab;VisuMZ[_0x4e5f(0x2fb)](_0x42fd3c,_0x42fd3c);const _0x3ddbd9=$gameTemp['getLastPluginCommandInterpreter']();_0x42fd3c[_0x4e5f(0x446)]=_0x42fd3c[_0x4e5f(0x446)]||$gameMap[_0x4e5f(0x56f)](),$gameSystem[_0x4e5f(0x3b8)](_0x42fd3c[_0x4e5f(0x446)],_0x42fd3c['EventId']||_0x3ddbd9[_0x4e5f(0x53b)](),_0x42fd3c[_0x4e5f(0x5fb)],_0x42fd3c[_0x4e5f(0x564)],_0x42fd3c['IconBufferY'],_0x42fd3c['IconBlendMode']);}),PluginManager[_0x1b5cab(0x1d8)](pluginData['name'],_0x1b5cab(0x424),_0x5270df=>{const _0x4f4e9d=_0x1b5cab;VisuMZ['ConvertParams'](_0x5270df,_0x5270df);const _0x5e6e1b=$gameTemp[_0x4f4e9d(0x291)]();_0x5270df['MapId']=_0x5270df['MapId']||$gameMap['mapId'](),$gameSystem[_0x4f4e9d(0x483)](_0x5270df[_0x4f4e9d(0x446)],_0x5270df[_0x4f4e9d(0x4d5)]||_0x5e6e1b[_0x4f4e9d(0x53b)]());}),PluginManager[_0x1b5cab(0x1d8)](pluginData[_0x1b5cab(0x5ab)],'EventLabelRefresh',_0x2faac9=>{const _0x5efad6=_0x1b5cab;if($gameMap){if(_0x5efad6(0x548)!==_0x5efad6(0x548)){if(!this[_0x5efad6(0x31d)]())return;this[_0x5efad6(0x32b)]();}else for(const _0x3ebcfd of $gameMap['events']()){if(_0x5efad6(0x3e7)!==_0x5efad6(0x3e7)){if(_0x4ece2f[_0x5efad6(0x3ad)](_0x5b494c))return!!this[_0x5efad6(0x1de)](_0x99c44e);else return _0x5b437d[_0x5efad6(0x4f8)](_0x2a937a)?!!this[_0x5efad6(0x1fe)](_0x4e8a0f):_0x4089a6[_0x5efad6(0x45b)][_0x5efad6(0x508)][_0x5efad6(0x333)](this,_0x459311);}else _0x3ebcfd[_0x5efad6(0x5eb)]();}}}),PluginManager['registerCommand'](pluginData[_0x1b5cab(0x5ab)],_0x1b5cab(0x4c3),_0x569482=>{const _0x5d8fed=_0x1b5cab;VisuMZ[_0x5d8fed(0x2fb)](_0x569482,_0x569482);switch(_0x569482[_0x5d8fed(0x607)]){case _0x5d8fed(0x603):$gameSystem[_0x5d8fed(0x2f7)](!![]);break;case _0x5d8fed(0x176):$gameSystem[_0x5d8fed(0x2f7)](![]);break;case _0x5d8fed(0x1ce):$gameSystem['setEventLabelsVisible'](!$gameSystem[_0x5d8fed(0x1e9)]());break;}}),PluginManager[_0x1b5cab(0x1d8)](pluginData['name'],_0x1b5cab(0x21e),_0x30255e=>{const _0x38600a=_0x1b5cab;VisuMZ[_0x38600a(0x2fb)](_0x30255e,_0x30255e);const _0x361f2b=$gameTemp[_0x38600a(0x291)]();if(!$gameMap)return;const _0x15e8f2=$gameMap['event'](_0x30255e[_0x38600a(0x4d5)]||_0x361f2b['eventId']());if(_0x15e8f2)_0x15e8f2[_0x38600a(0x32b)]();}),PluginManager[_0x1b5cab(0x1d8)](pluginData[_0x1b5cab(0x5ab)],_0x1b5cab(0x2b0),_0x2f4fac=>{const _0x2c1b22=_0x1b5cab;VisuMZ[_0x2c1b22(0x2fb)](_0x2f4fac,_0x2f4fac);const _0x26bb3a=$gameTemp['getLastPluginCommandInterpreter'](),_0x99df71=_0x2f4fac[_0x2c1b22(0x446)]||$gameMap[_0x2c1b22(0x56f)](),_0x2942ee=_0x2f4fac[_0x2c1b22(0x4d5)]||_0x26bb3a[_0x2c1b22(0x53b)](),_0x59311c=_0x2f4fac[_0x2c1b22(0x41f)]||0x0,_0x27aadb=_0x2f4fac[_0x2c1b22(0x5fa)]||0x0,_0x307470=_0x2f4fac[_0x2c1b22(0x439)]||0x2,_0x152266=((_0x2f4fac[_0x2c1b22(0x494)]||0x1)-0x1)[_0x2c1b22(0x49f)](0x0,0x13),_0x121faf=_0x2f4fac[_0x2c1b22(0x173)]||0x0;$gameSystem['createSaveEventLocationData'](_0x99df71,_0x2942ee,_0x59311c,_0x27aadb,_0x307470,_0x152266,_0x121faf);}),PluginManager[_0x1b5cab(0x1d8)](pluginData[_0x1b5cab(0x5ab)],_0x1b5cab(0x331),_0x17cf03=>{const _0x15a331=_0x1b5cab;VisuMZ[_0x15a331(0x2fb)](_0x17cf03,_0x17cf03);const _0xdb4616=$gameTemp['getLastPluginCommandInterpreter'](),_0x34072c=_0x17cf03[_0x15a331(0x446)]||$gameMap[_0x15a331(0x56f)](),_0x20c605=_0x17cf03[_0x15a331(0x4d5)]||_0xdb4616[_0x15a331(0x53b)]();$gameSystem[_0x15a331(0x1e1)](_0x34072c,_0x20c605);}),PluginManager['registerCommand'](pluginData[_0x1b5cab(0x5ab)],_0x1b5cab(0x500),_0x56cf22=>{const _0x5d303a=_0x1b5cab;VisuMZ[_0x5d303a(0x2fb)](_0x56cf22,_0x56cf22);const _0x14e78d=_0x56cf22[_0x5d303a(0x462)];$gameTimer[_0x5d303a(0x520)](_0x14e78d);}),PluginManager[_0x1b5cab(0x1d8)](pluginData[_0x1b5cab(0x5ab)],'EventTimerExpireClear',_0x3f7c85=>{const _0x25c782=_0x1b5cab;$gameTimer[_0x25c782(0x520)](0x0);}),PluginManager[_0x1b5cab(0x1d8)](pluginData['name'],_0x1b5cab(0x379),_0x56641e=>{const _0x23ca31=_0x1b5cab;if(!$gameTimer[_0x23ca31(0x54d)]())return;VisuMZ[_0x23ca31(0x2fb)](_0x56641e,_0x56641e);let _0x3f56aa=0x0;_0x3f56aa+=_0x56641e[_0x23ca31(0x253)],_0x3f56aa+=_0x56641e[_0x23ca31(0x258)]*0x3c,_0x3f56aa+=_0x56641e['Minutes']*0x3c*0x3c,_0x3f56aa+=_0x56641e[_0x23ca31(0x551)]*0x3c*0x3c*0x3c,$gameTimer['gainFrames'](_0x3f56aa);}),PluginManager[_0x1b5cab(0x1d8)](pluginData[_0x1b5cab(0x5ab)],_0x1b5cab(0x4f4),_0x3636d7=>{const _0x2e25fa=_0x1b5cab;if(!$gameTimer[_0x2e25fa(0x54d)]())return;VisuMZ[_0x2e25fa(0x2fb)](_0x3636d7,_0x3636d7);let _0x56e8b3=0x0;_0x56e8b3+=_0x3636d7[_0x2e25fa(0x253)],_0x56e8b3+=_0x3636d7[_0x2e25fa(0x258)]*0x3c,_0x56e8b3+=_0x3636d7[_0x2e25fa(0x383)]*0x3c*0x3c,_0x56e8b3+=_0x3636d7[_0x2e25fa(0x551)]*0x3c*0x3c*0x3c,$gameTimer[_0x2e25fa(0x553)](_0x56e8b3);}),PluginManager['registerCommand'](pluginData['name'],_0x1b5cab(0x5cd),_0x5d8757=>{const _0x57ffd5=_0x1b5cab;if(!$gameTimer[_0x57ffd5(0x54d)]())return;$gameTimer[_0x57ffd5(0x33e)]();}),PluginManager[_0x1b5cab(0x1d8)](pluginData[_0x1b5cab(0x5ab)],_0x1b5cab(0x365),_0x1f4c7d=>{const _0x315853=_0x1b5cab;if(!$gameTimer['isWorking']())return;$gameTimer[_0x315853(0x395)]();}),PluginManager['registerCommand'](pluginData[_0x1b5cab(0x5ab)],_0x1b5cab(0x611),_0x5e3488=>{const _0x3ff36a=_0x1b5cab;VisuMZ['ConvertParams'](_0x5e3488,_0x5e3488);const _0x1f4669=_0x5e3488[_0x3ff36a(0x4d0)]||0x0;$gameTimer[_0x3ff36a(0x2e8)](_0x1f4669);}),PluginManager[_0x1b5cab(0x1d8)](pluginData[_0x1b5cab(0x5ab)],_0x1b5cab(0x583),_0x92ca75=>{const _0x2177f4=_0x1b5cab;VisuMZ[_0x2177f4(0x2fb)](_0x92ca75,_0x92ca75);const _0x1361c4=!_0x92ca75[_0x2177f4(0x524)];$gameSystem['setStopFollowerChasing'](_0x1361c4);}),PluginManager[_0x1b5cab(0x1d8)](pluginData[_0x1b5cab(0x5ab)],'FollowerSetTargetChase',_0x408744=>{const _0x160a85=_0x1b5cab;VisuMZ[_0x160a85(0x2fb)](_0x408744,_0x408744);const _0x409525=(_0x408744[_0x160a85(0x2f1)]||0x0)-0x1,_0x2fed1e=!_0x408744[_0x160a85(0x524)],_0x1fdef6=$gamePlayer[_0x160a85(0x370)]()[_0x160a85(0x2d0)](_0x409525);if(_0x1fdef6)_0x1fdef6[_0x160a85(0x289)](_0x2fed1e);}),PluginManager[_0x1b5cab(0x1d8)](pluginData[_0x1b5cab(0x5ab)],'FollowerSetControl',_0x24c25f=>{const _0x2cebc3=_0x1b5cab;VisuMZ[_0x2cebc3(0x2fb)](_0x24c25f,_0x24c25f);const _0x41467a=_0x24c25f[_0x2cebc3(0x2f1)];$gameSystem['setControlledFollowerID'](_0x41467a);}),PluginManager[_0x1b5cab(0x1d8)](pluginData[_0x1b5cab(0x5ab)],_0x1b5cab(0x18f),_0x1418d0=>{const _0x3fa56f=_0x1b5cab;VisuMZ['ConvertParams'](_0x1418d0,_0x1418d0),$gameSystem[_0x3fa56f(0x4b1)](0x0),$gameSystem[_0x3fa56f(0x2f3)](![]);for(const _0x2e06fe of $gamePlayer[_0x3fa56f(0x370)]()[_0x3fa56f(0x51c)]){if(_0x2e06fe)_0x2e06fe['setChaseOff'](![]);}}),PluginManager['registerCommand'](pluginData[_0x1b5cab(0x5ab)],_0x1b5cab(0x2c4),_0xa50a3a=>{const _0x57f361=_0x1b5cab;VisuMZ[_0x57f361(0x2fb)](_0xa50a3a,_0xa50a3a);const _0x368011=$gameTemp[_0x57f361(0x291)]();_0xa50a3a[_0x57f361(0x446)]=_0xa50a3a['MapId']||$gameMap[_0x57f361(0x56f)]();const _0x76ba40=[_0xa50a3a[_0x57f361(0x446)],_0xa50a3a['EventId']||_0x368011['eventId'](),_0xa50a3a['Letter']],_0x51b44a=_0xa50a3a[_0x57f361(0x2a1)],_0x2ec65c=$gameSelfSwitches[_0x57f361(0x262)](_0x76ba40)||![];$gameSwitches['setValue'](_0x51b44a,_0x2ec65c);}),PluginManager[_0x1b5cab(0x1d8)](pluginData[_0x1b5cab(0x5ab)],_0x1b5cab(0x40e),_0x71db1c=>{const _0x2fdd5f=_0x1b5cab;VisuMZ[_0x2fdd5f(0x2fb)](_0x71db1c,_0x71db1c);const _0x10ea94=$gameTemp[_0x2fdd5f(0x291)]();_0x71db1c[_0x2fdd5f(0x446)]=_0x71db1c['MapId']||$gameMap[_0x2fdd5f(0x56f)]();const _0x310543=[_0x71db1c[_0x2fdd5f(0x446)],_0x71db1c[_0x2fdd5f(0x4d5)]||_0x10ea94[_0x2fdd5f(0x53b)](),'Self\x20Switch\x20%1'['format'](_0x71db1c['SwitchId'])],_0x2cecf6=_0x71db1c[_0x2fdd5f(0x2a1)],_0x350569=$gameSelfSwitches[_0x2fdd5f(0x262)](_0x310543)||![];$gameSwitches[_0x2fdd5f(0x186)](_0x2cecf6,_0x350569);}),PluginManager[_0x1b5cab(0x1d8)](pluginData['name'],_0x1b5cab(0x228),_0x1d89d8=>{const _0x2ba9f0=_0x1b5cab;VisuMZ[_0x2ba9f0(0x2fb)](_0x1d89d8,_0x1d89d8);const _0x434075=$gameTemp['getLastPluginCommandInterpreter']();_0x1d89d8[_0x2ba9f0(0x446)]=_0x1d89d8['MapId']||$gameMap[_0x2ba9f0(0x56f)]();const _0x519026=[_0x1d89d8[_0x2ba9f0(0x446)],_0x1d89d8[_0x2ba9f0(0x4d5)]||_0x434075[_0x2ba9f0(0x53b)](),_0x2ba9f0(0x502)[_0x2ba9f0(0x30e)](_0x1d89d8[_0x2ba9f0(0x360)])],_0x4e75d8=_0x1d89d8[_0x2ba9f0(0x238)],_0x7a943b=$gameSelfSwitches[_0x2ba9f0(0x262)](_0x519026)||![];$gameVariables[_0x2ba9f0(0x186)](_0x4e75d8,_0x7a943b);}),PluginManager[_0x1b5cab(0x1d8)](pluginData[_0x1b5cab(0x5ab)],_0x1b5cab(0x4db),_0x3b2939=>{const _0x51bc27=_0x1b5cab;VisuMZ[_0x51bc27(0x2fb)](_0x3b2939,_0x3b2939);if(!$gameMap)return;const _0x393b93=$gameTemp[_0x51bc27(0x291)](),_0x2a9eab=_0x3b2939[_0x51bc27(0x416)];_0x3b2939['Step1MapId']=_0x3b2939[_0x51bc27(0x361)]||$gameMap[_0x51bc27(0x56f)](),_0x3b2939[_0x51bc27(0x3de)]=_0x3b2939[_0x51bc27(0x3de)]||$gameMap[_0x51bc27(0x56f)](),_0x3b2939[_0x51bc27(0x3a0)]=_0x3b2939[_0x51bc27(0x3a0)][_0x51bc27(0x2e3)]()['trim']();if(!_0x2a9eab&&_0x3b2939[_0x51bc27(0x361)]!==$gameMap[_0x51bc27(0x56f)]())return;if($gameMap[_0x51bc27(0x56f)]()===_0x3b2939[_0x51bc27(0x361)]){const _0x5925c9=$gameMap[_0x51bc27(0x3ae)](_0x3b2939['Step1EventId']||_0x393b93[_0x51bc27(0x53b)]());if(!_0x5925c9)return;if(_0x3b2939[_0x51bc27(0x3a0)]!==_0x51bc27(0x29a)){if(_0x51bc27(0x2cf)==='MbCXK'){for(const _0x189a27 of this[_0x51bc27(0x44f)]){if(_0x189a27)return _0x189a27;}return null;}else _0x5925c9[_0x51bc27(0x339)](_0x3b2939[_0x51bc27(0x3a0)]);}else'looLT'!==_0x51bc27(0x25b)?this[_0x51bc27(0x5d3)][_0x51bc27(0x410)]()!==this[_0x51bc27(0x305)]&&(this['_text']=this[_0x51bc27(0x5d3)][_0x51bc27(0x410)](),this[_0x51bc27(0x5eb)]()):_0x5925c9[_0x51bc27(0x40d)](_0x3b2939[_0x51bc27(0x3de)],_0x3b2939[_0x51bc27(0x58d)]||_0x393b93[_0x51bc27(0x53b)]());}_0x2a9eab&&$gameSystem['savePreservedMorphEventDataKey'](_0x3b2939[_0x51bc27(0x361)],_0x3b2939[_0x51bc27(0x179)],_0x3b2939[_0x51bc27(0x3a0)],_0x3b2939['Step2MapId'],_0x3b2939[_0x51bc27(0x58d)]);}),PluginManager[_0x1b5cab(0x1d8)](pluginData[_0x1b5cab(0x5ab)],_0x1b5cab(0x3a3),_0x3fc867=>{const _0xb740db=_0x1b5cab;VisuMZ['ConvertParams'](_0x3fc867,_0x3fc867);if(!$gameMap)return;const _0x2976fb=$gameTemp[_0xb740db(0x291)]();_0x3fc867[_0xb740db(0x446)]=_0x3fc867[_0xb740db(0x446)]||$gameMap[_0xb740db(0x56f)]();if($gameMap['mapId']()===_0x3fc867[_0xb740db(0x446)]){const _0x4d14d4=$gameMap['event'](_0x3fc867[_0xb740db(0x4d5)]||_0x2976fb[_0xb740db(0x53b)]());_0x4d14d4['removeMorph']();}if(_0x3fc867['RemovePreserve']){if(_0xb740db(0x391)!==_0xb740db(0x391)){if(_0x584c50[_0xb740db(0x5ac)])return![];return _0x33c6a9['EventsMoveCore'][_0xb740db(0x1ff)][_0xb740db(0x333)](this,_0x5595e6,_0x86776e);}else $gameSystem['deletePreservedMorphEventDataKey'](_0x3fc867['MapId'],_0x3fc867[_0xb740db(0x4d5)]||_0x2976fb[_0xb740db(0x53b)]());}}),PluginManager[_0x1b5cab(0x1d8)](pluginData['name'],_0x1b5cab(0x5bf),_0x4c05cb=>{const _0x100c68=_0x1b5cab;VisuMZ[_0x100c68(0x2fb)](_0x4c05cb,_0x4c05cb),$gameSystem[_0x100c68(0x321)](!_0x4c05cb[_0x100c68(0x60b)]);}),PluginManager[_0x1b5cab(0x1d8)](pluginData[_0x1b5cab(0x5ab)],_0x1b5cab(0x353),_0x18d6f6=>{const _0x183c39=_0x1b5cab;VisuMZ[_0x183c39(0x2fb)](_0x18d6f6,_0x18d6f6),$gameSystem[_0x183c39(0x243)](_0x18d6f6['Setting']);}),PluginManager[_0x1b5cab(0x1d8)](pluginData[_0x1b5cab(0x5ab)],_0x1b5cab(0x43d),_0x11d0b5=>{const _0x2277cd=_0x1b5cab;VisuMZ[_0x2277cd(0x2fb)](_0x11d0b5,_0x11d0b5),$gameSystem[_0x2277cd(0x2f8)]($gamePlayer,_0x11d0b5['IconIndex'],_0x11d0b5[_0x2277cd(0x564)],_0x11d0b5['IconBufferY'],_0x11d0b5['IconBlendMode']);}),PluginManager[_0x1b5cab(0x1d8)](pluginData[_0x1b5cab(0x5ab)],_0x1b5cab(0x351),_0x3c83aa=>{const _0x108017=_0x1b5cab;VisuMZ[_0x108017(0x2fb)](_0x3c83aa,_0x3c83aa),$gameSystem[_0x108017(0x215)]($gamePlayer);}),PluginManager['registerCommand'](pluginData[_0x1b5cab(0x5ab)],_0x1b5cab(0x184),_0x11c0fc=>{const _0x2f8437=_0x1b5cab;VisuMZ[_0x2f8437(0x2fb)](_0x11c0fc,_0x11c0fc);const _0x406c34=$gameTemp['getLastPluginCommandInterpreter']();_0x11c0fc[_0x2f8437(0x446)]=_0x11c0fc[_0x2f8437(0x446)]||$gameMap[_0x2f8437(0x56f)]();const _0x3bddd5=[_0x11c0fc['MapId'],_0x11c0fc[_0x2f8437(0x4d5)]||_0x406c34[_0x2f8437(0x53b)](),_0x11c0fc[_0x2f8437(0x2ac)]];switch(_0x11c0fc[_0x2f8437(0x578)]){case'ON':$gameSelfSwitches[_0x2f8437(0x186)](_0x3bddd5,!![]);break;case _0x2f8437(0x2c8):$gameSelfSwitches[_0x2f8437(0x186)](_0x3bddd5,![]);break;case _0x2f8437(0x1ce):$gameSelfSwitches[_0x2f8437(0x186)](_0x3bddd5,!$gameSelfSwitches[_0x2f8437(0x262)](_0x3bddd5));break;}}),PluginManager['registerCommand'](pluginData[_0x1b5cab(0x5ab)],_0x1b5cab(0x59e),_0x5801a4=>{const _0x1d6c53=_0x1b5cab;VisuMZ[_0x1d6c53(0x2fb)](_0x5801a4,_0x5801a4);const _0x500076=$gameTemp[_0x1d6c53(0x291)]();_0x5801a4[_0x1d6c53(0x446)]=_0x5801a4[_0x1d6c53(0x446)]||$gameMap[_0x1d6c53(0x56f)]();const _0x4bfd77=[_0x5801a4[_0x1d6c53(0x446)],_0x5801a4['EventId']||_0x500076[_0x1d6c53(0x53b)](),_0x1d6c53(0x4df)['format'](_0x5801a4[_0x1d6c53(0x22c)])];switch(_0x5801a4['Value']){case'ON':$gameSelfSwitches[_0x1d6c53(0x186)](_0x4bfd77,!![]);break;case _0x1d6c53(0x2c8):$gameSelfSwitches[_0x1d6c53(0x186)](_0x4bfd77,![]);break;case'Toggle':$gameSelfSwitches[_0x1d6c53(0x186)](_0x4bfd77,!$gameSelfSwitches[_0x1d6c53(0x262)](_0x4bfd77));break;}}),PluginManager[_0x1b5cab(0x1d8)](pluginData[_0x1b5cab(0x5ab)],_0x1b5cab(0x460),_0x3f35e3=>{const _0x371ddf=_0x1b5cab;VisuMZ[_0x371ddf(0x2fb)](_0x3f35e3,_0x3f35e3);const _0x2f5d75=$gameTemp['getLastPluginCommandInterpreter']();_0x3f35e3[_0x371ddf(0x446)]=_0x3f35e3[_0x371ddf(0x446)]||$gameMap[_0x371ddf(0x56f)]();const _0xe6685a=[_0x3f35e3[_0x371ddf(0x446)],_0x3f35e3['EventId']||_0x2f5d75[_0x371ddf(0x53b)](),'Self\x20Variable\x20%1'[_0x371ddf(0x30e)](_0x3f35e3[_0x371ddf(0x360)])],_0x17c180=VisuMZ[_0x371ddf(0x4a8)]($gameSelfSwitches['value'](_0xe6685a),_0x3f35e3[_0x371ddf(0x578)],_0x3f35e3[_0x371ddf(0x1db)]);$gameSelfSwitches[_0x371ddf(0x186)](_0xe6685a,_0x17c180);}),PluginManager[_0x1b5cab(0x1d8)](pluginData[_0x1b5cab(0x5ab)],_0x1b5cab(0x330),_0xa5e255=>{const _0x38d93a=_0x1b5cab;VisuMZ[_0x38d93a(0x2fb)](_0xa5e255,_0xa5e255);const _0x2dcb7e=$gameTemp[_0x38d93a(0x291)](),_0x4a08f7={'template':_0xa5e255[_0x38d93a(0x3a0)],'mapId':_0xa5e255[_0x38d93a(0x446)]||$gameMap[_0x38d93a(0x56f)](),'eventId':_0xa5e255[_0x38d93a(0x4d5)]||_0x2dcb7e[_0x38d93a(0x53b)](),'x':_0xa5e255['PosX'],'y':_0xa5e255[_0x38d93a(0x5fa)],'spawnPreserved':_0xa5e255[_0x38d93a(0x559)],'spawnEventId':$gameMap['_spawnedEvents'][_0x38d93a(0x55b)]+0x3e8},_0x23277c=_0xa5e255['SuccessSwitchId']||0x0,_0xa4ded7=$gameMap['prepareSpawnedEventAtXY'](_0x4a08f7,_0xa5e255['Collision'],_0xa5e255[_0x38d93a(0x3b7)]);_0x23277c&&$gameSwitches['setValue'](_0x23277c,!!_0xa4ded7);}),PluginManager[_0x1b5cab(0x1d8)](pluginData[_0x1b5cab(0x5ab)],_0x1b5cab(0x3ff),_0x4cf9eb=>{const _0x1e3fdd=_0x1b5cab;VisuMZ[_0x1e3fdd(0x2fb)](_0x4cf9eb,_0x4cf9eb);const _0x5d74bb=$gameTemp[_0x1e3fdd(0x291)](),_0xe12169={'template':_0x4cf9eb['TemplateName'],'mapId':_0x4cf9eb['MapId']||$gameMap['mapId'](),'eventId':_0x4cf9eb['EventId']||_0x5d74bb[_0x1e3fdd(0x53b)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x4cf9eb[_0x1e3fdd(0x559)],'spawnEventId':$gameMap[_0x1e3fdd(0x44f)]['length']+0x3e8},_0x35cf9b=_0x4cf9eb['SuccessSwitchId']||0x0,_0x1bcc19=$gameMap[_0x1e3fdd(0x2bd)](_0xe12169,_0x4cf9eb[_0x1e3fdd(0x227)],_0x4cf9eb['Collision'],_0x4cf9eb[_0x1e3fdd(0x3b7)]);_0x35cf9b&&$gameSwitches[_0x1e3fdd(0x186)](_0x35cf9b,!!_0x1bcc19);}),PluginManager[_0x1b5cab(0x1d8)](pluginData[_0x1b5cab(0x5ab)],'SpawnEventAtTerrainTag',_0x83c811=>{const _0x1f82ec=_0x1b5cab;VisuMZ[_0x1f82ec(0x2fb)](_0x83c811,_0x83c811);const _0xfca258=$gameTemp[_0x1f82ec(0x291)](),_0x41d325={'template':_0x83c811['TemplateName'],'mapId':_0x83c811['MapId']||$gameMap[_0x1f82ec(0x56f)](),'eventId':_0x83c811['EventId']||_0xfca258[_0x1f82ec(0x53b)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x83c811[_0x1f82ec(0x559)],'spawnEventId':$gameMap['_spawnedEvents'][_0x1f82ec(0x55b)]+0x3e8},_0x1db690=_0x83c811[_0x1f82ec(0x3c6)]||0x0,_0x554128=$gameMap['prepareSpawnedEventAtTerrainTag'](_0x41d325,_0x83c811[_0x1f82ec(0x358)],_0x83c811[_0x1f82ec(0x177)],_0x83c811[_0x1f82ec(0x3b7)]);_0x1db690&&('qdMFp'===_0x1f82ec(0x3ce)?$gameSwitches[_0x1f82ec(0x186)](_0x1db690,!!_0x554128):this['setSelfValue'](_0x3e9e52,_0x133b9e));}),PluginManager['registerCommand'](pluginData[_0x1b5cab(0x5ab)],_0x1b5cab(0x3b4),_0x4fdd29=>{const _0xd67ed1=_0x1b5cab;VisuMZ['ConvertParams'](_0x4fdd29,_0x4fdd29);const _0x413347=$gameTemp[_0xd67ed1(0x291)]();$gameMap[_0xd67ed1(0x39e)](_0x4fdd29[_0xd67ed1(0x2ee)]||_0x413347[_0xd67ed1(0x53b)]());}),PluginManager['registerCommand'](pluginData[_0x1b5cab(0x5ab)],_0x1b5cab(0x199),_0x2cb4e9=>{const _0x2d3807=_0x1b5cab;VisuMZ['ConvertParams'](_0x2cb4e9,_0x2cb4e9);const _0x195792=_0x2cb4e9['PosX'],_0x4f6ca0=_0x2cb4e9[_0x2d3807(0x5fa)];$gameMap[_0x2d3807(0x614)](_0x195792,_0x4f6ca0);}),PluginManager['registerCommand'](pluginData[_0x1b5cab(0x5ab)],_0x1b5cab(0x5a0),_0x308099=>{const _0x78401e=_0x1b5cab;VisuMZ[_0x78401e(0x2fb)](_0x308099,_0x308099),$gameMap[_0x78401e(0x523)](_0x308099['Region']);}),PluginManager[_0x1b5cab(0x1d8)](pluginData[_0x1b5cab(0x5ab)],_0x1b5cab(0x496),_0x3e03a3=>{const _0x237f44=_0x1b5cab;VisuMZ[_0x237f44(0x2fb)](_0x3e03a3,_0x3e03a3),$gameMap[_0x237f44(0x54b)](_0x3e03a3[_0x237f44(0x358)]);}),PluginManager[_0x1b5cab(0x1d8)](pluginData[_0x1b5cab(0x5ab)],_0x1b5cab(0x3f2),_0x2403f6=>{const _0x312daf=_0x1b5cab;VisuMZ[_0x312daf(0x2fb)](_0x2403f6,_0x2403f6),$gameMap[_0x312daf(0x20f)]();}),VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x2b5)]=Scene_Boot['prototype']['onDatabaseLoaded'],Scene_Boot[_0x1b5cab(0x42e)][_0x1b5cab(0x235)]=function(){const _0x3670ea=_0x1b5cab;VisuMZ[_0x3670ea(0x45b)][_0x3670ea(0x2b5)][_0x3670ea(0x333)](this),this['process_VisuMZ_EventsMoveCore_LoadTemplateMaps'](),this['process_VisuMZ_EventsMoveCore_Switches_Variables']();if(VisuMZ[_0x3670ea(0x45b)][_0x3670ea(0x2d2)])VisuMZ[_0x3670ea(0x45b)][_0x3670ea(0x2d2)]['initialize']();},VisuMZ[_0x1b5cab(0x4ed)]=[],VisuMZ[_0x1b5cab(0x381)]={},Scene_Boot[_0x1b5cab(0x42e)][_0x1b5cab(0x266)]=function(){const _0x2a634b=_0x1b5cab;if(DataManager[_0x2a634b(0x24f)]()||DataManager[_0x2a634b(0x2ce)]())return;const _0x8cab85=VisuMZ[_0x2a634b(0x45b)][_0x2a634b(0x31c)][_0x2a634b(0x5a2)],_0x2a9805=_0x8cab85[_0x2a634b(0x32d)][_0x2a634b(0x174)](0x0);for(const _0x5298e0 of _0x8cab85[_0x2a634b(0x51a)]){_0x5298e0['Name']=_0x5298e0['Name'][_0x2a634b(0x2e3)]()[_0x2a634b(0x54c)](),VisuMZ[_0x2a634b(0x381)][_0x5298e0['Name']]=_0x5298e0;if(!_0x2a9805['includes'](_0x5298e0['MapID']))_0x2a9805[_0x2a634b(0x378)](_0x5298e0['MapID']);}for(const _0xe51b11 of _0x2a9805){if(_0x2a634b(0x5f0)==='JjQsS')return _0x5eb892>0x0?0x6:0x4;else{if(VisuMZ[_0x2a634b(0x4ed)][_0xe51b11])continue;const _0x1f201d=_0x2a634b(0x1b8)[_0x2a634b(0x30e)](_0xe51b11['padZero'](0x3)),_0xc44d1c=_0x2a634b(0x37b)[_0x2a634b(0x30e)](_0xe51b11);DataManager[_0x2a634b(0x2a4)](_0xc44d1c,_0x1f201d),setTimeout(this[_0x2a634b(0x1fa)][_0x2a634b(0x337)](this,_0xe51b11,_0xc44d1c),0x64);}}},Scene_Boot[_0x1b5cab(0x42e)][_0x1b5cab(0x1fa)]=function(_0x5cbd3d,_0x1412b5){const _0x5ac4fa=_0x1b5cab;if(window[_0x1412b5])VisuMZ['PreloadedMaps'][_0x5cbd3d]=window[_0x1412b5],window[_0x1412b5]=undefined;else{if('KmYzC'===_0x5ac4fa(0x440)){const _0x296ae4=_0x5b814b[_0x5ac4fa(0x45b)][_0x5ac4fa(0x31c)][_0x5ac4fa(0x47a)];if(!_0x296ae4[_0x5ac4fa(0x2b3)])return![];if(_0x58f477[_0x5ac4fa(0x3c1)]())return![];if(this[_0x5ac4fa(0x5e9)]()||this[_0x5ac4fa(0x318)]()||this[_0x5ac4fa(0x3b3)]())return![];return this[_0x5ac4fa(0x312)]<_0x296ae4[_0x5ac4fa(0x387)];}else setTimeout(this['VisuMZ_Setup_Preload_Map'][_0x5ac4fa(0x337)](this,_0x5cbd3d,_0x1412b5),0x64);}},VisuMZ[_0x1b5cab(0x236)]=[],VisuMZ[_0x1b5cab(0x335)]=[],VisuMZ[_0x1b5cab(0x28a)]=[],VisuMZ['SelfVariables']=[],Scene_Boot['prototype'][_0x1b5cab(0x300)]=function(){const _0x2850fe=_0x1b5cab;for(let _0x5bdce4=0x1;_0x5bdce4<$dataSystem[_0x2850fe(0x433)]['length'];_0x5bdce4++){if(_0x2850fe(0x44e)!==_0x2850fe(0x44e)){const _0x12a4ca=_0x3b4cfe[_0x2850fe(0x3ae)](_0xdabe31(_0x59283f['$1'])),_0x1eb144=this['checkCollisionKeywords'](_0x5ab1fa);return this[_0x2850fe(0x27e)](_0x12a4ca,_0x1eb144);}else{if($dataSystem['switches'][_0x5bdce4]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x2850fe(0x236)][_0x2850fe(0x378)](_0x5bdce4);if($dataSystem[_0x2850fe(0x433)][_0x5bdce4][_0x2850fe(0x3e6)](/<SELF>/i))VisuMZ['SelfSwitches'][_0x2850fe(0x378)](_0x5bdce4);}}for(let _0x31ef69=0x1;_0x31ef69<$dataSystem['variables'][_0x2850fe(0x55b)];_0x31ef69++){if(_0x2850fe(0x36d)!==_0x2850fe(0x16b)){if($dataSystem[_0x2850fe(0x2f0)][_0x31ef69][_0x2850fe(0x3e6)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x2850fe(0x28a)][_0x2850fe(0x378)](_0x31ef69);if($dataSystem['variables'][_0x31ef69][_0x2850fe(0x3e6)](/<SELF>/i))VisuMZ['SelfVariables'][_0x2850fe(0x378)](_0x31ef69);}else{if(this[_0x2850fe(0x4bf)]())return![];if(this['_isObjectCharacter'])return![];if(this[_0x2850fe(0x414)])return![];if(this[_0x2850fe(0x19c)]==='')return![];if(this['constructor']===_0x38377b)return![];return!![];}}},VisuMZ['EventsMoveCore']['CustomPageConditions']={},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x2d2)][_0x1b5cab(0x535)]=function(){const _0xb516ae=_0x1b5cab;this[_0xb516ae(0x57b)]=new Game_CPCInterpreter(),this[_0xb516ae(0x562)]();},VisuMZ['EventsMoveCore'][_0x1b5cab(0x2d2)][_0x1b5cab(0x562)]=function(){const _0x5ed439=_0x1b5cab;this[_0x5ed439(0x5e1)]=[];for(const _0x4dc825 of $dataCommonEvents){if(!_0x4dc825)continue;VisuMZ[_0x5ed439(0x45b)][_0x5ed439(0x2d2)][_0x5ed439(0x2ab)](_0x4dc825);if(_0x4dc825[_0x5ed439(0x3fe)][_0x5ed439(0x55b)]>0x0)this['_commonEvents']['push'](_0x4dc825['id']);}},VisuMZ['EventsMoveCore'][_0x1b5cab(0x2d2)]['metCPC']=function(_0x2881f4,_0x4dfb54){const _0x19d9c8=_0x1b5cab;return this[_0x19d9c8(0x57b)]['setup'](_0x2881f4,_0x4dfb54),this[_0x19d9c8(0x57b)][_0x19d9c8(0x1e5)](),this[_0x19d9c8(0x57b)]['_cpc'];},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x2d2)][_0x1b5cab(0x2ab)]=function(_0x595aed){const _0x4a3bc7=_0x1b5cab;let _0x1de75e=![];_0x595aed[_0x4a3bc7(0x3fe)]=[];for(const _0xebda5a of _0x595aed[_0x4a3bc7(0x342)]){if([0x6c,0x198][_0x4a3bc7(0x42c)](_0xebda5a[_0x4a3bc7(0x265)])){if('ejWQi'!==_0x4a3bc7(0x4ca)){const _0x4956a7=_0xebda5a[_0x4a3bc7(0x5b9)][0x0];if(_0x4956a7['match'](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x1de75e=!![];else _0x4956a7[_0x4a3bc7(0x3e6)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x1de75e=![]);}else this[_0x4a3bc7(0x170)][_0x4a3bc7(0x451)]=this[_0x4a3bc7(0x170)][_0x4a3bc7(0x451)]['replace'](/\\V\[(\d+)\]/gi,(_0x80a7fe,_0x545e36)=>_0x1ca7c3[_0x4a3bc7(0x262)](_0x41cfd4(_0x545e36)));}_0x1de75e&&(_0x4a3bc7(0x1d3)!==_0x4a3bc7(0x1d3)?[0x6c,0x198][_0x4a3bc7(0x42c)](_0xfb3bf9[_0x4a3bc7(0x265)])&&(_0x93b333+=_0x5cdd13[_0x4a3bc7(0x5b9)][0x0]):_0x595aed[_0x4a3bc7(0x3fe)][_0x4a3bc7(0x378)](_0xebda5a));}},getSelfSwitchValue=function(_0x39426d,_0xbe12fc,_0x4483a0){const _0x1044cb=_0x1b5cab;let _0xcb2a4f=[_0x39426d,_0xbe12fc,_0x1044cb(0x4df)[_0x1044cb(0x30e)](_0x4483a0)];return typeof _0x4483a0===_0x1044cb(0x538)&&(_0xcb2a4f=[_0x39426d,_0xbe12fc,_0x4483a0['toUpperCase']()[_0x1044cb(0x54c)]()]),$gameSelfSwitches[_0x1044cb(0x262)](_0xcb2a4f);},getSelfVariableValue=function(_0x4f2cbf,_0x163388,_0x22cb0d){const _0x4caec1=_0x1b5cab,_0x30cffc=[_0x4f2cbf,_0x163388,_0x4caec1(0x502)[_0x4caec1(0x30e)](_0x22cb0d)];return $gameSelfSwitches[_0x4caec1(0x262)](_0x30cffc);},setSelfSwitchValue=function(_0x4a8eb2,_0x524e85,_0x458eb0,_0x237a6b){const _0x44e537=_0x1b5cab;let _0x3bf5e2=[_0x4a8eb2,_0x524e85,'Self\x20Switch\x20%1'[_0x44e537(0x30e)](_0x458eb0)];typeof _0x458eb0===_0x44e537(0x538)&&(_0x3bf5e2=[_0x4a8eb2,_0x524e85,_0x458eb0['toUpperCase']()[_0x44e537(0x54c)]()]),$gameSelfSwitches[_0x44e537(0x186)](_0x3bf5e2,_0x237a6b);},setSelfVariableValue=function(_0x4625af,_0x529db8,_0x55d338,_0x103705){const _0x349df9=_0x1b5cab,_0x2aa6b1=[_0x4625af,_0x529db8,_0x349df9(0x502)[_0x349df9(0x30e)](_0x55d338)];$gameSelfSwitches[_0x349df9(0x186)](_0x2aa6b1,_0x103705);},DataManager[_0x1b5cab(0x3ad)]=function(_0xc4724a){const _0x2ea504=_0x1b5cab;if(SceneManager[_0x2ea504(0x4ec)][_0x2ea504(0x537)]===Scene_Debug)return![];return VisuMZ[_0x2ea504(0x236)][_0x2ea504(0x42c)](_0xc4724a);},DataManager[_0x1b5cab(0x5cc)]=function(_0x2bf28c){const _0x2b4952=_0x1b5cab;if(SceneManager['_scene'][_0x2b4952(0x537)]===Scene_Debug)return![];return VisuMZ['AdvancedVariables']['includes'](_0x2bf28c);},DataManager[_0x1b5cab(0x4f8)]=function(_0x2b4c15){const _0x1c025a=_0x1b5cab;if(SceneManager['_scene'][_0x1c025a(0x537)]===Scene_Debug)return![];return VisuMZ[_0x1c025a(0x335)][_0x1c025a(0x42c)](_0x2b4c15);},DataManager[_0x1b5cab(0x48d)]=function(_0x16f9e8){const _0x5a5288=_0x1b5cab;if(SceneManager[_0x5a5288(0x4ec)]['constructor']===Scene_Debug)return![];return VisuMZ[_0x5a5288(0x2a8)][_0x5a5288(0x42c)](_0x16f9e8);},VisuMZ['EventsMoveCore'][_0x1b5cab(0x530)]=Game_Temp[_0x1b5cab(0x42e)][_0x1b5cab(0x4f1)],Game_Temp['prototype'][_0x1b5cab(0x4f1)]=function(_0x5c3678,_0x502a34){const _0x2151d1=_0x1b5cab;if(this['isEventClickTriggered'](_0x5c3678,_0x502a34))return;VisuMZ['EventsMoveCore'][_0x2151d1(0x530)]['call'](this,_0x5c3678,_0x502a34);},Game_Temp[_0x1b5cab(0x42e)][_0x1b5cab(0x218)]=function(_0x4a7c08,_0x5eecf0){const _0x3c0c72=_0x1b5cab,_0x22cd85=$gameMap['eventsXy'](_0x4a7c08,_0x5eecf0);for(const _0x156b05 of _0x22cd85){if('KrFKy'!==_0x3c0c72(0x4e5)){if(_0x156b05&&_0x156b05[_0x3c0c72(0x234)]()){if(_0x3c0c72(0x32a)===_0x3c0c72(0x32a))return _0x156b05['onClickTrigger'](),!![];else _0x47fbf4[_0x3c0c72(0x45b)]['Game_Event_start'][_0x3c0c72(0x333)](this),_0x14f79e[_0x3c0c72(0x519)]&&_0x13ed71[_0x3c0c72(0x4da)](_0x2fa101[_0x3c0c72(0x522)][_0x3c0c72(0x31c)][_0x3c0c72(0x298)][_0x3c0c72(0x488)])&&_0x1059d0[_0x3c0c72(0x26c)]();}}else return this[_0x3c0c72(0x53f)](_0x17934f(_0x481582['$1']),_0x286a84(_0xf595ed['$2']));}return![];},Game_Temp[_0x1b5cab(0x42e)]['setLastPluginCommandInterpreter']=function(_0x161a75){const _0x1fcfb9=_0x1b5cab;this[_0x1fcfb9(0x4b0)]=_0x161a75;},Game_Temp[_0x1b5cab(0x42e)]['getLastPluginCommandInterpreter']=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp[_0x1b5cab(0x42e)][_0x1b5cab(0x1c2)]=function(_0x22c635){const _0x3bc852=_0x1b5cab;this[_0x3bc852(0x18a)]=_0x22c635;},Game_Temp['prototype'][_0x1b5cab(0x3e2)]=function(){const _0x5a88f8=_0x1b5cab;this[_0x5a88f8(0x18a)]=undefined;},Game_Temp['prototype'][_0x1b5cab(0x2bf)]=function(){const _0x4bff32=_0x1b5cab;return this[_0x4bff32(0x18a)];},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x4eb)]=Game_System[_0x1b5cab(0x42e)][_0x1b5cab(0x535)],Game_System[_0x1b5cab(0x42e)]['initialize']=function(){const _0x33f285=_0x1b5cab;VisuMZ[_0x33f285(0x45b)][_0x33f285(0x4eb)][_0x33f285(0x333)](this),this[_0x33f285(0x575)](),this['initFollowerController']();},Game_System[_0x1b5cab(0x42e)][_0x1b5cab(0x575)]=function(){const _0x1ff4bc=_0x1b5cab;this[_0x1ff4bc(0x55a)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0x1ff4bc(0x4e0)]={},this['_MapSpawnedEventData']=[],this['_PreservedEventMorphData']={},this['_SavedEventLocations']={},this[_0x1ff4bc(0x5f6)]=![],this[_0x1ff4bc(0x1c9)]=_0x1ff4bc(0x4be);},Game_System[_0x1b5cab(0x42e)]['isDashingEnabled']=function(){const _0x3ce515=_0x1b5cab;if(this[_0x3ce515(0x55a)]===undefined)this[_0x3ce515(0x575)]();if(this[_0x3ce515(0x55a)][_0x3ce515(0x408)]===undefined)this['initEventsMoveCore']();return this[_0x3ce515(0x55a)][_0x3ce515(0x408)];},Game_System['prototype'][_0x1b5cab(0x338)]=function(_0x86da68){const _0x48d6d2=_0x1b5cab;if(this[_0x48d6d2(0x55a)]===undefined)this[_0x48d6d2(0x575)]();if(this[_0x48d6d2(0x55a)]['DashingEnable']===undefined)this[_0x48d6d2(0x575)]();this['_EventsMoveCoreSettings'][_0x48d6d2(0x408)]=_0x86da68;},Game_System['prototype'][_0x1b5cab(0x2c2)]=function(){const _0x2e1c2c=_0x1b5cab;if(this[_0x2e1c2c(0x55a)]===undefined)this['initEventsMoveCore']();if(this[_0x2e1c2c(0x55a)][_0x2e1c2c(0x534)]===undefined)this[_0x2e1c2c(0x575)]();return this[_0x2e1c2c(0x55a)]['EventAutoMovement'];},Game_System[_0x1b5cab(0x42e)]['setAllowEventAutoMovement']=function(_0x5467b0){const _0x1aaa5a=_0x1b5cab;if(this['_EventsMoveCoreSettings']===undefined)this['initEventsMoveCore']();if(this['_EventsMoveCoreSettings'][_0x1aaa5a(0x534)]===undefined)this[_0x1aaa5a(0x575)]();this[_0x1aaa5a(0x55a)][_0x1aaa5a(0x534)]=_0x5467b0;},Game_System[_0x1b5cab(0x42e)][_0x1b5cab(0x1e9)]=function(){const _0x1dbd3f=_0x1b5cab;if(this['_EventsMoveCoreSettings']===undefined)this[_0x1dbd3f(0x575)]();if(this[_0x1dbd3f(0x55a)][_0x1dbd3f(0x3e5)]===undefined)this[_0x1dbd3f(0x575)]();return this[_0x1dbd3f(0x55a)][_0x1dbd3f(0x3e5)];},Game_System[_0x1b5cab(0x42e)][_0x1b5cab(0x2f7)]=function(_0x3e98e1){const _0x13dc89=_0x1b5cab;if(this[_0x13dc89(0x55a)]===undefined)this['initEventsMoveCore']();if(this[_0x13dc89(0x55a)]['VisibleEventLabels']===undefined)this['initEventsMoveCore']();this['_EventsMoveCoreSettings'][_0x13dc89(0x3e5)]=_0x3e98e1;},Game_System['prototype'][_0x1b5cab(0x249)]=function(){const _0x5b6316=_0x1b5cab;return this['_DisablePlayerControl']===undefined&&(this[_0x5b6316(0x5f6)]=![]),this['_DisablePlayerControl'];},Game_System[_0x1b5cab(0x42e)][_0x1b5cab(0x321)]=function(_0x468db3){this['_DisablePlayerControl']=_0x468db3;},Game_System['prototype'][_0x1b5cab(0x1ea)]=function(){const _0x1bfe7a=_0x1b5cab;return this[_0x1bfe7a(0x1c9)];},Game_System[_0x1b5cab(0x42e)][_0x1b5cab(0x243)]=function(_0x12301e){const _0x4d9686=_0x1b5cab;this[_0x4d9686(0x1c9)]=String(_0x12301e)[_0x4d9686(0x53c)]()[_0x4d9686(0x54c)]();},Game_System[_0x1b5cab(0x42e)][_0x1b5cab(0x442)]=function(_0x3b2aa7){const _0x40f7a1=_0x1b5cab;if(this[_0x40f7a1(0x4e0)]===undefined)this[_0x40f7a1(0x575)]();if(!_0x3b2aa7)return null;if(_0x3b2aa7===$gamePlayer)return _0x40f7a1(0x474)!==_0x40f7a1(0x4e7)?this[_0x40f7a1(0x4e0)][_0x40f7a1(0x3f3)]:this[_0x40f7a1(0x20a)](_0x4316a2);else{const _0x30e519=VisuMZ[_0x40f7a1(0x45b)][_0x40f7a1(0x31c)],_0x49ce48=_0x40f7a1(0x412)['format'](_0x3b2aa7[_0x40f7a1(0x290)],_0x3b2aa7['_eventId']);return this['_EventIcons'][_0x49ce48]=this[_0x40f7a1(0x4e0)][_0x49ce48]||{'iconIndex':0x0,'bufferX':_0x30e519['Icon'][_0x40f7a1(0x48b)],'bufferY':_0x30e519[_0x40f7a1(0x4c9)][_0x40f7a1(0x5e0)],'blendMode':_0x30e519[_0x40f7a1(0x4c9)]['BlendMode']},this[_0x40f7a1(0x4e0)][_0x49ce48];}},Game_System[_0x1b5cab(0x42e)][_0x1b5cab(0x2f8)]=function(_0xa0d84a,_0x25bc7f,_0x1d6429,_0xf422b9,_0x1359e8){const _0x5020d6=_0x1b5cab;if(this['_EventIcons']===undefined)this[_0x5020d6(0x575)]();const _0x121309=_0xa0d84a===$gamePlayer?_0x5020d6(0x3f3):'Map%1-Event%2'[_0x5020d6(0x30e)](_0xa0d84a[_0x5020d6(0x290)],_0xa0d84a[_0x5020d6(0x332)]);this['_EventIcons'][_0x121309]={'iconIndex':_0x25bc7f,'bufferX':_0x1d6429,'bufferY':_0xf422b9,'blendMode':_0x1359e8};},Game_System[_0x1b5cab(0x42e)][_0x1b5cab(0x3b8)]=function(_0x5517af,_0x1b0599,_0x5c0aeb,_0x1a847c,_0x1babd8,_0x3fa174){const _0x16eed3=_0x1b5cab;if(this[_0x16eed3(0x4e0)]===undefined)this[_0x16eed3(0x575)]();const _0x5dda3c=_0x16eed3(0x412)['format'](_0x5517af,_0x1b0599);this['_EventIcons'][_0x5dda3c]={'iconIndex':_0x5c0aeb,'bufferX':_0x1a847c,'bufferY':_0x1babd8,'blendMode':_0x3fa174};},Game_System[_0x1b5cab(0x42e)][_0x1b5cab(0x215)]=function(_0x488511){const _0x3edfcf=_0x1b5cab;if(this[_0x3edfcf(0x4e0)]===undefined)this[_0x3edfcf(0x575)]();if(!_0x488511)return null;if(_0x488511===$gamePlayer)delete this[_0x3edfcf(0x4e0)][_0x3edfcf(0x3f3)];else{if(_0x3edfcf(0x53a)!==_0x3edfcf(0x53a)){if(!this['isNormalPriority']())return![];else{const _0x4b0554=_0x55ec40[_0x3edfcf(0x4d1)](_0x12d65b,_0x36d873)['filter'](_0x3051d0=>_0x3051d0!==this&&_0x3051d0[_0x3edfcf(0x4c6)]());return _0x4b0554[_0x3edfcf(0x55b)]>0x0;}}else this[_0x3edfcf(0x483)](_0x488511[_0x3edfcf(0x290)],_0x488511[_0x3edfcf(0x332)]);}},Game_System[_0x1b5cab(0x42e)][_0x1b5cab(0x483)]=function(_0x2e9170,_0x516fe8){const _0x3b0453=_0x1b5cab;if(this[_0x3b0453(0x4e0)]===undefined)this[_0x3b0453(0x575)]();const _0x50521e='Map%1-Event%2'[_0x3b0453(0x30e)](_0x2e9170,_0x516fe8);delete this[_0x3b0453(0x4e0)][_0x50521e];},Game_System[_0x1b5cab(0x42e)][_0x1b5cab(0x195)]=function(_0x244329){const _0x2fbede=_0x1b5cab;if(this[_0x2fbede(0x390)]===undefined)this[_0x2fbede(0x575)]();if(!_0x244329)return null;const _0x831ce4=_0x2fbede(0x412)[_0x2fbede(0x30e)](_0x244329[_0x2fbede(0x290)],_0x244329[_0x2fbede(0x332)]);return this[_0x2fbede(0x390)][_0x831ce4];},Game_System[_0x1b5cab(0x42e)][_0x1b5cab(0x32b)]=function(_0x5c8875){const _0x518437=_0x1b5cab;if(this['_SavedEventLocations']===undefined)this[_0x518437(0x575)]();if(!_0x5c8875)return;const _0x5a1a5f=_0x518437(0x412)[_0x518437(0x30e)](_0x5c8875[_0x518437(0x290)],_0x5c8875[_0x518437(0x332)]);this[_0x518437(0x390)][_0x5a1a5f]={'direction':_0x5c8875[_0x518437(0x246)](),'x':Math[_0x518437(0x308)](_0x5c8875['x']),'y':Math['round'](_0x5c8875['y']),'pageIndex':_0x5c8875['_pageIndex'],'moveRouteIndex':_0x5c8875[_0x518437(0x21b)]};},Game_System['prototype'][_0x1b5cab(0x348)]=function(_0x4913ab){const _0x20229e=_0x1b5cab;if(this[_0x20229e(0x390)]===undefined)this[_0x20229e(0x575)]();if(!_0x4913ab)return;this[_0x20229e(0x1e1)](_0x4913ab['_mapId'],_0x4913ab[_0x20229e(0x332)]);},Game_System[_0x1b5cab(0x42e)][_0x1b5cab(0x1e1)]=function(_0x584130,_0x192d00){const _0x4df4aa=_0x1b5cab;if(this[_0x4df4aa(0x390)]===undefined)this[_0x4df4aa(0x575)]();const _0x172321='Map%1-Event%2'['format'](_0x584130,_0x192d00);delete this[_0x4df4aa(0x390)][_0x172321];},Game_System['prototype']['createSaveEventLocationData']=function(_0x565c66,_0x4271fd,_0x14380d,_0x56e79b,_0x563c87,_0x18b63d,_0x3d1dbf){const _0x1836bf=_0x1b5cab;if(this[_0x1836bf(0x390)]===undefined)this[_0x1836bf(0x575)]();const _0x4008bd=_0x1836bf(0x412)[_0x1836bf(0x30e)](_0x565c66,_0x4271fd);this[_0x1836bf(0x390)][_0x4008bd]={'direction':_0x563c87,'x':Math['round'](_0x14380d),'y':Math[_0x1836bf(0x308)](_0x56e79b),'pageIndex':_0x18b63d,'moveRouteIndex':_0x3d1dbf};},Game_System[_0x1b5cab(0x42e)][_0x1b5cab(0x310)]=function(_0x6fe5ce){const _0x4c4be0=_0x1b5cab;if(this[_0x4c4be0(0x566)]===undefined)this[_0x4c4be0(0x575)]();if(!_0x6fe5ce)return;const _0x3df3f=_0x4c4be0(0x412)['format'](_0x6fe5ce[_0x4c4be0(0x290)],_0x6fe5ce[_0x4c4be0(0x332)]);return this[_0x4c4be0(0x566)][_0x3df3f];},Game_System['prototype'][_0x1b5cab(0x5ed)]=function(_0x39cee9,_0x4350ea,_0xbd2fdd,_0x1ac944,_0x3c0538){const _0x3cc1c1=_0x1b5cab;if(this['_PreservedEventMorphData']===undefined)this['initEventsMoveCore']();const _0x1902c9=_0x3cc1c1(0x412)['format'](_0x39cee9,_0x4350ea);this[_0x3cc1c1(0x566)][_0x1902c9]={'template':_0xbd2fdd,'mapId':_0x1ac944,'eventId':_0x3c0538};},Game_System[_0x1b5cab(0x42e)][_0x1b5cab(0x1b3)]=function(_0xf3fee6,_0x480a39){const _0x4c73c0=_0x1b5cab;if(this[_0x4c73c0(0x566)]===undefined)this['initEventsMoveCore']();const _0x5b52b4=_0x4c73c0(0x412)['format'](_0xf3fee6,_0x480a39);delete this[_0x4c73c0(0x566)][_0x5b52b4];},Game_System[_0x1b5cab(0x42e)][_0x1b5cab(0x1ec)]=function(_0x347808){const _0x1ac4ab=_0x1b5cab;if(this[_0x1ac4ab(0x59a)]===undefined)this[_0x1ac4ab(0x575)]();return this[_0x1ac4ab(0x59a)][_0x347808]=this[_0x1ac4ab(0x59a)][_0x347808]||[],this['_MapSpawnedEventData'][_0x347808];},Game_System[_0x1b5cab(0x42e)][_0x1b5cab(0x2e9)]=function(_0x361487){const _0x165319=_0x1b5cab,_0x1d341a=this[_0x165319(0x1ec)](_0x361487);for(const _0x27868f of _0x1d341a){if(_0x165319(0x471)===_0x165319(0x471)){if(!_0x27868f)continue;if(_0x27868f[_0x165319(0x375)])continue;const _0x1ad806=_0x1d341a['indexOf'](_0x27868f);_0x1d341a[_0x1ad806]=null;}else{if(!this[_0x165319(0x313)]['visible'])return![];return _0x1a5fa5[_0x165319(0x42e)][_0x165319(0x50a)][_0x165319(0x333)](this);}}},Game_System[_0x1b5cab(0x42e)][_0x1b5cab(0x3cc)]=function(){const _0x3ab6b5=_0x1b5cab;this[_0x3ab6b5(0x1eb)]=0x0,this[_0x3ab6b5(0x323)]=![];},Game_System[_0x1b5cab(0x42e)]['getControlledFollowerID']=function(){const _0x347dcd=_0x1b5cab;if(this['_followerControlID']===undefined)this[_0x347dcd(0x3cc)]();return this[_0x347dcd(0x1eb)];},Game_System[_0x1b5cab(0x42e)][_0x1b5cab(0x4b1)]=function(_0x45e4ab){const _0x296c2c=_0x1b5cab;if(this['_followerControlID']===undefined)this[_0x296c2c(0x3cc)]();this[_0x296c2c(0x1eb)]=_0x45e4ab;;},VisuMZ['EventsMoveCore']['Game_Interpreter_character']=Game_Interpreter[_0x1b5cab(0x42e)]['character'],Game_Interpreter[_0x1b5cab(0x42e)]['character']=function(_0xb727ea){const _0x3b4509=_0x1b5cab;if(!$gameParty[_0x3b4509(0x50b)]()&&_0xb727ea<0x0){let _0x15aaef=$gameSystem[_0x3b4509(0x1af)]();if(_0x15aaef>0x0)return $gamePlayer[_0x3b4509(0x370)]()[_0x3b4509(0x2d0)](_0x15aaef-0x1);}return VisuMZ[_0x3b4509(0x45b)]['Game_Interpreter_character'][_0x3b4509(0x333)](this,_0xb727ea);},Game_System['prototype']['isStopFollowerChasing']=function(){const _0x48bcec=_0x1b5cab;if(this[_0x48bcec(0x323)]===undefined)this[_0x48bcec(0x3cc)]();return this['_followerChaseOff'];},Game_System[_0x1b5cab(0x42e)][_0x1b5cab(0x2f3)]=function(_0x467009){const _0x40b37d=_0x1b5cab;if(this[_0x40b37d(0x323)]===undefined)this['initFollowerController']();this[_0x40b37d(0x323)]=_0x467009;;},VisuMZ['EventsMoveCore'][_0x1b5cab(0x203)]=Game_Timer[_0x1b5cab(0x42e)][_0x1b5cab(0x535)],Game_Timer['prototype'][_0x1b5cab(0x535)]=function(){const _0x35dca2=_0x1b5cab;VisuMZ[_0x35dca2(0x45b)][_0x35dca2(0x203)]['call'](this),this[_0x35dca2(0x575)]();},Game_Timer['prototype']['initEventsMoveCore']=function(){const _0x23f69c=_0x1b5cab;this[_0x23f69c(0x48a)]=![],this[_0x23f69c(0x429)]=-0x1,this[_0x23f69c(0x43c)]=0x0;},Game_Timer[_0x1b5cab(0x42e)]['update']=function(_0x17eabe){const _0x5bacff=_0x1b5cab;if(!_0x17eabe)return;if(!this[_0x5bacff(0x398)])return;if(this[_0x5bacff(0x48a)])return;if(this[_0x5bacff(0x2b8)]<=0x0)return;if(this[_0x5bacff(0x429)]===undefined)this[_0x5bacff(0x575)]();this[_0x5bacff(0x2b8)]+=this[_0x5bacff(0x429)];if(this[_0x5bacff(0x2b8)]<=0x0){if(_0x5bacff(0x254)===_0x5bacff(0x254))this[_0x5bacff(0x5f8)]();else return this['turnTowardCharacter'](_0x597baa);}},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x3c9)]=Game_Timer['prototype'][_0x1b5cab(0x297)],Game_Timer[_0x1b5cab(0x42e)][_0x1b5cab(0x297)]=function(_0x4bb0dc){const _0x2db318=_0x1b5cab;VisuMZ[_0x2db318(0x45b)][_0x2db318(0x3c9)][_0x2db318(0x333)](this,_0x4bb0dc);if(this[_0x2db318(0x48a)]===undefined)this['initEventsMoveCore']();this[_0x2db318(0x48a)]=![];},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x4af)]=Game_Timer[_0x1b5cab(0x42e)][_0x1b5cab(0x1b9)],Game_Timer[_0x1b5cab(0x42e)][_0x1b5cab(0x1b9)]=function(){const _0x5ecf68=_0x1b5cab;VisuMZ[_0x5ecf68(0x45b)]['Game_Timer_stop'][_0x5ecf68(0x333)](this);if(this['_paused']===undefined)this['initEventsMoveCore']();this[_0x5ecf68(0x48a)]=![];},Game_Timer[_0x1b5cab(0x42e)][_0x1b5cab(0x33e)]=function(){const _0x3da9f7=_0x1b5cab;if(this['_frames']<=0x0)return;this[_0x3da9f7(0x48a)]=!![],this[_0x3da9f7(0x398)]=!![];},Game_Timer[_0x1b5cab(0x42e)][_0x1b5cab(0x395)]=function(){const _0x7d4d69=_0x1b5cab;if(this[_0x7d4d69(0x2b8)]<=0x0)return;this['_paused']=![],this[_0x7d4d69(0x398)]=!![];},Game_Timer['prototype']['gainFrames']=function(_0x47290d){const _0x1d7aa5=_0x1b5cab;this[_0x1d7aa5(0x2b8)]=this['_frames']||0x0,this[_0x1d7aa5(0x2b8)]+=_0x47290d,this[_0x1d7aa5(0x398)]=!![],this[_0x1d7aa5(0x2b8)]=Math[_0x1d7aa5(0x49a)](0x1,this[_0x1d7aa5(0x2b8)]);},Game_Timer[_0x1b5cab(0x42e)][_0x1b5cab(0x553)]=function(_0x59bda0){const _0x57b964=_0x1b5cab;this['_frames']=this[_0x57b964(0x2b8)]||0x0,this['_frames']=_0x59bda0,this[_0x57b964(0x398)]=!![],this['_frames']=Math[_0x57b964(0x49a)](0x1,this[_0x57b964(0x2b8)]);},Game_Timer['prototype']['changeSpeed']=function(_0x23f413){const _0x5c8980=_0x1b5cab;this[_0x5c8980(0x429)]=_0x23f413,this['_working']=!![];if(_0x23f413>0x0){if(_0x5c8980(0x4e9)===_0x5c8980(0x1aa)){const _0x59bfda=_0x466c0f[_0x5c8980(0x4b3)](this['moveSynchTarget']());this[_0x5c8980(0x276)](_0x59bfda[_0x5c8980(0x592)]());}else this[_0x5c8980(0x2b8)]=Math[_0x5c8980(0x49a)](this['_frames'],0x1);}},Game_Timer[_0x1b5cab(0x42e)][_0x1b5cab(0x520)]=function(_0x505dd3){const _0x134f72=_0x1b5cab;if(this['_expireCommonEvent']===undefined)this[_0x134f72(0x575)]();this['_expireCommonEvent']=_0x505dd3;},VisuMZ['EventsMoveCore'][_0x1b5cab(0x43f)]=Game_Timer[_0x1b5cab(0x42e)][_0x1b5cab(0x5f8)],Game_Timer[_0x1b5cab(0x42e)]['onExpire']=function(){const _0x296e01=_0x1b5cab;if(this['_expireCommonEvent']===undefined)this[_0x296e01(0x575)]();if(this[_0x296e01(0x43c)]){if(_0x296e01(0x4ea)!==_0x296e01(0x2d9))$gameTemp[_0x296e01(0x2a6)](this[_0x296e01(0x43c)]);else return!![];}else{if('zBCsD'===_0x296e01(0x366))VisuMZ['EventsMoveCore'][_0x296e01(0x43f)][_0x296e01(0x333)](this);else{if(_0x6dd69['isRegionAllowPass'](_0x2a8d28,_0x2a4a85,_0x114f8d,'player'))return this[_0x296e01(0x3e1)]()&&this[_0x296e01(0x601)]()?this[_0x296e01(0x601)]()['isMapPassable'](_0x635b1,_0x240e18,_0x3fd4e7):!![];if(_0x269fc7[_0x296e01(0x503)](_0x417156,_0x44c894,_0x252adf,_0x296e01(0x38c)))return![];return _0x409f32['EventsMoveCore'][_0x296e01(0x359)]['call'](this,_0x3c073e,_0x5d9383,_0x3d32c3);}}},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x340)]=Game_Message['prototype']['add'],Game_Message[_0x1b5cab(0x42e)][_0x1b5cab(0x5ad)]=function(_0x5dad3f){const _0xef5e96=_0x1b5cab;VisuMZ[_0xef5e96(0x45b)][_0xef5e96(0x340)][_0xef5e96(0x333)](this,_0x5dad3f),this[_0xef5e96(0x334)]=$gameTemp[_0xef5e96(0x2bf)]();},Game_Message['prototype'][_0x1b5cab(0x364)]=function(){const _0x20091a=_0x1b5cab;$gameTemp[_0x20091a(0x1c2)](this[_0x20091a(0x334)]);},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x508)]=Game_Switches[_0x1b5cab(0x42e)]['value'],Game_Switches[_0x1b5cab(0x42e)][_0x1b5cab(0x262)]=function(_0x279de7){const _0x297c75=_0x1b5cab;if(DataManager[_0x297c75(0x3ad)](_0x279de7))return!!this[_0x297c75(0x1de)](_0x279de7);else{if(DataManager[_0x297c75(0x4f8)](_0x279de7)){if(_0x297c75(0x4b4)==='gseUk'){const _0x543e48=this[_0x297c75(0x273)](this['direction']());return _0x3d54a3[_0x297c75(0x56c)](this['x'],_0x543e48);}else return!!this[_0x297c75(0x1fe)](_0x279de7);}else return _0x297c75(0x17e)!==_0x297c75(0x3d6)?VisuMZ['EventsMoveCore']['Game_Switches_value'][_0x297c75(0x333)](this,_0x279de7):!!this[_0x297c75(0x435)];}},Game_Switches[_0x1b5cab(0x576)]={},Game_Switches['prototype'][_0x1b5cab(0x1de)]=function(_0x51e300){const _0x3603f3=_0x1b5cab;if(!Game_Switches['advancedFunc'][_0x51e300]){$dataSystem['switches'][_0x51e300][_0x3603f3(0x3e6)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x1163bb=_0x3603f3(0x17d)[_0x3603f3(0x30e)](String(RegExp['$1']));Game_Switches[_0x3603f3(0x576)][_0x51e300]=new Function(_0x3603f3(0x299),_0x1163bb);}const _0x8891b8=$gameTemp[_0x3603f3(0x2bf)]()||this;return Game_Switches[_0x3603f3(0x576)][_0x51e300][_0x3603f3(0x333)](_0x8891b8,_0x51e300);},Game_Switches[_0x1b5cab(0x42e)][_0x1b5cab(0x1fe)]=function(_0x3bb12d){const _0x1289b3=_0x1b5cab,_0x56b86b=$gameTemp['getSelfTarget']()||this;if(_0x56b86b['constructor']!==Game_Event)return VisuMZ[_0x1289b3(0x45b)]['Game_Switches_value'][_0x1289b3(0x333)](this,_0x3bb12d);else{const _0x5b7cbd=[_0x56b86b['_mapId'],_0x56b86b[_0x1289b3(0x332)],_0x1289b3(0x4df)[_0x1289b3(0x30e)](_0x3bb12d)];return $gameSelfSwitches[_0x1289b3(0x262)](_0x5b7cbd);}},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x1e2)]=Game_Switches[_0x1b5cab(0x42e)][_0x1b5cab(0x186)],Game_Switches[_0x1b5cab(0x42e)]['setValue']=function(_0x1884e4,_0x179eed){const _0x30070b=_0x1b5cab;if(DataManager[_0x30070b(0x4f8)](_0x1884e4)){if(_0x30070b(0x1f9)!=='vcjSk')this[_0x30070b(0x565)](_0x1884e4,_0x179eed);else{_0x21e9cf=_0x30791b[_0x30070b(0x2e3)]()[_0x30070b(0x54c)]();const _0x43906c=_0x39e272[_0x30070b(0x381)][_0x54f7b1];if(!_0x43906c)return;const _0xeefcb5=_0x43906c['MapID'],_0x473bb6=_0x43906c[_0x30070b(0x2ee)];if(!this[_0x30070b(0x501)](_0xeefcb5,_0x473bb6))return;if(!_0x44bd3e)_0x43906c['PreMorphJS'][_0x30070b(0x333)](this,_0xeefcb5,_0x473bb6,this);this[_0x30070b(0x40d)](_0xeefcb5,_0x473bb6,_0x596327);if(!_0x194cbb)_0x43906c['PostMorphJS'][_0x30070b(0x333)](this,_0xeefcb5,_0x473bb6,this);if(_0x5aecab)_0x2d79c0['clearEventCache']();}}else VisuMZ[_0x30070b(0x45b)][_0x30070b(0x1e2)][_0x30070b(0x333)](this,_0x1884e4,_0x179eed);},Game_Switches[_0x1b5cab(0x42e)][_0x1b5cab(0x565)]=function(_0x4501f0,_0x324562){const _0x29ef1c=_0x1b5cab,_0x19da14=$gameTemp[_0x29ef1c(0x2bf)]()||this;if(_0x19da14[_0x29ef1c(0x537)]!==Game_Event)VisuMZ[_0x29ef1c(0x45b)][_0x29ef1c(0x1e2)]['call'](this,_0x4501f0,_0x324562);else{if(_0x29ef1c(0x555)===_0x29ef1c(0x555)){const _0x3daa17=[_0x19da14['_mapId'],_0x19da14[_0x29ef1c(0x332)],_0x29ef1c(0x4df)[_0x29ef1c(0x30e)](_0x4501f0)];$gameSelfSwitches[_0x29ef1c(0x186)](_0x3daa17,_0x324562);}else{if(this[_0x29ef1c(0x2b8)]<=0x0)return;this[_0x29ef1c(0x48a)]=![],this[_0x29ef1c(0x398)]=!![];}}},VisuMZ[_0x1b5cab(0x45b)]['Game_Variables_value']=Game_Variables[_0x1b5cab(0x42e)][_0x1b5cab(0x262)],Game_Variables[_0x1b5cab(0x42e)]['value']=function(_0x3e11cf){const _0x57e0b0=_0x1b5cab;if(DataManager['isAdvancedVariable'](_0x3e11cf)){if(_0x57e0b0(0x56d)===_0x57e0b0(0x56d))return this[_0x57e0b0(0x1de)](_0x3e11cf);else _0x641b40[_0x57e0b0(0x2fb)](_0x11b8b4,_0x5cbfc1),_0x27858f[_0x57e0b0(0x215)](_0x14a147);}else{if(DataManager[_0x57e0b0(0x48d)](_0x3e11cf))return _0x57e0b0(0x526)==='TRWVn'?this[_0x57e0b0(0x1fe)](_0x3e11cf):this['isSpriteVS8dir']()&&!!this[_0x57e0b0(0x597)];else{if(_0x57e0b0(0x487)!==_0x57e0b0(0x204))return VisuMZ['EventsMoveCore'][_0x57e0b0(0x570)][_0x57e0b0(0x333)](this,_0x3e11cf);else{const _0x479b55=_0x26280c[_0x46edee[_0x57e0b0(0x2cb)](_0x29d600['length'])];this[_0x57e0b0(0x276)](_0x479b55);}}}},Game_Variables[_0x1b5cab(0x576)]={},Game_Variables[_0x1b5cab(0x42e)][_0x1b5cab(0x1de)]=function(_0x13eab1){const _0x590184=_0x1b5cab;if(!Game_Variables['advancedFunc'][_0x13eab1]){$dataSystem[_0x590184(0x2f0)][_0x13eab1]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x414402=_0x590184(0x17d)[_0x590184(0x30e)](String(RegExp['$1']));Game_Variables['advancedFunc'][_0x13eab1]=new Function(_0x590184(0x181),_0x414402);}const _0x4fbf20=$gameTemp[_0x590184(0x2bf)]()||this;return Game_Variables['advancedFunc'][_0x13eab1][_0x590184(0x333)](_0x4fbf20,_0x13eab1);},Game_Variables[_0x1b5cab(0x42e)][_0x1b5cab(0x1fe)]=function(_0xb15136){const _0x3b7bd1=_0x1b5cab,_0x51a43b=$gameTemp['getSelfTarget']()||this;if(_0x51a43b[_0x3b7bd1(0x537)]!==Game_Event)return VisuMZ[_0x3b7bd1(0x45b)][_0x3b7bd1(0x570)]['call'](this,_0xb15136);else{const _0x2b057f=[_0x51a43b[_0x3b7bd1(0x290)],_0x51a43b[_0x3b7bd1(0x332)],_0x3b7bd1(0x502)[_0x3b7bd1(0x30e)](_0xb15136)];return $gameSelfSwitches[_0x3b7bd1(0x262)](_0x2b057f);}},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x2a7)]=Game_Variables[_0x1b5cab(0x42e)][_0x1b5cab(0x186)],Game_Variables['prototype'][_0x1b5cab(0x186)]=function(_0x93ea4d,_0x31acaa){const _0x1a4d84=_0x1b5cab;if(DataManager[_0x1a4d84(0x48d)](_0x93ea4d)){if(_0x1a4d84(0x3f1)===_0x1a4d84(0x5bc)){let _0x3bef7d=0x0;if(_0x477cd6)_0x4364d5[_0x1a4d84(0x5ac)]=!![];_0x1fe46f[_0x1a4d84(0x516)]()?_0x3bef7d=this[_0x1a4d84(0x4b8)](_0x55580a,_0x545454):_0x3bef7d=this['findDirectionTo'](_0xb5e2d6,_0xcea546);if(_0xbfbea7)_0x5b9e81['_moveAllowPlayerCollision']=![];this[_0x1a4d84(0x276)](_0x3bef7d),this['setMovementSuccess'](!![]);}else this[_0x1a4d84(0x565)](_0x93ea4d,_0x31acaa);}else VisuMZ[_0x1a4d84(0x45b)][_0x1a4d84(0x2a7)]['call'](this,_0x93ea4d,_0x31acaa);},Game_Variables[_0x1b5cab(0x42e)]['setSelfValue']=function(_0x473962,_0x2a7d92){const _0x385ab3=_0x1b5cab,_0x440bc1=$gameTemp[_0x385ab3(0x2bf)]()||this;if(_0x440bc1[_0x385ab3(0x537)]!==Game_Event)VisuMZ[_0x385ab3(0x45b)][_0x385ab3(0x2a7)]['call'](this,_0x473962,_0x2a7d92);else{if('nVPyl'!==_0x385ab3(0x22b))this[_0x385ab3(0x2e9)](_0x58cf12),this[_0x385ab3(0x3b1)](),_0x1f093f['EventsMoveCore'][_0x385ab3(0x590)][_0x385ab3(0x333)](this,_0x4d8b98),this[_0x385ab3(0x3b1)](),this['setupDiagonalSupport'](),this[_0x385ab3(0x29e)](),this[_0x385ab3(0x208)](),this[_0x385ab3(0x589)](),this[_0x385ab3(0x3b1)]();else{const _0x90b6b9=[_0x440bc1[_0x385ab3(0x290)],_0x440bc1[_0x385ab3(0x332)],_0x385ab3(0x502)[_0x385ab3(0x30e)](_0x473962)];$gameSelfSwitches[_0x385ab3(0x186)](_0x90b6b9,_0x2a7d92);}}},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x2a0)]=Game_SelfSwitches[_0x1b5cab(0x42e)][_0x1b5cab(0x262)],Game_SelfSwitches[_0x1b5cab(0x42e)]['value']=function(_0xa05f51){const _0xdb25da=_0x1b5cab;if(_0xa05f51[0x2][_0xdb25da(0x3e6)](/SELF/i))return this[_0xdb25da(0x1fe)](_0xa05f51);else{return VisuMZ[_0xdb25da(0x45b)][_0xdb25da(0x2a0)][_0xdb25da(0x333)](this,_0xa05f51);;}},Game_SelfSwitches[_0x1b5cab(0x42e)][_0x1b5cab(0x1fe)]=function(_0x3dc85a){const _0x54a4ec=_0x1b5cab;return _0x3dc85a[0x2][_0x54a4ec(0x3e6)](/VAR/i)?this[_0x54a4ec(0x51c)][_0x3dc85a]||0x0:!!this['_data'][_0x3dc85a];},VisuMZ['EventsMoveCore'][_0x1b5cab(0x52c)]=Game_SelfSwitches[_0x1b5cab(0x42e)][_0x1b5cab(0x186)],Game_SelfSwitches[_0x1b5cab(0x42e)]['setValue']=function(_0x52e4d5,_0x490868){const _0x1c515f=_0x1b5cab;_0x52e4d5[0x2][_0x1c515f(0x3e6)](/SELF/i)?_0x1c515f(0x476)!==_0x1c515f(0x214)?this[_0x1c515f(0x565)](_0x52e4d5,_0x490868):this['turnRight90']():VisuMZ[_0x1c515f(0x45b)]['Game_SelfSwitches_setValue'][_0x1c515f(0x333)](this,_0x52e4d5,_0x490868);},Game_SelfSwitches[_0x1b5cab(0x42e)][_0x1b5cab(0x565)]=function(_0x4f3e1a,_0x103294){const _0x1ae618=_0x1b5cab;this[_0x1ae618(0x51c)][_0x4f3e1a]=_0x4f3e1a[0x2][_0x1ae618(0x3e6)](/VAR/i)?_0x103294:!!_0x103294,this[_0x1ae618(0x586)]();},VisuMZ['EventsMoveCore']['Game_Enemy_meetsSwitchCondition']=Game_Enemy[_0x1b5cab(0x42e)][_0x1b5cab(0x39c)],Game_Enemy[_0x1b5cab(0x42e)][_0x1b5cab(0x39c)]=function(_0x2eefa5){const _0x3cf30f=_0x1b5cab;$gameTemp[_0x3cf30f(0x1c2)](this);const _0x2e8cbb=VisuMZ[_0x3cf30f(0x45b)][_0x3cf30f(0x53e)][_0x3cf30f(0x333)](this,_0x2eefa5);return $gameTemp[_0x3cf30f(0x3e2)](),_0x2e8cbb;},VisuMZ[_0x1b5cab(0x45b)]['Game_Troop_meetsConditions']=Game_Troop[_0x1b5cab(0x42e)][_0x1b5cab(0x27a)],Game_Troop['prototype'][_0x1b5cab(0x27a)]=function(_0xe8f235){const _0x4465ee=_0x1b5cab;$gameTemp[_0x4465ee(0x1c2)](this);const _0x2f12a2=VisuMZ[_0x4465ee(0x45b)][_0x4465ee(0x367)][_0x4465ee(0x333)](this,_0xe8f235);return $gameTemp[_0x4465ee(0x3e2)](),_0x2f12a2;},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x590)]=Game_Map['prototype'][_0x1b5cab(0x1b1)],Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x1b1)]=function(_0x1f39ca){const _0x1ac27d=_0x1b5cab;this[_0x1ac27d(0x2e9)](_0x1f39ca),this[_0x1ac27d(0x3b1)](),VisuMZ[_0x1ac27d(0x45b)][_0x1ac27d(0x590)][_0x1ac27d(0x333)](this,_0x1f39ca),this[_0x1ac27d(0x3b1)](),this[_0x1ac27d(0x52f)](),this['setupRegionRestrictions'](),this[_0x1ac27d(0x208)](),this[_0x1ac27d(0x589)](),this[_0x1ac27d(0x3b1)]();},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x362)]=Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x49c)],Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x49c)]=function(){const _0x6be6c7=_0x1b5cab;VisuMZ[_0x6be6c7(0x45b)][_0x6be6c7(0x362)]['call'](this),this[_0x6be6c7(0x1f1)]();},Game_Map[_0x1b5cab(0x1ee)]=0xc8,Game_Map['prototype'][_0x1b5cab(0x1cd)]=function(){const _0x507dd3=_0x1b5cab,_0x3657fc=Game_Map['_eventOverloadThreshold'];this[_0x507dd3(0x20e)]=this[_0x507dd3(0x552)]()[_0x507dd3(0x55b)]>_0x3657fc;if(this[_0x507dd3(0x20e)]&&$gameTemp[_0x507dd3(0x50f)]()){}},Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x3a6)]=function(){const _0x5e95e6=_0x1b5cab;return this[_0x5e95e6(0x20e)];},Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x3b1)]=function(){const _0x7b02d8=_0x1b5cab;this[_0x7b02d8(0x55c)]=undefined;},Game_Map[_0x1b5cab(0x42e)]['setupDiagonalSupport']=function(){const _0x44cbf5=_0x1b5cab;this[_0x44cbf5(0x465)]=VisuMZ['EventsMoveCore'][_0x44cbf5(0x31c)][_0x44cbf5(0x47a)][_0x44cbf5(0x3cd)];const _0x46a063=$dataMap[_0x44cbf5(0x3c2)]||'';if(_0x46a063[_0x44cbf5(0x3e6)](/<DIAGONAL MOVEMENT: ON>/i)){if(_0x44cbf5(0x51b)===_0x44cbf5(0x191))return this['getPosingCharacterPattern']();else this[_0x44cbf5(0x465)]=!![];}else _0x46a063[_0x44cbf5(0x3e6)](/<DIAGONAL MOVEMENT: OFF>/i)&&(this['_diagonalSupport']=![]);},Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x516)]=function(){const _0x1f6371=_0x1b5cab,_0x3d3bbf=$gameSystem['getPlayerDiagonalSetting']();if(_0x3d3bbf===_0x1f6371(0x5a9))return!![];if(_0x3d3bbf===_0x1f6371(0x4c5))return![];if(this[_0x1f6371(0x465)]===undefined)this['setupDiagonalSupport']();return this[_0x1f6371(0x465)];},Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x56c)]=function(_0x403229,_0x3f49ce){const _0x5055bc=_0x1b5cab;if([0x1,0x4,0x7][_0x5055bc(0x42c)](_0x3f49ce))_0x403229-=0x1;if([0x3,0x6,0x9][_0x5055bc(0x42c)](_0x3f49ce))_0x403229+=0x1;return this['roundX'](_0x403229);},Game_Map['prototype'][_0x1b5cab(0x452)]=function(_0x412a4d,_0x25b039){const _0x17f558=_0x1b5cab;if([0x1,0x2,0x3]['includes'](_0x25b039))_0x412a4d+=0x1;if([0x7,0x8,0x9]['includes'](_0x25b039))_0x412a4d-=0x1;return this[_0x17f558(0x172)](_0x412a4d);},Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x373)]=function(_0x3d8843,_0x2c52eb,_0xc381c8,_0x1494f8){const _0x1af957=_0x1b5cab;return Math['max'](Math[_0x1af957(0x466)](this[_0x1af957(0x319)](_0x3d8843,_0xc381c8)),Math[_0x1af957(0x466)](this[_0x1af957(0x5b0)](_0x2c52eb,_0x1494f8)));},Game_Map[_0x1b5cab(0x42e)]['setupRegionRestrictions']=function(){const _0x5972d0=_0x1b5cab,_0x564f56=VisuMZ[_0x5972d0(0x45b)][_0x5972d0(0x31c)]['Region'],_0x2fdeac={},_0x2704e8=[_0x5972d0(0x428),_0x5972d0(0x4a2),_0x5972d0(0x5c9)],_0x5ad255=[_0x5972d0(0x40a),_0x5972d0(0x2ec),_0x5972d0(0x3f3),'Event',_0x5972d0(0x20b),_0x5972d0(0x4b9),_0x5972d0(0x3e0),_0x5972d0(0x34a)];for(const _0x23c30e of _0x2704e8){for(const _0x227b37 of _0x5ad255){const _0x478c23=_0x5972d0(0x437)[_0x5972d0(0x30e)](_0x227b37,_0x23c30e);_0x564f56[_0x478c23]&&(_0x2fdeac[_0x478c23]=_0x564f56[_0x478c23]['slice'](0x0));}}const _0x4438dd=$dataMap[_0x5972d0(0x3c2)]||'',_0x185e0f=_0x4438dd[_0x5972d0(0x3e6)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);if(_0x185e0f){if('HuInr'!==_0x5972d0(0x506))for(const _0x5c0c58 of _0x185e0f){_0x5c0c58[_0x5972d0(0x3e6)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0xb238b=String(RegExp['$1'])[_0x5972d0(0x53c)]()[_0x5972d0(0x54c)](),_0x385e5e=String(RegExp['$2'])[_0x5972d0(0x53c)]()[_0x5972d0(0x54c)]();const _0x49109a=JSON[_0x5972d0(0x38a)]('['+RegExp['$3'][_0x5972d0(0x3e6)](/\d+/g)+']');_0xb238b=_0xb238b['charAt'](0x0)[_0x5972d0(0x2e3)]()+_0xb238b[_0x5972d0(0x174)](0x1),_0x385e5e=_0x385e5e['charAt'](0x0)[_0x5972d0(0x2e3)]()+_0x385e5e[_0x5972d0(0x174)](0x1);const _0x14f38d='%1%2'['format'](_0xb238b,_0x385e5e);if(_0x2fdeac[_0x14f38d])_0x2fdeac[_0x14f38d]=_0x2fdeac[_0x14f38d]['concat'](_0x49109a);}else{const _0x5b8c77=this[_0x5972d0(0x60c)](_0x549395,_0x144bcd,!![]);if(_0x5b8c77)this[_0x5972d0(0x276)](_0x5b8c77);}}this[_0x5972d0(0x3a9)]=_0x2fdeac;},Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x26f)]=function(_0x233a1f,_0x517543,_0x31a44e,_0x2a259e){const _0x524d4e=_0x1b5cab,_0x195331=this['roundXWithDirection'](_0x233a1f,_0x31a44e),_0x5226ca=this[_0x524d4e(0x452)](_0x517543,_0x31a44e),_0x18b9d0=this[_0x524d4e(0x2e7)](_0x195331,_0x5226ca),_0x2f3472=this[_0x524d4e(0x3a9)];if(_0x2f3472['AllAllow']['includes'](_0x18b9d0))return!![];else{if(_0x2a259e==='player')return _0x2f3472['PlayerAllow'][_0x524d4e(0x42c)](_0x18b9d0)||_0x2f3472[_0x524d4e(0x20c)][_0x524d4e(0x42c)](_0x18b9d0);else{if(_0x2a259e===_0x524d4e(0x3ae)){if(_0x524d4e(0x1f5)===_0x524d4e(0x252))_0x4ff598=_0x2424fd[_0x524d4e(0x41d)];else return _0x2f3472[_0x524d4e(0x50e)]['includes'](_0x18b9d0)||_0x2f3472[_0x524d4e(0x20c)][_0x524d4e(0x42c)](_0x18b9d0);}else{if(_0x2f3472['VehicleAllow'][_0x524d4e(0x42c)](_0x18b9d0))return _0x524d4e(0x275)===_0x524d4e(0x16d)?this[_0x524d4e(0x1d7)]()[_0x524d4e(0x3e6)](/\[VS8\]/i):!![];else{const _0xeb4849=_0x524d4e(0x16e)['format'](_0x2a259e['charAt'](0x0)[_0x524d4e(0x2e3)]()+_0x2a259e[_0x524d4e(0x174)](0x1));if(_0x2f3472[_0xeb4849])return _0x2f3472[_0xeb4849][_0x524d4e(0x42c)](_0x18b9d0);}}}}return![];},Game_Map['prototype']['isRegionForbidPass']=function(_0x263d63,_0x1acc5d,_0xcd9ffe,_0x8da0f6){const _0x1201f0=_0x1b5cab,_0x56ea70=this[_0x1201f0(0x56c)](_0x263d63,_0xcd9ffe),_0x2fa859=this[_0x1201f0(0x452)](_0x1acc5d,_0xcd9ffe),_0x22daa5=this[_0x1201f0(0x2e7)](_0x56ea70,_0x2fa859),_0x30197d=this[_0x1201f0(0x3a9)];if(_0x30197d[_0x1201f0(0x5fe)][_0x1201f0(0x42c)](_0x22daa5))return'iEvol'===_0x1201f0(0x4ad)?this[_0x1201f0(0x3ca)](0x9):!![];else{if(_0x8da0f6==='player'){if('aBNrW'!=='aBNrW'){if(!this[_0x1201f0(0x453)])return;this[_0x1201f0(0x3f8)]=this[_0x1201f0(0x3f8)]||0x3c,this[_0x1201f0(0x3f8)]--,this[_0x1201f0(0x3f8)]<=0x0&&(this[_0x1201f0(0x1a0)](),this['_periodicRefreshTimer']=0x3c);}else return _0x30197d[_0x1201f0(0x1b6)][_0x1201f0(0x42c)](_0x22daa5)||_0x30197d[_0x1201f0(0x5f5)]['includes'](_0x22daa5);}else{if(_0x8da0f6==='event'){if(_0x1201f0(0x327)!=='axmwa'){_0x4f0784['ConvertParams'](_0x5a73ed,_0x31ca55);if(!_0x5a83e7)return;const _0x4cc5da=_0x344276['getLastPluginCommandInterpreter']();_0x154ffc[_0x1201f0(0x446)]=_0x4264d5[_0x1201f0(0x446)]||_0x8d19db[_0x1201f0(0x56f)]();if(_0x3c30ef[_0x1201f0(0x56f)]()===_0x12b230[_0x1201f0(0x446)]){const _0xd6faf9=_0x2b61ae[_0x1201f0(0x3ae)](_0x3ed5c2[_0x1201f0(0x4d5)]||_0x4cc5da['eventId']());_0xd6faf9[_0x1201f0(0x58e)]();}_0x962778[_0x1201f0(0x403)]&&_0x1c96dd[_0x1201f0(0x1b3)](_0x5ee1ca[_0x1201f0(0x446)],_0x459d7b[_0x1201f0(0x4d5)]||_0x4cc5da['eventId']());}else return _0x30197d[_0x1201f0(0x415)][_0x1201f0(0x42c)](_0x22daa5)||_0x30197d[_0x1201f0(0x5f5)][_0x1201f0(0x42c)](_0x22daa5);}else{if(_0x30197d[_0x1201f0(0x5ee)][_0x1201f0(0x42c)](_0x22daa5))return!![];else{if(_0x1201f0(0x4aa)===_0x1201f0(0x59f)){if(!this['_character'])return 0x0;if(this[_0x1201f0(0x418)][_0x1201f0(0x38d)])return 0x0;const _0x659b96=this[_0x1201f0(0x418)]['getEventIconData']();return _0x659b96?_0x659b96[_0x1201f0(0x28f)]||0x0:0x0;}else{const _0xf1e759=_0x1201f0(0x3a2)[_0x1201f0(0x30e)](_0x8da0f6[_0x1201f0(0x5dd)](0x0)['toUpperCase']()+_0x8da0f6[_0x1201f0(0x174)](0x1));if(_0x30197d[_0xf1e759])return _0x30197d[_0xf1e759][_0x1201f0(0x42c)](_0x22daa5);}}}}}return![];},Game_Map['prototype'][_0x1b5cab(0x5a1)]=function(_0x49ff69,_0x13dcf0,_0x38bbd0,_0x5116b0){const _0x227e90=_0x1b5cab;_0x38bbd0=_0x5116b0===_0x227e90(0x2bc)?0x5:_0x38bbd0;const _0x5d4256=this[_0x227e90(0x56c)](_0x49ff69,_0x38bbd0),_0x54ad10=this[_0x227e90(0x452)](_0x13dcf0,_0x38bbd0),_0x2d23bf=this[_0x227e90(0x2e7)](_0x5d4256,_0x54ad10),_0x5bcfde=this[_0x227e90(0x3a9)];if(_0x5bcfde['VehicleDock'][_0x227e90(0x42c)](_0x2d23bf)){if(_0x227e90(0x4d7)!==_0x227e90(0x4d7)){for(let _0xe717f0=-this[_0x227e90(0x33c)][_0x227e90(0x26d)];_0xe717f0<=this[_0x227e90(0x33c)]['right'];_0xe717f0++){for(let _0x2e236a=-this[_0x227e90(0x33c)]['up'];_0x2e236a<=this[_0x227e90(0x33c)][_0x227e90(0x24e)];_0x2e236a++){if(!_0x14eb09['prototype'][_0x227e90(0x454)][_0x227e90(0x333)](this,_0xc8a91c+_0xe717f0,_0x1a8fe6+_0x2e236a,_0x31736a))return![];}}return!![];}else return!![];}else{if(_0x227e90(0x470)===_0x227e90(0x5e7))this[_0x227e90(0x1eb)]=0x0,this['_followerChaseOff']=![];else{const _0x4e7782='%1Dock'[_0x227e90(0x30e)](_0x5116b0[_0x227e90(0x5dd)](0x0)['toUpperCase']()+_0x5116b0[_0x227e90(0x174)](0x1));if(_0x5bcfde[_0x4e7782])return _0x5bcfde[_0x4e7782][_0x227e90(0x42c)](_0x2d23bf);}}return![];},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x45d)]=Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x5eb)],Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x5eb)]=function(){const _0x2c6827=_0x1b5cab;VisuMZ[_0x2c6827(0x45b)]['Game_Map_refresh']['call'](this),this[_0x2c6827(0x4ac)]();},Game_Map[_0x1b5cab(0x42e)]['checkNeedForPeriodicRefresh']=function(){const _0x30c110=_0x1b5cab;this['_needsPeriodicRefresh']=![];if(this[_0x30c110(0x552)]()['some'](_0x402cf8=>_0x402cf8[_0x30c110(0x29f)]())){this[_0x30c110(0x453)]=!![];return;}if(this[_0x30c110(0x552)]()[_0x30c110(0x4ba)](_0x512251=>_0x512251['hasCPCs']())){this['_needsPeriodicRefresh']=!![];return;}if(this[_0x30c110(0x5e1)]['some'](_0x33d901=>_0x33d901['hasAdvancedSwitchVariable']())){this[_0x30c110(0x453)]=!![];return;}if(this[_0x30c110(0x5e1)][_0x30c110(0x4ba)](_0x4ad9cd=>_0x4ad9cd[_0x30c110(0x1a7)]())){this[_0x30c110(0x453)]=!![];return;}},VisuMZ[_0x1b5cab(0x45b)]['Game_Map_update']=Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x431)],Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x431)]=function(_0x424b54){const _0x558ca4=_0x1b5cab;this[_0x558ca4(0x57c)](),VisuMZ[_0x558ca4(0x45b)][_0x558ca4(0x417)][_0x558ca4(0x333)](this,_0x424b54);},Game_Map['prototype']['updatePeriodicRefresh']=function(){const _0x39be22=_0x1b5cab;if(!this[_0x39be22(0x453)])return;this[_0x39be22(0x3f8)]=this[_0x39be22(0x3f8)]||0x3c,this[_0x39be22(0x3f8)]--,this[_0x39be22(0x3f8)]<=0x0&&(_0x39be22(0x39f)!==_0x39be22(0x1df)?(this[_0x39be22(0x1a0)](),this['_periodicRefreshTimer']=0x3c):(_0x13958a['ConvertParams'](_0x5add46,_0x4f111d),_0x47d40['setPlayerDiagonalSetting'](_0x3ea399[_0x39be22(0x5d8)])));},VisuMZ['EventsMoveCore'][_0x1b5cab(0x1ad)]=Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x2f5)],Game_Map[_0x1b5cab(0x42e)]['isDashDisabled']=function(){const _0x2c6376=_0x1b5cab;if(!$gameSystem[_0x2c6376(0x2ae)]())return!![];return VisuMZ[_0x2c6376(0x45b)]['Game_Map_isDashDisabled'][_0x2c6376(0x333)](this);},Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x208)]=function(){const _0x44ae7f=_0x1b5cab;this[_0x44ae7f(0x532)]=![];const _0x1e21b3=$dataMap[_0x44ae7f(0x3c2)]||'';if(_0x1e21b3[_0x44ae7f(0x3e6)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)){if(_0x44ae7f(0x2c6)!==_0x44ae7f(0x2c6)){const _0x52655f=_0x18091d[_0x44ae7f(0x3ae)](_0x4699f5(_0x417125['$1']));return this['moveAwayFromCharacter'](_0x52655f);}else this[_0x44ae7f(0x532)]=!![];}},Game_Map['prototype'][_0x1b5cab(0x1c8)]=function(){const _0x3719e5=_0x1b5cab;if(this[_0x3719e5(0x532)]===undefined)this[_0x3719e5(0x208)]();return this['_saveEventLocations'];},Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x2e9)]=function(_0xe7ab5e){const _0x2bb5ed=_0x1b5cab;if(_0xe7ab5e!==this[_0x2bb5ed(0x56f)]()&&$gamePlayer){if(_0x2bb5ed(0x394)!==_0x2bb5ed(0x394))return this['_interpreter']['setup'](_0x4770c4,_0x4fe836),this[_0x2bb5ed(0x57b)]['execute'](),this['_interpreter'][_0x2bb5ed(0x5ff)];else $gameSystem[_0x2bb5ed(0x2e9)](this[_0x2bb5ed(0x56f)]());}},Game_Map[_0x1b5cab(0x42e)]['setupSpawnedEvents']=function(){const _0x2e1e54=_0x1b5cab;this['_spawnedEvents']=$gameSystem['getMapSpawnedEventData'](this[_0x2e1e54(0x56f)]()),this['_needsRefresh']=!![];},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x190)]=Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x552)],Game_Map['prototype'][_0x1b5cab(0x552)]=function(){const _0x2755c1=_0x1b5cab;if(this[_0x2755c1(0x55c)])return this[_0x2755c1(0x55c)];const _0x4b3cc5=VisuMZ[_0x2755c1(0x45b)][_0x2755c1(0x190)][_0x2755c1(0x333)](this),_0xe6692b=_0x4b3cc5[_0x2755c1(0x277)](this[_0x2755c1(0x44f)]||[]);return this['_eventCache']=_0xe6692b['filter'](_0x42722d=>!!_0x42722d),this[_0x2755c1(0x55c)];},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x2ba)]=Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x3ae)],Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x3ae)]=function(_0x42e2ce){const _0x1fd064=_0x1b5cab;if(_0x42e2ce>=0x3e8)return _0x42e2ce-=0x3e8,this[_0x1fd064(0x44f)][_0x42e2ce];else{if(_0x1fd064(0x5c7)==='ULOCJ'){const _0x5811ed=_0x6afc98[_0x1fd064(0x4b3)](this[_0x1fd064(0x430)]());if(_0x5811ed)return _0x5811ed['realMoveSpeed']();}else return VisuMZ[_0x1fd064(0x45b)][_0x1fd064(0x2ba)][_0x1fd064(0x333)](this,_0x42e2ce);}},Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x284)]=function(_0xb4fcab){const _0xbe54ad=this['event'](_0xb4fcab);if(_0xbe54ad)_0xbe54ad['erase']();},Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x600)]=function(){const _0x5ddd2c=_0x1b5cab,_0x5b6bff={'template':'Button','mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x5ddd2c(0x44f)]['length']+0x3e8};this['createSpawnedEventWithData'](_0x5b6bff);},Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x482)]=function(_0x434024,_0x78f4f3){const _0xb327eb=_0x1b5cab;if(this[_0xb327eb(0x409)](_0x434024,_0x78f4f3)['length']>0x0)return!![];if($gamePlayer['x']===_0x434024&&$gamePlayer['y']===_0x78f4f3)return!![];if(this['boat']()[_0xb327eb(0x58a)](_0x434024,_0x78f4f3))return!![];if(this[_0xb327eb(0x1d4)]()[_0xb327eb(0x58a)](_0x434024,_0x78f4f3))return!![];return![];},Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x193)]=function(_0x2e95c8,_0x13c50c,_0x337670){const _0x2babb2=_0x1b5cab;$gameTemp['_spawnData']=_0x2e95c8;const _0x447447=new Game_Event(_0x2e95c8[_0x2babb2(0x56f)],_0x2e95c8[_0x2babb2(0x53b)]);$gameTemp[_0x2babb2(0x38f)]=undefined,_0x447447['refresh']();let _0x32e4cb=_0x13c50c-_0x447447[_0x2babb2(0x33c)][_0x2babb2(0x26d)],_0x2db11e=_0x13c50c+_0x447447[_0x2babb2(0x33c)][_0x2babb2(0x26d)],_0x3bc622=_0x337670-_0x447447[_0x2babb2(0x33c)]['up'],_0x59a97a=_0x337670+_0x447447[_0x2babb2(0x33c)][_0x2babb2(0x24e)];for(let _0x292c47=_0x32e4cb;_0x292c47<=_0x2db11e;_0x292c47++){for(let _0x253f4b=_0x3bc622;_0x253f4b<=_0x59a97a;_0x253f4b++){if('gMzex'===_0x2babb2(0x19d))this[_0x2babb2(0x468)]=0x0;else{if(this['checkExistingEntitiesAt'](_0x292c47,_0x253f4b))return![];}}}return!![];},Game_Map['prototype'][_0x1b5cab(0x517)]=function(_0x553397){const _0x2f9b5d=_0x1b5cab;$gameTemp[_0x2f9b5d(0x38f)]=_0x553397;const _0x45f1e8=new Game_Event(_0x553397['mapId'],_0x553397['eventId']);$gameTemp[_0x2f9b5d(0x38f)]=undefined,this[_0x2f9b5d(0x44f)]['push'](_0x45f1e8),_0x45f1e8[_0x2f9b5d(0x5c1)](_0x553397),this[_0x2f9b5d(0x3b1)]();},Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x5aa)]=function(_0x1f49ed,_0x5b1fce,_0x58ed90){const _0x35cb68=_0x1b5cab,_0xeb75f6=_0x1f49ed['x'],_0x1c94d4=_0x1f49ed['y'];if(!this[_0x35cb68(0x5e3)](_0xeb75f6,_0x1c94d4))return![];if(_0x5b1fce){if(this[_0x35cb68(0x482)](_0xeb75f6,_0x1c94d4))return![];if(!this[_0x35cb68(0x193)](_0x1f49ed,_0xeb75f6,_0x1c94d4))return![];}if(_0x58ed90){if(!this['isPassableByAnyDirection'](_0xeb75f6,_0x1c94d4))return![];}return this[_0x35cb68(0x517)](_0x1f49ed),!![];},Game_Map[_0x1b5cab(0x42e)]['prepareSpawnedEventAtRegion']=function(_0x3704f8,_0x5d562b,_0x31ff0a,_0xb23ae){const _0x156d2c=_0x1b5cab,_0x14217f=[],_0x12246a=this[_0x156d2c(0x180)](),_0x4bf21a=this['height']();for(let _0x489a65=0x0;_0x489a65<_0x12246a;_0x489a65++){if(_0x156d2c(0x543)!==_0x156d2c(0x543)){if(_0x1ec56d[_0x156d2c(0x26f)](_0x5d11e6,_0x26e709,_0x5570d0,this[_0x156d2c(0x1a6)]))return!![];if(_0x571a48['isRegionForbidPass'](_0x13f226,_0x2e9289,_0x137b85,this[_0x156d2c(0x1a6)]))return![];return _0x5230a8[_0x156d2c(0x45b)][_0x156d2c(0x382)][_0x156d2c(0x333)](_0x4f6e76,_0x221670,_0x9533a3,_0x359807);}else for(let _0x13d6dc=0x0;_0x13d6dc<_0x4bf21a;_0x13d6dc++){if(!_0x5d562b['includes'](this[_0x156d2c(0x2e7)](_0x489a65,_0x13d6dc)))continue;if(!this[_0x156d2c(0x5e3)](_0x489a65,_0x13d6dc))continue;if(_0x31ff0a){if(this['checkExistingEntitiesAt'](_0x489a65,_0x13d6dc))continue;if(!this[_0x156d2c(0x193)](_0x3704f8,_0x489a65,_0x13d6dc))continue;}if(_0xb23ae){if(_0x156d2c(0x1e7)===_0x156d2c(0x5c8))this[_0x156d2c(0x39e)](_0x8136d1['_eventId']);else{if(!this[_0x156d2c(0x5a6)](_0x489a65,_0x13d6dc))continue;}}_0x14217f['push']([_0x489a65,_0x13d6dc]);}}if(_0x14217f['length']>0x0){if(_0x156d2c(0x5b8)!==_0x156d2c(0x5b8))_0x55eb3d=_0x29909a;else{const _0x5294ec=_0x14217f[Math[_0x156d2c(0x2cb)](_0x14217f['length'])];return _0x3704f8['x']=_0x5294ec[0x0],_0x3704f8['y']=_0x5294ec[0x1],this['createSpawnedEventWithData'](_0x3704f8),!![];}}return![];},Game_Map['prototype']['prepareSpawnedEventAtTerrainTag']=function(_0xe5aae7,_0x561998,_0xf5c396,_0x2c310c){const _0x17b349=_0x1b5cab,_0x6f3603=[],_0x46803b=this[_0x17b349(0x180)](),_0x42749b=this[_0x17b349(0x1a1)]();for(let _0x169f45=0x0;_0x169f45<_0x46803b;_0x169f45++){for(let _0x29b0b4=0x0;_0x29b0b4<_0x42749b;_0x29b0b4++){if(_0x17b349(0x35d)!==_0x17b349(0x35d))this[_0x17b349(0x21d)](_0x299639,_0x579924);else{if(!_0x561998[_0x17b349(0x42c)](this['terrainTag'](_0x169f45,_0x29b0b4)))continue;if(!this['isValid'](_0x169f45,_0x29b0b4))continue;if(_0xf5c396){if(this[_0x17b349(0x482)](_0x169f45,_0x29b0b4))continue;if(!this[_0x17b349(0x193)](_0xe5aae7,_0x169f45,_0x29b0b4))continue;}if(_0x2c310c){if(!this[_0x17b349(0x5a6)](_0x169f45,_0x29b0b4))continue;}_0x6f3603['push']([_0x169f45,_0x29b0b4]);}}}if(_0x6f3603['length']>0x0){const _0x268e23=_0x6f3603[Math['randomInt'](_0x6f3603['length'])];return _0xe5aae7['x']=_0x268e23[0x0],_0xe5aae7['y']=_0x268e23[0x1],this[_0x17b349(0x517)](_0xe5aae7),!![];}return![];},Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x5a6)]=function(_0xa793b4,_0x509bd9){const _0x20f325=_0x1b5cab;if(this[_0x20f325(0x42f)](_0xa793b4,_0x509bd9,0x2))return!![];if(this[_0x20f325(0x42f)](_0xa793b4,_0x509bd9,0x4))return!![];if(this[_0x20f325(0x42f)](_0xa793b4,_0x509bd9,0x6))return!![];if(this['isPassable'](_0xa793b4,_0x509bd9,0x8))return!![];return![];},Game_Map['prototype'][_0x1b5cab(0x39e)]=function(_0xea6c05){const _0x573a45=_0x1b5cab;if(_0xea6c05<0x3e8)return;if(!this[_0x573a45(0x44f)])return;const _0x1b5d71=this[_0x573a45(0x3ae)](_0xea6c05);_0x1b5d71[_0x573a45(0x21d)](-0x1,-0x1),_0x1b5d71[_0x573a45(0x563)](),this[_0x573a45(0x44f)][_0xea6c05-0x3e8]=null,this[_0x573a45(0x3b1)]();},Game_Map[_0x1b5cab(0x42e)]['firstSpawnedEvent']=function(){const _0x270388=_0x1b5cab;for(const _0x3151aa of this[_0x270388(0x44f)]){if(_0x3151aa)return _0x3151aa;}return null;},Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x46e)]=function(){const _0x361f09=_0x1b5cab,_0xca03ef=this['firstSpawnedEvent']();return _0xca03ef?_0xca03ef[_0x361f09(0x332)]:0x0;},Game_Map['prototype'][_0x1b5cab(0x36b)]=function(){const _0xd0e93c=_0x1b5cab,_0x31b47e=this['_spawnedEvents'][_0xd0e93c(0x174)](0x0)[_0xd0e93c(0x5c2)]();for(const _0x34a2f2 of _0x31b47e){if(_0xd0e93c(0x1c7)!==_0xd0e93c(0x306)){if(_0x34a2f2)return _0x34a2f2;}else _0x268eff['PreloadedMaps'][_0x1bbc48]=_0x573a11[_0x22f144],_0x2138e3[_0x3ffa5c]=_0x3d3017;}return null;},Game_Map[_0x1b5cab(0x42e)]['lastSpawnedEventID']=function(){const _0x9ef0d6=_0x1b5cab,_0x56ff75=this[_0x9ef0d6(0x36b)]();return _0x56ff75?_0x56ff75[_0x9ef0d6(0x332)]:0x0;},Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x614)]=function(_0x2daecd,_0x2fdb8c){const _0x3badac=_0x1b5cab,_0x495b1d=this[_0x3badac(0x409)](_0x2daecd,_0x2fdb8c);for(const _0x23937b of _0x495b1d){if(!_0x23937b)continue;if(_0x23937b[_0x3badac(0x5bb)]())this[_0x3badac(0x39e)](_0x23937b[_0x3badac(0x332)]);}},Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x523)]=function(_0x573d45){const _0x592f62=_0x1b5cab;for(const _0x3f21aa of this[_0x592f62(0x44f)]){if(!_0x3f21aa)continue;_0x573d45[_0x592f62(0x42c)](_0x3f21aa[_0x592f62(0x2e7)]())&&this[_0x592f62(0x39e)](_0x3f21aa['_eventId']);}},Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x54b)]=function(_0x2a52b7){const _0xdcc9e9=_0x1b5cab;for(const _0x1fd9ac of this[_0xdcc9e9(0x44f)]){if(_0xdcc9e9(0x3a4)!==_0xdcc9e9(0x3a4))return[0x1,0x3,0x5,0x7,0x9]['includes'](_0x4e7a33);else{if(!_0x1fd9ac)continue;_0x2a52b7[_0xdcc9e9(0x42c)](_0x1fd9ac[_0xdcc9e9(0x1fb)]())&&this[_0xdcc9e9(0x39e)](_0x1fd9ac[_0xdcc9e9(0x332)]);}}},Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x20f)]=function(){const _0x5b1265=_0x1b5cab;for(const _0x4025df of this[_0x5b1265(0x44f)]){if(!_0x4025df)continue;this[_0x5b1265(0x39e)](_0x4025df[_0x5b1265(0x332)]);}},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x5ec)]=Game_Map['prototype'][_0x1b5cab(0x2a9)],Game_Map[_0x1b5cab(0x42e)]['unlockEvent']=function(_0x2c2b69){const _0x1df155=_0x1b5cab;VisuMZ[_0x1df155(0x45b)][_0x1df155(0x5ec)][_0x1df155(0x333)](this,_0x2c2b69);if(_0x2c2b69>=0x3e8){const _0x48f418=this[_0x1df155(0x3ae)](_0x2c2b69);if(_0x48f418)_0x48f418[_0x1df155(0x56e)]();}},Game_CommonEvent[_0x1b5cab(0x42e)][_0x1b5cab(0x29f)]=function(){const _0x46444f=_0x1b5cab,_0x1d8055=this[_0x46444f(0x3ae)]();return this[_0x46444f(0x283)]()&&_0x1d8055[_0x46444f(0x1d5)]>=0x1&&DataManager['isAdvancedSwitch'](_0x1d8055['switchId']);},Game_CommonEvent[_0x1b5cab(0x42e)][_0x1b5cab(0x1a7)]=function(){const _0xe704a5=_0x1b5cab;return VisuMZ[_0xe704a5(0x45b)][_0xe704a5(0x2d2)][_0xe704a5(0x5e1)][_0xe704a5(0x42c)](this[_0xe704a5(0x515)]);},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x47b)]=Game_CommonEvent[_0x1b5cab(0x42e)][_0x1b5cab(0x283)],Game_CommonEvent[_0x1b5cab(0x42e)]['isActive']=function(){const _0x42cb05=_0x1b5cab;return VisuMZ[_0x42cb05(0x45b)][_0x42cb05(0x47b)]['call'](this)?_0x42cb05(0x499)!==_0x42cb05(0x499)?_0x154293['EventAllow'][_0x42cb05(0x42c)](_0x1ef5cc)||_0x1e77c5[_0x42cb05(0x20c)][_0x42cb05(0x42c)](_0x29a573):!![]:VisuMZ[_0x42cb05(0x45b)][_0x42cb05(0x2d2)][_0x42cb05(0x222)](this['event']()[_0x42cb05(0x3fe)],this[_0x42cb05(0x515)]);},VisuMZ['EventsMoveCore'][_0x1b5cab(0x2b6)]=Game_Map['prototype']['parallelCommonEvents'],Game_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x22a)]=function(){const _0xb6e48d=_0x1b5cab,_0x43beca=VisuMZ[_0xb6e48d(0x45b)][_0xb6e48d(0x2b6)][_0xb6e48d(0x333)](this),_0x355c55=VisuMZ['EventsMoveCore']['CustomPageConditions'][_0xb6e48d(0x5e1)]['map'](_0x255b3c=>$dataCommonEvents[_0x255b3c]);return _0x43beca[_0xb6e48d(0x277)](_0x355c55)['filter']((_0xf7aee0,_0x25dbc9,_0x568895)=>_0x568895[_0xb6e48d(0x45f)](_0xf7aee0)===_0x25dbc9);},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x3ac)]=Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x2c5)],Game_CharacterBase['prototype'][_0x1b5cab(0x2c5)]=function(){const _0x61ac=_0x1b5cab;VisuMZ[_0x61ac(0x45b)][_0x61ac(0x3ac)][_0x61ac(0x333)](this),this[_0x61ac(0x2d3)]();},Game_CharacterBase[_0x1b5cab(0x42e)]['initEventsMoveCoreSettings']=function(){const _0x44faf5=_0x1b5cab;this[_0x44faf5(0x43b)]=![],this[_0x44faf5(0x187)](),this[_0x44faf5(0x376)](),this[_0x44faf5(0x31a)](),this['clearStepPattern']();},Game_CharacterBase[_0x1b5cab(0x42e)]['isSpriteVS8dir']=function(){const _0x2583f4=_0x1b5cab;if(this[_0x2583f4(0x537)]===Game_Player&&this[_0x2583f4(0x3e1)]())return this['vehicle']()[_0x2583f4(0x1d7)]()[_0x2583f4(0x3e6)](/\[VS8\]/i);else return Imported[_0x2583f4(0x5a8)]&&this[_0x2583f4(0x311)]()?!![]:'ABaGD'===_0x2583f4(0x49e)?this[_0x2583f4(0x1d7)]()[_0x2583f4(0x3e6)](/\[VS8\]/i):_0x16e619['EventsMoveCore']['Game_Switches_value']['call'](this,_0x53be70);},VisuMZ[_0x1b5cab(0x45b)]['Game_CharacterBase_direction']=Game_CharacterBase['prototype'][_0x1b5cab(0x246)],Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x246)]=function(){const _0x21291e=_0x1b5cab;if(this[_0x21291e(0x3b3)]()&&!this[_0x21291e(0x38b)]()&&this['isSpriteVS8dir']()){if('iWzQz'==='iWzQz')return this[_0x21291e(0x23e)]();else{if(_0x4703c4[_0x21291e(0x56a)])this[_0x21291e(0x536)](_0x1d632e[_0x21291e(0x56a)]);}}else{if(this[_0x21291e(0x3b3)]()&&!this[_0x21291e(0x38b)]())return'kLaoM'==='kLaoM'?0x8:!![];else return this['isPosing']()&&this[_0x21291e(0x270)]()?this['getPosingCharacterDirection']():VisuMZ['EventsMoveCore'][_0x21291e(0x1bc)][_0x21291e(0x333)](this);}},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x5c0)]=Game_CharacterBase[_0x1b5cab(0x42e)]['setDirection'],Game_CharacterBase[_0x1b5cab(0x42e)]['setDirection']=function(_0xc8ce76){const _0x3a6ce8=_0x1b5cab;if(!this[_0x3a6ce8(0x270)]())_0xc8ce76=this['correctFacingDirection'](_0xc8ce76);VisuMZ[_0x3a6ce8(0x45b)][_0x3a6ce8(0x5c0)][_0x3a6ce8(0x333)](this,_0xc8ce76);},Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x20d)]=function(_0x3aa2fd){const _0x3a2ba2=_0x1b5cab;if(_0x3aa2fd===0x1)return this[_0x3a2ba2(0x454)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x3aa2fd===0x3)return this[_0x3a2ba2(0x454)](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x3aa2fd===0x7)return this[_0x3a2ba2(0x454)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x3aa2fd===0x9)return this[_0x3a2ba2(0x454)](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x3aa2fd;},Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x4fd)]=function(_0x17d11c){const _0x1049a0=_0x1b5cab;return[0x1,0x3,0x5,0x7,0x9][_0x1049a0(0x42c)](_0x17d11c);},Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x592)]=function(){const _0x295fef=_0x1b5cab;return this[_0x295fef(0x3f0)]||0x0;},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x497)]=Game_CharacterBase[_0x1b5cab(0x42e)]['moveStraight'],Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x1c5)]=function(_0x1ae3b3){const _0x301f2e=_0x1b5cab;this[_0x301f2e(0x3f0)]=_0x1ae3b3,VisuMZ['EventsMoveCore'][_0x301f2e(0x497)][_0x301f2e(0x333)](this,_0x1ae3b3);},Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x276)]=function(_0x5cc0eb){const _0x194c82=_0x1b5cab;if(!this[_0x194c82(0x4fd)](_0x5cc0eb))return this[_0x194c82(0x1c5)](_0x5cc0eb);let _0x19f2ac=0x0,_0x4573cc=0x0;switch(_0x5cc0eb){case 0x1:_0x19f2ac=0x4,_0x4573cc=0x2;break;case 0x3:_0x19f2ac=0x6,_0x4573cc=0x2;break;case 0x7:_0x19f2ac=0x4,_0x4573cc=0x8;break;case 0x9:_0x19f2ac=0x6,_0x4573cc=0x8;break;}if(VisuMZ['EventsMoveCore'][_0x194c82(0x31c)][_0x194c82(0x47a)][_0x194c82(0x48c)]){if(!this[_0x194c82(0x454)](this['_x'],this['_y'],_0x19f2ac))return this[_0x194c82(0x1c5)](_0x4573cc);if(!this[_0x194c82(0x454)](this['_x'],this['_y'],_0x4573cc))return this['moveStraight'](_0x19f2ac);if(!this[_0x194c82(0x1bf)](this['_x'],this['_y'],_0x19f2ac,_0x4573cc)){let _0x5178b6=VisuMZ[_0x194c82(0x45b)]['Settings']['Movement'][_0x194c82(0x5a5)]?_0x19f2ac:_0x4573cc;return this[_0x194c82(0x1c5)](_0x5178b6);}}this['_lastMovedDirection']=_0x5cc0eb,this[_0x194c82(0x4f6)](_0x19f2ac,_0x4573cc);},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x51e)]=Game_CharacterBase['prototype'][_0x1b5cab(0x175)],Game_CharacterBase['prototype'][_0x1b5cab(0x175)]=function(){const _0x47abf4=_0x1b5cab;let _0x930321=this['_moveSpeed'];return this['isDashing']()&&('JoJaC'===_0x47abf4(0x422)?_0x930321+=this[_0x47abf4(0x54e)]():_0x24d82c[0x2]=_0x2fc556(_0x178e0b)[_0x47abf4(0x5dd)](0x0)[_0x47abf4(0x2e3)]()[_0x47abf4(0x54c)]()),this[_0x47abf4(0x544)](_0x930321);},Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x54e)]=function(){const _0x367ff4=_0x1b5cab,_0x5cbbd3=VisuMZ['EventsMoveCore']['Settings'][_0x367ff4(0x47a)];return _0x5cbbd3[_0x367ff4(0x479)]!==undefined?_0x5cbbd3[_0x367ff4(0x479)]:VisuMZ[_0x367ff4(0x45b)]['Game_CharacterBase_realMoveSpeed'][_0x367ff4(0x333)](this)-this[_0x367ff4(0x3c3)];},Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x544)]=function(_0x1e4eec){const _0x3972a0=_0x1b5cab,_0x17a42c=VisuMZ['EventsMoveCore'][_0x3972a0(0x31c)][_0x3972a0(0x47a)];if(!_0x17a42c[_0x3972a0(0x3ed)])return _0x1e4eec;return[0x1,0x3,0x7,0x9][_0x3972a0(0x42c)](this[_0x3972a0(0x3f0)])&&(_0x3972a0(0x3fa)===_0x3972a0(0x303)?_0xe813b4[_0x3972a0(0x45b)][_0x3972a0(0x458)][_0x3972a0(0x333)](this,_0x5e7a0f):_0x1e4eec*=_0x17a42c[_0x3972a0(0x406)]||0.01),_0x1e4eec;},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x183)]=Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x5e9)],Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x5e9)]=function(){const _0x21e513=_0x1b5cab;if(this['_forceDashing'])return!![];return VisuMZ[_0x21e513(0x45b)][_0x21e513(0x183)][_0x21e513(0x333)](this);},Game_CharacterBase['prototype'][_0x1b5cab(0x47f)]=function(){const _0x56728f=_0x1b5cab;return this[_0x56728f(0x5e9)]();},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x251)]=Game_CharacterBase['prototype'][_0x1b5cab(0x1a3)],Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x1a3)]=function(){const _0x52bdf8=_0x1b5cab;if(this[_0x52bdf8(0x1ed)]())return this[_0x52bdf8(0x261)]();else{if(_0x52bdf8(0x2a2)===_0x52bdf8(0x2a2))return VisuMZ[_0x52bdf8(0x45b)]['Game_CharacterBase_pattern'][_0x52bdf8(0x333)](this);else _0x37567c['_shadowSprite']=new _0x2933bc(),_0x2e4f9c['_shadowSprite']['_filename']=_0x265290[_0x52bdf8(0x418)]['shadowFilename'](),_0x53327b[_0x52bdf8(0x2dd)][_0x52bdf8(0x3f6)]=_0x3a61ec[_0x52bdf8(0x5c4)](_0x16bac2[_0x52bdf8(0x2dd)][_0x52bdf8(0x4b7)]),_0x511f34[_0x52bdf8(0x2dd)][_0x52bdf8(0x1fd)]['x']=0.5,_0xdb410b[_0x52bdf8(0x2dd)][_0x52bdf8(0x1fd)]['y']=0x1,_0x259afc['_shadowSprite']['z']=0x0,this[_0x52bdf8(0x259)][_0x52bdf8(0x229)](_0x3aa1da[_0x52bdf8(0x2dd)]);}},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x1cc)]=Game_CharacterBase['prototype']['increaseSteps'],Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x336)]=function(){const _0x79e2a5=_0x1b5cab;VisuMZ['EventsMoveCore'][_0x79e2a5(0x1cc)]['call'](this),this[_0x79e2a5(0x187)]();},VisuMZ[_0x1b5cab(0x45b)]['Game_CharacterBase_characterIndex']=Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x5d7)],Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x5d7)]=function(){const _0x5f1921=_0x1b5cab;if(this[_0x5f1921(0x270)]())return this['characterIndexVS8']();return VisuMZ[_0x5f1921(0x45b)][_0x5f1921(0x23b)]['call'](this);},Game_CharacterBase[_0x1b5cab(0x42e)]['characterIndexVS8']=function(){const _0x3ba0dc=_0x1b5cab,_0x5ab20c=this[_0x3ba0dc(0x246)]();if(this['isJumping']()){if([0x2,0x4,0x6,0x8][_0x3ba0dc(0x42c)](_0x5ab20c))return 0x4;if([0x1,0x3,0x7,0x9][_0x3ba0dc(0x42c)](_0x5ab20c))return 0x5;}else{if(this[_0x3ba0dc(0x3b3)]())return 0x6;else{if(this[_0x3ba0dc(0x1ed)]())return this[_0x3ba0dc(0x1da)]();else{if(this[_0x3ba0dc(0x5ce)]){if([0x2,0x4,0x6,0x8]['includes'](_0x5ab20c))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x5ab20c))return 0x5;}else{if(this[_0x3ba0dc(0x286)]()&&this[_0x3ba0dc(0x57d)]()){if([0x2,0x4,0x6,0x8]['includes'](_0x5ab20c))return 0x4;if([0x1,0x3,0x7,0x9][_0x3ba0dc(0x42c)](_0x5ab20c))return 0x5;}else{if(this[_0x3ba0dc(0x47f)]()){if(_0x3ba0dc(0x3bd)===_0x3ba0dc(0x542))_0x15d12c=this['findDirectionTo'](_0x5f097f,_0x27bb1d);else{if([0x2,0x4,0x6,0x8]['includes'](_0x5ab20c))return 0x2;if([0x1,0x3,0x7,0x9][_0x3ba0dc(0x42c)](_0x5ab20c))return 0x3;}}else{if(_0x3ba0dc(0x23a)===_0x3ba0dc(0x23a)){if([0x2,0x4,0x6,0x8]['includes'](_0x5ab20c))return 0x0;if([0x1,0x3,0x7,0x9]['includes'](_0x5ab20c))return 0x1;}else{if(this[_0x3ba0dc(0x55a)]===_0x35f1d3)this[_0x3ba0dc(0x575)]();if(this[_0x3ba0dc(0x55a)][_0x3ba0dc(0x408)]===_0x5501f4)this[_0x3ba0dc(0x575)]();this[_0x3ba0dc(0x55a)][_0x3ba0dc(0x408)]=_0x2984e9;}}}}}}}},Game_CharacterBase['prototype']['useCarryPoseForIcons']=function(){const _0x4d5fce=_0x1b5cab;return VisuMZ['EventsMoveCore'][_0x4d5fce(0x31c)]['VS8']['CarryPose'];},Game_CharacterBase[_0x1b5cab(0x42e)]['isOnRope']=function(){const _0x16d06b=_0x1b5cab;return this[_0x16d06b(0x3b3)]()&&this[_0x16d06b(0x1fb)]()===VisuMZ['EventsMoveCore']['Settings'][_0x16d06b(0x1ef)][_0x16d06b(0x27d)];},Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x23e)]=function(){const _0x3f9672=_0x1b5cab;if(this[_0x3f9672(0x5c3)]())return 0x4;else{if(_0x3f9672(0x2fe)!==_0x3f9672(0x2fe)){_0x256a74[_0x3f9672(0x2fb)](_0xd82196,_0x5e8f31);const _0x497d86=_0x4ce25f[_0x3f9672(0x291)](),_0x5bf05a={'template':_0x2a3acf[_0x3f9672(0x3a0)],'mapId':_0x5302fb[_0x3f9672(0x446)]||_0x55199e[_0x3f9672(0x56f)](),'eventId':_0x1b8c3d[_0x3f9672(0x4d5)]||_0x497d86[_0x3f9672(0x53b)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x1b1144['Preserve'],'spawnEventId':_0x2e7fe1[_0x3f9672(0x44f)][_0x3f9672(0x55b)]+0x3e8},_0xccf291=_0x2c8cdf[_0x3f9672(0x3c6)]||0x0,_0x4bfb7c=_0x576df9['prepareSpawnedEventAtRegion'](_0x5bf05a,_0xe9856f[_0x3f9672(0x227)],_0xf2ce63[_0x3f9672(0x177)],_0x4dbf3e[_0x3f9672(0x3b7)]);_0xccf291&&_0x4f14b2['setValue'](_0xccf291,!!_0x4bfb7c);}else return 0x2;}},VisuMZ['EventsMoveCore'][_0x1b5cab(0x480)]=Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x431)],Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x431)]=function(){const _0x35b11a=_0x1b5cab;VisuMZ['EventsMoveCore'][_0x35b11a(0x480)][_0x35b11a(0x333)](this),this[_0x35b11a(0x41e)]();},Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x41e)]=function(){const _0x5bc585=_0x1b5cab;this[_0x5bc585(0x185)]=this[_0x5bc585(0x185)]||0x0;if(this[_0x5bc585(0x185)]>0x0){this[_0x5bc585(0x185)]--;if(this[_0x5bc585(0x185)]<=0x0&&this[_0x5bc585(0x597)]!==_0x5bc585(0x2fa))this[_0x5bc585(0x187)]();}},VisuMZ['EventsMoveCore']['Game_CharacterBase_moveDiagonally']=Game_CharacterBase[_0x1b5cab(0x42e)]['moveDiagonally'],Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x4f6)]=function(_0x21afdf,_0x2e898f){const _0x46f627=_0x1b5cab;VisuMZ[_0x46f627(0x45b)][_0x46f627(0x219)][_0x46f627(0x333)](this,_0x21afdf,_0x2e898f);if(this['isSpriteVS8dir']())this[_0x46f627(0x244)](_0x21afdf,_0x2e898f);},Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x244)]=function(_0x22a2cf,_0x37376d){const _0x3132d4=_0x1b5cab;if(_0x22a2cf===0x4&&_0x37376d===0x2)this['setDirection'](0x1);if(_0x22a2cf===0x6&&_0x37376d===0x2)this['setDirection'](0x3);if(_0x22a2cf===0x4&&_0x37376d===0x8)this['setDirection'](0x7);if(_0x22a2cf===0x6&&_0x37376d===0x8)this[_0x3132d4(0x3ca)](0x9);},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x1b0)]=Game_CharacterBase['prototype'][_0x1b5cab(0x5c5)],Game_CharacterBase['prototype'][_0x1b5cab(0x5c5)]=function(){const _0x4cc2ce=_0x1b5cab;if(this['isPosing']()&&this['getPose']()===_0x4cc2ce(0x2fa))return!![];return VisuMZ['EventsMoveCore'][_0x4cc2ce(0x1b0)]['call'](this);},Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x271)]=function(_0x27c486,_0x1ac87d){const _0x5478f6=_0x1b5cab;if(_0x27c486[_0x5478f6(0x3e6)](/Z/i))_0x27c486=_0x5478f6(0x2fa);if(_0x27c486[_0x5478f6(0x3e6)](/SLEEP/i))_0x27c486=_0x5478f6(0x2fa);this['isSpriteVS8dir']()&&(this['_pose']=_0x27c486[_0x5478f6(0x2e3)]()['trim'](),this['_poseDuration']=_0x1ac87d||Infinity);},Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x33f)]=function(){const _0x30a253=_0x1b5cab;if(this[_0x30a253(0x270)]())return(this[_0x30a253(0x597)]||'')[_0x30a253(0x2e3)]()[_0x30a253(0x54c)]();else{if(_0x30a253(0x240)!==_0x30a253(0x240)){if(!_0x414e5a[_0x30a253(0x576)][_0x20ebb2]){_0x425564[_0x30a253(0x2f0)][_0x5393df][_0x30a253(0x3e6)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x15ebea='return\x20%1'[_0x30a253(0x30e)](_0x5a4e1f(_0x5ba601['$1']));_0x12a304[_0x30a253(0x576)][_0x3035b5]=new _0x1610f2(_0x30a253(0x181),_0x15ebea);}const _0x3bf7e9=_0x220a9c[_0x30a253(0x2bf)]()||this;return _0x143959[_0x30a253(0x576)][_0x4dbb56][_0x30a253(0x333)](_0x3bf7e9,_0x5a2034);}else return''[_0x30a253(0x2e3)]()[_0x30a253(0x54c)]();}},Game_CharacterBase[_0x1b5cab(0x42e)]['setBalloonPose']=function(_0x24d528,_0x3586f0){const _0x45c55a=_0x1b5cab;if(this['isSpriteVS8dir']()){if(_0x45c55a(0x5f2)!==_0x45c55a(0x5f2))this[_0x45c55a(0x5f6)]=![];else{const _0x307dfa=['','EXCLAMATION',_0x45c55a(0x484),'MUSIC\x20NOTE',_0x45c55a(0x17b),'ANGER',_0x45c55a(0x58b),_0x45c55a(0x35c),_0x45c55a(0x42d),_0x45c55a(0x425),_0x45c55a(0x2fa),'','','','',''][_0x24d528];this[_0x45c55a(0x271)](_0x307dfa,_0x3586f0);}}},Game_CharacterBase['prototype'][_0x1b5cab(0x187)]=function(){const _0x389b6f=_0x1b5cab;this['_pose']='',this[_0x389b6f(0x185)]=0x0;},Game_CharacterBase['prototype'][_0x1b5cab(0x1ed)]=function(){const _0x5e5c4f=_0x1b5cab;return this['isSpriteVS8dir']()&&!!this[_0x5e5c4f(0x597)];},Game_CharacterBase['prototype']['getPosingCharacterIndex']=function(){const _0x50fc48=_0x1b5cab,_0x4e1455=this[_0x50fc48(0x597)][_0x50fc48(0x2e3)]();switch(this[_0x50fc48(0x597)][_0x50fc48(0x2e3)]()['trim']()){case'ITEM':case _0x50fc48(0x57f):case _0x50fc48(0x21f):case _0x50fc48(0x456):case _0x50fc48(0x50d):case'COLLAPSE':return 0x6;break;default:return 0x7;break;}},Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x4cd)]=function(){const _0x541184=_0x1b5cab;switch(this['_pose']['toUpperCase']()){case'EXCLAMATION':case _0x541184(0x484):case _0x541184(0x4e2):case'!':case'?':return 0x2;break;case'HEART':case'ANGER':case _0x541184(0x58b):return 0x4;break;case _0x541184(0x60f):case _0x541184(0x57f):case _0x541184(0x21f):case _0x541184(0x35c):case _0x541184(0x42d):case _0x541184(0x425):return 0x6;break;case _0x541184(0x456):case _0x541184(0x50d):case _0x541184(0x25f):case'ZZZ':case _0x541184(0x32c):return 0x8;break;default:return VisuMZ[_0x541184(0x45b)][_0x541184(0x5c0)]['call'](this);break;}},Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x261)]=function(){const _0x4b1d5e=_0x1b5cab;switch(this[_0x4b1d5e(0x597)]['toUpperCase']()){case _0x4b1d5e(0x60f):case _0x4b1d5e(0x456):case'EXCLAMATION':case'!':case'HEART':case _0x4b1d5e(0x35c):return 0x0;break;case _0x4b1d5e(0x57f):case _0x4b1d5e(0x50d):case _0x4b1d5e(0x484):case'?':case _0x4b1d5e(0x2c0):case _0x4b1d5e(0x42d):return 0x1;break;case _0x4b1d5e(0x21f):case _0x4b1d5e(0x25f):case'MUSIC\x20NOTE':case _0x4b1d5e(0x58b):case _0x4b1d5e(0x425):return 0x2;break;default:return VisuMZ[_0x4b1d5e(0x45b)][_0x4b1d5e(0x251)][_0x4b1d5e(0x333)](this);break;}},Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x1d2)]=function(){const _0x1e4094=_0x1b5cab;this[_0x1e4094(0x5ce)]=!![];},Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x31b)]=function(){const _0x516a99=_0x1b5cab;this[_0x516a99(0x5ce)]=![];},Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x34f)]=function(){const _0x2a96c1=_0x1b5cab;this[_0x2a96c1(0x56b)]=!![];},Game_CharacterBase['prototype']['clearDashing']=function(){const _0x21f7c9=_0x1b5cab;this[_0x21f7c9(0x56b)]=![];},Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x50a)]=function(){const _0x232d7c=_0x1b5cab;if(this[_0x232d7c(0x4bf)]())return![];if(this[_0x232d7c(0x5f4)])return![];if(this[_0x232d7c(0x414)])return![];if(this['_characterName']==='')return![];if(this[_0x232d7c(0x537)]===Game_Vehicle)return![];return!![];},Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x593)]=function(){const _0x47109a=_0x1b5cab;if(this[_0x47109a(0x3b3)]())return!![];if(this[_0x47109a(0x537)]===Game_Player&&this[_0x47109a(0x3e1)]())return!![];return![];},Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x285)]=function(){const _0x30a2eb=_0x1b5cab;return VisuMZ['EventsMoveCore'][_0x30a2eb(0x31c)]['Movement'][_0x30a2eb(0x17c)];},Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x2ad)]=function(){return this['screenX']();},Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x3ee)]=function(){const _0x34490c=_0x1b5cab;return this[_0x34490c(0x201)]()+this[_0x34490c(0x599)]()+this[_0x34490c(0x3aa)]();},Game_Character[_0x1b5cab(0x42e)]['findDiagonalDirectionTo']=function(_0x16c3ba,_0x1a4061){const _0x2883a4=_0x1b5cab,_0x2c851d=this[_0x2883a4(0x242)](),_0x4811de=$gameMap['width'](),_0x5e8418=[],_0x23e053=[],_0x1cdbaa=[],_0x36e870={};let _0x29242b=_0x36e870;if(this['x']===_0x16c3ba&&this['y']===_0x1a4061)return _0x2883a4(0x577)!==_0x2883a4(0x4ce)?0x0:this['moveAwayFromCharacter'](_0xdcb615);_0x36e870[_0x2883a4(0x41d)]=null,_0x36e870['x']=this['x'],_0x36e870['y']=this['y'],_0x36e870['g']=0x0,_0x36e870['f']=$gameMap[_0x2883a4(0x55e)](_0x36e870['x'],_0x36e870['y'],_0x16c3ba,_0x1a4061),_0x5e8418['push'](_0x36e870),_0x23e053['push'](_0x36e870['y']*_0x4811de+_0x36e870['x']);while(_0x5e8418['length']>0x0){let _0x3f9332=0x0;for(let _0x24582d=0x0;_0x24582d<_0x5e8418['length'];_0x24582d++){if(_0x2883a4(0x1cf)===_0x2883a4(0x1cf))_0x5e8418[_0x24582d]['f']<_0x5e8418[_0x3f9332]['f']&&(_0x3f9332=_0x24582d);else{if(this[_0x2883a4(0x3ef)]())this[_0x2883a4(0x490)]+=this[_0x2883a4(0x239)]();else _0x57cfac[_0x2883a4(0x4ec)][_0x2883a4(0x33b)]>0x0?this['contentsOpacity']=0x0:this[_0x2883a4(0x490)]-=this['opacitySpeed']();}}const _0x42bcb2=_0x5e8418[_0x3f9332],_0x34c434=_0x42bcb2['x'],_0x110021=_0x42bcb2['y'],_0x20145b=_0x110021*_0x4811de+_0x34c434,_0x3b0a0f=_0x42bcb2['g'];_0x5e8418[_0x2883a4(0x32e)](_0x3f9332,0x1),_0x23e053[_0x2883a4(0x32e)](_0x23e053[_0x2883a4(0x45f)](_0x20145b),0x1),_0x1cdbaa[_0x2883a4(0x378)](_0x20145b);if(_0x42bcb2['x']===_0x16c3ba&&_0x42bcb2['y']===_0x1a4061){_0x29242b=_0x42bcb2;break;}if(_0x3b0a0f>=_0x2c851d)continue;const _0x5bd9f4=[0x0,0x4,0x0,0x6,0x4,0x0,0x6,0x4,0x0,0x6],_0x4238be=[0x0,0x2,0x2,0x2,0x0,0x0,0x0,0x8,0x8,0x8];for(let _0x58d874=0x1;_0x58d874<0xa;_0x58d874++){if(_0x58d874===0x5)continue;const _0x39c271=_0x58d874,_0x50beba=_0x5bd9f4[_0x58d874],_0x14a61d=_0x4238be[_0x58d874],_0x1468c5=$gameMap['roundXWithDirection'](_0x34c434,_0x39c271),_0x729afd=$gameMap[_0x2883a4(0x452)](_0x110021,_0x39c271),_0x477450=_0x729afd*_0x4811de+_0x1468c5;if(_0x1cdbaa[_0x2883a4(0x42c)](_0x477450)){if('ZMyjW'!==_0x2883a4(0x569)){const _0xf8620a=_0x3ea623(_0x3abe7f['$1']),_0x3a8f82=this['checkCollisionKeywords'](_0x3690f0);return this[_0x2883a4(0x1a4)](_0xf8620a,_0x3a8f82);}else continue;}if(this[_0x2883a4(0x537)]===Game_Player&&VisuMZ[_0x2883a4(0x45b)]['Settings'][_0x2883a4(0x47a)][_0x2883a4(0x48c)]){if(!this['canPass'](_0x34c434,_0x110021,_0x50beba))continue;if(!this['canPass'](_0x34c434,_0x110021,_0x14a61d))continue;}if(!this[_0x2883a4(0x1bf)](_0x34c434,_0x110021,_0x50beba,_0x14a61d))continue;const _0x552e7=_0x3b0a0f+0x1,_0x59fbb2=_0x23e053[_0x2883a4(0x45f)](_0x477450);if(_0x59fbb2<0x0||_0x552e7<_0x5e8418[_0x59fbb2]['g']){let _0x511358={};_0x59fbb2>=0x0?_0x511358=_0x5e8418[_0x59fbb2]:(_0x5e8418[_0x2883a4(0x378)](_0x511358),_0x23e053[_0x2883a4(0x378)](_0x477450));_0x511358[_0x2883a4(0x41d)]=_0x42bcb2,_0x511358['x']=_0x1468c5,_0x511358['y']=_0x729afd,_0x511358['g']=_0x552e7,_0x511358['f']=_0x552e7+$gameMap[_0x2883a4(0x55e)](_0x1468c5,_0x729afd,_0x16c3ba,_0x1a4061);if(!_0x29242b||_0x511358['f']-_0x511358['g']<_0x29242b['f']-_0x29242b['g']){if('RWnCT'!==_0x2883a4(0x3b5))_0x29242b=_0x511358;else{if(_0x5b0184>0x0&&_0x3b7f45<0x0)return 0x9;if(_0xa1759b<0x0&&_0x15346c<0x0)return 0x7;if(_0x96f1d1>0x0&&_0x32a884>0x0)return 0x3;if(_0x1a3818<0x0&&_0x501f95>0x0)return 0x1;}}}}}let _0x282dfe=_0x29242b;while(_0x282dfe[_0x2883a4(0x41d)]&&_0x282dfe[_0x2883a4(0x41d)]!==_0x36e870){_0x282dfe=_0x282dfe['parent'];}const _0x5a96f5=$gameMap[_0x2883a4(0x319)](_0x282dfe['x'],_0x36e870['x']),_0x353eb0=$gameMap['deltaY'](_0x282dfe['y'],_0x36e870['y']);if(_0x5a96f5<0x0&&_0x353eb0>0x0)return 0x1;if(_0x5a96f5>0x0&&_0x353eb0>0x0)return 0x3;if(_0x5a96f5<0x0&&_0x353eb0<0x0)return 0x7;if(_0x5a96f5>0x0&&_0x353eb0<0x0)return 0x9;if(_0x353eb0>0x0)return 0x2;if(_0x5a96f5<0x0)return 0x4;if(_0x5a96f5>0x0)return 0x6;if(_0x353eb0<0x0)return 0x8;const _0x5a1e41=this[_0x2883a4(0x4a9)](_0x16c3ba),_0x1c1567=this['deltaYFrom'](_0x1a4061);if(Math[_0x2883a4(0x466)](_0x5a1e41)>Math['abs'](_0x1c1567)){if(_0x2883a4(0x598)!=='gJMaU')this[_0x2883a4(0x5ce)]=![];else return _0x5a1e41>0x0?0x4:0x6;}else{if(_0x1c1567!==0x0)return _0x1c1567>0x0?0x8:0x2;}return 0x0;},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x382)]=Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x454)],Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x454)]=function(_0x23c3ff,_0x15a3ea,_0x4875d7){const _0x101fa2=_0x1b5cab;if(this[_0x101fa2(0x3ea)]==='airship')return this[_0x101fa2(0x601)]()['isAirshipPassable'](_0x23c3ff,_0x15a3ea,_0x4875d7);else{if(_0x101fa2(0x2de)===_0x101fa2(0x5b5)){const _0x255c73=_0x3733ee['getSelfTarget']()||this;if(_0x255c73[_0x101fa2(0x537)]!==_0x548115)return _0x5bc1ef[_0x101fa2(0x45b)][_0x101fa2(0x570)][_0x101fa2(0x333)](this,_0x5e82cf);else{const _0x3bff6e=[_0x255c73[_0x101fa2(0x290)],_0x255c73['_eventId'],_0x101fa2(0x502)[_0x101fa2(0x30e)](_0x42a386)];return _0x258ba8[_0x101fa2(0x262)](_0x3bff6e);}}else return VisuMZ[_0x101fa2(0x45b)][_0x101fa2(0x382)][_0x101fa2(0x333)](this,_0x23c3ff,_0x15a3ea,_0x4875d7);}},Game_CharacterBase[_0x1b5cab(0x42e)]['clearSpriteOffsets']=function(){const _0x448ddc=_0x1b5cab;this[_0x448ddc(0x3be)]=0x0,this['_spriteOffsetY']=0x0;},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x2c7)]=Game_CharacterBase['prototype'][_0x1b5cab(0x250)],Game_CharacterBase['prototype'][_0x1b5cab(0x250)]=function(){const _0x3b8a3c=_0x1b5cab;return VisuMZ[_0x3b8a3c(0x45b)][_0x3b8a3c(0x2c7)]['call'](this)+(this[_0x3b8a3c(0x3be)]||0x0);},VisuMZ['EventsMoveCore'][_0x1b5cab(0x22f)]=Game_CharacterBase[_0x1b5cab(0x42e)]['screenY'],Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x201)]=function(){const _0x5e993c=_0x1b5cab;return VisuMZ['EventsMoveCore']['Game_CharacterBase_screenY'][_0x5e993c(0x333)](this)+(this['_spriteOffsetY']||0x0);},Game_CharacterBase['prototype'][_0x1b5cab(0x196)]=function(){const _0x1b1a2c=_0x1b5cab;this[_0x1b1a2c(0x247)]='';},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x4a5)]=Game_CharacterBase['prototype']['updatePattern'],Game_CharacterBase[_0x1b5cab(0x42e)]['updatePattern']=function(){const _0x779e78=_0x1b5cab;if(this[_0x779e78(0x43b)])return;if(this[_0x779e78(0x19a)]())return;VisuMZ[_0x779e78(0x45b)][_0x779e78(0x4a5)]['call'](this);},Game_CharacterBase[_0x1b5cab(0x42e)]['updatePatternEventsMoveCore']=function(){const _0x4ee5db=_0x1b5cab;if(!this['hasStepAnime']()&&this['_stopCount']>0x0)return![];switch(String(this[_0x4ee5db(0x247)])[_0x4ee5db(0x2e3)]()[_0x4ee5db(0x54c)]()){case _0x4ee5db(0x420):this[_0x4ee5db(0x3d0)]+=0x1;if(this['_pattern']>0x2)this['setPattern'](0x0);break;case _0x4ee5db(0x256):this[_0x4ee5db(0x3d0)]-=0x1;if(this['_pattern']<0x0)this[_0x4ee5db(0x59c)](0x2);break;case _0x4ee5db(0x527):case _0x4ee5db(0x4cc):this[_0x4ee5db(0x59d)]();break;case _0x4ee5db(0x5d1):case _0x4ee5db(0x2fc):case _0x4ee5db(0x53d):case _0x4ee5db(0x1ab):this['turnLeft90']();break;default:return![];}return!![];},Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x442)]=function(){return $gameSystem['getEventIconData'](this);},Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x286)]=function(){const _0xb51910=this['getEventIconData']();if(!_0xb51910)return![];return _0xb51910['iconIndex']>0x0;},Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x400)]=function(){const _0x53f2a2=_0x1b5cab,_0x2c7f7=this[_0x53f2a2(0x246)]();return $gameMap[_0x53f2a2(0x56c)](this['x'],_0x2c7f7);},Game_CharacterBase[_0x1b5cab(0x42e)][_0x1b5cab(0x34c)]=function(){const _0x4b4f60=_0x1b5cab,_0x55a2cb=this[_0x4b4f60(0x246)]();return $gameMap[_0x4b4f60(0x452)](this['y'],_0x55a2cb);},Game_CharacterBase[_0x1b5cab(0x42e)]['backX']=function(){const _0x4f93de=_0x1b5cab,_0x43aa83=this[_0x4f93de(0x273)](this['direction']());return $gameMap[_0x4f93de(0x56c)](this['x'],_0x43aa83);},Game_CharacterBase['prototype'][_0x1b5cab(0x587)]=function(){const _0x15b52d=_0x1b5cab,_0x54b1fb=this[_0x15b52d(0x273)](this[_0x15b52d(0x246)]());return $gameMap[_0x15b52d(0x452)](this['y'],_0x54b1fb);},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x24c)]=Game_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x4e8)],Game_Character[_0x1b5cab(0x42e)]['setMoveRoute']=function(_0x292fc8){const _0xc577f7=_0x1b5cab;route=JsonEx[_0xc577f7(0x525)](_0x292fc8),VisuMZ[_0xc577f7(0x45b)][_0xc577f7(0x24c)]['call'](this,route);},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x567)]=Game_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x539)],Game_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x539)]=function(_0x3f7f0d){const _0x2ea9db=_0x1b5cab;route=JsonEx[_0x2ea9db(0x525)](_0x3f7f0d),VisuMZ[_0x2ea9db(0x45b)][_0x2ea9db(0x567)]['call'](this,route);},VisuMZ[_0x1b5cab(0x45b)]['Game_Character_processMoveCommand']=Game_Character[_0x1b5cab(0x42e)]['processMoveCommand'],Game_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x1c0)]=function(_0x19654e){const _0x173c53=_0x1b5cab,_0x23cd35=Game_Character,_0x5ca22c=_0x19654e[_0x173c53(0x5b9)];if(_0x19654e[_0x173c53(0x265)]===_0x23cd35['ROUTE_SCRIPT']){let _0x46e3c1=_0x19654e[_0x173c53(0x5b9)][0x0];_0x46e3c1=this['convertVariableValuesInScriptCall'](_0x46e3c1),_0x46e3c1=this['convertSelfVariableValuesInScriptCall'](_0x46e3c1),this['processMoveCommandEventsMoveCore'](_0x19654e,_0x46e3c1);}else{if(_0x173c53(0x1a9)==='Qzblw'){const _0x21d647=_0x301419[_0x173c53(0x4b3)](this[_0x173c53(0x430)]()),_0x30098d=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x21d647[_0x173c53(0x592)]()];this[_0x173c53(0x276)](_0x30098d);}else VisuMZ[_0x173c53(0x45b)][_0x173c53(0x458)][_0x173c53(0x333)](this,_0x19654e);}},Game_Character[_0x1b5cab(0x42e)]['convertVariableValuesInScriptCall']=function(_0x58b160){const _0x259674=_0x1b5cab,_0x5b1b33=/\$gameVariables\.value\((\d+)\)/gi,_0x512423=/\\V\[(\d+)\]/gi;while(_0x58b160[_0x259674(0x3e6)](_0x5b1b33)){if(_0x259674(0x4e1)!==_0x259674(0x4e1))return _0x3b4229>0x0?0x8:0x2;else _0x58b160=_0x58b160['replace'](_0x5b1b33,(_0x16b0b1,_0x406b83)=>$gameVariables['value'](parseInt(_0x406b83)));}while(_0x58b160[_0x259674(0x3e6)](_0x512423)){_0x58b160=_0x58b160[_0x259674(0x481)](_0x512423,(_0x13cf2c,_0x2418b9)=>$gameVariables[_0x259674(0x262)](parseInt(_0x2418b9)));}return _0x58b160;},Game_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x29d)]=function(_0x426685){const _0x702599=_0x1b5cab,_0x108570=/\\SELFVAR\[(\d+)\]/gi;while(_0x426685[_0x702599(0x3e6)](_0x108570)){if('avldv'===_0x702599(0x2df)){const _0x4fccb4=this[_0x702599(0x60c)](_0x17ea3a,_0x5b46c4,![]);if(_0x4fccb4)this[_0x702599(0x3ca)](_0x4fccb4);}else _0x426685=_0x426685[_0x702599(0x481)](_0x108570,(_0x3f39a5,_0x267980)=>getSelfVariableValue(this[_0x702599(0x290)],this[_0x702599(0x332)],parseInt(_0x267980)));}return _0x426685;},Game_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x39a)]=function(_0x5ac77e,_0x26f8c7){const _0xec5936=_0x1b5cab;if(_0x26f8c7[_0xec5936(0x3e6)](/ANIMATION:[ ](\d+)/i))return this[_0xec5936(0x374)](Number(RegExp['$1']));if(_0x26f8c7[_0xec5936(0x3e6)](/BALLOON:[ ](.*)/i))return this[_0xec5936(0x3fb)](String(RegExp['$1']));if(_0x26f8c7['match'](/FADE IN:[ ](\d+)/i))return _0xec5936(0x4fc)===_0xec5936(0x591)?(this[_0xec5936(0x597)]||'')[_0xec5936(0x2e3)]()['trim']():this[_0xec5936(0x59b)](Number(RegExp['$1']));if(_0x26f8c7[_0xec5936(0x3e6)](/FADE OUT:[ ](\d+)/i)){if(_0xec5936(0x309)!=='AxACl'){_0x107e1d['ConvertParams'](_0x5e0677,_0x59dcbe);const _0x5eb3bb=_0x5b715e['getLastPluginCommandInterpreter']();_0x8abbd0[_0xec5936(0x446)]=_0x5b3498['MapId']||_0x32a168[_0xec5936(0x56f)](),_0x3e6ba8[_0xec5936(0x3b8)](_0x118185[_0xec5936(0x446)],_0x56607f[_0xec5936(0x4d5)]||_0x5eb3bb[_0xec5936(0x53b)](),_0x416c5b[_0xec5936(0x5fb)],_0x1d8dbe[_0xec5936(0x564)],_0x4f8d42['IconBufferY'],_0x564d20[_0xec5936(0x324)]);}else return this[_0xec5936(0x44b)](Number(RegExp['$1']));}if(_0x26f8c7['match'](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i))return this['forceCarrying']();if(_0x26f8c7['match'](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this[_0xec5936(0x31b)]();if(_0x26f8c7[_0xec5936(0x3e6)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i)){if(_0xec5936(0x356)===_0xec5936(0x356))return this['forceDashing']();else while(this[_0xec5936(0x372)]()){this['executeCommand']();}}if(_0x26f8c7[_0xec5936(0x3e6)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return _0xec5936(0x248)!=='OVJdP'?this[_0xec5936(0x3e1)]()&&this[_0xec5936(0x601)]()?this['vehicle']()[_0xec5936(0x41a)](_0x358692,_0x4bb2a5,_0x55491f):!![]:this[_0xec5936(0x376)]();if(_0x26f8c7[_0xec5936(0x3e6)](/HUG:[ ]LEFT/i)){if('BAAoD'!=='cRvAb')return this[_0xec5936(0x42b)](_0xec5936(0x26d));else{if(this['_alwaysUpdateMove'])return!![];return _0x2ed6bb[_0xec5936(0x42e)][_0xec5936(0x49d)]['call'](this);}}if(_0x26f8c7['match'](/HUG:[ ]RIGHT/i))return this[_0xec5936(0x42b)]('right');if(_0x26f8c7[_0xec5936(0x3e6)](/INDEX:[ ](\d+)/i))return this[_0xec5936(0x4f3)](Number(RegExp['$1']));if(_0x26f8c7[_0xec5936(0x3e6)](/INDEX:[ ]([\+\-]\d+)/i)){if('sGjAF'===_0xec5936(0x533)){const _0xf60d6b=this['_characterIndex']+Number(RegExp['$1']);return this['processMoveRouteSetIndex'](_0xf60d6b);}else this['_selfTarget']=_0x5f30c0;}if(_0x26f8c7[_0xec5936(0x3e6)](/JUMP FORWARD:[ ](\d+)/i))return this[_0xec5936(0x231)](Number(RegExp['$1']));if(_0x26f8c7['match'](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0xec5936(0x45a)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x26f8c7[_0xec5936(0x3e6)](/JUMP TO EVENT:[ ](\d+)/i)){const _0x2911bd=$gameMap[_0xec5936(0x3ae)](Number(RegExp['$1']));return this[_0xec5936(0x3d9)](_0x2911bd);}if(_0x26f8c7[_0xec5936(0x3e6)](/JUMP TO PLAYER/i)){if(_0xec5936(0x25d)===_0xec5936(0x25d))return this[_0xec5936(0x3d9)]($gamePlayer);else this[_0xec5936(0x492)]();}if(_0x26f8c7[_0xec5936(0x3e6)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){if('DphgV'!=='DphgV')_0x12244a['registerSelfTarget'](_0x42daf5[_0xec5936(0x27f)]),_0x34c067[_0xec5936(0x45b)][_0xec5936(0x3df)][_0xec5936(0x333)](this),_0x31dc5a['clearSelfTarget'](),_0x4f8dbc[_0xec5936(0x27f)]=_0x64842c;else{const _0x42ead5=String(RegExp['$1']),_0x3d725e=this[_0xec5936(0x47e)](_0x26f8c7);return this[_0xec5936(0x1a4)](_0x42ead5,_0x3d725e);}}if(_0x26f8c7[_0xec5936(0x3e6)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0xe6a1d1=Number(RegExp['$1']),_0x4d25f6=Number(RegExp['$2']),_0x189cde=this['checkCollisionKeywords'](_0x26f8c7);return this['processMoveRouteMoveTo'](_0xe6a1d1,_0x4d25f6,_0x189cde);}if(_0x26f8c7[_0xec5936(0x3e6)](/MOVE TO EVENT:[ ](\d+)/i)){const _0x3046d1=$gameMap[_0xec5936(0x3ae)](Number(RegExp['$1'])),_0x2f9b78=this[_0xec5936(0x47e)](_0x26f8c7);return this[_0xec5936(0x27e)](_0x3046d1,_0x2f9b78);}if(_0x26f8c7['match'](/MOVE TO PLAYER/i)){const _0x541985=this[_0xec5936(0x47e)](_0x26f8c7);return this['processMoveRouteMoveToCharacter']($gamePlayer,_0x541985);}if(_0x26f8c7[_0xec5936(0x3e6)](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0xec5936(0x1e8)](0x1,Number(RegExp['$1']));if(_0x26f8c7['match'](/MOVE DOWN:[ ](\d+)/i))return'mBCoz'!==_0xec5936(0x221)?this[_0xec5936(0x1e8)](0x2,Number(RegExp['$1'])):this[_0xec5936(0x42b)](_0xec5936(0x26d));if(_0x26f8c7[_0xec5936(0x3e6)](/MOVE LOWER RIGHT:[ ](\d+)/i))return this[_0xec5936(0x1e8)](0x3,Number(RegExp['$1']));if(_0x26f8c7[_0xec5936(0x3e6)](/MOVE LEFT:[ ](\d+)/i)){if(_0xec5936(0x4bb)==='HWmsq')this[_0xec5936(0x371)]();else return this[_0xec5936(0x1e8)](0x4,Number(RegExp['$1']));}if(_0x26f8c7[_0xec5936(0x3e6)](/MOVE RIGHT:[ ](\d+)/i))return _0xec5936(0x1f2)==='DaQKG'?this['processMoveRouteMoveRepeat'](0x6,Number(RegExp['$1'])):_0x2a80fa['DashModifier'];if(_0x26f8c7[_0xec5936(0x3e6)](/MOVE UPPER LEFT:[ ](\d+)/i))return this[_0xec5936(0x1e8)](0x7,Number(RegExp['$1']));if(_0x26f8c7[_0xec5936(0x3e6)](/MOVE UP:[ ](\d+)/i))return this[_0xec5936(0x1e8)](0x8,Number(RegExp['$1']));if(_0x26f8c7[_0xec5936(0x3e6)](/MOVE UPPER RIGHT:[ ](\d+)/i))return this[_0xec5936(0x1e8)](0x9,Number(RegExp['$1']));if(_0x26f8c7['match'](/OPACITY:[ ](\d+)([%％])/i)){const _0x2ba49c=Math[_0xec5936(0x308)](Number(RegExp['$1'])/0x64*0xff);return this['setOpacity'](_0x2ba49c[_0xec5936(0x49f)](0x0,0xff));}if(_0x26f8c7[_0xec5936(0x3e6)](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){if(_0xec5936(0x44a)!==_0xec5936(0x44a))return _0x564936[_0xec5936(0x175)]();else{const _0x3e30a6=this['_opacity']+Math[_0xec5936(0x308)](Number(RegExp['$1'])/0x64*0xff);return this[_0xec5936(0x595)](_0x3e30a6[_0xec5936(0x49f)](0x0,0xff));}}if(_0x26f8c7[_0xec5936(0x3e6)](/OPACITY:[ ]([\+\-]\d+)/i)){if(_0xec5936(0x3bf)!==_0xec5936(0x3bf)){this['_moveSynch'][_0xec5936(0x4d8)]=this[_0xec5936(0x588)]['timer']||0x0,this['_moveSynch'][_0xec5936(0x4d8)]--;if(this[_0xec5936(0x588)][_0xec5936(0x4d8)]>0x0)return;this[_0xec5936(0x588)][_0xec5936(0x4d8)]=this[_0xec5936(0x588)][_0xec5936(0x316)],this[_0xec5936(0x18c)]();}else{const _0x71cffb=this[_0xec5936(0x211)]+Number(RegExp['$1']);return this[_0xec5936(0x595)](_0x71cffb[_0xec5936(0x49f)](0x0,0xff));}}if(_0x26f8c7[_0xec5936(0x3e6)](/PATTERN LOCK:[ ](\d+)/i))return this[_0xec5936(0x3f4)](Number(RegExp['$1']));if(_0x26f8c7['match'](/PATTERN UNLOCK/i))return _0xec5936(0x4c0)===_0xec5936(0x189)?!![]:this[_0xec5936(0x43b)]=![];if(_0x26f8c7[_0xec5936(0x3e6)](/POSE:[ ](.*)/i)){const _0x7687fd=String(RegExp['$1'])[_0xec5936(0x2e3)]()[_0xec5936(0x54c)]();return this['setPose'](_0x7687fd);}if(_0x26f8c7[_0xec5936(0x3e6)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0xec5936(0x388)===_0xec5936(0x22d)){if(this[_0xec5936(0x390)]===_0x1322a1)this[_0xec5936(0x575)]();if(!_0x387167)return null;const _0x541390=_0xec5936(0x412)[_0xec5936(0x30e)](_0x1b8f41['_mapId'],_0x308e59['_eventId']);return this[_0xec5936(0x390)][_0x541390];}else{const _0x29caac=Number(RegExp['$1']),_0x5d8b36=Number(RegExp['$2']);return this[_0xec5936(0x18e)](_0x29caac,_0x5d8b36);}}if(_0x26f8c7[_0xec5936(0x3e6)](/STEP TOWARD EVENT:[ ](\d+)/i)){if(_0xec5936(0x28b)!=='qSZRK'){const _0x586743=$gameMap[_0xec5936(0x3ae)](Number(RegExp['$1']));return this[_0xec5936(0x5f7)](_0x586743);}else return _0x4d3d3d['EventsMoveCore'][_0xec5936(0x2c7)]['call'](this)+(this['_spriteOffsetX']||0x0);}if(_0x26f8c7[_0xec5936(0x3e6)](/STEP TOWARD PLAYER/i)){if(_0xec5936(0x5e6)!==_0xec5936(0x5e6)){const _0x74c326=this[_0xec5936(0x3ae)](_0x2d925f);if(_0x74c326)_0x74c326[_0xec5936(0x563)]();}else return this['processMoveRouteStepToPlayer']($gamePlayer);}if(_0x26f8c7[_0xec5936(0x3e6)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0xec5936(0x574)!==_0xec5936(0x574)){const _0x31c0f8=_0x5d5e0a[_0xec5936(0x56c)](_0x408eef,_0x26fde8),_0x3fdf17=_0x19b28d['roundYWithDirection'](_0x3e1931,_0x197eb2),_0x4cb57f=_0x2e7340[_0xec5936(0x2e7)](_0x31c0f8,_0x3fdf17);return this[_0xec5936(0x3f9)][_0xec5936(0x42c)](_0x4cb57f);}else return this[_0xec5936(0x514)](Number(RegExp['$1']),Number(RegExp['$2']));}if(_0x26f8c7[_0xec5936(0x3e6)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){if('pMQNA'===_0xec5936(0x3f5)){const _0x11a968=$gameMap[_0xec5936(0x3ae)](Number(RegExp['$1']));return this[_0xec5936(0x1e3)](_0x11a968);}else{const _0x4badba=_0x3187f9[_0xec5936(0x38a)]('['+_0xad1f5d['$1']['match'](/\d+/g)+']');this[_0xec5936(0x3f9)]=this[_0xec5936(0x3f9)][_0xec5936(0x277)](_0x4badba),this[_0xec5936(0x3f9)][_0xec5936(0x436)](0x0);}}if(_0x26f8c7[_0xec5936(0x3e6)](/STEP AWAY FROM PLAYER/i))return this[_0xec5936(0x1e3)]($gamePlayer);if(_0x26f8c7[_0xec5936(0x3e6)](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0xec5936(0x317)!==_0xec5936(0x317)){if(this[_0xec5936(0x4e0)]===_0x2ef57d)this[_0xec5936(0x575)]();const _0x3ae90c='Map%1-Event%2'['format'](_0x16da05,_0x46703a);this['_EventIcons'][_0x3ae90c]={'iconIndex':_0x525c78,'bufferX':_0x583749,'bufferY':_0x50e4fa,'blendMode':_0x5d9ba5};}else return this['moveTowardPoint'](Number(RegExp['$1']),Number(RegExp['$2']));}if(_0x26f8c7[_0xec5936(0x3e6)](/TURN TO EVENT:[ ](\d+)/i)){const _0x2bab6d=$gameMap[_0xec5936(0x3ae)](Number(RegExp['$1']));return this[_0xec5936(0x3a7)](_0x2bab6d);}if(_0x26f8c7[_0xec5936(0x3e6)](/TURN TO PLAYER/i))return this[_0xec5936(0x3a7)]($gamePlayer);if(_0x26f8c7[_0xec5936(0x3e6)](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['turnAwayFromPoint'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x26f8c7['match'](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0x2313bb=$gameMap['event'](Number(RegExp['$1']));return this[_0xec5936(0x182)](_0x2313bb);}if(_0x26f8c7[_0xec5936(0x3e6)](/TURN AWAY FROM PLAYER/i))return this[_0xec5936(0x182)]($gamePlayer);if(_0x26f8c7['match'](/TURN LOWER LEFT/i))return this['setDirection'](0x1);if(_0x26f8c7[_0xec5936(0x3e6)](/TURN LOWER RIGHT/i))return this['setDirection'](0x3);if(_0x26f8c7[_0xec5936(0x3e6)](/TURN UPPER LEFT/i))return this[_0xec5936(0x3ca)](0x7);if(_0x26f8c7[_0xec5936(0x3e6)](/TURN UPPER RIGHT/i))return this[_0xec5936(0x3ca)](0x9);if(_0x26f8c7[_0xec5936(0x3e6)](/Self Switch[ ](.*):[ ](.*)/i))return this['processMoveRouteSelfSwitch'](RegExp['$1'],RegExp['$2']);if(_0x26f8c7[_0xec5936(0x3e6)](/Self Variable[ ](.*):[ ](.*)/i))return _0xec5936(0x5cb)==='aMSUO'?this[_0xec5936(0x170)][_0xec5936(0x2b9)]:this[_0xec5936(0x4cb)](RegExp['$1'],RegExp['$2']);if(_0x26f8c7[_0xec5936(0x3e6)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['processMoveRouteTeleportTo'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x26f8c7[_0xec5936(0x3e6)](/TELEPORT TO EVENT:[ ](\d+)/i)){if(_0xec5936(0x512)==='FGiOy')return _0x344bff[_0xec5936(0x442)](this);else{const _0x52d9b8=$gameMap['event'](Number(RegExp['$1']));return this[_0xec5936(0x1a5)](_0x52d9b8);}}if(_0x26f8c7[_0xec5936(0x3e6)](/TELEPORT TO PLAYER/i))return _0xec5936(0x1d1)!=='slZEO'?{'iconIndex':0x0,'bufferX':_0x565c3e[_0xec5936(0x4c9)][_0xec5936(0x48b)],'bufferY':_0x3e98ef['Icon'][_0xec5936(0x5e0)],'blendMode':_0xa6f76d[_0xec5936(0x4c9)][_0xec5936(0x5fd)]}:this[_0xec5936(0x1a5)]($gamePlayer);try{if(_0xec5936(0x200)!==_0xec5936(0x368))VisuMZ[_0xec5936(0x45b)]['Game_Character_processMoveCommand'][_0xec5936(0x333)](this,_0x5ac77e);else{if(!_0x442da5['isWorking']())return;_0x147e55[_0xec5936(0x2fb)](_0x15ad31,_0x3c1ef6);let _0x119d58=0x0;_0x119d58+=_0x8f5436['Frames'],_0x119d58+=_0x54e1b8['Seconds']*0x3c,_0x119d58+=_0x66703a['Minutes']*0x3c*0x3c,_0x119d58+=_0x2982b6[_0xec5936(0x551)]*0x3c*0x3c*0x3c,_0x5c4b78[_0xec5936(0x553)](_0x119d58);}}catch(_0x24bb2c){if(_0xec5936(0x5b4)==='XDzak'){if($gameTemp[_0xec5936(0x50f)]())console[_0xec5936(0x4d9)](_0x24bb2c);}else _0x1c1708[_0xec5936(0x2e9)](this[_0xec5936(0x56f)]());}},Game_Character[_0x1b5cab(0x42e)]['processMoveRouteAnimation']=function(_0x36d9af){const _0x3494b7=_0x1b5cab;$gameTemp[_0x3494b7(0x1fc)]([this],_0x36d9af);},Game_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x3fb)]=function(_0x1a5fae){const _0x5aaaee=_0x1b5cab;let _0x609ae9=0x0;switch(_0x1a5fae['toUpperCase']()['trim']()){case'!':case'EXCLAMATION':_0x609ae9=0x1;break;case'?':case'QUESTION':_0x609ae9=0x2;break;case _0x5aaaee(0x3dd):case _0x5aaaee(0x288):case'MUSIC\x20NOTE':case _0x5aaaee(0x19e):case _0x5aaaee(0x343):_0x609ae9=0x3;break;case'HEART':case'LOVE':_0x609ae9=0x4;break;case _0x5aaaee(0x2c0):_0x609ae9=0x5;break;case _0x5aaaee(0x58b):_0x609ae9=0x6;break;case'COBWEB':case'ANNOYED':case _0x5aaaee(0x4bc):_0x609ae9=0x7;break;case _0x5aaaee(0x42d):case'...':_0x609ae9=0x8;break;case'LIGHT':case _0x5aaaee(0x21a):case _0x5aaaee(0x425):case _0x5aaaee(0x40b):case _0x5aaaee(0x478):_0x609ae9=0x9;break;case'Z':case'ZZ':case _0x5aaaee(0x2fa):case _0x5aaaee(0x32c):_0x609ae9=0xa;break;case _0x5aaaee(0x55d):_0x609ae9=0xb;break;case _0x5aaaee(0x419):_0x609ae9=0xc;break;case _0x5aaaee(0x445):_0x609ae9=0xd;break;case'USER-DEFINED\x204':_0x609ae9=0xe;break;case'USER-DEFINED\x205':_0x609ae9=0xf;break;}$gameTemp[_0x5aaaee(0x197)](this,_0x609ae9);},Game_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x59b)]=function(_0x378b33){const _0x30ebc7=_0x1b5cab;_0x378b33+=this[_0x30ebc7(0x211)],this[_0x30ebc7(0x595)](_0x378b33[_0x30ebc7(0x49f)](0x0,0xff));if(this[_0x30ebc7(0x211)]<0xff)this[_0x30ebc7(0x21b)]--;},Game_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x44b)]=function(_0x4f8db6){const _0x2c84e9=_0x1b5cab;_0x4f8db6=this[_0x2c84e9(0x211)]-_0x4f8db6,this['setOpacity'](_0x4f8db6[_0x2c84e9(0x49f)](0x0,0xff));if(this[_0x2c84e9(0x211)]>0x0)this[_0x2c84e9(0x21b)]--;},Game_Character[_0x1b5cab(0x42e)]['processMoveRouteHugWall']=function(_0x70d2d0){const _0x5ab999=_0x1b5cab,_0x342eb9=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x4127f9=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x357678=this[_0x5ab999(0x246)](),_0x3c2e08=(_0x70d2d0===_0x5ab999(0x26d)?_0x342eb9:_0x4127f9)[_0x357678],_0x2ef202=(_0x70d2d0===_0x5ab999(0x26d)?_0x4127f9:_0x342eb9)[_0x357678];if(this[_0x5ab999(0x454)](this['x'],this['y'],_0x3c2e08))_0x70d2d0===_0x5ab999(0x26d)?'cDBuU'!=='xUWHI'?this['turnLeft90']():_0x479b43+=this[_0x5ab999(0x54e)]():this[_0x5ab999(0x59d)]();else!this['canPass'](this['x'],this['y'],this[_0x5ab999(0x246)]())&&(this[_0x5ab999(0x454)](this['x'],this['y'],_0x2ef202)?_0x70d2d0===_0x5ab999(0x26d)?this[_0x5ab999(0x59d)]():this[_0x5ab999(0x41c)]():this[_0x5ab999(0x401)]());this[_0x5ab999(0x454)](this['x'],this['y'],this[_0x5ab999(0x246)]())&&(_0x5ab999(0x45e)==='BQHNR'?this[_0x5ab999(0x36e)](this['x'],this['y']):this[_0x5ab999(0x5be)]());},Game_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x4f3)]=function(_0x41efe9){const _0xb5d09d=_0x1b5cab;if(ImageManager[_0xb5d09d(0x2be)](this[_0xb5d09d(0x19c)]))return;_0x41efe9=_0x41efe9['clamp'](0x0,0x7),this[_0xb5d09d(0x52a)](this[_0xb5d09d(0x19c)],_0x41efe9);},Game_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x231)]=function(_0x84d378){const _0x2e30cf=_0x1b5cab;switch(this[_0x2e30cf(0x246)]()){case 0x1:this[_0x2e30cf(0x287)](-_0x84d378,_0x84d378);break;case 0x2:this['jump'](0x0,_0x84d378);break;case 0x3:this[_0x2e30cf(0x287)](_0x84d378,_0x84d378);break;case 0x4:this[_0x2e30cf(0x287)](-_0x84d378,0x0);break;case 0x6:this[_0x2e30cf(0x287)](_0x84d378,0x0);break;case 0x7:this['jump'](-_0x84d378,-_0x84d378);break;case 0x8:this[_0x2e30cf(0x287)](0x0,-_0x84d378);break;case 0x9:this[_0x2e30cf(0x287)](_0x84d378,-_0x84d378);break;}},Game_Character['prototype'][_0x1b5cab(0x45a)]=function(_0x4b1824,_0x273bf3){const _0x4a95c0=_0x1b5cab,_0x5ebd21=Math[_0x4a95c0(0x308)](_0x4b1824-this['x']),_0x525044=Math[_0x4a95c0(0x308)](_0x273bf3-this['y']);this['jump'](_0x5ebd21,_0x525044);},Game_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x3d9)]=function(_0x1e3381){const _0x33f417=_0x1b5cab;if(_0x1e3381)this[_0x33f417(0x45a)](_0x1e3381['x'],_0x1e3381['y']);},Game_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x18e)]=function(_0x1e5ac6,_0x571b14,_0x55e118){const _0x5d6ab8=_0x1b5cab;let _0x691e16=0x0;if(_0x55e118)$gameTemp[_0x5d6ab8(0x5ac)]=!![];if($gameMap[_0x5d6ab8(0x516)]())_0x691e16=this[_0x5d6ab8(0x4b8)](_0x1e5ac6,_0x571b14);else{if('lAzlT'!=='DYzpc')_0x691e16=this[_0x5d6ab8(0x3b9)](_0x1e5ac6,_0x571b14);else{_0x1090e5['ConvertParams'](_0x59d09f,_0x107469);const _0x413913=_0x4565a1[_0x5d6ab8(0x291)](),_0x32ac7e={'template':_0x52bc44[_0x5d6ab8(0x3a0)],'mapId':_0x27588d['MapId']||_0x2dd127['mapId'](),'eventId':_0x33f0c0['EventId']||_0x413913['eventId'](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x4cce99[_0x5d6ab8(0x559)],'spawnEventId':_0x555f3f['_spawnedEvents'][_0x5d6ab8(0x55b)]+0x3e8},_0x82145=_0x16acb4[_0x5d6ab8(0x3c6)]||0x0,_0x3f7092=_0x226a7d['prepareSpawnedEventAtTerrainTag'](_0x32ac7e,_0x2f1a9e[_0x5d6ab8(0x358)],_0x92080e['Collision'],_0x1e45bb[_0x5d6ab8(0x3b7)]);_0x82145&&_0x4e77f4['setValue'](_0x82145,!!_0x3f7092);}}if(_0x55e118)$gameTemp[_0x5d6ab8(0x5ac)]=![];this[_0x5d6ab8(0x276)](_0x691e16),this[_0x5d6ab8(0x31f)](!![]);},Game_Character['prototype']['processMoveRouteStepToCharacter']=function(_0x45cf13){const _0x4c98b4=_0x1b5cab;if(_0x45cf13)this[_0x4c98b4(0x18e)](_0x45cf13['x'],_0x45cf13['y']);},Game_Character[_0x1b5cab(0x42e)]['processMoveRouteStepFrom']=function(_0x2b0abe,_0x1140a8){const _0x1c5fa1=_0x1b5cab,_0x3aa742=this[_0x1c5fa1(0x4a9)](_0x2b0abe),_0x5f58e6=this['deltaYFrom'](_0x1140a8);},Game_Character[_0x1b5cab(0x42e)]['checkCollisionKeywords']=function(_0x433e2a){const _0x2c86eb=_0x1b5cab;if(_0x433e2a[_0x2c86eb(0x3e6)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i)){if('YAUki'===_0x2c86eb(0x4b6)){const _0x584437=this[_0x2c86eb(0x36b)]();return _0x584437?_0x584437[_0x2c86eb(0x332)]:0x0;}else return!![];}else{if(_0x433e2a[_0x2c86eb(0x3e6)](/(?:AVOID|EVADE|DODGE)/i)){if(_0x2c86eb(0x585)===_0x2c86eb(0x585))return![];else{const _0x2cd5f1=_0x404807[_0x2c86eb(0x549)](this);_0x2cd5f1&&_0x2cd5f1['_shadowSprite']&&_0x2cd5f1['_shadowSprite'][_0x2c86eb(0x4b7)]!==this[_0x2c86eb(0x285)]()&&(_0x2cd5f1[_0x2c86eb(0x2dd)]['_filename']=this['shadowFilename'](),_0x2cd5f1[_0x2c86eb(0x2dd)][_0x2c86eb(0x3f6)]=_0x541ec2[_0x2c86eb(0x5c4)](_0x2cd5f1[_0x2c86eb(0x2dd)][_0x2c86eb(0x4b7)]));}}else return![];}},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x1ff)]=Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x60d)],Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x60d)]=function(_0x236bda,_0x48894e){const _0x23ff89=_0x1b5cab;if($gameTemp[_0x23ff89(0x5ac)])return![];return VisuMZ[_0x23ff89(0x45b)][_0x23ff89(0x1ff)]['call'](this,_0x236bda,_0x48894e);},Game_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x1a4)]=function(_0x14d31e,_0x23d55f){const _0x4202f6=_0x1b5cab,_0x27a75b=['',_0x4202f6(0x3e9),_0x4202f6(0x380),_0x4202f6(0x307),_0x4202f6(0x46b),'',_0x4202f6(0x5f1),_0x4202f6(0x399),'UP','UPPER\x20RIGHT'],_0x3bf8d1=_0x27a75b[_0x4202f6(0x45f)](_0x14d31e[_0x4202f6(0x2e3)]()[_0x4202f6(0x54c)]());if(_0x3bf8d1<=0x0)return;if(_0x23d55f)$gameTemp[_0x4202f6(0x5ac)]=!![];if(this[_0x4202f6(0x454)](this['x'],this['y'],_0x3bf8d1)){if(_0x4202f6(0x2e5)===_0x4202f6(0x2e5)){if(_0x23d55f)$gameTemp[_0x4202f6(0x5ac)]=![];this['executeMoveDir8'](_0x3bf8d1),this[_0x4202f6(0x21b)]-=0x1;}else this[_0x4202f6(0x491)]();}if(_0x23d55f)$gameTemp[_0x4202f6(0x5ac)]=![];},Game_Character['prototype'][_0x1b5cab(0x43e)]=function(_0x5afaa5,_0x3cdfc9,_0x1134e6){const _0x1402ef=_0x1b5cab;this[_0x1402ef(0x18e)](_0x5afaa5,_0x3cdfc9,_0x1134e6);if(this['x']!==_0x5afaa5||this['y']!==_0x3cdfc9)this[_0x1402ef(0x21b)]--;},Game_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x27e)]=function(_0x3e5c96,_0x5a7b95){if(_0x3e5c96)this['processMoveRouteMoveTo'](_0x3e5c96['x'],_0x3e5c96['y'],_0x5a7b95);},Game_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x1e8)]=function(_0x436c5a,_0xc33a28){const _0x17449f=_0x1b5cab;_0xc33a28=_0xc33a28||0x0;const _0x33a629={'code':0x1,'indent':null,'parameters':[]};_0x33a629[_0x17449f(0x265)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x436c5a],this['_moveRoute']['list'][this[_0x17449f(0x21b)]][_0x17449f(0x5b9)][0x0]='';while(_0xc33a28--){this[_0x17449f(0x1c3)][_0x17449f(0x342)][_0x17449f(0x32e)](this['_moveRouteIndex']+0x1,0x0,_0x33a629);}},Game_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x3f4)]=function(_0xb2ebf1){const _0x118e04=_0x1b5cab;this[_0x118e04(0x43b)]=!![],this['setPattern'](_0xb2ebf1);},Game_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x171)]=function(_0x5424ab,_0x8caa0b){const _0x23b27a=_0x1b5cab;if(this===$gamePlayer)return;const _0x278f9b=[this[_0x23b27a(0x290)],this['_eventId'],'A'];_0x5424ab['match'](/\b[ABCD]\b/i)?_0x278f9b[0x2]=String(_0x5424ab)['charAt'](0x0)[_0x23b27a(0x2e3)]()[_0x23b27a(0x54c)]():_0x278f9b[0x2]=_0x23b27a(0x4df)[_0x23b27a(0x30e)](_0x5424ab);switch(_0x8caa0b[_0x23b27a(0x2e3)]()[_0x23b27a(0x54c)]()){case'ON':case _0x23b27a(0x541):$gameSelfSwitches[_0x23b27a(0x186)](_0x278f9b,!![]);break;case _0x23b27a(0x2c8):case _0x23b27a(0x550):$gameSelfSwitches['setValue'](_0x278f9b,![]);break;case'Toggle':$gameSelfSwitches['setValue'](_0x278f9b,!$gameSelfSwitches['value'](_0x278f9b));break;}},Game_Character[_0x1b5cab(0x42e)]['processMoveRouteSelfVariable']=function(_0x3452b4,_0x241d3f){const _0x39b906=_0x1b5cab;if(this===$gamePlayer)return;const _0x4c1463=[this['_mapId'],this[_0x39b906(0x332)],_0x39b906(0x502)[_0x39b906(0x30e)](switchId)];$gameSelfSwitches[_0x39b906(0x186)](_0x4c1463,Number(_0x241d3f));},Game_Character['prototype'][_0x1b5cab(0x31e)]=function(_0xf819f6,_0x46df21){const _0x221cf9=_0x1b5cab;this[_0x221cf9(0x21d)](_0xf819f6,_0x46df21);},Game_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x1a5)]=function(_0x3c694e){const _0x3c4a5c=_0x1b5cab;if(_0x3c694e)this[_0x3c4a5c(0x31e)](_0x3c694e['x'],_0x3c694e['y']);},Game_Character['prototype']['turnRight90']=function(){const _0x384a6a=_0x1b5cab;switch(this['direction']()){case 0x1:this['setDirection'](0x7);break;case 0x2:this[_0x384a6a(0x3ca)](0x4);break;case 0x3:this[_0x384a6a(0x3ca)](0x1);break;case 0x4:this[_0x384a6a(0x3ca)](0x8);break;case 0x6:this[_0x384a6a(0x3ca)](0x2);break;case 0x7:this[_0x384a6a(0x3ca)](0x9);break;case 0x8:this[_0x384a6a(0x3ca)](0x6);break;case 0x9:this[_0x384a6a(0x3ca)](0x3);break;}},Game_Character[_0x1b5cab(0x42e)]['turnLeft90']=function(){const _0xda7caa=_0x1b5cab;switch(this['direction']()){case 0x1:this[_0xda7caa(0x3ca)](0x3);break;case 0x2:this[_0xda7caa(0x3ca)](0x6);break;case 0x3:this['setDirection'](0x9);break;case 0x4:this[_0xda7caa(0x3ca)](0x2);break;case 0x6:this[_0xda7caa(0x3ca)](0x8);break;case 0x7:this[_0xda7caa(0x3ca)](0x1);break;case 0x8:this[_0xda7caa(0x3ca)](0x4);break;case 0x9:this[_0xda7caa(0x3ca)](0x7);break;}},Game_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x4bd)]=function(_0x1ef773,_0x171a5c,_0x2a2da6){const _0x4b6bb9=_0x1b5cab,_0x5712b0=this[_0x4b6bb9(0x4a9)](_0x1ef773),_0x484232=this[_0x4b6bb9(0x4f0)](_0x171a5c);if($gameMap[_0x4b6bb9(0x516)]()){if(_0x4b6bb9(0x188)==='zcwwA'){if(_0x2a2da6||this['isSpriteVS8dir']()){if(_0x5712b0>0x0&&_0x484232<0x0)return 0x1;if(_0x5712b0<0x0&&_0x484232<0x0)return 0x3;if(_0x5712b0>0x0&&_0x484232>0x0)return 0x7;if(_0x5712b0<0x0&&_0x484232>0x0)return 0x9;}}else _0x41a639[_0x4b6bb9(0x45b)]['Game_CharacterBase_initMembers']['call'](this),this[_0x4b6bb9(0x2d3)]();}if(Math[_0x4b6bb9(0x466)](_0x5712b0)>Math[_0x4b6bb9(0x466)](_0x484232))return _0x5712b0>0x0?0x4:0x6;else{if(_0x484232!==0x0)return _0x484232>0x0?0x8:0x2;}return 0x0;},Game_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x60c)]=function(_0x21ad19,_0x22f814,_0x2ab709){const _0x175f8d=_0x1b5cab,_0x277a41=this[_0x175f8d(0x4a9)](_0x21ad19),_0xef291a=this[_0x175f8d(0x4f0)](_0x22f814);if($gameMap['isSupportDiagonalMovement']()){if(_0x175f8d(0x3a1)!=='IVdmS'){if(!_0xf89087[_0x175f8d(0x45b)][_0x175f8d(0x31c)][_0x175f8d(0x47a)][_0x175f8d(0x33d)])return;for(const _0x233288 of this['_characterSprites']){this['_tilemap'][_0x175f8d(0x17a)](_0x233288[_0x175f8d(0x2dd)]);}}else{if(_0x2ab709||this[_0x175f8d(0x270)]()){if(_0x277a41>0x0&&_0xef291a<0x0)return 0x9;if(_0x277a41<0x0&&_0xef291a<0x0)return 0x7;if(_0x277a41>0x0&&_0xef291a>0x0)return 0x3;if(_0x277a41<0x0&&_0xef291a>0x0)return 0x1;}}}if(Math[_0x175f8d(0x466)](_0x277a41)>Math[_0x175f8d(0x466)](_0xef291a))return _0x277a41>0x0?0x6:0x4;else{if(_0xef291a!==0x0)return _0xef291a>0x0?0x2:0x8;}return 0x0;},Game_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x24d)]=function(_0x507203,_0x1e125e){const _0x50e32d=_0x1b5cab,_0xa4ee97=this[_0x50e32d(0x4bd)](_0x507203,_0x1e125e,!![]);if(_0xa4ee97)this['executeMoveDir8'](_0xa4ee97);},Game_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x514)]=function(_0x4634ab,_0x349baa){const _0x254640=_0x1b5cab,_0x16220e=this['getDirectionFromPoint'](_0x4634ab,_0x349baa,!![]);if(_0x16220e)this[_0x254640(0x276)](_0x16220e);},Game_Character[_0x1b5cab(0x42e)]['turnTowardPoint']=function(_0x17eefd,_0x14e788){const _0x451040=_0x1b5cab,_0x1b554c=this['getDirectionToPoint'](_0x17eefd,_0x14e788,![]);if(_0x1b554c)this[_0x451040(0x3ca)](_0x1b554c);},Game_Character['prototype'][_0x1b5cab(0x53f)]=function(_0xf09982,_0x5bd8c7){const _0x50a9ba=_0x1b5cab,_0x25f6e3=this['getDirectionFromPoint'](_0xf09982,_0x5bd8c7,![]);if(_0x25f6e3)this[_0x50a9ba(0x3ca)](_0x25f6e3);},Game_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x579)]=function(_0x3129a0){const _0x464188=_0x1b5cab;if(_0x3129a0)this[_0x464188(0x24d)](_0x3129a0['x'],_0x3129a0['y']);},Game_Character['prototype'][_0x1b5cab(0x1e3)]=function(_0x4c0890){if(_0x4c0890)this['moveAwayFromPoint'](_0x4c0890['x'],_0x4c0890['y']);},Game_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x3a7)]=function(_0x2d32f5){const _0x12ed7c=_0x1b5cab;if(_0x2d32f5)this[_0x12ed7c(0x610)](_0x2d32f5['x'],_0x2d32f5['y']);},Game_Character[_0x1b5cab(0x42e)]['turnAwayFromCharacter']=function(_0x3cb5ac){const _0x4a238c=_0x1b5cab;if(_0x3cb5ac)this[_0x4a238c(0x53f)](_0x3cb5ac['x'],_0x3cb5ac['y']);},VisuMZ[_0x1b5cab(0x45b)]['Game_Player_isDashing']=Game_Player[_0x1b5cab(0x42e)][_0x1b5cab(0x5e9)],Game_Player[_0x1b5cab(0x42e)][_0x1b5cab(0x5e9)]=function(){const _0x3a8199=_0x1b5cab;if(this[_0x3a8199(0x56b)])return!![];return VisuMZ[_0x3a8199(0x45b)]['Game_Player_isDashing'][_0x3a8199(0x333)](this);},Game_Player['prototype'][_0x1b5cab(0x47f)]=function(){const _0x2b5d21=_0x1b5cab;return this[_0x2b5d21(0x5e9)]()&&(this[_0x2b5d21(0x318)]()||this[_0x2b5d21(0x36a)]()!==0x0&&this[_0x2b5d21(0x454)](this['_x'],this['_y'],this['getInputDirection']())||$gameTemp[_0x2b5d21(0x3c1)]());},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x4c1)]=Game_Player[_0x1b5cab(0x42e)][_0x1b5cab(0x36a)],Game_Player[_0x1b5cab(0x42e)]['getInputDirection']=function(){const _0xc01d56=_0x1b5cab;return $gameMap[_0xc01d56(0x516)]()?this['getInputDir8']():VisuMZ[_0xc01d56(0x45b)][_0xc01d56(0x4c1)][_0xc01d56(0x333)](this);},Game_Player[_0x1b5cab(0x42e)][_0x1b5cab(0x58f)]=function(){return Input['dir8'];},Game_Player[_0x1b5cab(0x42e)][_0x1b5cab(0x26b)]=function(){const _0x4066dd=_0x1b5cab;if($gameSystem[_0x4066dd(0x249)]())return 0x0;if(!this['isMoving']()&&this['canMove']()){let _0x2b760b=this[_0x4066dd(0x36a)]();if(_0x2b760b>0x0)$gameTemp[_0x4066dd(0x36f)]();else{if($gameTemp[_0x4066dd(0x3c1)]()){const _0x19552c=$gameTemp[_0x4066dd(0x2ff)](),_0x1a4238=$gameTemp[_0x4066dd(0x513)](),_0x3cf04b=$gameMap[_0x4066dd(0x516)](),_0x586497=$gameMap[_0x4066dd(0x5a6)](_0x19552c,_0x1a4238),_0x3113bf=$gameMap[_0x4066dd(0x4d1)](_0x19552c,_0x1a4238)['length']<=0x0;if(_0x3cf04b&&_0x586497&&_0x3113bf){if(_0x4066dd(0x224)===_0x4066dd(0x4ab))return this['getInputDir8']();else _0x2b760b=this[_0x4066dd(0x4b8)](_0x19552c,_0x1a4238);}else _0x2b760b=this['findDirectionTo'](_0x19552c,_0x1a4238);}}if(_0x2b760b>0x0){this[_0x4066dd(0x312)]=this[_0x4066dd(0x312)]||0x0;if(this[_0x4066dd(0x602)]())this[_0x4066dd(0x3ca)](_0x2b760b);else{if('jVYRG'==='jVYRG')this['executeMove'](_0x2b760b);else{const _0x39d455=_0x241be7['EventTemplates'][_0x447caf];if(!_0x39d455)return;_0x217a6c=_0x39d455[_0x4066dd(0x282)],_0xe64771=_0x39d455[_0x4066dd(0x2ee)];}}this['_inputTime']++;}else _0x4066dd(0x216)==='WOKcD'?(this[_0x4066dd(0x597)]='',this['_poseDuration']=0x0):this['_inputTime']=0x0;}},Game_Player[_0x1b5cab(0x42e)]['isTurnInPlace']=function(){const _0x3cad38=_0x1b5cab,_0x5f1621=VisuMZ[_0x3cad38(0x45b)][_0x3cad38(0x31c)][_0x3cad38(0x47a)];if(!_0x5f1621[_0x3cad38(0x2b3)])return![];if($gameTemp[_0x3cad38(0x3c1)]())return![];if(this[_0x3cad38(0x5e9)]()||this['isMoving']()||this[_0x3cad38(0x3b3)]())return![];return this[_0x3cad38(0x312)]<_0x5f1621['TurnInPlaceDelay'];},VisuMZ[_0x1b5cab(0x45b)]['Game_Player_executeMove']=Game_Player[_0x1b5cab(0x42e)][_0x1b5cab(0x5f9)],Game_Player['prototype'][_0x1b5cab(0x5f9)]=function(_0x364843){const _0x1a728f=_0x1b5cab;$gameMap['isSupportDiagonalMovement']()?this[_0x1a728f(0x276)](_0x364843):VisuMZ[_0x1a728f(0x45b)][_0x1a728f(0x46d)]['call'](this,_0x364843);},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x359)]=Game_Player[_0x1b5cab(0x42e)][_0x1b5cab(0x41a)],Game_Player[_0x1b5cab(0x42e)]['isMapPassable']=function(_0x15ef39,_0x84d589,_0x2c0621){const _0x4f9683=_0x1b5cab;if($gameMap[_0x4f9683(0x26f)](_0x15ef39,_0x84d589,_0x2c0621,_0x4f9683(0x38c)))return this[_0x4f9683(0x3e1)]()&&this[_0x4f9683(0x601)]()?this['vehicle']()[_0x4f9683(0x41a)](_0x15ef39,_0x84d589,_0x2c0621):!![];if($gameMap['isRegionForbidPass'](_0x15ef39,_0x84d589,_0x2c0621,_0x4f9683(0x38c)))return![];return VisuMZ[_0x4f9683(0x45b)]['Game_Player_isMapPassable']['call'](this,_0x15ef39,_0x84d589,_0x2c0621);},VisuMZ['EventsMoveCore'][_0x1b5cab(0x233)]=Game_Player[_0x1b5cab(0x42e)]['checkEventTriggerHere'],Game_Player['prototype'][_0x1b5cab(0x1f8)]=function(_0x218e45){const _0x5074f5=_0x1b5cab;VisuMZ['EventsMoveCore'][_0x5074f5(0x233)][_0x5074f5(0x333)](this,_0x218e45);if(this[_0x5074f5(0x2cd)]()){if(_0x5074f5(0x385)==='xqVQF'){this[_0x5074f5(0x345)](_0x218e45);if(_0x218e45['includes'](0x0)&&this['startMapCommonEventOnOKTarget']()===_0x5074f5(0x25c)){if('QmOIU'!==_0x5074f5(0x2e2))this[_0x5074f5(0x36e)](this['x'],this['y']);else{const _0x4c38b8=this[_0x5074f5(0x3ae)]();return this['isActive']()&&_0x4c38b8['trigger']>=0x1&&_0x46b81d['isAdvancedSwitch'](_0x4c38b8[_0x5074f5(0x299)]);}}else(_0x218e45['includes'](0x1)||_0x218e45['includes'](0x2))&&this[_0x5074f5(0x491)]();}else _0x31c880[_0x5074f5(0x45b)][_0x5074f5(0x340)][_0x5074f5(0x333)](this,_0x53d6d3),this[_0x5074f5(0x334)]=_0x41e76d[_0x5074f5(0x2bf)]();}},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x2ed)]=Game_Player['prototype'][_0x1b5cab(0x213)],Game_Player[_0x1b5cab(0x42e)]['checkEventTriggerThere']=function(_0x3ac8d7){const _0x550d2e=_0x1b5cab;VisuMZ[_0x550d2e(0x45b)][_0x550d2e(0x2ed)]['call'](this,_0x3ac8d7);if(this[_0x550d2e(0x2cd)]()&&_0x3ac8d7[_0x550d2e(0x42c)](0x0)&&this[_0x550d2e(0x33a)]()==='front'){if('XfUaN'==='XfUaN'){const _0xe0f41b=this[_0x550d2e(0x246)](),_0x36d7e7=$gameMap[_0x550d2e(0x56c)](this['x'],_0xe0f41b),_0xf5ef0f=$gameMap[_0x550d2e(0x452)](this['y'],_0xe0f41b);this[_0x550d2e(0x36e)](_0x36d7e7,_0xf5ef0f);}else{_0x2f5bf1[_0x550d2e(0x2fb)](_0x1ca02b,_0x37a6e5);const _0x598152=_0x2e8421[_0x550d2e(0x291)](),_0x36ba01={'template':_0x5ef8ba[_0x550d2e(0x3a0)],'mapId':_0x18ea19[_0x550d2e(0x446)]||_0x5c34d6[_0x550d2e(0x56f)](),'eventId':_0x36db80[_0x550d2e(0x4d5)]||_0x598152[_0x550d2e(0x53b)](),'x':_0x470d4f[_0x550d2e(0x41f)],'y':_0x4ffb3c[_0x550d2e(0x5fa)],'spawnPreserved':_0x1e48de[_0x550d2e(0x559)],'spawnEventId':_0x12a80e[_0x550d2e(0x44f)][_0x550d2e(0x55b)]+0x3e8},_0x46df31=_0xec960f[_0x550d2e(0x3c6)]||0x0,_0x35f853=_0x1a4a4c['prepareSpawnedEventAtXY'](_0x36ba01,_0x1d5395[_0x550d2e(0x177)],_0x3a2d80[_0x550d2e(0x3b7)]);_0x46df31&&_0xb0be92['setValue'](_0x46df31,!!_0x35f853);}}},Game_Player[_0x1b5cab(0x42e)][_0x1b5cab(0x345)]=function(_0x32162d){const _0x22f5e4=_0x1b5cab;if($gameMap[_0x22f5e4(0x23f)]())return;if($gameMap[_0x22f5e4(0x21c)]())return;const _0x4a79f8=$gameMap[_0x22f5e4(0x552)]();for(const _0x380662 of _0x4a79f8){if(!_0x380662)continue;if(!_0x380662['isTriggerIn'](_0x32162d))continue;if(this[_0x22f5e4(0x38e)](_0x380662))return _0x380662[_0x22f5e4(0x297)]();if(this[_0x22f5e4(0x341)](_0x380662))return _0x380662[_0x22f5e4(0x297)]();}},Game_Player['prototype'][_0x1b5cab(0x38e)]=function(_0x5ac6a6){const _0x325cbf=_0x1b5cab;if($gameMap[_0x325cbf(0x23f)]())return![];if($gameMap[_0x325cbf(0x21c)]())return![];return _0x5ac6a6[_0x325cbf(0x4ee)]()['includes'](this[_0x325cbf(0x2e7)]());},Game_Player['prototype'][_0x1b5cab(0x341)]=function(_0x12bd29){const _0x25e9fa=_0x1b5cab;if($gameMap['isEventRunning']())return![];if($gameMap[_0x25e9fa(0x21c)]())return![];if(['none','region'][_0x25e9fa(0x42c)](_0x12bd29[_0x25e9fa(0x4c2)]()))return![];const _0x21e31b=_0x12bd29['activationProximityType'](),_0x574caf=_0x12bd29[_0x25e9fa(0x3c0)]();switch(_0x21e31b){case'radius':const _0x107dba=$gameMap[_0x25e9fa(0x55e)](this['x'],this['y'],_0x12bd29['x'],_0x12bd29['y']);return _0x12bd29[_0x25e9fa(0x3c0)]()>=_0x107dba;break;case _0x25e9fa(0x2d4):return _0x574caf>=Math['abs'](_0x12bd29['deltaXFrom'](this['x']))&&_0x574caf>=Math['abs'](_0x12bd29[_0x25e9fa(0x4f0)](this['y']));break;case _0x25e9fa(0x37d):return _0x574caf>=Math[_0x25e9fa(0x466)](_0x12bd29['deltaYFrom'](this['y']));break;case _0x25e9fa(0x51d):return _0x574caf>=Math[_0x25e9fa(0x466)](_0x12bd29[_0x25e9fa(0x4a9)](this['x']));break;case'default':return![];break;}},Game_Player['prototype'][_0x1b5cab(0x36e)]=function(_0x954a1e,_0x29386d){const _0x44f358=_0x1b5cab;if($gameMap[_0x44f358(0x23f)]())return;if($gameMap['isAnyEventStarting']())return;let _0x2425d9=VisuMZ[_0x44f358(0x45b)][_0x44f358(0x31c)][_0x44f358(0x322)],_0x3f8e6e=$gameMap[_0x44f358(0x2e7)](_0x954a1e,_0x29386d);const _0x3e3652='Region%1'['format'](_0x3f8e6e);if(_0x2425d9[_0x3e3652]){if('RKLTQ'!==_0x44f358(0x2dc))$gameTemp[_0x44f358(0x2a6)](_0x2425d9[_0x3e3652]);else{_0x3ab612[_0x44f358(0x2fb)](_0x526acc,_0x1dbc9b);const _0x4777d=_0x5841f5[_0x44f358(0x2f1)];_0x59a7b1['setControlledFollowerID'](_0x4777d);}}},Game_Player[_0x1b5cab(0x42e)][_0x1b5cab(0x33a)]=function(){const _0x2c6194=_0x1b5cab;return VisuMZ['EventsMoveCore'][_0x2c6194(0x31c)][_0x2c6194(0x4fe)];},Game_Player[_0x1b5cab(0x42e)][_0x1b5cab(0x491)]=function(){const _0x192709=_0x1b5cab;if($gameMap[_0x192709(0x23f)]())return;if($gameMap[_0x192709(0x21c)]())return;let _0x376796=VisuMZ[_0x192709(0x45b)][_0x192709(0x31c)][_0x192709(0x392)];const _0x4414b8='Region%1'[_0x192709(0x30e)](this[_0x192709(0x2e7)]());if(_0x376796[_0x4414b8]){if(_0x192709(0x278)!==_0x192709(0x278)){if(_0x32f786[_0x192709(0x433)][_0x3f3611][_0x192709(0x3e6)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))_0x422c65[_0x192709(0x236)][_0x192709(0x378)](_0x50f4dc);if(_0x51b975[_0x192709(0x433)][_0x4df6fd]['match'](/<SELF>/i))_0xfbca41['SelfSwitches']['push'](_0x469a59);}else $gameTemp['reserveCommonEvent'](_0x376796[_0x4414b8]);}},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x5f3)]=Game_Player[_0x1b5cab(0x42e)][_0x1b5cab(0x336)],Game_Player[_0x1b5cab(0x42e)][_0x1b5cab(0x336)]=function(){const _0x1faf91=_0x1b5cab;VisuMZ['EventsMoveCore'][_0x1faf91(0x5f3)][_0x1faf91(0x333)](this),VisuMZ[_0x1faf91(0x44c)](0x0);},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x5df)]=Game_Follower['prototype']['initialize'],Game_Follower[_0x1b5cab(0x42e)][_0x1b5cab(0x535)]=function(_0x3fd2aa){const _0x428176=_0x1b5cab;VisuMZ[_0x428176(0x45b)][_0x428176(0x5df)][_0x428176(0x333)](this,_0x3fd2aa),this['_chaseOff']=![];},Game_Follower[_0x1b5cab(0x42e)][_0x1b5cab(0x5e9)]=function(){const _0x1e4f47=_0x1b5cab;return $gamePlayer[_0x1e4f47(0x5e9)]();},Game_Follower['prototype'][_0x1b5cab(0x47f)]=function(){const _0x335a07=_0x1b5cab;return $gamePlayer[_0x335a07(0x47f)]();},Game_Follower[_0x1b5cab(0x42e)][_0x1b5cab(0x175)]=function(){const _0x59b4f8=_0x1b5cab;return $gamePlayer[_0x59b4f8(0x175)]();},Game_Follower[_0x1b5cab(0x42e)]['setChaseOff']=function(_0x45e870){this['_chaseOff']=_0x45e870;},VisuMZ[_0x1b5cab(0x45b)]['Game_Follower_chaseCharacter']=Game_Follower[_0x1b5cab(0x42e)][_0x1b5cab(0x2a5)],Game_Follower[_0x1b5cab(0x42e)][_0x1b5cab(0x2a5)]=function(_0x12d3bf){const _0x282845=_0x1b5cab;if(this[_0x282845(0x25e)])return;if($gameSystem['isStopFollowerChasing']())return;VisuMZ['EventsMoveCore'][_0x282845(0x35a)][_0x282845(0x333)](this,_0x12d3bf);},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x1e0)]=Game_Vehicle[_0x1b5cab(0x42e)][_0x1b5cab(0x41a)],Game_Vehicle['prototype'][_0x1b5cab(0x41a)]=function(_0x3b9531,_0x801d47,_0x1bcb8c){const _0xa8ce3a=_0x1b5cab;if($gameMap[_0xa8ce3a(0x26f)](_0x3b9531,_0x801d47,_0x1bcb8c,this['_type']))return!![];if($gameMap[_0xa8ce3a(0x503)](_0x3b9531,_0x801d47,_0x1bcb8c,this[_0xa8ce3a(0x1a6)]))return![];return VisuMZ[_0xa8ce3a(0x45b)]['Game_Vehicle_isMapPassable'][_0xa8ce3a(0x333)](this,_0x3b9531,_0x801d47,_0x1bcb8c);},Game_Vehicle[_0x1b5cab(0x42e)][_0x1b5cab(0x507)]=function(_0x423a9c,_0x173315,_0x39d05d){const _0x34b094=_0x1b5cab;if($gameMap[_0x34b094(0x26f)](_0x423a9c,_0x173315,_0x39d05d,this['_type']))return!![];if($gameMap['isRegionForbidPass'](_0x423a9c,_0x173315,_0x39d05d,this[_0x34b094(0x1a6)]))return![];return VisuMZ[_0x34b094(0x45b)][_0x34b094(0x382)][_0x34b094(0x333)]($gamePlayer,_0x423a9c,_0x173315,_0x39d05d);},VisuMZ['EventsMoveCore']['Game_Vehicle_isLandOk']=Game_Vehicle[_0x1b5cab(0x42e)][_0x1b5cab(0x457)],Game_Vehicle[_0x1b5cab(0x42e)][_0x1b5cab(0x457)]=function(_0xb4bbf9,_0x2b8727,_0x19e7c3){const _0x5c90ac=_0x1b5cab;if($gameMap[_0x5c90ac(0x5a1)](_0xb4bbf9,_0x2b8727,_0x19e7c3,this[_0x5c90ac(0x1a6)]))return!![];const _0x3a2e95=this[_0x5c90ac(0x1a6)][_0x5c90ac(0x5dd)](0x0)[_0x5c90ac(0x2e3)]()+this['_type'][_0x5c90ac(0x174)](0x1),_0x316209=_0x5c90ac(0x230)['format'](_0x3a2e95);if(VisuMZ[_0x5c90ac(0x45b)][_0x5c90ac(0x31c)][_0x5c90ac(0x227)][_0x316209])return![];else{if(_0x5c90ac(0x554)!==_0x5c90ac(0x554))this[_0x5c90ac(0x346)]=!![];else return VisuMZ[_0x5c90ac(0x45b)][_0x5c90ac(0x3d7)]['call'](this,_0xb4bbf9,_0x2b8727,_0x19e7c3);}},VisuMZ['EventsMoveCore'][_0x1b5cab(0x2f2)]=Game_Vehicle[_0x1b5cab(0x42e)]['initMoveSpeed'],Game_Vehicle[_0x1b5cab(0x42e)][_0x1b5cab(0x1ca)]=function(){const _0x5d1549=_0x1b5cab;VisuMZ[_0x5d1549(0x45b)][_0x5d1549(0x2f2)][_0x5d1549(0x333)](this);const _0x4ecc4b=VisuMZ[_0x5d1549(0x45b)][_0x5d1549(0x31c)]['Movement'];if(this[_0x5d1549(0x1b4)]()){if(_0x5d1549(0x4f9)===_0x5d1549(0x4f9)){if(_0x4ecc4b[_0x5d1549(0x581)])this[_0x5d1549(0x536)](_0x4ecc4b[_0x5d1549(0x581)]);}else{if(_0x45e795[_0x5d1549(0x1c8)]())return!![];return this['_saveEventLocation'];}}else{if(this[_0x5d1549(0x4f2)]()){if(_0x4ecc4b['ShipSpeed'])this[_0x5d1549(0x536)](_0x4ecc4b['ShipSpeed']);}else{if(this['isAirship']()){if(_0x4ecc4b[_0x5d1549(0x4d6)])this[_0x5d1549(0x536)](_0x4ecc4b[_0x5d1549(0x4d6)]);}}}},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x608)]=Game_Event['prototype'][_0x1b5cab(0x535)],Game_Event['prototype'][_0x1b5cab(0x535)]=function(_0x4f6bf2,_0x1e5799){const _0x571b9b=_0x1b5cab;VisuMZ['EventsMoveCore'][_0x571b9b(0x608)]['call'](this,_0x4f6bf2,_0x1e5799),this['setupCopyEvent'](),this[_0x571b9b(0x302)](),this[_0x571b9b(0x3a5)]();},VisuMZ[_0x1b5cab(0x45b)]['Game_Event_event']=Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x3ae)],Game_Event['prototype'][_0x1b5cab(0x3ae)]=function(){const _0x47a859=_0x1b5cab;if(this['_eventMorphData']!==undefined){const _0x1fc90b=this['_eventMorphData'][_0x47a859(0x56f)],_0x20085d=this['_eventMorphData'][_0x47a859(0x53b)];return VisuMZ['PreloadedMaps'][_0x1fc90b][_0x47a859(0x552)][_0x20085d];}if(this[_0x47a859(0x1e6)]!==undefined){const _0x443420=this[_0x47a859(0x1e6)][_0x47a859(0x56f)],_0x3a2ec7=this['_eventCopyData'][_0x47a859(0x53b)];return VisuMZ[_0x47a859(0x4ed)][_0x443420][_0x47a859(0x552)][_0x3a2ec7];}if(this[_0x47a859(0x435)]!==undefined){const _0xb398a4=this[_0x47a859(0x435)][_0x47a859(0x56f)],_0x3096fa=this[_0x47a859(0x435)][_0x47a859(0x53b)];return VisuMZ[_0x47a859(0x4ed)][_0xb398a4][_0x47a859(0x552)][_0x3096fa];}if($gameTemp[_0x47a859(0x38f)]!==undefined){const _0x84cbf2=$gameTemp[_0x47a859(0x38f)][_0x47a859(0x56f)],_0x394104=$gameTemp[_0x47a859(0x38f)]['eventId'];return VisuMZ[_0x47a859(0x4ed)][_0x84cbf2]['events'][_0x394104];}return VisuMZ[_0x47a859(0x45b)][_0x47a859(0x421)][_0x47a859(0x333)](this);},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x501)]=function(_0x6244dd,_0xb6867){const _0x399b83=_0x1b5cab;if(_0x6244dd===0x0||_0xb6867===0x0)return![];if(!VisuMZ[_0x399b83(0x4ed)][_0x6244dd])return $gameTemp[_0x399b83(0x50f)]()&&console[_0x399b83(0x4d9)](_0x399b83(0x2c9)[_0x399b83(0x30e)](_0x6244dd)),![];return!![];},VisuMZ['EventsMoveCore']['Game_Event_start']=Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x297)],Game_Event[_0x1b5cab(0x42e)]['start']=function(){const _0x532dca=_0x1b5cab;VisuMZ[_0x532dca(0x45b)][_0x532dca(0x1e4)][_0x532dca(0x333)](this);if(Imported[_0x532dca(0x519)]&&Input[_0x532dca(0x4da)](VisuMZ['MessageCore'][_0x532dca(0x31c)][_0x532dca(0x298)][_0x532dca(0x488)])){if(_0x532dca(0x194)!==_0x532dca(0x194))return _0x472729>0x0?0x8:0x2;else Input[_0x532dca(0x26c)]();}},Game_Event['prototype'][_0x1b5cab(0x438)]=function(){const _0x5838ca=_0x1b5cab,_0x17de54=this[_0x5838ca(0x3ae)]()[_0x5838ca(0x3c2)];if(_0x17de54==='')return;if(DataManager[_0x5838ca(0x24f)]()||DataManager[_0x5838ca(0x2ce)]())return;const _0x46c7f9=VisuMZ[_0x5838ca(0x45b)][_0x5838ca(0x31c)][_0x5838ca(0x5a2)];let _0x442c6e=null,_0x5a9606=0x0,_0xdb7b5e=0x0;if(_0x17de54['match'](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i))'CsOMF'===_0x5838ca(0x605)?(_0x5a9606=Number(RegExp['$1']),_0xdb7b5e=Number(RegExp['$2'])):this['turnRight90']();else{if(_0x17de54[_0x5838ca(0x3e6)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i))_0x5a9606=Number(RegExp['$1']),_0xdb7b5e=Number(RegExp['$2']);else{if(_0x17de54[_0x5838ca(0x3e6)](/<COPY EVENT:[ ](.*?)>/i)){const _0x322006=String(RegExp['$1'])['toUpperCase']()[_0x5838ca(0x54c)]();_0x442c6e=VisuMZ['EventTemplates'][_0x322006];if(!_0x442c6e)return;_0x5a9606=_0x442c6e[_0x5838ca(0x282)],_0xdb7b5e=_0x442c6e[_0x5838ca(0x2ee)];}}}if(!this[_0x5838ca(0x501)](_0x5a9606,_0xdb7b5e))return;_0x46c7f9[_0x5838ca(0x2d7)][_0x5838ca(0x333)](this,_0x5a9606,_0xdb7b5e,this);if(_0x442c6e)_0x442c6e[_0x5838ca(0x2d7)][_0x5838ca(0x333)](this,_0x5a9606,_0xdb7b5e,this);this[_0x5838ca(0x1e6)]={'mapId':_0x5a9606,'eventId':_0xdb7b5e},this[_0x5838ca(0x3d8)]=-0x2,this[_0x5838ca(0x5eb)](),_0x46c7f9['PostCopyJS']['call'](this,_0x5a9606,_0xdb7b5e,this);if(_0x442c6e)_0x442c6e[_0x5838ca(0x4c8)][_0x5838ca(0x333)](this,_0x5a9606,_0xdb7b5e,this);$gameMap['clearEventCache']();},Game_Event['prototype'][_0x1b5cab(0x302)]=function(){const _0x977466=_0x1b5cab,_0x30bdc2=$gameSystem[_0x977466(0x310)](this);if(!_0x30bdc2)return;const _0x66f9a4=_0x30bdc2[_0x977466(0x202)][_0x977466(0x2e3)]()['trim']();if(_0x66f9a4!==_0x977466(0x29a)){if(_0x977466(0x325)!==_0x977466(0x325)){if(_0x349d8f[_0x977466(0x3e6)](/Z/i))_0x241c84='ZZZ';if(_0x4ef4b9['match'](/SLEEP/i))_0x17c818=_0x977466(0x2fa);this[_0x977466(0x270)]()&&(this[_0x977466(0x597)]=_0x2eab21[_0x977466(0x2e3)]()[_0x977466(0x54c)](),this[_0x977466(0x185)]=_0x335d48||_0x42af46);}else this[_0x977466(0x339)](_0x66f9a4,!![]);}else this[_0x977466(0x40d)](_0x30bdc2[_0x977466(0x56f)],_0x30bdc2['eventId'],!![]);},Game_Event[_0x1b5cab(0x42e)]['morphInto']=function(_0x2ab0dd,_0x3b3434,_0x10b096){const _0x1853f7=_0x1b5cab;if(!this[_0x1853f7(0x501)](_0x2ab0dd,_0x3b3434))return;const _0x256266=VisuMZ['EventsMoveCore']['Settings']['Template'];if(!_0x10b096)_0x256266[_0x1853f7(0x1bb)][_0x1853f7(0x333)](this,_0x2ab0dd,_0x3b3434,this);this[_0x1853f7(0x1be)]={'mapId':_0x2ab0dd,'eventId':_0x3b3434},this['_pageIndex']=-0x2,this[_0x1853f7(0x5eb)]();if(!_0x10b096)_0x256266['PostMorphJS'][_0x1853f7(0x333)](this,_0x2ab0dd,_0x3b3434,this);$gameMap['clearEventCache']();},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x339)]=function(_0x2ca37e,_0x6cc273){const _0x5e17fd=_0x1b5cab;_0x2ca37e=_0x2ca37e['toUpperCase']()[_0x5e17fd(0x54c)]();const _0x539ba4=VisuMZ['EventTemplates'][_0x2ca37e];if(!_0x539ba4)return;const _0x2e1e59=_0x539ba4[_0x5e17fd(0x282)],_0x4b381d=_0x539ba4['EventID'];if(!this[_0x5e17fd(0x501)](_0x2e1e59,_0x4b381d))return;if(!_0x6cc273)_0x539ba4[_0x5e17fd(0x1bb)]['call'](this,_0x2e1e59,_0x4b381d,this);this[_0x5e17fd(0x40d)](_0x2e1e59,_0x4b381d,_0x6cc273);if(!_0x6cc273)_0x539ba4['PostMorphJS'][_0x5e17fd(0x333)](this,_0x2e1e59,_0x4b381d,this);if($gameMap)$gameMap['clearEventCache']();},Game_Event[_0x1b5cab(0x42e)]['removeMorph']=function(){const _0x57a2c0=_0x1b5cab;this[_0x57a2c0(0x1be)]=undefined,this[_0x57a2c0(0x3d8)]=-0x2,this[_0x57a2c0(0x5eb)]();},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x5c1)]=function(_0x5bb811){const _0x521e0=_0x1b5cab,_0x369ed7=VisuMZ[_0x521e0(0x45b)][_0x521e0(0x31c)]['Template'],_0x151e56=_0x5bb811[_0x521e0(0x202)]['toUpperCase']()[_0x521e0(0x54c)](),_0x24cc82=!['',_0x521e0(0x29a)][_0x521e0(0x42c)](_0x151e56);let _0x1afd39=0x0,_0x11c48a=0x0;if(_0x24cc82){const _0x4dd527=VisuMZ['EventTemplates'][_0x151e56];if(!_0x4dd527)return;_0x1afd39=_0x4dd527['MapID'],_0x11c48a=_0x4dd527[_0x521e0(0x2ee)];}else{if(_0x521e0(0x18d)===_0x521e0(0x546)){const _0x45785c=this[_0x521e0(0x3ae)]()[_0x521e0(0x3c2)];if(_0x45785c==='')return;if(_0x157023[_0x521e0(0x24f)]()||_0x3b2750[_0x521e0(0x2ce)]())return;const _0x57ec6c=_0x5d60d2[_0x521e0(0x45b)][_0x521e0(0x31c)][_0x521e0(0x5a2)];let _0x5941ae=null,_0x1fb5da=0x0,_0x297ebf=0x0;if(_0x45785c[_0x521e0(0x3e6)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i))_0x1fb5da=_0x165ce3(_0x286b73['$1']),_0x297ebf=_0x5b8129(_0x414c3d['$2']);else{if(_0x45785c[_0x521e0(0x3e6)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i))_0x1fb5da=_0x71dbe7(_0x8386b2['$1']),_0x297ebf=_0x161b84(_0x7d5a1b['$2']);else{if(_0x45785c[_0x521e0(0x3e6)](/<COPY EVENT:[ ](.*?)>/i)){const _0x2bbf36=_0xd00c3c(_0x3712b5['$1'])[_0x521e0(0x2e3)]()[_0x521e0(0x54c)]();_0x5941ae=_0x48196d['EventTemplates'][_0x2bbf36];if(!_0x5941ae)return;_0x1fb5da=_0x5941ae['MapID'],_0x297ebf=_0x5941ae[_0x521e0(0x2ee)];}}}if(!this[_0x521e0(0x501)](_0x1fb5da,_0x297ebf))return;_0x57ec6c['PreCopyJS'][_0x521e0(0x333)](this,_0x1fb5da,_0x297ebf,this);if(_0x5941ae)_0x5941ae[_0x521e0(0x2d7)][_0x521e0(0x333)](this,_0x1fb5da,_0x297ebf,this);this[_0x521e0(0x1e6)]={'mapId':_0x1fb5da,'eventId':_0x297ebf},this[_0x521e0(0x3d8)]=-0x2,this[_0x521e0(0x5eb)](),_0x57ec6c[_0x521e0(0x4c8)][_0x521e0(0x333)](this,_0x1fb5da,_0x297ebf,this);if(_0x5941ae)_0x5941ae[_0x521e0(0x4c8)][_0x521e0(0x333)](this,_0x1fb5da,_0x297ebf,this);_0x165871[_0x521e0(0x3b1)]();}else _0x1afd39=_0x5bb811[_0x521e0(0x56f)],_0x11c48a=_0x5bb811[_0x521e0(0x53b)];}if(!this[_0x521e0(0x501)](_0x1afd39,_0x11c48a))return;if(_0x24cc82){if('LzPUT'!==_0x521e0(0x36c)){const _0xbf6677=VisuMZ[_0x521e0(0x381)][_0x151e56];_0xbf6677[_0x521e0(0x225)][_0x521e0(0x333)](this,_0x1afd39,_0x11c48a,this);}else return _0x3e5879[_0x521e0(0x45b)]['Game_Switches_value'][_0x521e0(0x333)](this,_0x336935);}_0x369ed7['PreSpawnJS']['call'](this,_0x1afd39,_0x11c48a,this),this[_0x521e0(0x435)]=_0x5bb811,this['_pageIndex']=-0x2,this[_0x521e0(0x290)]=$gameMap['mapId'](),this[_0x521e0(0x332)]=_0x5bb811[_0x521e0(0x274)],this[_0x521e0(0x375)]=_0x5bb811[_0x521e0(0x27b)],this[_0x521e0(0x21d)](_0x5bb811['x'],_0x5bb811['y']),this['setDirection'](_0x5bb811[_0x521e0(0x246)]),this[_0x521e0(0x5eb)]();if(_0x24cc82){if('kfTrb'!==_0x521e0(0x1ae))_0x334094[_0x521e0(0x186)](_0x5d9907,!!_0x4de93f);else{const _0x59ecc4=VisuMZ[_0x521e0(0x381)][_0x151e56];if(!_0x59ecc4)return;_0x59ecc4[_0x521e0(0x411)][_0x521e0(0x333)](this,_0x1afd39,_0x11c48a,this);}}_0x369ed7[_0x521e0(0x411)][_0x521e0(0x333)](this,_0x1afd39,_0x11c48a,this);const _0x16a411=SceneManager[_0x521e0(0x4ec)];if(_0x16a411&&_0x16a411[_0x521e0(0x355)])_0x16a411[_0x521e0(0x355)][_0x521e0(0x5db)](this);},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x5bb)]=function(){const _0x29f3e2=_0x1b5cab;return!!this[_0x29f3e2(0x435)];},VisuMZ['EventsMoveCore']['Game_Event_refresh']=Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x5eb)],Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x5eb)]=function(){const _0x5399b0=_0x1b5cab,_0x72d2b5=this['_pageIndex'];VisuMZ[_0x5399b0(0x45b)][_0x5399b0(0x52b)][_0x5399b0(0x333)](this);if(_0x72d2b5!==this[_0x5399b0(0x3d8)]){if('AdNDi'!=='AdNDi'){const _0x2a730=this[_0x5399b0(0x3ae)](_0x5f1db3);if(_0x2a730)_0x2a730['unlock']();}else this[_0x5399b0(0x5cf)]();}},VisuMZ['EventsMoveCore'][_0x1b5cab(0x46a)]=Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x441)],Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x441)]=function(){const _0x1b9c65=_0x1b5cab;VisuMZ['EventsMoveCore'][_0x1b9c65(0x46a)][_0x1b9c65(0x333)](this),this[_0x1b9c65(0x469)]();},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x257)]=Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x5d5)],Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x5d5)]=function(){const _0xa842f9=_0x1b5cab;this['_activationProximityAutoTriggerBypass']=!![],VisuMZ[_0xa842f9(0x45b)][_0xa842f9(0x257)][_0xa842f9(0x333)](this),this['setupEventsMoveCoreEffects'](),this['_activationProximityAutoTriggerBypass']=![];},Game_Event[_0x1b5cab(0x42e)]['setupEventsMoveCoreEffects']=function(){const _0x5b220d=_0x1b5cab;if(!this['event']())return;this[_0x5b220d(0x469)](),this[_0x5b220d(0x205)](),this[_0x5b220d(0x350)](),this['updateEventsMoveCoreTagChanges']();},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x205)]=function(){const _0x1328e1=_0x1b5cab,_0x4f32f7=this[_0x1328e1(0x3ae)]()['note'];if(_0x4f32f7==='')return;this[_0x1328e1(0x44d)](_0x4f32f7);},Game_Event['prototype'][_0x1b5cab(0x350)]=function(){const _0x17bee4=_0x1b5cab;if(!this['page']())return;const _0x163a7b=this['list']();let _0x402a0d='';for(const _0x2f993c of _0x163a7b){if(_0x17bee4(0x393)!==_0x17bee4(0x393))this[_0x17bee4(0x3f0)]=_0x80bbd7,_0x2619ed['EventsMoveCore'][_0x17bee4(0x497)][_0x17bee4(0x333)](this,_0x7bdee1);else{if([0x6c,0x198][_0x17bee4(0x42c)](_0x2f993c[_0x17bee4(0x265)])){if(_0x402a0d!=='')_0x402a0d+='\x0a';_0x402a0d+=_0x2f993c[_0x17bee4(0x5b9)][0x0];}}}this['checkEventsMoveCoreStringTags'](_0x402a0d);},Game_Event['prototype'][_0x1b5cab(0x469)]=function(){const _0x57fd2b=_0x1b5cab,_0x2f1220=VisuMZ['EventsMoveCore'][_0x57fd2b(0x31c)];this[_0x57fd2b(0x4e4)]={'type':'none','distance':0x0,'regionList':[]},this[_0x57fd2b(0x475)]=![],this[_0x57fd2b(0x2eb)]=![],this['_addedHitbox']={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x57fd2b(0x573)]=$gameSystem[_0x57fd2b(0x442)](this),this[_0x57fd2b(0x170)]={'text':'','visibleRange':_0x2f1220[_0x57fd2b(0x5d4)][_0x57fd2b(0x5bd)],'offsetX':_0x2f1220[_0x57fd2b(0x5d4)][_0x57fd2b(0x5ea)],'offsetY':_0x2f1220[_0x57fd2b(0x5d4)][_0x57fd2b(0x46c)]},this[_0x57fd2b(0x3f9)]=[],this[_0x57fd2b(0x588)]={'target':-0x1,'type':_0x57fd2b(0x37a),'delay':0x1},this[_0x57fd2b(0x468)]=_0x2f1220[_0x57fd2b(0x47a)][_0x57fd2b(0x2da)]??0x0,this[_0x57fd2b(0x34d)]=![],this[_0x57fd2b(0x313)]={'visible':!![],'filename':_0x2f1220[_0x57fd2b(0x47a)]['DefaultShadow']},this[_0x57fd2b(0x31a)](),this[_0x57fd2b(0x196)]();},Game_Event[_0x1b5cab(0x42e)]['checkEventsMoveCoreStringTags']=function(_0x434cf4){const _0x41240e=_0x1b5cab;if(_0x434cf4['match'](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))this[_0x41240e(0x4e4)][_0x41240e(0x32f)]=JSON[_0x41240e(0x38a)]('['+RegExp['$1'][_0x41240e(0x3e6)](/\d+/g)+']'),this['_activationProximity'][_0x41240e(0x486)]=_0x41240e(0x279);else{if(_0x434cf4[_0x41240e(0x3e6)](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)){if(_0x41240e(0x60a)===_0x41240e(0x3ba)){const _0xa20e66=this[_0x41240e(0x47e)](_0x2472ed);return this[_0x41240e(0x27e)](_0x3fd648,_0xa20e66);}else type=String(RegExp['$1'])[_0x41240e(0x53c)]()[_0x41240e(0x54c)](),this['_activationProximity'][_0x41240e(0x486)]=type,this[_0x41240e(0x4e4)][_0x41240e(0x55e)]=Number(RegExp['$2']);}}_0x434cf4[_0x41240e(0x3e6)](/<ALWAYS UPDATE MOVEMENT>/i)&&(this['_alwaysUpdateMove']=!![]);if(_0x434cf4[_0x41240e(0x3e6)](/<CLICK TRIGGER>/i)){if(_0x41240e(0x4dc)!=='jbHvm')this['_clickTrigger']=!![];else return _0x58b767[_0x41240e(0x45b)][_0x41240e(0x3a8)]['call'](this);}const _0x531c33=_0x434cf4[_0x41240e(0x3e6)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x531c33){if(_0x41240e(0x5d6)!==_0x41240e(0x2c1))for(const _0x3f1a4e of _0x531c33){if(_0x3f1a4e['match'](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x21f4e5=String(RegExp['$1'])[_0x41240e(0x53c)]()[_0x41240e(0x54c)](),_0xea3017=Number(RegExp['$2']);this[_0x41240e(0x33c)][_0x21f4e5]=_0xea3017;}}else return this['processMoveRouteSelfVariable'](_0x56b813['$1'],_0x944f3b['$2']);}_0x434cf4[_0x41240e(0x3e6)](/<ICON:[ ](\d+)>/i)&&(this[_0x41240e(0x573)][_0x41240e(0x28f)]=Number(RegExp['$1']));if(_0x434cf4[_0x41240e(0x3e6)](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)){if(_0x41240e(0x596)!==_0x41240e(0x1f7))this[_0x41240e(0x573)]['bufferX']=Number(RegExp['$1']);else{const _0x51e16e=this[_0x41240e(0x3d8)];_0x33d606[_0x41240e(0x45b)]['Game_Event_refresh'][_0x41240e(0x333)](this),_0x51e16e!==this[_0x41240e(0x3d8)]&&this['setupEventsMoveCoreEffects']();}}_0x434cf4[_0x41240e(0x3e6)](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x41240e(0x573)][_0x41240e(0x363)]=Number(RegExp['$1']));_0x434cf4[_0x41240e(0x3e6)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x41240e(0x573)][_0x41240e(0x3b2)]=Number(RegExp['$1']),this[_0x41240e(0x573)][_0x41240e(0x363)]=Number(RegExp['$2']));if(_0x434cf4[_0x41240e(0x3e6)](/<ICON BLEND MODE:[ ](.*?)>/i)){if(_0x41240e(0x5e5)!==_0x41240e(0x485)){const _0x400892=String(RegExp['$1'])[_0x41240e(0x2e3)]()[_0x41240e(0x54c)](),_0x168362=[_0x41240e(0x26e),'ADDITIVE','MULTIPLY',_0x41240e(0x2ca)];this[_0x41240e(0x573)][_0x41240e(0x55f)]=_0x168362[_0x41240e(0x45f)](_0x400892)[_0x41240e(0x49f)](0x0,0x3);}else _0x1e76dd['EventsMoveCore']['Scene_Map_startEncounterEffect'][_0x41240e(0x333)](this),this[_0x41240e(0x355)][_0x41240e(0x1d9)]();}if(_0x434cf4[_0x41240e(0x3e6)](/<LABEL:[ ](.*?)>/i)){if(_0x41240e(0x3dc)!==_0x41240e(0x34b))this['_labelWindow']['text']=String(RegExp['$1'])[_0x41240e(0x54c)]();else{if(!_0x30213b)return;if(!this[_0x41240e(0x398)])return;if(this[_0x41240e(0x48a)])return;if(this[_0x41240e(0x2b8)]<=0x0)return;if(this[_0x41240e(0x429)]===_0x49fc51)this[_0x41240e(0x575)]();this[_0x41240e(0x2b8)]+=this['_speed'],this[_0x41240e(0x2b8)]<=0x0&&this[_0x41240e(0x5f8)]();}}if(_0x434cf4[_0x41240e(0x3e6)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){if(_0x41240e(0x5b1)!=='FuGaZ'){const _0x884026=_0x148eed[_0x41240e(0x310)](this);if(!_0x884026)return;const _0xfaae9e=_0x884026[_0x41240e(0x202)][_0x41240e(0x2e3)]()[_0x41240e(0x54c)]();_0xfaae9e!==_0x41240e(0x29a)?this[_0x41240e(0x339)](_0xfaae9e,!![]):this[_0x41240e(0x40d)](_0x884026[_0x41240e(0x56f)],_0x884026[_0x41240e(0x53b)],!![]);}else this[_0x41240e(0x170)][_0x41240e(0x451)]=String(RegExp['$1'])[_0x41240e(0x54c)]();}_0x434cf4[_0x41240e(0x3e6)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this['_labelWindow'][_0x41240e(0x49b)]=Number(RegExp['$1']));_0x434cf4[_0x41240e(0x3e6)](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x41240e(0x170)][_0x41240e(0x22e)]=Number(RegExp['$1']));_0x434cf4[_0x41240e(0x3e6)](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this['_labelWindow'][_0x41240e(0x49b)]=Number(RegExp['$1']),this[_0x41240e(0x170)][_0x41240e(0x22e)]=Number(RegExp['$2']));$gameTemp[_0x41240e(0x1c2)](this);for(;;){if(this['_labelWindow'][_0x41240e(0x451)][_0x41240e(0x3e6)](/\\V\[(\d+)\]/gi))_0x41240e(0x280)!==_0x41240e(0x280)?this[_0x41240e(0x4c7)]():this[_0x41240e(0x170)][_0x41240e(0x451)]=this['_labelWindow'][_0x41240e(0x451)][_0x41240e(0x481)](/\\V\[(\d+)\]/gi,(_0x57e1b6,_0x15ee37)=>$gameVariables[_0x41240e(0x262)](parseInt(_0x15ee37)));else{if(_0x41240e(0x52d)!=='qrywI')break;else _0x2eabe9[_0x41240e(0x45b)][_0x41240e(0x43f)][_0x41240e(0x333)](this);}}$gameTemp[_0x41240e(0x3e2)]();_0x434cf4['match'](/<LABEL RANGE:[ ](\d+)>/i)&&(this[_0x41240e(0x170)][_0x41240e(0x2b9)]=Number(RegExp['$1']));if(_0x434cf4[_0x41240e(0x3e6)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0x5bddde=JSON[_0x41240e(0x38a)]('['+RegExp['$1'][_0x41240e(0x3e6)](/\d+/g)+']');this[_0x41240e(0x3f9)]=this['_moveOnlyRegions'][_0x41240e(0x277)](_0x5bddde),this[_0x41240e(0x3f9)][_0x41240e(0x436)](0x0);}if(_0x434cf4[_0x41240e(0x3e6)](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0x233f9b=String(RegExp['$1']);if(_0x233f9b[_0x41240e(0x3e6)](/PLAYER/i))this[_0x41240e(0x588)]['target']=0x0;else _0x233f9b[_0x41240e(0x3e6)](/EVENT[ ](\d+)/i)&&(this[_0x41240e(0x588)]['target']=Number(RegExp['$1']));}_0x434cf4[_0x41240e(0x3e6)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(this[_0x41240e(0x588)][_0x41240e(0x486)]=String(RegExp['$1'])[_0x41240e(0x53c)]()[_0x41240e(0x54c)]());_0x434cf4[_0x41240e(0x3e6)](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(_0x41240e(0x521)===_0x41240e(0x263)?this[_0x41240e(0x170)][_0x41240e(0x49b)]=_0x34d7a7(_0x47a2f8['$1']):this['_moveSynch']['delay']=Number(RegExp['$1']));if(_0x434cf4[_0x41240e(0x3e6)](/<TRUE RANDOM MOVE>/i))this[_0x41240e(0x468)]=0x0;else{if(_0x434cf4[_0x41240e(0x3e6)](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)){if('cAjkp'!==_0x41240e(0x3d4))this[_0x41240e(0x468)]=Number(RegExp['$1'])||0x0;else return this['_activationProximity'][_0x41240e(0x55e)]||0x0;}}_0x434cf4[_0x41240e(0x3e6)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x41240e(0x34d)]=!![]);_0x434cf4[_0x41240e(0x3e6)](/<HIDE SHADOW>/i)&&(this['_shadowGraphic'][_0x41240e(0x1ac)]=![]);_0x434cf4[_0x41240e(0x3e6)](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this['_shadowGraphic']['filename']=String(RegExp['$1']));_0x434cf4[_0x41240e(0x3e6)](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(this['_spriteOffsetX']=Number(RegExp['$1']));if(_0x434cf4[_0x41240e(0x3e6)](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)){if('RSZLW'===_0x41240e(0x294))this['_spriteOffsetY']=Number(RegExp['$1']);else{if(_0x3e1f47)this[_0x41240e(0x24d)](_0x17487d['x'],_0x249f60['y']);}}_0x434cf4[_0x41240e(0x3e6)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x41240e(0x3be)]=Number(RegExp['$1']),this[_0x41240e(0x28d)]=Number(RegExp['$2']));if(_0x434cf4['match'](/<STEP PATTERN:[ ](.*)>/i)){if(_0x41240e(0x1dd)!=='gwUoE')this[_0x41240e(0x247)]=String(RegExp['$1'])['toUpperCase']()['trim']();else{const _0x5f4731=this[_0x41240e(0x211)]+_0x5b9edf(_0x44bd1c['$1']);return this[_0x41240e(0x595)](_0x5f4731['clamp'](0x0,0xff));}}},Game_Event[_0x1b5cab(0x42e)]['updateEventsMoveCoreTagChanges']=function(){const _0x5ef3e8=_0x1b5cab;this[_0x5ef3e8(0x492)]();},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x49d)]=function(){const _0x250a2b=_0x1b5cab;if(this[_0x250a2b(0x475)])return!![];return Game_Character['prototype']['isNearTheScreen'][_0x250a2b(0x333)](this);},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x328)]=Game_Event['prototype'][_0x1b5cab(0x1f6)],Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x1f6)]=function(){const _0x3d538e=_0x1b5cab;if(this[_0x3d538e(0x5de)]())return;VisuMZ['EventsMoveCore'][_0x3d538e(0x328)][_0x3d538e(0x333)](this),this['isMoving']()&&VisuMZ[_0x3d538e(0x44c)](this[_0x3d538e(0x332)]);},Game_Event[_0x1b5cab(0x42e)]['isPreventSelfMovement']=function(){const _0x1eac51=_0x1b5cab,_0x2cdec5=VisuMZ[_0x1eac51(0x45b)][_0x1eac51(0x31c)][_0x1eac51(0x47a)];if($gameMap[_0x1eac51(0x23f)]()&&_0x2cdec5[_0x1eac51(0x511)])return!![];if($gameMessage[_0x1eac51(0x2bb)]()&&_0x2cdec5[_0x1eac51(0x402)])return!![];if(!$gameSystem[_0x1eac51(0x2c2)]())return!![];if(this[_0x1eac51(0x430)]()>=0x0)return!![];return![];},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x492)]=function(){const _0x84a5ac=_0x1b5cab,_0x13654e=SceneManager[_0x84a5ac(0x4ec)]['_spriteset'];if(_0x13654e){if(_0x84a5ac(0x529)!==_0x84a5ac(0x3c7)){const _0x24d5f5=_0x13654e[_0x84a5ac(0x549)](this);_0x24d5f5&&_0x24d5f5[_0x84a5ac(0x2dd)]&&_0x24d5f5[_0x84a5ac(0x2dd)]['_filename']!==this['shadowFilename']()&&('EzGxq'===_0x84a5ac(0x2d8)?(_0x8b1485['clearDestination'](),this[_0x84a5ac(0x297)]()):(_0x24d5f5[_0x84a5ac(0x2dd)][_0x84a5ac(0x4b7)]=this['shadowFilename'](),_0x24d5f5[_0x84a5ac(0x2dd)][_0x84a5ac(0x3f6)]=ImageManager[_0x84a5ac(0x5c4)](_0x24d5f5[_0x84a5ac(0x2dd)]['_filename'])));}else _0x3c53d7['y']+=0x1;}},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x285)]=function(){const _0x9593e0=_0x1b5cab;return this['_shadowGraphic'][_0x9593e0(0x407)];},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x50a)]=function(){const _0x2680d1=_0x1b5cab;if(!this[_0x2680d1(0x313)][_0x2680d1(0x1ac)])return![];return Game_CharacterBase['prototype'][_0x2680d1(0x50a)][_0x2680d1(0x333)](this);},Game_Event['prototype']['labelWindowText']=function(){const _0x57b741=_0x1b5cab;return this[_0x57b741(0x170)][_0x57b741(0x451)];},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x1b2)]=function(){const _0x3942d3=_0x1b5cab;return this['_labelWindow'][_0x3942d3(0x2b9)];},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x41a)]=function(_0x1dfbc5,_0x270f8d,_0x2069c8){const _0x43fda8=_0x1b5cab;if(this[_0x43fda8(0x47d)]())return this[_0x43fda8(0x3f7)](_0x1dfbc5,_0x270f8d,_0x2069c8);if($gameMap[_0x43fda8(0x26f)](_0x1dfbc5,_0x270f8d,_0x2069c8,_0x43fda8(0x3ae)))return!![];if($gameMap['isRegionForbidPass'](_0x1dfbc5,_0x270f8d,_0x2069c8,_0x43fda8(0x3ae)))return![];return Game_Character['prototype']['isMapPassable']['call'](this,_0x1dfbc5,_0x270f8d,_0x2069c8);},Game_Event[_0x1b5cab(0x42e)]['hasMoveOnlyRegions']=function(){const _0x48f686=_0x1b5cab;if(this[_0x48f686(0x3f9)]===undefined)this[_0x48f686(0x469)]();return this[_0x48f686(0x3f9)][_0x48f686(0x55b)]>0x0;},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x3f7)]=function(_0x22d60a,_0x203ab4,_0x289ba6){const _0x487be3=_0x1b5cab,_0x3d82f9=$gameMap['roundXWithDirection'](_0x22d60a,_0x289ba6),_0x33b190=$gameMap[_0x487be3(0x452)](_0x203ab4,_0x289ba6),_0x320aa2=$gameMap[_0x487be3(0x2e7)](_0x3d82f9,_0x33b190);return this[_0x487be3(0x3f9)]['includes'](_0x320aa2);},VisuMZ['EventsMoveCore']['Game_Event_findProperPageIndex']=Game_Event[_0x1b5cab(0x42e)]['findProperPageIndex'],Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x5ae)]=function(){const _0x4a647a=_0x1b5cab;return this['_advancedSwitchVariable']=![],this['_CPCs']=![],this[_0x4a647a(0x3ae)]()?VisuMZ['EventsMoveCore'][_0x4a647a(0x1b7)]['call'](this):-0x1;},VisuMZ[_0x1b5cab(0x45b)]['Game_Event_meetsConditions']=Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x27a)],Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x27a)]=function(_0x153b54){const _0x2f7edc=_0x1b5cab;this[_0x2f7edc(0x5c6)](_0x153b54),$gameTemp[_0x2f7edc(0x1c2)](this);const _0x4e79ff=VisuMZ['EventsMoveCore'][_0x2f7edc(0x212)][_0x2f7edc(0x333)](this,_0x153b54);return $gameTemp[_0x2f7edc(0x3e2)](),_0x4e79ff;},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x29f)]=function(){const _0x26b1fe=_0x1b5cab;return this[_0x26b1fe(0x346)];},Game_Event[_0x1b5cab(0x42e)]['checkAdvancedSwitchVariablePresent']=function(_0x21eff7){const _0x2fe329=_0x1b5cab,_0x505bab=_0x21eff7[_0x2fe329(0x5a7)];if(_0x505bab[_0x2fe329(0x1f0)]&&DataManager[_0x2fe329(0x3ad)](_0x505bab['switch1Id']))this[_0x2fe329(0x346)]=!![];else{if(_0x505bab[_0x2fe329(0x206)]&&DataManager['isAdvancedSwitch'](_0x505bab[_0x2fe329(0x377)])){if('lNJtx'!==_0x2fe329(0x34e))this[_0x2fe329(0x346)]=!![];else{if(!_0xa2aba8[_0x2fe329(0x2ae)]())return!![];return _0x319966[_0x2fe329(0x45b)][_0x2fe329(0x1ad)]['call'](this);}}else _0x505bab['variableValid']&&DataManager['isAdvancedVariable'](_0x505bab[_0x2fe329(0x181)])&&('jHTLx'!==_0x2fe329(0x1ba)?(this[_0x2fe329(0x429)]=_0x75dfe8,this[_0x2fe329(0x398)]=!![],_0x1cfd05>0x0&&(this['_frames']=_0x42ef55[_0x2fe329(0x49a)](this[_0x2fe329(0x2b8)],0x1))):this[_0x2fe329(0x346)]=!![]);}},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x234)]=function(){const _0x238fa4=_0x1b5cab;if(this['_erased'])return![];return this[_0x238fa4(0x2eb)];},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x5da)]=function(){const _0x3d1b15=_0x1b5cab;$gameTemp['clearDestination'](),this[_0x3d1b15(0x297)]();},Game_Event['prototype'][_0x1b5cab(0x2fd)]=function(_0x59261a,_0x54869c){const _0x3ed3b4=_0x1b5cab;return this['_addedHitbox']?this[_0x3ed3b4(0x1a2)](_0x59261a,_0x54869c):_0x3ed3b4(0x241)!==_0x3ed3b4(0x613)?Game_Character[_0x3ed3b4(0x42e)][_0x3ed3b4(0x2fd)][_0x3ed3b4(0x333)](this,_0x59261a,_0x54869c):this[_0x3ed3b4(0x170)]['text'];},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x1a2)]=function(_0x2a8c47,_0x4e1144){const _0x5a0d57=_0x1b5cab;var _0x18047a=this['x']-this[_0x5a0d57(0x33c)][_0x5a0d57(0x26d)],_0x4dbbcc=this['x']+this['_addedHitbox']['right'],_0x39c8f6=this['y']-this[_0x5a0d57(0x33c)]['up'],_0x5eb8b0=this['y']+this[_0x5a0d57(0x33c)][_0x5a0d57(0x24e)];return _0x18047a<=_0x2a8c47&&_0x2a8c47<=_0x4dbbcc&&_0x39c8f6<=_0x4e1144&&_0x4e1144<=_0x5eb8b0;},Game_Event[_0x1b5cab(0x42e)]['canPass']=function(_0x4855b6,_0x487a9d,_0x9c612a){const _0x2db5f3=_0x1b5cab;for(let _0x3a68d1=-this[_0x2db5f3(0x33c)][_0x2db5f3(0x26d)];_0x3a68d1<=this[_0x2db5f3(0x33c)][_0x2db5f3(0x3d1)];_0x3a68d1++){if(_0x2db5f3(0x5b2)===_0x2db5f3(0x35e))_0x5c4e0c[_0x58fa2a]['f']<_0x210b9c[_0x1f6042]['f']&&(_0x22dd83=_0x2c86c0);else for(let _0x17b537=-this[_0x2db5f3(0x33c)]['up'];_0x17b537<=this[_0x2db5f3(0x33c)][_0x2db5f3(0x24e)];_0x17b537++){if(!Game_Character[_0x2db5f3(0x42e)]['canPass']['call'](this,_0x4855b6+_0x3a68d1,_0x487a9d+_0x17b537,_0x9c612a))return![];}}return!![];},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x5d2)]=function(_0x407b7e,_0x3adbea){const _0x41d6ec=_0x1b5cab;if(Imported[_0x41d6ec(0x40c)]&&this['isSmartEventCollisionOn']())return this[_0x41d6ec(0x19f)](_0x407b7e,_0x3adbea);else{const _0x2944b2=$gameMap['eventsXyNt'](_0x407b7e,_0x3adbea)[_0x41d6ec(0x272)](_0x28ef0f=>_0x28ef0f!==this);return _0x2944b2[_0x41d6ec(0x55b)]>0x0;}},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x19f)]=function(_0x32495f,_0x5eaab8){const _0x286155=_0x1b5cab;if(!this[_0x286155(0x4c6)]())return![];else{const _0x4be35a=$gameMap[_0x286155(0x4d1)](_0x32495f,_0x5eaab8)[_0x286155(0x272)](_0x27dbd6=>_0x27dbd6!==this&&_0x27dbd6[_0x286155(0x4c6)]());return _0x4be35a[_0x286155(0x55b)]>0x0;}},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x4c2)]=function(){const _0x139fed=_0x1b5cab;return this[_0x139fed(0x4e4)][_0x139fed(0x486)]||_0x139fed(0x1dc);},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x3c0)]=function(){const _0x1c2d79=_0x1b5cab;return this[_0x1c2d79(0x4e4)][_0x1c2d79(0x55e)]||0x0;},Game_Event[_0x1b5cab(0x42e)]['activationRegionList']=function(){const _0x2bc522=_0x1b5cab;return this[_0x2bc522(0x4e4)][_0x2bc522(0x32f)]||[];},Game_Event[_0x1b5cab(0x42e)]['increaseSteps']=function(){const _0x4487db=_0x1b5cab;Game_Character[_0x4487db(0x42e)][_0x4487db(0x336)][_0x4487db(0x333)](this);if([_0x4487db(0x1dc),_0x4487db(0x279)][_0x4487db(0x42c)](this[_0x4487db(0x4c2)]()))return;$gamePlayer[_0x4487db(0x345)]([0x2]);},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x28c)]=Game_Event[_0x1b5cab(0x42e)]['checkEventTriggerAuto'],Game_Event['prototype'][_0x1b5cab(0x344)]=function(){const _0x282de2=_0x1b5cab;if(this[_0x282de2(0x5ef)]!==0x3)return;if(this[_0x282de2(0x4ef)])return;if(!this[_0x282de2(0x397)](![]))return;if(!this['checkActivationProximity'](![]))return;VisuMZ[_0x282de2(0x45b)]['Game_Event_checkEventTriggerAuto']['call'](this);},VisuMZ['EventsMoveCore']['Game_Event_updateParallel']=Game_Event[_0x1b5cab(0x42e)]['updateParallel'],Game_Event['prototype'][_0x1b5cab(0x3eb)]=function(){const _0x3a1bbb=_0x1b5cab;if(!this[_0x3a1bbb(0x57b)])return;if(!this[_0x3a1bbb(0x397)](!![]))return;if(!this[_0x3a1bbb(0x30c)](!![]))return;VisuMZ[_0x3a1bbb(0x45b)][_0x3a1bbb(0x4de)][_0x3a1bbb(0x333)](this);},Game_Event[_0x1b5cab(0x42e)]['checkRegionEventTrigger']=function(_0x1517f7){const _0x6a091f=_0x1b5cab;if(!_0x1517f7&&$gameMap[_0x6a091f(0x23f)]())return![];if(!_0x1517f7&&$gameMap['isAnyEventStarting']())return![];if(this[_0x6a091f(0x4ee)]()<=0x0)return!![];return $gamePlayer[_0x6a091f(0x38e)](this);},Game_Event[_0x1b5cab(0x42e)]['checkActivationProximity']=function(_0x182aac){const _0x271f71=_0x1b5cab;if(!_0x182aac&&$gameMap['isEventRunning']())return![];if(!_0x182aac&&$gameMap[_0x271f71(0x21c)]())return![];if([_0x271f71(0x1dc),'region'][_0x271f71(0x42c)](this['activationProximityType']()))return!![];return $gamePlayer['meetActivationProximityConditions'](this);},VisuMZ['MoveAllSynchTargets']=function(_0x4ac3c4){const _0x9fe5b6=_0x1b5cab;for(const _0x59f270 of $gameMap[_0x9fe5b6(0x552)]()){if(_0x9fe5b6(0x50c)==='frytv'){if(_0x525c35['match'](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else return _0x185c19[_0x9fe5b6(0x3e6)](/(?:AVOID|EVADE|DODGE)/i)?![]:![];}else{if(!_0x59f270)continue;_0x59f270[_0x9fe5b6(0x430)]()===_0x4ac3c4&&_0x59f270[_0x9fe5b6(0x584)]();}}},VisuMZ['GetMoveSynchTarget']=function(_0xbd17a4){const _0x1d4712=_0x1b5cab;if(_0xbd17a4===0x0)return $gamePlayer;return $gameMap[_0x1d4712(0x3ae)](_0xbd17a4);},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x430)]=function(){const _0x112ba6=_0x1b5cab;return this['_moveSynch'][_0x112ba6(0x45c)];},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x389)]=function(){const _0xdff9d=_0x1b5cab;return this[_0xdff9d(0x588)][_0xdff9d(0x486)];},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x175)]=function(){const _0x5d477a=_0x1b5cab;if(this[_0x5d477a(0x430)]()>=0x0){const _0x5ce830=VisuMZ[_0x5d477a(0x4b3)](this[_0x5d477a(0x430)]());if(_0x5ce830)return _0x5ce830[_0x5d477a(0x175)]();}return Game_Character[_0x5d477a(0x42e)][_0x5d477a(0x175)][_0x5d477a(0x333)](this);},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x584)]=function(){const _0x259f58=_0x1b5cab;this[_0x259f58(0x588)][_0x259f58(0x4d8)]=this[_0x259f58(0x588)][_0x259f58(0x4d8)]||0x0,this[_0x259f58(0x588)]['timer']--;if(this[_0x259f58(0x588)][_0x259f58(0x4d8)]>0x0)return;this[_0x259f58(0x588)][_0x259f58(0x4d8)]=this[_0x259f58(0x588)]['delay'],this['processMoveSynch']();},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x18c)]=function(){const _0x10a81b=_0x1b5cab;switch(this['moveSynchType']()){case _0x10a81b(0x37a):this[_0x10a81b(0x606)]();break;case _0x10a81b(0x594):this[_0x10a81b(0x432)]();break;case'away':this[_0x10a81b(0x4b5)]();break;case _0x10a81b(0x232):this[_0x10a81b(0x545)]();break;case _0x10a81b(0x347):case _0x10a81b(0x3af):this[_0x10a81b(0x3bc)]();break;case _0x10a81b(0x217):case _0x10a81b(0x3d5):this[_0x10a81b(0x472)]();break;case _0x10a81b(0x237):case _0x10a81b(0x37c):case _0x10a81b(0x4d4):case _0x10a81b(0x498):this['processMoveSynchMirrorHorz']();break;case _0x10a81b(0x5d9):case'vertical\x20mirror':case _0x10a81b(0x386):case _0x10a81b(0x4dd):this[_0x10a81b(0x4a0)]();break;default:this[_0x10a81b(0x606)]();break;}this[_0x10a81b(0x431)]();},Game_Event['prototype'][_0x1b5cab(0x606)]=function(){const _0x5d2ea1=_0x1b5cab,_0x33c9a6=[0x2,0x4,0x6,0x8];$gameMap['isSupportDiagonalMovement']()&&_0x33c9a6[_0x5d2ea1(0x378)](0x1,0x3,0x7,0x9);const _0x27f4fb=[];for(const _0x325333 of _0x33c9a6){if(this[_0x5d2ea1(0x454)](this['x'],this['y'],_0x325333))_0x27f4fb[_0x5d2ea1(0x378)](_0x325333);}if(_0x27f4fb['length']>0x0){const _0x2f485b=_0x27f4fb[Math[_0x5d2ea1(0x2cb)](_0x27f4fb[_0x5d2ea1(0x55b)])];this['executeMoveDir8'](_0x2f485b);}},Game_Event[_0x1b5cab(0x42e)]['processMoveSynchApproach']=function(){const _0x323359=_0x1b5cab,_0x523756=VisuMZ['GetMoveSynchTarget'](this['moveSynchTarget']());this[_0x323359(0x579)](_0x523756);},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x4b5)]=function(){const _0x57b471=_0x1b5cab,_0x342528=VisuMZ[_0x57b471(0x4b3)](this[_0x57b471(0x430)]());this['moveAwayFromCharacter'](_0x342528);},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x545)]=function(){const _0x2787e0=_0x1b5cab;this[_0x2787e0(0x2ef)]();},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x3bc)]=function(){const _0x53d729=_0x1b5cab,_0x4caa26=VisuMZ[_0x53d729(0x4b3)](this[_0x53d729(0x430)]());this[_0x53d729(0x276)](_0x4caa26[_0x53d729(0x592)]());},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x472)]=function(){const _0x137494=_0x1b5cab,_0x209e59=VisuMZ[_0x137494(0x4b3)](this['moveSynchTarget']()),_0x424e8f=this[_0x137494(0x273)](_0x209e59[_0x137494(0x592)]());this['executeMoveDir8'](this[_0x137494(0x273)](_0x209e59[_0x137494(0x246)]()));},Game_Event[_0x1b5cab(0x42e)]['processMoveSynchMirrorHorz']=function(){const _0x317382=_0x1b5cab,_0x20930a=VisuMZ['GetMoveSynchTarget'](this[_0x317382(0x430)]()),_0xc9eddd=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x20930a[_0x317382(0x592)]()];this[_0x317382(0x276)](_0xc9eddd);},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x4a0)]=function(){const _0x17d31e=_0x1b5cab,_0x9f17fa=VisuMZ[_0x17d31e(0x4b3)](this[_0x17d31e(0x430)]()),_0x46dc30=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x9f17fa[_0x17d31e(0x592)]()];this['executeMoveDir8'](_0x46dc30);},Game_Event['prototype'][_0x1b5cab(0x3a5)]=function(){const _0x3fabdc=_0x1b5cab,_0x28be5c=$gameSystem['getSavedEventLocation'](this);if(!_0x28be5c)return;this['locate'](_0x28be5c['x'],_0x28be5c['y']),this['setDirection'](_0x28be5c['direction']),this[_0x3fabdc(0x3d8)]===_0x28be5c['pageIndex']&&(this['_moveRouteIndex']=_0x28be5c[_0x3fabdc(0x1b5)]);},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x4cf)]=function(){const _0x2bcd2a=_0x1b5cab;Game_Character[_0x2bcd2a(0x42e)][_0x2bcd2a(0x4cf)][_0x2bcd2a(0x333)](this),this[_0x2bcd2a(0x449)]();},Game_Event['prototype'][_0x1b5cab(0x31d)]=function(){const _0x41da19=_0x1b5cab;if($gameMap['isSaveEventLocations']())return!![];return this[_0x41da19(0x34d)];},Game_Event[_0x1b5cab(0x42e)]['autosaveEventLocation']=function(){const _0x3d4fc2=_0x1b5cab;if(!this[_0x3d4fc2(0x31d)]())return;this['saveEventLocation']();},Game_Event['prototype'][_0x1b5cab(0x32b)]=function(){const _0x3dd9e9=_0x1b5cab;$gameSystem[_0x3dd9e9(0x32b)](this);},Game_Event['prototype'][_0x1b5cab(0x48f)]=function(){const _0x24b05a=_0x1b5cab;$gameSystem[_0x24b05a(0x348)](this);},Game_Event['prototype'][_0x1b5cab(0x442)]=function(){const _0x224041=_0x1b5cab;if($gameSystem[_0x224041(0x442)](this)){if(_0x224041(0x29c)===_0x224041(0x29c))return Game_Character[_0x224041(0x42e)][_0x224041(0x442)]['call'](this);else _0x13b217[_0x224041(0x5ed)](_0x5462ec['Step1MapId'],_0x3f78c9[_0x224041(0x179)],_0x91b84e[_0x224041(0x3a0)],_0x36e980['Step2MapId'],_0x22e78c[_0x224041(0x58d)]);}else return{'iconIndex':0x0,'bufferX':settings[_0x224041(0x4c9)][_0x224041(0x48b)],'bufferY':settings[_0x224041(0x4c9)]['BufferY'],'blendMode':settings[_0x224041(0x4c9)][_0x224041(0x5fd)]};},Game_Event['prototype'][_0x1b5cab(0x1a7)]=function(){const _0x2deeb7=_0x1b5cab;return this[_0x2deeb7(0x24b)];},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x192)]=Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x27a)],Game_Event['prototype'][_0x1b5cab(0x27a)]=function(_0x1edbe3){const _0x39c962=_0x1b5cab,_0x115af8=VisuMZ['EventsMoveCore'][_0x39c962(0x192)][_0x39c962(0x333)](this,_0x1edbe3);if(!_0x115af8)return![];return this[_0x39c962(0x1c4)](_0x1edbe3);},Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x1c4)]=function(_0x1508d1){const _0x5464e3=_0x1b5cab;VisuMZ[_0x5464e3(0x45b)][_0x5464e3(0x2d2)][_0x5464e3(0x2ab)](_0x1508d1),this[_0x5464e3(0x24b)]=_0x1508d1[_0x5464e3(0x3fe)][_0x5464e3(0x55b)]>0x0;_0x1508d1[_0x5464e3(0x3fe)]===undefined&&VisuMZ[_0x5464e3(0x45b)][_0x5464e3(0x2d2)][_0x5464e3(0x2ab)](_0x1508d1);if(_0x1508d1[_0x5464e3(0x3fe)]['length']>0x0)return $gameMap['event'](this['_eventId'])&&VisuMZ[_0x5464e3(0x45b)][_0x5464e3(0x2d2)][_0x5464e3(0x222)](_0x1508d1['CPC'],this[_0x5464e3(0x332)]);return!![];},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x4ff)]=Game_Troop[_0x1b5cab(0x42e)][_0x1b5cab(0x27a)],Game_Troop['prototype'][_0x1b5cab(0x27a)]=function(_0x412318){const _0x449f67=_0x1b5cab;var _0x3d5fac=VisuMZ[_0x449f67(0x45b)][_0x449f67(0x4ff)][_0x449f67(0x333)](this,_0x412318);return _0x3d5fac&&this[_0x449f67(0x4f7)](_0x412318);},Game_Troop[_0x1b5cab(0x42e)]['CPCsMet']=function(_0x2bc3c4){const _0x42921e=_0x1b5cab;_0x2bc3c4['CPC']===undefined&&VisuMZ[_0x42921e(0x45b)][_0x42921e(0x2d2)]['loadCPC'](_0x2bc3c4);if(_0x2bc3c4[_0x42921e(0x3fe)][_0x42921e(0x55b)]>0x0)return VisuMZ[_0x42921e(0x45b)][_0x42921e(0x2d2)][_0x42921e(0x222)](_0x2bc3c4[_0x42921e(0x3fe)],0x0);return!![];},VisuMZ['EventsMoveCore']['Game_Event_locate']=Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x21d)],Game_Event['prototype']['locate']=function(_0x5820a1,_0x55d22c){const _0x4eafb4=_0x1b5cab;VisuMZ[_0x4eafb4(0x45b)][_0x4eafb4(0x426)]['call'](this,_0x5820a1,_0x55d22c),this['_randomHomeX']=_0x5820a1,this[_0x4eafb4(0x510)]=_0x55d22c;},VisuMZ['EventsMoveCore'][_0x1b5cab(0x5dc)]=Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x30f)],Game_Event[_0x1b5cab(0x42e)][_0x1b5cab(0x30f)]=function(){const _0x4c5b84=_0x1b5cab,_0x3032bb=$gameMap[_0x4c5b84(0x55e)](this['x'],this['y'],this[_0x4c5b84(0x226)],this[_0x4c5b84(0x510)]),_0x18ceae=_0x3032bb*(this[_0x4c5b84(0x468)]||0x0);Math['random']()>=_0x18ceae?VisuMZ[_0x4c5b84(0x45b)][_0x4c5b84(0x5dc)]['call'](this):this[_0x4c5b84(0x209)]();},Game_Event[_0x1b5cab(0x42e)]['moveBackToRandomHome']=function(){const _0x237680=_0x1b5cab,_0x56810b=this[_0x237680(0x4a9)](this[_0x237680(0x226)]),_0x2d7f93=this['deltaYFrom'](this[_0x237680(0x510)]);if(Math[_0x237680(0x466)](_0x56810b)>Math[_0x237680(0x466)](_0x2d7f93))this[_0x237680(0x1c5)](_0x56810b>0x0?0x4:0x6),!this[_0x237680(0x37e)]()&&_0x2d7f93!==0x0&&this[_0x237680(0x1c5)](_0x2d7f93>0x0?0x8:0x2);else _0x2d7f93!==0x0&&(this[_0x237680(0x1c5)](_0x2d7f93>0x0?0x8:0x2),!this[_0x237680(0x37e)]()&&_0x56810b!==0x0&&(_0x237680(0x463)===_0x237680(0x463)?this[_0x237680(0x1c5)](_0x56810b>0x0?0x4:0x6):this[_0x237680(0x170)][_0x237680(0x2b9)]=_0x183df2(_0x14008a['$1'])));},VisuMZ[_0x1b5cab(0x45b)]['Game_Interpreter_updateWaitMode']=Game_Interpreter[_0x1b5cab(0x42e)]['updateWaitMode'],Game_Interpreter[_0x1b5cab(0x42e)]['updateWaitMode']=function(){const _0x463e81=_0x1b5cab;if(this[_0x463e81(0x3e4)]===_0x463e81(0x178)){if(_0x463e81(0x46f)!=='isdhf'){if(window[this[_0x463e81(0x2a3)]])this[_0x463e81(0x3e4)]='',this[_0x463e81(0x1d6)]();else return!![];}else{if(!this[_0x463e81(0x57b)])return;if(!this[_0x463e81(0x397)](!![]))return;if(!this[_0x463e81(0x30c)](!![]))return;_0x4ab198[_0x463e81(0x45b)]['Game_Event_updateParallel'][_0x463e81(0x333)](this);}}else return VisuMZ[_0x463e81(0x45b)]['Game_Interpreter_updateWaitMode'][_0x463e81(0x333)](this);},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x54a)]=Game_Interpreter[_0x1b5cab(0x42e)]['executeCommand'],Game_Interpreter[_0x1b5cab(0x42e)][_0x1b5cab(0x371)]=function(){const _0x4df756=_0x1b5cab,_0x3af769=$gameMap&&this[_0x4df756(0x332)]?$gameMap[_0x4df756(0x3ae)](this[_0x4df756(0x332)]):null;$gameTemp[_0x4df756(0x1c2)](_0x3af769);const _0x3afc0=VisuMZ[_0x4df756(0x45b)][_0x4df756(0x54a)][_0x4df756(0x333)](this);return $gameTemp[_0x4df756(0x3e2)](),_0x3afc0;},VisuMZ[_0x1b5cab(0x45b)]['Game_Interpreter_PluginCommand']=Game_Interpreter[_0x1b5cab(0x42e)][_0x1b5cab(0x518)],Game_Interpreter[_0x1b5cab(0x42e)][_0x1b5cab(0x518)]=function(_0x4c1a7a){const _0x438fdc=_0x1b5cab;return $gameTemp[_0x438fdc(0x2f4)](this),VisuMZ[_0x438fdc(0x45b)][_0x438fdc(0x329)][_0x438fdc(0x333)](this,_0x4c1a7a);},Game_Interpreter[_0x1b5cab(0x42e)]['pluginCommandCallEvent']=function(_0x401977){const _0x5bec05=_0x1b5cab;this[_0x5bec05(0x3cb)]=_0x401977;const _0x474aa4=_0x5bec05(0x1b8)['format'](_0x401977[_0x5bec05(0x56f)][_0x5bec05(0x531)](0x3));this[_0x5bec05(0x2a3)]='$callEventMap'+Graphics['frameCount']+'_'+this[_0x5bec05(0x53b)](),DataManager[_0x5bec05(0x2a4)](this[_0x5bec05(0x2a3)],_0x474aa4);if(window[this[_0x5bec05(0x2a3)]]){if('aSnaQ'===_0x5bec05(0x301))this[_0x5bec05(0x1d6)]();else{if(!this['isTargetEventValidForLabelWindow'](_0x1ef182))return;const _0x244d2d=new _0x450dce(_0x180d40);_0x244d2d['z']=0x8,_0x244d2d[_0x5bec05(0x16f)]=_0x3b6f3a[_0x5bec05(0x5e4)]++,this[_0x5bec05(0x259)][_0x5bec05(0x229)](_0x244d2d),this[_0x5bec05(0x504)][_0x5bec05(0x378)](_0x244d2d);}}else{if(_0x5bec05(0x2c3)===_0x5bec05(0x2c3))this['setWaitMode'](_0x5bec05(0x178));else{if(this[_0x5bec05(0x43c)]===_0x2a306f)this[_0x5bec05(0x575)]();this['_expireCommonEvent']=_0x3ed87a;}}},Game_Interpreter[_0x1b5cab(0x42e)]['startCallEvent']=function(){const _0x8d524a=_0x1b5cab,_0x28bab8=this['_callEventData'],_0x307a26=window[this[_0x8d524a(0x2a3)]],_0x10fdbe=_0x307a26[_0x8d524a(0x552)][_0x28bab8[_0x8d524a(0x53b)]];if(_0x10fdbe&&_0x10fdbe['pages'][_0x28bab8[_0x8d524a(0x4e6)]-0x1]){const _0xd9dfa=_0x10fdbe[_0x8d524a(0x269)][_0x28bab8[_0x8d524a(0x4e6)]-0x1][_0x8d524a(0x342)];this[_0x8d524a(0x477)](_0xd9dfa,this[_0x8d524a(0x53b)]());}window[this[_0x8d524a(0x2a3)]]=undefined,this[_0x8d524a(0x2a3)]=undefined,this[_0x8d524a(0x3cb)]=undefined;};function Game_CPCInterpreter(){const _0x6f45a6=_0x1b5cab;this[_0x6f45a6(0x535)][_0x6f45a6(0x473)](this,arguments);};Game_CPCInterpreter[_0x1b5cab(0x42e)]=Object['create'](Game_Interpreter[_0x1b5cab(0x42e)]),Game_CPCInterpreter[_0x1b5cab(0x42e)][_0x1b5cab(0x537)]=Game_CPCInterpreter,Game_CPCInterpreter['prototype'][_0x1b5cab(0x26c)]=function(){const _0x15f10f=_0x1b5cab;Game_Interpreter['prototype'][_0x15f10f(0x26c)]['call'](this),this[_0x15f10f(0x5ff)]=![];},Game_CPCInterpreter[_0x1b5cab(0x42e)][_0x1b5cab(0x1e5)]=function(){const _0x1cbbc5=_0x1b5cab;while(this[_0x1cbbc5(0x372)]()){this[_0x1cbbc5(0x371)]();}},Game_CPCInterpreter[_0x1b5cab(0x42e)][_0x1b5cab(0x4d3)]=function(_0x5b64de){const _0x546f25=_0x1b5cab;Game_Interpreter['prototype']['command108']['call'](this,_0x5b64de);if(this[_0x546f25(0x54f)][_0x546f25(0x4ba)](_0x250a59=>_0x250a59[_0x546f25(0x3e6)](/<(?:CONDITION|CONDITIONS) MET>/i))){if(_0x546f25(0x447)===_0x546f25(0x447))this[_0x546f25(0x5ff)]=!![];else{const _0x44cd58=_0x52fcb7['parameters'][0x0];if(_0x44cd58[_0x546f25(0x3e6)](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x7282bb=!![];else _0x44cd58[_0x546f25(0x3e6)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x79a5b7=![]);}}return!![];},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x30a)]=Scene_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x304)],Scene_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x304)]=function(){const _0x5cf6b0=_0x1b5cab;VisuMZ[_0x5cf6b0(0x45b)]['Scene_Map_startEncounterEffect'][_0x5cf6b0(0x333)](this),this[_0x5cf6b0(0x355)]['hideShadows']();},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x464)]=Scene_Load['prototype']['onLoadSuccess'],Scene_Load['prototype']['onLoadSuccess']=function(){const _0x4302f6=_0x1b5cab;if($gameMap)$gameMap[_0x4302f6(0x3b1)]();VisuMZ[_0x4302f6(0x45b)][_0x4302f6(0x464)][_0x4302f6(0x333)](this);},VisuMZ['EventsMoveCore'][_0x1b5cab(0x39d)]=Sprite_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x2c5)],Sprite_Character[_0x1b5cab(0x42e)]['initMembers']=function(){const _0x4c3fda=_0x1b5cab;VisuMZ[_0x4c3fda(0x45b)]['Sprite_Character_initMembers'][_0x4c3fda(0x333)](this),this[_0x4c3fda(0x3b0)](),this[_0x4c3fda(0x16c)]();},Sprite_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x3b0)]=function(){const _0x11bce7=_0x1b5cab;this[_0x11bce7(0x2b1)]=0xff;},Sprite_Character['prototype'][_0x1b5cab(0x16c)]=function(){const _0x15fc4f=_0x1b5cab;this['_eventIconSprite']=new Sprite(),this[_0x15fc4f(0x4d2)]['bitmap']=ImageManager[_0x15fc4f(0x5c4)](_0x15fc4f(0x293)),this['_eventIconSprite'][_0x15fc4f(0x3f6)][_0x15fc4f(0x4fa)]=![],this[_0x15fc4f(0x4d2)]['setFrame'](0x0,0x0,0x0,0x0),this['_eventIconSprite']['anchor']['x']=0.5,this[_0x15fc4f(0x4d2)][_0x15fc4f(0x1fd)]['y']=0x1,this['addChild'](this[_0x15fc4f(0x4d2)]);},Sprite_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x270)]=function(){const _0xc40020=_0x1b5cab;return this['_characterName']&&this[_0xc40020(0x19c)][_0xc40020(0x3e6)](/\[VS8\]/i);},Sprite_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x57e)]=function(){const _0x1d61a6=_0x1b5cab;return this[_0x1d61a6(0x270)]()&&VisuMZ[_0x1d61a6(0x45b)][_0x1d61a6(0x31c)][_0x1d61a6(0x2f6)][_0x1d61a6(0x2d6)];},VisuMZ['EventsMoveCore'][_0x1b5cab(0x210)]=Sprite_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x431)],Sprite_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x431)]=function(){const _0x1cb044=_0x1b5cab;VisuMZ[_0x1cb044(0x45b)]['Sprite_Character_update']['call'](this),VisuMZ['EventsMoveCore']['Settings'][_0x1cb044(0x47a)][_0x1cb044(0x1d0)]&&this[_0x1cb044(0x413)](),this[_0x1cb044(0x2dd)]&&this[_0x1cb044(0x28e)](),this[_0x1cb044(0x4d2)]&&this[_0x1cb044(0x4c7)]();},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x349)]=Sprite_Character['prototype'][_0x1b5cab(0x568)],Sprite_Character[_0x1b5cab(0x42e)]['setTileBitmap']=function(){const _0x19b460=_0x1b5cab;VisuMZ[_0x19b460(0x45b)][_0x19b460(0x349)][_0x19b460(0x333)](this),this[_0x19b460(0x3f6)]['addLoadListener'](this[_0x19b460(0x560)]['bind'](this));},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x3c5)]=Sprite_Character[_0x1b5cab(0x42e)]['setCharacterBitmap'],Sprite_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x556)]=function(){const _0xd424bb=_0x1b5cab;VisuMZ[_0xd424bb(0x45b)][_0xd424bb(0x3c5)][_0xd424bb(0x333)](this),this['bitmap']['addLoadListener'](this[_0xd424bb(0x560)][_0xd424bb(0x337)](this));},Sprite_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x560)]=function(){const _0x305f1c=_0x1b5cab;if(!this[_0x305f1c(0x3f6)])return;this[_0x305f1c(0x3f6)][_0x305f1c(0x4fa)]=!!VisuMZ[_0x305f1c(0x45b)][_0x305f1c(0x31c)]['Movement']['BitmapSmoothing'];},VisuMZ[_0x1b5cab(0x45b)]['Sprite_Character_characterPatternY']=Sprite_Character['prototype'][_0x1b5cab(0x19b)],Sprite_Character['prototype'][_0x1b5cab(0x19b)]=function(){const _0x4f98eb=_0x1b5cab;return this[_0x4f98eb(0x270)]()?_0x4f98eb(0x1f3)===_0x4f98eb(0x1f3)?this[_0x4f98eb(0x1cb)]():!![]:_0x4f98eb(0x612)==='zchkY'?_0x37d6ec[_0x4f98eb(0x3ae)](this[_0x4f98eb(0x332)])&&_0x345874['EventsMoveCore'][_0x4f98eb(0x2d2)][_0x4f98eb(0x222)](_0x1d077e['CPC'],this[_0x4f98eb(0x332)]):VisuMZ[_0x4f98eb(0x45b)]['Sprite_Character_characterPatternY'][_0x4f98eb(0x333)](this);},Sprite_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x1cb)]=function(){const _0x314abd=_0x1b5cab,_0x6ffdd0=this[_0x314abd(0x418)][_0x314abd(0x246)](),_0x53ed87=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return(_0x53ed87[_0x6ffdd0]-0x2)/0x2;},Sprite_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x413)]=function(){const _0x1039a9=_0x1b5cab;this[_0x1039a9(0x3fd)]=0x0;if(this[_0x1039a9(0x4a3)]()){const _0x9052d3=VisuMZ[_0x1039a9(0x45b)][_0x1039a9(0x31c)][_0x1039a9(0x47a)],_0x2543c8=this[_0x1039a9(0x418)][_0x1039a9(0x246)]();let _0x458849=0x0;if([0x1,0x4,0x7][_0x1039a9(0x42c)](_0x2543c8))_0x458849=_0x9052d3[_0x1039a9(0x2d5)];if([0x3,0x6,0x9]['includes'](_0x2543c8))_0x458849=_0x9052d3[_0x1039a9(0x1bd)];[0x2,0x8]['includes'](_0x2543c8)&&(_0x1039a9(0x580)!==_0x1039a9(0x41b)?_0x458849=[-_0x9052d3[_0x1039a9(0x3cf)],0x0,_0x9052d3[_0x1039a9(0x3cf)]][this[_0x1039a9(0x418)]['pattern']()]:this[_0x1039a9(0x40d)](_0x4e9237[_0x1039a9(0x56f)],_0x32a5ff['eventId'],!![]));if(this[_0x1039a9(0x455)])_0x458849*=-0x1;this[_0x1039a9(0x3fd)]=_0x458849;}},Sprite_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x4a3)]=function(){const _0x52efdb=_0x1b5cab;if(this[_0x52efdb(0x4f5)])return![];return this[_0x52efdb(0x418)][_0x52efdb(0x47f)]()&&!this[_0x52efdb(0x418)][_0x52efdb(0x3b3)]()&&!this[_0x52efdb(0x418)][_0x52efdb(0x1ed)]()&&this[_0x52efdb(0x29b)]()===0x0;},Sprite_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x28e)]=function(){const _0x11bb2f=_0x1b5cab;this[_0x11bb2f(0x2dd)]['x']=this[_0x11bb2f(0x418)][_0x11bb2f(0x2ad)](),this[_0x11bb2f(0x2dd)]['y']=this['_character']['shadowY'](),this[_0x11bb2f(0x2dd)]['opacity']=this['opacity'],this['_shadowSprite'][_0x11bb2f(0x1ac)]=this[_0x11bb2f(0x418)]['isShadowVisible'](),this[_0x11bb2f(0x2dd)][_0x11bb2f(0x58c)]=this['_hidden'];if(!this[_0x11bb2f(0x418)]['isShadowShrink']()){if(_0x11bb2f(0x1f4)!==_0x11bb2f(0x493))this[_0x11bb2f(0x2dd)][_0x11bb2f(0x2e0)]['x']=Math[_0x11bb2f(0x35b)](0x1,this[_0x11bb2f(0x2dd)][_0x11bb2f(0x2e0)]['x']+0.1),this['_shadowSprite']['scale']['y']=Math[_0x11bb2f(0x35b)](0x1,this[_0x11bb2f(0x2dd)][_0x11bb2f(0x2e0)]['y']+0.1);else{_0x250979['EventsMoveCore'][_0x11bb2f(0x4af)][_0x11bb2f(0x333)](this);if(this['_paused']===_0x5986f7)this[_0x11bb2f(0x575)]();this[_0x11bb2f(0x48a)]=![];}}else this[_0x11bb2f(0x2dd)][_0x11bb2f(0x2e0)]['x']=Math[_0x11bb2f(0x49a)](0x0,this[_0x11bb2f(0x2dd)][_0x11bb2f(0x2e0)]['x']-0.1),this[_0x11bb2f(0x2dd)][_0x11bb2f(0x2e0)]['y']=Math[_0x11bb2f(0x49a)](0x0,this[_0x11bb2f(0x2dd)][_0x11bb2f(0x2e0)]['y']-0.1);},Sprite_Character['prototype']['updateEventIconSprite']=function(){const _0x564844=_0x1b5cab,_0x120b38=this[_0x564844(0x4d2)],_0x2fd7d4=this[_0x564844(0x29b)]();if(_0x2fd7d4<=0x0){if(_0x564844(0x4a7)!==_0x564844(0x207))return _0x120b38[_0x564844(0x5af)](0x0,0x0,0x0,0x0);else{this[_0x564844(0x345)](_0x587cfc);if(_0x15d9c8[_0x564844(0x42c)](0x0)&&this['startMapCommonEventOnOKTarget']()==='standing')this[_0x564844(0x36e)](this['x'],this['y']);else(_0x5b8548['includes'](0x1)||_0x4aacf8['includes'](0x2))&&this[_0x564844(0x491)]();}}else{if('bJKkK'===_0x564844(0x2af)){const _0xb237fb=ImageManager[_0x564844(0x571)],_0x291abc=ImageManager[_0x564844(0x30d)],_0x3941c6=_0x2fd7d4%0x10*_0xb237fb,_0x5c5a9f=Math['floor'](_0x2fd7d4/0x10)*_0x291abc;_0x120b38['setFrame'](_0x3941c6,_0x5c5a9f,_0xb237fb,_0x291abc),this['visible']=!![];}else{if(_0x3ee8e3['isAdvancedVariable'](_0x4d7b7a))return this['advancedValue'](_0x1f8675);else return _0x4220fd['isSelfVariable'](_0x25e530)?this['selfValue'](_0x385f9f):_0x14862a[_0x564844(0x45b)][_0x564844(0x570)][_0x564844(0x333)](this,_0x418480);}}const _0x24af58=this['_character'][_0x564844(0x442)]();if(this[_0x564844(0x57e)]()){if(_0x564844(0x2b4)===_0x564844(0x2b4))this['autoEventIconBuffer'](_0x120b38);else return!![];}else _0x120b38['x']=_0x24af58?_0x24af58['bufferX']:0x0,_0x120b38['y']=_0x24af58?-this[_0x564844(0x1a1)]+_0x24af58[_0x564844(0x363)]:0x0;_0x120b38[_0x564844(0x55f)]=_0x24af58?_0x24af58[_0x564844(0x55f)]:0x0,this[_0x564844(0x17a)](_0x120b38),this[_0x564844(0x229)](_0x120b38),_0x120b38[_0x564844(0x3fd)]=-this[_0x564844(0x3fd)];},Sprite_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x558)]=function(_0x23a327){const _0x242e4d=_0x1b5cab;_0x23a327['x']=0x0,_0x23a327['y']=-this['height']+this[_0x242e4d(0x1a1)]*0x2/0x5;if(this[_0x242e4d(0x418)]['pattern']()!==0x1){if(_0x242e4d(0x2db)!==_0x242e4d(0x23d))_0x23a327['y']+=0x1;else{let _0x4b9395=[_0x3dcea6,_0x385a2f,_0x242e4d(0x4df)[_0x242e4d(0x30e)](_0x592d92)];typeof _0xde6266===_0x242e4d(0x538)&&(_0x4b9395=[_0x29c246,_0x198b64,_0x499719['toUpperCase']()[_0x242e4d(0x54c)]()]),_0x1bdb23[_0x242e4d(0x186)](_0x4b9395,_0x350230);}}},Sprite_Character[_0x1b5cab(0x42e)][_0x1b5cab(0x29b)]=function(){const _0xe58f35=_0x1b5cab;if(!this[_0xe58f35(0x418)])return 0x0;if(this[_0xe58f35(0x418)]['_erased'])return 0x0;const _0x49f9eb=this[_0xe58f35(0x418)]['getEventIconData']();return _0x49f9eb?_0x49f9eb[_0xe58f35(0x28f)]||0x0:0x0;},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x268)]=Sprite_Balloon[_0x1b5cab(0x42e)][_0x1b5cab(0x1b1)],Sprite_Balloon['prototype'][_0x1b5cab(0x1b1)]=function(_0x28778e,_0x4b9681){const _0x4b83a=_0x1b5cab;VisuMZ[_0x4b83a(0x45b)][_0x4b83a(0x268)][_0x4b83a(0x333)](this,_0x28778e,_0x4b9681),VisuMZ[_0x4b83a(0x45b)][_0x4b83a(0x31c)][_0x4b83a(0x2f6)]['AutoBalloon']&&this[_0x4b83a(0x245)]['_character'][_0x4b83a(0x459)](_0x4b9681,this['_duration']);},VisuMZ['EventsMoveCore']['Sprite_Balloon_updatePosition']=Sprite_Balloon[_0x1b5cab(0x42e)][_0x1b5cab(0x51f)],Sprite_Balloon[_0x1b5cab(0x42e)][_0x1b5cab(0x51f)]=function(){const _0x5a2891=_0x1b5cab;VisuMZ[_0x5a2891(0x45b)][_0x5a2891(0x223)][_0x5a2891(0x333)](this),this[_0x5a2891(0x3bb)]();},Sprite_Balloon[_0x1b5cab(0x42e)][_0x1b5cab(0x3bb)]=function(){const _0x2d2d5c=_0x1b5cab;if(this[_0x2d2d5c(0x245)][_0x2d2d5c(0x418)][_0x2d2d5c(0x270)]()){if(_0x2d2d5c(0x2d1)!==_0x2d2d5c(0x2d1)){_0x3d7862[_0x2d2d5c(0x1c2)](this);const _0x449f9d=_0x49c6df[_0x2d2d5c(0x45b)][_0x2d2d5c(0x367)]['call'](this,_0x3ecbcb);return _0x24371a[_0x2d2d5c(0x3e2)](),_0x449f9d;}else this['x']+=VisuMZ[_0x2d2d5c(0x45b)][_0x2d2d5c(0x31c)][_0x2d2d5c(0x2f6)]['BalloonOffsetX'],this['y']+=VisuMZ[_0x2d2d5c(0x45b)][_0x2d2d5c(0x31c)][_0x2d2d5c(0x2f6)][_0x2d2d5c(0x43a)];}},Sprite_Timer[_0x1b5cab(0x42e)][_0x1b5cab(0x4a4)]=function(){const _0x5953ee=_0x1b5cab;this[_0x5953ee(0x3f6)]=new Bitmap(Math['round'](Graphics['boxWidth']/0x2),0x30),this[_0x5953ee(0x3f6)][_0x5953ee(0x4a1)]=this[_0x5953ee(0x4a1)](),this['bitmap'][_0x5953ee(0x404)]=this['fontSize'](),this['bitmap'][_0x5953ee(0x4b2)]=ColorManager['outlineColor']();},Sprite_Timer[_0x1b5cab(0x42e)]['timerText']=function(){const _0x20e03d=_0x1b5cab,_0x1b2b63=Math['floor'](this[_0x20e03d(0x443)]/0x3c/0x3c),_0xc07512=Math[_0x20e03d(0x264)](this[_0x20e03d(0x443)]/0x3c)%0x3c,_0x4ec3e6=this['_seconds']%0x3c;let _0x32fa66=_0xc07512[_0x20e03d(0x531)](0x2)+':'+_0x4ec3e6[_0x20e03d(0x531)](0x2);if(_0x1b2b63>0x0)_0x32fa66=_0x20e03d(0x547)['format'](_0x1b2b63,_0x32fa66);return _0x32fa66;},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x467)]=Spriteset_Map['prototype'][_0x1b5cab(0x1c1)],Spriteset_Map['prototype']['createLowerLayer']=function(){const _0xe66137=_0x1b5cab;VisuMZ[_0xe66137(0x45b)]['Spriteset_Map_createLowerLayer'][_0xe66137(0x333)](this),this[_0xe66137(0x3d2)]();},VisuMZ['EventsMoveCore'][_0x1b5cab(0x39b)]=Spriteset_Map[_0x1b5cab(0x42e)]['createShadow'],Spriteset_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x2cc)]=function(){const _0x123c88=_0x1b5cab;VisuMZ['EventsMoveCore']['Spriteset_Map_createShadow'][_0x123c88(0x333)](this),this[_0x123c88(0x3da)]();},Spriteset_Map[_0x1b5cab(0x42e)]['createShadows']=function(){const _0x157fd9=_0x1b5cab;if(!VisuMZ[_0x157fd9(0x45b)][_0x157fd9(0x31c)][_0x157fd9(0x47a)][_0x157fd9(0x33d)])return;for(const _0x3eff7a of this['_characterSprites']){this[_0x157fd9(0x260)](_0x3eff7a);}},Spriteset_Map['prototype']['createCharacterShadow']=function(_0x4f2b09){const _0x2ce9e8=_0x1b5cab;_0x4f2b09[_0x2ce9e8(0x2dd)]=new Sprite(),_0x4f2b09[_0x2ce9e8(0x2dd)][_0x2ce9e8(0x4b7)]=_0x4f2b09['_character'][_0x2ce9e8(0x285)](),_0x4f2b09[_0x2ce9e8(0x2dd)][_0x2ce9e8(0x3f6)]=ImageManager[_0x2ce9e8(0x5c4)](_0x4f2b09[_0x2ce9e8(0x2dd)][_0x2ce9e8(0x4b7)]),_0x4f2b09[_0x2ce9e8(0x2dd)][_0x2ce9e8(0x1fd)]['x']=0.5,_0x4f2b09[_0x2ce9e8(0x2dd)]['anchor']['y']=0x1,_0x4f2b09[_0x2ce9e8(0x2dd)]['z']=0x0,this[_0x2ce9e8(0x259)][_0x2ce9e8(0x229)](_0x4f2b09['_shadowSprite']);},Spriteset_Map['prototype'][_0x1b5cab(0x1d9)]=function(){const _0x454d8f=_0x1b5cab;if(!VisuMZ[_0x454d8f(0x45b)]['Settings']['Movement'][_0x454d8f(0x33d)])return;for(const _0x540f13 of this['_characterSprites']){this[_0x454d8f(0x259)]['removeChild'](_0x540f13['_shadowSprite']);}},Spriteset_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x3d2)]=function(){const _0x76dfc3=_0x1b5cab;this[_0x76dfc3(0x504)]=[];for(const _0x1c0ecd of $gameMap[_0x76dfc3(0x552)]()){if(_0x76dfc3(0x295)==='XRibx'){if(this[_0x76dfc3(0x409)](_0x565f6e,_0x5ea642)[_0x76dfc3(0x55b)]>0x0)return!![];if(_0x4f0008['x']===_0x50e168&&_0x1965c5['y']===_0x62f39d)return!![];if(this['boat']()[_0x76dfc3(0x58a)](_0xfbaadf,_0x3d6c8e))return!![];if(this[_0x76dfc3(0x1d4)]()[_0x76dfc3(0x58a)](_0x1a330e,_0x2e7016))return!![];return![];}else this[_0x76dfc3(0x48e)](_0x1c0ecd);}},Spriteset_Map['prototype']['createLabelWindowForTarget']=function(_0x2bfb6f){const _0x5a367b=_0x1b5cab;if(!this[_0x5a367b(0x495)](_0x2bfb6f))return;const _0x130c7a=new Window_EventLabel(_0x2bfb6f);_0x130c7a['z']=0x8,_0x130c7a[_0x5a367b(0x16f)]=Sprite[_0x5a367b(0x5e4)]++,this[_0x5a367b(0x259)][_0x5a367b(0x229)](_0x130c7a),this['_labelWindows'][_0x5a367b(0x378)](_0x130c7a);},Spriteset_Map[_0x1b5cab(0x42e)]['isTargetEventValidForLabelWindow']=function(_0x110998){const _0x597028=_0x1b5cab,_0x4cb640=_0x110998[_0x597028(0x3ae)]();if(_0x4cb640['note']['match'](/<LABEL:[ ](.*?)>/i))return!![];if(_0x4cb640[_0x597028(0x3c2)]['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x2812f3 of _0x4cb640[_0x597028(0x269)]){let _0x3d38e5='';for(const _0xe03592 of _0x2812f3[_0x597028(0x342)]){[0x6c,0x198]['includes'](_0xe03592[_0x597028(0x265)])&&(_0x597028(0x3e3)!==_0x597028(0x582)?_0x3d38e5+=_0xe03592[_0x597028(0x5b9)][0x0]:(this[_0x597028(0x1c5)](_0x33f1f2>0x0?0x4:0x6),!this['isMovementSucceeded']()&&_0x182cea!==0x0&&this[_0x597028(0x1c5)](_0x5681d5>0x0?0x8:0x2)));}if(_0x3d38e5[_0x597028(0x3e6)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x3d38e5['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){if('lGMLt'!==_0x597028(0x450))return!![];else this[_0x597028(0x573)]['bufferY']=_0xfa3b3b(_0x54a63d['$1']);}}return![];},Spriteset_Map[_0x1b5cab(0x42e)][_0x1b5cab(0x5db)]=function(_0x582cf1){const _0x2bc929=_0x1b5cab;this['_characterSprites']=this[_0x2bc929(0x296)]||[];const _0x5f1999=new Sprite_Character(_0x582cf1);this[_0x2bc929(0x296)]['push'](_0x5f1999),this[_0x2bc929(0x259)][_0x2bc929(0x229)](_0x5f1999),this[_0x2bc929(0x260)](_0x5f1999),this[_0x2bc929(0x48e)](_0x582cf1),_0x5f1999[_0x2bc929(0x431)]();},VisuMZ['EventsMoveCore'][_0x1b5cab(0x1a8)]=Game_Message[_0x1b5cab(0x42e)][_0x1b5cab(0x47c)],Game_Message[_0x1b5cab(0x42e)][_0x1b5cab(0x47c)]=function(_0x2a230d,_0x31eeda){const _0x5a5452=_0x1b5cab;this[_0x5a5452(0x27f)]=$gameTemp[_0x5a5452(0x2bf)](),VisuMZ['EventsMoveCore']['Game_Message_setNumberInput'][_0x5a5452(0x333)](this,_0x2a230d,_0x31eeda);},VisuMZ[_0x1b5cab(0x45b)]['Window_NumberInput_start']=Window_NumberInput[_0x1b5cab(0x42e)]['start'],Window_NumberInput[_0x1b5cab(0x42e)][_0x1b5cab(0x297)]=function(){const _0x418bc9=_0x1b5cab;$gameTemp[_0x418bc9(0x1c2)]($gameMessage[_0x418bc9(0x27f)]),VisuMZ[_0x418bc9(0x45b)][_0x418bc9(0x267)]['call'](this),$gameTemp['clearSelfTarget']();},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x3df)]=Window_NumberInput['prototype'][_0x1b5cab(0x27c)],Window_NumberInput[_0x1b5cab(0x42e)]['processOk']=function(){const _0x378d68=_0x1b5cab;$gameTemp[_0x378d68(0x1c2)]($gameMessage[_0x378d68(0x27f)]),VisuMZ[_0x378d68(0x45b)][_0x378d68(0x3df)]['call'](this),$gameTemp['clearSelfTarget'](),$gameMessage[_0x378d68(0x27f)]=undefined;},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x489)]=Game_Message[_0x1b5cab(0x42e)][_0x1b5cab(0x1c6)],Game_Message[_0x1b5cab(0x42e)][_0x1b5cab(0x1c6)]=function(_0x285408,_0x2024d1){const _0x2bf474=_0x1b5cab;this['_selfTargetItemChoice']=$gameTemp['getSelfTarget'](),VisuMZ[_0x2bf474(0x45b)]['Game_Message_setItemChoice']['call'](this,_0x285408,_0x2024d1);},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x2b7)]=Window_EventItem[_0x1b5cab(0x42e)][_0x1b5cab(0x60e)],Window_EventItem['prototype'][_0x1b5cab(0x60e)]=function(){const _0x1d9515=_0x1b5cab;$gameTemp[_0x1d9515(0x1c2)]($gameMessage[_0x1d9515(0x42a)]),VisuMZ[_0x1d9515(0x45b)]['Window_EventItem_onOk'][_0x1d9515(0x333)](this),$gameTemp['clearSelfTarget'](),$gameMessage[_0x1d9515(0x42a)]=undefined;},VisuMZ['EventsMoveCore'][_0x1b5cab(0x281)]=Window_EventItem['prototype'][_0x1b5cab(0x444)],Window_EventItem[_0x1b5cab(0x42e)]['onCancel']=function(){const _0x2bafce=_0x1b5cab;$gameTemp[_0x2bafce(0x1c2)]($gameMessage[_0x2bafce(0x42a)]),VisuMZ[_0x2bafce(0x45b)]['Window_EventItem_onCancel']['call'](this),$gameTemp[_0x2bafce(0x3e2)](),$gameMessage[_0x2bafce(0x42a)]=undefined;},VisuMZ[_0x1b5cab(0x45b)]['Window_Message_startMessage']=Window_Message[_0x1b5cab(0x42e)]['startMessage'],Window_Message[_0x1b5cab(0x42e)]['startMessage']=function(){const _0x406ce4=_0x1b5cab;$gameMessage[_0x406ce4(0x364)](),VisuMZ[_0x406ce4(0x45b)][_0x406ce4(0x3c8)][_0x406ce4(0x333)](this),$gameTemp[_0x406ce4(0x3e2)]();},VisuMZ[_0x1b5cab(0x45b)][_0x1b5cab(0x5b6)]=Window_ScrollText['prototype']['startMessage'],Window_ScrollText[_0x1b5cab(0x42e)]['startMessage']=function(){const _0x2a3eb3=_0x1b5cab;$gameMessage['registerSelfEvent'](),VisuMZ['EventsMoveCore'][_0x2a3eb3(0x5b6)][_0x2a3eb3(0x333)](this),$gameTemp[_0x2a3eb3(0x3e2)]();};function Window_EventLabel(){const _0x456210=_0x1b5cab;this[_0x456210(0x535)](...arguments);}Window_EventLabel[_0x1b5cab(0x42e)]=Object['create'](Window_Base[_0x1b5cab(0x42e)]),Window_EventLabel[_0x1b5cab(0x42e)][_0x1b5cab(0x537)]=Window_EventLabel,Window_EventLabel[_0x1b5cab(0x42e)]['initialize']=function(_0x468405){const _0x2591e5=_0x1b5cab;this[_0x2591e5(0x5d3)]=_0x468405;const _0x3b6315=new Rectangle(0x0,0x0,Graphics[_0x2591e5(0x434)]/0x4,this[_0x2591e5(0x4fb)](0x1));this[_0x2591e5(0x2c5)](),Window_Base['prototype']['initialize'][_0x2591e5(0x333)](this,_0x3b6315),this[_0x2591e5(0x490)]=0x0,this['setBackgroundType'](0x2),this[_0x2591e5(0x305)]='';},Window_EventLabel[_0x1b5cab(0x42e)][_0x1b5cab(0x2c5)]=function(){const _0x4d9bae=_0x1b5cab;this['_eventErased']=![],this[_0x4d9bae(0x2e1)]=$gameScreen['zoomScale'](),this['_eventScreenX']=this[_0x4d9bae(0x5d3)]['screenX'](),this[_0x4d9bae(0x572)]=this[_0x4d9bae(0x5d3)]['screenY'](),this[_0x4d9bae(0x52e)]=this[_0x4d9bae(0x5d3)][_0x4d9bae(0x170)][_0x4d9bae(0x49b)],this[_0x4d9bae(0x2e6)]=this[_0x4d9bae(0x5d3)][_0x4d9bae(0x170)][_0x4d9bae(0x22e)],this['_eventPageIndex']=this[_0x4d9bae(0x5d3)]['_pageIndex'],this[_0x4d9bae(0x3fc)]=this['isLabelVisible'](),this[_0x4d9bae(0x37f)]=$gameSystem['eventLabelsVisible'](),this[_0x4d9bae(0x5d0)]=$gamePlayer['x'],this[_0x4d9bae(0x540)]=$gamePlayer['y'],this[_0x4d9bae(0x24a)]=this['_event']['x'],this['_visibleEventY']=this['_event']['y'];},Window_EventLabel[_0x1b5cab(0x42e)]['update']=function(){const _0x5b4aff=_0x1b5cab;Window_Base[_0x5b4aff(0x42e)][_0x5b4aff(0x431)][_0x5b4aff(0x333)](this);if(!this[_0x5b4aff(0x57a)]())return;this[_0x5b4aff(0x505)](),this['updateScale'](),this[_0x5b4aff(0x51f)](),this[_0x5b4aff(0x2ea)]();},Window_EventLabel[_0x1b5cab(0x42e)]['needsUpdate']=function(){const _0x3a4911=_0x1b5cab;if(!this[_0x3a4911(0x5d3)])return![];if(!this[_0x3a4911(0x5d3)][_0x3a4911(0x170)])return![];if(this[_0x3a4911(0x4a6)]!==this['_event'][_0x3a4911(0x3d8)])return!![];if(this['_event'][_0x3a4911(0x38d)]&&!this['_eventErased'])return!![];if(this[_0x3a4911(0x5d3)][_0x3a4911(0x170)][_0x3a4911(0x451)]==='')return![];if(this['_screenZoomScale']!==$gameScreen[_0x3a4911(0x3c4)]())return!![];if(this[_0x3a4911(0x3ab)]!==this[_0x3a4911(0x5d3)][_0x3a4911(0x250)]())return!![];if(this[_0x3a4911(0x572)]!==this['_event'][_0x3a4911(0x201)]())return!![];if(this[_0x3a4911(0x52e)]!==this[_0x3a4911(0x5d3)]['_labelWindow']['offsetX'])return!![];if(this['_eventLabelOffsetY']!==this[_0x3a4911(0x5d3)][_0x3a4911(0x170)]['offsetY'])return!![];if(this[_0x3a4911(0x5d0)]!==$gamePlayer['x'])return!![];if(this[_0x3a4911(0x540)]!==$gamePlayer['y'])return!![];if(this[_0x3a4911(0x24a)]!==this[_0x3a4911(0x5d3)]['x'])return!![];if(this['_visibleEventY']!==this['_event']['y'])return!![];if(this['_cacheSystemVisible']!==$gameSystem[_0x3a4911(0x1e9)]())return!![];if(this['_cacheVisibility']&&this['contentsOpacity']<0xff)return!![];if(!this['_cacheVisibility']&&this[_0x3a4911(0x490)]>0x0)return!![];if(SceneManager[_0x3a4911(0x4ec)][_0x3a4911(0x33b)]>0x0)return!![];return![];},Window_EventLabel[_0x1b5cab(0x42e)][_0x1b5cab(0x505)]=function(){const _0x47d11a=_0x1b5cab;this[_0x47d11a(0x5d3)][_0x47d11a(0x410)]()!==this['_text']&&(this[_0x47d11a(0x305)]=this['_event']['labelWindowText'](),this['refresh']());},Window_EventLabel[_0x1b5cab(0x42e)]['updateScale']=function(){const _0x5a7306=_0x1b5cab;this[_0x5a7306(0x2e0)]['x']=0x1/$gameScreen[_0x5a7306(0x3c4)](),this[_0x5a7306(0x2e0)]['y']=0x1/$gameScreen[_0x5a7306(0x3c4)](),this['_screenZoomScale']=$gameScreen[_0x5a7306(0x3c4)]();},Window_EventLabel[_0x1b5cab(0x42e)][_0x1b5cab(0x51f)]=function(){const _0x3f9fc6=_0x1b5cab;if(!SceneManager[_0x3f9fc6(0x4ec)])return;if(!SceneManager[_0x3f9fc6(0x4ec)][_0x3f9fc6(0x355)])return;const _0x22cda0=SceneManager[_0x3f9fc6(0x4ec)]['_spriteset'][_0x3f9fc6(0x549)](this[_0x3f9fc6(0x5d3)]);if(!_0x22cda0)return;this['x']=Math[_0x3f9fc6(0x308)](this[_0x3f9fc6(0x5d3)]['screenX']()-Math[_0x3f9fc6(0x264)](this[_0x3f9fc6(0x180)]*this[_0x3f9fc6(0x2e0)]['x']/0x2)),this['x']+=this[_0x3f9fc6(0x5d3)][_0x3f9fc6(0x170)][_0x3f9fc6(0x49b)],this['y']=this[_0x3f9fc6(0x5d3)][_0x3f9fc6(0x201)]()-_0x22cda0['height'],this['y']+=Math[_0x3f9fc6(0x308)]($gameSystem[_0x3f9fc6(0x4ae)]()*0.5),this['y']-=Math[_0x3f9fc6(0x308)](this[_0x3f9fc6(0x1a1)]*this[_0x3f9fc6(0x2e0)]['y']),this['y']+=this['_event'][_0x3f9fc6(0x170)][_0x3f9fc6(0x22e)],this[_0x3f9fc6(0x3b6)]=this[_0x3f9fc6(0x5d3)]['_erased'],this[_0x3f9fc6(0x3ab)]=this[_0x3f9fc6(0x5d3)][_0x3f9fc6(0x250)](),this['_eventScreenY']=this[_0x3f9fc6(0x5d3)][_0x3f9fc6(0x201)](),this[_0x3f9fc6(0x52e)]=this[_0x3f9fc6(0x5d3)]['_labelWindow'][_0x3f9fc6(0x49b)],this[_0x3f9fc6(0x2e6)]=this[_0x3f9fc6(0x5d3)]['_labelWindow'][_0x3f9fc6(0x22e)],this[_0x3f9fc6(0x4a6)]=this['_event'][_0x3f9fc6(0x3d8)],this[_0x3f9fc6(0x3b6)]&&(this['contentsOpacity']=0x0);},Window_EventLabel['prototype'][_0x1b5cab(0x2ea)]=function(){const _0x47dfef=_0x1b5cab;if(this['isLabelVisible']())this[_0x47dfef(0x490)]+=this[_0x47dfef(0x239)]();else SceneManager['_scene'][_0x47dfef(0x33b)]>0x0?this[_0x47dfef(0x490)]=0x0:this[_0x47dfef(0x490)]-=this[_0x47dfef(0x239)]();},Window_EventLabel[_0x1b5cab(0x42e)][_0x1b5cab(0x3ef)]=function(){const _0x19b358=_0x1b5cab;if(!$gameSystem[_0x19b358(0x1e9)]())return![];if(this[_0x19b358(0x5d3)]?.[_0x19b358(0x38d)])return![];if(SceneManager[_0x19b358(0x4ec)][_0x19b358(0x33b)]>0x0)return![];const _0x362218=$gamePlayer['x'],_0x594cff=$gamePlayer['y'],_0x2a9ba2=this[_0x19b358(0x5d3)]['x'],_0x4f2e0f=this['_event']['y'];if(this[_0x19b358(0x5d0)]===_0x362218&&this[_0x19b358(0x540)]===_0x594cff&&this[_0x19b358(0x24a)]===_0x2a9ba2&&this[_0x19b358(0x461)]===_0x4f2e0f)return this['_cacheVisibility'];this[_0x19b358(0x5d0)]=$gamePlayer['x'],this['_visiblePlayerY']=$gamePlayer['y'],this[_0x19b358(0x24a)]=this['_event']['x'],this['_visibleEventY']=this[_0x19b358(0x5d3)]['y'];if($gameMap[_0x19b358(0x373)](_0x362218,_0x594cff,_0x2a9ba2,_0x4f2e0f)>this['_event']['labelWindowRange']()){if('FOGSq'===_0x19b358(0x5a4))return this['_cacheVisibility']=![],![];else this[_0x19b358(0x170)][_0x19b358(0x451)]=_0x291400(_0x5eed62['$1'])[_0x19b358(0x54c)]();}return this['_cacheVisibility']=!![],!![];},Window_EventLabel[_0x1b5cab(0x42e)][_0x1b5cab(0x239)]=function(){const _0x1ad62a=_0x1b5cab;return VisuMZ[_0x1ad62a(0x45b)][_0x1ad62a(0x31c)][_0x1ad62a(0x5d4)][_0x1ad62a(0x314)];},Window_EventLabel[_0x1b5cab(0x42e)]['resizeWindow']=function(){const _0x40fb0b=_0x1b5cab,_0x3785d2=this[_0x40fb0b(0x609)](this[_0x40fb0b(0x305)]);this[_0x40fb0b(0x180)]=_0x3785d2['width']+($gameSystem[_0x40fb0b(0x4ae)]()+this[_0x40fb0b(0x357)]())*0x2,this[_0x40fb0b(0x1a1)]=Math[_0x40fb0b(0x49a)](this[_0x40fb0b(0x352)](),_0x3785d2['height'])+$gameSystem[_0x40fb0b(0x4ae)]()*0x2,this[_0x40fb0b(0x30b)]();},Window_EventLabel['prototype']['lineHeight']=function(){const _0x4a024f=_0x1b5cab;return VisuMZ[_0x4a024f(0x45b)][_0x4a024f(0x31c)][_0x4a024f(0x5d4)][_0x4a024f(0x315)];},Window_EventLabel[_0x1b5cab(0x42e)][_0x1b5cab(0x4e3)]=function(){const _0x57dc86=_0x1b5cab;Window_Base[_0x57dc86(0x42e)][_0x57dc86(0x4e3)][_0x57dc86(0x333)](this),this[_0x57dc86(0x427)][_0x57dc86(0x404)]=this[_0x57dc86(0x198)]();},Window_EventLabel[_0x1b5cab(0x42e)]['defaultFontSize']=function(){const _0x259d45=_0x1b5cab;return VisuMZ[_0x259d45(0x45b)][_0x259d45(0x31c)][_0x259d45(0x5d4)][_0x259d45(0x16a)];},Window_EventLabel[_0x1b5cab(0x42e)]['refresh']=function(){const _0x16c18e=_0x1b5cab;this[_0x16c18e(0x5e2)](),this['contents']['clear']();const _0x44f2e3=this['_text']['split'](/[\r\n]+/);let _0x3df52d=0x0;for(const _0x547884 of _0x44f2e3){const _0x133c2e=this[_0x16c18e(0x609)](_0x547884),_0x4733d7=Math[_0x16c18e(0x264)]((this[_0x16c18e(0x292)]-_0x133c2e['width'])/0x2);this[_0x16c18e(0x2aa)](_0x547884,_0x4733d7,_0x3df52d),_0x3df52d+=_0x133c2e[_0x16c18e(0x1a1)];}},Window_EventLabel[_0x1b5cab(0x42e)][_0x1b5cab(0x40f)]=function(_0x353014,_0x288a8d){const _0x2a30c5=_0x1b5cab;_0x288a8d[_0x2a30c5(0x528)]&&this[_0x2a30c5(0x25a)](_0x353014,_0x288a8d['x']+0x2,_0x288a8d['y']),_0x288a8d['x']+=Math[_0x2a30c5(0x35b)](this[_0x2a30c5(0x448)](),ImageManager[_0x2a30c5(0x571)])+0x4;},Window_EventLabel[_0x1b5cab(0x42e)]['drawIcon']=function(_0x346543,_0x5cc7f9,_0x7ceaa6){const _0x406183=_0x1b5cab,_0x14c633=ImageManager[_0x406183(0x5c4)]('IconSet'),_0x2b93ef=ImageManager[_0x406183(0x571)],_0x368231=ImageManager['iconHeight'],_0x3e34a1=_0x346543%0x10*_0x2b93ef,_0x5a57e4=Math['floor'](_0x346543/0x10)*_0x368231,_0x2bda0c=Math[_0x406183(0x35b)](this[_0x406183(0x448)]()),_0x483694=Math['min'](this[_0x406183(0x448)]());this[_0x406183(0x427)][_0x406183(0x5e8)](_0x14c633,_0x3e34a1,_0x5a57e4,_0x2b93ef,_0x368231,_0x5cc7f9,_0x7ceaa6,_0x2bda0c,_0x483694);},Window_EventLabel[_0x1b5cab(0x42e)]['iconSize']=function(){const _0x55ca7c=_0x1b5cab;return VisuMZ['EventsMoveCore'][_0x55ca7c(0x31c)][_0x55ca7c(0x5d4)][_0x55ca7c(0x326)];};