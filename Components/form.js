import { useForm } from "react-hook-form";
import axios from 'axios';
import Cssoutput from "./cssoutput";
import {Button} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FormControl,FormLabel,FormErrorMessage,Input } from "@chakra-ui/react";


function Form() {
  const [css, setCss] = useState('{}')
  const [html, setHtml] = useState('')
  const [js, setJs] = useState('')
  const [text, setText] = useState('')

  const [data, setData] = useState("");
  const [bottom, setBottom] = useState(false);
  const {register, handleSubmit, formState,reset,} = useForm();
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
  const handleClick = async (data) => {
    try {
      const uri = encodeURI(`http://127.0.0.1:8000/api/v1/gpt?text=${data}`)
      const res = await axios.post(uri)
      const resData = res.data
      setHtml(resData.html)
      setCss(resData.css)
      setJs(resData.javascript)
      console.log(resData.html)
      console.log(resData.css)
      console.log(resData.javascript)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="flex flex-col   justify-center bg-[#292524]">
        
        <form onSubmit={handleSubmit(handleClick)} className="flex flex-col container items-center p-4">
        <h1 className="text-2xl font-semibold text-[#DBC086] mb-4">生成するオノマトペを入力</h1>
          <div className="bottom-2">
            <Input bg='#e7e5e4'  className="container border border-gray-900" id="Onomatope" color="#292524" placeholder="例:ザーザー"
              {...register('text',{
                  required:true,
                  minLength:1,
                  maxLength:20,
              })}
            />
          </div>
          {formState.errors.text ?(<p className="text-[#DBC086]">1文字以上、20文字以下でなければなりません</p> ):null}
          <Button type="submit" bg='#DBC086' isLoading={formState.isSubmitting} disabled={!formState.isValid} loadingText="送信中" className="mt-4 rounded-lg p-8  hover:shadow-xl  hover:ring-4  duration-200">
            送信
          </Button>
        
        </form>
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
    </>
  );
}

export default Form;