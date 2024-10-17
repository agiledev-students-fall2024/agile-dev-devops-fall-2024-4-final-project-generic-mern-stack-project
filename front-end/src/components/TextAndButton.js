import './TextAndButton.css'

const TextAndButton = (props) => {
    return (
        <div className="text-and-button">
            <p className="text">{props.text}</p>
            <button className="button" onClick={() => console.log('do action')}>{props.button}</button>
        </div>
    )
}

export default TextAndButton