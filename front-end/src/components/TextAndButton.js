// import './TextAndButton.css'

const TextAndButton = (props) => {
    return (
        <div className="flex flex-row justify-between items-center space-x-20 m-5">
            <p>{props.text}</p>
            <button className="text-ebony-700 font-bold border border-ebony-800 p-1 bg-lavender_blush-700 rounded-lg" onClick={() => console.log('do action')}>{props.button}</button>
        </div>
    )
}

export default TextAndButton