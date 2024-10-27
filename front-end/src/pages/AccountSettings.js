import React, { useState, useEffect } from "react"
import axios from "axios"
import TitleAndDescription from '../components/TitleAndDescription'
import NavigationBar from '../components/NavigationBar'
import AccountInfo from '../components/AccountInfo'
import './AccountSettings.css'
import { Link } from 'react-router-dom';

const AccountSettings = (props) => {
    const [data, setData] = useState([])
    const [popup, setPopup] = useState(false)

    // keep track of state of popup
    const closePopup = () => {
        setPopup(false)
    }

    const openPopup = () => {
        setPopup(true)
    }

    useEffect(() => {
        // fetch data
        axios("https://my.api.mockaroo.com/user.json?key=baec6df0")
            .then(response => {
                setData(response.data)
            })
            .catch(err => {
                console.log(`No more requests allowed.`)
                console.error(err)
            })
    }, [])

    // if user did not click the link to the popup: render normally
    if (!popup) {
        return (
            <>
                <TitleAndDescription
                    title={props.text}
                    description={"See your account information like your email and password."}
                />

                <h2>Account Information</h2>

                <div className="account">
                    <AccountInfo title={"Username"} text={data.username} />
                    <AccountInfo title={"Name"} text={data.name} />
                    <AccountInfo title={"Email"} text={data.email} />
                    <AccountInfo title={"Password"} text={data.password} />
                </div>
                <h2>Deactivate Account</h2>
                <p className="delete-link" onClick={openPopup}>Delete your data and account</p>

                <NavigationBar />
            </>
        )
    }
    // open popup window for deactivation information
    else {
        return (
            <>
                <TitleAndDescription
                    title={props.text}
                    description={"See your account information like your email and password."}
                />

                <h2>Account Information</h2>

                <AccountInfo title={"Username"} text={data.username} />
                <AccountInfo title={"Name"} text={data.name} />
                <AccountInfo title={"Email"} text={data.email} />
                <AccountInfo title={"Password"} text={data.password} />

                <h2>Deactivate Account</h2>
                <p className="delete-link" onClick={openPopup}>Delete your data and account</p>
                <div className="Popup-box">
                    <div className="content">
                        <p className="Popup-title">Are you sure you want to deactivate?</p>
                        <p className="Popup-text">Lorem ipsum odor amet, consectetuer adipiscing elit.</p>
                        <div className="buttons">
                            <Link to={'/signup'}><p className="Deactivate-yes">Deactivate my account</p></Link>
                            <p className="Close-button" onClick={closePopup}>Cancel</p>
                        </div>
                    </div>
                </div>
                <NavigationBar />
            </>
        )
    }
}

export default AccountSettings