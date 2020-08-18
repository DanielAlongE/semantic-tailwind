import Text from "../../types/text"

export default function(obj: Text): string {

    return Object.entries(obj).map( ([key, value]) => {

        if(['opacity'].includes(key)){
            return `text-${key}-${value}`
        }
        else if (['decoration', 'transform', 'wordBreak', 'fontStyle'].includes(key)){
            return `${value}`
        }
        else if(['whitespace'].includes(key)){
            return `${key}-${value}`
        }
        else if(['fontWeight', 'fontFamily'].includes(key)){
            return `font-${value}`
        }
        else if(key == "LetterSpacing"){
            return `tracking-${value}`
        }
        else if(key == "lineHeight"){
            return `leading-${value}`
        }

        return `text-${value}`
    }).join(" ")

}