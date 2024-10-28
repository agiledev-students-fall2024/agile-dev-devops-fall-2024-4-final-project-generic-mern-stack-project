//import './TitleAndDescription.css'

const TitleAndDescription = (props) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <p className="text-ebony text-2xl mb-2">{props.title}</p>
            <p className="text-center text-sm text-ebony font-light">{props.description}</p>
        </div>
    )
}

export default TitleAndDescription