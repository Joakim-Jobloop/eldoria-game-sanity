import { ValidationRule } from "../types/types";

export const requiredField = (message: string) => (Rule: ValidationRule) =>
    Rule.required().error(message);


export const isHidden = (category: string, subCategory: string) => ({
    hidden: ({ parent }: { parent?: { category?: string[]; subCategory?: string[] } }) => {
      if (!parent || !parent.category || !parent.subCategory) return true; // Ensure parent exists
  
      const hasCategory = parent.category.map(type => type.toLowerCase()).includes(category.toLowerCase());
      const hasSubCategory = parent.subCategory.map(sub => sub.toLowerCase()).includes(subCategory.toLowerCase());
  
      return !(hasCategory && hasSubCategory);
    }
  });