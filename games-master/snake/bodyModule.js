let BodyModule = function(opt){
    let def = {
      width:10,
      color:'red',
      x:0,
      y:0
    }
    for(let i in opt){
      def[i] = opt[i];
    }
    let obj = document.createElement('div');
    obj.style.width = def.width + 'px';
    obj.style.height = def.width + 'px';
    obj.style.backgroundColor = def.color;
    obj.style.borderRadius = def.width + 'px';
    obj.style.position = 'absolute';
    obj.style.left = def.x + 'px';
    obj.style.top = def.y + 'px';
    this.element = obj;
    for(let i in def){
      this[i] = def[i]
    }
    this.balls = [];

}
BodyModule.prototype.add = function(ball){
    this.element.appendChild(ball.element);
    this.balls.push(ball);
}
BodyModule.prototype.move = function(x,y){

    for(let i = 0;i < this.balls.length;i++){
        this[i].x = this[i+1].x;
        this[i].y = this[i+1].y;
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }

    this.x = x;this.y = y;
    this.element.style.left = x - this.element.offsetWidth/2 + 'px';
    this.element.style.top = y - this.element.offsetWidth/2 +  'px'
}
BodyModule.prototype.destroy = function(parent){
    if(!parent)return;
    console.log(parent.removeChild)
    parent.removeChild(this.element);
}
