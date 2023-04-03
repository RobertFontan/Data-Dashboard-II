import React from "react"

const Card = (props) => {



    return (

        <div className="Card">
            
            <h3>{props.header}</h3>
            <h5>{props.info}</h5>

        </div>
    )

}


export default Card