import { useForm } from "react-hook-form";
import axios from 'axios';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Spinner, Textarea, CloseButton } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { FormControl,FormLabel,FormErrorMessage,Input } from "@chakra-ui/react";
import AuthContext from "@/libs/context/AuthContext";

function Form() {
  const [css, setCss] = useState('{}')
  const [html, setHtml] = useState('')
  const [js, setJs] = useState('')

  const [originalText, setOriginalText] = useState('')
  const [comment, setComment] = useState("");
  const { register, handleSubmit, formState, reset } = useForm();
  const [ openModal, setOpenModal ] = useState(false);

  const { authState, authDispatch } = useContext(AuthContext);

  const [isGenerated, setIsGenerated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const url = "http://localhost:5000";
  const sampleData = {
      css: `body { margin: 0; padding: 0; overflow: hidden; }  #rainContainer { width: 100%; height: 100vh; position: absolute; top: 0; left: 0; pointer-events: none; }  .drop { position: absolute; width: 2px; height: 120px; background-color: #0ff; opacity: 0.8; animation: dropFall linear infinite; }  @keyframes dropFall { 0% { transform: translateY(-100%) rotate(45deg); } 50% { transform: translateY(100vh) rotate(45deg); } 100% { transform: translateY(100vh) rotate(-45deg); } }`,
      html: ' <!DOCTYPE html> <html> <head> <title>ザーザー雨のアニメーション</title> </head> <body> <div id="rainContainer"> <div class="drop"></div> </div>  <script src="script.js"></script> </body> </html>',
      js: 'const numDrops = 150;  for (let i = 0; i < numDrops; i++) { createDrop(); }  function createDrop() { const drop = document.createElement("div"); drop.className = "drop"; drop.style.left = Math.random() * 100 + "%"; drop.style.animationDuration = Math.random() * 2 + 1 + "s"; drop.style.animationDelay = Math.random() * 2 + "s"; document.getElementById("rainContainer").appendChild(drop); }'
  }

  const handleStoreDatabase = async (text) => {
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
      "uid": uid,
      "displayName": authState.user.displayName,
    }
    console.log(posted_data)
    
    try{
      const uri = 'http://127.0.0.1:8000/api/v1/posts'
      await axios.post(uri, posted_data)
      reset();
    } catch(error){
      console.log(error);
      reset();
    }

    setOpenModal(false);
  }

  const handleGenerateOnomation = async (data) => {
    try {
      const input_text = data.text
      setHtml("")
      setCss("")
      setJs("")
      setIsGenerated(false);
      console.log(input_text)
      const uri = encodeURI(`http://127.0.0.1:8000/api/v1/gpt?text=${input_text}`)
      const res = await axios.post(uri)
      reset();
      console.log(data)
      const resData = res.data
      setHtml(resData["html"])
      setCss(resData["css"])
      setJs(resData["javascript"])
      setIsGenerated(true);
      console.log(resData.html)
      console.log(resData.css)
      console.log(resData.javascript)
    } catch (error) {
      console.error(error);
      setErrorMessage("ごめんなさい...生成できませんでした...")
      reset();
    }
  }

  return (
    <>
      <div className="flex flex-col  items-center justify-center bg-[#319795] rounded-xl">
        <form onSubmit={handleSubmit(handleGenerateOnomation)} className="flex flex-col container items-center p-4">
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
          {formState.errors.text ?(
            <p className="text-[#FFFFFF]">
              1文字以上、20文字以下でなければなりません
            </p>
          ) : null }
          <Button type="submit" bg="#FFFFFF" textColor="teal" size="lg" isLoading={formState.isSubmitting} loadingText="生成中" className="text-[#35A29F] mt-4 rounded-lg hover:shadow-xl  hover:ring-4  duration-200">
            生成する
          </Button>
        </form>
      </div>

      { isGenerated ? (
        <>
          <div className="m-10">
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <script>{js}</script>
            <style>{css}</style>
          </div>
          { authState.user ? (
            <>
              <Button colorScheme="teal" size="lg" className="mt-10" onClick={() => setOpenModal(true)} >
                共有する
              </Button>
              { openModal ? (
                <div className='justify-center items-center flex flex-col fixed inset-15 y-10 z-50 outline-none bg-gray-100 rounded-xl w-96'>
                  <form onSubmit={handleSubmit(handleStoreDatabase)} className="flex flex-col container items-center p-4 gap-4">
                    <Textarea bg='#e7e5e4'  className=" border border-gray-900" id="Onomatope" color="#292524" placeholder="コメント"
                      {...register('comment',{
                        required:false,
                        minLength:1,
                        maxLength:20,
                      })}
                    />
                    <div className="flex flex-row justify-center gap-4">
                      <Button type="submit" colorScheme="teal" size="lg" className="" disabled={!formState.isValid} isLoading={formState.isSubmitting}>
                        共有する
                      </Button>
                      <Button colorScheme="gray" size="lg" className="" onClick={() => setOpenModal(false)} >
                        閉じる
                      </Button>
                    </div>
                  </form>
                </div>
              ) : null }
            </>
          ) : null }
        </>
      ) : null }
      
      { errorMessage ? (
        <p className="text-2xl m-10 font-semibold">
          {errorMessage}
        </p>
      ) : null }
    </>
  );
}

export default Form;