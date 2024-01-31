import axios from 'axios'
import './App.css'
import axiosInstance from './config/axiosConfig'

function App() {
  const tryhard = () => {
    axiosInstance.get("/").then((res)=>console.log(res.data)).catch((err)=>console.log(err))
  }
  return (
    <>
      hello world
      <button onClick={tryhard}>dont click me</button>
    </>
  )
}

export default App
