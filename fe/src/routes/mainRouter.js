import aboutMain from "@/components/mainPage/aboutMain";
import homeMain from "@/components/mainPage/homeMain";
import dailydiaryMain from "@/components/mainPage/dailydiaryMain";
import projectdiaryMain from "@/components/mainPage/projectdiaryMain";

export default [
    {path: '/', component: homeMain},
    {path: '/home', component: homeMain},
    {path: '/about', component: aboutMain},
    {path: '/diary/project', component: projectdiaryMain},
    {path: '/diary/daily', component: dailydiaryMain},
    // {path: '*', component: NotFoundComponent}
]
