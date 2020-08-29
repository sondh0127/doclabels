import React, { Fragment, FC } from 'react'
import { EuiButton, EuiEmptyPrompt } from '@elastic/eui'
import NextLink from 'next/link'

const NotFoundPage: FC = () => (
  <EuiEmptyPrompt
    iconType="editorStrike"
    title={<h2>Ack! There&apos;s nothing here.</h2>}
    body={
      <Fragment>
        <p>You found a page that doesn&apos;t exist.</p>
      </Fragment>
    }
    actions={
      <NextLink href="/">
        <EuiButton color="primary" fill>
          Go Home
        </EuiButton>
      </NextLink>
    }
  />
)

export default NotFoundPage
