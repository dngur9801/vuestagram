import { createWebHistory, createRouter } from 'vue-router';
import FilterChoice from './components/FilterChoice.vue';
import ContainerView from './components/ContainerView.vue';
import UploadWrite from './components/UploadWrite.vue';
const routes = [
  {
    path: '/',
    component: ContainerView,
  },
  {
    path: '/filter',
    component: FilterChoice,
  },
  {
    path: '/upload',
    component: UploadWrite,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
