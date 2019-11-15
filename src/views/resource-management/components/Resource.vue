<template>
  <div class="resource">
    <div class="toolbar">
      <span>资源类型</span>
      <button :class="{ active: resourceType === 0 }" @click="handleFilter(0)">
        全部
      </button>
      <button :class="{ active: resourceType === 1 }" @click="handleFilter(1)">
        视频
      </button>
      <button :class="{ active: resourceType === 2 }" @click="handleFilter(2)">
        音频
      </button>
      <button :class="{ active: resourceType === 3 }" @click="handleFilter(3)">
        图片
      </button>
    </div>
    <div class="content">
      <template v-if="resourceList.length > 0">
        <div class="list-wrap">
          <ul class="list">
            <li class="item" v-for="(item, index) of resourceList" :key="index">
              <div v-if="item.resourceType === 1" class="box">
                <Appvideo :src="item.resourcePathUrl"></Appvideo>
                <BottomBar
                  :name="item.resourceName"
                  :from="item.resourceFrom"
                  :resourceInfoId="item.resourceInfoId"
                ></BottomBar>
              </div>
              <div v-if="item.resourceType === 2" class="box">
                <Appvideo
                  :src="item.resourcePathUrl"
                  :resourceType="2"
                ></Appvideo>
                <BottomBar
                  :name="item.resourceName"
                  :from="item.resourceFrom"
                  :resourceInfoId="item.resourceInfoId"
                ></BottomBar>
              </div>
              <div v-if="item.resourceType === 3" class="box">
                <div
                  class="pic-box"
                  @click="handleClickPic(item.resourcePathUrl)"
                >
                  <img :src="item.resourcePathUrl" alt="" />
                  <!-- <img
                    class="img-logo"
                    src="../../../assets/img/ic_personal_ziyuan_pic@2x.png"
                    alt=""
                  /> -->
                </div>
                <BottomBar
                  :name="item.resourceName"
                  :from="item.resourceFrom"
                  :resourceInfoId="item.resourceInfoId"
                ></BottomBar>
              </div>
            </li>
          </ul>
        </div>
        <div class="pagination">
          <a-pagination
            :current="current"
            @change="handleChange"
            :total="total"
          />
        </div>
      </template>
      <template v-else>
        <div>
          <img
            class="tips"
            src="../../../assets/img/bg_ziyuan_tips@2x.png"
            alt=""
          />
          <div class="empty-wrap">
            <img
              class="empty"
              src="../../../assets/img/empty_ziyuan_card@2x.png"
              alt=""
            />
            <p>暂时没有多媒体资源，快去添加吧</p>
          </div>
        </div>
      </template>
    </div>
    <div id="index">
      <div v-for="(item, index) of picList" :key="index">
        <img :ref="'pic' + index" :src="item.resourcePathUrl" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import localforage from 'localforage'
import Viewer from 'viewerjs'
import Appvideo from './Appvideo'
import BottomBar from './BottomBar'
export default {
  name: 'resource',
  components: { Appvideo, BottomBar },
  data() {
    return {
      Viewer: null
    }
  },
  computed: {
    resourceList() {
      return this.$store.state.resource.resourceList
    },
    picList() {
      return this.resourceList.filter(item => item.resourceType === 3)
    },
    currentTextbookChapterCode() {
      return this.$store.state.resource.currentTextbookChapterCode
    },
    resourceType() {
      return this.$store.state.resource.resourceType
    },
    total() {
      return this.$store.state.resource.count
    },
    current() {
      return this.$store.state.resource.currentPage
    }
  },
  mounted() {
    // localforage.getItem('userInfo').then(value => {
    //   if (value) {
    //     this.$store.commit('GETUSERINFO', value)
    //     this.$store.dispatch('resource/queryResourceList').then(() => {
    //       const ViewerDom = document.getElementById('index')
    //       this.Viewer = new Viewer(ViewerDom, {
    //         // 相关配置项,详情见下面
    //       })
    //     })
    //   }
    // })
  },
  methods: {
    handleFilter(resourceType) {
      if (this.resourceType === resourceType) return
      this.$store.commit('resource/UPDATERESOURCETYPE', resourceType)
      this.$store.commit('resource/CURRENTPAGE', 1)
      this.$store.dispatch('resource/queryResourceList').then(() => {
        // this.Viewer.destroy()
        // const ViewerDom = document.getElementById('index')
        // this.Viewer = new Viewer(ViewerDom, {
        //   // 相关配置项,详情见下面
        // })
        this.$emit('updateViewer')
      })
    },
    handleClickPic(url) {
      let currentIndex
      this.picList.forEach((item, index) => {
        if (url === item.resourcePathUrl) {
          currentIndex = index
        }
      })
      this.$refs['pic' + currentIndex][0].click()
    },
    handleChange(current) {
      this.$store.commit('resource/CURRENTPAGE', current)
      this.$store.dispatch('resource/queryResourceList').then(() => {
        this.$emit('updateViewer')
        // this.Viewer.destroy()
        // const ViewerDom = document.getElementById('index')
        // this.Viewer = new Viewer(ViewerDom, {
        //   // 相关配置项,详情见下面
        // })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.resource {
  flex: auto;
  display: flex;
  flex-direction: column;
}
.toolbar {
  flex: 0 0 66px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: rgba(113, 113, 113, 1);
  border-bottom: 1px solid rgba(244, 244, 244, 1);
  background-color: #fff;
  span {
    margin-right: 30px;
  }
  button {
    margin-right: 15px;
    width: 76px;
    height: 30px;
    border-radius: 15px;
    background: rgba(235, 235, 235, 1);
    outline: none;
    border: none;
    cursor: pointer;
  }
  button.active {
    background: rgba(73, 147, 248, 0.14);
  }
}
.content {
  height: calc(100% - 66px);
  flex: auto;
  overflow-y: auto;
  background-color: #fff;
  padding: 10px 30px;
  display: flex;
  flex-direction: column;
  position: relative;
  .list-wrap {
    flex: auto;
    overflow-y: auto;
  }
  .list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    .item {
      flex: 0 0 240px;
      margin: 0 20px;
      border-radius: 5px;
      margin-bottom: 10px;
      display: flex;
      background-color: #ddd;
      border: 1px solid #ddd;
      overflow: hidden;
      cursor: pointer;
      video,
      audio,
      .box {
        width: 240px;
        height: 160px;
        border-radius: 6px;
        .pic-box {
          width: 240px;
          height: 130px;
          text-align: center;
          line-height: 130px;
          background-color: #ddd;
          position: relative;
          .img-logo {
            width: 62.5px;
            height: 62.5px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  .pagination {
    flex: 0 0 80px;
    display: flex;
    padding-right: 30px;
    align-items: center;
    justify-content: flex-end;
  }
  .tips {
    width: 315px;
    height: 150px;
    position: absolute;
    top: -10px;
    left: -40px;
    z-index: 999;
  }
  .empty-wrap {
    width: 219px;
    margin: 82px auto 0;
    .empty {
      width: 219px;
      height: 191px;
    }
    p {
      font-size: 14px;
      color: #4e5f71;
      text-align: center;
    }
  }
}
#index {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  img {
    width: 0;
    height: 0;
  }
}
</style>
