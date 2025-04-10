import {dropdownAetherAlignments} from '../fundamentals/fundamentals'
import {
  createRadioDropdown,
  checkDropdown,
  flexibleReferenceArray,
} from '../schemaVariables/schemaVariables'
import {ValidationRule} from '../types/types'

export default {
  name: 'location',
  title: 'Location',
  type: 'document',
  fieldsets: [
    {name: 'core', title: 'Core Info', options: {columns: 2}},
    {name: 'visual', title: 'Visual Identity', options: {columns: 2}},
    {name: 'integration', title: 'Integration & Content', options: {columns: 2}},
  ],
  fields: [
    {
      name: 'name',
      title: 'Location Name',
      type: 'string',
      validation: (Rule: ValidationRule) => Rule.required(),
      fieldset: 'core',
    },
    {
      name: 'slug',
      title: 'Slug / ID',
      type: 'slug',
      options: {source: 'name'},
      validation: (Rule: ValidationRule) => Rule.required(),
      fieldset: 'core',
    },
    {name: 'shortDescription', title: 'Short Description', type: 'string', fieldset: 'core'},
    {name: 'longDescription', title: 'Detailed Description', type: 'text', fieldset: 'core'},

    {
      name: 'type',
      title: 'Location Type',
      type: 'string',
      options: {
        list: [
          {title: 'City', value: 'city'},
          {title: 'Dungeon', value: 'dungeon'},
          {title: 'Region', value: 'region'},
          {title: 'Landmark', value: 'landmark'},
          {title: 'Ruins', value: 'ruins'},
          {title: 'Sanctum', value: 'sanctum'},
        ],
        layout: 'radio',
      },
      validation: (Rule: ValidationRule) => Rule.required(),
      fieldset: 'core',
    },
    createRadioDropdown('aetherAlignment', 'Aetheric Alignment', dropdownAetherAlignments),

    {name: 'levelMin', title: 'Minimum Level', type: 'number'},
    {name: 'levelMax', title: 'Maximum Level', type: 'number'},
    {name: 'containsAetherNodes', title: 'Contains Aether Nodes?', type: 'boolean'},
    {name: 'isSafeZone', title: 'Is This a Safe Zone?', type: 'boolean'},

    // Visuals
    {
      name: 'portrait',
      title: 'Environment Illustration',
      type: 'image',
      options: {hotspot: true},
      fieldset: 'visual',
    },
    {
      name: 'mapMarker',
      title: 'Map Marker Icon',
      type: 'image',
      options: {hotspot: true},
      fieldset: 'visual',
    },

    // Tags and integrations
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

    flexibleReferenceArray('relatedFactions', 'Associated Factions', ['faction']),
    flexibleReferenceArray('inhabitants', 'Inhabiting NPCs', ['npc']),
    flexibleReferenceArray('associatedQuests', 'Related Quests', ['quest']),
    flexibleReferenceArray('connectedLoreEntries', 'Linked Lore Entries', ['lore']),
    {
      name: 'parentRegion',
      title: 'Parent Region / Zone',
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
