// =======================
// schemaVariables.ts
// =======================

import { allDamageTypes } from '../fundamentals/fundamentals';
import {MinMaxRule, SumValidationRule, ValidationRule} from '../types/types'
import { formatToDropdownOptions } from '../utils/formatter';

// Reusable dropdown formatter for stats, items, traits, etc.
export const checkDropdown = (
  name: string,
  title: string,
  options: string[] | {title: string; value: string}[]
) => {
  const isStringArray = typeof options[0] === 'string'
  return {
    name,
    title,
    type: 'array',
    of: [{type: 'string'}],
    options: {
      layout: 'grid',
      list: isStringArray ? formatToDropdownOptions(options as string[]) : options,
    },
    validation: (Rule: ValidationRule) => Rule.required().error(`One must be selected`),
  }
}

export const createRadioDropdown = (
  name: string,
  title: string,
  options: {title: string; value: string}[]
) => ({
  name,
  title,
  type: 'string',
  options: {
    layout: 'radio',
    list: options,
  },
  validation: (Rule: any) =>
    Rule.required()
      .custom((value: any) => {
        if (!value) return 'You must select one of the options!'
        if (typeof value != 'string') return 'Invalid selection'
        return true
      })
      .error('You must select exactly one of the provided options!'),
})

export const numberDropdown = (
  name: string,
  title: string,
  options: string[],
  isArray: boolean = false
) => ({
  name,
  title,
  type: isArray ? 'array' : 'object',
  fields: Array.from(new Set(options)).map((option) => ({
    name: option.replace(/\s+/g, '_'),
    title: option,
    type: 'number',
  })),
  validation: (Rule: ValidationRule) => Rule.required().error(`${title} must be selected`),
})

export const durabilityValidation = (Rule: MinMaxRule) =>
  Rule.min(1).max(999).error('Durability must be between 1 and 999')

export const offensiveStats = () => ({
  name: 'damage',
  title: 'Set the damage for the weapon',
  type: 'object',
  fields: allDamageTypes.flatMap((stat) => {
    const base = stat.toLowerCase().replace(/\s+/g, '_')
    return [
      {name: `${base}_min`, title: 'Min', type: 'number', fieldset: base},
      {name: `${base}_max`, title: 'Max', type: 'number', fieldset: base},
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
    name: stat.toLowerCase().replace(/\s+/g, '_'),
    title: stat,
    type: 'number',
    fieldset: 'defenseStats',
  })),
  validation: (Rule: ValidationRule) =>
    Rule.required().error('Item must have at least one defense value'),
})

export const flexibleReferenceArray = (name: string, title: string, types: string[]) => ({
  name,
  title,
  type: 'array',
  of: [
    {
      type: 'reference',
      to: types.map((type) => ({type})),
    },
  ],
})


export const requiredField = (message: string) => (Rule: ValidationRule) =>
  Rule.required().error(message)


//* this code is suppose to be for any amount of params, for main categories
export const needsCategory = (...categories: string[]) => ({
  hidden: ({ parent }: { parent?: { category?: string } }) =>
    !parent?.category ||
    !categories.includes(parent.category.toLowerCase().replace(/\s+/g, '_')),
})

//* this code is used for one main and one sub category
export const needsCategories = (category: string, subCategory: string) => ({
  hidden: ({parent}: {parent?: {category?: string[]; subCategory?: string[]}}) => {
    if (!parent || !parent.category || !parent.subCategory) return true
    const hasCategory = parent.category.map((c) => c.toLowerCase()).includes(category.toLowerCase())
    const hasSubCategory = parent.subCategory.map((s) => s.toLowerCase()).includes(subCategory.toLowerCase())
    return !(hasCategory && hasSubCategory)
  },
})

//* used for roles
export const needsRoleType = (...roles: string[]) => ({
  hidden: ({ parent }: { parent?: { roleType?: string } }) =>
    !parent?.roleType || !roles.map(r => r.toLowerCase()).includes(parent.roleType.toLowerCase()),
})

export const validateTotalSum = (
  expectedTotal: number,
  label = 'Attributes',
  options: {exact?: boolean; min?: number; max?: number} = {exact: true}
) => (Rule: SumValidationRule) =>
  Rule.custom((fields) => {
    const total = Object.values(fields || {}).reduce((acc, val) => acc + (val || 0), 0)
    if (options.exact && total !== expectedTotal) {
      return `${label} must total exactly ${expectedTotal}`
    }
    if (options.min && total < options.min) {
      return `${label} must be at least ${options.min}`
    }
    if (options.max && total > options.max) {
      return `${label} must be no more than ${options.max}`
    }
    return true
  })