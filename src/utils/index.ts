import { format } from 'date-fns'

export const formatDateIfExists = (date?: string) => {
    if (!date) {
        return '-'
    }
    const formattedDate = format(new Date(date), "d (eee)");
    return formattedDate
}

export const tempConvertor = (temp: number, type: boolean) => {
    if(temp){
        if(!type){
            const fahrenheit = parseFloat((temp * 1.8 + 32).toFixed(2)).toString();
            return +`${fahrenheit}`;
        } else {
            return +`${temp}`;
        }
    }

}
