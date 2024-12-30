import './App.css'
import Home from './Components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Components/User Login/Login'
import Signup from './Components/User Registration/Signup'
import EmailVerification from './Components/User Registration/EmailVerification'
import PasswordSet from './Components/User Registration/PasswordSet'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup'>
            <Route index element={<Signup />}></Route>
            <Route path='email-verify' element={<EmailVerification />}></Route>
            <Route path='password-set' element={<PasswordSet />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
