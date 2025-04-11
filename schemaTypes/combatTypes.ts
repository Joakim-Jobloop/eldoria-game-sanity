import {
  dropdownElementalTypes,
  dropdownPhysicalTypes,
  dropdownTargetTypes,
} from '../fundamentals/fundamentals'
import {createRadioDropdown} from '../schemaVariables/schemaVariables'

export const targetableEffect = {
  name: 'targeting',
  title: 'Targeting Information',
  type: 'object',
  fields: [
    createRadioDropdown('targetType', 'Target Type', dropdownTargetTypes),
    {name: 'range', title: 'Range', type: 'number'},
    {name: 'areaOfEffect', title: 'Area of Effect', type: 'number'},
    {name: 'duration', title: 'Effect Duration', type: 'number'},
  ],
}

export const damageProfile = {
  name: 'damageProfile',
  title: 'Damage Profile',
  type: 'object',
  fields: [
    {
      name: 'damageTypes',
      title: 'Damage Types',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            createRadioDropdown('type', 'Damage Type', [
              ...dropdownElementalTypes,
              ...dropdownPhysicalTypes,
            ]),
            {name: 'minDamage', title: 'Minimum Damage', type: 'number'},
            {name: 'maxDamage', title: 'Maximum Damage', type: 'number'},
          ],
        },
      ],
    },
    {name: 'criticalMultiplier', title: 'Critical Multiplier', type: 'number'},
  ],
}

export const resourceCost = {
  name: 'cost',
  title: 'Resource Cost',
  type: 'object',
  fields: [
    {
      name: 'type',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          {title: 'Mana', value: 'mana'},
          {title: 'Stamina', value: 'stamina'},
          {title: 'Aether', value: 'aether'},
          {title: 'Health', value: 'health'},
        ],
      },
    },
    {name: 'amount', title: 'Cost Amount', type: 'number'},
    {name: 'recurring', title: 'Cost per Turn/Tick', type: 'boolean'},
  ],
}
