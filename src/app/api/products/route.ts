import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const influencerId = searchParams.get("influencerId");

  const products = await prisma.product.findMany({
    where: influencerId ? { influencerId } : undefined,
    include: { influencer: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, brand, price, category, description, imageUrl, influencerId } =
    body;

  if (!name || !brand || !price || !category || !influencerId) {
    return Response.json(
      { error: "필수 항목을 모두 입력해주세요." },
      { status: 400 }
    );
  }

  // Ensure influencer exists, create if not
  await prisma.influencer.upsert({
    where: { id: influencerId },
    update: {},
    create: { id: influencerId, name: influencerId },
  });

  const product = await prisma.product.create({
    data: {
      name,
      brand,
      price: parseFloat(price),
      category,
      description: description || null,
      imageUrl: imageUrl || null,
      influencerId,
    },
  });

  return Response.json(product, { status: 201 });
}
