import { Card, Code, Stack } from '@sanity/ui'
import { ComponentProps } from 'react'
import { UserViewComponent } from 'sanity/desk'

/**
 * JSON View component that displays the document's JSON structure
 */
export function JsonView(props: ComponentProps<UserViewComponent>) {
  const { document } = props
  const { displayed } = document

  return (
    <Card padding={4} style={{ height: '100%', overflow: 'auto' }}>
      <Stack space={3}>
        <Code
          language="json"
          size={1}
          style={{
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace',
            fontSize: '12px',
            lineHeight: '1.5',
          }}
        >
          {JSON.stringify(displayed, null, 2)}
        </Code>
      </Stack>
    </Card>
  )
}
