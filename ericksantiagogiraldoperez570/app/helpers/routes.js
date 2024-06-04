import { homeScene } from "../scenes/private/home";
import { loginScene } from "../scenes/public/login/login.scene";
import { notFoundScene } from "../scenes/public/not-found/not-found.scene";
import { registerScene } from "../scenes/public/register";

export const routes = {
    public:[
        {path: "/login", scene: loginScene},
        {path: "/register", scene: registerScene},
        {path: "/notFound", scene: notFoundScene}
    ],
    private:[
        {home: "/dashboard/home", scene: homeScene}
    ]
}