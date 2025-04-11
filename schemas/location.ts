import {createNamedEntity} from '../schemaTypes/presets'
import {createDefaultFieldsets} from '../schemaTypes/presets'
import {aethericResonance} from '../schemaTypes/aethericTypes'
import {progressionRequirement} from '../schemaTypes/mechanicsTypes'
import {createRadioDropdown, checkDropdown} from '../schemaVariables/schemaVariables'
import {Rule} from 'sanity'

interface LocationPreview {
  title?: string
  subtitle?: string
  media?: any
}

export default {
  name: 'location',
  title: 'Location',
  type: 'document',
  ...createDefaultFieldsets,
  fields: [
    // Base fields with image only
    ...Object.values(createNamedEntity({withImage: true, withLore: false})),

    // Location Type
    createRadioDropdown('type', 'Location Type', [
      {title: 'City', value: 'city'},
      {title: 'Dungeon', value: 'dungeon'},
      {title: 'Region', value: 'region'},
      {title: 'Landmark', value: 'landmark'},
      {title: 'Ruins', value: 'ruins'},
      {title: 'Sanctum', value: 'sanctum'},
    ]),

    // Lore References
    {
      name: 'locationLore',
      title: 'Location Lore',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'lore'}]}],
      fieldset: 'lore',
      description: "Detailed lore entries about this location's history, culture, and significance",
      validation: (Rule: Rule) =>
        Rule.required().error('At least one lore entry is required for location documentation'),
    },

    // Aetheric Properties
    aethericResonance,

    // Level Requirements
    progressionRequirement,

    // Zone Properties
    {
      name: 'zoneProperties',
      title: 'Zone Properties',
      type: 'object',
      fieldset: 'core',
      fields: [
        {name: 'isSafeZone', title: 'Is This a Safe Zone?', type: 'boolean'},
        {name: 'containsAetherNodes', title: 'Contains Aether Nodes?', type: 'boolean'},
      ],
      validation: (Rule: Rule) => Rule.required(),
    },

    // Visual Identity
    {
      name: 'portrait',
      title: 'Environment Illustration',
      type: 'image',
      options: {hotspot: true},
      fieldset: 'visuals',
      validation: (Rule: Rule) => Rule.required().error('Environment illustration is required'),
    },
    {
      name: 'mapMarker',
      title: 'Map Marker Icon',
      type: 'image',
      options: {hotspot: true},
      fieldset: 'visuals',
    },

    // Resources and Tags
    checkDropdown('resourceTags', 'Common Resources or Materials', [
      'Wood',
      'Herbs',
      'Ore',
      'Gems',
      'Aether Dust',
      'Water',
      'Spices',
      'Essence Shards',
    ]),

    // World Integration
    {
      name: 'worldIntegration',
      title: 'World Integration',
      type: 'object',
      fieldset: 'integration',
      fields: [
        {
          name: 'parentRegion',
          title: 'Parent Region / Zone',
          type: 'reference',
          to: [{type: 'location'}],
        },
        {
          name: 'connectedFactions',
          title: 'Associated Factions',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'faction'}]}],
        },
        {
          name: 'inhabitants',
          title: 'Inhabiting NPCs',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'npc'}]}],
        },
        {
          name: 'associatedQuests',
          title: 'Related Quests',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'quest'}]}],
        },
      ],
    },
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'type',
      media: 'portrait',
    },
    prepare({title, subtitle, media}: LocationPreview) {
      const zoneType = subtitle?.toLowerCase() || 'unknown'
      const icon =
        {
          city: '🏰',
          dungeon: '⚔️',
          region: '🗺️',
          landmark: '🏛️',
          ruins: '🏚️',
          sanctum: '✨',
        }[zoneType] || '📍'

      return {
        title: icon + ' ' + (title || 'Unnamed Location'),
        subtitle: subtitle || 'No type specified',
        media,
      }
    },
  },
}
