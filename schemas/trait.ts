// ===========================
// schemas/trait.ts
// ===========================

import {dropdownAllTraitTypes, dropdownTraitTypes} from '../fundamentals/fundamentals'

import {
  createRadioDropdown,
  needsCategory,
  statEffectArray,
  DefenceArray,
  damageRangeArray,
} from '../schemaVariables/schemaVariables'

import {ValidationRule} from '../types/types'

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
              ...DefenceArray('defensiveBonuses', 'defensive_bonuses'),
              ...needsCategory('defensive', 'support', 'aura', 'unique', 'hybrid'),
            },
            {
              ...damageRangeArray('bonusDamage', 'Bonus Damage Types'),
              ...needsCategory('offensive', 'support', 'unique', 'aura', 'hybrid'),
            },
          ],
          preview: {
            select: {
              title: 'traitType',
            },
            prepare({title}: {title?: string}) {
              return {
                title: `Effect: ${title || 'Unknown'}`,
              }
            },
          },
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
    prepare({title, subtitle, media}: {title?: string; subtitle?: string; media?: any}) {
      return {
        title: title || 'Unnamed Trait',
        subtitle: subtitle || 'No category set',
        media,
      }
    },
  },
}
