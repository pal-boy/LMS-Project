import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage.jsx'
import AboutUs from './Pages/AboutUs.jsx'
import NotFoundPage from './Pages/NotFoundPage.jsx'
import Signup from './Pages/Signup.jsx'
import Login from './Pages/Login.jsx'
import AllCourseList from './Pages/Course/AllCourseList.jsx'
import Contact from './Pages/Contact.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element= {<HomePage/>}/>
        <Route path='/about' element= {<AboutUs/>}/>
        <Route path='/contact' element= {<Contact/>}/>
        <Route path='/courses' element= {<AllCourseList/>}/>
        <Route path='/signup' element= {<Signup/>}/>
        <Route path='/login' element= {<Login/>}/>
        <Route path='*' element= {<NotFoundPage/>}/>
      </Routes>
    </>
  )
}

export default App
