import { fetchApi } from "../../../../helpers/fetch-api"
import { navigateTo } from "../../../../router"
import styles from "./homeAdmin.styles.css"

export function homeAdminScene(){
    const pageContent = `
        <div>
            <h2>Welcome admin. These are the current flights</h2>
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
                                <button action="edit" id="${flightData.id}" flightNumber="${flightData.flightNumber}">Edit</button>
                                <button action="delete" id="${flightData.id}" flightNumber="${flightData.flightNumber}">Delete</button>
                            </div>
                        `
                    }).join('')
                }
        `
        //Adding event listeners to buttons
        const $editButtons = document.querySelectorAll("button[action=edit]")
        const $editButtonsArray = [...$editButtons]
        const $deleteButtons = document.querySelectorAll("button[action=delete]")
        const $deleteButtonsArray = [...$deleteButtons]

        $editButtonsArray.forEach($editBttn => {
            $editBttn.addEventListener('click', () => navigateTo(`/homeAdmin/editFlight?flightId=${$editBttn.id}`))
        })

        $deleteButtonsArray.forEach($deleteBttn => {
            $deleteBttn.addEventListener('click', async () => {
                const negMsg = `The flight with flight number ${$deleteBttn.flightNumber} could not be deleted`
                const posMsg = `The flight with flight number ${$deleteBttn.flightNumber} was deleted succesfully`
                const usrResponse = confirm("Do you want to delete this flight?")
                if(usrResponse){
                    await fetchApi(`http://localhost:3000/flight/${$deleteBttn.id}`, {
                        method: 'DELETE',
                        headers:{
                            "Content-Type": "application/json"
                        }
                    }, negMsg, posMsg)
                    const $divItem = $deleteBttn.parentElement
                    $divItem.parentElement.removeChild($divItem)
                    return
                }
                alert("Deletion cancelled")
            })})
    
    }
    return{pageContent, logic}
}