<script setup lang="ts">
interface Props {
    userInitials?: string
    variant?: 'default' | 'light'
}

withDefaults(defineProps<Props>(), {
    userInitials: 'JD',
    variant: 'default',
})
</script>

<template>
    <header class="flex items-center justify-between" :class="variant === 'light' ? 'px-6 pt-6' : 'mb-16'">
        <!-- Logo -->
        <div class="flex items-center" :class="variant === 'default' ? 'space-x-3' : 'gap-1.5'">
            <div v-if="variant === 'default'"
                class="w-10 h-10 bg-white flex items-center justify-center rounded-xl shadow-sm border border-slate-200/60">
                <span class="material-icons-round text-primary text-2xl">waves</span>
            </div>
            <h1 class="font-extrabold tracking-tighter text-gray-900"
                :class="variant === 'light' ? 'text-xl' : 'text-xl'">
                ECHO
            </h1>
        </div>

        <!-- Actions -->
        <div class="flex items-center" :class="variant === 'default' ? 'space-x-4' : 'gap-3'">
            <button class="flex items-center justify-center text-slate-500" :class="variant === 'light'
                    ? 'w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100'
                    : ''
                ">
                <span class="material-symbols-outlined"
                    :class="variant === 'light' ? 'text-gray-600 text-[22px]' : 'text-2xl'">
                    calendar_today
                </span>
            </button>
            <div class="rounded-full flex items-center justify-center overflow-hidden" :class="variant === 'light'
                    ? 'w-10 h-10 bg-teal-100 border-2 border-white shadow-sm'
                    : 'w-10 h-10 bg-slate-800 text-white text-xs font-bold'
                ">
                <span :class="variant === 'light' ? 'text-teal-700 font-bold text-xs' : ''">
                    {{ userInitials }}
                </span>
            </div>
        </div>
    </header>
</template>
