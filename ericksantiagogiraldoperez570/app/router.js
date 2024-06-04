import { DashboardLayout } from "./components/dashboard/dashboard.layout"
import { routes } from "./helpers/routes"

export function router(){
    const pathname = window.location.pathname
    const params = new URLSearchParams(window.location.search)
    const token = localStorage.getItem('token')
    const usrRole = localStorage.getItem('role')

    console.log("Hello before the first conditional")
    if(pathname === "/" || pathname === "/login" || pathname === "/register"){
        console.log("Hello from within the first conditional")
        if(token){
            navigateTo("/dashboard/home")
            return
        }
        if(pathname === "/"){
            navigateTo("/login")
            return
        }
    }
    
    const publicRoute = routes.public.find(path => path.path === pathname)
    
    const privateRoute = routes.private.find(path => path.path === pathname)

    if(publicRoute){
        publicRoute.scene()
        return
    }
    if(privateRoute){
        console.log("Hello.privateRoute exists")
        if(token && usrRole){
            if(!privateRoute.roles.includes(usrRole)){
                navigateTo('/notFound')
                return
            }
            const {pageContent, logic} = privateRoute.scene()
            console.log("Are you triying to pass over here?")
            DashboardLayout(pageContent, logic)
            return
        }
        navigateTo('/login')
        return
    }
    console.log("oelo")
    navigateTo('/notFound')
}

export function navigateTo(pathname){
    window.history.pushState({}, '', window.location.origin + pathname)
    router()
}