<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-animate">
        <h2 class="text-3xl font-bold mb-4 text-white animate-text-fade-in text-center mx-2">Your Mood-Based Playlist
        </h2>
        <p class="text-lg mb-6 text-white animate-text-fade-in">Mood: <span class="font-semibold">{{ mood }}</span></p>

        <div v-if="loading" class="text-white animate-text-fade-in">Loading...</div>
        
        <ul v-else class="w-full max-w-2xl bg-white p-6 rounded-xl shadow-2xl animate-list-fade-in space-y-4">
            <li v-for="(song, index) in songs" :key="index"
                class="group relative px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
                <div class="flex items-center justify-between">
                    <div class="flex-1 min-w-0">
                        <a :href="song.url" target="_blank"
                            class="flex items-center space-x-3 text-lg font-medium text-gray-800 hover:text-indigo-600 transition-colors">
                            <span class="text-2xl">🎧</span>
                            <span class="truncate">{{ song.title }}</span>
                        </a>
                        <p class="ml-8 text-sm text-gray-500 truncate">{{ song.artist }}</p>
                    </div>
                </div>

                <div
                    class="absolute bottom-0 left-0 h-1 bg-indigo-100 w-0 group-hover:w-full transition-all duration-500 origin-left">
                </div>
            </li>
        </ul>

        <!-- <ul v-else class="w-full max-w-md bg-white p-4 rounded-lg shadow-md animate-list-fade-in">
            <li v-for="(song, index) in songs" :key="index" class="py-2 border-b last:border-none">
                🎵 <a :href="song.url" target="_blank" class="text-blue-500 hover:text-blue-700">{{ song.name }} - {{
                    song.artist }}</a>
            </li>
        </ul> -->

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

        const offlineSongs = {
            Happy: [
                { title: "Pharrell Williams - Happy", url: "https://www.youtube.com/watch?v=y6Sxv-sUYtM" },
                { title: "Katy Perry - Firework", url: "https://www.youtube.com/watch?v=QGJuMBdaqIw" },
                { title: "Bruno Mars - 24K Magic", url: "https://www.youtube.com/watch?v=UqyT8IEBkvY" },
                { title: "BTS - Dynamite", url: "https://www.youtube.com/watch?v=gdZLi9oWNZg" },
                { title: "Shakira - Waka Waka", url: "https://www.youtube.com/watch?v=pRpeEdMmmQ0" },
            ],
            Relaxed: [
                { title: "Norah Jones - Don't Know Why", url: "https://www.youtube.com/watch?v=tO4dxvguQDk" },
                { title: "Jack Johnson - Banana Pancakes", url: "https://www.youtube.com/watch?v=OkyrIRyrRdY" },
                { title: "Coldplay - The Scientist", url: "https://www.youtube.com/watch?v=RB-RcX5DS5A" },
                { title: "Michael Bublé - Feeling Good", url: "https://www.youtube.com/watch?v=Edwsf-8F3sI" },
                { title: "Sade - Smooth Operator", url: "https://www.youtube.com/watch?v=4TYv2PhG89A" },
            ],
            Sad: [
                { title: "Adele - Hello", url: "https://www.youtube.com/watch?v=YQHsXMglC9A" },
                { title: "Sam Smith - Too Good at Goodbyes", url: "https://www.youtube.com/watch?v=AX8-YzMKZhQ" },
                { title: "Lewis Capaldi - Someone You Loved", url: "https://www.youtube.com/watch?v=bCuhuePlP8o" },
                { title: "Billie Eilish - Everything I Wanted", url: "https://www.youtube.com/watch?v=EgBJmlPo8Xw" },
                { title: "Passenger - Let Her Go", url: "https://www.youtube.com/watch?v=RBumgq5yVrA" },
            ],
            Focus: [
                { title: "Lofi Girl - 1AM Study Session", url: "https://www.youtube.com/watch?v=lTRiuFIWV54" },
                { title: "Hans Zimmer - Time", url: "https://www.youtube.com/watch?v=RX6GvZxF8JY" },
                { title: "Mozart - Piano Sonata No. 16", url: "https://www.youtube.com/watch?v=PPZgXzkZtdM" },
                { title: "Chopin - Nocturne Op. 9 No. 2", url: "https://www.youtube.com/watch?v=9E6b3swbnWg" },
                { title: "Calm Ambient Music", url: "https://www.youtube.com/watch?v=EX06SUp3tSo" },
            ],
            Party: [
                { title: "Black Eyed Peas - I Gotta Feeling", url: "https://www.youtube.com/watch?v=uSD4vsh1zDA" },
                { title: "Pitbull - Give Me Everything", url: "https://www.youtube.com/watch?v=EPo5wWmKEaI" },
                { title: "LMFAO - Party Rock Anthem", url: "https://www.youtube.com/watch?v=KQ6zr6kCPj8" },
                { title: "Avicii - Wake Me Up", url: "https://www.youtube.com/watch?v=IcrbM1l_BoI" },
                { title: "David Guetta - Titanium", url: "https://www.youtube.com/watch?v=JRfuAukYTKg" },
            ],
            Chill: [
                { title: "Joji - Slow Dancing in the Dark", url: "https://www.youtube.com/watch?v=K3Qzzggn--s" },
                { title: "Mac Miller - Self Care", url: "https://www.youtube.com/watch?v=SsKT0s5J8ko" },
                { title: "The Weeknd - Call Out My Name", url: "https://www.youtube.com/watch?v=M0hdqcvhPiM" },
                { title: "Post Malone - Circles", url: "https://www.youtube.com/watch?v=wXhTHyIgQ_U" },
                { title: "Lana Del Rey - Video Games", url: "https://www.youtube.com/watch?v=cE6wxDqdOV0" },
            ],
            Love: [
                { title: "Ed Sheeran - Thinking Out Loud", url: "https://www.youtube.com/watch?v=lp-EO5I60KA" },
                { title: "John Legend - All of Me", url: "https://www.youtube.com/watch?v=450p7goxZqg" },
                { title: "Aerosmith - I Don't Want to Miss a Thing", url: "https://www.youtube.com/watch?v=JkK8g6FMEXE" },
                { title: "Whitney Houston - I Will Always Love You", url: "https://www.youtube.com/watch?v=3JWTaaS7LdU" },
                { title: "Celine Dion - My Heart Will Go On", url: "https://www.youtube.com/watch?v=WNIPqafd4As" },
            ],
            Workout: [
                { title: "Eminem - Till I Collapse", url: "https://www.youtube.com/watch?v=ytQ5CYE1VZw" },
                { title: "The Prodigy - Smack My B**** Up", url: "https://www.youtube.com/watch?v=hxgMKNeMMXA" },
                { title: "Kanye West - Stronger", url: "https://www.youtube.com/watch?v=PsO6ZnUZI0g" },
                { title: "DMX - X Gon’ Give It To Ya", url: "https://www.youtube.com/watch?v=fGx6K90TmCI" },
                { title: "Linkin Park - Bleed It Out", url: "https://www.youtube.com/watch?v=OnuuYcqhzCE" },
            ]
        };

        onMounted(() => {
            songs.value = offlineSongs[mood.value] || offlineSongs['Happy'];
            loading.value = false;
        });

        const openYouTube = (url) => {
            window.open(url, "_blank");
        };

        return { mood, songs, loading, openYouTube };
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

.animate-list-fade-in li {
    animation: slideIn 0.6s ease forwards;
    opacity: 0;
    transform: translateX(20px);
}

@keyframes slideIn {
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes progress {
    from {
        width: 0
    }

    to {
        width: 100%
    }
}
</style>

<!-- <script>
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
</script> -->