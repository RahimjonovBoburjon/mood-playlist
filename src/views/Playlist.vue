<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-animate">
        <h2 class="text-3xl font-bold mb-4 text-white animate-text-fade-in text-center">Your Mood-Based Playlist</h2>
        <p class="text-lg mb-6 text-white animate-text-fade-in">Mood: <span class="font-semibold">{{ mood }}</span></p>

        <div v-if="loading" class="text-white animate-text-fade-in">Loading...</div>
        <ul v-else class="w-full max-w-md bg-white p-4 rounded-lg shadow-md animate-list-fade-in">
            <li v-for="(song, index) in songs" :key="index" class="py-2 border-b last:border-none">
                🎵 <a :href="song.url" target="_blank" class="text-blue-500 hover:text-blue-700">{{ song.name }} - {{
                    song.artist }}</a>
            </li>
        </ul>

        <router-link to="/mood"
            class="mt-5 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 animate-button-fade-in">
            Choose Another Mood
        </router-link>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getSoundCloudSongs } from '../api/soundcloud';

export default {
    setup() {
        const route = useRoute();
        const mood = ref(route.query.mood || 'Happy');
        const songs = ref([]);
        const loading = ref(true);

        onMounted(async () => {
            songs.value = await getSoundCloudSongs(mood.value);
            loading.value = false;
        });

        return { mood, songs, loading };
    },
};
</script>

<style>
@keyframes gradientShift {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.bg-gradient-animate {
    background: linear-gradient(270deg, #4f46e5, #9333ea, #4f46e5);
    background-size: 200% 200%;
    animation: gradientShift 10s ease infinite;
}

@keyframes textFadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-text-fade-in {
    animation: textFadeIn 1.5s ease-out;
}

@keyframes listFadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-list-fade-in {
    animation: listFadeIn 1s ease-out;
}

@keyframes buttonFadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-button-fade-in {
    animation: buttonFadeIn 1s ease-out;
    animation-delay: 0.5s;
}
</style>