<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-200">
        <h2 class="text-3xl font-bold mb-4">Your Mood-Based Playlist</h2>
        <p class="text-lg mb-6">Mood: <span class="font-semibold">{{ mood }}</span></p>

        <div v-if="loading">Loading...</div>
        <ul v-else class="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
            <li v-for="(song, index) in songs" :key="index" class="py-2 border-b last:border-none">
                🎵 {{ song.name }} - {{ song.artist }}
            </li>
        </ul>

        <router-link to="/mood" class="mt-5 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
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

        const songDatabase = {
            Happy: [{ name: 'Happy', artist: 'Pharrell Williams' }, { name: 'Uptown Funk', artist: 'Bruno Mars' }],
            Relaxed: [{ name: 'Weightless', artist: 'Marconi Union' }, { name: 'Sunset Lover', artist: 'Petit Biscuit' }],
            Energetic: [{ name: 'Eye of the Tiger', artist: 'Survivor' }, { name: 'Stronger', artist: 'Kanye West' }],
            Sad: [{ name: 'Someone Like You', artist: 'Adele' }, { name: 'Fix You', artist: 'Coldplay' }],
        };

        onMounted(() => {
            setTimeout(() => {
                songs.value = songDatabase[mood.value] || [];
                loading.value = false;
            }, 1000);
        });

        return { mood, songs, loading };
    },
};
</script>

<style scoped></style>