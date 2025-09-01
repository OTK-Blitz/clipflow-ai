// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Dark mode toggle (remembers your choice)
const toggle = document.getElementById('modeToggle');
const saved = localStorage.getItem('mode');
if(saved === 'light'){ document.documentElement.classList.add('light'); }
toggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  localStorage.setItem('mode',
    document.documentElement.classList.contains('light') ? 'light' : 'dark'
  );
});

// Light theme overrides (optional)
const style = document.createElement('style');
style.textContent = `
  .light body{ background:#f6f8fb; color:#0b0c10 }
  .light .site-header{ background: rgba(255,255,255,.7); border-bottom:1px solid rgba(0,0,0,.08) }
  .light .card{ background:white; border-color: rgba(0,0,0,.08) }
  .light input, .light textarea{ background:white; color:#0b0c10; border-color: rgba(0,0,0,.15) }
`;
document.head.appendChild(style);

// Contact form (posts to your backend / n8n webhook)
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  msg.textContent = 'Sending...';
  const data = Object.fromEntries(new FormData(form).entries());

  // Replace with your own endpoint in index.html form action
  const endpoint = form.getAttribute('action');

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error('Request failed');
    form.reset();
    msg.textContent = 'Thanks! We will email you soon.';
  } catch (err) {
    console.error(err);
    msg.textContent = 'Could not send. Try again or email us.';
  }
});
