import '../styles/DBCGallery.css'
import {supabase} from '../client'
import {useState, useEffect} from 'react'
import DBCard from '../components/DBCard.jsx'
const DBCGallery = () => {
    const [DBCdata, setDBCdata] = useState([])
    const [err, setErr] = useState(null)
    const fetchDBCharacters = async () => {
        const {error, data} = await supabase
        .from("dbcdatabase")
        .select()
        .order('created_at', { ascending: true })

        if(error){
            setErr(error)
            return;
        }

        setDBCdata(data)
    }
    useEffect(()=>{
        fetchDBCharacters();
    }, [])
    if(err){
       return(<div className="DB-Gallery"><h2>Error Loading Gallery</h2></div>) 
    }
    if(DBCdata.length == 0){
        return(<div className="DB-Gallery"><h2>No Characters added yet</h2></div>)
    }
    return (
        <div className="DB-Gallery">
            <h1>Your DB Character Gallery</h1>
            <div className="DBCharacter-Container">
                {DBCdata.map((db)=><DBCard key={db.id} dbc={db}/>)}
            </div>
        </div>
    )
}

export default DBCGallery;
