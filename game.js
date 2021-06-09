var context, controller, mainloop, player, upgrades, conveyor, 
    conveyorbackground, token, currenttokens;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 750;
context.canvas.width = 500;

player = {
    maxballs:40,
    wallsup:false,
    coins:0
};

token = {
    type : "regular",
    regularcolor : "#ffff4d",
    doublecolor : "#79ff4d",
    regularsize : 10
}

upgrades = {

};

currenttokens = {
    
}

conveyor = {
    color : "#43474d",
    speed : 1,
    width : 50,
    currentheight : 0,
    maxheight : 100,
    growing : true,
    dy : 0
}


conveyorbackground = {
    totalwidth : context.canvas.width,
    height: 100, //should change with max height of conveyor
    unplaceable_color : "#e34b40",
    placeable_color : "#d6d8dc",
    placeable_width : conveyor.width
}   

controller = {
    clickx : 0,
    clicky : 0,
    clicking : function (event){
        var xPos = 0;
        var yPos = 0;

        while (event){
            if (event.tagName == "BODY"){
                var xScrollPos = event.scrollLeft || 
                    document.documentElement.scrollLeft;
                var yScrollPos = event.scrollTop || 
                    document.documentElement.scrollTop;

                xPos += (event.offsetLeft - xScrollPos + event.clientLeft);
                yPos += (event.offsetTop - yScrollPos + event.clientTop);
            }

            else{
                xPos += (event.offsetLeft - event.scrollLeft + 
                        event.clientLeft);
                yPos += (event.offsetTop - event.scrollTop + event.clientTop);
            }
        }
        controller.clickx = xPos;
        controller.clicky = yPos;  
        return;
    }
};

function moveconveyor (){
    conveyor.dy = conveyor.maxheight / 1000;
    if (conveyor.currentheight >= conveyor.maxheight){
        conveyor.growing = false;
    }
    if (conveyor.currentheight <= 0){
        conveyor.growing = true;
    }
    if (!conveyor.growing){
        conveyor.dy = conveyor.dy * -1;
    }
    conveyor.currentheight += conveyor.dy;
};

function drawconveyor (){
    var leftPos = (context.canvas.width - conveyor.width) / 2;
    context.fillStyle = conveyor.color;
    context.fillRect (leftPos, 0, conveyor.width, conveyor.currentheight);
};

function drawconveyorback (){
    context.fillStyle = conveyorbackground.unplaceable_color;
    context.fillRect(0, 0, conveyorbackground.totalwidth, 
        conveyorbackground.height);
    context.fillStyle = conveyorbackground.placeable_color;
    var leftPos = (context.canvas.width - conveyor.width) / 2;
    context.fillRect(leftPos, 0, conveyorbackground.placeable_width, 
        conveyorbackground.height);
};

function createtoken (e) {
    var rect = context.canvas.getBoundingClientRect();
    var posx = e.clientX - rect.left;
    var posy = e.clientY - rect.top;

    context.fillStyle = token.regularcolor;
    context.beginPath();
    context.arc(posx, posy, token.regularsize, 0, 2 * Math.PI);
    context.fill()
};

mainloop = function(){
    //things

    //conveyor functions
    drawconveyorback();
    drawconveyor();
    moveconveyor();


    window.requestAnimationFrame(mainloop);
}

//window.addEventListener("click", controller.clicking);
window.addEventListener("click", createtoken);
window.requestAnimationFrame(mainloop);