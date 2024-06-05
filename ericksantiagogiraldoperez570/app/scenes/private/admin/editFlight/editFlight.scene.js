import { fetchApi } from '../../../../helpers/fetch-api'
import { navigateTo } from '../../../../router'
import styles from './editFlight.styles.css'

export function editFlightScene(params){
    const pageContent = `
    <h3>Note: Do not edit a field if you want to keep the same information of that specific field in the database</h3>
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

        <button class="${styles.create_form_elem}">Save</button>
    </form>
    `

    const logic = async () =>{
        const flightId = params.get('flightId')
        // Getting the info of the flight from the database
        const negMsg = `No flight with id ${flightId} could be retrieved. Please try with another id` //In theory, this message should never be displayed
        const flightDataArray = await fetchApi(`http://localhost:3000/flight?id=${flightId}`, {}, negMsg)
        const flightData = flightDataArray[0]
        if(!flightData){
            return ""
        }
        const $flightNum = document.querySelector("input[name=flightNum]")
        const $origin = document.querySelector("input[name=origin]")
        const $destination = document.querySelector("input[name=destination]")
        const $depDate = document.querySelector("input[name=depDate]")

        const $arrDate = document.querySelector("input[name=arrDate]")
        const $capacity = document.querySelector("input[name=capacity]")
        
        // Filling the data according to the flight in the database
        $flightNum.value = flightData.flightNumber
        $origin.value = flightData.origin
        $destination.value = flightData.origin
        $depDate.value = flightData.departureDate.split("T")[0]
        $arrDate.value = flightData.arrivalDate.split("T")[0]
        $capacity.value = flightData.capacity

        //Sending the info to the database
    }

    return {pageContent, logic}
}