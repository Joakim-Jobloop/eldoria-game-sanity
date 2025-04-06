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

    // Subcategories by category
    {
      name: 'deitySubCategory',
      title: 'Deity Subcategory',
      type: 'string',
      options: {
        list: [
          { title: 'Greater Deity', value: 'greater' },
          { title: 'Common Deity', value: 'common' },
          { title: 'Lesser Deity', value: 'lesser' },
        ],
        layout: 'dropdown',
      },
      ...needsCategory('deity'),
    },
    {
      name: 'aethericPhenomenonSubCategory',
      title: 'Aetheric Phenomenon Type',
      type: 'string',
      options: {
        list: [
          { title: 'Natural Node', value: 'natural_node' },
          { title: 'Veiltear', value: 'veiltear' },
          { title: 'Shatterline', value: 'shatterline' },
          { title: 'Ashfount', value: 'ashfount' },
        ],
        layout: 'dropdown',
      },
      ...needsCategory('aetheric_phenomenon'),
    },
    {
      name: 'metaphysicalForceSubCategory',
      title: 'Metaphysical Force Type',
      type: 'string',
      options: {
        list: [
          { title: 'Primal', value: 'primal' },
          { title: 'Derived', value: 'derived' },
        ],
        layout: 'dropdown',
      },
      ...needsCategory('metaphysical_force'),
    },
    {
      name: 'artifactSubCategory',
      title: 'Artifact Type',
      type: 'string',
      options: {
        list: [
          { title: 'Item', value: 'item' },
          { title: 'Structure', value: 'structure' },
          { title: 'Location', value: 'location' },
        ],
        layout: 'dropdown',
      },
      ...needsCategory('artifact'),
    },
    {
      name: 'philosophySubCategory',
      title: 'Philosophy Type',
      type: 'string',
      options: {
        list: [
          { title: 'Religious', value: 'religious' },
          { title: 'Aetheric', value: 'aetheric' },
          { title: 'Martial', value: 'martial' },
          { title: 'Cultural', value: 'cultural' },
        ],
        layout: 'dropdown',
      },
      ...needsCategory('philosophy_or_teaching'),
    },

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
        'race',
        'artifact'
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
      ...needsCategory('deity', 'historical_event', 'race', 'class', 'artifact'),
    },
    {
      name: 'natureAndTraits',
      title: 'Nature and Traits',
      type: 'text',
      ...needsCategory('deity', 'race', 'class', 'metaphysical_force', 'artifact'),
    },
    {
      name: 'associatedArtifacts',
      title: 'Associated Artifacts or Structures',
      type: 'array',
      of: [
        { type: 'reference', to: [{ type: 'item' }, { type: 'location' }] },
      ],
      ...needsCategory('artifact', 'deity', 'class', 'race', 'location'),
    },
    flexibleReferenceArray('faction', 'Known Faction or Sect', ['faction']),

    createRadioDropdown('aetherAlignment', 'Aether Alignment', dropdownAetherAlignments),

    // Optional connections
    flexibleReferenceArray('relatedFigures', 'Notable Figures or Deities', ['npc']),
    flexibleReferenceArray('relatedEntities', 'Connected Entities', [
      'characterRace',
      'characterClass',
      'item',
      'skill',
    ]),
    flexibleReferenceArray('relatedLore', 'Related Lore', ['lore']),

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
