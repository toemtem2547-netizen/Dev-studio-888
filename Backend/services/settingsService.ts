import prisma from '../db';
import { SiteSettings, ContactSettings, SocialSettings, ThemeSettings } from '../models';
import { INITIAL_SITE_SETTINGS, INITIAL_CONTACT_SETTINGS, INITIAL_SOCIAL_SETTINGS, INITIAL_THEME_SETTINGS } from '../data/initialData';
import { DEFAULT_LUCKY_CONFIG } from '../../types';

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

  static async getSiteSettings(): Promise<any> {
    const setting = await this.getOrCreateSetting();
    if (!setting) return INITIAL_SITE_SETTINGS;
    return {
      siteName: setting.siteName || INITIAL_SITE_SETTINGS.title,
      title: setting.siteName || INITIAL_SITE_SETTINGS.title,
      siteLang: 'th',
      heroTitle1: setting.siteTagline || INITIAL_SITE_SETTINGS.tagline,
      heroTitleGrad: 'นวัตกรรมเว็บ & แอปพลิเคชัน',
      tagline: setting.siteTagline || INITIAL_SITE_SETTINGS.tagline,
      heroSubtitle: setting.siteDesc || INITIAL_SITE_SETTINGS.description,
      description: setting.siteDesc || INITIAL_SITE_SETTINGS.description,
      statusText: INITIAL_SITE_SETTINGS.statusText,
      siteTechStack: setting.siteTechStack || INITIAL_SITE_SETTINGS.techStack,
      techStack: setting.siteTechStack || INITIAL_SITE_SETTINGS.techStack,
    };
  }

  static async updateSiteSettings(data: any): Promise<any> {
    try {
      const siteName = data.siteName || data.title || INITIAL_SITE_SETTINGS.title;
      const siteTagline = data.heroTitle1 || data.tagline || INITIAL_SITE_SETTINGS.tagline;
      const siteDesc = data.heroSubtitle || data.description || INITIAL_SITE_SETTINGS.description;
      const siteTechStack = data.siteTechStack || data.techStack || INITIAL_SITE_SETTINGS.techStack;

      const updated = await prisma.setting.upsert({
        where: { id: 'site-config' },
        update: {
          siteName,
          siteTagline,
          siteDesc,
          siteTechStack,
        },
        create: {
          id: 'site-config',
          siteName,
          siteTagline,
          siteDesc,
          siteTechStack,
        },
      });

      return {
        siteName: updated.siteName,
        title: updated.siteName,
        siteLang: data.siteLang || 'th',
        heroTitle1: updated.siteTagline || '',
        heroTitleGrad: data.heroTitleGrad || '',
        tagline: updated.siteTagline || '',
        heroSubtitle: updated.siteDesc || '',
        description: updated.siteDesc || '',
        statusText: INITIAL_SITE_SETTINGS.statusText,
        siteTechStack: updated.siteTechStack || '',
        techStack: updated.siteTechStack || '',
      };
    } catch (err) {
      console.error('[SettingsService.updateSiteSettings] Error:', err);
      return data;
    }
  }

  static async getContactSettings(): Promise<any> {
    const setting = await this.getOrCreateSetting();
    if (!setting) return INITIAL_CONTACT_SETTINGS;
    return {
      email: setting.email || INITIAL_CONTACT_SETTINGS.email,
      phone: setting.phone || INITIAL_CONTACT_SETTINGS.phone,
      line: setting.line || INITIAL_SOCIAL_SETTINGS.line,
      address: setting.siteDesc || INITIAL_CONTACT_SETTINGS.location,
      location: INITIAL_CONTACT_SETTINGS.location,
      businessHours: INITIAL_CONTACT_SETTINGS.businessHours,
    };
  }

  static async updateContactSettings(data: any): Promise<any> {
    try {
      const updated = await prisma.setting.upsert({
        where: { id: 'site-config' },
        update: {
          ...(data.email !== undefined ? { email: data.email } : {}),
          ...(data.phone !== undefined ? { phone: data.phone } : {}),
          ...(data.line !== undefined ? { line: data.line } : {}),
        },
        create: {
          id: 'site-config',
          email: data.email || INITIAL_CONTACT_SETTINGS.email,
          phone: data.phone || INITIAL_CONTACT_SETTINGS.phone,
          line: data.line || INITIAL_SOCIAL_SETTINGS.line,
        },
      });

      return {
        email: updated.email,
        phone: updated.phone,
        line: updated.line,
        address: data.address || INITIAL_CONTACT_SETTINGS.location,
        location: INITIAL_CONTACT_SETTINGS.location,
        businessHours: INITIAL_CONTACT_SETTINGS.businessHours,
      };
    } catch (err) {
      console.error('[SettingsService.updateContactSettings] Error:', err);
      return data;
    }
  }

  static async getSocialSettings(): Promise<any> {
    const setting = await this.getOrCreateSetting();
    if (!setting) return INITIAL_SOCIAL_SETTINGS;
    return {
      github: setting.github || INITIAL_SOCIAL_SETTINGS.github,
      linkedin: setting.linkedin || INITIAL_SOCIAL_SETTINGS.linkedin,
      line: setting.line || INITIAL_SOCIAL_SETTINGS.line,
      facebook: setting.facebook || INITIAL_SOCIAL_SETTINGS.facebook,
    };
  }

  static async updateSocialSettings(data: any): Promise<any> {
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
      return data;
    }
  }

  static async getEstimatorConfig(): Promise<any> {
    try {
      const setting = await this.getOrCreateSetting();
      if (setting && setting.estimatorConfig && setting.estimatorConfig !== '{}') {
        return JSON.parse(setting.estimatorConfig);
      }
      return null;
    } catch (err) {
      console.error('[SettingsService.getEstimatorConfig] Error:', err);
      return null;
    }
  }

  static async updateEstimatorConfig(config: any): Promise<any> {
    try {
      const configStr = JSON.stringify(config);
      const updated = await prisma.setting.upsert({
        where: { id: 'site-config' },
        update: { estimatorConfig: configStr },
        create: {
          id: 'site-config',
          estimatorConfig: configStr,
        },
      });
      return JSON.parse(updated.estimatorConfig || '{}');
    } catch (err) {
      console.error('[SettingsService.updateEstimatorConfig] Error:', err);
      return config;
    }
  }

  static async getLuckyConfig(): Promise<any> {
    try {
      const rows: any = await prisma.$queryRawUnsafe(`SELECT "luckyConfig" FROM "Setting" WHERE id = 'site-config' LIMIT 1`);
      if (rows && rows.length > 0 && rows[0]?.luckyConfig && rows[0]?.luckyConfig !== '{}') {
        return JSON.parse(rows[0].luckyConfig);
      }
      return DEFAULT_LUCKY_CONFIG;
    } catch (err) {
      console.error('[SettingsService.getLuckyConfig] Error:', err);
      return DEFAULT_LUCKY_CONFIG;
    }
  }

  static async updateLuckyConfig(config: any): Promise<any> {
    try {
      const configStr = JSON.stringify(config);
      await prisma.$executeRawUnsafe(`UPDATE "Setting" SET "luckyConfig" = $1 WHERE id = 'site-config'`, configStr);
      return config;
    } catch (err) {
      console.error('[SettingsService.updateLuckyConfig] Error:', err);
      return config;
    }
  }

  static async getThemeSettings(): Promise<ThemeSettings> {
    try {
      const setting = await this.getOrCreateSetting();
      if (!setting) return INITIAL_THEME_SETTINGS;

      let fontHeading = INITIAL_THEME_SETTINGS.fontHeading;
      let fontBody = INITIAL_THEME_SETTINGS.fontBody;
      let presetId = INITIAL_THEME_SETTINGS.presetId || 'cyber-nexus';

      if (setting.themePreset) {
        if (setting.themePreset.startsWith('{')) {
          try {
            const parsed = JSON.parse(setting.themePreset);
            if (parsed.fontHeading) fontHeading = parsed.fontHeading;
            if (parsed.fontBody) fontBody = parsed.fontBody;
            if (parsed.presetId) presetId = parsed.presetId;
          } catch (_) {}
        } else {
          presetId = setting.themePreset;
        }
      }

      return {
        primaryColor: setting.themePrimary || INITIAL_THEME_SETTINGS.primaryColor,
        secondaryColor: setting.themeSecondary || INITIAL_THEME_SETTINGS.secondaryColor,
        fontHeading,
        fontBody,
        presetId,
      };
    } catch (err) {
      console.error('[SettingsService.getThemeSettings] Error:', err);
      return INITIAL_THEME_SETTINGS;
    }
  }

  static async updateThemeSettings(data: Partial<ThemeSettings>): Promise<ThemeSettings> {
    try {
      const current = await this.getThemeSettings();
      const nextPrimary = data.primaryColor || current.primaryColor;
      const nextSecondary = data.secondaryColor || current.secondaryColor;
      const nextHeading = data.fontHeading || current.fontHeading;
      const nextBody = data.fontBody || current.fontBody;
      const nextPresetId = data.presetId || current.presetId || 'custom';

      const presetDataStr = JSON.stringify({
        presetId: nextPresetId,
        fontHeading: nextHeading,
        fontBody: nextBody,
      });

      const updated = await prisma.setting.upsert({
        where: { id: 'site-config' },
        update: {
          themePrimary: nextPrimary,
          themeSecondary: nextSecondary,
          themePreset: presetDataStr,
        },
        create: {
          id: 'site-config',
          siteName: INITIAL_SITE_SETTINGS.title,
          themePrimary: nextPrimary,
          themeSecondary: nextSecondary,
          themePreset: presetDataStr,
        },
      });

      return {
        primaryColor: updated.themePrimary,
        secondaryColor: updated.themeSecondary,
        fontHeading: nextHeading,
        fontBody: nextBody,
        presetId: nextPresetId,
      };
    } catch (err) {
      console.error('[SettingsService.updateThemeSettings] Error:', err);
      return {
        primaryColor: data.primaryColor || INITIAL_THEME_SETTINGS.primaryColor,
        secondaryColor: data.secondaryColor || INITIAL_THEME_SETTINGS.secondaryColor,
        fontHeading: data.fontHeading || INITIAL_THEME_SETTINGS.fontHeading,
        fontBody: data.fontBody || INITIAL_THEME_SETTINGS.fontBody,
        presetId: data.presetId || INITIAL_THEME_SETTINGS.presetId,
      };
    }
  }
}

