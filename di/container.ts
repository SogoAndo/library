import "reflect-metadata";
import { IBookRepository } from "@/interfaces/IBookRepository";
import { IBookCategoryRepository } from "@/interfaces/IBookCategoryRepository";
import { IDeleteBookService } from "@/interfaces/IDeleteBookService";
import { IRegisterBookService } from "@/interfaces/IRegisterBookService";
import { ISearchBookService } from "@/interfaces/ISearchBookService";
import { IUpdateBookService } from "@/interfaces/IUpdateBookService";
import { Container } from "inversify";
import { TYPES } from "./types";
import { SearchBookService } from "@/services/SearchBookService";
import { BookRepository } from "@/infrastructures/BookRepository";
import { BookCategoryRepository } from "@/infrastructures/BookCategoryRepository";
import { DeleteBookService } from "@/services/DeleteBookService";
import { RegisterBookService } from "@/services/RegisterBookService";
import { UpdateBookService } from "@/services/UpdateBookService";

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
container
  .bind<IBookCategoryRepository>(TYPES.IBookCategoryRepository)
  .to(BookCategoryRepository);
// サービス(ユースケース)の登録
container.bind<ISearchBookService>(TYPES.ISearchBookService).to(SearchBookService);
container
  .bind<IRegisterBookService>(TYPES.IRegisterBookService)
  .to(RegisterBookService);
container.bind<IUpdateBookService>(TYPES.IUpdateBookService).to(UpdateBookService);
container.bind<IDeleteBookService>(TYPES.IDeleteBookService).to(DeleteBookService);

export { container };
