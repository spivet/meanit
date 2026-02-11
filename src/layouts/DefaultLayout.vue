<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="h-dvh max-w-md mx-auto flex flex-col overflow-hidden">
    <!-- 固定 Header -->
    <AppHeader class="shrink-0" />

    <!-- 可滚动内容区 -->
    <main class="flex-1 min-h-0 overflow-y-auto scrollbar-hide">
      <RouterView />
    </main>
  </div>
</template>
