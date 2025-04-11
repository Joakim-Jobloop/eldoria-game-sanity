// ===========================
// schemas/trait.ts
// ===========================

import {dropdownAllTraitTypes, dropdownTraitTypes} from '../fundamentals/fundamentals'

import {
  createRadioDropdown,
  needsCategory,
  statEffectArray,
  defenceArray,
  damageArray,
  resistanceArray,
} from '../schemaVariables/schemaVariables'

import {ValidationRule} from '../types/types'
import {effectPreview} from '../utils/previews'

interface TraitPreview {
  title?: string
  subtitle?: string
  media?: any
}

export default {
  name: 'trait',
  title: 'Trait',
  type: 'document',
  fields: [
    // Core Info
    {
      name: 'name',
      title: 'Trait Name',
      type: 'string',
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Trait ID',
      type: 'slug',
      options: {source: 'name'},
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Long Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'tooltip',
      title: 'Tooltip (short UI hint)',
      type: 'string',
    },
    {
      name: 'icon',
      title: 'Trait Icon',
      type: 'image',
      options: {hotspot: true},
    },
    // Global Trait Type (optional — if you want an overarching tag for sorting)
    createRadioDropdown('traitType', 'Overall Trait Category', dropdownAllTraitTypes),

    // Modular Effects Array
    {
      name: 'effects',
      title: 'Trait Effects',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            createRadioDropdown('category', 'Effect Type', dropdownTraitTypes),

            {
              ...statEffectArray('statEffects', 'Stat Modifiers'),
              ...needsCategory(
                'offensive',
                'support',
                'utility',
                'defensive',
                'unique',
                'hybrid',
                'aura',
              ),
            },
            {
              ...defenceArray('defensiveBonuses', 'Defensive Modifiers'),
              ...needsCategory('defensive', 'support', 'aura', 'unique', 'hybrid'),
            },
            {
              ...damageArray('damageBonuses', 'Damage Modifiers'),
              ...needsCategory('offensive', 'support', 'unique', 'aura', 'hybrid'),
            },
            {
              ...resistanceArray('damageResistances', 'Resistances Modifiers'),
              ...needsCategory('defensive', 'support', 'aura', 'unique', 'hybrid'),
            },
          ],
          preview: effectPreview,
        },
      ],
    },
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'traitType',
      media: 'icon',
    },
    prepare({title, subtitle, media}: TraitPreview) {
      return {
        title: title || 'Unnamed Trait',
        subtitle: subtitle || 'No category set',
        media,
      }
    },
  },
}
