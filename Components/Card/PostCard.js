import Card from "./Card";
import Link from "next/link";

const PostCard = () => {
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
          投稿を見る
        </div>
        <Link href="/posted">
          <Card title={"みんなの投稿"} />
        </Link>
      </div>
    </>
  );
}

export default PostCard;
