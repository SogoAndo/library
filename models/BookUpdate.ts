/**
 * 図書変更のためのDTO
 */
export interface BookUpdate {
  bookUuid: string;
  title: string;
  author: string;
  categoryId: string;
  categoryName: string;
  stock: number;
}
