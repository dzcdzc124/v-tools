<template>
  <div class="row bg-light mx-3 p-3" style="place-items: center;">
    <div class="col-md-12 order-md-1">
      <div class="my-3 p-3 fs-5 text-white text-center fw-bold bg-dark">
          发帖链接
      </div>
      <form class="needs-validation" novalidate>
        <div class="row">
          <div class="col-md-4 mb-3">
            <label for="forumName">圈子名</label>
            
            <select class="form-select d-block w-100" v-model="forumValue" id="forumName">
                <option selected value="不指定圈子">不指定圈子</option>
                <option v-for="item in flist" :value="item">
                  {{ item.name }}
                </option>
            </select>
       
          </div>
          <div class="col-md-2 mb-3">
            <label for="forumID">圈子ID</label>
            <input type="number" class="form-control" id="forumID" placeholder="" v-model.number="forumValue.id">
          </div>
          <div class="col-md-2 mb-3">
            <label for="topicId">话题ID</label>
            <input type="number" class="form-control" id="topicId" placeholder="" v-model.number="topicValue.id">
          </div>
          <div class="col-md-4 mb-3">
            <label for="topicName">话题名</label>
            <input type="text" class="form-control" id="topicName" placeholder="" v-model="topicValue.name">
          </div>
        </div>
        <!-- <div class="btn btn-primary btn-lg btn-block mb-3" @click="create">生成链接</div> -->

        <div class="result">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">动态DeepLink</span>
                </div>
                <input type="text" class="form-control" id="shareDeeplink" placeholder="请先输入圈子话题信息" v-model="finallink.shareDeeplink" readonly>
                <div class="input-group-append">
                    <button type="button" class="btn btn-copy btn-secondary" data-clipboard-target="#shareDeeplink">复制</button>
                </div>
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">文章DeepLink</span>
                </div>
                <input type="text" class="form-control" id="postLongDeeplink" placeholder="请先输入圈子话题信息" v-model="finallink.postLongDeeplink" readonly>
                <div class="input-group-append">
                    <button type="button" class="btn btn-copy btn-secondary" data-clipboard-target="#postLongDeeplink">复制</button>
                </div>
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">动态网页链接</span>
                </div>
                <input type="text" class="form-control" id="shareH5link" placeholder="请先输入圈子话题信息" v-model="finallink.shareH5link" readonly>
                <div class="input-group-append">
                    <button type="button" class="btn btn-copy btn-secondary" data-clipboard-target="#shareH5link">复制</button>
                </div>
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">文章网页链接</span>
                </div>
                <input type="text" class="form-control" id="postLongH5link" placeholder="请先输入圈子话题信息" v-model="finallink.postLongH5link" readonly>
                <div class="input-group-append">
                    <button type="button" class="btn btn-copy btn-secondary" data-clipboard-target="#postLongH5link">复制</button>
                </div>
            </div>
        </div>
      </form>
    </div>
  </div>

</template>

<script setup>
    import {ref, watch, computed} from "vue";
    import {formlist} from "../assets/bbsconfig.js";
    import clipboard from "clipboard";
    import lodash from "lodash";
    import {useToast} from 'vue-toast-notification';

    const $toast = useToast();

    const flist = ref(formlist);

    const forumValue = ref({id: 0, name: ""});
    const topicValue = ref({ id: 0, name: ""});

    var templink = {
        shareDeeplink: "space://vivo.com/deeplinkbridge?pageName=forumShareMoment&forumID={forumID}&topicID={topicId}&forumName={forumName}&topicName={topicName}",
        shareH5link: "https://bbs.vivo.com.cn/newbbs/dynamic?forumId={forumID}&topicId={topicId}", 
        postLongDeeplink: "space://vivo.com/deeplinkbridge?pageName=forumPostLong&forumID={forumID}&forumName={forumName}&topicID={topicId}&topicName={topicName}", 
        postLongH5link: "https://bbs.vivo.com.cn/newbbs/publish?forumId={forumID}&topicId={topicId}"
    };

    const finallink = computed(() => {
        var {shareDeeplink, shareH5link, postLongDeeplink, postLongH5link} = templink;

        if(forumValue.value.id > 0){
            shareDeeplink = lodash.replace(shareDeeplink, "{forumID}", forumValue.value.id);
            shareDeeplink = lodash.replace(shareDeeplink, "{forumName}", encodeURI(lodash.trim(forumValue.value.name)));

            postLongDeeplink = lodash.replace(postLongDeeplink, "{forumID}", forumValue.value.id);
            postLongDeeplink = lodash.replace(postLongDeeplink, "{forumName}", encodeURI(lodash.trim(forumValue.value.name)));

            shareH5link = lodash.replace(shareH5link, "{forumID}", forumValue.value.id);

            postLongH5link = lodash.replace(postLongH5link, "{forumID}", forumValue.value.id);
        } else {
            shareDeeplink = lodash.replace(shareDeeplink, "&forumID={forumID}", "");
            shareDeeplink = lodash.replace(shareDeeplink, "&forumName={forumName}", "");

            postLongDeeplink = lodash.replace(postLongDeeplink, "&forumID={forumID}", "");
            postLongDeeplink = lodash.replace(postLongDeeplink, "&forumName={forumName}", "");

            shareH5link = lodash.replace(shareH5link, "forumId={forumID}&", "");
            
            postLongH5link = lodash.replace(postLongH5link, "forumId={forumID}&", "");
        }

        if(topicValue.value.id > 0){
            shareDeeplink = lodash.replace(shareDeeplink, "{topicId}", topicValue.value.id);
            postLongDeeplink = lodash.replace(postLongDeeplink, "{topicId}", topicValue.value.id);
            shareH5link = lodash.replace(shareH5link, "{topicId}", topicValue.value.id);
            postLongH5link = lodash.replace(postLongH5link, "{topicId}", topicValue.value.id);
        } else {
            shareDeeplink = lodash.replace(shareDeeplink, "&topicID={topicId}", "");
            postLongDeeplink = lodash.replace(postLongDeeplink, "&topicID={topicId}", "");
            shareH5link = lodash.replace(shareH5link, "topicId={topicId}", "");
            postLongH5link = lodash.replace(postLongH5link, "topicId={topicId}", "");
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
            postLongH5link
        };
    });


    var btn_copy = new clipboard('.btn-copy');
    console.log(app)
    btn_copy.on('success', function(e) {
        if((topicValue.value.id > 0 && lodash.trim(topicValue.value.name) == "") || (topicValue.value.id == 0 && lodash.trim(topicValue.value.name) != "")){
            $toast.open({
                type: "error",
                message: "如需指定话题，话题ID和话题名都是必需的"
            });
        }else{
            $toast.open({
                type: "success",
                message: "已复制"
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
    .input-group-prepend {
        margin-right: -1px;
    }
    .result .form-control {
        font-size: 0.4rem;
    }
</style>
