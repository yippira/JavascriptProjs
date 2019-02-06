class Perceptron{

    
    constructor(){
        this.weights = [];
        this.lr = 0.1;
        for(var i = 0; i < 2; i++){
            this.weights[i] = random(-1,1);
        }
    }

    sign(sum){
        if(sum >= 0){
            return 1;
        }
        return -1;
    }


    guess(inputs){
        var sum = 0;
        for(var i = 0; i < this.weights.length; i++){
            sum += inputs[i] * this.weights[i];
        }

        return this.sign(sum);
    }

    train(target, input){
        var guess = this.guess(input);
        var error = target - guess;
        //remember its target - guess, not guess - target.


        for(let i = 0; i < this.weights.length; i++){
            this.weights[i] = this.weights[i] + error * input[i] * this.lr;
            //remember this formula, can be derived using chain rule and power rule (gradient descent)
        }
    }



}