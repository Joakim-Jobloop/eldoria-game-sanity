// ===========================
// schemas/npc.ts
// ===========================

import {createNamedEntity} from '../schemaTypes/presets'
import {combatStats, resourceStats} from '../schemaTypes/statTypes'
import {createDefaultFieldsets} from '../schemaTypes/presets'
import {lootTable} from '../schemaTypes/mechanicsTypes'
import {
  dropdownNpcRoleTypes,
  dropdownEnemyTypes,
  dropdownEnemyAggroType,
  dropdownCombatTagOptions,
  dropdownLootTiers,
  dropdownCharacterRaces,
  dropdownCharacterClasses,
  dropdownAetherAlignments,
} from '../fundamentals/fundamentals'
import {createRadioDropdown, checkDropdown, needsRoleType} from '../schemaVariables/schemaVariables'
import {
  skillOffensiveStats,
  skillDefensiveStats,
  skillStatEffects,
} from '../schemaVariables/skills/skillSchemaVariables'
import {Rule} from 'sanity'

interface NPCFlags {
  isHostile?: boolean
  isBoss?: boolean
}

interface NPCPreviewData {
  title?: string
  subtitle?: string
  media?: any
  flags?: NPCFlags
}

interface NPCParent {
  combatFlags?: NPCFlags
  roleType?: string
}

export default {
  name: 'npc',
  title: 'NPC (Friendly or Hostile)',
  type: 'document',
  ...createDefaultFieldsets,
  fields: [
    // Base fields with image
    ...Object.values(createNamedEntity({withImage: true, withLore: true})),

    // Core Classification
    createRadioDropdown('roleType', 'What type of NPC is this?', dropdownNpcRoleTypes),
    createRadioDropdown('aetherAlignment', 'Aetheric Alignment', dropdownAetherAlignments),

    // Combat Flags
    {
      name: 'combatFlags',
      title: 'Combat Properties',
      type: 'object',
      fieldset: 'core',
      fields: [
        {name: 'isHostile', title: 'Is Hostile?', type: 'boolean'},
        {name: 'isBoss', title: 'Is Boss?', type: 'boolean'},
      ],
      validation: (Rule: Rule) => Rule.required(),
    },

    // Merchant Properties
    {
      name: 'merchantInventory',
      title: 'Merchant Inventory',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'item'}]}],
      ...needsRoleType('Merchant'),
    },

    // Combat Properties (shown if hostile)
    {
      name: 'enemyType',
      title: 'Enemy Type',
      type: 'string',
      options: {list: dropdownEnemyTypes},
      hidden: ({parent}: {parent?: NPCParent}) => !parent?.combatFlags?.isHostile,
    },

    // Combat Stats (using our stat types)
    {...combatStats, hidden: ({parent}) => !parent?.combatFlags?.isHostile},
    {...resourceStats, hidden: ({parent}) => !parent?.combatFlags?.isHostile},

    // Combat Behavior
    {
      name: 'combatBehavior',
      title: 'Combat Behavior',
      type: 'object',
      hidden: ({parent}) => !parent?.combatFlags?.isHostile,
      fieldset: 'combat',
      fields: [
        createRadioDropdown('aggroType', 'Aggression Type', dropdownEnemyAggroType),
        createRadioDropdown('combatStyle', 'Combat Style', dropdownCombatTagOptions),
        {
          name: 'dangerRating',
          title: 'Danger Rating (1-5)',
          type: 'number',
          validation: (Rule) => Rule.min(1).max(5),
        },
      ],
    },

    // Combat Stats and Effects
    {
      ...skillOffensiveStats(),
      hidden: ({parent}) => !parent?.combatFlags?.isHostile,
    },
    {
      ...skillDefensiveStats(),
      hidden: ({parent}) => !parent?.combatFlags?.isHostile,
    },
    {
      ...skillStatEffects(),
      hidden: ({parent}) => !parent?.combatFlags?.isHostile,
    },

    // Character Aspects
    checkDropdown('raceTags', 'What race(s) apply?', dropdownCharacterRaces),
    checkDropdown('classTags', 'What class(es) relate to this NPC?', dropdownCharacterClasses),

    // Drops and Loot
    createRadioDropdown('lootTier', 'Loot Quality Tier', dropdownLootTiers),
    {...lootTable, hidden: ({parent}) => !parent?.combatFlags?.isHostile},

    // World Integration
    {
      name: 'worldIntegration',
      title: 'World Integration',
      type: 'object',
      fieldset: 'integration',
      fields: [
        {
          name: 'faction',
          title: 'Faction or Sect',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'faction'}]}],
        },
        {
          name: 'spawnLocations',
          title: 'Spawn Locations',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'location'}]}],
        },
        {
          name: 'corruptedFormOf',
          title: 'Corrupted Form of Race',
          type: 'reference',
          to: [{type: 'characterRace'}],
        },
      ],
    },
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'roleType',
      media: 'portrait',
      flags: 'combatFlags',
    },
    prepare({title, subtitle, media, flags}: NPCPreviewData) {
      const prefix = flags?.isHostile ? '⚔️ ' : flags?.isBoss ? '👑 ' : '👤 '
      return {
        title: prefix + (title || 'Unnamed NPC'),
        subtitle: subtitle || 'No role defined',
        media,
      }
    },
  },
}
