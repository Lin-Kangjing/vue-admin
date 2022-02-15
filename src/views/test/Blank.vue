<!--
 * @Description:测试空白页面
 * @FilePath: \DTSMv3\src\views\test\Blank.vue
 * @Date: 2022-01-29 21:06:56
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-02-14 14:27:50
 * @author: Lin_kangjing
-->
<template>
  <page-header-wrapper :title="title">
    <div class="blank">
      空白页面
      <div style="height:700px"></div>
    </div>
  </page-header-wrapper>
</template>

<script>
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
export default {
 components: {
   PageHeaderWrapper
 },
 data () {
   return {
     title: false
   }
 },
 created () {
 },
 mounted () {
 },
 methods: {
 }
}
</script>

<style scoped></style>
