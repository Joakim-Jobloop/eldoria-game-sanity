import { combatStats } from '../fundamentals/combat';
import {MinMaxRule, ValidationRule} from '../types/types'

export const durabilityValidation = (Rule: MinMaxRule) =>
  Rule.min(1).max(999).error('Durability must be between 1 and 999')



export const createNumberDropdown = (
    name: string,
    title: string,
    options: { title: string; value?: string; type?: string }[],
    isArray: boolean = true
  ) => ({
    name,
    title,
    type: isArray ? "array" : "object",
    of: [{ type: options[0]?.type || "string" }],
    options: {
      layout: "grid",
      list: options.map(({ title, value }) => ({ title, value: value || title.toLowerCase() })),
    },
    validation: (Rule: ValidationRule) => Rule.required().error(`${title} must be selected`),
  });

// makes fields in sanity studio much shorter because parts of the schema will be hidden
export const isHidden = (itemTypeValue: string, subTypeValue: string) => ({
  hidden: ({parent}: {parent: {itemType: string[]; subType: string[]}}) =>
    !(
      parent?.itemType?.includes(itemTypeValue) &&
      parent?.subType?.some((sub) => sub === subTypeValue)
    ),
})


export const createCheckDropdown = (name: string, title: string, options: {title: string, value: string}[]) => ({
    name,
    title,
    type: "array",
    of: [{ type: "string" }],
    options: {
      layout: "grid",
      list: options
    },
    validation: (Rule: ValidationRule) => Rule.required().error(`One must be selected`),
  });


  export const createDamageStatField  = () => ({
    name: "damage",
  title: "Set the damage for the weapon",
  type: "object",
  fields: combatStats.map((stat) => ({
    name: stat.title.toLowerCase(),
    title: stat.title,
    type: "array",
    of: [
      {
        type: "object",
        fields: [
          { name: "minDamage", title: "Min Damage", type: stat.type },
          { name: "maxDamage", title: "Max Damage", type: stat.type },
        ],
      },
    ],
  })),
  validation: (Rule: ValidationRule) => Rule.required().error("Weapon must have at least one damage type"),
});


export const createDefensiveStatsField = () => ({
  name: "defenses",
  title: "Set the defenses for the item",
  type: "object",
  fields: combatStats.map((stat) => ({
    name: stat.title.toLowerCase(),
    title: stat.title,
    type: "number",
  })),
  validation: (Rule: ValidationRule) =>
    Rule.required().error("Item must have at least one defense value"),
});