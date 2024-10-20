import './SubCommunity.css'

const SubCommunity = (props) => {
    return (
        <div className="Sub-community">
            <div className="Community-button">
                <button className="Join-button" onClick={() => console.log("community popup here")}>Join</button>
            </div>
            <div className="Group-logo">
                <img className="logo" src={props.image} alt="group logo"/>
            </div>

            <h3 className="name">{props.name}</h3>
            <p className="description">{props.description}</p>
        </div>
    )
}

export default SubCommunity

//FUTURE USE!!
// const SubCommunity = (props) => {
//     const [isOpen, setStatus] = useState(false); 

//     const openOrClose = () => {
//         setStatus(!isOpen);
//     }

//     return (
//         <div className="Sub-community">
//             <div className="Community-button">
//                 <button className="Join-button" onClick={openOrClose}>Join</button>
//             </div>
//             <div className="Group-logo">
//                 <img className="logo" src={props.image} alt="group logo"/>
//             </div>

//             <h3 className="name">{props.name}</h3>
//             <p className="description">{props.description}</p>
//         </div>
//     )
// }