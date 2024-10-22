import React from 'react'
import SearchBar from './components/SearchBar'
import NavigationBar from './components/NavigationBar'
import TitleAndDescriptionBox from './components/TitleAndDescriptionBox'
import './Privacy.css'

const Privacy = () => {
    return (
        <>
            <h1>Privacy</h1>

            <SearchBar />

            <TitleAndDescriptionBox
                link={"/blocked-users"}
                title={"Blocked Users"}
                description={"When you block someone, that user won't be able to follow your account, and you won't see their blogs."}
            />
            <TitleAndDescriptionBox
                link={"/blocked-communities"}
                title={"Blocked Communities"}
                description={"When you block a community, you won't see their blogs in your Home page."}
            />
            <TitleAndDescriptionBox
                link={"/muted-words"}
                title={"Muted Words"}
                description={"When you mute words, you won't see posts with those words in your Home page."}
            />
            
            <NavigationBar />
        </>
    )
}

export default Privacy