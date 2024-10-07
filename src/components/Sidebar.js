import { useEffect, useState } from 'react'
import './css/Sidebar.css'
import { Button } from '@material-ui/core'
import { Add, Delete, Drafts, ExpandLess, ExpandMore, FindInPage, Inbox, Keyboard, Label, LabelImportant, Send, StarRate, Videocam, WatchLater } from '@material-ui/icons'
import SidebarOptions from './SidebarOptions'
import { useDispatch, useSelector } from 'react-redux'
import { openSendMessage } from '../features/mailSlice'
import { inboxTrue, restTrue, selectUser, sentTrue } from '../features/userSlice'
import { db } from '../firebase'

function Sidebar() {
    const [notImportant, setNotImportant] = useState(true)
    const [index, setIndex] = useState(true)
    const [shared, setShared] = useState(false)
    const [snoozed, setSnoozed] = useState(false)
    const [important, setImportant] = useState(false)
    const [sent, setSent] = useState(false)
    const [emails, setEmails] = useState([]);
    const [sentEmails, setSentEmails] = useState([]);
    const [drafts, setDrafts] = useState(false)
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const myFunc2 = (val) => {
        setIndex(val === 'Inbox');
        if (val === 'Inbox') {
            dispatch(inboxTrue())
        } else if (val === 'Sent') {
            dispatch(sentTrue())
        } else {
            dispatch(restTrue())
        }
        setShared(val === 'Starred');
        setDrafts(val === 'Drafts')
        setImportant(val === 'Important')
        setSent(val === 'Sent')
        setSnoozed(val === 'Snoozed')
    }

    const myFunc = () => {
        if (notImportant === true) {
            setNotImportant(false);
        } else {
            setNotImportant(true);
        }
    }

    useEffect(() => {
        db.collection("emails").orderBy('timestamp', 'desc').onSnapshot(snap => {
            setEmails(snap.docs.filter(email => (
                (email.data().from !== user.email) && (email.data().to === user.email)
            )).map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
            setSentEmails(snap.docs.filter(email => (
                (email.data().from === user.email)
            )).map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [user.email])

    return (
        <div className="sidebar">
            <Button startIcon={<Add />} className='compose' onClick={() => dispatch(openSendMessage())}>Compose</Button>

            <div onClick={() => myFunc2('Inbox')}>
                <SidebarOptions Icon={Inbox} title="Inbox" number={emails.length} isactive={index} />
            </div>
            <div onClick={() => myFunc2('Starred')}>
                <SidebarOptions Icon={StarRate} title="Starred" number={0} isactive={shared} />
            </div>
            <div onClick={() => myFunc2('Snoozed')}>
                <SidebarOptions Icon={WatchLater} title="Snoozed" number={0} isactive={snoozed} />
            </div>
            <div onClick={() => myFunc2('Important')}>
                <SidebarOptions Icon={LabelImportant} title="Important" number={0} isactive={important} />
            </div>
            <div onClick={() => myFunc2('Sent')}>
                <SidebarOptions Icon={Send} title="Sent" number={sentEmails.length} isactive={sent} />
            </div>
            <div onClick={() => myFunc2('Drafts')}>
                <SidebarOptions Icon={Drafts} title="Drafts" number={0} isactive={drafts} />
            </div>
            <SidebarOptions Icon={Label} title="Category" number={22} notImportant={notImportant} />
            <SidebarOptions Icon={Delete} title="[Map]/Trash" number={24} notImportant={notImportant} />
            <SidebarOptions Icon={FindInPage} title="Documents" number={14} notImportant={notImportant} />
            <div className='expand' onClick={myFunc}>
                {notImportant ?
                    <SidebarOptions Icon={ExpandMore} title="More" />
                    :
                    <SidebarOptions Icon={ExpandLess} title="Hide" />
                }
            </div>

            <hr />

            <h3 className="heading">
                Meet
            </h3>
            <SidebarOptions Icon={Videocam} title={"New meeting"} />
            <SidebarOptions Icon={Keyboard} title={"Join a meeting"} />
        </div>
    )
}

export default Sidebar
