<script setup lang="ts">
import {ref, onMounted} from 'vue';

const theme = ref<'light' | 'dark'>('light');

function setTheme(t: 'light' | 'dark') {
  theme.value = t;
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
}

function toggleTheme() {
  setTheme(theme.value === 'light' ? 'dark' : 'light');
}

onMounted(() => {
  const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
  setTheme(saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
});
</script>

<template>
  <div class="header-bar">
    <div class="menu-bar">
      <a class="menu-btn" href="/">Home</a>
      <a class="menu-btn" href="/trending">Today's Trending</a>
    </div>

    <button class="theme-toggle" @click="toggleTheme">
      <span v-if="theme === 'light'">🌞 Light</span>
      <span v-else>🌙 Dark</span>
    </button>
  </div>
</template>

<style scoped>
.header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
}

.menu-bar {
  display: flex;
  gap: 0.7rem;
  flex: 1;
}

.menu-btn {
  font-weight: bold;
  font-size: 1.05rem;
  color: var(--fg);
  text-decoration: none;
  background: var(--menu-bg);
  padding: 0.4em 1.2em;
  border-radius: 999px;
  transition: background 0.2s;
  display: inline-block;
}

.menu-btn:hover {
  background: #ddd;
  color: #111;
}

.menu-btn:hover {
  background: #ddd;
}

.theme-toggle {
  border: none;
  background: #222;
  color: #fff;
  font-weight: bold;
  border-radius: 999px;
  padding: 0.4em 1.3em;
  cursor: pointer;
  transition: background 0.2s;
}

.theme-toggle:hover {
  background: #444;
}
</style>