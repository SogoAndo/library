import Header from "./header";
import Footer from "./footer";

export default function FrontMenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">{children}</main>
      <Footer />
    </div>
  );
}
