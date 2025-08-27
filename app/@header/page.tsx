import Link from "next/link";
import AuthButtons from "@/components/home/AuthButtons";
import Image from "next/image";
import logoImg from "@/public/image/logo.png";

const communityCategories = [
  { name: "정보", href: "/boards/정보" },
  { name: "질문", href: "/boards/question" },
  { name: "자유", href: "/boards/free" },
];

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <div className="flex items-center gap-6">
        <Link href="/">
          <Image src={logoImg} alt="Logo" className="h-8 w-30" />
        </Link>
        {/* 커뮤니티 드롭다운 메뉴 */}
        <div className="relative group">
          {/* 메인 메뉴 링크 */}
          <Link
            href="/boards/정보"
            className="px-4 py-2 text-gray-600 hover:text-campinggreen font-medium transition-colors duration-200"
          >
            커뮤니티
          </Link>
          {/* 마우스 올리면 나타날 하위 메뉴 */}
          <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
            <div className="bg-white rounded-md shadow-lg p-4">
              <div className="flex items-center space-x-6">
                {communityCategories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="block whitespace-nowrap text-sm text-gray-700 hover:text-campingorange hover:font-semibold"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Link
          href="/camps/list"
          className="px-4 py-2 hover:text-campinggreen hover:border-b-2 hover:border-campinggreen transition-all duration-75"
        >
          캠핑
        </Link>
      </div>
      <AuthButtons />
    </header>
  );
}
