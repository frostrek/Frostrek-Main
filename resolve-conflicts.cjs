const fs = require('fs');

function resolve(file, choices) {
    let content = fs.readFileSync(file, 'utf8');
    const regex = /<<<<<<< HEAD\r?\n([\s\S]*?)=======\r?\n([\s\S]*?)>>>>>>> [^\r\n]+\r?\n/g;
    let idx = 0;
    content = content.replace(regex, (match, ours, theirs) => {
        const choice = choices[idx] || 'theirs';
        idx++;
        if (choice === 'ours') return ours;
        if (choice === 'theirs') return theirs;
        return choice; // custom resolution
    });
    fs.writeFileSync(file, content, 'utf8');
    console.log('Resolved ' + idx + ' conflicts in ' + file);
}

// HeroSection: 2 conflicts
// 1: icon/color styling -> theirs (collaborator CSS)
// 2: trusted section width -> theirs (collaborator CSS)
resolve('src/components/home/HeroSection.tsx', ['theirs', 'theirs']);

// AISolutionsShowcase: 3 conflicts
// 1: Tab order - theirs reordered (LLM first), keep theirs
// 2: Tab order second block - theirs (fintech moved), keep theirs  
// 3: Link path - theirs
resolve('src/components/home/AISolutionsShowcase.tsx', ['theirs', 'theirs', 'theirs']);

// FeaturesSection: 2 conflicts
// 1: icon size CSS -> theirs
// 2: icon size CSS -> theirs
resolve('src/components/home/FeaturesSection.tsx', ['theirs', 'theirs']);

// WhatWeDoSection: 2 conflicts
// 1: Demo content rewrite -> theirs (LLM training demo)
// 2: Card data -> theirs (LLM training card)
resolve('src/components/home/WhatWeDoSection.tsx', ['theirs', 'theirs']);

// LLMModelTrainingPage: 3 conflicts
// 1: description text -> theirs (richer copy)
// 2: description text -> theirs (richer copy)
// 3: Answer-First SEO -> OURS (keep our shortened version)
resolve('src/pages/LLMModelTrainingPage.tsx', ['theirs', 'theirs', 'ours']);
