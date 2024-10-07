import { CheckBoxOutlineBlank, CheckBoxOutlined, Label, LabelOutlined, Star, StarBorder } from '@material-ui/icons'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { openMessage } from '../features/mailSlice'
import { Avatar } from '@material-ui/core'

function EmailBody({ name, subject, message, time, email, photoUrl }) {
    const [check, setCheck] = useState(false)
    const [star, setStar] = useState(false)
    const [label, setLabel] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const setMail = () => {
        dispatch(openMessage({
            name,
            subject,
            message,
            email,
            time,
            photoUrl
        }));
        navigate('/mail');
    }

    return (
        <div className='emailBody' >
            <div className="emailBody-left">
                <div onClick={() => setCheck(!check)}>
                    {check ?
                        <CheckBoxOutlined />
                        :
                        <CheckBoxOutlineBlank />
                    }
                </div>
                <div onClick={() => setStar(!star)}>
                    {star ?
                        <Star style={{ color: '#ffd700' }} />
                        :
                        <StarBorder />
                    }
                </div>
                <div onClick={() => setLabel(!label)}>
                    {label ?
                        <Label />
                        :
                        <LabelOutlined />
                    }
                </div>
                <div className="UserData">
                    <Avatar src={photoUrl} />
                    <h4 onClick={setMail}>{name}</h4>
                </div>
            </div>
            <div className="emailBody-middle" onClick={setMail}>
                <div className="msg">
                    <p><b>{subject}&nbsp;</b>-&nbsp;{message}</p>
                </div>
                <div className="UserDataSm" onClick={setMail}>
                    <Avatar src={photoUrl} />
                    <div className="mailDetails">
                        <h4 >{name}</h4>
                        <h5>{message}</h5>
                    </div>
                </div>
            </div>
            <div className="emailBody-right">
                <p>{time}</p>
            </div>
        </div >
    )
}

export default EmailBody
