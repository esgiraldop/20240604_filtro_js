import { navigateTo } from "../../router";
import { NavbarLayout } from "../navbar/navbar.layout";

export function DashboardLayout(pageContent, logic) {
    const root = document.getElementById('root');

    root.innerHTML = `
        <div id="container" class="">
            <div class="">
                ${NavbarLayout()}
            </div>
            <div class="">
                ${pageContent}
            </div>
        </div>
    `;
  
    logic();

    //Logout button
    const $logoutBttn = document.getElementById("logoutBttn")
    $logoutBttn.addEventListener('click', ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        navigateTo('/login')
    })
    //Book flight button
    const $bookFlightBttn = document.getElementById("bookFlightBttn")
    $bookFlightBttn.addEventListener('click', ()=>{
        const usrRole = localStorage.getItem("role")
        const userId = localStorage.getItem("userId")
        usrRole=="1"?navigateTo(`/dashboard?userId=${userId}`):navigateTo('/dashboardAdmin')
    })
    return
}