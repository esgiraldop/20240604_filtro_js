import { createFlightScene } from "../scenes/private/admin/createFlight/createFlight.scene";
import { editFlightScene } from "../scenes/private/admin/editFlight/editFlight.scene";
import { homeAdminScene } from "../scenes/private/admin/home/homeAdmin.scene";
import { homeScene } from "../scenes/private/visitor/home";
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
        {path: "/dashboard", scene: homeScene, roles:["1"]},
        {path: "/dashboardAdmin", scene: homeAdminScene, roles:["2"]},
        {path: "/homeAdmin/editFlight", scene: editFlightScene, roles:["2"]},
        {path: "/homeAdmin/createFlight", scene: createFlightScene, roles:["2"]}
    ]
}