import { injectable } from "inversify";
import { getResponseErrorMessage } from "@/lib/apiError";
import { IBookCategoryRepository } from "@/interfaces/IBookCategoryRepository";
import { BookCategory } from "@/models/BookCategory";

type BookCategoryApiResponse = {
  categoryId?: string | null;
  name?: string | null;
};

const toBookCategory = (
  value: BookCategoryApiResponse,
  index: number,
): BookCategory => ({
  categoryUuid: value.categoryId ?? `category-${index + 1}`,
  name: value.name ?? "",
});

/**
 * バックエンドAPIと通信する図書分類リポジトリ
 */
@injectable()
export class BookCategoryRepository implements IBookCategoryRepository {
  public async findAll(): Promise<BookCategory[]> {
    const response = await fetch("/library/api/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        await getResponseErrorMessage(
          response,
          `分類一覧の取得に失敗しました (Status: ${response.status})`,
        ),
      );
    }

    const categories: BookCategoryApiResponse[] = await response.json();
    return categories.map(toBookCategory);
  }
}
