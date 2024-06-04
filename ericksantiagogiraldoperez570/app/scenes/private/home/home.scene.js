export function homeScene(){
    const pageContent = `
        <p>Hello from home view</p>
    `

    const logic = () =>{
        console.log("Hello from home view")
    }

    return{pageContent, logic}
}