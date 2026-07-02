import { injectable } from "inversify";
import { IBookRepository } from "@/interfaces/IBookRepository";
import { Book } from "@/models/Book";
import { BookRegistration } from "@/models/BookRegistration";

/**
 * 図書リポジトリの実装(モック)
 */
@injectable()
export class MockBookRepository implements IBookRepository {
  // DB接続前に画面動作を確認するための仮データ
  private readonly mockBooks: Book[] = [
    {
      bookUuid: "b-001",
      title: "リーダブルコード",
      author: "Dustin Boswell / Trevor Foucher",
      category: "プログラミング",
      stock: 3,
    },
    {
      bookUuid: "b-002",
      title: "達人プログラマー",
      author: "Andrew Hunt / David Thomas",
      category: "プログラミング",
      stock: 2,
    },
    {
      bookUuid: "b-003",
      title: "Clean Architecture",
      author: "Robert C. Martin",
      category: "設計",
      stock: 1,
    },
    {
      bookUuid: "b-004",
      title: "SQLアンチパターン",
      author: "Bill Karwin",
      category: "データベース",
      stock: 4,
    },
    {
      bookUuid: "b-005",
      title: "React実践の教科書",
      author: "Fullness, Inc.",
      category: "フロントエンド",
      stock: 5,
    },
  ];

  public async searchKeyword(keyword: string): Promise<Book[]> {
    const trimmedKeyword = keyword.trim();

    // 未入力検索では全件を返す
    if (!trimmedKeyword) {
      return this.mockBooks;
    }

    return this.mockBooks.filter((book) =>
      book.title.toLowerCase().includes(trimmedKeyword.toLowerCase()),
    );
  }

  public async register(book: BookRegistration): Promise<Book> {
    const registeredBook: Book = {
      bookUuid: `b-${String(this.mockBooks.length + 1).padStart(3, "0")}`,
      title: book.title,
      author: book.author,
      category: book.categoryName,
      stock: book.stock,
    };

    this.mockBooks.push(registeredBook);
    return registeredBook;
  }
}
