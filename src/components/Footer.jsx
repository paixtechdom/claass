import { useContext } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../App"
import { Links } from "../assets/Constants"

export const Footer = () => {
    const { currentNav } = useContext(AppContext)
    return(
        <>
        <section className="w-full py-9 flex items-center justify-center gap-3 bg-gray-100">
            <div className="flex flex-col lg:flex-row gap-[50px] py-[12vh] w-11/12 lg:w-10/12 xl:w-9/12">
                <div className="flex flex-col gap-3 p-3 w-full">
                    <div className="flex px-9 shadow-xl p-3 rounded-xl gap-9 items-center w-fit">

                    <h3 className="text-2xl w-fit">Contact Us</h3>

                    <div className="flex gap-5 text-xl">
                        <a href="https://www.facebook.com/profile.php?id=100088523837394"> <i className="bi bi-facebook"></i></a>
                        <a href="https://instagram.com/Christ_liberty?igshid=YmMyMTA2M2Y"> <i className="bi bi-instagram"></i></a>
                    </div>
                    </div>

                    <div className="flex gap-3 mt-5">
                        <i className="bi bi-geo-alt-fill text-xl"></i>

                        <div className="flex flex-col gap-4">
                            <p className="text-xl">Address</p>
                            <p className="text-gray-800 text-sm">21, (wing A) Zone 1, Oriyanrin, Adogba Area, Monatan, Ibadan, oyo State, Nigeria.</p>
                        </div>
                    </div>
                </div>

                <div className={`flex gap-7 flex-col w-full bg-white shadow-xl rounded-3xl`}>
                    
                    <form action="" className={`w-full flex flex-col gap-6 items-center py-9 px-5`}>
                        <p className="text-xl text-center">Send us a message</p>
                        
                            <div className="flex flex-col rounded-xl  gap-2 my-2  w-full">
                                {/* <label htmlFor="">Name</label> */}
                                <input type="text" placeholder="Full Name" className="p-3 rounded-lg bg-gray-100 outline-none shadow-lg"/>
                            </div>
                            <div className="flex flex-col rounded-xl my-2 gap-2 w-full">
                                {/* <label htmlFor="">Email</label> */}
                                <input type="text" placeholder="Email" className="rounded-lg p-3 bg-gray-100 outline-none shadow-lg "/>
                            </div>
                            <div className="flex flex-col rounded-xl my-2 gap-2 w-full">
                                {/* <label htmlFor="">Message</label> */}
                                <textarea type="text" placeholder="Message" className="rounded-lg p-3 bg-gray-100 outline-none shadow-lg" style={{
                                    // minHeight: 20+'vh',
                                    // maxHeight: 20+'vh',
                                }}/>
                            </div>
                        <input type="submit" value="SEND MESSAGE" className="bg-blue-900 text-white rounded-full mt-2 w-full p-4 font-bold"/>
                    </form>
                </div>

            </div>

        </section>
       
        <section className="flex items-center justify-center w-full bg-blue-900 pt-[10vh] text-white flex-col">
            <div className="flex flex-col w-11/12 lg:w-10/12 xl:w-9/12 gap-2">
                <h3 className="text-2xl border-b w-fit mb-6">Links</h3>
                <div className="flex flex-col gap-4 px-5">

                    {
                        Links.map((link, key ) => (
                            <Link key={key} to={`/${link.link}`}  className={`${currentNav == key ? 'font-bold text-xl' : 'text-gray-200'}`}>{link.name}</Link>
                        ))
                    }
                </div>
            </div>
           

            <div className="mt-9 border-t py-9 w-full flex items-center gap-2 justify-center ">
                Copyright &copy; <span className="font-bold text-x">Christ Liberty Assembly</span> {new Date().getFullYear()}
            </div>
        </section>
        </>

    )
}