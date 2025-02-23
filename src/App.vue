<template>
  <router-view />

  <footer
    class="bg-gradient-to-br from-blue-800 to-purple-700 text-white text-lg py-4 fixed bottom-0 left-0 right-0 shadow-lg rounded-t-lg backdrop-blur-md bg-opacity-90 animate-fade-in border-t border-x border-blue-500">
    <p class="font-semibold text-center">
      Powered by
      <span class="text-yellow-300 hover:text-yellow-400 transition-colors duration-300">
        <a href="https://github.com/RahimjonovBoburjon" target="_blank" rel="noopener noreferrer">Bobur</a>
      </span>
    </p>
  </footer>
</template>

<script>
export default {

}
</script>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
</style>