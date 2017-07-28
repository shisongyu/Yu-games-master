let mapDiv = $('#map')[0];

let snake = new BodyModule({width:20});

let foods = [];

let MapWidth = mapDiv.offsetWidth;
let MapHeight = mapDiv.offsetHeight;

mapDiv.appendChild(snake.element);

document.addEventListener('mousemove',function(e){

    snake.move(e.clientX,e.clientY);
})

function addBall(){
  if(foods.length < 1){
      console.log('add')
      let width = Math.random()*5 + 6;
      let x = Math.random()*MapWidth;
      let y = Math.random()*MapHeight;
      let ball = new BodyModule({width:width,color:'green',x,y});
      foods.push(ball);
      mapDiv.appendChild(ball.element);
  }
}

function update(){
  addBall();
  for(let i = 0; i < foods.length;i++){
    if($.collision(foods[i],snake)){
        foods[i].destroy(mapDiv);
        snake.add(foods[i])
        foods.splice(i,1);

    }
  }
}

let updateTimer = setInterval(update,40);
