<style scoped>
  @import "../../assets/vendors/mdi/css/materialdesignicons.min.css";
  @import "./main.css";
</style>

<template>
  <div class="row p-3 threadDesc" style="place-items: center;">
    <div class="col-md-12 order-md-1">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">
            <i class="mdi mdi-link-variant"></i>
            帖子详情页链接
          </h4>
          <form class="needs-validation" novalidate>
            <div class="row">
              
              <div class="col-md-3 mb-3 small">
                <label for="threadID">帖子ID</label>
                <input type="number" class="form-control" id="threadID" placeholder="" v-model.number="tid">
              </div>
            </div>
            <div class="result">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text small">帖子详情DLink</span>
                    </div>
                    <input type="text" class="form-control" id="threadDeeplink" placeholder="请先输入帖子ID" v-model="finallink.threadDeeplink" readonly>
                    <div class="input-group-append">
                        <button type="button" class="btn btn-copy btn-secondary" data-clipboard-target="#threadDeeplink">复制</button>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text small">帖子H5Link</span>
                    </div>
                    <input type="text" class="form-control" id="threadH5link" placeholder="请先输入帖子ID" v-model="finallink.threadH5link" readonly>
                    <div class="input-group-append">
                        <button type="button" class="btn btn-copy btn-secondary" data-clipboard-target="#threadH5link">复制</button>
                    </div>
                </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {ref, watch, computed} from "vue";
    import clipboard from "clipboard";
    import lodash from "lodash";
    import {useToast} from 'vue-toast-notification';

    export default {
      data() {
          return {
              tid: 0,
              finallink: {
                threadDeeplink: "",
                threadH5link: "", 
              },
          }
      },
      methods: {

      },
      computed: {
        finallink(){
            var templink = {
                threadDeeplink: "space://vivo.com/deeplinkbridge?pageName=threadDetail&tid={tid}",
                threadH5link: "https://bbs.vivo.com.cn/newbbs/thread/{tid}", 
            };
            var {threadDeeplink, threadH5link} = templink;

            if(this.tid > 0){
                threadDeeplink = lodash.replace(threadDeeplink, "{tid}", this.tid);
                threadH5link = lodash.replace(threadH5link, "{tid}", this.tid);
            } else{
                threadDeeplink = threadH5link = "";
            }

        return {
            threadDeeplink,
            threadH5link,
        };
          return !this.oldlink?"":URL.format(url);
        }
      },
      created() {
        console.log("created")
      },
      mounted() {
        var self = this;
        console.log("mounted")
        console.log(this.btn_copy);
        // 组件创建完后获取数据，
        // 此时 data 已经被 observed 了
        const $toast = useToast();

        var btnList = document.querySelectorAll('.threadDesc .btn-copy');

        for(var i = 0; i < btnList.length; i++){
            var btn_copy = new clipboard(btnList[i]);
            btn_copy.on('success', function(e) {
                console.log(self.tid)
                if(self.tid <= 0){
                    $toast.open({
                        type: "error",
                        message: "请先输入帖子ID"
                    });
                }else{
                    $toast.open({
                        type: "success",
                        message: "已复制"
                    });
                }
            });

            btn_copy.on('error', function(e) {
                console.log(self.tid)
                if(self.tid <= 0){
                    $toast.open({
                        type: "error",
                        message: "请先输入帖子ID"
                    });
                }else{
                    $toast.open({
                        type: "error",
                        message: "复制失败，请手动复制"
                    });
                }
            });
        }
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

</style>
