import {validateRange} from '../utils/validation'

export const contentVersion = {
  name: 'contentVersion',
  title: 'Content Version',
  type: 'object',
  fields: [
    {
      name: 'version',
      title: 'Version Number',
      type: 'string',
      validation: (Rule: any) =>
        Rule.required()
          .regex(/^\d+\.\d+\.\d+$/)
          .error('Must be semantic version (e.g. 1.0.0)'),
    },
    {
      name: 'status',
      title: 'Content Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'In Review', value: 'review'},
          {title: 'Approved', value: 'approved'},
          {title: 'Published', value: 'published'},
        ],
      },
    },
    {
      name: 'releaseDate',
      title: 'Release Date',
      type: 'datetime',
    },
  ],
}

export const contentMetadata = {
  name: 'metadata',
  title: 'Content Metadata',
  type: 'object',
  fields: [
    {
      name: 'gameVersion',
      title: 'Game Version',
      type: 'reference',
      to: [{type: 'contentVersion'}],
    },
    {
      name: 'author',
      title: 'Content Author',
      type: 'string',
    },
    {
      name: 'lastModified',
      title: 'Last Modified',
      type: 'datetime',
    },
    {
      name: 'reviewStatus',
      title: 'Review Status',
      type: 'string',
      options: {
        list: [
          {title: 'Needs Review', value: 'needs_review'},
          {title: 'In Review', value: 'in_review'},
          {title: 'Changes Requested', value: 'changes_requested'},
          {title: 'Approved', value: 'approved'},
        ],
      },
    },
    {
      name: 'reviewComments',
      title: 'Review Comments',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'reviewer',
              title: 'Reviewer',
              type: 'string',
            },
            {
              name: 'comment',
              title: 'Comment',
              type: 'text',
            },
            {
              name: 'timestamp',
              title: 'Timestamp',
              type: 'datetime',
            },
          ],
        },
      ],
    },
    {
      name: 'tags',
      title: 'Content Tags',
      type: 'array',
      of: [{type: 'string'}],
    },
  ],
}

export const contentWorkflow = {
  name: 'workflow',
  title: 'Content Workflow',
  type: 'object',
  fields: [
    {
      name: 'priority',
      title: 'Priority Level',
      type: 'number',
      validation: validateRange(1, 5, 'Priority level'),
    },
    {
      name: 'assignee',
      title: 'Assigned To',
      type: 'string',
    },
    {
      name: 'dueDate',
      title: 'Due Date',
      type: 'datetime',
    },
    {
      name: 'dependencies',
      title: 'Content Dependencies',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'quest', title: 'Quest Dependency'},
            {type: 'item', title: 'Item Dependency'},
            {type: 'npc', title: 'NPC Dependency'},
            {type: 'location', title: 'Location Dependency'},
          ],
        },
      ],
    },
    {
      name: 'blockers',
      title: 'Blockers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'description',
              title: 'Blocker Description',
              type: 'text',
            },
            {
              name: 'status',
              title: 'Status',
              type: 'string',
              options: {
                list: [
                  {title: 'Open', value: 'open'},
                  {title: 'In Progress', value: 'in_progress'},
                  {title: 'Resolved', value: 'resolved'},
                ],
              },
            },
          ],
        },
      ],
    },
  ],
}
