import { useForm } from "react-hook-form";
import * as React from 'react'
import axios from 'axios';
import Cssoutput from "./cssoutput";

function Form() {
    const [data, setData] = React.useState("");
    const [bottom, setBottom] = React.useState(false);
    const {register, handleSubmit, formState,reset} = useForm();
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
    const text_submit = (data) => {


        axios.post(url, {
            text: data.text
        })
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.error(err);
        });
    }



    return (
        <>
        <div className="flex flex-col container items-center ">
            <h1 className="text-2xl font-bold ">生成するオノマトペを入力</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col container items-center p-4">
                <div className="bottom-2">
<<<<<<< Updated upstream
                    <textarea className="container border border-gray-500" id="Onomatope" placeholder="例:ザーザー"
=======
                    <Input className="container border border-gray-500 bg-gray-900" id="Onomatope" placeholder="例:ザーザー"
>>>>>>> Stashed changes
                
                    {...register('text',{
                        required:true,
                        minLength:1,
                        maxLength:20,
                    })}/>
                    
                </div>
                {formState.errors.text && '1文字以上、20文字以下でなければなりません。' }
                <button type="submit" disabled={!formState.isValid} className="bg-gray-300 rounded-lg p-8  hover:shadow-xl  hover:ring-4 ring-red-500 duration-200">送信</button>
                
            </form>
            {bottom ?(
            <Cssoutput input_text = {data}/>
            ): null}

            

            

        
        </div>
        


        </>
        


    










    );
}
export default Form;