import { set, useForm } from "react-hook-form";
import axios from 'axios';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Spinner, Textarea, CloseButton, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { FormControl, FormLabel, FormErrorMessage,Input, FormHelperText } from "@chakra-ui/react";
import AuthContext from "../libs/context/AuthContext";
import { auth } from "@/firebase";
import { CloseIcon } from "@chakra-ui/icons";

function Form() {
  const [css, setCss] = useState('{}')
  const [html, setHtml] = useState('')
  const [js, setJs] = useState('')
  const [originalText, setOriginalText] = useState('')
  const [comment, setComment] = useState('')
  const [postData, setPostData] = useState({});
  const [generationErrorMessage, setGenerationErrorMessage] = useState('');
  const [commentErrorMessage, setCommentErrorMessage] = useState('');

  const [openAIAPIKey, setOpenAIAPIKey] = useState('');

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [showAPIKey, setShowAPIKey] = React.useState(false)

  const isGenerationError = generationErrorMessage !== '';
  const isCommentError = commentErrorMessage !== '';

  const { authState, authDispatch } = useContext(AuthContext);

  const url = "https://onomation.onrender.com/";
  const sampleData = {
      css: `body { margin: 0; padding: 0; overflow: hidden; }  #rainContainer { width: 100%; height: 100vh; position: absolute; top: 0; left: 0; pointer-events: none; }  .drop { position: absolute; width: 2px; height: 120px; background-color: #0ff; opacity: 0.8; animation: dropFall linear infinite; }  @keyframes dropFall { 0% { transform: translateY(-100%) rotate(45deg); } 50% { transform: translateY(100vh) rotate(45deg); } 100% { transform: translateY(100vh) rotate(-45deg); } }`,
      html: ' <!DOCTYPE html> <html> <head> <title>ザーザー雨のアニメーション</title> </head> <body> <div id="rainContainer"> <div class="drop"></div> </div>  <script src="script.js"></script> </body> </html>',
      js: 'const numDrops = 150;  for (let i = 0; i < numDrops; i++) { createDrop(); }  function createDrop() { const drop = document.createElement("div"); drop.className = "drop"; drop.style.left = Math.random() * 100 + "%"; drop.style.animationDuration = Math.random() * 2 + 1 + "s"; drop.style.animationDelay = Math.random() * 2 + "s"; document.getElementById("rainContainer").appendChild(drop); }'
  }

  useEffect(() => {
    const localOpenAIAPIKey = localStorage.getItem('openai_api_key');
    if (localOpenAIAPIKey !== '' && localOpenAIAPIKey !== null) {
      setOpenAIAPIKey(localOpenAIAPIKey);
    }
  }, [])

  const handleStoreDatabase = async () => {
    const date = new Date();
    const dateStr = date.toISOString();

    setPostData({
      ...postData,
      'comment': comment,
      'postDate': dateStr,
      'uid': authState.user.uid,
      'displayName': authState.user.displayName,
    })
    
    try {
      const uri = 'https://onomation.onrender.com/api/v1/posts'
      const idToken = await auth.currentUser.getIdToken(true)
      console.log(postData);
      await axios.post(uri, { 
        'data': postData,
        'authData': {
          'firebaseIdToken': idToken
        }
      })
      alert('投稿しました！');
      setComment('');
    } catch (error) {
      alert('投稿に失敗しました...');
      console.log(error);
    }
    setOpenModal(false);
  }

  const handleGenerateOnomation = async () => {
    try {
      // 初期化
      setPostData({})
      setHtml('')
      setCss('')
      setJs('')
      setIsGenerated(false);

      setIsGenerating(true);

      localStorage.setItem('openai_api_key', openAIAPIKey);

      const uri = encodeURI(`https://onomation.onrender.com/api/v1/gpt?text=${originalText}`)
      const res = await axios.post(uri, {
        openai_api_key: openAIAPIKey
      })

      setPostData({
        'originalText': originalText,
        'animation': {
          'html': res.data['html'],
          'css': res.data['css'],
          'javascript': res.data['javascript']
        },
      })
      setHtml(res.data['html'])
      setCss(res.data['css'])
      setJs(res.data['javascript'])
      
      setIsGenerated(true);
      setIsGenerating(false);
    } catch (error) {
      console.error(error);
      alert('ごめんなさい...生成できませんでした...')
      setIsGenerating(false);
      setIsGenerated(false);
      setOriginalText('');
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-[#319795] rounded-xl w-4/6">
        <FormControl isRequired className="flex flex-col container p-4" isInvalid={isGenerationError} >
          <h1 className="text-2xl font-semibold text-[#FFFFFF] mb-4 text-center">オノメーションを生成</h1>
          <div className="my-2">
            <FormLabel className="text-white">オノマトペ</FormLabel>
            <Input bg='#e7e5e4'  className="" id="Onomatope" color="#292524" placeholder="オノマトペを入力"
              onChange={(e) => { setOriginalText(e.target.value) }} value={originalText}
            />
            { isGenerationError ? (
              <FormErrorMessage>
                オノマトペを入力してください
              </FormErrorMessage>
            ) : (
              <FormHelperText color='white'>
                例: ザーザー
              </FormHelperText>
            ) }
          </div>
          <div className="my-2">
            <FormLabel className="text-white">OpenAI API Key</FormLabel>
            <InputGroup size='md'>
              <Input bg='#e7e5e4'  className="" id="Onomatope" color="#292524" placeholder="OpenAI API Keyを入力" type={showAPIKey ? 'text' : 'password'}
                onChange={(e) => { setOpenAIAPIKey(e.target.value) }} value={openAIAPIKey}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={() => setShowAPIKey(!showAPIKey)}>
                  {showAPIKey ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            { isGenerationError ? (
              <FormErrorMessage>
                OpenAI API Keyを入力してください
              </FormErrorMessage>
            ) : (
              <FormHelperText color='white'>
                {'本ウェブサイトではOpenAI API Keyをあなたのブラウザに保存し、サーバーには保存しません。ただし、外部サーバーに送信しますのでご了承ください。'}
              </FormHelperText>
            ) }
          </div>
          <Button type="submit" bg="#FFFFFF" textColor="teal" size="lg" className="text-[#35A29F] mt-4 rounded-lg hover:shadow-xl  hover:ring-4  duration-200" 
            loadingText="生成中" isLoading={isGenerating}
            isActive={isGenerationError} onClick={handleGenerateOnomation}
          >
            生成する
          </Button>
        </FormControl>
      </div>

      { isGenerated ? (
        <>
          <div className="m-10 p-10">
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <script>{js}</script>
            <style>{css}</style>
          </div>
          { authState.user ? (
            <>
              <Button colorScheme="teal" size="lg" className="mt-10" onClick={() => { setOpenModal(true) }} >
                共有する
              </Button>
              <Modal isOpen={openModal} onClose={() => setOpenModal(false)} >
                <ModalOverlay />
                <ModalContent className="self-center">
                  <ModalHeader>共有する</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <FormControl id="Onomatope_Comment" className="flex flex-col container items-center gap-4" isRequired isInvalid={isCommentError} >
                      <Textarea bg='#e7e5e4'  className=" border border-gray-900" id="Onomatope" color="#292524" placeholder="コメント"
                        onChange={(e) => { setComment(e.target.value) }} value={comment}
                      />
                      { isCommentError ? (
                        <FormErrorMessage>
                          コメントを入力してください
                        </FormErrorMessage>
                      ) : null }
                      <div className="flex flex-row justify-center gap-4 m-4">
                        <Button type="submit" colorScheme="teal" size="lg" className="" 
                          loadingText='投稿中' isLoading={isSubmittingComment} onClick={() => {handleStoreDatabase()}}
                        >
                          共有する
                        </Button>
                        <Button colorScheme="gray" size="lg" className="" onClick={() => setOpenModal(false)} >
                          閉じる
                        </Button>
                      </div>
                    </FormControl>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </>
          ) : null }
        </>
      ) : null }
    </>
  );
}

export default Form;