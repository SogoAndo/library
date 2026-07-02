import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-green-200 bg-green-100 p-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-green-900">
          <Link href="/home">図書管理システム</Link>
        </h1>

        <nav className="flex flex-wrap justify-end gap-1">
          <Link
            className="rounded-md bg-transparent px-3 py-2 text-sm font-medium text-green-900 hover:bg-green-200"
            href="/api/books/search"
          >
            図書検索
          </Link>
          <Link
            className="rounded-md bg-transparent px-3 py-2 text-sm font-medium text-green-900 hover:bg-green-200"
            href="/api/books/register"
          >
            図書登録
          </Link>
          <Link
            className="rounded-md bg-transparent px-3 py-2 text-sm font-medium text-green-900 hover:bg-green-200"
            href="/api/books/update"
          >
            図書変更
          </Link>
          <Link
            className="rounded-md bg-transparent px-3 py-2 text-sm font-medium text-green-900 hover:bg-green-200"
            href="/api/books/delete"
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
