export default {
  name: 'item',
  title: 'Item',
  type: 'document',
  fields: [
    {name: 'name', title: 'Name', type: 'string'},
    {name: 'src', title: 'Image', type: 'image', options: {hotspot: true}},
    {
      name: 'itemType',
      title: 'Item Type',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Equippable', value: 'equippable'},
          {title: 'Consumable', value: 'consumable'},
          {title: 'Crafting', value: 'crafting'},
        ],
        layout: 'grid',
      },
    },
    {
      name: 'subType',
      title: 'Sub Type',
      type: 'array', // Make sure it's an array since you want multiple selections
      of: [{type: 'string'}],
      options: {
        layout: 'grid', // Keeps checkbox layout for multiple selections
        list: [
          {title: 'Weapon', value: 'weapon'},
          {title: 'Armour', value: 'armour'},
          {title: 'Jewelry', value: 'jewelry'},
          {title: 'Potion', value: 'potion'},
          {title: 'Food', value: 'food'},
          {title: 'Ingredient', value: 'ingredient'},
          {title: 'Material', value: 'material'},
          {title: 'Spices', value: 'spices'},
        ],
      },
    },

    // ✅ Show only if itemType is "equippable and armour"
    {
      name: 'armour',
      title: 'Armour',
      type: 'object',
      hidden: ({parent}: {parent: {itemType: string; subType: string}}) =>
        !(parent?.itemType == 'equippable' && parent?.subType == 'armour'),
      //TODO: Should be extended to have more options (from damage - to damage ? elemental damage? Should be split into armour and weapon?)
      fields: [
        // {name: "duability", title: "Durability", type: "number"},
        {name: 'slot', title: 'Slot', type: 'string'},
        {name: 'damageType', title: 'Damage Type', type: 'string'},
        // {name: 'damage', title: 'array', of: [{lower: 'number'}, {higher: 'number'}]},
        {name: 'defense', title: 'Defense', type: 'number'},
      ],
    },
    {
      name: 'weapon',
      title: 'Weapon',
      type: 'object',
      hidden: ({parent}: {parent: {itemType: string; subType: string}}) =>
        !(parent?.itemType === 'equippable' && parent?.subType === 'weapon'),
      //TODO: Should be extended to have more options (from damage - to damage ? elemental damage? Should be split into armour and weapon?)
      fields: [
        // {name: "duability", title: "Durability", type: "number"},
        {name: 'slot', title: 'Slot', type: 'string'},
        {name: 'damageType', title: 'Damage Type', type: 'string'},
        // {name: 'damage', title: 'array', of: [{lower: 'number'}, {higher: 'number'}]},
        {name: 'defense', title: 'Defense', type: 'number'},
      ],
    },

    // ✅ Show only if itemType is "equippable and weapon"
    //TODO create this section

    // ✅ Show only if itemType is "consumable"
    {
      name: 'consumable',
      title: 'Consumable',
      type: 'object',
      hidden: ({parent}: {parent: {itemType: string}}) => parent?.itemType !== 'consumable',
      fields: [
        {
          name: 'effectType',
          title: 'Effect Type',
          type: 'string',
          options: {
            list: ['restore, buff'],
          },
        },
        {name: 'affectedStat', title: 'Affected Stat', type: 'string'},
        {name: 'effectAmount', title: 'Effect Amount', type: 'number'},
        {name: 'duration', title: 'Duration', type: 'string'},
      ],
    },

    // ✅ Show only if itemType is "crafting"
    {
      name: 'crafting',
      title: 'Crafting',
      type: 'object',
      hidden: ({parent}: {parent: {itemType: string}}) => parent?.itemType !== 'crafting',
      fields: [
        {
          name: 'materialType',
          title: 'Material Type',
          type: 'string',
          options: {
            list: ['food', 'ingredient', 'material', 'spices'],
          },
        },
        // { name: "requiredLevel", title: "Required Level", type: "number" },
      ],
    },
    {name: 'buyPrice', title: 'Buy Price', type: 'number'},
    {name: 'sellPrice', title: 'Sell Price', type: 'number'},
  ],
}
