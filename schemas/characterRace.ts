import {primaryStats} from '../fundamentals/attributes'
import {characterRaces} from '../fundamentals/races'
import {validateTotalSum} from '../schemaVariables/common'
import {createRadioDropdown} from '../schemaVariables/schemaVariables'
import {AttributeRules} from '../types/types'

export default {
  name: 'characterRace',
  title: 'Character Race',
  type: 'document',
  fields: [
    // RACE TYPE
    createRadioDropdown('raceCategory', 'What Character Race is this?', characterRaces),

    // ATTRIBUTES
    {
      name: 'starterAttributes',
      title: 'Starter Attributes',
      type: 'object',
      fieldsets: [
        {
          name: 'starterStats',
          title: 'Starter Stats (should sum up to 15)',
          options: {columns: 3},
        },
      ],
      validation: validateTotalSum(15, 'Starter attributes'),
      fields: primaryStats.map((stat) => ({
        name: stat.toLowerCase().replace(/\s+/g, '_'),
        title: stat,
        type: 'number',
        fieldset: 'starterStats',
        validation: (Rule: AttributeRules) =>
          Rule.min(1).max(10).error(`${stat} must be between 1 and 10`),
      })),
    },

    // VISUALS
    {name: 'logo', title: 'Race Logo', type: 'image', options: {hotspot: true}},
    {name: 'portraitMale', title: 'Male Portrait', type: 'image', options: {hotspot: true}},
    {name: 'portraitFemale', title: 'Female Portrait', type: 'image', options: {hotspot: true}},
    {name: 'portraitOther', title: 'Other Portrait', type: 'image', options: {hotspot: true}},

    // CORE LORE
    {name: 'mainTagline', title: 'Main Tagline', type: 'string'},
    {name: 'loreSummary', title: 'Lore Summary', type: 'text'},
    {name: 'appearance', title: 'Appearance', type: 'text'},
    {name: 'cultureAndSociety', title: 'Culture and Society', type: 'text'},
    {name: 'homeland', title: 'Homeland Description', type: 'text'},
    {name: 'myth', title: 'Myth or Legend', type: 'text'},
    {name: 'faction', title: 'Known Faction or Sect', type: 'text'},

    // OPTIONAL LORE ENRICHMENT
    {name: 'natureAndTraits', title: 'Nature and Traits', type: 'text'},
    {name: 'uniqueArtifact', title: 'Unique Artifact', type: 'text'},

    // AETHERIC ALIGNMENT
    {
      name: 'aetherAlignment',
      title: 'Typical Aether Alignment',
      type: 'string',
      options: {
        list: ['Vitalis', 'Entropis', 'Balanced'],
        layout: 'radio',
      },
    },

    //! FUTURE USE – Uncomment when these schemas are live:
    // {
    //   name: 'raceTraits',
    //   title: 'Race Traits',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'reference',
    //       to: [{type: 'trait'}],
    //     },
    //   ],
    // },
    // {
    //   name: 'corruptionForms',
    //   title: 'Corruption Forms',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'reference',
    //       to: [{type: 'monster'}],
    //     },
    //   ],
    // },
    // {
    //   name: 'notableFigures',
    //   title: 'Notable Figures',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'reference',
    //       to: [{type: 'npc'}],
    //     },
    //   ],
    // },

  ],

  preview: {
    select: {
      title: 'raceCategory',
      description: 'mainTagline',
      media: 'portraitMale',
    },
    prepare({title, description, media}: {title?: string; description?: string; media?: any}) {
      return {
        title: title || 'Unnamed Race',
        description: description ? description.slice(0, 100) : 'No tagline provided',
        media,
      }
    },
  },
}
