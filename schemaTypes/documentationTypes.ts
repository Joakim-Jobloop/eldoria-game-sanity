import {defineField} from 'sanity'

export const schemaDocumentation = {
  name: 'documentation',
  title: 'Schema Documentation',
  type: 'object',
  fields: [
    {
      name: 'category',
      title: 'Schema Category',
      type: 'string',
      options: {
        list: [
          {title: 'Character Systems', value: 'character'},
          {title: 'World Building', value: 'world'},
          {title: 'Progression', value: 'progression'},
          {title: 'Items & Equipment', value: 'item'},
          {title: 'Lore & Background', value: 'lore'},
          {title: 'System Configuration', value: 'system'},
        ],
      },
    },
    {
      name: 'contentGuidelines',
      title: 'Content Creation Guidelines',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Guideline Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
            {
              name: 'examples',
              title: 'Examples',
              type: 'array',
              of: [{type: 'text'}],
            },
          ],
        },
      ],
    },
    {
      name: 'relationships',
      title: 'Schema Relationships',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'primarySchema',
              title: 'Primary Schema',
              type: 'string',
            },
            {
              name: 'relatedSchema',
              title: 'Related Schema',
              type: 'string',
            },
            {
              name: 'relationshipType',
              title: 'Relationship Type',
              type: 'string',
              options: {
                list: [
                  {title: 'One-to-One', value: 'one_to_one'},
                  {title: 'One-to-Many', value: 'one_to_many'},
                  {title: 'Many-to-Many', value: 'many_to_many'},
                  {title: 'Parent-Child', value: 'parent_child'},
                ],
              },
            },
            {
              name: 'description',
              title: 'Relationship Description',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'workflowSteps',
      title: 'Content Creation Workflow',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'step',
              title: 'Step Number',
              type: 'number',
            },
            {
              name: 'title',
              title: 'Step Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Step Description',
              type: 'text',
            },
            {
              name: 'requiredSchemas',
              title: 'Required Schemas',
              type: 'array',
              of: [{type: 'string'}],
            },
          ],
        },
      ],
    },
    {
      name: 'validationRules',
      title: 'Content Validation Rules',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'rule',
              title: 'Rule Name',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Rule Description',
              type: 'text',
            },
            {
              name: 'schemas',
              title: 'Affected Schemas',
              type: 'array',
              of: [{type: 'string'}],
            },
          ],
        },
      ],
    },
    {
      name: 'bestPractices',
      title: 'Best Practices',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'practice',
              title: 'Best Practice',
              type: 'string',
            },
            {
              name: 'rationale',
              title: 'Rationale',
              type: 'text',
            },
            {
              name: 'examples',
              title: 'Examples',
              type: 'array',
              of: [{type: 'text'}],
            },
          ],
        },
      ],
    },
  ],
}

export const tooltipContent = {
  name: 'tooltip',
  title: 'Field Tooltip',
  type: 'object',
  fields: [
    {
      name: 'field',
      title: 'Field Path',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Tooltip Content',
      type: 'text',
    },
    {
      name: 'examples',
      title: 'Usage Examples',
      type: 'array',
      of: [{type: 'text'}],
    },
  ],
}

export const documentationBlock = {
  name: 'documentation',
  title: 'Documentation',
  type: 'object',
  fields: [
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
      description: 'A brief overview of this content type and its purpose in the game.',
    }),
    defineField({
      name: 'guidelines',
      title: 'Content Guidelines',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Key guidelines to follow when creating or editing this type of content.',
    }),
    defineField({
      name: 'examples',
      title: 'Examples',
      type: 'array',
      of: [{type: 'text'}],
      description: 'Example entries that demonstrate best practices.',
    }),
    defineField({
      name: 'relatedContent',
      title: 'Related Content Types',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Other content types that are commonly associated with this one.',
    }),
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
}

export const getDocumentation = (contentType: string) => {
  const documentationMap: Record<string, any> = {
    gameData: {
      overview:
        'The master reference point for all game content. Use this to organize and manage game elements across different categories.',
      guidelines: [
        'Keep content organized within appropriate categories',
        'Ensure all referenced items exist before adding them',
        'Review item counts to maintain game balance',
        'Check for orphaned or duplicate entries regularly',
      ],
      examples: [
        'Crafting System: Group all crafting ingredients, recipes, and results together',
        'Character Progression: Organize skills, traits, and abilities in logical progression paths',
      ],
    },
    item: {
      overview: 'Represents any collectible or usable object in the game.',
      guidelines: [
        'Set appropriate stack sizes for different item types',
        'Balance crafting requirements and resource costs',
        'Consider item rarity and acquisition methods',
      ],
    },
    character: {
      overview: 'Defines playable characters and their progression systems.',
      guidelines: [
        'Balance starting attributes across different classes',
        'Ensure trait combinations are viable',
        'Consider class synergies and party composition',
      ],
    },
    // Add more content type documentation as needed
  }

  return {
    name: 'documentation',
    title: 'Documentation',
    type: 'object',
    fields: [
      defineField({
        name: 'contentHelp',
        type: 'object',
        fields: [
          {
            name: 'docs',
            type: 'object',
            fields: Object.entries(documentationMap[contentType] || {}).map(([key, value]) => ({
              name: key,
              type: Array.isArray(value) ? 'array' : 'text',
              of: Array.isArray(value) ? [{type: 'string'}] : undefined,
              initialValue: value,
              readOnly: true,
            })),
          },
        ],
      }),
    ],
    options: {
      collapsible: true,
      collapsed: true,
    },
  }
}
