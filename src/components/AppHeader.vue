<script setup lang="ts">
withDefaults(
  defineProps<{
    /** 用户头像文字 */
    userInitials?: string
  }>(),
  { userInitials: 'JD' },
)
</script>

<template>
  <header class="flex items-center justify-between px-6 py-4">
    <!-- Brand -->
    <span class="text-xl font-extrabold tracking-tighter text-gray-900 select-none">
      ECHO
    </span>

    <!-- Actions -->
    <div class="flex items-center gap-3">
      <button
        class="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100/80 text-gray-500 active:scale-95 transition-transform"
        aria-label="日历">
        <span class="material-symbols-outlined text-[20px]">calendar_today</span>
      </button>

      <div class="w-10 h-10 rounded-full bg-teal-50 border-2 border-white shadow-sm flex items-center justify-center">
        <span class="text-teal-700 font-bold text-xs">{{ userInitials }}</span>
      </div>
    </div>
  </header>
</template>
