
const fs = require('fs');
const content = fs.readFileSync('/Users/piyushkhurana/Zica/src/app/page.tsx', 'utf8');

const tags = [
    { open: /<section/g, close: /<\/section>/g, name: 'section' },
    { open: /<div/g, close: /<\/div>/g, name: 'div' },
    { open: /<motion\.div/g, close: /<\/motion\.div>/g, name: 'motion.div' },
    { open: /<form/g, close: /<\/form>/g, name: 'form' },
    { open: /<main/g, close: /<\/main>/g, name: 'main' },
    { open: /<footer/g, close: /<\/footer>/g, name: 'footer' },
    { open: /<nav/g, close: /<\/nav>/g, name: 'nav' },
    { open: /<motion\.nav/g, close: /<\/motion\.nav>/g, name: 'motion.nav' },
    { open: /<AnimatePresence/g, close: /<\/AnimatePresence>/g, name: 'AnimatePresence' }
];

tags.forEach(tag => {
    const openCount = (content.match(tag.open) || []).length;
    const closeCount = (content.match(tag.close) || []).length;
    console.log(`${tag.name}: ${openCount} open, ${closeCount} close`);
});
