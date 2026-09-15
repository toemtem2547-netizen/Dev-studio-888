import prisma from '../db';
import { ProjectItem } from '../models';

export class ProjectService {
  static async getAll(): Promise<ProjectItem[]> {
    try {
      const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'asc' },
      });

      return projects.map((p) => ({
        id: p.id,
        title: p.title,
        category: p.category,
        catLabel: p.category.toUpperCase(),
        badge: p.badge,
        kpi: p.kpi,
        excerpt: p.excerpt,
        image: p.img,
        tags: p.tags ? JSON.parse(p.tags) : [],
        client: p.client || '',
        duration: p.duration || '',
        problem: p.fullDesc || '',
        solution: p.fullDesc || '',
        results: p.kpi || '',
      }));
    } catch (err) {
      console.error('[ProjectService.getAll] Error:', err);
      return [];
    }
  }

  static async getById(id: string): Promise<ProjectItem | null> {
    try {
      const p = await prisma.project.findUnique({ where: { id } });
      if (!p) return null;
      return {
        id: p.id,
        title: p.title,
        category: p.category,
        catLabel: p.category.toUpperCase(),
        badge: p.badge,
        kpi: p.kpi,
        excerpt: p.excerpt,
        image: p.img,
        tags: p.tags ? JSON.parse(p.tags) : [],
        client: p.client || '',
        duration: p.duration || '',
        problem: p.fullDesc || '',
        solution: p.fullDesc || '',
        results: p.kpi || '',
      };
    } catch (err) {
      console.error('[ProjectService.getById] Error:', err);
      return null;
    }
  }

  static async create(project: ProjectItem): Promise<ProjectItem> {
    const slug = project.id || project.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now();
    const created = await prisma.project.create({
      data: {
        id: project.id || undefined,
        slug,
        title: project.title,
        category: project.category,
        badge: project.badge,
        kpi: project.kpi,
        img: project.image,
        excerpt: project.excerpt,
        client: project.client || '',
        duration: project.duration || '',
        fullDesc: project.solution || project.problem || project.excerpt,
        tags: JSON.stringify(project.tags || []),
      },
    });

    return {
      id: created.id,
      title: created.title,
      category: created.category,
      catLabel: created.category.toUpperCase(),
      badge: created.badge,
      kpi: created.kpi,
      excerpt: created.excerpt,
      image: created.img,
      tags: project.tags || [],
      client: created.client || '',
      duration: created.duration || '',
      problem: project.problem || '',
      solution: project.solution || '',
      results: created.kpi || '',
    };
  }

  static async update(id: string, project: Partial<ProjectItem>): Promise<ProjectItem | null> {
    try {
      const data: Record<string, any> = {};
      if (project.title !== undefined) data.title = project.title;
      if (project.category !== undefined) data.category = project.category;
      if (project.badge !== undefined) data.badge = project.badge;
      if (project.kpi !== undefined) data.kpi = project.kpi;
      if (project.image !== undefined) data.img = project.image;
      if (project.excerpt !== undefined) data.excerpt = project.excerpt;
      if (project.client !== undefined) data.client = project.client;
      if (project.duration !== undefined) data.duration = project.duration;
      if (project.tags !== undefined) data.tags = JSON.stringify(project.tags);
      if (project.solution !== undefined || project.problem !== undefined) {
        data.fullDesc = project.solution || project.problem;
      }

      const updated = await prisma.project.update({
        where: { id },
        data,
      });

      return {
        id: updated.id,
        title: updated.title,
        category: updated.category,
        catLabel: updated.category.toUpperCase(),
        badge: updated.badge,
        kpi: updated.kpi,
        excerpt: updated.excerpt,
        image: updated.img,
        tags: updated.tags ? JSON.parse(updated.tags) : [],
        client: updated.client || '',
        duration: updated.duration || '',
        problem: project.problem || '',
        solution: updated.fullDesc || '',
        results: updated.kpi || '',
      };
    } catch (err) {
      console.error('[ProjectService.update] Error:', err);
      return null;
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      await prisma.project.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
