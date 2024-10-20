import './TitleAndDescriptionBox.css'

const TitleAndDescriptionBox = (props) => {
    return (
        <div className="Content-box">
            <p className="Content-title">{props.title}</p>
            <p className="Content-description">{props.description}</p>
        </div>
    )
}

export default TitleAndDescriptionBox
