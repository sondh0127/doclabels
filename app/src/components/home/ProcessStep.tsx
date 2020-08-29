import { EuiPage, EuiPageBody, EuiPageHeader, EuiPageHeaderSection, EuiText } from '@elastic/eui'
import React from 'react'
import ReactPlayer from 'react-player'

interface ProcessStepProps {
  title: string
  description: string
  url: string
}

const ProcessStep: React.FC<ProcessStepProps> = ({ title, description, url }) => {
  return (
    <EuiPage restrictWidth={1140}>
      <EuiPageBody>
        <EuiPageHeader>
          <EuiPageHeaderSection style={{ flex: 1 }}>
            <div>
              <EuiText>
                <h2>{title}</h2>
              </EuiText>
              <EuiText>
                <p>{description}</p>
              </EuiText>
            </div>
          </EuiPageHeaderSection>
        </EuiPageHeader>
        <div style={{ padding: '0 32px' }}>
          <div style={{ position: 'relative', paddingTop: '56.25%' }}>
            <ReactPlayer
              style={{ position: 'absolute', top: 0, left: 0 }}
              url={url}
              width="100%"
              height="100%"
              muted={true}
              playing={true}
              loop={true}
              playbackRate={1.5}
            />
          </div>
        </div>
      </EuiPageBody>
    </EuiPage>
  )
}

export default ProcessStep
