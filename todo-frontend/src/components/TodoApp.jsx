import { useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate, useParams, Link, Navigate } from 'react-router-dom';
import LogoutComponent from './LogoutComponent'
import LoginComponent from './LoginComponent';
import HeaderComponent from './HeaderComponent';
import ListTodosComponent from './ListTodosComponent';
import WelcomeComponent from './WelcomeComponent';
import ErrorComponent from './ErrorComponent';
import AuthProvider, { useAuth } from './security/AuthContext'
import './TodoApp.css'
import TodoComponent from './TodoComponent';


function AuthenticatedRoute({ children }) {
    const authContext = useAuth()
    if (authContext.isAuthenticated) return children;
    return <Navigate to="/" ></Navigate>
}

export default function TodoApp() {
    return (
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter >
                    <HeaderComponent />
                    <Routes>
                        <Route path='/' element={<LoginComponent />} />
                        <Route path='/login' element={<LoginComponent />} />


                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute >
                                <WelcomeComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/todos' element={

                            <AuthenticatedRoute >
                                <ListTodosComponent />
                            </AuthenticatedRoute>}
                        />

                        <Route path='/todo/:id' element={
                            <AuthenticatedRoute >
                                <TodoComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path="/logout" element={
                            <AuthenticatedRoute>
                                <LogoutComponent />
                            </AuthenticatedRoute>
                        } />

                        {/* error route should be at the last */}
                        <Route path='/*' element={<ErrorComponent />} />
                    </Routes>
                    {/* <FooterComponent /> */}
                </BrowserRouter>
            </AuthProvider>

        </div>
    )
}













