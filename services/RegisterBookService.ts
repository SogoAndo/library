import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import type { IBookCategoryRepository } from "@/interfaces/IBookCategoryRepository";
import type { IBookRepository } from "@/interfaces/IBookRepository";
import type { IRegisterBookService } from "@/interfaces/IRegisterBookService";
import type { Book } from "@/models/Book";
import type { BookCategory } from "@/models/BookCategory";
import type { BookRegistration } from "@/models/BookRegistration";

/**
 * 図書登録サービスの実装
 */
@injectable()
export class RegisterBookService implements IRegisterBookService {
  constructor(
    @inject(TYPES.IBookRepository) private bookRepository: IBookRepository,
    @inject(TYPES.IBookCategoryRepository)
    private bookCategoryRepository: IBookCategoryRepository,
  ) {}

  public async getCategories(): Promise<BookCategory[]> {
    return await this.bookCategoryRepository.findAll();
  }

  public async execute(book: BookRegistration): Promise<Book> {
    return await this.bookRepository.register(book);
  }
}
