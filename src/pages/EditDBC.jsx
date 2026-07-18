import '../styles/EditDBC.css'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router'
import { supabase } from '../client';
const EditDBC = ({DBCimages}) => {
    const {id} = useParams();
    const [formData, setFormData] = useState({name:"", power_level:"", race:""})
    const [DBCharacter, setDBCharacter]= useState(null)
    const [err, setErr] = useState(null)
    const handleChange = (event) => {
        const {name, value} = event.target
        setFormData((prev)=> ({...prev, [name]:value.trim()}))
    }
    const handleDelete =  async (event) => {
        event.stopPropagation();
        const {error, data} = await supabase
        .from("dbcdatabase")
        .delete()
        .eq("id", id)

        if(error){
            alert("Failed to delete character")
            return;
        }
        window.location.href = "/db-gallery"
    }
    const updateDBCharacter = async (event) => {
        event.preventDefault()
        if(DBCharacter.name == "" || DBCharacter.power_level == ""){
            alert("Name or PowerLevel is missing")
            return;
        }

        if(isNaN(Number(DBCharacter.power_level))){
            alert("PowerLevel should be a number. An example is 9000 :)")
            return;
        }
        const randomValue = Math.floor(Math.random() * DBCimages[formData.race].length)
        const imageURL = DBCimages[formData.race][randomValue]
        const {error} = await supabase
        .from("dbcdatabase")
        .update({name:formData.name, power_level:formData.power_level, race:formData.race, image_url: DBCharacter.race == formData.race ? DBCharacter.imageURL : imageURL })
        .eq("id", id)

        if(error){
          alert(`There was an error with updating`)
          return;
        }

         window.location.href = "/db-gallery"

    }
    useState(()=>{
        const getFormData = async ()=> {
            const {error, data} = await supabase
            .from("dbcdatabase")
            .select()
            .eq("id",id)
            .single();

            if(error){
                setErr(error)
                return;
            }
            setDBCharacter(data)
            setFormData({name: data.name, power_level:data.power_level, race:data.race})
        }
        getFormData();
    }, [id])
    if(err){
       return <div className="Edit-DBC"><h2>There was a problem with editing</h2></div>
    }

    if(!DBCharacter){
        return <div className="Edit-DBC"><h2>Loading</h2></div>
    }
    return (
        <div className="Edit-DBC">
            <h1>Update your DB Character</h1>
            <img src={DBCharacter.image_url} className="edit-image"/>
            <div className="character-info">
                <h2>Character Info:</h2>
                <h2>
                Name: <span>{DBCharacter.name}</span>, Power Level: <span>{DBCharacter.power_level}</span>, Race: <span>{DBCharacter.race}</span>
                </h2>
            </div>
            <form className='create-dbc-form'>
            <div className='mini-container'>
                <label><h3>Name:</h3></label>
                <input type='text' name="name" value={formData.name} onChange={handleChange}placeholder='Enter Crews Name'/>
            </div>
            <div className='mini-container'>
                <label><h3>Power Level:</h3></label>
                <input type='text' name="power_level" value={formData.power_level} onChange={handleChange} placeholder='Enter power level'/>
            </div>
            <div className='mini-container'>
                <label><h3>Race of Character:</h3></label>
                <ul>
                    <li>
                        <input type='radio' name='race' value='Earthling' onChange={handleChange} checked={formData.race == "Earthling"}/>
                        Earthling
                    </li>
                    <li>
                        <input type='radio' name='race' value='Saiyan' onChange={handleChange} checked={formData.race == "Saiyan"}/>
                        Saiyan
                    </li>
                    <li>
                        <input type='radio' name='race' value='Android' onChange={handleChange} checked={formData.race == "Android"}/>
                        Android
                    </li>
                    <li>
                        <input type='radio' name='race' value='Hybrid Saiyan' onChange={handleChange} checked={formData.race == "Hybrid Saiyan"}/>
                        Hybrid Saiyan
                    </li>
                    <li>
                        <input type='radio' name='race' value='Majin' onChange={handleChange} checked={formData.race == "Majin"}/>
                        Majin
                    </li>
                    <li>
                        <input type='radio' name='race' value='Namekian' onChange={handleChange} checked={formData.race == "Namekian"}/>
                        Namekian
                    </li>
                    <li>
                        <input type='radio' name='race' value='Frieza Clan' onChange={handleChange} checked={formData.race == "Frieza Clan"}/>
                        Frieza Clan
                    </li>
                </ul>
            </div>
            </form>
            <button type="submit" className="edit-dbc-button" onClick={updateDBCharacter}>Update Character</button>
            <button className="delete-dbc-button" onClick={handleDelete}>Delete DBCharacter</button>
        </div>
    )
}

export default EditDBC;
