import { useContext } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../App"
import { Links } from "../assets/Constants"

export const Footer = () => {
    const { mediumScreen, currentNav } = useContext(AppContext)
    return(
        <>
        <div className="w-full my-9 flex flex-col items-center justify-center gap-3 bg-gray-100">
                <div className="flex justify-between w-fit flex-col items-center gap-3 p-3 ">
                    <h3 className="text-2xl text-center px-9 shadow-xl p-3 rounded-xl">Contact Us</h3>
                    <div className="flex gap-5 text-xl">
                        <a href="https://www.facebook.com/profile.php?id=100088523837394"> <i className="bi bi-facebook"></i></a>
                        <a href="https://instagram.com/Christ_liberty?igshid=YmMyMTA2M2Y"> <i className="bi bi-instagram"></i></a>
                    </div>
                </div>

                <div className={`flex gap-7 flex-col mb-9 ${mediumScreen ? ' w-11/12' : 'w-5/12'}`}>
                    <div className="flex gap-3 mt-5">
                        <i className="bi bi-geo"></i>

                        <div className="flex flex-col">
                            <p className="text-xl">Address</p>
                            <p className="text-gray-800 small-lg">21, (wing A) Zone 1, Oriyanrin, Adogba Area, Monatan, Ibadan, oyo State, Nigeria.</p>
                        </div>
                    </div>
                    <form action="" className={`w-full shadow-xl rounded-xl flex flex-col gap-2 items-center py-9 px-5`}>
                        <p className="text-xl text-center">Send us a message</p>
                        
                            <div className="flex flex-col rounded-xl  gap-2 my-2  w-full">
                                {/* <label htmlFor="">Name</label> */}
                                <input type="text" placeholder="Full Name" className="p-3 rounded-lg bg-gray-100 outline-none shadow-lg"/>
                            </div>
                            <div className="flex flex-col rounded-xl my-2 gap-2 w-full">
                                {/* <label htmlFor="">Email</label> */}
                                <input type="text" placeholder="Email" className="rounded-lg p-3 bg-gray-100 outline-none shadow-lg"/>
                            </div>
                            <div className="flex flex-col rounded-xl  gap-2 w-full">
                                {/* <label htmlFor="">Message</label> */}
                                <textarea type="text" placeholder="Message" className="rounded-lg p-3 bg-gray-100 outline-none shadow-lg" style={{
                                    // minHeight: 20+'vh',
                                    // maxHeight: 20+'vh',
                                }}/>
                            </div>
                        <input type="submit" value="Send Message" className="bg-blue-900 text-white rounded-lg mt-2 w-11/12 p-2"/>
                    </form>
                </div>

        </div>
       
        <div className="flex items-center justify-center w-full bg-blue-900 pt-[10vh] text-white flex-col">
            <div className="flex flex-col w-11/12 lg:w-10/12 gap-2">
                <h3 className="text-2xl border-b mb-9">Quick Links</h3>
                <div className="flex flex-col gap-3 px-5">

                    {
                        Links.map((link, key ) => (
                            <Link key={key} to={`/${link.link}`}  className={`${currentNav == key ? 'font-bold' : ''}`}>{link.name}</Link>
                        ))
                    }
                </div>
            </div>
           

            <div className="mt-9 border-t py-5 w-full flex items-center gap-3 justify-center ">
                &copy; <span className="font-bold text-xl">CLASS</span> 2023
            </div>
        </div>
        </>

    )
}