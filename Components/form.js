import { useForm } from "react-hook-form";
import axios from 'axios';
import {Button,Spinner} from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { FormControl,FormLabel,FormErrorMessage,Input } from "@chakra-ui/react";
import AuthContext from "@/libs/context/AuthContext";

function Form() {
  const [css, setCss] = useState('{}')
  const [html, setHtml] = useState('')
  const [js, setJs] = useState('')
  const [text, setText] = useState('')

  const [data, setData] = useState("");
  const {register, handleSubmit, formState,reset,} = useForm();
  const [onButton,setButton] = useState(false);
  const ontext = (text) => {
    setText(text);
    console.log(text);
  } 

  const { authState, authDispatch } = useContext(AuthContext);

  const onSubmit = (data) => {
    setData(data.text);
    reset();
    setBottom(true);
  };
  const url = "http://localhost:5000";
  const sampleData = {
      css: `body { margin: 0; padding: 0; overflow: hidden; }  #rainContainer { width: 100%; height: 100vh; position: absolute; top: 0; left: 0; pointer-events: none; }  .drop { position: absolute; width: 2px; height: 120px; background-color: #0ff; opacity: 0.8; animation: dropFall linear infinite; }  @keyframes dropFall { 0% { transform: translateY(-100%) rotate(45deg); } 50% { transform: translateY(100vh) rotate(45deg); } 100% { transform: translateY(100vh) rotate(-45deg); } }`,
      html: ' <!DOCTYPE html> <html> <head> <title>ザーザー雨のアニメーション</title> </head> <body> <div id="rainContainer"> <div class="drop"></div> </div>  <script src="script.js"></script> </body> </html>',
      js: 'const numDrops = 150;  for (let i = 0; i < numDrops; i++) { createDrop(); }  function createDrop() { const drop = document.createElement("div"); drop.className = "drop"; drop.style.left = Math.random() * 100 + "%"; drop.style.animationDuration = Math.random() * 2 + 1 + "s"; drop.style.animationDelay = Math.random() * 2 + "s"; document.getElementById("rainContainer").appendChild(drop); }'
  }
  const Senddata = async (text) => {
    const date = new Date();
    const dateStr = date.toISOString();
    const uid = authState.user.uid

    const posted_data = {
      "animation": {
        "html": html,
        "css": css,
        "javascript": js
      },
      "comment": text.comment,
      "originalText": text.text,
      "postDate": dateStr,
      "uid": uid
    }
    console.log(posted_data)
    
    try{
      const uri = 'http://127.0.0.1:8000/api/v1/posts'
      const res = await axios.post(uri, posted_data)
      setText(text)
    } catch(error){
      console.log(error);
    }
  }

  const handleClick = async (data) => {
    try {
      const input_text = data.text
      console.log(input_text)
      const uri = encodeURI(`http://127.0.0.1:8000/api/v1/gpt?text=${input_text}`)
      const res = await axios.post(uri)
      
      console.log(data)
      const resData = res.data
      setHtml(resData["html"])
      setCss(resData["css"])
      setJs(resData["javascript"])
      console.log(resData.html)
      console.log(resData.css)
      console.log(resData.javascript)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="flex flex-col   justify-center bg-[#319795] rounded-xl">
        
        <form onSubmit={handleSubmit(handleClick)} className="flex flex-col container items-center p-4">
        <h1 className="text-2xl font-semibold text-[#FFFFFF] mb-4">生成するオノマトペを入力</h1>
          <div className="bottom-2">
            <Input bg='#e7e5e4'  className="container border border-gray-900" id="Onomatope" color="#292524" placeholder="例:ザーザー"
              {...register('text',{
                  required:true,
                  minLength:1,
                  maxLength:20,
              })}
            />
          </div>
          {formState.errors.text ?(<p className="text-[#FFFFFF]">1文字以上、20文字以下でなければなりません</p> ):null}
          <Button type="submit" colorScheme="gray" size="lg" disabled={!formState.isValid} loadingText="送信中" className="text-[#FFFFFF] mt-4 rounded-lg p-8  hover:shadow-xl  hover:ring-4  duration-200">
            送信
          </Button>
        </form>
        {formState.isSubmitting ? (
            <Spinner className="mt-15"
              thickness="4px"
              speed="0.5s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"/>
          ):null}
        {/*{bottom ? (
          <Cssoutput input_text = {data}/>
        ): 
          null
        }
        */}

      </div>
      <div className="mt-10">
        <div dangerouslySetInnerHTML={{ __html: html }} />

        <script>{js}</script>
        <style>{css}</style>
      </div>
      {formState.isSubmitted ? (
        <Button colorScheme="teal" size="lg" className="mt-10" onClick={() => setButton(true)} >
          投稿
        </Button>
      ):null}
      {onButton ? (
          <div className='justify-center items-center flex flex-col  fixed inset-15 y-10 z-50 outline-none gap-4 bg-gray-100 rounded-xl'>
            <form onSubmit={handleSubmit(Senddata)} className="flex flex-col container items-center p-4">
                <Input bg='#e7e5e4'  className="container border border-gray-900" id="Onomatope" color="#292524" placeholder="コメント"
                  {...register('comment',{
                    required:true,
                    minLength:1,
                   maxLength:20,
                })}
              />
            <Button type="submit" colorScheme="teal" size="lg" className="mt-10">
              確定
            </Button>

            </form>


                      <button
                        className="text-green-500 background-transparent font-bold uppercase px-2 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-200 hover:text-green-200 hover:scale-150 md:ml-auto"
                        type="button"
                        onClick={() => setButton(false)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-x"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          strokewidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokelinecap="round"
                          strokelinejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path d="M18 6l-12 12"></path>
                          <path d="M6 6l12 12"></path>
                        </svg>
                      </button>


        </div>

      
      ):null}
      

    </>
  );
}

export default Form;