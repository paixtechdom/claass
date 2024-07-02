import './Navbar.css'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef, useContext } from 'react'
import { AppContext } from '../App'
import { Links } from '../assets/Constants'
import Logo  from '../assets/img/logo (2).jpg'

export const Navbar = () =>{
    const { mediumScreen, showNav, setShowNav, smallScreen, currentNav, setCurrentNav } = useContext(AppContext)
    const [ scrollingDown, setScrollingDown ] = useState(false)
    const [ dropDownNavClass, setDropDownNavClass ] = useState('')

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
    const handleDropDownNav = () =>{
        if(!showNav){
            setShowNav(true)
            setDropDownNavClass('slideInNav')
        }else{
            setDropDownNavClass('slideOutNav')
            setTimeout(() => {
                setShowNav(false)
            }, 500);
        }
    }

    return(
        <div className={`fixed top-0 w-full transition-all duration-300 z-40 ${scrollingDown ? "bg-white shadow-xl" : ""} flex items-center justify-center `}>
            <div className="flex justify-between items-center w-11/12 lg:w-10/12 xl:w-9/12 p-2 py-5">
                <Link to={'/'} className={`logo w-5/12 transition-all duration-300 z-40 text-black ${scrollingDown ? "text-black" : "text-white"} `}>
                    <h2 className='font-bold text-xl'>CLASS</h2>
                </Link>
                <div className={`text-2xl cursor-pointer ${mediumScreen ? '' : 'hidden'}  transition-all duration-300 z-40 ${scrollingDown ? "text-black" : "text-white"}`} onClick={() => handleDropDownNav()}>
                    <i className={`bi bi-${showNav ? 'x-lg' : 'list'}`}></i>
                </div>
                {
                    !mediumScreen || showNav  ? 
                    <div className={`flex  ${mediumScreen ? 'absolute right-0 h-[60vh] lg:h-fit top-9 mt-6 shadow-xl  p-3 py-4 pt-[5vh] lg:pt-0 justify-center' : 'gap-6 justify-end'} ${showNav ? 'border-t' : '' } ${dropDownNavClass} bg-white lg:bg-transparent w-full`}>

                        <div className={`flex items-center ${mediumScreen ? 'flex-col w-11/12 ' : ' '  } gap-7 lg:gap-9`}>
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
                    :''
                }
            </div>
        </div>
    )
}