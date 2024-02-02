import axios from 'axios'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'

function App() {
  
  return (
    <>
      <NavBar/>
      <RouterProvider router={ router } />
      <Footer/>
    </>
  )
}

export default App
