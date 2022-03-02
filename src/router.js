import { createWebHashHistory, createRouter } from 'vue-router';
import FilterChoice from './components/FilterChoice.vue';
import ContainerView from './components/ContainerView.vue';
import UploadWrite from './components/UploadWrite.vue';
import LoginView from './components/LoginView.vue';
import MyPage from './components/MyPage.vue';
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
  {
    path: '/login',
    component: LoginView,
  },
  {
    path: '/mypage',
    component: MyPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
