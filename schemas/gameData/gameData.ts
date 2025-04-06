// ================================
// schemas/gameContentEntryPoint.ts
// ================================

export default {
    name: 'gameContentEntryPoint',
    title: 'Game Content (Master Reference)',
    type: 'document',
    fields: [
      // ITEMS (Grouped by category/subcategory)
      {
        name: 'potions',
        title: 'All Potion Items',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [
              {
                type: 'item',
                options: {
                  filter: '"consumable" in category && "potion" in subCategory',
                },
              },
            ],
          },
        ],
      },
      {
        name: 'foodItems',
        title: 'All Food Items',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [
              {
                type: 'item',
                options: {
                  filter: '"consumable" in category && "food" in subCategory',
                },
              },
            ],
          },
        ],
      },
      {
        name: 'weapons',
        title: 'All Weapons',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [
              {
                type: 'item',
                options: {
                  filter: '"equippable" in category && "weapon" in subCategory',
                },
              },
            ],
          },
        ],
      },
      {
        name: 'armours',
        title: 'All Armour Items',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [
              {
                type: 'item',
                options: {
                  filter: '"equippable" in category && "armour" in subCategory',
                },
              },
            ],
          },
        ],
      },
      {
        name: 'jewelry',
        title: 'All Jewelry Items',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [
              {
                type: 'item',
                options: {
                  filter: '"equippable" in category && "jewelry" in subCategory',
                },
              },
            ],
          },
        ],
      },
  
      // OTHER CONTENT TYPES
      { name: 'allSkills', title: 'All Skills', type: 'array', of: [{ type: 'reference', to: [{ type: 'skill' }] }] },
      { name: 'allTraits', title: 'All Traits', type: 'array', of: [{ type: 'reference', to: [{ type: 'trait' }] }] },
      { name: 'allClasses', title: 'All Character Classes', type: 'array', of: [{ type: 'reference', to: [{ type: 'characterClass' }] }] },
      { name: 'allRaces', title: 'All Character Races', type: 'array', of: [{ type: 'reference', to: [{ type: 'characterRace' }] }] },
      { name: 'allEnemies', title: 'All Enemies', type: 'array', of: [{ type: 'reference', to: [{ type: 'enemy' }] }] },
      { name: 'allFactions', title: 'All Factions', type: 'array', of: [{ type: 'reference', to: [{ type: 'faction' }] }] },
      { name: 'allNPCs', title: 'All NPCs', type: 'array', of: [{ type: 'reference', to: [{ type: 'npc' }] }] },
      { name: 'allQuests', title: 'All Quests', type: 'array', of: [{ type: 'reference', to: [{ type: 'quest' }] }] },
      { name: 'allLocations', title: 'All Locations', type: 'array', of: [{ type: 'reference', to: [{ type: 'location' }] }] },
      { name: 'allLore', title: 'All Lore Entries', type: 'array', of: [{ type: 'reference', to: [{ type: 'lore' }] }] },
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
  