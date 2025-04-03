
import {allDamageTypes} from '../fundamentals/attributes'
import {MinMaxRule, ValidationRule} from '../types/types'


/**
 * Adds validation to durability fields to ensure values are within a sensible range.
 */
export const durabilityValidation = (Rule: MinMaxRule) =>
  Rule.min(1).max(999).error('Durability must be between 1 and 999')


/**
 * Creates a number-based field group (either array or object) for selecting numeric values
 * like stat boosts or effects. Useful for dynamically listing stat options.
 */
export const numberDropdown = (
  name: string,
  title: string,
  options: string[],
  isArray: boolean = false,
) => ({
  name,
  title,
  type: isArray ? 'array' : 'object',
  fields: Array.from(new Set(options)).map((option) => ({
    // Deduplicate!
    name: option.replace(/\s+/g, '_'), // Replace spaces with "_"
    title: option, // Keep original title as-is
    type: 'number',
  })),
  validation: (Rule: ValidationRule) => Rule.required().error(`${title} must be selected`),
})

//*THE NEW  checkDropdown rule
type ObjectOption = { title: string; value: string };

export const checkDropdown = (
  name: string,
  title: string,
  options: string[] | ObjectOption[]
) => {
  const isStringArray = typeof options[0] === "string";

  return {
    name,
    title,
    type: "array",
    of: [{ type: "string" }],
    options: {
      layout: "grid",
      list: isStringArray
        ? (options as string[]).map((option) => ({
            title: option,
            value: option.toLowerCase().replace(/\s+/g, "_"),
          }))
        : options,
    },
    validation: (Rule: ValidationRule) =>
      Rule.required().error(`One must be selected`),
  };
};

/**
 * Defines offensive damage stats for a weapon.
 * Each damage type (e.g., Flame, Slashing) gets a `min` and `max` input.
 * Fieldsets group the pairs visually side-by-side in the studio.
 */
export const offensiveStats = () => ({
  name: 'damage',
  title: 'Set the damage for the weapon',
  type: 'object',
  fields: allDamageTypes.flatMap((stat) => {
    const baseName = stat.toLowerCase().replace(/\s+/g, '_')
    return [
      {
        name: `${baseName}_min`,
        title: 'Min',
        type: 'number',
        fieldset: baseName,
      },
      {
        name: `${baseName}_max`,
        title: 'Max',
        type: 'number',
        fieldset: baseName,
      },
    ]
  }),
  fieldsets: allDamageTypes.map((stat) => ({
    name: stat.toLowerCase().replace(/\s+/g, '_'),
    title: stat,
    options: {columns: 2},
  })),
  validation: (Rule: ValidationRule) =>
    Rule.required().error('Weapon must have at least one damage type'),
})


/**
 * Defines defensive stats (flat values) for items like armor or jewelry.
 * Fieldset groups the input fields in a 3-column layout for compact display.
 */
export const defensiveStats = () => ({
  name: 'defenses',
  title: 'Set the defenses for the item',
  type: 'object',
  fieldsets: [{name: 'defenseStats', title: 'Defense Stats', options: {columns: 3}}],
  fields: allDamageTypes.map((stat) => ({
    name: stat.toLowerCase().replace(/\s+/g, '_'), // Fix invalid field names
    title: stat,
    type: 'number',
    fieldset: 'defenseStats',
  })),
  validation: (Rule: ValidationRule) =>
    Rule.required().error('Item must have at least one defense value'),
})


//*THE NEW RULE ADDED FOR the races but can potentially be used for more 
export const createRadioDropdown = (
  name:string,
  title:string,
  options: {title:string; value:string}[]
) => ({
  name,
  title,
  type:"string",
  options: {
    layout:"radio",
    list: options,
  },
  validation: (Rule:any) =>
    Rule.required()
      .custom((value: any) => {
        if (!value) return "You must select one of the options!";
        if (typeof value != "string") return "Invalid selection";
        return true;
      })
      .error("You must select exactly one of the provided options!")
});