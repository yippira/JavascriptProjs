function compareToTen(x){
    if(x > 10){
        return new Promise();
    }
    return false;
}

var X = 26;
compareToTen(X)
.then(result => {
    return compareToTen(X-5)
    .then(result => {
        return compareToTen(X-10)
        .then(result => {
            console.log(X + " is greater than 10, and " + (X-5) + " is still greater than 10 and " + (X-10) + " is still greater than 10")
        })
    })
})
.catch(error => console.log(error));