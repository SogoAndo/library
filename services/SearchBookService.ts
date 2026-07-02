import { injectable, inject } from "inversify";
import type { ISearchBookService } from "../interfaces/ISearchBookService";
import type { IBookRepository } from "../interfaces/IBookRepository";
import type { Book } from "@/models/Book";
import { TYPES } from "@/di/types";
/**
 * 演習 6-2 データアクセスとサービスを実装する
 * 図書キーワード検索サービスインターフェイスの実装
 */
@injectable()
export class SearchBookService implements ISearchBookService {

    /**
     * コンストラクタ
     * @param bookRepository IBookRepositoryの実装をインジェクションする
     */
    constructor(
        @inject(TYPES.IBookRepository) private bookRepository: IBookRepository
    ) {}

    /**
     * 図書検索を実行する
     * @param keyword 検索キーワード
     * @returns 検索結果の図書のリスト
     */
    public async execute(keyword: string): Promise<Book[]> {
        // 現時点では検索条件をそのままrepositoryへ渡す
        return await this.bookRepository.searchKeyword(keyword);
    }
}
