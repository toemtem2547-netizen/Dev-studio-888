'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '@/Frontend/context/ThemeContext';
import { useSettings } from '@/Frontend/context/SettingsContext';
import { ProjectItem, LeadItem, EstimatorConfig, DEFAULT_ESTIMATOR_CONFIG, CustomProjectType } from '@/types';

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  tag: string;
  primaryColor: string;
  secondaryColor: string;
  fontHeading: string;
  fontBody: string;
  badgeBg: string;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'cyber-nexus',
    name: 'Cyber Nexus (Default)',
    description: 'โทนสีน้ำเงิน-ม่วงเทคโนโลยี สไตล์ Modern Tech & SaaS Studio ยอดนิยมระดับสากล',
    tag: 'Classic SaaS',
    primaryColor: '#2563EB',
    secondaryColor: '#7C3AED',
    fontHeading: 'Plus Jakarta Sans',
    fontBody: 'Inter',
    badgeBg: 'linear-gradient(135deg, #2563EB, #7C3AED)',
  },
  {
    id: 'emerald-fintech',
    name: 'Emerald Innovation',
    description: 'โทนสีเขียวมรกต-ฟ้าไซอัน สื่อถึงความเติบโต FinTech, Web3 และความน่าเชื่อถือสูง',
    tag: 'FinTech & Web3',
    primaryColor: '#10B981',
    secondaryColor: '#06B6D4',
    fontHeading: 'Plus Jakarta Sans',
    fontBody: 'Inter',
    badgeBg: 'linear-gradient(135deg, #10B981, #06B6D4)',
  },
  {
    id: 'deep-amethyst',
    name: 'Amethyst & Rose Luxury',
    description: 'โทนสีม่วงนีออน-ชมพูโรส สไตล์ Creative Agency, High-End & AI Studio พรีเมียม',
    tag: 'Ultra Luxury',
    primaryColor: '#8B5CF6',
    secondaryColor: '#EC4899',
    fontHeading: 'Plus Jakarta Sans',
    fontBody: 'Inter',
    badgeBg: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
  },
  {
    id: 'solar-startup',
    name: 'Solar Flame & Amber',
    description: 'โทนสีส้มทอง-แดงเพลิง สื่อถึงพลังงาน ความคิดสร้างสรรค์ และสตาร์ทอัพยุคใหม่',
    tag: 'High Energy',
    primaryColor: '#F59E0B',
    secondaryColor: '#EF4444',
    fontHeading: 'Prompt',
    fontBody: 'Inter',
    badgeBg: 'linear-gradient(135deg, #F59E0B, #EF4444)',
  },
  {
    id: 'cyberpunk-neon',
    name: 'Neon Cyberpunk',
    description: 'โทนสีชมพูฟูเชีย-ม่วงนีออน สไตล์เกมมิ่ง สตรีมเมอร์ และเว็บยุค Next-Gen',
    tag: 'Cyberpunk',
    primaryColor: '#F43F5E',
    secondaryColor: '#8B5CF6',
    fontHeading: 'Plus Jakarta Sans',
    fontBody: 'Prompt',
    badgeBg: 'linear-gradient(135deg, #F43F5E, #8B5CF6)',
  },
  {
    id: 'sapphire-corporate',
    name: 'Sapphire & Ocean Blue',
    description: 'โทนสีฟ้าน้ำทะเล-น้ำเงินเข้ม สไตล์องค์กรและธุรกิจองค์กรไทยที่มั่นคง น่าเชื่อถือ',
    tag: 'Thai Corporate',
    primaryColor: '#0284C7',
    secondaryColor: '#3B82F6',
    fontHeading: 'Prompt',
    fontBody: 'Prompt',
    badgeBg: 'linear-gradient(135deg, #0284C7, #3B82F6)',
  },
  {
    id: 'gold-prestige',
    name: 'Champagne Gold Prestige',
    description: 'โทนสีทองแชมเปญ-บรอนซ์ สำหรับแบรนด์ระดับ VIP, อสังหาริมทรัพย์ และ Luxury Retail',
    tag: 'VIP Luxury',
    primaryColor: '#EAB308',
    secondaryColor: '#D97706',
    fontHeading: 'Prompt',
    fontBody: 'Inter',
    badgeBg: 'linear-gradient(135deg, #EAB308, #D97706)',
  },
  {
    id: 'stealth-titanium',
    name: 'Stealth Titanium & Slate',
    description: 'โทนสีเทาดำโมโนโครม สไตล์ Minimalist วิศวกรรมซอฟต์แวร์ระดับ Architect',
    tag: 'Minimal Stealth',
    primaryColor: '#64748B',
    secondaryColor: '#94A3B8',
    fontHeading: 'Inter',
    fontBody: 'Inter',
    badgeBg: 'linear-gradient(135deg, #64748B, #94A3B8)',
  },
];

export default function DashboardView() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const {
    site,
    contact,
    social,
    projects,
    themeSettings,
    estimatorConfig,
    updateSiteSettings,
    updateContactSettings,
    updateSocialSettings,
    updateThemeSettings,
    updateEstimatorConfig,
    saveProjects,
  } = useSettings();

  const [activeSection, setActiveSection] = useState<string>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Settings Forms
  const [siteForm, setSiteForm] = useState(site);
  const [contactForm, setContactForm] = useState(contact);
  const [socialForm, setSocialForm] = useState(social);
  const [estimatorForm, setEstimatorForm] = useState<EstimatorConfig>(estimatorConfig || DEFAULT_ESTIMATOR_CONFIG);
  const [primaryColor, setPrimaryColor] = useState(themeSettings?.primaryColor || '#2563EB');
  const [secondaryColor, setSecondaryColor] = useState(themeSettings?.secondaryColor || '#7C3AED');
  const [fontHeading, setFontHeading] = useState(themeSettings?.fontHeading || 'Plus Jakarta Sans');
  const [fontBody, setFontBody] = useState(themeSettings?.fontBody || 'Inter');

  // Leads & Messages
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [portfolioCategoryFilter, setPortfolioCategoryFilter] = useState('all');
  const [portfolioSearch, setPortfolioSearch] = useState('');

  // Project Modal State & Image Upload
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [projectImageMode, setProjectImageMode] = useState<'upload' | 'url'>('upload');
  const [isUploadingProjectImg, setIsUploadingProjectImg] = useState(false);
  const [isDraggingProjectImg, setIsDraggingProjectImg] = useState(false);
  const projectFileInputRef = useRef<HTMLInputElement>(null);

  // Add Custom Project Type Modal State
  const [showAddProjectTypeModal, setShowAddProjectTypeModal] = useState(false);
  const [newProjectType, setNewProjectType] = useState<{
    name: string;
    desc: string;
    price: number;
    icon: string;
    color: string;
  }>({
    name: '',
    desc: '',
    price: 65000,
    icon: 'fa-mobile-screen',
    color: 'blue',
  });

  // Estimator Live Simulator State (Dashboard Interactive Test Drive)
  const [simType, setSimType] = useState<string>('webapp');
  const [simFeatures, setSimFeatures] = useState<string[]>([]);
  const [simSpeed, setSimSpeed] = useState<boolean>(false);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleProjectImageUpload = async (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      triggerToast('กรุณาเลือกไฟล์รูปภาพเท่านั้น (JPG, PNG, WebP)');
      return;
    }

    setIsUploadingProjectImg(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        if (editingProject) {
          setEditingProject({ ...editingProject, image: data.url });
        }
        triggerToast('อัปโหลดรูปภาพสำเร็จ!');
      } else {
        // Fallback to FileReader base64
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target?.result as string;
          if (editingProject && base64) {
            setEditingProject({ ...editingProject, image: base64 });
            triggerToast('อัปโหลดรูปภาพสำเร็จ');
          }
        };
        reader.readAsDataURL(file);
      }
    } catch {
      // Fallback to FileReader base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        if (editingProject && base64) {
          setEditingProject({ ...editingProject, image: base64 });
          triggerToast('อัปโหลดรูปภาพสำเร็จ');
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploadingProjectImg(false);
    }
  };

  const handleApplyPricingPreset = (presetType: 'standard' | 'enterprise' | 'startup') => {
    if (presetType === 'standard') {
      setEstimatorForm(prev => ({
        ...prev,
        basePrices: { ...prev.basePrices, webapp: 70000, dashboard: 95000, ecommerce: 85000, corporate: 45000 },
        featurePrices: { ...prev.featurePrices, auth: 10000, payment: 15000, notification: 8000, export: 7000, ai: 25000, multilang: 12000 },
        speedMultiplier: 1.25,
      }));
      triggerToast('โหลดชุดราคาแนะนำ: Standard SaaS & Web App สำเร็จ');
    } else if (presetType === 'enterprise') {
      setEstimatorForm(prev => ({
        ...prev,
        basePrices: { ...prev.basePrices, webapp: 120000, dashboard: 160000, ecommerce: 140000, corporate: 80000 },
        featurePrices: { ...prev.featurePrices, auth: 20000, payment: 25000, notification: 15000, export: 15000, ai: 45000, multilang: 25000 },
        speedMultiplier: 1.35,
      }));
      triggerToast('โหลดชุดราคาแนะนำ: Enterprise Corporate & High-Ticket สำเร็จ');
    } else if (presetType === 'startup') {
      setEstimatorForm(prev => ({
        ...prev,
        basePrices: { ...prev.basePrices, webapp: 45000, dashboard: 60000, ecommerce: 55000, corporate: 29000 },
        featurePrices: { ...prev.featurePrices, auth: 7000, payment: 10000, notification: 5000, export: 5000, ai: 18000, multilang: 8000 },
        speedMultiplier: 1.20,
      }));
      triggerToast('โหลดชุดราคาแนะนำ: Startup & SME Lean สำเร็จ');
    }
  };

  const adjustBasePrice = (key: string, delta: number) => {
    setEstimatorForm(prev => ({
      ...prev,
      basePrices: {
        ...prev.basePrices,
        [key]: Math.max(0, (prev.basePrices[key] || 0) + delta),
      },
    }));
  };

  const adjustFeaturePrice = (key: keyof EstimatorConfig['featurePrices'], delta: number) => {
    setEstimatorForm(prev => ({
      ...prev,
      featurePrices: {
        ...prev.featurePrices,
        [key]: Math.max(0, (prev.featurePrices[key] || 0) + delta),
      },
    }));
  };

  const handleAddCustomProjectType = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectType.name.trim()) {
      triggerToast('กรุณากรอกชื่อประเภทโปรเจกต์');
      return;
    }
    const newId = 'custom_' + Date.now();
    const item: CustomProjectType = {
      id: newId,
      name: newProjectType.name.trim(),
      desc: newProjectType.desc.trim() || 'ประเภทโปรเจกต์ที่กำหนดเอง',
      price: Number(newProjectType.price) || 0,
      icon: newProjectType.icon || 'fa-cubes',
      color: newProjectType.color || 'blue',
    };
    const currentCustom = estimatorForm?.customProjectTypes || [];
    const updatedForm: EstimatorConfig = {
      ...estimatorForm,
      customProjectTypes: [...currentCustom, item],
      basePrices: {
        ...estimatorForm.basePrices,
        [newId]: item.price,
      },
    };
    setEstimatorForm(updatedForm);
    updateEstimatorConfig(updatedForm);
    setNewProjectType({
      name: '',
      desc: '',
      price: 65000,
      icon: 'fa-mobile-screen',
      color: 'blue',
    });
    setShowAddProjectTypeModal(false);
    triggerToast(`เพิ่มประเภทโปรเจกต์ "${item.name}" และซิงค์ระบบเรียบร้อย 🚀`);
  };

  const handleDeleteCustomProjectType = (id: string, name: string) => {
    if (!confirm(`คุณต้องการลบประเภทโปรเจกต์ "${name}" ใช่หรือไม่?`)) return;
    const currentCustom = estimatorForm?.customProjectTypes || [];
    const updatedCustom = currentCustom.filter(c => c.id !== id);
    const updatedBasePrices = { ...estimatorForm.basePrices };
    delete updatedBasePrices[id];
    const updatedForm: EstimatorConfig = {
      ...estimatorForm,
      customProjectTypes: updatedCustom,
      basePrices: updatedBasePrices,
    };
    setEstimatorForm(updatedForm);
    updateEstimatorConfig(updatedForm);
    if (simType === id) {
      setSimType('webapp');
    }
    triggerToast(`ลบประเภทโปรเจกต์ "${name}" สำเร็จ`);
  };

  const adjustCustomBasePrice = (id: string, delta: number) => {
    setEstimatorForm(prev => {
      const currentCustom = prev?.customProjectTypes || [];
      const updatedCustom = currentCustom.map(c => {
        if (c.id === id) {
          const newPrice = Math.max(0, (c.price || 0) + delta);
          return { ...c, price: newPrice };
        }
        return c;
      });
      return {
        ...prev,
        customProjectTypes: updatedCustom,
        basePrices: {
          ...prev.basePrices,
          [id]: Math.max(0, (prev.basePrices[id] || 0) + delta),
        },
      };
    });
  };

  const updateCustomPriceDirect = (id: string, newPrice: number) => {
    setEstimatorForm(prev => {
      const currentCustom = prev?.customProjectTypes || [];
      const updatedCustom = currentCustom.map(c => {
        if (c.id === id) {
          return { ...c, price: newPrice };
        }
        return c;
      });
      return {
        ...prev,
        customProjectTypes: updatedCustom,
        basePrices: {
          ...prev.basePrices,
          [id]: newPrice,
        },
      };
    });
  };

  useEffect(() => {
    // Auth Check
    const sessionStr = localStorage.getItem('nexus_admin_session');
    if (!sessionStr) {
      router.push('/login');
      return;
    }
    try {
      const session = JSON.parse(sessionStr);
      if (!session.loggedIn) {
        router.push('/login');
        return;
      }
    } catch {
      router.push('/login');
      return;
    }

    // Load live leads from API
    const loadLeadsFromApi = async () => {
      try {
        const res = await fetch('/api/leads');
        const data = await res.json();
        if (data.success && Array.isArray(data.leads)) {
          setLeads(data.leads);
          localStorage.setItem('nexus_dash_leads', JSON.stringify(data.leads));
        } else {
          const savedLeads = localStorage.getItem('nexus_dash_leads');
          if (savedLeads) setLeads(JSON.parse(savedLeads));
        }
      } catch (e) {
        console.error('Failed to load leads from API, fallback to localStorage:', e);
        try {
          const savedLeads = localStorage.getItem('nexus_dash_leads');
          if (savedLeads) setLeads(JSON.parse(savedLeads));
        } catch {}
      }
    };

    loadLeadsFromApi();

    setSiteForm(site);
    setContactForm(contact);
    setSocialForm(social);
    if (themeSettings) {
      setPrimaryColor(themeSettings.primaryColor);
      setSecondaryColor(themeSettings.secondaryColor);
      setFontHeading(themeSettings.fontHeading);
      setFontBody(themeSettings.fontBody);
    }
  }, [site, contact, social, themeSettings, router]);

  // Sync estimatorForm whenever context estimatorConfig changes (initial load from DB/localStorage)
  useEffect(() => {
    if (estimatorConfig) {
      setEstimatorForm(estimatorConfig);
    }
  }, [estimatorConfig]);

  const handleLogout = () => {
    localStorage.removeItem('nexus_admin_session');
    router.push('/login');
  };

  const handleSaveSiteSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSiteSettings(siteForm);
      triggerToast('บันทึกข้อมูลเว็บไซต์เรียบร้อยแล้ว (อัปเดตหน้าเว็บสดทันที) 🚀');
    } catch (err) {
      console.error('[handleSaveSiteSettings] Error:', err);
      triggerToast('เกิดข้อผิดพลาด ไม่สามารถบันทึกได้');
    }
  };

  const handleSaveContactSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateContactSettings(contactForm);
      triggerToast('บันทึกช่องทางติดต่อเรียบร้อยแล้ว (อัปเดตหน้าเว็บสดทันที) 🚀');
    } catch (err) {
      console.error('[handleSaveContactSettings] Error:', err);
      triggerToast('เกิดข้อผิดพลาด ไม่สามารถบันทึกได้');
    }
  };

  const handleSaveSocialSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSocialSettings(socialForm);
      triggerToast('บันทึก Social Links เรียบร้อยแล้ว (อัปเดตหน้าเว็บสดทันที) 🚀');
    } catch (err) {
      console.error('[handleSaveSocialSettings] Error:', err);
      triggerToast('เกิดข้อผิดพลาด ไม่สามารถบันทึกได้');
    }
  };

  const handleSaveEstimatorSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Save directly to API with full form data
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estimatorConfig: estimatorForm }),
      });
      const data = await res.json();
      if (data.success && data.estimatorConfig) {
        // Sync confirmed DB value to both local form and context (skipApiCall=true to avoid double-save)
        setEstimatorForm(data.estimatorConfig);
        localStorage.setItem('nexus_dash_estimator_config', JSON.stringify(data.estimatorConfig));
        updateEstimatorConfig(data.estimatorConfig, true);
      }
      triggerToast('บันทึกเรทราคาประเมินเรียบร้อยแล้ว (อัปเดตหน้าเว็บสดทันที) 🚀');
    } catch (err) {
      console.error('[handleSaveEstimatorSettings] Error:', err);
      triggerToast('เกิดข้อผิดพลาด ไม่สามารถบันทึกได้');
    }
  };

  const handleSelectPreset = (preset: ThemePreset) => {
    setPrimaryColor(preset.primaryColor);
    setSecondaryColor(preset.secondaryColor);
    setFontHeading(preset.fontHeading);
    setFontBody(preset.fontBody);
    updateThemeSettings({
      primaryColor: preset.primaryColor,
      secondaryColor: preset.secondaryColor,
      fontHeading: preset.fontHeading,
      fontBody: preset.fontBody,
    });
    triggerToast(`เปลี่ยนเป็นธีม "${preset.name}" เรียบร้อยแล้ว ✨`);
  };

  const handleSaveThemeSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateThemeSettings({
      primaryColor,
      secondaryColor,
      fontHeading,
      fontBody,
    });
    triggerToast('บันทึกการตั้งค่าธีมและดีไซน์เรียบร้อยแล้ว ✨');
  };

  const handleDeleteLead = async (id: string) => {
    if (confirm('ต้องการลบข้อมูลนี้ใช่หรือไม่?')) {
      try {
        await fetch(`/api/leads?id=${id}`, { method: 'DELETE' });
      } catch (err) {
        console.error('[handleDeleteLead] Error:', err);
      }
      const updated = leads.filter(l => l.id !== id);
      setLeads(updated);
      localStorage.setItem('nexus_dash_leads', JSON.stringify(updated));
      triggerToast('ลบข้อความเรียบร้อยแล้ว');
    }
  };

  const handleOpenAddProject = () => {
    setEditingProject({
      id: 'proj-' + Date.now(),
      title: '',
      category: 'saas',
      catLabel: 'SaaS / Business Intelligence',
      badge: 'Enterprise Platform',
      kpi: '+180% ประสิทธิภาพ',
      excerpt: '',
      image: '/assets/images/project_dashboard.jpg',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      client: 'Global Corp.',
      duration: '4 สัปดาห์',
      problem: 'ความท้าทายของระบบเดิม',
      solution: 'การพัฒนาระบบใหม่ด้วยสถาปัตยกรรมทันสมัย',
      results: 'เพิ่มผลลัพธ์ทางธุรกิจและความรวดเร็วในการทำงาน',
    });
    setShowProjectModal(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    let updatedList: ProjectItem[];
    const exists = projects.find(p => p.id === editingProject.id);
    if (exists) {
      updatedList = projects.map(p => p.id === editingProject.id ? editingProject : p);
    } else {
      updatedList = [editingProject, ...projects];
    }

    saveProjects(updatedList);
    setShowProjectModal(false);
    setEditingProject(null);
    triggerToast('บันทึกข้อมูลผลงานเรียบร้อยแล้ว');
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบผลงานนี้ออกจาก Portfolio?')) {
      const updated = projects.filter(p => p.id !== id);
      saveProjects(updated);
      triggerToast('ลบผลงานเรียบร้อยแล้ว');
    }
  };

  const filteredProjects = projects.filter(p => {
    const matchCat = portfolioCategoryFilter === 'all' || p.category === portfolioCategoryFilter;
    const matchSearch = !portfolioSearch || p.title.toLowerCase().includes(portfolioSearch.toLowerCase()) || p.excerpt.toLowerCase().includes(portfolioSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  const sectionTitles: Record<string, string> = {
    overview: 'ภาพรวม',
    portfolio: 'จัดการผลงาน',
    messages: 'ข้อความและใบเสนอราคา',
    'estimator-logs': 'ประเมินราคา',
    'settings-estimator': 'ตั้งค่าราคาประเมิน (Pricing)',
    'settings-site': 'ข้อมูลเว็บไซต์',
    'settings-contact': 'ช่องทางติดต่อ',
    'settings-social': 'Social Links',
    'settings-theme': 'ธีมและดีไซน์',
  };

  return (
    <div className="dash-body">
      {/* Toast */}
      <div className={`dash-toast ${toastMsg ? 'show' : ''}`} id="dashToast">
        <i className="fa-solid fa-circle-check"></i>
        <span>{toastMsg}</span>
      </div>

      {/* Sidebar */}
      <aside className={`dash-sidebar ${sidebarOpen ? 'open' : ''}`} id="dashSidebar">
        <div className="dash-sidebar-header">
          <Link href="/" className="dash-logo">
            <span className="logo-icon"><i className="fa-solid fa-layer-group"></i></span>
            <span className="logo-text">DEV STUDIO 888</span>
          </Link>
          <button className="dash-sidebar-close" onClick={() => setSidebarOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="dash-sidebar-label">เมนูหลัก</div>
        <nav className="dash-nav">
          <button
            type="button"
            className={`dash-nav-item ${activeSection === 'overview' ? 'active' : ''}`}
            onClick={() => { setActiveSection('overview'); setSidebarOpen(false); }}
          >
            <i className="fa-solid fa-chart-pie"></i>
            <span>ภาพรวม</span>
          </button>
          <button
            type="button"
            className={`dash-nav-item ${activeSection === 'portfolio' ? 'active' : ''}`}
            onClick={() => { setActiveSection('portfolio'); setSidebarOpen(false); }}
          >
            <i className="fa-solid fa-briefcase"></i>
            <span>จัดการผลงาน</span>
          </button>
          <button
            type="button"
            className={`dash-nav-item ${activeSection === 'messages' ? 'active' : ''}`}
            onClick={() => { setActiveSection('messages'); setSidebarOpen(false); }}
          >
            <i className="fa-regular fa-envelope"></i>
            <span>ข้อความ</span>
            {leads.length > 0 && <span className="dash-badge">{leads.length}</span>}
          </button>
          <button
            type="button"
            className={`dash-nav-item ${activeSection === 'estimator-logs' ? 'active' : ''}`}
            onClick={() => { setActiveSection('estimator-logs'); setSidebarOpen(false); }}
          >
            <i className="fa-solid fa-calculator"></i>
            <span>ประเมินราคา</span>
          </button>
        </nav>

        <div className="dash-sidebar-label">ตั้งค่า</div>
        <nav className="dash-nav">
          <button
            type="button"
            className={`dash-nav-item ${activeSection === 'settings-estimator' ? 'active' : ''}`}
            onClick={() => { setActiveSection('settings-estimator'); setSidebarOpen(false); }}
          >
            <i className="fa-solid fa-coins"></i>
            <span>ตั้งค่าราคาประเมิน</span>
          </button>
          <button
            type="button"
            className={`dash-nav-item ${activeSection === 'settings-site' ? 'active' : ''}`}
            onClick={() => { setActiveSection('settings-site'); setSidebarOpen(false); }}
          >
            <i className="fa-solid fa-globe"></i>
            <span>ข้อมูลเว็บไซต์</span>
          </button>
          <button
            type="button"
            className={`dash-nav-item ${activeSection === 'settings-contact' ? 'active' : ''}`}
            onClick={() => { setActiveSection('settings-contact'); setSidebarOpen(false); }}
          >
            <i className="fa-solid fa-phone"></i>
            <span>ช่องทางติดต่อ</span>
          </button>
          <button
            type="button"
            className={`dash-nav-item ${activeSection === 'settings-social' ? 'active' : ''}`}
            onClick={() => { setActiveSection('settings-social'); setSidebarOpen(false); }}
          >
            <i className="fa-solid fa-share-nodes"></i>
            <span>Social Links</span>
          </button>
          <button
            type="button"
            className={`dash-nav-item ${activeSection === 'settings-theme' ? 'active' : ''}`}
            onClick={() => { setActiveSection('settings-theme'); setSidebarOpen(false); }}
          >
            <i className="fa-solid fa-palette"></i>
            <span>ธีมและดีไซน์</span>
          </button>
        </nav>

        <div className="dash-sidebar-footer">
          <Link href="/" className="dash-nav-item">
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
            <span>ดูหน้าเว็บไซต์</span>
          </Link>
          <button type="button" className="dash-nav-item" id="sidebarLogoutBtn" style={{ color: '#ef4444' }} onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dash-main" id="dashMain">
        {/* Top Bar */}
        <header className="dash-topbar">
          <div className="dash-topbar-left">
            <button className="dash-menu-toggle" id="menuToggle" aria-label="Toggle menu" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <i className="fa-solid fa-bars"></i>
            </button>
            <div className="dash-breadcrumb">
              <span className="dash-breadcrumb-title" id="pageTitle">{sectionTitles[activeSection] || 'แดชบอร์ด'}</span>
            </div>
          </div>

          <div className="dash-topbar-center">
            <div className="dash-system-status-pill">
              <span className="status-pulse-dot"></span>
              <span>ระบบเปิดใช้งานแบบ Real-time</span>
            </div>
          </div>

          <div className="dash-topbar-right">
            <button className="dash-theme-toggle" id="dashThemeToggle" title="สลับธีม สว่าง / มืด" aria-label="Toggle theme" onClick={toggleTheme}>
              {theme === 'dark' ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
            </button>
            <div className="dash-avatar-chip" title="ผู้ดูแลระบบ (Admin)">
              <div className="avatar-circle">A</div>
              <span className="admin-name">Admin</span>
            </div>
            <button className="dash-logout-topbar-btn" id="logoutBtn" title="ออกจากระบบ" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>ออกจากระบบ</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="dash-content" id="dashContent">
          {/* ============ OVERVIEW ============ */}
          {activeSection === 'overview' && (
            <section className="dash-section active" id="sec-overview">
              <div className="dash-welcome-banner">
                <div className="welcome-badge"><i className="fa-solid fa-sparkles"></i> ADMIN DASHBOARD V1.0</div>
                <h2>ยินดีต้อนรับกลับครับผู้ดูแล 👋</h2>
                <p>ระบบบริหารจัดการเว็บไซต์ DEV STUDIO 888 ติดตามสถิติ จัดการผลงาน และตอบกลับลูกค้าได้ครบจบในที่เดียว</p>
              </div>

              <div className="dash-stats-grid">
                <div className="dash-stat-card stat-blue">
                  <div className="stat-top">
                    <div className="dash-stat-icon"><i className="fa-solid fa-briefcase"></i></div>
                    <span className="stat-trend trend-up"><i className="fa-solid fa-arrow-trend-up"></i> Live</span>
                  </div>
                  <div className="dash-stat-info">
                    <div className="dash-stat-value" id="statPortfolio">{projects.length}</div>
                    <div className="dash-stat-label">ผลงานที่เผยแพร่</div>
                  </div>
                  <div className="stat-progress-bar"><div className="progress-fill" style={{ width: '80%' }}></div></div>
                </div>

                <div className="dash-stat-card stat-green">
                  <div className="stat-top">
                    <div className="dash-stat-icon"><i className="fa-regular fa-envelope"></i></div>
                    <span className="stat-trend trend-new"><i className="fa-solid fa-bell"></i> กล่องข้อความ</span>
                  </div>
                  <div className="dash-stat-info">
                    <div className="dash-stat-value" id="statMessages">{leads.length}</div>
                    <div className="dash-stat-label">ข้อความจากลูกค้า</div>
                  </div>
                  <div className="stat-progress-bar"><div className="progress-fill" style={{ width: '45%' }}></div></div>
                </div>

                <div className="dash-stat-card stat-purple">
                  <div className="stat-top">
                    <div className="dash-stat-icon"><i className="fa-solid fa-calculator"></i></div>
                    <span className="stat-trend trend-purple"><i className="fa-solid fa-microchip"></i> อัตโนมัติ</span>
                  </div>
                  <div className="dash-stat-info">
                    <div className="dash-stat-value" id="statEstimates">{leads.length}</div>
                    <div className="dash-stat-label">รายการประเมินราคา</div>
                  </div>
                  <div className="stat-progress-bar"><div className="progress-fill" style={{ width: '60%' }}></div></div>
                </div>

                <div className="dash-stat-card stat-amber">
                  <div className="stat-top">
                    <div className="dash-stat-icon"><i className="fa-regular fa-eye"></i></div>
                    <span className="stat-trend trend-amber"><i className="fa-solid fa-arrow-trend-up"></i> +18.4%</span>
                  </div>
                  <div className="dash-stat-info">
                    <div className="dash-stat-value" id="statVisitors">1,240</div>
                    <div className="dash-stat-label">ผู้เยี่ยมชมเดือนนี้</div>
                  </div>
                  <div className="stat-progress-bar"><div className="progress-fill" style={{ width: '90%' }}></div></div>
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="dash-card">
                <div className="dash-card-header">
                  <h3><i className="fa-solid fa-bolt" style={{ color: '#F59E0B' }}></i> เมนูด่วน (Quick Actions)</h3>
                </div>
                <div className="dash-quick-actions">
                  <div className="dash-quick-card action-add" onClick={() => setActiveSection('portfolio')}>
                    <div className="action-icon"><i className="fa-solid fa-plus"></i></div>
                    <div className="action-details">
                      <h4>เพิ่มผลงานใหม่</h4>
                      <p>อัปโหลดรูปภาพและรายละเอียดโปรเจ็กต์ใหม่</p>
                    </div>
                    <i className="fa-solid fa-chevron-right action-arrow"></i>
                  </div>

                  <div className="dash-quick-card action-msg" onClick={() => setActiveSection('messages')}>
                    <div className="action-icon"><i className="fa-solid fa-inbox"></i></div>
                    <div className="action-details">
                      <h4>ดูข้อความลูกค้า</h4>
                      <p>อ่านข้อความและตอบกลับผู้ติดต่อ</p>
                    </div>
                    <i className="fa-solid fa-chevron-right action-arrow"></i>
                  </div>

                  <div className="dash-quick-card action-settings" onClick={() => setActiveSection('settings-site')}>
                    <div className="action-icon"><i className="fa-solid fa-sliders"></i></div>
                    <div className="action-details">
                      <h4>ตั้งค่าเว็บไซต์</h4>
                      <p>จัดการโลโก้ ข้อความ และธีมสี</p>
                    </div>
                    <i className="fa-solid fa-chevron-right action-arrow"></i>
                  </div>

                  <div className="dash-quick-card action-site" onClick={() => window.open('/', '_blank')}>
                    <div className="action-icon"><i className="fa-solid fa-arrow-up-right-from-square"></i></div>
                    <div className="action-details">
                      <h4>เปิดดูหน้าเว็บ</h4>
                      <p>ดูการแสดงผลของหน้าเว็บไซต์จริง</p>
                    </div>
                    <i className="fa-solid fa-chevron-right action-arrow"></i>
                  </div>
                </div>
              </div>

              {/* Recent Messages Preview */}
              <div className="dash-card">
                <div className="dash-card-header">
                  <h3><i className="fa-regular fa-envelope"></i> ข้อความล่าสุด</h3>
                  <button className="btn btn-sm btn-glass" onClick={() => setActiveSection('messages')}>ดูทั้งหมด</button>
                </div>
                <div className="dash-card-body" id="overviewRecentMsgs">
                  {leads.length === 0 ? (
                    <div className="dash-activity-empty">
                      <i className="fa-solid fa-inbox" style={{ fontSize: '32px', opacity: 0.3 }}></i>
                      <p>ยังไม่มีข้อความเข้า</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {leads.slice(0, 3).map(l => (
                        <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-surface)', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
                          <div>
                            <div style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{l.name}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>{l.projectType} • งบประมาณ {l.budget}</div>
                          </div>
                          <span className="dash-badge" style={{ background: 'rgba(37,99,235,0.1)', color: 'var(--primary)' }}>{l.date}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* ============ PORTFOLIO ============ */}
          {activeSection === 'portfolio' && (
            <section className="dash-section active" id="sec-portfolio">
              <div className="dash-section-header">
                <div>
                  <h2><i className="fa-solid fa-briefcase"></i> จัดการผลงาน (Portfolio)</h2>
                  <p>เพิ่ม ลบ แก้ไข รายการผลงานที่จะแสดงบนหน้าแรกของเว็บไซต์</p>
                </div>
                <button className="btn btn-primary" id="btnAddProject" onClick={handleOpenAddProject}>
                  <i className="fa-solid fa-plus"></i> เพิ่มผลงานใหม่
                </button>
              </div>

              {/* Search and Category Filter Toolbar */}
              <div className="dash-section-toolbar">
                <div className="dash-search-box">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input
                    type="text"
                    placeholder="ค้นหาชื่อผลงาน, คำอธิบาย..."
                    value={portfolioSearch}
                    onChange={e => setPortfolioSearch(e.target.value)}
                  />
                </div>
                <div className="dash-filter-group">
                  <button
                    className={`dash-filter-btn ${portfolioCategoryFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setPortfolioCategoryFilter('all')}
                  >
                    ทั้งหมด
                  </button>
                  <button
                    className={`dash-filter-btn ${portfolioCategoryFilter === 'saas' ? 'active' : ''}`}
                    onClick={() => setPortfolioCategoryFilter('saas')}
                  >
                    SaaS / Dashboard
                  </button>
                  <button
                    className={`dash-filter-btn ${portfolioCategoryFilter === 'ecommerce' ? 'active' : ''}`}
                    onClick={() => setPortfolioCategoryFilter('ecommerce')}
                  >
                    E-Commerce
                  </button>
                  <button
                    className={`dash-filter-btn ${portfolioCategoryFilter === 'booking' ? 'active' : ''}`}
                    onClick={() => setPortfolioCategoryFilter('booking')}
                  >
                    Booking
                  </button>
                  <button
                    className={`dash-filter-btn ${portfolioCategoryFilter === 'fintech' ? 'active' : ''}`}
                    onClick={() => setPortfolioCategoryFilter('fintech')}
                  >
                    FinTech
                  </button>
                </div>
              </div>

              {/* Portfolio Grid */}
              <div className="dash-portfolio-grid" id="dashPortfolioGrid">
                {filteredProjects.map(proj => (
                  <div key={proj.id} className="dash-portfolio-card">
                    <img src={proj.image} alt={proj.title} className="dash-portfolio-img" />
                    <div className="dash-portfolio-body">
                      <div className="dash-portfolio-cat">{proj.catLabel || proj.category.toUpperCase()}</div>
                      <h4 className="dash-portfolio-title">{proj.title}</h4>
                      <p className="dash-portfolio-desc">{proj.excerpt}</p>
                      <div className="dash-portfolio-tags">
                        {(proj.tags || []).map((t, idx) => (
                          <span key={idx}>{t}</span>
                        ))}
                      </div>
                      <div className="dash-portfolio-actions">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProject(proj);
                            setShowProjectModal(true);
                          }}
                        >
                          <i className="fa-solid fa-pen-to-square"></i> แก้ไข
                        </button>
                        <button
                          type="button"
                          className="dash-btn-delete"
                          onClick={() => handleDeleteProject(proj.id)}
                        >
                          <i className="fa-solid fa-trash"></i> ลบ
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ============ MESSAGES ============ */}
          {activeSection === 'messages' && (
            <section className="dash-section active" id="sec-messages">
              <div className="dash-section-header">
                <div>
                  <h2><i className="fa-regular fa-envelope"></i> ข้อความจากลูกค้า (Messages &amp; Leads)</h2>
                  <p>รายการติดต่อและขอใบเสนอราคาจากหน้าเว็บไซต์</p>
                </div>
              </div>

              <div className="dash-table-card">
                <div className="dash-table-wrapper">
                  <table className="dash-table" id="messagesTable">
                    <thead>
                      <tr>
                        <th>วันที่</th>
                        <th>ชื่อผู้ติดต่อ</th>
                        <th>เบอร์โทร</th>
                        <th>อีเมล</th>
                        <th>ประเภทงาน</th>
                        <th>งบประมาณ</th>
                        <th>การจัดการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="dash-table-empty">
                            ยังไม่มีข้อความส่งเข้ามา
                          </td>
                        </tr>
                      ) : (
                        leads.map(l => (
                          <tr key={l.id}>
                            <td>{l.date}</td>
                            <td><strong>{l.name}</strong></td>
                            <td>{l.phone || '-'}</td>
                            <td>{l.email}</td>
                            <td>{l.projectType}</td>
                            <td><strong style={{ color: 'var(--primary)' }}>{l.budget}</strong></td>
                            <td>
                              <button
                                className="dash-btn-icon-danger"
                                title="ลบข้อความ"
                                onClick={() => handleDeleteLead(l.id)}
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* ============ ESTIMATOR LOGS ============ */}
          {activeSection === 'estimator-logs' && (
            <section className="dash-section active" id="sec-estimator-logs">
              <div className="dash-section-header">
                <div>
                  <h2><i className="fa-solid fa-calculator"></i> รายการคำนวณและประเมินราคา</h2>
                  <p>ประวัติและข้อมูลที่ลูกค้ากดส่งหลังจากคำนวณราคาโปรเจกต์ผ่านหน้าเว็บ</p>
                </div>
              </div>

              <div className="dash-table-card">
                <div className="dash-table-wrapper">
                  <table className="dash-table">
                    <thead>
                      <tr>
                        <th>วันที่</th>
                        <th>ผู้ประเมิน</th>
                        <th>ประเภทบริการ</th>
                        <th>ระยะเวลา</th>
                        <th>งบประมาณที่ประเมิน</th>
                        <th>การจัดการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="dash-table-empty">
                            ยังไม่มีรายการคำนวณราคา
                          </td>
                        </tr>
                      ) : (
                        leads.map(l => (
                          <tr key={l.id}>
                            <td>{l.date}</td>
                            <td><strong>{l.name}</strong> ({l.email})</td>
                            <td>{l.projectType}</td>
                            <td>{l.timeline || 'ตามตกลง'}</td>
                            <td><strong style={{ color: '#10B981' }}>{l.budget}</strong></td>
                            <td>
                              <button
                                className="dash-btn-icon-danger"
                                title="ลบ"
                                onClick={() => handleDeleteLead(l.id)}
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* ============ SETTINGS: ESTIMATOR PRICING (ULTRA-PREMIUM UI) ============ */}
          {activeSection === 'settings-estimator' && (() => {
            const currentBasePrice = estimatorForm?.basePrices?.[simType] || 0;
            const currentFeaturesPrice = simFeatures.reduce((sum, fKey) => {
              return sum + (estimatorForm?.featurePrices?.[fKey as keyof typeof estimatorForm.featurePrices] || 0);
            }, 0);
            const simSubtotal = currentBasePrice + currentFeaturesPrice;
            const simFinal = simSpeed ? Math.round(simSubtotal * (estimatorForm?.speedMultiplier || 1.25)) : simSubtotal;

            return (
              <section className="dash-section active" id="sec-settings-estimator">
                {/* Header Banner */}
                <div className="dash-pricing-header-banner">
                  <div className="dash-pricing-header-info">
                    <h2>
                      <i className="fa-solid fa-calculator" style={{ color: 'var(--primary)' }}></i>
                      ตั้งค่าราคาประเมิน (Estimator Pricing Configurator)
                    </h2>
                    <p>
                      กำหนดเรทราคาโปรเจกต์หลักและโมดูลฟังก์ชันเสริม ข้อมูลจะถูกซิงค์ไปยังหน้าคำนวณราคาแบบ Real-time ทันที
                    </p>
                  </div>
                  <div className="dash-pricing-presets-bar">
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>ชุดราคาแนะนำ:</span>
                    <button
                      type="button"
                      className="dash-preset-btn"
                      onClick={() => handleApplyPricingPreset('standard')}
                    >
                      <i className="fa-solid fa-layer-group" style={{ color: '#3B82F6' }}></i> Standard SaaS
                    </button>
                    <button
                      type="button"
                      className="dash-preset-btn"
                      onClick={() => handleApplyPricingPreset('enterprise')}
                    >
                      <i className="fa-solid fa-crown" style={{ color: '#F59E0B' }}></i> Enterprise High-End
                    </button>
                    <button
                      type="button"
                      className="dash-preset-btn"
                      onClick={() => handleApplyPricingPreset('startup')}
                    >
                      <i className="fa-solid fa-rocket" style={{ color: '#10B981' }}></i> Startup Lean
                    </button>
                  </div>
                </div>

                {/* Main 2-Column Container */}
                <form onSubmit={handleSaveEstimatorSettings}>
                  <div className="dash-pricing-container">
                    {/* Left Column: Configuration Cards */}
                    <div className="dash-pricing-left-col">
                      {/* Group 1: Base Project Prices */}
                      <div className="dash-pricing-card-group">
                        <div className="dash-pricing-group-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className="fa-solid fa-cubes" style={{ color: 'var(--primary)' }}></i>
                            <span>1. ราคาเริ่มต้นประเภทโปรเจกต์หลัก (Base Architecture Rates)</span>
                          </div>
                          <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={() => setShowAddProjectTypeModal(true)}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer' }}
                          >
                            <i className="fa-solid fa-plus"></i> เพิ่มประเภทโปรเจกต์
                          </button>
                        </div>

                        <div className="dash-pricing-cards-grid">
                          {/* 1.1 Custom Web App */}
                          <div className="dash-pricing-item-card">
                            <div className="dash-pricing-card-head">
                              <div className="dash-pricing-card-icon blue">
                                <i className="fa-solid fa-code"></i>
                              </div>
                              <div className="dash-pricing-card-titles">
                                <h4>Custom Web App</h4>
                                <p>เว็บแอปพลิเคชันระบบเฉพาะทาง</p>
                              </div>
                            </div>
                            <div>
                              <div className="dash-pricing-input-box">
                                <span className="dash-pricing-currency-prefix">฿</span>
                                <input
                                  type="number"
                                  min="0"
                                  step="any"
                                  className="dash-pricing-number-input"
                                  value={estimatorForm?.basePrices?.webapp ?? ''}
                                  onFocus={e => e.target.select()}
                                  onChange={e => {
                                    const val = e.target.value === '' ? 0 : Number(e.target.value);
                                    setEstimatorForm(prev => ({
                                      ...prev,
                                      basePrices: { ...prev?.basePrices, webapp: isNaN(val) ? 0 : val }
                                    }));
                                  }}
                                  required
                                />
                              </div>
                              <div className="dash-pricing-stepper-btns">
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustBasePrice('webapp', -5000)}>-5k</button>
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustBasePrice('webapp', 5000)}>+5k</button>
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustBasePrice('webapp', 10000)}>+10k</button>
                              </div>
                            </div>
                          </div>

                          {/* 1.2 Enterprise Dashboard */}
                          <div className="dash-pricing-item-card">
                            <div className="dash-pricing-card-head">
                              <div className="dash-pricing-card-icon purple">
                                <i className="fa-solid fa-chart-pie"></i>
                              </div>
                              <div className="dash-pricing-card-titles">
                                <h4>Enterprise Dashboard &amp; CRM</h4>
                                <p>แดชบอร์ดบริหาร สถิติ &amp; CRM</p>
                              </div>
                            </div>
                            <div>
                              <div className="dash-pricing-input-box">
                                <span className="dash-pricing-currency-prefix">฿</span>
                                <input
                                  type="number"
                                  min="0"
                                  step="any"
                                  className="dash-pricing-number-input"
                                  value={estimatorForm?.basePrices?.dashboard ?? ''}
                                  onFocus={e => e.target.select()}
                                  onChange={e => {
                                    const val = e.target.value === '' ? 0 : Number(e.target.value);
                                    setEstimatorForm(prev => ({
                                      ...prev,
                                      basePrices: { ...prev?.basePrices, dashboard: isNaN(val) ? 0 : val }
                                    }));
                                  }}
                                  required
                                />
                              </div>
                              <div className="dash-pricing-stepper-btns">
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustBasePrice('dashboard', -5000)}>-5k</button>
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustBasePrice('dashboard', 5000)}>+5k</button>
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustBasePrice('dashboard', 10000)}>+10k</button>
                              </div>
                            </div>
                          </div>

                          {/* 1.3 E-Commerce */}
                          <div className="dash-pricing-item-card">
                            <div className="dash-pricing-card-head">
                              <div className="dash-pricing-card-icon emerald">
                                <i className="fa-solid fa-cart-shopping"></i>
                              </div>
                              <div className="dash-pricing-card-titles">
                                <h4>E-Commerce &amp; Booking</h4>
                                <p>ร้านค้าออนไลน์และระบบนัดหมาย</p>
                              </div>
                            </div>
                            <div>
                              <div className="dash-pricing-input-box">
                                <span className="dash-pricing-currency-prefix">฿</span>
                                <input
                                  type="number"
                                  min="0"
                                  step="any"
                                  className="dash-pricing-number-input"
                                  value={estimatorForm?.basePrices?.ecommerce ?? ''}
                                  onFocus={e => e.target.select()}
                                  onChange={e => {
                                    const val = e.target.value === '' ? 0 : Number(e.target.value);
                                    setEstimatorForm(prev => ({
                                      ...prev,
                                      basePrices: { ...prev?.basePrices, ecommerce: isNaN(val) ? 0 : val }
                                    }));
                                  }}
                                  required
                                />
                              </div>
                              <div className="dash-pricing-stepper-btns">
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustBasePrice('ecommerce', -5000)}>-5k</button>
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustBasePrice('ecommerce', 5000)}>+5k</button>
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustBasePrice('ecommerce', 10000)}>+10k</button>
                              </div>
                            </div>
                          </div>

                          {/* 1.4 Corporate Showcase */}
                          <div className="dash-pricing-item-card">
                            <div className="dash-pricing-card-head">
                              <div className="dash-pricing-card-icon cyan">
                                <i className="fa-solid fa-globe"></i>
                              </div>
                              <div className="dash-pricing-card-titles">
                                <h4>Corporate Showcase Website</h4>
                                <p>เว็บองค์กรพรีเมียม โหลดเร็ว &amp; SEO</p>
                              </div>
                            </div>
                            <div>
                              <div className="dash-pricing-input-box">
                                <span className="dash-pricing-currency-prefix">฿</span>
                                <input
                                  type="number"
                                  min="0"
                                  step="any"
                                  className="dash-pricing-number-input"
                                  value={estimatorForm?.basePrices?.corporate ?? ''}
                                  onFocus={e => e.target.select()}
                                  onChange={e => {
                                    const val = e.target.value === '' ? 0 : Number(e.target.value);
                                    setEstimatorForm(prev => ({
                                      ...prev,
                                      basePrices: { ...prev?.basePrices, corporate: isNaN(val) ? 0 : val }
                                    }));
                                  }}
                                  required
                                />
                              </div>
                              <div className="dash-pricing-stepper-btns">
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustBasePrice('corporate', -5000)}>-5k</button>
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustBasePrice('corporate', 5000)}>+5k</button>
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustBasePrice('corporate', 10000)}>+10k</button>
                              </div>
                            </div>
                          </div>

                          {/* 1.X Dynamically Added Custom Project Types */}
                          {(estimatorForm?.customProjectTypes || []).map((customItem) => (
                            <div key={customItem.id} className="dash-pricing-item-card" style={{ position: 'relative', border: '1px solid rgba(var(--primary-rgb), 0.35)' }}>
                              <div className="dash-pricing-card-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                  <div className={`dash-pricing-card-icon ${customItem.color || 'blue'}`}>
                                    <i className={`fa-solid ${customItem.icon || 'fa-cubes'}`}></i>
                                  </div>
                                  <div className="dash-pricing-card-titles">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                      <h4>{customItem.name}</h4>
                                      <span style={{ fontSize: '0.68rem', padding: '2px 6px', background: 'rgba(var(--primary-rgb), 0.15)', color: 'var(--primary)', borderRadius: '4px', fontWeight: 700 }}>Custom</span>
                                    </div>
                                    <p>{customItem.desc || 'ประเภทโปรเจกต์กำหนดเอง'}</p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  className="dash-btn-icon-danger"
                                  title="ลบประเภทโปรเจกต์นี้"
                                  onClick={() => handleDeleteCustomProjectType(customItem.id, customItem.name)}
                                  style={{ padding: '4px 8px', fontSize: '0.82rem' }}
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                              </div>
                              <div>
                                <div className="dash-pricing-input-box">
                                  <span className="dash-pricing-currency-prefix">฿</span>
                                  <input
                                    type="number"
                                    min="0"
                                    step="any"
                                    className="dash-pricing-number-input"
                                    value={estimatorForm?.basePrices?.[customItem.id] ?? customItem.price ?? ''}
                                    onFocus={e => e.target.select()}
                                    onChange={e => updateCustomPriceDirect(customItem.id, e.target.value === '' ? 0 : Number(e.target.value))}
                                    required
                                  />
                                </div>
                                <div className="dash-pricing-stepper-btns">
                                  <button type="button" className="dash-stepper-btn" onClick={() => adjustCustomBasePrice(customItem.id, -5000)}>-5k</button>
                                  <button type="button" className="dash-stepper-btn" onClick={() => adjustCustomBasePrice(customItem.id, 5000)}>+5k</button>
                                  <button type="button" className="dash-stepper-btn" onClick={() => adjustCustomBasePrice(customItem.id, 10000)}>+10k</button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Group 2: Add-on Feature Prices */}
                      <div className="dash-pricing-card-group">
                        <div className="dash-pricing-group-title">
                          <i className="fa-solid fa-puzzle-piece" style={{ color: 'var(--primary)' }}></i>
                          <span>2. ราคาฟังก์ชันและโมดูลเสริม (Add-on Feature Rates)</span>
                        </div>

                        <div className="dash-pricing-cards-grid">
                          {/* 2.1 Auth */}
                          <div className="dash-pricing-item-card">
                            <div className="dash-pricing-card-head">
                              <div className="dash-pricing-card-icon blue">
                                <i className="fa-solid fa-shield-halved"></i>
                              </div>
                              <div className="dash-pricing-card-titles">
                                <h4>ระบบสมาชิก &amp; สิทธิ์ (Auth &amp; RBAC)</h4>
                                <p>Login, Register, Role-Based Access</p>
                              </div>
                            </div>
                            <div>
                              <div className="dash-pricing-input-box">
                                <span className="dash-pricing-currency-prefix">+฿</span>
                                <input
                                  type="number"
                                  min="0"
                                  step="any"
                                  className="dash-pricing-number-input"
                                  value={estimatorForm?.featurePrices?.auth ?? ''}
                                  onFocus={e => e.target.select()}
                                  onChange={e => {
                                    const val = e.target.value === '' ? 0 : Number(e.target.value);
                                    setEstimatorForm(prev => ({
                                      ...prev,
                                      featurePrices: { ...prev?.featurePrices, auth: isNaN(val) ? 0 : val }
                                    }));
                                  }}
                                  required
                                />
                              </div>
                              <div className="dash-pricing-stepper-btns">
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustFeaturePrice('auth', -1000)}>-1k</button>
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustFeaturePrice('auth', 1000)}>+1k</button>
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustFeaturePrice('auth', 5000)}>+5k</button>
                              </div>
                            </div>
                          </div>

                          {/* 2.2 Payment */}
                          <div className="dash-pricing-item-card">
                            <div className="dash-pricing-card-head">
                              <div className="dash-pricing-card-icon emerald">
                                <i className="fa-solid fa-credit-card"></i>
                              </div>
                              <div className="dash-pricing-card-titles">
                                <h4>ชำระเงินอัตโนมัติ (Payment Gateway)</h4>
                                <p>PromptPay QR, บัตรเครดิต, ใบเสร็จ</p>
                              </div>
                            </div>
                            <div>
                              <div className="dash-pricing-input-box">
                                <span className="dash-pricing-currency-prefix">+฿</span>
                                <input
                                  type="number"
                                  min="0"
                                  step="any"
                                  className="dash-pricing-number-input"
                                  value={estimatorForm?.featurePrices?.payment ?? ''}
                                  onFocus={e => e.target.select()}
                                  onChange={e => {
                                    const val = e.target.value === '' ? 0 : Number(e.target.value);
                                    setEstimatorForm(prev => ({
                                      ...prev,
                                      featurePrices: { ...prev?.featurePrices, payment: isNaN(val) ? 0 : val }
                                    }));
                                  }}
                                  required
                                />
                              </div>
                              <div className="dash-pricing-stepper-btns">
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustFeaturePrice('payment', -1000)}>-1k</button>
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustFeaturePrice('payment', 1000)}>+1k</button>
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustFeaturePrice('payment', 5000)}>+5k</button>
                              </div>
                            </div>
                          </div>

                          {/* 2.3 Notification */}
                          <div className="dash-pricing-item-card">
                            <div className="dash-pricing-card-head">
                              <div className="dash-pricing-card-icon amber">
                                <i className="fa-solid fa-bell"></i>
                              </div>
                              <div className="dash-pricing-card-titles">
                                <h4>ระบบแจ้งเตือน (LINE &amp; Email)</h4>
                                <p>LINE Official Notify, Email Auto-Alert</p>
                              </div>
                            </div>
                            <div>
                              <div className="dash-pricing-input-box">
                                <span className="dash-pricing-currency-prefix">+฿</span>
                                <input
                                  type="number"
                                  min="0"
                                  step="any"
                                  className="dash-pricing-number-input"
                                  value={estimatorForm?.featurePrices?.notification ?? ''}
                                  onFocus={e => e.target.select()}
                                  onChange={e => {
                                    const val = e.target.value === '' ? 0 : Number(e.target.value);
                                    setEstimatorForm(prev => ({
                                      ...prev,
                                      featurePrices: { ...prev?.featurePrices, notification: isNaN(val) ? 0 : val }
                                    }));
                                  }}
                                  required
                                />
                              </div>
                              <div className="dash-pricing-stepper-btns">
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustFeaturePrice('notification', -1000)}>-1k</button>
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustFeaturePrice('notification', 1000)}>+1k</button>
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustFeaturePrice('notification', 5000)}>+5k</button>
                              </div>
                            </div>
                          </div>

                          {/* 2.4 Export */}
                          <div className="dash-pricing-item-card">
                            <div className="dash-pricing-card-head">
                              <div className="dash-pricing-card-icon rose">
                                <i className="fa-solid fa-file-invoice"></i>
                              </div>
                              <div className="dash-pricing-card-titles">
                                <h4>ส่งออกรายงาน (PDF &amp; Excel)</h4>
                                <p>Auto-generate PDF Report &amp; Excel</p>
                              </div>
                            </div>
                            <div>
                              <div className="dash-pricing-input-box">
                                <span className="dash-pricing-currency-prefix">+฿</span>
                                <input
                                  type="number"
                                  min="0"
                                  step="any"
                                  className="dash-pricing-number-input"
                                  value={estimatorForm?.featurePrices?.export ?? ''}
                                  onFocus={e => e.target.select()}
                                  onChange={e => {
                                    const val = e.target.value === '' ? 0 : Number(e.target.value);
                                    setEstimatorForm(prev => ({
                                      ...prev,
                                      featurePrices: { ...prev?.featurePrices, export: isNaN(val) ? 0 : val }
                                    }));
                                  }}
                                  required
                                />
                              </div>
                              <div className="dash-pricing-stepper-btns">
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustFeaturePrice('export', -1000)}>-1k</button>
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustFeaturePrice('export', 1000)}>+1k</button>
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustFeaturePrice('export', 5000)}>+5k</button>
                              </div>
                            </div>
                          </div>

                          {/* 2.5 AI Copilot */}
                          <div className="dash-pricing-item-card">
                            <div className="dash-pricing-card-head">
                              <div className="dash-pricing-card-icon purple">
                                <i className="fa-solid fa-brain"></i>
                              </div>
                              <div className="dash-pricing-card-titles">
                                <h4>AI Copilot &amp; Chatbot</h4>
                                <p>OpenAI / Claude LLM System Integration</p>
                              </div>
                            </div>
                            <div>
                              <div className="dash-pricing-input-box">
                                <span className="dash-pricing-currency-prefix">+฿</span>
                                <input
                                  type="number"
                                  min="0"
                                  step="any"
                                  className="dash-pricing-number-input"
                                  value={estimatorForm?.featurePrices?.ai ?? ''}
                                  onFocus={e => e.target.select()}
                                  onChange={e => {
                                    const val = e.target.value === '' ? 0 : Number(e.target.value);
                                    setEstimatorForm(prev => ({
                                      ...prev,
                                      featurePrices: { ...prev?.featurePrices, ai: isNaN(val) ? 0 : val }
                                    }));
                                  }}
                                  required
                                />
                              </div>
                              <div className="dash-pricing-stepper-btns">
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustFeaturePrice('ai', -1000)}>-1k</button>
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustFeaturePrice('ai', 1000)}>+1k</button>
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustFeaturePrice('ai', 5000)}>+5k</button>
                              </div>
                            </div>
                          </div>

                          {/* 2.6 Multilingual */}
                          <div className="dash-pricing-item-card">
                            <div className="dash-pricing-card-head">
                              <div className="dash-pricing-card-icon cyan">
                                <i className="fa-solid fa-language"></i>
                              </div>
                              <div className="dash-pricing-card-titles">
                                <h4>ระบบหลายภาษา (Multilingual)</h4>
                                <p>รองรับสลับภาษา TH / EN / CN</p>
                              </div>
                            </div>
                            <div>
                              <div className="dash-pricing-input-box">
                                <span className="dash-pricing-currency-prefix">+฿</span>
                                <input
                                  type="number"
                                  min="0"
                                  step="any"
                                  className="dash-pricing-number-input"
                                  value={estimatorForm?.featurePrices?.multilang ?? ''}
                                  onFocus={e => e.target.select()}
                                  onChange={e => {
                                    const val = e.target.value === '' ? 0 : Number(e.target.value);
                                    setEstimatorForm(prev => ({
                                      ...prev,
                                      featurePrices: { ...prev?.featurePrices, multilang: isNaN(val) ? 0 : val }
                                    }));
                                  }}
                                  required
                                />
                              </div>
                              <div className="dash-pricing-stepper-btns">
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustFeaturePrice('multilang', -1000)}>-1k</button>
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustFeaturePrice('multilang', 1000)}>+1k</button>
                                <button type="button" className="dash-stepper-btn" onClick={() => adjustFeaturePrice('multilang', 5000)}>+5k</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Group 3: Speed Multiplier */}
                      <div className="dash-pricing-card-group">
                        <div className="dash-pricing-group-title">
                          <i className="fa-solid fa-bolt" style={{ color: '#F59E0B' }}></i>
                          <span>3. ตัวคูณงานเร่งด่วน (Express Speed Multiplier)</span>
                        </div>

                        <div className="dash-speed-card">
                          <div className="dash-speed-info">
                            <div className="dash-speed-badge-box">
                              <div className="dash-speed-val">{estimatorForm?.speedMultiplier || 1.25}x</div>
                              <div className="dash-speed-markup">+{Math.round(((estimatorForm?.speedMultiplier || 1.25) - 1) * 100)}% สำหรับงานด่วน</div>
                            </div>
                            <div>
                              <h4 style={{ fontWeight: 700, color: 'var(--text-heading)', marginBottom: '4px' }}>
                                อัตราคิดเพิ่มเมื่อลูกค้าเลือกความเร็ว "ด่วนพิเศษ"
                              </h4>
                              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                ระบบจะคูณตัวเลขนี้กับราคารวมสุทธิเมื่อลูกค้าเลือกส่งมอบแบบ Fast Track
                              </p>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <input
                              type="range"
                              min="1.0"
                              max="2.0"
                              step="0.05"
                              value={estimatorForm?.speedMultiplier || 1.25}
                              onChange={e => setEstimatorForm({
                                ...estimatorForm,
                                speedMultiplier: Number(e.target.value) || 1.25
                              })}
                              style={{ width: '160px', accentColor: '#F59E0B', cursor: 'pointer' }}
                            />
                            <div className="dash-pricing-input-box" style={{ width: '90px' }}>
                              <input
                                type="number"
                                min="1.0"
                                max="3.0"
                                step="0.05"
                                className="dash-pricing-number-input"
                                style={{ textAlign: 'center' }}
                                value={estimatorForm?.speedMultiplier || 1.25}
                                onChange={e => setEstimatorForm({
                                  ...estimatorForm,
                                  speedMultiplier: Number(e.target.value) || 1.25
                                })}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Interactive Live Simulator Test Drive */}
                    <div className="dash-pricing-right-col">
                      <div className="dash-simulator-widget">
                        <div className="dash-simulator-head">
                          <h3>
                            <i className="fa-solid fa-wand-magic-sparkles" style={{ color: 'var(--primary)' }}></i>
                            จำลองคำนวณราคาจริง
                          </h3>
                          <span className="dash-simulator-pill">Live Preview</span>
                        </div>

                        {/* Calculated Price Display */}
                        <div className="dash-simulator-calc-box">
                          <div className="dash-simulator-calc-label">งบประมาณประเมินโดยประมาณ</div>
                          <div className="dash-simulator-calc-price">
                            ฿{simFinal.toLocaleString()}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                            {simSpeed ? '⚡ รวมค่าบริการส่งมอบด่วนพิเศษแล้ว' : '⏱️ ระยะเวลาพัฒนามาตรฐาน'}
                          </div>
                        </div>

                        {/* Project Type Selector */}
                        <div className="dash-simulator-select-group">
                          <label>ประเภทโปรเจกต์ทดสอบ:</label>
                          <select
                            className="dash-select"
                            value={simType}
                            onChange={e => setSimType(e.target.value)}
                          >
                            <option value="webapp">Custom Web App (฿{(estimatorForm?.basePrices?.webapp || 0).toLocaleString()})</option>
                            <option value="dashboard">Dashboard &amp; CRM (฿{(estimatorForm?.basePrices?.dashboard || 0).toLocaleString()})</option>
                            <option value="ecommerce">E-Commerce (฿{(estimatorForm?.basePrices?.ecommerce || 0).toLocaleString()})</option>
                            <option value="corporate">Corporate Website (฿{(estimatorForm?.basePrices?.corporate || 0).toLocaleString()})</option>
                            {(estimatorForm?.customProjectTypes || []).map(c => (
                              <option key={c.id} value={c.id}>
                                {c.name} (฿{(estimatorForm?.basePrices?.[c.id] ?? c.price ?? 0).toLocaleString()})
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Add-on Feature Checkboxes */}
                        <div className="dash-simulator-select-group">
                          <label>เลือกฟังก์ชันเสริม:</label>
                          <div className="dash-simulator-features-list">
                            {[
                              { id: 'auth', name: 'ระบบสมาชิก & RBAC', price: estimatorForm?.featurePrices?.auth || 0 },
                              { id: 'payment', name: 'ชำระเงินอัตโนมัติ', price: estimatorForm?.featurePrices?.payment || 0 },
                              { id: 'notification', name: 'แจ้งเตือน LINE / Email', price: estimatorForm?.featurePrices?.notification || 0 },
                              { id: 'export', name: 'ส่งออก PDF / Excel', price: estimatorForm?.featurePrices?.export || 0 },
                              { id: 'ai', name: 'AI Copilot & Chatbot', price: estimatorForm?.featurePrices?.ai || 0 },
                              { id: 'multilang', name: 'ระบบหลายภาษา (TH/EN)', price: estimatorForm?.featurePrices?.multilang || 0 },
                            ].map(feat => {
                              const isChecked = simFeatures.includes(feat.id);
                              return (
                                <div
                                  key={feat.id}
                                  className={`dash-sim-feature-toggle ${isChecked ? 'active' : ''}`}
                                  onClick={() => {
                                    if (isChecked) {
                                      setSimFeatures(simFeatures.filter(f => f !== feat.id));
                                    } else {
                                      setSimFeatures([...simFeatures, feat.id]);
                                    }
                                  }}
                                >
                                  <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', margin: 0, color: 'inherit' }}>
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => {}}
                                    />
                                    <span>{feat.name}</span>
                                  </label>
                                  <span style={{ fontWeight: 700, fontSize: '0.78rem' }}>+฿{feat.price.toLocaleString()}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Express Speed Toggle */}
                        <div
                          className={`dash-sim-feature-toggle ${simSpeed ? 'active' : ''}`}
                          style={{ marginBottom: '20px' }}
                          onClick={() => setSimSpeed(!simSpeed)}
                        >
                          <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', margin: 0, color: 'inherit' }}>
                            <input
                              type="checkbox"
                              checked={simSpeed}
                              onChange={() => {}}
                            />
                            <span>⚡ ส่งมอบด่วนพิเศษ ({estimatorForm?.speedMultiplier || 1.25}x)</span>
                          </label>
                          <span style={{ fontWeight: 700, fontSize: '0.78rem', color: '#F59E0B' }}>
                            {simSpeed ? 'เปิดใช้งาน' : 'ปิด'}
                          </span>
                        </div>

                        <Link
                          href="/estimator"
                          target="_blank"
                          className="btn btn-secondary"
                          style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
                        >
                          <i className="fa-solid fa-arrow-up-right-from-square"></i>
                          เปิดหน้าคำนวณราคาของลูกค้าจริง
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Sticky Floating Save Action Bar */}
                  <div className="dash-sticky-action-bar">
                    <div className="dash-sticky-action-info">
                      <div className="dash-bar-status-chip">
                        <span className="dash-bar-ping-wrap">
                          <span className="dash-bar-ping-ring"></span>
                          <span className="dash-bar-ping-dot"></span>
                        </span>
                        <i className="fa-solid fa-cloud"></i>
                        <span>REALTIME SYNC</span>
                      </div>
                      <span className="dash-bar-info-text">
                        ซิงค์ตรงกับฐานข้อมูล <strong className="dash-bar-highlight">Supabase Cloud PostgreSQL</strong> Real-time
                      </span>
                    </div>
                    <div className="dash-sticky-action-btns">
                      <button
                        type="button"
                        className="dash-bar-btn dash-bar-reset-btn"
                        onClick={() => handleApplyPricingPreset('standard')}
                      >
                        <i className="fa-solid fa-rotate-left"></i> รีเซ็ตเป็นค่ามาตรฐาน
                      </button>
                      <button
                        type="submit"
                        className="dash-bar-btn dash-bar-save-btn"
                      >
                        <i className="fa-solid fa-floppy-disk"></i> บันทึกและซิงค์ทันที 🚀
                      </button>
                    </div>
                  </div>
                </form>
              </section>
            );
          })()}

          {/* ============ SETTINGS: SITE ============ */}
          {activeSection === 'settings-site' && (
            <section className="dash-section active" id="sec-settings-site">
              <div className="dash-section-header">
                <div>
                  <h2><i className="fa-solid fa-globe"></i> ข้อมูลเว็บไซต์ (Site Settings)</h2>
                  <p>จัดการข้อความหลัก ชื่อสตูดิโอ และภาษา/เทคโนโลยีที่ใช้พัฒนา</p>
                </div>
              </div>

              <div className="dash-card">
                <form className="dash-form" onSubmit={handleSaveSiteSettings}>
                  <div className="dash-form-row">
                    <div className="dash-form-group">
                      <label>ชื่อสตูดิโอ / เว็บไซต์ (Site Name)</label>
                      <input
                        type="text"
                        value={siteForm.siteName}
                        onChange={e => setSiteForm({ ...siteForm, siteName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="dash-form-group">
                      <label>ภาษาหลักเริ่มต้น (Language)</label>
                      <select
                        className="dash-select"
                        value={siteForm.siteLang}
                        onChange={e => setSiteForm({ ...siteForm, siteLang: e.target.value as 'th' | 'en' })}
                      >
                        <option value="th">ไทย (TH)</option>
                        <option value="en">English (EN)</option>
                      </select>
                    </div>
                  </div>

                  <div className="dash-form-row">
                    <div className="dash-form-group">
                      <label>หัวข้อหลัก Hero บรรทัดแรก (Hero Title Line 1)</label>
                      <input
                        type="text"
                        value={siteForm.heroTitle1}
                        onChange={e => setSiteForm({ ...siteForm, heroTitle1: e.target.value })}
                        required
                      />
                    </div>
                    <div className="dash-form-group">
                      <label>หัวข้อหลักเน้นสี Gradient (Hero Title Gradient)</label>
                      <input
                        type="text"
                        value={siteForm.heroTitleGrad}
                        onChange={e => setSiteForm({ ...siteForm, heroTitleGrad: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="dash-form-group">
                    <label>คำบรรยายใต้หัวข้อหลัก (Hero Subtitle)</label>
                    <textarea
                      rows={3}
                      value={siteForm.heroSubtitle}
                      onChange={e => setSiteForm({ ...siteForm, heroSubtitle: e.target.value })}
                    />
                  </div>

                  <div className="dash-form-group">
                    <label>เทคโนโลยีและภาษาที่ใช้พัฒนา (Tech Stack Ticker - คั่นด้วยเครื่องหมายจุลภาค ,)</label>
                    <textarea
                      rows={3}
                      value={siteForm.siteTechStack}
                      onChange={e => setSiteForm({ ...siteForm, siteTechStack: e.target.value })}
                      placeholder="Next.js 16, React 19, TypeScript, Node.js..."
                    />
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-sub)', marginTop: '4px', display: 'block' }}>
                      เทคโนโลยีที่ระบุที่นี่จะนำไปแสดงในแถบ Tech Stack Ticker ด้านบนของหน้าเว็บโดยอัตโนมัติ
                    </span>
                  </div>

                  <div className="dash-form-actions">
                    <button type="submit" className="btn btn-primary">
                      <i className="fa-solid fa-floppy-disk"></i> บันทึกข้อมูลเว็บไซต์
                    </button>
                  </div>
                </form>
              </div>
            </section>
          )}

          {/* ============ SETTINGS: CONTACT ============ */}
          {activeSection === 'settings-contact' && (
            <section className="dash-section active" id="sec-settings-contact">
              <div className="dash-section-header">
                <div>
                  <h2><i className="fa-solid fa-phone"></i> ช่องทางติดต่อ (Contact Settings)</h2>
                  <p>จัดการอีเมล เบอร์โทร LINE Official และที่อยู่ของสตูดิโอ</p>
                </div>
              </div>

              <div className="dash-card">
                <form className="dash-form" onSubmit={handleSaveContactSettings}>
                  <div className="dash-form-row">
                    <div className="dash-form-group">
                      <label>อีเมลติดต่อหลัก (Email)</label>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="dash-form-group">
                      <label>เบอร์โทรศัพท์ (Phone)</label>
                      <input
                        type="text"
                        value={contactForm.phone}
                        onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="dash-form-group">
                    <label>LINE Official ID (LINE OA)</label>
                    <input
                      type="text"
                      value={contactForm.line}
                      onChange={e => setContactForm({ ...contactForm, line: e.target.value })}
                    />
                  </div>

                  <div className="dash-form-group">
                    <label>ที่อยู่สำนักงาน / สตูดิโอ (Address)</label>
                    <textarea
                      rows={3}
                      value={contactForm.address}
                      onChange={e => setContactForm({ ...contactForm, address: e.target.value })}
                    />
                  </div>

                  <div className="dash-form-actions">
                    <button type="submit" className="btn btn-primary">
                      <i className="fa-solid fa-floppy-disk"></i> บันทึกช่องทางติดต่อ
                    </button>
                  </div>
                </form>
              </div>
            </section>
          )}

          {/* ============ SETTINGS: SOCIAL ============ */}
          {activeSection === 'settings-social' && (
            <section className="dash-section active" id="sec-settings-social">
              <div className="dash-section-header">
                <div>
                  <h2><i className="fa-solid fa-share-nodes"></i> โซเชียลมีเดีย (Social Links)</h2>
                  <p>จัดการลิงก์โซเชียลมีเดียต่างๆ ที่แสดงใน Footer และหน้าติดต่อ</p>
                </div>
              </div>

              <div className="dash-card">
                <form className="dash-form" onSubmit={handleSaveSocialSettings}>
                  <div className="dash-form-group">
                    <label><i className="fa-brands fa-github"></i> GitHub URL</label>
                    <input
                      type="url"
                      value={socialForm.github}
                      onChange={e => setSocialForm({ ...socialForm, github: e.target.value })}
                    />
                  </div>

                  <div className="dash-form-group">
                    <label><i className="fa-brands fa-linkedin"></i> LinkedIn URL</label>
                    <input
                      type="url"
                      value={socialForm.linkedin}
                      onChange={e => setSocialForm({ ...socialForm, linkedin: e.target.value })}
                    />
                  </div>

                  <div className="dash-form-group">
                    <label><i className="fa-brands fa-facebook"></i> Facebook Page URL</label>
                    <input
                      type="url"
                      value={socialForm.facebook}
                      onChange={e => setSocialForm({ ...socialForm, facebook: e.target.value })}
                    />
                  </div>

                  <div className="dash-form-actions">
                    <button type="submit" className="btn btn-primary">
                      <i className="fa-solid fa-floppy-disk"></i> บันทึก Social Links
                    </button>
                  </div>
                </form>
              </div>
            </section>
          )}

          {/* ============ SETTINGS: THEME ============ */}
          {activeSection === 'settings-theme' && (
            <section className="dash-section active" id="sec-settings-theme">
              <div className="dash-section-header">
                <div>
                  <h2><i className="fa-solid fa-palette"></i> ธีมและดีไซน์ (Theme &amp; Design)</h2>
                  <p>เลือกชุดคู่สีและฟอนต์สำเร็จรูป (1-Click Presets) หรือปรับแต่งสีอิสระแบบ Real-time</p>
                </div>
              </div>

              {/* 1-Click Theme Presets Section */}
              <div className="dash-theme-presets-intro">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="fa-solid fa-wand-magic-sparkles" style={{ color: 'var(--primary)' }}></i>
                    ชุดธีมและคู่สีสำเร็จรูป (1-Click Presets)
                  </h3>
                  <span className="dash-badge" style={{ background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary)' }}>
                    {THEME_PRESETS.length} สไตล์ดีไซน์
                  </span>
                </div>
                <p>คลิกเลือกสไตล์ที่ต้องการเพื่อปรับใช้ชุดสีและฟอนต์ทั่วทั้งเว็บไซต์ทันที โดยไม่ต้องตั้งค่าเองทีละส่วน</p>
              </div>

              <div className="dash-presets-grid">
                {THEME_PRESETS.map(preset => {
                  const isCurrent =
                    primaryColor.toLowerCase() === preset.primaryColor.toLowerCase() &&
                    secondaryColor.toLowerCase() === preset.secondaryColor.toLowerCase();

                  return (
                    <div
                      key={preset.id}
                      className={`dash-preset-card ${isCurrent ? 'active' : ''}`}
                      onClick={() => handleSelectPreset(preset)}
                    >
                      <div className="dash-preset-top">
                        <div className="dash-preset-colors">
                          <span className="dash-color-circle" style={{ background: preset.primaryColor }} title="สีหลัก" />
                          <span className="dash-color-circle" style={{ background: preset.secondaryColor }} title="สีรอง" />
                          <div
                            className="dash-color-gradient-bar"
                            style={{ background: `linear-gradient(135deg, ${preset.primaryColor}, ${preset.secondaryColor})` }}
                          />
                        </div>
                        <span className="dash-preset-tag">{preset.tag}</span>
                      </div>

                      <div className="dash-preset-info">
                        <h4>{preset.name}</h4>
                        <p>{preset.description}</p>
                      </div>

                      <div className="dash-preset-meta">
                        <span className="dash-font-badge" title="คู่ฟอนต์">
                          <i className="fa-solid fa-font"></i> {preset.fontHeading} + {preset.fontBody}
                        </span>
                        <button
                          type="button"
                          className={`dash-preset-apply-btn ${isCurrent ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectPreset(preset);
                          }}
                        >
                          {isCurrent ? (
                            <>
                              <i className="fa-solid fa-check"></i> ใช้งานอยู่
                            </>
                          ) : (
                            'เลือกธีมนี้'
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Custom Fine-Tuning Card */}
              <div className="dash-card">
                <div className="dash-card-header">
                  <h3>
                    <i className="fa-solid fa-sliders" style={{ color: 'var(--primary)' }}></i>
                    ปรับแต่งสีและฟอนต์อิสระ (Custom Tuning)
                  </h3>
                </div>
                <div style={{ padding: '20px 24px' }}>
                  <form className="dash-form" onSubmit={handleSaveThemeSettings}>
                    <div className="dash-form-row">
                      <div className="dash-form-group">
                        <label>สีหลัก (Primary Accent Color)</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <input
                            type="color"
                            value={primaryColor}
                            onChange={e => setPrimaryColor(e.target.value)}
                            style={{ width: '45px', height: '40px', padding: '0', borderRadius: '8px', cursor: 'pointer', border: '1px solid var(--border-glass)' }}
                          />
                          <input
                            type="text"
                            value={primaryColor}
                            onChange={e => setPrimaryColor(e.target.value)}
                            style={{ flex: 1 }}
                          />
                        </div>
                      </div>
                      <div className="dash-form-group">
                        <label>สีรอง / Gradient (Secondary Accent Color)</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <input
                            type="color"
                            value={secondaryColor}
                            onChange={e => setSecondaryColor(e.target.value)}
                            style={{ width: '45px', height: '40px', padding: '0', borderRadius: '8px', cursor: 'pointer', border: '1px solid var(--border-glass)' }}
                          />
                          <input
                            type="text"
                            value={secondaryColor}
                            onChange={e => setSecondaryColor(e.target.value)}
                            style={{ flex: 1 }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="dash-form-row">
                      <div className="dash-form-group">
                        <label>ฟอนต์หัวข้อ (Heading Font)</label>
                        <select
                          className="dash-select"
                          value={fontHeading}
                          onChange={e => setFontHeading(e.target.value)}
                        >
                          <option value="Plus Jakarta Sans">Plus Jakarta Sans (Modern Clean)</option>
                          <option value="Prompt">Prompt (Thai Corporate)</option>
                          <option value="Inter">Inter (Universal)</option>
                        </select>
                      </div>
                      <div className="dash-form-group">
                        <label>ฟอนต์เนื้อหา (Body Font)</label>
                        <select
                          className="dash-select"
                          value={fontBody}
                          onChange={e => setFontBody(e.target.value)}
                        >
                          <option value="Inter">Inter (Universal Modern)</option>
                          <option value="Prompt">Prompt (Thai Rounded)</option>
                          <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                        </select>
                      </div>
                    </div>

                    <div className="dash-form-actions">
                      <button type="submit" className="btn btn-primary">
                        <i className="fa-solid fa-floppy-disk"></i> บันทึกและปรับใช้ธีม
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Project Modal */}
      {showProjectModal && editingProject && (
        <div className="dash-modal-overlay active">
          <div className="dash-modal">
            <div className="dash-modal-header">
              <h3>{projects.some(p => p.id === editingProject.id) ? 'แก้ไขผลงาน' : 'เพิ่มผลงานใหม่'}</h3>
              <button className="dash-modal-close" onClick={() => setShowProjectModal(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form className="dash-form" onSubmit={handleSaveProject}>
              <div className="dash-form-row">
                <div className="dash-form-group">
                  <label>ชื่อผลงาน (Project Title)</label>
                  <input
                    type="text"
                    value={editingProject.title || ''}
                    onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                    required
                  />
                </div>
                <div className="dash-form-group">
                  <label>หมวดหมู่ (Category)</label>
                  <select
                    className="dash-select"
                    value={editingProject.category || 'saas'}
                    onChange={e => {
                      const cat = e.target.value;
                      let label = 'SaaS / Business Intelligence';
                      if (cat === 'ecommerce') label = 'E-Commerce / Headless';
                      if (cat === 'booking') label = 'Booking / Healthcare';
                      if (cat === 'fintech') label = 'FinTech / Asset Management';
                      setEditingProject({ ...editingProject, category: cat, catLabel: label });
                    }}
                  >
                    <option value="saas">SaaS / Web App</option>
                    <option value="ecommerce">E-Commerce</option>
                    <option value="booking">Booking / Clinic</option>
                    <option value="fintech">FinTech / Web3</option>
                  </select>
                </div>
              </div>

              <div className="dash-form-row">
                <div className="dash-form-group">
                  <label>Badge ป้ายกำกับ</label>
                  <input
                    type="text"
                    value={editingProject.badge || ''}
                    onChange={e => setEditingProject({ ...editingProject, badge: e.target.value })}
                  />
                </div>
                <div className="dash-form-group">
                  <label>KPI ผลลัพธ์สำคัญ</label>
                  <input
                    type="text"
                    value={editingProject.kpi || ''}
                    onChange={e => setEditingProject({ ...editingProject, kpi: e.target.value })}
                    placeholder="+180% ประสิทธิภาพ"
                    required
                  />
                </div>
              </div>

              {/* Project Image: File Upload from PC/Mobile + URL Input */}
              <div className="dash-form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ margin: 0, fontWeight: 600 }}>รูปภาพผลงาน (Project Image)</label>
                  <div className="dash-image-mode-toggle" style={{ margin: 0 }}>
                    <button
                      type="button"
                      className={`dash-image-mode-btn ${projectImageMode === 'upload' ? 'active' : ''}`}
                      onClick={() => setProjectImageMode('upload')}
                    >
                      <i className="fa-solid fa-cloud-arrow-up"></i>
                      <span>อัปโหลดจากเครื่อง/มือถือ</span>
                    </button>
                    <button
                      type="button"
                      className={`dash-image-mode-btn ${projectImageMode === 'url' ? 'active' : ''}`}
                      onClick={() => setProjectImageMode('url')}
                    >
                      <i className="fa-solid fa-link"></i>
                      <span>ระบุลิงก์ URL</span>
                    </button>
                  </div>
                </div>

                {projectImageMode === 'upload' ? (
                  <div className="dash-image-upload-zone" key="upload-zone-wrapper">
                    <input
                      key="project-file-upload-input"
                      type="file"
                      ref={projectFileInputRef}
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleProjectImageUpload(file);
                        e.target.value = '';
                      }}
                    />

                    {editingProject.image ? (
                      <div className="dash-image-preview-box">
                        <img
                          src={editingProject.image}
                          alt="Project Preview"
                          className="dash-image-preview-img"
                        />
                        <div className="dash-image-preview-overlay">
                          <button
                            type="button"
                            className="dash-image-btn-change"
                            onClick={() => projectFileInputRef.current?.click()}
                            disabled={isUploadingProjectImg}
                          >
                            <i className="fa-solid fa-camera"></i>
                            <span>{isUploadingProjectImg ? 'กำลังอัปโหลด...' : 'เปลี่ยนรูป'}</span>
                          </button>
                          <button
                            type="button"
                            className="dash-image-btn-remove"
                            onClick={() => setEditingProject({ ...editingProject, image: '' })}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                            <span>ลบ</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`dash-image-dropzone ${isDraggingProjectImg ? 'dragover' : ''}`}
                        onClick={() => projectFileInputRef.current?.click()}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDraggingProjectImg(true);
                        }}
                        onDragLeave={() => setIsDraggingProjectImg(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDraggingProjectImg(false);
                          const file = e.dataTransfer.files?.[0];
                          if (file) handleProjectImageUpload(file);
                        }}
                      >
                        <div className="dash-image-dropzone-icon">
                          {isUploadingProjectImg ? (
                            <i className="fa-solid fa-spinner fa-spin"></i>
                          ) : (
                            <i className="fa-solid fa-cloud-arrow-up"></i>
                          )}
                        </div>
                        <span className="dash-image-dropzone-title">
                          {isUploadingProjectImg ? 'กำลังประมวลผลรูปภาพ...' : 'คลิกหรือลากไฟล์ภาพมาวางที่นี่'}
                        </span>
                        <span className="dash-image-dropzone-sub">
                          รองรับ JPG, PNG, WebP จากคอมพิวเตอร์ หรือเลือกจากคลังภาพ/กล้องมือถือ
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div key="url-input-wrapper">
                    <input
                      key="project-url-text-input"
                      type="text"
                      value={editingProject.image || ''}
                      onChange={e => setEditingProject({ ...editingProject, image: e.target.value })}
                      placeholder="/assets/images/project_example.jpg หรือ https://..."
                      required
                    />
                    {editingProject.image && (
                      <div className="dash-image-preview-box" style={{ marginTop: '10px', maxHeight: '160px' }}>
                        <img
                          src={editingProject.image}
                          alt="Preview"
                          className="dash-image-preview-img"
                          style={{ maxHeight: '160px' }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="dash-form-group">
                <label>คำอธิบายสรุปย่อ (Excerpt)</label>
                <textarea
                  rows={2}
                  value={editingProject.excerpt || ''}
                  onChange={e => setEditingProject({ ...editingProject, excerpt: e.target.value })}
                  required
                />
              </div>

              <div className="dash-form-group">
                <label>เทคโนโลยีที่ใช้ (คั่นด้วยจุลภาค ,)</label>
                <input
                  type="text"
                  value={(editingProject.tags || []).join(', ')}
                  onChange={e => setEditingProject({ ...editingProject, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                  placeholder="Next.js, TypeScript, Tailwind CSS"
                />
              </div>

              <div className="dash-form-row">
                <div className="dash-form-group">
                  <label>โจทย์ / ความท้าทาย (Problem)</label>
                  <textarea
                    rows={2}
                    value={editingProject.problem || ''}
                    onChange={e => setEditingProject({ ...editingProject, problem: e.target.value })}
                  />
                </div>
                <div className="dash-form-group">
                  <label>วิธีแก้ปัญหา / Architecture (Solution)</label>
                  <textarea
                    rows={2}
                    value={editingProject.solution || ''}
                    onChange={e => setEditingProject({ ...editingProject, solution: e.target.value })}
                  />
                </div>
              </div>

              <div className="dash-form-group">
                <label>ผลลัพธ์ที่ได้รับจริง (Results)</label>
                <textarea
                  rows={2}
                  value={editingProject.results || ''}
                  onChange={e => setEditingProject({ ...editingProject, results: e.target.value })}
                />
              </div>

              <div className="dash-modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowProjectModal(false)}>
                  ยกเลิก
                </button>
                <button type="submit" className="btn btn-primary">
                  <i className="fa-solid fa-floppy-disk"></i> บันทึกผลงาน
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============ MODAL: ADD CUSTOM PROJECT TYPE ============ */}
      {showAddProjectTypeModal && (
        <div className="dash-modal-overlay active">
          <div className="dash-modal" style={{ maxWidth: '540px' }}>
            <div className="dash-modal-header">
              <h3>
                <i className="fa-solid fa-plus-circle" style={{ color: 'var(--primary)', marginRight: '8px' }}></i>
                เพิ่มประเภทโปรเจกต์ใหม่ (Add Project Type)
              </h3>
              <button className="dash-modal-close" onClick={() => setShowAddProjectTypeModal(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleAddCustomProjectType} className="dash-modal-body" style={{ padding: '24px' }}>
              <div className="dash-form-group" style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>ชื่อประเภทโปรเจกต์ <span style={{ color: '#EF4444' }}>*</span></label>
                <input
                  type="text"
                  value={newProjectType.name}
                  onChange={e => setNewProjectType({ ...newProjectType, name: e.target.value })}
                  placeholder="เช่น Mobile Application (iOS & Android), AI SaaS Product"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-surface)', color: 'var(--text-main)' }}
                  required
                />
              </div>

              <div className="dash-form-group" style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>คำอธิบายสั้นๆ (Tagline / Description)</label>
                <input
                  type="text"
                  value={newProjectType.desc}
                  onChange={e => setNewProjectType({ ...newProjectType, desc: e.target.value })}
                  placeholder="เช่น แอปพลิเคชันมือถือแบบ Native & Cross-Platform รองรับ Store"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-surface)', color: 'var(--text-main)' }}
                />
              </div>

              <div className="dash-form-group" style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>ราคาเริ่มต้นมาตรฐาน (Base Starting Price) <span style={{ color: '#EF4444' }}>*</span></label>
                <div className="dash-pricing-input-box">
                  <span className="dash-pricing-currency-prefix">฿</span>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    className="dash-pricing-number-input"
                    value={newProjectType.price}
                    onChange={e => setNewProjectType({ ...newProjectType, price: Number(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>

              <div className="dash-form-group" style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>เลือกไอคอนประจำประเภท (Icon)</label>
                <div className="dash-icon-picker-grid">
                  {[
                    { icon: 'fa-mobile-screen', label: 'Mobile App' },
                    { icon: 'fa-robot', label: 'AI Automation' },
                    { icon: 'fa-wand-magic-sparkles', label: 'SaaS Tool' },
                    { icon: 'fa-bolt', label: 'Landing Page' },
                    { icon: 'fa-shield-halved', label: 'Security/Fin' },
                    { icon: 'fa-diagram-project', label: 'Workflow' },
                    { icon: 'fa-gamepad', label: 'Interactive/3D' },
                    { icon: 'fa-layer-group', label: 'Platform' },
                  ].map(opt => (
                    <button
                      key={opt.icon}
                      type="button"
                      className={`dash-icon-option ${newProjectType.icon === opt.icon ? 'active' : ''}`}
                      onClick={() => setNewProjectType({ ...newProjectType, icon: opt.icon })}
                    >
                      <i className={`fa-solid ${opt.icon}`}></i>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="dash-form-group" style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>โทนสีไอคอน (Accent Color)</label>
                <div className="dash-color-picker-row">
                  {[
                    { color: 'blue', hex: '#2563EB', label: 'Blue' },
                    { color: 'purple', hex: '#7C3AED', label: 'Purple' },
                    { color: 'emerald', hex: '#059669', label: 'Emerald' },
                    { color: 'cyan', hex: '#0891B2', label: 'Cyan' },
                    { color: 'pink', hex: '#E11D48', label: 'Pink' },
                    { color: 'amber', hex: '#D97706', label: 'Amber' },
                  ].map(c => (
                    <button
                      key={c.color}
                      type="button"
                      className={`dash-color-dot-btn ${newProjectType.color === c.color ? 'active' : ''}`}
                      style={{ background: c.hex }}
                      onClick={() => setNewProjectType({ ...newProjectType, color: c.color })}
                      title={c.label}
                    >
                      {newProjectType.color === c.color && <i className="fa-solid fa-check"></i>}
                    </button>
                  ))}
                </div>
              </div>

              <div className="dash-modal-actions" style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddProjectTypeModal(false)}>
                  ยกเลิก
                </button>
                <button type="submit" className="btn btn-primary" style={{ padding: '10px 24px', fontWeight: 700 }}>
                  <i className="fa-solid fa-plus-circle"></i> บันทึกและเพิ่มประเภทโปรเจกต์
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
