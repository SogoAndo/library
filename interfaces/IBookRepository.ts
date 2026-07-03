import { Book } from "@/models/Book";
import { BookDeletion } from "@/models/BookDeletion";
import { BookRegistration } from "@/models/BookRegistration";
import { BookUpdate } from "@/models/BookUpdate";

/**
 * 図書リポジトリインターフェース
 */
export interface IBookRepository {
  /**
   * 指定したキーワードで図書を検索して取得する
   * @param keyword 検索キーワード
   * @returns 検索にヒットした図書のリスト
   */
  searchKeyword(keyword: string): Promise<Book[]>;

  /**
   * 図書を登録する
   * @param book 登録する図書
   * @returns 登録された図書
   */
  register(book: BookRegistration): Promise<Book>;

  /**
   * 図書を変更する
   * @param book 変更する図書
   * @returns 変更された図書
   */
  update(book: BookUpdate): Promise<Book>;

  /**
   * 図書を削除する
   * @param book 削除する図書
   */
  delete(book: BookDeletion): Promise<void>;
}
