export const primaryStats = ['Strength', 'Agility', 'Vitality', 'Intelligence', 'Wisdom', 'Luck']

export const secondaryStats = [
  'Health',
  'Mana',
  'Aether',
  'Stamina',
  'Attack Power',
  'Defense',
  'Dodge Chance',
  'Aether Attack Power', // aka magic attack power
]

export const physicalTypes = ['Slashing', 'Piercing', 'Blunt']

export const elementalTypes = [
  'EmberVeil', // aka fire
  'Voidrime', // aka frost
  'Shatterlight', // aka lightning
  'Entropis', // aka dark
  'Vitalis', // aka light
  'Aether', // aka pure magic
]

export const tertiaryStats = ['Critical Chance', 'Critical Damage', 'Accuracy', 'Evasion']

export const allStats = Array.from(
  new Set([...primaryStats, ...secondaryStats, ...tertiaryStats, ...elementalTypes]),
)

export const allDamageTypes = [...physicalTypes, ...elementalTypes]
