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

//*Dividing the sections properly so they arent all just jumpled up:)

export const statGroups = {
  Primary: {emoji: '🟦', values: primaryStats},
  Secondary: {emoji: '🟩', values: secondaryStats},
  Tertiary: {emoji: '🟨', values: tertiaryStats},
  Elemental: {emoji: '🔥', values: elementalTypes},
  Condition: {emoji: '🕶', values: conditions},
}

export const groupedAllStats = Object.entries(statGroups).flatMap(([group, {emoji, values}]) =>
  values.map((stat) => ({
    title: `${emoji} ${group} – ${stat}`,
    value: stat.toLowerCase().replace(/\s+/g, '_'),
  }))
)

