<template>
  <div class="tree-select">
    <a-tree-select
      style="width: 100%"
      :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
      :treeData="list"
      :placeholder="placeText"
      treeDefaultExpandAll
      v-model="currentTreeCode"
    >
      <span style="color: #08c" slot="title" slot-scope="{ key, value }">
        {{ value }}
      </span>
    </a-tree-select>
  </div>
</template>

<script>
import localforage from 'localforage'
export default {
  data() {
    return {
      placeText: '选择章节'
    }
  },
  computed: {
    currentTextbookChapterCode() {
      return this.$store.state.resource.currentTextbookChapterCode
    },
    currentTreeCode: {
      get() {
        return this.$store.state.resource.currentTreeCode
      },
      // setter
      set(newValue) {
        this.$store.commit('resource/CURRENTTREECODE', newValue)
      }
    },
    textbookChapter() {
      return this.$store.state.resource.textbookChapter
    },
    list() {
      let result = this.toTreeData(
        this.textbookChapter,
        'textbookChapterId',
        'textbookChapterParentid',
        'textbookChapterName'
      )
      return result
    }
  },
  watch: {
    currentTreeCode(value) {
      this.textbookChapter.forEach(item => {
        if (
          item.textbookChapterId === Number(value) &&
          item.textbookChapterIslast === 0
        ) {
          this.$message.warning('请选择章节')
          this.currentTreeCode = undefined
        }
      })
    }
  },
  mounted() {
    localforage.getItem('userInfo').then(value => {
      if (value) {
        this.$store.commit('GETUSERINFO', value)
        this.$store.commit('resource/CURRENTTREECODE')
        this.$store.dispatch('resource/getTextbookChapter').then(data => {
          if (data.flag === 1) {
            this.placeholderText()
          }
        })
      }
    })
  },
  methods: {
    toTreeData(data, id, pid, name) {
      let parent = []
      for (let i = 0; i < data.length; i++) {
        if (data[i][pid] === 0) {
          let obj = {
            title: data[i][name],
            value: String(data[i][id]),
            children: []
          }
          parent.push(obj) //数组加数组值
        }
      }

      children(parent)

      function children(parent) {
        if (data.length !== 0) {
          for (let i = 0; i < parent.length; i++) {
            for (let j = 0; j < data.length; j++) {
              if (parent[i].value == data[j][pid]) {
                let obj = {
                  title: data[j][name],
                  value: String(data[j][id]),
                  children: []
                }
                parent[i].children.push(obj)
              }
            }
            children(parent[i].children)
          }
        }
      }
      return parent
    },
    placeholderText() {
      this.textbookChapter.forEach(item => {
        if (item.textbookChapterCode === this.currentTextbookChapterCode) {
          this.placeText = item.textbookChapterName
          this.currentTreeCode = String(item.textbookChapterId)
        }
      })
    }
  }
}
</script>
