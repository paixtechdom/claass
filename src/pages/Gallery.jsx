import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"
import { AppContext } from "../App"
import { Helmet } from "react-helmet-async"




const Gallery = () => {
    const { dbLocation, smallScreen, mediumScreen, setShowZoom, setImageSource, setCurrentNav } = useContext(AppContext)
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
        <div className="flex flex-col my-9 py-9 w-full items-center justify-center gap-5">
            <Helmet>
                <title>Gallery - CLASS</title>
            </Helmet>

            <div className="bg-blue-900 w-full text-white text-center p-4 text-2xl">
                CLASS Gallery
            </div>
            <div className={`w-11/12 gap-3 ${smallScreen ? 'flex flex-col' : mediumScreen ? 'grid grid-cols-3' : 'grid grid-cols-5'  }`}>
                {
                    isLoadingImages ? 
                    <div className="bg-gray-100 rounded-xl flex flex-col w-full p-3 relative overflow-hidden">                    
                    <div className="flex flex-col w-full gap-2 loading">
                        <div className="flex gap-2 flex-col justify-between w-full items-center ">
                        <h4 className="w-10/12 rounded-lg" style={{
                            height: 30+'vh'
                        }}></h4>
                        <p className="w-7/12 rounded-xl"></p>
                                                
                        </div>                        
                    </div>
                    </div> :
                    images.length > 0 ?
                    images?.map((img, key) => (

                        <div key={key} className="flex flex-col border items-center rounded-t overflow-hidden shadow-lg" onClick={() => {
                            setShowZoom(true) 
                            setImageSource(`${dbLocation}/images/${img.name}`)
                          }}>

                        <div className={`overflow-hidden  flex flex-col justify-center `} style={{
                            height: smallScreen ? '' :  35+'vh',
                            minHeight: smallScreen ? '' :  35+'vh',
                            maxHeight: smallScreen ? '' :  35+'vh',
                        }}>
                            <img src={`${dbLocation}/images/${img.name}`} alt={img.caption.length > 0 ? img.caption : 'An image'} 
                            className='w-full ' />
                        {
                            img.caption.length > 0 ?
                            <p className="px-2 small-lg py-3 text-center">{img?.caption}</p>
                            : ''
                        }
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