const fs = require('fs');
const path = require('path');

const cwd = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const files = fs.readdirSync(cwd).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(cwd, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // 1. Update Footer Newsletter Form in all pages
  // We add an id to the form and a script at the bottom to intercept it with AJAX.
  // Actually, the simplest is to just change the form action to formsubmit.co
  // Let's replace the form tag
  const oldFormStr = '<form class="subscribe" action="#" method="post">';
  const newFormStr = '<form class="subscribe" action="https://formsubmit.co/adarsh@rytful.com" method="POST">\n            <input type="hidden" name="_captcha" value="false">\n            <input type="hidden" name="_next" value="https://sahapathika-holidays.vercel.app/">\n            <input type="hidden" name="_subject" value="New Footer Newsletter Subscription">';
  
  if (content.includes(oldFormStr)) {
      content = content.replace(oldFormStr, newFormStr);
  }

  // 2. Update Contact Form JS in contact.html
  if (file === 'contact.html') {
      const oldSend = 'send: () => this.setState({ sent: true }),';
      const newSend = `send: () => {
        if (this.state.form.name && this.state.form.email) {
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
        }
        this.setState({ sent: true });
      },`;
      content = content.replace(oldSend, newSend);
  }

  // 3. Update 10% off Newsletter JS in index.html
  if (file === 'index.html') {
      const oldSubscribe = 'subscribe: () => this.setState({ subscribed: true }),';
      const newSubscribe = `subscribe: () => {
        if (this.state.email) {
          fetch('https://formsubmit.co/ajax/adarsh@rytful.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
              email: this.state.email,
              _subject: '10% Off Newsletter Subscription'
            })
          });
        }
        this.setState({ subscribed: true });
      },`;
      content = content.replace(oldSubscribe, newSubscribe);
  }

  fs.writeFileSync(filePath, content);
  console.log(`Updated forms in ${file}`);
});
