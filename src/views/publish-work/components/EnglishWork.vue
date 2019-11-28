<template>
  <div class="english-work">
    <div class="menu">
      <EnglishWorkMenu></EnglishWorkMenu>
    </div>
    <div class="content">
      <EnglishWorkToolbar></EnglishWorkToolbar>
      <ul class="list">
        <template v-for="(item, index) of EnglishWorkList">
          <EnglishWorkList
            :index="index"
            :key="index"
            :item="item"
            :isToggles="isToggle"
          ></EnglishWorkList>
        </template>
        <div class="null" v-if="EnglishWorkList.length === 0">
          <img src="../../../assets/img/publish/nulldata.png" alt="" />
          <span>当前章节中暂无数据</span>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import localforage from 'localforage'
import EnglishWorkMenu from './EnglishWorkMenu'
import EnglishWorkToolbar from './EnglishWorkToolbar'
import EnglishWorkList from './EnglishWorkList'
export default {
  name: '',
  components: { EnglishWorkMenu, EnglishWorkToolbar, EnglishWorkList },
  data() {
    return {
      textbookChapterId: '', //注释
      textbookChapterCode: '', //注释
      unitModelId: '', //注释
      EnglishWork: []
    }
  },
  computed: {
    isToggle() {
      return this.$store.state.publish.isToggle
    },
    EnglishWorkList() {
      return this.$store.state.publish.EnglishWorkList
    }
  },
  methods: {},
  mounted() {
    localforage.getItem('userInfo').then(value => {
      if (value) {
        this.$store.commit('GETUSERINFO', value)
        this.$store.dispatch('publish/getEnglishWork').then(data => {
          this.EnglishWork = data.data.infos
          let textbookChapterIds = null
          let unitModelIds = null
          let flag = true
          let num = null
          this.textbookChapterId =
            data.result.infos.textbookChapterId != undefined
              ? data.result.infos.textbookChapterId
              : null
          this.textbookChapterCode =
            data.result.infos.textbookChapterCode != undefined
              ? data.result.infos.textbookChapterCode
              : null
          this.unitModelId = null
          // localStorage.getItem('EnglishWorkUnitModelId') || null
          this.EnglishWork.forEach((item, index) => {
            //注释 //if (item.unitModelList && item.unitModelList.length > 0) {
            if (this.textbookChapterId != null) {
              if (this.textbookChapterId == item.textbookChapterId) {
                num = index
                flag = false
                if (this.unitModelId == null) {
                  if (item.unitModelList != undefined) {
                    item.unitModelList.forEach(unit => {
                      if (unitModelIds === null) {
                        this.unitModelId = unit.unitModelId
                        unitModelIds = unit.unitModelId
                      }
                    })
                  }
                }
              }
            } else {
              if (!textbookChapterIds) {
                this.textbookChapterId = item.textbookChapterId
                this.textbookChapterCode = item.textbookChapterCode
                textbookChapterIds = item.textbookChapterId
              }
              if (this.unitModelId == null) {
                if (item.unitModelList != undefined) {
                  item.unitModelList.forEach(unit => {
                    if (unitModelIds === null) {
                      this.unitModelId = unit.unitModelId
                      unitModelIds = unit.unitModelId
                    }
                  })
                }
              }
            }
            //注释 //}
          })
          if (num != null) {
            for (let i = num - 1; i > 0; i--) {
              if (this.EnglishWork[i].questionCount != undefined) {
                this.textbookChapterId = this.EnglishWork[i].textbookChapterId
                this.textbookChapterCode = this.EnglishWork[
                  i
                ].textbookChapterCode
                if (this.EnglishWork[i].unitModelList != undefined) {
                  for (
                    let j = 0;
                    j < this.EnglishWork[i].unitModelList.length;
                    j++
                  ) {
                    if (unitModelIds === null) {
                      this.unitModelId = this.EnglishWork[i].unitModelList[
                        j
                      ].unitModelId
                      unitModelIds = this.EnglishWork[i].unitModelList[j]
                        .unitModelId
                    }
                  }
                }
                break
              }
            }
          }
          if (this.textbookChapterId != null && flag) {
            for (let i = 0; i < this.EnglishWork.length; i++) {
              if (
                this.EnglishWork[i].unitModelList &&
                this.EnglishWork[i].unitModelList.length > 0
              ) {
                if (!textbookChapterIds) {
                  this.textbookChapterId = this.EnglishWork[i].textbookChapterId
                  this.textbookChapterCode = this.EnglishWork[
                    i
                  ].textbookChapterCode
                  textbookChapterIds = this.EnglishWork[i].textbookChapterId
                }
                for (
                  let j = 0;
                  j < this.EnglishWork[i].unitModelList.length;
                  j++
                ) {
                  if (unitModelIds === null) {
                    this.unitModelId = this.EnglishWork[i].unitModelList[
                      j
                    ].unitModelId
                    unitModelIds = this.EnglishWork[i].unitModelList[j]
                      .unitModelId
                  }
                }
              }
            }
          }
          this.$store.commit(
            'publish/ENGLISHWORKTEXTBOOKCHAPTERID',
            this.textbookChapterId
          )
          this.$store.commit(
            'publish/ENGLISHWORKTEXTBOOKCHAPTERCODE',
            this.textbookChapterCode
          )
          this.$store.commit('publish/ENGLISHWORKUNITMODEID', this.unitModelId)
          this.$store.dispatch('publish/unitModel')
          this.$nextTick().then(() => {
            document.querySelectorAll('.list')[0].scrollTop =
              document.getElementsByClassName('active')[0].offsetTop + 250
          })
        })
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variable.scss';
.english-work {
  width: 1200px;
  height: 88%;
  margin: 0 auto;
  display: flex;
  padding: 20px 0;
  .menu {
    flex: 0 0 280px;
    width: 280px;
    height: 100%;
    background-color: #ddd;
  }
  .content {
    width: 100%;
    height: 100%;
    flex: auto;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 8px 12px 0px rgba(186, 213, 238, 0.18);
    border-radius: 0px 4px 4px 0px;
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
    .list {
      flex: auto;
      height: 100%;
      padding: 10px;
      overflow-y: auto;
    }
  }
}
.null {
  @include wh(100%, 100%);
  @include fj(center);
  flex-direction: column;
  align-items: center;
  img {
    @include wh(215px, 188px);
  }
  span {
    @include sc(14px, #6181ca);
    margin-top: 23px;
  }
}
</style>
