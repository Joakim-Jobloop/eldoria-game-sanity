//! hidden needs to use contains instead so you can choose more than 1 catagory.

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
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'grid',
        list: [
          {title: 'Weapon', value: 'weapon'},
          {title: 'Armour', value: 'armour'},
          {title: 'Jewelry', value: 'jewelry'},
          {title: 'Potion', value: 'potion'},
          {title: 'Food', value: 'food'},
          {title: 'Ingredient', value: 'ingredient'},
          //TODO implement the last two ones:
          {title: 'Material', value: 'material'},
          {title: 'Spice', value: 'spice'},
        ],
      },
    },

    // ✅ Show only if itemType is "equippable and armour"
    {
      name: 'armour',
      title: 'Armour',
      type: 'object',
      hidden: ({parent}: {parent: {itemType: string[]; subType: string[]}}) =>
        !(
          parent?.itemType?.includes('equippable') &&
          parent?.subType?.some((sub) => sub === 'armour')
        ),
      fields: [
        {
          name: 'armourType',
          title: 'Armour Type',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'grid',
            list: [
              {title: 'Heavy', value: 'heavy'},
              {title: 'Medium', value: 'medium'},
              {title: 'Light', value: 'light'},
            ],
          },
        },
        {name: 'slot', title: 'Slot', type: 'string'},
        {name: 'durability', title: 'Durability', type: 'number'},
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
      hidden: ({parent}: {parent: {itemType: string[]; subType: string[]}}) =>
        !(
          parent?.itemType?.includes('equippable') &&
          parent?.subType?.some((sub) => sub === 'weapon')
        ),
      fields: [
        {
          name: 'weaponType',
          title: 'Weapon Type',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'grid',
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
        {name: 'durability', title: 'Durability', type: 'number'},
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
                    {name: 'minDamage', type: 'number'},
                    {name: 'maxDamage', type: 'number'},
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
                    {name: 'minDamage', type: 'number'},
                    {name: 'maxDamage', type: 'number'},
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
                    {name: 'minDamage', type: 'number'},
                    {name: 'maxDamage', type: 'number'},
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
                    {name: 'minDamage', type: 'number'},
                    {name: 'maxDamage', type: 'number'},
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
                    {name: 'minDamage', type: 'number'},
                    {name: 'maxDamage', type: 'number'},
                  ],
                },
              ],
            },
            {
              name: 'aether',
              title: 'Aether',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'minDamage', type: 'number'},
                    {name: 'maxDamage', type: 'number'},
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'jewelry',
      title: 'Jewelry',
      type: 'object',
      hidden: ({parent}: {parent: {itemType: string[]; subType: string[]}}) =>
        !(
          parent?.itemType?.includes('equippable') &&
          parent?.subType?.some((sub) => sub === 'jewelry')
        ),
      fields: [
        {
          name: 'jewelryType',
          title: 'Jewelry Type',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'grid',
            list: [
              {title: 'Amulet', value: 'amulet'},
              {title: 'Ring', value: 'ring'},
              {title: 'Talisman', value: 'talisman'},
            ],
          },
        },
        {name: 'slot', title: 'Slot', type: 'string'},
        {name: 'durability', title: 'Durability', type: 'number'},
        {
          name: 'defenses',
          title: 'Defenses',
          type: 'object',
          fields: [
            {name: 'health', title: 'Health', type: 'number'},
            {name: 'mana', title: 'Mana', type: 'number'},
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
      name: 'potion',
      title: 'Potion',
      type: 'object',
      hidden: ({parent}: {parent: {itemType: string[]; subType: string[]}}) =>
        !(
          parent?.itemType?.includes('consumable') &&
          parent?.subType?.some((sub) => sub === 'potion')
        ),
      fields: [
        {
          name: 'effectType',
          title: 'Effect Type',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'grid',
            list: [
              {title: 'Buff', value: 'buff'},
              {title: 'Debuff', value: 'debuff'},
              {title: 'Restore', value: 'restore'},
              {title: 'Drain', value: 'drain'},
            ],
          },
        },
        {
          name: 'affectedStat',
          title: 'Affected Stat',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'grid',
            list: [
              {title: 'Strength', value: 'strength'},
              {title: 'Agility', value: 'agility'},
              {title: 'Intelligence', value: 'intelligence'},
              {title: 'Wisdom', value: 'wisdow'},
              {title: 'Luck', value: 'luck'},
            ],
          },
        },
        {name: 'effectAmount', title: 'Effect Amount', type: 'number'},
        {name: 'duration', title: 'Duration', type: 'string'},
      ],
    },
    {
      name: 'food',
      title: 'Food',
      type: 'object',
      hidden: ({parent}: {parent: {itemType: string[]; subType: string[]}}) =>
        !(
          parent?.itemType?.includes('consumable') && parent?.subType?.some((sub) => sub === 'food')
        ),
      fields: [
        {
          name: 'effectType',
          title: 'Effect Type',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'grid',
            list: [
              {title: 'Buff', value: 'buff'},
              {title: 'Debuff', value: 'debuff'},
              {title: 'Restore', value: 'restore'},
              {title: 'Drain', value: 'drain'},
            ],
          },
        },
        {
          name: 'affectedStat',
          title: 'Affected Stat',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'grid',
            list: [
              {title: 'Strength', value: 'strength'},
              {title: 'Agility', value: 'agility'},
              {title: 'Intelligence', value: 'intelligence'},
              {title: 'Wisdom', value: 'wisdow'},
              {title: 'Luck', value: 'luck'},
            ],
          },
        },
        {name: 'effectAmount', title: 'Effect Amount', type: 'number'},
        {name: 'duration', title: 'Duration', type: 'string'},
      ],
    },

    {
      name: 'recipe',
      title: 'Recipe',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'ingredient',
              title: 'Ingredient',
              type: 'reference',
              to: [{type: 'item'}],
            },
            {name: 'amount', title: 'Amount', type: 'number'},
          ],
        },
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
