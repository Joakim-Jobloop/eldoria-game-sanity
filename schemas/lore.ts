// ===========================
// schemas/lore.ts
// ===========================

import {dropdownAetherAlignments, dropdownLoreCategories} from '../fundamentals/fundamentals'
import {
  createRadioDropdown,
  flexibleReferenceArray,
  needsCategory,
} from '../schemaVariables/schemaVariables'
import {ValidationRule} from '../types/types'

export default {
  name: 'lore',
  title: 'Lore Entry',
  type: 'document',
  fieldsets: [{name: 'core', title: 'Core Lore Fields', options: {columns: 2}}],
  fields: [
    // Category selection
    createRadioDropdown('category', 'What kind of lore is this?', dropdownLoreCategories),

    // Common fields
    {
      name: 'title',
      title: 'Lore Title',
      type: 'string',
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {name: 'mainTagline', title: 'Main Tagline', type: 'string'},
    {name: 'loreSummary', title: 'Lore Summary', type: 'text'},

    // Conditional core fields
    {
      name: 'appearance',
      title: 'Appearance',
      type: 'text',
      ...needsCategory(
        'deity',
        'race',
        'class',
        'aetheric_phenomenon',
        'metaphysical_force',
        'Race',
      ),
    },
    {
      name: 'cultureAndSociety',
      title: 'Culture and Society',
      type: 'text',
      ...needsCategory('deity', 'race', 'class', 'philosophy_or_teaching'),
    },
    {
      name: 'homeland',
      title: 'Homeland Description',
      type: 'text',
      ...needsCategory('deity', 'race', 'class', 'location'),
    },
    {
      name: 'myth',
      title: 'Myth or Legend',
      type: 'text',
      ...needsCategory('deity', 'historical_event', 'race', 'class'),
    },
    {
      name: 'natureAndTraits',
      title: 'Nature and Traits',
      type: 'text',
      ...needsCategory('deity', 'race', 'class', 'metaphysical_force'),
    },
    {
      name: 'uniqueArtifact',
      title: 'Unique Artifact',
      type: 'text',
      ...needsCategory('artifact', 'deity', 'class'),
    },
    flexibleReferenceArray('faction', 'Known Faction or Sect', ['faction']),
  
    {
      ...createRadioDropdown('aetherAlignment', 'Aether Alignment', dropdownAetherAlignments),
      ...needsCategory(
        'deity',
        'aetheric_phenomenon',
        'class',
        'race',
        'metaphysical_force'
      ),
    },

    // Optional connections
    flexibleReferenceArray('relatedFigures', 'Notable Figures or Deities', ['npc']),
    flexibleReferenceArray('relatedEntities', 'Connected Entities', [
      'characterRace',
      'characterClass',
      'item',
      'skill',
    ]),
    flexibleReferenceArray('relatedLore', 'Related Lore', [
      'lore',
    ]),

    // Visual
    {name: 'image', title: 'Illustration or Visual', type: 'image', options: {hotspot: true}},
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'mainTagline',
      media: 'image',
    },
    prepare({title, subtitle, media}: {title?: string; subtitle?: string; media?: any}) {
      return {
        title: title || 'Untitled Lore',
        subtitle: subtitle || 'No tagline provided',
        media,
      }
    },
  },
}
