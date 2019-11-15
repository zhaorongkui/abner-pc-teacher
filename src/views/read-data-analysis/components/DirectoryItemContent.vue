<template>
  <div class="directory-item-content">
    <div class="content-top">
      <div class="correct-rate vertical-center">
        <div><span class="correct-rate-value">{{ data.correctRate }}</span><span>%</span></div>
        <span class="correct-rate-label">正确率</span>
      </div>
      <div class="average-time vertical-center">
        <div><span class="average-time-value">{{ data.averageTime }}</span></div>
        <span class="average-time-label">平均用时</span>
      </div>
    </div>
    <a-divider style="margin: 10px 0" />
    <div class="content-bottom">
      <span class="ability-label margin-right-5">能力维度</span>
      <div class="ability-value">{{ data.ability }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DirectoryItemContent',
  props: {
    data: {
      required: true,
      default() {
        return {
          correctRate: '',
          averageTime: '',
          ability: ''
        }
      }
    }
  }
}
</script>

<style scoped>
.content-top {
  display: flex;
  justify-content: space-around;
}

.content-bottom {
  display: flex;
}

.correct-rate-value,
.average-time-value {
  font-size: 24px;
  font-weight: 500;
  color: rgba(78, 95, 113, 1);
}

.correct-rate-label,
.average-time-label,
.ability-label {
  font-size: 14px;
  font-weight: bold;
  color: rgba(150, 150, 155, 1);
}

.ability-value {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: rgba(78, 95, 113, 1);
}
.text-small {
  font-size: 16px;
}

</style>
