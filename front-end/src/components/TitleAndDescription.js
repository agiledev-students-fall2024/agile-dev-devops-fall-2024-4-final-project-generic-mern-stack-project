import './TitleAndDescription.css'

const TitleAndDescription = (props) => {
    return (
        <header className="Header-header">
            <h1 className="Page-title">{props.title}</h1>
            <p className="Page-description">{props.description}</p>
        </header>
    )
}

export default TitleAndDescription