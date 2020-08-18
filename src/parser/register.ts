import text from "./plugin/text";
import screen from "./plugin/screen";

const register: Record< string, (o: any)=> string > = {
    text,
    screen
}

export default register;