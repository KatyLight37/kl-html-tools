class Ball {
  constructor(props) {
    this.role = props.role
    this.x = props.x || 0
    this.y = props.y || 0
    this.data = props.data || {}
    this.scale = props.scale || { x: 1, y: 1 }
    this.move = props.move
    this.rotate = props.rotate || 0
    this.fillStyle = props.fillStyle || '#00000055'
    this.strokeStyle = props.strokeStyle || '#000000'
    this.stroke = props.stroke === undefined ? false : props.stroke
    this.fill = props.fill === undefined ? true : props.fill
    switch (this.role) {
      case 'img':
         break
      case 'rect':
        this.w = props.w || 10
        this.h = props.h || 10

         break
      case 'cir':
        this.r = props.r || 10

         break
      default:
        break;
    }


  }

  go() {
    if (this.move) {
      this.move()
    }
  }

  setPosition(props) {
    this.x = props.x
    this.y = props.y
  }

  toDegGo(deg, length) {
     this.x = this.x + length * Math.cos(deg * Math.PI / 180)
    this.y = this.y + length * Math.sin(deg * Math.PI / 180)
  }

  toPointGo(p2, length,v) {
     let k=Math.sqrt(Math.pow(Math.abs(this.x-p2.x),2)+Math.pow(Math.abs(this.y-p2.y),2));
    if(k<(v||10)){
      return true;
    }
    let deg = Math.atan2((p2.y - this.y), (p2.x - this.x)) * (180 / Math.PI)
    this.x = this.x + length * Math.cos(deg * Math.PI / 180)
    this.y = this.y + length * Math.sin(deg * Math.PI / 180)
    return false;
  }

  checkOutSide() {

  }
}

class Table {
  constructor(props) {
    this.ballList = []
    this.canvas = props.canvas
    this.ctx = this.canvas.getContext('2d')
    this.viewInterval = setInterval(() => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ballList.forEach(item => {
        let x = 0, y = 0
        let w = 0, h = 0, r = 0
        this.ctx.fillStyle = item.fillStyle
        this.ctx.strokeStyle = item.strokeStyle
        this.ctx.beginPath()
        this.ctx.save()
        switch (item.role) {
          case 'img':
            break
          case 'rect':
            x = item.x - item.w / 2
            y = item.y - item.h / 2
            if (item.rotate || item.scale.x !== 1 || item.scale.y !== 1) {
              this.ctx.translate(item.x, item.y)
              this.ctx.rotate(item.rotate * Math.PI / 180)
              this.ctx.scale(item.scale.x, item.scale.y)
              this.ctx.translate(-item.x, -item.y)
            }

            this.ctx.rect(x, y, item.w, item.h)
            break
          case 'cir':
            x = item.x
            y = item.y

            this.ctx.arc(x, y, item.r, 0, Math.PI * 2)
            break
        }

        if (item.stroke) {
          this.ctx.stroke()
        }
        if (item.fill) {
          this.ctx.fill()
        }
        this.ctx.restore()
        item.go()
      })
    }, 20)

  }

  setTable(table) {
    this.table = table
  }

  addBall(ball) {
    this.ballList.push(ball)
  }

  addBallList(arr) {
    arr.forEach(item => {
      this.ballList.push(item)
    })
  }

  removeBall(ball) {
    for (let i = 0; i < this.ballList.length; i++) {
      if (this.ballList[i] === ball) {
        this.ballList.splice(i, 1)
        break;
      }
    }
  }
}

