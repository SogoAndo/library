import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-green-200 bg-green-100 p-4 shadow-sm">
      <div className="container mx-auto flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-green-900">
          <Link href="/home">図書管理システム</Link>
        </h1>

        {/* 主要機能への共通ナビゲーション */}
        <nav className="flex flex-wrap gap-1 md:justify-end">
          <Link
            className="rounded-md bg-transparent px-3 py-2 text-sm font-medium text-green-900 hover:bg-green-200"
            href="/books"
          >
            図書検索
          </Link>
          <Link
            className="rounded-md bg-transparent px-3 py-2 text-sm font-medium text-green-900 hover:bg-green-200"
            href="/books/new"
          >
            図書登録
          </Link>
          <Link
            className="rounded-md bg-transparent px-3 py-2 text-sm font-medium text-green-900 hover:bg-green-200"
            href="/books/update"
          >
            図書変更
          </Link>
          <Link
            className="rounded-md bg-transparent px-3 py-2 text-sm font-medium text-green-900 hover:bg-green-200"
            href="/books/delete"
          >
            図書削除
          </Link>
          <Link
            className="rounded-md bg-transparent px-3 py-2 text-sm font-medium text-green-900 hover:bg-green-200"
            href="/login"
          >
            ログアウト
          </Link>
        </nav>
      </div>
    </header>
  );
}
