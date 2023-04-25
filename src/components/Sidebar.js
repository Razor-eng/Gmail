import React, { useState } from 'react'
import './css/Sidebar.css'
import { Button } from '@material-ui/core'
import { Add, Delete, Drafts, ExpandLess, ExpandMore, FindInPage, Inbox, Keyboard, Label, LabelImportant, Send, StarRate, Videocam, WatchLater } from '@material-ui/icons'
import SidebarOptions from './SidebarOptions'
import { useDispatch } from 'react-redux'
import { openSendMessage } from '../features/mailSlice'
import { inboxTrue, restTrue, sentTrue } from '../features/userSlice'

function Sidebar() {
    const [notImportant, setNotImportant] = useState(true)
    const [index, setIndex] = useState(true)
    const [shared, setShared] = useState(false)
    const [snoozed, setSnoozed] = useState(false)
    const [important, setImportant] = useState(false)
    const [sent, setSent] = useState(false)
    const [drafts, setDrafts] = useState(false)
    const dispatch = useDispatch();
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
    return (
        <div className="sidebar">
            <Button startIcon={<Add />} className='compose' onClick={() => dispatch(openSendMessage())}>Compose</Button>

            <div onClick={() => myFunc2('Inbox')}>
                <SidebarOptions Icon={Inbox} title="Inbox" number={224} isactive={index} />
            </div>
            <div onClick={() => myFunc2('Starred')}>
                <SidebarOptions Icon={StarRate} title="Starred" number={500} isactive={shared} />
            </div>
            <div onClick={() => myFunc2('Snoozed')}>
                <SidebarOptions Icon={WatchLater} title="Snoozed" number={452} isactive={snoozed} />
            </div>
            <div onClick={() => myFunc2('Important')}>
                <SidebarOptions Icon={LabelImportant} title="Important" number={300} isactive={important} />
            </div>
            <div onClick={() => myFunc2('Sent')}>
                <SidebarOptions Icon={Send} title="Sent" number={254} isactive={sent} />
            </div>
            <div onClick={() => myFunc2('Drafts')}>
                <SidebarOptions Icon={Drafts} title="Drafts" number={220} isactive={drafts} />
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
