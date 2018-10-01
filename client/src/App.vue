<template>
  <div id="app">
    <v-app>
      <page-header/>
      <main>
        <v-container fluid grid-list-md>
          <transition name="slide" mode="out-in">
            <keep-alive include="login,register">
              <router-view/>
            </keep-alive>
          </transition>
        </v-container>
      </main>
    </v-app>

  </div>
</template>

<script>
import PageHeader from '@/components/Header'

export default {
  name: 'App',
  components: {
    PageHeader
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .danger-alert{
    color: red
  }
  .slide-leave-active,.slide-enter-active {
    transition: all .5s;
  }
  .slide-enter
  {
    transform: translateX(-100%);
    opacity: 0;

  }
  .slide-leave-to
  {
    transform: translateX(100%);
    opacity: 0;
  }
</style>
