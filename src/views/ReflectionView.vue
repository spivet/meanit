<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import HitIcon from '@/assets/svg/hit.svg'

const router = useRouter()

// 转写内容（从上一页传递或模拟）
const transcribedText = ref(
  '"I want talk bakery... Sun Flower... very good because they use good material..."',
)
const isTranscribing = ref(true)

// 得分
const score = ref(45)

// 用户输入的真实想法
const mentalIntent = ref('')

function handleSubmit() {
  if (!mentalIntent.value.trim()) {
    alert('请输入你的真实想法')
    return
  }
  console.log('提交意图:', mentalIntent.value)
  router.push({ name: 'evolution' })
}
</script>

<template>
  <div class="min-h-full flex flex-col px-6 pt-4 pb-6 space-y-6">
    <!-- 转写内容卡片 -->
    <div class="bg-white rounded-2xl p-5 border border-slate-100 premium-shadow">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-2">
          <span class="w-1.5 h-1.5 rounded-full bg-primary" :class="{ 'animate-pulse': isTranscribing }" />
          <h3 class="text-xs font-semibold text-slate-400 tracking-wider">回答 & 得分</h3>
        </div>
        <div class="flex items-center space-x-1.5 text-red-400 bg-red-50 rounded-full px-2.5 py-0.5">
          <img :src="HitIcon" alt="score" class="w-5 h-5 score-icon" />
          <span class="text-lg font-bold">{{ score }}</span>
        </div>
      </div>
      <p class="font-serif italic text-xl leading-relaxed text-slate-700">
        {{ transcribedText }}
      </p>
    </div>

    <!-- 映射思维输入 -->
    <div class="flex flex-col space-y-3">
      <h2 class="font-serif text-xl text-slate-800 pl-1">
        映射思维：你内心真正想表达的是？
      </h2>
      <div
        class="input-glow transition-all duration-300 rounded-2xl border border-blue-100/50 bg-white overflow-hidden premium-shadow">
        <textarea v-model="mentalIntent"
          class="w-full h-44 p-5 text-slate-600 placeholder-slate-300 border-none focus:ring-0 resize-none bg-transparent text-base leading-relaxed"
          placeholder="用中文输入你的真实想法，不限形式..." />
      </div>
    </div>

    <!-- 提交按钮 -->
    <div class="mt-auto pt-4">
      <button
        class="w-full btn-gradient text-white py-4 px-6 rounded-2xl flex items-center justify-center space-x-3 shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
        @click="handleSubmit">
        <span class="material-symbols-outlined text-2xl">send</span>
        <span class="font-display font-semibold tracking-wide text-lg">重塑地道表达</span>
      </button>
      <p class="text-center mt-3 text-xs text-slate-400 font-medium tracking-wide">
        AI 将结合你的意图重新优化表达
      </p>
    </div>
  </div>
</template>

<style scoped>
.input-glow:focus-within {
  box-shadow:
    0 0 0 1px rgba(70, 185, 175, 0.1),
    0 0 15px rgba(70, 185, 175, 0.05);
  border-color: rgba(70, 185, 175, 0.3);
}

.score-icon {
  filter: invert(67%) sepia(45%) saturate(1000%) hue-rotate(314deg) brightness(95%) contrast(90%);
}
</style>
