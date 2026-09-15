import prisma from '../db';
import { AdminSession } from '../models';

export class AuthService {
  static async login(usernameOrEmail: string, password: string): Promise<AdminSession | null> {
    try {
      // 1. Try to find user from Database
      const user = await prisma.adminUser.findFirst({
        where: {
          OR: [
            { email: usernameOrEmail.toLowerCase() },
            { email: `${usernameOrEmail.toLowerCase()}@nexus888.com` },
          ],
        },
      });

      if (user && user.password === password) {
        return {
          loggedIn: true,
          username: user.email.split('@')[0],
          name: user.name,
          token: 'nex_tok_' + Math.random().toString(36).substring(2) + Date.now().toString(36),
          timestamp: Date.now(),
        };
      }

      // 2. Fallback for default dev credentials (admin / nexus888 or admin / nexus@admin888)
      if (
        (usernameOrEmail === 'admin' || usernameOrEmail === 'admin@nexus888.com') &&
        (password === 'nexus888' || password === 'nexus@admin888')
      ) {
        return {
          loggedIn: true,
          username: 'admin',
          name: 'Super Admin',
          token: 'nex_tok_' + Math.random().toString(36).substring(2) + Date.now().toString(36),
          timestamp: Date.now(),
        };
      }

      return null;
    } catch (err) {
      console.error('[AuthService.login] DB Error:', err);
      // Fallback
      if (
        (usernameOrEmail === 'admin' || usernameOrEmail === 'admin@nexus888.com') &&
        (password === 'nexus888' || password === 'nexus@admin888')
      ) {
        return {
          loggedIn: true,
          username: 'admin',
          name: 'Super Admin',
          token: 'nex_tok_' + Math.random().toString(36).substring(2) + Date.now().toString(36),
          timestamp: Date.now(),
        };
      }
      return null;
    }
  }

  static verifySession(session: AdminSession | null): boolean {
    if (!session || !session.loggedIn) return false;
    const maxAge = 24 * 60 * 60 * 1000;
    return (Date.now() - session.timestamp) < maxAge;
  }
}
