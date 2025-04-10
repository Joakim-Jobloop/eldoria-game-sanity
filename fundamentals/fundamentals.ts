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
export const elementalTypes = ['Ember', 'Rime', 'Shatterlight', 'Entropis', 'Vitalis', 'Aether']
export const physicalTypes = ['Slashing', 'Piercing', 'Blunt']
export const allTraitTypes = [
  'Offensive',
  'Defensive',
  'Utility',
  'Hybrid',
  'Unique',
  'Support',
  'Aura',
  'Race',
  'Class',
  'Item',
]
export const traitTypes = allTraitTypes.filter((t) => t !== 'Race' && t !== 'Class' && t !== 'Item')

export const allStats = Array.from(
  new Set([...primaryStats, ...secondaryStats, ...tertiaryStats, ...elementalTypes, ...conditions]),
)
export const allDamageTypes = [...physicalTypes, ...elementalTypes]

const skillSupportTags = [
  'AoE',
  'Chain',
  'Summon',
  'Teleport',
  'Cleanse',
  'Interrupt',
  'Shield',
  'Displace',
  'Silence',
  'Stun',
  'Knockback',
  'Root',
]
export const dropdownSkillSupportTags = formatToDropdownOptions(skillSupportTags)

// ========== Loot Metadata ==========

const lootTiers = [
  'Junk',
  'Common',
  'Uncommon',
  'Rare',
  'Masterwork',
  'Epic',
  'Legendary',
  'Mythic',
  'Divine',
  'Event',
]
export const dropdownLootTiers = formatToDropdownOptions(lootTiers)

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
  'Race',
  'Class',
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

// ========== Skill Metadata ==========

const skillTypes = ['Active', 'Passive', 'Ultimate', 'Reaction']
export const dropdownSkillTypes = formatToDropdownOptions(skillTypes)

const skillSourceTypes = ['Class', 'Race', 'Item', 'Trait', 'Other']
export const dropdownSkillSourceTypes = formatToDropdownOptions(skillSourceTypes)

const skillCategories = ['Offensive', 'Defensive', 'Utility', 'Healing', 'Support']
export const dropdownSkillCategories = formatToDropdownOptions(skillCategories)

const targetTypes = ['Self', 'Ally', 'Enemy', 'Area', 'Group', 'All']
export const dropdownTargetTypes = formatToDropdownOptions(targetTypes)

const aetherAlignments = [
  'Vitalis',
  'Vitalis/Balanced',
  'Balanced',
  'Entropis/Balanced',
  'Entropis',
  'Aether',
  'Unstable',
  'Antum',
]
export const dropdownAetherAlignments = formatToDropdownOptions(aetherAlignments)

// ========== Quest Metadata ==========

const questTypes = ['Main', 'Side', 'Faction', 'Daily', 'Repeatable']
export const dropdownQuestTypes = formatToDropdownOptions(questTypes)

const completeConditions = ['Kill', 'Time', 'Collect', 'Reach', 'Other']
export const dropdownWinConditions = formatToDropdownOptions(completeConditions)

// ========== Enemy Metadata ==========

const enemyTypes = ['Monster', 'Mortal', 'Construct', 'Undead', 'Spirit', 'Deity', 'Corrupted']
export const dropdownEnemyTypes = formatToDropdownOptions(enemyTypes)

const enemyAggroType = ['Passive', 'Aggressive', 'Territorial', 'Summoned']
export const dropdownEnemyAggroType = formatToDropdownOptions(enemyAggroType)

const combatTagOptions = ['Melee', 'Ranged', 'Magic', 'AoE', 'Debuff']
export const dropdownCombatTagOptions = formatToDropdownOptions(combatTagOptions)

// ========== Dropdown Bundles ==========

export const dropdownPrimaryStats = formatToDropdownOptions(primaryStats)
export const dropdownSecondaryStats = formatToDropdownOptions(secondaryStats)
export const dropdownTertiaryStats = formatToDropdownOptions(tertiaryStats)
export const dropdownConditions = formatToDropdownOptions(conditions)
export const dropdownAllStats = formatToDropdownOptions(allStats)
export const dropdownAllDamageTypes = formatToDropdownOptions(allDamageTypes)
export const dropdownElementalTypes = formatToDropdownOptions(elementalTypes)
export const dropdownPhysicalTypes = formatToDropdownOptions(physicalTypes)
export const dropdownAllTraitTypes = formatToDropdownOptions(allTraitTypes)
export const dropdownTraitTypes = formatToDropdownOptions(traitTypes)
