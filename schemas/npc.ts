// ===========================
// schemas/npc.ts
// ===========================

import {
  dropdownAetherAlignments,
  dropdownCharacterRaces,
  dropdownCharacterClasses,
  dropdownNpcRoleTypes,
  dropdownElementalTypes,
  dropdownPhysicalTypes,
  dropdownEnemyTypes,
  dropdownEnemyAggroType,
  dropdownLootTiers,
  dropdownCombatTagOptions,
} from '../fundamentals/fundamentals'

import {createRadioDropdown, checkDropdown, needsRoleType} from '../schemaVariables/schemaVariables'

import {
  skillOffensiveStats,
  skillDefensiveStats,
  skillStatEffects,
} from '../schemaVariables/skills/skillSchemaVariables'

import {MinMaxRule, ValidationRule} from '../types/types'

export default {
  name: 'npc',
  title: 'NPC (Friendly or Hostile)',
  type: 'document',
  fields: [
    // Basic Identity
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug / ID',
      type: 'slug',
      options: {source: 'name'},
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {name: 'portrait', title: 'Portrait / Illustration', type: 'image', options: {hotspot: true}},
    {name: 'description', title: 'Description', type: 'text'},

    // Classification
    createRadioDropdown('roleType', 'What type of NPC is this?', dropdownNpcRoleTypes),
    createRadioDropdown('aetherAlignment', 'Aetheric Alignment', dropdownAetherAlignments),
    {
      name: 'isHostile',
      title: 'Is Hostile?',
      type: 'boolean',
      description: 'Enable enemy-specific fields if true',
    },
    {name: 'isBoss', title: 'Is This a Boss?', type: 'boolean'},

    // Dialogue & Lore
    {name: 'dialogueKey', title: 'Dialogue Key (for frontend)', type: 'string'},
    {name: 'loreEntry', title: 'Linked Lore Entry', type: 'reference', to: [{type: 'lore'}]},
    {name: 'questReference', title: 'Associated Quest', type: 'reference', to: [{type: 'quest'}]},

    // Tags and Traits
    checkDropdown('raceTags', 'What race(s) apply?', dropdownCharacterRaces),
    checkDropdown('classTags', 'What class(es) relate to this NPC?', dropdownCharacterClasses),

    // Merchant Inventory
    {
      name: 'inventory',
      title: 'Merchant Inventory',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'item'}]}],
      ...needsRoleType('Merchant'),
    },

    // Hostile/Enemy Stats
    {
      name: 'enemyType',
      title: 'Enemy Type',
      type: 'string',
      options: {list: dropdownEnemyTypes, layout: 'dropdown'},
      hidden: ({parent}: any) => !parent?.isHostile,
    },
    {
      name: 'level',
      title: 'Level',
      type: 'number',
      validation: (Rule: MinMaxRule) => Rule.min(1).max(100),
      hidden: ({parent}: any) => !parent?.isHostile,
    },
    {
      name: 'health',
      title: 'Health Points',
      type: 'number',
      hidden: ({parent}: any) => !parent?.isHostile,
    },
    {
      name: 'speed',
      title: 'Speed / Turn Priority',
      type: 'number',
      hidden: ({parent}: any) => !parent?.isHostile,
    },
    checkDropdown('elementalType', 'Elemental Affinity (if any)', dropdownElementalTypes),
    checkDropdown('physicalType', 'Physical Profile (if any)', dropdownPhysicalTypes),

    // Combat Tags and Stats
    createRadioDropdown('combatType', 'Combat Type', dropdownCombatTagOptions),
    createRadioDropdown('aggroType', 'Aggression Type', dropdownEnemyAggroType),
    createRadioDropdown('lootTier', 'Loot Tier', dropdownLootTiers),

    {
      name: 'skillSet',
      title: 'Skills',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'skill'}]}],
    },
    {
      name: 'dangerRating',
      title: 'Danger Rating (1–5)',
      type: 'number',
      validation: (Rule: MinMaxRule) => Rule.min(1).max(5),
      hidden: ({parent}: any) => !parent?.isHostile,
    },
    {
      name: 'canBeTamed',
      title: 'Can Be Tamed?',
      type: 'boolean',
      hidden: ({parent}: any) => !parent?.isHostile,
    },

    // Stats (hidden unless hostile)
    {...skillOffensiveStats(), hidden: ({parent}: any) => !parent?.isHostile},
    {...skillDefensiveStats(), hidden: ({parent}: any) => !parent?.isHostile},
    {...skillStatEffects(), hidden: ({parent}: any) => !parent?.isHostile},

    // World Integration
    {
      name: 'faction',
      title: 'Faction or Sect',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'faction'}]}],
    },
    {
      name: 'lootTable',
      title: 'Loot Table',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'item'}]}],
      hidden: ({parent}: any) => !parent?.isHostile,
    },
    {
      name: 'spawnLocations',
      title: 'Spawn Locations',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'location'}]}],
      hidden: ({parent}: any) => !parent?.isHostile,
    },
    {
      name: 'corruptedFormOf',
      title: 'Corrupted Form of Race',
      type: 'reference',
      to: [{type: 'characterRace'}],
      hidden: ({parent}: any) => !parent?.isHostile,
    },
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'roleType',
      media: 'portrait',
    },
    prepare({title, subtitle, media}: {title?: string; subtitle?: string; media?: any}) {
      return {
        title: title || 'Unnamed NPC',
        subtitle: subtitle || 'No role defined',
        media,
      }
    },
  },
}
