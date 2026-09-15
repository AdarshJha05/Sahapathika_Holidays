const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/jhash/Downloads/Sahapathika_Holidays';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const imgMap = {
    'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://i.pinimg.com/736x/b4/88/63/b48863982d7b8c63a8d633405da62b2b.jpg', // Shimla/Manali -> Kashmir
    'https://images.unsplash.com/photo-1590393802688-e21976a445e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://i.pinimg.com/736x/a8/39/4f/a8394fa9408e2472f0672f2bb515d9db.jpg', // Amritsar -> Varanasi
    'https://images.unsplash.com/photo-1601058349271-e4eb9f315a6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80': 'https://i.pinimg.com/736x/a8/39/4f/a8394fa9408e2472f0672f2bb515d9db.jpg'  // Devi -> Varanasi
};

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    let changed = false;

    for (const [badImg, goodImg] of Object.entries(imgMap)) {
        if (content.includes(badImg)) {
            // Use split.join for global replace safely
            content = content.split(badImg).join(goodImg);
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated images in ${file}`);
    }
});
