import React, { useState } from 'react'
import TitleAndDescription from '../components/TitleAndDescription'
import NavigationBar from '../components/NavigationBar'
import DropdownMenu from '../components/DropdownMenu'

const Accessibility = (props) => {
    const [size, setSize] = useState([])

    const adjustFontSize = (evt) => {
        // adjust font size based on slider position
        evt.preventDefault();
        const font = parseFloat(evt.target.value);
        setSize(font)
    }

    return (
        <>
            <TitleAndDescription
                title={props.text}
                description={"Manage your color mode, display, and font settings"}
            />

            <div className="element">
                <p>Display color mode</p>
                <DropdownMenu
                    name={"color-mode"}
                    label={"Color Mode"}
                    options={["Light", "Dark"]}
                />
            </div>
            <div className="element">
                <p>Display Images</p>
                <DropdownMenu
                    name={"display-images"}
                    label={"Display Images"}
                    options={["Show", "Hide"]}
                />
            </div>
            <div className="element">
                <p>Font Size</p>
                <input type="range" step="2" min="10" max="18" onChange={adjustFontSize}></input>
            </div>

            <NavigationBar />
        </>
    )
}

export default Accessibility