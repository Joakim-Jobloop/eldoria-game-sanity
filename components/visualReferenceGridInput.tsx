// components/VisualReferenceGridInput.tsx

import React, {forwardRef} from 'react'
import {
  Box,
  Card,
  Flex,
  Grid,
  Text,
  Stack,
  Button,
  Tooltip,
} from '@sanity/ui'
import {TrashIcon} from '@sanity/icons'
import {set, unset} from 'sanity'

type Props = {
  value?: any[]
  onChange: (patch: any) => void
  renderDefault?: () => React.ReactNode
  columns?: number
  compact?: boolean
}

export const VisualReferenceGridInput = forwardRef(function VisualReferenceGridInput(
  props: Props,
  ref
) {
  const {
    value = [],
    onChange,
    renderDefault,
    columns = 4,
    compact = true,
  } = props

  const handleRemove = (itemToRemove: any) => {
    if (!itemToRemove._key) return
    const filtered = value.filter((v: any) => v._key !== itemToRemove._key)
    onChange(filtered.length > 0 ? set(filtered) : unset())
  }

  const getLabel = (item: any) =>
    item?.title || item?.name || item?._ref || item?._key?.slice(0, 6) || 'Unnamed'

  const getImageUrl = (item: any): string | null => {
    if (typeof item?.image === 'string') return item.image
    if (item?.image?.asset?._ref) {
      return `https://cdn.sanity.io/images/YOUR_PROJECT_ID/YOUR_DATASET/${item.image.asset._ref
        .replace('image-', '')
        .replace(/-(jpg|png|webp|jpeg)$/, '.$1')}`
    }
    return null
  }

  return (
    <Stack space={3} ref={ref as any}>
      <Grid columns={columns} gap={compact ? 2 : 3}>
        {value.map((item: any) => (
          <Tooltip
            key={item._key ?? item._ref}
            content={
              <Box padding={2}>
                <Text size={1}>{getLabel(item)}</Text>
              </Box>
            }
            placement="top"
            fallbackPlacements={['bottom']}
          >
            <Card
              tone="default"
              padding={compact ? 1 : 2}
              radius={2}
              shadow={1}
              style={{textAlign: 'center'}}
            >
              <Flex direction="column" align="center" justify="center" style={{height: '100%'}}>
                {getImageUrl(item) && (
                  <Box marginBottom={2}>
                    <img
                      src={getImageUrl(item)!}
                      alt={getLabel(item)}
                      style={{
                        width: '48px',
                        height: '48px',
                        objectFit: 'contain',
                        borderRadius: '4px',
                      }}
                    />
                  </Box>
                )}
                <Text size={1} weight="semibold">{getLabel(item)}</Text>
                <Box marginTop={2}>
                  <Button
                    icon={TrashIcon}
                    tone="critical"
                    mode="ghost"
                    onClick={() => handleRemove(item)}
                    aria-label="Remove item"
                  />
                </Box>
              </Flex>
            </Card>
          </Tooltip>
        ))}
      </Grid>

      {/* Default "+" control */}
      <Box>{renderDefault?.()}</Box>
    </Stack>
  )
})
