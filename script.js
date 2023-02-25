const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
const lines = []
const lineCount = 10
const lineWidth = 2
const lineColor = 'orange'
const maxSpeed = 4

document.body.append(canvas)
canvas.width = innerWidth
canvas.height = innerHeight
ctx.fillStyle = "#0001"

clear()

for (let i = 0; i < lineCount; i++) addLine()

lines.forEach(drawLine)

animate()

function animate() {
  clear()
  lines.forEach(line => {
    line.x1 += line.vx1
    line.x2 += line.vx2
    line.y1 += line.vy1
    line.y2 += line.vy2

    if (line.x1 < 0 || line.x1 > innerWidth) line.vx1 = -line.vx1
    if (line.x2 < 0 || line.x2 > innerWidth) line.vx2 = -line.vx2
    if (line.y1 < 0 || line.y1 > innerHeight) line.vy1 = -line.vy1
    if (line.y2 < 0 || line.y2 > innerHeight) line.vy2 = -line.vy2
  })
  lines.forEach(drawLine)

  requestAnimationFrame(animate)
}

function addLine() {
  lines.push({
    x1: random(innerWidth),
    y1: random(innerHeight),
    x2: random(innerWidth),
    y2: random(innerHeight),
    vx1: random(maxSpeed),
    vy1: random(maxSpeed),
    vx2: random(maxSpeed),
    vy2: random(maxSpeed),
  })
}

function drawLine({ x1, y1, x2, y2 }) {
  ctx.strokeStyle = lineColor
  ctx.lineCap = 'round'
  ctx.lineWidth = lineWidth

  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
}


function clear() {
  ctx.fillRect(0, 0, innerWidth, innerHeight)
}

function random(limit) {
  return Math.floor(Math.random() * limit)
}