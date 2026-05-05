
const fs = require('fs');
const content = fs.readFileSync('/Users/piyushkhurana/Zica/src/app/page.tsx', 'utf8');

const lines = content.split('\n');
let stack = [];

lines.forEach((line, i) => {
    const lineNum = i + 1;
    // Match opening tags (not self-closing)
    const openMatches = line.matchAll(/<(div|section|motion\.div|motion\.h2|motion\.p|h1|h2|h3|h4|p|span|button|form|main|footer|nav|motion\.nav|AnimatePresence|Link|Image)(?![^>]*\/>)[^>]*>/g);
    for (const match of openMatches) {
        stack.push({ name: match[1], line: lineNum });
    }

    // Match closing tags
    const closeMatches = line.matchAll(/<\/([^>]+)>/g);
    for (const match of closeMatches) {
        const name = match[1];
        if (stack.length === 0) {
            console.log(`Extra closing tag </${name}> at line ${lineNum}`);
        } else {
            const last = stack.pop();
            if (last.name !== name) {
                console.log(`Mismatched tag: expected </${last.name}> (from line ${last.line}), got </${name}> at line ${lineNum}`);
            }
        }
    }
});

stack.forEach(item => {
    console.log(`Unclosed tag <${item.name}> from line ${item.line}`);
});
