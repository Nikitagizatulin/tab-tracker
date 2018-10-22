<template>
    <div class="wrapper" v-if="getPreloader">
        <v-progress-circular
                :size="150"
                :width="15"
                color="teal"
                indeterminate
                class="preloader"
        />
    </div>
</template>
<script>
import {createNamespacedHelpers} from 'vuex'
const { mapGetters } = createNamespacedHelpers('applicationStore')
export default {
  computed: {
    ...mapGetters(['getPreloader'])
  }
}
</script>
<style scoped>
    .wrapper{
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(255,255,255,0.5);
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
