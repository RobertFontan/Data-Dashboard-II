import React from "react"

const Card = (props) => {



    return (

        <div className="Card">
            
            <h2>{props.header}</h2>
            <h3>{props.info}</h3>

        </div>
    )

}


export default Card