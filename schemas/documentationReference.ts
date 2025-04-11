// ================================
// schemas/documentationReference.ts
// ================================
export default {
  name: 'documentationReference',
  title: 'Documentation Entry',
  type: 'document',
  fields: [
    {
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          {title: 'Item', value: 'item'},
          {title: 'Skill', value: 'skill'},
          {title: 'Character', value: 'character'},
          {title: 'Game Data', value: 'gameData'},
        ],
      },
    },
    {
      name: 'overview',
      title: 'Overview',
      type: 'text',
    },
    {
      name: 'guidelines',
      title: 'Content Guidelines',
      type: 'array',
      of: [{type: 'text'}],
    },
    {
      name: 'examples',
      title: 'Examples',
      type: 'array',
      of: [{type: 'text'}],
    },
    {
      name: 'relatedContent',
      title: 'Related Content Types',
      type: 'array',
      of: [{type: 'string'}],
    },
  ],
}
