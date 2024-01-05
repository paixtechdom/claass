import axios from "axios"
import { useEffect } from "react"
import { useContext } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../App"
import { Helmet } from "react-helmet-async"

export const Sermons = () => {

    const [ searchInput, setSearchInput ] = useState('')
    const [ sermons, setSermons ] = useState([])
    const [ sermonOutput, setSermonOutput ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    const { dbLocation, setCurrentNav } = useContext(AppContext)

    useEffect(() => {
        fetchSermons()
        document.documentElement.scrollTop = 0
        setCurrentNav(1)
    }, [])
    
    const fetchSermons = () => {
        setIsLoading(true)
        try {
            axios.get(`${dbLocation}/sermons.php/sermons/`)
            .then(function(res){
                setTimeout(() => {
                    setIsLoading(false)
                }, 2000);
                setSermonOutput(res.data)
                setSermons(res.data)
            })
            
        } catch (error) {
            
        }
    }

    const handleSearch = (e) => {
        setSearchInput(e.target.value)
        setSermonOutput(sermons.filter(sermon => {
            if(sermon.title.toLowerCase().includes(e.target.value.toLowerCase())){
                return sermon
            }
            if(sermon.preacher.toLowerCase().includes(e.target.value.toLowerCase())){
                return sermon
            }
        }))
    }

    return(
        <div className="flex w-full justify-center items-center my-9 py-9 flex-col gap-5">
            <Helmet>
                <title>Sermons - CLASS</title>
            </Helmet>
            <div className="bg-blue-900 w-full text-white text-center p-4 text-2xl">
                CLASS Sermons
            </div>
            <div className="w-11/12 flex justify-center">
                <div className="bg-gray-50 border w-11/12 flex gap-3 rounded-xl ">
                    <input type="text" placeholder="Search Title or Preacher" className="bg-transparent border-r w-full p-2 px-3 outline-none"
                    value={searchInput}
                    onChange={handleSearch}
                    />
                    <i className="bi bi-search p-2 cursor-pointer"></i>
                </div>
            </div>
            <div className="w-11/12 flex flex-col gap-4">
                {
                    isLoading ? 
                    <>
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
                    </>
                    : 
                    sermonOutput.length > 0 ? 
                    sermonOutput?.map((sermon, key) => (
                        <div key={key} className="bg-gray-100 rounded-xl flex flex-col w-full p-3">
                            <div className="flex flex-col w-full gap-2">
                                <div className="flex justify-between w-full items-center">
                                <h4 className="font-bold"> {sermon.title}</h4>
                                <p className="smaller">{sermon.date}</p>
                                </div>
                                <div className="flex justify-between w-full items-center">
                                <p className="text-gray-800 small">By: {sermon.preacher}</p>                               
                                <a href={`${sermon.link}`} className="bg-blue-900 text-white p-2 px-4 rounded-lg nderline small"> Listen</a>
                                </div>
                                
                            </div>
                        </div>
                      
                    )) : 
                    <p className="p-3 text-gray-500 bg-gray-100 rounded-xl">Empty List</p>
                }
                {
                }
            </div>
        </div>
    )
}