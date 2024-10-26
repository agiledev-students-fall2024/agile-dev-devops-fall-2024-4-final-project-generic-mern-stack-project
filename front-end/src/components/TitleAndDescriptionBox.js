import './TitleAndDescriptionBox.css'
import { Link } from 'react-router-dom'

const TitleAndDescriptionBox = (props) => {
    return (
        <div className="Content-box">
            <Link to={props.link}><p className="Content-title">{props.title}</p></Link>
            <p className="Content-description">{props.description}</p>
        </div>
    )
}

export default TitleAndDescriptionBox
