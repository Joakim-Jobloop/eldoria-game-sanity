// ===========================
// schemas/location.ts
// ===========================

import {dropdownAetherAlignments} from '../fundamentals/fundamentals'
import {createRadioDropdown} from '../schemaVariables/schemaVariables'
import {ValidationRule} from '../types/types'

export default {
  name: 'location',
  title: 'Location',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Location Name',
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
    {
      name: 'portrait',
      title: 'Visual / Environment Image',
      type: 'image',
      options: {hotspot: true},
    },
    {name: 'mapMarker', title: 'Map Marker Icon', type: 'image', options: {hotspot: true}},

    createRadioDropdown('type', 'Location Type', [
      {title: 'City', value: 'city'},
      {title: 'Dungeon', value: 'dungeon'},
      {title: 'Region', value: 'region'},
      {title: 'Landmark', value: 'landmark'},
      {title: 'Ruins', value: 'ruins'},
      {title: 'Sanctum', value: 'sanctum'},
    ]),

    createRadioDropdown('aetherAlignment', 'Aetheric Alignment', dropdownAetherAlignments),

    {name: 'levelMin', title: 'Minimum Level', type: 'number'},
    {name: 'levelMax', title: 'Maximum Level', type: 'number'},

    {name: 'containsAetherNodes', title: 'Contains Aether Nodes?', type: 'boolean'},
    {name: 'isSafeZone', title: 'Is This a Safe Zone?', type: 'boolean'},

    {
      name: 'resourceTags',
      title: 'Common Resources or Materials',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'relatedFations',
      title: 'Associated Factions',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'faction'}]}],
    },

    {
      name: 'inhabitants',
      title: 'Key NPCs in This Location',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'npc'}]}],
    },
    {
      name: 'associatedQuests',
      title: 'Associated Quests',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'quest'}]}],
    },
    {
      name: 'connectedLoreEntries',
      title: 'Related Lore Entries',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'lore'}]}],
    },
    {
      name: 'parentRegion',
      title: 'Larger Region or Parent Zone',
      type: 'reference',
      to: [{type: 'location'}],
    },
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'type',
      media: 'portrait',
    },
    prepare({title, subtitle, media}: {title?: string; subtitle?: string; media?: any}) {
      return {
        title: title || 'Unnamed Location',
        subtitle: subtitle || 'No type specified',
        media,
      }
    },
  },
}
