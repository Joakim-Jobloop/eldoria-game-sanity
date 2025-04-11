import {dropdownLootTiers} from '../fundamentals/fundamentals'
import {createRadioDropdown} from '../schemaVariables/schemaVariables'
import {validateRange, validateWeightedChance} from '../utils/validation'

export const lootTable = {
  name: 'lootTable',
  title: 'Loot Table',
  type: 'object',
  fields: [
    createRadioDropdown('tier', 'Loot Tier', dropdownLootTiers),
    {
      name: 'entries',
      title: 'Loot Entries',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'item',
              title: 'Item',
              type: 'reference',
              to: [{type: 'item'}],
            },
            {
              name: 'weight',
              title: 'Drop Weight',
              type: 'number',
              validation: validateWeightedChance('drop weights'),
            },
            {
              name: 'quantity',
              title: 'Quantity Range',
              type: 'object',
              fields: [
                {
                  name: 'min',
                  title: 'Minimum',
                  type: 'number',
                  validation: validateRange(1, 99, 'Minimum quantity'),
                },
                {
                  name: 'max',
                  title: 'Maximum',
                  type: 'number',
                  validation: validateRange(1, 99, 'Maximum quantity'),
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export const progressionRequirement = {
  name: 'requirement',
  title: 'Progression Requirement',
  type: 'object',
  fields: [
    {
      name: 'type',
      title: 'Requirement Type',
      type: 'string',
      options: {
        list: [
          {title: 'Level', value: 'level'},
          {title: 'Quest', value: 'quest'},
          {title: 'Item', value: 'item'},
          {title: 'Reputation', value: 'reputation'},
          {title: 'Achievement', value: 'achievement'},
        ],
      },
    },
    {
      name: 'reference',
      title: 'Required Entity',
      type: 'reference',
      to: [
        {type: 'quest', title: 'Quest Reference'},
        {type: 'item', title: 'Item Reference'},
        {type: 'faction', title: 'Faction Reference'},
      ],
    },
    {
      name: 'threshold',
      title: 'Required Value',
      type: 'number',
    },
  ],
}

export const rewardTable = {
  name: 'rewardTable',
  title: 'Reward Table',
  type: 'object',
  fields: [
    {
      name: 'experience',
      title: 'Experience Points',
      type: 'number',
      validation: validateRange(0, 999999, 'Experience points'),
    },
    {
      name: 'currency',
      title: 'Currency Rewards',
      type: 'object',
      fields: [
        {
          name: 'gold',
          title: 'Gold Amount',
          type: 'number',
          validation: validateRange(0, 999999, 'Gold amount'),
        },
        {
          name: 'gems',
          title: 'Gems Amount',
          type: 'number',
          validation: validateRange(0, 9999, 'Gems amount'),
        },
      ],
    },
    {...lootTable},
  ],
}
