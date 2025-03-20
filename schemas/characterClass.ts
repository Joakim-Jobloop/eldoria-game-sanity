import { characterClasses } from "../fundamentals/classes";
import { checkDropdown } from "../schemaVariables/schemaVariables";

type ValidationRule = {
    required(): ValidationRule;
    error(message: string): ValidationRule;
  };
  
  type AttributeRules = {
    min(value: number): AttributeRules;
    max(value: number): AttributeRules;
    error(message: string): AttributeRules;
  };

  export default {
    name: "characterClass",
    title: "Character Class",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Name",
        type: "string",
        validation: (Rule: ValidationRule) =>
          Rule.required().error("Class name is required"),
      },
      {
        name: "description",
        title: "Description",
        type: "text",
        validation: (Rule: ValidationRule) =>
          Rule.required().error("Class description is required"),
      },
      checkDropdown("classCategory", "What Character Class Type is this?", characterClasses),
      {
        name: "classType",
        title: "What Character Class Type is this?",
        type: "array",
        of: [{ type: "string" }],
        options: {
          layout: "grid",
          list: [
            //(Aetherblade)
            { title: "Warrior", value: "warrior" },
            //(Veilweaver)
            { title: "Mage", value: "mage" },
            //(Riftshroud)
            { title: "Rogue", value: "rogue" },
            // (Aethershield)
            { title: "Tank", value: "tank" },
            //(Riftwalker)
            { title: "Support", value: "support" },
            //(Primordial Charger)
            { title: "Barbarian", value: "barbarian" },
            // (Riftforger)
            { title: "Engineer", value: "engineer" },
            // (Veilcaller)
            { title: "Summoner", value: "summoner" },
          ],
        },
        validation: (Rule: ValidationRule) =>
          Rule.required()
            .error("You must select at least one class type"),
      },
      {
        name:"starterattributes",
        title:"Starter Attributes",
        type:"object",
        fields:[
            {name:"strength", title:"Strength", type:"number",
                validation: (Rule: AttributeRules) =>
                Rule.min(1).max(10).error("Strength must be between 1 and 10") },

            {name:"dexterity", title:"Dexterity", type:"number", 
                validation: (Rule: AttributeRules) =>
                Rule.min(1).max(10).error("Strength must be between 1 and 10")},

            {name:"constitution", title:"Constitution", type:"number", 
                validation: (Rule: AttributeRules) =>
                Rule.min(1).max(10).error("Strength must be between 1 and 10")},

            {name:"intelligence", title:"Intelligence", type:"number", 
                validation: (Rule: AttributeRules) =>
                Rule.min(1).max(10).error("Strength must be between 1 and 10")},

            {name:"wisdom", title:"Wisdom", type:"number", 
                validation: (Rule: AttributeRules) =>
                Rule.min(1).max(10).error("Strength must be between 1 and 10")},

            {name :"charisma", title:"Charisma", type:"number", 
                validation: (Rule: AttributeRules) =>
                Rule.min(1).max(10).error("Strength must be between 1 and 10")},
        ],
        
      },
    ],
  };
  