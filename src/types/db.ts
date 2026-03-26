export interface DBProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string | null;
  imageUrl: string | null;
  influencerId: string;
  createdAt: string;
  influencer: { name: string };
}
