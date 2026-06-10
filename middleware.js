// Password protection via HTTP Basic Auth (Vercel Edge Middleware).
// To enable: set SITE_PASSWORD in Vercel project env vars.
// Optional: SITE_USERNAME (defaults to "zahid").
// Behavior: while SITE_PASSWORD is unset the site stays open, so the
// first deploy of this file doesn't lock anyone out by accident.

export const config = {
  // Run on every request except Vercel internals and the favicon
  matcher: ['/((?!_vercel|favicon.ico).*)'],
};

export default function middleware(request) {
  const expectedUser = process.env.SITE_USERNAME || 'zahid';
  const expectedPass = process.env.SITE_PASSWORD;

  if (!expectedPass) return; // fail-open until env var is configured

  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Basic ')) {
    try {
      const decoded = atob(authHeader.slice(6));
      const colon = decoded.indexOf(':');
      const user = decoded.slice(0, colon);
      const pass = decoded.slice(colon + 1);
      if (user === expectedUser && pass === expectedPass) return;
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
