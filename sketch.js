var ball,ball2, database, position;

function setup(){
    database = firebase.database();
    console.log(database);
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    ball2 = createSprite(300,300,10,10);
    ball2.shapeColor = "blue";
    
    //read data from database
    var ball2position = database.ref('ball/position');
    ball2position.on("value",function(data){
        position = data.val();
        ball2.x = position.x;
        ball2.y = position.y;
    })
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writeposition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writeposition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writeposition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writeposition(0,+1);
    }   
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}

function writeposition(x,y){ 
    database.ref('ball/position').set(
        {x:position.x+x,
        y:position.y+y
        }     
    )
}