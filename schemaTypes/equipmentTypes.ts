import {
  dropdownArmorCategories,
  dropdownArmorSlots,
  dropdownJewelryCategories,
  dropdownJewelrySlots,
  dropdownWeaponCategories,
  dropdownWeaponSlots,
} from '../fundamentals/fundamentals'
import {createRadioDropdown} from '../schemaVariables/schemaVariables'
import {damageProfile} from './combatTypes'
import {validateDurability, validateRange} from '../utils/validation'

export const equipmentSlot = {
  name: 'equipmentSlot',
  title: 'Equipment Slot',
  type: 'object',
  fields: [
    {
      name: 'type',
      title: 'Slot Type',
      type: 'string',
      options: {
        list: [
          {title: 'Weapon', value: 'weapon'},
          {title: 'Armor', value: 'armor'},
          {title: 'Jewelry', value: 'jewelry'},
        ],
      },
    },
    {
      name: 'required',
      title: 'Required Level',
      type: 'number',
      validation: validateRange(1, 100, 'Required level'),
    },
  ],
}

export const weaponProfile = {
  name: 'weaponProfile',
  title: 'Weapon Properties',
  type: 'object',
  fields: [
    createRadioDropdown('category', 'Weapon Category', dropdownWeaponCategories),
    createRadioDropdown('slot', 'Equipment Slot', dropdownWeaponSlots),
    {...damageProfile},
    {
      name: 'durability',
      title: 'Durability',
      type: 'number',
      validation: validateDurability('Weapon durability'),
    },
  ],
}

export const armorProfile = {
  name: 'armorProfile',
  title: 'Armor Properties',
  type: 'object',
  fields: [
    createRadioDropdown('category', 'Armor Category', dropdownArmorCategories),
    createRadioDropdown('slot', 'Equipment Slot', dropdownArmorSlots),
    {
      name: 'defense',
      title: 'Defense Value',
      type: 'number',
      validation: validateRange(0, 1000, 'Defense value'),
    },
    {
      name: 'durability',
      title: 'Durability',
      type: 'number',
      validation: validateDurability('Armor durability'),
    },
  ],
}

export const jewelryProfile = {
  name: 'jewelryProfile',
  title: 'Jewelry Properties',
  type: 'object',
  fields: [
    createRadioDropdown('category', 'Jewelry Category', dropdownJewelryCategories),
    createRadioDropdown('slot', 'Equipment Slot', dropdownJewelrySlots),
    {
      name: 'socketCount',
      title: 'Number of Sockets',
      type: 'number',
      validation: validateRange(0, 3, 'Socket count'),
    },
  ],
}

export const inventoryItem = {
  name: 'inventoryItem',
  title: 'Inventory Item Entry',
  type: 'object',
  fields: [
    {
      name: 'item',
      title: 'Item',
      type: 'reference',
      to: [{type: 'item'}],
    },
    {
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
      validation: validateRange(1, 99999, 'Item quantity'),
    },
    {
      name: 'dropChance',
      title: 'Drop Chance (%)',
      type: 'number',
      validation: validateRange(0, 100, 'Drop chance'),
    },
  ],
}
