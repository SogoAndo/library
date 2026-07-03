import { BookDeletion } from "@/models/BookDeletion";

/**
 * 図書削除サービスインターフェース
 */
export interface IDeleteBookService {
  execute(book: BookDeletion): Promise<void>;
}
