import React, { useState, useEffect, useContext } from 'react'
import TitleAndDescription from '../components/TitleAndDescription'
import DropdownMenu from '../components/DropdownMenu'
import axios from "axios"
import "./Accessibility.css"
import { ColorContext } from '../ColorContext';
import { FontContext } from '../FontContext';

const Accessibility = (props) => {
    const { updateColor } = useContext(ColorContext);
    const { updateFont } = useContext(FontContext);

    const [size, setSize] = useState("")
    const [color, setColor] = useState("")
    const [image, setImage] = useState("")
    const [options, setOptions] = useState(["Light", "Dark"])
    const [imgOptions, setImgOptions] = useState(["Show", "Hide"])

    const changeColor = (event) => {
        axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/color-mode`,
            { color: event.target.value },
        )
            .then(response => {
                setColor(response.data)
                updateColor(response.data.toLowerCase())
                const newOptions = (response.data === "Light") ? ["Dark"] : ["Light"];
                setOptions(newOptions)
            })
            .catch(err => {
                console.log('Failed to change color mode')
                console.log(err)
            })
    }

    const changeImage = (event) => {
        axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/image-mode`,
            { image: event.target.value },
        )
            .then(response => {
                setImage(response.data)
                const newOptions = (response.data === "Show") ? ["Hide"] : ["Show"];
                setImgOptions(newOptions)
            })
            .catch(err => {
                console.log('Failed to change image mode')
                console.log(err)
            })
    }

    useEffect(() => {
        axios(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/color-mode`)
            .then(response => {
                setColor(response.data)
                updateColor(response.data.toLowerCase())
                const newOptions = (response.data === "Light") ? ["Dark"] : ["Light"];
                setOptions(newOptions)
            })
            .catch(err => {
                console.log(`Could not get data.`)
                console.error(err)
            })
    }, [])

    useEffect(() => {
        axios(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/image-mode`)
            .then(response => {
                setImage(response.data)
                const newOptions = (response.data === "Show") ? ["Hide"] : ["Show"];
                setImgOptions(newOptions)
            })
            .catch(err => {
                console.log(`Could not get data.`)
                console.error(err)
            })
    }, [])

    useEffect(() => {
        axios(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/font-size`)
            .then(response => {
                setSize(response.data)
                updateFont(response.data)
            })
            .catch(err => {
                console.log(`Could not get data.`)
                console.error(err)
            })
    }, [])

    const adjustFontSize = (evt) => {
        // adjust font size based on slider position
        evt.preventDefault();
        const font = parseFloat(evt.target.value);

        axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/font-size`,
            { fontSize: font },
        )
            .then(response => {
                setSize(response.data)
                updateFont(response.data)
            })
            .catch(err => {
                console.log('Failed to change font size')
                console.log(err)
            })

    }

    return (
        < div className="w-[100%] m-[auto] flex flex-col justify-center items-center gap-6 p-8 md:w-[80%] lg:w-[60%]" >
            <TitleAndDescription
                title={props.text}
                description={"Manage your color mode, display, and font settings"}
            />

            <div className="w-[90%] mx-auto gap-4 bg-lavender_blush-900 p-2 rounded-md">
                <div className="flex flex-row justify-between mx-10 my-5">
                    <p className="text-md text-ebony font-bold">Display color mode</p>
                    <DropdownMenu
                        name={"color-mode"}
                        label={color}
                        options={options}
                        request={"color-mode"}
                        choice={color}
                        onChange={changeColor}
                    />
                </div>
                <div className="flex flex-row justify-between mx-10 my-5">
                    <p className="text-md text-ebony font-bold">Display Images</p>
                    <DropdownMenu
                        name={"display-images"}
                        label={image}
                        options={imgOptions}
                        request={"image-mode"}
                        choice={image}
                        onChange={changeImage}
                    />
                </div>
                <div className="flex flex-row justify-between mx-10 my-5">
                    <p className="text-md text-ebony font-bold">Font Size</p>
                </div>
                <div className="flex flex-col justify-between items-center">
                    <p className={"text-ebony font-thin mb-5 w-[70%] px-" + size}>Lorem ipsum odor amet, consectetuer adipiscing elit. Metus ex eget tristique fringilla convallis morbi tincidunt.</p>
                    <input className="w-[80%] mb-5" type="range" default="16" value={size} step="2" min="10" max="18" onChange={adjustFontSize}></input>
                </div>
            </div>
        </div >
    )
}

export default Accessibility