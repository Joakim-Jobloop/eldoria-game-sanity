import {combatStats} from '../fundamentals/combat'
import {armorSlotList, jewelrySlotList} from '../fundamentals/equipmentSlots'
import {armourClasses, itemCategoryList, itemSubCategoryList, jewelryClasses, weaponClasses} from '../fundamentals/itemCategories'
import {createCheckDropdown, createDamageStatField, createDefensiveStatsField, createNumberDropdown} from '../schemaVariables/schemaVariables'
import {MinMaxRule, ValidationRule} from '../types/types'


//TODO: Implement the rest of the schema variables to shorten down the schema even more
export default {
  name: 'item',
  title: 'Create an Item!',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name the item',
      type: 'string',
      maxLength: 96,
      validation: (Rule: ValidationRule) => Rule.required().error('Item must have a name'),
    },
    {
      // hidden: true,
      name: 'itemID',
      type: 'slug',
      source: 'name',
      maxLength: 96,
      validation: (Rule: ValidationRule) => Rule.required().error('Item must have an id'),
    },
    {
      name: 'src',
      title: 'What is the source of the image for this item?',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule: ValidationRule) => Rule.required().error('Item must have a picture'),
    },
    createCheckDropdown('category', 'What type of item is it?', itemCategoryList),
    createCheckDropdown(
      'subCategory',
      'What be more spesific. What type of item is it?Does it fit into just one or several categories?',
      itemSubCategoryList,
    ),

    {
      name: 'armour',
      title: 'Some armour ey? How does it defend the player?',
      type: 'object',
      hidden: ({parent}: {parent: {itemType: string[]; subType: string[]}}) =>
        !(parent?.itemType?.includes('equippable') && parent?.subType?.includes('armour')),
      fields: [
        //TODO: Check if you can choose multiple armour classes with the createCheckDropdown
        createCheckDropdown('armourClass', 'What armour-class is it?', armourClasses),
        //TODO: Same here as above
        createCheckDropdown(
          'slot',
          'Where on the body do you want to be able to equip it?',
          armorSlotList,
        ),

        {
          name: 'durability',
          title: 'How durable should it be?',
          type: 'number',
          validation: (Rule: MinMaxRule) =>
            Rule.min(1).max(999).error('Durability must be between 1 and 100'),
        },
        createNumberDropdown('defenses', 'Define the armour defenses', combatStats),
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
        createCheckDropdown('weaponClass', 'What type of weapon is it?', weaponClasses),
        createCheckDropdown(
          'slot',
          'In which hand do you want to be able to equip it?',
          armorSlotList,
        ),
        // {
        //   name: 'slot',
        //   title: 'In which hand do you want to be able to equip it?',
        //   type: 'array',
        //   of: [{type: 'string'}],
        //   options: {
        //     layout: 'grid',
        //     list: [
        //       {title: 'Main Hand', value: 'mainHand'},
        //       {title: 'Off Hand', value: 'offHand'},
        //       {title: 'Two Handed', value: 'twoHanded'},
        //     ],
        //     validation: (Rule: ValidationRule) =>
        //       Rule.required().error('Weapon must have a subtype'),
        //   },
        // },
        {
          name: 'durability',
          title: 'How durable should it be?',
          type: 'number',
          validation: (Rule: MinMaxRule) =>
            Rule.min(1).max(999).error('Durability must be between 1 and 100'),
        },
        createDamageStatField(),
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
        createCheckDropdown('jewelryCategory', 'What type of jewelry is this?', jewelryClasses),

        // {
        //   name: 'jewelryType',
        //   title: 'What type of jewelry is this?',
        //   type: 'array',
        //   of: [{type: 'string'}],
        //   options: {
        //     layout: 'grid',
        //     list: [
        //       {title: 'Amulet', value: 'amulet'},
        //       {title: 'Ring', value: 'ring'},
        //       {title: 'Talisman', value: 'talisman'},
        //     ],
        //   },
        //   validation: (Rule: ValidationRule) => Rule.required().error('Jewlery must have a type'),
        // },
        createCheckDropdown(
          'slot',
          'Where on the body do you want to be able to equip it?',
          jewelrySlotList,
        ),
        // {
        //   name: 'slot',
        //   title: 'Where on the body do you want to be able to equip it?',
        //   type: 'array',
        //   of: [{type: 'string'}],
        //   options: {
        //     layout: 'grid',
        //     list: [
        //       {title: 'Neck', value: 'neck'},
        //       {title: 'Ring 1', value: 'ring1'},
        //       {title: 'Ring 2', value: 'ring2'},
        //     ],
        //   },
        // },
        {
          name: 'durability',
          title: 'How durable should it be?',
          type: 'number',
          validation: (Rule: MinMaxRule) =>
            Rule.min(1).max(999).error('Durability must be between 1 and 999'),
        },
        createDefensiveStatsField(),
        // {
        //   name: 'defenses',
        //   title: 'Define the jewelry effect on your stats',
        //   type: 'object',
        //   fields: [
          //     {name: 'flame', title: 'Flame', type: 'number'},
          //     {name: 'frost', title: 'Frost', type: 'number'},
          //     {name: 'lightning', title: 'Lightning', type: 'number'},
          //     {name: 'entropis', title: 'Entropis', type: 'number'},
          //     {name: 'vitalis', title: 'Vitalis', type: 'number'},
          //     {name: 'aether', title: 'Aether', type: 'number'},
          //     {name: 'health', title: 'Health', type: 'number'},
          //     {name: 'mana', title: 'Mana', type: 'number'},
        //   ],
        // },
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

    {name: 'buyPrice', title: 'Set a buy price', type: 'number'},
    {name: 'sellPrice', title: 'Set a sell price', type: 'number'},
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
