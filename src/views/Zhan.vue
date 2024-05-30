<style scoped>
  @import "../assets/vendors/mdi/css/materialdesignicons.min.css";

</style>

<template>
  <div class="row p-3" style="place-items: center;">
    <div class="col-md-12 order-md-1">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">
            <i class="mdi mdi-link-variant"></i>
            悟空H5加社区参数
          </h4>
          <form class="needs-validation" novalidate>
            <div class="row">
              <div class="col-md-12 mb-3 small">
                <label for="forumName">原悟空链接：</label>
                <input type="text" class="form-control" id="oldlink" placeholder="示例：https://zhan.vivo.com.cn/community/wk23122616b6780c" v-model="oldlink">
              </div>
            </div>

            <div class="row">
              <div class="col-md-12 mb-3 small">
                <label for="forumName">加社区统计参数后的链接：</label>
                <input type="text" class="form-control" id="resultlink" placeholder="https://*****?h5source=" v-model="resultlink">
              </div>

              <div class="input-group-append">
                <button type="button" class="btn btn-copy-zhan btn-secondary float-end" data-clipboard-target="#resultlink">复制</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
    import {ref, watch, computed} from "vue";
    import clipboard from "clipboard";
    import URL from 'url';
    import qs from 'qs';
    import {useToast} from 'vue-toast-notification';

/*    const oldlink = ref('');

    const resultlink = computed(() => {
      var url = URL.parse(oldlink.value);
      if(oldlink.value){
        var querys = qs.parse(url.query);
        querys.h5source = "community";
        // search 设置为空，query为对象时，会触发重新计算 
        // https://www.npmjs.com/package/url?activeTab=readme
        url.search = "";
        url.query = querys;
      }
      console.log(url);
      return !oldlink.value?"":URL.format(url);
    });*/

    export default {
      data() {
          return {
              oldlink: "",
              resultlink: "",
              btn_copy: null,
          }
      },
      methods: {

      },
      computed: {
        resultlink(){
          var url = URL.parse(this.oldlink);
          if(this.oldlink){
            var querys = qs.parse(url.query);
            querys.h5source = "community";
            // search 设置为空，query为对象时，会触发重新计算 
            // https://www.npmjs.com/package/url?activeTab=readme
            url.search = "";
            url.query = querys;
          }
          console.log(url);
          return !this.oldlink?"":URL.format(url);
        }
      },
      created() {
        console.log("created")
      },
      mounted() {
        console.log("mounted")
        console.log(this.btn_copy);
        // 组件创建完后获取数据，
        // 此时 data 已经被 observed 了
        const $toast = useToast();
        if(this.btn_copy){
          this.btn_copy.destory();
          console.log("destory");
        }
        this.btn_copy = new clipboard('.btn-copy-zhan');

        this.btn_copy.on('success', function(e) {
          console.log(resultlink.value)
          var url = URL.parse(resultlink.value);
          if( url.hostname != "zhan.vivo.com.cn" && url.hostname != "mshopact.vivo.com.cn" ){
              $toast.open({
                  type: "error",
                  message: "请确定原链接为悟空链接"
              });
          }
          else{
              $toast.open({
                  type: "success",
                  message: "已复制到剪切板"
              });
          }
        });

        this.btn_copy.on('error', function(e) {
            $toast.open({
                type: "error",
                message: "复制失败，请手动复制"
            });
        });
      },
      updated() {
        console.log("updated")
      },
      destoryed() {
        console.log("destoryed")
      },
      watch: {
        // 如果路由有变化，会再次执行该方法
        "$route": ""
      }
    }
</script>

<style type="text/css">
  .input-group .input-group-text{
    font-size: .875rem;
    line-height: 1.75;
  }
  .input-group-prepend {
      margin-right: -1px;
  }
  .needs-validation .form-control {
      font-size: 0.8rem;
  }

  .card .card-title {
    color: #4a4a4a;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: bold;
  }
</style>
