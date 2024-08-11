import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"
import { AppContext } from "../App"
import { Helmet } from "react-helmet-async"




const Gallery = () => {
    const { dbLocation, setShowZoom, setImageSource, setCurrentNav } = useContext(AppContext)
    const [ images, setImages ] = useState([])
    const [ isLoadingImages, setIsLoadingImages ] = useState(true)

    useEffect(() => {
        document.documentElement.scrollTop = 0
        fetchImages()
        setCurrentNav(3)
    }, [])
    const fetchImages = () =>{
        setIsLoadingImages(true)
        try {
            axios.get(`${dbLocation}/images.php/images/`).then(function(res){
                setImages(res.data)
                setTimeout(() => {
                    setIsLoadingImages(false)
                }, 2000);
            })
            
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className="flex flex-col w-full items-center justify-center gap-5 mb-[15vh]">
            <Helmet>
                <title>Gallery - CLASS</title>
            </Helmet>

            <div className="bg-blue-900 w-full text-white py-[10vh] h-[40vh] flex items-end justify-center font-bold text-2xl">
                CLASS Gallery
            </div>
            <div className={`w-11/12 lg:w-10/12 xl:w-9/12 gap-y-9 gap-5 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 mt-[10vh]`}>
                {
                    isLoadingImages ? 
                    <div className="bg-gray-100 rounded-xl flex flex-col w-full p-3 relative overflow-hidden">                    
                    <div className="flex flex-col w-full gap-2 loading">
                        <div className="flex gap-2 flex-col justify-between w-full items-center ">
                        <h4 className="w-10/12 rounded-lg" style={{
                            height: 30+'vh'
                        }}></h4>                                                
                        </div>                        
                    </div>
                    </div> :
                    images.length > 0 ?
                    images?.map((img, key) => (

                        <div key={key} className="flex flex-col items-center overflow-hidden " onClick={() => {
                            setShowZoom(true) 
                            setImageSource(`${dbLocation}/images/${img.name}`)
                          }}>

                            <div className={`overflow-hidden  flex flex-col justify-center w-full `}>
                                <img src={`${dbLocation}/images/${img.name}`} alt={img.caption.length > 0 ? img.caption : 'An image'} 
                                className='w-full rounded-xl'/>
                            </div>
                        </div> 
                    )) : 
                    <p className="p-3 text-gray-500 bg-gray-100 rounded-xl">Empty List</p>

                }
            </div>
        </div>
    )
}


export { Gallery }