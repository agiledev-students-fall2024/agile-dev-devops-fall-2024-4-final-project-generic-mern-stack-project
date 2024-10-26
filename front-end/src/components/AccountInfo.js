import React from "react"
import './AccountInfo.css'

const AccountInfo = (props) => {
    return (
        <div className="content">
            <div className="account-info">
                <p className="title">{props.title}</p>
                <p className="text">{props.text}</p>
            </div>
        </div>
    )
}
export default AccountInfo