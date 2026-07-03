import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import type { IBookCategoryRepository } from "@/interfaces/IBookCategoryRepository";
import type { IBookRepository } from "@/interfaces/IBookRepository";
import type { IUpdateBookService } from "@/interfaces/IUpdateBookService";
import type { Book } from "@/models/Book";
import type { BookCategory } from "@/models/BookCategory";
import type { BookUpdate } from "@/models/BookUpdate";

/**
 * 図書変更サービスの実装
 */
@injectable()
export class UpdateBookService implements IUpdateBookService {
  constructor(
    @inject(TYPES.IBookRepository) private bookRepository: IBookRepository,
    @inject(TYPES.IBookCategoryRepository)
    private bookCategoryRepository: IBookCategoryRepository,
  ) {}

  public async getCategories(): Promise<BookCategory[]> {
    return await this.bookCategoryRepository.findAll();
  }

  public async execute(book: BookUpdate): Promise<Book> {
    return await this.bookRepository.update(book);
  }
}
