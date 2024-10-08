import './css/EmailList.css'
import { useState } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import { ArrowBack, ArrowDropDown, ChevronLeft, ChevronRight, Close, LabelImportant, Launch, MoreVert, Print, Refresh, Reply, Star, StarBorder } from '@material-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectedMail } from '../features/mailSlice'

function EmailDetail() {
    const navigate = useNavigate();
    const [star, setStar] = useState(false)
    const mail = useSelector(selectedMail);

    return (
        <div className='EmailDetail'>
            <div className="emailDetailBox">
                <div className='settings'>
                    <div className="emailleft">
                        <IconButton>
                            <ArrowBack onClick={() => navigate('/')} />
                        </IconButton>
                        <IconButton>
                            <ArrowDropDown />
                        </IconButton>
                        <IconButton onClick={() => window.location.reload(false)}>
                            <Refresh />
                        </IconButton>
                        <IconButton>
                            <MoreVert />
                        </IconButton>
                    </div>
                    <div className="emailright">
                        <p>1-50 of 10,222</p>
                        <IconButton>
                            <ChevronLeft />
                        </IconButton>
                        <IconButton>
                            <ChevronRight />
                        </IconButton>
                    </div>
                </div>

                <div className="EmailDetail-msg">
                    <div className="EmailDetail-header">
                        <div className="EmailDetail-header-left">
                            <h4>{mail?.subject}</h4>
                            <IconButton>
                                <LabelImportant />
                            </IconButton>
                        </div>
                        <div className="EmailDetail-header-right">
                            <IconButton onClick={() => window.print()}>
                                <Print />
                            </IconButton>

                            <IconButton>
                                <Launch />
                            </IconButton>
                        </div>
                    </div>

                    <div className="EmailDetail-middle">
                        <div className="EmailDetail-middle-left">
                            <IconButton>
                                <Avatar src={mail?.photoUrl} />
                            </IconButton>
                            <div className="mailName">
                                <h4>{mail?.name}</h4>
                                <p>{mail?.email}</p>
                            </div>
                        </div>
                        <div className="EmailDetail-middle-right">
                            <p>{mail?.time}</p>
                            <IconButton className='smHidden' onClick={() => setStar(!star)}>
                                {star ?
                                    <Star style={{ color: '#ffd700' }} />
                                    :
                                    <StarBorder />
                                }
                            </IconButton>

                            <IconButton className='smHidden'>
                                <Reply />
                            </IconButton>

                            <IconButton className='smHidden'>
                                <MoreVert />
                            </IconButton>
                        </div>
                    </div>

                    <div className="EmailDetail-body">
                        <p>{mail?.message}</p>
                    </div>
                </div>
            </div>
            <div className='closeButton' onClick={() => navigate('/')} >
                <Close />
            </div>
        </div >
    )
}

export default EmailDetail
