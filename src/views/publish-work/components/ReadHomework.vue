<style lang="scss" scoped>
@import '@/styles/variable.scss';
.work-type-daily {
  @include wh(1200px, 85.4%);
  position: relative;
  margin: 20px auto 0;
}
.selected-box {
  cursor: pointer;
  top: 50%;
  right: 10px;
  min-width: 100px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  background:#FDFBEE;
  border:1px solid rgba(253, 220, 148, 1);
  border-radius:12px;
  padding: 7px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(240,113,36,1);
}
.selected-work-number {
  font-size: 30px;
  line-height: 1.2;
}
.selected-text {
  font-size: 14px;
}
</style>
<template>
  <div class="work-type-daily">
    <work-type-select :options="options" v-model="type" />
    <keep-alive exclude="ReadCollection">
      <ReadBook v-if="type == 0" @toParentEventOflength="getLength"></ReadBook>
      <MyResource v-if="type == 1" @toParentEventOflength="getLength"></MyResource>
      <ReadCollection
        v-if="type == 2"
        @toParentEventOflength="getLength"
      ></ReadCollection>
    </keep-alive>
    <div class="selected-box" @click="lockWorkList">
      <span class="selected-work-number">{{workList.length}}</span>
      <span class="selected-text">已选题量</span>
    </div>
    <read-work-list-modal ref='readWorkListModal'></read-work-list-modal>
  </div>
</template>

<script>
import ReadBook from './componentsOfChild/ReadBook'
import MyResource from './componentsOfChild/MyResource'
import ReadCollection from './componentsOfChild/ReadCollection'
import WorkTypeSelect from '../../../components/WorkTypeSelect'
import ReadListCard from '../../../components/ReadListCard'
import LookOriginal from '../../../components/LookOriginal'
import ReadWorkListModal from '../../../components/ReadWorkListModal'
export default {
  name: '',
  components: {
    WorkTypeSelect,
    ReadCollection,
    MyResource,
    ReadBook,
    ReadListCard,
    LookOriginal,
    ReadWorkListModal
  },
  data() {
    return {
      type: 0,
      options: [
        {
          label: '练习册',
          value: 0
        },
        {
          label: '我的资源',
          value: 1
        },
        {
          label: '收藏',
          value: 2
        }
      ]
    }
  },
  computed: {
    workList () {
      return this.$store.getters['work/readWorkList']
    },
    workListById () {
      return this.$store.getters['work/readWorkListById']
    }
  },
  mounted() {},
  methods: {
    lockWorkList () {
      if (this.workList.length) {
        this.$refs['readWorkListModal'].visible = true;
      } else {
        this.$message.warning('请先选择题目加入作业')
      }
    },
    selectType(t) {
      this.type = t
    },
    getLength(len) {
      this.$emit('toParentEventOflen', len)
    }
  }
}
</script>
