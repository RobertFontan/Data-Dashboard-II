import React, { useEffect, useState, PureComponent } from "react"
import axios from "axios"
import { Link, Routes } from "react-router-dom"
import Data from './Data'



const List = ({list}) => {

    console.log('list RECIEVED: ' + list[1])


    const [pokeList, setPokeList] = useState(null)
    const [displayList, setDisplayList] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [type, setType] = useState(null)
    const [inputValue, setInputValue] = useState(null)
    //const [graphData, setGraphData] = useState(typeData)
    const URL = 'https://pokeapi.co/api/v2/pokemon/'
    const fetchData = async () => {
        const responseArray = await Promise.all(
          list.map((url) => axios.get(url))
        );
        const dataArray = responseArray.map((response) => response.data);
        const resultArray = dataArray.map((data) => {
          return {
            id: data.id,
            name: data.name,
            types: data.types.map((e) => e.type.name),
            abilities: data.abilities,
            sprite: data.sprites.front_default
          };
        });
        setPokeList(resultArray)
        setDisplayList(resultArray)
        // var newArray = fetchTypeData(displayList, graphData)
        // setGraphData(newArray)
    };

    

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchQuery);

    }

    const handleSearch = (query) => {
        // change the list to have the searched pokemon
        console.log(query)
        const fetchNewData = async () => {
            const response = await axios.get(URL + query)
            console.log(response.data)
            //setPokeList
            const result = {
                id: response.data.id,
                name: response.data.name,
                types: response.data.types.map((e) => e.type.name),
                abilities: response.data.abilities,
                sprite: response.data.sprites.front_default
            }
            setDisplayList([result])
        }
        console.log(pokeList)
        fetchNewData();
    }


    // function fetchTypeData(pokeMonArray, typeArray){
    //     const updatedTypeArray = typeArray.map(type => ({...type, count: 0}))
    //     pokeMonArray.forEach(mon => {
    //         mon.types.forEach(type => {
    //             const updatedType = updatedTypeArray.find(t => t.type === type);
    //             if(updatedType) {
    //                 updatedType.count++;
    //             }
    //         })
    //     })
    //     console.log(updatedTypeArray)
    //     return updatedTypeArray;
    // }

    useEffect(() =>{
        fetchData()
    }, [])


    const handleOptionChange = (e) =>{
        const arr = e.target.value;
        if(arr != 'All'){
            setType(arr)
            const newList = pokeList.filter((mon) => {
                //console.log(mon.types)
                return (mon.types.includes(arr))
            })
            console.log("newlist")
            console.log(newList)
            setDisplayList(newList)
        }
        else{
            setDisplayList(pokeList)
        }
    }

    const handleIntSubmit = (e) =>
    {
        e.preventDefault()
        handleLimitChange(inputValue)
        //const newList = displayList.filter((mon, index) => index < limit)
       
    }

    const handleLimitChange = (lim) => {
        const newList = pokeList.filter((mon, index) => index < lim)
        console.log(newList)
        setDisplayList(newList)
    }
    

    if(!displayList){
        return(
            <div>Loading...</div>
        )
    }


   return(
    
    <>
    <Data />
   <div className="List">
    <div className="top">
        <div className="search-bar">
            <form onSubmit={handleSubmit}>
                <input id="search" type="text" placeholder="Search for any Pokemon!" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value.toLowerCase())} />
                <button type="submit">Search</button>
            </form>
        </div>
        <div className="type">
            <label htmlFor="options">Filter by Type: </label>
            <select id="options" value={type} onChange={handleOptionChange}>
                <option value="All">All</option>
                <option value='water'>water</option>
                <option value='poison'>poison</option>
                <option value='fairy'>fairy</option>
                <option value='psychic'>psychic</option>
                <option value='fire'>fire</option>
                <option value='ground'>ground</option>
                <option value='normal'>normal</option>
                <option value='grass'>grass</option>
            </select>
            {/* <p>Selected option: {type}</p> */}
        </div>
        <div className="id">
        <form onSubmit={handleIntSubmit}>
            <label htmlFor="integer-input">Filter by ID: </label>
            <input
                type="text"
                id="integer-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="Submit"> Submit value</button>
        </form>
        </div>
        
    </div>
    <table>
        <thead>
            <tr>
                <th>Sprite</th>
                <th>ID#</th>
                <th>Name</th>
                <th>Type(s)</th>
                <th>Abilities</th>
                <th>View More</th>
            </tr>
        </thead>
        <tbody>
            {displayList.map((mon) => (
                <tr key={mon.id}>
                    <td className="left-sprite">
                    <img src={mon.sprite} alt="The sprite image for the selected pokemon" />
                    </td>
                    <td>{mon.id}</td>
                    <td>{capitalizeFirstLetter(mon.name)}</td>
                    <td className="large">{mon.types.map((type) => (
                            <span key={type}> {type} </span>
                        ))}
                    </td>
                    <td>{mon.abilities.map((ability) => (
                            <span key={ability.ability.name}> {ability.ability.name} </span>
                        ))}
                    </td>
                    <td>
                        <Link to={"/" + mon.id}> Click ME!</Link>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    </div>
    <Routes>
        {/* <Route path="/" element={<List />}/> */}
        {/* <Route path="/:id" element={<Item />}/> */}
    </Routes>
    </>
   )
}

export default List