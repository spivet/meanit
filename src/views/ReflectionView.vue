<script setup lang="ts">
import { ref } from 'vue'
import HitIcon from '@/assets/svg/hit.svg'

// 用户信息
const userInitials = 'JD'

// 转写内容（从上一页传递或模拟）
const transcribedText = ref(
  '"I want talk bakery... Sun Flower... very good because they use good material..."',
)
const isTranscribing = ref(true)

// 得分
const score = ref(45)

// 用户输入的真实想法
const mentalIntent = ref('')

// 提交处理
function handleSubmit() {
  if (!mentalIntent.value.trim()) {
    alert('请输入你的真实想法')
    return
  }
  // TODO: 调用 AI 重塑表达
  console.log('提交意图:', mentalIntent.value)
}
</script>

<template>
  <div class="max-w-md mx-auto h-full flex flex-col relative px-6 pt-12 pb-8">
    <!-- Header -->
    <header class="flex items-center justify-between mb-8">
      <div class="flex items-center space-x-3">
        <div
          class="w-10 h-10 bg-white flex items-center justify-center rounded-xl shadow-sm border border-slate-200/60">
          <span class="material-icons-round text-primary text-2xl">waves</span>
        </div>
        <h1 class="text-xl font-bold tracking-tight text-slate-800">ECHO</h1>
      </div>
      <div class="flex items-center space-x-4">
        <button class="flex items-center justify-center text-slate-500">
          <span class="material-symbols-outlined text-2xl">calendar_today</span>
        </button>
        <div
          class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs font-bold shadow-md">
          {{ userInitials }}
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="grow flex flex-col space-y-8">
      <!-- 转写内容卡片 -->
      <div class="bg-white rounded-2xl p-6 border border-slate-100 premium-shadow">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-2">
            <span class="w-1.5 h-1.5 rounded-full bg-primary" :class="{ 'animate-pulse': isTranscribing }"></span>
            <h3 class="text-xs font-semibold text-slate-400 tracking-wider">回答 & 得分</h3>
          </div>
          <!-- 得分徽章 -->
          <div class="flex items-center space-x-1.5 text-red-400 bg-red-50 rounded-full px-2">
            <img :src="HitIcon" alt="score" class="w-5 h-5 score-icon" />
            <span class="text-lg font-bold">{{ score }}</span>
          </div>
        </div>
        <p class="font-serif italic text-xl leading-relaxed text-slate-700">
          {{ transcribedText }}
        </p>
      </div>

      <!-- 映射思维输入区域 -->
      <div class="flex flex-col space-y-4">
        <h2 class="font-serif text-[22px] text-slate-800 pl-1">映射思维：你内心真正想表达的是？</h2>
        <div
          class="relative group input-glow transition-all duration-300 rounded-2xl border border-blue-100/50 bg-white overflow-hidden premium-shadow">
          <textarea v-model="mentalIntent"
            class="w-full h-48 p-6 text-slate-600 placeholder-slate-300 border-none focus:ring-0 resize-none bg-transparent text-lg"
            placeholder="用中文输入你的真实想法，不限形式..."></textarea>
        </div>
      </div>

      <!-- 提交按钮 -->
      <div class="mt-auto pb-6">
        <button
          class="w-full btn-gradient text-white py-4 px-6 rounded-2xl flex items-center justify-center space-x-3 shadow-lg shadow-primary/20 active:scale-[0.98] transition-all group"
          @click="handleSubmit">
          <span
            class="material-symbols-outlined text-2xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">send</span>
          <span class="font-display font-semibold tracking-wide text-lg">重塑地道表达</span>
        </button>
        <p class="text-center mt-4 text-xs text-slate-400 font-medium tracking-wide">
          AI 将结合你的意图重新优化表达
        </p>
      </div>
    </main>
  </div>
</template>

<style scoped>
.premium-shadow {
  box-shadow:
    0 10px 30px -10px rgba(0, 0, 0, 0.04),
    0 4px 10px -5px rgba(0, 0, 0, 0.02);
}

.input-glow:focus-within {
  box-shadow:
    0 0 0 1px rgba(70, 185, 175, 0.1),
    0 0 15px rgba(70, 185, 175, 0.05);
  border-color: rgba(70, 185, 175, 0.3);
}

.btn-gradient {
  background: linear-gradient(135deg, #46b9af 0%, #3aa89f 100%);
}

/* 将 SVG 图标颜色调整为珊瑚红色 */
.score-icon {
  filter: invert(67%) sepia(45%) saturate(1000%) hue-rotate(314deg) brightness(95%) contrast(90%);
}
</style>
