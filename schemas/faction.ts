// ===========================
// schemas/faction.ts
// ===========================

import { flexibleReferenceArray } from '../schemaVariables/schemaVariables'
import { ValidationRule } from '../types/types'

export default {
  name: 'faction',
  title: 'Faction',
  type: 'document',
  fields: [
    { name: 'name', title: 'Faction Name', type: 'string', validation: (Rule: ValidationRule) => Rule.required() },
    { name: 'slug', title: 'Faction ID', type: 'slug', options: { source: 'name' }, validation: (Rule: ValidationRule) => Rule.required() },

    { name: 'tagline', title: 'Tagline', type: 'string' },
    { name: 'summary', title: 'Summary', type: 'text' },
    { name: 'beliefs', title: 'Beliefs and Goals', type: 'text' },
    { name: 'structure', title: 'Structure and Hierarchy', type: 'text' },
    { name: 'origin', title: 'Origin or Founding Story', type: 'text' },

    // Visual Identity
    { name: 'symbol', title: 'Faction Symbol or Emblem', type: 'image', options: { hotspot: true } },

    // Lore Connections
    { name: 'loreEntry', title: 'Linked Lore Entry', type: 'reference', to: [{ type: 'lore' }] },

    // References
    flexibleReferenceArray('notableMembers', 'Notable Members', ['npc']),
    flexibleReferenceArray('associatedEntities', 'Associated Classes, Races or Items', ['characterClass', 'characterRace', 'item']),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
      media: 'symbol',
    },
    prepare({ title, subtitle, media }: { title?: string; subtitle?: string; media?: any }) {
      return {
        title: title || 'Unnamed Faction',
        subtitle: subtitle || 'No tagline provided',
        media,
      }
    },
  },
}
