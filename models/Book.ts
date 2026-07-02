/**
 * 図書検索で扱う図書モデル
 */
export interface Book {
  bookUuid: string;
  title: string;
  author: string;
  category: string;
  stock: number;
}
