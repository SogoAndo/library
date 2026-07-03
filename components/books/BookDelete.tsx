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
import { useDeleteBook } from "@/components/hooks/useDeleteBook";
import { useSearchBooks } from "@/components/hooks/useSearchBooks";
import type { Book } from "@/models/Book";

const maxKeywordLength = 50;

export function BookDelete() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const { results, status, error, search } = useSearchBooks();
  const {
    targetBook,
    errors,
    isLoading,
    isSuccess,
    canSubmit,
    setBookForDeletion,
    handleSubmit,
  } = useDeleteBook();

  const trimmedKeywordLength = keyword.trim().length;
  const canSearch =
    trimmedKeywordLength > 0 &&
    trimmedKeywordLength <= maxKeywordLength &&
    status !== "loading";

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    search(keyword.trim());
  };

  const handleSelectBook = (book: Book) => {
    setBookForDeletion(book);
  };

  const handleDeleteSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const deleted = await handleSubmit();

    if (deleted) {
      search(keyword.trim());
    }
  };

  return (
    <>
      <div className="mx-auto max-w-5xl space-y-6 p-4 md:p-8">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight">図書削除</h2>
          <p className="text-slate-500">
            図書を検索し、削除対象を選択して削除します。
          </p>
        </div>

        <Card className="border-green-200">
          <CardHeader>
            <CardTitle>削除対象の検索</CardTitle>
            <CardDescription>書名キーワードで図書を検索してください。</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSearchSubmit}>
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
                1〜50文字で入力してください({trimmedKeywordLength} /{" "}
                {maxKeywordLength})
              </p>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>検索結果</CardTitle>
            <CardDescription>
              {status === "success"
                ? "削除する図書を選択してください。"
                : "検索結果がここに表示されます。"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {status === "empty" && (
              <p className="rounded-md bg-slate-50 p-4 text-center text-sm text-slate-500">
                該当する図書が見つかりませんでした。
              </p>
            )}

            {status === "success" && (
              <div className="overflow-x-auto rounded-md border border-slate-200">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead>書名</TableHead>
                      <TableHead>著者名</TableHead>
                      <TableHead>分類</TableHead>
                      <TableHead className="text-right">蔵書数</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((book) => (
                      <TableRow key={book.bookUuid}>
                        <TableCell className="font-medium text-slate-900">
                          {book.title}
                        </TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>{book.category}</TableCell>
                        <TableCell className="text-right">{book.stock}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            onClick={() => handleSelectBook(book)}
                            type="button"
                            variant={
                              targetBook?.bookUuid === book.bookUuid
                                ? "default"
                                : "outline"
                            }
                          >
                            選択
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-red-100">
          <CardHeader>
            <CardTitle>削除確認</CardTitle>
            <CardDescription>選択した図書を削除します。</CardDescription>
          </CardHeader>
          <CardContent>
            {errors.bookUuid && (
              <Alert variant="destructive">{errors.bookUuid}</Alert>
            )}
            {errors.submit && <Alert variant="destructive">{errors.submit}</Alert>}

            {targetBook ? (
              <form className="mt-4 space-y-6" onSubmit={handleDeleteSubmit}>
                <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                  <dl className="grid gap-3 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="font-medium text-slate-500">書名</dt>
                      <dd className="mt-1 text-slate-900">{targetBook.title}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-500">著者名</dt>
                      <dd className="mt-1 text-slate-900">{targetBook.author}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-500">分類</dt>
                      <dd className="mt-1 text-slate-900">{targetBook.category}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-500">蔵書数</dt>
                      <dd className="mt-1 text-slate-900">{targetBook.stock}</dd>
                    </div>
                  </dl>
                </div>

                <div className="flex justify-end">
                  <Button
                    className="w-full sm:w-48"
                    disabled={!canSubmit}
                    type="submit"
                    variant="destructive"
                  >
                    {isLoading ? "削除中..." : "図書を削除する"}
                  </Button>
                </div>
              </form>
            ) : (
              <p className="mt-4 rounded-md bg-slate-50 p-4 text-center text-sm text-slate-500">
                検索結果から削除対象の図書を選択してください。
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-lg">
            <h3 className="mb-4 text-xl font-bold">削除完了</h3>
            <p className="mb-8 text-sm text-slate-600">
              図書の削除が完了しました。
            </p>
            <Button className="w-full" onClick={() => router.push("/home")}>
              ホームへ戻る
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
