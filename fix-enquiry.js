const fs = require('fs');
const path = require('path');

const cwd = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const files = fs.readdirSync(cwd).filter(f => f.endsWith('.html'));

const sendMethod = `      send: () => {
        const { name, phone, email, dates, pkg } = this.state.form;
        
        if (!name || !name.trim()) return this.setState({ errorMsg: 'Please enter your full name.' });
        if (!phone || !phone.trim()) return this.setState({ errorMsg: 'Please enter your phone number.' });
        if (!email || !email.trim()) return this.setState({ errorMsg: 'Please enter your email address.' });
        if (!dates || !dates.trim()) return this.setState({ errorMsg: 'Please specify your travel dates.' });
        if (!pkg || !pkg.trim()) return this.setState({ errorMsg: 'Please select an interested package.' });

        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!emailRegex.test(email)) return this.setState({ errorMsg: 'Please enter a valid email address.' });

        const phoneRegex = /^\\+?[0-9\\s\\-\\(\\)]{7,15}$/;
        if (!phoneRegex.test(phone)) return this.setState({ errorMsg: 'Please enter a valid phone number.' });

        this.setState({ errorMsg: '' });

        fetch('https://formsubmit.co/ajax/adarsh@rytful.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            name: this.state.form.name,
            phone: this.state.form.phone,
            email: this.state.form.email,
            dates: this.state.form.dates,
            package: this.state.form.pkg,
            message: this.state.form.message,
            _subject: 'New Enquiry from Sahapathika Holidays'
          })
        });

        this.setState({ sent: true });
      },`;

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

  const targetSend = "send: () => this.setState({ sent: true }),";
  if (content.includes(targetSend)) {
      content = content.replace(targetSend, sendMethod);
      updated = true;
  }

  const oldBookNow = `bookNow: () => {
        const p = this.packages.find(x => x.slug === s.slug) || this.packages[0];
        this.go('contact', { form: Object.assign({}, s.form, { pkg: p.title, dates: s.date ? s.date : s.form.dates, message: 'Enquiry for ' + p.title + ' - ' + s.adults + ' adults, ' + s.kids + ' children.' }) });
      },`;
  if (content.includes(oldBookNow)) {
      content = content.replace(oldBookNow, bookNowMethod);
      updated = true;
  }

  // Handle minor spacing variants of oldBookNow
  const oldBookNowRegex = /bookNow:\s*\(\)\s*=>\s*\{\s*const p = this\.packages\.find\(x => x\.slug === s\.slug\) \|\| this\.packages\[0\];\s*this\.go\('contact',\s*\{\s*form:\s*Object\.assign\(\{\},\s*s\.form,\s*\{\s*pkg:\s*p\.title,\s*dates:\s*s\.date \? s\.date : s\.form\.dates,\s*message:\s*'Enquiry for '\s*\+\s*p\.title\s*\+\s*' - '\s*\+\s*s\.adults\s*\+\s*' adults, '\s*\+\s*s\.kids\s*\+\s*' children\.'\s*\}\)\s*\}\);\s*\},/g;
  content = content.replace(oldBookNowRegex, bookNowMethod);
  updated = true; // force updated true since replace doesn't throw if not found

  const targetHeading = '<div style="font-family:\'Fraunces\',serif;font-size:27px;letter-spacing:-.01em;margin-bottom:26px">Send an enquiry</div>';
  const newHeading = '<div id="enquiry-form" style="font-family:\'Fraunces\',serif;font-size:27px;letter-spacing:-.01em;margin-bottom:26px;scroll-margin-top:100px;">Send an enquiry</div>';
  
  if (content.includes(targetHeading)) {
      content = content.replace(targetHeading, newHeading);
      updated = true;
  }

  if (updated) {
      fs.writeFileSync(filePath, content);
      console.log('Fixed enquiry logic in ' + file);
  }
});
