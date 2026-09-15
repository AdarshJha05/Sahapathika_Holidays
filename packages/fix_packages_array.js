const fs = require('fs');
const path = require('path');

const cwd = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const files = fs.readdirSync(cwd).filter(f => f.endsWith('.html'));

const newPackages = JSON.parse(fs.readFileSync(path.join(cwd, 'packages', 'new_packages.json'), 'utf-8'));

// Format new packages as string
let newPackagesStr = "";
newPackages.forEach(pkg => {
    let p = pkg.obj;
    newPackagesStr += `    { slug: '${p.slug}', title: '${p.title.replace(/'/g, "\\'")}', regions: '${p.regions.replace(/'/g, "\\'")}', region: '${p.region}', duration: '${p.duration}', cat: '${p.cat}', photo: '${p.photo}', hint: '${p.hint.replace(/'/g, "\\'")}' },\n`;
});

// Image replacement map
const imgMap = {
    'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://i.pinimg.com/736x/b4/88/63/b48863982d7b8c63a8d633405da62b2b.jpg',
    'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://i.pinimg.com/736x/a8/39/4f/a8394fa9408e2472f0672f2bb515d9db.jpg',
    'https://images.unsplash.com/photo-1627885408543-c9e99214d0a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://i.pinimg.com/736x/a8/39/4f/a8394fa9408e2472f0672f2bb515d9db.jpg',
    'https://images.unsplash.com/photo-1601058349271-e4eb9f315a6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://i.pinimg.com/736x/a8/39/4f/a8394fa9408e2472f0672f2bb515d9db.jpg',
    'https://images.unsplash.com/photo-1599813184650-327c13054173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://i.pinimg.com/736x/a8/39/4f/a8394fa9408e2472f0672f2bb515d9db.jpg'
};

files.forEach(file => {
    const filePath = path.join(cwd, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    let updated = false;

    // Check if package array injection was skipped
    if (!content.includes(`{ slug: '${newPackages[0].obj.slug}'`)) {
        const packagesRegex = /packages\s*=\s*\[/g;
        if (packagesRegex.test(content)) {
            content = content.replace(packagesRegex, `packages = [\n${newPackagesStr}`);
            updated = true;
        }
    }
    
    // Check for images in packages array that need replacing in case they were injected with old unsplash links
    for (const [badImg, goodImg] of Object.entries(imgMap)) {
        if (content.includes(badImg)) {
            content = content.split(badImg).join(goodImg);
            updated = true;
        }
    }

    if (updated) {
        fs.writeFileSync(filePath, content);
        console.log('Fixed packages in', file);
    }
});
