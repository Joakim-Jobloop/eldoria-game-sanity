import { allStats } from '../fundamentals/attributes';
import { armorSlots, jewelrySlots, weaponSlots } from '../fundamentals/equipmentSlots';
import { 
  armourCategories, consumableEffects, 
  itemCategories, itemSubCategories, 
  jewelryCategories, weaponCategories 
} from '../fundamentals/itemCategories';
import { isHidden } from '../schemaVariables/common';
import { checkDropdown, offensiveStats, defensiveStats, numberDropdown } from '../schemaVariables/schemaVariables';
import { MinMaxRule, ValidationRule } from '../types/types';

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
      name: 'itemID',
      type: 'slug',
      source: 'name',
      maxLength: 96,
      validation: (Rule: ValidationRule) => Rule.required().error('Item must have an ID'),
    },
    {
      name: 'src',
      title: 'What is the source of the image for this item?',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: ValidationRule) => Rule.required().error('Item must have a picture'),
    },
    checkDropdown('category', 'What type of item is it?', itemCategories),
    checkDropdown('subCategory', 'Be more specific. What type of item is it?', itemSubCategories),

    {
      name: 'armour',
      title: 'Some armour, ey? How does it defend the player?',
      type: 'object',
      ...isHidden("equippable", "armour"),
      fields: [
        checkDropdown('armourCategory', 'What armour-class is it?', armourCategories),
        checkDropdown('slot', 'Where on the body do you want to equip it?', armorSlots),
        defensiveStats(),
      ],
    },
    {
      name: 'weapon',
      title: 'Nice, a weapon! Define the stats below',
      type: 'object',
      ...isHidden("equippable", "weapon"),
      fields: [
        checkDropdown('weaponCategory', 'What type of weapon is it?', weaponCategories),
        checkDropdown('slot', 'In which hand do you want to equip it?', weaponSlots),
        offensiveStats(),
      ],
    },
    {
      name: 'jewelry',
      title: 'Fancy Jewelry! What are the characteristics for this item?',
      type: 'object',
      ...isHidden("equippable", "jewelry"),
      fields: [
        checkDropdown('jewelryCategory', 'What type of jewelry is this?', jewelryCategories),
        checkDropdown('slot', 'Where on the body do you want to equip it?', jewelrySlots),
        defensiveStats(),
      ],
    },

    {
      name: 'potion',
      title: 'This is a potion? Describe it for me',
      type: 'object',
      ...isHidden("consumable", "potion"),
      fields: [
        checkDropdown('effectCategory', 'What type of effect does this potion give?', consumableEffects),
        numberDropdown('affectedStat', 'What stats does this affect?', allStats),
        { name: 'effectAmount', title: 'How much does it affect the stat?', type: 'number' },
        { name: 'duration', title: 'How long does it last?', type: 'string' },
      ],
    },
    {
      name: 'food',
      title: 'So this is a food item? What does it do?',
      type: 'object',
      ...isHidden("consumable", "food"),
      fields: [
        checkDropdown('effectCategory', 'What type of effect does this food have?', consumableEffects),
        numberDropdown('affectedStat', 'What stats does this affect?', allStats, false), // Fix for numeric input
        { name: 'effectAmount', title: 'How much does it affect the stat?', type: 'number' },
        { name: 'duration', title: 'How long does this effect last?', type: 'string' },
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
            { name: 'ingredient', title: 'Ingredient', type: 'reference', to: [{ type: 'item' }] },
            { name: 'amount', title: 'Amount', type: 'number' },
          ],
        },
      ],
    },
    {
      name: 'durability',
      title: 'How durable should it be?',
      type: 'number',
      validation: (Rule: MinMaxRule) => Rule.min(1).max(999).error('Durability must be between 1 and 999'),
    },

    { name: 'buyPrice', title: 'Set a buy price', type: 'number' },
    { name: 'sellPrice', title: 'Set a sell price', type: 'number' },
  ],
};
