import ProjectList, { ProjectsVariables } from '@/components/explore/ProjectList'
import MainLayout from '@/components/layouts/main_layout'
import { PROJECT_TYPE_LABLE } from '@/constants'
import { Project_Types_Enum } from '@/generated/graphql'
import { useToastsComponent } from '@/hooks/useGlobalToasts'
import {
  EuiFieldSearch,
  EuiFilterButton,
  EuiFilterGroup,
  EuiFilterSelectItem,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPopover,
  EuiText,
  EuiTitle,
} from '@elastic/eui'
import React, { useCallback, useMemo, useState } from 'react'
import { useImmer } from 'use-immer'

const Explore: React.FC = () => {
  const [variables, setVariables] = useImmer<ProjectsVariables>({
    name_or_description: '%%',
    project_types: Object.values(Project_Types_Enum),
  })

  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const onButtonClick = () => {
    setIsPopoverOpen(!isPopoverOpen)
  }

  const closePopover = () => {
    setIsPopoverOpen(false)
  }

  const hasFilters = useMemo<boolean>(() => {
    return (
      variables.name_or_description !== `%%` ||
      variables.project_types.length < Object.values(Project_Types_Enum).length
    )
  }, [variables.name_or_description, variables.project_types.length])

  const removeFilters = useCallback(() => {
    setVariables((draft) => {
      draft.name_or_description = `%%`
      draft.project_types = Object.values(Project_Types_Enum)
    })
  }, [])

  const ToastList = useToastsComponent()

  const items = useMemo<
    Array<{ name: string; checked: 'on' | 'off'; value: Project_Types_Enum }>
  >(() => {
    return Object.values(Project_Types_Enum).map((item) => ({
      name: PROJECT_TYPE_LABLE[item],
      checked: variables.project_types?.includes(item) ? 'on' : 'off',
      value: item,
    }))
  }, [variables.project_types])

  return (
    <MainLayout>
      <EuiPage restrictWidth>
        <EuiPageBody component="div">
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="m">
                <h1>Explore Project</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
          </EuiPageHeader>

          <EuiPageContent>
            {/* Some heading 456 */}
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
                          setVariables((draft) => {
                            draft.name_or_description = `%${value}%`
                          })
                        }}
                      />
                    </EuiFlexItem>
                    <EuiFlexItem>
                      <EuiFilterGroup>
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
                              numActiveFilters={variables.project_types?.length}
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
                                  setVariables((draft) => {
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
                  <ProjectList
                    filterVariables={variables}
                    hasFilters={hasFilters}
                    removeFilters={removeFilters}
                  />
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>

      <ToastList />
    </MainLayout>
  )
}

export default Explore
