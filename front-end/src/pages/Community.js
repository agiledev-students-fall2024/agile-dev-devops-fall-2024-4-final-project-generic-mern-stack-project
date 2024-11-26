import axios from 'axios'
import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import TitleAndDescriptionBox from '../components/TitleAndDescriptionBox'

const Community = () => {
    //stores the data from database into data 
    const [data, setData] = useState([])
    const [input, setInput] = useState("")
    const [filteredData, setFilteredData] = useState([])
    const [originalData, setOriginalData] = useState([])

    const handleSearch = (e) => {
        console.log(e.target.value);
        setInput(e.target.value);

        if (input === null || input === '') {
            setData(originalData);
            return
        }
        if (input.trim() === ''){
            setData(originalData);
            return
        }
        
        const newData = data.filter(item => {
            return item.name.toLowerCase().includes(input.toLowerCase())
        })

        setData(newData);
    }

    useEffect(() => {
        console.log("Currently getting community groups' data...")

        //getting data from back-end 
        axios
         .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/community`)
         .then(response => {
            setData(response.data)
            setOriginalData(response.data)
         })
         .catch(err => {
            console.log("We have reached the allowed number of requests. Please try again the next day!")
            console.error(err)
         })

         //backup data 
         const secondData = [
            {
                id: 1, 
                name: "EcoWarriors Unite", 
                description: "A group of passionate environmental advocates committed to local sustainability efforts, cleanups, and education on green living."
            },
            {
                id: 2, 
                name: "Neighborly Hearts",
                description: "A supportive neighborhood group focused on creating a friendly, connected community through events, volunteer work, and mutual assistance. We aim to build lasting relationships and ensure everyone has a network of support when needed."
            },
            {
                id: 3, 
                name: "Tech Talk Tribe",
                description: "A space for tech enthusiasts to share knowledge, discuss the latest innovations, and collaborate on projects in a relaxed, inclusive environment."
            },
            {
                id: 4, 
                name: "The Creative Collective",
                description: "An artistic community where local painters, writers, musicians, and other creatives can collaborate, share ideas, and inspire one another. The group hosts workshops, exhibitions, and creative events to nurture artistic talent in the community."
            },
            {
                id: 5, 
                name: "Global Citizens Forum",
                description: "A group dedicated to discussing international issues, fostering cultural awareness, and organizing charity efforts to make a positive impact worldwide."
            },
            {
                id: 6, 
                name: "FitFam Network",
                description: "A health-focused community for people of all fitness levels to motivate each other, share workout tips, and participate in group exercise challenges. We support holistic well-being, from physical fitness to mental health, and encourage members to set and reach their goals."
            },
            {
                id: 7, 
                name: "Literary Lounge",
                description: "A book club and discussion group for literature lovers to explore different genres, discuss themes, and discover new authors together."
            },
            {
                id: 8, 
                name: "Mindful Moments",
                description: "A community for those interested in mental wellness, mindfulness practices, and holistic living to share resources and support one another. We host meditation sessions, workshops on stress management, and provide a safe space for personal growth and healing."
            },
            {
                id: 9, 
                name: "Civic Change Makers",
                description: "A grassroots group dedicated to community activism, engaging in local policy issues, and working toward positive social change through collective action."
            },
            {
                id: 10, 
                name: "Youth Empowerment Network",
                description: "A group focused on providing mentorship, leadership training, and educational resources for young people to build their future and make an impact in their community. We offer internships, skill-building workshops, and opportunities to connect with role models in various fields."
            }   
         ]
         setData(secondData);

    }, [])

    console.log(data)

    return (
        <>
        <div className="w-[100%] m-[auto] flex flex-col justify-center items-center gap-6 p-8 md:w-[90%]">
            <h1 className="text-xl text-ebony-700 text-center font-bold">Communities</h1>
            <SearchBar searchInput={input} setSearchInput={setInput} handleSearch={handleSearch}/>
            
            <section className="flex flex-col justify-center w-[100%] gap-0">
                {data.map(item => (
                    <div key={item.id} className="groups">
                        <TitleAndDescriptionBox
                            link={`/community/${item.id}`}
                            title={item.name}
                            description={item.description}
                        />
                    </div>
                
                ))}
            </section>
            
            <div className="padding"></div>
        </div>
        
        </>
    )
}

export default Community