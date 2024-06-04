import { routes } from "./helpers/routes"

export function router(){
    const pathname = window.location.pathname
    const params = new URLSearchParams(window.location.search)
    const token = localStorage.getItem('token')
    const usrRole = localStorage.getItem('role')
    document.write("Hello from router")
}