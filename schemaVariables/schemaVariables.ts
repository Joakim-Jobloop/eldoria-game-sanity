// =======================
// schemaVariables.ts
// =======================

import {allDamageTypes, allStats} from '../fundamentals/fundamentals'
import {formatToDropdownOptions} from '../utils/formatter'
import {statsPreview} from '../utils/previews'
import {Rule} from 'sanity'

// ========== Shared Dropdowns ==========

export const checkDropdown = (
  name: string,
  title: string,
  options: string[] | {title: string; value: string}[],
) => {
  const isStringArray = typeof options[0] === 'string'
  const formattedOptions = isStringArray ? formatToDropdownOptions(options as string[]) : options
  return {
    name,
    title,
    type: 'array',
    of: [{type: 'string'}],
    options: {
      layout: 'grid',
      list: formattedOptions,
    },
    validation: (Rule: Rule) => Rule.required().error(`One must be selected`),
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
  validation: (Rule: Rule) => Rule.required().error('You must select one of the provided options!'),
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
  validation: (Rule: Rule) => Rule.required().error(`${title} must be selected`),
})

export const durabilityValidation = (Rule: Rule) =>
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

interface ParentWithCategory {
  category?: string | string[]
  subCategory?: string | string[]
}

export const flexibleReferenceArray = (name: string, title: string, types: string[]) => ({
  name,
  title,
  type: 'array',
  of: [
    {
      type: 'reference',
      to: types.map((type) => ({
        type,
        title: type.charAt(0).toUpperCase() + type.slice(1),
      })),
    },
  ],
})

export const requiredField = (message: string) => (Rule: Rule) => Rule.required().error(message)

export const needsCategory = (...categories: string[]) => ({
  hidden: ({parent}: {parent?: ParentWithCategory}) => {
    const category = parent?.category
    if (!category) return true
    if (Array.isArray(category)) {
      return !category.map((c) => String(c).toLowerCase()).some((val) => categories.includes(val))
    }
    return !categories.includes(String(category).toLowerCase())
  },
})

export const needsCategories = (category: string, subCategory: string) => ({
  hidden: ({parent}: {parent?: ParentWithCategory}) => {
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
  (Rule: Rule) =>
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
  type: string,
  name: string,
  title: string,
  category?: string,
  subCategory?: string,
) => {
  return {
    name,
    title,
    type: 'array',
    of: [{type: 'reference', to: [{type}]}],
    options: {
      layout: 'grid',
      filter:
        category && subCategory
          ? `category == $category && subCategory == $subCategory`
          : category
            ? `category == $category`
            : undefined,
      filterParams: {
        category,
        subCategory,
      },
    },
    components: {
      input: 'visualReferenceArray',
    },
  }
}

export const minCharacteristic = (Rule: Rule) =>
  Rule.min(0).max(100).error('Characteristic must be between 0 and 100')

export const minEnergyCost = (Rule: Rule) => Rule.min(0).error('Energy cost cannot be negative')

export const minGoldCost = (Rule: Rule) => Rule.min(0).error('Gold cost cannot be negative')
