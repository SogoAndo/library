import "reflect-metadata";
import { IBookRepository } from "@/interfaces/IBookRepository";
import { ISearchBookService } from "@/interfaces/ISearchBookService";
import { Container } from "inversify";
import { TYPES } from "./types";
import { SearchBookService } from "@/services/SearchBookService";
import { BookRepository } from "@/infrastructures/BookRepository";

/**
 * 演習 6-2 データアクセスとサービスを実装する
 * DIコンテナの初期化と依存関係の登録
 */
const container = new Container();
// ---------------------------------------------------------
// バインディング（登録）設定
// ---------------------------------------------------------
// 図書検索では、まずリポジトリとサービスをDIコンテナに登録する
// TODO: mockに戻す場合は BookRepository を MockBookRepository に切り替える

/**
 * 演習 8-7 バックエンドにアクセスするリポジトリを実装して切り替える
 */
container.bind<IBookRepository>(TYPES.IBookRepository).to(BookRepository);
// サービス(ユースケース)の登録
container.bind<ISearchBookService>(TYPES.ISearchBookService).to(SearchBookService);

export { container };
