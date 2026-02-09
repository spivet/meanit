<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const userInitials = 'JD'

function goBackHistory() {
  // 这里暂时返回首页，可按需调整为真正的「思维历史」路由
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center bg-[#F9FAFB]">
    <div
      class="w-full max-w-[390px] h-[844px] flex flex-col relative bg-soft-off-white shadow-2xl overflow-hidden rounded-[3rem] border-[8px] border-white"
    >
      <!-- Header -->
      <header
        class="px-6 pt-12 pb-4 flex justify-between items-center bg-soft-off-white/80 backdrop-blur-md sticky top-0 z-20"
      >
        <div class="flex items-center">
          <span class="text-2xl font-[800] tracking-tighter text-gray-900">ECHO</span>
        </div>
        <div class="flex items-center gap-3">
          <button
            class="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100/50"
          >
            <span class="material-symbols-outlined text-gray-600 text-[20px]">calendar_today</span>
          </button>
          <div
            class="w-10 h-10 rounded-full bg-[#E0F2F1] border-2 border-white shadow-sm flex items-center justify-center overflow-hidden"
          >
            <span class="text-[#00897B] font-bold text-xs">
              {{ userInitials }}
            </span>
          </div>
        </div>
      </header>

      <!-- Scrollable content -->
      <div class="flex-1 overflow-y-auto pb-12">
        <main class="px-6 pt-2">
          <!-- Today's Focus -->
          <section class="mb-8">
            <div class="flex items-center gap-3 mb-3">
              <span class="text-[11px] font-bold tracking-widest text-teal-600 uppercase">
                Today's Focus
              </span>
              <div class="h-[1px] flex-1 bg-gray-200" />
            </div>
            <h1 class="font-serif italic text-[24px] leading-snug text-gray-800 font-medium">
              Describe a small business you know that is very successful.
            </h1>
          </section>

          <!-- Origin & Evolution cards -->
          <div class="space-y-4 mb-8">
            <!-- Origin -->
            <div
              class="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex items-center gap-5"
            >
              <div class="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center">
                <span class="material-symbols-outlined text-gray-400 text-4xl">play_circle</span>
              </div>
              <div class="flex-1">
                <div class="text-[11px] font-extrabold text-gray-400 tracking-widest mb-1">
                  ORIGIN
                </div>
                <div class="text-[15px] font-medium text-gray-500">你的最初想法 · 20s</div>
              </div>
              <!-- 右侧占位，保持与下卡片对齐 -->
              <div class="flex flex-col items-center invisible">
                <div class="w-10 h-10 rounded-full flex items-center justify-center">
                  <span class="material-symbols-outlined text-xl">refresh</span>
                </div>
                <span class="text-[9px] mt-1 font-bold">spacer</span>
              </div>
            </div>

            <!-- Evolution -->
            <div
              class="bg-[#F0FDFA] rounded-[2rem] p-6 shadow-sm border border-teal-50/50 relative overflow-hidden"
            >
              <div class="flex items-center gap-5 mb-6">
                <div
                  class="w-16 h-16 rounded-2xl bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-200/50"
                >
                  <span
                    class="material-symbols-outlined text-white text-4xl"
                    style="font-variation-settings: 'FILL' 1"
                  >
                    play_arrow
                  </span>
                </div>
                <div class="flex-1">
                  <div class="text-[11px] font-extrabold text-teal-600 tracking-widest mb-1">
                    EVOLUTION
                  </div>
                  <div class="text-[15px] font-medium text-gray-700">重塑后的回响 · 22s</div>
                </div>
                <div class="flex flex-col items-center">
                  <div
                    class="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-teal-100 text-teal-600 shadow-sm"
                  >
                    <span class="material-symbols-outlined text-xl">refresh</span>
                  </div>
                  <span class="text-[9px] text-teal-600/70 mt-1 font-bold">重录复习</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-teal-500 text-lg">equalizer</span>
                  <span class="text-sm font-bold text-teal-600">进化程度提升了 42%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col gap-3 mb-10">
            <button
              class="btn-teal-gradient w-full h-16 rounded-full flex items-center justify-center gap-3 shadow-[0_8px_20px_-4px_rgba(20,184,166,0.3)] active:scale-[0.98] transition-all duration-200"
            >
              <span
                class="material-symbols-outlined text-white text-[20px]"
                style="font-variation-settings: 'FILL' 1"
              >
                share
              </span>
              <span class="text-white font-display font-semibold text-base tracking-wide">
                生成并分享进化卡片
              </span>
            </button>

            <button
              class="w-full h-16 rounded-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-600 active:scale-[0.98] transition-all duration-200"
              @click="goBackHistory"
            >
              <span class="material-symbols-outlined text-[20px]">history</span>
              <span class="font-display font-semibold text-base tracking-wide">
                回顾我的思维历史
              </span>
            </button>
          </div>
        </main>
      </div>

      <div
        class="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-200/80 rounded-full z-20"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.btn-teal-gradient {
  background: linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%);
}

.bg-soft-off-white {
  background-color: #f9fafb;
}
</style>

