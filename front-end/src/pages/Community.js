import axios from 'axios'
import { useState, useEffect } from 'react'
import NavigationBar from '../components/NavigationBar'
import SearchBar from '../components/SearchBar'
//import './Community.css'

const Community = () => {
    //stores the fake data into data 
    const [data, setData] = useState([])

    useEffect(() => {
        console.log("Currently getting community groups' data...")

        //getting fake data from api 
        axios("https://my.api.mockaroo.com/community.json?key=a42e4cd0")
         .then(response => {
            setData(response.data)
         })
         .catch(err => {
            console.log("We have reached the allowed number of requests. Please try again the next day!")
            console.error(err)
         })

         //backup data 
         const secondData = [
            {
                id: 1,
                name: "Youth Empowerment Group",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
            },
            {
                id: 2,
                name: "The Local Circle",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
            },
            {
                id: 3,
                name: "Positivity Hub",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
            },
            {
                id: 4,
                name: "Artistic Voices",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
            },
            {
                id: 5,
                name: "Movie Enthusiasts",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
            }
         ]
         setData(secondData);

    }, [])

    return (
        <>
        <div className="w-[90%] m-[auto] flex flex-col justify-center items-center gap-6 p-8">
            <h1 className="text-xl text-ebony-700 text-center font-bold">Communities</h1>
            <SearchBar searchItems={data}/>
            
            <div className="padding"></div>
            <NavigationBar/>
        </div>
        
        </>
    )
}

export default Community