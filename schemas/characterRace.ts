type ValidationRule = {
    required(): ValidationRule;
    custom(fn: (value: any) => true | string): ValidationRule;
    error(message: string): ValidationRule;
  };

export default{
    name: "characterRace",
    title:"Character Race",
    type: "document",
    fields:[
        {
            name: "sub-race",
            title: "What sub-race are you",
            type: "string",
            validation: (Rule: ValidationRule) =>
                Rule.required().error("Race name is required"),
        },
        {
            name: "description",
            title: "Description",
            type: "text",
            validation: (Rule: ValidationRule) =>
                Rule.required().error("Description is required"),
        },
        {
            name: "Race",
            title: "What Character Race Type is this?",
            type: "string",
            options: {
                layout:"radio",
                list:[
                    {name:"Eidralis", value:"eidralis"},
                    {name:"Eldrin", value:"eldrin"},
                    {name:"Human", value:"human"},
                    {name:"Skyforger", value:"skyforger"},
                    {name:"Stonekin", value:"stonekin"},
                    {name:"Umbran", value:"umbran"},
                    {name:"Verdwalker", value:"verdwalker"},
                ],
            },
            validation: (Rule: ValidationRule) =>
                Rule.required()
                  .custom((value) => {
                    if (!value) {
                      return "You must select exactly one race";
                    }
                    if (typeof value !== "string") {
                      return "Invalid race selection";
                    }
                    // Validation passes
                    return true; 
                  })
                  .error("You must select exactly one race"),


                  //CHOOSE GENDER AND ALSO ADD IMAGES
        },
    ],
};