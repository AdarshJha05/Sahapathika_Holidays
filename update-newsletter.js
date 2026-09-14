const fs = require('fs');
const path = require('path');

const cwd = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const files = fs.readdirSync(cwd).filter(f => f.endsWith('.html'));

const scriptToInject = `
<script>
  document.addEventListener('DOMContentLoaded', function() {
    var subscribeForms = document.querySelectorAll('form.subscribe');
    subscribeForms.forEach(function(form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var emailInput = form.querySelector('input[type="email"]');
        var email = emailInput ? emailInput.value : '';
        
        var existingErr = form.querySelector('.nl-error');
        if (existingErr) existingErr.remove();

        if (!email || !/^[^\s@]+@[^\s@]+\\.[^\s@]+$/.test(email)) {
          var err = document.createElement('div');
          err.className = 'nl-error';
          err.style.color = '#C4362C';
          err.style.fontSize = '12.5px';
          err.style.marginTop = '10px';
          err.style.fontWeight = '600';
          err.textContent = 'Please enter a valid email address.';
          form.appendChild(err);
          return;
        }

        var btn = form.querySelector('button');
        if (btn) {
          btn.disabled = true;
          btn.style.opacity = '0.5';
        }

        fetch('https://formsubmit.co/ajax/adarsh@rytful.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            email: email,
            _subject: 'New Footer Newsletter Subscription'
          })
        }).then(function() {
          form.innerHTML = '<div style="color:#2F7A63;font-weight:700;font-size:14.5px;padding:12px 0;">Thank you for subscribing!</div>';
        }).catch(function() {
          var err = document.createElement('div');
          err.className = 'nl-error';
          err.style.color = '#C4362C';
          err.style.fontSize = '12.5px';
          err.style.marginTop = '10px';
          err.textContent = 'Something went wrong. Please try again.';
          form.appendChild(err);
          if (btn) {
            btn.disabled = false;
            btn.style.opacity = '1';
          }
        });
      });
    });
  });
</script>
</body>`;

files.forEach(file => {
  const filePath = path.join(cwd, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (!content.includes("var subscribeForms = document.querySelectorAll('form.subscribe');")) {
      content = content.replace('</body>', scriptToInject);
      fs.writeFileSync(filePath, content);
      console.log('Updated footer newsletter in ' + file);
  }
});
