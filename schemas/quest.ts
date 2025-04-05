// ===========================
// schemas/quest.ts
// ===========================

import {
    dropdownLootTiers,
    dropdownQuestTypes,
    dropdownWinConditions,
  } from '../fundamentals/fundamentals'
  
  import {
    createRadioDropdown,
  } from '../schemaVariables/schemaVariables'
  
  import { ValidationRule } from '../types/types'
  
  export default {
    name: 'quest',
    title: 'Quest',
    type: 'document',
    fields: [
      // Basic Info
      { name: 'name', title: 'Quest Name', type: 'string', validation: (Rule: ValidationRule) => Rule.required() },
      { name: 'slug', title: 'Slug / ID', type: 'slug', options: { source: 'name' }, validation: (Rule: ValidationRule) => Rule.required() },
      { name: 'shortDescription', title: 'Short Description', type: 'string' },
      { name: 'longDescription', title: 'Long Description', type: 'text' },
  
      createRadioDropdown('type', 'Quest Type', dropdownQuestTypes),
      { name: 'levelRequirement', title: 'Level Requirement', type: 'number' },
  
      // Flow & Steps
      { name: 'objectiveSummary', title: 'Objective Summary (UI)', type: 'string' },
      {
        name: 'questSteps',
        title: 'Quest Steps',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'title', title: 'Step Title', type: 'string' },
              { name: 'description', title: 'Step Description', type: 'text' },
              { name: 'optional', title: 'Optional Step?', type: 'boolean' },
            ],
          },
        ],
      },
  
      // Integration
      { name: 'startNpc', title: 'Starts From NPC', type: 'reference', to: [{ type: 'npc' }] },
      { name: 'endNpc', title: 'Ends With NPC', type: 'reference', to: [{ type: 'npc' }] },
      {
        name: 'availableAt',
        title: 'Available From',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'quest' }] }],
      },
      {
        name: 'requiredQuests',
        title: 'Requires Completion of Quests',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'quest' }] }],
      },
      {
        name: 'requiredItems',
        title: 'Required Items to Start or Progress',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'item' }] }],
      },
      {
        name: 'requiredConditions',
        title: 'Required Conditions (Flags, Tags, etc)',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'key', title: 'Condition Key', type: 'string' },
              { name: 'value', title: 'Required Value (optional)', type: 'number' },
            ],
          },
        ],
      },
  
      // Completion logic
      {
        name: 'completionTriggers',
        title: 'Completion Triggers',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              createRadioDropdown('conditionType', 'Trigger Type', dropdownWinConditions),
              { name: 'targetId', title: 'Target ID or Reference', type: 'string' },
              { name: 'amount', title: 'Target Amount / Count', type: 'number' },
              {
                name: 'requiredItems',
                title: 'Required Items (optional)',
                type: 'array',
                of: [{ type: 'reference', to: [{ type: 'item' }] }],
              },
            ],
          },
        ],
      },
  
      // Rewards
      { name: 'experience', title: 'Experience Reward', type: 'number' },
      { name: 'gold', title: 'Gold Reward', type: 'number' },
      createRadioDropdown('rewardTier', 'Loot Tier Reward', dropdownLootTiers),
      {
        name: 'rewardItems',
        title: 'Item Rewards',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'item' }] }],
      },
      {
        name: 'rewardSkills',
        title: 'Skill Unlocks (Optional)',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'skill' }] }],
      },
  
      // Meta
      { name: 'linkedLoreEntry', title: 'Linked Lore Entry', type: 'reference', to: [{ type: 'lore' }] },
      { name: 'faction', title: 'Associated Factions', type: 'array', of: [{ type: 'reference', to: [{ type: 'faction' }] }] },
      { name: 'tags', title: 'Tags (exploration, combat, etc)', type: 'array', of: [{ type: 'string' }] },
    ],
  
    preview: {
      select: {
        title: 'name',
        subtitle: 'type',
      },
      prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
        return {
          title: title || 'Unnamed Quest',
          subtitle: subtitle || 'No type specified',
        }
      },
    },
  }
  