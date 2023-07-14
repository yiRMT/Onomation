import axios from 'axios'
import React, { useState } from 'react'
import Script from 'next/script'
import Head from 'next/head'
import Form from './form'

const sampleData = {
    css: `body { margin: 0; padding: 0; overflow: hidden; }  #rainContainer { width: 100%; height: 100vh;  pointer-events: none; }  .drop { position: absolute; width: 2px; height: 120px; background-color: #0ff; opacity: 0.8; animation: dropFall linear infinite; }  @keyframes dropFall { 0% { transform: translateY(-100%) rotate(45deg); } 50% { transform: translateY(100vh) rotate(45deg); } 100% { transform: translateY(100vh) rotate(-45deg); } }`,
    html: ' <!DOCTYPE html> <html> <head> <title>ザーザー雨のアニメーション</title> <link rel="stylesheet" type="text/css" href="styles.css"> </head> <body> <div id="rainContainer"> <div class="drop"></div> </div>  <script src="script.js"></script> </body> </html>',
    js: 'const numDrops = 150;  for (let i = 0; i < numDrops; i++) { createDrop(); }  function createDrop() { const drop = document.createElement("div"); drop.className = "drop"; drop.style.left = Math.random() * 100 + "%"; drop.style.animationDuration = Math.random() * 2 + 1 + "s"; drop.style.animationDelay = Math.random() * 2 + "s"; document.getElementById("rainContainer").appendChild(drop); }'
}

const Cssoutput = (props) => {

    const [css, setCss] = useState('{}')
    const [html, setHtml] = useState('')
    const [js, setJs] = useState('')
    const [text, setText] = useState('')
    const click =() => {

        setText(props.input_text)
        console.log(props.input_text)
    }
    const hello = async () => {
        try {
            const url1 = 'http://127.0.0.1:8000/?text=ザーザー'
            
            const res = await axios.get(url1)
            console.log(res)
            
        
        } catch (error) {
            console.error(error);
        }
 
    }
    const handleClick = async () => {
        try {
            const uri = encodeURI('http://127.0.0.1:8000//api/v1/gpt?text=${props.input_text}')
            const res = await axios.post(uri)
            const resJson = JSON.parse(res)
            setHtml(resJson.html)
            setCss(res.css)
            setJs(res.javascript)
        } catch (error) {
            console.error(error);
        }
        console.log(html)
        console.log(css)
        console.log(js)
    }

    return (
        <>
        <div className="flex flex-col container items-center p-4">
            <p>{props.input_text}</p>
            <button onClick={hello}>Fetch Data</button>
        </div>
        <div>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <script>{js}</script>
            <style>{css}</style>
        </div>
        </>
    )
}
export default Cssoutput