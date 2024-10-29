import React, { useState, useEffect } from "react"
import axios from "axios"
import NavigationBar from '../components/NavigationBar'
import TextAndButton from '../components/TextAndButton'

const Blocked = (props) => {
    const [data, setData] = useState([])

    useEffect(() => {
        let url = ""
        let mock_data

        // set api url based on type of data needed
        if (props.type === "blocked_users") {
            url = "https://my.api.mockaroo.com/blocked_users.json?key=baec6df0"
            mock_data = [{
                "id": 1,
                "username": "sroderick0"
            }, {
                "id": 2,
                "username": "aplak1"
            }, {
                "id": 3,
                "username": "cpetrasek2"
            }, {
                "id": 4,
                "username": "pwroth3"
            }, {
                "id": 5,
                "username": "hfarrar4"
            }, {
                "id": 6,
                "username": "aandriulis5"
            }, {
                "id": 7,
                "username": "rgilfoy6"
            }, {
                "id": 8,
                "username": "jbennell7"
            }, {
                "id": 9,
                "username": "lnorthway8"
            }, {
                "id": 10,
                "username": "dstevens9"
            }, {
                "id": 11,
                "username": "kperkinsa"
            }, {
                "id": 12,
                "username": "csymcockb"
            }, {
                "id": 13,
                "username": "lkalaherc"
            }, {
                "id": 14,
                "username": "wboldersond"
            }, {
                "id": 15,
                "username": "acliste"
            }]
        }
        if (props.type === "blocked_communities") {
            url = "https://my.api.mockaroo.com/blocked_communities.json?key=baec6df0"
            mock_data = [{
                "id": 1,
                "community": "convallis eget"
            }, {
                "id": 2,
                "community": "volutpat"
            }, {
                "id": 3,
                "community": "sed"
            }, {
                "id": 4,
                "community": "velit"
            }, {
                "id": 5,
                "community": "lectus in"
            }, {
                "id": 6,
                "community": "amet"
            }, {
                "id": 7,
                "community": "ac nulla"
            }]
        }
        if (props.type === "muted_words") {
            url = "https://my.api.mockaroo.com/muted_words.json?key=baec6df0"
            mock_data = [{
                "id": 1,
                "muted_word": "semper"
            }, {
                "id": 2,
                "muted_word": "id"
            }, {
                "id": 3,
                "muted_word": "in"
            }, {
                "id": 4,
                "muted_word": "nunc"
            }, {
                "id": 5,
                "muted_word": "non"
            }, {
                "id": 6,
                "muted_word": "viverra"
            }, {
                "id": 7,
                "muted_word": "est"
            }, {
                "id": 8,
                "muted_word": "bibendum"
            }, {
                "id": 9,
                "muted_word": "ac"
            }, {
                "id": 10,
                "muted_word": "erat"
            }]
        }

        // fetch data
        axios(url)
            .then(response => {
                setData(response.data)
            })
            .catch(err => {
                console.log(`No more requests allowed.`)
                console.error(err)
                // remove later: this is for mockaroo request limit workaround
                setData(mock_data)
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
                <NavigationBar />
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
                <NavigationBar />
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
                <NavigationBar />
            </div>
        )
    }
}

export default Blocked