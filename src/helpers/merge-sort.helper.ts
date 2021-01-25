export default function mergeSort(comparatorFn: (arrFirst: any[], arrSecond: any[]) => number, array: any[]): any[] {
    const length = array.length;
    let firstHalf;
    let secondHalf;
    if (length >= 2) {
        firstHalf = array.slice(0, length / 2);
        secondHalf = array.slice(length / 2, length);
        return merge(comparatorFn, mergeSort(comparatorFn, firstHalf), mergeSort(comparatorFn, secondHalf));
    } else {
        return array.slice();
    }
}

function merge(
    comparatorFn: (arrFirst: any[], arrSecond: any[]) => number,
    arrayFirst: any[],
    arraySecond: any[],
): any[] {
    const result = [];
    let leftFirst = arrayFirst.length;
    let leftSecond = arraySecond.length;
    while (leftFirst > 0 && leftSecond > 0) {
        if (comparatorFn(arrayFirst[0], arraySecond[0]) <= 0) {
            result.push(arrayFirst.shift());
            leftFirst--;
        } else {
            result.push(arraySecond.shift());
            leftSecond--;
        }
    }
    if (leftFirst > 0) {
        result.push.apply(result, arrayFirst);
    } else {
        result.push.apply(result, arraySecond);
    }
    return result;
}
