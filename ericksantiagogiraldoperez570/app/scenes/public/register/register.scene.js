import { navigateTo } from '../../../router'
import { encryptData } from '../../../helpers/encrypt'
import { fetchApi } from '../../../helpers/fetch-api'
import styles from '../../../helpers/styles.css'
import { emailValidator } from '../../../helpers/emailValidator'

export function registerScene(){
    const $root = document.getElementById("root")
    $root.innerHTML = `
    <form class=${styles.formContainer}>
        <legend for="username">User name</legend>
        <input name="username" type="text" placeholder="username">

        <legend for="email">Email</legend>
        <input name="email" type="email" placeholder="johndoe@example.com" autocomplete="email">

        <legend for="birthdate">Birthdate</legend>
        <input name="birthdate" type="date">

        <legend for="password">Password</legend>
        <input name="password" type="password" placeholder="password" autocomplete="current-password">

        <button type="submit">Register</button>
    </form>
    <button id="gotoLogin">Go to login</button>
    `
    const $form = document.getElementsByTagName("form")[0]

    $form.addEventListener('submit', async e =>{
        e.preventDefault()

        const $username = document.querySelector("input[type=text]")
        const $email = document.querySelector("input[type=email]")
        const $password = document.querySelector("input[type=password]")
        const $birthdate = document.querySelector("input[type=date]")
        console.log("$username: ", $username)
        if(!$username.value || !$email.value || !$password.value){
            alert("Please enter all the fields")
            return
        }

        if(!emailValidator($email.value)){
            alert("Please enter a valid email. It should be of type jhondoe@example.com")
            return
        }

        const userByEmail = await fetchApi(`http://localhost:3000/users?email=${$email.value}`, {})
        if(userByEmail.length > 0){
            alert("The user email is already in use. Please try with another email")
            return
        }
        let negMsg = "The register was not successful. Please try again"
        let posMsg = "The registration was sucessful!"
        const data = await fetchApi('http://localhost:3000/users', {
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name: $username.value,
                email: $email.value,
                password: encryptData($password.value),
                birthdate: $birthdate.value,
                roleId: "1",
            })
        }, negMsg, posMsg)
        if(data){
            navigateTo('/login')
        }
    })
    // Go to registration
    const $gotoLoginBttn = document.getElementById("gotoLogin")
    console.log("$gotoLoginBttn: ", $gotoLoginBttn)
    $gotoLoginBttn.addEventListener('click', ()=>{
        navigateTo("/login")
    })
}