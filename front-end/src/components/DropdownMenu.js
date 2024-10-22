import './DropdownMenu.css'
import React, { useState } from "react"

const DropdownMenu = (props) => {
    const [choice, setChoice] = useState("Select")

    // change choice when user chooses from dropdown menu
    const handleChange = (event) => {
        setChoice(event.target.value)
    }

    return (
        <div className="dropdown">
            <select className="dropdown-menu" name={props.name} onChange={handleChange}>
                <option value="select">{props.label}</option>

                {props.options.map(x => (
                    <option key={props.options.indexOf(x)} className="dropdown-content" value={x}>{x}</option>
                ))}
            </select>
        </div>
    )
}

export default DropdownMenu