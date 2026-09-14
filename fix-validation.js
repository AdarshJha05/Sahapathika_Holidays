const fs = require('fs');
const path = require('path');

const filePath = 'c:/Users/jhash/Downloads/Sahapathika_Holidays/contact.html';
let content = fs.readFileSync(filePath, 'utf-8');

// The mistake:
// <sc-if value="{{ errorMsg }}" hint-placeholder-val="{{ false }}">
//   <div style="color:#C4362C;font-size:13.5px;font-weight:600;margin-bottom:16px;padding:12px 16px;background:#FDE8E4;border-radius:12px;border:1px solid rgba(229,72,61,.2)">
//     {{ errorMsg }}
//   </div>
// </sc-if>
// <button

// Let's remove the mistake from line 606+
const mistakeRegex = /<sc-if value="\{\{ errorMsg \}\}" hint-placeholder-val="\{\{ false \}\}">[\s\S]*?<\/sc-if>\s*<button/;
content = content.replace(mistakeRegex, '<button');

// Let's insert the errorMsg block correctly just before the Send enquiry button
const correctButtonHTML = '<button style="background:#E5483D;color:#fff;border:0;padding:17px 32px;border-radius:14px;font-weight:800;font-size:15.5px;cursor:pointer;width:100%" style-hover="background:#C4362C" onClick="{{ send }}">Send enquiry</button>';

const correctHtmlWithButton = `
              <sc-if value="{{ errorMsg }}" hint-placeholder-val="{{ false }}">
                <div style="color:#C4362C;font-size:13.5px;font-weight:600;margin-bottom:16px;padding:12px 16px;background:#FDE8E4;border-radius:12px;border:1px solid rgba(229,72,61,.2)">
                  {{ errorMsg }}
                </div>
              </sc-if>
              ${correctButtonHTML}`;

content = content.replace(correctButtonHTML, correctHtmlWithButton);

fs.writeFileSync(filePath, content);
console.log('Fixed errorMsg placement in contact.html');
