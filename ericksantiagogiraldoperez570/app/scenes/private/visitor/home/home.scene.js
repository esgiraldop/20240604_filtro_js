import { fetchApi } from "../../../../helpers/fetch-api"
import { navigateTo } from "../../../../router"
import styles from "./home.styles.css"

export function homeScene(){
    const pageContent = `
        <div>
            <h2>Welcome visitor. These are the current flights</h2>
            <div id="flights_container">
            </div>
        </div>
    `

    const logic = async () => {
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
                            </div>
                        `
                }).join('')}
        `
    }
    return{pageContent, logic}
}