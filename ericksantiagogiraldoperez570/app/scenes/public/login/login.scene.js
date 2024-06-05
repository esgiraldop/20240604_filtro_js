import { decryptData } from '../../../helpers/encrypt'
import { fetchApi } from '../../../helpers/fetch-api'
import { navigateTo } from '../../../router'
// import styles from '../../../helpers/styles.css'
// import globalStyles from '../../../helpers/styles.css'

export function loginScene(){
    const $root = document.getElementById("root")
    $root.innerHTML = `
        <form id="loginForm" class="formContainer">
            <h2>Sign in</h2>

            <legend for="email">Email</legend>
            <input id="email" name="email" type="email" placeholder="johndoe@example.com" autocomplete="email"/>

            <legend for="password">Password</legend>
            <input id="password" name="password" type="password" autocomplete="current-password"/>
            
            <button type="submit">Login</button>
        </form>
        <button id="gotoRegis">Go to register</button>
    `
    const $loginForm = document.getElementById("loginForm")
    $loginForm.addEventListener('submit', async (e) =>{
        e.preventDefault()
        const $email = document.getElementById("email")
        const $password = document.getElementById("password")

        // Checking all the fields were filled in
        if(!$email.value || !$password.value){
            alert("Please enter all fields")
            return
        }

        //Querying the database to check if the users exists
        const usrDataArray = await fetchApi(`http://localhost:3000/users?email=${$email.value}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const usrData= usrDataArray[0]
        
        if(!usrData){
            alert("The user does not exist. Please register first")
            return
        }

        //Checking the user entered the correct password
        if($password.value !== decryptData(usrData.password)){
            alert("Please enter a valid password")
            return
        }
        //Login successful
        localStorage.setItem('token', Math.random().toString(32).substring(2))
        localStorage.setItem('role', `${usrData.roleId}`)
        alert(`Welcome to your page ${usrData.name}!`)

        // Routing to dashboard visitor or to dashboard admin scenes
        const usrRole = localStorage.getItem("role")
        console.log("usrRole: ", usrRole)
        usrRole=="1"?navigateTo(`/dashboard?userId=${usrData.id}`):navigateTo('/dashboardAdmin')
        
    })

    // Go to registration
    const $gotoRegisBttn = document.getElementById("gotoRegis")
    $gotoRegisBttn.addEventListener('click', ()=>{
        navigateTo("/register")
    })
}