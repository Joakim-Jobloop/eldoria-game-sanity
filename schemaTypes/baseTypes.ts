import {ValidationRule} from '../types/types'

export const baseDocument = {
  name: {
    name: 'name',
    title: 'Name',
    type: 'string',
    validation: (Rule: ValidationRule) => Rule.required(),
  },
  slug: {
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    options: {source: 'name'},
    validation: (Rule: ValidationRule) => Rule.required(),
  },
  description: {
    name: 'description',
    title: 'Description',
    type: 'text',
  },
}

export const loreable = {
  loreEntry: {
    name: 'loreEntry',
    title: 'Linked Lore Entry',
    type: 'reference',
    to: [{type: 'lore'}],
  },
  mainTagline: {
    name: 'mainTagline',
    title: 'Main Tagline',
    type: 'string',
  },
}

export const visualAsset = {
  image: {
    name: 'image',
    title: 'Image',
    type: 'image',
    options: {hotspot: true},
  },
}

export const aethericEntity = {
  aetherAlignment: {
    name: 'aetherAlignment',
    title: 'Aetheric Alignment',
    type: 'string',
    options: {
      layout: 'radio',
      list: [
        {title: 'Vitalis', value: 'vitalis'},
        {title: 'Entropis', value: 'entropis'},
        {title: 'Balanced', value: 'balanced'},
        {title: 'Aether', value: 'aether'},
      ],
    },
  },
}
