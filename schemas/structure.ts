// ===========================
// schemas/structure.ts
// ===========================

import {createNamedEntity} from '../schemaTypes/presets'
import {createDefaultFieldsets} from '../schemaTypes/presets'
import {aethericResonance} from '../schemaTypes/aethericTypes'
import {progressionRequirement} from '../schemaTypes/mechanicsTypes'
import {createRadioDropdown, flexibleReferenceArray} from '../schemaVariables/schemaVariables'
import {Rule} from 'sanity'

interface StructureStatus {
  isRuined?: boolean
  isOccupied?: boolean
}

interface StructurePreview {
  title?: string
  subtitle?: string
  media?: any
  status?: StructureStatus
}

export default {
  name: 'structure',
  title: 'Structure or Construct',
  type: 'document',
  ...createDefaultFieldsets,
  fields: [
    // Base fields with image only
    ...Object.values(createNamedEntity({withImage: true, withLore: false})),

    // Structure Classification
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

    // Core Functionality & Status
    {
      name: 'structureFunction',
      title: 'What is this structure used for?',
      type: 'text',
      fieldset: 'core',
      validation: (Rule: Rule) => Rule.required().error('Structure function must be specified'),
    },
    {
      name: 'status',
      title: 'Structure Status',
      type: 'object',
      fieldset: 'core',
      fields: [
        {name: 'isRuined', title: 'Is it in ruins?', type: 'boolean'},
        {name: 'isOccupied', title: 'Is it currently occupied?', type: 'boolean'},
      ],
      validation: (Rule: Rule) => Rule.required(),
    },

    // Lore References
    {
      name: 'structureLore',
      title: 'Structure Lore',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'lore'}]}],
      fieldset: 'lore',
      description: "Detailed lore entries about this structure's history, significance, and role",
    },

    // Aetheric Properties
    aethericResonance,

    // Level Requirements
    progressionRequirement,

    // World Integration
    {
      name: 'worldIntegration',
      title: 'World Integration',
      type: 'object',
      fieldset: 'integration',
      fields: [
        {
          name: 'linkedLocation',
          title: 'Located In',
          type: 'reference',
          to: [{type: 'location'}],
        },
        {
          name: 'controllingFactions',
          title: 'Controlling or Associated Faction(s)',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'faction'}]}],
        },
      ],
    },

    // References and Content
    flexibleReferenceArray('linkedNPCs', 'Inhabitants or Guardians', ['npc']),
    flexibleReferenceArray('associatedQuests', 'Connected Quests', ['quest']),
    flexibleReferenceArray('associatedItems', 'Artifacts or Items Housed Here', ['item']),

    // Tags
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
        list: [
          {title: 'Divine', value: 'divine'},
          {title: 'Abandoned', value: 'abandoned'},
          {title: 'Ancient', value: 'ancient'},
          {title: 'Corrupted', value: 'corrupted'},
          {title: 'Protected', value: 'protected'},
          {title: 'Restricted', value: 'restricted'},
          {title: 'Hidden', value: 'hidden'},
        ],
      },
    },
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'structureType',
      media: 'image',
      status: 'status',
    },
    prepare({title, subtitle, media, status}: StructurePreview) {
      const condition = status?.isRuined ? '🏚️ ' : status?.isOccupied ? '🏛️ ' : '🏗️ '
      return {
        title: condition + (title || 'Unnamed Structure'),
        subtitle: subtitle || 'Unknown Type',
        media,
      }
    },
  },
}
