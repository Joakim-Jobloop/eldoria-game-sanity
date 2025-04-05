// =======================
// fundamentals/fundamentals.ts
// =======================

import {formatToDropdownOptions} from '../utils/formatter'

// ========== Raw Lists ==========

export const primaryStats = [
  'Strength',
  'Agility',
  'Vitality',
  'Intelligence',
  'Wisdom',
  'Charisma',
]
export const secondaryStats = [
  'Health',
  'Mana',
  'Aether',
  'Stamina',
  'Attack Power',
  'Defense',
  'Dodge Chance',
  'Aether Attack Power',
]
export const tertiaryStats = ['Critical Chance', 'Critical Damage', 'Accuracy', 'Evasion']
export const conditions = ['Night Vision', 'Stealth']
export const elementalTypes = [
  'EmberVeil',
  'Voidrime',
  'Shatterlight',
  'Entropis',
  'Vitalis',
  'Aether',
]
export const physicalTypes = ['Slashing', 'Piercing', 'Blunt']

export const allStats = Array.from(
  new Set([...primaryStats, ...secondaryStats, ...tertiaryStats, ...elementalTypes, ...conditions]),
)
export const allDamageTypes = [...physicalTypes, ...elementalTypes]

// ========== Character Metadata ==========

const characterClasses = [
  'Aetherblade',
  'Veilweaver',
  'Riftshroud',
  'Astral Sentinel',
  'Aetheric Sage',
  'Primordial Charger',
  'Forgewright',
  'Veilcaller',
]
export const dropdownCharacterClasses = formatToDropdownOptions(characterClasses)

const characterRaces = [
  'Eidralis',
  'Eldrin',
  'Human',
  'Skyforged',
  'Stonekin',
  'Umbran',
  'Verdwalker',
]
export const dropdownCharacterRaces = formatToDropdownOptions(characterRaces)

const genderList = ['Male', 'Female', 'Other']
export const dropdownGenderList = formatToDropdownOptions(genderList)

// ========== Equipment Metadata ==========

export const armorSlots = ['Head', 'Chest', 'Hands', 'Legs', 'Feet', 'Pauldron']
export const dropdownArmorSlots = formatToDropdownOptions(armorSlots)

export const jewelrySlots = [
  'Neck',
  'Ring Slot One',
  'Ring Slot Two',
  'Belt Slot',
  'Artifact Pouch',
  'Wrist',
]
export const dropdownJewelrySlots = formatToDropdownOptions(jewelrySlots)

export const weaponSlots = ['Main Hand', 'Off Hand', 'Two Handed']
export const dropdownWeaponSlots = formatToDropdownOptions(weaponSlots)

// ========== Categories & Tags ==========

export const itemCategories = ['Equippable', 'Consumable', 'Crafting Item']
export const dropdownItemCategories = formatToDropdownOptions(itemCategories)

export const itemSubCategories = [
  'Weapon',
  'Armour',
  'Jewelry',
  'Potion',
  'Food',
  'Ingredient',
  'Material',
  'Spice',
]
export const dropdownItemSubCategories = formatToDropdownOptions(itemSubCategories)

export const armourCategories = ['Light', 'Medium', 'Heavy']
export const dropdownArmorCategories = formatToDropdownOptions(armourCategories)

export const weaponCategories = [
  'Dagger',
  'Sword',
  'Bow',
  'Staff',
  'Projectile',
  'Wand',
  'Mace',
  'Battle axe',
]
export const dropdownWeaponCategories = formatToDropdownOptions(weaponCategories)

export const jewelryCategories = ['Amulet', 'Ring', 'Talisman', 'Artifact', 'Bracelet']
export const dropdownJewelryCategories = formatToDropdownOptions(jewelryCategories)

export const consumableEffects = [
  'Buff',
  'Debuff',
  'Restore',
  'Drain',
  'Acquire',
  'Cure',
  'Resistance',
]
export const dropdownConsumableEffects = formatToDropdownOptions(consumableEffects)

export const loreCategories = [
  'Deity',
  'Aetheric Phenomenon',
  'Metaphysical Force',
  'Historical Event',
  'Location',
  'Philosophy or Teaching',
  'Artifact',
  'Other',
]
export const dropdownLoreCategories = formatToDropdownOptions(loreCategories)

export const npcRoleTypes = [
  'Merchant',
  'Guide',
  'Villager',
  'Elite Figure',
  'Enemy-Turned',
  'Scholar',
  'Healer',
]
export const dropdownNpcRoleTypes = formatToDropdownOptions(npcRoleTypes)

// ========== Dropdown Bundles ==========

export const dropdownPrimaryStats = formatToDropdownOptions(primaryStats)
export const dropdownAllStats = formatToDropdownOptions(allStats)
export const dropdownAllDamageTypes = formatToDropdownOptions(allDamageTypes)
export const dropdownElementalTypes = formatToDropdownOptions(elementalTypes)
export const dropdownPhysicalTypes = formatToDropdownOptions(physicalTypes)
