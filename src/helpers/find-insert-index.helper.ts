export default function findInsertIndex(comparatorFn: (arrFirst: any[], arrSecond: any[]) => number, array: any[], el: any) {
    var i, len;
    for (i = 0, len = array.length; i < len; i++) {
        if (comparatorFn(array[i], el) > 0) {
            break;
        }
    }
    return i;
}