<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-animate">
        <h2 class="text-3xl font-bold mb-4 text-white animate-text-fade-in text-center mx-2">Your Mood-Based Playlist
        </h2>
        <p class="text-lg mb-6 text-white animate-text-fade-in">Mood: <span class="font-semibold">{{ mood }}</span></p>

        <div v-if="loading" class="text-white animate-text-fade-in">Loading...</div>

        <ul v-else class="w-full max-w-2xl bg-white p-6 rounded-xl shadow-2xl animate-list-fade-in space-y-4">
            <li v-for="(song, index) in songs" :key="index"
                class="group relative px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                @click="playSong(song.file)">
                <div class="flex items-center justify-between">
                    <div class="flex-1 min-w-0">
                        <div
                            class="flex items-center space-x-3 text-lg font-medium text-gray-800 hover:text-indigo-600 transition-colors cursor-pointer">
                            <span class="text-2xl">🎧</span>
                            <span class="truncate">{{ song.title }}</span>
                        </div>
                        <p class="ml-8 text-sm text-gray-500 truncate">{{ song.artist }}</p>
                    </div>
                </div>

                <div
                    class="absolute bottom-0 left-0 h-1 bg-indigo-100 w-0 group-hover:w-full transition-all duration-500 origin-left">
                </div>
            </li>
        </ul>

        <audio ref="audioPlayer" controls class="mt-4 w-full max-w-md hidden"></audio>

        <router-link to="/mood"
            class="mt-5 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 animate-button-fade-in">
            Choose Another Mood
        </router-link>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
    setup() {
        const route = useRoute();
        const mood = ref(route.query.mood || 'Happy');
        const songs = ref([]);
        const loading = ref(true);
        const audioPlayer = ref(null);

        const offlineSongs = {
            Happy: [
                { title: "Pharrell Williams - Happy", artist: "Pharrell Williams", file: "/music/happy.mp3" },
                { title: "Katy Perry - Firework", artist: "Katy Perry", file: "/music/firework.mp3" },
                { title: "Bruno Mars - 24K Magic", artist: "Bruno Mars", file: "/music/24k.mp3" },
            ],
            Relaxed: [
                { title: "Norah Jones - Don't Know Why", artist: "Norah Jones", file: "/music/dontknowwhy.mp3" },
                { title: "Jack Johnson - Banana Pancakes", artist: "Jack Johnson", file: "/music/bananapancakes.mp3" },
            ]
        };

        onMounted(() => {
            songs.value = offlineSongs[mood.value] || offlineSongs['Happy'];
            loading.value = false;
        });

        const playSong = (file) => {
            if (audioPlayer.value) {
                audioPlayer.value.src = file;
                audioPlayer.value.play();
                audioPlayer.value.classList.remove('hidden');
            }
        };

        return { mood, songs, loading, playSong, audioPlayer };
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
</style>