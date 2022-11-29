import './style.css'
import Dot from './dot'
import gsap from 'gsap'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const img = document.querySelector('img')
const radius = 300;
let isImage = true;


canvas.width = innerWidth
canvas.height = innerHeight

addEventListener('click', () => {
  console.log('clicked')
  isImage = !isImage
})

function animateDot(dot, canvas) {
  const rand = Math.random() * Math.PI * 2
  let x = Math.sin(rand) * radius + canvas.width / 2
  let y = Math.cos(rand) * radius + canvas.height / 2
  if (isImage) {
    x = dot.imageX
    y = dot.imageY
  }
  gsap.to(dot, {
    duration: 1.75 + Math.random(),
    x,
    y,
    ease: 'cubic.inOut',
    onComplete: () => {
      animateDot(dot, canvas)
    }
  })
}


addEventListener('load', () => {
  ctx.drawImage(img, 0, 0)

  const imageData = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight)
  console.log(imageData);
  let pixels = [];
  let dots = [];
  for (let i = 0; i < imageData.data.length; i += 4) {
    if (imageData.data[i] === 0) continue
    const x = (i / 4) % img.naturalWidth;
    const y = Math.floor((i / 4) / img.naturalWidth);

    if (x % 5 === 0 && y % 5 === 0) {
      pixels.push({
        x,
        y,
        r: imageData.data[i],
        g: imageData.data[i + 1],
        b: imageData.data[i + 2],
      })
    }
  }


  pixels.forEach((pixel, i) => {
    const imageX = pixel.x + canvas.width / 2 - img.naturalWidth / 2;
    const imageY = pixel.y + canvas.height / 2 - img.naturalHeight / 2;
    let rand = Math.random() * Math.PI * 2
    const x = Math.sin(rand) * radius + canvas.width / 2
    const y = Math.cos(rand) * radius + canvas.height / 2
    dots.push(new Dot(x, y, pixel.r, pixel.g, pixel.b, imageX, imageY))
    animateDot(dots[i], canvas)
  })



  console.log(pixels)

  function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    dots.forEach(dot => {
      dot.draw(ctx)
      // dot.x++
    })
  }
  animate()
})




