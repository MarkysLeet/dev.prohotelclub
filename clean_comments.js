const fs = require('fs');
const file = 'src/components/HeroSlider.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /{\/\* Pagination Dots \(centered in the left 15% 'tail' of the image\) \*\/}\n\s*{\/\* Pagination Dots \(centered in the left 15% 'tail' of the image\) \*\/}\n/g,
  ''
);
fs.writeFileSync(file, content, 'utf8');
