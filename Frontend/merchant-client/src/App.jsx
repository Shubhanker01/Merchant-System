import './App.css'
import Home from './Components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './Components/User Login/Login'
import Signup from './Components/User Registration/Signup'
import EmailVerification from './Components/User Registration/EmailVerification'
import PasswordSet from './Components/User Registration/PasswordSet'
import MainApp from './Components/Main App/MainApp'
import MessageApp from './Components/Main App/MessageApp'
import MyBids from './Components/Main App/MyBids'
import Projects from './Components/Main App/Projects'
import IndividualProject from './Components/Main App/IndividualProject'
import Notification from './Components/Main App/Notification'

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
          <Route path='/main-app/:userId'>
            <Route index element={<MainApp />}></Route>
            <Route path='message' element={<MessageApp />}></Route>
            <Route path='mybids' element={<MyBids />}></Route>
            <Route path='projects' element={<Projects />}></Route>
            <Route path='projects/:projectId' element={<IndividualProject />}></Route>
            <Route path='notification' element={<Notification />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
