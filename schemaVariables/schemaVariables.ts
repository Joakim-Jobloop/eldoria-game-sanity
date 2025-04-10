// =======================
// schemaVariables.ts
// =======================

import {allDamageTypes, allStats} from '../fundamentals/fundamentals'
import {
  MinMaxRule,
  SumValidationRule,
  validateUniqueReferences,
  ValidationRule,
} from '../types/types'
import {formatToDropdownOptions} from '../utils/formatter'
import {statsPreview} from '../utils/previews'

// ========== Shared Dropdowns ==========

export const checkDropdown = (
  name: string,
  title: string,
  options: string[] | {title: string; value: string}[],
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
  options: {title: string; value: string}[],
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
  isArray: boolean = false,
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

// ========== Stat & Damage Arrays ==========

export const statEffectArray = (name = 'statEffects', title = 'Stat Effects') => ({
  name,
  title,
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        {
          name: 'stat',
          title: 'Affected Stat',
          type: 'string',
          options: {
            layout: 'dropdown',
            list: formatToDropdownOptions(allStats),
          },
        },
        {name: 'amount', title: 'Effect Amount', type: 'number'},
        {
          name: 'duration',
          title: 'Duration (optional)',
          type: 'number',
          description: 'How long this effect lasts in turns/seconds.',
        },
      ],
      preview: statsPreview,
    },
  ],
})

export const defenceArray = (name = 'defensiveBonuses', title = 'Defensive Bonuses') => ({
  name,
  title,
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        {
          name: 'stat',
          title: 'Defended Stat',
          type: 'string',
          options: {
            layout: 'dropdown',
            list: formatToDropdownOptions(allStats),
          },
        },
        {name: 'amount', title: 'Bonus Amount', type: 'number'},
      ],
      preview: statsPreview,
    },
  ],
})

export const damageArray = (name = 'damageBonuses', title = 'Damage Effects') => ({
  name,
  title,
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Damage Type',
          type: 'string',
          options: {
            layout: 'dropdown',
            list: formatToDropdownOptions(allDamageTypes),
          },
        },
        {name: 'min', title: 'Min Damage', type: 'number'},
        {name: 'max', title: 'Max Damage', type: 'number'},
        {
          name: 'duration',
          title: 'Duration (optional)',
          type: 'number',
          description: 'Optional lingering or periodic effect duration.',
        },
      ],
      preview: statsPreview,
    },
  ],
})

export const resistanceArray = (name = 'damageResistances', title = 'Damage Resistances') => ({
  name,
  title,
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Damage Type',
          type: 'string',
          options: {
            layout: 'dropdown',
            list: formatToDropdownOptions(allDamageTypes),
          },
        },
        {
          name: 'modifier',
          title: 'Resistance Modifier (%)',
          type: 'number',
          description: 'Positive = more resistant, Negative = more vulnerable',
        },
      ],
      preview: statsPreview,
    },
  ],
})

// ========== Logic Utilities ==========

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

export const needsCategory = (...categories: string[]) => ({
  hidden: ({parent}: {parent?: {category?: unknown}}) => {
    const category = parent?.category
    if (!category) return true
    if (Array.isArray(category)) {
      return !category.map((c) => String(c).toLowerCase()).some((val) => categories.includes(val))
    }
    return !categories.includes(String(category).toLowerCase())
  },
})

export const needsCategories = (category: string, subCategory: string) => ({
  hidden: ({
    parent,
  }: {
    parent?: {category?: string | string[]; subCategory?: string | string[]}
  }) => {
    if (!parent?.category || !parent?.subCategory) return true

    const categoryMatches = Array.isArray(parent.category)
      ? parent.category.map((c) => c.toLowerCase()).includes(category.toLowerCase())
      : parent.category.toLowerCase() === category.toLowerCase()

    const subCategoryMatches = Array.isArray(parent.subCategory)
      ? parent.subCategory.map((s) => s.toLowerCase()).includes(subCategory.toLowerCase())
      : parent.subCategory.toLowerCase() === subCategory.toLowerCase()

    return !(categoryMatches && subCategoryMatches)
  },
})

export const needsRoleType = (...roles: string[]) => ({
  hidden: ({parent}: {parent?: {roleType?: string}}) =>
    !parent?.roleType || !roles.map((r) => r.toLowerCase()).includes(parent.roleType.toLowerCase()),
})

export const validateTotalSum =
  (
    expectedTotal: number,
    label = 'Attributes',
    options: {exact?: boolean; min?: number; max?: number} = {exact: true},
  ) =>
  (Rule: SumValidationRule) =>
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

export const filteredItemReferenceArray = (
  schema: string,
  name: string,
  title: string,
  category?: string,
  subCategory?: string,
) => {
  const filterClauses: string[] = []
  const filterParams: Record<string, string> = {}

  if (category) {
    filterClauses.push('$category in category')
    filterParams.category = category
  }

  if (subCategory) {
    filterClauses.push('$subCategory in subCategory')
    filterParams.subCategory = subCategory
  }

  const options =
    filterClauses.length > 0
      ? {
          filter: filterClauses.join(' && '),
          filterParams,
        }
      : {}

  return {
    name,
    title,
    type: 'array',
    of: [
      {
        type: 'reference',
        to: [{type: schema}],
        options,
      },
    ],
    options: {
      layout: 'grid',
    },
    validation: validateUniqueReferences(
      `You already added this ${subCategory ? `${subCategory} ${category}` : category || 'item'}.`,
    ),
  }
}
