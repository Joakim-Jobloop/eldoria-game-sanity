// ===========================
// schemas/characterRace.ts
// ===========================

import {dropdownCharacterRaces, dropdownPrimaryStats} from '../fundamentals/fundamentals'

import {
  validateTotalSum,
  createRadioDropdown,
  flexibleReferenceArray,
} from '../schemaVariables/schemaVariables'

import {AttributeRules} from '../types/types'

export default {
  name: 'characterRace',
  title: 'Character Race',
  type: 'document',
  fields: [
    // Classification
    createRadioDropdown('category', 'What Character Race is this?', dropdownCharacterRaces),

    // Stat block
    {
      name: 'starterAttributes',
      title: 'Starter Attributes (should sum to 15)',
      type: 'object',
      validation: validateTotalSum(15, 'Starter attributes'),
      options: {columns: 3},
      fields: dropdownPrimaryStats.map((stat) => ({
        name: stat.value.replace(/\s+/g, '_').toLowerCase(),
        title: stat.title,
        type: 'number',
        validation: (Rule: AttributeRules) =>
          Rule.min(1).max(10).error(`${stat.title} must be between 1 and 10`),
      })),
    },

    // Trait references
    flexibleReferenceArray('raceTraits', 'Race Traits', ['trait']),

    // Visuals
    {name: 'logo', title: 'Race Logo', type: 'image', options: {hotspot: true}},
    {name: 'portraitMale', title: 'Male Portrait', type: 'image', options: {hotspot: true}},
    {name: 'portraitFemale', title: 'Female Portrait', type: 'image', options: {hotspot: true}},
    {name: 'portraitOther', title: 'Other Portrait', type: 'image', options: {hotspot: true}},

    // Display tagline (will move to lore later)
    {name: 'mainTagline', title: 'Main Tagline', type: 'string'},

    // Lore connection
    {name: 'loreEntry', title: 'Linked Lore Entry', type: 'reference', to: [{type: 'lore'}]},

    // Optional connections
    flexibleReferenceArray('corruptionForms', 'Corruption Forms', ['npc']),
    flexibleReferenceArray('notableFigures', 'Notable Figures', ['npc']),
  ],

  preview: {
    select: {
      title: 'category',
      subtitle: 'mainTagline',
      media: 'portraitMale',
    },
    prepare({title, subtitle, media}: {title?: string; subtitle?: string; media?: any}) {
      return {
        title: title || 'Unnamed Race',
        subtitle: subtitle?.slice(0, 100) || 'No tagline provided',
        media,
      }
    },
  },
}
