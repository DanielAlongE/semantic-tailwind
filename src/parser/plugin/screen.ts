import tailwind from "./tailwind"
import Tailwind, { Screen } from "../../types"

export default function(obj: Record<Screen, Tailwind>): string {
    
    return Object.entries(obj).map( ([key, value]) => {

        return tailwind(value).split(" ").map( prop => `${key}:${prop}`).join(" ")

    }).join(" ");

}