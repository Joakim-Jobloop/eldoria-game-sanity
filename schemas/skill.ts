import {
    dropdownAetherAlignments,
    dropdownAllStats,
    dropdownConditions,
    dropdownElementalTypes,
    dropdownPhysicalTypes,
    dropdownSkillCategories,
    dropdownSkillSourceTypes,
    dropdownSkillTypes,
    dropdownTargetTypes,
  } from "../fundamentals/fundamentals";
  
  import {
    checkDropdown,
    createRadioDropdown,
    needsCategory,
  } from "../schemaVariables/schemaVariables";
  
  import {
    skillDefensiveStats,
    skillOffensiveStats,
    skillStatEffects,
  } from "../schemaVariables/skills/skillSchemaVariables";
  
  import { ValidationRule } from "../types/types";
  
  export default {
    name: 'skill',
    title: 'Skill or Ability',
    type: 'document',
    fields: [
      { name: 'name', title: 'Skill Name', type: 'string', validation: (Rule: ValidationRule) => Rule.required() },
      { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (Rule: ValidationRule) => Rule.required() },
      { name: 'icon', title: 'Skill Icon', type: 'image', options: { hotspot: true } },
      { name: 'description', title: 'Description', type: 'text', rows: 3 },
      { name: 'tooltip', title: 'Tooltip (short UI hint)', type: 'string' },
  
      createRadioDropdown('type', 'Skill Type', dropdownSkillTypes),
      createRadioDropdown('source', 'Source Type', dropdownSkillSourceTypes),
      createRadioDropdown('category', 'Skill Category', dropdownSkillCategories),
      createRadioDropdown('targetType', 'Target Type', dropdownTargetTypes),
  
      // Optional alignment
      createRadioDropdown('aetherAffinity', 'Aether Alignment (Optional)', dropdownAetherAlignments),
  
      // Range, cost, cooldown, duration
      { name: 'range', title: 'Range', type: 'number', description: 'In meters, tiles, or abstract units' },
      {
        name: 'cost',
        title: 'Cost to Use',
        type: 'object',
        fields: [
          { name: 'type', title: 'Resource Type (e.g. Mana)', type: 'string' },
          { name: 'amount', title: 'Amount', type: 'number' },
        ],
      },
      { name: 'cooldown', title: 'Cooldown', type: 'number', description: 'Cooldown in turns or seconds' },
      { name: 'duration', title: 'Effect Duration (Optional)', type: 'number', description: 'Duration in turns or seconds' },
  
      // Types
      checkDropdown('elementalType', 'Elemental Type (if any)', dropdownElementalTypes),
      checkDropdown('physicalType', 'Physical Type (if any)', dropdownPhysicalTypes),
  
      // Stat effects
      {
        name: 'affectedStats',
        title: 'Affected Stats',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              checkDropdown('stat', 'Stat to Affect', dropdownAllStats),
              { name: 'amount', title: 'Amount', type: 'number' },
            ],
          },
        ],
      },
  
      { ...skillStatEffects(), ...needsCategory('Support', 'Healing', 'Utility') },
      { ...skillOffensiveStats(), ...needsCategory('Offensive', 'Ultimate') },
      { ...skillDefensiveStats(), ...needsCategory('Defensive', 'Support') },
  
      // Conditions
      checkDropdown('conditionsApplied', 'Conditions Applied by this Skill', dropdownConditions),
      checkDropdown('conditionsRequired', 'Conditions Required to Use', dropdownConditions),
  
      // Optional links
      { name: 'linkedTrait', title: 'Linked Trait (if any)', type: 'reference', to: [{ type: 'trait' }] },
      { name: 'linkedItem', title: 'Linked Item (if any)', type: 'reference', to: [{ type: 'item' }] },
    ],
  
    preview: {
      select: {
        title: 'name',
        subtitle: 'type',
        media: 'icon',
      },
      prepare({ title, subtitle, media }: { title?: string; subtitle?: string; media?: any }) {
        return {
          title: title || 'Unnamed Skill',
          subtitle: subtitle || 'No type specified',
          media,
        }
      },
    },
  }
  