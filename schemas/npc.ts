// ===========================
// schemas/npc.ts
// ===========================

import {
    dropdownNpcRoleTypes,
    dropdownCharacterRaces,
    dropdownCharacterClasses,
  } from '../fundamentals/fundamentals'
  
  import {
    createRadioDropdown,
    checkDropdown,
    needsRoleType,
  } from '../schemaVariables/schemaVariables'
  
  import { ValidationRule } from '../types/types'
  

  
  export default {
    name: 'npc',
    title: 'NPC (Non-Player Character)',
    type: 'document',
    fields: [
      { name: 'name', title: 'Full Name or Identifier', type: 'string', validation: (Rule: ValidationRule) => Rule.required() },
      { name: 'slug', title: 'Slug / ID', type: 'slug', options: { source: 'name' }, validation: (Rule: ValidationRule) => Rule.required() },
      { name: 'portrait', title: 'Portrait', type: 'image', options: { hotspot: true } },
  
      // Core Role Type
      createRadioDropdown('roleType', 'What type of NPC is this?', dropdownNpcRoleTypes),
  
      // Optional Lore Link
      { name: 'loreEntry', title: 'Linked Lore Entry', type: 'reference', to: [{ type: 'lore' }] },
  
      // Dialogue
      { name: 'dialogueKey', title: 'Dialogue Trigger Key', type: 'string', description: 'Used to fetch NPC dialogue in frontend systems' },
  
      // Inventory / Trades (only for Merchants)
      {
        name: 'inventory',
        title: 'Trade Inventory (if Merchant)',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'item' }] }],
        ...needsRoleType('Merchant'),
      },
  
      // Quest hook
      {
        name: 'questReference',
        title: 'Associated Quest',
        type: 'reference',
        to: [{ type: 'quest' }],
        // ...needsRoleType('Guide', 'Elite Figure', 'Enemy-Turned', 'Scholar', 'Healer'),
      },
  
      // Optional Class and Race Tags
      checkDropdown('raceTags', 'What race(s) apply?', dropdownCharacterRaces),
      checkDropdown('classTags', 'What class(es) relate to this NPC?', dropdownCharacterClasses),
    ],
  
    preview: {
      select: {
        title: 'name',
        subtitle: 'roleType',
        media: 'portrait',
      },
      prepare({ title, subtitle, media }: { title?: string; subtitle?: string; media?: any }) {
        return {
          title: title || 'Unnamed NPC',
          subtitle: subtitle || 'No role defined',
          media,
        }
      },
    },
  }
  