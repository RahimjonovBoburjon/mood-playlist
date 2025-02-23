<template>
    <div class="flex flex-col items-center justify-center h-screen bg-gradient-animate">
        <h1 class="text-white text-4xl md:text-5xl lg:text-6xl font-bold animate-fade-in-down text-center">Mood-Based Playlist</h1>
        <router-link to="/mood"
            class="mt-5 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200 hover:text-purple-600 hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg md:text-xl">
            Get Started
        </router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style>
@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in-down {
    animation: fadeInDown 1s ease-out;
}

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