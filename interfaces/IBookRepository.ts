import { Book } from "@/models/Book";

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
}
