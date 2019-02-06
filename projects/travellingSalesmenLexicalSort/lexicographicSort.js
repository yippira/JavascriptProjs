
function lexicographicOrder(list) {

    var largestX = -1;
    for (let i = 0; i < list.length - 1; i++) {
        if (list[i] < list[i + 1]) {
            //its not to find the largest "element" that is smaller, but the largest index that has a bigger element that is smaller than the next
            largestX = i;

        }
    }

    if (largestX == -1) {
        noLoop();
        console.log('Finished');
    }

    var largestY = -1;
    for (let i = 0; i < list.length; i++) {
        if (list[largestX] < list[i]) {
            largestY = i;
        }
    }

    swap(list, largestX, largestY);

    //STEP 4.

    var endArray = list.splice(largestX + 1);
    endArray.reverse();
    return list = list.concat(endArray);

}

