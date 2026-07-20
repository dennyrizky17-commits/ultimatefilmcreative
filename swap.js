const fs = require('fs');
let text = fs.readFileSync('index.html', 'utf-8');

text = text.replace(
    '                <button class="filter-btn" data-filter="website">Website</button>\r\n                <button class="filter-btn" data-filter="apps">Mobile Apps</button>\r\n                <button class="filter-btn" data-filter="video">Video</button>',
    '                <button class="filter-btn" data-filter="video">Video</button>\r\n                <button class="filter-btn" data-filter="website">Website</button>\r\n                <button class="filter-btn" data-filter="apps">Mobile Apps</button>'
);
text = text.replace(
    '                <button class="filter-btn" data-filter="website">Website</button>\n                <button class="filter-btn" data-filter="apps">Mobile Apps</button>\n                <button class="filter-btn" data-filter="video">Video</button>',
    '                <button class="filter-btn" data-filter="video">Video</button>\n                <button class="filter-btn" data-filter="website">Website</button>\n                <button class="filter-btn" data-filter="apps">Mobile Apps</button>'
);

const startIdx = text.indexOf('<!-- Portfolio Items -->');
const endIdx = text.indexOf('            </div>\r\n\r\n            <div class="text-center"');
const endIdx2 = text.indexOf('            </div>\n\n            <div class="text-center"');
const realEndIdx = endIdx !== -1 ? endIdx : (endIdx2 !== -1 ? endIdx2 : -1);

if (startIdx !== -1 && realEndIdx !== -1) {
    const pre = text.substring(0, startIdx + 25);
    const grid = text.substring(startIdx + 25, realEndIdx);
    const post = text.substring(realEndIdx);
    
    const vidIdx = grid.indexOf('                <div class="portfolio-item hover-lift" data-category="video">');
    if (vidIdx !== -1) {
        const websites = grid.substring(0, vidIdx);
        const videos = grid.substring(vidIdx);
        fs.writeFileSync('index.html', pre + videos + websites + post, 'utf-8');
        console.log('Success');
    } else {
        console.log('Video index not found');
    }
} else {
    console.log('Indices not found', startIdx, realEndIdx);
}
