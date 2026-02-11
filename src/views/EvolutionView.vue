<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'

const userInitials = 'JD'
const router = useRouter()

function handleSpeakAgain() {
  router.push({ name: 'evolution-summary' })
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center">
    <div class="w-full max-w-[390px] h-[844px] flex flex-col relative bg-soft-off-white shadow-2xl overflow-hidden">
      <!-- Header -->
      <AppHeader :user-initials="userInitials" variant="light" />

      <!-- Main -->
      <main class="flex-1 flex flex-col px-6 pt-8">
        <div
          class="bg-white rounded-[2.5rem] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col h-fit">
          <div class="flex justify-between items-start mb-10">
            <span
              class="bg-gray-100/80 text-[10px] font-bold tracking-[0.1em] text-gray-400 px-3 py-1.5 rounded-full uppercase">
              AI EVOLUTION
            </span>
            <button
              class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:text-teal-600 transition-colors">
              <span class="material-symbols-outlined text-[24px]">volume_up</span>
            </button>
          </div>

          <div class="mb-12">
            <h1 class="font-serif italic text-[26px] leading-[1.4] text-gray-800 font-medium">
              I'd like to talk about a cozy bakery named
              <span class="text-teal-600">'Sun &amp; Flour'</span>
              in my neighborhood.
            </h1>
          </div>

          <div class="h-px w-full bg-gray-50 mb-8"></div>

          <!-- 核心表达 · KEY EXPRESSIONS -->
          <details class="group">
            <summary class="list-none cursor-pointer outline-none">
              <div
                class="bg-gray-50/80 border border-gray-100/50 rounded-full px-5 py-3.5 flex items-center justify-between transition-all active:bg-gray-100">
                <span class="text-[11px] font-bold tracking-[0.12em] text-gray-500 uppercase font-display">
                  核心表达 · KEY EXPRESSIONS
                </span>
                <span
                  class="material-symbols-outlined transition-transform duration-300 text-gray-400 text-[20px] group-open:rotate-180">
                  expand_more
                </span>
              </div>
            </summary>
            <div class="mt-6 px-2 flex flex-col gap-5">
              <div class="flex flex-col gap-1.5">
                <span class="text-[15px] font-medium text-gray-700">Cozy</span>
                <span class="text-[13px] text-gray-400">舒适的 / 温馨的</span>
              </div>
              <div class="h-[1px] w-full bg-gray-50"></div>
              <div class="flex flex-col gap-1.5">
                <span class="text-[15px] font-medium text-gray-700">
                  Prioritize quality over quantity
                </span>
                <span class="text-[13px] text-gray-400">质重于量</span>
              </div>
              <div class="h-[1px] w-full bg-gray-50"></div>
              <div class="flex flex-col gap-1.5">
                <span class="text-[15px] font-medium text-gray-700">Set someone apart</span>
                <span class="text-[13px] text-gray-400">使...脱颖而出</span>
              </div>
            </div>
          </details>
        </div>
      </main>

      <!-- Footer -->
      <footer class="pb-12 px-6">
        <button
          class="btn-gradient w-full h-16 rounded-full flex items-center justify-center gap-3 shadow-[0_8px_25px_-5px_rgba(20,184,166,0.4)] active:scale-[0.98] transition-all duration-200"
          @click="handleSpeakAgain">
          <span class="material-symbols-outlined text-white text-[24px]">send</span>
          <span class="text-white font-display font-semibold text-lg tracking-wide">现在，再次发声</span>
        </button>
      </footer>

      <div class="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-gray-200 rounded-full"></div>
    </div>
  </div>
</template>

<style scoped>
.btn-gradient {
  background: linear-gradient(135deg, #2dd4bf 0%, #0d9488 100%);
}

.bg-soft-off-white {
  background-color: #f9fafb;
}
</style>
