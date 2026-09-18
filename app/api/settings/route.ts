import { NextResponse } from 'next/server';
import { SettingsService } from '@/Backend';

export async function GET() {
  try {
    const [site, contact, social, estimatorConfig, luckyConfig] = await Promise.all([
      SettingsService.getSiteSettings(),
      SettingsService.getContactSettings(),
      SettingsService.getSocialSettings(),
      SettingsService.getEstimatorConfig(),
      SettingsService.getLuckyConfig(),
    ]);

    return NextResponse.json({
      success: true,
      site,
      contact,
      social,
      estimatorConfig,
      luckyConfig,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { site, contact, social, estimatorConfig, luckyConfig } = body;

    if (site) await SettingsService.updateSiteSettings(site);
    if (contact) await SettingsService.updateContactSettings(contact);
    if (social) await SettingsService.updateSocialSettings(social);
    if (estimatorConfig) await SettingsService.updateEstimatorConfig(estimatorConfig);
    if (luckyConfig) await SettingsService.updateLuckyConfig(luckyConfig);

    const [updatedSite, updatedContact, updatedSocial, updatedEstimatorConfig, updatedLuckyConfig] = await Promise.all([
      SettingsService.getSiteSettings(),
      SettingsService.getContactSettings(),
      SettingsService.getSocialSettings(),
      SettingsService.getEstimatorConfig(),
      SettingsService.getLuckyConfig(),
    ]);

    return NextResponse.json({
      success: true,
      site: updatedSite,
      contact: updatedContact,
      social: updatedSocial,
      estimatorConfig: updatedEstimatorConfig,
      luckyConfig: updatedLuckyConfig,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
