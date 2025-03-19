export default {
  name: "chatracter",
  title: "Character",
  type: "document",
  fields: [
    {
      name: "plyayerInventor",
      title: "Player Inventory",
      type: "array",
      fields: [
        {
          name: "currency",
          title: "Currency",
          type: "object",
          fields: [
            { name: "gold", title: "Gold", type: "number" },
            { name: "gems", title: "Gems", type: "number" },
          ],
        },
        {
          name: "items",
          title: "Items",
          type: "array",
          of: [{ type: "reference", to: [{ type: "item" }] }],
        },
      ],
    },
    {
      name : "starterweapon",
      title : "Starter Weapon",
      type: "object",
      of: { type: "reference", to: [{ type: "item" }]} ,
      
        // {name: "brokendagger", title: "Broken Dagger", type:"string" }
      
    }

  ]

  }