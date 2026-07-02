import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "図書検索",
    description: "登録されている図書をキーワードで検索します",
    buttonText: "検索画面へ",
    href: "/books",
    variant: "default",
  },
  {
    title: "図書登録",
    description: "新しい図書をシステムに登録します",
    buttonText: "登録画面へ進む",
    href: "/api/books/register",
    variant: "default",
  },
  {
    title: "図書変更",
    description: "登録済みの図書情報を変更・更新します",
    buttonText: "変更画面へ進む",
    href: "/api/books/update",
    variant: "outline",
  },
  {
    title: "図書削除",
    description: "登録済みの図書情報を削除します",
    buttonText: "削除画面へ進む",
    href: "/api/books/delete",
    variant: "outline",
  },
] as const;

export default function HomePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 p-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">トップメニュー</h1>
        <p className="text-gray-500">操作したいメニューを選択してください</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <Card
            className={
              item.title === "図書削除"
                ? "border-red-100 transition-shadow hover:shadow-lg"
                : "transition-shadow hover:shadow-lg"
            }
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
                    ? "w-full border-red-200 text-red-600 hover:bg-red-50"
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
