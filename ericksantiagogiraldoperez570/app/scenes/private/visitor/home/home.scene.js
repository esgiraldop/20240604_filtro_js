import { fetchApi } from "../../../../helpers/fetch-api"
import { navigateTo } from "../../../../router"
import styles from "./home.styles.css"

export function homeScene(params){
    const pageContent = `
        <div>
            <div id="crrntFlights">
                <h2>Welcome visitor. These are the current flights</h2>
                <div id="flights_container">
                </div>
            </div>
            <div id="crrntReservations">
                <h2>These are your current reservations</h2>
                <div id="reservations_container">
                </div>
            </div>
        </div>
    `
    
    const logic = async () => {
        const userId = params.get('userId')
        const $flightsContainer = document.getElementById("flights_container")

        const negMsg = "Flights could not be retrieved"
        const flightsData = await fetchApi('http://localhost:3000/flight', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        }, negMsg)

        // Displaying content for flights
        $flightsContainer.innerHTML = `
                ${flightsData.map(flightData => {
                    return `<div class="${styles.flight_element}">
                                <div>
                                    <p>Flight number</p>
                                    ${flightData.flightNumber}
                                </div>
                                <div>
                                    <p>Origin</p>
                                    ${flightData.origin}
                                </div>
                                <div>
                                    <p>Destination</p>
                                    ${flightData.destination}
                                </div>
                                <div>
                                    <p>Departure date</p>
                                    ${flightData.departureDate}
                                </div>
                                <div>
                                    <p>Arrival date</p>
                                    ${flightData.arrivalDate}
                                </div>
                                <div>
                                    <p>Capacity</p>
                                    ${flightData.capacity}
                                </div>
                                <button action="book" id="${flightData.id}" flightNumber="${flightData.flightNumber}">Book this flight</button>
                            </div>
                        `
                }).join('')}
        `
        //TODO: User has to be able to see their reservations
        // //Displaying current reservations
        // const $reservsContainer = document.getElementById("reservations_container")
        // const crrntReservations = await fetchApi(`http://localhost:3000/booking?userId=1`, )
        // $flightsContainer.innerHTML = `
                
        // `


        //Adding event listeners to buttons
        const $bookButtons = document.querySelectorAll("button[action=book]")
        const $bookButtonsArray = [...$bookButtons]
        console.log("$bookButtonsArray: ", $bookButtonsArray)

        $bookButtonsArray.forEach($bookBttn => {
            $bookBttn.addEventListener('click', async (e) =>{
                //Checking first if the flight has enough capacity
                const fetchedFlightData = await fetchApi(`http://localhost:3000/flight/${e.target.id}`, {})
                console.log("fetchedFlightData.capacity: ", fetchedFlightData.capacity)
                if(fetchedFlightData.capacity < 1){
                    alert("This flight is full already. You cannot book this flight")
                    return
                }

                //Saving the new info to the database
                const negMsg = `The flight with flight number ${e.target.getAttribute('flightnumber')} could not be booked`
                const posMsg = `The flight with flight number ${e.target.getAttribute('flightnumber')} was booked succesfully`
                const usrResponse = confirm("Do you want to book this flight?")
                if(usrResponse){
                     const sentData = await fetchApi(`http://localhost:3000/booking`, {
                        method: 'POST',
                        headers:{
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            flightId: e.target.id,
                            userId: userId,
                            bookingDate: new Date()
                        })
                    }, negMsg, posMsg)
                    if(!sentData){
                        alert("There was a problem booking the flight. Please try again later")
                        return
                    }

                    //TODO: Update the flight capacity
                    const bookdFlightId = sentData.flightId
                    const negMsg = `The capacity of flight with flight number ${e.target.getAttribute('flightnumber')} could not be updated`
                    const posMsg = `The capacity of flight with flight number ${e.target.getAttribute('flightnumber')} was successfully updated`
                    const editedData = await fetchApi(`http://localhost:3000/flight/${bookdFlightId}`, {
                        method: "PATCH",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({
                            capacity: `${Number(fetchedFlightData.capacity) - 1}`
                        })
                    }, negMsg, posMsg)
                    navigateTo('/dashboard') //El propio machetazo
                    return
                }
                alert("Booking cancelled")
            })
        })
    }
    return{pageContent, logic}
}