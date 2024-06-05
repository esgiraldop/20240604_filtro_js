import { fetchApi } from '../../../../helpers/fetch-api'
import { navigateTo } from '../../../../router'
import styles from './createFlight.styles.css'

export function createFlightScene(){
    const pageContent = `
    <form class="${styles.create_form}" id="flights_form">
        <label for="flightNum">Flight number</label>
        <input type="text" name="flightNum">

        <label for="origin">Origin</label>
        <input name="origin" type="text">

        <label for="destination">Destination</label>
        <input name="destination" type="text">

        <label for="depDate">Departure date</label>
        <input type="date" name="depDate">

        <label for="arrDate">Arrival date</label>
        <input type="date" name="arrDate">

        <label for="capacity">Capacity</label>
        <input type="number" id="quantity" name="capacity" min="0" max="350">

        <button class="${styles.create_form_elem}" id="saveBttn">Save</button>
    </form>
    `

    const logic = async () =>{
        const $flightNum = document.querySelector("input[name=flightNum]")
        const $origin = document.querySelector("input[name=origin]")
        const $destination = document.querySelector("input[name=destination]")
        const $depDate = document.querySelector("input[name=depDate]")

        const $arrDate = document.querySelector("input[name=arrDate]")
        const $capacity = document.querySelector("input[name=capacity]")
        
        //Sending the info to the database
        const $saveBttn = document.getElementById("saveBttn")
        
        $saveBttn.addEventListener('click', (e)=>{
            e.preventDefault()
            const negMsg = `Flight with flight number ${$flightNum.value} could not be created`
            const posMsg = `Flight with flight number ${$flightNum.value} was created successfully`
            const sentData = fetchApi(`http://localhost:3000/flight/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    flightNumber: $flightNum.value,
                    origin: $origin.value,
                    destination: $destination.value,
                    departureDate: $depDate.value,
                    arrivalDate: $arrDate.value,
                    capacity: $capacity.value
                })
            }, negMsg, posMsg)
        })
        
    }

    return {pageContent, logic}
}