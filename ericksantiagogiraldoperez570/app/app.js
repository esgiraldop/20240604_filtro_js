import { router } from "./router"

export function app() {
    const $root = document.getElementById("root")
    if(!$root){
        throw new Error("The page could not be loaded")
    }
    document.write("Hello from app")
    router()
}