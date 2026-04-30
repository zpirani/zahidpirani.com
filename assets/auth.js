(function () {
  var TOKEN    = 'zp_auth_2026';
  var PASSWORD = 'Build2026';

  if (sessionStorage.getItem(TOKEN) === '1') return;

  document.documentElement.style.overflow = 'hidden';

  function inject() {
    var style = document.createElement('style');
    style.textContent = [
      '#auth-wall{position:fixed;inset:0;z-index:9999;background:#16171E;',
        'display:flex;align-items:center;justify-content:center;',
        'font-family:Inter,system-ui,sans-serif;}',
      '.aw-inner{width:100%;max-width:360px;padding:0 24px;}',
      '.aw-mark{font-family:"Schibsted Grotesk",system-ui,sans-serif;',
        'font-size:13px;font-weight:700;letter-spacing:-0.01em;',
        'color:#EDEDF2;margin-bottom:48px;}',
      '.aw-lock{width:36px;height:36px;margin-bottom:24px;',
        'display:flex;align-items:center;justify-content:center;',
        'border:1px solid #23252F;background:#1D1F28;}',
      '.aw-lock svg{display:block;}',
      '.aw-heading{font-family:"Schibsted Grotesk",system-ui,sans-serif;',
        'font-size:20px;font-weight:700;letter-spacing:-0.02em;',
        'color:#EDEDF2;margin-bottom:8px;}',
      '.aw-sub{font-size:13px;color:#8080A0;margin-bottom:32px;line-height:1.6;}',
      '.aw-field{display:flex;flex-direction:column;gap:8px;margin-bottom:12px;}',
      '.aw-label{font-family:"JetBrains Mono",monospace;font-size:9px;',
        'letter-spacing:0.14em;text-transform:uppercase;color:#6E7090;}',
      '.aw-input{background:#1D1F28;border:1px solid #23252F;color:#EDEDF2;',
        'font-family:"JetBrains Mono",monospace;font-size:14px;',
        'padding:13px 16px;border-radius:0;outline:none;width:100%;',
        'transition:border-color 0.15s;-webkit-appearance:none;}',
      '.aw-input:focus{border-color:rgba(34,211,238,0.5);}',
      '.aw-input::placeholder{color:#3A3C4E;}',
      '.aw-btn{width:100%;margin-top:4px;padding:13px;',
        'background:#22D3EE;color:#000;',
        'font-family:"JetBrains Mono",monospace;font-size:11px;font-weight:500;',
        'letter-spacing:0.1em;text-transform:uppercase;border:none;',
        'cursor:pointer;transition:opacity 0.15s;}',
      '.aw-btn:hover{opacity:0.88;}',
      '.aw-error{font-family:"JetBrains Mono",monospace;font-size:10px;',
        'color:#f87171;letter-spacing:0.06em;margin-top:12px;',
        'min-height:14px;text-transform:uppercase;}'
    ].join('');
    document.head.appendChild(style);

    var wall = document.createElement('div');
    wall.id = 'auth-wall';
    wall.innerHTML = [
      '<div class="aw-inner">',
        '<div class="aw-mark">ZAHID PIRANI</div>',
        '<div class="aw-lock">',
          '<svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">',
            '<rect x="1" y="7" width="12" height="8" rx="1" stroke="#6E7090" stroke-width="1.5"/>',
            '<path d="M4 7V5a3 3 0 0 1 6 0v2" stroke="#6E7090" stroke-width="1.5" stroke-linecap="round"/>',
          '</svg>',
        '</div>',
        '<div class="aw-heading">Protected Portfolio</div>',
        '<p class="aw-sub">This work is confidential. Enter the password to continue.</p>',
        '<form id="aw-form">',
          '<div class="aw-field">',
            '<label class="aw-label" for="aw-input">Password</label>',
            '<input class="aw-input" id="aw-input" type="password"',
              ' placeholder="••••••••••" autocomplete="current-password">',
          '</div>',
          '<button class="aw-btn" type="submit">Unlock →</button>',
          '<p class="aw-error" id="aw-error"></p>',
        '</form>',
      '</div>'
    ].join('');
    document.body.appendChild(wall);

    // Autofocus after render
    setTimeout(function () {
      var inp = document.getElementById('aw-input');
      if (inp) inp.focus();
    }, 50);

    document.getElementById('aw-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var inp = document.getElementById('aw-input');
      if (inp.value === PASSWORD) {
        sessionStorage.setItem(TOKEN, '1');
        document.getElementById('auth-wall').remove();
        document.documentElement.style.overflow = '';
      } else {
        document.getElementById('aw-error').textContent = 'Incorrect password — try again.';
        inp.value = '';
        inp.focus();
      }
    });
  }

  if (document.body) {
    inject();
  } else {
    document.addEventListener('DOMContentLoaded', inject);
  }
})();
