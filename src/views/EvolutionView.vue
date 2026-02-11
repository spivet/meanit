<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function handleSpeakAgain() {
  router.push({ name: 'evolution-summary' })
}
</script>

<template>
  <div class="min-h-full flex flex-col px-6 pt-4 pb-8">
    <!-- AI Evolution Card -->
    <div class="bg-white rounded-3xl p-6 premium-shadow border border-gray-50">
      <div class="flex justify-between items-start mb-8">
        <span
          class="bg-gray-100/80 text-[10px] font-bold tracking-[0.1em] text-gray-400 px-3 py-1.5 rounded-full uppercase">
          AI EVOLUTION
        </span>
        <button
          class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:text-teal-600 active:scale-95 transition-all"
          aria-label="朗读">
          <span class="material-symbols-outlined text-[24px]">volume_up</span>
        </button>
      </div>

      <div class="mb-10">
        <h1 class="font-serif italic text-2xl leading-relaxed text-gray-800 font-medium">
          I'd like to talk about a cozy bakery named
          <span class="text-teal-600">'Sun &amp; Flour'</span>
          in my neighborhood.
        </h1>
      </div>

      <div class="h-px w-full bg-gray-100 mb-6" />

      <!-- 核心表达 · KEY EXPRESSIONS -->
      <details class="group">
        <summary class="list-none cursor-pointer outline-none">
          <div
            class="bg-gray-50/80 border border-gray-100/50 rounded-full px-5 py-3.5 flex items-center justify-between active:bg-gray-100 transition-colors">
            <span class="text-[11px] font-bold tracking-[0.12em] text-gray-500 uppercase font-display">
              核心表达 · KEY EXPRESSIONS
            </span>
            <span
              class="material-symbols-outlined transition-transform duration-300 text-gray-400 text-[20px] group-open:rotate-180">
              expand_more
            </span>
          </div>
        </summary>
        <div class="mt-5 px-2 flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <span class="text-[15px] font-medium text-gray-700">Cozy</span>
            <span class="text-[13px] text-gray-400">舒适的 / 温馨的</span>
          </div>
          <div class="h-px w-full bg-gray-100" />
          <div class="flex flex-col gap-1">
            <span class="text-[15px] font-medium text-gray-700">Prioritize quality over quantity</span>
            <span class="text-[13px] text-gray-400">质重于量</span>
          </div>
          <div class="h-px w-full bg-gray-100" />
          <div class="flex flex-col gap-1">
            <span class="text-[15px] font-medium text-gray-700">Set someone apart</span>
            <span class="text-[13px] text-gray-400">使...脱颖而出</span>
          </div>
        </div>
      </details>
    </div>

    <!-- 再次发声按钮 -->
    <div class="mt-auto pt-6">
      <button
        class="btn-teal-gradient w-full h-14 rounded-full flex items-center justify-center gap-3 shadow-[0_8px_25px_-5px_rgba(20,184,166,0.4)] active:scale-[0.98] transition-all duration-200"
        @click="handleSpeakAgain">
        <span class="material-symbols-outlined text-white text-[22px]">send</span>
        <span class="text-white font-display font-semibold text-base tracking-wide">现在，再次发声</span>
      </button>
    </div>
  </div>
</template>
