"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string | null;
  imageUrl: string | null;
  createdAt: string;
}

const CATEGORIES = [
  "Skincare",
  "Makeup",
  "Cleanser",
  "Toner",
  "Serum",
  "Moisturizer",
  "Sunscreen",
  "Mask",
  "Lip",
  "Eye",
  "Other",
];

export default function InfluencerDashboard() {
  const { influencerId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    category: "Skincare",
    description: "",
  });

  const fetchProducts = async () => {
    const res = await fetch(`/api/products?influencerId=${influencerId}`);
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [influencerId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let imageUrl: string | null = null;

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (!uploadRes.ok) {
          const err = await uploadRes.json();
          alert(err.error || "이미지 업로드 실패");
          setSubmitting(false);
          return;
        }
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      }

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          imageUrl,
          influencerId,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "제품 등록 실패");
        setSubmitting(false);
        return;
      }

      setForm({ name: "", brand: "", price: "", category: "Skincare", description: "" });
      setImageFile(null);
      setImagePreview(null);
      fetchProducts();
    } catch {
      alert("오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f7]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-h2 text-[#1a1a1a] font-bold">인플루언서 대시보드</h1>
          <p className="text-[#6b6b6b] mt-1">
            ID: <span className="font-mono text-sm bg-[#e8e4de] px-2 py-0.5 rounded">{influencerId}</span>
          </p>
        </div>

        {/* Product Registration Form */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8e4de] mb-8">
          <h2 className="text-xl font-semibold text-[#1a1a1a] mb-6">제품 등록</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-1">
                  상품명 *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#e8e4de] bg-[#f9f9f7] focus:outline-none focus:ring-2 focus:ring-[#3d7a5f] text-[#1a1a1a]"
                  placeholder="제품 이름을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-1">
                  브랜드 *
                </label>
                <input
                  type="text"
                  required
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#e8e4de] bg-[#f9f9f7] focus:outline-none focus:ring-2 focus:ring-[#3d7a5f] text-[#1a1a1a]"
                  placeholder="브랜드 이름"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-1">
                  가격 (원) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#e8e4de] bg-[#f9f9f7] focus:outline-none focus:ring-2 focus:ring-[#3d7a5f] text-[#1a1a1a]"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-1">
                  카테고리 *
                </label>
                <select
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#e8e4de] bg-[#f9f9f7] focus:outline-none focus:ring-2 focus:ring-[#3d7a5f] text-[#1a1a1a]"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-1">
                상품 이미지
              </label>
              <div className="flex items-start gap-4">
                <label className="flex-1 cursor-pointer">
                  <div className="border-2 border-dashed border-[#e8e4de] rounded-xl p-6 text-center hover:border-[#3d7a5f] transition-colors">
                    <svg
                      className="mx-auto h-8 w-8 text-[#6b6b6b]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 16v-8m0 0l-3 3m3-3l3 3M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                      />
                    </svg>
                    <p className="text-sm text-[#6b6b6b] mt-2">
                      클릭하여 이미지 업로드 (최대 5MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {imagePreview && (
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-[#e8e4de]">
                    <Image
                      src={imagePreview}
                      alt="미리보기"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      x
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-1">
                설명
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-[#e8e4de] bg-[#f9f9f7] focus:outline-none focus:ring-2 focus:ring-[#3d7a5f] text-[#1a1a1a] resize-none"
                placeholder="제품에 대한 간단한 설명"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-[#3d7a5f] text-white rounded-xl font-medium hover:bg-[#2d5a45] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "등록 중..." : "제품 등록하기"}
            </button>
          </form>
        </div>

        {/* Product List */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8e4de]">
          <h2 className="text-xl font-semibold text-[#1a1a1a] mb-6">
            등록된 제품 ({products.length})
          </h2>

          {loading ? (
            <div className="text-center py-12 text-[#6b6b6b]">로딩 중...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 text-[#6b6b6b]">
              아직 등록된 제품이 없습니다.
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-4 rounded-xl border border-[#e8e4de] hover:border-[#3d7a5f]/30 transition-colors"
                >
                  {product.imageUrl ? (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-[#f9f9f7] flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-[#e8e4de]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-[#1a1a1a] truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-[#6b6b6b]">
                      {product.brand} · {product.category}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-semibold text-[#1a1a1a]">
                      {product.price.toLocaleString()}원
                    </p>
                    <p className="text-xs text-[#6b6b6b]">
                      {new Date(product.createdAt).toLocaleDateString("ko-KR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
