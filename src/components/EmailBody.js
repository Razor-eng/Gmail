import { CheckBoxOutlineBlank, CheckBoxOutlined, Label, LabelOutlined, Star, StarBorder } from '@material-ui/icons'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { openMessage } from '../features/mailSlice'

function EmailBody({ name, subject, message, time, email }) {
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
            time
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
                <h4 onClick={setMail}>{name}</h4>
            </div>
            <div className="emailBody-middle" onClick={setMail}>
                <div className="msg">
                    <p><b>{subject}&nbsp;</b>-&nbsp;{message}</p>
                </div>
            </div>
            <div className="emailBody-right">
                <p>{time}</p>
            </div>
        </div >
    )
}

export default EmailBody
