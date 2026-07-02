/**
 * 図書登録のためのDTO
 */
export interface BookRegistration {
  title: string;
  author: string;
  categoryId: string;
  categoryName: string;
  stock: number;
}
