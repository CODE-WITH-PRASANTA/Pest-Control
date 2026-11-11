import React, { useState } from 'react'
import './ProjectMain.css'

// Update image paths to match your assets folder
import project1 from '../../assets/news1.jpg'
import project2 from '../../assets/proj2.jpg'
import project3 from '../../assets/proj3.jpg'
import project4 from '../../assets/news1.jpg'

const projects = [
  {
    image: project1,
    title: 'Patient Recovery Management',
    category: 'Management',
    type: 'Nursing',
  },
  {
    image: project2,
    title: 'Health Monitoring Project',
    category: 'Management',
    type: 'Nursing',
  },
  {
    image: project3,
    title: 'Pest Control Solutions',
    category: 'Management',
    type: 'Protection',
  },
  {
    image: project4,
    title: 'Safety & Prevention',
    category: 'Management',
    type: 'Healthcare',
  },
]

function ProjectsOverview() {
  const [activeIndex, setActiveIndex] = useState(null)

  const handleCardClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="project-section">
      <div className="project-container">
        <div className="project-grid">
          {projects.map((project, index) => {
            const isActive = activeIndex === index

            return (
              <div
                className={`project-card ${isActive ? 'is-active' : ''}`}
                key={index}
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
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />

                <div className="project-overlay" />

                <div className="project-golden-frame" />

                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>
                    {project.category}
                    <span>•</span>
                    {project.type}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProjectsOverview