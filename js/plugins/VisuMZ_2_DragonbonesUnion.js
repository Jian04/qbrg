//=============================================================================
// VisuStella MZ - Dragonbones Union
// VisuMZ_2_DragonbonesUnion.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_DragonbonesUnion = true;

var VisuMZ = VisuMZ || {};
VisuMZ.DragonbonesUnion = VisuMZ.DragonbonesUnion || {};
VisuMZ.DragonbonesUnion.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.02] [DragonbonesUnion]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Dragonbones_Union_VisuStella_MZ
 * @base Public_0_Dragonbones
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter Public_0_Dragonbones
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * DragonBones allows your games to use skeletal animation, a type of computer
 * animation in which a character (or object) is represented by skins/textures
 * and a digital set of interconnected bones (called the skeleton). Using a set
 * of instructions, the game will create animations based off these skins,
 * skeletons, and instructions to create beautifully smooth and light-weight
 * movements.
 *
 * This plugin gives you such control over various facets of your game: the
 * battle system, event pictures, and map sprites for characters. Various
 * plugin commands, notetags, and comment tags are added through this plugin to
 * give you as much control as you need over Dragonbones from the RPG Maker MZ
 * editor itself.
 *
 * The version of Dragonbones used for this plugin is 5.7.002b.
 * More information can be found at http://dragonbones.com/
 *
 * Features include all (but not limited to) the following:
 * 
 * - Adds Dragonbones support to RPG Maker MZ.
 * - Dragonbones armatures can be used as battler sprites.
 * - Dragonbones armatures can be attached to event pictures.
 * - Dragonbones armatures can be inserted into the map as character sprites.
 * - A variety of Plugin Parameters, Notetags, and Plugin Commands to control
 *   the Dragonbones armatures and their animations.
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
 * - Dragonbones*
 *
 * *Note* You can download this library from the below URL or from the
 * Dragonbones Union product page. Install it as a Tier 0 plugin.
 *
 * URL: https://www.npmjs.com/package/pixi5-dragonbones/v/5.7.0-2b
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Dragonbones Armature Behaviors
 * ============================================================================
 *
 * Dragonbones armatures have certain behaviors when used with battlers,
 * pictures, and/or map sprites.
 *
 * ---
 *
 * 1. When a Dragonbones armature is loaded, it will play the 'idle' animation
 *    or whatever is set inside the Plugin Parameters => General Settings =>
 *    Loaded Animation field upon loading. Make your Dragonbones armatures with
 *    this in mind. At other times, the 'idle' animation will be used as a base
 *    defaulting animation.
 *
 * ---
 *
 * 2. The Dragonbones armature will always be anchored at the X, Y coordinates
 *    of the target. This X, Y coordinate point will be where the root/pivot
 *    point of the Dragonbones armature will be located.
 *
 * ---
 *
 * 3. The properties used by a sprite (ie the opacity, scale, rotation, and
 *    tint) will also be shared and/or amplified with the Dragonbones armature.
 *    The exception to this will be Blend Modes aren't supported.
 *
 * ---
 *
 * ============================================================================
 * IMPORTANT!! Dragonbones Armatures as Map Sprites
 * ============================================================================
 *
 * If you plan on using Dragonbones armatures as map sprites, please keep in
 * mind that there will be certain limitations and properties regarding them,
 * which will be listed below:
 *
 * ---
 *
 * 1. Try not to use more than 99 vertices for meshes. The reason behind this
 *    is because the Dragonbones armature is added as a sprite to the game's
 *    Tilemap. Any and all sprites added to the Tilemap have some restrictions
 *    placed on them as per Pixi JS's design. The Dragonbones armatures are no
 *    exception to this.
 *
 *    If the number of vertices exceeds 99, strange things will occur to the
 *    Dragonbones armature that are outside of this plugin's control. While it
 *    won't stop the plugin from functioning properly, expected behaviors may
 *    happen due to the threshold.
 *
 * ---
 *
 * 2. When using Dragonbones armatures that are too tall or wide, they may clip
 *    into the tile layer above or to the side due to how the Tilemap works.
 *    Things that you would see happen would include clipping into the tops of
 *    trees and structures.
 *
 * ---
 *
 * 3. Certain motions will request specific animations from the Dragonbones
 *    armature. If the animations exist, it will play those motions. If they
 *    don't, the motions may request a different animation down the line. The
 *    request orders are as follows:
 *
 *    Jumping:
 *    - jump, walk, idle
 *
 *    Rope (Climbing) (Requires: VisuMZ_1_EventsMoveCore):
 *    - ropeclimb, ladderclimb, walk, ropeidle, ladderidle, idle
 *
 *    Rope (Idle) (Requires: VisuMZ_1_EventsMoveCore):
 *    - ropeidle, ladderidle, idle
 *
 *    Ladder (Climbing):
 *    - ladderclimb, walk, ladderidle, idle
 *
 *    Ladder (Idle):
 *    - ladderidle, idle
 *
 *    Dashing:
 *    - dash, walk, idle
 *
 *    Walking:
 *    - walk, idle
 *
 *    Idle:
 *    - idle
 *
 *    Name the animations for the Dragonbones armature as such to make the most
 *    out of the motion priority lists.
 *
 * ---
 *
 * 4. You can add directional animations for your Dragonbones armature motion
 *    animations. To do so, add a number after the animation's name like such:
 *    walk2, walk4, walk6, walk8. These numbers are based off the NumPad
 *    directions to determine which way to face:
 *
 *    7 8 9
 *    4   6
 *    1 2 3
 *
 *    These numbers are added onto the priority system listed in #3 above, too.
 *    Diagonal directions also become split and added multiple times for better
 *    streamlining, with a priority given to the horizontal direction before
 *    the vertical direction. For example, dashing becomes the following:
 *
 *    Dashing (Upper Left):
 *    - dash7, dash4, dash8, dash,
 *      walk7, walk4, walk8, walk,
 *      idle7, idle4, idle8, idle
 *
 *    Dashing (Right):
 *    - dash6, dash,
 *      walk6, walk,
 *      idle6, idle
 *
 * ---
 *
 * 5. When a Dragonbones armature is moving, it will animate slower or faster
 *    depending on the character's current movement speed. At speed
 *    '4: Normal', it will animation 4x faster than what's seen in Dragonbones.
 *    At speed '6: x4 Faster', it will animate 6x faster while '1: x8 Slower'
 *    will be at x1 speed seen in Dragonbones. In other words, the speed
 *    animated is equal to the number written on the left of the
 *    movement speed.
 *
 *    When dashing, that multiplier increases by 1 in order to match movement
 *    speeds and the Dragonbones armature will do the same to follow.
 *
 * ---
 *
 * You will need to create your Dragonbones armatures with these 5 key rules in
 * mind in order to make the armatures animate smoothly within your game.
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
 * === Dragonbones Battler Notetags ===
 *
 * The following notetags are to be assigned to either actors and/or enemies.
 * An assigned actor/enemy will have their original sprite hidden from view in
 * favor of the Dragonbones armature to be displayed. Use these notetags to
 * declare various settings for your Dragonbones armatures.
 *
 * ---
 *
 * <Dragonbones Battler: filename>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets the DragonBones associated with this actor/enemy to be 'filename'.
 * - The name will be associated with the assets used.
 * - It will be used to check for associated filenames that end with _ske.json,
 *   _tex.json, and _tex.png.
 * - The listed assets must be found in the assigned assets folder.
 *
 * Examples:
 *
 * <Dragonbones Battler: Demon>
 * <Dragonbones Battler: DragonBoy>
 * <Dragonbones Battler: Swordsman>
 * <Dragonbones Battler: Ubbie>
 *
 * ---
 *
 * <Dragonbones Battler Scale: x, y>
 *
 * <Dragonbones Battler Scale X: x>
 * <Dragonbones Battler Scale Y: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets the base scale for the Dragonbones associated with this actor/enemy.
 *   This is for those instances where a Dragonbones armature is too large or
 *   small and needs to be scaled down/up.
 * - This scale will be amplified by the actor/enemy's sprite's scale value.
 * - Use the 1st notetag to assign values to both Scale X and Scale Y.
 * - Use the 2nd/3rd notetags to assign Scale X and Y values separately.
 * - Use negative values to flip the Dragonbones armature around.
 *
 * Examples:
 * 
 * <Dragonbones Battler Scale: -0.3, 0.3>
 *
 * <Dragonbones Battler Scale X: -0.3>
 * <Dragonbones Battler Scale Y: 0.3>
 *
 * ---
 *
 * <Dragonbones Battler Offset: x, y>
 *
 * <Dragonbones Battler Offset X: x>
 * <Dragonbones Battler Offset Y: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - When a Dragonbones armature is attached to an actor/enemy's sprite, it
 *   will always be attached at the root point assigned within the Dragonbones
 *   data. If a Dragonbones armature has a root point that does not fit well
 *   with your battler sprite, you can offset it using these notetags.
 * - Replace 'x' and 'y' with number values representing how many pixels you
 *   want to offset the Dragonbones armature by.
 * - Use the 1st notetag to assign values to both Offset X and Offset Y.
 * - Use the 2nd/3rd notetags to assign Offset X and Y values separately.
 * - Use negative values to offset to the left (X) or up (Y) directions.
 *
 * Examples:
 *
 * <Dragonbones Battler Offset: -10, 5>
 *
 * <Dragonbones Battler Offset X: -10>
 * <Dragonbones Battler Offset Y: 5>
 *
 * ---
 *
 * <Dragonbones Battler Size: width, height>
 *
 * <Dragonbones Battler Width: x>
 * <Dragonbones Battler Height: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Dragonbones armatures have no standard width or height. This makes it
 *   problematic when trying to calculate the sprite's width/height for Action
 *   Sequences and the like. These notetags allow you to assign a width and
 *   height value to the sprite, despite the fact the Dragonbones armatures
 *   have no such thing.
 * - Replace 'width', 'height', or 'x' with number values representing the
 *   dimension values in pixels.
 * - Use the 1st notetag to assign values to both Width and Height.
 * - Use the 2nd/3rd notetags to assign Width and Height values separately.
 * - If these notetags aren't used, then use the values defined by default in
 *   Plugin Parameters => Battler Settings => Default => Width/Height.
 *
 * Examples:
 *
 * <Dragonbones Battler Size: 50, 100>
 *
 * <Dragonbones Battler Width: 50>
 * <Dragonbones Battler Height: 100>
 *
 * ---
 *
 * <Dragonbones Battler Time Scale: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Lets you adjust the time scale for the Dragonbones armature.
 * - Replace 'x' with a number value depicting how fast the armature should
 *   animate.
 *   - 1.0 is the default value.
 *   - Higher numbers animate faster.
 *   - Lower numbers animate slower.
 *   - If a number is too small, it may not animate at all.
 *
 * Example:
 *
 * <Dragonbones Battler Time Scale: 1.5>
 *
 * ---
 *
 * <Dragonbones Battler Motion Walk: animation>
 * <Dragonbones Battler Motion Wait: animation>
 * <Dragonbones Battler Motion Chant: animation>
 * <Dragonbones Battler Motion Guard: animation>
 * <Dragonbones Battler Motion Damage: animation>
 * <Dragonbones Battler Motion Evade: animation>
 * <Dragonbones Battler Motion Thrust: animation>
 * <Dragonbones Battler Motion Swing: animation>
 * <Dragonbones Battler Motion Missile: animation>
 * <Dragonbones Battler Motion Skill: animation>
 * <Dragonbones Battler Motion Spell: animation>
 * <Dragonbones Battler Motion Item: animation>
 * <Dragonbones Battler Motion Escape: animation>
 * <Dragonbones Battler Motion Victory: animation>
 * <Dragonbones Battler Motion Dying: animation>
 * <Dragonbones Battler Motion Abnormal: animation>
 * <Dragonbones Battler Motion Sleep: animation>
 * <Dragonbones Battler Motion Dead: animation>
 *
 * - Used for: Actor, Enemy Notetags
 * - Use these notetags to assign Dragonbones animations to play when the
 *   actor/enemy sprite is supposed to play such a motion.
 * - Replace 'animation' with the name of the Dragonbones animation.
 * - If this notetag is not used, when such a motion is rquested, it will
 *   default to attempting to play the animation name equal to the motion.
 * - Animation names do not need to be case sensitive.
 * - If no animation is found, then no animation will be played.
 *
 * Examples:
 *
 * <Dragonbones Battler Motion Wait: idle>
 * <Dragonbones Battler Motion Swing: attack>
 * <Dragonbones Battler Motion Thrust: attack>
 * <Dragonbones Battler Motion Missle: attack>
 * <Dragonbones Battler Motion Skill: special>
 * <Dragonbones Battler Motion Spell: special>
 * <Dragonbones Battler Motion Dead: defeated>
 *
 * ---
 *
 * <Dragonbones Battler Settings>
 *  Battler: filename
 *  
 *  Scale: x, y
 *
 *  Scale X: x
 *  Scale Y: x
 *
 *  Offset: x, y
 *
 *  Offset X: x
 *  Offset Y: x
 *
 *  Size: width, height
 *
 *  Width: x
 *  Height: x
 *
 *  Time Scale: x
 *
 *  Motion Walk: animation
 *  Motion Wait: animation
 *  Motion Chant: animation
 *  Motion Guard: animation
 *  Motion Damage: animation
 *  Motion Evade: animation
 *  Motion Thrust: animation
 *  Motion Swing: animation
 *  Motion Missile: animation
 *  Motion Skill: animation
 *  Motion Spell: animation
 *  Motion Item: animation
 *  Motion Escape: animation
 *  Motion Victory: animation
 *  Motion Dying: animation
 *  Motion Abnormal: animation
 *  Motion Sleep: animation
 *  Motion Dead: animation
 * </Dragonbones Battler Settings>
 *
 * - Used for: Actor, Enemy Notetags
 * - The above notetag allows to wrap up all the information you'd like to
 *   set for Dragonbones battler armatures needed inside a single notetag
 *   container.
 * - The settings are the same as the notetags listed above it.
 * - You may remove the settings you don't wish to change.
 * - The only necessary data is the 'Battler: filename' line.
 *
 * Example:
 *
 * <Dragonbones Battler Settings>
 *  Battler: Demon
 *  
 *  Scale: 0.3, 0.3
 *
 *  Size: 80, 80
 *
 *  Motion Wait: idle
 *  Motion Damage: hit
 *  Motion Swing: attack
 *  Motion Thrust: attack
 *  Motion Missile: attack
 *  Motion Skill: special
 *  Motion spell: special
 *  Motion Dead: defeated
 * </Dragonbones Battler Settings>
 *
 * ---
 *
 * === Dragonbones Map Sprite Notetags & Comment Tags ===
 *
 * You can also use Dragonbones armatures as map sprites. When used, any of the
 * original sprites before will become invisible and will be replaced with the
 * Dragonbones armature.
 *
 * These notetags can be used for actors and events. In the case of events,
 * both notetags and comment tags can be used to determine what settings to use
 * for the Dragonbones armatures.
 *
 * Be cautious when using Comment Tags for event pages since comments contain a
 * maximum line count of 6.
 *
 * ---
 *
 * <Dragonbones Sprite: filename>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Sets the DragonBones associated with this map sprite to be 'filename'.
 * - The name will be associated with the assets used.
 * - It will be used to check for associated filenames that end with _ske.json,
 *   _tex.json, and _tex.png.
 * - The listed assets must be found in the assigned assets folder.
 *
 * Examples:
 *
 * <Dragonbones Sprite: Demon>
 * <Dragonbones Sprite: DragonBoy>
 * <Dragonbones Sprite: Swordsman>
 * <Dragonbones Sprite: Ubbie>
 *
 * ---
 *
 * <Dragonbones Sprite Scale: x, y>
 *
 * <Dragonbones Sprite Scale X: x>
 * <Dragonbones Sprite Scale Y: x>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Sets the base scale for the Dragonbones associated with this map sprite.
 *   This is for those instances where a Dragonbones armature is too large or
 *   small and needs to be scaled down/up.
 * - This scale will be amplified by the character's sprite's scale value.
 * - Use the 1st notetag to assign values to both Scale X and Scale Y.
 * - Use the 2nd/3rd notetags to assign Scale X and Y values separately.
 * - Use negative values to flip the Dragonbones armature around.
 *
 * Examples:
 * 
 * <Dragonbones Sprite Scale: -0.3, 0.3>
 *
 * <Dragonbones Sprite Scale X: -0.3>
 * <Dragonbones Sprite Scale Y: 0.3>
 *
 * ---
 *
 * <Dragonbones Sprite Offset: x, y>
 *
 * <Dragonbones Sprite Offset X: x>
 * <Dragonbones Sprite Offset Y: x>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - When a Dragonbones armature is attached to an character's map sprite, it
 *   will always be attached at the root point assigned within the Dragonbones
 *   data. If a Dragonbones armature has a root point that does not fit well
 *   with your battler sprite, you can offset it using these notetags.
 * - Replace 'x' and 'y' with number values representing how many pixels you
 *   want to offset the Dragonbones armature by.
 * - Use the 1st notetag to assign values to both Offset X and Offset Y.
 * - Use the 2nd/3rd notetags to assign Offset X and Y values separately.
 * - Use negative values to offset to the left (X) or up (Y) directions.
 *
 * Examples:
 *
 * <Dragonbones Sprite Offset: -10, 5>
 *
 * <Dragonbones Sprite Offset X: -10>
 * <Dragonbones Sprite Offset Y: 5>
 *
 * ---
 *
 * <Dragonbones Sprite Time Scale: x>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Lets you adjust the time scale for the Dragonbones armature.
 * - Replace 'x' with a number value depicting how fast the armature should
 *   animate.
 *   - 1.0 is the default value.
 *   - Higher numbers animate faster.
 *   - Lower numbers animate slower.
 *   - If a number is too small, it may not animate at all.
 *
 * Example:
 *
 * <Dragonbones Sprite Time Scale: 1.5>
 *
 * ---
 *
 * <Dragonbones Sprite Size: width, height>
 *
 * <Dragonbones Sprite Width: x>
 * <Dragonbones Sprite Height: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Dragonbones armatures have no standard width or height. This makes it
 *   problematic when trying to calculate the sprite's width/height for various
 *   plugins that use it. These notetags allow you to assign a width and
 *   height value to the sprite, despite the fact the Dragonbones armatures
 *   have no such thing.
 * - Replace 'width', 'height', or 'x' with number values representing the
 *   dimension values in pixels.
 * - Use the 1st notetag to assign values to both Width and Height.
 * - Use the 2nd/3rd notetags to assign Width and Height values separately.
 * - If these notetags aren't used, then use the values defined by default in
 *   the Plugin Parameters.
 *
 * Examples:
 *
 * <Dragonbones Sprite Size: 48, 64>
 *
 * <Dragonbones Sprite Width: 48>
 * <Dragonbones Sprite Height: 64>
 *
 * ---
 *
 * <Dragonbones Sprite Flip Left>
 * <Dragonbones Sprite Flip Right>
 *
 * <Dragonbones Sprite No Flip Left>
 * <Dragonbones Sprite No Flip Right>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Lets the map sprite know to flip itself when facing either the left/right
 *   directions in order to reuse animations.
 * - The 'No' variants will prevent flipping from occuring.
 * - These notetags will override settings applied in the Plugin Parameters.
 *
 * ---
 *
 * <Dragonbones Sprite Motion Idle: animation>
 * <Dragonbones Sprite Motion Walk: animation>
 * <Dragonbones Sprite Motion Dash: animation>
 * <Dragonbones Sprite Motion Jump: animation>
 * <Dragonbones Sprite Motion LadderIdle: animation>
 * <Dragonbones Sprite Motion LadderClimb: animation>
 * <Dragonbones Sprite Motion RopeIdle: animation>
 * <Dragonbones Sprite Motion RopeClimb: animation>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - Lets you set specific animations different from the ones listed in the
 *   Plugin Parameters for specific motions.
 * - Replace 'animation' with the name of the Dragonbones animation.
 * - If this notetag is not used, when such a motion is rquested, it will
 *   default to attempting to play the animation name equal to the motion.
 * - Animation names do not need to be case sensitive.
 * - If no animation is found, then no animation will be played.
 *
 * Example:
 *
 * <Dragonbones Sprite Motion Idle: stand>
 * <Dragonbones Sprite Motion Walk: move>
 * <Dragonbones Sprite Motion Dash: run>
 * <Dragonbones Sprite Motion Jump: hop>
 *
 * ---
 *
 * <Dragonbones Sprite Settings>
 *  Filename: filename
 *
 *  Scale: x, y
 *
 *  Scale X: x
 *  Scale Y: x
 *
 *  Offset: x, y
 *
 *  Offset X: x
 *  Offset Y: x
 *
 *  Time Scale: x
 *
 *  Width: x
 *  Height: x
 *
 *  Flip Left
 *  Flip Right
 *
 *  No Flip Left
 *  No Flip Right
 *
 *  Motion Idle: animation
 *  Motion Walk: animation
 *  Motion Dash: animation
 *  Motion Jump: animation
 *  Motion LadderIdle: animation
 *  Motion LadderClimb: animation
 *  Motion RopeIdle: animation
 *  Motion RopeClimb: animation
 * </Dragonbones Sprite Settings>
 *
 * - Used for: Actor, Event Notetags and Event Page Comment Tags
 * - The above notetag allows to wrap up all the information you'd like to
 *   set for Dragonbones battler armatures needed inside a single notetag
 *   container.
 * - The settings are the same as the notetags listed above it.
 * - You may remove the settings you don't wish to change.
 * - The only necessary data is the 'Filename: filename' line.
 *
 * Example:
 *
 * <Dragonbones Sprite Settings>
 *  Filename: Ubbie
 *
 *  Scale: 0.1, 0.1
 *
 *  Flip Right
 *
 *  Motion Idle: stand
 *  Motion Walk: walk
 * </Dragonbones Sprite Settings>
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
 * === Battler Plugin Commands ===
 * 
 * ---
 *
 * Battler: Actor Change Settings
 * - Change target actor's Dragonbones armature settings for battle.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *     Filename:
 *     - Change the armature's filename.
 *
 *     Offset X:
 *     - Change the armature's Offset X value.
 *
 *     Offset Y:
 *     - Change the armature's Offset Y value.
 *
 *     Scale X:
 *     - Change the armature's Scale X value.
 * 
 *     Scale Y:
 *     - Change the armature's Scale Y value.
 *
 *     Time Scale:
 *     - Change the armature's Time Scale value.
 *
 *     Width:
 *     - Change the battler width size.
 *
 *     Height:
 *     - Change the battler height size.
 *
 *   Motion Settings:
 *
 *     Walk:
 *     Wait:
 *     Chant:
 *     Guard:
 *     Damage:
 *     Evade:
 *     Thrust:
 *     Swing:
 *     Missile:
 *     Skill:
 *     Spell:
 *     Item:
 *     Escape:
 *     Victory:
 *     Dying:
 *     Abnormal:
 *     Sleep:
 *     Dead:
 *     - Change the animation used for this motion.
 *
 * ---
 * 
 * === Map Sprite Plugin Commands ===
 * 
 * ---
 *
 * Map Sprite: Actor Change Settings
 * - Change target actor's Dragonbones armature settings for map sprites.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *     Filename:
 *     - Change the armature's filename.
 *
 *     Offset X:
 *     - Change the armature's Offset X value.
 *
 *     Offset Y:
 *     - Change the armature's Offset Y value.
 *
 *     Scale X:
 *     - Change the armature's Scale X value.
 * 
 *     Scale Y:
 *     - Change the armature's Scale Y value.
 *
 *     Time Scale:
 *     - Change the armature's Time Scale value.
 *
 *     Width:
 *     - Change the battler width size.
 *
 *     Height:
 *     - Change the battler height size.
 *
 *   Flip Settings:
 *
 *     Flip Left?:
 *     Flip Right:
 *     - Flip the scale x value when facing left/right-ward directions?
 *
 *   Motion Settings:
 *
 *     Idle:
 *     Walk:
 *     Dash:
 *     Jump:
 *     Ladder (Idle):
 *     Ladder (Climb):
 *     Rope (Idle):
 *     Rope (Climb):
 *     - Base rope climbing animation name used.
 *
 * ---
 *
 * Map Sprite: Actor Play Animation
 * - Target actor plays a custom Dragonbones animation.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *   Play Animation:
 *   - Play this animation.
 *
 * NOTE: An alternative to this is to put the following code inside of a
 *       Movement Route's script call:
 *
 *       this.dragonbonesAnimation = "AnimationName";
 *
 *       Replace 'AnimationName' (keep the quotes) with the name of the
 *       Dragonbones animation.
 *
 * ---
 *
 * Map Sprite: Actor Stop Animation
 * - Stops a target actor's custom Dragonbones animation.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 * ---
 *
 * Map Sprite: Event Play Animation
 * - Target event plays a custom Dragonbones animation.
 *
 *   Event ID:
 *   - Select which Event ID to affect.
 *
 *   Play Animation:
 *   - Play this animation.
 *
 * ---
 *
 * Map Sprite: Event Stop Animation
 * - Stops a target event's custom Dragonbones animation.
 *
 *   Event ID:
 *   - Select which Event ID to affect.
 *
 * ---
 *
 * Map Sprite: Follower Play Animation
 * - Target follower plays a custom Dragonbones animation.
 *
 *   Follower Index:
 *   - Select which Follower Index to affect.
 *
 *   Play Animation:
 *   - Play this animation.
 *
 * ---
 *
 * Map Sprite: Follower Stop Animation
 * - Stops a target follower's custom Dragonbones animation.
 *
 *   Follower ID:
 *   - Select which Follower Index to affect.
 *
 * ---
 *
 * Map Sprite: Player Play Animation
 * - Player plays a custom Dragonbones animation.
 *
 *   Play Animation:
 *   - Play this animation.
 *
 * ---
 *
 * Map Sprite: Player Stop Animation
 * - Stops player's custom Dragonbones animation.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 *
 * Picture: Dragonbones Setup
 * - Setup a Dragonbones armature for a picture.
 *
 *   Picture ID:
 *   - Select which Picture ID(s) to give a Dragonbones armature.
 *
 *   Armature Filename:
 *   - What is the armature's filename?
 *
 *   Play Animation:
 *   - Play this animation once it starts.
 *
 *   Offset: X:
 *   - Default X offset value for this Dragonbones armature.
 *
 *   Offset: Y:
 *   - Default Y offset value for this Dragonbones armature.
 *
 *   Scale: X:
 *   - Default X scaling for this Dragonbones armature.
 *   - This will be amplified by the picture's scaling value.
 *
 *   Scale: Y:
 *   - Default Y scaling for this Dragonbones armature.
 *   - This will be amplified by the picture's scaling value.
 *
 *   Time Scale:
 *   - Default time scale for this Dragonbones armature.
 *   - Higher values play faster. Lower values play slower.
 *
 * ---
 *
 * Picture: Play Dragonbones Animation
 * - Make an existing Dragonbones armature attached to a picture play
 *   an animation.
 *
 *   Picture ID:
 *   - Select which Picture ID to modify.
 *
 *   Play Animation:
 *   - Play this animation.
 *
 * ---
 *
 * Picture: Offset Dragonbones
 * - Offset the X, Y attachment point of the Dragonbones armature.
 *
 *   Picture ID:
 *   - Select which Picture ID to modify.
 *
 *   Offset: X:
 *   - X offset value for this Dragonbones armature.
 *
 *   Offset: Y:
 *   - Y offset value for this Dragonbones armature.
 *
 * ---
 *
 * Picture: Scale Dragonbones
 * - Change the scaling values of the Dragonbones armature.
 *
 *   Picture ID:
 *   - Select which Picture ID to modify.
 *
 *   Scale: X:
 *   - X scaling for this Dragonbones armature.
 *   - This will be amplified by the picture's scaling value.
 *
 *   Scale: Y:
 *   - Y scaling for this Dragonbones armature.
 *   - This will be amplified by the picture's scaling value.
 *
 * ---
 *
 * Picture: Time Scale Dragonbones
 * - Change the speed at which Dragonbones animations play.
 *
 *   Picture ID:
 *   - Select which Picture ID to modify.
 *
 *   Time Scale:
 *   - Time scale for this Dragonbones armature.
 *   - Higher values play faster. Lower values play slower.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are the general settings that apply to all uses of Dragonbones through
 * this plugin. While the majority of these can remain unchanged, for those who
 * wish to customize the nature of the plugin to their liking can do so through
 * these Plugin Parameters.
 *
 * ---
 *
 * Assets Path
 * - The filepath to the directory that houses all the Dragonbone files.
 *
 * ---
 *
 * Defaults
 * 
 *   Loaded Animation:
 *   - The default animation to play once a Dragonbones armature is loaded.
 * 
 *   Looping Animations:
 *   - Force these animations to become looping animations even if they don't
 *     loop in Dragonbones.
 *
 * ---
 *
 * Skeletal Data
 * Texture Data
 * Texture Asset
 * 
 *   Key:
 *   - Key used to determine where needed data is stored.
 * 
 *   Extension:
 *   - Extension used to determine which files contain needed data.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battler Settings
 * ============================================================================
 *
 * Actor and Enemy sprites can have Dragonbones armatures attached to them as
 * sprites. Use these settings to make the Dragonbones armatures fit your needs
 * in battle.
 *
 * ---
 *
 * Default Settings
 * 
 *   Offset: X:
 *   - Default X offset for battler sprites.
 * 
 *   Offset: Y:
 *   - Default Y offset for battler sprites.
 * 
 *   Scale: X:
 *   - Default scale for X used by Dragonbones battlers.
 * 
 *     Flip for Actors?:
 *     Flip for Enemies?:
 *     - Flip the scale x value into negative automatically for all actors
 *       or enemies?
 * 
 *   Scale: Y:
 *   - Default scale for Y used by Dragonbones battlers.
 * 
 *   Width:
 *   - Treat battler sprites as if they have this width.
 *   - Used for Action Sequences.
 * 
 *   Height:
 *   - Treat battler sprites as if they have this height.
 *   - Used for Action Sequences.
 *
 * ---
 *
 * Default Motions
 * 
 *   Walk:
 *   Wait:
 *   Chant:
 *   Guard:
 *   Damage:
 *   Evade:
 *   Thrust:
 *   Swing:
 *   Missile:
 *   Skill:
 *   Spell:
 *   Item:
 *   Escape:
 *   Victory:
 *   Dying:
 *   Abnormal:
 *   Sleep:
 *   Dead:
 *   - Play this Dragonbones animation whenever this motion is requested
 *     by default.
 *   - Used for Action Sequences.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Map Sprite Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust the default configurations for any
 * map sprite that's using a Dragonbones armature. These settings can be
 * overwritten on per a sprite basis using notetags and comment tags, too.
 *
 * ---
 *
 * Defaults
 * 
 *   Offset: X:
 *   - Default X offset for map sprites.
 * 
 *   Offset: Y:
 *   - Default Y offset for map sprites.
 * 
 *   Scale: X:
 *   - Default scale for X used by Dragonbones map sprites.
 * 
 *     Flip Left?:
 *     Flip Right?:
 *     - Flip the scale x value when facing left/right-ward directions?
 * 
 *   Scale: Y:
 *   - Default scale for Y used by Dragonbones map sprites.
 * 
 *   Time Scale:
 *   - The rate at which animations play.
 *   - Higher numbers go faster.
 * 
 *   Width:
 *   - Treat map sprites as if they have this width.
 *   - Used for various plugins.
 * 
 *   Height:
 *   - Treat map sprites as if they have this height.
 *   - Used for various plugins.
 *
 * ---
 *
 * Motion Settings
 * 
 *   Idle:
 *   Walk:
 *   Dash:
 *   Jump:
 *   Ladder (Idle):
 *   Ladder (Climb):
 *   Rope (Idle):
 *   Rope (Climb):
 *   - Base walk animation name used.
 * 
 *   Walk Timer:
 *   - Number of frames to count as walking so that an idle animation isn't
 *     immediately forced upon stopping.
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
 *
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * Special Thanks To
 * 
 * - Green Kel
 * - Ækashics
 * - Swift Illusion
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.02: September 6, 2020
 * * Bug Fixes!
 * ** Previously, a Dragonbones battler does not show the blinking indicator if
 *    the battler is a selected target. This is now fixed. Fix made by Yanfly.
 * ** Prevents a crash now if no bitmap is detected for the main sprite.
 * 
 * Version 1.01: August 30, 2020
 * * Bug Fixes!
 * ** Erasing a picture no longer causes a crash when changing scenes. Fix made
 *    by Yanfly.
 * * Compatibility Update
 * ** Added compatibility for VisuStella MZ's Visual State Effects.
 *
 * Version 1.00: August 24, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Battler_ActorChange
 * @text Battler: Actor Change Settings
 * @desc Change target actor's Dragonbones armature settings for battle.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Filename:str
 * @text Filename
 * @parent ActorID:num
 * @desc Change the armature's filename.
 * @default name
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @parent ActorID:num
 * @desc Change the armature's Offset X value.
 * @default 0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent ActorID:num
 * @desc Change the armature's Offset Y value.
 * @default 0
 *
 * @arg ScaleX:eval
 * @text Scale X
 * @parent ActorID:num
 * @desc Change the armature's Scale X value.
 * @default 1.0
 *
 * @arg ScaleY:eval
 * @text Scale Y
 * @parent ActorID:num
 * @desc Change the armature's Scale Y value.
 * @default 1.0
 *
 * @arg TimeScale:eval
 * @text Time Scale
 * @parent ActorID:num
 * @desc Change the armature's Time Scale value.
 * @default 1.0
 *
 * @arg Width:eval
 * @text Width
 * @parent ActorID:num
 * @desc Change the battler width size.
 * @default 64
 *
 * @arg Height:eval
 * @text Height
 * @parent ActorID:num
 * @desc Change the battler height size.
 * @default 64
 *
 * @arg DefaultMotions
 * @text Motion Settings
 *
 * @arg MotionWalk:str
 * @text Walk
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default walk
 *
 * @arg MotionWait:str
 * @text Wait
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default wait
 *
 * @arg MotionChant:str
 * @text Chant
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default chant
 *
 * @arg MotionGuard:str
 * @text Guard
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default guard
 *
 * @arg MotionDamage:str
 * @text Damage
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default damage
 *
 * @arg MotionEvade:str
 * @text Evade
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default evade
 *
 * @arg MotionThrust:str
 * @text Thrust
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default thrust
 *
 * @arg MotionSwing:str
 * @text Swing
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default swing
 *
 * @arg MotionMissile:str
 * @text Missile
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default missile
 *
 * @arg MotionSkill:str
 * @text Skill
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default skill
 *
 * @arg MotionSpell:str
 * @text Spell
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default spell
 *
 * @arg MotionItem:str
 * @text Item
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default item
 *
 * @arg MotionEscape:str
 * @text Escape
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default escape
 *
 * @arg MotionVictory:str
 * @text Victory
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default victory
 *
 * @arg MotionDying:str
 * @text Dying
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default dying
 *
 * @arg MotionAbnormal:str
 * @text Abnormal
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default abnormal
 *
 * @arg MotionSleep:str
 * @text Sleep
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default sleep
 *
 * @arg MotionDead:str
 * @text Dead
 * @parent DefaultMotions
 * @desc Change the animation used for this motion.
 * @default dead
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_ActorChange
 * @text Map Sprite: Actor Change Settings
 * @desc Change target actor's Dragonbones armature settings for map sprites.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Filename:str
 * @text Filename
 * @parent ActorID:num
 * @desc Change the armature's filename.
 * @default name
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @parent ActorID:num
 * @desc Change the armature's Offset X value.
 * @default 0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @parent ActorID:num
 * @desc Change the armature's Offset Y value.
 * @default 0
 *
 * @arg ScaleX:eval
 * @text Scale X
 * @parent ActorID:num
 * @desc Change the armature's Scale X value.
 * @default 0.5
 *
 * @arg ScaleY:eval
 * @text Scale Y
 * @parent ActorID:num
 * @desc Change the armature's Scale Y value.
 * @default 0.5
 *
 * @arg TimeScale:eval
 * @text Time Scale
 * @parent ActorID:num
 * @desc Change the armature's Time Scale value.
 * @default 1.0
 *
 * @arg Width:eval
 * @text Width
 * @parent ActorID:num
 * @desc Change the armature's width value.
 * @default 48
 *
 * @arg Height:eval
 * @text Height
 * @parent ActorID:num
 * @desc Change the armature's height.
 * @default 48
 *
 * @arg FlipSettings
 * @text Flip Settings
 *
 * @arg FlipLeft:eval
 * @text Flip Left?
 * @parent FlipSettings
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value when facing left-ward directions?
 * @default false
 *
 * @arg FlipRight:eval
 * @text Flip Right?
 * @parent FlipSettings
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value when facing right-ward directions?
 * animation is found?
 * @default false
 *
 * @arg Animations
 * @text Motion Settings
 *
 * @arg Idle:str
 * @text Idle
 * @parent Animations
 * @desc Base idle animation name used.
 * @default idle
 *
 * @arg Walk:str
 * @text Walk
 * @parent Animations
 * @desc Base walk animation name used.
 * @default walk
 *
 * @arg Dash:str
 * @text Dash
 * @parent Animations
 * @desc Base dash animation name used.
 * @default dash
 *
 * @arg Jump:str
 * @text Jump
 * @parent Animations
 * @desc Base jump animation name used.
 * @default jump
 *
 * @arg LadderIdle:str
 * @text Ladder (Idle)
 * @parent Animations
 * @desc Base ladder idle animation name used.
 * @default ladderidle
 *
 * @arg LadderClimb:str
 * @text Ladder (Climb)
 * @parent Animations
 * @desc Base ladder climbing animation name used.
 * @default ladderclimb
 *
 * @arg RopeIdle:str
 * @text Rope (Idle)
 * @parent Animations
 * @desc Base rope idle animation name used.
 * @default ropeidle
 *
 * @arg RopeClimb:str
 * @text Rope (Climb)
 * @parent Animations
 * @desc Base rope climbing animation name used.
 * @default ropecllmb
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_ActorAnimationPlay
 * @text Map Sprite: Actor Play Animation
 * @desc Target actor plays a custom Dragonbones animation.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_ActorAnimationStop
 * @text Map Sprite: Actor Stop Animation
 * @desc Stops a target actor's custom Dragonbones animation.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_EventAnimationPlay
 * @text Map Sprite: Event Play Animation
 * @desc Target event plays a custom Dragonbones animation.
 *
 * @arg EventID:eval
 * @text Event ID
 * @desc Select which Event ID to affect.
 * @default 1
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_EventAnimationStop
 * @text Map Sprite: Event Stop Animation
 * @desc Stops a target event's custom Dragonbones animation.
 *
 * @arg EventID:eval
 * @text Event ID
 * @desc Select which Event ID to affect.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_FollowerAnimationPlay
 * @text Map Sprite: Follower Play Animation
 * @desc Target follower plays a custom Dragonbones animation.
 *
 * @arg FollowerIndex:eval
 * @text Follower Index
 * @desc Select which Follower Index to affect.
 * @default 0
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_FollowerAnimationStop
 * @text Map Sprite: Follower Stop Animation
 * @desc Stops a target follower's custom Dragonbones animation.
 *
 * @arg FollowerIndex:eval
 * @text Follower ID
 * @desc Select which Follower Index to affect.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_PlayerAnimationPlay
 * @text Map Sprite: Player Play Animation
 * @desc Player plays a custom Dragonbones animation.
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapSprite_PlayerAnimationStop
 * @text Map Sprite: Player Stop Animation
 * @desc Stops player's custom Dragonbones animation.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_SetupDragonbones
 * @text Picture: Dragonbones Setup
 * @desc Setup a Dragonbones armature for a picture.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID(s) to give a Dragonbones armature.
 * @default 1
 *
 * @arg Filename:str
 * @text Armature Filename
 * @desc What is the armature's filename?
 * @default Untitled
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation once it starts.
 * @default Idle
 *
 * @arg OffsetX:eval
 * @text Offset: X
 * @desc Default X offset value for this Dragonbones armature.
 * @default 0
 *
 * @arg OffsetY:eval
 * @text Offset: Y
 * @desc Default Y offset value for this Dragonbones armature.
 * @default 0
 *
 * @arg ScaleX:eval
 * @text Scale: X
 * @desc Default X scaling for this Dragonbones armature.
 * This will be amplified by the picture's scaling value.
 * @default 1.0
 *
 * @arg ScaleY:eval
 * @text Scale: Y
 * @desc Default Y scaling for this Dragonbones armature.
 * This will be amplified by the picture's scaling value.
 * @default 1.0
 *
 * @arg TimeScale:eval
 * @text Time Scale
 * @desc Default time scale for this Dragonbones armature.
 * Higher values play faster. Lower values play slower.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_DragonbonesAnimation
 * @text Picture: Play Dragonbones Animation
 * @desc Make an existing Dragonbones armature attached to a picture play an animation.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID to modify.
 * @default 1
 *
 * @arg Animation:str
 * @text Play Animation
 * @desc Play this animation.
 * @default Idle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_DragonbonesOffset
 * @text Picture: Offset Dragonbones
 * @desc Offset the X, Y attachment point of the Dragonbones armature.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID to modify.
 * @default 1
 *
 * @arg OffsetX:eval
 * @text Offset: X
 * @desc X offset value for this Dragonbones armature.
 * @default 0
 *
 * @arg OffsetY:eval
 * @text Offset: Y
 * @desc Y offset value for this Dragonbones armature.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_ScaleDragonbones
 * @text Picture: Scale Dragonbones
 * @desc Change the scaling values of the Dragonbones armature.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID to modify.
 * @default 1
 *
 * @arg ScaleX:eval
 * @text Scale: X
 * @desc X scaling for this Dragonbones armature.
 * This will be amplified by the picture's scaling value.
 * @default 1.0
 *
 * @arg ScaleY:eval
 * @text Scale: Y
 * @desc Y scaling for this Dragonbones armature.
 * This will be amplified by the picture's scaling value.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Picture_TimeScaleDragonbones
 * @text Picture: Time Scale Dragonbones
 * @desc Change the speed at which Dragonbones animations play.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID to modify.
 * @default 1
 *
 * @arg TimeScale:eval
 * @text Time Scale
 * @desc Default time scale for this Dragonbones armature.
 * Higher values play faster. Lower values play slower.
 * @default 1.0
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
 * @param DragonbonesUnion
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param AssetsPath:str
 * @text Assets Path
 * @desc The filepath to the directory that houses all the Dragonbone files.
 * @default ./dragonbones_assets/
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc A set of general settings pertaining to all uses of Dragonbones.
 * @default {"Defaults":"","LoadAnimation:str":"idle","LoopingAnimations:arraystr":"[\"idle\",\"walk\",\"wait\",\"chant\",\"guard\",\"dying\",\"abnormal\",\"sleep\",\"dash\",\"ladderidle\",\"ladderclimb\",\"ropeidle\",\"ropeclimb\"]","SkeletalData":"","SkeKey:str":"dbData","SkeExt:str":"_ske.json","TextureData":"","TexKey:str":"texData","TexExt:str":"_tex.json","TextureAsset":"","TxaKey:str":"texAsset","TxaExt:str":"_tex.png"}
 *
 * @param Battler:struct
 * @text Battler Settings
 * @type struct<Battler>
 * @desc A set of general settings pertaining to Dragonbones battlers.
 * @default {"Defaults":"","OffsetX:num":"0","OffsetY:num":"0","ScaleX:num":"1.0","FlipActors:eval":"false","FlipEnemies:eval":"false","ScaleY:num":"1.0","TimeScale:num":"1.0","Width:num":"64","Height:num":"64","DefaultMotions":"","MotionWalk:str":"walk","MotionWait:str":"wait","MotionChant:str":"chant","MotionGuard:str":"guard","MotionDamage:str":"damage","MotionEvade:str":"evade","MotionThrust:str":"thrust","MotionSwing:str":"swing","MotionMissile:str":"missile","MotionSkill:str":"skill","MotionSpell:str":"spell","MotionItem:str":"item","MotionEscape:str":"escape","MotionVictory:str":"victory","MotionDying:str":"dying","MotionAbnormal:str":"abnormal","MotionSleep:str":"sleep","MotionDead:str":"dead"}
 *
 * @param MapSprite:struct
 * @text Map Sprite Settings
 * @type struct<MapSprite>
 * @desc A set of general settings pertaining to Dragonbones map sprites.
 * @default {"Defaults":"","OffsetX:num":"0","OffsetY:num":"0","ScaleX:num":"0.5","FlipLeft:eval":"false","FlipRight:eval":"false","ScaleY:num":"0.5","TimeScale:num":"1.0","Width:num":"48","Height:num":"48","Animations":"","Idle:str":"idle","Walk:str":"walk","WalkTimer:num":"2","Dash:str":"dash","Jump:str":"jump","LadderIdle:str":"ladderidle","LadderClimb:str":"ladderclimb","RopeIdle:str":"ropeidle","RopeClimb:str":"ropecllmb"}
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
 * @param Defaults
 *
 * @param LoadAnimation:str
 * @text Loaded Animation
 * @parent Defaults
 * @desc The default animation to play once a Dragonbones armature is loaded.
 * @default idle
 *
 * @param LoopingAnimations:arraystr
 * @text Looping Animations
 * @parent Defaults
 * @type string[]
 * @desc Force these animations to become looping animations even if they don't loop in Dragonbones.
 * @default ["idle","walk","wait","chant","guard","dying","abnormal","sleep","dash","ladderidle","ladderclimb","ropeidle","ropeclimb"]
 *
 * @param SkeletalData
 * @text Skeletal Data
 *
 * @param SkeKey:str
 * @text Key
 * @parent SkeletalData
 * @desc Key used to determine where skeletal data is stored.
 * @default dbData
 *
 * @param SkeExt:str
 * @text Extension
 * @parent SkeletalData
 * @desc Extension used to determine which files contain skeletal data.
 * @default _ske.json
 *
 * @param TextureData
 * @text Texture Data
 *
 * @param TexKey:str
 * @text Key
 * @parent TextureData
 * @desc Key used to determine where texture data is stored.
 * @default texData
 *
 * @param TexExt:str
 * @text Extension
 * @parent TextureData
 * @desc Extension used to determine which files contain texture data.
 * @default _tex.json
 *
 * @param TextureAsset
 * @text Texture Asset
 *
 * @param TxaKey:str
 * @text Key
 * @parent TextureAsset
 * @desc Key used to determine where texture assets are stored.
 * @default texAsset
 *
 * @param TxaExt:str
 * @text Extension
 * @parent TextureAsset
 * @desc Extension used to determine which files contain texture assets.
 * @default _tex.png
 *
 */
/* ----------------------------------------------------------------------------
 * Battler Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Battler:
 *
 * @param Defaults
 * @text Default Settings
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent Defaults
 * @desc Default X offset for battler sprites.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent Defaults
 * @desc Default Y offset for battler sprites.
 * @default 0
 *
 * @param ScaleX:num
 * @text Scale: X
 * @parent Defaults
 * @desc Default scale for X used by Dragonbones battlers.
 * @default 1.0
 *
 * @param FlipActors:eval
 * @text Flip for Actors?
 * @parent ScaleX:num
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value into negative automatically for all actors?
 * @default false
 *
 * @param FlipEnemies:eval
 * @text Flip for Enemies?
 * @parent ScaleX:num
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value into negative automatically for all enemies?
 * @default false
 *
 * @param ScaleY:num
 * @text Scale: Y
 * @parent Defaults
 * @desc Default scale for Y used by Dragonbones battlers.
 * @default 1.0
 *
 * @param TimeScale:num
 * @text Time Scale
 * @parent Defaults
 * @desc The rate at which animations play.
 * Higher numbers go faster.
 * @default 1.0
 *
 * @param Width:num
 * @text Width
 * @parent Defaults
 * @desc Treat battler sprites as if they have this width.
 * Used for Action Sequences.
 * @default 64
 *
 * @param Height:num
 * @text Height
 * @parent Defaults
 * @desc Treat battler sprites as if they have this height.
 * Used for Action Sequences.
 * @default 64
 *
 * @param DefaultMotions
 * @text Default Motions
 *
 * @param MotionWalk:str
 * @text Walk
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default walk
 *
 * @param MotionWait:str
 * @text Wait
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default wait
 *
 * @param MotionChant:str
 * @text Chant
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default chant
 *
 * @param MotionGuard:str
 * @text Guard
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default guard
 *
 * @param MotionDamage:str
 * @text Damage
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default damage
 *
 * @param MotionEvade:str
 * @text Evade
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default evade
 *
 * @param MotionThrust:str
 * @text Thrust
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default thrust
 *
 * @param MotionSwing:str
 * @text Swing
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default swing
 *
 * @param MotionMissile:str
 * @text Missile
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default missile
 *
 * @param MotionSkill:str
 * @text Skill
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default skill
 *
 * @param MotionSpell:str
 * @text Spell
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default spell
 *
 * @param MotionItem:str
 * @text Item
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default item
 *
 * @param MotionEscape:str
 * @text Escape
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default escape
 *
 * @param MotionVictory:str
 * @text Victory
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default victory
 *
 * @param MotionDying:str
 * @text Dying
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default dying
 *
 * @param MotionAbnormal:str
 * @text Abnormal
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default abnormal
 *
 * @param MotionSleep:str
 * @text Sleep
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default sleep
 *
 * @param MotionDead:str
 * @text Dead
 * @parent DefaultMotions
 * @desc Play this Dragonbones animation whenever this motion
 * is requested by default. Used for Action Sequences.
 * @default dead
 *
 */
/* ----------------------------------------------------------------------------
 * Map Sprite Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MapSprite:
 *
 * @param Defaults
 * @text Default Settings
 *
 * @param OffsetX:num
 * @text Offset: X
 * @parent Defaults
 * @desc Default X offset for map sprites.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset: Y
 * @parent Defaults
 * @desc Default Y offset for map sprites.
 * @default 0
 *
 * @param ScaleX:num
 * @text Scale: X
 * @parent Defaults
 * @desc Default scale for X used by Dragonbones map sprites.
 * @default 0.5
 *
 * @param FlipLeft:eval
 * @text Flip Left?
 * @parent ScaleX:num
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value when facing left-ward directions?
 * @default false
 *
 * @param FlipRight:eval
 * @text Flip Right?
 * @parent ScaleX:num
 * @type boolean
 * @on Flip
 * @off Normal
 * @desc Flip the scale x value when facing right-ward directions?
 * animation is found?
 * @default false
 *
 * @param ScaleY:num
 * @text Scale: Y
 * @parent Defaults
 * @desc Default scale for Y used by Dragonbones map sprites.
 * @default 0.5
 *
 * @param TimeScale:num
 * @text Time Scale
 * @parent Defaults
 * @desc The rate at which animations play.
 * Higher numbers go faster.
 * @default 1.0
 *
 * @param Width:num
 * @text Width
 * @parent Defaults
 * @desc Treat map sprites as if they have this width.
 * Used for various plugins.
 * @default 48
 *
 * @param Height:num
 * @text Height
 * @parent Defaults
 * @desc Treat map sprites as if they have this height.
 * Used for various plugins.
 * @default 48
 *
 * @param Animations
 * @text Motion Settings
 *
 * @param Idle:str
 * @text Idle
 * @parent Animations
 * @desc Base idle animation name used.
 * @default idle
 *
 * @param Walk:str
 * @text Walk
 * @parent Animations
 * @desc Base walk animation name used.
 * @default walk
 *
 * @param WalkTimer:num
 * @text Walk Timer
 * @parent Walk:str
 * @desc Number of frames to count as walking so that an idle animation isn't immediately forced upon stopping.
 * @default 2
 *
 * @param Dash:str
 * @text Dash
 * @parent Animations
 * @desc Base dash animation name used.
 * @default dash
 *
 * @param Jump:str
 * @text Jump
 * @parent Animations
 * @desc Base jump animation name used.
 * @default jump
 *
 * @param LadderIdle:str
 * @text Ladder (Idle)
 * @parent Animations
 * @desc Base ladder idle animation name used.
 * @default ladderidle
 *
 * @param LadderClimb:str
 * @text Ladder (Climb)
 * @parent Animations
 * @desc Base ladder climbing animation name used.
 * @default ladderclimb
 *
 * @param RopeIdle:str
 * @text Rope (Idle)
 * @parent Animations
 * @desc Base rope idle animation name used.
 * @default ropeidle
 *
 * @param RopeClimb:str
 * @text Rope (Climb)
 * @parent Animations
 * @desc Base rope climbing animation name used.
 * @default ropecllmb
 *
 */
//=============================================================================

const _0x4e9d=['bLRNF','qfWDu','removeChild','initDragonbonesData','_dragonbonesSpriteContainer','nXyIy','motion','event','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','length','MapSprite_FollowerAnimationStop','FSgyM','requestDragonbonesAnimation','TxaKey','JSON','GlhDv','MotionVictory','scale','JaKsT','ladderclimb','flipRight','map','stateMotionIndex','Game_Enemy_setup','nyHAO','wRNWx','MotionSpell','Game_Screen_erasePicture','MotionChant','SkeExt','currentDragonbonesAnimation','dead','Game_Enemy_performDamage','setupDragonbonesDataCommentTags','XFnGX','ScaleY','RopeIdle','plVvd','texture','performDamage','isUndecided','hpKge','AbSdr','FlipActors','mjoYy','Game_Enemy_performCollapse','General','terminate','MotionDying','Scene_Battle_terminate','followers','transform','oIpqi','MotionSleep','addChildAt','shift','hasDragonbones','escape','setup','isOnRope','This\x20is\x20a\x20static\x20class','playTimes','ddLyz','updateCharacterFrame','call','Vfgsw','STR','findPictureSprite','isCompleted','Game_Event_clearPageSettings','VisuMZ_1_EventsMoveCore','offsetY','MotionThrust','Sprite_Picture_update','victory','hStNo','initMembersDragonbonesUnion','_shadowSprite','_dragonbonesFilename','hasDragonbonesBattler','MotionAbnormal','toLowerCase','erasePictureDragonbonesUnion','isJumping','eYaEJ','walk','MapSprite_ActorAnimationPlay','round','_dragonbonesAnimation','isActor','dispose','guard','ARRAYFUNC','YsiXW','poujV','clearPageSettings','weAZf','xAIps','animationNames','animations','setBlendColor','mhtbC','name','DpAXD','_weaponSprite','follower','AssetsPath','FlipLeft','LiFHy','zwfrc','status','FUNC','_battler','fhoNQ','yJleR','dragonbonesData','FlipRight','concat','ScaleX','OLDPJ','max','playDragonbonesMotion','_battleAniSpeedLooping','BqMjX','isSceneBattle','_dragonbonesSpriteData','factory','findTargetSprite','scaleX','load','setupPageSettings','trim','uPoUB','updateDragonbones','data','offsetX','updateDragonbonesTimeScale','note','OffsetX','_pictures','test','Dkxej','parameters','updateDragonbonesArmature','Game_Actor_performCollapse','ckunE','updateDragonbonesAnimation','index','MotionDamage','ropeclimb','LoadAnimation','Loader','MbLnT','Sprite_Picture_initialize','createDefaultPicture','find','realPictureId','Settings','idle','_dragonbones','performCollapse','CiLTt','kImTG','adyjs','MotionGuard','NTwQB','VRbgc','BDOlH','MotionSwing','EventID','DwBAS','refresh','erasePicture','CEYlV','direction','uZkqk','uFhbp','exit','isChanting','wiPzH','_playtestF7Looping','FollowerIndex','WalkTimer','_dragonbonesData','CVqbl','isSkill','code','Sprite_Character_updateCharacterFrame','timeScale','children','playDragonbonesAnimation','loadArmature','version','MapSprite_EventAnimationStop','addChild','Game_Enemy_transform','Game_Player_refresh','loadComplete','Game_Battler_requestMotion','lastAnimationName','Picture_DragonbonesAnimation','Game_Actor_performAttack','MotionDead','ARRAYJSON','DclYe','isItem','loadNextArmature','ARRAYSTRUCT','requestMotionRefresh','actor','TrQcr','updateDragonbonesProperties','VquGj','dRIvh','format','registerCommand','MotionItem','PixiFactory','VisuMZ_1_BattleCore','isEnemy','testLoaded','initialize','Animation','parse','updateDragonbonesUnion','TxaExt','type','QMsDv','Dash','enemy','lastFileName','Game_Enemy_performAction','match','gxgWS','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','performActionMotions','updateBitmap','DnjsI','_stateSprite','buildArmatureDisplay','leader','isMagicSkill','LoopingAnimations','Height','performAction','setupDragonbonesDataNotetags','uAMBd','createBaseDragonbonesSprite','UyiOg','_dragonbonesMoveTimer','dragonbonesAnimation','isGuardWaiting','Jump','_scene','Sprite_Actor_initMembers','_selectionEffectCount','kcPtG','Syutk','ActorID','MotionMissile','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','constructor','uaMTX','jump','LoadQueue','XnWDH','Sprite_Actor_updateShadow','Battler','PictureID','_dragonbonesName','visible','Walk','height','CjMtZ','Width','update','updateShadow','dragonbonesSpriteData','parseTextureAtlasData','OffsetY','prysn','width','chant','testArmature','PEBEx','showPicture','Sprite_Character_initialize','VisuMZ_1_OptionsCore','ropeidle','_enemyId','MapSprite_PlayerAnimationStop','prepareNextLoadArmature','Filename','updateDragonbonesSelection','flipLeft','MapSprite_ActorChange','filename','wxeNw','onLoadDragonbones','cgEnp','JemMZ','_mainSprite','updateShadowDragonbonesUnion','isOnLadder','return\x200','Sprite_Actor_updateBitmap','qBwIx','_spriteset','cjapD','TexKey','attack','push','dNKom','MapSprite_PlayerAnimationPlay','MNxbK','uYohT','MapSprite','isSelected','ZWTGS','isGuard','picture','Sprite_Actor_startMotion','dragonbonesFlip','battler','UcRcL','Idle','lVYcg','scaleY','complete','processLoad','qggzW','ARRAYNUM','performAttack','WUyod','performDamageDragonbonesUnion','dying','play','addDragonbonesAnimationDirections','disposeDragonbones','sjHkC','Picture_SetupDragonbones','SchgI','prototype','Game_Event_setupPageSettings','MapSprite_ActorAnimationStop','Sprite_Enemy_initMembers','RopeClimb','TlNHC','ladderidle','zqniG','IiBDS','ARRAYSTR','_dragonbonesBattlerData','battlerSprites','MotionWait','DefaultAnimation','dash','checkDragonbonesStringTags','gWFZo','MotionEscape','tFprQ','MklDB','BMphp','updateCharacterFrameDragonbonesUnion','MotionSkill','abnormal','item','_dragonbonesFlipDirection','isActing','Game_Actor_setup','rVsnT','add','includes','Picture_TimeScaleDragonbones','_baseDragonbonesSprite','realMoveSpeed','iDtbp','kvFih','initMembers','TexExt','ConvertParams','Game_Battler_requestMotionRefresh','Game_Follower_refresh','isDashing','DRYdo','createArmature','LoadedFilenames','bPREI','requestMotion','defineProperty','setupDragonbonesData','shared','LadderIdle','runQueuedCallbacks','TimeScale','Sprite_Character_updateBitmap','sleep','wait','GdBGk','list','CallbackQueue','wbHvi','SkeKey','MotionWalk','filter','isInputting','Game_Picture_initialize','DragonbonesUnion','damage','_character','animation','Game_Actor_performDamage','LadderClimb','Sprite_Enemy_updateBitmap','performActionDragonbonesUnion','VisuMZ_0_CoreEngine','bind','FlipEnemies','qhQcJ','VuqFu','description','startMotion','isAttack','gRVzy','parseDragonBonesData','setupDragonbones','performCollapseDragonbonesUnion','YZcce','playDragonbonesIdleAnimation','FHLUl'];(function(_0x32cdcc,_0x4e9daf){const _0x128999=function(_0x561405){while(--_0x561405){_0x32cdcc['push'](_0x32cdcc['shift']());}};_0x128999(++_0x4e9daf);}(_0x4e9d,0x139));const _0x1289=function(_0x32cdcc,_0x4e9daf){_0x32cdcc=_0x32cdcc-0x0;let _0x128999=_0x4e9d[_0x32cdcc];return _0x128999;};var label=_0x1289('0x5e'),tier=tier||0x0,dependencies=['Dragonbones'],pluginData=$plugins[_0x1289('0x5b')](function(_0x373138){return _0x373138[_0x1289('0xe3')]&&_0x373138[_0x1289('0x6b')][_0x1289('0x3b')]('['+label+']');})[0x0];VisuMZ[label][_0x1289('0x112')]=VisuMZ[label][_0x1289('0x112')]||{},VisuMZ[_0x1289('0x43')]=function(_0x403084,_0x24017a){for(const _0x4ceb23 in _0x24017a){if('uqSNF'==='uqSNF'){if(_0x4ceb23['match'](/(.*):(.*)/i)){const _0xea3857=String(RegExp['$1']),_0x93a5ec=String(RegExp['$2'])['toUpperCase']()['trim']();let _0xb96b75,_0x3e0c7b,_0x604310;switch(_0x93a5ec){case'NUM':_0xb96b75=_0x24017a[_0x4ceb23]!==''?Number(_0x24017a[_0x4ceb23]):0x0;break;case _0x1289('0x12'):_0x3e0c7b=_0x24017a[_0x4ceb23]!==''?JSON['parse'](_0x24017a[_0x4ceb23]):[],_0xb96b75=_0x3e0c7b[_0x1289('0x8a')](_0x9e35f0=>Number(_0x9e35f0));break;case'EVAL':_0xb96b75=_0x24017a[_0x4ceb23]!==''?eval(_0x24017a[_0x4ceb23]):null;break;case'ARRAYEVAL':_0x3e0c7b=_0x24017a[_0x4ceb23]!==''?JSON[_0x1289('0x154')](_0x24017a[_0x4ceb23]):[],_0xb96b75=_0x3e0c7b[_0x1289('0x8a')](_0x2552f0=>eval(_0x2552f0));break;case _0x1289('0x83'):_0xb96b75=_0x24017a[_0x4ceb23]!==''?JSON[_0x1289('0x154')](_0x24017a[_0x4ceb23]):'';break;case _0x1289('0x140'):_0x3e0c7b=_0x24017a[_0x4ceb23]!==''?JSON[_0x1289('0x154')](_0x24017a[_0x4ceb23]):[],_0xb96b75=_0x3e0c7b[_0x1289('0x8a')](_0x297656=>JSON[_0x1289('0x154')](_0x297656));break;case _0x1289('0xe4'):_0xb96b75=_0x24017a[_0x4ceb23]!==''?new Function(JSON[_0x1289('0x154')](_0x24017a[_0x4ceb23])):new Function(_0x1289('0x1a5'));break;case _0x1289('0xd1'):_0x3e0c7b=_0x24017a[_0x4ceb23]!==''?JSON['parse'](_0x24017a[_0x4ceb23]):[],_0xb96b75=_0x3e0c7b[_0x1289('0x8a')](_0x2b1cf0=>new Function(JSON[_0x1289('0x154')](_0x2b1cf0)));break;case _0x1289('0xb7'):_0xb96b75=_0x24017a[_0x4ceb23]!==''?String(_0x24017a[_0x4ceb23]):'';break;case _0x1289('0x26'):_0x3e0c7b=_0x24017a[_0x4ceb23]!==''?JSON[_0x1289('0x154')](_0x24017a[_0x4ceb23]):[],_0xb96b75=_0x3e0c7b['map'](_0x39bbe7=>String(_0x39bbe7));break;case'STRUCT':_0x604310=_0x24017a[_0x4ceb23]!==''?JSON['parse'](_0x24017a[_0x4ceb23]):{},_0xb96b75=VisuMZ[_0x1289('0x43')]({},_0x604310);break;case _0x1289('0x144'):_0x3e0c7b=_0x24017a[_0x4ceb23]!==''?JSON[_0x1289('0x154')](_0x24017a[_0x4ceb23]):[],_0xb96b75=_0x3e0c7b[_0x1289('0x8a')](_0x392e09=>VisuMZ[_0x1289('0x43')]({},JSON['parse'](_0x392e09)));break;default:continue;}_0x403084[_0xea3857]=_0xb96b75;}}else{function _0x20a1d9(){this[_0x1289('0xee')](_0x1289('0xca'));}}}return _0x403084;},(_0x4a8249=>{const _0x5aed7e=_0x4a8249[_0x1289('0xdb')];for(const _0x1e594a of dependencies){if(!Imported[_0x1e594a]){if(_0x1289('0x1c')==='nzCYO'){function _0x32250f(){if(_0x2f9bb7[_0x1289('0x13c')]===_0x1b4600&&_0x3a06b2[_0x1289('0xd8')][_0x3686db]['playTimes']<=0x0)return;_0x920da6['play'](_0x46074c);}}else{alert(_0x1289('0x179')[_0x1289('0x14b')](_0x5aed7e,_0x1e594a)),SceneManager[_0x1289('0x126')]();break;}}}const _0x4fdb82=_0x4a8249[_0x1289('0x6b')];if(_0x4fdb82[_0x1289('0x15d')](/\[Version[ ](.*?)\]/i)){if(_0x1289('0x19e')!==_0x1289('0xd')){const _0x3feee4=Number(RegExp['$1']);if(_0x3feee4!==VisuMZ[label][_0x1289('0x135')]){if(_0x1289('0xf0')!==_0x1289('0xf0')){function _0x13dee2(){const _0x339b28=_0x2ee72d['DragonbonesUnion'][_0x1289('0x112')][_0x1289('0xa3')],_0x27a8d8=this['lastFileName'],_0x2ec118=_0x3da90e[_0x1289('0x14e')]['factory'];_0x2ec118[_0x1289('0x6f')](_0x39c086[_0x27a8d8+_0x339b28[_0x1289('0x59')]][_0x1289('0xfb')]),_0x2ec118[_0x1289('0x18b')](_0x2c033a[_0x27a8d8+_0x339b28[_0x1289('0x1aa')]][_0x1289('0xfb')],_0x5cf47e[_0x27a8d8+_0x339b28[_0x1289('0x82')]][_0x1289('0x9b')]),this[_0x1289('0x143')]();}}else alert(_0x1289('0x15f')[_0x1289('0x14b')](_0x5aed7e,_0x3feee4)),SceneManager[_0x1289('0x126')]();}}else{function _0x50951c(){this[_0x1289('0x79')][_0x1289('0x77')](this['_dragonbones']);}}}if(_0x4fdb82[_0x1289('0x15d')](/\[Tier[ ](\d+)\]/i)){const _0x14f844=Number(RegExp['$1']);_0x14f844<tier?(alert(_0x1289('0x7d')[_0x1289('0x14b')](_0x5aed7e,_0x14f844,tier)),SceneManager[_0x1289('0x126')]()):tier=Math[_0x1289('0xed')](_0x14f844,tier);}VisuMZ[_0x1289('0x43')](VisuMZ[label][_0x1289('0x112')],_0x4a8249[_0x1289('0x103')]);})(pluginData);function DragonbonesManager(){throw new Error(_0x1289('0xb1'));}DragonbonesManager[_0x1289('0xdf')]=VisuMZ[_0x1289('0x5e')][_0x1289('0x112')][_0x1289('0xdf')],DragonbonesManager[_0x1289('0x2a')]=VisuMZ[_0x1289('0x5e')][_0x1289('0x112')]['General'][_0x1289('0x10b')],DragonbonesManager['LoadedFilenames']=[],DragonbonesManager[_0x1289('0x17d')]=[],DragonbonesManager['CallbackQueue']=[],DragonbonesManager[_0x1289('0x101')]=function(_0x59e236,_0xd55ef3,_0x4cbfb1,_0x5455d4){if(!_0x4cbfb1)_0x4cbfb1=SceneManager[_0x1289('0x172')];if(!_0x5455d4)_0x5455d4=_0x1289('0x190');if(_0x4cbfb1[_0x5455d4]){const _0x130c42=_0x4cbfb1[_0x5455d4];_0x130c42&&(_0x4cbfb1[_0x1289('0x77')](_0x130c42),_0x130c42[_0x1289('0xcf')]());}this[_0x1289('0x134')](_0x59e236,DragonbonesManager[_0x1289('0x151')][_0x1289('0x67')](this,_0x59e236,_0xd55ef3,_0x4cbfb1,_0x5455d4));},DragonbonesManager[_0x1289('0x151')]=function(_0x6ab426,_0x142364,_0x569463,_0x44122b){const _0x5030b9=this[_0x1289('0x48')](_0x6ab426);if(_0x5030b9){if(_0x1289('0x10d')!==_0x1289('0x2f')){_0x569463[_0x1289('0x137')](_0x5030b9),_0x5030b9['x']=Graphics[_0x1289('0x18e')]/0x2,_0x5030b9['y']=Graphics[_0x1289('0x185')]*0x3/0x4,_0x142364=_0x142364||DragonbonesManager[_0x1289('0x2a')],_0x142364=_0x142364[_0x1289('0xc6')]();if(_0x5030b9[_0x1289('0x61')][_0x1289('0xd8')][_0x142364]){if('wiPzH'===_0x1289('0x128'))_0x5030b9[_0x1289('0x61')][_0x1289('0x17')](_0x142364);else{function _0x563b0d(){this[_0x1289('0xee')](_0x1289('0xd0'));}}}}else{function _0x36e864(){this[_0x1289('0x78')]();}}}_0x569463[_0x44122b]=_0x5030b9;},DragonbonesManager['createArmature']=function(_0x13d669){const _0x354cd4=dragonBones['PixiFactory'][_0x1289('0xf3')][_0x1289('0x164')](_0x13d669);if(!_0x354cd4)return null;for(const _0x24d672 in _0x354cd4[_0x1289('0x61')]['animations']){if(_0x24d672[_0x1289('0xc6')]()===_0x24d672)continue;_0x354cd4['animation'][_0x1289('0xd8')][_0x24d672[_0x1289('0xc6')]()]=_0x354cd4[_0x1289('0x61')][_0x1289('0xd8')][_0x24d672],delete _0x354cd4[_0x1289('0x61')][_0x1289('0xd8')][_0x24d672];}for(let _0x3cdafa=0x0;_0x3cdafa<_0x354cd4[_0x1289('0x61')]['animationNames']['length'];_0x3cdafa++){_0x354cd4[_0x1289('0x61')][_0x1289('0xd7')][_0x3cdafa]=_0x354cd4['animation']['animationNames'][_0x3cdafa][_0x1289('0xc6')]();}const _0x2f5d7c=VisuMZ['DragonbonesUnion'][_0x1289('0x112')][_0x1289('0xa3')][_0x1289('0x167')];for(let _0x31ee8e of _0x2f5d7c){_0x31ee8e=_0x31ee8e[_0x1289('0xc6')]()[_0x1289('0xf8')]();_0x354cd4[_0x1289('0x61')][_0x1289('0xd8')][_0x31ee8e]&&(_0x354cd4[_0x1289('0x61')][_0x1289('0xd8')][_0x31ee8e][_0x1289('0xb2')]=0x0);for(let _0x19ca65=0x1;_0x19ca65<=0x9;_0x19ca65++){if(_0x1289('0x125')===_0x1289('0x7a')){function _0x5701b6(){_0x3fb6b7[_0x1289('0x5e')][_0x1289('0x130')]['call'](this);}}else{const _0x352c29=_0x31ee8e+_0x19ca65;if(_0x354cd4['animation']['animations'][_0x352c29]){if(_0x1289('0x117')!==_0x1289('0x76'))_0x354cd4[_0x1289('0x61')][_0x1289('0xd8')][_0x352c29][_0x1289('0xb2')]=0x0;else{function _0x48216e(){_0x2552ce[_0x1289('0x19b')]=![];}}}}}}return _0x354cd4['animation'][_0x1289('0xd8')][DragonbonesManager[_0x1289('0x2a')]]&&_0x354cd4[_0x1289('0x61')][_0x1289('0x17')](DragonbonesManager['DefaultAnimation']),_0x354cd4;},DragonbonesManager[_0x1289('0x134')]=function(_0x28f4e4,_0x4b7555){_0x28f4e4=_0x28f4e4[_0x1289('0xf8')](),DragonbonesManager[_0x1289('0x17d')]['push'](_0x28f4e4),DragonbonesManager['CallbackQueue'][_0x1289('0x1ac')](_0x4b7555);const _0x29bd7b=PIXI[_0x1289('0x10c')]['shared'];!_0x29bd7b['loading']&&this[_0x1289('0x143')]();},DragonbonesManager[_0x1289('0x143')]=function(){if(DragonbonesManager[_0x1289('0x17d')][_0x1289('0x7e')]>0x0){if(_0x1289('0xb3')===_0x1289('0x158')){function _0xeaf5c2(){if(!_0x57eea4)return;if(_0x1d15f4['_scene']['constructor']!==_0x34ed70)return;_0x3bbbb4[_0x1289('0x43')](_0xa46f6e,_0x5e6650);const _0x1d6a15=_0x51954d[_0x1289('0x7c')](_0x1be8d5[_0x1289('0x11e')]);if(!_0x1d6a15)return;_0x1d6a15[_0x1289('0x16f')]=_0x530b49[_0x1289('0x153')];}}else this['prepareNextLoadArmature']();}else{if(_0x1289('0x2')===_0x1289('0x2'))this['runQueuedCallbacks']();else{function _0x4ff3df(){const _0x214ac4=_0x9880a1[_0x1289('0x7b')][_0x12cf5a];this[_0x1289('0x133')](_0x214ac4);}}}},DragonbonesManager[_0x1289('0x198')]=function(){const _0x4a1cc8=DragonbonesManager['LoadQueue']['shift']();if(this[_0x1289('0x49')][_0x1289('0x3b')](_0x4a1cc8)){if(_0x1289('0x22')!==_0x1289('0x22')){function _0x4fcc15(){_0x32f874=_0x1f84c[_0x1289('0xea')](this['addDragonbonesAnimationDirections'](_0x37be16[_0x1289('0xd7')][_0x1289('0x2b')]));}}else this[_0x1289('0x143')]();}else{if(!this[_0x1289('0x49')][_0x1289('0x3b')](_0x4a1cc8)){if('weAZf'===_0x1289('0xd5'))this['processLoad'](_0x4a1cc8);else{function _0x26028b(){_0x5e2b1d[_0x1289('0x17')](_0x1d490b);}}}}},DragonbonesManager[_0x1289('0x10')]=function(_0x444f3f){this[_0x1289('0x49')][_0x1289('0x1ac')](_0x444f3f),this[_0x1289('0x15b')]=_0x444f3f;const _0x18a112=VisuMZ[_0x1289('0x5e')][_0x1289('0x112')][_0x1289('0xa3')],_0x188445=DragonbonesManager[_0x1289('0xdf')],_0x1058de=PIXI[_0x1289('0x10c')][_0x1289('0x4e')];_0x1058de[_0x1289('0x3a')](_0x444f3f+_0x18a112[_0x1289('0x59')],_0x188445+_0x444f3f+_0x18a112[_0x1289('0x92')]),_0x1058de[_0x1289('0x3a')](_0x444f3f+_0x18a112[_0x1289('0x1aa')],_0x188445+_0x444f3f+_0x18a112['TexExt']),_0x1058de[_0x1289('0x3a')](_0x444f3f+_0x18a112[_0x1289('0x82')],_0x188445+_0x444f3f+_0x18a112[_0x1289('0x156')]),_0x1058de['once'](_0x1289('0xf'),DragonbonesManager['loadComplete'],this),_0x1058de[_0x1289('0xf6')]();},DragonbonesManager[_0x1289('0x13a')]=function(_0x4856b7,_0x2170b8){const _0x46c2cc=VisuMZ[_0x1289('0x5e')][_0x1289('0x112')][_0x1289('0xa3')],_0x244caf=this['lastFileName'],_0x472be8=dragonBones[_0x1289('0x14e')][_0x1289('0xf3')];_0x472be8[_0x1289('0x6f')](_0x2170b8[_0x244caf+_0x46c2cc['SkeKey']]['data']),_0x472be8['parseTextureAtlasData'](_0x2170b8[_0x244caf+_0x46c2cc[_0x1289('0x1aa')]][_0x1289('0xfb')],_0x2170b8[_0x244caf+_0x46c2cc[_0x1289('0x82')]]['texture']),this[_0x1289('0x143')]();},DragonbonesManager[_0x1289('0x50')]=function(){while(DragonbonesManager[_0x1289('0x57')][_0x1289('0x7e')]>0x0){if(_0x1289('0xc9')===_0x1289('0x75')){function _0x3306c5(){this[_0x1289('0xc7')](_0x1c0ee9),_0x2e2ac1[_0x1289('0x5e')]['Game_Screen_erasePicture'][_0x1289('0xb5')](this,_0x11262c);}}else{const _0x53e004=DragonbonesManager[_0x1289('0x57')]['shift']();if(_0x53e004)_0x53e004(this);}}},PluginManager['registerCommand'](pluginData[_0x1289('0xdb')],'Battler_ActorChange',_0x7018b8=>{if(!$gameMap)return;VisuMZ[_0x1289('0x43')](_0x7018b8,_0x7018b8);const _0x207706=$gameActors[_0x1289('0x146')](_0x7018b8[_0x1289('0x177')]);if(!_0x207706)return;_0x207706['_dragonbonesBattlerData']={'battler':_0x7018b8['Filename'],'scaleX':_0x7018b8[_0x1289('0xeb')],'scaleY':_0x7018b8[_0x1289('0x98')],'offsetX':_0x7018b8[_0x1289('0xff')],'offsetY':_0x7018b8[_0x1289('0x18c')],'timeScale':_0x7018b8[_0x1289('0x51')],'width':_0x7018b8[_0x1289('0x187')],'height':_0x7018b8['Height'],'motion':{'walk':_0x7018b8[_0x1289('0x5a')],'wait':_0x7018b8[_0x1289('0x29')],'chant':_0x7018b8[_0x1289('0x91')],'guard':_0x7018b8[_0x1289('0x119')],'damage':_0x7018b8[_0x1289('0x109')],'evade':_0x7018b8['MotionEvade'],'thrust':_0x7018b8['MotionThrust'],'swing':_0x7018b8[_0x1289('0x11d')],'missile':_0x7018b8[_0x1289('0x178')],'skill':_0x7018b8[_0x1289('0x33')],'spell':_0x7018b8[_0x1289('0x8f')],'item':_0x7018b8[_0x1289('0x14d')],'escape':_0x7018b8[_0x1289('0x2e')],'victory':_0x7018b8[_0x1289('0x85')],'dying':_0x7018b8['MotionDying'],'abnormal':_0x7018b8[_0x1289('0xc5')],'sleep':_0x7018b8[_0x1289('0xaa')],'dead':_0x7018b8[_0x1289('0x13f')]}};}),SceneManager[_0x1289('0xf1')]=function(){return this[_0x1289('0x172')]&&this[_0x1289('0x172')][_0x1289('0x17a')]===Scene_Battle;},Game_BattlerBase[_0x1289('0x1d')]['battler']=function(){if(!SceneManager['isSceneBattle']())return null;if(!SceneManager[_0x1289('0x172')][_0x1289('0x1a8')])return null;return SceneManager[_0x1289('0x172')][_0x1289('0x1a8')][_0x1289('0xf4')](this);},Game_BattlerBase[_0x1289('0x1d')][_0x1289('0x78')]=function(){const _0x32a5c3=VisuMZ[_0x1289('0x5e')][_0x1289('0x112')][_0x1289('0x180')];this[_0x1289('0x27')]={'battler':'','scaleX':_0x32a5c3[_0x1289('0xeb')],'scaleY':_0x32a5c3['ScaleY'],'width':_0x32a5c3[_0x1289('0x187')],'height':_0x32a5c3[_0x1289('0x168')],'offsetX':_0x32a5c3['OffsetX'],'offsetY':_0x32a5c3[_0x1289('0x18c')],'timeScale':_0x32a5c3[_0x1289('0x51')],'motion':{'walk':_0x32a5c3[_0x1289('0x5a')],'wait':_0x32a5c3[_0x1289('0x29')],'chant':_0x32a5c3[_0x1289('0x91')],'guard':_0x32a5c3[_0x1289('0x119')],'damage':_0x32a5c3[_0x1289('0x109')],'evade':_0x32a5c3['MotionEvade'],'thrust':_0x32a5c3[_0x1289('0xbd')],'swing':_0x32a5c3[_0x1289('0x11d')],'missile':_0x32a5c3['MotionMissile'],'skill':_0x32a5c3[_0x1289('0x33')],'spell':_0x32a5c3[_0x1289('0x8f')],'item':_0x32a5c3['MotionItem'],'escape':_0x32a5c3[_0x1289('0x2e')],'victory':_0x32a5c3[_0x1289('0x85')],'dying':_0x32a5c3[_0x1289('0xa5')],'abnormal':_0x32a5c3[_0x1289('0xc5')],'sleep':_0x32a5c3[_0x1289('0xaa')],'dead':_0x32a5c3[_0x1289('0x13f')]}};if(_0x32a5c3['FlipActors']&&this[_0x1289('0xce')]())this[_0x1289('0x27')][_0x1289('0xf5')]*=-0x1;if(_0x32a5c3[_0x1289('0x68')]&&this[_0x1289('0x150')]())this[_0x1289('0x27')]['scaleX']*=-0x1;},Game_BattlerBase['prototype'][_0x1289('0x4d')]=function(){const _0x310dfe=VisuMZ[_0x1289('0x5e')][_0x1289('0x112')]['Battler'],_0x28a6ac=(this[_0x1289('0xce')]()?this[_0x1289('0x146')]():this[_0x1289('0x15a')]())[_0x1289('0xfe')],_0x196731=this[_0x1289('0xe8')]();_0x28a6ac[_0x1289('0x15d')](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:BATTLER|SKIN|NAME):[ ]*(.*)>/i)&&(_0x196731[_0x1289('0xa')]=String(RegExp['$1'])[_0x1289('0xf8')]());_0x28a6ac[_0x1289('0x15d')](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER):[ ]*(.*)>/i)&&(_0x196731[_0x1289('0xa')]=String(RegExp['$1'])[_0x1289('0xf8')]());_0x28a6ac[_0x1289('0x15d')](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]SCALE:[ ](.*),[ ](.*)>/i)&&(_0x196731[_0x1289('0xf5')]=Number(RegExp['$1']),_0x196731[_0x1289('0xe')]=Number(RegExp['$2']));if(_0x28a6ac['match'](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:SCALEX|SCALE X):[ ](.*)>/i)){if(_0x1289('0x14a')===_0x1289('0x14a'))_0x196731[_0x1289('0xf5')]=Number(RegExp['$1']);else{function _0x3e5de9(){_0x781920[_0x1289('0x19b')]=!![];}}}if(_0x28a6ac[_0x1289('0x15d')](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]SCALEY:[ ](.*)>/i)){if(_0x1289('0x11')!==_0x1289('0xdc'))_0x196731[_0x1289('0xe')]=Number(RegExp['$1']);else{function _0x4ef931(){this['hasDragonbonesBattler']()&&this[_0x1289('0xa')]()['playDragonbonesAnimation'](_0x1dc51a);}}}if(_0x28a6ac[_0x1289('0x15d')](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]OFFSET:[ ](.*),[ ](.*)>/i)){if(_0x1289('0xda')!==_0x1289('0xda')){function _0x556c63(){while(_0x719938[_0x1289('0x57')][_0x1289('0x7e')]>0x0){const _0x3ae5e0=_0x1d9682['CallbackQueue'][_0x1289('0xac')]();if(_0x3ae5e0)_0x3ae5e0(this);}}}else _0x196731[_0x1289('0xfc')]=Number(RegExp['$1']),_0x196731[_0x1289('0xbc')]=Number(RegExp['$2']);}_0x28a6ac[_0x1289('0x15d')](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:OFFSETX|OFFSET X):[ ](.*)>/i)&&(_0x196731[_0x1289('0xfc')]=Number(RegExp['$1']));_0x28a6ac[_0x1289('0x15d')](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:OFFSETY|OFFSET Y):[ ](.*)>/i)&&(_0x196731[_0x1289('0xbc')]=Number(RegExp['$1']));if(_0x28a6ac[_0x1289('0x15d')](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:TIMESCALE|TIME SCALE):[ ](.*)>/i)){if(_0x1289('0xe2')===_0x1289('0x47')){function _0x917e4d(){this[_0x1289('0x12c')]={'filename':'','animation':_0x141aff[_0x1289('0x2a')],'scaleX':0x1,'scaleY':0x1,'offsetX':0x0,'offsetY':0x0,'timeScale':0x1};}}else _0x196731['timeScale']=Number(RegExp['$1']);}if(_0x28a6ac['match'](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]SIZE:[ ](.*),[ ](.*)>/i)){if(_0x1289('0x1a9')!==_0x1289('0x1a9')){function _0xa2796d(){_0x2b6116[_0x1289('0x5e')]['Game_CharacterBase_update'][_0x1289('0xb5')](this),this[_0x1289('0x155')]();}}else _0x196731['width']=Number(RegExp['$1']),_0x196731[_0x1289('0x185')]=Number(RegExp['$2']);}_0x28a6ac[_0x1289('0x15d')](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]WIDTH:[ ](.*)>/i)&&(_0x196731[_0x1289('0x18e')]=Number(RegExp['$1']));if(_0x28a6ac[_0x1289('0x15d')](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ]HEIGHT:[ ](.*)>/i)){if(_0x1289('0x30')==='cofHc'){function _0x3ccd21(){_0x5f23bf[_0x1289('0x77')](_0x22b7de),_0x1d934b[_0x1289('0xcf')]();}}else _0x196731[_0x1289('0x185')]=Number(RegExp['$1']);}const _0x42b0e2=_0x28a6ac[_0x1289('0x15d')](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:ANI|MOTION)[ ](.*):[ ](.*)>/gi);if(_0x42b0e2){if(_0x1289('0x17e')!==_0x1289('0x58'))for(const _0xbc8dab of _0x42b0e2){_0xbc8dab[_0x1289('0x15d')](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER)[ ](?:ANI|MOTION)[ ](.*):[ ](.*)>/i);const _0x8f8256=String(RegExp['$1'])[_0x1289('0xc6')]()[_0x1289('0xf8')](),_0x527ca2=String(RegExp['$2'])[_0x1289('0xf8')]();_0x196731[_0x1289('0x7b')][_0x8f8256]=_0x527ca2;}else{function _0x45a197(){this[_0x1289('0xcd')]=_0x1c39bd[_0x1289('0x61')],this[_0x1289('0x133')]();}}}if(_0x28a6ac[_0x1289('0x15d')](/<(?:DB|DRAGONBONE|DRAGONBONES|DRAGONBONES BATTLER) (?:SETTINGS|SETTING)>\s*([\s\S]*)\s*<\/(?:DB|DRAGONBONE|DRAGONBONES BATTLER) (?:SETTINGS|SETTING)>/i)){if(_0x1289('0x40')!==_0x1289('0x40')){function _0x155e99(){_0xa408b4[_0x1289('0xf5')]=_0x5e02c3(_0x191eee['$1']);}}else{const _0x167f15=String(RegExp['$1']);_0x167f15[_0x1289('0x15d')](/(?:BATTLER|SKIN|NAME|FILENAME):[ ]*(.*)/i)&&(_0x196731[_0x1289('0xa')]=String(RegExp['$1'])['trim']());_0x167f15['match'](/SCALE:[ ](.*),[ ](.*)/i)&&(_0x196731[_0x1289('0xf5')]=Number(RegExp['$1']),_0x196731[_0x1289('0xe')]=Number(RegExp['$2']));_0x167f15[_0x1289('0x15d')](/(?:SCALEX|SCALE X):[ ](.*)/i)&&(_0x196731[_0x1289('0xf5')]=Number(RegExp['$1']));if(_0x167f15[_0x1289('0x15d')](/(?:SCALEY|SCALE Y):[ ](.*)/i)){if(_0x1289('0x1a')!=='sjHkC'){function _0x34768f(){_0x18fe6d[_0x1289('0x5e')]['Sprite_Character_updateBitmap']['call'](this),this[_0x1289('0xfa')]();}}else _0x196731['scaleY']=Number(RegExp['$1']);}if(_0x167f15[_0x1289('0x15d')](/OFFSET:[ ](.*),[ ](.*)/i)){if('XFnGX'===_0x1289('0x97'))_0x196731[_0x1289('0xfc')]=Number(RegExp['$1']),_0x196731[_0x1289('0xbc')]=Number(RegExp['$2']);else{function _0x2e347d(){_0x1616ea[_0x1289('0x185')]=_0x1db84d(_0x32926d['$1']);}}}_0x167f15[_0x1289('0x15d')](/(?:OFFSETX|OFFSET X):[ ](.*)/i)&&(_0x196731[_0x1289('0xfc')]=Number(RegExp['$1']));_0x167f15[_0x1289('0x15d')](/(?:OFFSETY|OFFSET Y):[ ](.*)/i)&&(_0x196731[_0x1289('0xbc')]=Number(RegExp['$1']));if(_0x167f15[_0x1289('0x15d')](/(?:TIMESCALE|TIME SCALE):[ ](.*)/i)){if(_0x1289('0xec')!=='IrFkc')_0x196731[_0x1289('0x131')]=Number(RegExp['$1']);else{function _0x5e81fa(){_0x805ebc[_0x1289('0xbc')]=_0x53ec10(_0x5d7ab9['$1']);}}}if(_0x167f15[_0x1289('0x15d')](/SIZE:[ ](.*),[ ](.*)/i)){if(_0x1289('0x149')!==_0x1289('0x12d'))_0x196731[_0x1289('0x18e')]=Number(RegExp['$1']),_0x196731[_0x1289('0x185')]=Number(RegExp['$2']);else{function _0x2db39b(){const _0x2ceede=_0x31bf54+_0x800430;_0x45521a[_0x1289('0x61')][_0x1289('0xd8')][_0x2ceede]&&(_0x327012[_0x1289('0x61')][_0x1289('0xd8')][_0x2ceede][_0x1289('0xb2')]=0x0);}}}_0x167f15['match'](/WIDTH:[ ](.*)/i)&&(_0x196731[_0x1289('0x18e')]=Number(RegExp['$1']));_0x167f15[_0x1289('0x15d')](/HEIGHT:[ ](.*)/i)&&(_0x196731[_0x1289('0x185')]=Number(RegExp['$1']));const _0xb7a7f2=_0x167f15[_0x1289('0x15d')](/(?:ANI|MOTION)[ ](.*):[ ](.*)/gi);if(_0xb7a7f2){if(_0x1289('0xa9')!==_0x1289('0xa9')){function _0x59d26b(){_0x518027[_0x1289('0xfc')]=_0x50ca35(_0x41e151['$1']),_0x427614[_0x1289('0xbc')]=_0xd907b(_0x3fd28e['$2']);}}else for(const _0xe4d3d3 of _0xb7a7f2){_0xe4d3d3['match'](/(?:ANI|MOTION)[ ](.*):[ ](.*)/i);const _0x439f16=String(RegExp['$1'])[_0x1289('0xc6')]()[_0x1289('0xf8')](),_0x20fb37=String(RegExp['$2'])[_0x1289('0xf8')]();_0x196731[_0x1289('0x7b')][_0x439f16]=_0x20fb37;}}}}if(_0x310dfe[_0x1289('0xa0')]&&this[_0x1289('0xce')]())_0x196731[_0x1289('0xf5')]*=-0x1;if(_0x310dfe[_0x1289('0x68')]&&this[_0x1289('0x150')]())_0x196731[_0x1289('0xf5')]*=-0x1;},Game_BattlerBase[_0x1289('0x1d')][_0x1289('0xe8')]=function(){if(this['_dragonbonesBattlerData']!==undefined)return this[_0x1289('0x27')];return this['initDragonbonesData'](),this[_0x1289('0x4d')](),this['_dragonbonesBattlerData'];},Game_BattlerBase[_0x1289('0x1d')][_0x1289('0xc4')]=function(){return this[_0x1289('0xa')]()&&this[_0x1289('0xe8')]()[_0x1289('0xa')]!=='';},VisuMZ[_0x1289('0x5e')][_0x1289('0x13b')]=Game_Battler[_0x1289('0x1d')][_0x1289('0x4b')],Game_Battler[_0x1289('0x1d')]['requestMotion']=function(_0x225abc){VisuMZ[_0x1289('0x5e')][_0x1289('0x13b')][_0x1289('0xb5')](this,_0x225abc),this[_0x1289('0xc4')]()&&this[_0x1289('0xa')]()[_0x1289('0xee')](_0x225abc);},VisuMZ[_0x1289('0x5e')][_0x1289('0x44')]=Game_Battler[_0x1289('0x1d')][_0x1289('0x145')],Game_Battler[_0x1289('0x1d')][_0x1289('0x145')]=function(){VisuMZ['DragonbonesUnion'][_0x1289('0x44')][_0x1289('0xb5')](this);if(this[_0x1289('0xc4')]()){if(_0x1289('0x17b')!==_0x1289('0x147'))this[_0x1289('0xa')]()[_0x1289('0x73')]();else{function _0x470449(){this['requestDragonbonesAnimation'](_0x1289('0x1ab'));}}}},Game_Battler[_0x1289('0x1d')][_0x1289('0x81')]=function(_0x4915fc){this[_0x1289('0xc4')]()&&this[_0x1289('0xa')]()[_0x1289('0x133')](_0x4915fc);},Game_Battler[_0x1289('0x1d')]['performDamageDragonbonesUnion']=function(){if(!this[_0x1289('0xc4')]())return;this[_0x1289('0x4b')]('damage');},Game_Battler[_0x1289('0x1d')][_0x1289('0x71')]=function(){if(!this[_0x1289('0xc4')]())return;this['requestMotion'](_0x1289('0x94'));},VisuMZ[_0x1289('0x5e')]['Game_Actor_setup']=Game_Actor['prototype'][_0x1289('0xaf')],Game_Actor[_0x1289('0x1d')][_0x1289('0xaf')]=function(_0x34593c){VisuMZ[_0x1289('0x5e')][_0x1289('0x38')]['call'](this,_0x34593c),this['initDragonbonesData'](),this[_0x1289('0x4d')]();},VisuMZ[_0x1289('0x5e')]['Game_Actor_performAction']=Game_Actor[_0x1289('0x1d')][_0x1289('0x169')],Game_Actor[_0x1289('0x1d')][_0x1289('0x169')]=function(_0x210ec9){this['requestDragonbonesAnimation'](_0x1289('0x1ab')),VisuMZ[_0x1289('0x5e')]['Game_Actor_performAction']['call'](this,_0x210ec9);},VisuMZ['DragonbonesUnion'][_0x1289('0x13e')]=Game_Actor['prototype']['performAttack'],Game_Actor[_0x1289('0x1d')][_0x1289('0x13')]=function(){this['requestDragonbonesAnimation'](_0x1289('0x1ab')),VisuMZ[_0x1289('0x5e')][_0x1289('0x13e')]['call'](this);},VisuMZ[_0x1289('0x5e')][_0x1289('0x62')]=Game_Actor[_0x1289('0x1d')][_0x1289('0x9c')],Game_Actor['prototype'][_0x1289('0x9c')]=function(){VisuMZ[_0x1289('0x5e')][_0x1289('0x62')][_0x1289('0xb5')](this),this[_0x1289('0x15')]();},VisuMZ[_0x1289('0x5e')][_0x1289('0x105')]=Game_Actor[_0x1289('0x1d')][_0x1289('0x115')],Game_Actor[_0x1289('0x1d')]['performCollapse']=function(){VisuMZ[_0x1289('0x5e')][_0x1289('0x105')][_0x1289('0xb5')](this),this[_0x1289('0x71')]();},VisuMZ['DragonbonesUnion'][_0x1289('0x8c')]=Game_Enemy[_0x1289('0x1d')][_0x1289('0xaf')],Game_Enemy[_0x1289('0x1d')][_0x1289('0xaf')]=function(_0x54aa36,_0x325ca6,_0x4e2b98){VisuMZ[_0x1289('0x5e')][_0x1289('0x8c')][_0x1289('0xb5')](this,_0x54aa36,_0x325ca6,_0x4e2b98),this['initDragonbonesData'](),this[_0x1289('0x4d')]();},VisuMZ[_0x1289('0x5e')][_0x1289('0x138')]=Game_Enemy['prototype'][_0x1289('0xa8')],Game_Enemy[_0x1289('0x1d')][_0x1289('0xa8')]=function(_0x1837c2){const _0x2455be=this[_0x1289('0x196')];VisuMZ['DragonbonesUnion'][_0x1289('0x138')][_0x1289('0xb5')](this,_0x1837c2),this[_0x1289('0x196')]!==_0x2455be&&(this[_0x1289('0x78')](),this[_0x1289('0x4d')]());},VisuMZ[_0x1289('0x5e')][_0x1289('0x15c')]=Game_Enemy['prototype'][_0x1289('0x169')],Game_Enemy[_0x1289('0x1d')][_0x1289('0x169')]=function(_0x108b98){VisuMZ[_0x1289('0x5e')][_0x1289('0x15c')][_0x1289('0xb5')](this,_0x108b98),this[_0x1289('0x65')](_0x108b98);},Game_Enemy['prototype'][_0x1289('0x65')]=function(_0x523b9b){if(!this[_0x1289('0xc4')]())return;this[_0x1289('0x81')](_0x1289('0x1ab'));if(Imported[_0x1289('0x14f')])return this[_0x1289('0x160')](_0x523b9b);if(_0x523b9b[_0x1289('0x6d')]()){if(_0x1289('0x74')!=='FHLUl'){function _0x4f24bd(){this[_0x1289('0x36')]=-0x1;}}else this[_0x1289('0x81')](_0x1289('0x1ab'));}else{if(_0x523b9b[_0x1289('0x6')]()){if(_0x1289('0x6e')===_0x1289('0x6e'))this[_0x1289('0x4b')](_0x1289('0xd0'));else{function _0x25c2a4(){for(const _0x4a4733 of _0x5a0fa1){_0x4a4733[_0x1289('0x15d')](/(?:ANI|MOTION) (.*):[ ](.*)/i);const _0x3421e9=_0x50761b(_0x1c0fd3['$1'])[_0x1289('0xc6')]()[_0x1289('0xf8')](),_0x3f1840=_0x53988b(_0x476e4b['$2'])[_0x1289('0xc6')]()[_0x1289('0xf8')]();_0x5865c5[_0x1289('0xd7')][_0x3421e9]=_0x3f1840;}}}}else{if(_0x523b9b[_0x1289('0x166')]())this['requestMotion']('spell');else{if(_0x523b9b[_0x1289('0x12e')]()){if(_0x523b9b[_0x1289('0x35')]()[_0x1289('0x5f')][_0x1289('0x157')]>0x0){if(_0x1289('0x11b')!=='VRbgc'){function _0x3d8a85(){this['LoadedFilenames'][_0x1289('0x1ac')](_0x306350),this[_0x1289('0x15b')]=_0x4e26f5;const _0x5e12ce=_0x55d25f[_0x1289('0x5e')][_0x1289('0x112')][_0x1289('0xa3')],_0x25bc92=_0x2394fc['AssetsPath'],_0x171657=_0x7b9d9e[_0x1289('0x10c')][_0x1289('0x4e')];_0x171657[_0x1289('0x3a')](_0x30398b+_0x5e12ce[_0x1289('0x59')],_0x25bc92+_0x1f6dc6+_0x5e12ce[_0x1289('0x92')]),_0x171657[_0x1289('0x3a')](_0x261884+_0x5e12ce['TexKey'],_0x25bc92+_0x12774e+_0x5e12ce[_0x1289('0x42')]),_0x171657[_0x1289('0x3a')](_0x336c0c+_0x5e12ce[_0x1289('0x82')],_0x25bc92+_0x27bf2c+_0x5e12ce['TxaExt']),_0x171657['once'](_0x1289('0xf'),_0x20e013[_0x1289('0x13a')],this),_0x171657[_0x1289('0xf6')]();}}else this[_0x1289('0x81')](_0x1289('0x1ab'));}else this[_0x1289('0x4b')]('skill');}else _0x523b9b[_0x1289('0x142')]()&&this[_0x1289('0x4b')]('item');}}}},VisuMZ[_0x1289('0x5e')][_0x1289('0x95')]=Game_Enemy['prototype'][_0x1289('0x9c')],Game_Enemy['prototype'][_0x1289('0x9c')]=function(){VisuMZ[_0x1289('0x5e')][_0x1289('0x95')][_0x1289('0xb5')](this),this[_0x1289('0x15')]();},VisuMZ['DragonbonesUnion'][_0x1289('0xa2')]=Game_Enemy['prototype'][_0x1289('0x115')],Game_Enemy['prototype'][_0x1289('0x115')]=function(){VisuMZ[_0x1289('0x5e')]['Game_Enemy_performCollapse'][_0x1289('0xb5')](this),this[_0x1289('0x71')]();},VisuMZ['DragonbonesUnion']['Scene_Battle_terminate']=Scene_Battle[_0x1289('0x1d')][_0x1289('0xa4')],Scene_Battle[_0x1289('0x1d')][_0x1289('0xa4')]=function(){this[_0x1289('0x1a8')][_0x1289('0x19')](),VisuMZ[_0x1289('0x5e')][_0x1289('0xa6')]['call'](this);},Sprite_Battler[_0x1289('0x1d')][_0x1289('0xc1')]=function(){this[_0x1289('0x114')]=null,this[_0x1289('0x182')]='';},Sprite_Battler[_0x1289('0x1d')][_0x1289('0x70')]=function(){const _0x268f7a=this[_0x1289('0xe5')][_0x1289('0xe8')]();this[_0x1289('0x182')]=_0x268f7a[_0x1289('0xa')],this['disposeDragonbones'](),armatureName=_0x268f7a[_0x1289('0xa')],DragonbonesManager['loadArmature'](armatureName,this['onLoadDragonbones'][_0x1289('0x67')](this)),this['bitmap']=new Bitmap(_0x268f7a[_0x1289('0x18e')],_0x268f7a[_0x1289('0x185')]);},Sprite_Battler[_0x1289('0x1d')][_0x1289('0x19')]=function(){this[_0x1289('0x114')]&&(!this[_0x1289('0x79')]&&this[_0x1289('0x79')][_0x1289('0x77')](this[_0x1289('0x114')]),this[_0x1289('0x77')](this[_0x1289('0x114')]),this[_0x1289('0x114')]['dispose'](),this[_0x1289('0x114')]=null);},Sprite_Battler[_0x1289('0x1d')][_0x1289('0x19f')]=function(){const _0x3f7533=this[_0x1289('0xe5')][_0x1289('0xe8')]();this[_0x1289('0x114')]=DragonbonesManager[_0x1289('0x48')](_0x3f7533['battler']),!this[_0x1289('0x79')]&&(this[_0x1289('0x79')]=new Sprite(),this[_0x1289('0x79')][_0x1289('0x137')](this[_0x1289('0x114')])),this[_0x1289('0xab')](this[_0x1289('0x79')],0x0),this[_0x1289('0x73')](),this[_0x1289('0x114')]['x']=_0x3f7533[_0x1289('0xfc')],this[_0x1289('0x114')]['y']=_0x3f7533[_0x1289('0xbc')],this[_0x1289('0x114')][_0x1289('0x86')]['x']=_0x3f7533[_0x1289('0xf5')],this[_0x1289('0x114')]['scale']['y']=_0x3f7533[_0x1289('0xe')];},Sprite_Battler[_0x1289('0x1d')][_0x1289('0xee')]=function(_0x2bb0d9){if(!this[_0x1289('0x114')])return;const _0x45b127=this[_0x1289('0xe5')][_0x1289('0xe8')]();if(_0x45b127[_0x1289('0x7b')][_0x2bb0d9]){const _0x1dcaaf=_0x45b127[_0x1289('0x7b')][_0x2bb0d9];this[_0x1289('0x133')](_0x1dcaaf);}},Sprite_Battler[_0x1289('0x1d')][_0x1289('0x133')]=function(_0x4944ce){_0x4944ce=_0x4944ce[_0x1289('0xc6')]();if(!this['_dragonbones'])return;const _0x41e32d=this['_dragonbones'][_0x1289('0x61')];if(_0x41e32d[_0x1289('0xd8')][_0x4944ce]){if('VuqFu'===_0x1289('0x6a')){const _0x4d913a=_0x41e32d[_0x1289('0x13c')],_0x565c3e=[_0x1289('0x113'),_0x1289('0xca'),_0x1289('0x54'),_0x1289('0x18f'),_0x1289('0xd0'),'dying',_0x1289('0x34'),_0x1289('0x53')];if(_0x4d913a===_0x4944ce&&_0x565c3e[_0x1289('0x3b')](_0x4944ce))return;_0x41e32d[_0x1289('0x17')](_0x4944ce);}else{function _0x145380(){_0x5f81dc[_0x1289('0xa')]=_0x3848e0(_0xae091d['$1'])[_0x1289('0xf8')]();}}}},Sprite_Battler[_0x1289('0x1d')][_0x1289('0xfa')]=function(){this[_0x1289('0xfd')](),this[_0x1289('0x107')](),this[_0x1289('0x19a')]();},Sprite_Battler['prototype'][_0x1289('0xfd')]=function(){if(!this[_0x1289('0x114')])return;let _0x402f3f=this[_0x1289('0xe5')][_0x1289('0xe8')]()[_0x1289('0x131')];const _0xa37f18=SceneManager[_0x1289('0x172')];Imported[_0x1289('0x66')]&&_0xa37f18[_0x1289('0x129')]&&$gameTemp['_playTestFastMode']&&(_0x402f3f*=0x2),Imported[_0x1289('0x194')]&&_0xa37f18[_0x1289('0xef')]&&(_0x402f3f*=(ConfigManager['battleAniSpeed']||0x0)+0x1),this[_0x1289('0x114')][_0x1289('0x61')][_0x1289('0x131')]=_0x402f3f;},Sprite_Battler[_0x1289('0x1d')][_0x1289('0x107')]=function(){if(!this[_0x1289('0x114')])return;const _0x229d92=this[_0x1289('0x114')][_0x1289('0x61')];if(_0x229d92[_0x1289('0xb9')]){const _0x33b7b7=_0x229d92[_0x1289('0x13c')],_0x28691f=[_0x1289('0x94'),_0x1289('0xae'),_0x1289('0xbf')];!_0x28691f['includes'](_0x33b7b7)&&this['playDragonbonesIdleAnimation']();}},Sprite_Battler[_0x1289('0x1d')][_0x1289('0x19a')]=function(){if(!this[_0x1289('0xe5')])return;const _0x3fef28=this[_0x1289('0x79')]||this[_0x1289('0x1a2')];if(!_0x3fef28)return;if(this[_0x1289('0xe5')][_0x1289('0x4')]()){if(_0x1289('0x18d')!==_0x1289('0xe1')){this[_0x1289('0x174')]++;if(this[_0x1289('0x174')]%0x1e<0xf)_0x3fef28[_0x1289('0xd9')]([0xff,0xff,0xff,0x40]);else{if('HnXfX'!==_0x1289('0x84'))_0x3fef28[_0x1289('0xd9')]([0x0,0x0,0x0,0x0]);else{function _0xcd5d3(){this[_0x1289('0x36')]=-0x1;}}}}else{function _0x106e65(){_0x5cb6e6[_0x1289('0x5e')][_0x1289('0x64')][_0x1289('0xb5')](this),this[_0x1289('0x77')](this[_0x1289('0x114')]);}}}else this[_0x1289('0x174')]=0x0,_0x3fef28[_0x1289('0xd9')]([0x0,0x0,0x0,0x0]);},Sprite_Battler[_0x1289('0x1d')][_0x1289('0x73')]=function(){if(!this['_dragonbones'])return;const _0x1fb231=this[_0x1289('0xe5')];if(!_0x1fb231)return;const _0x5c057d=this[_0x1289('0x114')][_0x1289('0x61')];if(_0x5c057d&&!_0x5c057d[_0x1289('0xb9')])return;this[_0x1289('0x133')](_0x1289('0x113'));const _0x2db975=_0x1fb231[_0x1289('0x8b')]();if(_0x1fb231[_0x1289('0x5c')]()||_0x1fb231[_0x1289('0x37')]()){if(_0x1289('0xc0')!=='KSxJW')this[_0x1289('0xee')](_0x1289('0xca'));else{function _0x4bde9f(){return this[_0x1289('0xa')]()&&this[_0x1289('0xe8')]()[_0x1289('0xa')]!=='';}}}else{if(_0x2db975===0x3)this['playDragonbonesMotion'](_0x1289('0x94'));else{if(_0x2db975===0x2)this[_0x1289('0xee')](_0x1289('0x53'));else{if(_0x1fb231[_0x1289('0x127')]())this['playDragonbonesMotion'](_0x1289('0x18f'));else{if(_0x1fb231[_0x1289('0x6')]()||_0x1fb231[_0x1289('0x170')]())this['playDragonbonesMotion'](_0x1289('0xd0'));else{if(_0x2db975===0x1)this[_0x1289('0xee')]('abnormal');else{if(_0x1fb231['isDying']()){if(_0x1289('0x141')!==_0x1289('0x9f'))this[_0x1289('0xee')](_0x1289('0x16'));else{function _0x2af2fc(){if(!this['hasDragonbonesBattler']())return;this['requestMotion'](_0x1289('0x94'));}}}else _0x1fb231[_0x1289('0x9d')]()?this[_0x1289('0xee')](_0x1289('0xca')):this[_0x1289('0xee')](_0x1289('0x54'));}}}}}}},VisuMZ['DragonbonesUnion'][_0x1289('0x173')]=Sprite_Actor[_0x1289('0x1d')][_0x1289('0x41')],Sprite_Actor[_0x1289('0x1d')][_0x1289('0x41')]=function(){VisuMZ[_0x1289('0x5e')][_0x1289('0x173')][_0x1289('0xb5')](this),this[_0x1289('0xc1')]();},VisuMZ[_0x1289('0x5e')][_0x1289('0x1a6')]=Sprite_Actor[_0x1289('0x1d')][_0x1289('0x161')],Sprite_Actor['prototype'][_0x1289('0x161')]=function(){const _0x25fb8f=this[_0x1289('0xe5')];if(_0x25fb8f[_0x1289('0xc4')]()){Sprite_Battler[_0x1289('0x1d')][_0x1289('0x161')]['call'](this);if(this[_0x1289('0x182')]!==_0x25fb8f[_0x1289('0xe8')]()[_0x1289('0xa')]){if('ckunE'===_0x1289('0x106'))this[_0x1289('0x70')]();else{function _0x5df704(){_0x3e11b1[_0x1289('0xe')]=_0x570136(_0x547e97['$1']);}}}this[_0x1289('0xfa')]();}else{if(_0x1289('0x55')!==_0x1289('0x80'))VisuMZ['DragonbonesUnion'][_0x1289('0x1a6')][_0x1289('0xb5')](this),this[_0x1289('0x77')](this[_0x1289('0x114')]);else{function _0x1dcc59(){if(!_0x3f276f)return;if(_0x2c0b74['_scene'][_0x1289('0x17a')]!==_0x547812)return;_0x283dbe['ConvertParams'](_0x1a3faa,_0x584c63);const _0x1ed5b4=_0x428a4a[_0x1289('0xa7')]()[_0x1289('0xde')](_0x58a4a1[_0x1289('0x12a')]);if(!_0x1ed5b4)return;_0x1ed5b4['dragonbonesAnimation']=_0x5f29ff[_0x1289('0x153')];}}}},VisuMZ[_0x1289('0x5e')]['Sprite_Actor_startMotion']=Sprite_Actor[_0x1289('0x1d')][_0x1289('0x6c')],Sprite_Actor[_0x1289('0x1d')][_0x1289('0x6c')]=function(_0x240184){VisuMZ[_0x1289('0x5e')][_0x1289('0x8')]['call'](this,_0x240184),this[_0x1289('0x17a')]===Sprite_Actor&&this[_0x1289('0xee')](_0x240184);},VisuMZ[_0x1289('0x5e')][_0x1289('0x17f')]=Sprite_Actor[_0x1289('0x1d')][_0x1289('0x189')],Sprite_Actor[_0x1289('0x1d')][_0x1289('0x189')]=function(){this[_0x1289('0x1a3')](),VisuMZ['DragonbonesUnion'][_0x1289('0x17f')]['call'](this);if(this['_battler']&&this[_0x1289('0xe5')][_0x1289('0xc4')]()){if('CEYlV'!==_0x1289('0x122')){function _0xe3902b(){_0x318a21['DragonbonesUnion'][_0x1289('0x5d')][_0x1289('0xb5')](this),this[_0x1289('0x78')]();}}else this[_0x1289('0xc2')][_0x1289('0x183')]=![];}},Sprite_Actor['prototype']['updateShadowDragonbonesUnion']=function(){if(this['constructor']!==Sprite_Actor)return;let _0x254a76=!![];if(this[_0x1289('0xe5')]&&this[_0x1289('0xe5')][_0x1289('0xc4')]())_0x254a76=![];this[_0x1289('0x1a2')]['visible']=_0x254a76,this[_0x1289('0xdd')][_0x1289('0x183')]=_0x254a76,this[_0x1289('0x163')]['visible']=_0x254a76;},VisuMZ[_0x1289('0x5e')][_0x1289('0x20')]=Sprite_Enemy['prototype'][_0x1289('0x41')],Sprite_Enemy[_0x1289('0x1d')]['initMembers']=function(){VisuMZ[_0x1289('0x5e')]['Sprite_Enemy_initMembers'][_0x1289('0xb5')](this),this[_0x1289('0xc1')]();},VisuMZ[_0x1289('0x5e')][_0x1289('0x64')]=Sprite_Enemy[_0x1289('0x1d')]['updateBitmap'],Sprite_Enemy[_0x1289('0x1d')][_0x1289('0x161')]=function(){const _0x24a2c1=this['_battler'];_0x24a2c1[_0x1289('0xc4')]()?(Sprite_Battler[_0x1289('0x1d')][_0x1289('0x161')][_0x1289('0xb5')](this),this[_0x1289('0x182')]!==_0x24a2c1[_0x1289('0xe8')]()[_0x1289('0xa')]&&this[_0x1289('0x70')](),this['updateDragonbones']()):(VisuMZ[_0x1289('0x5e')][_0x1289('0x64')][_0x1289('0xb5')](this),this[_0x1289('0x77')](this[_0x1289('0x114')]));},Spriteset_Battle[_0x1289('0x1d')]['disposeDragonbones']=function(){for(const _0x20df6f of this[_0x1289('0x28')]()){if(_0x1289('0x15e')!=='gxgWS'){function _0x40e982(){this[_0x1289('0xf2')]=_0xea0fa7[_0x1289('0x18a')]();}}else{if(!_0x20df6f)continue;_0x20df6f[_0x1289('0x19')]();}}},PluginManager[_0x1289('0x14c')](pluginData[_0x1289('0xdb')],_0x1289('0x1b'),_0x5d2022=>{if(!$gameScreen)return;VisuMZ[_0x1289('0x43')](_0x5d2022,_0x5d2022),$gameScreen[_0x1289('0x10f')](_0x5d2022[_0x1289('0x181')]);const _0x158d8d=$gameScreen['picture'](_0x5d2022[_0x1289('0x181')]),_0x4bc494=_0x158d8d['dragonbonesData']();_0x4bc494[_0x1289('0x19d')]=_0x5d2022[_0x1289('0x199')],_0x4bc494[_0x1289('0x61')]=_0x5d2022['Animation'],_0x4bc494[_0x1289('0xfc')]=_0x5d2022[_0x1289('0xff')],_0x4bc494[_0x1289('0xbc')]=_0x5d2022[_0x1289('0x18c')],_0x4bc494[_0x1289('0xf5')]=_0x5d2022[_0x1289('0xeb')],_0x4bc494[_0x1289('0xe')]=_0x5d2022[_0x1289('0x98')],_0x4bc494[_0x1289('0x131')]=_0x5d2022[_0x1289('0x51')];}),PluginManager[_0x1289('0x14c')](pluginData['name'],_0x1289('0x13d'),_0x5ba422=>{if(!$gameScreen)return;VisuMZ[_0x1289('0x43')](_0x5ba422,_0x5ba422),$gameScreen['createDefaultPicture'](_0x5ba422[_0x1289('0x181')]);const _0x456cab=$gameScreen['picture'](_0x5ba422[_0x1289('0x181')]),_0xbdde27=_0x456cab[_0x1289('0xe8')]();_0xbdde27[_0x1289('0x61')]=_0x5ba422['Animation'];}),PluginManager['registerCommand'](pluginData['name'],'Picture_DragonbonesOffset',_0x45f446=>{if(!$gameScreen)return;VisuMZ[_0x1289('0x43')](_0x45f446,_0x45f446),$gameScreen[_0x1289('0x10f')](_0x45f446[_0x1289('0x181')]);const _0x2a7c52=$gameScreen[_0x1289('0x7')](_0x45f446['PictureID']),_0x1bca41=_0x2a7c52[_0x1289('0xe8')]();_0x1bca41[_0x1289('0xfc')]=_0x45f446[_0x1289('0xff')],_0x1bca41[_0x1289('0xbc')]=_0x45f446[_0x1289('0x18c')];}),PluginManager[_0x1289('0x14c')](pluginData[_0x1289('0xdb')],'Picture_ScaleDragonbones',_0x5b2364=>{if(!$gameScreen)return;VisuMZ[_0x1289('0x43')](_0x5b2364,_0x5b2364),$gameScreen[_0x1289('0x10f')](_0x5b2364[_0x1289('0x181')]);const _0xa75c2f=$gameScreen['picture'](_0x5b2364[_0x1289('0x181')]),_0x542401=_0xa75c2f['dragonbonesData']();_0x542401[_0x1289('0xf5')]=_0x5b2364['ScaleX'],_0x542401[_0x1289('0xe')]=_0x5b2364[_0x1289('0x98')];}),PluginManager[_0x1289('0x14c')](pluginData[_0x1289('0xdb')],_0x1289('0x3c'),_0x11db38=>{if(!$gameScreen)return;VisuMZ['ConvertParams'](_0x11db38,_0x11db38),$gameScreen['createDefaultPicture'](_0x11db38[_0x1289('0x181')]);const _0x4e97dd=$gameScreen[_0x1289('0x7')](_0x11db38[_0x1289('0x181')]),_0x2c70ea=_0x4e97dd[_0x1289('0xe8')]();_0x2c70ea[_0x1289('0x131')]=_0x11db38['TimeScale'];}),Game_Screen[_0x1289('0x1d')][_0x1289('0x10f')]=function(_0x325acd){if(this[_0x1289('0x7')](_0x325acd))return;this[_0x1289('0x192')](_0x325acd,'',0x0,Math[_0x1289('0xcc')](Graphics[_0x1289('0x18e')]/0x2),Math[_0x1289('0xcc')](Graphics['height']/0x2),0x64,0x64,0xff,0x0);},VisuMZ[_0x1289('0x5e')][_0x1289('0x90')]=Game_Screen['prototype'][_0x1289('0x121')],Game_Screen['prototype'][_0x1289('0x121')]=function(_0x45f3a0){this[_0x1289('0xc7')](_0x45f3a0),VisuMZ[_0x1289('0x5e')]['Game_Screen_erasePicture'][_0x1289('0xb5')](this,_0x45f3a0);},Game_Screen['prototype'][_0x1289('0xc7')]=function(_0x3d3283){const _0x23ba78=this[_0x1289('0x111')](_0x3d3283),_0x5494a3=this[_0x1289('0x100')][_0x23ba78];if(!_0x5494a3)return;_0x5494a3[_0x1289('0x78')](),_0x5494a3[_0x1289('0x19')]();},VisuMZ['DragonbonesUnion'][_0x1289('0x5d')]=Game_Picture[_0x1289('0x1d')][_0x1289('0x152')],Game_Picture[_0x1289('0x1d')][_0x1289('0x152')]=function(){VisuMZ[_0x1289('0x5e')][_0x1289('0x5d')]['call'](this),this[_0x1289('0x78')]();},Game_Picture[_0x1289('0x1d')][_0x1289('0x78')]=function(){this[_0x1289('0x12c')]={'filename':'','animation':DragonbonesManager[_0x1289('0x2a')],'scaleX':0x1,'scaleY':0x1,'offsetX':0x0,'offsetY':0x0,'timeScale':0x1};},Game_Picture[_0x1289('0x1d')][_0x1289('0xe8')]=function(){if(this[_0x1289('0x12c')]!==undefined)return this[_0x1289('0x12c')];return this[_0x1289('0x78')](),this[_0x1289('0x12c')];},Game_Picture[_0x1289('0x1d')][_0x1289('0xad')]=function(){return this[_0x1289('0xe8')]()['filename']!=='';},Game_Picture[_0x1289('0x1d')][_0x1289('0x19')]=function(){if(!SceneManager[_0x1289('0x172')])return;if(!SceneManager['_scene'][_0x1289('0x1a8')])return;const _0x35c65f=SceneManager[_0x1289('0x172')][_0x1289('0x1a8')]['findPictureSprite'](this);if(_0x35c65f)_0x35c65f['disposeDragonbones']();},Spriteset_Base[_0x1289('0x1d')][_0x1289('0xb8')]=function(_0x338cd6){return this['_pictureContainer'][_0x1289('0x132')][_0x1289('0x110')](_0x1de2c3=>_0x1de2c3&&_0x1de2c3[_0x1289('0x7')]()===_0x338cd6);},VisuMZ[_0x1289('0x5e')][_0x1289('0x10e')]=Sprite_Picture['prototype'][_0x1289('0x152')],Sprite_Picture[_0x1289('0x1d')][_0x1289('0x152')]=function(_0x5b2d30){this[_0x1289('0x78')](),VisuMZ[_0x1289('0x5e')]['Sprite_Picture_initialize'][_0x1289('0xb5')](this,_0x5b2d30);},Sprite_Picture[_0x1289('0x1d')][_0x1289('0x78')]=function(_0x2cbdbe){this[_0x1289('0x114')]=null,this[_0x1289('0xc3')]='',this[_0x1289('0xcd')]='';},VisuMZ['DragonbonesUnion'][_0x1289('0xbe')]=Sprite_Picture[_0x1289('0x1d')][_0x1289('0x188')],Sprite_Picture[_0x1289('0x1d')][_0x1289('0x188')]=function(){VisuMZ[_0x1289('0x5e')]['Sprite_Picture_update']['call'](this),this[_0x1289('0xfa')]();},Sprite_Picture[_0x1289('0x1d')][_0x1289('0x19')]=function(){if(this['_dragonbones']){if(_0x1289('0x72')===_0x1289('0x72'))this[_0x1289('0x77')](this['_dragonbones']),this[_0x1289('0x114')][_0x1289('0xcf')](),this[_0x1289('0x114')]=null,this[_0x1289('0xc3')]='',this[_0x1289('0xcd')]='';else{function _0x50b4cb(){if(!this['_dragonbones'])return;const _0x6d8e09=this['picture']()[_0x1289('0xe8')]();let _0x44dfc8=_0x6d8e09[_0x1289('0x131')];this[_0x1289('0x114')][_0x1289('0x61')][_0x1289('0x131')]=_0x44dfc8;}}}},Sprite_Picture['prototype'][_0x1289('0xfa')]=function(){const _0x54bc57=this['picture']();if(!_0x54bc57)return this[_0x1289('0x19')]();if(!_0x54bc57[_0x1289('0xad')]())return this[_0x1289('0x19')]();this[_0x1289('0x104')]();if(!this[_0x1289('0x114')])return;this[_0x1289('0x107')](),this[_0x1289('0x148')](),this['updateDragonbonesTimeScale']();},Sprite_Picture[_0x1289('0x1d')][_0x1289('0x104')]=function(){const _0x47cf8b=this[_0x1289('0x7')]()[_0x1289('0xe8')]();if(this[_0x1289('0xc3')]===_0x47cf8b[_0x1289('0x19d')])return;this[_0x1289('0x19')](),this[_0x1289('0xc3')]=_0x47cf8b[_0x1289('0x19d')],DragonbonesManager['loadArmature'](_0x47cf8b[_0x1289('0x19d')],this[_0x1289('0x19f')][_0x1289('0x67')](this));},Sprite_Picture['prototype'][_0x1289('0x19f')]=function(){const _0x337834=this[_0x1289('0x7')]()[_0x1289('0xe8')]();this[_0x1289('0x114')]=DragonbonesManager[_0x1289('0x48')](_0x337834[_0x1289('0x19d')]),this[_0x1289('0xab')](this['_dragonbones'],0x0),this[_0x1289('0x107')]();},Sprite_Picture[_0x1289('0x1d')][_0x1289('0x107')]=function(){if(!this[_0x1289('0x114')])return;const _0xc8ee2f=this[_0x1289('0x7')]()[_0x1289('0xe8')]();if(this[_0x1289('0xcd')]!==_0xc8ee2f[_0x1289('0x61')]){if(_0x1289('0x24')!==_0x1289('0x11c'))this['_dragonbonesAnimation']=_0xc8ee2f[_0x1289('0x61')],this[_0x1289('0x133')]();else{function _0x3a8371(){_0x5f072b[_0x1289('0x5e')]['Game_Battler_requestMotion']['call'](this,_0x226bc5),this[_0x1289('0xc4')]()&&this[_0x1289('0xa')]()['playDragonbonesMotion'](_0x153caa);}}}},Sprite_Picture[_0x1289('0x1d')][_0x1289('0x133')]=function(){if(!this[_0x1289('0x114')])return;const _0x5dbd1c=this[_0x1289('0x114')][_0x1289('0x61')],_0x1a8e3d=this[_0x1289('0xcd')][_0x1289('0xc6')]()[_0x1289('0xf8')]();_0x5dbd1c[_0x1289('0xd8')][_0x1a8e3d]&&_0x5dbd1c[_0x1289('0x17')](_0x1a8e3d);},Sprite_Picture[_0x1289('0x1d')][_0x1289('0x148')]=function(){if(!this['_dragonbones'])return;const _0x588d7f=this[_0x1289('0x7')]()[_0x1289('0xe8')]();this[_0x1289('0x114')]['x']=_0x588d7f[_0x1289('0xfc')],this[_0x1289('0x114')]['y']=_0x588d7f[_0x1289('0xbc')],this['_dragonbones']['scale']['x']=_0x588d7f[_0x1289('0xf5')],this['_dragonbones'][_0x1289('0x86')]['y']=_0x588d7f[_0x1289('0xe')];},Sprite_Picture[_0x1289('0x1d')][_0x1289('0xfd')]=function(){if(!this[_0x1289('0x114')])return;const _0x2b2356=this[_0x1289('0x7')]()[_0x1289('0xe8')]();let _0x5215cd=_0x2b2356[_0x1289('0x131')];this[_0x1289('0x114')][_0x1289('0x61')][_0x1289('0x131')]=_0x5215cd;},PluginManager['registerCommand'](pluginData[_0x1289('0xdb')],_0x1289('0x19c'),_0x410fdd=>{if(!$gameMap)return;VisuMZ[_0x1289('0x43')](_0x410fdd,_0x410fdd);const _0x2cf0c7=$gameActors['actor'](_0x410fdd[_0x1289('0x177')]);if(!_0x2cf0c7)return;_0x2cf0c7[_0x1289('0xf2')]={'filename':_0x410fdd[_0x1289('0x199')],'animation':'','scaleX':_0x410fdd[_0x1289('0xeb')],'scaleY':_0x410fdd[_0x1289('0x98')],'offsetX':_0x410fdd[_0x1289('0xff')],'offsetY':_0x410fdd[_0x1289('0x18c')],'timeScale':_0x410fdd['TimeScale'],'width':_0x410fdd[_0x1289('0x187')],'height':_0x410fdd['Height'],'flipLeft':_0x410fdd[_0x1289('0xe0')],'flipRight':_0x410fdd[_0x1289('0xe9')],'animationNames':{'idle':_0x410fdd[_0x1289('0xc')],'walk':_0x410fdd[_0x1289('0x184')],'dash':_0x410fdd[_0x1289('0x159')],'jump':_0x410fdd[_0x1289('0x171')],'ladderidle':_0x410fdd[_0x1289('0x4f')],'ladderclimb':_0x410fdd['LadderClimb'],'ropeidle':_0x410fdd[_0x1289('0x99')],'ropeclimb':_0x410fdd[_0x1289('0x21')]}},$gamePlayer[_0x1289('0x120')]();}),PluginManager[_0x1289('0x14c')](pluginData[_0x1289('0xdb')],_0x1289('0xcb'),_0x4557b3=>{if(!$gameMap)return;if(SceneManager[_0x1289('0x172')][_0x1289('0x17a')]!==Scene_Map)return;VisuMZ[_0x1289('0x43')](_0x4557b3,_0x4557b3);const _0xe01601=$gameActors['actor'](_0x4557b3[_0x1289('0x177')]),_0x23a6d0=_0xe01601[_0x1289('0x108')](),_0x23eeb0=_0x23a6d0===0x0?$gamePlayer:$gamePlayer[_0x1289('0xa7')]()['follower'](_0x23a6d0-0x1);if(!_0x23eeb0)return;_0x23eeb0['dragonbonesAnimation']=_0x4557b3[_0x1289('0x153')];}),PluginManager[_0x1289('0x14c')](pluginData[_0x1289('0xdb')],_0x1289('0x1f'),_0x2bd3e2=>{if(!$gameMap)return;if(SceneManager[_0x1289('0x172')][_0x1289('0x17a')]!==Scene_Map)return;VisuMZ[_0x1289('0x43')](_0x2bd3e2,_0x2bd3e2);const _0x28f478=$gameActors['actor'](_0x2bd3e2[_0x1289('0x177')]),_0x1e054e=_0x28f478['index'](),_0x36d0c3=_0x1e054e===0x0?$gamePlayer:$gamePlayer['followers']()['follower'](_0x1e054e-0x1);if(!_0x36d0c3)return;_0x36d0c3[_0x1289('0x16f')]='';}),PluginManager[_0x1289('0x14c')](pluginData[_0x1289('0xdb')],'MapSprite_EventAnimationPlay',_0x42169f=>{if(!$gameMap)return;if(SceneManager[_0x1289('0x172')][_0x1289('0x17a')]!==Scene_Map)return;VisuMZ[_0x1289('0x43')](_0x42169f,_0x42169f);const _0x56ab74=$gameMap[_0x1289('0x7c')](_0x42169f[_0x1289('0x11e')]);if(!_0x56ab74)return;_0x56ab74[_0x1289('0x16f')]=_0x42169f['Animation'];}),PluginManager[_0x1289('0x14c')](pluginData[_0x1289('0xdb')],_0x1289('0x136'),_0x5d4668=>{if(!$gameMap)return;if(SceneManager[_0x1289('0x172')][_0x1289('0x17a')]!==Scene_Map)return;VisuMZ[_0x1289('0x43')](_0x5d4668,_0x5d4668);const _0x198661=$gameMap['event'](_0x5d4668[_0x1289('0x11e')]);if(!_0x198661)return;_0x198661[_0x1289('0x16f')]='';}),PluginManager[_0x1289('0x14c')](pluginData[_0x1289('0xdb')],'MapSprite_FollowerAnimationPlay',_0x17a73d=>{if(!$gameMap)return;if(SceneManager[_0x1289('0x172')][_0x1289('0x17a')]!==Scene_Map)return;VisuMZ[_0x1289('0x43')](_0x17a73d,_0x17a73d);const _0x1d157c=$gamePlayer[_0x1289('0xa7')]()[_0x1289('0xde')](_0x17a73d['FollowerIndex']);if(!_0x1d157c)return;_0x1d157c[_0x1289('0x16f')]=_0x17a73d['Animation'];}),PluginManager[_0x1289('0x14c')](pluginData[_0x1289('0xdb')],_0x1289('0x7f'),_0x5efd41=>{if(!$gameMap)return;if(SceneManager[_0x1289('0x172')][_0x1289('0x17a')]!==Scene_Map)return;VisuMZ[_0x1289('0x43')](_0x5efd41,_0x5efd41);const _0x2810cb=$gamePlayer[_0x1289('0xa7')]()[_0x1289('0xde')](_0x5efd41['FollowerIndex']);if(!_0x2810cb)return;_0x2810cb[_0x1289('0x16f')]='';}),PluginManager[_0x1289('0x14c')](pluginData['name'],_0x1289('0x0'),_0x51fe52=>{if(!$gameMap)return;if(SceneManager['_scene'][_0x1289('0x17a')]!==Scene_Map)return;VisuMZ[_0x1289('0x43')](_0x51fe52,_0x51fe52),$gamePlayer[_0x1289('0x16f')]=_0x51fe52[_0x1289('0x153')];}),PluginManager['registerCommand'](pluginData[_0x1289('0xdb')],_0x1289('0x197'),_0x2d5b79=>{if(!$gameMap)return;if(SceneManager['_scene'][_0x1289('0x17a')]!==Scene_Map)return;$gamePlayer[_0x1289('0x16f')]='';}),Object[_0x1289('0x4c')](Game_CharacterBase[_0x1289('0x1d')],_0x1289('0x16f'),{'get':function(){return this[_0x1289('0x18a')]()[_0x1289('0x61')];},'set':function(_0x3310d2){this[_0x1289('0x18a')]()[_0x1289('0x61')]=_0x3310d2;},'configurable':!![]}),Game_CharacterBase[_0x1289('0x1d')][_0x1289('0x78')]=function(){const _0x5d72ca=VisuMZ[_0x1289('0x5e')][_0x1289('0x112')][_0x1289('0x3')];this[_0x1289('0xf2')]={'filename':'','animation':'','scaleX':_0x5d72ca[_0x1289('0xeb')],'scaleY':_0x5d72ca[_0x1289('0x98')],'offsetX':_0x5d72ca[_0x1289('0xff')],'offsetY':_0x5d72ca[_0x1289('0x18c')],'timeScale':_0x5d72ca[_0x1289('0x51')],'width':_0x5d72ca['Width'],'height':_0x5d72ca[_0x1289('0x168')],'flipLeft':_0x5d72ca[_0x1289('0xe0')],'flipRight':_0x5d72ca[_0x1289('0xe9')],'animationNames':{'idle':_0x5d72ca[_0x1289('0xc')],'walk':_0x5d72ca[_0x1289('0x184')],'dash':_0x5d72ca['Dash'],'jump':_0x5d72ca[_0x1289('0x171')],'ladderidle':_0x5d72ca[_0x1289('0x4f')],'ladderclimb':_0x5d72ca[_0x1289('0x63')],'ropeidle':_0x5d72ca[_0x1289('0x99')],'ropeclimb':_0x5d72ca[_0x1289('0x21')]}},this[_0x1289('0x16e')]===undefined&&(this['_dragonbonesMoveTimer']=0x0);},Game_CharacterBase[_0x1289('0x1d')][_0x1289('0x4d')]=function(){},Game_CharacterBase[_0x1289('0x1d')][_0x1289('0x2c')]=function(_0x26f518){const _0x5dd1dc=this[_0x1289('0x18a')]();_0x26f518[_0x1289('0x15d')](/<DRAGONBONES SPRITE:[ ]*(.*)>/i)&&(_0x5dd1dc[_0x1289('0x19d')]=String(RegExp['$1'])[_0x1289('0xf8')]());if(_0x26f518[_0x1289('0x15d')](/<DRAGONBONES SPRITE (?:SKIN|NAME|FILENAME):[ ]*(.*)>/i)){if(_0x1289('0xa1')===_0x1289('0x1a7')){function _0x350cb1(){_0x23c094[_0x1289('0xfc')]=_0x4777e0(_0x1fa385['$1']);}}else _0x5dd1dc[_0x1289('0x19d')]=String(RegExp['$1'])[_0x1289('0xf8')]();}_0x26f518[_0x1289('0x15d')](/<DRAGONBONES SPRITE[ ]SCALE:[ ](.*),[ ](.*)>/i)&&(_0x5dd1dc[_0x1289('0xf5')]=Number(RegExp['$1']),_0x5dd1dc[_0x1289('0xe')]=Number(RegExp['$2']));_0x26f518[_0x1289('0x15d')](/<DRAGONBONES SPRITE[ ](?:SCALEX|SCALE X):[ ](.*)>/i)&&(_0x5dd1dc[_0x1289('0xf5')]=Number(RegExp['$1']));if(_0x26f518[_0x1289('0x15d')](/<DRAGONBONES SPRITE[ ](?:SCALEY|SCALE Y):[ ](.*)>/i)){if(_0x1289('0x102')!==_0x1289('0x102')){function _0x1facd9(){const _0x3f4f75=this['_battler'];_0x3f4f75['hasDragonbonesBattler']()?(_0x2e70e6['prototype']['updateBitmap'][_0x1289('0xb5')](this),this[_0x1289('0x182')]!==_0x3f4f75[_0x1289('0xe8')]()[_0x1289('0xa')]&&this[_0x1289('0x70')](),this[_0x1289('0xfa')]()):(_0x1654a2[_0x1289('0x5e')][_0x1289('0x64')]['call'](this),this[_0x1289('0x77')](this['_dragonbones']));}}else _0x5dd1dc[_0x1289('0xe')]=Number(RegExp['$1']);}_0x26f518[_0x1289('0x15d')](/<DRAGONBONES SPRITE[ ]OFFSET:[ ](.*),[ ](.*)>/i)&&(_0x5dd1dc[_0x1289('0xfc')]=Number(RegExp['$1']),_0x5dd1dc['offsetY']=Number(RegExp['$2']));_0x26f518[_0x1289('0x15d')](/<DRAGONBONES SPRITE[ ](?:OFFSETX|OFFSET X):[ ](.*)>/i)&&(_0x5dd1dc['offsetX']=Number(RegExp['$1']));_0x26f518[_0x1289('0x15d')](/<DRAGONBONES SPRITE[ ](?:OFFSETY|OFFSET Y):[ ](.*)>/i)&&(_0x5dd1dc['offsetY']=Number(RegExp['$1']));if(_0x26f518['match'](/<DRAGONBONES SPRITE[ ]SIZE:[ ](.*),[ ](.*)>/i)){if(_0x1289('0x9a')==='plVvd')_0x5dd1dc[_0x1289('0x18e')]=Number(RegExp['$1']),_0x5dd1dc[_0x1289('0x185')]=Number(RegExp['$2']);else{function _0x2266fb(){this['playDragonbonesIdleAnimation']();}}}_0x26f518['match'](/<DRAGONBONES SPRITE[ ]WIDTH:[ ](.*)>/i)&&(_0x5dd1dc[_0x1289('0x18e')]=Number(RegExp['$1']));if(_0x26f518[_0x1289('0x15d')](/<DRAGONBONES SPRITE[ ]HEIGHT:[ ](.*)>/i)){if(_0x1289('0x11f')===_0x1289('0x124')){function _0x4de93f(){_0x1f8be9[_0x1289('0xbc')]=_0x3f85d3(_0x18274c['$1']);}}else _0x5dd1dc[_0x1289('0x185')]=Number(RegExp['$1']);}if(_0x26f518[_0x1289('0x15d')](/<DRAGONBONES SPRITE[ ](?:TIMESCALE|TIME SCALE):[ ](.*)>/i)){if(_0x1289('0x9e')!==_0x1289('0x9e')){function _0x5a2086(){this[_0x1289('0x78')]();}}else _0x5dd1dc[_0x1289('0x131')]=Number(RegExp['$1']);}if(_0x26f518[_0x1289('0x15d')](/<DRAGONBONES SPRITE FLIP LEFT>/i)){if(_0x1289('0xd3')==='poujV')_0x5dd1dc[_0x1289('0x19b')]=!![];else{function _0x3bfdfd(){_0x4002bc[_0x1289('0xfc')]=_0x327753(_0x493ed2['$1']),_0x2470a3['offsetY']=_0x2ac426(_0x48e31a['$2']);}}}_0x26f518[_0x1289('0x15d')](/<DRAGONBONES SPRITE NO FLIP LEFT>/i)&&(_0x5dd1dc[_0x1289('0x19b')]=![]);if(_0x26f518[_0x1289('0x15d')](/<DRAGONBONES SPRITE FLIP RIGHT>/i)){if('EzWdH'!=='EzWdH'){function _0x484d77(){_0x3403f6[_0x1289('0x1d')][_0x1289('0x161')][_0x1289('0xb5')](this),this['_dragonbonesName']!==_0x2370d9[_0x1289('0xe8')]()[_0x1289('0xa')]&&this['setupDragonbones'](),this[_0x1289('0xfa')]();}}else _0x5dd1dc[_0x1289('0x89')]=!![];}_0x26f518[_0x1289('0x15d')](/<DRAGONBONES SPRITE NO FLIP RIGHT>/i)&&(_0x5dd1dc[_0x1289('0x89')]=![]);const _0x13f58b=_0x26f518[_0x1289('0x15d')](/<DRAGONBONES SPRITE MOTION (.*):[ ](.*)>/gi);if(_0x13f58b)for(const _0x2b0763 of _0x13f58b){if(_0x1289('0xb')===_0x1289('0xe7')){function _0x5c52d3(){const _0x55f72c=this[_0x1289('0x111')](_0x4bea1c),_0x2ed2b3=this['_pictures'][_0x55f72c];if(!_0x2ed2b3)return;_0x2ed2b3[_0x1289('0x78')](),_0x2ed2b3[_0x1289('0x19')]();}}else{_0x2b0763[_0x1289('0x15d')](/<DRAGONBONES SPRITE MOTION (.*):[ ](.*)>/i);const _0x250794=String(RegExp['$1'])[_0x1289('0xc6')]()[_0x1289('0xf8')](),_0x1b3d9b=String(RegExp['$2'])[_0x1289('0xc6')]()[_0x1289('0xf8')]();_0x5dd1dc[_0x1289('0xd7')][_0x250794]=_0x1b3d9b;}}if(_0x26f518[_0x1289('0x15d')](/<DRAGONBONES SPRITE (?:SETTINGS|SETTING)>\s*([\s\S]*)\s*<\/DRAGONBONES SPRITE (?:SETTINGS|SETTING)>/i)){const _0x28377e=String(RegExp['$1']);if(_0x28377e['match'](/(?:SKIN|NAME|FILENAME):[ ]*(.*)/i)){if(_0x1289('0x1a1')!==_0x1289('0x176'))_0x5dd1dc['filename']=String(RegExp['$1'])[_0x1289('0xf8')]();else{function _0x34bf47(){this[_0x1289('0x3d')]=new _0x285277(),this[_0x1289('0x137')](this[_0x1289('0x3d')]);}}}if(_0x28377e[_0x1289('0x15d')](/SCALE:[ ](.*),[ ](.*)/i)){if(_0x1289('0x39')===_0x1289('0x16d')){function _0x1a1569(){this['_shadowSprite'][_0x1289('0x183')]=![];}}else _0x5dd1dc[_0x1289('0xf5')]=Number(RegExp['$1']),_0x5dd1dc[_0x1289('0xe')]=Number(RegExp['$2']);}if(_0x28377e[_0x1289('0x15d')](/(?:SCALEX|SCALE X):[ ](.*)/i)){if(_0x1289('0x162')===_0x1289('0x162'))_0x5dd1dc['scaleX']=Number(RegExp['$1']);else{function _0x54875e(){this['playDragonbonesMotion'](_0x951deb);}}}if(_0x28377e[_0x1289('0x15d')](/(?:SCALEY|SCALE Y):[ ](.*)/i)){if('iDtbp'===_0x1289('0x3f'))_0x5dd1dc['scaleY']=Number(RegExp['$1']);else{function _0x665148(){if(!this[_0x1289('0x114')])return;const _0x55432b=this[_0x1289('0x7')]()[_0x1289('0xe8')]();this[_0x1289('0xcd')]!==_0x55432b['animation']&&(this['_dragonbonesAnimation']=_0x55432b[_0x1289('0x61')],this[_0x1289('0x133')]());}}}if(_0x28377e['match'](/OFFSET:[ ](.*),[ ](.*)/i)){if(_0x1289('0xf9')==='asCpW'){function _0x3dc131(){if(this[_0x1289('0x7')](_0x1ec022))return;this[_0x1289('0x192')](_0x15b1c9,'',0x0,_0x47fe9f[_0x1289('0xcc')](_0x249348[_0x1289('0x18e')]/0x2),_0x35a7cf[_0x1289('0xcc')](_0xf79ed8['height']/0x2),0x64,0x64,0xff,0x0);}}else _0x5dd1dc[_0x1289('0xfc')]=Number(RegExp['$1']),_0x5dd1dc['offsetY']=Number(RegExp['$2']);}_0x28377e[_0x1289('0x15d')](/(?:OFFSETX|OFFSET X):[ ](.*)/i)&&(_0x5dd1dc[_0x1289('0xfc')]=Number(RegExp['$1']));_0x28377e[_0x1289('0x15d')](/(?:OFFSETY|OFFSET Y):[ ](.*)/i)&&(_0x5dd1dc[_0x1289('0xbc')]=Number(RegExp['$1']));_0x28377e[_0x1289('0x15d')](/(?:TIMESCALE|TIME SCALE):[ ](.*)/i)&&(_0x5dd1dc[_0x1289('0x131')]=Number(RegExp['$1']));if(_0x28377e[_0x1289('0x15d')](/SIZE:[ ](.*),[ ](.*)/i)){if(_0x1289('0x175')!==_0x1289('0x175')){function _0x29e16e(){_0x214921[_0x1289('0x5e')][_0x1289('0x45')][_0x1289('0xb5')](this),this['setupDragonbonesData']();}}else _0x5dd1dc[_0x1289('0x18e')]=Number(RegExp['$1']),_0x5dd1dc[_0x1289('0x185')]=Number(RegExp['$2']);}_0x28377e[_0x1289('0x15d')](/WIDTH:[ ](.*)/i)&&(_0x5dd1dc[_0x1289('0x18e')]=Number(RegExp['$1']));_0x28377e[_0x1289('0x15d')](/HEIGHT:[ ](.*)/i)&&(_0x5dd1dc[_0x1289('0x185')]=Number(RegExp['$1']));_0x28377e[_0x1289('0x15d')](/NO FLIP LEFT/i)&&(_0x5dd1dc[_0x1289('0x19b')]=![]);_0x28377e['match'](/FLIP LEFT/i)&&(_0x5dd1dc[_0x1289('0x19b')]=!![]);_0x28377e[_0x1289('0x15d')](/NO FLIP RIGHT/i)&&(_0x5dd1dc[_0x1289('0x89')]=![]);_0x28377e[_0x1289('0x15d')](/FLIP RIGHT/i)&&(_0x5dd1dc[_0x1289('0x89')]=!![]);const _0x41d99d=_0x26f518[_0x1289('0x15d')](/(?:ANI|MOTION) (.*):[ ](.*)/gi);if(_0x41d99d){if(_0x1289('0x87')!==_0x1289('0x16b'))for(const _0xa89313 of _0x41d99d){if(_0x1289('0x1')!==_0x1289('0x25')){_0xa89313[_0x1289('0x15d')](/(?:ANI|MOTION) (.*):[ ](.*)/i);const _0x1e4b8a=String(RegExp['$1'])[_0x1289('0xc6')]()[_0x1289('0xf8')](),_0xa61705=String(RegExp['$2'])[_0x1289('0xc6')]()[_0x1289('0xf8')]();_0x5dd1dc['animationNames'][_0x1e4b8a]=_0xa61705;}else{function _0x209cfb(){const _0x4d06a6=_0x5edc0e[_0x1289('0x17d')][_0x1289('0xac')]();if(this[_0x1289('0x49')][_0x1289('0x3b')](_0x4d06a6))this[_0x1289('0x143')]();else!this[_0x1289('0x49')][_0x1289('0x3b')](_0x4d06a6)&&this['processLoad'](_0x4d06a6);}}}else{function _0x270bfa(){_0x48a011*=0x2;}}}}},Game_CharacterBase[_0x1289('0x1d')][_0x1289('0x18a')]=function(){if(this[_0x1289('0xf2')]!==undefined)return this[_0x1289('0xf2')];return this[_0x1289('0x78')](),this[_0x1289('0x4d')](),this[_0x1289('0xf2')];},Game_CharacterBase[_0x1289('0x1d')][_0x1289('0xad')]=function(){return this[_0x1289('0x18a')]()[_0x1289('0x19d')]!=='';},Game_CharacterBase[_0x1289('0x1d')][_0x1289('0x93')]=function(_0xcc4a8){const _0x2efc40=this[_0x1289('0x18a')]();if(!_0xcc4a8)return _0x2efc40[_0x1289('0xd7')]['idle'];_0x2efc40[_0x1289('0x61')]=_0x2efc40[_0x1289('0x61')][_0x1289('0xc6')]()[_0x1289('0xf8')]();if(_0x2efc40[_0x1289('0x61')]!==''&&_0xcc4a8['animation'][_0x1289('0xd8')][_0x2efc40[_0x1289('0x61')]])return _0x2efc40[_0x1289('0x61')];let _0x17d749=[];if(this[_0x1289('0xc8')]())_0x17d749=_0x17d749[_0x1289('0xea')](this[_0x1289('0x18')](_0x2efc40[_0x1289('0xd7')][_0x1289('0x17c')])),_0x17d749=_0x17d749[_0x1289('0xea')](this[_0x1289('0x18')](_0x2efc40[_0x1289('0xd7')][_0x1289('0xca')]));else{if(this[_0x1289('0x1a4')]()&&!this[_0x1289('0xc8')]())Imported[_0x1289('0xbb')]&&this[_0x1289('0xb0')]()?(this[_0x1289('0x16e')]>0x0&&(_0x17d749[_0x1289('0x1ac')](_0x2efc40[_0x1289('0xd7')][_0x1289('0x10a')]),_0x17d749[_0x1289('0x1ac')](_0x2efc40[_0x1289('0xd7')][_0x1289('0x88')]),_0x17d749=_0x17d749[_0x1289('0xea')](this[_0x1289('0x18')](_0x2efc40[_0x1289('0xd7')][_0x1289('0xca')]))),_0x17d749[_0x1289('0x1ac')](_0x2efc40[_0x1289('0xd7')][_0x1289('0x195')]),_0x17d749[_0x1289('0x1ac')](_0x2efc40[_0x1289('0xd7')]['ladderidle'])):(this[_0x1289('0x16e')]>0x0&&(_0x17d749[_0x1289('0x1ac')](_0x2efc40[_0x1289('0xd7')]['ladderclimb']),_0x17d749=_0x17d749[_0x1289('0xea')](this[_0x1289('0x18')](_0x2efc40[_0x1289('0xd7')]['walk']))),_0x17d749[_0x1289('0x1ac')](_0x2efc40[_0x1289('0xd7')][_0x1289('0x23')]));else{if(this[_0x1289('0x16e')]>0x0){if('QIEbO'!==_0x1289('0x5')){if(this[_0x1289('0x46')]()){if(_0x1289('0xb6')===_0x1289('0x2d')){function _0x5958ec(){_0x4a9536[_0x1289('0x1ac')](_0x25e934+0x4);if(_0x4745ac[_0x1289('0x19b')])_0xff7de0[_0x1289('0x1ac')](_0x2aa107+0x6);_0x1c2539[_0x1289('0x1ac')](_0x38e135+0x8);}}else _0x17d749=_0x17d749[_0x1289('0xea')](this[_0x1289('0x18')](_0x2efc40[_0x1289('0xd7')][_0x1289('0x2b')]));}_0x17d749=_0x17d749[_0x1289('0xea')](this[_0x1289('0x18')](_0x2efc40['animationNames'][_0x1289('0xca')]));}else{function _0x1fc03b(){return this[_0x1289('0x18a')]()[_0x1289('0x61')];}}}}}_0x17d749=_0x17d749[_0x1289('0xea')](this[_0x1289('0x18')](_0x2efc40[_0x1289('0xd7')][_0x1289('0x113')]));for(const _0x1aab7b of _0x17d749){if(_0xcc4a8[_0x1289('0x61')][_0x1289('0xd8')][_0x1aab7b])return _0x1aab7b;}return _0x2efc40[_0x1289('0xd7')][_0x1289('0x113')];},Game_CharacterBase[_0x1289('0x1d')]['addDragonbonesAnimationDirections']=function(_0xfa8368){const _0x320cff=this[_0x1289('0x18a')](),_0xf75f9=this[_0x1289('0x123')]();let _0x51091e=[];_0x51091e[_0x1289('0x1ac')](_0xfa8368+_0xf75f9);if(_0xf75f9===0x1){if('uAtzP'===_0x1289('0x186')){function _0xda03ef(){this[_0x1289('0xf2')]=_0x2c7a55[_0x1289('0x18a')]();}}else{_0x51091e[_0x1289('0x1ac')](_0xfa8368+0x4);if(_0x320cff[_0x1289('0x19b')])_0x51091e[_0x1289('0x1ac')](_0xfa8368+0x6);_0x51091e['push'](_0xfa8368+0x2);}}if(_0xf75f9===0x3){_0x51091e[_0x1289('0x1ac')](_0xfa8368+0x6);if(_0x320cff[_0x1289('0x89')])_0x51091e['push'](_0xfa8368+0x4);_0x51091e[_0x1289('0x1ac')](_0xfa8368+0x2);}if(_0xf75f9===0x7){if(_0x1289('0x1a0')!==_0x1289('0x1a0')){function _0x696a14(){_0x2c7052[_0x1289('0x185')]=_0x458ba9(_0x24af91['$1']);}}else{_0x51091e[_0x1289('0x1ac')](_0xfa8368+0x4);if(_0x320cff[_0x1289('0x19b')])_0x51091e[_0x1289('0x1ac')](_0xfa8368+0x6);_0x51091e['push'](_0xfa8368+0x8);}}if(_0xf75f9===0x9){_0x51091e[_0x1289('0x1ac')](_0xfa8368+0x6);if(_0x320cff['flipRight'])_0x51091e['push'](_0xfa8368+0x4);_0x51091e['push'](_0xfa8368+0x8);}return _0x51091e[_0x1289('0x1ac')](_0xfa8368),_0x51091e;},VisuMZ[_0x1289('0x5e')]['Game_CharacterBase_update']=Game_CharacterBase['prototype']['update'],Game_CharacterBase[_0x1289('0x1d')][_0x1289('0x188')]=function(){VisuMZ[_0x1289('0x5e')]['Game_CharacterBase_update'][_0x1289('0xb5')](this),this[_0x1289('0x155')]();},Game_CharacterBase[_0x1289('0x1d')][_0x1289('0x155')]=function(){if(!this['hasDragonbones']())return;if(this['isMoving']()){if(_0x1289('0x4a')===_0x1289('0x4a'))this[_0x1289('0x16e')]=VisuMZ[_0x1289('0x5e')][_0x1289('0x112')][_0x1289('0x3')][_0x1289('0x12b')];else{function _0x42ce1d(){return _0xfcc06['animation'];}}}else{if(_0x1289('0x8d')!=='nyHAO'){function _0x400f92(){_0xc0a28e[_0x1289('0x15d')](/(?:ANI|MOTION)[ ](.*):[ ](.*)/i);const _0x32e3e6=_0x203f57(_0x54f93b['$1'])[_0x1289('0xc6')]()[_0x1289('0xf8')](),_0x1506b0=_0xb4e66b(_0xacf1c6['$2'])[_0x1289('0xf8')]();_0x44f694[_0x1289('0x7b')][_0x32e3e6]=_0x1506b0;}}else this[_0x1289('0x16e')]--;}},VisuMZ['DragonbonesUnion'][_0x1289('0x139')]=Game_Player['prototype']['refresh'],Game_Player['prototype'][_0x1289('0x120')]=function(){VisuMZ[_0x1289('0x5e')][_0x1289('0x139')][_0x1289('0xb5')](this),this[_0x1289('0x4d')]();},Game_Player[_0x1289('0x1d')][_0x1289('0x4d')]=function(){const _0x2cf8af=$gameParty[_0x1289('0x165')]();if(!_0x2cf8af){if(_0x1289('0x118')===_0x1289('0x118'))this['initDragonbonesData']();else{function _0x51d697(){this[_0x1289('0xee')](_0x1289('0x34'));}}}else{if(_0x1289('0x31')!==_0x1289('0x116'))this[_0x1289('0xf2')]=_0x2cf8af[_0x1289('0x18a')]();else{function _0x57a9a8(){_0x123084[_0x1289('0x137')](_0x5df073),_0x3fe9a7['x']=_0x26365b['width']/0x2,_0x2b9268['y']=_0x1b82cf['height']*0x3/0x4,_0x4a3a46=_0x8a2a52||_0x13de39[_0x1289('0x2a')],_0x401762=_0x5a3789[_0x1289('0xc6')](),_0x429703[_0x1289('0x61')][_0x1289('0xd8')][_0x4f07c8]&&_0x2a2c66[_0x1289('0x61')]['play'](_0x35983f);}}}},VisuMZ[_0x1289('0x5e')][_0x1289('0x45')]=Game_Follower[_0x1289('0x1d')][_0x1289('0x120')],Game_Follower[_0x1289('0x1d')][_0x1289('0x120')]=function(){VisuMZ[_0x1289('0x5e')][_0x1289('0x45')][_0x1289('0xb5')](this),this[_0x1289('0x4d')]();},Game_Follower[_0x1289('0x1d')]['setupDragonbonesData']=function(){const _0xab6e24=this[_0x1289('0x146')]();if(!_0xab6e24){if(_0x1289('0x69')!=='qhQcJ'){function _0x17878e(){_0x11eb6d[_0x1289('0xe')]=_0x9f4173(_0x57f8b1['$1']);}}else this[_0x1289('0x78')]();}else this[_0x1289('0xf2')]=_0xab6e24[_0x1289('0x18a')]();},Game_Actor[_0x1289('0x1d')][_0x1289('0x78')]=function(){Game_BattlerBase[_0x1289('0x1d')][_0x1289('0x78')][_0x1289('0xb5')](this),Game_CharacterBase[_0x1289('0x1d')][_0x1289('0x78')]['call'](this);},Game_Actor[_0x1289('0x1d')][_0x1289('0x4d')]=function(){Game_BattlerBase[_0x1289('0x1d')][_0x1289('0x4d')]['call'](this);const _0x434094=this[_0x1289('0x146')]()[_0x1289('0xfe')];Game_CharacterBase[_0x1289('0x1d')]['checkDragonbonesStringTags'][_0x1289('0xb5')](this,_0x434094);},Game_Actor[_0x1289('0x1d')][_0x1289('0x18a')]=function(){if(this[_0x1289('0xf2')]!==undefined)return this[_0x1289('0xf2')];return this[_0x1289('0x78')](),this['setupDragonbonesData'](),this['_dragonbonesSpriteData'];},VisuMZ[_0x1289('0x5e')]['Game_Event_refresh']=Game_Event['prototype'][_0x1289('0x120')],Game_Event[_0x1289('0x1d')][_0x1289('0x120')]=function(){VisuMZ[_0x1289('0x5e')]['Game_Event_refresh'][_0x1289('0xb5')](this),this[_0x1289('0x4d')]();},VisuMZ['DragonbonesUnion'][_0x1289('0xba')]=Game_Event[_0x1289('0x1d')][_0x1289('0xd4')],Game_Event[_0x1289('0x1d')]['clearPageSettings']=function(){VisuMZ[_0x1289('0x5e')]['Game_Event_clearPageSettings'][_0x1289('0xb5')](this),this[_0x1289('0x78')]();},VisuMZ[_0x1289('0x5e')][_0x1289('0x1e')]=Game_Event[_0x1289('0x1d')][_0x1289('0xf7')],Game_Event[_0x1289('0x1d')]['setupPageSettings']=function(){VisuMZ[_0x1289('0x5e')][_0x1289('0x1e')][_0x1289('0xb5')](this),this[_0x1289('0x78')](),this[_0x1289('0x4d')]();},Game_Event[_0x1289('0x1d')][_0x1289('0x4d')]=function(){this[_0x1289('0x16a')](),this[_0x1289('0x96')]();},Game_Event['prototype'][_0x1289('0x16a')]=function(){const _0x2d1cbc=this[_0x1289('0x7c')]()[_0x1289('0xfe')];if(_0x2d1cbc==='')return;this[_0x1289('0x2c')](_0x2d1cbc);},Game_Event[_0x1289('0x1d')][_0x1289('0x96')]=function(){if(!this['page']())return;const _0x36baa5=this[_0x1289('0x56')]();let _0x15ae9f='';for(const _0x18e646 of _0x36baa5){if(_0x1289('0xd6')===_0x1289('0xd6')){if([0x6c,0x198][_0x1289('0x3b')](_0x18e646[_0x1289('0x12f')])){if('vjtpw'!==_0x1289('0xe6')){if(_0x15ae9f!=='')_0x15ae9f+='\x0a';_0x15ae9f+=_0x18e646[_0x1289('0x103')][0x0];}else{function _0x7fce8d(){this[_0x1289('0x60')]&&this['_character'][_0x1289('0xad')]()?this[_0x1289('0x32')]():_0x44fb0d[_0x1289('0x5e')][_0x1289('0x130')][_0x1289('0xb5')](this);}}}}else{function _0x1aafd4(){_0x37667a[_0x1289('0xf5')]=_0x5baa2b(_0x42e9c1['$1']);}}}this[_0x1289('0x2c')](_0x15ae9f);},VisuMZ[_0x1289('0x5e')][_0x1289('0x193')]=Sprite_Character['prototype'][_0x1289('0x152')],Sprite_Character['prototype'][_0x1289('0x152')]=function(_0xa13b61){this[_0x1289('0x78')](),VisuMZ[_0x1289('0x5e')][_0x1289('0x193')]['call'](this,_0xa13b61),this[_0x1289('0x16c')]();},Sprite_Character['prototype']['initDragonbonesData']=function(){this['_dragonbones']=null,this[_0x1289('0xc3')]='',this[_0x1289('0xcd')]='';},Sprite_Character[_0x1289('0x1d')]['createBaseDragonbonesSprite']=function(){this[_0x1289('0x3d')]=new Sprite(),this[_0x1289('0x137')](this[_0x1289('0x3d')]);},VisuMZ[_0x1289('0x5e')][_0x1289('0x52')]=Sprite_Character[_0x1289('0x1d')]['updateBitmap'],Sprite_Character[_0x1289('0x1d')][_0x1289('0x161')]=function(){VisuMZ[_0x1289('0x5e')][_0x1289('0x52')]['call'](this),this[_0x1289('0xfa')]();},Sprite_Character['prototype'][_0x1289('0x19')]=function(){this['_dragonbones']&&(this[_0x1289('0x3d')][_0x1289('0x77')](this[_0x1289('0x114')]),this[_0x1289('0x114')][_0x1289('0xcf')](),this[_0x1289('0x114')]=null,this[_0x1289('0xc3')]='',this[_0x1289('0xcd')]='');},Sprite_Character[_0x1289('0x1d')]['updateDragonbones']=function(){if(!this[_0x1289('0x60')])return this[_0x1289('0x19')]();if(!this['_character'][_0x1289('0xad')]())return this[_0x1289('0x19')]();this[_0x1289('0x104')]();if(!this[_0x1289('0x114')])return;this[_0x1289('0x107')](),this[_0x1289('0x148')](),this[_0x1289('0xfd')]();},Sprite_Character[_0x1289('0x1d')][_0x1289('0x104')]=function(){const _0x5ee4b8=this[_0x1289('0x60')][_0x1289('0x18a')]();if(this[_0x1289('0xc3')]===_0x5ee4b8[_0x1289('0x19d')])return;this['disposeDragonbones'](),this[_0x1289('0xc3')]=_0x5ee4b8[_0x1289('0x19d')],DragonbonesManager[_0x1289('0x134')](_0x5ee4b8[_0x1289('0x19d')],this['onLoadDragonbones']['bind'](this));},Sprite_Character[_0x1289('0x1d')][_0x1289('0x19f')]=function(){const _0x4fc343=this[_0x1289('0x60')]['dragonbonesSpriteData']();this[_0x1289('0x114')]=DragonbonesManager[_0x1289('0x48')](_0x4fc343[_0x1289('0x19d')]),this[_0x1289('0x3d')][_0x1289('0xab')](this['_dragonbones'],0x0),this[_0x1289('0x107')]();},Sprite_Character[_0x1289('0x1d')][_0x1289('0x107')]=function(){if(!this[_0x1289('0x114')])return;const _0x3659ac=this[_0x1289('0x60')][_0x1289('0x18a')](),_0xa2935a=this[_0x1289('0x114')][_0x1289('0x61')];_0xa2935a[_0x1289('0xb9')]&&(this[_0x1289('0x60')]['dragonbonesAnimation']='',this[_0x1289('0xcd')]='',_0xa2935a[_0x1289('0x13c')]='');const _0x187b48=this[_0x1289('0x60')][_0x1289('0x93')](this[_0x1289('0x114')]);this['_dragonbonesAnimation']!==_0x187b48&&(this[_0x1289('0xcd')]=_0x187b48,this[_0x1289('0x133')]());},Sprite_Character[_0x1289('0x1d')][_0x1289('0x133')]=function(){if(!this[_0x1289('0x114')])return;const _0x8e7fb2=this[_0x1289('0x114')][_0x1289('0x61')],_0x17a418=this[_0x1289('0xcd')]['toLowerCase']()[_0x1289('0xf8')]();if(_0x8e7fb2['animations'][_0x17a418]){if(_0x8e7fb2[_0x1289('0x13c')]===_0x17a418&&_0x8e7fb2[_0x1289('0xd8')][_0x17a418][_0x1289('0xb2')]<=0x0)return;_0x8e7fb2[_0x1289('0x17')](_0x17a418);}},Sprite_Character[_0x1289('0x1d')][_0x1289('0x148')]=function(){if(!this[_0x1289('0x114')])return;const _0x4dda37=this[_0x1289('0x60')][_0x1289('0x18a')]();this[_0x1289('0x114')]['x']=_0x4dda37[_0x1289('0xfc')],this[_0x1289('0x114')]['y']=_0x4dda37[_0x1289('0xbc')],this[_0x1289('0x114')][_0x1289('0x86')]['x']=_0x4dda37['scaleX']*this['dragonbonesFlip'](),this[_0x1289('0x114')][_0x1289('0x86')]['y']=_0x4dda37[_0x1289('0xe')];},Sprite_Character[_0x1289('0x1d')][_0x1289('0x9')]=function(){const _0x157606=this[_0x1289('0x60')][_0x1289('0x18a')]();this[_0x1289('0x36')]=this[_0x1289('0x36')]||0x1;if(_0x157606[_0x1289('0x19b')]&&[0x1,0x4,0x7]['includes'](this[_0x1289('0x60')][_0x1289('0x123')]())){if(_0x1289('0x8e')!==_0x1289('0x8e')){function _0x10a580(){this[_0x1289('0x4b')](_0x1289('0xd0'));}}else this[_0x1289('0x36')]=-0x1;}else{if(_0x157606[_0x1289('0x89')]&&[0x9,0x6,0x3]['includes'](this[_0x1289('0x60')]['direction']()))this[_0x1289('0x36')]=-0x1;else{if(![0x8,0x2]['includes'](this[_0x1289('0x60')][_0x1289('0x123')]())){if(_0x1289('0x14')!==_0x1289('0x11a'))this[_0x1289('0x36')]=0x1;else{function _0x59e6ff(){const _0x2331d6=this[_0x1289('0x48')](_0x2d7a71);_0x2331d6&&(_0x2d6e5f[_0x1289('0x137')](_0x2331d6),_0x2331d6['x']=_0x5ea4a4[_0x1289('0x18e')]/0x2,_0x2331d6['y']=_0x45388e[_0x1289('0x185')]*0x3/0x4,_0x5adb6c=_0x300261||_0x3a4cf9[_0x1289('0x2a')],_0x168dc6=_0x534c6b[_0x1289('0xc6')](),_0x2331d6[_0x1289('0x61')][_0x1289('0xd8')][_0x51b927]&&_0x2331d6[_0x1289('0x61')][_0x1289('0x17')](_0x3486d1)),_0x547cd2[_0x495577]=_0x2331d6;}}}}}return this[_0x1289('0x36')];},Sprite_Character['prototype'][_0x1289('0xfd')]=function(){if(!this[_0x1289('0x114')])return;const _0x57fbe1=this['_character'][_0x1289('0x18a')]();let _0x1fc758=_0x57fbe1[_0x1289('0x131')];if(this[_0x1289('0x60')]['isMoving']()){if(_0x1289('0x191')===_0x1289('0x191'))_0x1fc758*=this[_0x1289('0x60')][_0x1289('0x3e')]();else{function _0x56d221(){_0x5ea906['DragonbonesUnion'][_0x1289('0x173')][_0x1289('0xb5')](this),this[_0x1289('0xc1')]();}}}this[_0x1289('0x114')]['animation']['timeScale']=_0x1fc758;},VisuMZ[_0x1289('0x5e')][_0x1289('0x130')]=Sprite_Character['prototype'][_0x1289('0xb4')],Sprite_Character[_0x1289('0x1d')][_0x1289('0xb4')]=function(){if(this['_character']&&this[_0x1289('0x60')][_0x1289('0xad')]()){if(_0x1289('0xd2')===_0x1289('0x1ad')){function _0x3157e5(){if(!_0x153f7d)return;_0x416baf[_0x1289('0x43')](_0xd6943f,_0x5790d0),_0x40fa98[_0x1289('0x10f')](_0x2d624f[_0x1289('0x181')]);const _0x2dcd2b=_0x1c4e63[_0x1289('0x7')](_0x176997[_0x1289('0x181')]),_0x323a95=_0x2dcd2b[_0x1289('0xe8')]();_0x323a95[_0x1289('0xfc')]=_0x211fac[_0x1289('0xff')],_0x323a95[_0x1289('0xbc')]=_0x4c97ab[_0x1289('0x18c')];}}else this['updateCharacterFrameDragonbonesUnion']();}else VisuMZ[_0x1289('0x5e')][_0x1289('0x130')][_0x1289('0xb5')](this);},Sprite_Character['prototype'][_0x1289('0x32')]=function(){const _0x1187af=this[_0x1289('0x60')][_0x1289('0x18a')](),_0x2148db=_0x1187af['height'];this['setFrame'](0x0,0x0,0x0,_0x2148db);};