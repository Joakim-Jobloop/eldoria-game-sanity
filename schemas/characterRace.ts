import { characterRaces, genderList } from "../fundamentals/races";
import { checkDropdown, createRadioDropdown } from "../schemaVariables/schemaVariables";
import { ValidationRule } from "../types/types";

export default {
  name: 'characterRace',
  title: 'Character Race',
  type: 'document',
  fields: [
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: ValidationRule) =>
        Rule.required().error('Description is required'),
    },
    checkDropdown('raceCategory', 'What Character Race Type is this?', characterRaces),
    {
      name: 'subRace', 
      title: 'What sub-race are you?',
      type: 'string',
      validation: (Rule: ValidationRule) =>
        Rule.required().error('Sub-race name is required'),
    },
    createRadioDropdown("race", "Select Character Race", characterRaces),
    //* This is where the magic happens :)
    {
      name: "genderList",
      title: "Gender",
      type: "string",
      options:{
        layout:"radio",
        list:genderList
      },
      validation: (Rule: ValidationRule) =>
        Rule.required().error('Pick your Gender!'),
    }, 
    //*     Image fields here
    //* This just makes the connection so that
    //*we can upload those images but they wont actually show up 
    //* That is the frontend part
    {
      name:"raceGenderVisuals",
      title:"Race & Gender Visuals",
      type:"array",
      of:[
        {
          type:"object",
          title:"Visual Set",
          fields:[
            {
              name:"race",
              title:"Race",
              type:"string",
              options: {list:characterRaces},
              validation:(Rule:ValidationRule) =>
                Rule.required().error("Race is required"),
            },
            {
              name:"gender",
              title:"Gender",
              type:"string",
              options:{list: genderList, layout:"radio"},
              validation:(Rule:ValidationRule) => 
                Rule.required().error("Gender is required"),
            },
            {
              name:"images",
              title:"Images",
              type:"array",
              of:[{type:"image"}],
              options:{layout:"grid"},
              validation:(Rule:ValidationRule) =>
                Rule.required().error("At least one image is required"),
            },
          ],
        },
      ],
    },
  ],
};
