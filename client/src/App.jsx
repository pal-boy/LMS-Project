import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage.jsx'
import AboutUs from './Pages/AboutUs.jsx'
import NotFoundPage from './Pages/NotFoundPage.jsx'
import Signup from './Pages/Signup.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element= {<HomePage/>}/>
        <Route path='/about' element= {<AboutUs/>}/>
        <Route path='/signup' element= {<Signup/>}/>
        <Route path='*' element= {<NotFoundPage/>}/>
      </Routes>
    </>
  )
}

export default App
