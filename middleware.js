// Password protection via HTTP Basic Auth (Vercel Edge Middleware).
// Password-only — username field can be left blank (or any value).
// To change the password: edit PASSWORD below and push.
// To disable: delete this file (or rename it) and push.

const PASSWORD = 'Build2026';

export const config = {
  // Run on every request except Vercel internals and the favicon
  matcher: ['/((?!_vercel|favicon.ico).*)'],
};

export default function middleware(request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Basic ')) {
    try {
      const decoded = atob(authHeader.slice(6));
      const colon = decoded.indexOf(':');
      const pass = colon === -1 ? decoded : decoded.slice(colon + 1);
      if (pass === PASSWORD) return; // username ignored — password only
    } catch (_) {
      // fall through to 401
    }
  }

  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="zahidpirani.com", charset="UTF-8"',
    },
  });
}
