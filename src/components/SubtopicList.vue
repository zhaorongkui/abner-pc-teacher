<style scoped>
.subtopic-list {
  height: 100%;
  overflow: auto;
}
.topic {
  font-size: 14px;
  font-weight: 400;
  color: rgba(169, 169, 169, 1);
}
.subtopic-list-item li {
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 94px;
  height: 46px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(185, 185, 185, 1);
  box-shadow: 0px 8px 38px 0px rgba(186, 213, 238, 0.29);
  border-radius: 5px 23px 23px 5px;
  transition: 0.2s;
}
.item-index {
  min-width: 0;
  flex: 1;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}

.item-state {
  width: 32px;
  height: 32px;
  background: #ffffff;
  border-radius: 50%;
  margin-right: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.subtopic-list-item li.current {
  width: 106px;
  height: 46px;
  background: #1059ff;
  box-shadow: 0px 1px 3px 0px rgba(3, 15, 189, 0.3);
  border-radius: 5px 23px 23px 5px;
}

li.current .item-index {
  color: #ffffff;
}

li.current .item-state {
}

.item-state-1 {
  color: #ffffff;
  background: #ff6365;
}
.item-state-2 {
  background-image: url("../assets/img/ic_right@2x.png");
}
.item-state-3 {
  border: 1px solid #ff5235;
  background-image: url("../assets/img/ic_wrong@2x.png");
}
.item-state-4 {
  background-image: url("../assets/img/ic_half@2x.png");
}
.item-not {
  font-size: 12px;
  font-weight: 400;
  color: rgba(143, 156, 185, 1);
}
</style>
<template>
  <div class="subtopic-list">
    <template v-for="(item, index) in list">
      <div class="topic" :key="index + item.id">
        <div class="margin-bottom-5">{{ item.topic }}</div>
        <ul class="subtopic-list-item">
          <template v-for="(child, index) in item.children">
            <li
              :key="index + child.id"
              :id="'item-' + child.id"
              class="margin-bottom-5"
              :class="{ current: value === child.id }"
              @click="currentItem({ item, child })"
            >
              <div class="item-index">{{ index + 1 }}</div>
              <!-- 1 未批 2 对 3 错 4 半对 5 申诉 -->
              <div class="item-state item-state-1" v-if="child.state === 1">
                未批
              </div>
              <div
                class="item-state item-state-2"
                v-else-if="child.state === 2"
              ></div>
              <div
                class="item-state item-state-3"
                v-else-if="child.state === 3"
              ></div>
              <div
                class="item-state item-state-4"
                v-else-if="child.state === 4"
              ></div>
              <div
                class="item-state item-state-1"
                v-else-if="child.state === 5"
              >
                申
              </div>
              <div class="item-state" v-else>未知</div>
            </li>
          </template>
        </ul>
        <a-divider
          style="margin: 20px 0 15px"
          v-if="index !== list.length - 1 && list.length !== 1"
        />
      </div>
    </template>
  </div>
</template>

<script>
// 批阅作业左侧篇目作业列表
export default {
  name: "SubtopicList",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    value: {
      type: [Number, String],
      default: null
    }
  },
  data() {
    return {};
  },
  watch: {
    value(newValue) {
      // console.log(newValue);
    }
  },
  mounted() {},
  methods: {
    scrollIntoView() {
      let dom = document.getElementById("item-" + this.value);
      if (dom) {
        dom.scrollIntoView();
      }
    },
    currentItem({ item, child }) {
      if (this.value === child.id) {
        return false;
      }
      this.$emit("input", child.id);
      this.$emit("on-change", { item, child });
    }
  }
};
</script>
