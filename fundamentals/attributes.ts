export const primaryStats = [
  "Strength",
  "Agility",
  "Vitality",
  "Intelligence",
  "Wisdom",
  "Luck",
];

export const secondaryStats = [
  "Health",
  "Mana",
  "Aether",
  "Stamina",
  "Attack Power",
  "Defense",
  "Dodge Chance",
  "Magic Attack Power",
];

export const combatStats = [
  "Physical",
  "Flame",
  "Frost",
  "Lightning",
  "Entropis",
  "Vitalis",
  "Aether",
  "Health",
  "Mana",
];

export const tertiaryStats = [
  "Critical Chance",
  "Critical Damage",
  "Accuracy",
  "Evasion",
];

export const allStats = Array.from(
  new Set([...primaryStats, ...secondaryStats, ...tertiaryStats, ...combatStats])
);
