// ===========================
// schemas/trait.ts
// ===========================

import {
  dropdownTraitTypes,
} from '../fundamentals/fundamentals'

import {
  createRadioDropdown,
} from '../schemaVariables/schemaVariables'

import {
  damageRangeArray,
  DefenceArray,
  statEffectArray,
} from '../schemaVariables/schemaVariables'

import { ValidationRule } from '../types/types'

export default {
  name: 'trait',
  title: 'Trait',
  type: 'document',
  fields: [
    // Core
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
      options: { source: 'name' },
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
      options: { hotspot: true },
    },

    // Classification
    createRadioDropdown('traitType', 'Trait Category', dropdownTraitTypes),

    // Effects (flexible stat logic)
    statEffectArray('statEffects', 'Stat Modifiers'),
    DefenceArray('defensiveBonuses', 'Defensive Bonuses'),
    damageRangeArray('bonusDamage', 'Bonus Damage Types'),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'traitType',
      media: 'icon',
    },
    prepare({ title, subtitle, media }: { title?: string; subtitle?: string; media?: any }) {
      return {
        title: title || 'Unnamed Trait',
        subtitle: subtitle || 'No category set',
        media,
      }
    },
  },
}
