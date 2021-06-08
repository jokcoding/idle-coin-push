var context, controller, mainloop, player, upgrades;

context = document.querySelector("canvas").getContext("2d");

document. 

context.canvas.height = 2000;
context.canvas.width = 500;

player = {
    maxballs:40,
    wallsup:false,
    coins:0
};

upgrades = {

};

var conveyor = {
    color : "43474d",
    speed : 1
}

controller = {
    clickx = 0,
    clicky = 0,
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

function conveyor (){

};



mainloop = function(){
    //things


    window.requestAnimationFrame(mainloop);
}

window.addEventListener("click", controller.clicking)