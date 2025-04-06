// =======================
// schemas/item.ts
// =======================

import {
  dropdownItemCategories,
  dropdownItemSubCategories,
  dropdownArmorCategories,
  dropdownWeaponCategories,
  dropdownJewelryCategories,
  dropdownConsumableEffects,
  dropdownWeaponSlots,
  dropdownArmorSlots,
  dropdownJewelrySlots,
  dropdownLootTiers,
} from '../fundamentals/fundamentals'

import {
  checkDropdown,
  damageRangeArray,
  statEffectArray,
  durabilityValidation,
  needsCategories,
  needsCategory,
} from '../schemaVariables/schemaVariables'
import { MinMaxRule, ValidationRule } from '../types/types'

export default {
  name: 'item',
  title: 'Item',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name the item', type: 'string', validation: (Rule: ValidationRule) => Rule.required() },
    {
      name: 'itemID',
      type: 'slug',
      title: 'Item ID',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: 'src',
      title: 'What is the source of the image for this item?',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Tell me about the item',
      type: 'text',
      maxLength: 500,
      validation: (Rule: ValidationRule) => Rule.required(),
    },

    checkDropdown('category', 'What type of item is it?', dropdownItemCategories),
    checkDropdown('subCategory', 'Be more specific. What type of item is it?', dropdownItemSubCategories),
    checkDropdown('rarity', 'What is the rarity of this item?', dropdownLootTiers),

    // EQUIPPABLES
    {
      name: 'armour',
      title: 'Some armour, ey? How does it defend the player?',
      type: 'object',
      ...needsCategories('equippable', 'armour'),
      fields: [
        checkDropdown('armourCategory', 'What armour-class is it?', dropdownArmorCategories),
        checkDropdown('slot', 'Where on the body do you want to equip it?', dropdownArmorSlots),
        statEffectArray(),
      ],
    },
    {
      name: 'weapon',
      title: 'Nice, a weapon! Define the stats below',
      type: 'object',
      ...needsCategories('equippable', 'weapon'),
      fields: [
        checkDropdown('weaponCategory', 'What type of weapon is it?', dropdownWeaponCategories),
        checkDropdown('slot', 'In which hand do you want to equip it?', dropdownWeaponSlots),
        damageRangeArray(),
      ],
    },
    {
      name: 'jewelry',
      title: 'Fancy Jewelry! What are the characteristics for this item?',
      type: 'object',
      ...needsCategories('equippable', 'jewelry'),
      fields: [
        checkDropdown('jewelryCategory', 'What type of jewelry is this?', dropdownJewelryCategories),
        checkDropdown('slot', 'Where on the body do you want to equip it?', dropdownJewelrySlots),
        statEffectArray(),
      ],
    },

    // CONSUMABLES
    {
      name: 'potion',
      title: 'This is a potion? Describe it for me',
      type: 'object',
      ...needsCategories('consumable', 'potion'),
      fields: [
        checkDropdown('effectCategory', 'What type of effect does this potion give?', dropdownConsumableEffects),
        statEffectArray('statEffects', 'Stat Effects'),
      ],
    },
    {
      name: 'food',
      title: 'So this is a food item? What does it do?',
      type: 'object',
      ...needsCategories('consumable', 'food'),
      fields: [
        checkDropdown('effectCategory', 'What type of effect does this food have?', dropdownConsumableEffects),
        statEffectArray('statEffects', 'Stat Effects'),
      ],
    },

    // CRAFTING RECIPE
    {
      name: 'recipe',
      title: 'Recipe',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'ingredient', title: 'Ingredient', type: 'reference', to: [{ type: 'item' }] },
            { name: 'amount', title: 'Amount', type: 'number' },
          ],
          preview: {
            select: {
              title: 'ingredient.name',
              subtitle: 'amount',
              media: 'ingredient.src',
            },
            prepare({ title, subtitle, media }: { title: string; subtitle: string; media: any }) {
              return { title, subtitle: `Amount: ${subtitle}`, media }
            },
          },
        },
      ],
    },

    // DURABILITY
    {
      name: 'durability',
      title: 'How durable should it be?',
      type: 'number',
      ...needsCategory('equippable'),
      validation: durabilityValidation,
    },

    // NEW: INVENTORY LOGIC
    checkDropdown('inventoryRole', 'What is this item used for in inventory?', ['Equip', 'Consume', 'Craft', 'Key']),
    checkDropdown('obtainMethods', 'How can this item be obtained?', ['Found', 'Bought', 'Crafted', 'Starter']),

    {
      name: 'baseGoldValue',
      title: 'Base Value (Gold)',
      type: 'number',
      description: 'Represents the default market value. Buy/sell prices are derived from this.',
      validation: (Rule: MinMaxRule) =>
        Rule.min(0).error('Value cannot be negative'),
    },
    {
      name: 'baseGemValue',
      title: 'Base Value (Gem)',
      type: 'number',
      description: 'Represents the default market value. Buy/sell prices are derived from this.',
      validation: (Rule: MinMaxRule) =>
        Rule.min(0).error('Value cannot be negative'),
    },
  ],

  preview: {
    select: {
      title: 'name',
      media: 'src',
      subtitle: 'category',
    },
    prepare({ title, subtitle, media }: { title?: string; subtitle?: string; media?: any }) {
      return {
        title: title || 'Unnamed Item',
        subtitle: Array.isArray(subtitle) ? subtitle.join(', ') : subtitle || 'No category',
        media,
      }
    },
  },
}
