import { primaryStats } from "../fundamentals/attributes";
import { characterRaces, genderList } from "../fundamentals/races";
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

    {
      name: "subRace",
      title: "Select Character Sub-Race",
      type: "string",
      options: {
        list: characterRaces.map(race => ({
          title: race.title,
          value: race.value,
        })),
      },
      // subRace is optional — no validation!
    },

    {
      name: "genderList",
      title: "Gender",
      type: "string",
      options: {
        layout: "radio",
        list: genderList,
      },
      validation: (Rule: ValidationRule) =>
        Rule.required().error('Pick your Gender!'),
    },

    {
      name: 'starterAttributes',
      title: 'Starter Attributes',
      type: 'object',
      fieldsets: [
        {
          name: 'defenseStats',
          title: 'Defense Stats',
          options: { columns: 3 },
        },
      ],
      fields: primaryStats.map((stat) => ({
        name: stat.toLowerCase().replace(/\s+/g, '_'),
        title: stat,
        type: 'number',
        fieldset: 'defenseStats',
        validation: (Rule: AttributeRules) =>
          Rule.min(1).max(10).error(`${stat} must be between 1 and 10`),
      })),
    },

    {
      name: "portrait",
      title: "Race Portrait",
      type: "image",
      options: { hotspot: true },
    },
  ],

  preview: {
    select: {
      title: 'raceCategory',
      subtitle: 'subRace',
      description: 'description',
      media: 'portrait', // show image in document list
    },
    prepare({
      title,
      subtitle,
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
        subtitle: subtitle || 'No Sub-Race',
        description: description ? description.slice(0, 100) : 'No description provided',
        media,
      };
    },
  },
};
