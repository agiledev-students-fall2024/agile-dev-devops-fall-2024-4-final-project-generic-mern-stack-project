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
        <div className="w-[100%] m-[auto] flex flex-col justify-center items-center gap-6 p-8 md:w-[80%] lg:w-[60%]">
            <TitleAndDescription
                title={props.text}
                description={"Manage your color mode, display, and font settings"}
            />

            <div className="w-[90%] mx-auto gap-4 bg-lavender_blush-900 p-2 rounded-md">
                <div className="flex flex-row justify-between mx-10 my-5">
                    <p className="text-md text-ebony font-bold">Display color mode</p>
                    <DropdownMenu
                        name={"color-mode"}
                        label={"Color Mode"}
                        options={["Light", "Dark"]}
                    />
                </div>
                <div className="flex flex-row justify-between mx-10 my-5">
                    <p className="text-md text-ebony font-bold">Display Images</p>
                    <DropdownMenu
                        name={"display-images"}
                        label={"Display Images"}
                        options={["Show", "Hide"]}
                    />
                </div>
                <div className="flex flex-row justify-between mx-10 my-5">
                    <p className="text-md text-ebony font-bold">Font Size</p>
                </div>
                <div className="flex flex-col justify-between items-center">
                    <p className={"text-ebony font-thin mb-5 w-[70%] px-" + size}>Lorem ipsum odor amet, consectetuer adipiscing elit. Metus ex eget tristique fringilla convallis morbi tincidunt.</p>
                    <input className="w-[80%] mb-5" type="range" default="16" step="2" min="10" max="18" onChange={adjustFontSize}></input>
                </div>
            </div>

            <NavigationBar />
        </div>
    )
}

export default Accessibility