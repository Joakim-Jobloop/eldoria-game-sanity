interface Selection {
  title: string
  subtitle: string
  media: string | undefined
}

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
        {
          name: 'armourType',
          title: 'Armour Type',
          type: 'array', // Make sure it's an array since you want multiple selections
          of: [{type: 'string'}],
          options: {
            layout: 'grid', // Keeps checkbox layout for multiple selections
            list: [
              {title: 'Heavy', value: 'heavy'},
              {title: 'Medium', value: 'medium'},
              {title: 'light', value: 'light'},
            ],
          },
        },
        {name: 'slot', title: 'Slot', type: 'string'},
        {name: 'duability', title: 'Durability', type: 'number'},
        {
          name: 'defenses',
          title: 'Defenses',
          type: 'object',
          fields: [
            {name: 'flame', title: 'Flame', type: 'number'},
            {name: 'frost', title: 'Frost', type: 'number'},
            {name: 'lightning', title: 'Lightning', type: 'number'},
            {name: 'entropis', title: 'Entropis', type: 'number'},
            {name: 'vitalis', title: 'Vitalis', type: 'number'},
            {name: 'aether', title: 'Aether', type: 'number'},
          ],
        },
      ],
    },
    {
      name: 'weapon',
      title: 'Weapon',
      type: 'object',
      hidden: ({parent}: {parent: {itemType: string; subType: string}}) =>
        !(parent?.itemType == 'equippable' && parent?.subType == 'weapon'),
      //TODO: Should be extended to have more options (from damage - to damage ? elemental damage? Should be split into armour and weapon?)
      fields: [
        {
          name: 'weaponType',
          title: 'Weapon Type',
          type: 'array', // Make sure it's an array since you want multiple selections
          of: [{type: 'string'}],
          options: {
            layout: 'grid', // Keeps checkbox layout for multiple selections
            list: [
              {title: 'Dagger', value: 'dagger'},
              {title: 'Sword', value: 'sword'},
              {title: 'Bow', value: 'bow'},
              {title: 'Staff', value: 'Staff'},
              {title: 'Projectile', value: 'projectile'},
              {title: 'Wand', value: 'wand'},
              {title: 'Mace', value: 'mace'},
              {title: 'Battle axe', value: 'battleaxe'},
            ],
          },
        },
        {name: 'slot', title: 'Slot', type: 'string'},
        {name: 'duability', title: 'Durability', type: 'number'},
        {
          name: 'damage',
          title: 'Damage',
          type: 'object',
          fields: [
            {
              name: 'flame',
              title: 'Flame',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'lower', type: 'number'},
                    {name: 'higher', type: 'number'},
                  ],
                },
              ],
            },
            {
              name: 'frost',
              title: 'Frost',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'lower', type: 'number'},
                    {name: 'higher', type: 'number'},
                  ],
                },
              ],
            },
            {
              name: 'lightning',
              title: 'Lightning',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'lower', type: 'number'},
                    {name: 'higher', type: 'number'},
                  ],
                },
              ],
            },
            {
              name: 'entropis',
              title: 'Entropis',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'lower', type: 'number'},
                    {name: 'higher', type: 'number'},
                  ],
                },
              ],
            },
            {
              name: 'vitalis',
              title: 'Vitalis',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'lower', type: 'number'},
                    {name: 'higher', type: 'number'},
                  ],
                },
              ],
            },
            {
              name: 'aeather',
              title: 'Aether',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'lower', type: 'number'},
                    {name: 'higher', type: 'number'},
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    {
      name: 'potion',
      title: 'Potion',
      type: 'object',
      hidden: ({parent}: {parent: {itemType: string; subType: string}}) =>
        !(parent?.itemType == 'consumable' && parent?.subType == 'potion'),
      fields: [
        {
          name: 'effectType',
          title: 'Effect Type',
          type: 'string',
          options: {
            list: ['restore, buff'],
          },
        },
        // {
        //   name: 'effectType',
        //   title: 'Effect Type',
        //   type: 'array', // Make sure it's an array since you want multiple selections
        //   of: [{type: 'string'}],
        //   options: {
        //     layout: 'grid', // Keeps checkbox layout for multiple selections
        //     list: [
        //       {title: 'Buff', value: 'buff'},
        //       {title: '', value: 'sword'},
        //       {title: 'Bow', value: 'bow'},
        //       {title: 'Staff', value: 'Staff'},
        //       {title: 'Projectile', value: 'projectile'},
        //       {title: 'Wand', value: 'wand'},
        //       {title: 'Mace', value: 'mace'},
        //       {title: 'Battle axe', value: 'battleaxe'},
        //     ],
        //   },
        // },
        {name: 'affectedStat', title: 'Affected Stat', type: 'string'},
        {name: 'effectAmount', title: 'Effect Amount', type: 'number'},
        {name: 'duration', title: 'Duration', type: 'string'},
      ],
    },

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
  preview: {
    select: {
      title: 'name',
      subtitle: 'itemType',
      media: 'src',
    },
    prepare(selection: Selection) {
      const {title, subtitle, media} = selection
      return {
        title: title || 'Unnamed Item',
        subtitle: `Type: ${subtitle || 'Unknown'}`,
        media: media || undefined,
      }
    },
  },
}
