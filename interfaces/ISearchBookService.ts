import { Book } from "@/models/Book";
/**
 * 演習 6-2 データアクセスとサービスを実装する
 * 図書キーワード検索サービスインターフェイス
 */
export interface ISearchBookService {
    /**
     * 図書検索を実行する
     * @param keyword 検索キーワード
     * @returns 検索結果の図書のリスト
     */
    execute(keyword: string): Promise<Book[]>;
}