export function numbersParse(number) {
    let str = Math.floor(number) + ""; //make the integer a string
    let fractional = Math.round((number - str)*100) ;
        let sub = str.substring(str.length - 3, str.length); //the last three characters
    let newstr = " " + sub;
    let i = 1;
    while (sub.length >= 3) {
        sub = str.substring(str.length - ((i + 1) * 3), str.length - (i * 3)); //next three characters
        newstr = sub + " " + newstr; //append the characters
        i += 1;
    }
 
    return (
    fractional  
    ?  newstr + ',' + fractional
    :  newstr
    )
}

export function numbersParseToInteger(number) {
    let str = Math.floor(number) + ""; //make the integer a string
    let sub = str.substring(str.length - 3, str.length); //the last three characters
    let newstr = " " + sub;
    let i = 1;
    while (sub.length >= 3) {
        sub = str.substring(str.length - ((i + 1) * 3), str.length - (i * 3)); //next three characters
        newstr = sub + " " + newstr; //append the characters
        i += 1;
    }

    return (newstr )
}