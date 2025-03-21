import {primaryStats} from '../fundamentals/attributes'
import {characterClasses} from '../fundamentals/classes'
import {checkDropdown} from '../schemaVariables/schemaVariables'
import {AttributeRules, ValidationRule} from '../types/types'

export default {
  name: 'characterClass',
  title: 'Character Class',
  type: 'document',
  fields: [
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: ValidationRule) => Rule.required().error('Class description is required'),
    },
    checkDropdown('classCategory', 'What Character Class Type is this?', characterClasses),
    {
      name: 'subClass',
      title: 'Sub-Class',
      type: 'string',
      validation: (Rule: ValidationRule) => Rule.required().error('Sub-Class name is required'),
    },
    {
      name: 'starterAttributes',
      title: 'Starter Attributes',
      type: 'object',
      fieldsets: [{name: 'defenseStats', title: 'Defense Stats', options: {columns: 3}}],
      fields: primaryStats.map((stat) => ({
        name: stat.toLowerCase().replace(/\s+/g, '_'), // Fix invalid field names
        title: stat,
        type: 'number',
        fieldset: 'defenseStats',
        validation: (Rule: AttributeRules) =>
          Rule.min(1).max(10).error(`${stat} must be between 1 and 10`),
      })),
    },
  ],
}

{
  /* This is another way i found could be written since chatgpt told me that Sanity has these rules already make itself */
}

// import { primaryStats } from "../fundamentals/attributes";
// import { characterClasses } from "../fundamentals/classes";
// import { createCheckDropdown } from "../schemaVariables/schemaVariables";
// import type { Rule } from "@sanity/types"; // Use Sanity's built-in Rule type

// export default {
//   name: "characterClass",
//   title: "Character Class",
//   type: "document",
//   fields: [
//     {
//       name: "description",
//       title: "Description",
//       type: "text",
//       validation: (Rule: Rule) =>
//         Rule.required().error("Class description is required"),
//     },
//     createCheckDropdown("classCategory", "What Character Class Type is this?", characterClasses),
//     {
//       name: "subClass",
//       title: "Sub-Class",
//       type: "string",
//       validation: (Rule: Rule) =>
//         Rule.required().error("Sub-Class name is required"),
//     },
//     {
//       name: "starterAttributes",
//       title: "Starter Attributes",
//       type: "object",
//       fields: primaryStats.map((attr) => ({
//         name: attr.value,
//         title: attr.title,
//         type: "number",
//         validation: (Rule: Rule) =>
//           Rule.min(1).max(10).error(`${attr.title} must be between 1 and 10`),
//       })),
//     },
//   ],
// };
