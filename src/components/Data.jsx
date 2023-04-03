import React, { PureComponent } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";
  

  const typeData = [
    {
        name: 'normal',
        count: 22
    },
    {
        name: 'fire',
        count: 12
    },
    {
        name: 'water',
        count: 32
    },
    {
        name: 'grass',
        count: 15
    },
    {
        name: 'electric',
        count: 9
    },
    {
        name: 'ice',
        count: 5
    },
    {
        name: 'fighting',
        count: 8
    },
    {
        name: 'poison',
        count: 33
    },
    {
        name: 'ground',
        count: 14
    },
    {
        name: 'flying',
        count: 19
    },
    {
        name: 'psychic',
        count: 14
    },
    {
        name: 'bug',
        count: 12
    },
    {
        name: 'rock',
        count: 11
    },
    {
        name: 'ghost',
        count: 3
    },
    {
        name: 'dragon',
        count: 3
    },
    {
        name: 'steel',
        count: 2
    },
    {
        name: 'fairy',
        count: 5
    },
]

const Data = () => {
    return(
            <BarChart className='Data'
                width={1100}
                height={300}
                data={typeData}
                margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 30,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
    )
}

export default Data



