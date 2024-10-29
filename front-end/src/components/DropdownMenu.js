//import './DropdownMenu.css'
import React, { useState } from "react"

const DropdownMenu = (props) => {
    const [choice, setChoice] = useState("Select")

    // change choice when user chooses from dropdown menu
    const handleChange = (event) => {
        setChoice(event.target.value)
    }

    return (
        <div className="flex justify-center overflow-hidden px-4 py-2 bg-transparent border-[1px] border-rose rounded-md text-rose font-bold">
            <select className="rounded-md" name={props.name} onChange={handleChange}>
                <option value="select">{props.label}</option>

                {props.options.map(x => (
                    <option key={props.options.indexOf(x)} className="px-4 py-2" value={x}>{x}</option>
                ))}
            </select>
        </div>
    )
}

export default DropdownMenu