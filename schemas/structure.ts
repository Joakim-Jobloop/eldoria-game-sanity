// ===========================
// schemas/structure.ts
// ===========================

import {dropdownAetherAlignments} from '../fundamentals/fundamentals'

import {createRadioDropdown} from '../schemaVariables/schemaVariables'

import {ValidationRule} from '../types/types'

export default {
  name: 'structure',
  title: 'Structure or Construct',
  type: 'document',
  fields: [
    // Core Info
    {
      name: 'name',
      title: 'Structure Name',
      type: 'string',
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Structure Image or Illustration',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'description',
      title: 'Structure Description',
      type: 'text',
    },
    {
      name: 'structureFunction',
      title: 'What is this structure used for?',
      type: 'text',
    },

    createRadioDropdown('structureType', 'Structure Type', [
      {title: 'Temple', value: 'temple'},
      {title: 'Tower', value: 'tower'},
      {title: 'Fortress', value: 'fortress'},
      {title: 'Workshop', value: 'workshop'},
      {title: 'Shrine', value: 'shrine'},
      {title: 'Library', value: 'library'},
      {title: 'Laboratory', value: 'laboratory'},
      {title: 'Ruins', value: 'ruins'},
      {title: 'Sanctuary', value: 'sanctuary'},
      {title: 'Other', value: 'other'},
    ]),

    {
      name: 'tags',
      title: 'Tags (e.g., Divine, Abandoned)',
      type: 'array',
      of: [{type: 'string'}],
    },

    {name: 'isRuined', title: 'Is it in ruins?', type: 'boolean'},
    {name: 'isOccupied', title: 'Is it currently occupied?', type: 'boolean'},

    // Optional difficulty
    {name: 'levelRequirement', title: 'Suggested Level to Explore', type: 'number'},

    // World Integration
    {
      name: 'linkedLocation',
      title: 'Located In',
      type: 'reference',
      to: [{type: 'location'}],
    },
    {
      name: 'faction',
      title: 'Controlling or Associated Faction(s)',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'faction'}]}],
    },

    // Related Lore and Content
    {
      name: 'loreEntry',
      title: 'Linked Lore Entry',
      type: 'reference',
      to: [{type: 'lore'}],
    },
    {
      name: 'associatedItems',
      title: 'Artifacts or Items Housed Here',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'item'}]}],
    },
    {
      name: 'linkedNPCs',
      title: 'Inhabitants or Guardians',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'npc'}]}],
    },
    {
      name: 'associatedQuests',
      title: 'Connected Quests',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'quest'}]}],
    },

    createRadioDropdown('aetherAlignment', 'Aether Alignment (Optional)', dropdownAetherAlignments),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'structureType',
      media: 'image',
    },
    prepare({title, subtitle, media}: {title?: string; subtitle?: string; media?: any}) {
      return {
        title: title || 'Unnamed Structure',
        subtitle: subtitle || 'Unknown Type',
        media,
      }
    },
  },
}
