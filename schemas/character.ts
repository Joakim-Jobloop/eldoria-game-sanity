export default {
  name: 'character', // fixed typo
  title: 'Character',
  type: 'document',
  fields: [
    {
      name: 'playerInventory', // fixed typo
      title: 'Player Inventory',
      type: 'object',
      fields: [
        {
          name: 'currency',
          title: 'Currency',
          type: 'object',
          fields: [
            { name: 'gold', title: 'Gold', type: 'number' },
            { name: 'gems', title: 'Gems', type: 'number' },
          ],
        },
        {
          name: 'items',
          title: 'Items',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'item' }] }],
        },
        {
          name: 'weapon',
          title: 'Starter Weapon',
          type: 'reference', // changed from array to single reference
          to: [{ type: 'weapon' }],
        },
      ],
    },
    {
      name: 'class',
      title: 'Character Class',
      type: 'reference',
      to: [{ type: 'characterClass' }],
    },
    {
      name: 'race',
      title: 'Character Race',
      type: 'reference',
      to: [{ type: 'characterRace' }],
    },
  ],
};
