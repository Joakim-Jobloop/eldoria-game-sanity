// schemas/weapon.ts
import { characterClasses } from "../fundamentals/classes";
import { Rule } from "sanity";

export default {
  name: "weapon",
  title: "Weapon",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Weapon Name",
      type: "string",
      validation: (Rule:Rule) => Rule.required(),
    },
    {
      name: "class",
      title: "Restricted to Class",
      type: "string",
      options: {
        list: characterClasses.map(c => ({
          title: c,
          value: c.toLowerCase(),
        })),
      },
      validation: (Rule:Rule) => Rule.required().error("Class restriction required"),
    },
    {
      name: "isStarter",
      title: "Starter Weapon?",
      type: "boolean",
    },
    {
      name: "damage",
      title: "Damage",
      type: "number",
    },
    {
      name: "type",
      title: "Weapon Type",
      type: "string",
      options: {
        list: [
          { title: "Melee", value: "melee" },
          { title: "Ranged", value: "ranged" },
          { title: "Magic", value: "magic" },
        ],
      },
    },
  ],
};
