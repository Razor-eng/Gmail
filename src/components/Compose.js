import { useState } from 'react'
import './css/Compose.css'
import { ArrowDropDown, AttachFile, Close, Create, Delete, FormatColorText, Height, InsertEmoticon, Link, MoreVert, NoteAdd, PhonelinkLock, Photo, Remove } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { closeSendMessage } from '../features/mailSlice';
import { db } from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { selectUser } from '../features/userSlice';

function Compose() {
    const [to, setTo] = useState("");
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const formSubmit = (e) => {
        e.preventDefault();
        if (to === '') {
            return alert('Email is required');
        }
        if (subject === '') {
            return alert('Subject is required');
        }
        if (message === '') {
            return alert('Message is required');
        }
        db.collection('emails').add({
            to,
            subject,
            message,
            from: user.email,
            fromName: user.displayName,
            fromPhotoUrl: user.photoUrl,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        setTo(" ");
        setSubject(" ");
        setMessage(" ");
        dispatch(closeSendMessage());
        alert('Email sent successfully');
    }
    return (
        <div className='Compose'>
            <div className="compose-header">
                <div className="compose-header-left">
                    <span>New Message</span>
                </div>
                <div className="compose-header-right">
                    <div onClick={() => dispatch(closeSendMessage())}>
                        <Remove />
                    </div>
                    <Height />
                    <div onClick={() => dispatch(closeSendMessage())}>
                        <Close />
                    </div>
                </div>
            </div>
            <form onSubmit={formSubmit}>
                <div className="compose-body">
                    <div className="body-form">
                        <input type="email" placeholder='Reciepents' value={to} onChange={(e) => setTo(e.target.value)} />
                        <input type="text" placeholder='Subject' value={subject} onChange={(e) => setSubject(e.target.value)} />
                        <textarea rows="20" onChange={(e) => setMessage(e.target.value)}>{message}</textarea>
                    </div>
                </div>

                <div className="compose-footer">
                    <div className="compose-footer-left">
                        <button type='submit'>
                            Send <ArrowDropDown />
                        </button>
                    </div>
                    <div className="compose-footer-right">
                        <FormatColorText />
                        <AttachFile />
                        <Link />
                        <InsertEmoticon />
                        <NoteAdd />
                        <Photo />
                        <PhonelinkLock />
                        <Create />
                        <MoreVert />
                        <Delete />
                    </div>
                </div>
            </form>
        </div >
    )
}

export default Compose
