// ===========================
// schemas/faction.ts
// ===========================

import {flexibleReferenceArray} from '../schemaVariables/schemaVariables'
import {ValidationRule} from '../types/types'

export default {
  name: 'faction',
  title: 'Faction',
  type: 'document',
  fieldsets: [
    {name: 'identity', title: 'Faction Identity', options: {columns: 2}},
    {name: 'lore', title: 'Lore & Origins', options: {columns: 2}},
  ],
  fields: [
    // Core Info
    {
      name: 'name',
      title: 'Faction Name',
      type: 'string',
      validation: (Rule: ValidationRule) => Rule.required(),
      fieldset: 'identity',
    },
    {
      name: 'slug',
      title: 'Faction ID',
      type: 'slug',
      options: {source: 'name'},
      validation: (Rule: ValidationRule) => Rule.required(),
      fieldset: 'identity',
    },
    {
      name: 'tagline',
      title: 'Short Motto or Tagline',
      type: 'string',
      fieldset: 'identity',
    },
    {
      name: 'emblem',
      title: 'Faction Emblem or Symbol',
      type: 'image',
      options: {hotspot: true},
      fieldset: 'identity',
    },

    // Lore & Backstory
    {name: 'summary', title: 'Faction Summary', type: 'text', fieldset: 'lore'},
    {name: 'beliefs', title: 'Beliefs and Goals', type: 'text', fieldset: 'lore'},
    {name: 'hierarchy', title: 'Structure and Hierarchy', type: 'text', fieldset: 'lore'},
    {name: 'origin', title: 'Origin or Founding Story', type: 'text', fieldset: 'lore'},
    {name: 'alignment', title: 'Aetheric Alignment (Optional)', type: 'string', fieldset: 'lore'},

    // Optional Extras
    {
      name: 'tags',
      title: 'Tags (religious, imperial, outlawed, etc)',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'influenceZone',
      title: 'Primary Region or Zone of Influence',
      type: 'reference',
      to: [{type: 'location'}],
    },

    // Lore Reference
    {name: 'loreEntry', title: 'Linked Lore Entry', type: 'reference', to: [{type: 'lore'}]},

    // References
    flexibleReferenceArray('notableMembers', 'Notable Members (NPCs)', ['npc']),
    flexibleReferenceArray('associatedEntities', 'Connected Classes / Races / Items', [
      'characterClass',
      'characterRace',
      'item',
    ]),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
      media: 'emblem',
    },
    prepare({title, subtitle, media}: {title?: string; subtitle?: string; media?: any}) {
      return {
        title: title || 'Unnamed Faction',
        subtitle: subtitle || 'No tagline provided',
        media,
      }
    },
  },
}
