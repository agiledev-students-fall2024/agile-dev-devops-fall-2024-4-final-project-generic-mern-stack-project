import React, { useState, useEffect } from "react"
import axios from "axios"
import SearchBar from '../components/SearchBar'
import NavigationBar from '../components/NavigationBar'
import TextAndButton from '../components/TextAndButton'
import './Blocked.css'

const Blocked = (props) => {
    const [data, setData] = useState([])

    useEffect(() => {
        let url = ""

        // set api url based on type of data needed
        if (props.type === "blocked_users") {
            url = "https://my.api.mockaroo.com/blocked_users.json?key=baec6df0"
        }
        else if (props.type === "blocked_communities") {
            url = "https://my.api.mockaroo.com/blocked_communities.json?key=baec6df0"
        }
        else if (props.type === "muted_words") {
            url = "https://my.api.mockaroo.com/muted_words.json?key=baec6df0"
        }

        // fetch data
        axios(url)
            .then(response => {
                setData(response.data)
            })
            .catch(err => {
                console.log(`No more requests allowed.`)
                console.error(err)
            })
    }, [])

    // blocked users page
    if (props.type === "blocked_users") {
        return (
            <>
                <div className="blocked_content">
                    <h1>{props.text}</h1>
                    <SearchBar SearchBarName={"Search blocked accounts"} />
                    <hr></hr>
                    <div className="blocked_list">
                        {data.map(item => (
                            <TextAndButton key={item.id} text={item.username} button={"Unblock"} />
                        ))}
                    </div>
                    <NavigationBar />
                </div>
            </>
        )
    }
    // blocked communities page
    else if (props.type === "blocked_communities") {
        return (
            <>
                <div className="blocked_content">
                    <h1>{props.text}</h1>
                    <SearchBar SearchBarName={"Search blocked communities"} />
                    <hr></hr>
                    <div className="blocked_list">
                        {data.map(item => (
                            <TextAndButton key={item.id} text={item.community} button={"Unblock"} />
                        ))}
                    </div>
                    <NavigationBar />
                </div>
            </>
        )
    }
    // muted words page
    else if (props.type === "muted_words") {
        return (
            <>
                <div className="blocked_content">
                    <h1>{props.text}</h1>
                    <SearchBar SearchBarName={"Search muted words"} />
                    <hr></hr>
                    <div className="blocked_list">
                        {data.map(item => (
                            <TextAndButton key={item.id} text={item.muted_word} button={"Unmute"} />
                        ))}
                    </div>
                    <NavigationBar />
                </div>
            </>
        )
    }
}

export default Blocked