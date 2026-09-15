const fs = require('fs');
const path = require('path');

const cwd = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const files = fs.readdirSync(cwd).filter(f => f.endsWith('.html'));

const bfcacheScript = `
  <script>
    window.addEventListener('pageshow', function(e) {
      if (e.persisted) {
        window.location.reload();
      }
    });
  </script>
</body>`;

files.forEach(file => {
    const filePath = path.join(cwd, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    if (!content.includes('e.persisted')) {
        content = content.replace('</body>', bfcacheScript);
        fs.writeFileSync(filePath, content);
        console.log('Fixed bfcache in', file);
    }
});
