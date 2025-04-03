import { loreCategories } from "../fundamentals/loreCategories";
import { checkDropdown } from "../schemaVariables/schemaVariables";
import { ValidationRule } from "../types/types";

export default {
  name: "lore",
  title: "Lore entry",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: ValidationRule) => Rule.required().error("Lore entry must have a title"),
    },

    {
      name: "loreID",
      title: "Lore ID",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: ValidationRule) => Rule.required().error("Lore entry must have an ID"),
    },

    {
      name: "loreImage",
      title: "Lore image",
      type: "image",
      options: { hotspot: true },
    },

    checkDropdown("category", "What kind of lore is this?", loreCategories),

    // Core Lore Sections
    { name: "mainTagline", title: "Main Tagline", type: "string" },
    { name: "natureAndEssence", title: "Nature and Essence", type: "text" },
    { name: "symbolismAndAlignment", title: "Symbolism and Alignment", type: "text" },
    { name: "roleInEldoria", title: "Role in Eldoria", type: "text" },

    // Aetheric Connection (Optional, may not be relevant to all lore types)
    { name: "aethericConnectionTagline", title: "Aetheric Connection Tagline", type: "string" },
    { name: "aethericAdaptation", title: "Aetheric Adaptation", type: "text" },
    { name: "aethericAdaptationTagline", title: "Aetheric Adaptation Tagline", type: "string" },

    // Philosophy, Use, Meaning
    { name: "philosophy", title: "Philosophy and Orders", type: "text" },
    { name: "signatureAbilities", title: "Signature Abilities", type: "array", of: [{ type: "string" }] },
    { name: "symbolism", title: "Symbolism and Role in Eldoria", type: "text" },
    { name: "folklore", title: "Folklore", type: "text" },
  ],

  preview: {
    select: {
      title: "title",
      description: "mainTagline",
      media: "loreImage",
    },
    prepare({
      title,
      description,
      media,
    }: {
      title?: string;
      description?: string;
      media?: any;
    }) {
      return {
        title: title || "Unnamed Lore Entry",
        description: description?.slice(0, 100) || "No tagline provided",
        media,
      };
    },
  },
};
