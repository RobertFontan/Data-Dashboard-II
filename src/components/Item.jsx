import { useParams } from "react-router-dom"
import {useState, useEffect} from "react"
import axios from "axios"
import React from "react"

const Item = () => {
    const {id} = useParams()
    const URL = 'https://pokeapi.co/api/v2/pokemon/'
    const [mon, setMon] = useState(null);


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
      


    const fetchData = async () => {
        const response = await axios.get(URL + id)
        const result = {
            id: response.data.id,
            name: response.data.name,
            height: response.data.height,
            weight: response.data.weight,
            types: response.data.types.map((e) => e.type.name),
            abilities: response.data.abilities,
            sprite: response.data.sprites.front_default,
            shiny: response.data.sprites.front_shiny,
            backSprite: response.data.sprites.back_default,
            backShiny: response.data.sprites.back_shiny,
            moves: response.data.moves.map((e) => e.move.name)
        }
        setMon(result)
        console.log(result)
    }

    useEffect(() =>{
        fetchData()
    }, [])


    if(!mon){
        return  (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div className="Item">
            <div className="top">
                <img src={mon.sprite} alt="Sprite image for selected pokemon" />
                <img src={mon.backSprite} />
                <img src={mon.shiny} alt="Shiny sprite image for selected pokemon" />
                <img src={mon.backShiny} />
            </div>
            <div className="bottom">
                <div className="stats">
                    <h2>{capitalizeFirstLetter(mon.name)}</h2>
                    <h4>Height: {mon.height} decimeter</h4>
                    <h4>Weight: {mon.weight} hectogram</h4>
                </div>
                
                <div className="lists">
                    <ul>
                        Types:
                        {mon.types.map((e) => (<li> {e} </li>))}
                    </ul>
                    <ul>
                        Abilites:
                        {mon.abilities.map((e) => (<li> {e.ability.name} </li>))}
                    </ul>
                    <ul className="moves">
                        {mon.moves.map((e) => (<li> {e} </li>))}
                    </ul>
                </div>
            </div>

            
        </div>
    )
}

export default Item