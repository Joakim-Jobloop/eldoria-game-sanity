// ===========================
// schemas/quest.ts
// ===========================

import {createNamedEntity} from '../schemaTypes/presets'
import {questChain} from '../schemaTypes/narrativeTypes'
import {progressionRequirement, rewardTable} from '../schemaTypes/mechanicsTypes'
import {createDefaultFieldsets} from '../schemaTypes/presets'
import {dropdownQuestTypes} from '../fundamentals/fundamentals'
import {createRadioDropdown} from '../schemaVariables/schemaVariables'
import {Rule} from 'sanity'

interface QuestPreview {
  title?: string
  subtitle?: string
  description?: string
}

export default {
  name: 'quest',
  title: 'Quest',
  type: 'document',
  ...createDefaultFieldsets,
  fields: [
    // Base fields
    ...Object.values(createNamedEntity({withImage: true})),

    // Core Quest Info
    createRadioDropdown('type', 'Quest Type', dropdownQuestTypes),
    {
      name: 'flags',
      title: 'Quest Flags',
      type: 'object',
      fieldset: 'core',
      fields: [
        {name: 'isRepeatable', title: 'Repeatable?', type: 'boolean'},
        {name: 'isDaily', title: 'Daily Quest?', type: 'boolean'},
      ],
      validation: (Rule: Rule) => Rule.required(),
    },

    // Requirements and Prerequisites
    progressionRequirement,
    {
      name: 'prerequisites',
      title: 'Prerequisites',
      type: 'object',
      fieldset: 'requirements',
      fields: [
        {
          name: 'requiredQuests',
          title: 'Required Completed Quests',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'quest'}]}],
        },
        {
          name: 'requiredItems',
          title: 'Required Items',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'item'}]}],
        },
      ],
    },

    // Quest Structure
    {
      name: 'objectives',
      title: 'Quest Objectives',
      type: 'object',
      fieldset: 'core',
      fields: [
        {name: 'summary', title: 'Objective Summary (UI)', type: 'string'},
        {
          name: 'steps',
          title: 'Quest Steps',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Step Title',
                  type: 'string',
                  validation: (Rule: Rule) => Rule.required(),
                },
                {
                  name: 'description',
                  title: 'Step Description',
                  type: 'text',
                  validation: (Rule: Rule) => Rule.required(),
                },
                {name: 'optional', title: 'Optional Step?', type: 'boolean'},
                {
                  name: 'requiredItem',
                  title: 'Required Item (Optional)',
                  type: 'reference',
                  to: [{type: 'item'}],
                },
              ],
            },
          ],
          validation: (Rule: Rule) => Rule.min(1).error('Quest must have at least one step'),
        },
      ],
      validation: (Rule: Rule) => Rule.required(),
    },

    // Quest Chain Integration
    questChain,
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
              validation: (Rule: Rule) =>
                Rule.min(1).max(100).error('Sequence order must be between 1 and 100'),
            },
            {
              name: 'isRequired',
              title: 'Required for Chain',
              type: 'boolean',
            },
          ],
        },
      ],
      validation: (Rule: Rule) =>
        Rule.custom((items: any[]) => {
          if (!items?.length) return true
          const orders = items.map((item) => item.order)
          const uniqueOrders = new Set(orders)
          return uniqueOrders.size === orders.length || 'Quest sequence orders must be unique'
        }),
    },

    // Rewards
    rewardTable,

    // World Integration
    {
      name: 'integration',
      title: 'World Integration',
      type: 'object',
      fieldset: 'core',
      fields: [
        {
          name: 'questGiver',
          title: 'Quest Giver',
          type: 'reference',
          to: [{type: 'npc'}],
        },
        {
          name: 'turnIn',
          title: 'Turn In NPC',
          type: 'reference',
          to: [{type: 'npc'}],
        },
        {
          name: 'location',
          title: 'Quest Location',
          type: 'reference',
          to: [{type: 'location'}],
        },
        {
          name: 'faction',
          title: 'Associated Faction',
          type: 'reference',
          to: [{type: 'faction'}],
        },
      ],
    },

    // Tags for filtering
    {
      name: 'tags',
      title: 'Quest Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
        list: [
          {title: 'Exploration', value: 'exploration'},
          {title: 'Combat', value: 'combat'},
          {title: 'Puzzle', value: 'puzzle'},
          {title: 'Gathering', value: 'gathering'},
          {title: 'Stealth', value: 'stealth'},
          {title: 'Escort', value: 'escort'},
        ],
      },
    },
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'type',
      description: 'shortDescription',
    },
    prepare({title, subtitle, description}: QuestPreview) {
      return {
        title: '📜 ' + (title || 'Unnamed Quest'),
        subtitle: `${subtitle || 'No type'} - ${description || 'No description'}`,
      }
    },
  },
}
