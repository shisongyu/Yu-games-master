var name = 'aaa';
function P(){
  this.name = 'bbb'
  // var name = 'bbbb'
  function getName(){
    return this.name;
  }
  return getName;
}

P()()



var name = 'a';
function Ani(){
  this.name = 'b'
  this.show = function(){
    setTimeout(function(){
      console.log('111'+ this.name)
    })
  }
  this.say = function(){
    console.log("222" + this.name)
  }
}

var a = new Ani;
a.show()
a.say()
