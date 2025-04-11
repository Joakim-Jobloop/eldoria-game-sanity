// ================================
// schemas/gameContentEntryPoint.ts
// ================================

import {filteredItemReferenceArray} from '../../schemaVariables/schemaVariables'

export default {
  name: 'gameContentEntryPoint',
  title: 'Game Content (Master Reference)',
  type: 'document',
  groups: [
    {name: 'documentation', title: 'Documentation & Guidelines'},
    {name: 'items', title: 'Items & Equipment'},
    {name: 'characters', title: 'Characters & NPCs'},
    {name: 'world', title: 'World Content'},
    {name: 'gameplay', title: 'Gameplay Elements'},
  ],
  fields: [
    // Documentation block
    {
      name: 'documentation',
      title: 'Documentation',
      type: 'reference',
      to: [{type: 'documentationReference'}],
      group: 'documentation',
    },

    // ITEM REFERENCES (grouped by category/subcategory)
    {
      name: 'craftingContent',
      title: 'Crafting Content',
      type: 'object',
      group: 'items',
      fields: [
        filteredItemReferenceArray(
          'item',
          'craftingIngredients',
          'All Crafting Ingredients',
          'crafting_item',
          'ingredient',
        ),
        filteredItemReferenceArray(
          'item',
          'craftingMaterials',
          'All Crafting Materials',
          'crafting_item',
          'material',
        ),
        filteredItemReferenceArray(
          'item',
          'craftingSpices',
          'All Crafting Spices',
          'crafting_item',
          'spice',
        ),
      ],
    },

    {
      name: 'consumableContent',
      title: 'Consumable Items',
      type: 'object',
      group: 'items',
      fields: [
        filteredItemReferenceArray('item', 'potions', 'All Potion Items', 'consumable', 'potion'),
        filteredItemReferenceArray('item', 'foods', 'All Food Items', 'consumable', 'food'),
      ],
    },

    {
      name: 'equipmentContent',
      title: 'Equipment',
      type: 'object',
      group: 'items',
      fields: [
        filteredItemReferenceArray('item', 'weapons', 'All Weapons', 'equippable', 'weapon'),
        filteredItemReferenceArray('item', 'armours', 'All Armour Items', 'equippable', 'armour'),
        filteredItemReferenceArray('item', 'jewelry', 'All Jewelry Items', 'equippable', 'jewelry'),
      ],
    },

    // CHARACTER CONTENT
    {
      name: 'characterContent',
      title: 'Character Content',
      type: 'object',
      group: 'characters',
      fields: [
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
        filteredItemReferenceArray('characterClass', 'allClasses', 'All Character Classes'),
        filteredItemReferenceArray('characterRace', 'allRaces', 'All Character Races'),
      ],
    },

    // WORLD CONTENT
    {
      name: 'worldContent',
      title: 'World Content',
      type: 'object',
      group: 'world',
      fields: [
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
          name: 'allLocations',
          title: 'All Locations',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'location'}]}],
        },
      ],
    },

    // GAMEPLAY CONTENT
    {
      name: 'gameplayContent',
      title: 'Gameplay Content',
      type: 'object',
      group: 'gameplay',
      fields: [
        {
          name: 'allQuests',
          title: 'All Quests',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'quest'}]}],
        },
        {
          name: 'allLore',
          title: 'All Lore Entries',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'lore'}]}],
        },
      ],
    },
  ],

  preview: {
    select: {
      craftingIngredients: 'craftingContent.craftingIngredients',
      weapons: 'equipmentContent.weapons',
      skills: 'characterContent.allSkills',
      npcs: 'worldContent.allNPCs',
      quests: 'gameplayContent.allQuests',
    },
    prepare(selection) {
      const counts = {
        items: (selection.craftingIngredients?.length || 0) + (selection.weapons?.length || 0),
        skills: selection.skills?.length || 0,
        npcs: selection.npcs?.length || 0,
        quests: selection.quests?.length || 0,
      }

      return {
        title: '📦 Game Content Master Reference',
        subtitle: `Items: ${counts.items} | Skills: ${counts.skills} | NPCs: ${counts.npcs} | Quests: ${counts.quests}`,
      }
    },
  },
}
