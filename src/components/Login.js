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
            <div className="loginNavbar">
                <div className="leftLoginNavbar">
                    <img src="/icon.png" alt="logo" />
                    <h2>Gmail</h2>
                </div>
                <div className="rightLoginNavbar">
                    <button className='lgScreen'>For work</button>
                    <button className='signinAccountBtn' onClick={login}>Sign in</button>
                    <button className='createAccountBtn' onClick={login}>Create an account</button>
                </div>
            </div>

            <div className="loginBody">
                <div className="leftLoginBody">
                    <h2>Secure, smart, and easy to use email</h2>
                    <img src="/gmail.png" alt="" className='loginImage' />
                    <p>Get more done with Gmail. Now integrated with Google Chat, Google Meet, and more, all in one place.</p>
                    <div className="rightLoginNavbar">
                        <button className='createAccountBtn' onClick={login}>Create an account</button>
                        <button className='signinAccountBtn' onClick={login}>Sign in</button>
                    </div>
                </div>
                <div className="rightLoginBody">
                    <img src="/front.webp" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Login
