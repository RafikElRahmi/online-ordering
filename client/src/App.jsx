import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import { Auth } from './context/useAuth'

function App() {
  
  return (
    <Auth>
      <NavBar/>
      <RouterProvider router={ router } />
      <Footer/>
    </Auth>
  )
}

export default App
