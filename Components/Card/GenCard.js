import Card from "./Card";
import Link from "next/link";

const GenCard = () => {
  return (
    <>
      <div className="relative group">
        <div
          className={[
            "whitespace-nowrap",
            "rounded",
            "bg-black",
            "px-2",
            "py-1",
            "text-white",
            "absolute",
            "-top-12",
            "left-1/2",
            "-translate-x-1/2",
            "before:content-['']",
            "before:absolute",
            "before:-translate-x-1/2",
            "before:left-1/2",
            "before:top-full",
            "before:border-4",
            "before:border-transparent",
            "before:border-t-black",
            "opacity-0",
            "group-hover:opacity-100",
            "transition",
            "pointer-events-none",
          ].join(" ")}
        >
          入力されたテキストをもとにアニメーションを生成
        </div>
        <Link href="/gen">
          <Card title={"作ってみる"} />
        </Link>
      </div>
    </>
  );
}

export default GenCard;