import React, { useEffect, useState } from 'react'
import { API_BASE_URL, BACKEND_BASE_URL } from '../../config/api'
import './ProjectMain.css'

const resolveImageUrl = (img) => {
  if (!img) return ''
  if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('data:')) {
    return img
  }
  return `${BACKEND_BASE_URL}${img.startsWith('/') ? '' : '/'}${img}`
}

function ProjectsOverview() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeIndex, setActiveIndex] = useState(null)

  useEffect(() => {
    let ignore = false
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/projects`)
        const result = await res.json()
        if (!ignore) {
          if (!res.ok || !result.success) {
            throw new Error(result.message || 'Failed to load projects')
          }
          const visible = (result.data || []).filter(
            (p) => p.status === 'Published' || p.status === 'Completed' || !p.status
          )
          setProjects(visible)
        }
      } catch (err) {
        if (!ignore) setError(err.message || 'Unable to load projects.')
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    fetchProjects()
    return () => {
      ignore = true
    }
  }, [])

  const handleCardClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="project-section">
      <div className="project-container">
        {loading ? (
          <p style={{ textAlign: 'center', padding: '48px 16px', fontSize: '16px' }}>
            Loading projects...
          </p>
        ) : error ? (
          <p style={{ textAlign: 'center', padding: '48px 16px', color: '#dc2626', fontSize: '16px' }}>
            {error}
          </p>
        ) : projects.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '48px 16px', fontSize: '16px' }}>
            No projects found in database.
          </p>
        ) : (
          <div className="project-grid">
            {projects.map((project, index) => {
              const isActive = activeIndex === index
              const cover = resolveImageUrl(
                (Array.isArray(project.images) && project.images[0]) || project.image
              )

              return (
                <div
                  className={`project-card ${isActive ? 'is-active' : ''}`}
                  key={project._id || project.id || index}
                  onClick={() => handleCardClick(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleCardClick(index)
                    }
                  }}
                  aria-pressed={isActive}
                >
                  {cover ? (
                    <img
                      src={cover}
                      alt={project.title}
                      className="project-image"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="project-image"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #0f5132, #2fb344)',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '18px',
                      }}
                    >
                      {project.category || 'Project'}
                    </div>
                  )}

                  <div className="project-overlay" />

                  <div className="project-golden-frame" />

                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>
                      {project.category}
                      {project.location && (
                        <>
                          <span>•</span>
                          {project.location}
                        </>
                      )}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProjectsOverview
