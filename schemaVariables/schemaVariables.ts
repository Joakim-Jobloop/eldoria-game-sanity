import {allDamageTypes, elementalTypes} from '../fundamentals/attributes'
import {MinMaxRule, ValidationRule} from '../types/types'

export const durabilityValidation = (Rule: MinMaxRule) =>
  Rule.min(1).max(999).error('Durability must be between 1 and 999')

export const numberDropdown = (
  name: string,
  title: string,
  options: string[],
  isArray: boolean = false,
) => ({
  name,
  title,
  type: isArray ? 'array' : 'object',
  fields: Array.from(new Set(options)).map((option) => ({
    // Deduplicate!
    name: option.replace(/\s+/g, '_'), // Replace spaces with "_"
    title: option, // Keep original title as-is
    type: 'number',
  })),
  validation: (Rule: ValidationRule) => Rule.required().error(`${title} must be selected`),
})

export const checkDropdown = (name: string, title: string, options: string[]) => ({
  name,
  title,
  type: 'array',
  of: [{type: 'string'}],
  options: {
    layout: 'grid',
    list: options.map((option) => ({
      title: option,
      value: option.toLowerCase().replace(/\s+/g, '_'), // Consistent formatting
    })),
  },
  validation: (Rule: ValidationRule) => Rule.required().error(`One must be selected`),
})

export const offensiveStats = () => ({
  name: 'damage',
  title: 'Set the damage for the weapon',
  type: 'object',
  fields: allDamageTypes.flatMap((stat) => {
    const baseName = stat.toLowerCase().replace(/\s+/g, '_')
    return [
      {
        name: `${baseName}_min`,
        title: 'Min',
        type: 'number',
        fieldset: baseName,
      },
      {
        name: `${baseName}_max`,
        title: 'Max',
        type: 'number',
        fieldset: baseName,
      },
    ]
  }),
  fieldsets: allDamageTypes.map((stat) => ({
    name: stat.toLowerCase().replace(/\s+/g, '_'),
    title: stat,
    options: {columns: 2},
  })),
  validation: (Rule: ValidationRule) =>
    Rule.required().error('Weapon must have at least one damage type'),
})

export const defensiveStats = () => ({
  name: 'defenses',
  title: 'Set the defenses for the item',
  type: 'object',
  fieldsets: [{name: 'defenseStats', title: 'Defense Stats', options: {columns: 3}}],
  fields: allDamageTypes.map((stat) => ({
    name: stat.toLowerCase().replace(/\s+/g, '_'), // Fix invalid field names
    title: stat,
    type: 'number',
    fieldset: 'defenseStats',
  })),
  validation: (Rule: ValidationRule) =>
    Rule.required().error('Item must have at least one defense value'),
})
