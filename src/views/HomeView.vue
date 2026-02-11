<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import RecordingControls from '@/components/RecordingControls.vue'

const router = useRouter()

// 当前阶段
const stage = 'Origin'
const stageNumber = 1

// 问题内容
const question = 'Describe a small business you know that is very successful.'
const focusHint = 'Focus on: What it is, where it is, and the secret of its success.'

// RecordingControls 组件引用
const recordingControlsRef = ref<InstanceType<typeof RecordingControls> | null>(null)

function handleRecordingComplete(blob: Blob) {
  console.log('录音完成:', blob)
}

function handleRecordingError(error: Error) {
  console.error('录音错误:', error)
  alert(error.message || '录音过程中发生错误，请重试')
}

function handleReRecord() {
  console.log('重新录音')
}

function handleNext() {
  router.push({ name: 'reflection' })
}
</script>

<template>
  <div class="min-h-full flex flex-col items-center px-6 pt-6 pb-8">
    <!-- Stage Badge -->
    <div class="px-4 py-1.5 bg-slate-100/60 rounded-full mb-8">
      <span class="text-[10px] font-bold tracking-widest uppercase text-slate-500">
        Stage {{ stageNumber }}: {{ stage }}
      </span>
    </div>

    <!-- Question -->
    <div class="space-y-5 max-w-[320px] text-center mb-auto">
      <h2 class="font-serif italic text-[28px] leading-tight text-slate-900">
        {{ question }}
      </h2>
      <p class="italic text-slate-500 text-sm leading-relaxed">
        {{ focusHint }}
      </p>
    </div>

    <!-- Recording Controls -->
    <div class="mt-auto pt-8 w-full">
      <RecordingControls ref="recordingControlsRef" @recording-complete="handleRecordingComplete"
        @recording-error="handleRecordingError" @re-record="handleReRecord" @next="handleNext" />
    </div>
  </div>
</template>
