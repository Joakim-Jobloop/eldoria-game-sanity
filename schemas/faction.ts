// ===========================
// schemas/faction.ts
// ===========================

import {Rule} from 'sanity'
import {createNamedEntity} from '../schemaTypes/presets.js'
import {createDefaultFieldsets} from '../schemaTypes/presets.js'
import {aethericResonance} from '../schemaTypes/aethericTypes.js'
import {flexibleReferenceArray} from '../schemaVariables/schemaVariables.js'

interface FactionStatus {
  isHostile?: boolean
  isSecret?: boolean
}

interface FactionPreview {
  title?: string
  subtitle?: string
  media?: any
  status?: FactionStatus
}

export default {
  name: 'faction',
  title: 'Faction',
  type: 'document',
  ...createDefaultFieldsets,
  fields: [
    // Base fields with image only
    ...Object.values(createNamedEntity({withImage: true, withLore: false})),

    // Core Identity
    {
      name: 'tagline',
      title: 'Short Motto or Tagline',
      type: 'string',
      fieldset: 'core',
    },
    {
      name: 'status',
      title: 'Faction Status',
      type: 'object',
      fieldset: 'core',
      fields: [
        {name: 'isHostile', title: 'Is Hostile to Player?', type: 'boolean'},
        {name: 'isSecret', title: 'Is Secret Society?', type: 'boolean'},
      ],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'influence',
      title: 'Influence Level',
      type: 'number',
      fieldset: 'core',
      validation: (Rule: Rule) =>
        Rule.required().min(1).max(100).error('Influence must be between 1 and 100'),
    },

    // Aetheric Properties
    aethericResonance,

    // Visual Identity
    {
      name: 'emblem',
      title: 'Faction Emblem or Symbol',
      type: 'image',
      options: {hotspot: true},
      fieldset: 'visuals',
    },

    // Core Lore & Background (gameplay relevant)
    {
      name: 'origin',
      title: 'Origin Summary',
      type: 'text',
      fieldset: 'core',
      description: "Brief overview of the faction's founding or emergence",
    },
    {
      name: 'beliefs',
      title: 'Core Beliefs and Goals',
      type: 'text',
      fieldset: 'core',
      description: 'Key principles and objectives that drive the faction',
    },
    {
      name: 'hierarchy',
      title: 'Basic Structure',
      type: 'text',
      fieldset: 'core',
      description: 'Overview of ranks and organization relevant to gameplay',
    },

    // Detailed Lore References
    {
      name: 'factionLore',
      title: 'Faction Lore',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'lore'}]}],
      fieldset: 'lore',
      description: "Detailed lore entries about this faction's history, culture, and influence",
      validation: (Rule: Rule) =>
        Rule.required().error('At least one lore entry is required for faction documentation'),
    },

    // Tags
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
        list: [
          {title: 'Religious', value: 'religious'},
          {title: 'Imperial', value: 'imperial'},
          {title: 'Mercantile', value: 'mercantile'},
          {title: 'Academic', value: 'academic'},
          {title: 'Military', value: 'military'},
          {title: 'Outlawed', value: 'outlawed'},
          {title: 'Secret', value: 'secret'},
        ],
      },
    },

    // World Integration
    flexibleReferenceArray('influenceZone', 'Primary Region or Zone of Influence', ['location']),

    // References
    flexibleReferenceArray('notableMembers', 'Notable Members (NPCs)', ['npc']),
    {
      name: 'associatedEntities',
      title: 'Connected Classes / Races / Items',
      type: 'array',
      of: [
        {
          type: 'reference',
          title: 'Character Class',
          name: 'classReference',
          to: [{type: 'characterClass'}],
        },
        {
          type: 'reference',
          title: 'Character Race',
          name: 'raceReference',
          to: [{type: 'characterRace'}],
        },
        {
          type: 'reference',
          title: 'Item',
          name: 'itemReference',
          to: [{type: 'item'}],
        },
      ],
    },
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'type',
      media: 'emblem',
      status: 'status',
    },
    prepare({title, subtitle, media, status}: FactionPreview) {
      const prefix = status?.isHostile ? '⚔️ ' : status?.isSecret ? '🎭 ' : '⚜️ '

      return {
        title: prefix + (title || 'Unnamed Faction'),
        subtitle: subtitle || 'No type specified',
        media,
      }
    },
  },
}
