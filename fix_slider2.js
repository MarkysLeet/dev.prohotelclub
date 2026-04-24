const fs = require('fs');
const file = 'src/components/HeroSlider.tsx';
let content = fs.readFileSync(file, 'utf8');

// I need to ensure the dots are completely visible and moved.
// Right now I have:
// <div className="absolute bottom-12 left-[7.5%] -translate-x-1/2 flex gap-3 z-50">
// Maybe `left-[7.5%]` is not parsed by Tailwind because it wasn't in the original build, or JIT didn't pick it up?
// Tailwind JIT scans files. `left-[7.5%]` is a valid arbitrary value. It should generate `left: 7.5%;`.
// Let's use `left-[7.5%]` or just `left-[10%]`?
// Wait, the "tail" is 15% width of the 60% container.
// What if I just use `right-[85%]` which is the left edge of the cutout?
// If I use `right-[85%]`, it's exactly on the border between the tail and the cutout.
// "посередине этого хвостика от буквы Г" -> middle of the tail.
// Tail is from 0% to 15%. So middle is 7.5%.
// Let's write inline style just to be 100% sure Tailwind doesn't drop it: `style={{ left: '7.5%' }}`.
// AND let's ensure it's not relative to the image wrapper but relative to the `w-[60%] h-full relative` container.

const replaceDots = `
        {/* Pagination Dots (centered in the left 15% 'tail' of the image) */}
        <div
          className="absolute bottom-12 flex gap-3 z-[100]"
          style={{ left: '7.5%', transform: 'translateX(-50%)' }}
        >
          {hotels.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={\`w-2 h-2 rounded-full transition-all duration-300 \${
                index === currentIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
              }\`}
              aria-label={\`Go to slide \${index + 1}\`}
            />
          ))}
        </div>
`;

content = content.replace(
  /<div className="absolute bottom-12 left-\[7\.5%\] -translate-x-1\/2 flex gap-3 z-50">[\s\S]*?<\/div>/g,
  replaceDots
);

fs.writeFileSync(file, content, 'utf8');
