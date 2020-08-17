import Text from "../types/text"

const text = function(obj: Text): string {
        console.log("pasering text")
    return Object.entries(obj).map( ([key, value]) => {

        if(['opacity'].includes(key)){
            return ` text-${key}-${value}`
        }
        else if (['decoration', 'transform', 'wordBreak'].includes(key)){
            return ` ${value}`
        }
        else if(['whitespace'].includes(key)){
            return ` ${key}-${value}`
        }

        return ` text-${value}`
    }).join("")

}

const register: Record< string, (o: any)=> string > = {
    text
}

export default register;