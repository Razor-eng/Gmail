import { useEffect, useState } from 'react'
import './css/EmailList.css'
import EmailListSetting from './EmailListSetting'
import EmailType from './EmailType'
import EmailBody from './EmailBody'
import { useSelector } from 'react-redux'
import { selectPrimary, selectPromotions, selectSocial } from '../features/mailSlice'
import { db } from '../firebase';
import { selectInbox, selectSent, selectUser } from '../features/userSlice'

function EmailList() {
    const Primary = useSelector(selectPrimary)
    const Social = useSelector(selectSocial)
    const Promotions = useSelector(selectPromotions)
    const [userEmails, setUserEmails] = useState([]);
    const [sentEmails, setSentEmails] = useState([]);
    const sent = useSelector(selectSent)
    const inbox = useSelector(selectInbox)
    const user = useSelector(selectUser);

    useEffect(() => {
        db.collection("emails").orderBy('timestamp', 'desc').onSnapshot(snap => {
            setUserEmails(snap.docs.filter(email => (
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
        <div className='emaillist'>
            <EmailListSetting />
            <EmailType />
            {/* {
                Primary &&
                emails.map(({ id, data }) => {
                    return (
                        inbox ?
                            ((data.from !== user.email) && (data.to === user.email)) &&
                            < EmailBody key={id} email={data.from} name={data.fromName} subject={data.subject} message={data.message} time={new Date(data.timestamp?.seconds * 1000).toLocaleTimeString()} />
                            :
                            sent && (data.from === user.email) &&
                            < EmailBody key={id} email={data.from} name={data.fromName} subject={data.subject} message={data.message} time={new Date(data.timestamp?.seconds * 1000).toLocaleTimeString()} />
                    )
                })
            } */}
            {Primary && (
                inbox ? (
                    userEmails.length > 0 ? (
                        userEmails.map(({ id, data }) => {
                            return (
                                < EmailBody key={id} email={data.from} name={data.fromName} subject={data.subject} message={data.message} time={new Date(data.timestamp?.seconds * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })} photoUrl={data?.fromPhotoUrl} />
                            )
                        })
                    ) : (
                        <div className="nodata">
                            <h4>No Inbox mails to display</h4>
                        </div>
                    )
                ) : (
                    sent && sentEmails.length > 0 ? (
                        sentEmails.map(({ id, data }) => {
                            return (
                                < EmailBody key={id} email={data.from} name={data.fromName} subject={data.subject} message={data.message} time={new Date(data.timestamp?.seconds * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })} photoUrl={data?.fromPhotoUrl} />
                            )
                        })
                    ) : (
                        sent &&
                        <div className="nodata">
                            <h4>No Sent mails to display</h4>
                        </div>
                    )
                )
            )
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
                !inbox && !sent && !Social && !Promotions &&
                <div className="nodata">
                    <h4>No mail to display</h4>
                </div>
            }
        </div >
    )
}

export default EmailList
