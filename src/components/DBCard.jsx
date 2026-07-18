import '../styles/DBCard.css'
import {Link} from 'react-router'
const DBCard = ({dbc}) => {
    return (
        <div className="DBCard">
            <Link to={`/view-character/${dbc.id}`}>
                <img src={dbc.image_url} alt={`${dbc.name}'s character image`}/>
                <h3>Name of DB Character: <span>{dbc.name}</span></h3>
                <h3>Power Level: <span>{dbc.power_level}</span></h3>
                <h3>Race: <span>{dbc.race}</span></h3>
            </Link>
            <Link to={`/edit-character/${dbc.id}`}>
            <button type="button">Edit Character</button>
            </Link>
        </div>
    )
}

export default DBCard;
