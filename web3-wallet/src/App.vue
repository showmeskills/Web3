<template>
    <!-- <button @click="onClick">修改</button> -->
    <!-- <Web3Api :title="state.title"/> -->
    <AccountSystem/>
</template>

<script setup>
    import { reactive } from "vue";
    import Web3Api from "./components/Web3Api.vue";
    import AccountSystem from "./components/AccountSystem.vue";
    const state = reactive({
        title: 'Web3 API'
    });
    const onClick = () => state.title = 'changed'
</script>

<style lang="less">
  
</style>
