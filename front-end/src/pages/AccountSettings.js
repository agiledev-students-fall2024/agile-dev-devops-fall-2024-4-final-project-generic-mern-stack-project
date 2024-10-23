import React, { useState, useEffect } from "react"
import axios from "axios"
import TitleAndDescription from '../components/TitleAndDescription'
import NavigationBar from '../components/NavigationBar'
import AccountInfo from '../components/AccountInfo'

const AccountSettings = (props) => {
    const [data, setData] = useState([])

    const deactivatePopup = () => {
        // toggle deactivation popup here
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

    return (
        <>
            <TitleAndDescription
                title={props.text}
                description={"See your account information like your email and password."}
            />

            <h2>Account Information</h2>

            <AccountInfo title={"Username"} text={data.username}/>
            <AccountInfo title={"Name"} text={data.name}/>
            <AccountInfo title={"Email"} text={data.email}/>
            <AccountInfo title={"Password"} text={data.password}/>

            <h2>Deactivate Account</h2>
            <p onClick={deactivatePopup()}>Delete your data and account</p>
            <NavigationBar />
        </>
    )
}

export default AccountSettings