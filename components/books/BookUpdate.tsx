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
import { useUpdateBook } from "@/components/hooks/useUpdateBook";
import type { Book } from "@/models/Book";

const maxKeywordLength = 50;

export function BookUpdate() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const { results, status, error, search } = useSearchBooks();
  const {
    formData,
    categories,
    errors,
    isLoading,
    isSuccess,
    canSubmit,
    setBookForUpdate,
    handleChange,
    handleCategoryChange,
    handleSubmit,
  } = useUpdateBook();

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
    setSelectedBook(book);
    setBookForUpdate(book);
  };

  const handleUpdateSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleSubmit();
  };

  return (
    <>
      <div className="mx-auto max-w-5xl space-y-6 p-4 md:p-8">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight">図書変更</h2>
          <p className="text-slate-500">
            図書を検索し、変更対象を選択して内容を更新します。
          </p>
        </div>

        <Card className="border-green-200">
          <CardHeader>
            <CardTitle>変更対象の検索</CardTitle>
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
                ? "変更する図書を選択してください。"
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
                              selectedBook?.bookUuid === book.bookUuid
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

        <Card className="border-green-200">
          <CardHeader>
            <CardTitle>変更内容</CardTitle>
            <CardDescription>
              選択した図書の変更後の内容を入力してください。
            </CardDescription>
          </CardHeader>
          <CardContent>
            {errors.system && <Alert variant="destructive">{errors.system}</Alert>}
            {errors.submit && <Alert variant="destructive">{errors.submit}</Alert>}

            <form className="mt-4 space-y-6" onSubmit={handleUpdateSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="title">
                  書名
                </label>
                <Input
                  disabled={!selectedBook}
                  id="title"
                  maxLength={50}
                  name="title"
                  onChange={handleChange}
                  required
                  value={formData.title}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="author">
                  著者名
                </label>
                <Input
                  disabled={!selectedBook}
                  id="author"
                  maxLength={30}
                  name="author"
                  onChange={handleChange}
                  required
                  value={formData.author}
                />
                {errors.author && (
                  <p className="text-sm text-red-500">{errors.author}</p>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-slate-700"
                    htmlFor="categoryId"
                  >
                    分類
                  </label>
                  <select
                    className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!selectedBook}
                    id="categoryId"
                    name="categoryId"
                    onChange={(event) => handleCategoryChange(event.target.value)}
                    required
                    value={formData.categoryId}
                  >
                    <option value="">分類を選択してください</option>
                    {categories.map((category) => (
                      <option
                        key={category.categoryUuid}
                        value={category.categoryUuid}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.categoryId && (
                    <p className="text-sm text-red-500">{errors.categoryId}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700" htmlFor="stock">
                    蔵書数
                  </label>
                  <Input
                    disabled={!selectedBook}
                    id="stock"
                    min={0}
                    name="stock"
                    onChange={handleChange}
                    required
                    type="number"
                    value={formData.stock}
                  />
                  {errors.stock && (
                    <p className="text-sm text-red-500">{errors.stock}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button className="w-full sm:w-48" disabled={!canSubmit} type="submit">
                  {isLoading ? "変更中..." : "図書を変更する"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-lg">
            <h3 className="mb-4 text-xl font-bold">変更完了</h3>
            <p className="mb-8 text-sm text-slate-600">
              図書情報の変更が完了しました。
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
