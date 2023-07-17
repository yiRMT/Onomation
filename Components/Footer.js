import Link from "next/link"

const Footer = () => {
  return (
    <footer>
      <div className="flex gap-4 pb-10 justify-center">
        <p>
          © 2023 Onomation. All Rights Reserved.
        </p>
        <Link href="/privacy-policy" className="hover:underline">
          プライバシーポリシー
        </Link>
      </div>
    </footer>
  )
}

export default Footer