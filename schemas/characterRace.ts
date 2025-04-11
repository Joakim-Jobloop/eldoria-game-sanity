// ===========================
// schemas/characterRace.ts
// ===========================

import {Rule} from 'sanity'
import {createNamedEntity} from '../schemaTypes/presets.js'
import {createDefaultFieldsets} from '../schemaTypes/presets.js'
import {dropdownCharacterRaces} from '../fundamentals/fundamentals.js'
import {createRadioDropdown, flexibleReferenceArray} from '../schemaVariables/schemaVariables.js'

export default {
  name: 'characterRace',
  title: 'Character Race',
  type: 'document',
  ...createDefaultFieldsets,
  fields: [
    // Base fields with image only
    ...Object.values(createNamedEntity({withImage: true, withLore: false})),

    // Core Classification
    createRadioDropdown('category', 'Race Category', dropdownCharacterRaces),

    // Visual Identity
    {
      name: 'portraitMale',
      title: 'Male Portrait',
      type: 'image',
      options: {hotspot: true},
      fieldset: 'visuals',
    },
    {
      name: 'portraitFemale',
      title: 'Female Portrait',
      type: 'image',
      options: {hotspot: true},
      fieldset: 'visuals',
    },
    {
      name: 'portraitOther',
      title: 'Other Portrait',
      type: 'image',
      options: {hotspot: true},
      fieldset: 'visuals',
    },
    {
      name: 'logo',
      title: 'Race Symbol or Icon',
      type: 'image',
      options: {hotspot: true},
      fieldset: 'visuals',
    },

    // Race Traits
    flexibleReferenceArray('raceTraits', 'Race Traits', ['trait']),

    // Race-specific Lore References
    {
      name: 'raceLore',
      title: 'Race Lore',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'lore'}]}],
      fieldset: 'lore',
      description:
        "Detailed lore entries about this race's culture, history, and role in the world",
      validation: (Rule: Rule) =>
        Rule.required().error('At least one lore entry is required for race documentation'),
    },

    // Basic Info (kept in race schema as it's directly gameplay relevant)
    {
      name: 'physicalCharacteristics',
      title: 'Physical Characteristics',
      type: 'text',
      fieldset: 'core',
      description: 'Basic physical traits and appearance that affect gameplay',
    },
    {
      name: 'racialAbilities',
      title: 'Racial Abilities',
      type: 'text',
      fieldset: 'core',
      description: 'Innate abilities and traits that affect gameplay',
    },

    // Connections
    flexibleReferenceArray('corruptionForms', 'Corruption Forms', ['npc']),
    flexibleReferenceArray('notableFigures', 'Notable Figures', ['npc']),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      logo: 'logo',
      portraitMale: 'portraitMale',
      portraitFemale: 'portraitFemale',
      portraitOther: 'portraitOther',
    },
    prepare({title, subtitle, logo, portraitMale, portraitFemale, portraitOther}) {
      const hasAllPortraits = portraitMale && portraitFemale && portraitOther
      const icon = hasAllPortraits ? '👥 ' : '👤 '

      return {
        title: icon + (title || 'Unnamed Race'),
        subtitle: subtitle || 'No category specified',
        media: logo || portraitMale || null,
      }
    },
  },
}
