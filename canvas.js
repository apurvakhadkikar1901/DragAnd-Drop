var canvas = document.getElementById("can"),
ctx = canvas.getContext("2d"),
bounding = canvas.getBoundingClientRect(),
width = canvas.width,
height = canvas.height,
dragok = false,
rectsL=[],
currentDrag,bool=false,
rectsR=[],
startxpos,startypos,
ans=[],
small=['a','b','c','d'];

//shuffle array and then get positions
function shuffle(arr){
  for(var i=arr.length-1;i>0;i--){
    var j= Math.floor(Math.random()*(i+1));
    var temp= arr[i];
    arr[i]=arr[j];
    arr[j]=temp;
  }
  return arr;
 }
 small=shuffle(small);
 console.log(small);
//Left boxes 
rectsL.push({x:220, y:85, width:100, height:50, text:'A',fill: "black",isDragging : false}),
rectsL.push({x:220, y:85*2, width:100, height:50,text:'B',fill: "black",isDragging :false}),
rectsL.push({x:220, y:85*3, width:100, height:50,text:'C',fill: "black",isDragging:false}),
rectsL.push({x:220, y:85*4, width:100, height:50,text:'D',fill: "black",isDragging:false}),
//Right boxes
rectsR.push({x:500, y:85, width:100, height:50, text:small[0],fill: "black"});
rectsR.push({x:500, y:85*2, width:100, height:50,text:small[1],fill: "black"});
rectsR.push({x:500, y:85*3, width:100, height:50,text:small[2],fill: "black"});
rectsR.push({x:500, y:85*4, width:100, height:50,text:small[3],fill: "black"});
rectsR.push({x:350, y:85*5, width:150, height:50,text:'Submit',fill: "black"});
draw();
var rectRpos=[];
var rectspos=[];
var dropindex=[];
for(var i=0;i<rectsR.length;i++){
  rectRpos.push(rectsR[i].y);
}
for(var i=0;i<rectsL.length;i++){
  rectspos.push(rectsL[i].y);
}
//Draw single rectangle
function rect(x, y, w, h,text){
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font = 'italic 17pt Calibri';
    ctx.fillText(text,x+40, y+30);
}
function clear(){
  console.log(width,"width",height,"height");
    ctx.clearRect(0, 0, width, height);
}
function draw() {
    // ctx.fillStyle = "gray";
    clear();
    for(var i = 0; i < rectsR.length; i++){
      var rR = rectsR[i];
      ctx.fillStyle = rR.fill;
      rect(rR.x, rR.y, rR.width, rR.height,rR.text);
    }
    for (var i = 0; i < rectsL.length; i++){
        var r = rectsL[i];
        ctx.fillStyle = r.fill;
        rect(r.x, r.y, r.width, r.height,r.text);
    }
}
canvas.addEventListener("mousedown",mousedown);
function mousedown(e){
console.log("mouseDown",e);
var mousex = e.clientX - bounding.left;
var mousey = e.clientY - bounding.top;
dragok=true;
    for (var i = 0; i < rectsL.length; i++){
        currentDrag = rectsL[i];
        console.log(currentDrag,"mousedown r");
        if (mousex > currentDrag.x && mousex < currentDrag.x + currentDrag.width && mousey > currentDrag.y && mousey < currentDrag.y + currentDrag.height ){
              currentDrag.isDragging = true;
              canvas.addEventListener("mousemove",mousemove);
              canvas.addEventListener("mouseup",mouseup);
              break;
        }
        console.log(rectsL,"rects");
    }
    startxpos = mousex;
    startypos = mousey;
    console.log(startxpos,"xpos",startypos,"ypos","in mouse down");
}
function mousemove(e){
  console.log("mousemove");
    var mousex = e.clientX - bounding.left;
    var mousey = e.clientY - bounding.top;
    var dx = mousex - startxpos;
    var dy = mousey - startypos;
        if(currentDrag.isDragging){
              console.log(currentDrag.x,"rx");
              currentDrag.x += dx;
              currentDrag.y += dy;   
          } 
    draw();
    startxpos = mousex;
    startypos = mousey;
    console.log(startxpos,"xpos",startypos,"ypos","in mouse move");
}

function mouseup(e){
  console.log("mouseup");
     dragok = false;
     for (var i = 0; i < rectsL.length; i++){
      currentDrag.isDragging = false;
        var R=rectsR[i];
          if(currentDrag.x+currentDrag.width>R.x && currentDrag.x<R.x+R.width && currentDrag.y+currentDrag.height>R.y && currentDrag.y<R.y+R.height){ 
            console.log("yes");
              console.log(currentDrag.y,"after");
              // if(dropindex.indexOf(i) != -1){
              //   console.log(ans,"ans");
              //   console.log("yes","check it is in array");
              //   currentDrag.x=220;
              //   var h=rectsL.indexOf(currentDrag);
              //   currentDrag.y= rectspos[h];
              // }else{
                if(currentDrag.isDragging == false){
                  currentDrag.isDragging=true;
                  bool=true;
                  currentDrag.x=R.x;
                  currentDrag.y=R.y;
                  dropindex.push(i);
                  ans.push({"dragY":rectsL.indexOf(currentDrag),"dropY":i});
                  console.log("no","check it is not in arrray");
                  console.log(dropindex,"dropindex");
                // }
                }
                console.log(i,"i");
                console.log(bool,"bool");
                break;
            }
            bool=false; 
          }
              if(!bool){
              currentDrag.x=220;
              var h=rectsL.indexOf(currentDrag);
              currentDrag.y= rectspos[h];
              }
        currentDrag="";
        draw();
        canvas.removeEventListener("mousemove",mousemove);
        canvas.removeEventListener("mouseup",mouseup);
        
}
//submit click 
//check array
var check=[];
console.log(small.indexOf('a'),"small index of a");
check.push({'dragY':0,'dropY':small.indexOf('a')});
check.push({'dragY':1,'dropY':small.indexOf('b')});
check.push({'dragY':2,'dropY':small.indexOf('c')});
check.push({'dragY':3,'dropY':small.indexOf('d')});
console.log(check,"check array");
// console.log(check[check.indexOf(2)].,"check");
var R= rectsR[4];
canvas.addEventListener("click",function(e){
  var mousex = e.clientX - bounding.left;
  var mousey = e.clientY - bounding.top;
  console.log("click");
  console.log(ans,"ans");
  if(ans.length>=4){
    console.log('click_yes');
    ctx.fillStyle = "red";
    rect(rectsR[4].x,rectsR[4].y,rectsR[4].width,rectsR[4].height,rectsR[4].text);
  if (mousex> R.x && mousex <= R.x + R.width && mousey >= R.y && mousey <= R.y + R.height){
    console.log("yes it is submit");
    for(var i=0; i<=3;i++){
      var value1=ans[i].dragY;
      var value2=ans[i].dropY;
      if(check[i].dragY == ans[i].dragY && check[i].dropY == ans[i].dropY){
        console.log(value1,value2,"correct");
      }else{
        console.log(value1,value2,"wrong");
        ctx.fillStyle = "red";
        rect(500,rectRpos[value2],rectsR[value2].width,rectsR[value2].height,rectsR[value2].text);
        ctx.fillStyle = "red";
        rect(220,rectspos[value1],rectsL[value1].width,rectsL[value1].height,rectsL[value1].text);
      }
    }
    }
  }
});




