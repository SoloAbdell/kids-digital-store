import { Product } from './types';

export const SAMPLE_PRODUCTS: Product[] = [
  // ==========================================
  // DULO TOONS UNIVERSE SPECIALS
  // ==========================================
  {
    id: "dulo_1",
    slug: "dulo-baby-dragon-bedtime-adventure",
    title: "Dulo The Baby Dragon: Whispering Woods Bedtime Tale",
    subtitle: "A soothing audio adventure + illustrated storybook about courage & cozy sleep",
    description: "Join Dulo, the lovable emerald baby dragon who sneezes harmless starlight sparks! Narrated with cinematic music, gentle wind chimes, and calming voiceover to help children drift peacefully into sleep.",
    price: 4.99,
    currency: "USD",
    category: "audio",
    format: "Audio MP3",
    age_group: "3-5",
    pages_or_duration: "38 Min Audio + 24 Page PDF",
    pages_count: 24,
    thumbnail_url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    preview_images: [
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    ],
    storage_file_path: "dulo-toons/dulo-whispering-woods.zip",
    is_featured: true,
    is_dulo_toons: true,
    tags: ["Dulo Toons", "Audiobook", "Bedtime", "Baby Dragon", "Soundscape"],
    audio_sample_url: "https://actions.google.com/sounds/v1/ambiences/forest_day.ogg",
    rating: 4.9,
    reviews_count: 142,
  },
  {
    id: "dulo_2",
    slug: "dulo-magical-coloring-world",
    title: "Dulo's Enchanted Realm: 45 Giant Coloring Sheets",
    subtitle: "High-resolution printable illustrations of Dulo and his mystical forest friends",
    description: "Delight young artists with 45 unique hand-drawn coloring sheets featuring Dulo the Baby Dragon, Pippin the Pixie Owl, and Bramble the moss bear. Optimized with thick crisp borders for young hands.",
    price: 5.99,
    currency: "USD",
    category: "printables",
    format: "PDF Download",
    age_group: "3-5",
    pages_or_duration: "45 Printable Pages",
    pages_count: 45,
    thumbnail_url: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80",
    preview_images: [
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80"
    ],
    storage_file_path: "dulo-toons/dulo-coloring-sheets.pdf",
    is_featured: true,
    is_dulo_toons: true,
    tags: ["Dulo Toons", "Coloring", "Printables", "Baby Dragon"],
    rating: 5.0,
    reviews_count: 98,
  },
  {
    id: "dulo_3",
    slug: "dulo-papercraft-dragon-gliders",
    title: "Dulo 3D Fold & Fly Dragon Papercraft Kit",
    subtitle: "Printable DIY craft kit: cut, fold, and fly your own winged dragon models",
    description: "Interactive hands-on craft pack! Includes 6 different printable 3D dragon paper models with easy fold tabs, step-by-step visual assembly diagrams, and colorful skins.",
    price: 6.50,
    currency: "USD",
    category: "printables",
    format: "Craft Pack",
    age_group: "6-8",
    pages_or_duration: "18 Template Sheets + Video Guide",
    pages_count: 18,
    thumbnail_url: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80",
    preview_images: [
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80"
    ],
    storage_file_path: "dulo-toons/dulo-dragon-gliders.zip",
    is_featured: true,
    is_dulo_toons: true,
    tags: ["Dulo Toons", "DIY Crafts", "3D Papercraft", "STEM Toy"],
    rating: 4.8,
    reviews_count: 67,
  },
  {
    id: "dulo_4",
    slug: "dulo-little-math-dragons",
    title: "Dulo's Dragon Egg Counting & Preschool Math",
    subtitle: "10-Page introductory sample activity workbook featuring Dulo Toons",
    description: "A free playful activity pack for numbers 1 to 20! Help Dulo count shimmering dragon eggs, navigate color-by-number caves, and trace early arithmetic digits.",
    price: 0.00,
    currency: "USD",
    category: "educational",
    format: "PDF Download",
    age_group: "3-5",
    pages_or_duration: "12 Pages (Instant Freebie)",
    pages_count: 12,
    thumbnail_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    preview_images: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
    ],
    storage_file_path: "dulo-toons/dulo-dragon-math-freebie.pdf",
    is_featured: true,
    is_freebie: true,
    is_dulo_toons: true,
    tags: ["Dulo Toons", "Freebie", "Math Worksheets", "Preschool"],
    rating: 4.9,
    reviews_count: 310,
  },

  // ==========================================
  // EBOOKS & DIGITAL STORIES
  // ==========================================
  {
    id: "ebook_1",
    slug: "mindful-parenting-calm-routines",
    title: "Mindful Parenting in the Screen Age: Practical Guide",
    subtitle: "Actionable frameworks for emotional regulation, calm bedtimes, and screen-free play",
    description: "A comprehensive modern parenting eBook crafted by certified child psychologists and educators. Includes 30 realistic daily rituals, positive discipline scripts, and printable habit reflection prompts.",
    price: 11.99,
    currency: "USD",
    category: "ebooks",
    format: "EPUB / eBook",
    age_group: "parents",
    pages_or_duration: "148 Pages (ePub + PDF Bundle)",
    pages_count: 148,
    thumbnail_url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    preview_images: [
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
    ],
    storage_file_path: "ebooks/mindful-parenting-guide.zip",
    is_featured: true,
    tags: ["Parenting", "Ebook", "Mental Wellness", "Family Routines"],
    rating: 4.9,
    reviews_count: 84,
  },
  {
    id: "ebook_2",
    slug: "bedtime-tales-for-dreamers",
    title: "101 Short Bedtime Fables for Little Explorers",
    subtitle: "Whimsical 5-minute illustrated moral tales for curious young minds",
    description: "Illustrated treasury of short bedtime stories featuring friendly woodland animals, curious stars, and brave cloud wanderers. Formatted for tablets, Kindle, and printable home reading.",
    price: 7.99,
    currency: "USD",
    category: "ebooks",
    format: "EPUB / eBook",
    age_group: "3-5",
    pages_or_duration: "112 Illustrated Pages",
    pages_count: 112,
    thumbnail_url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    preview_images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
    ],
    storage_file_path: "ebooks/101-bedtime-fables.pdf",
    is_featured: false,
    tags: ["Stories", "Fables", "Bedtime", "Kindle Ready"],
    rating: 4.8,
    reviews_count: 53,
  },

  // ==========================================
  // PRINTABLE CRAFTS & ACTIVITIES
  // ==========================================
  {
    id: "craft_1",
    slug: "safari-animals-coloring-pack",
    title: "Safari Wildlife Mega Coloring Pack",
    subtitle: "35 bold outline animal drawings designed for toddlers and early learners",
    description: "Thick outlines and charming jungle animals make coloring easy, frustration-free, and boost fine motor dexterity for young toddlers. Ready to print indefinitely.",
    price: 5.99,
    currency: "USD",
    category: "printables",
    format: "PDF Download",
    age_group: "3-5",
    pages_or_duration: "35 High-Res Sheets",
    pages_count: 35,
    thumbnail_url: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80",
    preview_images: [
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80"
    ],
    storage_file_path: "products/safari-animals.pdf",
    is_featured: true,
    tags: ["Coloring", "Safari Animals", "Toddlers", "Fine Motor"],
    rating: 4.9,
    reviews_count: 175,
  },
  {
    id: "craft_2",
    slug: "diy-cut-and-paste-dinosaurs",
    title: "Dino Crafts: Cut, Assemble & Color 3D Kit",
    subtitle: "20 scissor-skills activities for fine motor and spatial development",
    description: "Kids cut along dotted guide paths, assemble interlocking T-Rex and Triceratops limbs, and color their completed creations. Excellent tactile activity away from mobile phones.",
    price: 7.49,
    currency: "USD",
    category: "printables",
    format: "Craft Pack",
    age_group: "6-8",
    pages_or_duration: "20 Printable Activity Sheets",
    pages_count: 20,
    thumbnail_url: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80",
    preview_images: [
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80"
    ],
    storage_file_path: "products/dino-cut-paste.pdf",
    is_featured: false,
    tags: ["Crafts", "Dinosaurs", "Scissor Skills", "Assembly"],
    rating: 4.8,
    reviews_count: 62,
  },

  // ==========================================
  // AUDIOBOOKS & BEDTIME AUDIO
  // ==========================================
  {
    id: "audio_1",
    slug: "peaceful-mind-kids-meditation-audio",
    title: "Calm Clouds: Guided Sleep Meditations & Rain Sounds",
    subtitle: "8 soothing guided mindfulness journeys voiced by warm sleep narrators",
    description: "Designed specifically to decompress overstimulated nervous systems. Gentle breathing exercises, soft nature rain, and warm binaural sounds engineered to lull active children to sleep in under 20 minutes.",
    price: 8.99,
    currency: "USD",
    category: "audio",
    format: "Audio MP3",
    age_group: "all",
    pages_or_duration: "65 Min Audio (8 MP3 Tracks)",
    pages_count: 8,
    thumbnail_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    preview_images: [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"
    ],
    storage_file_path: "audio/calm-clouds-meditations.zip",
    is_featured: true,
    tags: ["Audiobook", "Meditation", "Sleep Sounds", "Mindfulness"],
    audio_sample_url: "https://actions.google.com/sounds/v1/weather/rain_heavy.ogg",
    rating: 5.0,
    reviews_count: 119,
  },
  {
    id: "audio_2",
    slug: "interactive-audio-fairy-adventures",
    title: "The Clockwork Kingdom: Choose-Your-Path Audio Story",
    subtitle: "An engaging fantasy audio drama where listeners choose which chapter plays next",
    description: "High-production audio drama featuring full cast voice acting, orchestral soundtracks, and sound effects. At the end of each chapter, kids decide where the hero heads next!",
    price: 9.50,
    currency: "USD",
    category: "audio",
    format: "Audio MP3",
    age_group: "6-8",
    pages_or_duration: "85 Min Audio (14 Tracks + PDF Map)",
    pages_count: 14,
    thumbnail_url: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80",
    preview_images: [
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80"
    ],
    storage_file_path: "audio/clockwork-kingdom-audio.zip",
    is_featured: false,
    tags: ["Interactive Audio", "Audio Drama", "Fantasy Adventure"],
    audio_sample_url: "https://actions.google.com/sounds/v1/ambiences/daytime_forest_bonfire.ogg",
    rating: 4.7,
    reviews_count: 45,
  },

  // ==========================================
  // EDUCATIONAL WORKBOOKS
  // ==========================================
  {
    id: "edu_1",
    slug: "kindergarten-math-alphabet-workbook",
    title: "Early Genius: 55 Math & Alphabet Foundation Sheets",
    subtitle: "Dotted tracing, count-and-color, pattern recognition, and phonics basics",
    description: "Comprehensive structured learning worksheets. Tested and endorsed by elementary school teachers to prepare preschool and kindergarten kids for academic confidence.",
    price: 8.99,
    currency: "USD",
    category: "educational",
    format: "PDF Download",
    age_group: "3-5",
    pages_or_duration: "55 Educational Pages",
    pages_count: 55,
    thumbnail_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    preview_images: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
    ],
    storage_file_path: "products/math-alphabet-workbook.pdf",
    is_featured: true,
    tags: ["Worksheets", "Math", "Tracing", "Alphabet", "Preschool"],
    rating: 4.9,
    reviews_count: 220,
  },
  {
    id: "edu_2",
    slug: "little-detective-stem-mazes",
    title: "Little Detective: STEM Logic Mazes & Mystery Puzzles",
    subtitle: "Critical thinking sheets, space mazes, beginner Sudoku, and pattern games",
    description: "Stimulating logic exercises for kids aged 6-10. Fosters problem solving, deductive reasoning, and grit through progressively challenging puzzles and cartoon investigations.",
    price: 6.99,
    currency: "USD",
    category: "educational",
    format: "PDF Download",
    age_group: "6-8",
    pages_or_duration: "32 Puzzle Pages + Solutions",
    pages_count: 32,
    thumbnail_url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80",
    preview_images: [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80"
    ],
    storage_file_path: "products/stem-mazes.pdf",
    is_featured: false,
    tags: ["STEM", "Logic Mazes", "Brain Games", "Elementary"],
    rating: 4.8,
    reviews_count: 88,
  },

  // ==========================================
  // PLANNERS & CREATIVE TRACKERS
  // ==========================================
  {
    id: "plan_1",
    slug: "ultimate-family-homeschool-planner",
    title: "Ultimate Family & Homeschool Master Planner",
    subtitle: "Undated weekly curriculum tracker, chore rosters, meal schedules & goal journals",
    description: "The complete organizational system for busy households and homeschool parents. Includes 60+ modular printable templates compatible with iPad GoodNotes, Notability, or standard 3-ring binder printouts.",
    price: 9.99,
    currency: "USD",
    category: "planners",
    format: "PDF Download",
    age_group: "parents",
    pages_or_duration: "64 Printable & Fillable Sheets",
    pages_count: 64,
    thumbnail_url: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80",
    preview_images: [
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80"
    ],
    storage_file_path: "planners/homeschool-master-planner.pdf",
    is_featured: true,
    tags: ["Planners", "Homeschool", "Family Organization", "GoodNotes Ready"],
    rating: 4.9,
    reviews_count: 104,
  },
  {
    id: "plan_2",
    slug: "kids-daily-routine-habit-tracker",
    title: "Little Star: Kids Daily Routine & Habit Reward Chart",
    subtitle: "Visual morning & bedtime checklist charts + sticker reward tokens",
    description: "Transform daily chaos into fun cooperative routines! Features morning hygiene checklists, homework milestones, bedtime steps, and printable star tokens kids love collecting.",
    price: 4.49,
    currency: "USD",
    category: "planners",
    format: "Printable Kit",
    age_group: "3-5",
    pages_or_duration: "10 Visual Charts + Star Badges",
    pages_count: 10,
    thumbnail_url: "https://images.unsplash.com/photo-1584697964190-705b89368d01?auto=format&fit=crop&w=800&q=80",
    preview_images: [
      "https://images.unsplash.com/photo-1584697964190-705b89368d01?auto=format&fit=crop&w=800&q=80"
    ],
    storage_file_path: "planners/kids-routine-charts.pdf",
    is_featured: false,
    tags: ["Habit Tracker", "Reward Charts", "Routines", "Kids Autonomy"],
    rating: 4.7,
    reviews_count: 91,
  },
  {
    id: "plan_3",
    slug: "parenting-budget-meal-planner",
    title: "Smart Family Weekly Meal & Grocery Budget Planner",
    subtitle: "Printable kitchen organizer to reduce food waste and plan nutritious family dinners",
    description: "Free weekly meal planner template with grocery checklist categorized by grocery aisles. Clean, minimalist layout for hanging on refrigerator doors.",
    price: 0.00,
    currency: "USD",
    category: "planners",
    format: "PDF Download",
    age_group: "parents",
    pages_or_duration: "6 Printable Organizer Templates",
    pages_count: 6,
    thumbnail_url: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80",
    preview_images: [
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80"
    ],
    storage_file_path: "planners/family-meal-planner-freebie.pdf",
    is_featured: false,
    is_freebie: true,
    tags: ["Meal Planner", "Freebie", "Kitchen Organization", "Budgeting"],
    rating: 4.9,
    reviews_count: 167,
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return SAMPLE_PRODUCTS.find((p) => p.slug === slug);
}

export function getDuloToonsProducts(): Product[] {
  return SAMPLE_PRODUCTS.filter((p) => p.is_dulo_toons);
}

export const CATEGORIES_LIST = [
  { 
    id: 'all', 
    name: 'All Products', 
    icon: '✨', 
    desc: 'Browse complete catalog',
    count: SAMPLE_PRODUCTS.length 
  },
  { 
    id: 'ebooks', 
    name: 'eBooks & Digital Stories', 
    icon: '📚', 
    desc: 'Illustrated books & guides',
    count: SAMPLE_PRODUCTS.filter(p => p.category === 'ebooks').length 
  },
  { 
    id: 'printables', 
    name: 'Printable Crafts & Activities', 
    icon: '✂️', 
    desc: 'Coloring, DIY & 3D cutouts',
    count: SAMPLE_PRODUCTS.filter(p => p.category === 'printables').length 
  },
  { 
    id: 'audio', 
    name: 'Audiobooks & Bedtime Audio', 
    icon: '🎧', 
    desc: 'Audio adventures & sleep tales',
    count: SAMPLE_PRODUCTS.filter(p => p.category === 'audio').length 
  },
  { 
    id: 'educational', 
    name: 'Educational Workbooks', 
    icon: '🧩', 
    desc: 'Tracing, math & logic puzzles',
    count: SAMPLE_PRODUCTS.filter(p => p.category === 'educational').length 
  },
  { 
    id: 'planners', 
    name: 'Planners & Creative Trackers', 
    icon: '📋', 
    desc: 'Organizers & habit journals',
    count: SAMPLE_PRODUCTS.filter(p => p.category === 'planners').length 
  },
];

export const FORMATS_LIST = [
  'All Formats',
  'PDF Download',
  'Audio MP3',
  'Craft Pack',
  'Printable Kit',
  'EPUB / eBook',
];
