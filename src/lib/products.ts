import { Product } from './types';

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "prod_1",
    slug: "safari-animals-coloring-pack",
    title: "Safari Animals Mega Coloring Pack",
    description: "35 high-resolution wild animal coloring sheets created specially for young kids (3-5). Features bold, thick outlines that make coloring easy, frustration-free, and boost confidence.",
    price: 5.99,
    currency: "USD",
    age_group: "3-5",
    category: "coloring",
    pages_count: 35,
    format: "PDF Printable (A4 & US Letter)",
    thumbnail_url: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80",
    preview_images: [
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80"
    ],
    storage_file_path: "products/safari-animals.pdf",
    is_featured: true,
  },
  {
    id: "prod_2",
    slug: "diy-cut-and-paste-dinosaurs",
    title: "Dino Crafts: Cut, Assemble & Color",
    description: "20 interactive scissor-skills activities! Kids cut out dinosaur limbs, match puzzle parts, glue them together, and color their creations. Great for developing fine motor control.",
    price: 7.49,
    currency: "USD",
    age_group: "6-8",
    category: "crafts",
    pages_count: 20,
    format: "PDF Printable (A4 & US Letter)",
    thumbnail_url: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80",
    preview_images: [
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80"
    ],
    storage_file_path: "products/dino-cut-paste.pdf",
    is_featured: true,
  },
  {
    id: "prod_3",
    slug: "kindergarten-math-alphabet-workbook",
    title: "Early Genius: Math & Alphabet Fun Worksheets",
    description: "50 ready-to-print learning worksheets. Includes letter tracing with dotted guides, counting games, simple additions with illustrations, and pattern detection.",
    price: 8.99,
    currency: "USD",
    age_group: "3-5",
    category: "math-letters",
    pages_count: 50,
    format: "PDF Printable (A4 & US Letter)",
    thumbnail_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    preview_images: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
    ],
    storage_file_path: "products/math-alphabet-workbook.pdf",
    is_featured: true,
  },
  {
    id: "prod_4",
    slug: "little-detective-stem-mazes",
    title: "Little Detective: STEM Logic Mazes & Puzzles",
    description: "28 brain-teasing printable activities! Packed with beginner sudoku, space-themed mazes, and spot-the-difference sheets designed to spark logical thinking.",
    price: 6.99,
    currency: "USD",
    age_group: "6-8",
    category: "stem",
    pages_count: 28,
    format: "PDF Printable (A4 & US Letter)",
    thumbnail_url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80",
    preview_images: [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80"
    ],
    storage_file_path: "products/stem-mazes.pdf",
    is_featured: false,
  },
  {
    id: "prod_5",
    slug: "all-in-one-super-activity-bundle",
    title: "The Ultimate 150+ Page Kids Activity Bundle",
    description: "The complete screen-free pack! You get all Safari coloring pages, Dino crafts, Math & alphabet workbooks, and STEM logic sheets in one simple bundle. Save over 60%!",
    price: 14.99,
    currency: "USD",
    age_group: "all",
    category: "bundles",
    pages_count: 150,
    format: "PDF Printable (A4 & US Letter)",
    thumbnail_url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    preview_images: [
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80"
    ],
    storage_file_path: "products/mega-bundle.pdf",
    is_featured: true,
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return SAMPLE_PRODUCTS.find((p) => p.slug === slug);
}
