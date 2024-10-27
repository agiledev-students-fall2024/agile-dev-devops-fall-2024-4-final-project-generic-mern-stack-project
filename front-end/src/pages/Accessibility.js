import React, { useState } from 'react'
import TitleAndDescription from '../components/TitleAndDescription'
import NavigationBar from '../components/NavigationBar'
import DropdownMenu from '../components/DropdownMenu'
import "./Accessibility.css"

const Accessibility = (props) => {
    const [size, setSize] = useState([16])

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

            <div className="content">
                <div className="element">
                    <p className="label">Display color mode</p>
                    <DropdownMenu
                        name={"color-mode"}
                        label={"Color Mode"}
                        options={["Light", "Dark"]}
                    />
                </div>
                <div className="element">
                    <p className="label">Display Images</p>
                    <DropdownMenu
                        name={"display-images"}
                        label={"Display Images"}
                        options={["Show", "Hide"]}
                    />
                </div>
                <div className="element">
                    <p className="label">Font Size</p>
                </div>
                <div className="font-element">
                    <p className={"example-text px-" + size}>Lorem ipsum odor amet, consectetuer adipiscing elit. Metus ex eget tristique fringilla convallis morbi tincidunt.</p>
                    <input type="range" default="16" step="2" min="10" max="18" onChange={adjustFontSize}></input>
                </div>
            </div>

            <NavigationBar />
        </>
    )
}

export default Accessibility