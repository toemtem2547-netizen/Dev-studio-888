import prisma from '../db';
import { LeadItem } from '../models';

export class LeadService {
  static async getAll(): Promise<LeadItem[]> {
    try {
      const leads = await prisma.lead.findMany({
        orderBy: { createdAt: 'desc' },
      });

      return leads.map((l) => ({
        id: l.id,
        name: l.name,
        email: l.email,
        phone: l.phone || undefined,
        projectType: l.projectType,
        budget: l.budget,
        message: l.message || undefined,
        date: l.date || l.createdAt.toLocaleDateString('th-TH', { dateStyle: 'short', timeStyle: 'short' }),
        status: (l.status as 'new' | 'contacted' | 'closed') || 'new',
        estimateDetails: l.estimateDetails ? JSON.parse(l.estimateDetails) : undefined,
      }));
    } catch (err) {
      console.error('[LeadService.getAll] Error:', err);
      return [];
    }
  }

  static async getById(id: string): Promise<LeadItem | null> {
    try {
      const l = await prisma.lead.findUnique({ where: { id } });
      if (!l) return null;
      return {
        id: l.id,
        name: l.name,
        email: l.email,
        phone: l.phone || undefined,
        projectType: l.projectType,
        budget: l.budget,
        message: l.message || undefined,
        date: l.date || l.createdAt.toLocaleDateString('th-TH'),
        status: (l.status as 'new' | 'contacted' | 'closed') || 'new',
        estimateDetails: l.estimateDetails ? JSON.parse(l.estimateDetails) : undefined,
      };
    } catch (err) {
      console.error('[LeadService.getById] Error:', err);
      return null;
    }
  }

  static async create(leadData: Omit<LeadItem, 'id' | 'date' | 'status'> & { id?: string; date?: string; status?: 'new' | 'contacted' | 'closed' }): Promise<LeadItem> {
    const estimateDetailsStr = leadData.estimateDetails ? JSON.stringify(leadData.estimateDetails) : null;
    const dateStr = leadData.date || new Date().toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' });

    const created = await prisma.lead.create({
      data: {
        ...(leadData.id ? { id: leadData.id } : {}),
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone || '',
        projectType: leadData.projectType || 'General Project',
        budget: String(leadData.budget || '0'),
        message: leadData.message || '',
        status: leadData.status || 'new',
        date: dateStr,
        estimateDetails: estimateDetailsStr,
      },
    });

    return {
      id: created.id,
      name: created.name,
      email: created.email,
      phone: created.phone || undefined,
      projectType: created.projectType,
      budget: created.budget,
      message: created.message || undefined,
      date: created.date || dateStr,
      status: (created.status as 'new' | 'contacted' | 'closed') || 'new',
      estimateDetails: leadData.estimateDetails,
    };
  }

  static async delete(id: string): Promise<boolean> {
    try {
      await prisma.lead.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  static async updateStatus(id: string, status: 'new' | 'contacted' | 'closed'): Promise<LeadItem | null> {
    try {
      const updated = await prisma.lead.update({
        where: { id },
        data: { status },
      });
      return {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        phone: updated.phone || undefined,
        projectType: updated.projectType,
        budget: updated.budget,
        message: updated.message || undefined,
        date: updated.date || updated.createdAt.toLocaleDateString('th-TH'),
        status: (updated.status as 'new' | 'contacted' | 'closed') || 'new',
        estimateDetails: updated.estimateDetails ? JSON.parse(updated.estimateDetails) : undefined,
      };
    } catch {
      return null;
    }
  }
}
