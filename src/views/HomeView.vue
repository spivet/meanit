<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import RecordingControls from '@/components/RecordingControls.vue'

const router = useRouter()

// 当前阶段状态
const stage = 'Origin'
const stageNumber = 1

// 问题内容
const question = 'Describe a small business you know that is very successful.'
const focusHint = 'Focus on: What it is, where it is, and the secret of its success.'

// 用户信息
const userInitials = 'JD'

// RecordingControls 组件引用
const recordingControlsRef = ref<InstanceType<typeof RecordingControls> | null>(null)

// 录音完成处理
function handleRecordingComplete(blob: Blob) {
  console.log('录音完成:', blob)
  // 可以在这里处理录音数据，如上传到服务器等
}

// 录音错误处理
function handleRecordingError(error: Error) {
  console.error('录音错误:', error)
  alert(error.message || '录音过程中发生错误，请重试')
}

// 重新录音处理
function handleReRecord() {
  console.log('重新录音')
}

// 下一步 - 跳转到映射思维页面
function handleNext() {
  router.push({ name: 'reflection' })
}
</script>

<template>
  <div class="max-w-md mx-auto h-full flex flex-col relative px-6 pt-12 pb-12">
    <!-- Header -->
    <AppHeader :user-initials="userInitials" />

    <!-- Main Content -->
    <main class="grow flex flex-col items-center">
      <div class="w-full flex flex-col items-center text-center">
        <!-- Stage Badge -->
        <div class="px-4 py-1.5 bg-slate-200/50 rounded-full mb-8">
          <span class="text-[10px] font-bold tracking-widest uppercase text-slate-500">
            Stage {{ stageNumber }}: {{ stage }}
          </span>
        </div>

        <!-- Question -->
        <div class="space-y-6 max-w-[320px]">
          <h2 class="font-serif italic text-[32px] leading-tight text-slate-900 px-2">
            {{ question }}
          </h2>
          <p class="italic text-slate-500 text-sm leading-relaxed px-4">
            {{ focusHint }}
          </p>
        </div>
      </div>

      <!-- 录音控制组件 -->
      <div class="mt-auto mb-16 w-full">
        <RecordingControls ref="recordingControlsRef" idle-hint="长按开始第一次（Origin）尝试" recording-hint="点击停止录音"
          completed-hint="听听你刚才的表现，或者准备开始下一部分。" @recording-complete="handleRecordingComplete"
          @recording-error="handleRecordingError" @re-record="handleReRecord" @next="handleNext" />
      </div>
    </main>
  </div>
</template>
