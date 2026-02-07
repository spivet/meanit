<script setup lang="ts">
import { ref, shallowRef, computed, useTemplateRef, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserMedia, useMediaControls, useObjectUrl } from '@vueuse/core'

const router = useRouter()

// 当前阶段状态
const stage = 'Origin'
const stageNumber = 1

// 问题内容
const question = 'Describe a small business you know that is very successful.'
const focusHint = 'Focus on: What it is, where it is, and the secret of its success.'

// 用户信息
const userInitials = 'JD'

// 录音状态
type RecordingState = 'idle' | 'recording' | 'recorded'
const recordingState = ref<RecordingState>('idle')
const isRecording = computed(() => recordingState.value === 'recording')
const hasRecording = computed(() => recordingState.value === 'recorded')

// 使用 VueUse 的 useUserMedia 获取麦克风流
const {
  stream,
  start: startStream,
  stop: stopStream,
  isSupported: isMicSupported,
} = useUserMedia({
  constraints: { audio: true, video: false },
})

// 录音相关
let mediaRecorder: MediaRecorder | null = null
let audioChunks: Blob[] = []
const audioBlob = shallowRef<Blob | null>(null)

// 使用 VueUse 的 useObjectUrl 自动管理 URL 生命周期
const audioUrl = useObjectUrl(audioBlob)

// 音频播放元素引用
const audioRef = useTemplateRef<HTMLAudioElement>('audioPlayer')

// 使用 VueUse 的 useMediaControls 控制播放
const {
  playing,
  currentTime,
  duration,
  ended,
} = useMediaControls(audioRef, {
  src: computed(() => audioUrl.value ?? ''),
})

// 播放进度计算 (0-100)
const playbackProgress = computed(() => {
  if (!duration.value) return 0
  return (currentTime.value / duration.value) * 100
})

// 进度环计算
const circumference = 2 * Math.PI * 41 // r=41
const progressOffset = computed(() => {
  return circumference - (playbackProgress.value / 100) * circumference
})

// 监听播放结束，重置进度
watch(ended, (isEnded) => {
  if (isEnded) {
    currentTime.value = 0
  }
})

// 开始录音
async function startRecording() {
  if (!isMicSupported.value) {
    alert('您的浏览器不支持录音功能')
    return
  }

  try {
    await startStream()

    if (!stream.value) {
      throw new Error('无法获取麦克风流')
    }

    mediaRecorder = new MediaRecorder(stream.value)
    audioChunks = []

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data)
      }
    }

    mediaRecorder.onstop = () => {
      audioBlob.value = new Blob(audioChunks, { type: 'audio/webm' })
      recordingState.value = 'recorded'
      stopStream()
    }

    mediaRecorder.start()
    recordingState.value = 'recording'
  } catch (error) {
    console.error('无法访问麦克风:', error)
    alert('无法访问麦克风，请检查权限设置')
  }
}

// 停止录音
function stopRecording() {
  if (mediaRecorder && mediaRecorder.state === 'recording') {
    mediaRecorder.stop()
  }
}

// 处理麦克风按钮点击
function handleMicClick() {
  if (isRecording.value) {
    stopRecording()
  } else {
    startRecording()
  }
}

// 重新录音
function reRecord() {
  playing.value = false
  currentTime.value = 0
  audioBlob.value = null
  audioChunks = []
  recordingState.value = 'idle'
}

// 播放/暂停录音
function togglePlayback() {
  playing.value = !playing.value
}

// 下一步 - 跳转到映射思维页面
function goNext() {
  router.push({ name: 'reflection' })
}
</script>

<template>
  <div class="max-w-md mx-auto h-full flex flex-col relative px-6 pt-12 pb-12">
    <!-- 隐藏的音频播放器，供 useMediaControls 使用 -->
    <audio ref="audioPlayer" class="hidden" />

    <!-- Header -->
    <header class="flex items-center justify-between mb-16">
      <div class="flex items-center space-x-3">
        <div
          class="w-10 h-10 bg-white flex items-center justify-center rounded-xl shadow-sm border border-slate-200/60"
        >
          <span class="material-icons-round text-primary text-2xl">waves</span>
        </div>
        <h1 class="text-xl font-bold tracking-tight text-slate-800">ECHO</h1>
      </div>
      <div class="flex items-center space-x-4">
        <button class="flex items-center justify-center text-slate-500">
          <span class="material-symbols-outlined text-2xl">calendar_today</span>
        </button>
        <div
          class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs font-bold"
        >
          {{ userInitials }}
        </div>
      </div>
    </header>

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

      <!-- 录音前/录音中：麦克风按钮 -->
      <div v-if="!hasRecording" class="mt-auto mb-16 flex flex-col items-center space-y-8">
        <button
          class="w-28 h-28 rounded-full flex items-center justify-center shadow-xl border border-white/50 group active:scale-95 transition-all duration-200"
          :class="isRecording ? 'bg-red-500 mic-recording' : 'bg-white mic-glow'"
          @click="handleMicClick"
        >
          <span
            class="material-icons-round text-5xl"
            :class="isRecording ? 'text-white' : 'text-primary'"
          >
            {{ isRecording ? 'stop' : 'mic' }}
          </span>
        </button>
        <p class="text-sm text-slate-400 font-medium">
          {{ isRecording ? '点击停止录音' : '长按开始第一次（Origin）尝试' }}
        </p>
      </div>

      <!-- 录音完成：三个操作按钮 -->
      <div v-else class="mt-auto mb-16 w-full flex flex-col items-center">
        <div class="flex items-start justify-center space-x-6 mb-12">
          <!-- 重录按钮 -->
          <div class="flex flex-col items-center space-y-3">
            <button
              class="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md border border-slate-100 group active:scale-95 transition-all duration-200"
              @click="reRecord"
            >
              <span class="material-icons-round text-slate-400 text-3xl group-hover:text-primary"
                >refresh</span
              >
            </button>
            <span class="text-xs font-medium text-slate-400">重录</span>
          </div>

          <!-- 播放按钮 -->
          <div class="flex flex-col items-center space-y-3">
            <div class="relative flex flex-col items-center">
              <!-- 进度环 -->
              <svg class="absolute -top-1 -left-1 w-[88px] h-[88px] pointer-events-none -rotate-90">
                <!-- 背景圆 -->
                <circle
                  class="text-slate-200/50"
                  cx="44"
                  cy="44"
                  fill="transparent"
                  r="41"
                  stroke="currentColor"
                  stroke-width="3"
                />
                <!-- 进度圆 -->
                <circle
                  class="text-primary transition-all duration-100"
                  cx="44"
                  cy="44"
                  fill="transparent"
                  r="41"
                  stroke="currentColor"
                  :stroke-dasharray="circumference"
                  :stroke-dashoffset="progressOffset"
                  stroke-linecap="round"
                  stroke-width="3"
                />
              </svg>
              <button
                class="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg border border-white group active:scale-95 transition-all duration-200 btn-shadow z-10"
                @click="togglePlayback"
              >
                <span class="material-icons-round text-primary text-4xl" :class="{ 'ml-1': !playing }">
                  {{ playing ? 'pause' : 'play_arrow' }}
                </span>
              </button>
            </div>
            <span class="text-xs font-medium text-slate-400">播放</span>
          </div>

          <!-- 下一步按钮 -->
          <div class="flex flex-col items-center space-y-3">
            <button
              class="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-lg group active:scale-95 transition-all duration-200"
              @click="goNext"
            >
              <span class="material-icons-round text-white text-4xl">arrow_forward</span>
            </button>
            <span class="text-xs font-medium text-slate-400">下一步</span>
          </div>
        </div>
        <p class="text-sm text-slate-400/80 font-medium">听听你刚才的表现，或者准备开始下一部分。</p>
      </div>
    </main>
  </div>
</template>

<style scoped>
.mic-glow {
  box-shadow:
    0 10px 25px -5px rgba(70, 185, 175, 0.15),
    0 8px 10px -6px rgba(70, 185, 175, 0.1);
}

.mic-recording {
  box-shadow:
    0 10px 25px -5px rgba(239, 68, 68, 0.3),
    0 8px 10px -6px rgba(239, 68, 68, 0.2);
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.btn-shadow {
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.05);
}
</style>
