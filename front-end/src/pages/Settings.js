import React from "react"
import SearchBar from '../components/SearchBar'
import NavigationBar from '../components/NavigationBar'
import TitleAndDescriptionBox from '../components/TitleAndDescriptionBox'
import './Settings.css'

const Settings = () => {
    return (
        <>
            <h1>Settings</h1>

            <SearchBar />

            <TitleAndDescriptionBox
                link={"/account-settings"}
                title={"Account Settings"}
                description={"See information about your account and learn about your deactivation settings."}
            />
            <TitleAndDescriptionBox
                link={"/privacy"}
                title={"Privacy"}
                description={"Manage the accounts, communities, and words that you've muted or blocked."}
            />
            <TitleAndDescriptionBox
                link={"/accessibility"}
                title={"Accessibility"}
                description={"Manage how Seraphim content is displayed to you."}
            />

            <NavigationBar />
        </>
    )
}

export default Settings