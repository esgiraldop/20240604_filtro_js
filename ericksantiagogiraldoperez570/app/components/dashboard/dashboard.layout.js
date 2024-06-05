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
    const $logout = document.getElementById("logoutBttn")
    $logout.addEventListener('click', ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        navigateTo('/login')
    })
    return
}