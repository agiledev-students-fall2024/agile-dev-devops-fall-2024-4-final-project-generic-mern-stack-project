import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SubCommunity from '../components/SubCommunity'
//import './SubCommunityPage.css'

const SubCommunityPage = (props) => {
    //stores the fake data into data 
    const [data, setData] = useState([])
    const communityId = useParams()

    useEffect(() => {
        console.log("Currently getting subcommunity group's data...")

        //getting fake data from api 
        axios("https://my.api.mockaroo.com/subcommunity.json?key=a42e4cd0")
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
         ]
         setData(secondData[0]);

    }, [communityId])

    //gets a random image 
    const image = `https://picsum.photos/200?id=${props.communityId}`

    return (
        <div className="w-[95%] m-[auto] flex flex-col justify-center items-center gap-6 p-8">
            <SubCommunity 
                image={image}
                name={data.name}
                description={data.description}
            />
        </div>
    )
}

export default SubCommunityPage