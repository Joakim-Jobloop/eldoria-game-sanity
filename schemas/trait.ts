// ===========================
// schemas/trait.ts
// ===========================


  
  import { dropdownConditions, dropdownElementalTypes, dropdownPhysicalTypes, dropdownPrimaryStats, dropdownSecondaryStats, dropdownTertiaryStats, dropdownTraitTypes } from '../fundamentals/fundamentals';
import {
    createRadioDropdown,
    numberDropdown,
  } from '../schemaVariables/schemaVariables'
  
  export default {
    name: 'trait',
    title: 'Trait',
    type: 'document',
    fields: [
      { name: 'name', title: 'Name of Trait', type: 'string' },
      { name: 'description', title: 'Description', type: 'text' },
  
      // Trait Type (Offensive/Defensive/Utility)
      createRadioDropdown('traitType', 'What kind of trait is this?', dropdownTraitTypes),
  
      // Stat Effects by Category
      numberDropdown('primaryStatBonuses', 'Primary Stat Bonuses', dropdownPrimaryStats.map((s) => s.title), false),
      numberDropdown('secondaryStatBonuses', 'Secondary Stat Bonuses', dropdownSecondaryStats.map((s) => s.title), false),
      numberDropdown('tertiaryStatBonuses', 'Tertiary Stat Bonuses', dropdownTertiaryStats.map((s) => s.title), false),
      numberDropdown('conditionBonuses', 'Condition Bonuses', dropdownConditions.map((s) => s.title), false),
      numberDropdown('elementalBonuses', 'Elemental Bonuses', dropdownElementalTypes.map((s) => s.title), false),
      numberDropdown('physicalBonuses', 'Physical Damage Bonuses', dropdownPhysicalTypes.map((s) => s.title), false),
    ],
  
    preview: {
      select: {
        title: 'name',
        subtitle: 'traitType',
      },
      prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
        return {
          title: title || 'Unnamed Trait',
          subtitle: subtitle || 'No type set',
        }
      },
    },
  }
  