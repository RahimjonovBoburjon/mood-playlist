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
                { title: "BTS - Dynamite", artist: "BTS", file: "/music/dynamite.mp3" },
                { title: "Shakira - Waka Waka", artist: "Shakira", file: "/music/waka_waka.mp3" },
            ],
            Relaxed: [
                { title: "Norah Jones - Don't Know Why", artist: "Norah Jones", file: "/music/dont_know_why.mp3" },
                { title: "Jack Johnson - Banana Pancakes", artist: "Jack Johnson", file: "/music/banana_pancakes.mp3" },
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