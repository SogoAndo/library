import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ホーム画面に表示するメニューカードの定義
const menuItems = [
  {
    title: "図書検索",
    description: "登録されている図書をキーワードで検索します",
    buttonText: "検索画面へ",
    href: "/books",
    variant: "default",
    className: "border-green-200",
  },
  {
    title: "図書登録",
    description: "新しい図書をシステムに登録します",
    buttonText: "登録画面へ進む",
    href: "/books/new",
    variant: "default",
    className: "",
  },
  {
    title: "図書変更",
    description: "登録済みの図書情報を変更・更新します",
    buttonText: "変更画面へ進む",
    href: "/books/update",
    variant: "outline",
    className: "",
  },
  {
    title: "図書削除",
    description: "登録済みの図書情報を削除します",
    buttonText: "削除画面へ進む",
    href: "/books/delete",
    variant: "destructive",
    className: "border-red-100",
  },
] as const;

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 p-4 md:p-8">
      <div className="space-y-2 rounded-lg border border-green-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight">トップメニュー</h1>
        <p className="text-slate-500">操作したいメニューを選択してください</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {menuItems.map((item) => (
          <Card
            className={`transition-shadow hover:shadow-lg ${item.className}`}
            key={item.title}
          >
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                className={
                  item.title === "図書削除"
                    ? "w-full"
                    : "w-full"
                }
                variant={item.variant}
              >
                <Link href={item.href}>{item.buttonText}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
