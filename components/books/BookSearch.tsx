"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSearchBooks } from "@/components/hooks/useSearchBooks";

// 仕様書に合わせた書名キーワードの最大文字数
const maxKeywordLength = 50;

export function BookSearch() {
  const router = useRouter();

  // 入力値と検索状態は画面側で管理する
  const [keyword, setKeyword] = useState("");
  const { results, status, error, search } = useSearchBooks();
  const canSearch = keyword.length <= maxKeywordLength && status !== "loading";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedKeyword = keyword.trim();
    search(trimmedKeyword);

    // 検索後のURLにもキーワードを反映する
    if (trimmedKeyword.length <= maxKeywordLength) {
      const href =
        trimmedKeyword.length > 0
          ? `/books?keyword=${encodeURIComponent(trimmedKeyword)}`
          : "/books";

      router.replace(href, { scroll: false });
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 md:p-8">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tight">図書検索</h2>
        <p className="text-slate-500">
          書名キーワードで蔵書を検索できます。未入力で検索すると全件を表示します。
        </p>
      </div>

      <Card className="border-green-200">
        <CardHeader>
          <CardTitle>検索条件</CardTitle>
          <CardDescription>書名の一部を入力して検索してください。</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && <Alert variant="destructive">{error}</Alert>}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <label className="grid flex-1 gap-2 text-sm font-medium text-slate-700">
                書名キーワード
                <Input
                  maxLength={maxKeywordLength}
                  onChange={(event) => setKeyword(event.target.value)}
                  placeholder="例: React"
                  type="text"
                  value={keyword}
                />
              </label>

              <Button className="sm:w-32" disabled={!canSearch} type="submit">
                {status === "loading" ? "検索中..." : "検索"}
              </Button>
            </div>

            <p className="text-sm text-slate-500">
              50文字以内で入力してください({keyword.length} / {maxKeywordLength})
            </p>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>検索結果</CardTitle>
          <CardDescription>
            {status === "success"
              ? `${results.length}件の図書が見つかりました。`
              : "検索結果がここに表示されます。"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status === "idle" && (
            <p className="rounded-md bg-slate-50 p-4 text-center text-sm text-slate-500">
              検索ボタンを押すと図書一覧を表示します。
            </p>
          )}

          {status === "loading" && (
            <p className="rounded-md bg-slate-50 p-4 text-center text-sm text-slate-500">
              検索中です...
            </p>
          )}

          {/* 検索済みで0件だった場合の表示 */}
          {status === "empty" && (
            <p className="rounded-md bg-slate-50 p-4 text-center text-sm text-slate-500">
              該当する図書が見つかりませんでした。
            </p>
          )}

          {/* 検索結果がある場合だけテーブルを表示する */}
          {status === "success" && (
            <div className="overflow-x-auto rounded-md border border-slate-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>書名</TableHead>
                    <TableHead>著者名</TableHead>
                    <TableHead>分類</TableHead>
                    <TableHead className="text-right">蔵書数</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((book) => (
                    <TableRow key={book.bookUuid}>
                      <TableCell className="font-medium text-slate-900">
                        {book.title}
                      </TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                          {book.category}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{book.stock}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
