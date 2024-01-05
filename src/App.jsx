import { useState, createContext, useEffect } from 'react'
import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom';
import './App.css'
import { Home } from './pages/Home'
import { Navbar } from './components/Navbar'
import './index.css'
import { Helmet, HelmetProvider} from 'react-helmet-async'
// import { Alert } from './Components/Alert'
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
  const [ smallScreen, setSmallScreen ] = useState(false)  
  const [ mediumScreen, setMediumScreen  ] = useState(false)
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

  useEffect(() =>{
    setInterval(() => {
      const mediaQuery = window.matchMedia('(max-width:950px)');
      setMediumScreen(mediaQuery.matches);
      
      const handleMediaQueryChange = (event) =>{
        setMediumScreen(event.matches)
      }
      mediaQuery.addEventListener('change', handleMediaQueryChange)
      
      
      return () =>{
        mediaQuery.removeEventListener('change', handleMediaQueryChange)
      }
    }, 200);

    setInterval(() => {

      const mediaQuery = window.matchMedia('(max-width:500px)');
      setSmallScreen(mediaQuery.matches);
      
      const handleMediaQueryChange = (event) =>{
        setSmallScreen(event.matches)
      }
      mediaQuery.addEventListener('change', handleMediaQueryChange)
      
      
      return () =>{
        mediaQuery.removeEventListener('change', handleMediaQueryChange)
      }
    }, 200);
    
  }, [])
  

  return(
    <div className='app '>
      <AppContext.Provider value={{currentNav, setCurrentNav, smallScreen, mediumScreen , showZoom, setShowZoom, imageSource, setImageSource, showNav, setShowNav, dbLocation }}>

          <HelmetProvider>
          <div className='d-flex w-full'>
            <Navbar mediumScreen={mediumScreen} smallScreen={smallScreen} />
            <Outlet />
            {
              showZoom ?  
              <ZoomedImage /> : ''
            }
            {/* {
              showALert ? 
              <Alert alertMessage={alertMessage} alertType={alertType} setShowAlert={setShowAlert}/> : ''
            } */}
            <Footer />
          </div>
          </HelmetProvider>
     
      </AppContext.Provider>
    </div>
  )
  
}

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
         
