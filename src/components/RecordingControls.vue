<script setup lang="ts">
import { ref, shallowRef, computed, useTemplateRef, watch } from 'vue'
import { useUserMedia, useMediaControls, useObjectUrl } from '@vueuse/core'

export interface RecordingControlsEmits {
  (e: 'recording-complete', blob: Blob): void
  (e: 'recording-error', error: Error): void
  (e: 're-record'): void
  (e: 'next'): void
}

export interface RecordingControlsProps {
  /** 录音提示文字 - 录音前 */
  idleHint?: string
  /** 录音提示文字 - 录音中 */
  recordingHint?: string
  /** 录音完成后底部提示文字 */
  completedHint?: string
  /** 是否自动播放 */
  autoPlay?: boolean
}

withDefaults(defineProps<RecordingControlsProps>(), {
  idleHint: '长按开始第一次（Origin）尝试',
  recordingHint: '点击停止录音',
  completedHint: '听听你刚才的表现，或者准备开始下一部分。',
  autoPlay: false,
})

const emit = defineEmits<RecordingControlsEmits>()

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
    const error = new Error('浏览器不支持录音功能')
    emit('recording-error', error)
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
      const blob = new Blob(audioChunks, { type: 'audio/webm' })
      audioBlob.value = blob
      recordingState.value = 'recorded'
      stopStream()
      emit('recording-complete', blob)
    }

    mediaRecorder.onerror = () => {
      const error = new Error('录音过程中发生错误')
      emit('recording-error', error)
      stopStream()
      recordingState.value = 'idle'
    }

    mediaRecorder.start()
    recordingState.value = 'recording'
  } catch (error) {
    console.error('无法访问麦克风:', error)
    emit('recording-error', error instanceof Error ? error : new Error('无法访问麦克风'))
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
  emit('re-record')
}

// 播放/暂停录音
function togglePlayback() {
  playing.value = !playing.value
}

// 下一步
function goNext() {
  emit('next')
}

// 暴露方法给父组件
defineExpose({
  /** 当前录音状态 */
  recordingState,
  /** 是否正在录音 */
  isRecording,
  /** 是否已完成录音 */
  hasRecording,
  /** 音频 Blob */
  audioBlob,
  /** 是否正在播放 */
  playing,
  /** 手动开始录音 */
  startRecording,
  /** 手动停止录音 */
  stopRecording,
  /** 重新录音 */
  reRecord,
})
</script>

<template>
  <div>
    <!-- 隐藏的音频播放器 -->
    <audio ref="audioPlayer" class="hidden" />

    <!-- 录音前/录音中：麦克风按钮 -->
    <div v-if="!hasRecording" class="flex flex-col items-center space-y-8">
      <button
        class="w-28 h-28 rounded-full flex items-center justify-center shadow-xl border border-white/50 group active:scale-95 transition-all duration-200"
        :class="isRecording ? 'bg-red-500 mic-recording' : 'bg-white mic-glow'" @click="handleMicClick">
        <span class="material-icons-round text-5xl" :class="isRecording ? 'text-white' : 'text-primary'">
          {{ isRecording ? 'stop' : 'mic' }}
        </span>
      </button>
      <p class="text-sm text-slate-400 font-medium">
        {{ isRecording ? recordingHint : idleHint }}
      </p>
    </div>

    <!-- 录音完成：三个操作按钮 -->
    <div v-else class="w-full flex flex-col items-center">
      <div class="flex items-start justify-center space-x-6 mb-12">
        <!-- 重录按钮 -->
        <div class="flex flex-col items-center space-y-3">
          <button
            class="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md border border-slate-100 group active:scale-95 transition-all duration-200"
            @click="reRecord">
            <span class="material-icons-round text-slate-400 text-3xl group-hover:text-primary">
              refresh
            </span>
          </button>
          <span class="text-xs font-medium text-slate-400">重录</span>
        </div>

        <!-- 播放按钮 -->
        <div class="flex flex-col items-center space-y-3">
          <div class="relative flex flex-col items-center">
            <!-- 进度环 -->
            <svg class="absolute -top-1 -left-1 w-[88px] h-[88px] pointer-events-none -rotate-90">
              <!-- 背景圆 -->
              <circle class="text-slate-200/50" cx="44" cy="44" fill="transparent" r="41" stroke="currentColor"
                stroke-width="3" />
              <!-- 进度圆 -->
              <circle class="text-primary transition-all duration-100" cx="44" cy="44" fill="transparent" r="41"
                stroke="currentColor" :stroke-dasharray="circumference" :stroke-dashoffset="progressOffset"
                stroke-linecap="round" stroke-width="3" />
            </svg>
            <button
              class="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg border border-white group active:scale-95 transition-all duration-200 btn-shadow z-10"
              @click="togglePlayback">
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
            @click="goNext">
            <span class="material-icons-round text-white text-4xl">arrow_forward</span>
          </button>
          <span class="text-xs font-medium text-slate-400">下一步</span>
        </div>
      </div>
      <p class="text-sm text-slate-400/80 font-medium">{{ completedHint }}</p>
    </div>
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
