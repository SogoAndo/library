"use client";

import { useState } from "react";
import { container } from "@/di/container";
import { TYPES } from "@/di/types";
import { ISearchBookService } from "@/interfaces/ISearchBookService";
import { getErrorMessage } from "@/lib/apiError";
import { Book } from "@/models/Book";

type SearchStatus = "idle" | "loading" | "success" | "empty" | "error";

export function useSearchBooks() {
  const [results, setResults] = useState<Book[]>([]);
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [error, setError] = useState("");

  // DIコンテナから本番用RepositoryにつながるServiceを取得する
  const searchService = container.get<ISearchBookService>(
    TYPES.ISearchBookService,
  );

  const search = async (keyword: string) => {
    const trimmedKeyword = keyword.trim();

    // 画面側でも制御するが、hook側でもSwaggerの入力仕様を守る
    if (!trimmedKeyword) {
      setResults([]);
      setStatus("error");
      setError("書名キーワードを入力してください。");
      return;
    }

    if (trimmedKeyword.length > 50) {
      setResults([]);
      setStatus("error");
      setError("書名キーワードは50文字以内で入力してください。");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const nextResults = await searchService.execute(trimmedKeyword);
      setResults(nextResults);
      setStatus(nextResults.length > 0 ? "success" : "empty");
    } catch (e: unknown) {
      setResults([]);
      setStatus("error");
      setError(getErrorMessage(e, "検索処理に失敗しました。"));
    }
  };

  return {
    results,
    status,
    error,
    search,
  };
}
