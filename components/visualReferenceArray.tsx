// schemaVariables/visualReferenceArray.ts

import {validateUniqueReferences} from '../types/types'
import {VisualReferenceGridInput} from './visualReferenceGridInput'
import {ArraySchemaType, Reference} from 'sanity'

export interface VisualReferenceInputProps {
  value: Reference[]
  onChange: (patch: any) => void
  schemaType: ArraySchemaType & {
    options?: {
      layout?: string
      list?: Array<{
        _ref: string
        title: string
        subtitle?: string
        media?: string
      }>
    }
  }
}

export default function VisualReferenceArray(props: VisualReferenceInputProps) {
  const {schemaType} = props
  const layout = schemaType.options?.layout || 'grid'

  if (layout === 'grid') {
    return import('./visualReferenceGridInput').then(({VisualReferenceGridInput}) => {
      return VisualReferenceGridInput(props)
    })
  }

  return null
}

export const visualReferenceArray = (
  name: string,
  title: string,
  type: string,
  filter?: {category?: string; subCategory?: string},
  options?: {columns?: number; compact?: boolean},
) => {
  const {category, subCategory} = filter || {}
  const filterClauses: string[] = []
  const filterParams: Record<string, string> = {}

  if (category) {
    filterClauses.push('$category in category')
    filterParams.category = category
  }
  if (subCategory) {
    filterClauses.push('$subCategory in subCategory')
    filterParams.subCategory = subCategory
  }

  const filterOptions =
    filterClauses.length > 0 ? {filter: filterClauses.join(' && '), filterParams} : {}

  return {
    name,
    title,
    type: 'array',
    of: [
      {
        type: 'reference',
        to: [{type}],
        options: filterOptions,
      },
    ],
    components: {
      input: (props: any) => <VisualReferenceGridInput {...props} {...options} />,
    },
    validation: validateUniqueReferences(
      `You already added this ${subCategory ? `${subCategory} ${category}` : category || type}.`,
    ),
  }
}
