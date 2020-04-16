<template>
  <div class="goodsDetails">
    <!-- 头部 -->
    <Heador />
    <!-- 商品信息 -->
    <div class="goodsMsg">
      <!-- 左侧小图和大图 -->
      <div>
        <div>
          <ul>
            <li
              v-for="(item,index) of goodsPic"
              :key="index"
              @click="say(index,item.url)"
              :class="show(index)"
            >
              <img
                :src="item.url"
                alt=""
              >
            </li>
          </ul>
        </div>
        <div>
          <img
            :src="picUrl"
            alt=""
          >
        </div>
      </div>
      <!-- 右侧文字信息 -->
      <div>
        <div>
          <h3>{{ goodsData.gname }}</h3>
          <span>{{ goodsData.goodsMsg }}</span>
          <span>￥{{ goodsData.gprice }}</span>
        </div>
        <div>
          <span>数量</span>
          <i
            @click="num>=1?num-=1:0"
            class="el-icon-remove-outline"
          />
          <span>{{ num }}</span>
          <i
            @click="num+=1"
            class="el-icon-circle-plus-outline"
          />
        </div>
        <div>
          <el-button
            :plain="true"
            class="btn"
            style="background:#4dc86f"
            @click="addCart"
          >
            加入购物车
          </el-button>
          <button
            class="btn btn-warning"
            @click="buyNow()"
          >
            现在购买
          </button>
        </div>
      </div>
    </div>
    <!-- 商品图片介绍 -->
    <Cart
      :title-name="'商品信息'"
      class="goodsImg"
    >
      <div>
        <img
          :src="goodsData.goodsDetail"
          alt=""
        >
      </div>
    </Cart>
    <!-- 底部 -->
    <Footor />
  </div>
</template>
<script>
import Heador from '../components/header.vue'
import Footor from '../components/footer.vue'
import Cart from '../components/card.vue'
export default {
  data () {
    return {
      goodsid: this.$route.params.goodsid,
      goodsData: [],
      goodsPic: [],
      picNum: 0,
      picUrl: String,
      num: 1
    }
  },
  components: {
    Heador,
    Footor,
    Cart
  },
  created () {
    let url = `http://106.13.61.186:3000/goodsDetails/${this.goodsid}`
    this.axios.get(url).then(result => {
      this.goodsData = result.data.arr[0]
      this.goodsPic = result.data.arr_pic
      // 默认读取小图片中的第一张图片
      this.picUrl = result.data.arr_pic[0].url
    })
  },
  methods: {
    // say和show配合，使得左边小图有灰色边框效果
    say (index, url) {
      this.picNum = index
      this.picUrl = url
    },
    show (index) {
      if (index === this.picNum) {
        return 'picBorder'
      }
    },
    // 加入购物车表
    addCart () {
      let userId = sessionStorage.getItem('userId')
      if (!userId) {
        this.$router.push('/login')
      } else {
        let cid = userId
        let gid = this.goodsid
        let num = this.num
        let url = `http://106.13.61.186:3000/addCart`
        let postData = this.qs.stringify({
          cid,
          gid,
          num
        })
        this.axios.post(url, postData).then(result => {
          this.$message({
            message: '添加成功!',
            type: 'success'
          })
        })
      }
    },
    // 单品信息写入vuex，并跳转到checkout结算页面
    buyNow () {
      let product = []
      let p = {}
      p.goodsid = this.goodsid
      p.gprice = this.goodsData.gprice
      p.gname = this.goodsData.gname
      p.num = this.num
      p.url = this.picUrl
      product.push(p)
      this.$store.state.checkoutSingle = product
      this.$router.push('/checkout')
    }
  }
}
</script>

<style lang="scss">
    .goodsDetails{
        background-color: #ededed;
    }
    .goodsImg{
        img{
          border-radius: 0 0 8px 8px;
          width: 1220px;
        }
    }
    .goodsMsg{
            display: flex;
            width: 1220px;
            height: 560px;
            padding: 60px;
            margin: 20px auto;
            background-color: white;
            border-radius: 5px;
        >div:first-child{
                display: flex;
                width: 540px;
                height: 440px;
            >div:first-child{
                ul{
                    list-style: none;
                    li{
                        width: 80px;
                        height: 80px;
                        border: 1px solid #f0f0f0;
                        margin-bottom: 10px;
                        >img{
                          width: 60px;
                          height: 60px;
                          cursor: pointer;
                          position: relative;
                          top: 50%;
                          left: 50%;
                          margin-top: -30px;
                          margin-left: -30px;
                        }
                    }
                }
            }
            >div:last-child{
                width: 460px;
                height: 440px;
                margin-left: 20px;
                >img{
                  width: 460px;
                  height: 440px;
                  margin-left: -20px;
                }
            }
        }
        >div:last-child{
            width: 450px;
            height: 440px;
            >div:first-child{
              border-bottom: 1px solid #ebebeb;
              padding-bottom: 10px;
              >h3{
                font-size: 24px;
              }
              >span:nth-child(2){
                font-size: 14px;
                color: #bdbdbd;
                width: 360px;
                display: inline-block;
              }
              >span:last-child{
                color: #d44d44;
                font-size: 24px;
                font-weight: 700;
              }
            }
            >div:nth-child(2){
              margin: 25px 0;
              padding-bottom: 25px;
              border-bottom: 1px solid #ebebeb;
              user-select:none;
              >span:first-child{
                font-size: 14px;
                color: #8d8d8d;
                margin-right: 20px;
              }
              >i{
                cursor: pointer;
              }
              >span:nth-child(3){
                width: 30px;
                display: inline-block;
                text-align: center;
              }
            }
            >div:last-child{
              margin-top: 70px;
              >button:first-child{
                margin-right: 15px;
              }
            }
        }
    }
    .picBorder{
      border:3px solid rgba(0,0,0,0.2) !important;
      border-radius: 4px;
    }
</style>
