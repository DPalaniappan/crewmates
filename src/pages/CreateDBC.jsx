import '../styles/CreateDBC.css'
import { supabase } from '../client';
import { useState, useEffect } from 'react'
const CreateDBC = ({DBCimages}) => {
    const [DBCharacter, setDBCharacter] = useState({name:"", power_level:"", race:""})
    const handleChange = (event) => {
        const {name, value} = event.target
        setDBCharacter((prev)=> ({...prev, [name]:value.trim()}))
    }
    const createDBCharacter = async (event) => {
        event.preventDefault()
        if(DBCharacter.name == "" || DBCharacter.power_level == ""){
            alert("Name or PowerLevel is missing")
            return;
        }

        if(isNaN(Number(DBCharacter.power_level))){
            alert("PowerLevel should be a number. An example is 9000 :)")
            return;
        }
        const randomValue = Math.floor(Math.random() * DBCimages[DBCharacter.race].length)
        const imageURL = DBCimages[DBCharacter.race][randomValue]
        const {error} = await supabase
        .from("dbcdatabase")
        .insert({name:DBCharacter.name, power_level:DBCharacter.power_level, race:DBCharacter.race, image_url:imageURL})
        .select();

        if(error){
          alert(`There was an error`)
          return;
        }

         window.location = "/";

    }
    return(
        <div className='create-dbc'>
            <h1>Create a DB Character</h1>
            <img src='src/images/main-images/db_characters.png' alt='dragonball characters' className="create-dbcimage"/>
            <br></br>
            <form className='create-dbc-form'>
            <div className='mini-container'>
                <label><h3>Name:</h3></label>
                <input type='text' name="name" value={DBCharacter.name} onChange={handleChange}placeholder='Enter Crews Name'/>
            </div>
            <div className='mini-container'>
                <label><h3>Power Level:</h3></label>
                <input type='text' name="power_level" value={DBCharacter.power_level} onChange={handleChange} placeholder='Enter power level'/>
            </div>
            <div className='mini-container'>
                <label><h3>Race of Character:</h3></label>
                <ul>
                    <li>
                        <input type='radio' name='race' value='Earthling' onChange={handleChange} checked={DBCharacter.race == "Earthling"}/>
                        Earthling
                    </li>
                    <li>
                        <input type='radio' name='race' value='Saiyan' onChange={handleChange} checked={DBCharacter.race == "Saiyan"}/>
                        Saiyan
                    </li>
                    <li>
                        <input type='radio' name='race' value='Android' onChange={handleChange} checked={DBCharacter.race == "Android"}/>
                        Android
                    </li>
                    <li>
                        <input type='radio' name='race' value='Hybrid Saiyan' onChange={handleChange} checked={DBCharacter.race == "Hybrid Saiyan"}/>
                        Hybrid Saiyan
                    </li>
                    <li>
                        <input type='radio' name='race' value='Majin' onChange={handleChange} checked={DBCharacter.race == "Majin"}/>
                        Majin
                    </li>
                    <li>
                        <input type='radio' name='race' value='Namekian' onChange={handleChange} checked={DBCharacter.race == "Namekian"}/>
                        Namekian
                    </li>
                    <li>
                        <input type='radio' name='race' value='Frieza Clan' onChange={handleChange} checked={DBCharacter.race == "Frieza Clan"}/>
                        Frieza Clan
                    </li>
                </ul>
            </div>

            </form>
            <button type="submit" className="create-dbc-button" onClick={createDBCharacter}>Create Character</button>

        </div>
    )
}

export default CreateDBC;
