/* 
put types here that are for spesific schemas
if it can be used in more then 1 schema it should be moved to common.ts 
*/

export type Preview = {
  title: string
  subtitle: string
  media: string | undefined
}

export interface ValidationRule {
  required: () => {
    error: (message: string) => void
  }
  custom: (validator: (value: any) => true | string) => void
}

export interface MinMaxRule extends ValidationRule {
  min: (value: number) => MinMaxRule
  max: (value: number) => MinMaxRule
}

export interface SumValidationRule extends ValidationRule {
  custom: (validator: (fields: Record<string, number>) => true | string) => void
}

export const validateUniqueReferences = (errorMessage: string) => (Rule: ValidationRule) =>
  Rule.custom((array) => {
    if (!array) return true
    const refs = array.map((item: any) => item._ref)
    const uniqueRefs = new Set(refs)
    return refs.length === uniqueRefs.size || errorMessage
  })
