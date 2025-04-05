// ===========================
// schemas/characterRace.ts
// ===========================

import {
  dropdownCharacterRaces,
  dropdownPrimaryStats,
} from '../fundamentals/fundamentals'

import {
  validateTotalSum,
  createRadioDropdown,
  flexibleReferenceArray,
} from '../schemaVariables/schemaVariables'

import { AttributeRules } from '../types/types'

export default {
  name: 'characterRace',
  title: 'Character Race',
  type: 'document',
  fieldsets: [
    { name: 'starterStats', title: 'Starter Stats (should sum to 15)', options: { columns: 3 } },
    { name: 'lore', title: 'Lore Fields', options: { columns: 2 } },
  ],
  fields: [
    // Dropdown for race selection
    createRadioDropdown('raceCategory', 'What Character Race is this?', dropdownCharacterRaces),

    // Stat block
    {
      name: 'starterAttributes',
      title: 'Starter Attributes',
      type: 'object',
      fieldset: 'starterStats',
      validation: validateTotalSum(15, 'Starter attributes'),
      fields: dropdownPrimaryStats.map((stat) => ({
        name: stat.value.replace(/\s+/g, '_').toLowerCase(),
        title: stat.title,
        type: 'number',
        validation: (Rule: AttributeRules) => Rule.min(1).max(10).error(`${stat.title} must be between 1 and 10`),
      })),
    },

    // Traits (future schema connection)
    flexibleReferenceArray('raceTraits', 'Race Traits', ['trait']),

    // Visuals
    { name: 'logo', title: 'Race Logo', type: 'image', options: { hotspot: true } },
    { name: 'portraitMale', title: 'Male Portrait', type: 'image', options: { hotspot: true } },
    { name: 'portraitFemale', title: 'Female Portrait', type: 'image', options: { hotspot: true } },
    { name: 'portraitOther', title: 'Other Portrait', type: 'image', options: { hotspot: true } },

    // Lore Reference
    { name: 'loreEntry', title: 'Linked Lore Entry', type: 'reference', to: [{ type: 'lore' }] },

    // Future expansion
    flexibleReferenceArray('corruptionForms', 'Corruption Forms', ['monster']),
    flexibleReferenceArray('notableFigures', 'Notable Figures', ['npc']),
  ],

  preview: {
    select: {
      title: 'raceCategory',
      description: 'mainTagline',
      media: 'portraitMale',
    },
    prepare({ title, description, media }: { title?: string; description?: string; media?: any }) {
      return {
        title: title || 'Unnamed Race',
        description: description ? description.slice(0, 100) : 'No tagline provided',
        media,
      }
    },
  },
}
