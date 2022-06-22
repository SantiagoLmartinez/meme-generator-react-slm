import React, { useEffect, useState } from "react";

export const Meme = () =>{
    const [memes, setMemes] = useState([]);
    const [memeIndex, setMemeIndex ] = useState(0);
    const [captions, setCaptions] = useState([])

    //const history = useNavigate();

    const updateCaption = (e,index) =>{
        const text = e.target.value || '';
        setCaptions(
            captions.map((capt, indx)=>{
                if( index === indx){
                    return text
                } else{
                    return capt
                }
            })
        )
    }

    const downloadMeme = (url) =>{
        let a = document.createElement('a')
        
        a.download= true;
        a.target = '_blank'
        a.href = url
        a.click()
    }

    const generateMeme = (url) =>{
        //console.log('funca')
        const currentMeme = memes[memeIndex]
        const formData = new FormData()

        formData.append('username', 'SantiagoLMartinez')
        formData.append('password', 'joaco123')
        formData.append('template_id', currentMeme.id)

        captions.forEach((c, indx)=> formData.append(`boxes[${indx}][text]`, c));

        fetch('https://api.imgflip.com/caption_image',{
            method: 'POST',
            body: formData
        }).then(res =>{
            res.json().then(res => {
                let url = res.data.url
                downloadMeme(url)
            })
        })
    }
    //fn para que sean aleatoreos los memes
    const shuffleMemes = (array) =>{
        for(let i = array.length -1; i>0; i--){
            const j = Math.floor(Math.random()* i);
            const temp = array[i];
            array[i] = array[j];
            array[j]= temp;
        }
    }

    useEffect(()=>{
        fetch('https://api.imgflip.com/get_memes').then(res =>{ 
        res.json().then(res =>{
            //console.log(res.data.memes[0])
            const _memes = res.data.memes;
            shuffleMemes(_memes);
            setMemes(_memes)
        })
        }) 
    },[])

    useEffect(()=>{
        if(memes.length){
            setCaptions(Array(memes[memeIndex].box_count).fill(''));
        }
    }, [memeIndex, memes] )

   // useEffect(()=>{
   //     console.log(captions)
   // },[captions])

    return(
        memes.length ? 
        <div className="memeContainer">
            {/* <div className="memeContainerHeaderSpace"></div> */}
            <button className="generateButton" onClick={()=> generateMeme()}>Generate Meme</button>
            <button className="skipButton" onClick={()=>setMemeIndex(memeIndex + 1)}>Next Meme  </button>
            {
                captions.map((caption, index)=>
                    <input key={index} placeholder={'Insert text'} onChange={(e)=> updateCaption(e, index)} className='inpCaption' type="text"   />
                )
            }
            <img src={memes[memeIndex].url} /> 
        </div> : <></>
    )
};