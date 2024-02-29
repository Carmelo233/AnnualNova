import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { HomePage } from "./HomePage/HomePage"
import { MainPage } from './MainPage/MainPage'
import { Login } from './Login/LoginCard'
import { SignUp } from './SignUp/SignUpCard'
import React from 'react'

//装了 react-router-dom,antd,@ant-design/icons

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact Component={HomePage}></Route>
        <Route path="/mainpage" exact Component={MainPage}></Route>
        <Route path="/login" exact Component={Login}></Route>
        <Route path="/signup" exact Component={SignUp}></Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App
