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
  fields: [
    // Core Identity
    createRadioDropdown('category', 'What Character Class Type is this?', dropdownCharacterClasses),

    // Starter Stats
    {
      name: 'starterAttributes',
      title: 'Starter Attributes (should sum to 15)',
      type: 'object',
      validation: validateTotalSum(15, 'Starter attributes'),
      options: {columns: 3}, // 👈 This will apply column layout *inside* the object
      fields: dropdownPrimaryStats.map((stat) => ({
        name: stat.value.replace(/\s+/g, '_').toLowerCase(),
        title: stat.title,
        type: 'number',
        validation: (Rule: AttributeRules) =>
          Rule.min(1).max(10).error(`${stat.title} must be between 1 and 10`),
      })),
    },

    // Traits
    flexibleReferenceArray('classTraits', 'Class Traits', ['trait']),

    // Starter Equipment
    {
      name: 'startEquipment',
      title: 'Start Equipment',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'item'}]}],
    },

    // Visual Identity
    {name: 'logo', title: 'Class Logo', type: 'image', options: {hotspot: true}},
    {name: 'portrait', title: 'Class Portrait', type: 'image', options: {hotspot: true}},

    // Linked Lore Entry
    {name: 'loreEntry', title: 'Linked Lore Entry', type: 'reference', to: [{type: 'lore'}]},

    // Lore Fields (grouped visually in studio via fieldset)
    {
      name: 'mainTagline',
      title: 'Main Tagline',
      type: 'string',
      fieldset: 'lore',
    },
    {
      name: 'archetype',
      title: 'Role and Archetype',
      type: 'text',
      fieldset: 'lore',
    },
    {
      name: 'appearance',
      title: 'Appearance',
      type: 'text',
      fieldset: 'lore',
    },
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
    {
      name: 'aethericAdaptation',
      title: 'Aetheric Adaptation',
      type: 'text',
      fieldset: 'lore',
    },
    {
      name: 'aethericAdaptationTagline',
      title: 'Aetheric Adaptation Tagline',
      type: 'string',
      fieldset: 'lore',
    },
    {
      name: 'philosophy',
      title: 'Philosophy and Orders',
      type: 'text',
      fieldset: 'lore',
    },
    {
      name: 'symbolism',
      title: 'Symbolism and Role in Eldoria',
      type: 'text',
      fieldset: 'lore',
    },
    {
      name: 'folklore',
      title: 'Folklore',
      type: 'text',
      fieldset: 'lore',
    },

    // Class-specific Skills
    flexibleReferenceArray('classSkills', 'Class Skills', ['skill']),
  ],

  fieldsets: [
    {
      name: 'lore',
      title: 'Lore Fields',
      options: {columns: 1}, // still makes visual separation in the Studio
    },
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
