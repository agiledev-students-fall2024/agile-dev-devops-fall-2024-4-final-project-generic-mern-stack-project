import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SubCommunity from '../components/SubCommunity'


const SubCommunityPage = (props) => {
    //stores the fake data into data 
    const [data, setData] = useState([])
    const { communityId } = useParams()

    useEffect(() => {
        console.log("Currently getting subcommunity group's data...")

        //getting hardcoded data from back-end
        axios
         .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/community/${communityId}`)
         .then(response => {
            setData(response.data)
         })
         .catch(err => {
            console.log("Unable to retrieve subcommunity data.")
            console.error(err)
         })

         //backup data 
         const secondData = [
            {
                id: 1,
                name: "The Creative Collective",
                description: "The Creative Collective is an artistic hub that brings together local painters, writers, photographers, musicians, and other creatives who are passionate about expressing their talents. Our goal is to nurture and celebrate creativity within the community by organizing collaborative projects, workshops, and public art installations. The group provides a supportive environment for individuals to share their work, receive feedback, and gain inspiration from others. We also offer opportunities for networking, mentorship, and exposure through community events like art shows, poetry readings, and music performances. The Creative Collective fosters a sense of belonging among artists, giving them the tools and support they need to thrive.",
                communityPicture: "/uploads/community/default_pic.png"
            },
         ]
         setData(secondData[0]);

    }, [communityId])

    return (
        <div className="w-[95%] m-[auto] flex flex-col justify-center items-center gap-6 p-8 md:w-[80%] lg:w-[70%]">
            <SubCommunity 
                image={`${process.env.REACT_APP_SERVER_HOSTNAME}${data.communityPicture}`}
                name={data.name}
                description={data.description}
            />
        </div>
    )
}

export default SubCommunityPage