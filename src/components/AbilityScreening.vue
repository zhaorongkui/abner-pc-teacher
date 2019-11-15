<style scoped>
.ability-screening {
  display: flex;
  height: 50px;
  margin: 15px 10px 0 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}
.screening-title {
  font-weight: 400;
  color: rgba(78, 95, 113, 1);
  line-height: 34px;
  font-size: 14px;
}
.ability-list {
  width: 780px;
  overflow: hidden;
  white-space: nowrap;
}
.ability-box {
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  color: rgba(78, 95, 113, 1);
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(214, 225, 229, 1);
  border-radius: 4px;
  padding: 5px 10px;
}
.ability-box:hover {
  border-color: #399eff;
}
.current {
  border-color: #399eff;
  color: #399eff;
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
    <div class="screening-title">
      能力维度筛选：
    </div>
    <div class="ability-list">
      <swiper style="width: 100%" :options="swiperOption">
        <swiper-slide class="swiper-box">
          <div
            class="ability-box"
            @click="changeAbility('全部')"
            :class="{ current: value === '全部' }"
          >
            全部
          </div>
        </swiper-slide>
        <swiper-slide
          class="swiper-box"
          v-for="item in data"
          :key="item.dataValue"
        >
          <div
            class="ability-box"
            :class="{ current: value === item.dataValue }"
            :key="item.dataValue"
            @click="changeAbility(item)"
          >
            {{ item.dataKey }}
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
// 能力维度筛选组件
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'AbilityScreening',
  components: { swiperSlide, swiper },
  props: {
    value: {
      type: [Number, String],
      default: ''
    },
    data: {
      type: Array,
      default() {
        return [
          {
            dataKey: '全部',
            dataValue: 1
          },
          {
            dataKey: '整体感知',
            dataValue: 2
          },
          {
            dataKey: '语言运用能力',
            dataValue: 3
          }
        ]
      }
    }
  },
  data() {
    return {
      swiperOption: {
        direction: 'horizontal',
        slidesPerView: 'auto',
        freeMode: true,
        mousewheel: true
      }
    }
  },
  methods: {
    changeAbility(item) {
      if (item == '全部') {
        this.$emit('input', '全部')
      } else {
        this.$emit('input', item.dataValue)
      }

      this.$emit('on-change', item)
    }
  }
}
</script>

