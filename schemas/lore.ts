// ===========================
// schemas/lore.ts
// ===========================

import {createNamedEntity} from '../schemaTypes/presets'
import {createDefaultFieldsets} from '../schemaTypes/presets'
import {aethericResonance} from '../schemaTypes/aethericTypes'
import {narrativeContext} from '../schemaTypes/narrativeTypes'
import {flexibleReferenceArray, needsCategory} from '../schemaVariables/schemaVariables'
import {dropdownLoreCategories} from '../fundamentals/fundamentals'
import {Rule} from 'sanity'

interface LoreMetadata {
  isSecret?: boolean
  isLegend?: boolean
  isHistorical?: boolean
}

interface LorePreview {
  title?: string
  subtitle?: string
  media?: any
  metadata?: LoreMetadata
  category?: string
}

export default {
  name: 'lore',
  title: 'Lore Entry',
  type: 'document',
  ...createDefaultFieldsets,
  fields: [
    // Base fields with image
    ...Object.values(createNamedEntity({withImage: true})),

    // Core Classification and Categories
    {
      name: 'loreCategory',
      title: 'What kind of lore is this?',
      type: 'string',
      options: {list: dropdownLoreCategories},
      validation: (Rule: Rule) => Rule.required().error('Lore category must be specified'),
      fieldset: 'core',
    },

    // Subcategories based on type
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
      },
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
      },
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
      },
      ...needsCategory('metaphysical_force'),
    },

    // Narrative Context
    narrativeContext,

    // Aetheric Properties
    aethericResonance,

    // Appearances and Manifestations
    {
      name: 'appearance',
      title: 'Appearance',
      type: 'text',
      fieldset: 'lore',
      ...needsCategory(
        'deity',
        'race',
        'class',
        'aetheric_phenomenon',
        'metaphysical_force',
        'artifact',
      ),
    },

    // Class-specific Lore Fields
    {
      name: 'aethericConnection',
      title: 'Connection to Aetheric Phenomena',
      type: 'text',
      fieldset: 'lore',
      description: 'How this entity interacts with and is affected by aetheric forces',
      ...needsCategory('class'),
    },
    {
      name: 'aethericConnectionTagline',
      title: 'Aetheric Connection Tagline',
      type: 'string',
      fieldset: 'lore',
      description: 'A short phrase describing the connection to aetheric forces',
      ...needsCategory('class'),
    },
    {
      name: 'aethericAdaptation',
      title: 'Aetheric Adaptation',
      type: 'text',
      fieldset: 'lore',
      description: 'How this entity has adapted to use or resist aetheric forces',
      ...needsCategory('class'),
    },
    {
      name: 'aethericAdaptationTagline',
      title: 'Aetheric Adaptation Tagline',
      type: 'string',
      fieldset: 'lore',
      description: 'A short phrase describing the aetheric adaptation',
      ...needsCategory('class'),
    },
    {
      name: 'philosophy',
      title: 'Philosophy and Orders',
      type: 'text',
      fieldset: 'lore',
      description: 'The belief systems and organizations associated with this entity',
      ...needsCategory('class', 'faction', 'race'),
    },
    {
      name: 'symbolism',
      title: 'Symbolism and Cultural Role',
      type: 'text',
      fieldset: 'lore',
      description: 'The symbolic meaning and cultural significance in the world',
      ...needsCategory('class', 'race', 'artifact'),
    },
    {
      name: 'folklore',
      title: 'Folklore',
      type: 'text',
      fieldset: 'lore',
      description: 'Myths, legends, and stories associated with this entity',
      ...needsCategory('class', 'race', 'artifact', 'location'),
    },

    // Cultural Impact
    {
      name: 'cultureAndSociety',
      title: 'Culture and Society',
      type: 'text',
      fieldset: 'lore',
      ...needsCategory('deity', 'race', 'class', 'philosophy_or_teaching'),
    },
    {
      name: 'myth',
      title: 'Myth or Legend',
      type: 'text',
      fieldset: 'lore',
      ...needsCategory('deity', 'historical_event', 'race', 'class', 'artifact'),
    },

    // World Integration
    {
      name: 'worldIntegration',
      title: 'World Integration',
      type: 'object',
      fieldset: 'integration',
      fields: [
        flexibleReferenceArray('associatedFactions', 'Known Factions or Sects', ['faction']),
        flexibleReferenceArray('relatedFigures', 'Notable Figures or Deities', ['npc']),
        flexibleReferenceArray('relatedEntities', 'Connected Entities', [
          'characterRace',
          'characterClass',
          'item',
          'skill',
        ]),
        flexibleReferenceArray('relatedLocations', 'Connected Locations', ['location']),
        flexibleReferenceArray('relatedLore', 'Related Lore', ['lore']),
      ],
    },

    {
      name: 'metadata',
      title: 'Lore Metadata',
      type: 'object',
      fieldset: 'core',
      fields: [
        {name: 'isSecret', title: 'Secret Knowledge?', type: 'boolean'},
        {name: 'isLegend', title: 'Legendary Tale?', type: 'boolean'},
        {name: 'isHistorical', title: 'Historical Record?', type: 'boolean'},
      ],
      validation: (Rule: Rule) => Rule.required(),
    },
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'loreCategory',
      media: 'image',
      metadata: 'metadata',
      category: 'loreCategory',
    },
    prepare({title, subtitle, media, metadata, category}: LorePreview) {
      const icons = {
        deity: '✨',
        'aetheric phenomenon': '🌀',
        'metaphysical force': '💫',
        'historical event': '📜',
        location: '🗺️',
        'philosophy or teaching': '📚',
        artifact: '🏺',
        race: '👥',
        class: '⚔️',
        other: '📖',
      }

      const prefix = metadata?.isSecret
        ? '🔒 '
        : metadata?.isLegend
          ? '📖 '
          : metadata?.isHistorical
            ? '📜 '
            : icons[category?.toLowerCase() as keyof typeof icons] || '📖 '

      return {
        title: prefix + (title || 'Unnamed Lore Entry'),
        subtitle: subtitle || 'Uncategorized',
        media,
      }
    },
  },
}
