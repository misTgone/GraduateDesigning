<template>
  <div class="code">
    <input
      type="text"
      v-model="inputValue"
      placeholder="请输入验证码(不区分大小写)"
      class="form-control inputVal"
    >
    <canvas
      id="canvas"
      :width="canvasWidth"
      :height="canvasHeight"
      @click="draw(showNum)"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      canvasWidth: 100,
      canvasHeight: 36,
      showNum: [],
      inputValue: ''
    }
  },
  methods: {
    //   生成并渲染出验证码图形
    draw (showNum) {
      let canvas = document.getElementById('canvas') // 获取到canvas
      let context = canvas.getContext('2d') // 获取到canvas画图的环境
      canvas.width = this.canvasWidth
      canvas.height = this.canvasHeight
      let sCode = 'a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0'
      let aCode = sCode.split(',')
      let aLength = aCode.length // 获取到数组的长度
      for (let i = 0; i < 4; i++) { // 这里for循环可以控制验证码位数（如果想显示6位数，4改6即可）
        let j = Math.floor(Math.random() * aLength) // 获取到随机的索引值
        let deg = Math.random() - 0.5 // 产生一个随机弧度
        let txt = aCode[j] // 得到一个随机的内容
        showNum[i] = txt.toLowerCase()
        let x = 10 + i * 20 // 文字在canvas上的x坐标
        let y = 20 + Math.random() * 8 // 文字在canvas上的y坐标
        context.font = 'bold 23px 微软雅黑'
        context.translate(x, y)
        context.rotate(deg)
        context.fillStyle = this.randomColor()
        context.fillText(txt, 0, 0)
        context.rotate(-deg)
        context.translate(-x, -y)
      }
      for (let i = 0; i <= 5; i++) { // 验证码上显示线条
        context.strokeStyle = this.randomColor()
        context.beginPath()
        context.moveTo(Math.random() * this.canvasWidth, Math.random() * this.canvasHeight)
        context.lineTo(Math.random() * this.canvasWidth, Math.random() * this.canvasHeight)
        context.stroke()
      }
      for (let i = 0; i <= 30; i++) { // 验证码上显示小点
        context.strokeStyle = this.randomColor()
        context.beginPath()
        let x = Math.random() * this.canvasWidth
        let y = Math.random() * this.canvasHeight
        context.moveTo(x, y)
        context.lineTo(x + 1, y + 1)
        context.stroke()
      }
    },
    // 得到随机的颜色值
    randomColor () {
      let r = Math.floor(Math.random() * 256)
      let g = Math.floor(Math.random() * 256)
      let b = Math.floor(Math.random() * 256)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    },
    check () {
      let val = this.inputValue.toLowerCase()
      let num = this.showNum.join('')
      if (val === '') {
        this.$message.error(
          '请输入验证码!'
        )
        return
      }
      if (val !== num) {
        this.$message.error(
          '验证码错误!请重新输入!'
        )
        this.inputValue = ''
        return
      }
      if (val === num) {
        return 1
      }
    }
  },
  mounted () {
    this.draw(this.showNum)
  }
}
</script>

<style scoped>
    .inputVal {
        width: 260px;
        height: 40px;
        margin-top: 10px;
        margin-left: 0px;
        display: inline-block;
    }
    #canvas {
        box-sizing: border-box;
        border: 1px solid #ced4da;
        cursor: pointer;
        position: relative;
        top: 12px;
        margin-left: 8px;
    }
</style>
