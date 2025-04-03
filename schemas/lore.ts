import { checkDropdown } from "../schemaVariables/schemaVariables";
import { loreCategories } from "../fundamentals/loreCategories";
import { needsCategory as needsLoreCategory } from "../schemaVariables/common";
import { ValidationRule } from "../types/types";

export default {
  name: "lore",
  title: "Lore Entry",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: ValidationRule) =>
        Rule.required().error("Every lore entry needs a title."),
    },
    {
      name: "loreImage",
      title: "Lore Image",
      type: "image",
      options: { hotspot: true },
    },
    {
        name: "loreIcon",
        title: "Lore Icon",
        type: "image",
        options: { hotspot: true },
      },
  

    // CATEGORY SELECTION
    checkDropdown("category", "Lore Category", loreCategories),

    // === CONDITIONAL FIELDS BASED ON CATEGORY ===

    {
      name: "deityAspect",
      title: "Divine Aspect",
      type: "string",
      ...needsLoreCategory("deity"),
    },
    {
      name: "phenomenonEffect",
      title: "Phenomenon Effect",
      type: "text",
      ...needsLoreCategory("aetheric_phenomenon"),
    },
    {
      name: "locationDetails",
      title: "Region or Plane",
      type: "string",
      ...needsLoreCategory("location"),
    },
    {
      name: "artifactPower",
      title: "Artifact Power or Use",
      type: "text",
      ...needsLoreCategory("artifact"),
    },
    {
      name: "philosophicalDoctrine",
      title: "Core Belief or Teaching",
      type: "text",
      ...needsLoreCategory("philosophy_or_teaching"),
    },

    // === SHARED FIELDS (USED IN ALL LORE TYPES) ===
    { name: "mainTagline", title: "Main Tagline", type: "string" },
    { name: "natureAndEssence", title: "Nature and Essence", type: "text" },
    { name: "symbolismAndAlignment", title: "Symbolism and Alignment", type: "text" },
    { name: "roleInEldoria", title: "Role in Eldoria", type: "text" },
    { name: "aethericConnectionTagline", title: "Aetheric Connection Tagline", type: "string" },
    { name: "philosophy", title: "Philosophy and Orders", type: "text" },
    { name: "symbolism", title: "Symbolism and Role in Eldoria", type: "text" },
    { name: "folklore", title: "Folklore", type: "text" },
    {
        name: "relatedEntities",
        title: "Related Lore (Links or References)",
        type: "array",
        of: [{ type: "reference", to: [{ type: "lore" }] }],
      },
      
      {
        name: "quotes",
        title: "Notable Quotes",
        type: "array",
        of: [{ type: "string" }],
      },

    {
        name: "dateOrEra",
        title: "Date or Era (if applicable)",
        type: "string",
        ...needsLoreCategory("historical_event"),
      }
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
        title: title || "Unnamed Lore",
        description: description?.slice(0, 100) || "No tagline provided",
        media,
      };
    },
  },
};
