"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useRegisterBook } from "@/components/hooks/useRegisterBook";
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

export function BookRegister() {
  const router = useRouter();
  const {
    formData,
    categories,
    errors,
    isLoading,
    isSuccess,
    canSubmit,
    handleChange,
    handleCategoryChange,
    handleSubmit,
  } = useRegisterBook();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleSubmit();
  };

  return (
    <>
      <div className="mx-auto max-w-3xl space-y-6 p-4 md:p-8">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight">図書新規登録</h2>
          <p className="text-slate-500">
            書名、著者名、分類、蔵書数を入力して図書を登録します。
          </p>
        </div>

        <Card className="border-green-200">
          <CardHeader>
            <CardTitle>登録内容</CardTitle>
            <CardDescription>必要な項目を入力してください。</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={onSubmit}>
              {errors.system && <Alert variant="destructive">{errors.system}</Alert>}
              {errors.submit && <Alert variant="destructive">{errors.submit}</Alert>}

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="title">
                  書名
                </label>
                <Input
                  id="title"
                  maxLength={50}
                  name="title"
                  onChange={handleChange}
                  placeholder="例: React実践の教科書"
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
                  id="author"
                  maxLength={30}
                  name="author"
                  onChange={handleChange}
                  placeholder="例: Fullness, Inc."
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
                  {isLoading ? "登録中..." : "図書を登録する"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-lg">
            <h3 className="mb-4 text-xl font-bold">登録完了</h3>
            <p className="mb-8 text-sm text-slate-600">
              図書の登録が完了しました。
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
