import axios from 'axios'
import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import TitleAndDescriptionBox from '../components/TitleAndDescriptionBox'

const Community = () => {
    //stores the fake data into data 
    const [data, setData] = useState([])
    const [input, setInput] = useState("")
    const [filteredData, setFilteredData] = useState([])
    const [originalData, setOriginalData] = useState([])

    const handleSearch = (e) => {
        console.log(e.target.value);
        setInput(e.target.value);

        if (input == null || input == '') {
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

        //getting fake data from api 
        //axios("https://my.api.mockaroo.com/community.json?key=a42e4cd0")

        //getting hardcoded data from back-end 
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