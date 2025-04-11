import {Rule} from 'sanity'

const validateRange = (min: number, max: number, label: string) => (Rule: Rule) =>
  Rule.min(min).max(max).error(`${label} must be between ${min} and ${max}`)

export const questChain = {
  name: 'questChain',
  title: 'Quest Chain',
  type: 'object',
  fields: [
    {
      name: 'chainType',
      title: 'Chain Type',
      type: 'string',
      options: {
        list: [
          {title: 'Main Story', value: 'main_story'},
          {title: 'Faction Story', value: 'faction'},
          {title: 'Character Story', value: 'character'},
          {title: 'Zone Story', value: 'zone'},
          {title: 'Event', value: 'event'},
        ],
      },
    },
    {
      name: 'questSequence',
      title: 'Quest Sequence',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quest',
              title: 'Quest',
              type: 'reference',
              to: [{type: 'quest'}],
            },
            {
              name: 'order',
              title: 'Sequence Order',
              type: 'number',
              validation: validateRange(1, 100, 'Sequence order'),
            },
            {
              name: 'isRequired',
              title: 'Required for Chain',
              type: 'boolean',
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.unique('order'),
    },
  ],
}

export const storyline = {
  name: 'storyline',
  title: 'Storyline',
  type: 'object',
  fields: [
    {
      name: 'storyArc',
      title: 'Story Arc',
      type: 'string',
      options: {
        list: [
          {title: 'Origin Story', value: 'origin'},
          {title: 'Rising Action', value: 'rising'},
          {title: 'Climax', value: 'climax'},
          {title: 'Resolution', value: 'resolution'},
          {title: 'Epilogue', value: 'epilogue'},
        ],
      },
    },
    {
      name: 'questChains',
      title: 'Related Quest Chains',
      type: 'array',
      of: [{type: 'questChain'}],
    },
    {
      name: 'keyCharacters',
      title: 'Key Characters',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'character',
              title: 'Character',
              type: 'reference',
              to: [{type: 'npc'}],
            },
            {
              name: 'role',
              title: 'Story Role',
              type: 'string',
              options: {
                list: [
                  {title: 'Protagonist', value: 'protagonist'},
                  {title: 'Antagonist', value: 'antagonist'},
                  {title: 'Ally', value: 'ally'},
                  {title: 'Mentor', value: 'mentor'},
                  {title: 'Quest Giver', value: 'quest_giver'},
                ],
              },
            },
          ],
        },
      ],
    },
    {
      name: 'keyLocations',
      title: 'Key Locations',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'location'}],
        },
      ],
    },
    {
      name: 'rewards',
      title: 'Story Completion Rewards',
      type: 'object',
      fields: [
        {
          name: 'experience',
          title: 'Experience Reward',
          type: 'number',
          validation: validateRange(0, 999999, 'Experience reward'),
        },
        {
          name: 'reputationChanges',
          title: 'Reputation Changes',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'faction',
                  title: 'Faction',
                  type: 'reference',
                  to: [{type: 'faction'}],
                },
                {
                  name: 'change',
                  title: 'Reputation Change',
                  type: 'number',
                  validation: validateRange(-1000, 1000, 'Reputation change'),
                },
              ],
            },
          ],
        },
        {
          name: 'unlocks',
          title: 'Story Unlocks',
          type: 'array',
          of: [
            {
              type: 'reference',
              name: 'locationUnlock',
              title: 'Location',
              to: [{type: 'location'}],
            },
            {
              type: 'reference',
              name: 'skillUnlock',
              title: 'Skill',
              to: [{type: 'skill'}],
            },
            {
              type: 'reference',
              name: 'itemUnlock',
              title: 'Item',
              to: [{type: 'item'}],
            },
          ],
        },
      ],
    },
  ],
}

export const narrativeContext = {
  name: 'narrativeContext',
  title: 'Narrative Context',
  type: 'object',
  fieldset: 'lore',
  fields: [
    {
      name: 'era',
      title: 'Historical Era',
      type: 'string',
      options: {
        list: [
          {title: 'Age of Dawn', value: 'dawn'},
          {title: 'Age of Ascension', value: 'ascension'},
          {title: 'Age of Fracture', value: 'fracture'},
          {title: 'Current Era', value: 'current'},
        ],
      },
    },
    {
      name: 'significance',
      title: 'Historical Significance',
      type: 'text',
    },
  ],
}
