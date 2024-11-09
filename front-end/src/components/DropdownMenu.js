import React, { useState } from "react"
import axios from "axios"

const DropdownMenu = (props) => {
    const [choice, setChoice] = useState("Select")

    // change choice when user chooses from dropdown menu
    const handleChange = (event) => {
        setChoice(event.target.value)

        if (props.request == 'color-mode') {
            axios.post("http://localhost:8000/api/color-mode",
                { id: 1, color: event.target.value },
            )
                .then(response => {
                    setChoice(response.data)
                })
                .catch(err => {
                    console.log('Failed to change color mode')
                    console.log(err)
                })
        }
        if (props.request == 'image-mode') {
            axios.post("http://localhost:8000/api/image-mode",
                { id: 1, image: event.target.value },
            )
                .then(response => {
                    setChoice(response.data)
                })
                .catch(err => {
                    console.log('Failed to change image mode')
                    console.log(err)
                })
        }
    }

    return (
        <div className="flex justify-center overflow-hidden px-4 py-2 bg-lavender_blush-900 border-[1px] border-rose rounded-md text-rose font-bold">
            <select className="bg-transparent" name={props.name} onChange={handleChange}>
                <option value="select">{props.label}</option>

                {props.options.map(x => (
                    <option key={props.options.indexOf(x)} className="px-4 py-2" value={x}>{x}</option>
                ))}
            </select>
        </div>
    )
}

export default DropdownMenu