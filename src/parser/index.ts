import Tailwind from "../types/tailwind";
import register from "./register";
import { isString } from "../lib/type-check";

export default function(tailwindObj: Tailwind): string {
    
    return Object.entries(tailwindObj).map( ([k, value]) => {
        const key = (isString(k) ? k : "") as string;
        console.log("looing for key ",k, key)
        if(key in register){
            console.log("found key ", key)
            const fn = register[key];
            return fn(value);
        }

        return " blank ";
        
    }).join("");
}