export default function findInsertIndex(comparatorFn: (arrFirst: any[], arrSecond: any[]) => number, array: any[], el: any) {
    let i; 
    let length;
    for (i = 0, length = array.length; i < length; i++) {
        if (comparatorFn(array[i], el) > 0) {
            break;
        }
    }
    return i;
}