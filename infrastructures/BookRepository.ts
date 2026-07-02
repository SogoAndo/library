import { injectable } from "inversify";
import { getResponseErrorMessage } from "@/lib/apiError";
import { IBookRepository } from "@/interfaces/IBookRepository";
import { Book } from "@/models/Book";

type BookApiResponse = {
  bookUuid?: string;
  bookId?: string;
  id?: string;
  title?: string;
  name?: string;
  author?: string;
  authorName?: string;
  category?: string;
  categoryName?: string;
  classification?: string;
  stock?: number;
  stockCount?: number;
  count?: number;
};

const toBook = (value: BookApiResponse, index: number): Book => ({
  bookUuid: value.bookUuid ?? value.bookId ?? value.id ?? `book-${index + 1}`,
  title: value.title ?? value.name ?? "",
  author: value.author ?? value.authorName ?? "",
  category: value.category ?? value.categoryName ?? value.classification ?? "",
  stock: value.stock ?? value.stockCount ?? value.count ?? 0,
});

/**
 * バックエンドAPIと通信する図書リポジトリ
 */
@injectable()
export class BookRepository implements IBookRepository {
  public async searchKeyword(keyword: string): Promise<Book[]> {
    const params = new URLSearchParams({ keyword });

    // next.config.ts の rewrites 経由でバックエンドAPIへ接続する
    const response = await fetch(`/proxy-api/books?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        await getResponseErrorMessage(
          response,
          `図書検索に失敗しました (Status: ${response.status})`,
        ),
      );
    }

    const books: BookApiResponse[] = await response.json();
    return books.map(toBook);
  }
}
