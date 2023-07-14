import WorksCard from "./Card";
import Link from "next/link";
function Onogen() {



    return (
        <>
        
        <span className="relative group">
       <span
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
       </span>
        
        
        <button >
         <Link href="/gen">
          <WorksCard
            title={"オノマトペジェネレーター"}
            
          
          />
          </Link>
    
          
        </button>
      </span>

        
        
        
        
        
        </>







    );








}

export default Onogen;