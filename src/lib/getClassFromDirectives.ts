import { Directives } from "../types/styleConfig";
import { isObject } from "./type-check";

export default function getClassFromDirectives(props: any, directives: Directives): string {
  let className = "";
  Object.entries(directives).forEach(([directive, value]) => {
    if(props.hasOwnProperty(directive)){
      const currentValue = props[directive]
      if(isObject(value)){
        const c = (<Record<string,string>>value)[directive] || ""
        className += `${c} `;
      }
      else if(currentValue === true){
        className += `${value} `;
      }
    }
  })

  return className;
}