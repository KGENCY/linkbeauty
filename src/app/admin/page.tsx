import { prisma } from "@/lib/prisma";

interface Click {
  id: string;
  productId: string;
  influencerId: string;
  visitorIp: string | null;
  clickedAt: Date;
  product: { name: string; brand: string };
  influencer: { name: string };
}

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [clicks, totalClicks, uniqueProducts, uniqueVisitors] =
    await Promise.all([
      prisma.purchaseClick.findMany({
        include: {
          product: { select: { name: true, brand: true } },
          influencer: { select: { name: true } },
        },
        orderBy: { clickedAt: "desc" },
        take: 200,
      }),
      prisma.purchaseClick.count(),
      prisma.purchaseClick
        .groupBy({ by: ["productId"] })
        .then((r) => r.length),
      prisma.purchaseClick
        .groupBy({ by: ["visitorIp"] })
        .then((r) => r.length),
    ]);

  return (
    <div className="min-h-screen bg-[#f9f9f7]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-h2 text-[#1a1a1a] font-bold mb-8">
          관리자 대시보드
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8e4de]">
            <p className="text-sm text-[#6b6b6b]">총 클릭 수</p>
            <p className="text-3xl font-bold text-[#3d7a5f] mt-1">
              {totalClicks}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8e4de]">
            <p className="text-sm text-[#6b6b6b]">클릭된 제품 수</p>
            <p className="text-3xl font-bold text-[#3d7a5f] mt-1">
              {uniqueProducts}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8e4de]">
            <p className="text-sm text-[#6b6b6b]">고유 방문자 수</p>
            <p className="text-3xl font-bold text-[#3d7a5f] mt-1">
              {uniqueVisitors}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e4de] overflow-hidden">
          <div className="p-6 border-b border-[#e8e4de]">
            <h2 className="text-xl font-semibold text-[#1a1a1a]">
              구매 버튼 클릭 내역
            </h2>
          </div>

          {clicks.length === 0 ? (
            <div className="text-center py-12 text-[#6b6b6b]">
              아직 클릭 데이터가 없습니다.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#f9f9f7]">
                    <th className="text-left px-6 py-3 text-sm font-medium text-[#6b6b6b]">
                      시간
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-[#6b6b6b]">
                      상품명
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-[#6b6b6b]">
                      브랜드
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-[#6b6b6b]">
                      인플루언서
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-[#6b6b6b]">
                      방문자 IP
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e8e4de]">
                  {clicks.map((click: Click) => (
                    <tr key={click.id} className="hover:bg-[#f9f9f7]/50">
                      <td className="px-6 py-4 text-sm text-[#1a1a1a] whitespace-nowrap">
                        {new Date(click.clickedAt).toLocaleString("ko-KR", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#1a1a1a]">
                        {click.product.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#6b6b6b]">
                        {click.product.brand}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#1a1a1a]">
                        {click.influencer.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#6b6b6b] font-mono">
                        {click.visitorIp || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
