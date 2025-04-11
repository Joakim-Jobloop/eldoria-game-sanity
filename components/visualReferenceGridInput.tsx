// components/VisualReferenceGridInput.tsx

import React from 'react'
import {Reference, set, unset} from 'sanity'
import {Box, Card, Flex, Grid, Stack, Text} from '@sanity/ui'
import {VisualReferenceInputProps} from './visualReferenceArray'

export function VisualReferenceGridInput(props: VisualReferenceInputProps) {
  const {value, onChange, schemaType} = props
  const members = value || []

  const handleToggle = (item: Reference) => {
    const exists = members.some((ref: Reference) => ref._ref === item._ref)
    onChange(
      exists ? unset() : set([...members, {_key: item._ref, _ref: item._ref, _type: 'reference'}]),
    )
  }

  return (
    <Stack space={4}>
      <Grid columns={[1, 2, 3]} gap={3}>
        {schemaType.options?.list?.map((item: any) => {
          const isSelected = members.some((ref: Reference) => ref._ref === item._ref)
          return (
            <Card
              key={item._ref}
              tone={isSelected ? 'primary' : 'default'}
              padding={3}
              onClick={() => handleToggle(item)}
              style={{cursor: 'pointer'}}
            >
              <Flex align="center">
                {item.media && (
                  <Box marginRight={3} style={{width: '40px', height: '40px'}}>
                    <img
                      src={item.media}
                      alt={item.title}
                      style={{width: '100%', height: '100%', objectFit: 'cover'}}
                    />
                  </Box>
                )}
                <Stack space={2}>
                  <Text weight="semibold">{item.title}</Text>
                  {item.subtitle && (
                    <Text size={1} muted>
                      {item.subtitle}
                    </Text>
                  )}
                </Stack>
              </Flex>
            </Card>
          )
        })}
      </Grid>
    </Stack>
  )
}
