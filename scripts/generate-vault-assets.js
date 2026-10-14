const fs = require('fs');
const path = require('path');

const vaultDir = path.join(__dirname, '..', 'storage', 'private-vault');
if (!fs.existsSync(vaultDir)) {
  fs.mkdirSync(vaultDir, { recursive: true });
}

function createMinimalPdf(title, subtitle) {
  const content = `%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj
4 0 obj << /Length 120 >> stream
BT
/F1 20 Tf
50 780 Td
(${title}) Tj
/F1 12 Tf
0 -30 Td
(${subtitle}) Tj
/F1 10 Tf
0 -25 Td
(Secured by Tagline Marketplace - Single User License) Tj
ET
endstream
endobj
5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000060 00000 n 
00000000117 00000 n 
00000000227 00000 n 
00000000398 00000 n 
trailer << /Root 1 0 R /Size 6 >>
startxref
469
%%EOF`;
  return content;
}

const files = [
  { name: 'sample-freebie-starter-pack.pdf', title: 'Tagline Freebie - 5-Page Starter Activity Pack', subtitle: 'Coloring Sheets, Mazes, and Tracing Activities' },
  { name: 'dulo-whispering-woods.pdf', title: 'Dulo The Baby Dragon: Whispering Woods Bedtime Tale', subtitle: 'Official Digital Storybook & Illustrations' },
  { name: 'dulo-coloring-sheets.pdf', title: 'Dulo Enchanted Realm: 45 Giant Coloring Sheets', subtitle: 'Printable Kids Coloring Book Edition' },
  { name: 'dulo-papercraft-gliders.pdf', title: 'Dulo & Friends: 3D Papercraft Dragon Gliders', subtitle: 'Printable Cut-and-Fold Activity Sheets' },
  { name: 'forest-coloring-sheets.pdf', title: 'Magical Forest Animals: 30 Printable Coloring Sheets', subtitle: 'High Resolution Printable Worksheets' },
  { name: 'paper-rocket-kit.pdf', title: 'Space Explorer: 3D Paper Rocket Assembly Kit', subtitle: 'Ready to Print and Build Kit' },
  { name: 'math-workbook.pdf', title: 'Preschool Early Math & Tracing Super Activity Workbook', subtitle: '50 Skill-Building Worksheets' },
  { name: 'alphabet-workbook.pdf', title: 'Alphabet Adventure Phonics Workbook', subtitle: 'Cut, Paste & Color Letters A-Z' },
  { name: 'cozy-family-planner.pdf', title: 'Cozy Family Weekly Planner & Chore Routine', subtitle: 'Customizable Weekly Printables' },
  { name: 'starlight-bedtime-guide.pdf', title: 'Starlight Sleep Meditation: Bedtime Routine Guide', subtitle: 'Calming Bedtime Audio Companion Guide' },
];

for (const f of files) {
  const filePath = path.join(vaultDir, f.name);
  fs.writeFileSync(filePath, createMinimalPdf(f.title, f.subtitle));
}

// Add an MP3 placeholder header for audio products
const mp3Dummy = Buffer.from([
  0xFF, 0xFB, 0x90, 0x64, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
]);
fs.writeFileSync(path.join(vaultDir, 'dulo-bedtime-audio.mp3'), mp3Dummy);
fs.writeFileSync(path.join(vaultDir, 'starlight-meditation.mp3'), mp3Dummy);

console.log('Successfully generated vault assets in:', vaultDir);
