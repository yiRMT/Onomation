import { useForm } from "react-hook-form";
import axios from 'axios';
import { 
  Button, Spinner, 
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, ModalHeader, ModalFooter,
  FormControl, FormLabel, FormErrorMessage, Input, Textarea
} from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import AuthContext from "@/libs/context/AuthContext";

function Form() {
  const [css, setCss] = useState('{}')
  const [html, setHtml] = useState('')
  const [js, setJs] = useState('')
  const [text, setText] = useState('')

  const [postData, setPostData] = useState({
    "animation": {
      "html": "",
      "css": "",
      "javascript": ""
    },
    "comment": "",
    "originalText": "",
    "postDate": "",
    "uid": "",
    "displayName": "",
  })

  const [ data, setData ] = useState("");
  const { register, handleSubmit, formState, reset } = useForm();
  const [ openModal, setOpenModal ] = useState(false);
  const ontext = (text) => {
    setText(text);
    console.log(text);
  }

  const [ isGenerated, setIsGenerated ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState(null);

  const { authState, authDispatch } = useContext(AuthContext);
  
  const sampleData = {
    css: `body { margin: 0; padding: 0; overflow: hidden; }  #rainContainer { width: 100%; height: 100vh; position: absolute; top: 0; left: 0; pointer-events: none; }  .drop { position: absolute; width: 2px; height: 120px; background-color: #0ff; opacity: 0.8; animation: dropFall linear infinite; }  @keyframes dropFall { 0% { transform: translateY(-100%) rotate(45deg); } 50% { transform: translateY(100vh) rotate(45deg); } 100% { transform: translateY(100vh) rotate(-45deg); } }`,
    html: ' <!DOCTYPE html> <html> <head> <title>ザーザー雨のアニメーション</title> </head> <body> <div id="rainContainer"> <div class="drop"></div> </div>  <script src="script.js"></script> </body> </html>',
    js: 'const numDrops = 150;  for (let i = 0; i < numDrops; i++) { createDrop(); }  function createDrop() { const drop = document.createElement("div"); drop.className = "drop"; drop.style.left = Math.random() * 100 + "%"; drop.style.animationDuration = Math.random() * 2 + 1 + "s"; drop.style.animationDelay = Math.random() * 2 + "s"; document.getElementById("rainContainer").appendChild(drop); }'
  }

  const handleStoreDatabase = async (text) => {
    console.log(text)

    const date = new Date();
    const dateStr = date.toISOString();
    const uid = authState.user.uid;

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
    
    try{
      const uri = 'http://127.0.0.1:8000/api/v1/posts'
      await axios.post(uri, posted_data)
      setText(text)
      console.log('共有に成功しました！')
    } catch(error){
      console.log(error);
    }
  }

  const handleClickGenerate = async (data) => {
    try {
      const input_text = data.text
      setHtml("")
      setCss("")
      setJs("")
      setErrorMessage(null)
      console.log(input_text)
      const uri = encodeURI(`http://127.0.0.1:8000/api/v1/gpt?text=${input_text}`)
      const res = await axios.post(uri)
      reset();
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
      setErrorMessage('生成に失敗しました')
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-[#319795] rounded-xl">
        <FormControl className="flex flex-col container items-center p-4">
          <h1 className="text-2xl font-semibold text-[#FFFFFF] my-2">
            生成するオノマトペを入力
          </h1>
          <Input bg='#e7e5e4'  className="container border border-gray-900 my-4" id="Onomatope" color="#292524" placeholder="例:ザーザー"
            {...register('text',{
              required:true,
              minLength:1,
              maxLength:20,
            })}
          />
          { formState.errors.text ? (
            <p className="text-[#FFFFFF]">
              1文字以上、20文字以下でなければなりません
            </p>
          ) : null }
          <Button type="submit" bg="#FFFFFF" textColor="teal" size="lg"
            className="my-2"
            disabled={!formState.isValid} isLoading={formState.isSubmitting}
            onClick={handleSubmit(handleClickGenerate)}
          >
            生成
          </Button>
        </FormControl>
      </div>
      {formState.isSubmitting ? (
        <Spinner className="mt-20"
          thickness="4px"
          speed="0.5s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          label="生成中"
        />
      ) : null }
      <div className="mt-10">
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <script>{js}</script>
        <style>{css}</style>
      </div>
      { isGenerated ? (
        !html == "" ? (
          <Button colorScheme="teal" size="lg" className="mt-10" onClick={() => setOpenModal(true)} >
            共有する
          </Button>
        ) : (
          <p className="text-2xl font-semibold">
            ごめんなさい...生成できませんでした
          </p>
        )
      ) : null }

      { errorMessage ? (
        <p className="text-2xl font-semibold">
          {errorMessage}
        </p>
      ) : null }
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>あなたのオノメーションを共有する</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="comment" isRequired>
              <FormLabel>コメント</FormLabel>
              <Textarea bg='#e7e5e4'  className="container border border-gray-900" id="Onomatope" color="#292524" placeholder="例:ザーザー" size="lg"
                {...register('comment',{
                  required:true,
                  minLength:1,
                  maxLength:20,
                })}
              />
              { formState.errors.comment ? (
                <p className="text-[#FFFFFF]">
                  1文字以上、20文字以下でなければなりません
                </p>
              ) : null }
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={ handleSubmit(handleStoreDatabase) }>
              共有する
            </Button>
            <Button variant="ghost" onClick={() => setOpenModal(false)}>
              キャンセル
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Form;