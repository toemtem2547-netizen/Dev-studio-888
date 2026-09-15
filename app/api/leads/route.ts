import { NextResponse } from 'next/server';
import { LeadService } from '@/Backend';

export async function GET() {
  try {
    const leads = await LeadService.getAll();
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const created = await LeadService.create(body);
    return NextResponse.json({ success: true, lead: created });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing lead ID' }, { status: 400 });
    }
    const success = await LeadService.delete(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ error: 'Missing ID or status' }, { status: 400 });
    }
    const updated = await LeadService.updateStatus(id, status);
    return NextResponse.json({ success: !!updated, lead: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update lead status' }, { status: 500 });
  }
}
