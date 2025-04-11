// =======================
// schemas/item.ts
// =======================

import {createNamedEntity} from '../schemaTypes/presets'
import {weaponProfile, armorProfile, jewelryProfile} from '../schemaTypes/equipmentTypes'
import {statusEffect, buffEffect} from '../schemaTypes/effectTypes'
import {createCraftingRecipe} from '../schemaTypes/presets'
import {createDefaultFieldsets} from '../schemaTypes/presets'
import {
  dropdownItemCategories,
  dropdownItemSubCategories,
  dropdownLootTiers,
} from '../fundamentals/fundamentals'
import {checkDropdown, needsCategories} from '../schemaVariables/schemaVariables'
import {Rule} from 'sanity'

interface ItemValue {
  baseGoldValue?: number
  baseGemValue?: number
}

interface ItemPreview {
  title?: string
  media?: any
  subtitle?: string | string[]
  value?: ItemValue
  category?: string | string[]
}

export default {
  name: 'item',
  title: 'Item',
  type: 'document',
  ...createDefaultFieldsets,
  fields: [
    // Base fields with image
    ...Object.values(createNamedEntity({withImage: true})),

    // Core Classification
    checkDropdown('category', 'What type of item is it?', dropdownItemCategories),
    checkDropdown(
      'subCategory',
      'Be more specific. What type of item is it?',
      dropdownItemSubCategories,
    ),
    checkDropdown('rarity', 'What is the rarity of this item?', dropdownLootTiers),

    // Equipment Profiles
    {
      ...weaponProfile,
      ...needsCategories('equippable', 'weapon'),
    },
    {
      ...armorProfile,
      ...needsCategories('equippable', 'armour'),
    },
    {
      ...jewelryProfile,
      ...needsCategories('equippable', 'jewelry'),
    },

    // Consumable Effects
    {
      name: 'consumableEffects',
      title: 'Consumable Effects',
      type: 'array',
      of: [
        {
          name: 'statusEffect',
          title: 'Status Effect',
          type: 'object',
          fields: statusEffect.fields,
        },
        {
          name: 'buffEffect',
          title: 'Buff Effect',
          type: 'object',
          fields: buffEffect.fields,
        },
      ],
      ...needsCategories('consumable', 'consumable'),
    },

    // Crafting
    {
      ...createCraftingRecipe,
      ...needsCategories('crafting_item', 'crafting'),
    },

    // Market Values
    {
      name: 'value',
      title: 'Item Value',
      type: 'object',
      fieldset: 'core',
      fields: [
        {
          name: 'baseGoldValue',
          title: 'Base Value (Gold)',
          type: 'number',
          validation: (Rule: Rule) => Rule.min(0),
        },
        {
          name: 'baseGemValue',
          title: 'Base Value (Gem)',
          type: 'number',
          validation: (Rule: Rule) => Rule.min(0),
        },
      ],
      validation: (Rule: Rule) => Rule.required().error('Item value must be specified'),
    },

    // Inventory Metadata
    checkDropdown('inventoryRole', 'What is this item used for in inventory?', [
      'Equip',
      'Consume',
      'Craft',
      'Key',
    ]),
    checkDropdown('obtainMethods', 'How can this item be obtained?', [
      'Found',
      'Bought',
      'Crafted',
      'Starter',
    ]),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'image',
      subtitle: 'category',
      value: 'value',
      category: 'category',
    },
    prepare({title, media, subtitle, value, category}: ItemPreview) {
      const categories = Array.isArray(category) ? category : [category]
      const icons = {
        weapon: '⚔️',
        armour: '🛡️',
        jewelry: '💎',
        potion: '🧪',
        food: '🍖',
        ingredient: '🌿',
        material: '📦',
        spice: '🧂',
      }

      const itemIcon = categories
        .map((c) => icons[c?.toLowerCase() as keyof typeof icons] || '📦')
        .join('')

      const valueStr = value?.baseGoldValue
        ? ` (${value.baseGoldValue}g)`
        : value?.baseGemValue
          ? ` (${value.baseGemValue}💎)`
          : ''

      return {
        title: itemIcon + ' ' + (title || 'Unnamed Item') + valueStr,
        subtitle: Array.isArray(subtitle) ? subtitle.join(', ') : subtitle || 'No category',
        media,
      }
    },
  },
}
