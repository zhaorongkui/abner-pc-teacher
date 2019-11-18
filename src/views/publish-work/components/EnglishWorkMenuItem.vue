<template>
  <!-- v-if="item.unitModelList && item.unitModelList.length > 0" -->
  <li class="item">
    <div
      class="sub-menu"
      :class="
        `${EnglishWorkTextbookChapterId === item.textbookChapterId ? 'active' : ''} ${(item.unitModelList && item.unitModelList.length !== 0) ? (itemBac === false || item.itemBac===false) ? (EnglishWorkTextbookChapterId === item.textbookChapterId ? 'simpleBlue' : '') : 'blue' : (EnglishWorkTextbookChapterId === item.textbookChapterId ? 'blue' : '')}`
      "
      @click="handleTextbookChapterId(item.textbookChapterId,item.textbookChapterCode)"
    >
      <p>{{ item.textbookChapterName }}</p>
    </div>
    <ul
      class="child-menu"
      v-show="EnglishWorkTextbookChapterId === item.textbookChapterId"
    >
      <template v-for="(child, index) of item.unitModelList">
        <ChildMenu :key="index" :child="child"></ChildMenu>
      </template>
    </ul>
  </li>
</template>

<script>
import ChildMenu from './EnglishWorkChildMenuItem'
export default {
  name: '',
  props: ['item'],
  components: { ChildMenu },
  data() {
    return {
      isShowChild: false,
      itemBac: false
    }
  },
  computed: {
    EnglishWorkTextbookChapterId() {
      return this.$store.state.publish.EnglishWorkTextbookChapterId
    }
  },
  methods: {
    handleTextbookChapterId(textbookChapterId, textbookChapterCode) {
      this.$store.commit('publish/TSCOUNT', 1)
      this.isShowChild = !this.isShowChild
      this.$store.commit(
        'publish/ENGLISHWORKTEXTBOOKCHAPTERID',
        textbookChapterId
      )
      this.$store.commit(
        'publish/ENGLISHWORKTEXTBOOKCHAPTERCODE',
        textbookChapterCode
      )
      this.$store.commit('publish/ISTOGGLE', false)
      //注释
      // let unitModelId = ''
      // if (this.item.unitModelList != undefined) {
      //   if(this.item.unitModelList[0] && this.item.unitModelList[0].unitModelId){
      //     unitModelId =  this.item.unitModelList[0].unitModelId
      //     this.$store.commit('publish/ENGLISHWORKUNITMODEID', unitModelId)
      //   }
      // }
      this.$store.commit('publish/ENGLISHWORKUNITMODEID', '')
      this.$store.commit('publish/ENGLISHWORKLIST', []) //注释
      this.$store.dispatch('publish/unitModel')
      this.itemBac = true
      this.$parent.EnglishWork.forEach(item => {
        if (item.textbookChapterId === textbookChapterId) {
          item.itemBac = true
        } else {
          item.itemBac = false
        }
      })
    }
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
.item {
  width: 100%;
  margin-bottom: 10px;
  font-size: 14px;
  cursor: pointer;
  .sub-menu {
    width: 100%;
    height: 42px;
    display: flex;
    align-items: center;
    border: 1px solid rgba(210, 210, 210, 1);
    border-radius: 8px;
    padding: 0 10px;
    margin-bottom: 10px;
    p {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .child-menu {
    margin-top: 10px;
    padding-left: 20px;
  }
  .simpleBlue {
    background: #e5f0fe;
  }
  .blue {
    background: #1059ff;
    color:#fff;
  }
}
</style>
