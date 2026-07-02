import { BookCategory } from "@/models/BookCategory";

/**
 * 図書分類リポジトリインターフェース
 */
export interface IBookCategoryRepository {
  findAll(): Promise<BookCategory[]>;
}
