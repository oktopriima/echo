<template>
  <Header />
  <div class="news-container">
    <h2 class="page-title">Today's Trending</h2>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-if="!news.length" class="news-empty">No news found.</div>
      <div v-for="item in news" :key="item.uri" class="news-item-vertical">
        <img
            v-if="item.image"
            class="news-image"
            :src="item.image"
            alt="news image"
            @error="hideImg($event)"
        />
        <div class="news-title" @click="toggleExpand(item.uri)">
          <p>{{ item.title }}</p>
        </div>
        <div class="news-meta">
          {{ item.date }} | From :
          <a :href="item.url" target="_blank">{{ item.source?.title || "" }}</a>
        </div>
        <div class="news-body">
          <template v-if="expanded[item.uri]">
            <span v-html="nl2br(item.body)"></span>
            <button class="show-more-btn" @click="toggleExpand(item.uri)">
              Show Less
            </button>
          </template>
          <template v-else>
            <span v-html="truncate(item.body, 240)"></span>
            <span v-if="item.body && item.body.length > 240">
              <button class="show-more-btn" @click="toggleExpand(item.uri)">
                Show More
              </button>
            </span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "./Header.vue";

type NewsSource = { title?: string };
type NewsItem = {
  uri: string;
  title: string;
  body?: string;
  url: string;
  date: string;
  image?: string;
  source?: NewsSource;
};

const news = ref<NewsItem[]>([]);
const loading = ref(true);
const expanded = ref<{ [uri: string]: boolean }>({});
const hasMore = ref(true);

function truncate(str: string = "", n: number = 100): string {
  return str.length > n ? str.substring(0, n) + "..." : str;
}

function hideImg(e: Event) {
  const img = e.target as HTMLImageElement;
  img.style.display = "none";
}

let lastScrollTop = 0;
async function fetchNews() {
  if (!hasMore.value) return;

  lastScrollTop = window.scrollY;
  loading.value = true;
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const res = await fetch(`${apiUrl}/api/news/trending`);
    const { success, data } = await res.json();

    if (!res.ok || !success) throw new Error("Failed to fetch news");

    if (Array.isArray(data) && data.length > 0) {
      news.value.push(...data);
    } else {
      hasMore.value = false;
    }
  } catch {
    hasMore.value = false;
  } finally {
    loading.value = false;
    setTimeout(() => window.scrollTo({ top: lastScrollTop }), 10);
  }
}

function toggleExpand(uri: string) {
  expanded.value[uri] = !expanded.value[uri];
}

function nl2br(text?: string) {
  return text ? text.replace(/\n/g, "<br>") : "";
}

onMounted(() => {
  fetchNews();
});

</script>

<style scoped>
.page-title {
  font-weight: bold;
  justify-content: center;
  color: var(--fg);
}

.news-container {
  max-width: 800px;
  margin: auto;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(44, 44, 44, 0.05);
  padding: 2rem;
  background-color: var(--bg);
}

.news-item-vertical {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem;
  background: var(--card-bg, #fff);
  border-radius: 12px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 5px rgba(44, 44, 44, 0.05);
}

.news-item-vertical:last-child {
  border-bottom: none;
}

.news-image {
  width: 100%;
  max-width: 480px;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  background: #ddd;
  margin-bottom: 1rem;
  align-self: center;
}

.news-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--fg, #222);
  margin-bottom: 0.4rem;
  margin-top: 0.5rem;
  text-align: left;
}

.news-meta {
  color: var(--fg, #555);
  font-size: 0.93rem;
  margin-bottom: 1rem;
}

.news-body {
  color: var(--fg);
  font-size: 1rem;
  text-align: justify;
  width: 100%;
}

.news-empty {
  color: var(--fg);
  font-size: 1.1rem;
  text-align: center;
  margin: 2rem 0;
}

.show-more-btn {
  margin-left: 0.5em;
  font-size: 0.92em;
  background: none;
  border: none;
  color: #665ee9;
  cursor: pointer;
  font-weight: 500;
  padding: 0;
  outline: none;
}

.show-more-btn:hover {
  text-decoration: underline;
}

@media (max-width: 700px) {
  .news-item-vertical {
    padding: 1rem 0.3rem;
    border-radius: 8px;
  }

  .news-image {
    max-width: 100%;
  }
}
</style>
