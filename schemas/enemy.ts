// ===========================
// schemas/enemy.ts
// ===========================

import {
    dropdownAetherAlignments,
    dropdownElementalTypes,
    dropdownPhysicalTypes,
    dropdownEnemyTypes,
    dropdownEnemyAggroType,
  } from '../fundamentals/fundamentals'
  
  import {
    createRadioDropdown,
    checkDropdown,
    flexibleReferenceArray,
  } from '../schemaVariables/schemaVariables'
  
  import {
    skillOffensiveStats,
    skillDefensiveStats,
    skillStatEffects,
  } from '../schemaVariables/skills/skillSchemaVariables'
  
  import { MinMaxRule, ValidationRule } from '../types/types'
  
  export default {
    name: 'enemy',
    title: 'Enemy',
    type: 'document',
    fields: [
      { name: 'name', title: 'Enemy Name', type: 'string', validation: (Rule: ValidationRule) => Rule.required() },
      { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (Rule: ValidationRule) => Rule.required() },
      { name: 'portrait', title: 'Portrait / Illustration', type: 'image', options: { hotspot: true } },
      { name: 'description', title: 'Description', type: 'text' },
  
      createRadioDropdown('type', 'Enemy Type', dropdownEnemyTypes),
      createRadioDropdown('aetherAlignment', 'Aetheric Alignment', dropdownAetherAlignments),
  
      // Combat stats
      { name: 'level', title: 'Level', type: 'number' },
      { name: 'health', title: 'Health Points', type: 'number' },
      { name: 'speed', title: 'Speed / Turn Priority', type: 'number' },
  
      checkDropdown('elementalType', 'Elemental Affinity (if any)', dropdownElementalTypes),
      checkDropdown('physicalType', 'Physical Profile (if any)', dropdownPhysicalTypes),
  
      skillOffensiveStats(),
      skillDefensiveStats(),
      skillStatEffects(),
  
      { name: 'combatTags', title: 'Combat Tags', type: 'array', of: [{ type: 'string' }], description: 'E.g. Melee, Magic, Ranged, AoE, Debuff' },
      checkDropdown('aggroType', 'Aggression Type', dropdownEnemyAggroType),
  
      {
        name: 'skillSet',
        title: 'Skill Set',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'skill' }] }],
      },
  
      // Integration
      flexibleReferenceArray("faction", "Known Faction or Sect", ['faction']),
      { name: 'dangerRating', title: 'Danger Rating (1–5)', type: 'number', validation: (Rule: MinMaxRule) => Rule.min(1).max(5) },
      { name: 'lootTier', title: 'Loot Tier', type: 'string' },
      { name: 'canBeTamed', title: 'Can This Enemy Be Tamed?', type: 'boolean' },
  
      {
        name: 'lootTable',
        title: 'Loot Table',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'item' }] }],
      },
      {
        name: 'spawnLocations',
        title: 'Spawn Locations',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'location' }] }],
      },
      {
        name: 'loreEntry',
        title: 'Related Lore Entry',
        type: 'reference',
        to: [{ type: 'lore' }],
      },
      {
        name: 'corruptedFormOf',
        title: 'Corrupted Form of Race',
        type: 'reference',
        to: [{ type: 'characterRace' }],
      },
      {
        name: 'isBoss',
        title: 'Is This a Boss Enemy?',
        type: 'boolean',
      },
    ],
  
    preview: {
      select: {
        title: 'name',
        subtitle: 'type',
        media: 'portrait',
      },
      prepare({ title, subtitle, media }: { title?: string; subtitle?: string; media?: any }) {
        return {
          title: title || 'Unnamed Enemy',
          subtitle: subtitle || 'No type specified',
          media,
        }
      },
    },
  }
  