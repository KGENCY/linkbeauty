import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const headersList = await headers();
  const visitorIp =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  const body = await request.json();
  const { productId, influencerId } = body;

  if (!productId || !influencerId) {
    return Response.json(
      { error: "productId와 influencerId가 필요합니다." },
      { status: 400 }
    );
  }

  const click = await prisma.purchaseClick.create({
    data: {
      productId,
      influencerId,
      visitorIp,
    },
  });

  return Response.json(click, { status: 201 });
}

export async function GET() {
  const clicks = await prisma.purchaseClick.findMany({
    include: {
      product: { select: { name: true, brand: true } },
      influencer: { select: { name: true } },
    },
    orderBy: { clickedAt: "desc" },
  });

  const totalClicks = clicks.length;
  const uniqueProducts = new Set(clicks.map((c) => c.productId)).size;
  const uniqueVisitors = new Set(clicks.map((c) => c.visitorIp)).size;

  return Response.json({
    stats: { totalClicks, uniqueProducts, uniqueVisitors },
    clicks,
  });
}
