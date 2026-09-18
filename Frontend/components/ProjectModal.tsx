'use client';

import React from 'react';
import { ProjectItem } from '@/types';
import { soundFx } from '@/Frontend/utils/soundEffects';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const allImages = React.useMemo(() => {
    if (!project) return [];
    if (project.images && project.images.length > 0) {
      // Ensure project.image is included
      const list = [...project.images];
      if (project.image && !list.includes(project.image)) {
        list.unshift(project.image);
      }
      return list;
    }
    return project.image ? [project.image] : [];
  }, [project]);

  const [activeImgIdx, setActiveImgIdx] = React.useState(0);

  // Reset active index when project changes
  React.useEffect(() => {
    setActiveImgIdx(0);
  }, [project]);

  if (!project) return null;

  const currentImage = allImages[activeImgIdx] || project.image;

  const handlePrevImg = () => {
    soundFx.playClick();
    setActiveImgIdx(prev => (prev > 0 ? prev - 1 : allImages.length - 1));
  };

  const handleNextImg = () => {
    soundFx.playClick();
    setActiveImgIdx(prev => (prev < allImages.length - 1 ? prev + 1 : 0));
  };

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
          {/* Main Hero Gallery View */}
          <div className="case-study-hero" style={{ position: 'relative' }}>
            <img src={currentImage} alt={project.title} style={{ width: '100%', maxHeight: '420px', objectFit: 'contain', background: '#070B14' }} />
            
            {allImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImg}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(7, 11, 20, 0.75)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    width: '38px',
                    height: '38px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    backdropFilter: 'blur(4px)',
                    zIndex: 2,
                  }}
                  title="รูปก่อนหน้า"
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button
                  type="button"
                  onClick={handleNextImg}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(7, 11, 20, 0.75)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    width: '38px',
                    height: '38px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    backdropFilter: 'blur(4px)',
                    zIndex: 2,
                  }}
                  title="รูปถัดไป"
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </>
            )}
          </div>

          {/* Thumbnails Row if multiple images */}
          {allImages.length > 1 && (
            <div style={{
              display: 'flex',
              gap: '10px',
              padding: '12px 16px',
              background: 'var(--bg-surface)',
              overflowX: 'auto',
              borderBottom: '1px solid var(--border-glass)'
            }}>
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImgIdx(idx)}
                  style={{
                    border: idx === activeImgIdx ? '2px solid var(--primary)' : '1px solid var(--border-glass)',
                    borderRadius: '8px',
                    padding: 0,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    opacity: idx === activeImgIdx ? 1 : 0.65,
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                    background: '#0F172A',
                  }}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} style={{ width: '70px', height: '48px', objectFit: 'cover', display: 'block' }} />
                </button>
              ))}
            </div>
          )}

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
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="kpi-banner">
                <i className="fa-solid fa-chart-line"></i> {project.kpi}
              </div>
              {project.liveUrl && (
                <a
                  href={project.liveUrl.startsWith('http://') || project.liveUrl.startsWith('https://') ? project.liveUrl : `https://${project.liveUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-study-live-btn"
                  title="เปิดดูเว็บไซต์จริงในแท็บใหม่"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  <span>เปิดดูเว็บไซต์จริง (Visit Website)</span>
                </a>
              )}
            </div>
          </div>

          <div className="case-study-body">
            {project.liveUrl && (
              <div className="case-study-live-card">
                <div className="live-card-info">
                  <div className="live-card-badge">
                    <span className="live-indicator-pulse"></span>
                    <span>ONLINE PRODUCTION</span>
                  </div>
                  <div className="live-card-url">
                    <i className="fa-solid fa-globe"></i>
                    <a
                      href={project.liveUrl.startsWith('http://') || project.liveUrl.startsWith('https://') ? project.liveUrl : `https://${project.liveUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.liveUrl}
                    </a>
                  </div>
                </div>
                <a
                  href={project.liveUrl.startsWith('http://') || project.liveUrl.startsWith('https://') ? project.liveUrl : `https://${project.liveUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="live-card-cta"
                >
                  <span>เข้าสู่ระบบจริง</span>
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
              </div>
            )}

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

            {project.liveUrl && (
              <div style={{ marginTop: '8px', textAlign: 'center' }}>
                <a
                  href={project.liveUrl.startsWith('http://') || project.liveUrl.startsWith('https://') ? project.liveUrl : `https://${project.liveUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-study-live-btn full-width"
                  style={{ display: 'inline-flex', width: '100%', justifyContent: 'center', padding: '14px 24px', fontSize: '1rem' }}
                >
                  <i className="fa-solid fa-globe"></i>
                  <span>เปิดเว็บไซต์จริงของโปรเจกต์นี้ &rarr;</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
