import Link from 'next/link';
import Head from 'next/head';
import { useEffect } from 'react';

export default function Posted_comp ({posts}) {
  useEffect(() => {
    console.log(posts.animation.css)
  }, [])

  return (
    <>
      <div>
        <ul className='gap-4 flex flex-col'>
            <li className="" key={posts.uid}>
              {/*<Link href={`/posts/${post.id}`} passHref locale='ja'>*/}
                {/*<a>*/}
                  <div className='flex flex-col gap-2  bg-gray-100 hover:bg-gray-300'>
                    <div className='font-bold sm:text-lg text-base'>{posts.original_text}</div>
                    <div className='flex flex-col'>
                      <div className='font-semibold sm:text-base text-sm mb-5'>{posts.postDate}</div>
                      <div className='gap-2 p-5'>
                          <div dangerouslySetInnerHTML={{ __html: posts.animation.html }} />
                          <script>{posts.animation.javascript}</script>
                          <style>{posts.animation.css}</style>
                        

                      </div>
                    </div>
                    <div >{posts.comment}</div>          
                  </div>
                {/*</a>*/}
              {/*</Link>*/}
            </li>
        
        </ul>
      </div>
    </>
  )
}