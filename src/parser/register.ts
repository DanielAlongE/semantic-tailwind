import Text from "../types/text"

const text = function(obj: Text): string {
    let result = "";
    
    Object.entries(obj).forEach( (key, value) => {
        result += ` text-${value}`
    })
    
    return result;
}

const register: Record< string, (o: any)=> string > = {
    text
}

export default register;