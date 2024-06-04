import { loginScene } from "../scenes/public/login/login.scene";
import { registerScene } from "../scenes/public/register";

export const routes = {
    public:[
        {path: "/login", scene: loginScene},
        {path: "/register", scene: registerScene}
    ],
    private:[
    
    ]
}