import ProjectBadge from '@/components/project-badge'
import { currentProjectState, projectRoleState } from '@/contexts/atoms/annotation'
import { Role_Types_Enum } from '@/generated/graphql'
import {
  EuiCollapsibleNavGroup,
  EuiDescriptionList,
  EuiFlexItem,
  EuiHeaderSectionItemButton,
  EuiHorizontalRule,
  EuiIcon,
  EuiLink,
  EuiListGroupItem,
  EuiShowFor,
  EuiText,
} from '@elastic/eui'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import { setCookie } from 'nookies'
import React, { useEffect, useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'
import CollapsibleNavAdmin from './CollapsibleNav/CollapsibleNavAdmin'
import CollapsibleNavAnnotator from './CollapsibleNav/CollapsibleNavAnnotator'
import CollapsibleNavApprover from './CollapsibleNav/CollapsibleNavApprover'

const EuiCollapsibleNav = dynamic(
  () => import('@elastic/eui').then((mod) => mod.EuiCollapsibleNav),
  {
    ssr: false,
  },
)

const CollapsibleNavComponents: Record<Role_Types_Enum, React.ElementType> = {
  [Role_Types_Enum.Annotator]: CollapsibleNavAnnotator,
  [Role_Types_Enum.AnnotationApprover]: CollapsibleNavApprover,
  [Role_Types_Enum.ProjectAdmin]: CollapsibleNavAdmin,
}

interface CollapsibleNavProps {
  defaultNavIsDocked: boolean
}

const CollapsibleNav: React.FC<CollapsibleNavProps> = ({ defaultNavIsDocked }) => {
  const [navIsOpen, setNavIsOpen] = useState(true)

  const [navIsDocked, setNavIsDocked] = useState(defaultNavIsDocked)

  useEffect(() => {
    setCookie(null, 'navAnnoIsDocked', `${navIsDocked}`, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
  }, [navIsDocked])
  /**
   * Accordion toggling
   */
  const [openGroups, setOpenGroups] = useState(['Description', 'Progress'])

  // Save which groups are open and which are not with state and local store
  const toggleAccordion = (isOpen: boolean, title?: string) => {
    if (!title) return
    const itExists = openGroups.includes(title)
    if (isOpen) {
      if (itExists) return
      openGroups.push(title)
    } else {
      const index = openGroups.indexOf(title)
      if (index > -1) {
        openGroups.splice(index, 1)
      }
    }
    setOpenGroups([...openGroups])
    // localStorage.setItem('openNavGroups', JSON.stringify(openGroups))
  }

  const currentProject = useRecoilValue(currentProjectState)
  const projectRole = useRecoilValue(projectRoleState)

  const projectDescriptions = useMemo(() => {
    const isProjectAdmin = projectRole === Role_Types_Enum.ProjectAdmin
    return currentProject
      ? [
          {
            title: 'Name',
            description: (
              <EuiText className="eui-textTruncate" title={currentProject.name}>
                {currentProject.name}
              </EuiText>
            ),
          },
          {
            title: 'Type',
            description: <ProjectBadge projectType={currentProject.project_type} />,
          },
          ...(isProjectAdmin
            ? [
                {
                  title: '',
                  description: (
                    <NextLink href="/projects/[pid]" as={`/projects/${currentProject.id}`}>
                      <EuiLink href={`/projects/${currentProject.id}`}>Setting</EuiLink>
                    </NextLink>
                  ),
                },
              ]
            : []),
        ]
      : []
  }, [currentProject, projectRole])

  const CollapsibleNavComponent = CollapsibleNavComponents[projectRole]

  return (
    <EuiCollapsibleNav
      aria-label="Left navigation"
      isOpen={navIsOpen}
      isDocked={navIsDocked}
      button={
        <EuiHeaderSectionItemButton
          aria-label="Toggle main navigation"
          onClick={() => setNavIsOpen(!navIsOpen)}
        >
          <EuiIcon type={'menu'} size="m" aria-hidden="true" />
        </EuiHeaderSectionItemButton>
      }
      onClose={() => setNavIsOpen(false)}
    >
      {currentProject && (
        <EuiFlexItem grow={false} style={{ flexShrink: 0 }}>
          <EuiCollapsibleNavGroup
            title="Project Description"
            iconType="training"
            isCollapsible={true}
            initialIsOpen={true}
            onToggle={(isOpen) => toggleAccordion(isOpen, 'Description')}
          >
            <EuiDescriptionList
              style={{ padding: 4 }}
              textStyle="reverse"
              listItems={projectDescriptions}
            />
          </EuiCollapsibleNavGroup>
        </EuiFlexItem>
      )}
      <EuiHorizontalRule margin="none" />

      <CollapsibleNavComponent />

      <EuiShowFor sizes={['l', 'xl']}>
        <EuiCollapsibleNavGroup>
          <EuiListGroupItem
            size="xs"
            color="subdued"
            label={`${navIsDocked ? 'Undock' : 'Dock'} navigation`}
            onClick={() => {
              setNavIsDocked(!navIsDocked)
            }}
            iconType={navIsDocked ? 'lock' : 'lockOpen'}
          />
        </EuiCollapsibleNavGroup>
      </EuiShowFor>
    </EuiCollapsibleNav>
  )
}

export default CollapsibleNav
