import React from 'react'

function SidebarOptions({ Icon, title, number, isactive, notImportant }) {
    return (
        <div className={`options ${isactive && 'active'} ${notImportant ? 'hide' : 'show'} `}>
            <Icon />
            <h4>{title}</h4>
            <p>{number}</p>
        </div>
    )
}

export default SidebarOptions
