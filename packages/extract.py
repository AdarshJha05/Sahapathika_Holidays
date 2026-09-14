import os
import re
import json
import docx

def parse_docx(filepath):
    doc = docx.Document(filepath)
    paragraphs = [p.text.strip() for p in doc.paragraphs if p.text.strip()]
    
    title = ""
    duration = ""
    days = []
    
    current_day = None
    current_day_title = ""
    current_day_body = []
    
    for i, p in enumerate(paragraphs):
        # The first few lines are usually title/duration
        if i == 0 and not title:
            title = p
        elif "Tour Package" in p or "Yatra" in p:
            if not title: title = p
            
        match_day = re.match(r'^(Day\s*\d+\s*(?:[:\-]?)\s*)(.*)$', p, re.IGNORECASE)
        if match_day:
            if current_day:
                days.append({
                    "title": f"Day {current_day}: {current_day_title}",
                    "body": " ".join(current_day_body)
                })
            
            day_num_str = re.search(r'\d+', match_day.group(1)).group()
            current_day = int(day_num_str)
            current_day_title = match_day.group(2).strip()
            current_day_body = []
        elif current_day:
            # Check if we reached inclusions/exclusions or FAQs
            if re.match(r'^(Inclusions|Exclusions|FAQ|Important|Package Cost|Note)', p, re.IGNORECASE):
                break
            current_day_body.append(p)
            
    if current_day:
        days.append({
            "title": f"Day {current_day}: {current_day_title}",
            "body": " ".join(current_day_body)
        })
        
    return {
        "filename": os.path.basename(filepath),
        "title": title,
        "duration": duration,
        "days": days
    }

d = 'c:/Users/jhash/Downloads/Sahapathika_Holidays/packages'
res = []
for f in os.listdir(d):
    if f.endswith('.docx'):
        res.append(parse_docx(os.path.join(d, f)))
        
with open(os.path.join(d, 'extracted.json'), 'w', encoding='utf-8') as out:
    json.dump(res, out, indent=2, ensure_ascii=False)
    
print("Extracted", len(res), "files")
