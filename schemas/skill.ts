// ===========================
// schemas/skill.ts
// ===========================

import {
  dropdownSkillTypes,
  dropdownSkillSourceTypes,
  dropdownSkillCategories,
  dropdownTargetTypes,
  dropdownAetherAlignments,
  dropdownConditions,
  dropdownElementalTypes,
  dropdownPhysicalTypes,
  dropdownSkillSupportTags,
} from '../fundamentals/fundamentals'

import {
  createRadioDropdown,
  checkDropdown,
  statEffectArray,
  damageArray,
  resistanceArray,
  needsCategory,
} from '../schemaVariables/schemaVariables'

import {ValidationRule} from '../types/types'

export default {
  name: 'skill',
  title: 'Skill or Ability',
  type: 'document',
  fields: [
    // Identity
    {
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Skill ID',
      type: 'slug',
      options: {source: 'name'},
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Skill Icon',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'description',
      title: 'Long Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'tooltip',
      title: 'Tooltip (short UI hint)',
      type: 'string',
    },

    checkDropdown('supportTags', 'Support Tags (optional)', dropdownSkillSupportTags),

    // Classification
    createRadioDropdown('type', 'Skill Type', dropdownSkillTypes),
    createRadioDropdown('source', 'Source Type', dropdownSkillSourceTypes),
    createRadioDropdown('category', 'Skill Category', dropdownSkillCategories),
    createRadioDropdown('targetType', 'Target Type', dropdownTargetTypes),
    createRadioDropdown('aetherAffinity', 'Aether Alignment (Optional)', dropdownAetherAlignments),

    // Usage Info
    {name: 'range', title: 'Range', type: 'number'},
    {
      name: 'cost',
      title: 'Cost to Use',
      type: 'object',
      fields: [
        {name: 'type', title: 'Resource Type (e.g. Mana)', type: 'string'},
        {name: 'amount', title: 'Amount', type: 'number'},
      ],
    },
    {name: 'cooldown', title: 'Cooldown', type: 'number'},
    {
      name: 'duration',
      title: 'Effect Duration (Optional)',
      type: 'number',
    },

    // Types
    checkDropdown('elementalType', 'Elemental Type', dropdownElementalTypes),
    checkDropdown('physicalType', 'Physical Type', dropdownPhysicalTypes),

    // Effects (modular)
    {
      ...statEffectArray('statEffects', 'Stat Modifiers'),
      ...needsCategory('support', 'healing', 'utility', 'hybrid', 'ultimate'),
    },
    {
      ...damageArray('damageEffects', 'Damage Effects'),
      ...needsCategory('offensive', 'ultimate', 'hybrid'),
    },
    {
      ...resistanceArray('resistanceModifiers', 'Resistances Granted'),
      ...needsCategory('defensive', 'support', 'hybrid'),
    },

    // Conditions
    checkDropdown('conditionsApplied', 'Applies Conditions', dropdownConditions),
    checkDropdown('conditionsRequired', 'Required Conditions', dropdownConditions),

    // Optional Linking
    {
      name: 'linkedTrait',
      title: 'Linked Trait (Optional)',
      type: 'reference',
      to: [{type: 'trait'}],
    },
    {
      name: 'linkedItem',
      title: 'Linked Item (Optional)',
      type: 'reference',
      to: [{type: 'item'}],
    },
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'type',
      media: 'icon',
    },
    prepare({title, subtitle, media}: {title?: string; subtitle?: string; media?: any}) {
      return {
        title: title || 'Unnamed Skill',
        subtitle: subtitle || 'No type specified',
        media,
      }
    },
  },
}
