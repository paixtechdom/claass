import axios from "axios"
import { useContext } from "react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../App"
import { Helmet } from "react-helmet-async"


export const Articles = () => {
    const { dbLocation, setCurrentNav } = useContext(AppContext)
    const [ searchInput, setSearchInput ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
    const [ articleOutput, setArticleOutput ] = useState([])
    const [ articles, setArticles ] = useState([])

    useEffect(() => {
        document.documentElement.scrollTop = 0
        fetchArticles()
        setCurrentNav(2)
    }, [])

    const fetchArticles = async () => {
        setIsLoading(true)
        try {
            // setIsLoading(false)
            axios.get(`${dbLocation}/articles.php/`)
            .then(function(res){
                setTimeout(() => {
                    setIsLoading(false)
                    
                }, 2000);
                setArticleOutput(res.data)
                setArticles(res.data)
            })
            
        } catch (error) {
            
        }
    }

    const handleSearch = (e) => {
        setSearchInput(e.target.value)
        setArticleOutput(articles.filter(article => {
            if(article.title.toLowerCase().includes(e.target.value.toLowerCase())){
                return article
            }
          
        }))
    }

    return(
        <div className="flex w-full justify-center items-center flex-col gap-5">
        <Helmet>
            <title>Articles - Class</title>
        </Helmet>
        <div className="bg-blue-900 w-full text-white py-[10vh] h-[40vh] flex items-end justify-center font-bold text-2xl">
                Explore life changing articles
        </div>

        <div className="w-11/12 lg:w-10/12 xl:w-9/12 flex justify-center mt-9">
            <div className="bg-white shadow-xl w-11/12 lg:w-10/12 xl:w-9/12 flex gap-3 rounded-full">
                <input type="text" placeholder="Search articles" className="bg-transparent border-r w-full p-3 px-6 outline-none"
                value={searchInput}
                onChange={handleSearch}
                />
                <i className="bi bi-search p-3 pr-5 cursor-pointer"></i>
            </div>
        </div>
            <div className="w-11/12 lg:w-10/12 xl:w-9/12 flex flex-col lg:grid lg:grid-cols-2 gap-9 mt-9 mb-[15vh]">
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
                articleOutput.length > 0 ?
                articleOutput?.map((article, key) => (
                    <Link to={`/article/${article.id}`} key={key} className="bg-gray-100 rounded-xl flex flex-col w-full p-5 py-6 shadow-lg">
                        <div className="flex flex-col w-full gap-4">
                            <div className="flex justify-between w-full items-center">
                            <h4 className="font-bold">{article.title}</h4>
                            <p className="">{article.date}</p>
                                                   
                            </div>

                            <div className="bg-blue-900 text-white p-2 px-4 rounded-lg  small w-[150px] text-center">Read Article</div>
                            
                        </div>
                    </Link> 
                  
                )) : 
                <p className="p-3 text-gray-500 bg-gray-100 rounded-xl">Empty List</p>
            }
            {
            }
        </div>
    </div>
    )
}