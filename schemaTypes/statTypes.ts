import {dropdownPrimaryStats} from '../fundamentals/fundamentals'
import {validateTotalSum} from '../schemaVariables/schemaVariables'
import {MinMaxRule} from '../types/types'

export const attributeBlock = (total: number = 15) => ({
  name: 'starterAttributes',
  title: `Starter Attributes (should sum to ${total})`,
  type: 'object',
  validation: validateTotalSum(total, 'Starter attributes'),
  options: {columns: 3},
  fields: dropdownPrimaryStats.map((stat) => ({
    name: stat.value.replace(/\s+/g, '_').toLowerCase(),
    title: stat.title,
    type: 'number',
    validation: (Rule: MinMaxRule) =>
      Rule.min(1)
        .max(10)
        .custom((value) => {
          if (value < 1 || value > 10) {
            return `${stat.title} must be between 1 and 10`
          }
          return true
        }),
  })),
})

export const combatStats = {
  name: 'combatStats',
  title: 'Combat Statistics',
  type: 'object',
  fields: [
    {name: 'health', title: 'Health Points', type: 'number'},
    {name: 'level', title: 'Level', type: 'number'},
    {name: 'speed', title: 'Speed / Turn Priority', type: 'number'},
  ],
}

export const resourceStats = {
  name: 'resources',
  title: 'Resource Pools',
  type: 'object',
  fields: [
    {name: 'mana', title: 'Mana', type: 'number'},
    {name: 'stamina', title: 'Stamina', type: 'number'},
    {name: 'aether', title: 'Aether', type: 'number'},
  ],
}
