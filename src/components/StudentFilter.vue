<style scoped>
.ability-screening {
  display: flex;
  height: 100%;
  width: 100%；;
}
.screening-title {
  font-weight: 400;
  color: rgba(78, 95, 113, 1);
  line-height: 34px;
}
.ability-list {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
}
.ability-box {
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  font-size: 16px;
  color: rgba(170, 170, 170, 1);
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(221, 221, 221, 1);
  border-radius: 8px;
  padding: 10px 24px;
}
.ability-box:hover {
  border-color: #399eff;
}
.current {
  background: rgba(16, 89, 255, 0.14);
  border-color: transparent;
  color: #030fbd;
}
.swiper-box {
  width: auto;
  margin-right: 10px;
}
.swiper-box:last-child {
  margin-right: 0;
}
</style>

<template>
  <div class="ability-screening">
    <div class="ability-list">
      <swiper style="width: 100%" :options="swiperOption">
        <swiper-slide class="swiper-box" v-for="item in data" :key="item.value">
          <div
            class="ability-box"
            :class="{ current: value === item.value }"
            :key="item.value"
            @click="changeAbility(item)"
          >
            {{ item.label }}
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
// 篇目分析-篇目详情-班级选择
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "studentFilter",
  components: { swiperSlide, swiper },
  props: {
    value: {
      type: [Number, String],
      default: ""
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      swiperOption: {
        direction: "horizontal",
        slidesPerView: "auto",
        freeMode: true,
        mousewheel: true
      }
    };
  },
  methods: {
    changeAbility(item) {
      this.$emit("input", item.value);
      this.$emit("on-change", item);
    }
  }
};
</script>