import './App.css'
import Home from './Components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './Components/User Login/Login'
import Signup from './Components/User Registration/Signup'
import EmailVerification from './Components/User Registration/EmailVerification'
import PasswordSet from './Components/User Registration/PasswordSet'
import MainApp from './Components/Main App/MainApp'

function App() {

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup'>
            <Route index element={<Signup />}></Route>
            <Route path='email-verify' element={<EmailVerification />}></Route>
            <Route path='password-set' element={<PasswordSet />}></Route>
          </Route>
          <Route path='/main-app/:userId' element={<MainApp />}></Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
