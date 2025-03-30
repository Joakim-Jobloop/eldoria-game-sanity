/* 
put types here that are for spesific schemas
if it can be used in more then 1 schema it should be moved to common.ts 
*/

export type Preview = {
  title: string
  subtitle: string
  media: string | undefined
}

export type MinMaxRule = {
  min(minValue: number): MinMaxRule
  max(maxValue: number): MinMaxRule
  error(errorMessage: string): MinMaxRule
}

export type AttributeRules = {
  min(minValue: number): MinMaxRule
  error(errorMessage: string): MinMaxRule
}

export type ValidationRule = {
  required(): ValidationRule
  error(message: string): ValidationRule
}


export type SumValidationRule = {
  custom(
    fn: (value: Record<string, number>) => true | string
  ): ValidationRule
}