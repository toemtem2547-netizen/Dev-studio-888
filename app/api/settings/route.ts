import { NextResponse } from 'next/server';
import { SettingsService } from '@/Backend';

export async function GET() {
  try {
    const [site, contact, social] = await Promise.all([
      SettingsService.getSiteSettings(),
      SettingsService.getContactSettings(),
      SettingsService.getSocialSettings(),
    ]);

    return NextResponse.json({
      success: true,
      site,
      contact,
      social,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { site, contact, social } = body;

    if (site) await SettingsService.updateSiteSettings(site);
    if (contact) await SettingsService.updateContactSettings(contact);
    if (social) await SettingsService.updateSocialSettings(social);

    const [updatedSite, updatedContact, updatedSocial] = await Promise.all([
      SettingsService.getSiteSettings(),
      SettingsService.getContactSettings(),
      SettingsService.getSocialSettings(),
    ]);

    return NextResponse.json({
      success: true,
      site: updatedSite,
      contact: updatedContact,
      social: updatedSocial,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
