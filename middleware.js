// Password protection via HTTP Basic Auth (Vercel Edge Middleware).
// To change credentials: edit USERNAME / PASSWORD below and push.
// To disable: delete this file (or rename it) and push.

const USERNAME = 'zahid';
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
      const user = decoded.slice(0, colon);
      const pass = decoded.slice(colon + 1);
      if (user === USERNAME && pass === PASSWORD) return;
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
