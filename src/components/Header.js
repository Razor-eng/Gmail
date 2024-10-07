import './css/Header.css'
import { Avatar, Button, IconButton } from '@material-ui/core'
import ReorderIcon from '@material-ui/icons/Reorder'
import { Apps, Close, ExpandMore, HelpOutline, Search, Settings } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { inboxTrue, restTrue, sentTrue, selectUser } from '../features/userSlice'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { useState } from 'react'
import SidebarOptions from './SidebarOptions'
import { Add, Inbox, LabelImportant, Send, StarRate, WatchLater } from '@material-ui/icons'
import { openSendMessage } from '../features/mailSlice'

const Header = () => {
    const [show, setShow] = useState(false);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const myFunc2 = (val) => {
        if (val === 'Inbox') {
            dispatch(inboxTrue())
        } else if (val === 'Sent') {
            dispatch(sentTrue())
        } else {
            dispatch(restTrue())
        }
        setShow(false)
    }

    return (
        <>
            <div className="header">
                <div className="left">
                    <IconButton onClick={() => setShow(true)}>
                        <ReorderIcon />
                    </IconButton>
                    <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png" alt="logo" />
                </div>

                <div className="middle">
                    <div className="search">
                        <IconButton>
                            <Search />
                        </IconButton>
                        <input type="text" placeholder='search mail' />
                        <IconButton>
                            <ExpandMore />
                        </IconButton>
                    </div>
                </div>

                <div className="right">
                    <IconButton className='hiddenSm'>
                        <HelpOutline />
                    </IconButton>
                    <IconButton className='hiddenSm'>
                        <Settings />
                    </IconButton>
                    <IconButton className='hiddenSm'>
                        <Apps />
                    </IconButton>

                    <Avatar src={user?.photoUrl} onClick={() => firebase.auth().signOut()} />
                </div>
            </div>
            {show &&
                <div className="mobileViewSidebar">
                    <div className="area">
                        <div className="closeBtn">
                            <IconButton onClick={() => setShow(false)}>
                                <Close />
                            </IconButton>
                        </div>
                    </div>
                    <div className="sidebarOptions">
                        <div className="composeBtn">
                            <Button startIcon={<Add />} className='compose' onClick={() => { dispatch(openSendMessage()); setShow(false) }}>Compose</Button>
                        </div>

                        <div onClick={() => myFunc2('Inbox')}>
                            <SidebarOptions Icon={Inbox} title="Inbox" />
                        </div>
                        <div onClick={() => myFunc2('Starred')}>
                            <SidebarOptions Icon={StarRate} title="Starred" />
                        </div>
                        <div onClick={() => myFunc2('Snoozed')}>
                            <SidebarOptions Icon={WatchLater} title="Snoozed" />
                        </div>
                        <div onClick={() => myFunc2('Important')}>
                            <SidebarOptions Icon={LabelImportant} title="Important" />
                        </div>
                        <div onClick={() => myFunc2('Sent')}>
                            <SidebarOptions Icon={Send} title="Sent" />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Header
