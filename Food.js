class Food{
    constructor(){
        var options = {
        foodStock: empty,
        lastFed: '',
        }
        this.loadImage=("Milk.png");



    }
    bedroom(){
        background(bedroom, 550,500);
    }

    garden(){
        background(garden, 550,500);
    }

    washroom(){
        background(washroom, 550,500);
    }

    display(){
        var getFoodStock;
        var updateFoodStock;
        var deductFood;

        var x=80, y=100;

        imageMode(CENTER);
        image(this.image, 720,220,70,70);

        if(this.foodStock!=0){
            for(var i=0; i< globalThis.foodStock; i++){
                if(i%10==0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }

        
    }




}


