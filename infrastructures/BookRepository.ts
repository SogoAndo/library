import { injectable } from "inversify";
import { getResponseErrorMessage } from "@/lib/apiError";
import { IBookRepository } from "@/interfaces/IBookRepository";
import { Book } from "@/models/Book";
import { BookRegistration } from "@/models/BookRegistration";
import { BookUpdate } from "@/models/BookUpdate";

type BookApiResponse = {
  bookId?: string | null;
  title?: string | null;
  author?: string | null;
  category?: string | BookCategoryApiResponse | null;
  stock?: number;
};

type BookCategoryApiResponse = {
  categoryId?: string | null;
  name?: string | null;
};

type RegisterBookApiRequest = {
  title: string;
  author: string;
  categoryId: string;
  stock: number;
};

type UpdateBookApiRequest = {
  title: string;
  author: string;
  categoryId: string;
  stock: number;
};

const getCategoryName = (
  category?: string | BookCategoryApiResponse | null,
) => {
  if (typeof category === "string") {
    return category;
  }

  return category?.name;
};

const toBook = (value: BookApiResponse, index: number): Book => ({
  bookUuid: value.bookId ?? `book-${index + 1}`,
  title: value.title ?? "",
  author: value.author ?? "",
  category: getCategoryName(value.category) ?? "",
  stock: value.stock ?? 0,
});

/**
 * バックエンドAPIと通信する図書リポジトリ
 */
@injectable()
export class BookRepository implements IBookRepository {
  public async searchKeyword(keyword: string): Promise<Book[]> {
    const params = new URLSearchParams({ Keyword: keyword });

    // next.config.ts の rewrites 経由でバックエンドAPIへ接続する
    const response = await fetch(`/library/api/books?${params.toString()}`, {
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

  public async register(book: BookRegistration): Promise<Book> {
    const requestBody: RegisterBookApiRequest = {
      title: book.title,
      author: book.author,
      categoryId: book.categoryId,
      stock: book.stock,
    };

    const response = await fetch("/library/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(
        await getResponseErrorMessage(
          response,
          `図書登録に失敗しました (Status: ${response.status})`,
        ),
      );
    }

    const text = await response.text();

    if (!text) {
      return {
        bookUuid: "",
        title: book.title,
        author: book.author,
        category: book.categoryName,
        stock: book.stock,
      };
    }

    return toBook(JSON.parse(text), 0);
  }

  public async update(book: BookUpdate): Promise<Book> {
    const requestBody: UpdateBookApiRequest = {
      title: book.title,
      author: book.author,
      categoryId: book.categoryId,
      stock: book.stock,
    };

    const response = await fetch(
      `/library/api/books/${encodeURIComponent(book.bookUuid)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      },
    );

    if (!response.ok) {
      throw new Error(
        await getResponseErrorMessage(
          response,
          `図書変更に失敗しました (Status: ${response.status})`,
        ),
      );
    }

    const text = await response.text();

    if (!text) {
      return {
        bookUuid: book.bookUuid,
        title: book.title,
        author: book.author,
        category: book.categoryName,
        stock: book.stock,
      };
    }

    return toBook(JSON.parse(text), 0);
  }
}
