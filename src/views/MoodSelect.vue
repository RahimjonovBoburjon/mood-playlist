<template>
    <div class="flex flex-col items-center justify-center h-screen bg-gradient-animate">
        <h2 class="text-3xl font-bold mb-6 text-white animate-text-fade-in text-center mx-2">How are you feeling today?</h2>
        <div class="grid grid-cols-2 gap-4">
            <button v-for="mood in moods" :key="mood"
                class="px-6 py-4 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-button-fade-in"
                @click="selectMood(mood)">
                {{ mood }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            moods: ['Happy', 'Relaxed', 'Sad', 'Focus', 'Party', 'Chill', 'Love', 'Workout'],
        };
    },
    methods: {
        selectMood(mood) {
            this.$router.push(`/playlist?mood=${mood}`);
        },
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
    animation-fill-mode: backwards;
}

.animate-button-fade-in:nth-child(1) {
    animation-delay: 0.2s;
}

.animate-button-fade-in:nth-child(2) {
    animation-delay: 0.4s;
}

.animate-button-fade-in:nth-child(3) {
    animation-delay: 0.6s;
}

.animate-button-fade-in:nth-child(4) {
    animation-delay: 0.8s;
}

.animate-button-fade-in:nth-child(5) {
    animation-delay: 1s;
}


.animate-button-fade-in:nth-child(6) {
    animation-delay: 1.2s;
}

.animate-button-fade-in:nth-child(7) {
    animation-delay: 1.4s;
}

.animate-button-fade-in:nth-child(8) {
    animation-delay: 1.6s;
}

</style>