import React, { useState, useEffect } from "react"
import axios from "axios"
import TitleAndDescription from '../components/TitleAndDescription'
import NavigationBar from '../components/NavigationBar'
import AccountInfo from '../components/AccountInfo'
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
    if (popup) {
        return (
            <div className="w-[90%] flex flex-col justify-center items-center gap-8 p-8 m-[auto]">
                <TitleAndDescription
                    title={props.text}
                    description={"See your account information like your email and password."}
                />

                <div className="flex flex-col justify-center items-center w-[100%] mx-auto gap-2 bg-lavender_blush-900 p-6 rounded-md shadow-md shadow-ebony-900 md:w-[80%] lg:w-[60%]">
                    <h2 className="text-xl text-ebony-600 text-center mb-2">Account Information</h2>
                    <AccountInfo title={"Username"} text={data.username} />
                    <AccountInfo title={"Name"} text={data.name} />
                    <AccountInfo title={"Email"} text={data.email} />
                    <AccountInfo title={"Password"} text={data.password} />
                </div>

                <div className="bg-lavender_blush-900 rounded-md w-[100%] m-6 p-8 shadow-md shadow-ebony-900 md:w-[80%] lg:w-[50%]">
                    <p className="text-ebony-700 font-bold text-center mb-5">Are you sure you want to deactivate?</p>
                    <p className="mb-5 text-ebony text-center w-[85%] m-auto py-2">Deactivation of your account is a permanent action and cannot be undone. Once deactivated, you will be unable to recover your Seraphim account, and all associated data will be permanently deleted.</p>
                    <div className="flex flex-row justify-between">
                        <Link to={'/signup'}><p className="text-rose font-bold hover:text-ebony hover:border-ebony border-[1px] border-rose p-2 rounded-md">Deactivate</p></Link>
                        <p className="text-ebony cursor-pointer font-bold hover:text-rose hover:border-rose border-[1px] border-ebony py-2 px-4 rounded-md" onClick={closePopup}>Cancel</p>
                    </div>
                </div>
                <NavigationBar />
            </div>
        )
    }
    // open popup window for deactivation information
    else {
        return (
            <div className="w-[90%] flex flex-col justify-center items-center gap-8 p-8 m-[auto]">
                <TitleAndDescription
                    title={props.text}
                    description={"See your account information like your email and password."}
                />

                <div className="flex flex-col justify-center items-center w-[100%] mx-auto gap-2 bg-lavender_blush-900 p-6 rounded-md shadow-md shadow-ebony-900 md:w-[80%] lg:w-[60%]">
                    <h2 className="text-xl text-ebony-600 text-center mb-2">Account Information</h2>
                    <AccountInfo title={"Username"} text={data.username} />
                    <AccountInfo title={"Name"} text={data.name} />
                    <AccountInfo title={"Email"} text={data.email} />
                    <AccountInfo title={"Password"} text={data.password} />
                </div>

                <div className="w-[60%] flex justify-center md:w-[40%] lg:w-[30%]">
                    <button
                        className="w-[100%] p-2 bg-ebony border-ebony rounded-lg text-rose-700 font-semibold hover:bg-rose-700 hover:text-ebony hover:border-rose-700"
                        onClick={openPopup}>Delete your data and account
                    </button>
                </div>

                <NavigationBar />
            </div>
        )
    }
}

export default AccountSettings