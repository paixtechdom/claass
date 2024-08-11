import axios from "axios"
import { useEffect } from "react"
import { useContext } from "react"
import { useState } from "react"
import { useParams } from "react-router"
import { AppContext } from "../App"
import { Helmet } from "react-helmet-async"


export const EachArticle = () => {
    const id  = useParams()
    const { dbLocation, setCurrentNav } = useContext(AppContext)
    const [ article, setArticle ] = useState({})
    const [url, setUrl] = useState('')
    const [copiedUrl, setCopiedUrl] = useState(false)
    const [showShareOptions, setShowShareOptions] = useState(false)
    const [shareOptionsClass, setShareOptionsClass] = useState('')

    const [ articleContent, setArticleContent ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)


    useEffect(() => {
        if(shareOptionsClass == 'slideOut'){
            setTimeout(() => {
                setShowShareOptions(false)
            }, 500);
        }
    }, [shareOptionsClass])
    
    useEffect(() => {
        setCurrentNav(2)
        getArticle(id.id)
        document.documentElement.scrollTop = 0
        setUrl(window.location.href)
    }, [])
    
    const getArticle = (id) => {
        setIsLoading(true)
        try {
            axios.get(`${dbLocation}/articles.php/article/${id}/`)
            .then(function(res){
                setTimeout(() => {
                    setIsLoading(false)
                }, 2000);
                setArticle(res.data)
                renderContent(res.data.content)
            })
            
        } catch (error) {
            console.log(error)   
        }
    }

    const renderContent = (content) =>{
        const newContent = content?.split(',,' )
        setArticleContent(newContent)
    }

    const shareOptions = [
        {
            name: 'Facebook',
            icon: 'facebook',
            link: 'https://www.facebook.com/sharer/sharer.php?u='
        },

        {
            name: 'Whatsapp',
            icon: 'whatsapp',
            link: 'whatsapp://send?text='
        },
    ]
     return (
        <div className="mb-9 pb-9 w-full flex flex-col justify-center items-center">
            <Helmet>
                <title>{`${article.title}`} - CLASS</title>
            </Helmet>

            {
                isLoading ? 
                <div className=" flex flex-col  items-center justify-center w-full gap-12">
                    <div className="h-[40vh] w-full bg-blue-900 ">

                    </div>
                    <div className="flex flex-col gap-6 w-11/12 lg:w-10/12 xl:w-9/12 ">

                    <div className=" bg-gray-100 rounded-xl flex flex-col w-full p-3 relative overflow-hidden">
                    <div className="absolute slideOver bg-gray-100"></div>
                            <div className="absolute slideOver2 bg-gray-100"></div>
                        <div className="flex flex-col w-full gap-2 loading">
                            <h4 className="w-full p-6 rounded-xl"></h4>
                        
                            
                        </div>
                    </div>
                    <div className="rounded-xl flex flex-col w-full p-3 relative overflow-hidden">
                        <div className="flex flex-col w-full gap-2 loading">
                            <div className="flex flex-col gap-2 justify-between w-full items-center ">
                            <p className="w-full "></p>
                            <p className="w-full "></p>
                            <p className="w-full "></p>
                            <p className="w-full "></p>
                            <p className="w-full "></p>
                            <p className="w-full "></p>
                                                
                            </div>
                            
                        </div>
                    </div>
                    </div>
                </div>
                :
                <>
                <div className="flex justify-center w-full bg-blue-900 py-[10vh] h-[40vh] items-end">
                    <div className="w-11/12 lg:w-10/12 xl:w-9/12  flex flex-col items-end justify-center font-bold text-2xl text-white p-3 gap-2">

                        <h3 className="w-full">{article.title}</h3>
                        <div className=" flex justify-between items-center w-full">
                            <p className="text-sm ">{article.date}</p>
                            
                            <i className="bi bi-share cursor-pointer" onClick={() =>{
                                setShowShareOptions(true)
                                setShareOptionsClass('slideIn')
                            }}></i>

                        </div>

                    </div>

                </div>
                <div className="flex flex-col gap-4 mb-5 w-11/12 lg:w-10/12 xl:w-9/12 mt-12">


                    <div className="flex flex-col text-sm gap-3 mx-2 text-justify">
                    {
                    articleContent?.map((content, key ) => (
                        <p key={key}>{content}</p>
                    ))
                    
                    }
                    </div>
                </div>  
                {
                    showShareOptions ? 
                <div className="fixed top-0 w-full h-screen flex justify-center items-end bg-zinc-950 bg-opacity-[0.4] z-[300]">
                    <div className={`absolute bg-white rounded-t-xl flex flex-col w-11/12 lg:w-10/12 xl:w-9/12  items-center ${shareOptionsClass}`} style={{
                        minHeight: 35+'vh'
                    }}>
                        <div className="flex bg-blue-900 text-white items-center justify-between w-full py-3 px-6 md:px-9 rounded-t-xl">
                            <div className="flex gap-4 items-center">
                                <i className="bi bi-share text-base"></i>
                                <p className="text-2xl">Share to</p>
                            </div>
                            <p className=" h-full cursor-pointer" onClick={() => {
                                setShareOptionsClass('slideOut')
                            }}> 
                                <i className="bi bi-x-lg h-full"></i>
                            </p>
                        </div>
                        <div className="bg-white grid grid-cols-3 gap-4 w-11/12 mt-4">
                            {
                                shareOptions.map((option, key) => (
                                    <a key={key} href={`${option.link}${url}`} className='flex flex-col items-center shadow-xl p-3 rounded-xl sendOptions' onClick={() =>{
                                        setShareOptionsClass('slideOut')
                                    }}>
                                        <i className={`text-2xl text-blue bi bi-${option.icon}`}></i>
                                        <p className="text-sm">{option.name}</p>
                                    </a>
                                ))
                            }
                                    <div className='flex flex-col items-center shadow-xl p-3 rounded-xl sendOptions cursor-pointer' onClick={() => {
                                        navigator.clipboard.writeText(url)
                                        setCopiedUrl(true)
                                    }}>
                                        <i className={`text-2xl text-blue bi bi-copy`}></i>
                                        <p className="text-sm">{copiedUrl ? 'Copied' : 'Copy link'}</p>
                                    </div>

                        </div>
                        
                    </div>

                </div> : ''
                }
                </>
            }

        </div>
     )
}