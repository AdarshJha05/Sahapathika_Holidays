const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The existing dropdown list HTML
const oldDropdownList = /<div style="border:1px solid rgba\(22,33,29,\.1\);border-radius:16px;background:#fff;padding:6px;max-height:220px;overflow:auto;animation:fadein \.16s both">\s*<sc-for list="{{ destOptions }}" as="o" hint-placeholder-count="6">\s*<button style="{{ o\.style }}" onClick="{{ o\.pick }}">{{ o\.label }}<\/button>\s*<\/sc-for>\s*<\/div>/;

const newDropdownList = `<div class="search-dropdown {{ state.field === 'dest' ? 'open' : '' }}" style="border:1px solid rgba(22,33,29,.1);border-radius:16px;background:#fff;padding:12px;max-height:360px;overflow-y:auto;animation:fadein 0.2s both;scrollbar-width:thin">
                <style>
                  .search-dropdown::-webkit-scrollbar { width: 6px; }
                  .search-dropdown::-webkit-scrollbar-thumb { background: rgba(22,33,29,0.15); border-radius: 99px; }
                  .search-dropdown button:focus-visible { outline: 2px solid #E5483D; outline-offset: -2px; }
                  .search-dropdown-item { transition: background 0.2s; border-radius: 12px; }
                  .search-dropdown-item:hover { background: rgba(22,33,29,0.04); }
                </style>
                <div style="display:flex;flex-direction:column;gap:4px">
                  <sc-for list="{{ destOptions }}" as="o" hint-placeholder-count="12">
                    <button class="{{ o.isItem ? 'search-dropdown-item' : '' }}" style="{{ o.style }}" onClick="{{ o.pick }}" tabIndex="0">
                      <sc-if value="{{ o.isItem }}" hint-placeholder-val="{{ false }}">
                        <div style="display:flex;align-items:center;gap:12px;width:100%">
                          <div style="width:32px;height:32px;border-radius:50%;background:#DCEEE7;color:#2F7A63;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;flex-shrink:0;border:1px solid rgba(22,33,29,.05)">
                            {{ o.initial }}
                          </div>
                          <div style="flex:1;text-align:left;display:flex;flex-direction:column">
                            <span style="font-size:14.5px;font-weight:600;color:#1B1A17">{{ o.label }}</span>
                            <sc-if value="{{ !!o.popular }}" hint-placeholder-val="{{ true }}">
                              <span style="font-size:11px;color:#E5483D;font-weight:700">POPULAR</span>
                            </sc-if>
                          </div>
                        </div>
                      </sc-if>
                      <sc-if value="{{ !o.isItem }}" hint-placeholder-val="{{ true }}">
                        <div style="display:flex;align-items:center;gap:8px">
                          <span>{{ o.icon }}</span>
                          <span>{{ o.label }}</span>
                        </div>
                      </sc-if>
                    </button>
                  </sc-for>
                </div>
              </div>`;

html = html.replace(oldDropdownList, newDropdownList);

// Update destOptions logic
const oldDestOptions = /destOptions: \(\(\) => \{[\s\S]*?return out;\n        \}\)\(\),/;

const newDestOptions = `destOptions: (() => {
          const row = 'width:100%;background:none;border:0;text-align:left;padding:10px 12px;cursor:pointer;display:flex;align-items:center;outline:none';
          const head = 'width:100%;background:none;border:0;text-align:left;padding:16px 12px 8px;font-size:10px;font-weight:800;letter-spacing:.18em;color:#C4362C;cursor:default';
          const out = [{ label: 'Anywhere', style: 'width:100%;background:none;border:0;text-align:left;padding:12px 16px;border-radius:12px;cursor:pointer;font-size:14.5px;font-weight:700;color:#2F7A63;background:#DCEEE7', pick: () => this.setState({ dest: '', field: null }), isItem: false, icon: '🌍' }];
          [['SOUTH INDIA & KERALA', '🌴', ['Kovalam', 'Varkala', 'Alleppey', 'Munnar', 'Thekkady', 'Wayanad', 'Kochi', 'Bekal', 'Trivandrum']],
           ['REST OF INDIA — ON ENQUIRY', '🕌', ['Rajasthan', 'Golden Triangle', 'Goa', 'Himachal', 'Northeast', 'Ladakh']],
           ['INTERNATIONAL — ON ENQUIRY', '✈️', ['Middle East', 'South-East Asia', 'Europe', 'Sri Lanka', 'Maldives']]
          ].forEach(g => {
            out.push({ label: g[0], icon: g[1], style: head, pick: () => {}, isItem: false });
            g[2].forEach(l => out.push({ label: l, initial: l[0], popular: (l === 'Munnar' || l === 'Alleppey' || l === 'Goa'), style: row, pick: () => this.setState({ dest: l, field: null }), isItem: true }));
          });
          return out;
        })(),`;

html = html.replace(oldDestOptions, newDestOptions);

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html structural changes applied successfully.');
