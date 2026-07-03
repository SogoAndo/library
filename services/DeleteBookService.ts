import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import type { IBookRepository } from "@/interfaces/IBookRepository";
import type { IDeleteBookService } from "@/interfaces/IDeleteBookService";
import type { BookDeletion } from "@/models/BookDeletion";

/**
 * 図書削除サービスの実装
 */
@injectable()
export class DeleteBookService implements IDeleteBookService {
  constructor(
    @inject(TYPES.IBookRepository) private bookRepository: IBookRepository,
  ) {}

  public async execute(book: BookDeletion): Promise<void> {
    await this.bookRepository.delete(book);
  }
}
