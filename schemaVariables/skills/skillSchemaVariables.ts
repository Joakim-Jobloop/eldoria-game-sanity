import { dropdownElementalTypes, dropdownPhysicalTypes, dropdownPrimaryStats, dropdownSecondaryStats, dropdownTertiaryStats } from "../../fundamentals/fundamentals"
import { ValidationRule } from "../../types/types"
import { checkDropdown } from "../schemaVariables"

export const skillOffensiveStats = () => ({
    name: 'damage',
    title: 'Set the damage this skill deals',
    type: 'object',
    fields: [...[...dropdownPhysicalTypes, ...dropdownElementalTypes].map((opt) => opt.value)].flatMap((stat) => {
      const base = stat.toLowerCase().replace(/\s+/g, '_')
      return [
        { name: `${base}_min`, title: 'Min', type: 'number', fieldset: base },
        { name: `${base}_max`, title: 'Max', type: 'number', fieldset: base },
      ]
    }),
    fieldsets: [...[...dropdownPhysicalTypes, ...dropdownElementalTypes].map((opt) => opt.value)].map((stat) => ({
      name: stat.toLowerCase().replace(/\s+/g, '_'),
      title: stat,
      options: { columns: 2 },
    })),
    validation: (Rule: ValidationRule) => Rule.required().error('Skill must have at least one damage type'),
  })
  
  export const skillDefensiveStats = () => ({
    name: 'defenses',
    title: 'Set the defenses granted by this skill',
    type: 'object',
    fieldsets: [{ name: 'defenseStats', title: 'Defense Stats', options: { columns: 3 } }],
    fields: [...[...dropdownPhysicalTypes, ...dropdownElementalTypes].map((opt) => opt.value)].map((stat) => ({
      name: stat.toLowerCase().replace(/\s+/g, '_'),
      title: stat,
      type: 'number',
      fieldset: 'defenseStats',
    })),
    validation: (Rule: ValidationRule) => Rule.required().error('Skill must define at least one defense value'),
  })
  
  export const skillStatEffects = () => ({
    name: 'statEffects',
    title: 'Stat Effects (Optional)',
    type: 'array',
    of: [
      {
        type: 'object',
        fields: [
          checkDropdown('stat', 'Affected Stat', dropdownPrimaryStats.concat(dropdownSecondaryStats).concat(dropdownTertiaryStats)),
          { name: 'amount', title: 'Amount', type: 'number' },
          { name: 'duration', title: 'Duration', type: 'number' },
        ],
      },
    ],
  })