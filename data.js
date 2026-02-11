window.products = [
    {
        id: "shattered-ambition",
        title: "Shattered Ambition",
        price: 185000,
        currency: "₺",
        year: "2026",
        category: "canvas",
        dimensions: "90 x 120 cm",
        material: "Resin, Glass, Gold Leaf",
        frame: "Black Matte",
        status: "Available",
        description: "A striking commentary on luxury and fragility. The iconic form is deconstructed and frozen in time, capturing the moment of impact. Gold leaf accents highlight the fractures, turning destruction into a statement of opulence.",
        image: "art-ace.jpg",
        hoverImage: "art-ace.jpg", // Ideally would be a second angle
        featured: true
    },
    {
        id: "abyss",
        title: "Abyss",
        price: 145000,
        currency: "₺",
        year: "2026",
        category: "mirror",
        dimensions: "100 cm Diameter",
        material: "Concave Tinted Mirror, Steel",
        frame: "Frameless",
        status: "Available",
        description: "A deep dive into perception. The concave form distorts reality, creating a captivating void that draws the viewer in. The deep blue hue shifts with the ambient light.",
        image: "mirror-blue.jpg",
        hoverImage: "mirror-blue.jpg",
        featured: true
    },
    {
        id: "vintage-chaos",
        title: "Vintage Chaos",
        price: 165000,
        currency: "₺",
        year: "2026",
        category: "mixed",
        dimensions: "80 x 100 cm",
        material: "Resin, Vintage Bottle Fragments",
        frame: "Shadow Box (Black)",
        status: "Available",
        description: "Historical luxury meets entropy. Authentic vintage fragments are suspended in high-clarity resin.",
        image: "art-dom.jpg",
        hoverImage: "art-dom.jpg",
        featured: false
    },
    {
        id: "distortion-i",
        title: "Distortion I",
        price: 125000,
        currency: "₺",
        year: "2026",
        category: "mirror",
        dimensions: "90 cm Diameter",
        material: "Gold Tinted Distorted Mirror",
        frame: "Brass Detail",
        status: "Available",
        description: "Fluidity in a solid form. 'Distortion I' challenges the rigidity of reflection.",
        image: "mirror-gold.jpg",
        hoverImage: "mirror-gold.jpg",
        featured: false
    },
    {
        id: "elevate",
        title: "Elevate",
        price: 95000,
        currency: "₺",
        year: "2026",
        category: "canvas",
        dimensions: "70 x 90 cm",
        material: "Resin, Glass, Pigment",
        frame: "Gold Leaf Wood",
        status: "Available",
        description: "Rising above the noise. A vertical composition that balances gravity and suspension.",
        image: "art-avion.jpg",
        hoverImage: "art-avion.jpg",
        featured: true
    },
    {
        id: "neon-dreams", // New Mock Product to fill grid
        title: "Neon Dreams",
        price: 210000,
        currency: "₺",
        year: "2026",
        category: "mixed",
        dimensions: "150 x 100 cm",
        material: "Neon, Acrylic, Canvas",
        frame: "None",
        status: "Sold",
        description: "Cyberpunk aesthetics meet traditional canvas work.",
        image: "artwork1.jpg",
        hoverImage: "artwork1.jpg",
        featured: false
    },
    {
        id: "chrome-heart", // New Mock Product
        title: "Chrome Heart",
        price: 280000,
        currency: "₺",
        year: "2025",
        category: "sculpture",
        dimensions: "50 x 50 x 50 cm",
        material: "Polished Chrome",
        frame: "Pedestal included",
        status: "Available",
        description: "A heart of steel, polished to perfection.",
        image: "artwork2.jpg",
        hoverImage: "artwork2.jpg",
        featured: true
    }
];

// Helper to format currency
const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(price);
};
