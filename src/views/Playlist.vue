<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-animate px-4">
        <div class="text-center mb-8">
            <h2 class="text-4xl md:text-5xl font-bold text-white animate-text-pop-in">
                🎶 {{ mood }} Vibes
            </h2>
            <p class="mt-3 text-lg text-indigo-100 animate-text-fade-in">
                Discover your perfect soundtrack
            </p>
        </div>

        <div v-if="loading" class="animate-pulse flex flex-col items-center space-y-4">
            <div class="h-4 bg-indigo-200 rounded w-32"></div>
            <div class="h-4 bg-indigo-200 rounded w-48"></div>
        </div>

        <ul v-else class="w-full max-w-2xl space-y-4 animate-list-stagger">
            <li v-for="(song, index) in songs" :key="index"
                class="group relative overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-1"
                :class="{ 'bg-indigo-50': currentSong?.file === song.file }">
                <div @click="playSong(song)"
                    class="flex items-center justify-between p-4 bg-white rounded-xl shadow-lg cursor-pointer hover:shadow-xl">
                    <div class="flex items-center flex-1 min-w-0">
                        <div class="relative w-12 h-12 flex-shrink-0">
                            <div class="absolute inset-0 bg-indigo-500 opacity-20 rounded-lg"></div>
                            <span class="absolute inset-0 flex items-center justify-center text-xl">
                                {{ isPlaying && currentSong?.file === song.file ? '🎵' : '🎧' }}
                            </span>
                        </div>

                        <div class="ml-4 flex-1 truncate">
                            <h3 class="text-lg font-semibold text-gray-800 truncate">{{ song.title }}</h3>
                            <p class="text-sm text-gray-500 truncate">{{ song.artist }}</p>
                        </div>
                    </div>

                    <span class="ml-4 text-sm text-gray-400">
                        {{ isPlaying && currentSong?.file === song.file ? formatTime(currentTime) : '3:45' }}
                    </span>
                </div>

                <div v-if="isPlaying && currentSong?.file === song.file"
                    class="absolute bottom-0 left-0 h-1 bg-indigo-500" :style="{ width: progress + '%' }"></div>
            </li>
        </ul>

        <div v-if="currentSong"
            class="fixed bottom-0 left-0 right-0 bg-white shadow-2xl rounded-t-2xl p-4 mx-4 mb-4 transition-transform duration-300"
            :class="{ 'translate-y-full': !isPlaying, 'translate-y-0': isPlaying }">
            <div class="max-w-md mx-auto">
                <input type="range" v-model="currentTime" :max="duration"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-2" />

                <div class="flex items-center justify-between">
                    <button @click="skip(-10)" class="p-2 text-gray-500 hover:text-indigo-600">
                        ⏪
                    </button>

                    <button @click="togglePlay"
                        class="p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700">
                        {{ isPlaying ? '⏸' : '▶' }}
                    </button>

                    <button @click="skip(10)" class="p-2 text-gray-500 hover:text-indigo-600">
                        ⏩
                    </button>
                </div>
            </div>
        </div>

        <audio ref="audioPlayer" @timeupdate="updateProgress" @ended="handleAudioEnd"
            @loadedmetadata="initAudio"></audio>

        <router-link to="/mood"
            class="mt-5 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 animate-button-fade-in">
            Choose Another Mood
        </router-link>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
    setup() {
        const route = useRoute();
        const audioPlayer = ref(null);
        const isPlaying = ref(false);
        const currentTime = ref(0);
        const duration = ref(0);
        const currentSong = ref(null);
        const mood = ref(route.query.mood || 'Happy');
        const songs = ref([]);
        const loading = ref(true);

        const offlineSongs = {
            Happy: [
                { title: "Pharrell Williams - Happy", artist: "Pharrell Williams", file: "/music/happy.mp3" },
                { title: "Katy Perry - Firework", artist: "Katy Perry", file: "/music/firework.mp3" },
                { title: "Bruno Mars - 24K Magic", artist: "Bruno Mars", file: "/music/24k.mp3" },
                { title: "BTS - Dynamite", artist: "BTS", file: "/music/dynamite.mp3" },
                { title: "Shakira - Waka Waka", artist: "Shakira", file: "/music/waka_waka.mp3" },
            ],
            Relaxed: [
                { title: "Norah Jones - Don't Know Why", artist: "Norah Jones", file: "/music/dont_know_why.mp3" },
                { title: "Jack Johnson - Banana Pancakes", artist: "Jack Johnson", file: "/music/banana_pancakes.m4a" },
                { title: "Coldplay - The Scientist", artist: "Coldplay", file: "/music/the_scientist.mp3" },
                { title: "Michael Bublé - Feeling Good", artist: "Michael Bublé", file: "/music/feeling_good.mp3" },
                { title: "Sade - Smooth Operator", artist: "Sade", file: "/music/smooth_operator.mp3" },
            ],
            Sad: [
                { title: "Adele - Hello", artist: "Adele", file: "/music/hello.mp3" },
                { title: "Sam Smith - Too Good at Goodbyes", artist: "Sam Smith", file: "/music/too_good_at_goodbyes.mp3" },
                { title: "Lewis Capaldi - Someone You Loved", artist: "Lewis Capaldi", file: "/music/someone_you_loved.mp3" },
                { title: "Billie Eilish - Everything I Wanted", artist: "Billie Eilish", file: "/music/everything_i_wanted.mp3" },
                { title: "Passenger - Let Her Go", artist: "Passenger", file: "/music/let_her_go.mp3" },
            ],
            Focus: [
                { title: "Lofi Girl - 1AM Study Session", artist: "Lofi Girl", file: "/music/1am_study_session.mp3" },
                { title: "Hans Zimmer - Time", artist: "Hans Zimmer", file: "/music/time.mp3" },
                { title: "Mozart - Piano Sonata No. 16", artist: "Mozart", file: "/music/piano_sonata_16.mp3" },
                { title: "Chopin - Nocturne Op. 9 No. 2", artist: "Chopin", file: "/music/nocturne_op9.mp3" },
                { title: "Calm Ambient Music", artist: "Ambient", file: "/music/calm_ambient.mp3" },
            ],
            Party: [
                { title: "Black Eyed Peas - I Gotta Feeling", artist: "Black Eyed Peas", file: "/music/i_gotta_feeling.mp3" },
                { title: "Pitbull - Give Me Everything", artist: "Pitbull", file: "/music/give_me_everything.mp3" },
                { title: "LMFAO - Party Rock Anthem", artist: "LMFAO", file: "/music/party_rock_anthem.mp3" },
                { title: "Avicii - Wake Me Up", artist: "Avicii", file: "/music/wake_me_up.mp3" },
                { title: "David Guetta - Titanium", artist: "David Guetta", file: "/music/titanium.mp3" },
            ],
            Chill: [
                { title: "Joji - Slow Dancing in the Dark", artist: "Joji", file: "/music/slow_dancing_in_the_dark.mp3" },
                { title: "Mac Miller - Self Care", artist: "Mac Miller", file: "/music/self_care.mp3" },
                { title: "The Weeknd - Call Out My Name", artist: "The Weeknd", file: "/music/call_out_my_name.mp3" },
                { title: "Post Malone - Circles", artist: "Post Malone", file: "/music/circles.mp3" },
                { title: "Lana Del Rey - Video Games", artist: "Lana Del Rey", file: "/music/video_games.mp3" },
            ],
            Love: [
                { title: "Ed Sheeran - Thinking Out Loud", artist: "Ed Sheeran", file: "/music/thinking_out_loud.mp3" },
                { title: "John Legend - All of Me", artist: "John Legend", file: "/music/all_of_me.mp3" },
                { title: "Aerosmith - I Don't Want to Miss a Thing", artist: "Aerosmith", file: "/music/i_dont_want_to_miss_a_thing.mp3" },
                { title: "Whitney Houston - I Will Always Love You", artist: "Whitney Houston", file: "/music/i_will_always_love_you.mp3" },
                { title: "Celine Dion - My Heart Will Go On", artist: "Celine Dion", file: "/music/my_heart_will_go_on.mp3" },
            ],
            Workout: [
                { title: "Eminem - Till I Collapse", artist: "Eminem", file: "/music/till_i_collapse.mp3" },
                { title: "The Prodigy - Smack My B**** Up", artist: "The Prodigy", file: "/music/smack_my_bitch_up.mp3" },
                { title: "Kanye West - Stronger", artist: "Kanye West", file: "/music/stronger.mp3" },
                { title: "DMX - X Gon’ Give It To Ya", artist: "DMX", file: "/music/x_gon_give_it_to_ya.mp3" },
                { title: "Linkin Park - Bleed It Out", artist: "Linkin Park", file: "/music/bleed_it_out.mp3" },
            ]
        };

        onMounted(() => {
            songs.value = offlineSongs[mood.value] || offlineSongs['Happy'];
            loading.value = false;
        });

        const playSong = (song) => {
            if (audioPlayer.value) {
                currentSong.value = song;
                audioPlayer.value.src = song.file;
                audioPlayer.value.play();
                isPlaying.value = true;
            }
        };

        const togglePlay = () => {
            isPlaying.value ? audioPlayer.value.pause() : audioPlayer.value.play();
            isPlaying.value = !isPlaying.value;
        };

        const updateProgress = () => {
            currentTime.value = audioPlayer.value.currentTime;
        };

        const initAudio = () => {
            duration.value = audioPlayer.value.duration;
        };

        const skip = (seconds) => {
            audioPlayer.value.currentTime += seconds;
        };

        const formatTime = (seconds) => {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        };

        const handleAudioEnd = () => {
            isPlaying.value = false;
            currentSong.value = null;
        };

        return {
            mood,
            songs,
            loading,
            currentSong,
            isPlaying,
            currentTime,
            duration,
            playSong,
            togglePlay,
            updateProgress,
            initAudio,
            skip,
            formatTime,
            handleAudioEnd,
            progress: computed(() => (currentTime.value / duration.value) * 100),
        };
    },
};
</script>

<style>
/* input[type="range"]::-webkit-slider-thumb {
    @apply w-4 h-4 bg-indigo-600 rounded-full cursor-pointer appearance-none transition-all;
}

input[type="range"]::-moz-range-thumb {
    @apply w-4 h-4 bg-indigo-600 rounded-full cursor-pointer transition-all;
} */

@keyframes text-pop-in {
    0% {
        transform: scale(0.9);
        opacity: 0;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.animate-text-pop-in {
    animation: text-pop-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes list-stagger {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-list-stagger li {
    animation: list-stagger 0.6s ease forwards;
    opacity: 0;
}

.animate-list-stagger li:nth-child(1) {
    animation-delay: 0.1s;
}

.animate-list-stagger li:nth-child(2) {
    animation-delay: 0.2s;
}

.animate-list-stagger li:nth-child(3) {
    animation-delay: 0.3s;
}

.animate-list-stagger li:nth-child(4) {
    animation-delay: 0.4s;
}

.animate-list-stagger li:nth-child(5) {
    animation-delay: 0.5s;
}
</style>