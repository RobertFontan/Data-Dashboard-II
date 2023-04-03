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
            <div className="left">
                <img src={mon.sprite} alt="Sprite image for selected pokemon" />
                <img src={mon.shiny} alt="Shiny sprite image for selected pokemon" />
            </div>
            <div className="right">
                <div className="stats">
                    <h3>{capitalizeFirstLetter(mon.name)}</h3>
                    <h5>Height: {mon.height}</h5>
                    <h5>Weight: {mon.weight}</h5>
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
                    <ul>
                        Moves:
                        {mon.moves.map((e) => (<li> {e} </li>))}
                    </ul>
                </div>
            </div>

            
        </div>
    )
}

export default Item