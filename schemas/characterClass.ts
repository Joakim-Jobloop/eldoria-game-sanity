// ===========================
// schemas/characterClass.ts
// ===========================

import {dropdownCharacterClasses, dropdownPrimaryStats} from '../fundamentals/fundamentals'

import {
  validateTotalSum,
  createRadioDropdown,
  flexibleReferenceArray,
} from '../schemaVariables/schemaVariables'

import {AttributeRules} from '../types/types'

export default {
  name: 'characterClass',
  title: 'Character Class',
  type: 'document',
  fieldsets: [
    {name: 'starterStats', title: 'Starter Stats (should sum to 15)', options: {columns: 3}},
    {name: 'lore', title: 'Lore Fields', options: {columns: 2}},
  ],
  fields: [
    // Dropdown for class name (radio)
    createRadioDropdown('category', 'What Character Class Type is this?', dropdownCharacterClasses),

    // Stat block with validation
    {
      name: 'starterAttributes',
      title: 'Starter Attributes',
      type: 'object',
      fieldset: 'starterStats',
      validation: validateTotalSum(15, 'Starter attributes'),
      fields: dropdownPrimaryStats.map((stat) => ({
        name: stat.value.replace(/\s+/g, '_').toLowerCase(), // sanitize for valid field name
        title: stat.title,
        type: 'number',
        validation: (Rule: AttributeRules) =>
          Rule.min(1).max(10).error(`${stat.title} must be between 1 and 10`),
      })),
    },

    // Trait references
    flexibleReferenceArray('classTraits', 'Class Traits', ['trait']),

    // Starter equipment
    {
      name: 'startEquipment',
      title: 'Start Equipment',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'item'}],
        },
      ],
    },

    // Visual fields
    {name: 'logo', title: 'Class Logo', type: 'image', options: {hotspot: true}},
    {name: 'portrait', title: 'Class Portrait', type: 'image', options: {hotspot: true}},

    // Reference: links to lore entry for expanded codex text
    {name: 'loreEntry', title: 'Linked Lore Entry', type: 'reference', to: [{type: 'lore'}]},

    // Core lore data (grouped in fieldset)
    {name: 'mainTagline', title: 'Main Tagline', type: 'string', fieldset: 'lore'},
    {name: 'archetype', title: 'Role and Archetype', type: 'text', fieldset: 'lore'},
    {name: 'appearance', title: 'Appearance', type: 'text', fieldset: 'lore'},
    {
      name: 'aethericConnection',
      title: 'Connection to Aetheric Phenomena',
      type: 'text',
      fieldset: 'lore',
    },
    {
      name: 'aethericConnectionTagline',
      title: 'Aetheric Connection Tagline',
      type: 'string',
      fieldset: 'lore',
    },
    {name: 'aethericAdaptation', title: 'Aetheric Adaptation', type: 'text', fieldset: 'lore'},
    {
      name: 'aethericAdaptationTagline',
      title: 'Aetheric Adaptation Tagline',
      type: 'string',
      fieldset: 'lore',
    },
    {name: 'philosophy', title: 'Philosophy and Orders', type: 'text', fieldset: 'lore'},
    {name: 'symbolism', title: 'Symbolism and Role in Eldoria', type: 'text', fieldset: 'lore'},
    {name: 'folklore', title: 'Folklore', type: 'text', fieldset: 'lore'},

    // Skill references
    flexibleReferenceArray('classSkills', 'Class Skills', ['skill']),
  ],

  preview: {
    select: {
      title: 'category',
      subtitle: 'mainTagline',
      media: 'portrait',
    },
    prepare({title, subtitle, media}: {title?: string; subtitle?: string; media?: any}) {
      return {
        title: title || 'Unnamed Class',
        subtitle: subtitle?.slice(0, 100) || 'No tagline provided',
        media,
      }
    },
  },
}
