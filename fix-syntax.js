const fs = require('fs');
const path = require('path');

const cwd = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const files = fs.readdirSync(cwd).filter(f => f.endsWith('.html'));

const bookNowClean = `      bookNow: () => {
        const p = this.packages.find(x => x.slug === s.slug) || this.packages[0];
        this.setState({
          form: Object.assign({}, s.form, {
            pkg: p.title,
            dates: s.date ? s.date : s.form.dates,
            message: 'Enquiry for ' + p.title + ' - ' + s.adults + ' adults, ' + s.kids + ' children.'
          })
        });
        const formEl = document.getElementById('enquiry-form');
        if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
        else this.go('contact', { form: this.state.form });
      },`;

files.forEach(file => {
  const filePath = path.join(cwd, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let updated = false;

  // Find the broken block
  const brokenRegex = /bookNow:\s*\(\)\s*=>\s*\{[\s\S]*?else\s+this\.go\('contact',\s*\{\s*form:\s*this\.state\.form\s*\}\);\s*\},[\s\S]*?\}\);\s*\n\s*\},/g;
  
  if (brokenRegex.test(content)) {
      content = content.replace(brokenRegex, bookNowClean);
      updated = true;
  } else {
    // maybe it got broken a different way, let's just do a simpler regex if it's there
    const alternativeBroken = /bookNow:\s*\(\)\s*=>\s*\{[\s\S]*?else\s+this\.go\('contact'[\s\S]*?\}\);\s*\n\s*\},/g;
    if (alternativeBroken.test(content)) {
        content = content.replace(alternativeBroken, bookNowClean);
        updated = true;
    }
  }

  if (updated) {
      fs.writeFileSync(filePath, content);
      console.log('Fixed syntax in ' + file);
  }
});
