import { IconButton } from '@material-ui/core'
import { ArrowDropDown, CheckBoxOutlineBlank, ChevronLeft, ChevronRight, MoreVert, Refresh } from '@material-ui/icons'
import React from 'react'

function EmailListSetting() {
    return (
        <div className='settings'>
            <div className="emailleft">
                <IconButton>
                    <CheckBoxOutlineBlank />
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
    )
}

export default EmailListSetting
