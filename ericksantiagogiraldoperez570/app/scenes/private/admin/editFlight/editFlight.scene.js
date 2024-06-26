import { fetchApi } from '../../../../helpers/fetch-api'
import { navigateTo } from '../../../../router'
import styles from './editFlight.styles.css'

export function editFlightScene(params){
    const pageContent = `
    <h3>Note: Do not edit a field if you want to keep the same information of that specific field in the database. You can only edit the departure, arrival dates and the capacity of the flight</h3>
    <form class="${styles.create_form}" id="flights_form">
        <label for="flightNum">Flight number</label>
        <input type="text" name="flightNum" disabled>

        <label for="origin">Origin</label>
        <input name="origin" type="text" disabled>

        <label for="destination">Destination</label>
        <input name="destination" type="text" disabled>

        <label for="depDate">Departure date</label>
        <input type="date" name="depDate">

        <label for="arrDate">Arrival date</label>
        <input type="date" name="arrDate">

        <label for="capacity">Capacity</label>
        <input type="number" id="quantity" name="capacity" min="0" max="350">

        <button class="${styles.create_form_elem}" id="saveBttn">Save</button>
    </form>
    <button id="goBack2flightsBttn">Go back to flights</button>
    `

    const logic = async () =>{
        const flightId = params.get('flightId')
        // Getting the info of the flight from the database
        let negMsg = `No flight with id ${flightId} could be retrieved. Please try with another id` //In theory, this message should never be displayed
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
        const $saveBttn = document.getElementById("saveBttn")
        
        $saveBttn.addEventListener('click', async (e)=>{
            e.preventDefault()

            //Checking the admin filled all the fields
            if(!$flightNum.value || !$origin.value || !$destination.value || !$depDate.value || !$arrDate.value || !$capacity.value){
                alert("Please fill in all the fields")
                return
            }

            negMsg = `Flight with flight number ${flightData.flightNumber} could not be edited`
            const posMsg = `Flight with flight number ${flightData.flightNumber} was edited successfully`
            const sentData = await fetchApi(`http://localhost:3000/flight/${flightId}`, {
                method: "PUT",
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
            //Validating the data was sent
            if(!sentData){
                alert("There was an error posting the data. Please try again later")
            }
            navigateTo("/dashboardAdmin")
        })

        const $goBack2flightsBttn = document.getElementById("goBack2flightsBttn")
        goBack2flightsBttn.addEventListener('click', () =>{
            navigateTo("/dashboardAdmin")
        })
    }

    return {pageContent, logic}
}