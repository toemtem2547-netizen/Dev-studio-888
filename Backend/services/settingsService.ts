import prisma from '../db';
import { SiteSettings, ContactSettings, SocialSettings } from '../models';
import { INITIAL_SITE_SETTINGS, INITIAL_CONTACT_SETTINGS, INITIAL_SOCIAL_SETTINGS } from '../data/initialData';

export class SettingsService {
  private static async getOrCreateSetting() {
    try {
      const setting = await prisma.setting.upsert({
        where: { id: 'site-config' },
        update: {},
        create: {
          id: 'site-config',
          siteName: INITIAL_SITE_SETTINGS.title,
          siteTagline: INITIAL_SITE_SETTINGS.tagline,
          siteDesc: INITIAL_SITE_SETTINGS.description,
          siteTechStack: INITIAL_SITE_SETTINGS.techStack,
          email: INITIAL_CONTACT_SETTINGS.email,
          phone: INITIAL_CONTACT_SETTINGS.phone,
          line: INITIAL_SOCIAL_SETTINGS.line,
          github: INITIAL_SOCIAL_SETTINGS.github,
          linkedin: INITIAL_SOCIAL_SETTINGS.linkedin,
          facebook: INITIAL_SOCIAL_SETTINGS.facebook,
        },
      });
      return setting;
    } catch (err) {
      console.error('[SettingsService] DB Error, falling back to defaults:', err);
      return null;
    }
  }

  static async getSiteSettings(): Promise<SiteSettings> {
    const setting = await this.getOrCreateSetting();
    if (!setting) return INITIAL_SITE_SETTINGS;
    return {
      title: setting.siteName || INITIAL_SITE_SETTINGS.title,
      tagline: setting.siteTagline || INITIAL_SITE_SETTINGS.tagline,
      description: setting.siteDesc || INITIAL_SITE_SETTINGS.description,
      statusText: INITIAL_SITE_SETTINGS.statusText,
      techStack: setting.siteTechStack || INITIAL_SITE_SETTINGS.techStack,
    };
  }

  static async updateSiteSettings(data: Partial<SiteSettings>): Promise<SiteSettings> {
    try {
      const updated = await prisma.setting.upsert({
        where: { id: 'site-config' },
        update: {
          ...(data.title !== undefined ? { siteName: data.title } : {}),
          ...(data.tagline !== undefined ? { siteTagline: data.tagline } : {}),
          ...(data.description !== undefined ? { siteDesc: data.description } : {}),
          ...(data.techStack !== undefined ? { siteTechStack: data.techStack } : {}),
        },
        create: {
          id: 'site-config',
          siteName: data.title || INITIAL_SITE_SETTINGS.title,
          siteTagline: data.tagline || INITIAL_SITE_SETTINGS.tagline,
          siteDesc: data.description || INITIAL_SITE_SETTINGS.description,
          siteTechStack: data.techStack || INITIAL_SITE_SETTINGS.techStack,
        },
      });

      return {
        title: updated.siteName,
        tagline: updated.siteTagline || '',
        description: updated.siteDesc || '',
        statusText: INITIAL_SITE_SETTINGS.statusText,
        techStack: updated.siteTechStack || '',
      };
    } catch (err) {
      console.error('[SettingsService.updateSiteSettings] Error:', err);
      return INITIAL_SITE_SETTINGS;
    }
  }

  static async getContactSettings(): Promise<ContactSettings> {
    const setting = await this.getOrCreateSetting();
    if (!setting) return INITIAL_CONTACT_SETTINGS;
    return {
      email: setting.email || INITIAL_CONTACT_SETTINGS.email,
      phone: setting.phone || INITIAL_CONTACT_SETTINGS.phone,
      location: INITIAL_CONTACT_SETTINGS.location,
      businessHours: INITIAL_CONTACT_SETTINGS.businessHours,
    };
  }

  static async updateContactSettings(data: Partial<ContactSettings>): Promise<ContactSettings> {
    try {
      const updated = await prisma.setting.upsert({
        where: { id: 'site-config' },
        update: {
          ...(data.email !== undefined ? { email: data.email } : {}),
          ...(data.phone !== undefined ? { phone: data.phone } : {}),
        },
        create: {
          id: 'site-config',
          email: data.email || INITIAL_CONTACT_SETTINGS.email,
          phone: data.phone || INITIAL_CONTACT_SETTINGS.phone,
        },
      });

      return {
        email: updated.email,
        phone: updated.phone,
        location: INITIAL_CONTACT_SETTINGS.location,
        businessHours: INITIAL_CONTACT_SETTINGS.businessHours,
      };
    } catch (err) {
      console.error('[SettingsService.updateContactSettings] Error:', err);
      return INITIAL_CONTACT_SETTINGS;
    }
  }

  static async getSocialSettings(): Promise<SocialSettings> {
    const setting = await this.getOrCreateSetting();
    if (!setting) return INITIAL_SOCIAL_SETTINGS;
    return {
      github: setting.github || INITIAL_SOCIAL_SETTINGS.github,
      linkedin: setting.linkedin || INITIAL_SOCIAL_SETTINGS.linkedin,
      line: setting.line || INITIAL_SOCIAL_SETTINGS.line,
      facebook: setting.facebook || INITIAL_SOCIAL_SETTINGS.facebook,
    };
  }

  static async updateSocialSettings(data: Partial<SocialSettings>): Promise<SocialSettings> {
    try {
      const updated = await prisma.setting.upsert({
        where: { id: 'site-config' },
        update: {
          ...(data.github !== undefined ? { github: data.github } : {}),
          ...(data.linkedin !== undefined ? { linkedin: data.linkedin } : {}),
          ...(data.line !== undefined ? { line: data.line } : {}),
          ...(data.facebook !== undefined ? { facebook: data.facebook } : {}),
        },
        create: {
          id: 'site-config',
          github: data.github || INITIAL_SOCIAL_SETTINGS.github,
          linkedin: data.linkedin || INITIAL_SOCIAL_SETTINGS.linkedin,
          line: data.line || INITIAL_SOCIAL_SETTINGS.line,
          facebook: data.facebook || INITIAL_SOCIAL_SETTINGS.facebook,
        },
      });

      return {
        github: updated.github || '',
        linkedin: updated.linkedin || '',
        line: updated.line || '',
        facebook: updated.facebook || '',
      };
    } catch (err) {
      console.error('[SettingsService.updateSocialSettings] Error:', err);
      return INITIAL_SOCIAL_SETTINGS;
    }
  }
}
