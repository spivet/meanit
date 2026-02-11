<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goBackHistory() {
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="px-6 pt-4 pb-8">
    <!-- Today's Focus -->
    <section class="mb-8">
      <div class="flex items-center gap-3 mb-3">
        <span class="text-[11px] font-bold tracking-widest text-teal-600 uppercase">
          Today's Focus
        </span>
        <div class="h-px flex-1 bg-gray-200" />
      </div>
      <h1 class="font-serif italic text-2xl leading-snug text-gray-800 font-medium">
        Describe a small business you know that is very successful.
      </h1>
    </section>

    <!-- Origin & Evolution Cards -->
    <div class="space-y-4 mb-8">
      <!-- Origin Card -->
      <div class="bg-white rounded-3xl p-5 premium-shadow border border-gray-100 flex items-center gap-4">
        <div class="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-gray-400 text-3xl">play_circle</span>
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-[11px] font-extrabold text-gray-400 tracking-widest mb-1">ORIGIN</div>
          <div class="text-sm font-medium text-gray-500">你的最初想法 · 20s</div>
        </div>
      </div>

      <!-- Evolution Card -->
      <div class="bg-teal-50/60 rounded-3xl p-5 border border-teal-100/30">
        <div class="flex items-center gap-4 mb-5">
          <div
            class="w-14 h-14 rounded-2xl bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-200/50 shrink-0">
            <span class="material-symbols-outlined text-white text-3xl" style="font-variation-settings: 'FILL' 1">
              play_arrow
            </span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-[11px] font-extrabold text-teal-600 tracking-widest mb-1">EVOLUTION</div>
            <div class="text-sm font-medium text-gray-700">重塑后的回响 · 22s</div>
          </div>
          <div class="flex flex-col items-center shrink-0">
            <button
              class="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-teal-100 text-teal-600 shadow-sm active:scale-95 transition-transform">
              <span class="material-symbols-outlined text-xl">refresh</span>
            </button>
            <span class="text-[9px] text-teal-600/70 mt-1 font-bold">重录复习</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-teal-500 text-lg">equalizer</span>
          <span class="text-sm font-bold text-teal-600">进化程度提升了 42%</span>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex flex-col gap-3">
      <button
        class="btn-teal-gradient w-full h-14 rounded-full flex items-center justify-center gap-3 shadow-[0_8px_20px_-4px_rgba(20,184,166,0.3)] active:scale-[0.98] transition-all duration-200">
        <span class="material-symbols-outlined text-white text-[20px]" style="font-variation-settings: 'FILL' 1">
          share
        </span>
        <span class="text-white font-display font-semibold text-base tracking-wide">
          生成并分享进化卡片
        </span>
      </button>

      <button
        class="w-full h-14 rounded-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-600 active:scale-[0.98] transition-all duration-200"
        @click="goBackHistory">
        <span class="material-symbols-outlined text-[20px]">history</span>
        <span class="font-display font-semibold text-base tracking-wide">
          回顾我的思维历史
        </span>
      </button>
    </div>
  </div>
</template>
