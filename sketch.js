var database
var dog,dogfeeding
var store
var dogsprite;
function preload()
{
  
  dog=loadImage("images/dogImg.png")
  dogfeeding=loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(800, 800);
  database=firebase.database()
  dogsprite=createSprite(400,400)
  dogsprite.addImage(dog)
  dogsprite.scale=0.3
  var foodvalue=database.ref('food/count')
  foodvalue.on("value",readvalue,error)
}


function draw() { 
  background("green") 
if(keyDown("UP_ARROW")){
  write()
  dogsprite.addImage(dogfeeding)
}
if(keyWentUp("UP_ARROW")){
  dogsprite.addImage(dog)
}
text("remaining food:"+store,150,150)
  drawSprites();
  

}
function readvalue(data)
{
store=data.val()
console.log(store)
}
function error(){
  console.log("read operation was unsuccessfull")
}
function write(){
database.ref('food').set({
  'count':store-1
})
}
