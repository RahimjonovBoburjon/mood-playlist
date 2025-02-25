import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import MoodSelect from '../views/MoodSelect.vue';
import Playlist from '../views/Playlist.vue';
import NotFound from '../views/404.vue';

const allowedMoods = ['Happy', 'Relaxed', 'Sad', 'Focus', 'Party', 'Chill', 'Love', 'Workout'];

const routes = [
    { path: '/', component: Home },
    { path: '/mood', component: MoodSelect },
    { path: '/playlist', component: Playlist },
    { path: '/404', component: NotFound },
    {
        path: "/:pathMatch(.*)*",
        redirect: '/404',
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.path === '/playlist') {
        const mood = to.query.mood;
        if (!mood || !allowedMoods.includes(mood)) {
            next('/404');
            return;
        }
    }
    next();
});

export default router;