// Base Types and Utilities
export * from './baseTypes'
export * from './presets'

// Game Systems
export * from './combatTypes'
export * from './effectTypes'
export * from './equipmentTypes'
export * from './statTypes'
export * from './mechanicsTypes'
export * from './progressionTypes'

// World & Narrative
export * from './aethericTypes'
export * from './narrativeTypes'

// Documentation & Configuration
export * from './documentationTypes'
export * from './configTypes'

// Document Schemas
import item from '../schemas/item'
import characterClass from '../schemas/characterClass'
import characterRace from '../schemas/characterRace'
import skill from '../schemas/skill'
import trait from '../schemas/trait'
import location from '../schemas/location'
import structure from '../schemas/structure'
import faction from '../schemas/faction'
import npc from '../schemas/npc'
import quest from '../schemas/quest'
import lore from '../schemas/lore'
import gameData from '../schemas/gameData/gameData'
import documentationReference from '../schemas/documentationReference'

// Schema Type Hierarchies
const characterTypes = [characterClass, characterRace, npc]
const worldTypes = [location, structure, faction]
const progressionTypes = [quest, skill, trait]
const loreTypes = [lore]
const itemTypes = [item]
const systemTypes = [gameData]
const docsTypes = [documentationReference]

// Content Categories
const contentCategories = {
  characters: characterTypes,
  world: worldTypes,
  progression: progressionTypes,
  items: itemTypes,
  lore: loreTypes,
  system: systemTypes,
  docs: docsTypes,
}

export const schemaTypes = [
  // Character Types
  ...contentCategories.characters,

  // World Building
  ...contentCategories.world,

  // Progression Systems
  ...contentCategories.progression,

  // Items & Equipment
  ...contentCategories.items,

  // Lore & Background
  ...contentCategories.lore,

  // System Configuration
  ...contentCategories.system,

  // Documentation
  ...contentCategories.docs,
]

// Export content categories for documentation and UI organization
export {contentCategories}
