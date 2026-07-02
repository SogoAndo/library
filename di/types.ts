/**
 * 演習 6-2 データアクセスとサービスを実装する
 * DIコンテナ用の識別子(Symbol)定義
 */
export const TYPES = {
    // 図書検索: インフラストラクチャ層
    IBookRepository: Symbol.for("IBookRepository"),
    IBookCategoryRepository: Symbol.for("IBookCategoryRepository"),
    // 図書検索: サービス(ユースケース)層
    ISearchBookService: Symbol.for("ISearchBookService"),
    IRegisterBookService: Symbol.for("IRegisterBookService"),
};
