import {checkDropdown} from '../schemaVariables'
import {
  dropdownPrimaryStats,
  dropdownSecondaryStats,
  dropdownTertiaryStats,
} from '../../fundamentals/fundamentals'

export const skillOffensiveStats = () => ({
  name: 'offensiveStats',
  title: 'Offensive Stats',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        checkDropdown(
          'stat',
          'Affected Stat',
          dropdownPrimaryStats.concat(dropdownSecondaryStats).concat(dropdownTertiaryStats),
        ),
        {name: 'amount', title: 'Amount', type: 'number'},
        {name: 'duration', title: 'Duration', type: 'number'},
      ],
    },
  ],
})

export const skillDefensiveStats = () => ({
  name: 'defensiveStats',
  title: 'Defensive Stats',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        checkDropdown(
          'stat',
          'Affected Stat',
          dropdownPrimaryStats.concat(dropdownSecondaryStats).concat(dropdownTertiaryStats),
        ),
        {name: 'amount', title: 'Amount', type: 'number'},
        {name: 'duration', title: 'Duration', type: 'number'},
      ],
    },
  ],
})

export const skillStatEffects = () => ({
  name: 'statEffects',
  title: 'Stat Effects',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        checkDropdown(
          'stat',
          'Affected Stat',
          dropdownPrimaryStats.concat(dropdownSecondaryStats).concat(dropdownTertiaryStats),
        ),
        {name: 'amount', title: 'Amount', type: 'number'},
        {name: 'duration', title: 'Duration', type: 'number'},
      ],
    },
  ],
})
