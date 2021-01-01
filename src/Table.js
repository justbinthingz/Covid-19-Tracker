import React from 'react'
import './Table.css'
import numeral from "numeral";


const Table = ({ countries }) => {
    return (
        <div className="table">

            {countries.map((country) => ( //here destructuring countries
                <tr>
                    <td>{country.country}</td>
                    {/* <td><strong>{(country.cases)}</strong></td> */}
                    <td><strong>{numeral(country.cases).format("0.0a")}</strong></td>
                </tr>
            ))}
        </div>
    )
}

export default Table
