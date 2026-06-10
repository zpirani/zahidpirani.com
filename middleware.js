// Password gate via custom HTML page + cookie (Vercel Edge Middleware).
// Replaces HTTP Basic Auth so the username field is gone — single password input.
// To change the password: edit PASSWORD below and push.
// To disable: delete this file (or rename it) and push.

const PASSWORD = 'Build2026';
const COOKIE_NAME = 'zp_auth';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export const config = {
  matcher: ['/((?!_vercel|favicon.ico|robots.txt).*)'],
};

const formHtml = (err = false, next = '/') => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Zahid Pirani — Enter Password</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #16171E; color: #EDEDF2;
    font-family: 'Inter', system-ui, sans-serif;
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
  }
  .gate { max-width: 360px; width: 100%; text-align: center; }
  .gate .mark {
    font-family: 'Inter', sans-serif;
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: #9092B0; margin-bottom: 28px;
  }
  .gate p {
    font-size: 14px; color: #C4C4DA;
    line-height: 1.55; margin-bottom: 28px;
  }
  .gate form { display: flex; flex-direction: column; gap: 10px; }
  .gate input[type="password"] {
    width: 100%; padding: 14px 16px;
    background: #1D1F28; border: 1px solid #23252F;
    border-radius: 8px; color: #EDEDF2;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 15px; outline: none;
    transition: border-color 0.18s;
  }
  .gate input[type="password"]:focus { border-color: #22D3EE; }
  .gate button {
    padding: 14px 16px;
    background: #EDEDF2; color: #16171E;
    border: none; border-radius: 9999px;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 14px; font-weight: 500;
    cursor: pointer; transition: opacity 0.18s;
  }
  .gate button:hover { opacity: 0.85; }
  .gate .err {
    color: #FF6B6B; font-size: 12px;
    margin-top: 12px;
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.04em;
  }
</style>
</head>
<body>
  <div class="gate">
    <div class="mark">ZAHID PIRANI</div>
    <p>Enter the password to view this portfolio.</p>
    <form method="POST" action="/__auth">
      <input type="hidden" name="next" value="${escapeAttr(next)}">
      <input type="password" name="password" autofocus required placeholder="Password" autocomplete="current-password">
      <button type="submit">Continue</button>
      ${err ? '<div class="err">Incorrect password</div>' : ''}
    </form>
  </div>
</body>
</html>`;

function escapeAttr(s) {
  return String(s).replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[ch]);
}

function passwordPage(err = false, next = '/') {
  return new Response(formHtml(err, next), {
    status: err ? 401 : 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export default async function middleware(request) {
  const url = new URL(request.url);

  // Handle password submission
  if (request.method === 'POST' && url.pathname === '/__auth') {
    const body = await request.text();
    const params = new URLSearchParams(body);
    const submitted = params.get('password') || '';
    const next = params.get('next') || '/';
    const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/';
    if (submitted === PASSWORD) {
      return new Response(null, {
        status: 303,
        headers: {
          'Location': safeNext,
          'Set-Cookie': `${COOKIE_NAME}=${PASSWORD}; Path=/; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; Secure; SameSite=Lax`,
        },
      });
    }
    return passwordPage(true, safeNext);
  }

  // Check existing cookie
  const cookie = request.headers.get('cookie') || '';
  const ok = cookie.split(';').some(c => c.trim() === `${COOKIE_NAME}=${PASSWORD}`);
  if (ok) return; // authorized — pass through

  // No auth — serve password page with current path as "next"
  return passwordPage(false, url.pathname + url.search);
}
