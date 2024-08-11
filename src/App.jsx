import { useState, createContext, useEffect } from 'react'
import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom';
import { Home } from './pages/Home'
import { Navbar } from './components/Navbar'
import './index.css'
import { HelmetProvider} from 'react-helmet-async'
import { Footer } from './components/Footer';
import { Sermons } from './pages/Sermons';
import { Articles } from './pages/Articles';
import { Gallery } from './pages/Gallery';
import { EachArticle } from './pages/EachArticle';
import { ZoomedImage } from './components/ZoomedImage';
import './components/Animate.css'

export const AppContext = createContext()

const Layout = () =>{
  const [ currentNav, setCurrentNav ] = useState(0)  
  const [ showNav, setShowNav ] = useState(false)  
  const [ showZoom, setShowZoom ] = useState(false)
  const [ imageSource, setImageSource ] = useState('')
  
  // const  dbLocation = 'http://localhost:80/classAPI'
  const  dbLocation = 'https://christlibertyassembly.org.ng/classAPI'
  
  
  document.querySelectorAll('a').forEach((a) =>{
    a.addEventListener('click', () =>{
      setShowNav(false)
      
    })
  })

  

  return(
    <div className='app '>
      <AppContext.Provider value={{currentNav, setCurrentNav, showZoom, setShowZoom, imageSource, setImageSource, showNav, setShowNav, dbLocation }}>

          <HelmetProvider>
          <div className='d-flex w-full'>
            <Navbar/>
            <Outlet />

            {/* toggling component for zoomed image */}
            {
              showZoom ?  
              <ZoomedImage /> : ''
            }
            <Footer />
          </div>
          </HelmetProvider>
     
      </AppContext.Provider>
    </div>
  )
  
}

// app router for navigation

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children:[
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/sermons',
        element: <Sermons />
      },
      {
        path: '/articles',
        element: <Articles />
      },
      {
        path: '/article/:id',
        element: <EachArticle />
      },
      {
        path: '/gallery',
        element: <Gallery />
      },
      {
        path: '/*',
        element: <h4 className='parent' style={{
          marginTop: 100+'px',
          marginLeft: 50+'px'
        }}>Page not found <Link to='/'>return to the home page</Link></h4>
      }
    ]
  }
])

function App() {
  

  return (
    <div className='App'>
      <div>
        <RouterProvider router={router} />

      </div>
    </div>
  );


}
export default App;
         
