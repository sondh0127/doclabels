import Hero from '@/components/home/hero'
import FormatIcon from '@/components/Icons/FormatIcon'
import GroupIcon from '@/components/Icons/GroupIcon'
import TextIcon from '@/components/Icons/TextIcon'
import MainLayout from '@/components/layouts/main_layout'
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPanel,
  EuiText,
  EuiTitle,
  EuiFlexGrid,
  EuiFlexItem,
} from '@elastic/eui'
import React from 'react'
import { NextPage } from 'next'
import WorkflowIcon from '@/components/Icons/WorkflowIcon'
import ProcessStep from '@/components/home/ProcessStep'

const processData = [
  {
    key: '#1',
    title: 'Create project',
    description:
      'Enter your project info, choose and project type and submit to create your annotation project',
    url: 'https://sondh0127.s3-ap-southeast-1.amazonaws.com/0.Create+project.mp4',
  },
  {
    key: '#2',
    title: 'Add contributor',
    description: '',
    url: 'https://sondh0127.s3-ap-southeast-1.amazonaws.com/1.Add+contributor.mp4',
  },
  {
    key: '#3',
    title: 'Config label',
    description: '',
    url: 'https://sondh0127.s3-ap-southeast-1.amazonaws.com/2.Config+label.mp4',
  },
  {
    key: '#4',
    title: 'Write guideline',
    description: '',
    url: 'https://sondh0127.s3-ap-southeast-1.amazonaws.com/3.+Write+guideline.mp4',
  },
  {
    key: '#5',
    title: 'Import documents - Text',
    description: '',
    url: 'https://sondh0127.s3-ap-southeast-1.amazonaws.com/4.1.+Import+documents-Text.mp4',
  },
  {
    key: '#6',
    title: 'Import document - PDF ',
    description: '',
    url: 'https://sondh0127.s3-ap-southeast-1.amazonaws.com/4.2.Import+document-PDF.mp4',
  },
  {
    key: '#7',
    title: 'Make annotation - Sentiment Analysis ',
    description: '',
    url: 'https://sondh0127.s3-ap-southeast-1.amazonaws.com/5.1.Make-annotation-SA.mp4',
  },
  {
    key: '#8',
    title: 'Make annotation - Translation',
    description: '',
    url: 'https://sondh0127.s3-ap-southeast-1.amazonaws.com/5.2.Make-annotation-Trans.mp4',
  },
  {
    key: '#9',
    title: 'Make annotation - Named Entity Recognition',
    description: '',
    url: 'https://sondh0127.s3-ap-southeast-1.amazonaws.com/5.3.Make-annotation-NER.mp4',
  },
  {
    key: '#10',
    title: 'Make annotation - PDF Labeling',
    description: '',
    url: 'https://sondh0127.s3-ap-southeast-1.amazonaws.com/5.4.Make-annotation-PDF.mp4',
  },
  {
    key: '#11',
    title: 'Approved',
    description: '',
    url: 'https://sondh0127.s3-ap-southeast-1.amazonaws.com/6.+Approved.mp4',
  },
  {
    key: '#12',
    title: 'Review and Export - Json',
    description: '',
    url: 'https://sondh0127.s3-ap-southeast-1.amazonaws.com/7.+Review+and+Export.mp4',
  },
  {
    key: '#13',
    title: 'Review and Export - CSV',
    description: '',
    url: 'https://sondh0127.s3-ap-southeast-1.amazonaws.com/7.1.+Review+and+Export-CSV.mp4',
  },
]

const featureData = [
  {
    key: '#1',
    image: <WorkflowIcon />,
    title: 'Complete Annotation Workflow',
    description: 'With Doclabels workflow, you have the complete process to labelling your data',
  },
  {
    key: '#2',
    image: <GroupIcon />,
    title: 'Team Collaboration',
    description: `Define the guidelines and invite others to join your project. Doclabels will
    take care of automatic task assignment and annotation adjudication`,
  },
  {
    key: '#3',
    image: <TextIcon />,
    title: 'Productive Annotation Tool',
    description:
      'Doclabels provided variety type annotation tool, which have the best UI/UX to improve productivity',
  },
  {
    key: '#4',
    image: <FormatIcon />,
    title: 'PDF Annotation',
    description: 'In Doclabels, your team can annotate directly over the native PDF',
  },
]

const Index: NextPage = () => (
  <MainLayout>
    <Hero />
    <EuiPage restrictWidth={1140}>
      <EuiPageBody>
        <EuiPageHeader>
          <EuiPageHeaderSection style={{ flex: 1 }}>
            <EuiTitle size="m">
              <h2 style={{ textAlign: 'center' }}>Features</h2>
            </EuiTitle>
          </EuiPageHeaderSection>
        </EuiPageHeader>

        <EuiFlexGrid columns={2}>
          {featureData.map((item) => (
            <EuiFlexItem key={`featureData-${item.key}`}>
              <EuiPanel
                paddingSize="m"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <div>{item.image}</div>
                <EuiTitle size="s">
                  <h5>{item.title}</h5>
                </EuiTitle>
                <EuiText textAlign="center">
                  <p>{item.description}</p>
                </EuiText>
              </EuiPanel>
            </EuiFlexItem>
          ))}
        </EuiFlexGrid>
      </EuiPageBody>
    </EuiPage>
    {processData.map((item) => (
      <ProcessStep
        key={`processData-${item.key}`}
        title={item.title}
        description={item.description}
        url={item.url}
      />
    ))}
  </MainLayout>
)

export default Index
