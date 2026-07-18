import '../styles/DBDetails.css'
import { useParams, Link } from "react-router";
import { supabase } from '../client';
import { useState, useEffect } from 'react'

const sentences = [
    { min: 1, max: 100, text: (name) => `${name} barely registers on the scouter, weaker than a Saibaman fresh out of the ground.` },
    { min: 100, max: 1000, text: (name) => `${name} fights like a hardened Z Fighter, on par with a young Krillin before his training with Master Roshi.` },
    { min: 1000, max: 2000, text: (name) => `${name} hits like Raditz, the first Saiyan menace to touch down on Earth.` },
    { min: 2000, max: 3000, text: (name) => `${name} could trade blows with Piccolo after fusing with Kami himself.` },
    { min: 3000, max: 4000, text: (name) => `${name} closes in on Nappa's brutal, saibaman-squashing power.` },
    { min: 4000, max: 5000, text: (name) => `${name} matches Nappa at full strength, a true threat to any untrained fighter.` },
    { min: 5000, max: 6000, text: (name) => `${name} shatters scouters the way Vegeta did the moment he landed on Earth.` },
    { min: 6000, max: 7000, text: (name) => `${name} fights with the ferocity of a Kaio-ken powered Goku.` },
    { min: 7000, max: 8000, text: (name) => `${name} pushes past Kaio-ken x2 Goku, entering rarefied territory few fighters reach.` },
    { min: 8000, max: 9000, text: (name) => `${name} stands right at the edge of legend, one training arc away from breaking the scale.` },
    { min: 9000, max: Infinity, text: (name) => `IT'S OVER 9000!!! ${name} has shattered the scouter, just like Vegeta's did the moment he saw Goku's true power.` },
]

const getPowerSentence = (powerLevel, name) => {
    const level = Number(powerLevel)
    const match = sentences.find(({ min, max }) => level >= min && level < max)
    return match ? match.text(name) : ""
}

const DBDetails = ()=> {
    const {id} = useParams();
    const [err, setErr] = useState(null)
    const [DBCharacter, setDBCharacter] = useState(null)
    useEffect(()=>{
        const fetchDBCharacter = async () => {
           const {data, error} = await supabase
            .from("dbcdatabase")
            .select()
            .eq("id", id)
            .single()

            if(error){
                setErr(error)
            }

            setDBCharacter(data)
        }
        fetchDBCharacter()
    }, [id])

    if(err){
        return <div className="detail-page"><h2>Error loading character.</h2></div>
    }

    if(!DBCharacter){
        return <div className="detail-page"><h2>Loading...</h2></div>
    }

    return (
        <div className="detail-page">
            <img src={DBCharacter.image_url} alt={`${DBCharacter.name}'s character image`}/>
            <h1>{DBCharacter.name}</h1>
            <h3>Race: <span>{DBCharacter.race}</span></h3>
            <h3>Power Level: <span>{DBCharacter.power_level}</span></h3>
            <p>{getPowerSentence(DBCharacter.power_level, DBCharacter.name)}</p>
            <Link to={`/edit-character/${id}`}>
            <button>Wanna Edit this DB Character?</button>
            </Link>
        </div>
    )

}

export default DBDetails;
