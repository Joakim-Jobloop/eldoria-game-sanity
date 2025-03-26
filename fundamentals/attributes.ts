export const primaryStats = [
  'Strength',
  'Agility',
  'Vitality',
  'Intelligence',
  'Wisdom',
  'Luck',
  'Charm',
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
  // 'Stealth',
  // 'Night Vision',
]

export const tertiaryStats = ['Critical Chance', 'Critical Damage', 'Accuracy', 'Evasion']

export const conditions = ['Night Vision', 'Stealth']

export const physicalTypes = ['Slashing', 'Piercing', 'Blunt']

export const elementalTypes = [
  'EmberVeil', // aka fire
  'Voidrime', // aka frost
  'Shatterlight', // aka lightning
  'Entropis', // aka dark
  'Vitalis', // aka light
  'Aether', // aka pure magic
]

export const allStats = Array.from(
  new Set([...primaryStats, ...secondaryStats, ...tertiaryStats, ...elementalTypes, ...conditions]),
)

export const allDamageTypes = [...physicalTypes, ...elementalTypes]
