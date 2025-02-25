<template>
    <div
        class="flex flex-col items-center justify-center h-screen bg-gradient-animate text-white text-center px-4">
        <h1 class="text-9xl font-extrabold text-white animate-bounce">404</h1>
        <p class="text-2xl mt-4 font-semibold">Oops! Page not found.</p>
        <p class="mt-2 text-gray-300">The page you're looking for doesn't exist or has been moved.</p>
        <router-link to="/"
            class="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300">
            Go Back Home
        </router-link>
    </div>
</template>

<style scoped>
.bg-gradient-animate {
    background: linear-gradient(270deg, #4f46e5, #9333ea, #4f46e5);
    background-size: 200% 200%;
    animation: gradientShift 10s ease infinite;
}
</style>