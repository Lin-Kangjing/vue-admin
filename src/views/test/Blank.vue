<!--
 * @Description:测试空白页面
 * @FilePath: \DTSMv3\src\views\test\Blank.vue
 * @Date: 2022-01-29 21:06:56
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-02-11 11:37:09
 * @author: Lin_kangjing
-->
<template>
  <div class="blank">
    <svg-icon name="user"></svg-icon>
    {{ b }}
    空白页面
  </div>
</template>

<script>
export default {
  components: {
    //  sTable: () => import('./sTable')
    // GlobalSearch: () => import('@@/Search/GlobalSearch')
  },
  data () {
    return {
      a: '12423dafkjl;5465'
    }
  },
  created () {
    this.b = 123123
  },
  mounted () {},
  methods: {}
}
</script>

<style scoped></style>
