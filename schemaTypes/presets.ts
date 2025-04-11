import {Rule} from 'sanity'
import {baseDocument, loreable, visualAsset} from './baseTypes'
import {validateDurability} from '../utils/validation'

export const createNamedEntity = (options: {withImage?: boolean; withLore?: boolean} = {}) => ({
  ...baseDocument,
  ...(options.withImage ? visualAsset : {}),
  ...(options.withLore ? loreable : {}),
})

export const createCraftingRecipe = {
  name: 'recipe',
  title: 'Crafting Recipe',
  type: 'object',
  fields: [
    {
      name: 'ingredients',
      title: 'Required Ingredients',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'item',
              title: 'Ingredient',
              type: 'reference',
              to: [{type: 'item'}],
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
              validation: (Rule: Rule) => Rule.min(1).integer(),
            },
          ],
        },
      ],
    },
    {
      name: 'tools',
      title: 'Required Tools',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'item'}]}],
    },
    {
      name: 'skillRequirement',
      title: 'Required Skill Level',
      type: 'number',
      validation: (Rule: Rule) => Rule.min(0).max(100),
    },
  ],
}

export const createEquipmentStats = {
  name: 'equipmentStats',
  title: 'Equipment Statistics',
  type: 'object',
  fields: [
    {
      name: 'durability',
      title: 'Durability',
      type: 'number',
      validation: validateDurability('Equipment durability'),
    },
    {
      name: 'levelRequirement',
      title: 'Level Requirement',
      type: 'number',
      validation: (Rule: Rule) => Rule.min(1).max(100),
    },
    {
      name: 'value',
      title: 'Base Value',
      type: 'number',
      validation: (Rule: Rule) => Rule.min(0),
    },
  ],
}

export const createDefaultFieldsets = {
  fieldsets: [
    {name: 'core', title: 'Core Information', options: {columns: 2}},
    {name: 'stats', title: 'Statistics', options: {columns: 3}},
    {name: 'requirements', title: 'Requirements', options: {columns: 2}},
    {name: 'visuals', title: 'Visual Assets', options: {columns: 2}},
    {name: 'lore', title: 'Lore & Background', options: {columns: 1}},
    {name: 'integration', title: 'World Integration', options: {columns: 2}},
    {name: 'combat', title: 'Combat Properties', options: {columns: 2}},
  ],
}
