'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ProjectCard, Tag } from '../components'
import { HB_DATA, type Project, type ProjectType } from '../data'

/**
 * Explore — a living atlas, not a shop. Grid of all registered projects with
 * filters by type; sort defaults to recency, never "hottest" (no FOMO).
 */
export interface ExploreProps {
  onOpen: (project: Project) => void
}

const TYPES: (ProjectType | 'All')[] = ['All', 'Solar', 'Wind', 'Hydro']

export function Explore({ onOpen }: ExploreProps) {
  const t = useTranslations('Explore')
  const d = HB_DATA
  const [filter, setFilter] = useState<ProjectType | 'All'>('All')
  const shown = filter === 'All' ? d.projects : d.projects.filter((p) => p.type === filter)

  return (
    <main style={{ maxWidth: 1320, margin: '0 auto', padding: '48px 32px 80px' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem,3.6vw,3rem)', letterSpacing: '-0.02em', margin: '0 0 8px', color: 'var(--ink)' }}>
          {t('title')}
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--ink-60)', margin: 0, maxWidth: 560 }}>{t('sub')}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {TYPES.map((ty) => (
            <Tag key={ty} selected={filter === ty} onClick={() => setFilter(ty)}>
              {ty === 'All' ? t('filterAll') : ty}
            </Tag>
          ))}
        </div>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--ink-60)' }}>{t('countSorted', { count: shown.length })}</span>
      </div>

      <div className="hb-projects-grid">
        {shown.map((p) => (
          <ProjectCard
            key={p.id}
            name={p.name}
            location={p.location}
            credit={p.credit}
            green={p.green}
            funded={p.funded}
            verifiedAgo="2h ago"
            onOpen={() => onOpen(p)}
          />
        ))}
      </div>
    </main>
  )
}
