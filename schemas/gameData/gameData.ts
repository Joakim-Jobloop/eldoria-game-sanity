// ================================
// schemas/gameContentEntryPoint.ts
// ================================

import {filteredItemReferenceArray} from '../../schemaVariables/schemaVariables'

export default {
  name: 'gameContentEntryPoint',
  title: 'Game Content (Master Reference)',
  type: 'document',
  fields: [
    // ITEM REFERENCES (grouped by category/subcategory, filtered by value and duplication)
    filteredItemReferenceArray('item', 'potions', 'All Potion Items', 'consumable', 'potion'),
    filteredItemReferenceArray('item', 'foodItems', 'All Food Items', 'consumable', 'food'),
    filteredItemReferenceArray('item', 'weapons', 'All Weapons', 'equippable', 'weapon'),
    filteredItemReferenceArray('item', 'armours', 'All Armour Items', 'equippable', 'armour'),
    filteredItemReferenceArray('item', 'jewelry', 'All Jewelry Items', 'equippable', 'jewelry'),

    // OTHER CONTENT TYPES (unfiltered)
    {
      name: 'allSkills',
      title: 'All Skills',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'skill'}]}],
    },
    {
      name: 'allTraits',
      title: 'All Traits',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'trait'}]}],
    },
    // {
    //   name: 'allClasses',
    //   title: 'All Character Classes',
    //   type: 'array',
    //   of: [{type: 'reference', to: [{type: 'characterClass'}]}],
    // },
    filteredItemReferenceArray("characterClass", 'allClasses', 'All Character Classes'),
    {
      name: 'allRaces',
      title: 'All Character Races',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'characterRace'}]}],
    },
    {
      name: 'allEnemies',
      title: 'All Enemies',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'npc'}]}],
    },
    {
      name: 'allFactions',
      title: 'All Factions',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'faction'}]}],
    },
    {
      name: 'allNPCs',
      title: 'All NPCs',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'npc'}]}],
    },
    {
      name: 'allQuests',
      title: 'All Quests',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'quest'}]}],
    },
    {
      name: 'allLocations',
      title: 'All Locations',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'location'}]}],
    },
    {
      name: 'allLore',
      title: 'All Lore Entries',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'lore'}]}],
    },
  ],

  preview: {
    prepare() {
      return {
        title: '📦 All Game Content Entry Point',
        subtitle: 'Master list for initializing frontend state',
      }
    },
  },
}
