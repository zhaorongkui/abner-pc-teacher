<style scoped>
.work-list-count {
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  color: rgba(16, 89, 255, 1);
}
</style>

<template>
  <div class="read-work-list-modal">
    <a-modal
      v-model="visible"
      width="1200px"
      :footer="null"
      :centered="true"
      class="hwd-modal"
    >
      <div slot="title">
        <p class="work-list-count">作业内容预览(共{{ workList.length }}题)</p>
      </div>
      <div class="work-list">
        <no-work-book-page-info
          style="min-height: 500px"
          v-if="!workList.length"
        />
        <template v-else>
          <read-list-card
            v-for="item in workList"
            :temporary="temporaryWorkListById"
            :data="item"
            :selected="workListById"
            :key="item.questionId"
            @look="lookOriginal"
            @on-add-work="addWork"
            @on-add-favorites="addFavorites"
          ></read-list-card>
        </template>
        <look-original ref="original"></look-original>
        <ClassifyDialog
          v-if="showDialog"
          @toParentEvents="showDialog = false"
          @toParentEvent="getId"
          @toParentEventStore="addCollectStore"
        ></ClassifyDialog>
      </div>
    </a-modal>
  </div>
</template>

<script>
// 已选作业列表弹框
import LookOriginal from "./LookOriginal";
import ReadListCard from "./ReadListCard";
import ClassifyDialog from "../views/publish-work/components/componentsOfChild/ClassifyDialog";
import NoWorkBookPageInfo from "./NoWorkBookPageInfo";
export default {
  name: "ReadWorkListModal",
  computed: {
    workList() {
      return this.$store.getters["work/readWorkList"];
    },
    workListById() {
      return this.$store.getters["work/readWorkListById"];
    }
  },
  components: {
    LookOriginal,
    ReadListCard,
    ClassifyDialog,
    NoWorkBookPageInfo
  },
  data() {
    return {
      visible: false,
      showDialog: false,
      CollectionInfos: null,
      collectonGroupId: 0,
      temporaryWorkListById: []
    };
  },
  watch: {
    visible(curVal, oldVal) {
      if (curVal) {
        this.temporaryWorkListById = [];
      } else {
        this.temporaryWorkListById.forEach(this.remove);
      }
    }
  },
  methods: {
    getId(id) {
      this.collectonGroupId = id;
    },
    addFavorites(data) {
      if (data.teacherQuestionCollectonId) {
        this.deleteCollection(data);
      } else {
        this.showDialog = true;
        this.CollectionInfos = data;
      }
    },
    deleteCollection(data) {
      let params = {
        teacherQuestionCollectionId: data.teacherQuestionCollectonId
      };
      this.$http("/api/collection/teacher/delCollection", { params })
        .then(res => {
          if (res.data.flag === 1) {
            let obj = {
              collectonId: null,
              findId: data.questionId
            };
            this.setWorlCollecton(obj);
            this.$message.success("取消收藏成功");
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    addCollectStore() {
      (this.CollectionInfos.collectonGroupId = this.collectonGroupId),
        this.$store
          .dispatch("publish/addStore", this.CollectionInfos)
          .then(data => {
            if (data.flag === 1) {
              this.showDialog = false;
              let obj = {
                collectonId: data.infos,
                findId: this.CollectionInfos.questionId
              };
              this.setWorlCollecton(obj);
              this.CollectionInfos = null;
              this.$message.success("收藏成功");
            } else {
              this.$message.error("收藏失败");
            }
          });
    },
    remove(id) {
      let workListById = this.workListById;
      let workList = this.workList;
      workList = workList.filter(item => {
        return item.questionId !== id;
      });
      workListById = workListById.filter(item => {
        return item !== id;
      });
      this.$store.commit("work/SETREADWORKLIST", workList);
      this.$store.commit("work/SETREADWORKLISTBYID", workListById);
    },
    setWorlCollecton(obj) {
      this.$store.commit("work/SET_TECHER_QUESTION_COLLECTONID", obj);
    },
    addWork(data) {
      let workListById = this.workListById;
      let workList = this.workList;
      if (this.temporaryWorkListById.includes(data.questionId)) {
        this.temporaryWorkListById = this.temporaryWorkListById.filter(item => {
          return item !== data.questionId;
        });
        // this.$message.success('加入成功')
      } else {
        this.temporaryWorkListById.push(data.questionId);
        // this.$message.success('移出作业')
      }
    },
    lookOriginal(obj) {
      console.log("查看原题", obj);
      this.$refs["original"].id = obj.questionId;
      this.$refs["original"].visible = true;
    }
  }
};
</script>