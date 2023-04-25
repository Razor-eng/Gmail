import React from 'react'
import './css/Login.css'
import { auth, provider } from '../firebase'
import { signin } from '../features/userSlice'
import { useDispatch } from 'react-redux'

function Login() {
    const dispatch = useDispatch();

    const login = () => {
        auth.signInWithPopup(provider).then(({ user }) => {
            dispatch(signin({
                displayName: user.displayName,
                photoUrl: user.photoURL,
                email: user.email
            }))
        }).catch(err => {
            alert(err);
        })
    }
    return (
        <div className='login'>
            <div className="logo">
                <img src="/gmail.png" alt="" />
                <button onClick={login} className="login-btn">Login with Google</button>
            </div>
        </div>
    )
}

export default Login
