// ===========================
// schemas/skill.ts
// ===========================

import {createNamedEntity} from '../schemaTypes/presets'
import {createDefaultFieldsets} from '../schemaTypes/presets'
import {
  dropdownSkillTypes,
  dropdownSkillSourceTypes,
  dropdownSkillCategories,
  dropdownTargetTypes,
} from '../fundamentals/fundamentals'
import {createRadioDropdown} from '../schemaVariables/schemaVariables'
import {
  skillOffensiveStats,
  skillDefensiveStats,
  skillStatEffects,
} from '../schemaVariables/skills/skillSchemaVariables'
import {Rule} from 'sanity'

export default {
  name: 'skill',
  title: 'Skill',
  type: 'document',
  ...createDefaultFieldsets,
  fields: [
    // Base fields with image
    ...Object.values(createNamedEntity({withImage: true})),

    // Core Classification
    createRadioDropdown('skillType', 'Skill Type', dropdownSkillTypes),
    createRadioDropdown('sourceType', 'Source Type', dropdownSkillSourceTypes),
    createRadioDropdown('category', 'Skill Category', dropdownSkillCategories),
    createRadioDropdown('targetType', 'Target Type', dropdownTargetTypes),

    // Stats and Effects
    {
      ...skillOffensiveStats(),
      validation: (Rule: Rule) => Rule.required().min(1),
    },
    {
      ...skillDefensiveStats(),
      validation: (Rule: Rule) => Rule.required().min(1),
    },
    {
      ...skillStatEffects(),
      validation: (Rule: Rule) => Rule.required().min(1),
    },

    // Associated Entities
    {
      name: 'requiredTraits',
      title: 'Required Traits',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'trait'}]}],
      validation: (Rule: Rule) => Rule.min(0),
    },
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'skillType',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle,
        media,
      }
    },
  },
}
