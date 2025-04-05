// ===========================
// schemas/lore.ts
// ===========================

import { dropdownLoreCategories } from '../fundamentals/fundamentals'
import {
  createRadioDropdown,
  flexibleReferenceArray,
  needsCategory,
} from '../schemaVariables/schemaVariables'
import { ValidationRule } from '../types/types'

export default {
  name: 'lore',
  title: 'Lore Entry',
  type: 'document',
  fieldsets: [
    { name: 'core', title: 'Core Lore Fields', options: { columns: 2 } },
  ],
  fields: [
    // Category selection
    createRadioDropdown('category', 'What kind of lore is this?', dropdownLoreCategories),

    // Common fields
    { name: 'title', title: 'Lore Title', type: 'string', validation: (Rule: ValidationRule) => Rule.required() },
    { name: 'mainTagline', title: 'Main Tagline', type: 'string' },
    { name: 'loreSummary', title: 'Lore Summary', type: 'text' },

    // Conditional core fields
    { name: 'appearance', title: 'Appearance', type: 'text', ...needsCategory('Deity', 'Character Race', 'Character Class', 'Aetheric Phenomenon', 'Metaphysical Force') },
    { name: 'cultureAndSociety', title: 'Culture and Society', type: 'text', ...needsCategory('Deity', 'Character Race', 'Character Class', 'Philosophy or Teaching') },
    { name: 'homeland', title: 'Homeland Description', type: 'text', ...needsCategory('Deity', 'Character Race', 'Character Class', 'Location') },
    { name: 'myth', title: 'Myth or Legend', type: 'text', ...needsCategory('Deity', 'Historical Event', 'Character Race', 'Character Class') },
    { name: 'faction', title: 'Known Faction or Sect', type: 'text', ...needsCategory('Character Race', 'Character Class', 'Philosophy or Teaching') },
    { name: 'natureAndTraits', title: 'Nature and Traits', type: 'text', ...needsCategory('Deity', 'Character Race', 'Character Class', 'Metaphysical Force') },
    { name: 'uniqueArtifact', title: 'Unique Artifact', type: 'text', ...needsCategory('Artifact', 'Deity', 'Character Class') },
    {
      name: 'aetherAlignment',
      title: 'Aether Alignment',
      type: 'string',
      options: {
        layout: 'radio',
        list: ['Vitalis', 'Entropis', 'Balanced'],
      },
      ...needsCategory('Deity', 'Aetheric Phenomenon', 'Character Class', 'Character Race', 'Metaphysical Force'),
    },

    // Optional connections
    flexibleReferenceArray('relatedFigures', 'Notable Figures or Deities', ['npc']),
    flexibleReferenceArray('relatedEntities', 'Connected Entities', ['characterRace', 'characterClass', 'item', 'skill']),

    // Visual
    { name: 'image', title: 'Illustration or Visual', type: 'image', options: { hotspot: true } },
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'mainTagline',
      media: 'image',
    },
    prepare({ title, subtitle, media }: { title?: string; subtitle?: string; media?: any }) {
      return {
        title: title || 'Untitled Lore',
        subtitle: subtitle || 'No tagline provided',
        media,
      }
    },
  },
}
