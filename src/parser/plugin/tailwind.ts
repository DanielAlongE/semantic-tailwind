import Tailwind from "../../types";
import register from "../register";
import { isString } from "../../lib/type-check";

export default function(tailwindObj: Tailwind): string {
    
    return Object.entries(tailwindObj).map( ([k, value]) => {
        const key = (isString(k) ? k : "") as string;
        
        if(key in register){
            const fn = register[key];
            return fn(value);
        }

        return " blank ";
        
    }).join(" ");
}