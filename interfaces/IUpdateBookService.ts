import { Book } from "@/models/Book";
import { BookCategory } from "@/models/BookCategory";
import { BookUpdate } from "@/models/BookUpdate";

/**
 * 図書変更サービスインターフェース
 */
export interface IUpdateBookService {
  getCategories(): Promise<BookCategory[]>;
  execute(book: BookUpdate): Promise<Book>;
}
