type Preview = {
  title: string
  subtitle: string
  media: string | undefined
}

type MinMaxRule = {
  min(minValue: number): MinMaxRule
  max(maxValue: number): MinMaxRule
  error(errorMessage: string): MinMaxRule
}

type AttributeRules = {
  min(minValue: number): MinMaxRule
  error(errorMessage: string): MinMaxRule
}

type ValidationRule = {
  required(): ValidationRule
  error(message: string): ValidationRule
}

// function attributeRules() {
//   return {
//     validation: (Rule: AttributeRules) =>
//       Rule.min(1).max(10).error("Strength must be between 1 and 10")
//   }
// }

export default {
  name: 'item',
  title: 'Create an Item!',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name the item',
      type: 'string',
      validation: (Rule: ValidationRule) => Rule.required().error('Item must have a name'),
    },
    {
      // hidden: true,
      name: 'itemID',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: ValidationRule) => Rule.required().error('Item must have an id'),
    },
    {
      name: 'src',
      title: 'What is the source of the image for this item?',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule: ValidationRule) => Rule.required().error('Item must have a picture'),
    },
    {
      name: 'itemType',
      title: 'What type of item is it?',
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
      validation: (Rule: ValidationRule) => Rule.required().error('Item must have a type'),
    },
    {
      name: 'subType',
      title: 'What is the subtype of the item you are creating?',
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
          {title: 'Material', value: 'material'},
          {title: 'Spice', value: 'spice'},
        ],
      },
      validation: (Rule: ValidationRule) => Rule.required().error('Item must have a subtype'),
    },

    // ✅ Show only if itemType is "equippable and armour"
    {
      name: 'armour',
      title: 'Some armour ey? How does it defend the player?',
      type: 'object',
      hidden: ({parent}: {parent: {itemType: string[]; subType: string[]}}) =>
        !(
          parent?.itemType?.includes('equippable') &&
          parent?.subType?.some((sub) => sub === 'armour')
        ),
      fields: [
        {
          name: 'armourType',
          title: 'What armour-class is it?',
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
          validation: (Rule: ValidationRule) =>
            Rule.required().error('Armour must have a armour-class'),
        },
        {
          name: 'slot',
          title: 'Where on the body do you want to be able to equip it?',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'grid',
            list: [
              {title: 'Head', value: 'head'},
              {title: 'Chest', value: 'chest'},
              {title: 'Hands', value: 'hands'},
              {title: 'Legs', value: 'legs'},
              {title: 'Feet', value: 'feet'},
              {title: 'Pauldron', value: 'pauldron'},
            ],
          },
          validation: (Rule: ValidationRule) =>
            Rule.required().error('Armour must have a equipment slot'),
        },
        {
          name: 'durability',
          title: 'How durable should it be?',
          type: 'number',
          validation: (Rule: MinMaxRule) =>
            Rule.min(1).max(999).error('Durability must be between 1 and 100'),
        },
        {
          name: 'defenses',
          title: 'Define the armour defenses',
          type: 'object',
          fields: [
            {name: 'flame', title: 'Flame', type: 'number'},
            {name: 'frost', title: 'Frost', type: 'number'},
            {name: 'lightning', title: 'Lightning', type: 'number'},
            {name: 'entropis', title: 'Entropis', type: 'number'},
            {name: 'vitalis', title: 'Vitalis', type: 'number'},
            {name: 'aether', title: 'Aether', type: 'number'},
          ],
          validation: (Rule: ValidationRule) =>
            Rule.required().error('Armour must have a at least one defense'),
        },
      ],
    },
    {
      name: 'weapon',
      title: 'Nice, a weapon! Define the stats for it below',
      type: 'object',
      hidden: ({parent}: {parent: {itemType: string[]; subType: string[]}}) =>
        !(
          parent?.itemType?.includes('equippable') &&
          parent?.subType?.some((sub) => sub === 'weapon')
        ),
      fields: [
        {
          name: 'weaponType',
          title: 'What type of weapon is it?',
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
            validation: (Rule: ValidationRule) => Rule.required().error('Weapon must have a type'),
          },
        },
        {
          name: 'slot',
          title: 'In which hand do you want to be able to equip it?',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'grid',
            list: [
              {title: 'Main Hand', value: 'mainHand'},
              {title: 'Off Hand', value: 'offHand'},
              {title: 'Two Handed', value: 'twoHanded'},
            ],
            validation: (Rule: ValidationRule) =>
              Rule.required().error('Weapon must have a subtype'),
          },
        },
        {
          name: 'durability',
          title: 'How durable should it be?',
          type: 'number',
          validation: (Rule: MinMaxRule) =>
            Rule.min(1).max(999).error('Durability must be between 1 and 100'),
        },
        {
          name: 'damage',
          title: 'Set the damage for the weapon',
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
          validation: (Rule: ValidationRule) =>
            Rule.required().error('Weapon must have atleast one damage type'),
        },
      ],
    },
    {
      name: 'jewelry',
      title: 'Fancy Jewelry! What are the characteristics for this item?',
      type: 'object',
      hidden: ({parent}: {parent: {itemType: string[]; subType: string[]}}) =>
        !(
          parent?.itemType?.includes('equippable') &&
          parent?.subType?.some((sub) => sub === 'jewelry')
        ),
      fields: [
        {
          name: 'jewelryType',
          title: 'What type of jewelry is this?',
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
          validation: (Rule: ValidationRule) => Rule.required().error('Jewlery must have a type'),
        },
        {
          name: 'slot',
          title: 'Where on the body do you want to be able to equip it?',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'grid',
            list: [
              {title: 'Neck', value: 'neck'},
              {title: 'Ring 1', value: 'ring1'},
              {title: 'Ring 2', value: 'ring2'},
            ],
          },
        },
        {
          name: 'durability',
          title: 'How durable should it be?',
          type: 'number',
          validation: (Rule: MinMaxRule) =>
            Rule.min(1).max(999).error('Durability must be between 1 and 999'),
        },
        {
          name: 'defenses',
          title: 'Define the jewelry effect on your stats',
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
      title: 'This is a potion? Describe it for me',
      type: 'object',
      hidden: ({parent}: {parent: {itemType: string[]; subType: string[]}}) =>
        !(
          parent?.itemType?.includes('consumable') &&
          parent?.subType?.some((sub) => sub === 'potion')
        ),
      fields: [
        {
          name: 'effectType',
          title: 'What type of effect does this potion?',
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
          title: 'What stats does this affect?',
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
              {title: 'Health', value: 'health'},
              {title: 'Mana', value: 'mana'},
              {title: 'Aether', value: 'aether'},
            ],
          },
        },
        {name: 'effectAmount', title: 'How much does it affect the affected stat?', type: 'number'},
        {name: 'duration', title: 'How long does it last?', type: 'string'},
      ],
    },
    {
      name: 'food',
      title: 'So this is a food item? What does it do?',
      type: 'object',
      hidden: ({parent}: {parent: {itemType: string[]; subType: string[]}}) =>
        !(
          parent?.itemType?.includes('consumable') && parent?.subType?.some((sub) => sub === 'food')
        ),
      fields: [
        {
          name: 'effectType',
          title: 'What type of effect does this food have?',
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
          title: 'What stats does this affect?',
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
              {title: 'Health', value: 'health'},
              {title: 'Mana', value: 'mana'},
              {title: 'Aether', value: 'aether'},
            ],
          },
        },
        {name: 'effectAmount', title: 'How much does it affect the affected stat?', type: 'number'},
        {name: 'duration', title: 'How long does this affect last?', type: 'string'},
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

  //! causes typescript errors in sanity.config.ts
  // preview: {
  //   select: {
  //     title: 'name',
  //     subtitle: 'itemType',
  //     media: 'src',
  //   },
  //   prepare(selection: Preview) {
  //     const {title, subtitle, media} = selection
  //     return {
  //       title: title || 'Unnamed Item',
  //       subtitle: `Type: ${subtitle || 'Unknown'}`,
  //       media: media || undefined,
  //     }
  //   },
  // },
}
