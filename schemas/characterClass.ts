// ===========================
// schemas/characterClass.ts
// ===========================

import {Rule} from 'sanity'
import {createNamedEntity} from '../schemaTypes/presets.js'
import {attributeBlock} from '../schemaTypes/statTypes.js'
import {createDefaultFieldsets} from '../schemaTypes/presets.js'
import {dropdownCharacterClasses} from '../fundamentals/fundamentals.js'
import {createRadioDropdown, flexibleReferenceArray} from '../schemaVariables/schemaVariables.js'
import {loreable} from '../schemaTypes/baseTypes.js'

interface ClassPreview {
  title?: string
  subtitle?: string
  media?: any
  aethericConnection?: string
}

export default {
  name: 'characterClass',
  title: 'Character Class',
  type: 'document',
  ...createDefaultFieldsets,
  fields: [
    // Use base fields (name, slug, description) with image only
    ...Object.values(createNamedEntity({withImage: true, withLore: false})),

    // Core Identity
    createRadioDropdown('category', 'What Character Class Type is this?', dropdownCharacterClasses),

    // Starter Stats using our new attributeBlock
    ...attributeBlock(15).fields,

    // Visual Identity (using hotspot from baseTypes)
    {
      name: 'logo',
      title: 'Class Logo',
      type: 'image',
      options: {hotspot: true},
      fieldset: 'visuals',
      validation: (Rule: Rule) => Rule.required().error('Class logo is required'),
    },
    {
      name: 'portrait',
      title: 'Class Portrait',
      type: 'image',
      options: {hotspot: true},
      fieldset: 'visuals',
      validation: (Rule: Rule) => Rule.required().error('Class portrait is required'),
    },

    // Traits and Equipment
    flexibleReferenceArray('classTraits', 'Class Traits', ['trait']),
    {
      name: 'startEquipment',
      title: 'Start Equipment',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'item'}]}],
      fieldset: 'core',
    },

    // Base lore fields from loreable
    ...Object.values(loreable),

    // Class-specific information
    {
      name: 'archetype',
      title: 'Role and Archetype',
      type: 'text',
      fieldset: 'lore',
      description: 'The core role and archetype this class fulfills in the game world',
    },
    {
      name: 'appearance',
      title: 'Appearance',
      type: 'text',
      fieldset: 'lore',
      description: 'Typical physical appearance and distinctive features of this class',
    },

    // Detailed Lore References
    {
      name: 'classLore',
      title: 'Class Lore',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'lore'}]}],
      fieldset: 'lore',
      description:
        "Detailed lore entries about this class's aetheric connections, philosophy, and cultural role",
      validation: (Rule: Rule) =>
        Rule.required().error('At least one lore entry is required for class documentation'),
    },

    // Class Skills
    flexibleReferenceArray('classSkills', 'Class Skills', ['skill']),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'portrait',
      aethericConnection: 'aethericConnectionTagline',
    },
    prepare({title, subtitle, media, aethericConnection}: ClassPreview) {
      return {
        title: '⚔️ ' + (title || 'Unnamed Class'),
        subtitle:
          [subtitle, aethericConnection].filter(Boolean).join(' - ') || 'No category provided',
        media,
      }
    },
  },
}
