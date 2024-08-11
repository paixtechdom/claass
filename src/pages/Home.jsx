import { useContext, useEffect, useState } from "react";
import {AppContext} from '../App'
import { Link } from "react-router-dom"
import { carouselItems, Statements } from "../assets/Constants";
import axios from "axios";


export const Home  = () => {
  const { mediumScreen, dbLocation, setShowZoom, setImageSource, setCurrentNav } = useContext(AppContext)
    const [currentSlide, setCurrentSlide] = useState(0);
    const [ latestSermon, setLatestSermon] = useState({})
    const [ isLoadingSermon, setIsLoadingSermon ] = useState(false)
    const [ isLoadingArticle, setIsLoadingArticle ] = useState(false)
    const [ isLoadingImages, setIsLoadingImages ] = useState(false)
    const [ latestArticle, setLatestArticle] = useState({})
    const [ images, setImages ] = useState([])
    useEffect(() => {
      document.documentElement.scrollTop = 0
      getLatestSermon()
      getLatestArticle()
      fetchImages()
      setCurrentNav(0)
    }, []);
    const getLatestSermon = () => {
      setIsLoadingSermon(true)
      axios.get(`${dbLocation}/sermons.php/latet/latest/`).then(function(res){
        setLatestSermon(res.data)
        setTimeout(() => {
          setIsLoadingSermon(false)
      }, 2000);
      })
    }
    const fetchImages = () =>{
      setIsLoadingImages(true)
        axios.get(`${dbLocation}/images.php/latest/6/`).then(function(res){
            setImages(res.data)
            setTimeout(() => {
              setIsLoadingImages(false)
          }, 2000);
        })
    }
    const getLatestArticle = () => {
      setIsLoadingArticle(true)
      axios.get(`${dbLocation}/articles.php/latet/latest/`).then(function(res){
        setLatestArticle(res.data)
        setTimeout(() => {
          setIsLoadingArticle(false)
      }, 2000);
      })
    }
    
    useEffect(() => {
      const interval = setInterval(() => {
        nextSlide('interval')
    }, 6000); 
    // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [currentSlide]);
    
  const nextSlide = (curr) =>{
    if(curr == 'interval'){
      setCurrentSlide(currentSlide == 3 ? 0 : currentSlide + 1)
    }else{
      setCurrentSlide(curr) 
    }
  }

   ;


    return(
        <>

            <div className="w-full relative overflow-hidden flex items-center justify-center bg-gray-200 homeHero" style={{
           
            }}>
                <div className={`flex homeHero text-white ${carouselItems[currentSlide].class} bg-fixed overflow-hidden w-full h-full flex flex-col bg-cover bg-center bg-no-repeat gap-5 items-center justify-center`} style={{
                }}>
                    <div className="z-20 text-center homeHero h-full w-full flex flex-col items-center justify-center gap-3" style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.75)'
                    }}>
                        <h2 className="font-bold text-5xl">{carouselItems[currentSlide].caption}</h2>
                        <p className="text-lg">{carouselItems[currentSlide]?.p}</p>

                    </div>
                 
                </div>
                <div className="flex absolute bottom-5 w-full items-center justify-center z-50">
                    <div className="flex gap-4 p-4">
                      {
                        carouselItems.map((item, key) => (
                          <p key={key} className='rounded-full cursor-pointer' style={{
                            height: 15+'px',
                            width: 15+'px',
                            transform: key == currentSlide ? 'scale(1.4)' : '',
                            backgroundColor: key == currentSlide ? 'white' : 'rgba(255, 255, 255, 0.3)'
                          }}
                            onClick={() => setCurrentSlide(key)}
                          ></p>
                        ))
                      }
                    </div>
                
                </div>
            </div>

            <div className="flex my-9 pt-9 justify-center w-full">
                <div className="rounded-xl w-11/12 lg:w-6/12 flex flex-col shadow-xl">
                      <div className="flex justify-between items-center w-full bg-blue-900 rounded-t-xl text-white p-4 px-6">

                        <h2 className="font-bold text-xl">Latest sermon</h2>
                        <Link to='/sermons'> See All <i className="bi bi-arrow-right"></i></Link>
                      </div>

                      <div className="flex flex-col w-full p-4 px-6">
                        {
                          isLoadingSermon ? 
                          <div className="bg-gray-100 rounded-xl flex flex-col w-full p-3 relative overflow-hidden">
                            <div className="absolute slideOver bg-gray-100"></div>
                            <div className="absolute slideOver2 bg-gray-100"></div>
                            <div className="flex flex-col w-full gap-2 loading">
                                <div className="flex justify-between w-full items-center ">
                                <h4 className="w-6/12 rounded-lg"></h4>
                                <p className="w-2/12 rounded-xl"></p>
                                                      
                                </div>

                              <button className="w-2/12 rounded-lg p-3"></button>
                              
                          </div> 
                          </div>
                      : 
                          <div className="flex flex-col w-full gap-3 p-3">
                              <div className="flex justify-between w-full items-center">
                                <h4 className="font-bold">{latestSermon.title}</h4>
                                <p className="text-sm">{latestSermon.date}</p>
                              </div>

                              <div className="flex justify-between w-full items-center">
                              <p className="text-gray-800">By: {latestSermon.preacher}</p>                               
                              <a href={latestSermon.link} className="bg-blue-900 text-white p-2 px-4 rounded-lg w-[150px] text-center text-sm"> Listen</a>
                              </div>
                              
                          </div>
                        }
                      </div>
                </div>
            </div>

            <div className="flex my-9 py-[15vh] justify-center w-full ">
              <div className="flex flex-col gap-[10vh] w-11/12 lg:w-10/12 xl:w-9/12 items-center ">

                <div className={`flex items-center gap-[50px] ${mediumScreen ? 'flex-wrap' : ''}`}>
                      <img src={Statements.mission.img} alt="" className="w-full lg:w-5/12"/>

                    <div className="flex flex-col gap-2 text-sm w-full">
                    <h3 className="text-2xl w-fit shadow-xl rounded-xl p-3 px-8 mb-4">Our {Statements.mission.title}</h3>

                      {Statements.mission.texts.map((text, key) => (
                        <div key={key} className='flex gap-3 items-center'>
                          <i className="bi bi-check-lg  shadow-xl h-fit text-xl p-1 px-2 rounded-full"></i>
                          <p className="tracking-wide leading-relaxed">{text}</p>
                        </div>
                      ))
                      }
                    </div>
                </div>
              </div>
            </div>     
            
              <div className="flex my-9 py-9 justify-center w-full">
                <div className="rounded-xl w-11/12 lg:w-6/12 flex flex-col shadow-xl">
                      <div className="flex justify-between items-center w-full bg-blue-900 rounded-t-xl text-white p-4 px-6">

                        <h2 className="font-bold text-xl">Latest article</h2>
                        <Link to='/articles'> See All <i className="bi bi-arrow-right"></i></Link>
                      </div>

                      <div className="flex flex-col w-full p-4 px-6">
                        {
                          isLoadingArticle ? 
                            <div className="bg-gray-100 rounded-xl flex flex-col w-full p-3 relative overflow-hidden">
                            <div className="absolute slideOver bg-gray-100"></div>
                            <div className="absolute slideOver2 bg-gray-100"></div>
                            <div className="flex flex-col w-full gap-2 loading">
                                <div className="flex justify-between w-full items-center ">
                                <h4 className="w-6/12 rounded-lg"></h4>
                                <p className="w-2/12 rounded-xl"></p>
                                                      
                                </div>

                            <button className="w-2/12 rounded-lg p-3"></button>
                            
                             </div>
                            </div> : 
                            <Link to={`article/${latestArticle.id}`}  className="flex flex-col w-full gap-3 p-3">
                                <div className="flex justify-between w-full items-center">
                                  <h4 className="font-bold">{latestArticle.title}</h4>
                                  <p className="text-sm">{latestArticle.date}</p>
                                </div>
                                <div className="flex justify-between w-full items-center">
                                <div className="bg-blue-900 text-white p-2 px-4 rounded-lg nderline text-sm w-[150px] text-center">Read</div>
                                </div>
                                
                            </Link>
                        }
                      </div>
                </div>
            </div>
            <div className="flex my-9 py-[15vh] justify-center w-full ">
              <div className={`flex flex-col gap-[10vh] w-11/12 lg:w-10/12 xl:w-9/12 items-center`}>            

                <div className={`flex items-center justify-center gap-[50px]  ${mediumScreen ? 'flex-col-reverse' : ''}`}>
                    <div className="flex flex-col gap-2 text-sm w-full">
                    <h3 className="text-2xl w-fit shadow-xl rounded-xl p-3 px-8 mb-4">Our {Statements.vision.title}</h3>

                      {Statements.vision.texts.map((text, key) => (
                        <div key={key} className='flex gap-3 items-center'>
                          <i className="bi bi-check-lg shadow-xl h-fit text-xl p-1 px-2 rounded-full"></i>
                          <p className="tracking-wide leading-relaxed">{text}</p>
                        </div>
                      ))
                      }
                    </div>
                    <img src={Statements.vision.img} alt="" className="w-full lg:w-5/12"/>
                   
                </div>
              </div>
            </div>      

              <div className="flex my-9 py-9 justify-center w-full">
                <div className="w-11/12 lg:w-10/12 xl:w-9/12 flex flex-col shadow-xl p-7">
                  <div className="flex justify-between items-center w-full bg-blue-900 rounded-t-xl text-white p-4 px-6">

                    <h2 className="font-bold text-xl">Gallery</h2>
                    <Link to='/gallery'> See All <i className="bi bi-arrow-right"></i></Link>
                  </div>

                  <div className={`w-full gap-y-9 gap-5 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 mt-[10vh]`}>
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

                                <div className={`overflow-hidden  flex flex-col justify-center`}>
                                    <img src={`${dbLocation}/images/${img.name}`} alt={img.caption.length > 0 ? img.caption : 'An image'} 
                                    className='w-full rounded-xl'/>
                                </div>
                            </div> 
                        )) : 
                        <p className="p-3 text-gray-500 bg-gray-100 rounded-xl">Empty List</p>

                    }
                  </div>
                </div>
            </div>
          

        </>
    )
}