export interface Influencer {
  id: string;
  name: string;
  nationality: string;
  flag: string;
  bio: string;
  followers: string;
  profileImage: string;
  coverImage: string;
  tags: string[];
  routineDescription?: string;
  about?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images?: string[];
  influencerId: string;
  category: string;
  description?: string;
  whyILoveThis?: string;
  howToUse?: string;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  productIds: string[];
  influencerId: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface VideoRecommendation {
  id: string;
  productId: string;
  influencerId: string;
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  duration: string;
  views: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export const influencers: Influencer[] = [
  {
    id: "hana-tokyo",
    name: "Hana",
    nationality: "Japan",
    flag: "🇯🇵",
    bio: "Tokyo girl living in Seoul. Obsessed with glass skin and minimal makeup ✨",
    followers: "482K",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=500&fit=crop",
    tags: ["Glass Skin", "Minimal", "Skincare"],
    routineDescription: "My 7-step morning routine for that dewy glass skin look",
    about: "Hi! I'm Hana from Tokyo, living in Seoul for 3 years now. I fell in love with K-beauty when I first tried a sheet mask at Myeongdong. Now I share my daily skincare discoveries with my community. I believe in simple, effective routines that give you that natural glow.",
  },
  {
    id: "emma-paris",
    name: "Emma",
    nationality: "France",
    flag: "🇫🇷",
    bio: "French pharmacist exploring K-Beauty science. Clean beauty advocate 🌿",
    followers: "315K",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&h=500&fit=crop",
    tags: ["Clean Beauty", "Science", "Ingredients"],
    routineDescription: "Science-backed routine with proven K-beauty ingredients",
    about: "Pharmacist turned beauty content creator. I moved to Korea to study cosmetic science and never left. I break down ingredients so you know exactly what you're putting on your skin. No hype, just science.",
  },
  {
    id: "sofia-brazil",
    name: "Sofia",
    nationality: "Brazil",
    flag: "🇧🇷",
    bio: "Brazilian color queen in Gangnam. Bold looks meet K-beauty tech 💄",
    followers: "628K",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=1200&h=500&fit=crop",
    tags: ["Color Makeup", "Bold Looks", "Tutorials"],
    routineDescription: "My go-to glam routine for a night out in Gangnam",
    about: "Olá! I'm Sofia from São Paulo. K-beauty changed my makeup game completely. I love mixing Brazilian boldness with Korean precision. Follow my store for the most fun, vibrant beauty products Korea has to offer!",
  },
  {
    id: "mei-shanghai",
    name: "Mei Lin",
    nationality: "China",
    flag: "🇨🇳",
    bio: "Shanghai beauty editor. Bridging C-beauty and K-beauty worlds 🌸",
    followers: "891K",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1200&h=500&fit=crop",
    tags: ["Luxury", "Anti-aging", "Editor Picks"],
    routineDescription: "Premium anti-aging routine with the best of K-beauty",
    about: "Former beauty editor at Vogue China, now based in Seoul. I curate the most luxurious K-beauty products that actually deliver results. My picks are tested extensively before they make it to my store.",
  },
  {
    id: "sarah-usa",
    name: "Sarah",
    nationality: "USA",
    flag: "🇺🇸",
    bio: "NYC blogger turned Seoul resident. Your K-beauty bestie 💕",
    followers: "752K",
    profileImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1200&h=500&fit=crop",
    tags: ["Everyday", "Affordable", "Reviews"],
    routineDescription: "Budget-friendly K-beauty routine that actually works",
    about: "Hey babes! I moved from NYC to Seoul 2 years ago and became completely obsessed with K-beauty. I test EVERYTHING so you don't have to. My store has only products I genuinely use and love. No sponsorship bias, just real recommendations.",
  },
  {
    id: "anna-russia",
    name: "Anna",
    nationality: "Russia",
    flag: "🇷🇺",
    bio: "Moscow model exploring K-beauty for sensitive skin 🦋",
    followers: "267K",
    profileImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=500&fit=crop",
    tags: ["Sensitive Skin", "Gentle", "Hydration"],
    routineDescription: "Ultra-gentle routine for sensitive, reactive skin",
    about: "As a model with extremely sensitive skin, finding the right products has been my lifelong journey. K-beauty's gentle formulations changed everything for me. I only recommend products that are truly gentle and effective.",
  },
];

export const products: Product[] = [
  // Hana's products
  {
    id: "p1",
    name: "Glow Serum Essence",
    brand: "COSRX",
    price: 24.99,
    originalPrice: 32.00,
    rating: 4.8,
    reviewCount: 342,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=500&fit=crop",
    influencerId: "hana-tokyo",
    category: "Skincare",
    description: "A lightweight, fast-absorbing essence that delivers intense hydration with snail mucin and niacinamide. Perfect for achieving that coveted glass skin look.",
    whyILoveThis: "This is THE product that changed my skin. After one week, my skin was visibly more hydrated and had that dewy glow I always wanted. I use it every single morning.",
    howToUse: "After cleansing and toning, apply 2-3 drops to your palms. Gently press into your face and neck. Follow with moisturizer. Use morning and night for best results.",
  },
  {
    id: "p2",
    name: "Rice Water Cleanser",
    brand: "Beauty of Joseon",
    price: 18.50,
    rating: 4.7,
    reviewCount: 218,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&h=500&fit=crop",
    influencerId: "hana-tokyo",
    category: "Cleanser",
    description: "A gentle rice water-based cleanser that removes impurities while maintaining skin's natural moisture barrier.",
    whyILoveThis: "So gentle yet so effective. My skin never feels tight after using this. The rice water really does brighten your complexion over time!",
    howToUse: "Massage onto damp face in circular motions. Rinse thoroughly with lukewarm water.",
  },
  {
    id: "p3",
    name: "Centella Sun Shield SPF50+",
    brand: "SKIN1004",
    price: 16.99,
    originalPrice: 22.00,
    rating: 4.9,
    reviewCount: 567,
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=500&h=500&fit=crop",
    influencerId: "hana-tokyo",
    category: "Sunscreen",
    description: "A lightweight, non-greasy sunscreen with centella asiatica that soothes while protecting.",
    whyILoveThis: "No white cast, no greasy feeling, and it actually soothes my skin. I've repurchased this 6 times already!",
    howToUse: "Apply generously as the last step of your morning routine. Reapply every 2 hours when outdoors.",
  },
  // Emma's products
  {
    id: "p4",
    name: "Vitamin C Brightening Ampoule",
    brand: "Klairs",
    price: 28.00,
    rating: 4.6,
    reviewCount: 189,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=500&fit=crop",
    influencerId: "emma-paris",
    category: "Skincare",
    description: "A stable vitamin C formula at the perfect pH for maximum absorption without irritation.",
    whyILoveThis: "As a pharmacist, I'm very picky about vitamin C formulations. This one has the ideal concentration and pH. Pure science!",
    howToUse: "Apply 2-3 drops after cleansing in the evening. Wait 1 minute before applying next steps.",
  },
  {
    id: "p5",
    name: "Green Tea Seed Serum",
    brand: "innisfree",
    price: 22.00,
    originalPrice: 28.00,
    rating: 4.5,
    reviewCount: 445,
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4a38691?w=500&h=500&fit=crop",
    influencerId: "emma-paris",
    category: "Skincare",
    description: "Antioxidant-rich serum with Jeju green tea for deep hydration and protection.",
    whyILoveThis: "The antioxidant profile of this serum is impressive. Green tea catechins are clinically proven to protect against environmental damage.",
    howToUse: "Apply to clean face morning and night. Pat gently until absorbed.",
  },
  {
    id: "p6",
    name: "AHA/BHA Clarifying Toner",
    brand: "COSRX",
    price: 15.99,
    rating: 4.7,
    reviewCount: 623,
    image: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=500&h=500&fit=crop",
    influencerId: "emma-paris",
    category: "Toner",
    description: "A gentle exfoliating toner that unclogs pores and refines skin texture.",
    whyILoveThis: "Perfect concentration of AHA and BHA. Not too strong, not too weak. The pH is spot-on for effective exfoliation.",
    howToUse: "Soak a cotton pad and sweep across face after cleansing. Use 2-3 times per week.",
  },
  // Sofia's products
  {
    id: "p7",
    name: "Velvet Lip Tint",
    brand: "Romand",
    price: 14.99,
    rating: 4.8,
    reviewCount: 891,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&h=500&fit=crop",
    influencerId: "sofia-brazil",
    category: "Makeup",
    description: "A smooth, velvety lip tint with buildable color that lasts all day.",
    whyILoveThis: "The color payoff is INCREDIBLE. One swipe and you're done. It survives eating, drinking, everything!",
    howToUse: "Apply directly from the applicator. Build up layers for more intensity. Blot for a softer look.",
  },
  {
    id: "p8",
    name: "Shimmer Eye Palette",
    brand: "CLIO",
    price: 32.00,
    originalPrice: 42.00,
    rating: 4.9,
    reviewCount: 334,
    image: "https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=500&h=500&fit=crop",
    influencerId: "sofia-brazil",
    category: "Makeup",
    description: "A 10-shade palette with buttery shimmer and matte shades for endless looks.",
    whyILoveThis: "Korean eyeshadow formulas are on another level. The shimmer shades are like tiny crystals on your lids. Obsessed!",
    howToUse: "Use matte shades for base and crease. Pack shimmer shades on lids with fingers for maximum sparkle.",
  },
  // Mei Lin's products
  {
    id: "p9",
    name: "Luxury Ginseng Cream",
    brand: "Sulwhasoo",
    price: 89.00,
    rating: 4.9,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&h=500&fit=crop",
    influencerId: "mei-shanghai",
    category: "Skincare",
    description: "A premium anti-aging cream powered by Korean ginseng for firmer, more radiant skin.",
    whyILoveThis: "This is luxury that actually works. After testing hundreds of premium creams, this remains my #1. The ginseng complex is unmatched.",
    howToUse: "Apply a pearl-sized amount to face and neck after serum. Use gentle upward strokes.",
  },
  {
    id: "p10",
    name: "Retinal Age-Repair Serum",
    brand: "Dr. Ceuracle",
    price: 45.00,
    originalPrice: 58.00,
    rating: 4.7,
    reviewCount: 203,
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=500&h=500&fit=crop",
    influencerId: "mei-shanghai",
    category: "Skincare",
    description: "An advanced retinal serum for targeted anti-aging results without irritation.",
    whyILoveThis: "Retinal is stronger than retinol but gentler than retinoic acid. This Korean formulation is perfectly balanced.",
    howToUse: "Apply 2-3 drops at night after toner. Start with every other night and build up to nightly use.",
  },
  // Sarah's products
  {
    id: "p11",
    name: "Hydro Barrier Cream",
    brand: "Aestura",
    price: 19.99,
    rating: 4.8,
    reviewCount: 445,
    image: "https://images.unsplash.com/photo-1611930021592-a8cfd5319ceb?w=500&h=500&fit=crop",
    influencerId: "sarah-usa",
    category: "Skincare",
    description: "A dermatologist-developed barrier cream that restores and protects the skin barrier.",
    whyILoveThis: "This saved my skin when nothing else worked. It's the most underrated K-beauty product and costs less than $20!",
    howToUse: "Apply as the last step of your skincare routine. Can be used morning and night.",
  },
  {
    id: "p12",
    name: "Mugwort Sheet Mask (10 pack)",
    brand: "I'm From",
    price: 22.00,
    originalPrice: 30.00,
    rating: 4.6,
    reviewCount: 312,
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&h=500&fit=crop",
    influencerId: "sarah-usa",
    category: "Skincare",
    description: "Soothing sheet masks infused with real mugwort for calming irritated skin.",
    whyILoveThis: "My weekly self-care essential. The mugwort is so calming and the mask fits perfectly. 10/10 value for a 10-pack!",
    howToUse: "Apply to clean face and leave on for 15-20 minutes. Pat remaining essence into skin.",
  },
  // Anna's products
  {
    id: "p13",
    name: "Cica Repair Balm",
    brand: "Dr. Jart+",
    price: 34.00,
    rating: 4.8,
    reviewCount: 278,
    image: "https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?w=500&h=500&fit=crop",
    influencerId: "anna-russia",
    category: "Skincare",
    description: "A powerful cica balm that heals and calms even the most sensitive, irritated skin.",
    whyILoveThis: "A miracle for sensitive skin. When my skin is red and angry, this calms it down overnight. My holy grail!",
    howToUse: "Apply a thin layer to irritated areas or all over face as a sleeping mask.",
  },
  {
    id: "p14",
    name: "Soothing Aloe Gel",
    brand: "Benton",
    price: 12.99,
    rating: 4.5,
    reviewCount: 567,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop",
    influencerId: "anna-russia",
    category: "Skincare",
    description: "A pure aloe gel that hydrates and soothes without any irritating additives.",
    whyILoveThis: "The simplest product in my routine but one of the most important. Pure, clean ingredients that my sensitive skin loves.",
    howToUse: "Apply generously to face and body. Can be refrigerated for extra cooling effect.",
  },
];

export const collections: Collection[] = [
  {
    id: "c1",
    title: "Glass Skin Essentials",
    description: "Everything you need for that dewy, luminous look",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&h=400&fit=crop",
    productIds: ["p1", "p2", "p3"],
    influencerId: "hana-tokyo",
  },
  {
    id: "c2",
    title: "Science-Backed Routine",
    description: "Pharmacist-approved products with proven ingredients",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=400&fit=crop",
    productIds: ["p4", "p5", "p6"],
    influencerId: "emma-paris",
  },
  {
    id: "c3",
    title: "Bold & Beautiful",
    description: "Statement makeup looks with Korean precision",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=400&fit=crop",
    productIds: ["p7", "p8"],
    influencerId: "sofia-brazil",
  },
  {
    id: "c4",
    title: "Luxury Anti-Aging",
    description: "Premium picks for timeless beauty",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=400&fit=crop",
    productIds: ["p9", "p10"],
    influencerId: "mei-shanghai",
  },
  {
    id: "c5",
    title: "K-Beauty on a Budget",
    description: "Amazing results without breaking the bank",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=400&fit=crop",
    productIds: ["p11", "p12"],
    influencerId: "sarah-usa",
  },
  {
    id: "c6",
    title: "Sensitive Skin Saviors",
    description: "Gentle products for reactive skin types",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
    productIds: ["p13", "p14"],
    influencerId: "anna-russia",
  },
];

export const reviews: Review[] = [
  { id: "r1", userName: "Jessica M.", rating: 5, comment: "Absolutely love this! My skin has never looked better. Hana really knows her stuff!", date: "2025-12-15", verified: true },
  { id: "r2", userName: "Yuki T.", rating: 4, comment: "Great product, exactly as described. Shipping was fast too!", date: "2025-12-10", verified: true },
  { id: "r3", userName: "Maria L.", rating: 5, comment: "This changed my skincare game. Thank you for the recommendation!", date: "2025-11-28", verified: true },
  { id: "r4", userName: "Chen W.", rating: 5, comment: "I've been using this for 3 months and the results are incredible.", date: "2025-11-15", verified: true },
  { id: "r5", userName: "Amy R.", rating: 4, comment: "Really nice texture and absorbs quickly. Would buy again!", date: "2025-10-20", verified: false },
];

export function getInfluencer(id: string): Influencer | undefined {
  return influencers.find((i) => i.id === id);
}

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByInfluencer(influencerId: string): Product[] {
  return products.filter((p) => p.influencerId === influencerId);
}

export function getCollectionsByInfluencer(influencerId: string): Collection[] {
  return collections.filter((c) => c.influencerId === influencerId);
}

export function getRelatedProducts(productId: string): Product[] {
  const product = getProduct(productId);
  if (!product) return [];
  return products
    .filter((p) => p.influencerId === product.influencerId && p.id !== productId)
    .slice(0, 4);
}

// Video recommendations: influencers reviewing products (including cross-recommendations)
export const videoRecommendations: VideoRecommendation[] = [
  // Hana's videos
  { id: "v1", productId: "p1", influencerId: "hana-tokyo", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=450&fit=crop", title: "Glass Skin의 비밀! COSRX 글로우 세럼 리뷰", duration: "8:24", views: "124K" },
  { id: "v2", productId: "p2", influencerId: "hana-tokyo", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=450&fit=crop", title: "쌀뜨물 클렌저로 하루 세안 루틴", duration: "6:12", views: "89K" },
  { id: "v3", productId: "p3", influencerId: "hana-tokyo", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&h=450&fit=crop", title: "진짜 백탁 없는 선크림 찾았다!", duration: "5:45", views: "203K" },
  // Emma's videos
  { id: "v4", productId: "p4", influencerId: "emma-paris", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=450&fit=crop", title: "약사가 분석하는 비타민C 앰플 성분", duration: "12:30", views: "156K" },
  { id: "v5", productId: "p5", influencerId: "emma-paris", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1570194065650-d99fb4a38691?w=800&h=450&fit=crop", title: "녹차 씨드 세럼, 과학적으로 효과 있을까?", duration: "9:15", views: "98K" },
  { id: "v6", productId: "p6", influencerId: "emma-paris", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=800&h=450&fit=crop", title: "AHA/BHA 토너 올바른 사용법", duration: "7:40", views: "112K" },
  // Sofia's videos
  { id: "v7", productId: "p7", influencerId: "sofia-brazil", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=800&h=450&fit=crop", title: "하루종일 지속되는 립틴트 발색 테스트", duration: "10:22", views: "287K" },
  { id: "v8", productId: "p8", influencerId: "sofia-brazil", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&h=450&fit=crop", title: "클리오 팔레트로 3가지 룩 만들기", duration: "14:05", views: "341K" },
  // Mei Lin's videos
  { id: "v9", productId: "p9", influencerId: "mei-shanghai", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=450&fit=crop", title: "설화수 자음생크림 한달 사용 후기", duration: "11:18", views: "178K" },
  { id: "v10", productId: "p10", influencerId: "mei-shanghai", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&h=450&fit=crop", title: "레티날 vs 레티놀, 뭐가 다를까?", duration: "8:55", views: "134K" },
  // Sarah's videos
  { id: "v11", productId: "p11", influencerId: "sarah-usa", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&h=450&fit=crop", title: "20달러 이하 피부장벽 크림 최강자", duration: "7:30", views: "221K" },
  { id: "v12", productId: "p12", influencerId: "sarah-usa", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=450&fit=crop", title: "쑥 마스크팩 10장 솔직 리뷰", duration: "6:48", views: "95K" },
  // Anna's videos
  { id: "v13", productId: "p13", influencerId: "anna-russia", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=450&fit=crop", title: "민감성 피부를 위한 시카밤 사용법", duration: "9:05", views: "145K" },
  { id: "v14", productId: "p14", influencerId: "anna-russia", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=450&fit=crop", title: "알로에 젤 하나로 멀티 케어하기", duration: "5:30", views: "67K" },

  // Cross-recommendations: other influencers reviewing same products
  { id: "v15", productId: "p1", influencerId: "emma-paris", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=450&fit=crop", title: "약사가 본 COSRX 글로우 세럼 성분 분석", duration: "11:20", views: "98K" },
  { id: "v16", productId: "p1", influencerId: "sarah-usa", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&h=450&fit=crop", title: "가성비 최고 세럼! 한달 사용 솔직 후기", duration: "7:15", views: "167K" },
  { id: "v17", productId: "p1", influencerId: "anna-russia", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=450&fit=crop", title: "민감성 피부도 쓸 수 있는 세럼일까?", duration: "6:40", views: "54K" },
  { id: "v18", productId: "p3", influencerId: "emma-paris", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1570194065650-d99fb4a38691?w=800&h=450&fit=crop", title: "센텔라 선크림 자외선 차단 테스트", duration: "8:30", views: "143K" },
  { id: "v19", productId: "p3", influencerId: "sarah-usa", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&h=450&fit=crop", title: "$17 선크림이 이 정도라고?!", duration: "5:55", views: "189K" },
  { id: "v20", productId: "p7", influencerId: "hana-tokyo", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=450&fit=crop", title: "롬앤 립틴트 전색상 발색 비교", duration: "9:45", views: "256K" },
  { id: "v21", productId: "p7", influencerId: "mei-shanghai", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=450&fit=crop", title: "에디터 픽: 올해의 립 제품", duration: "6:20", views: "112K" },
  { id: "v22", productId: "p9", influencerId: "emma-paris", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=450&fit=crop", title: "설화수 자음생크림 성분 깊이 분석", duration: "13:10", views: "87K" },
  { id: "v23", productId: "p9", influencerId: "hana-tokyo", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=450&fit=crop", title: "럭셔리 크림 한달 사용, 진짜 달라졌을까?", duration: "10:05", views: "198K" },
  { id: "v24", productId: "p11", influencerId: "anna-russia", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=450&fit=crop", title: "피부장벽 크림 민감성 피부 테스트", duration: "7:20", views: "76K" },
  { id: "v25", productId: "p11", influencerId: "hana-tokyo", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=450&fit=crop", title: "건조한 겨울, 배리어 크림 필수!", duration: "6:10", views: "134K" },
  { id: "v26", productId: "p13", influencerId: "sarah-usa", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&h=450&fit=crop", title: "닥터자르트 시카밤 vs 다른 시카 제품", duration: "8:45", views: "156K" },
  { id: "v27", productId: "p13", influencerId: "emma-paris", videoUrl: "", thumbnailUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=450&fit=crop", title: "시카 성분의 과학적 효능 총정리", duration: "10:30", views: "91K" },
];

export function getVideoForProduct(productId: string, influencerId: string): VideoRecommendation | undefined {
  return videoRecommendations.find((v) => v.productId === productId && v.influencerId === influencerId);
}

export function getVideosByInfluencer(influencerId: string): VideoRecommendation[] {
  return videoRecommendations.filter((v) => v.influencerId === influencerId);
}

export function getOtherCelebVideosForProduct(productId: string, excludeInfluencerId: string): VideoRecommendation[] {
  return videoRecommendations.filter((v) => v.productId === productId && v.influencerId !== excludeInfluencerId);
}
