import { NextResponse } from 'next/server';
import { ProjectService, ProjectItem } from '@/Backend';

export async function GET() {
  try {
    const projects = await ProjectService.getAll();
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: ProjectItem = await request.json();
    const created = await ProjectService.create(body);
    return NextResponse.json({ success: true, project: created });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save project' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body: ProjectItem = await request.json();
    if (!body.id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }
    const updated = await ProjectService.update(body.id, body);
    return NextResponse.json({ success: !!updated, project: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing project ID' }, { status: 400 });
    }
    const success = await ProjectService.delete(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
