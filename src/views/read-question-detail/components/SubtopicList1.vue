<style scoped>
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
  border: 1px solid #b9b9b9;
  border-radius: 5px 23px 23px 5px;
  transition: 0.2s;
}
.item-index {
  min-width: 0;
  flex: 1;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  color: #666;
}

.item-state {
  width: 32px;
  height: 32px;
  background: #ffffff;
  border: 1px solid rgba(86, 172, 255, 1);
  border-radius: 50%;
  margin-right: 7px;
  text-align: center;
  line-height: 32px;
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
  background: #ffffff;
  border-color: transparent;
}

li.margin-bottom-5 > .type1 {
  border: 1px solid #13a99f;
  color: #13a99f;
}

li.margin-bottom-5 > .type2 {
  border: 1px solid #ff5235;
  color: #ff5235;
}

li.margin-bottom-5 > .type4 {
  border: 1px solid #fba057;
  color: #fba057;
}

li.margin-bottom-5 > .type5 {
  border: 1px solid #8493a8;
  color: #8493a8;
}
</style>

<template>
  <div class="subtopic-list">
    <template v-for="(item, $index) in typelist">
      <div
        class="topic"
        :key="item.homeworkQuestionId"
        :id="`sub${item.homeworkQuestionId}`"
      >
        <div class="margin-bottom-5">
          {{ '阅读' + changeNum(item.homeworkQuestionSort - 1) }}
        </div>
        <ul class="subtopic-list-item">
          <template v-for="(child, index) in item.childQuestion">
            <li
              :key="child.homeworkQuestionId"
              class="margin-bottom-5"
              :class="{ current: value === child.homeworkQuestionId }"
              @click="currentItem(child)"
            >
              <div class="item-index">{{ index + 1 }}</div>
              <div class="item-state type1" v-if="child.questionTypeCode === 1">
                选择
              </div>
              <div
                class="item-state type2"
                v-else-if="child.questionTypeCode === 2"
              >
                选择
              </div>
              <div class="item-state" v-else-if="child.questionTypeCode === 3">
                判断
              </div>
              <div
                class="item-state type4"
                v-else-if="child.questionTypeCode === 4"
              >
                题组
              </div>
              <div
                class="item-state type5"
                v-else-if="child.questionTypeCode === 5"
              >
                填空
              </div>
              <div
                class="item-state type6"
                v-else-if="child.questionTypeCode === 6"
              >
                主观
              </div>
              <div class="item-state" v-else>未知</div>
            </li>
          </template>
        </ul>
        <a-divider
          style="margin: 20px 0 15px"
          v-if="$index !== typelist.length - 1 && typelist.length !== 1"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { toChinesNum } from '../../../util/assist'
export default {
  name: 'SubtopicList1',
  props: ['typelist'],
  data() {
    return {
      value: 0,
      list: [
        {
          id: 1,
          topic: '阅读一',
          children: [
            {
              id: 1,
              state: 1
            },
            {
              id: 2,
              state: 2
            },
            {
              id: 5,
              state: 5
            }
          ]
        },
        {
          id: 2,
          topic: '阅读二',
          children: [
            {
              id: 3,
              state: 3
            },
            {
              id: 4,
              state: 4
            }
          ]
        }
      ]
    }
  },
  methods: {
    currentItem(item) {
      if (this.value === item.homeworkQuestionId) {
        return false
      }
      this.value = item.homeworkQuestionId
      this.$emit('on-change', item)
    },
    setValue(getValue, time) {
      if (this.typelist.length > 0) {
        this.value = getValue.childQuestion[0].homeworkQuestionId
        if (time === 1) {
          let value = getValue.homeworkQuestionId
          this.$nextTick(() => {
            let dom = document.getElementById('sub' + value)
            dom.scrollIntoView()
          })
        }
      }
    },
    changeNum(val) {
      return toChinesNum(val + 1)
    }
  }
}
</script>
