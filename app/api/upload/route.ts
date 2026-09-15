import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    const uploadsDir = path.join(process.cwd(), 'public', 'assets', 'uploads');

    // Ensure uploads directory exists
    try {
      await fs.mkdir(uploadsDir, { recursive: true });
    } catch {
      // Directory already exists or created
    }

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;

      if (!file) {
        return NextResponse.json({ success: false, message: 'No file provided' }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const ext = path.extname(file.name) || '.jpg';
      const cleanName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '') || 'upload';
      const filename = `${cleanName}_${Date.now()}${ext.toLowerCase()}`;
      const filePath = path.join(uploadsDir, filename);

      await fs.writeFile(filePath, buffer);

      const fileUrl = `/assets/uploads/${filename}`;
      return NextResponse.json({ success: true, url: fileUrl });
    }

    // JSON Base64 upload support
    if (contentType.includes('application/json')) {
      const body = await req.json();
      const { base64, filename: rawName } = body;

      if (!base64) {
        return NextResponse.json({ success: false, message: 'No base64 data provided' }, { status: 400 });
      }

      // Extract base64 content
      const matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      let buffer: Buffer;
      let ext = '.jpg';

      if (matches && matches.length === 3) {
        const mime = matches[1];
        if (mime.includes('png')) ext = '.png';
        else if (mime.includes('webp')) ext = '.webp';
        else if (mime.includes('gif')) ext = '.gif';
        else if (mime.includes('svg')) ext = '.svg';
        buffer = Buffer.from(matches[2], 'base64');
      } else {
        buffer = Buffer.from(base64, 'base64');
      }

      const cleanName = (rawName ? path.basename(rawName, path.extname(rawName)) : 'upload').replace(/[^a-zA-Z0-9_-]/g, '') || 'upload';
      const filename = `${cleanName}_${Date.now()}${ext}`;
      const filePath = path.join(uploadsDir, filename);

      await fs.writeFile(filePath, buffer);

      const fileUrl = `/assets/uploads/${filename}`;
      return NextResponse.json({ success: true, url: fileUrl });
    }

    return NextResponse.json({ success: false, message: 'Unsupported Content-Type' }, { status: 400 });
  } catch (error: any) {
    console.error('[Upload API Error]:', error);
    return NextResponse.json({ success: false, message: error.message || 'Upload failed' }, { status: 500 });
  }
}
