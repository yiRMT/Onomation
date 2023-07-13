import axios from 'axios'
import React, { useState } from 'react'
import Script from 'next/script'
import Head from 'next/head'

const sampleData = {
    css: `body { margin: 0; padding: 0; overflow: hidden; }  #rainContainer { width: 100%; height: 100vh;  pointer-events: none; }  .drop { position: absolute; width: 2px; height: 120px; background-color: #0ff; opacity: 0.8; animation: dropFall linear infinite; }  @keyframes dropFall { 0% { transform: translateY(-100%) rotate(45deg); } 50% { transform: translateY(100vh) rotate(45deg); } 100% { transform: translateY(100vh) rotate(-45deg); } }`,
    html: ' <!DOCTYPE html> <html> <head> <title>ザーザー雨のアニメーション</title> <link rel="stylesheet" type="text/css" href="styles.css"> </head> <body> <div id="rainContainer"> <div class="drop"></div> </div>  <script src="script.js"></script> </body> </html>',
    js: 'const numDrops = 150;  for (let i = 0; i < numDrops; i++) { createDrop(); }  function createDrop() { const drop = document.createElement("div"); drop.className = "drop"; drop.style.left = Math.random() * 100 + "%"; drop.style.animationDuration = Math.random() * 2 + 1 + "s"; drop.style.animationDelay = Math.random() * 2 + "s"; document.getElementById("rainContainer").appendChild(drop); }'
}

const Cssoutput = (props) => {
    const [css, setCss] = useState('{}')
    const [html, setHtml] = useState('')
    const [js, setJs] = useState('')

    const handleClick = async () => {
        try {
            const url = 'http://127.0.0.1:5000/api/v1/gpt'
            const data = new FormData();
            data.append("text", "ガタガタ");
            const res = await axios.post(
                url, data
            )
            console.log(res)
            const resJson = JSON.parse(res.data.choices[0].message.content)
            setHtml(resJson.html)
            setCss(resJson.css)
            setJs(resJson.js)
        } catch (err) {
            console.log(err)
        }
        console.log(html)
        console.log(css)
        console.log(js)
    }

    return (
        <div className="">
            <button onClick={handleClick}>Fetch Data</button>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <script>{js}</script>
            <style>{css}</style>
        </div>
    )
}
export default Cssoutput