import {dropdownAetherAlignments, dropdownElementalTypes} from '../fundamentals/fundamentals'
import {createRadioDropdown} from '../schemaVariables/schemaVariables'
import {validateRange} from '../utils/validation'

export const aethericResonance = {
  name: 'aethericResonance',
  title: 'Aetheric Resonance',
  type: 'object',
  fields: [
    createRadioDropdown('primaryAlignment', 'Primary Alignment', dropdownAetherAlignments),
    {
      name: 'resonanceStrength',
      title: 'Resonance Strength',
      type: 'number',
      validation: validateRange(1, 10, 'Resonance strength'),
    },
    {
      name: 'elementalAffinities',
      title: 'Elemental Affinities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            createRadioDropdown('element', 'Element', dropdownElementalTypes),
            {
              name: 'affinity',
              title: 'Affinity Level',
              type: 'number',
              validation: validateRange(1, 5, 'Affinity level'),
            },
          ],
        },
      ],
    },
  ],
}

export const metaphysicalNode = {
  name: 'metaphysicalNode',
  title: 'Metaphysical Node',
  type: 'object',
  fields: [
    {
      name: 'nodeType',
      title: 'Node Type',
      type: 'string',
      options: {
        list: [
          {title: 'Vitalis Wellspring', value: 'vitalis_wellspring'},
          {title: 'Entropic Void', value: 'entropic_void'},
          {title: 'Aetheric Nexus', value: 'aetheric_nexus'},
          {title: 'Shatterpoint', value: 'shatterpoint'},
          {title: 'Veil Tear', value: 'veil_tear'},
        ],
      },
    },
    {
      name: 'stability',
      title: 'Node Stability',
      type: 'number',
      validation: validateRange(0, 100, 'Node stability'),
    },
    {
      name: 'pulseFrequency',
      title: 'Pulse Frequency (minutes)',
      type: 'number',
      validation: validateRange(1, 60, 'Pulse frequency'),
    },
    {
      name: 'effects',
      title: 'Node Effects',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Effect Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Resource Generation', value: 'resource'},
                  {title: 'Stat Modification', value: 'stat'},
                  {title: 'Environmental Change', value: 'environment'},
                  {title: 'Creature Spawning', value: 'spawn'},
                ],
              },
            },
            {
              name: 'radius',
              title: 'Effect Radius',
              type: 'number',
              validation: validateRange(1, 100, 'Effect radius'),
            },
            {
              name: 'potency',
              title: 'Effect Potency',
              type: 'number',
              validation: validateRange(1, 10, 'Effect potency'),
            },
          ],
        },
      ],
    },
  ],
}

export const metaphysicalCondition = {
  name: 'metaphysicalCondition',
  title: 'Metaphysical Condition',
  type: 'object',
  fields: [
    {
      name: 'condition',
      title: 'Condition Type',
      type: 'string',
      options: {
        list: [
          {title: 'Aether Saturation', value: 'aether_saturation'},
          {title: 'Void Touch', value: 'void_touch'},
          {title: 'Vitalis Blessing', value: 'vitalis_blessing'},
          {title: 'Reality Fracture', value: 'reality_fracture'},
        ],
      },
    },
    {
      name: 'severity',
      title: 'Condition Severity',
      type: 'number',
      validation: validateRange(1, 5, 'Condition severity'),
    },
    {
      name: 'duration',
      title: 'Duration (turns)',
      type: 'number',
      validation: validateRange(1, 100, 'Duration'),
    },
    {
      name: 'manifestation',
      title: 'Visual Manifestation',
      type: 'string',
      options: {
        list: [
          {title: 'Aetheric Glow', value: 'glow'},
          {title: 'Dark Tendrils', value: 'tendrils'},
          {title: 'Nature Growth', value: 'growth'},
          {title: 'Reality Distortion', value: 'distortion'},
        ],
      },
    },
  ],
}
