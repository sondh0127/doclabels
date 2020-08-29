import LogoIcon from '@/components/Icons/LogoIcon'
import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiText,
  EuiTextColor,
  EuiTitle,
  EuiImage,
} from '@elastic/eui'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import styles from './hero.module.scss'
import { useUser } from '@/hooks/useUser'
import annopdf from './annopdf.png'

interface HeroProps {}

const Hero: React.FC<HeroProps> = () => {
  const router = useRouter()
  const { user } = useUser()

  const onClickStartNow = useCallback(() => {
    if (!user) {
      router.push('/api/login')
    } else {
      router.push('/dashboard')
    }
  }, [user])

  return (
    <section className={styles.hero}>
      <EuiFlexGroup className={styles.heroPage} alignItems="center">
        <EuiFlexItem grow={false} style={{ maxWidth: 399 }}>
          <EuiFlexGroup gutterSize="xs" alignItems="center">
            <EuiFlexItem grow={false}>
              <LogoIcon height={32} width={32} ghost />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiText
                color="ghost"
                style={{ textTransform: 'uppercase', fontWeight: 700, letterSpacing: `2px` }}
              >
                DocLabels
              </EuiText>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer />
          <EuiTitle size="l">
            <h2>
              <EuiTextColor color="ghost">The document annotation tool for your team</EuiTextColor>
            </h2>
          </EuiTitle>
          <EuiSpacer />
          <EuiText color="ghost">
            Annotation tool for your team to labelling data from documents
          </EuiText>
          <EuiSpacer />
          <EuiButton
            onClick={onClickStartNow}
            fullWidth={false}
            iconType="arrowRight"
            iconSide="right"
            fill
            color="ghost"
          >
            Start now
          </EuiButton>
        </EuiFlexItem>

        <EuiFlexItem>
          <EuiTitle>
            <EuiImage alt={'annopdf'} url={'/images/annopdf.png'} />
          </EuiTitle>
        </EuiFlexItem>
      </EuiFlexGroup>
    </section>
  )
}

export default Hero
