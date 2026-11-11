import React, { useState } from 'react'
import './ProjectDetailsMain.css'

import project1 from '../../assets/news1.jpg'
import project2 from '../../assets/news1.jpg'
import project3 from '../../assets/proj2.jpg'

const relatedProjects = [
  {
    image: project1,
    title: 'Patient Recovery Management',
    category: 'Management',
    type: 'Nursing',
  },
  {
    image: project3,
    title: 'Pest Control Solutions',
    category: 'Management',
    type: 'Protection',
  },
]

function ProjectSingleView() {
  const [activeIndex, setActiveIndex] = useState(null)

  const handleCardClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="psv-section">
      <div className="psv-container">
        {/* HERO IMAGE */}
        <div className="psv-hero">
          <img
            src={project2}
            alt="Best Bugs and Pest Control Solution"
            className="psv-hero-image"
          />
        </div>

        {/* DESCRIPTION AND PROJECT INFORMATION */}
        <div className="psv-content-grid">
          {/* LEFT CONTENT */}
          <div className="psv-description">
            {/* PROJECT HEADING */}
            <div className="psv-heading">
              <span className="psv-subtitle">
                SMARTER PEST CONTROL. HEALTHIER SPACES.
              </span>
              <h1>Best Bugs & Pest Control Solution</h1>
              <div className="psv-heading-line"></div>
            </div>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Asperiores, repellat aliquid. Est corrupti officiis
              dignissimos exercitationem, minima iusto quia saepe
              tempora, consectetur dolor deleniti voluptatibus.
              Eos vitae pariatur molestiae odit.
            </p>

            <p>
              Even cum voluptas nobis ullam voluptatem cum iste.
              Dolore modi, animi optio, dignissimos delectus pariatur
              similique harum eos. Beyond more stoic this along goodness hey this wow
              manatee mongoose one as since a far flustered impressive
              manifest Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Nostrum illo ea ad, nam quisquam modi
              vel tempora, minus placeat. Qui eos laboriosam quam
              quos laboriosam atque suscipit quod dignissimos magni
              doloribus facere eius soluta possimus. Officiis, autem similique sequi labore aliquid corporis
              illo omnis voluptate optio possimus doloremque error.
              Doloribus deleniti sed ea, dicta, dolorem unde deserunt
              quisquam. Dolore consequuntur facere corporis
              perspiciatis quam fuga magnam molestiae minima culpa
              ab beatae velit itaque cumque assumenda est.
            </p>
          </div>

          {/* RIGHT PROJECT INFORMATION CARD */}
          <aside className="psv-info-card">
            <div className="psv-info-item">
              <span>Date</span>
              <h4>10 January, 2026</h4>
            </div>

            <div className="psv-info-item">
              <span>Client</span>
              <h4>Kodesolution Ltd</h4>
            </div>

            <div className="psv-info-item">
              <span>Website</span>
              <h4>
                <a href="https://www.domain.com" target="_blank" rel="noreferrer">
                  www.domain.com
                </a>
              </h4>
            </div>

            <div className="psv-info-item">
              <span>Location</span>
              <h4>New York, USA</h4>
            </div>

            <div className="psv-info-item">
              <span>Value</span>
              <h4>$12,367</h4>
            </div>

            <div className="psv-social-links">
              <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">𝕏</a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest">p</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">◎</a>
            </div>
          </aside>
        </div>

        {/* PREVIOUS / NEXT NAVIGATION */}
        <div className="psv-navigation">
          <button className="psv-nav-btn" type="button">
            <span className="psv-nav-circle">←</span>
            <span>Previous</span>
          </button>

          <button className="psv-nav-btn psv-next-btn" type="button">
            <span>Next</span>
            <span className="psv-nav-circle">→</span>
          </button>
        </div>

        {/* RELATED PROJECTS */}
        <div className="psv-related-grid">
          {relatedProjects.map((project, index) => {
            const isActive = activeIndex === index

            return (
              <div
                className={`psv-project-card ${isActive ? 'is-active' : ''}`}
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
                  className="psv-project-image"
                />

                <div className="psv-project-overlay"></div>

                <div className="psv-project-frame"></div>

                <div className="psv-project-info">
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

export default ProjectSingleView