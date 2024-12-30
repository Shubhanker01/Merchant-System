import './App.css'
import Home from './Components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import Signup from './Components/User Registration/Signup'
import EmailVerification from './Components/User Registration/EmailVerification'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/email-verification' element={<EmailVerification />}></Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
