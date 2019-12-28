<template>
  <div id="tabbar">
    <div>
      <table>
        <tr>
          <td>订单服务</td>
          <td>服务支持</td>
          <td>自助服务</td>
          <td>关注我吧</td>
        </tr>
        <tr>
          <td>购买指南</td>
          <td>官方开源</td>
          <td>个人博客</td>
          <td>腾讯QQ</td>
        </tr>
        <tr>
          <td>支付方式</td>
          <td>项目前端</td>
          <td>个人简介</td>
          <td>新浪微博</td>
        </tr>
        <tr>
          <td>送货政策</td>
          <td>项目后端</td>
          <td>个人视频</td>
          <td>官方邮箱</td>
        </tr>
      </table>
      <div>
        <h1 style="background-color: white;">
          13056894569
        </h1>
        <p style="font-size: 12px;color: #c3c3c3;background-color: #fff;">
          周一至周日 10:00-23:00（限Starrer或捐赠人联系）
        </p>
        <button
          type="button"
          class="btn btn-primary"
        >
          在线帮助
        </button>
      </div>
      <div>
        <div>
          <span>
            Copyright ©2019, exrick.cn Co., Ltd. All Rights Reserved.本网站设计内容属于misTgone.部分资源来自锤子科技.
            <br>
            备案号:浙ICP备19041810号-1
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
     #tabbar{
        width: 100%;
        height: 350px;
        background-color: white;
        margin-top: 30px;
        overflow: hidden;
    }
    #tabbar>div{
        width: 1220px;
        height: 300px;
        margin: 0 auto;
        margin-top: 100px;
        background-color: white;
    }
    #tabbar>div>table>tr:first-child{
        color: #646464;
    }
    #tabbar>div>table>tr:nth-child(1)~tr{
        color: #969696;
        font-size: 15px;
    }
    #tabbar>div>table td{
        background-color: white;
        padding-right: 150px;
        padding-bottom: 5px;
    }
    #tabbar>div>div:nth-child(2){
        background-color: white;
        width: 300px;
        position: relative;
        float: right;
        top: -107px;
        left: 39px;
    }
    #tabbar>div>div:nth-child(2) button{
        margin-left: 170px;
    }
    #tabbar>div>div:nth-child(3){
        border-top: 1px solid #969696;
        position: relative;
        top: 34px;
        background-color: white;
    }
    #tabbar>div>div:nth-child(3)>div{
        margin-top: 30px;
        background-color: white;
    }
</style>
