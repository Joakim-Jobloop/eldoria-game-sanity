import {primaryStats} from '../fundamentals/attributes'
import {characterClasses} from '../fundamentals/classes'
import {validateTotalSum} from '../schemaVariables/common'
import {createRadioDropdown} from '../schemaVariables/schemaVariables'
import {AttributeRules} from '../types/types'

export default {
  name: 'characterClass',
  title: 'Character Class',
  type: 'document',
  fields: [
    // CLASS NAME SELECTOR
    createRadioDropdown('className', 'What Character Class is this?', characterClasses),

    // STARTING ATTRIBUTES
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

    // STARTING EQUIPMENT
    {
      name: 'startEquipment',
      title: 'Start Equipment',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'item'}],
        },
      ],
    },

    // VISUAL FIELDS
    {
      name: 'logo',
      title: 'Class Logo',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'portrait',
      title: 'Class Portrait',
      type: 'image',
      options: {hotspot: true},
    },

    // CORE LORE
    {name: 'mainTagline', title: 'Main Tagline', type: 'string'},
    {name: 'archetype', title: 'Role and Archetype', type: 'text'},
    {name: 'appearance', title: 'Appearance', type: 'text'},
    {name: 'aethericConnection', title: 'Connection to Aetheric Phenomena', type: 'text'},
    {name: 'aethericConnectionTagline', title: 'Aetheric Connection Tagline', type: 'string'},
    {name: 'aethericAdaptation', title: 'Aetheric Adaptation', type: 'text'},
    {name: 'aethericAdaptationTagline', title: 'Aetheric Adaptation Tagline', type: 'string'},
    {name: 'philosophy', title: 'Philosophy and Orders', type: 'text'},
    {name: 'signatureAbilities', title: 'Signature Abilities', type: 'array', of: [{type: 'string'}]},
    {name: 'symbolism', title: 'Symbolism and Role in Eldoria', type: 'text'},
    {name: 'folklore', title: 'Folklore', type: 'text'},

    // OPTIONAL ENRICHMENT
    {name: 'uniqueArtifact', title: 'Unique Artifact', type: 'text'},
    {name: 'notableFigure', title: 'Notable Figure or Founder', type: 'text'},
    {
      name: 'aetherAlignment',
      title: 'Typical Aether Alignment',
      type: 'string',
      options: {
        list: ['Vitalis', 'Entropis', 'Balanced'],
        layout: 'radio',
      },
    },

    //! FUTURE USE — Uncomment when schemas are live
    // {
    //   name: 'classTraits',
    //   title: 'Class Traits',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'reference',
    //       to: [{type: 'traits'}],
    //     },
    //   ],
    // },
    // {
    //   name: 'classAbilities',
    //   title: 'Class Abilities',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'reference',
    //       to: [{type: 'skills'}],
    //     },
    //   ],
    // },

  ],

  preview: {
    select: {
      title: 'className',
      description: 'mainTagline',
      media: 'portrait',
    },
    prepare({title, description, media}: {title?: string; description?: string; media?: any}) {
      return {
        title: title || 'Unnamed Class',
        description: description?.slice(0, 100) || 'No tagline provided',
        media,
      }
    },
  },
}
