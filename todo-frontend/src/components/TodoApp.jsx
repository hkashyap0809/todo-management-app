import { useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate, useParams, Link } from 'react-router-dom';
import LogoutComponent from './LogoutComponent'
import LoginComponent from './LoginComponent';
import HeaderComponent from './HeaderComponent';
import ListTodosComponent from './ListTodosComponent';
import WelcomeComponent from './WelcomeComponent';
import ErrorComponent from './ErrorComponent';
import './TodoApp.css'

export default function TodoApp() {
    return (
        <div className="TodoApp">

            <BrowserRouter >
                <HeaderComponent />
                <Routes>

                    <Route path='/' element={<LoginComponent />} />
                    <Route path='/login' element={<LoginComponent />} />
                    <Route path='/welcome/:username' element={<WelcomeComponent />} />
                    <Route path='/todos' element={<ListTodosComponent />} />
                    <Route path="/logout" element={<LogoutComponent />} />
                    {/* error route should be at the last */}
                    <Route path='/*' element={<ErrorComponent />} />
                </Routes>
                {/* <FooterComponent /> */}
            </BrowserRouter>

        </div>
    )
}
















