import { NextResponse } from 'next/server';
import { AuthService } from '@/Backend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' },
        { status: 400 }
      );
    }

    const session = await AuthService.login(username, password);
    if (!session) {
      return NextResponse.json(
        { error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, session });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
