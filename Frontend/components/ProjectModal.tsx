'use client';

import React from 'react';
import { ProjectItem } from '@/types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="modal-backdrop active" id="modalBackdrop" onClick={onClose}>
      <div
        className="modal-container"
        id="projectModal"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          id="modalClose"
          onClick={onClose}
          aria-label="Close modal"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="modal-content" id="modalContent">
          <div className="case-study-hero">
            <img src={project.image} alt={project.title} />
          </div>

          <div className="case-study-header">
            <div className="case-study-meta">
              <span className="project-cat">{project.catLabel || project.category.toUpperCase()}</span>
              {project.client && (
                <span className="case-study-client">
                  <i className="fa-regular fa-building"></i> {project.client}
                </span>
              )}
              {project.duration && (
                <span className="case-study-duration">
                  <i className="fa-regular fa-clock"></i> {project.duration}
                </span>
              )}
            </div>
            <h2 className="case-study-title">{project.title}</h2>
            <div className="kpi-banner">
              <i className="fa-solid fa-chart-line"></i> {project.kpi}
            </div>
          </div>

          <div className="case-study-body">
            {project.problem && (
              <div className="case-study-section">
                <h4>
                  <i className="fa-solid fa-triangle-exclamation" style={{ color: '#E11D48' }}></i> ปัญหาและความท้าทาย (The Challenge)
                </h4>
                <p>{project.problem}</p>
              </div>
            )}

            {project.solution && (
              <div className="case-study-section">
                <h4>
                  <i className="fa-solid fa-lightbulb" style={{ color: '#059669' }}></i> การแก้ปัญหาและสถาปัตยกรรม (The Solution & Architecture)
                </h4>
                <p>{project.solution}</p>
              </div>
            )}

            {project.results && (
              <div className="case-study-section">
                <h4>
                  <i className="fa-solid fa-trophy" style={{ color: '#F59E0B' }}></i> ผลลัพธ์ทางธุรกิจที่ได้รับ (Business Impact)
                </h4>
                <p>{project.results}</p>
              </div>
            )}

            {project.tags && project.tags.length > 0 && (
              <div className="case-study-tech">
                <h5>Tech Stack Used:</h5>
                <div className="project-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx}>{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
