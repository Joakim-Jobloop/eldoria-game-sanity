// ===========================
// schemas/trait.ts
// ===========================

import { dropdownAllTraitTypes, dropdownTraitTypes } from '../fundamentals/fundamentals'

import {
  createRadioDropdown,
  needsCategory,
  statEffectArray,
  DefenceArray,
  damageRangeArray,
} from '../schemaVariables/schemaVariables'

import { ValidationRule } from '../types/types'

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

    // Global Trait Type
    createRadioDropdown('traitType', 'Overall Trait Category', dropdownAllTraitTypes),

    // Modular Effects
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
              ...DefenceArray('defensiveBonuses', 'Defensive Bonuses'),
              ...needsCategory('defensive', 'support', 'aura', 'unique', 'hybrid'),
            },
            {
              ...damageRangeArray('bonusDamage', 'Bonus Damage Types'),
              ...needsCategory('offensive', 'support', 'unique', 'aura', 'hybrid'),
            },
          ],
          preview: {
            select: {
              type: 'category',
              stats: 'statEffects',
              dmg: 'bonusDamage',
              def: 'defensiveBonuses',
            },
            prepare({ type, stats, dmg, def }: { type?: string; stats?: any[]; dmg?: any[]; def?: any[] }) {
              const lines: string[] = []

              if (Array.isArray(stats)) {
                stats.forEach((s) => lines.push(`${s.amount > 0 ? '+' : ''}${s.amount} ${s.stat}`))
              }

              if (Array.isArray(dmg)) {
                dmg.forEach((d) =>
                  lines.push(`+${d.min}-${d.max} ${d.type}${d.duration ? ` (${d.duration}s)` : ''}`)
                )
              }

              if (Array.isArray(def)) {
                def.forEach((d) => lines.push(`DEF: ${d.amount > 0 ? '+' : ''}${d.amount} ${d.stat}`))
              }

              return {
                title: `Effect: ${type || 'Unknown'}`,
                subtitle: lines.length ? lines.join(', ') : 'No modifiers defined',
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
      effects: 'effects',
    },
    prepare({ title, subtitle, media, effects }: { title?: string; subtitle?: string; media?: any; effects?: any[] }) {
      const effectLines: string[] = []

      if (Array.isArray(effects)) {
        for (const e of effects) {
          if (Array.isArray(e?.statEffects)) {
            e.statEffects.forEach((s: any) => effectLines.push(`+${s.amount} ${s.stat}`))
          }
          if (Array.isArray(e?.bonusDamage)) {
            e.bonusDamage.forEach((d: any) =>
              effectLines.push(`+${d.min}-${d.max} ${d.type}${d.duration ? ` (${d.duration}s)` : ''}`)
            )
          }
          if (Array.isArray(e?.defensiveBonuses)) {
            e.defensiveBonuses.forEach((d: any) =>
              effectLines.push(`DEF: +${d.amount} ${d.stat}`)
            )
          }
        }
      }

      return {
        title: title || 'Unnamed Trait',
        subtitle:
          effectLines.length > 0
            ? effectLines.slice(0, 4).join(', ') + (effectLines.length > 4 ? '...' : '')
            : subtitle || 'No effects defined',
        media,
      }
    },
  },
}
