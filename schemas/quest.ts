// ===========================
// schemas/quest.ts
// ===========================

import {
  dropdownLootTiers,
  dropdownQuestTypes,
  dropdownWinConditions,
} from '../fundamentals/fundamentals'

import {createRadioDropdown} from '../schemaVariables/schemaVariables'
import {ValidationRule} from '../types/types'

export default {
  name: 'quest',
  title: 'Quest',
  type: 'document',
  fields: [
    // ===== Basic Info =====
    {
      name: 'name',
      title: 'Quest Name',
      type: 'string',
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug / ID',
      type: 'slug',
      options: {source: 'name'},
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {name: 'shortDescription', title: 'Short Description', type: 'string'},
    {name: 'longDescription', title: 'Detailed Description', type: 'text'},

    createRadioDropdown('type', 'Quest Type', dropdownQuestTypes),
    {name: 'levelRequirement', title: 'Level Requirement', type: 'number'},

    {name: 'isRepeatable', title: 'Repeatable?', type: 'boolean'},
    {name: 'isDaily', title: 'Daily Quest?', type: 'boolean'},

    // ===== Objectives =====
    {name: 'objectiveSummary', title: 'Objective Summary (UI)', type: 'string'},
    {
      name: 'questSteps',
      title: 'Quest Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Step Title', type: 'string'},
            {name: 'description', title: 'Step Description', type: 'text'},
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
    },

    // ===== Prerequisites =====
    {
      name: 'availableAt',
      title: 'Available After',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'quest'}]}],
    },
    {
      name: 'requiredQuests',
      title: 'Required Completed Quests',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'quest'}]}],
    },
    {
      name: 'requiredItems',
      title: 'Required Items to Begin or Progress',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'item'}]}],
    },
    {
      name: 'requiredConditions',
      title: 'Special Requirements (Flags, Tags, Etc)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'key', title: 'Condition Key', type: 'string'},
            {name: 'value', title: 'Required Value (optional)', type: 'number'},
          ],
        },
      ],
    },

    // ===== Completion Logic =====
    {
      name: 'completionTriggers',
      title: 'Completion Conditions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            createRadioDropdown('conditionType', 'Trigger Type', dropdownWinConditions),
            {name: 'targetId', title: 'Target ID or Reference', type: 'string'},
            {name: 'amount', title: 'Amount / Threshold', type: 'number'},
            {
              name: 'requiredItems',
              title: 'Items Needed for Completion',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'item'}]}],
            },
          ],
        },
      ],
    },

    // ===== Rewards =====
    {name: 'experience', title: 'Experience Reward', type: 'number'},
    {name: 'gold', title: 'Gold Reward', type: 'number'},
    createRadioDropdown('rewardTier', 'Loot Tier', dropdownLootTiers),
    {
      name: 'rewardItems',
      title: 'Item Rewards',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'item'}]}],
    },
    {
      name: 'rewardSkills',
      title: 'Skill Unlocks',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'skill'}]}],
    },

    // ===== Integration & Lore =====
    {name: 'startsFrom', title: 'Starts From NPC', type: 'reference', to: [{type: 'npc'}]},
    {name: 'endsWith', title: 'Ends With NPC', type: 'reference', to: [{type: 'npc'}]},

    {name: 'linkedLoreEntry', title: 'Connected Lore', type: 'reference', to: [{type: 'lore'}]},
    {
      name: 'faction',
      title: 'Associated Factions',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'faction'}]}],
    },
    {
      name: 'tags',
      title: 'Tags (exploration, combat, puzzle, etc)',
      type: 'array',
      of: [{type: 'string'}],
    },
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'type',
    },
    prepare({title, subtitle}: {title?: string; subtitle?: string}) {
      return {
        title: title || 'Unnamed Quest',
        subtitle: subtitle || 'No type specified',
      }
    },
  },
}
