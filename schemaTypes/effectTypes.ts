import {dropdownConditions} from '../fundamentals/fundamentals'
import {validateDuration, validatePositive, validateRange} from '../utils/validation'

export const statusEffect = {
  name: 'statusEffect',
  title: 'Status Effect',
  type: 'object',
  fields: [
    {
      name: 'condition',
      title: 'Applied Condition',
      type: 'string',
      options: {
        list: dropdownConditions.map((c) => ({title: c.title, value: c.value})),
      },
    },
    {
      name: 'duration',
      title: 'Duration (turns)',
      type: 'number',
      validation: validateDuration('Effect duration'),
    },
    {
      name: 'stackable',
      title: 'Can Stack?',
      type: 'boolean',
    },
    {
      name: 'chance',
      title: 'Application Chance',
      type: 'number',
      validation: validateRange(0, 100, 'Application chance'),
    },
  ],
}

export const buffEffect = {
  name: 'buffEffect',
  title: 'Stat Modification',
  type: 'object',
  fields: [
    {
      name: 'attribute',
      title: 'Modified Attribute',
      type: 'string',
      options: {
        list: [
          {title: 'Health', value: 'health'},
          {title: 'Mana', value: 'mana'},
          {title: 'Stamina', value: 'stamina'},
          {title: 'Attack Power', value: 'attack_power'},
          {title: 'Defense', value: 'defense'},
          {title: 'Speed', value: 'speed'},
        ],
      },
    },
    {
      name: 'modifier',
      title: 'Modifier Type',
      type: 'string',
      options: {
        list: [
          {title: 'Flat Bonus', value: 'flat'},
          {title: 'Percentage', value: 'percentage'},
        ],
      },
    },
    {
      name: 'value',
      title: 'Modification Value',
      type: 'number',
    },
    {
      name: 'duration',
      title: 'Duration (turns)',
      type: 'number',
      validation: validateDuration('Buff duration'),
    },
  ],
}

export const procEffect = {
  name: 'procEffect',
  title: 'Trigger Effect',
  type: 'object',
  fields: [
    {
      name: 'trigger',
      title: 'Trigger Condition',
      type: 'string',
      options: {
        list: [
          {title: 'On Hit', value: 'on_hit'},
          {title: 'On Critical', value: 'on_critical'},
          {title: 'On Kill', value: 'on_kill'},
          {title: 'On Damage Taken', value: 'on_damage_taken'},
          {title: 'On Heal', value: 'on_heal'},
        ],
      },
    },
    {
      name: 'chance',
      title: 'Proc Chance',
      type: 'number',
      validation: validateRange(0, 100, 'Proc chance'),
    },
    {
      name: 'cooldown',
      title: 'Cooldown (turns)',
      type: 'number',
      validation: validatePositive('Cooldown'),
    },
  ],
}
