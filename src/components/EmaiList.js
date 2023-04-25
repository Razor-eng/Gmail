import React, { useEffect, useState } from 'react'
import './css/EmaiList.css'
import EmailListSetting from './EmaiListSetting'
import EmailType from './EmailType'
import EmailBody from './EmailBody'
import { useSelector } from 'react-redux'
import { selectPrimary, selectPromotions, selectSocial } from '../features/mailSlice'
import { db } from '../firebase';
import { selectInbox, selectSent, selectUser } from '../features/userSlice'

function EmaiList() {
    const Primary = useSelector(selectPrimary)
    const Social = useSelector(selectSocial)
    const Promotions = useSelector(selectPromotions)
    const [emails, setEmails] = useState([]);
    const sent = useSelector(selectSent)
    const inbox = useSelector(selectInbox)
    console.log(inbox)
    console.log(sent)
    useEffect(() => {
        db.collection("emails").orderBy('timestamp', 'desc').onSnapshot(snap => {
            setEmails(snap.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])
    const user = useSelector(selectUser);
    // console.log(user)
    return (
        <div className='emaillist'>
            <EmailListSetting />
            <EmailType />
            {
                Primary &&
                emails.map(({ id, data }) => {
                    return (
                        inbox ? (data.from !== user.email) &&
                            < EmailBody key={id} email={data.from} name={data.fromName} subject={data.subject} message={data.message} time={new Date(data.timestamp?.seconds * 1000).toLocaleTimeString()} />
                            :
                            sent && (data.from === user.email) &&
                            < EmailBody key={id} email={data.from} name={data.fromName} subject={data.subject} message={data.message} time={new Date(data.timestamp?.seconds * 1000).toLocaleTimeString()} />
                    )
                })
            }
            {Social &&
                <div className="nodata">
                    <h4>No Social mail to display</h4>
                </div>
            }
            {Promotions &&
                <div className="nodata">
                    <h4>No promotional mail to display</h4>
                </div>
            }
            {
                !inbox && !sent &&
                <div className="nodata">
                    <h4>No mail to display</h4>
                </div>
            }
        </div >
    )
}

export default EmaiList
