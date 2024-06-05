import { fetchApi } from "../../../../helpers/fetch-api"
import { navigateTo } from "../../../../router"
import styles from "./home.styles.css"

export function homeScene(params){
    const pageContent = `
        <div>
            <h2>Welcome visitor. These are the current flights</h2>
            <div id="flights_container">
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
        //Adding event listeners to buttons
        const $bookButtons = document.querySelectorAll("button[action=book]")
        const $bookButtonsArray = [...$bookButtons]
        console.log("$bookButtonsArray: ", $bookButtonsArray)

        $bookButtonsArray.forEach($bookBttn => {
            $bookBttn.addEventListener('click', async (e) =>{
                
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
                            flightId: e.target.getAttribute('flightnumber'),
                            userId: userId,
                            bookingDate: new Date()
                        })
                    }, negMsg, posMsg)
                    if(!sentData){
                        alert("There was a problem booking the flight. Please try again later")
                        return
                    }
                    //TODO: Update the flight capacity

                    return
                }
                alert("Booking cancelled")
            })
        })
    }
    return{pageContent, logic}
}