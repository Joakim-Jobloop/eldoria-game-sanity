import {validateRange} from '../utils/validation'

export const experienceTable = {
  name: 'experienceTable',
  title: 'Level Experience Requirements',
  type: 'object',
  fields: [
    {
      name: 'baseExperience',
      title: 'Base Experience',
      type: 'number',
      validation: validateRange(1, 999999, 'Base experience'),
    },
    {
      name: 'growthRate',
      title: 'Level Growth Rate',
      type: 'number',
      validation: validateRange(1, 5, 'Growth rate'),
    },
    {
      name: 'maxLevel',
      title: 'Maximum Level',
      type: 'number',
      validation: validateRange(1, 100, 'Maximum level'),
    },
  ],
}

export const levelBenefits = {
  name: 'levelBenefits',
  title: 'Level-up Benefits',
  type: 'object',
  fields: [
    {
      name: 'statPoints',
      title: 'Attribute Points Gained',
      type: 'number',
      validation: validateRange(0, 10, 'Stat points'),
    },
    {
      name: 'skillPoints',
      title: 'Skill Points Gained',
      type: 'number',
      validation: validateRange(0, 5, 'Skill points'),
    },
    {
      name: 'unlocks',
      title: 'Level Unlocks',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Unlock Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Skill Slot', value: 'skill_slot'},
                  {title: 'Equipment Slot', value: 'equipment_slot'},
                  {title: 'Feature', value: 'feature'},
                  {title: 'Zone', value: 'zone'},
                ],
              },
            },
            {
              name: 'level',
              title: 'Required Level',
              type: 'number',
              validation: validateRange(1, 100, 'Required level'),
            },
            {
              name: 'reference',
              title: 'Unlocked Content',
              type: 'reference',
              to: [
                {type: 'skill', title: 'Skill Unlock'},
                {type: 'location', title: 'Location Unlock'},
              ],
            },
          ],
        },
      ],
    },
  ],
}

export const progressionMilestone = {
  name: 'milestone',
  title: 'Progression Milestone',
  type: 'object',
  fields: [
    {
      name: 'type',
      title: 'Milestone Type',
      type: 'string',
      options: {
        list: [
          {title: 'Level', value: 'level'},
          {title: 'Quest', value: 'quest'},
          {title: 'Achievement', value: 'achievement'},
          {title: 'Reputation', value: 'reputation'},
        ],
      },
    },
    {
      name: 'requirement',
      title: 'Requirement',
      type: 'number',
      validation: validateRange(1, 999999, 'Requirement value'),
    },
    {
      name: 'rewards',
      title: 'Milestone Rewards',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'item', title: 'Item Reward'},
            {type: 'skill', title: 'Skill Reward'},
            {type: 'trait', title: 'Trait Reward'},
          ],
        },
      ],
    },
  ],
}
