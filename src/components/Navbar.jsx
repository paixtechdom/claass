import './Navbar.css'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef, useContext } from 'react'
import { AppContext } from '../App'
import { Links } from '../assets/Constants'


export const Navbar = () =>{
    const { showNav, setShowNav, currentNav, setCurrentNav } = useContext(AppContext)

    // to track on scroll event
    const [ scrollingDown, setScrollingDown ] = useState(false)
    

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    }, [])
    const handleScroll = () =>{

        if(document.documentElement.scrollTop > 200){
            setScrollingDown(true)
        }else{
            setScrollingDown(false)
        }
    
    }


    return(
        <div className={`fixed top-0 w-full transition-all duration-300 z-[199] ${scrollingDown ? "bg-white shadow-xl" : ""} flex items-center justify-center `}>
            <div className="flex justify-between items-center w-11/12 lg:w-10/12 xl:w-9/12 p-2 py-5">
                <Link to={'/'} className={`logo w-5/12 transition-all duration-300 z-40 text-black ${scrollingDown ? "text-black" : "text-white"} `}>
                    <h2 className='font-bold text-xl'>CLASS</h2>
                </Link>

                <div className={`text-2xl cursor-pointer lg:hidden transition-all duration-300 z-40 ${scrollingDown ? "text-black" : "text-white"}`} onClick={() => setShowNav(!showNav)}>
                    <i className={`bi bi-${showNav ? 'x-lg' : 'list'}`}></i>
                </div>

                <div className={`flex absolute h-[60vh] lg:h-fit top-9 mt-6 shadow-xl lg:shadow-none p-3 py-4 pt-[5vh] lg:top-0 lg:pt-0 lg:py-0 justify-center lg:relative lg:gap-6 lg:justify-end transition-all duration-1000 ease-in-out lg:items-center lg:mt-0 ${showNav ? 'border-t flex right-0 lg:border-0' : 'lg:flex right-[100%] lg:right-0' } bg-white lg:bg-transparent w-full `}>

                    <div className={`flex items-center flex-col w-11/12 lg:flex-row lg:w-fit gap-7 lg:gap-9`}>
                        {
                            Links.map((link, key) => (
                                <Link to={`/${link.link.toLowerCase()}`} key={key} className={`w-fit ${currentNav == key ? 'font-bold border-b-4 border-gray-600' : ''} 
                                ${scrollingDown ? "" : "lg:text-white"}
                                `} onClick={() => setCurrentNav(key)}>
                                    {link.name}
                                </Link>
                            ))
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}