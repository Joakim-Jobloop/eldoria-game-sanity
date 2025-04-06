// ===========================
// schemas/structure.ts
// ===========================

import {
    dropdownAetherAlignments,
  } from '../fundamentals/fundamentals'
  
  import {
    createRadioDropdown,
  } from '../schemaVariables/schemaVariables'
  
  import { ValidationRule } from '../types/types'
  
  export default {
    name: 'structure',
    title: 'Structure or Construct',
    type: 'document',
    fields: [
      // Core Info
      {
        name: 'name',
        title: 'Structure Name',
        type: 'string',
        validation: (Rule: ValidationRule) => Rule.required(),
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: { source: 'name' },
        validation: (Rule: ValidationRule) => Rule.required(),
      },
      {
        name: 'image',
        title: 'Structure Image or Illustration',
        type: 'image',
        options: { hotspot: true },
      },
      {
        name: 'description',
        title: 'Structure Description',
        type: 'text',
      },
  
      // Type and Tags
      {
        name: 'structureType',
        title: 'Structure Type',
        type: 'string',
        options: {
          list: [
            'Temple',
            'Tower',
            'Fortress',
            'Workshop',
            'Shrine',
            'Library',
            'Laboratory',
            'Ruins',
            'Sanctuary',
            'Other',
          ].map((t) => ({ title: t, value: t.toLowerCase() })),
          layout: 'radio',
        },
      },
      {
        name: 'tags',
        title: 'Tags (e.g., Divine, Abandoned)',
        type: 'array',
        of: [{ type: 'string' }],
      },
  
      // World Integration
      {
        name: 'linkedLocation',
        title: 'Located In',
        type: 'reference',
        to: [{ type: 'location' }],
      },
      {
        name: 'faction',
        title: 'Controlling or Associated Faction(s)',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'faction' }] }],
      },
  
      // Related Lore and Content
      {
        name: 'loreEntry',
        title: 'Linked Lore Entry (Optional)',
        type: 'reference',
        to: [{ type: 'lore' }],
      },
      {
        name: 'associatedItems',
        title: 'Artifacts or Items Housed Here',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'item' }] }],
      },
  
      createRadioDropdown('aetherAlignment', 'Aether Alignment (Optional)', dropdownAetherAlignments),
    ],
  
    preview: {
      select: {
        title: 'name',
        subtitle: 'structureType',
        media: 'image',
      },
      prepare({ title, subtitle, media }: { title?: string; subtitle?: string; media?: any }) {
        return {
          title: title || 'Unnamed Structure',
          subtitle: subtitle || 'Unknown Type',
          media,
        }
      },
    },
  }
  