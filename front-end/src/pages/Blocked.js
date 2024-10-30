import React, { useState, useEffect } from "react"
import axios from "axios"
import TextAndButton from '../components/TextAndButton'

const Blocked = (props) => {
    const [data, setData] = useState([])

    useEffect(() => {
        let url = ""

        // set api url based on type of data needed
        if (props.type === "blocked_users") {
            url = "https://my.api.mockaroo.com/blocked_users.json?key=baec6df0"
        }
        if (props.type === "blocked_communities") {
            url = "https://my.api.mockaroo.com/blocked_communities.json?key=baec6df0"
        }
        if (props.type === "muted_words") {
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
            <div className="w-[90%] m-[auto] flex flex-col justify-center items-center gap-8 p-8">
                <h1 className="text-xl text-ebony-700 text-center font-bold">{props.text}</h1>
                <div>
                    {data.map(item => (
                        <TextAndButton key={item.id} text={item.username} button={"Unblock"} />
                    ))}
                </div>
            </div>
        )
    }
    // blocked communities page
    else if (props.type === "blocked_communities") {
        return (
            <div className="w-[90%] m-[auto] flex flex-col justify-center items-center gap-8 p-8">
                <h1 className="text-xl text-ebony-700 text-center font-bold">{props.text}</h1>
                <div>
                    {data.map(item => (
                        <TextAndButton key={item.id} text={item.community} button={"Unblock"} />
                    ))}
                </div>
            </div>
        )
    }
    // muted words page
    else if (props.type === "muted_words") {
        return (
            <div className="w-[90%] m-[auto] flex flex-col justify-center items-center gap-8 p-8">
                <h1 className="text-xl text-ebony-700 text-center font-bold">{props.text}</h1>
                <div>
                    {data.map(item => (
                        <TextAndButton key={item.id} text={item.muted_word} button={"Unmute"} />
                    ))}
                </div>
            </div>
        )
    }
}

export default Blocked