import Header from "./header";
import Footer from "./footer";

export default function FrontMenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 参照元に合わせたヘッダー・メイン・フッターの共通枠
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans">
      <Header />
      <main className="container mx-auto w-full flex-1 p-4 md:p-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
