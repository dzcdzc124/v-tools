<style scoped>
  @import "../../assets/vendors/mdi/css/materialdesignicons.min.css";

</style>

<template>
  <div class="row p-3" style="place-items: center;">
    <div class="col-md-12 order-md-1">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">
            <i class="mdi mdi-link-variant"></i>
            发帖链接
          </h4>
          <form class="needs-validation" novalidate>
            <div class="row">
              <div class="col-md-3 mb-3 small">
                <label for="forumName">圈子名</label>
                
                <select class="form-select d-block w-100" v-model="forumValue" id="forumName">
                    <option selected value="不指定圈子">不指定圈子</option>
                    <option v-for="item in flist" :value="item">
                      {{ item.name }}
                    </option>
                </select>
           
              </div>
              <div class="col-md-2 mb-3 small">
                <label for="forumID">圈子ID</label>
                <input type="number" class="form-control" id="forumID" placeholder="" v-model.number="forumValue.id">
              </div>
              <div class="col-md-2 mb-3 small">
                <label for="topicId">话题ID</label>
                <input type="number" class="form-control" id="topicId" placeholder="" v-model.number="topicValue.id">
              </div>
              <div class="col-md-5 mb-3 small">
                <label for="topicName">话题名</label>
                <input type="text" class="form-control" id="topicName" placeholder="" v-model="topicValue.name">
              </div>
            </div>
            <!-- <div class="btn btn-primary btn-lg btn-block mb-3" @click="create">生成链接</div> -->

            <div class="result">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text small">发动态DLink</span>
                    </div>
                    <input type="text" class="form-control" id="shareDeeplink" placeholder="请先输入圈子话题信息" v-model="finallink.shareDeeplink" readonly>
                    <div class="input-group-append">
                        <button type="button" class="btn btn-copy btn-secondary" data-clipboard-target="#shareDeeplink">复制</button>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text small">发文章DLink</span>
                    </div>
                    <input type="text" class="form-control" id="postLongDeeplink" placeholder="请先输入圈子话题信息" v-model="finallink.postLongDeeplink" readonly>
                    <div class="input-group-append">
                        <button type="button" class="btn btn-copy btn-secondary" data-clipboard-target="#postLongDeeplink">复制</button>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text small">动态网页链接</span>
                    </div>
                    <input type="text" class="form-control" id="shareH5link" placeholder="请先输入圈子话题信息" v-model="finallink.shareH5link" readonly>
                    <div class="input-group-append">
                        <button type="button" class="btn btn-copy btn-secondary" data-clipboard-target="#shareH5link">复制</button>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text small">文章网页链接</span>
                    </div>
                    <input type="text" class="form-control" id="postLongH5link" placeholder="请先输入圈子话题信息" v-model="finallink.postLongH5link" readonly>
                    <div class="input-group-append">
                        <button type="button" class="btn btn-copy btn-secondary" data-clipboard-target="#postLongH5link">复制</button>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text small">圈子详情页Dlink</span>
                    </div>
                    <input type="text" class="form-control" id="formDeeplink" placeholder="请先输入圈子Id" v-model="finallink.formDeeplink" readonly>
                    <div class="input-group-append">
                        <button type="button" class="btn btn-copy btn-secondary" data-clipboard-target="#formDeeplink">复制</button>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text small">话题详情页Dlink</span>
                    </div>
                    <input type="text" class="form-control" id="topicDeeplink" placeholder="请先输入话题Id" v-model="finallink.topicDeeplink" readonly>
                    <div class="input-group-append">
                        <button type="button" class="btn btn-copy btn-secondary" data-clipboard-target="#topicDeeplink">复制</button>
                    </div>
                </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
    import {ref, watch, computed} from "vue";
    import {formlist} from "./bbsconfig.js";
    import clipboard from "clipboard";
    import lodash from "lodash";
    import {useToast} from 'vue-toast-notification';

    const $toast = useToast();

    const flist = ref(formlist);

    const forumValue = ref({id: 0, name: ""});
    const topicValue = ref({ id: 0, name: ""});

    var templink = {
        shareDeeplink: "space://vivo.com/deeplinkbridge?pageName=forumShareMoment&forumID={forumId}&topicID={topicId}&forumName={forumName}&topicName={topicName}",
        shareH5link: "https://bbs.vivo.com.cn/newbbs/dynamic?forumId={forumId}&topicId={topicId}", 
        postLongDeeplink: "space://vivo.com/deeplinkbridge?pageName=forumPostLong&forumID={forumId}&forumName={forumName}&topicID={topicId}&topicName={topicName}", 
        postLongH5link: "https://bbs.vivo.com.cn/newbbs/publish?forumId={forumId}&topicId={topicId}",

        topicDeeplink: "space://vivo.com/deeplinkbridge?pageName=topicDetail&topicsId={topicId}",
        formDeeplink: "space://vivo.com/deeplinkbridge?pageName=circleDetail&forumId={forumId}"
    };

    const finallink = computed(() => {
        var {shareDeeplink, shareH5link, postLongDeeplink, postLongH5link, topicDeeplink, formDeeplink} = templink;

        if(forumValue.value.id > 0){
            shareDeeplink = lodash.replace(shareDeeplink, "{forumId}", forumValue.value.id);
            shareDeeplink = lodash.replace(shareDeeplink, "{forumName}", encodeURI(lodash.trim(forumValue.value.name)));

            postLongDeeplink = lodash.replace(postLongDeeplink, "{forumId}", forumValue.value.id);
            postLongDeeplink = lodash.replace(postLongDeeplink, "{forumName}", encodeURI(lodash.trim(forumValue.value.name)));

            shareH5link = lodash.replace(shareH5link, "{forumId}", forumValue.value.id);
            postLongH5link = lodash.replace(postLongH5link, "{forumId}", forumValue.value.id);

            formDeeplink = lodash.replace(formDeeplink, "{forumId}", forumValue.value.id);
        } else {
            shareDeeplink = lodash.replace(shareDeeplink, "&forumID={forumId}", "");
            shareDeeplink = lodash.replace(shareDeeplink, "&forumName={forumName}", "");

            postLongDeeplink = lodash.replace(postLongDeeplink, "&forumID={forumId}", "");
            postLongDeeplink = lodash.replace(postLongDeeplink, "&forumName={forumName}", "");

            shareH5link = lodash.replace(shareH5link, "forumId={forumId}&", "");
            postLongH5link = lodash.replace(postLongH5link, "forumId={forumId}&", "");

            formDeeplink = lodash.replace(formDeeplink, "{forumId}", "");
        }

        if(topicValue.value.id > 0){
            shareDeeplink = lodash.replace(shareDeeplink, "{topicId}", topicValue.value.id);
            postLongDeeplink = lodash.replace(postLongDeeplink, "{topicId}", topicValue.value.id);
            shareH5link = lodash.replace(shareH5link, "{topicId}", topicValue.value.id);
            postLongH5link = lodash.replace(postLongH5link, "{topicId}", topicValue.value.id);

            topicDeeplink = lodash.replace(topicDeeplink, "{topicId}", topicValue.value.id);
        } else {
            shareDeeplink = lodash.replace(shareDeeplink, "&topicID={topicId}", "");
            postLongDeeplink = lodash.replace(postLongDeeplink, "&topicID={topicId}", "");
            shareH5link = lodash.replace(shareH5link, "topicId={topicId}", "");
            postLongH5link = lodash.replace(postLongH5link, "topicId={topicId}", "");

            topicDeeplink = lodash.replace(topicDeeplink, "{topicId}", "");
        }

        if(lodash.trim(topicValue.value.name) != ""){
            shareDeeplink = lodash.replace(shareDeeplink, "{topicName}", encodeURI(lodash.trim(topicValue.value.name)));
            postLongDeeplink = lodash.replace(postLongDeeplink, "{topicName}", encodeURI(lodash.trim(topicValue.value.name)));
        } else {
            shareDeeplink = lodash.replace(shareDeeplink, "&topicName={topicName}", "");
            postLongDeeplink = lodash.replace(postLongDeeplink, "&topicName={topicName}", "");
        }

        return {
            shareDeeplink,
            shareH5link,
            postLongDeeplink,
            postLongH5link,
            topicDeeplink,
            formDeeplink
        };
    });


    var btn_copy = new clipboard('.btn-copy');
    console.log(btn_copy)
    btn_copy.on('success', function(e) {
        var target = e.trigger.getAttribute("data-clipboard-target");

        if( lodash.indexOf(["#shareDeeplink", "#postLongDeeplink"], target) >= 0 &&
            ((topicValue.value.id > 0 && lodash.trim(topicValue.value.name) == "") || (topicValue.value.id == 0 && lodash.trim(topicValue.value.name) != ""))
        ){
            $toast.open({
                type: "error",
                message: "如需指定话题，话题ID和话题名都是必需的"
            });
        }else if(target == "#topicDeeplink" && topicValue.value.id == 0){
            $toast.open({
                type: "error",
                message: "请先输入话题Id"
            });
        }else if(target == "#formDeeplink" && forumValue.value.id == 0){
            $toast.open({
                type: "error",
                message: "请先输入圈子Id"
            });
        }
        else{
            $toast.open({
                type: "success",
                message: "已复制到剪切板"
            });
        }
    });

    btn_copy.on('error', function(e) {
        $toast.open({
            type: "error",
            message: "复制失败，请手动复制"
        });
    });

</script>

<style type="text/css">
  .input-group .input-group-text{
    font-size: .875rem;
    line-height: 1.75;
  }
  .input-group-prepend {
      margin-right: -1px;
  }
  .result .form-control {
      font-size: 0.4rem;
  }

  .card .card-title {
    color: #4a4a4a;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: bold;
  }
</style>
