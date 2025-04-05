export const itemCategories = ['Equippable', 'Consumable', 'Crafting Item']

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

export const armourCategories = ['Light', 'Medium', 'Heavy']

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

export const jewelryCategories = ['Amulet', 'Ring', 'Talisman', 'Artifact', 'Bracelet']

export const consumableEffects = [
  //*Original Version
  'Buff', // Gains a temporary stat boost
  'Debuff', // Gains a temporary stat debuff
  'Restore', // Restores a stat
  'Drain', // Drains a stat
  'Acquire', // Gains a temporary condition
  'Cure', // Cures a permanent or temporary stat debuff
  'Resistance', // Gives resistance towards a damage type

  //* First Version
  // 'Buff', //? All positive temp or perma effect (including restoration/acquire)
  // 'Debuff', //? All negative temp or perma effects (including drain)
  // 'Heal', //? Restoration of stats like, health, mana
  // 'Cure', //? Removing negative condition like, poison, charms, curses
  // 'Resist', //? Temporarly gives resist to effect such as (elemental, debuffs, etc)

  //* Second Version
  // 'Buff',
  // 'Debuff',
  // 'Heal',
  // 'Damage',
  // 'Drain',
  // 'Cure',
  // 'Shield',
  // 'Resistance',
  // 'Reflect',
  // 'Immunity',
]
