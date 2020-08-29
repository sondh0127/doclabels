import AddProjectForm from '@/components/dashboard/AddProjectForm'
import Heading from '@/components/dashboard/Heading'
import MyProjects, { DashBoardVariables } from '@/components/dashboard/MyProjects'
import MainLayout from '@/components/layouts/main_layout'
import { PROJECT_TYPE_LABLE } from '@/constants'
import { Project_Types_Enum, Role_Types_Enum } from '@/generated/graphql'
import { useToastsComponent } from '@/hooks/useGlobalToasts'
import { useUser } from '@/hooks/useUser'
import {
  EuiFieldSearch,
  EuiFilterButton,
  EuiFilterGroup,
  EuiFilterSelectItem,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiHorizontalRule,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPopover,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useImmer } from 'use-immer'

const Dashboard: React.FC = () => {
  const router = useRouter()
  const { user, loading: userLoading } = useUser()
  useEffect(() => {
    if (!user && !userLoading) {
      router.push('/api/login')
    }
  }, [user, userLoading])

  const [filters, updateFilters] = useImmer<DashBoardVariables>({
    name_or_description: '%%',
    project_types: Object.values(Project_Types_Enum),
    role_type: 'mine',
  })

  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false)

  const onButtonClick = () => {
    setIsPopoverOpen(!isPopoverOpen)
  }

  const closePopover = () => {
    setIsPopoverOpen(false)
  }

  const items = useMemo<
    Array<{ name: string; checked: 'on' | 'off'; value: Project_Types_Enum }>
  >(() => {
    return Object.values(Project_Types_Enum).map((item) => ({
      name: PROJECT_TYPE_LABLE[item],
      checked: filters.project_types?.includes(item) ? 'on' : 'off',
      value: item,
    }))
  }, [filters.project_types])

  const hasFilters = useMemo<boolean>(() => {
    return (
      filters.name_or_description !== `%%` ||
      filters.project_types.length < Object.values(Project_Types_Enum).length
    )
  }, [filters.name_or_description, filters.project_types.length])

  const removeFilters = useCallback(() => {
    updateFilters((draft) => {
      draft.name_or_description = `%%`
      draft.project_types = Object.values(Project_Types_Enum)
    })
  }, [])

  const ToastList = useToastsComponent()

  let flyout: React.ReactNode
  if (isFlyoutVisible) {
    flyout = (
      <EuiFlyout
        onClose={() => setIsFlyoutVisible(false)}
        aria-labelledby="addProjectFlayout"
        size="s"
        maxWidth={false}
      >
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2 id="addProjectFlayout">Create new project</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiText>
            <p>Fill the form then click submit to create new project</p>
          </EuiText>
          <EuiSpacer />

          <AddProjectForm />
        </EuiFlyoutBody>
      </EuiFlyout>
    )
  }

  return (
    <MainLayout>
      <EuiPage restrictWidth>
        <EuiPageBody component="div">
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="m">
                <h1>Dashboard</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
          </EuiPageHeader>

          <EuiPageContent>
            <Heading onButtonClick={() => setIsFlyoutVisible(true)} />
            <EuiHorizontalRule size="full" />
            <EuiPageContentBody>
              <EuiFlexGroup direction="column">
                <EuiFlexItem>
                  <EuiFlexGroup gutterSize="s" alignItems="center">
                    <EuiFlexItem grow={false}>
                      <EuiText>Filter</EuiText>
                    </EuiFlexItem>
                    <EuiFlexItem>
                      <EuiFieldSearch
                        style={{ maxWidth: 400 }}
                        placeholder="Find by name or description"
                        isClearable={true}
                        onSearch={(value) => {
                          updateFilters((draft) => {
                            draft.name_or_description = `%${value}%`
                          })
                        }}
                      />
                    </EuiFlexItem>
                    <EuiFlexItem>
                      <EuiFilterGroup>
                        <EuiFilterButton
                          withNext
                          hasActiveFilters={filters.role_type === 'mine'}
                          onClick={() =>
                            updateFilters((draft) => {
                              draft.role_type = 'mine'
                            })
                          }
                        >
                          My Project
                        </EuiFilterButton>
                        <EuiFilterButton
                          withNext
                          hasActiveFilters={filters.role_type === Role_Types_Enum.Annotator}
                          onClick={() =>
                            updateFilters((draft) => {
                              draft.role_type = Role_Types_Enum.Annotator
                            })
                          }
                        >
                          Contributions
                        </EuiFilterButton>
                        <EuiFilterButton
                          withNext
                          hasActiveFilters={
                            filters.role_type === Role_Types_Enum.AnnotationApprover
                          }
                          onClick={() =>
                            updateFilters((draft) => {
                              draft.role_type = Role_Types_Enum.AnnotationApprover
                            })
                          }
                        >
                          Approvals
                        </EuiFilterButton>
                        <EuiFilterButton
                          hasActiveFilters={filters.role_type === Role_Types_Enum.ProjectAdmin}
                          onClick={() =>
                            updateFilters((draft) => {
                              draft.role_type = Role_Types_Enum.ProjectAdmin
                            })
                          }
                        >
                          Managers
                        </EuiFilterButton>
                        <EuiPopover
                          id="popoverFilter"
                          ownFocus
                          button={
                            <EuiFilterButton
                              iconType="arrowDown"
                              onClick={onButtonClick}
                              isSelected={isPopoverOpen}
                              numFilters={items.length}
                              hasActiveFilters={true}
                              numActiveFilters={filters.project_types?.length}
                            >
                              Project Types
                            </EuiFilterButton>
                          }
                          isOpen={isPopoverOpen}
                          closePopover={closePopover}
                          panelPaddingSize="none"
                          withTitle
                        >
                          <div className="euiFilterSelect__items">
                            {items.map((item, index) => (
                              <EuiFilterSelectItem
                                checked={item.checked}
                                key={index}
                                onClick={() => {
                                  updateFilters((draft) => {
                                    const idx = draft.project_types.findIndex(
                                      (ele) => ele === item.value,
                                    )
                                    if (idx !== -1) {
                                      draft.project_types.splice(idx, 1)
                                    } else {
                                      draft.project_types.push(item.value)
                                    }
                                  })
                                }}
                              >
                                {item.name}
                              </EuiFilterSelectItem>
                            ))}
                          </div>
                        </EuiPopover>
                      </EuiFilterGroup>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiFlexItem>
                <EuiFlexItem>
                  <MyProjects
                    filterVariables={filters}
                    hasFilters={hasFilters}
                    removeFilters={removeFilters}
                  />
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
      {flyout}
      <ToastList />
    </MainLayout>
  )
}

export default Dashboard
