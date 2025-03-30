import { primaryStats } from "../fundamentals/attributes";
import { characterRaces } from "../fundamentals/races";
import { validateTotalSum } from "../schemaVariables/common";
import { createRadioDropdown } from "../schemaVariables/schemaVariables";
import { AttributeRules, ValidationRule } from "../types/types";

export default {
  name: 'characterRace',
  title: 'Character Race',
  type: 'document',
  fields: [
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: ValidationRule) =>
        Rule.required().error('Description is required'),
    },
    createRadioDropdown('raceCategory', 'What Character Race Type is this?', characterRaces),

    // {
    //   name: "subRace",
    //   title: "Select Character Sub-Race",
    //   type: "string",
    //   options: {
    //     list: characterRaces.map(race => ({
    //       title: race.title,
    //       value: race.value,
    //     })),
    //   },
    //   // subRace is optional
    // },

    {
      name: 'starterAttributes',
      title: 'Starter Attributes',
      type: 'object',
      fieldsets: [
        {
          name: 'starterStats',
          title: 'Starter Stats (should sum up to 30)',
          options: { columns: 3 },
        },
      ],
      validation: validateTotalSum(30, 'Starter attributes'),
      fields: primaryStats.map((stat) => ({
        name: stat.toLowerCase().replace(/\s+/g, '_'),
        title: stat,
        type: 'number',
        fieldset: 'starterStats',
        validation: (Rule: AttributeRules) =>
          Rule.min(1).max(10).error(`${stat} must be between 1 and 10`),
      })),
    },

    // Gender-specific portraits
    {
      name: "portraitMale",
      title: "Male Portrait",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "portraitFemale",
      title: "Female Portrait",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "portraitOther",
      title: "Other Portrait",
      type: "image",
      options: { hotspot: true },
    },
  ],

  preview: {
    select: {
      title: 'raceCategory',
      // subtitle: 'subRace',
      description: 'description',
      media: 'portraitMale', // fallback default thumbnail
    },
    prepare({
      title,
      // subtitle,
      description,
      media,
    }: {
      title?: string;
      subtitle?: string;
      description?: string;
      media?: any;
    }) {
      return {
        title: title || 'Unnamed Race',
        // subtitle: subtitle || 'No Sub-Race',
        description: description ? description.slice(0, 100) : 'No description provided',
        media,
      };
    },
  },
};
