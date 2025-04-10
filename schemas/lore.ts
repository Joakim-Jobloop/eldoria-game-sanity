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
  fieldsets: [
    {name: 'category', title: 'Category and Subtype', options: {columns: 2}},
    {name: 'core', title: 'Core Lore Info', options: {columns: 2}},
    {name: 'conditional', title: 'Conditional Fields', options: {columns: 2}},
    {name: 'connections', title: 'Factions, Links & Related', options: {columns: 2}},
  ],
  fields: [
    // Main Category
    createRadioDropdown('category', 'What kind of lore is this?', dropdownLoreCategories),

    // Subcategories (conditionally shown)
    {
      name: 'deitySubCategory',
      title: 'Deity Subcategory',
      type: 'string',
      options: {
        list: [
          {title: 'Greater Deity', value: 'greater'},
          {title: 'Common Deity', value: 'common'},
          {title: 'Lesser Deity', value: 'lesser'},
        ],
        layout: 'dropdown',
      },
      fieldset: 'category',
      ...needsCategory('deity'),
    },
    {
      name: 'aethericPhenomenonSubCategory',
      title: 'Aetheric Phenomenon Type',
      type: 'string',
      options: {
        list: [
          {title: 'Natural Node', value: 'natural_node'},
          {title: 'Veiltear', value: 'veiltear'},
          {title: 'Shatterline', value: 'shatterline'},
          {title: 'Ashfount', value: 'ashfount'},
        ],
        layout: 'dropdown',
      },
      fieldset: 'category',
      ...needsCategory('aetheric_phenomenon'),
    },
    {
      name: 'metaphysicalForceSubCategory',
      title: 'Metaphysical Force Type',
      type: 'string',
      options: {
        list: [
          {title: 'Primal', value: 'primal'},
          {title: 'Derived', value: 'derived'},
        ],
        layout: 'dropdown',
      },
      fieldset: 'category',
      ...needsCategory('metaphysical_force'),
    },
    {
      name: 'artifactSubCategory',
      title: 'Artifact Type',
      type: 'string',
      options: {
        list: [
          {title: 'Item', value: 'item'},
          {title: 'Structure', value: 'structure'},
          {title: 'Location', value: 'location'},
        ],
        layout: 'dropdown',
      },
      fieldset: 'category',
      ...needsCategory('artifact'),
    },
    {
      name: 'philosophySubCategory',
      title: 'Philosophy Type',
      type: 'string',
      options: {
        list: [
          {title: 'Religious', value: 'religious'},
          {title: 'Aetheric', value: 'aetheric'},
          {title: 'Martial', value: 'martial'},
          {title: 'Cultural', value: 'cultural'},
        ],
        layout: 'dropdown',
      },
      fieldset: 'category',
      ...needsCategory('philosophy_or_teaching'),
    },

    // Core Fields
    {
      name: 'title',
      title: 'Lore Title',
      type: 'string',
      validation: (Rule: ValidationRule) => Rule.required(),
      fieldset: 'core',
    },
    {
      name: 'mainTagline',
      title: 'Main Tagline',
      type: 'string',
      validation: (Rule: ValidationRule) => Rule.required(),
      fieldset: 'core',
    },
    {
      name: 'loreSummary',
      title: 'Lore Summary',
      type: 'text',
      validation: (Rule: ValidationRule) => Rule.required(),
      fieldset: 'core',
    },
    {
      name: 'image',
      title: 'Illustration or Visual',
      type: 'image',
      options: {hotspot: true},
      fieldset: 'core',
    },

    // Conditional Fields
    {
      name: 'appearance',
      title: 'Appearance',
      type: 'text',
      fieldset: 'conditional',
      ...needsCategory(
        'deity',
        'race',
        'class',
        'aetheric_phenomenon',
        'metaphysical_force',
        'artifact',
      ),
    },
    {
      name: 'cultureAndSociety',
      title: 'Culture and Society',
      type: 'text',
      fieldset: 'conditional',
      ...needsCategory('deity', 'race', 'class', 'philosophy_or_teaching'),
    },
    {
      name: 'homeland',
      title: 'Homeland',
      type: 'text',
      fieldset: 'conditional',
      ...needsCategory('deity', 'race', 'class', 'location'),
    },
    {
      name: 'myth',
      title: 'Myth or Legend',
      type: 'text',
      fieldset: 'conditional',
      ...needsCategory('deity', 'historical_event', 'race', 'class', 'artifact'),
    },
    {
      name: 'natureAndTraits',
      title: 'Nature and Traits',
      type: 'text',
      fieldset: 'conditional',
      ...needsCategory('deity', 'race', 'class', 'metaphysical_force', 'artifact'),
    },
    {
      name: 'associatedArtifacts',
      title: 'Associated Artifacts or Structures',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'item'}, {type: 'location'}]}],
      fieldset: 'conditional',
      ...needsCategory('artifact', 'deity', 'class', 'race', 'location'),
    },

    // Relationships & Lore Web
    flexibleReferenceArray('faction', 'Known Faction or Sect', ['faction']),
    createRadioDropdown('aetherAlignment', 'Aether Alignment', dropdownAetherAlignments),
    flexibleReferenceArray('relatedFigures', 'Notable Figures or Deities', ['npc']),
    flexibleReferenceArray('relatedEntities', 'Connected Entities', [
      'characterRace',
      'characterClass',
      'item',
      'skill',
    ]),
    flexibleReferenceArray('relatedLore', 'Related Lore', ['lore']),
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
