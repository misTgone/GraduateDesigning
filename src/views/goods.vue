<template>
  <div class="goods">
    <!-- 头部栏 -->
    <Heador />
    <!-- 商品列表部分，包括筛选和分页 -->
    <div class="goodsList">
      <!-- 商品筛选 -->
      <div class="screen">
        <div>
          <router-link to="">
            综合排序
          </router-link>
          <router-link to="">
            价格从低到高
          </router-link>
          <router-link to="">
            价格从高到低
          </router-link>
          <div>
            <input
              type="text"
              placeholder="价格"
              class="form-control"
            >
            <span>-</span>
            <input
              type="text"
              placeholder="价格"
              class="form-control"
            >
            <button class="btn btn-primary">
              确定
            </button>
          </div>
        </div>
      </div>
      <!-- 第一层div包含整个100%的空间，第二层width为1220px居中，第三层为具体的商品 -->
      <!-- 4行4列 -->
      <div>
        <div>
          <div>
            <div
              class="goods-item"
              v-for="(item,index) of goodsForEach"
              :key="index"
            >
              <div>
                <router-link to="">
                  <img
                    :src="item.url"
                    alt=""
                  >
                </router-link>
              </div>
              <h6>{{ item.gname }}</h6>
              <h3>{{ item.goodsMsg }}</h3>
              <div>
                <div>
                  <router-link
                    :to="'/goodsDetails/'
                      +item.goodsid"
                  >
                    <button class="btn btn-info">
                      查看详情
                    </button>
                  </router-link>
                  <button
                    class="btn btn-success"
                    @click="addOneToCart(item.goodsid)"
                  >
                    加入购物车
                  </button>
                </div>
                <p>￥{{ item.gprice }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="goods_paging">
        <div class="block">
          <el-pagination
            :current-page="goodsPage"
            :page-size="goodsPageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[8, 20, 40, 80]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="goodsNum"
          />
        </div>
      </div>
    </div>
    <!-- 底部栏 -->
    <Footor />
  </div>
</template>

<script>
import Heador from '../components/header.vue'
import Footor from '../components/footer.vue'
export default {
  data () {
    return {
      goodsData: [],
      goodsNum: 0,
      goodsForEach: [],
      goodsPage: 1,
      goodsPageSize: 8
    }
  },
  components: {
    Heador,
    Footor
  },
  mounted () {
    let url = `http://106.13.61.186:3000/goods`
    this.axios.get(url).then(result => {
      if (result.data.code === 1) {
        for (let i = 0, len = result.data.arr.length; i < len; i++) {
          result.data.arr[i].url = result.data.arr_pic[i].url
        }
        this.goodsData = result.data.arr
        this.goodsNum = result.data.arr.length
        for (let i = 0; i < 8; i++) {
          if (i < this.goodsData.length) {
            this.goodsForEach.push(this.goodsData[i])
          }
        }
      } else {
        this.$router.push('/notFoundServer')
      }
    })
  },
  watch: {
    goodsPage () {
      let url = `http://106.13.61.186:3000/goods`
      this.axios.get(url).then(result => {

      })
    }
  },
  methods: {
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.goodsPageSize = val
      this.goodsForEach = []
      for (let i = 0; i < val; i++) {
        if (i < this.goodsNum) {
          this.goodsForEach.push(this.goodsData[i])
        }
      }
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.goodsForEach = []
      let i = this.goodsPageSize * (val - 1)
      let num = i + this.goodsPageSize
      for (; i < num; i++) {
        if (i < this.goodsNum) {
          this.goodsForEach.push(this.goodsData[i])
        }
      }
    },
    // 添加一件对应商品到user_cart表
    addOneToCart (id) {
      let url = `http://106.13.61.186:3000/addCart`
      let postData = this.qs.stringify({
        gid: id,
        cid: sessionStorage.getItem('userId'),
        num: 1
      })
      this.axios.post(url, postData).then(result => {
        if (result.data.code === 1) {
          this.$message({
            message: '添加购物车成功!',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style lang='scss'>
  .goods{
    background-color: #ededed;
    min-width: 1220px;
    .goodsList{
      margin-top: -30px;
      .screen{
        height: 60px;
        width: 1220px;
        margin: 0 auto;
        line-height: 60px;
        font-size: 12px;
        >div{
          display: flex;
          >a{
            color: #999999;
            padding: 0 15px;
          }
          >a:hover{
            color: #5884ea;
            text-decoration: none;
          }
          >div{
            display: flex;
            width: 300px;
            align-items: center;
            >input{
              font-size: 12px;
              text-align: center;
              width: 80px;
              height: 30px;
              margin: 0 5px;
            }
            >button{
              margin-left: 5px;
              font-size: 12px;
              line-height: 30px;
              width: 80px;
              height: 30px;
              padding: 0;
            }
          }
        }
      }
      >div:nth-child(2){
        >div{
          width: 1220px;
          margin: 0 auto;
          overflow: hidden;
          .goods-item{
            box-sizing: border-box;
            float: left;
            border: 1px solid #efefef;
            background-color: #fff;
            width: 25%;
            height: 430px;
            text-align: center;
            position: relative;
            &:hover{
              box-shadow: 0 0 25px #c2c2c2;
              transition: all .5s;
              z-index: 200;
              >div:nth-child(4){
              >div{
                display: block;
              }
              >p{
                display: none;
              }
            }
            }
            img{
              height: 206px;
              width: 206px;
              margin: 50px 48.5px 10px;
            }
            h6{
              color: #424242;
              font-size: 16px;
              padding: 0 14px;
            }
            h3{
              color: #d0d0d0;
              font-size: 12px;
              padding: 10px;
            }
            p{
              font-size: 18px;
              color: #d44d44;
              font-family: Arial, Helvetica, sans-serif;
              font-weight: 700;
            }
            >div:nth-child(4){
              >div{
                display: none;
                button{
                  font-size: 12px;
                  width: 98px;
                  height: 28px;
                  padding: 0;
                  margin: 0 5px;
                }
              }
            }
          }
        }
      }
    }
  }
  .goods_paging{
    width: 100%;
    >div.block{
      width: 1220px;
      margin: 0 auto;
      margin-top: 20px;
      padding-left: 600px;
    }
  }
</style>
