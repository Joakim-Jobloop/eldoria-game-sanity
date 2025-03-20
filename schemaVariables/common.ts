import { ValidationRule } from "../types/types";

export const requiredField = (message: string) => (Rule: ValidationRule) =>
    Rule.required().error(message);