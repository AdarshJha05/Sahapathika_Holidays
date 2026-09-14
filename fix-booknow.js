const fs = require('fs');
const path = require('path');

const cwd = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const files = fs.readdirSync(cwd).filter(f => f.endsWith('.html'));

const bookNowMethod = `      bookNow: () => {
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

  // Use a regex that catches everything from bookNow: () => { to }, inclusive
  const regex = /bookNow:\s*\(\)\s*=>\s*\{[\s\S]*?this\.go\('contact'[\s\S]*?\},/g;
  
  if (regex.test(content)) {
      content = content.replace(regex, bookNowMethod);
      updated = true;
  }

  if (updated) {
      fs.writeFileSync(filePath, content);
      console.log('Fixed bookNow in ' + file);
  }
});
