<!--
 * @Description:
 * @FilePath: \DTSMv3\src\App.vue
 * @Date: 2022-01-24 15:04:52
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-02-09 10:14:22
 * @author: Lin_kangjing
-->
<template>
  <!-- <a-config-provider :locale="locale"> -->
  <div id="app">
    <router-view/>
  </div>
  <!-- </a-config-provider> -->
</template>

<script>
// 暂时去掉国际化
// import { domTitle, setDocumentTitle } from '@/utils/domUtil'
// import { i18nRender } from '@/locales'

export default {
  data () {
    return {
    }
  },
  computed: {
    // locale () {
    //   // 只是为了切换语言时，更新标题
    //   const { title } = this.$route.meta
    //   title && (setDocumentTitle(`${i18nRender(title)} - ${domTitle}`))

    //   return this.$i18n.getLocaleMessage(this.$store.getters.lang).antLocale
    // }
  }
}
</script>
