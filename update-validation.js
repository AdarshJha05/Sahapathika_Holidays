const fs = require('fs');
const path = require('path');

const filePath = 'c:/Users/jhash/Downloads/Sahapathika_Holidays/contact.html';
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Add errorMsg to initial state
content = content.replace(
  "form: { name: '', email: '', phone: '', pkg: '', dates: '', message: '' }, sent: false",
  "form: { name: '', email: '', phone: '', pkg: '', dates: '', message: '' }, sent: false, errorMsg: ''"
);

// 2. Add errorMsg to resetForm
content = content.replace(
  "resetForm: () => this.setState({ sent: false, form: { name: '', email: '', phone: '', pkg: '', dates: '', message: '' } }),",
  "resetForm: () => this.setState({ sent: false, errorMsg: '', form: { name: '', email: '', phone: '', pkg: '', dates: '', message: '' } }),"
);

// 3. Update the send function with validation logic
const oldSend = `send: () => {
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

const newSend = `send: () => {
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

content = content.replace(oldSend, newSend);

// 4. Inject the error message HTML just above the Send enquiry button
const errorHtml = `
              <sc-if value="{{ errorMsg }}" hint-placeholder-val="{{ false }}">
                <div style="color:#C4362C;font-size:13.5px;font-weight:600;margin-bottom:16px;padding:12px 16px;background:#FDE8E4;border-radius:12px;border:1px solid rgba(229,72,61,.2)">
                  {{ errorMsg }}
                </div>
              </sc-if>
              <button`;

content = content.replace('              <button', errorHtml);

fs.writeFileSync(filePath, content);
console.log('Updated contact.html with validation logic');
