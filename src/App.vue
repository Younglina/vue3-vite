<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
#app {
  font-size: 16px;
}
.flex-align{
  display: flex;
  align-items: center;
}

::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-thumb {
  background: #666;
}

:root {
  --color-subtest: #666;
  --color-text-blue: #2f5ced; //鲜蓝
  --color-bg-blue: #eaeffd;
  --color-text-red: #bc343c; //象牙红
  --color-bg-gray: #c5bfad1f; //米灰
}
</style>
