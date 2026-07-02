import { Book } from "@/models/Book";
import { BookCategory } from "@/models/BookCategory";
import { BookRegistration } from "@/models/BookRegistration";

/**
 * 図書登録サービスインターフェース
 */
export interface IRegisterBookService {
  getCategories(): Promise<BookCategory[]>;
  execute(book: BookRegistration): Promise<Book>;
}
