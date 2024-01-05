import { useContext } from "react"
import { AppContext } from "../App"

export const ZoomedImage = () => {
    const { setShowZoom, imageSource} = useContext(AppContext)
    return(
        <div className="bg-black fixed top-0 h-screen w-full flex justisy-center items-center" style={{
            zIndex: 200
        }}>
            <p className="absolute rounded-full bg-gray-700 top-0 left-0 flex justify-center items-center text-white m-2 p-2 px-3 text-xl" onClick={()=>  {
                setShowZoom(false)
            }} style={{
                height: 40+'px',
                width: 40+'px',
            }}><i className="bi bi-x-lg"></i></p>
            <img src={imageSource} alt={`${imageSource} fffff`} className='w-full' />
        </div>
    )
}