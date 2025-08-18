import Link from "next/link";
import AuthButtons from "@/components/home/AuthButtons";
import Image from "next/image";
import logoImg from "@/public/image/logo.png";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <div className="flex items-center gap-6">
        <Link href="/">
          <Image src={logoImg} alt="Logo" className="h-8 w-30" />
        </Link>
        <Link
          href="/community"
          className="px-4 py-2 hover:text-campinggreen hover:border-b-2 hover:border-campinggreen transition-all duration-75"
        >
          커뮤니티
        </Link>
        <Link
          href="/camping"
          className="px-4 py-2 hover:text-campinggreen hover:border-b-2 hover:border-campinggreen transition-all duration-75"
        >
          캠핑
        </Link>
      </div>
      <AuthButtons />
    </header>
  );
}
