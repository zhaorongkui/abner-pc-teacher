<template>
  <div class="tag-list">
    <template v-for="(item, index) in data">
      <div :key="index" class="list-item">
        <span class="tag-list-label">{{ item.label }}</span>
        <template v-if="isArray(item.value)">
          <template v-for="(text, textIndex) in item.value">
            <span
              :style="{ color: color }"
              class="tag-list-value"
              :key="'text' + textIndex"
              >{{ text }}</span
            >
            <a-divider
              :key="'divider' + textIndex"
              v-if="
                textIndex !== item.value.length - 1 && item.value.length !== 1
              "
              type="vertical"
              style="margin: 0 20px;"
            />
          </template>
        </template>
        <template v-else>
          <span :style="{ color: color }" class="tag-list-value">{{
            item.value
          }}</span>
          <a-divider
            v-if="index !== data.length - 1 && data.length !== 1"
            type="vertical"
            style="margin: 0 20px;"
          />
        </template>
      </div>
    </template>
  </div>
</template>

<script>
// 篇目信息展示组件，如：试题来源，篇目数，能力维度等。
export default {
  name: 'TagList',
  props: {
    color: {
      type: String,
      default() {
        return 'rgba(94, 132, 173, 1)'
      }
    },
    data: {
      type: Array,
      default() {
        return [
          {
            label: '暂无',
            value: '暂无'
          }
        ]
      }
    }
  },
  methods: {
    isArray(arr) {
      return $.isArray(arr)
    }
  }
}
</script>

<style scoped>
.tag-list {
  display: inline-block;
}
.list-item {
  display: inline-flex;
  align-items: center;
}
.tag-list-label {
  margin-right: 20px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 19px;
}
.tag-list-value {
  max-width: 300px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(94, 132, 173, 1);
  line-height: 19px;
}
</style>
