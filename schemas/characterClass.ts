import {primaryStats} from '../fundamentals/attributes'
import {characterClasses} from '../fundamentals/classes'
import { validateTotalSum } from '../schemaVariables/common'
import {createRadioDropdown} from '../schemaVariables/schemaVariables'
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
      validation: (Rule: ValidationRule) => Rule.required().error('Description is required'),
    },
    createRadioDropdown('classCategory', 'What Character Class Type is this?', characterClasses),
    // {
    //   name: 'subClass',
    //   title: 'Sub-Class',
    //   type: 'string',
    //   validation: (Rule: ValidationRule) => Rule.required().error('Sub-Class name is required'),
    // },
    {
          name: 'starterAttributes',
          title: 'Starter Attributes',
          type: 'object',
          fieldsets: [
            {
              name: 'starterStats',
              title: 'Starter Stats (should sum up to 15)',
              options: { columns: 3 },
            },
          ],
          validation: validateTotalSum(15, 'Starter attributes'),
          fields: primaryStats.map((stat) => ({
            name: stat.toLowerCase().replace(/\s+/g, '_'),
            title: stat,
            type: 'number',
            fieldset: 'starterStats',
            validation: (Rule: AttributeRules) =>
              Rule.min(1).max(10).error(`${stat} must be between 1 and 10`),
          })),
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    },
  ],
  preview: {
    select: {
      title: 'classCategory',
      // subtitle: 'subClass',
      description: 'description',
      media:'logo',
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
      media?:any,
    }) {
      return {
        title: title || 'Unnamed Class',
        // subtitle: subtitle || 'No Sub-Race',
        description: description ? description.slice(0, 100) : 'No description provided',
        media,
      };
    },
  },
};