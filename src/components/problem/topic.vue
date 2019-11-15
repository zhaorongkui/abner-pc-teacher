<style scoped>
.topic {
  height: 100%;
}
.topic-box {
  width: 100%;
  height: 100%;
  border: 1px solid rgba(222, 222, 222, 1);
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: auto;
}
.topic-title {
  display: flex;
  padding-right: 21px;
  justify-content: space-between;
  margin-top: 18px;
}
.topic-name {
  padding: 0 6px;
  height: 24px;
  line-height: 24px;
  color: #ffffff;
  background: rgba(86, 172, 255, 1);
  border-radius: 12px;
  margin-left: 21px;
}
.topic-name-left {
  padding: 0 6px;
  height: 24px;
  line-height: 24px;
  color: #ffffff;
  background: rgba(86, 172, 255, 1);
  border-radius: 0px 12px 12px 0px;
  margin-left: 0;
}

.topic-type {
  padding: 0 15px;
  height: 24px;
  line-height: 24px;
  color: #f4781e;
  border: 1px solid rgba(244, 120, 30, 1);
  border-radius: 12px;
  margin-left: 21px;
}
.topic-data {
  min-width: 0;
  flex: 1;
  display: flex;
  font-size: 16px;
  font-weight: 400;
  color: rgba(78, 95, 113, 1);
  margin-bottom: 20px;
}
.topic-data div {
  min-width: 0;
  flex: 1;
}

.topic-main {
  padding: 11px 21px;
}
.option-list {
  padding-left: 23px;
  display: flex;
  font-size: 14px;
  font-weight: 400;
  word-break: break-all;
  color: rgba(78, 95, 113, 1);
}
.option-list p {
  flex: 1;
}
.option-box {
  margin-bottom: 10px;
}
.border-none {
  border: none;
}
.flod {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: rgba(134, 147, 158, 1);
  line-height: 14px;
}
.flod img {
  width: 14px;
  height: 14px;
  transition: 0.2s;
  margin-right: 10px;
}
.flod-open {
  transform: rotate(180deg);
}
.default-show {
  height: 24px;
  overflow: hidden;
}
.current-border {
  border-color: #1059ff;
}
</style>

<template>
  <div class="topic">
    <div
      class="topic-box"
      ref="topicBox"
      :class="{
        'border-none': !border,
        'current-border': value === topicData.id
      }"
      :id="'topic-' + topicData.id"
      v-if="topicData"
    >
      <div
        class="topic-title"
        :class="{ 'default-show': flod && !open }"
        v-if="!(!showTitle && !showType)"
      >
        <div
          v-if="showTitle && topicData.topicName"
          class="topic-name"
          :class="{ 'topic-name-left': titleIsLeft }"
        >
          {{ topicData.topicName }}
        </div>
        <div v-else></div>
        <div v-if="!titleToMain" class="topic-data margin-left-20">
          <span v-if="topicData.index">{{ topicData.index + '，' }}</span>
          <div v-html="topicData.topicMain"></div>
        </div>
        <div v-else></div>
        <div v-if="showType && topicData.topicType" class="topic-type">
          {{ topicData.topicType }}
        </div>
        <div v-else></div>
      </div>
      <div class="topic-main">
        <div class="topic-data margin-bottom-10" v-if="titleToMain">
          <span v-if="topicData.index">{{ topicData.index + '，' }}</span>
          <div v-html="topicData.topicMain"></div>
        </div>
        <template v-if="!flod || open">
          <div
            class="option-box"
            v-if="topicData.options && topicData.options.length"
          >
            <template v-for="item in topicData.options">
              <div :key="item.value" class="option-list">
                <span>{{ item.value + '. ' }}</span>
                <p v-html="item.label"></p>
              </div>
            </template>
          </div>
          <template v-if="topicData.reference">
            <topic-item
              title="参考答案"
              :color="referenceColor"
              :htmlStr="topicData.reference"
            ></topic-item>
          </template>
          <template
            v-if="topicData.referenceArr && topicData.referenceArr.length"
          >
            <topic-item title="参考答案" :color="referenceColor">
              <template v-for="(item, index) in topicData.referenceArr">
                <div :key="index" class="option-list">
                  <span>{{ index + 1 + '. ' }}</span>
                  <p v-html="item"></p>
                </div>
              </template>
            </topic-item>
          </template>
          <template v-if="topicData.analysis">
            <topic-item title="解析" :htmlStr="topicData.analysis"></topic-item>
          </template>
          <template v-if="topicData.thought">
            <topic-item
              title="解题思路"
              :htmlStr="topicData.thought"
            ></topic-item>
          </template>
          <template v-if="topicData.children && topicData.children.length">
            <template v-for="(item, index) in topicData.children">
              <topic
                :topicData="item"
                :referenceColor="referenceColor"
                :value="value"
                :key="index"
                style="marginBottom: 10px"
                :showType="false"
              />
            </template>
          </template>
        </template>
        <div class="flod" v-if="flod" @click="onSwitch">
          <img
            :class="{ 'flod-open': open }"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAAXNSR0IArs4c6QAABXJJREFUWAnNmHtQVFUYwL9z75WUYRzEwBcCZi7ilFl/YJgNaS+ThgxiwSZqxj8iBPnDknES6cbQ9J/NgNo404w2aROrBTNBWn+AZT6iYnIoCEeHHlq2uLC8XWTv6fvuctfL7t3duwtYZ2b3nPOd7/Hb8/jO3QvwPy1sqlw2m03s+geSuAJxwNzRwMURQXLb92wvuMoY45H6jwisar8tgwHPBc4yAfhqDB5lADCKsjbOoAX1bJU7rO0GOgFFpsFk2RYlzodCDrwcjSwBPQYaYPAjzt+7447OelmWlUBqmtwUWFWNLRMYP4jKqzTDKdTnOefFlWUFF4P5CApG++dXO6/CX7obnQjBHIU55uKcvVFZZt0fyC4gmHz48GxhKPpjVHg+kPFU5ej7oGUBK7NarW5fX4azIMstkjgUXTeTUASCR3Z713Wl1heK+oZg4t12muJsI4NplzFWXF1bV+7r128pq2tt+XjyPvFVnOG+G2cvs3JH/lktziQw+b36WFEau4SD8ZrCHaw7E6KcDxQVFd2imJOWUpDG9qDsv4AiljT7rdhXqUHFCybvs8Xh9L3mEYf+XnXvUkhcOD+koigKsDo1BeLj5obUxdNQfujQoVmk6AUTJHgR+zGhrfGnLU+EnE0Z8EruRrjPkhzQhKCsWY9A9pPpUJizIaCebiCpxxW7ifpeMCbAVp1C0ObA4AgoCge8pOE5DGoEJ4miCrU8aZHqq69/KKhPbZAzXkBtFUyuOToXOE/XBkPV1+y90PDVBYRTvHD3p96eOYLKy1oHGpTd0Q+2xm9DuZ0YZxvxymIi9R7fnJcBwLaZtFTVenoHwNE3CKn3LAFBENTaOTAMvc4hP6hjDadheNRl1n1My7n2IxJpcxBWTsobJl10XP5T1dzy1FoVLvuJdFi7xgIL4+epcrvDCccavg4HSrWbJbE0dSkRarFJFj81gqv/8vayThWKAri5sEAFw6w7xy9iGILOK1e9cGRGeyqSmdJC4kGcoy4lLuY47jFNbqpOSUyAkREX2Hv7VX2CU06eh+TEeLjQ1uVdPjq5K5IXqbDOwWFTvulUqWACCP14P5ozQi1LymKwPrse3G4FPj15Di799pdq29V9DeijFYLKefphSMNkPDA0AjVHGrWhoDUXWJ+6lADKlaCaPoM3XWOqhBJo7jPrVFAfFTWNaFA0dtOlXoG+asZ9xrs9e0yAn401jKV//H0DGpu/x9THwQhOP1PkgZJr3ednjJ35S3EdhE41jzU3HXd80/pLEeqYupLI1/UeJwwOj8IKXFbKYyvxmrLfcEIvQuhniqCO1p+GflxKk6X1rdL89z3pAv//4XO9uQ2g8/5TRzc0tfwwaeYKtzym7ilSiwAK//NAE9lO7DFsiexDEoRbfOGSlniemiKBwti4itJHxOAFqyix0mXWSsJwix6ObCOEoivoREVp7u/kYyKPUZNwoRJJT3l64X0THD1xLFuaAGdaO8LZU1qgcS64q7SOX1atqq07gcJcTeFO1XjC9+Gf4Ne1eN6l1AQSZ8XY9mRMTTjz9cWYcaFCH8YP7M0yaw9nSg4qmT7feocRtHvcAnth504rvYTxFj8wGqks3fodXp152Jyk7LWavoaDgbJZLrFe9nXpt8f0CtUHbOu5wj9DmScH6Aen3u4GgWftLSnoNHJlOGOaIqUQJrEHsd+syaan5nXu8aiHAkFRjKAzpkHQM/g7B46/hPXbKFumySOo2zHi7r2l+V+EsjUFpjmhly1SnD0P3xJuQ9kG/Kh3rTYeoKZXTqeYoHxQUZLfhBe8qeersMD0gel1giSOPYqQa1BuwWjz0Nld2B8VgDuAC12cK22zXWNnd+16eVhva6b9L6sQBI+BZK7RAAAAAElFTkSuQmCC"
            alt=""
          />
          {{ open ? '收起' : '展开' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 题目详情展示组件
import topicItem from './topic-item'
export default {
  name: 'Topic',
  components: { topicItem },
  props: {
    referenceColor: {
      type: String,
      default: ''
    },
    flod: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    showType: {
      type: Boolean,
      default: true
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    titleToMain: {
      type: Boolean,
      default: false
    },
    titleIsLeft: {
      type: Boolean,
      default: true
    },
    topicData: {
      type: Object,
      default() {
        return null
      }
    },
    value: {
      type: [String, Number],
      default: 1
    }
  },
  data() {
    return {
      open: false
    }
  },
  watch: {
    topicData() {
      this.$refs.topicBox.scrollTop = 0
    },
    // 这里应该用emitter.js
    value(newValue, oldValue) {
      if (newValue === this.topicData.id) {
        let dom = document.getElementById('topic-' + newValue)
        if (dom) {
          dom.scrollIntoView()
        }
      }
    }
  },
  methods: {
    onSwitch() {
      this.open = !this.open
    }
  },
  mounted() {}
}
</script>
