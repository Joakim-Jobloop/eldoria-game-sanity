// =======================
// utils/formatters.ts
// =======================

/**
 * Takes a simple string array like ['Sword', 'Axe']
 * and converts it to Sanity dropdown format:
 * [{ title: 'Sword', value: 'sword' }, { title: 'Axe', value: 'axe' }]
 */
export function formatToDropdownOptions(list: string[]): {title: string; value: string}[] {
  return list.map((entry) => ({
    title: entry,
    value: entry.toLowerCase().replace(/\s+/g, '_'),
  }))
}
