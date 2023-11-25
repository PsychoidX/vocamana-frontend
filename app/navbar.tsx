import Link from "next/link"

export function NavBar() {
  return (
    <nav className="navbar is-fixed-top">
      <div className="navbar-brand">
        <Link
          className="navbar-item"
          href="/words"
        >VOCAMANA</Link>
      </div>

      <div className="navbar-menu">
        <div className="navbar-start">
          <Link
            className="navbar-item"
            href="/words"
          >単語一覧</Link>
          <Link
            className="navbar-item"
            href="/sentences"
          >文章一覧</Link>
          <Link
            className="navbar-item"
            href="/words/new-word-form"
          >単語登録</Link>
          <Link
            className="navbar-item"
            href="/words/new-sentence-form"
          >文章登録</Link>
        </div>
      </div>
    </nav>
  )
}