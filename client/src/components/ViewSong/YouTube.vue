<template>
    <panel title="YouTube Video">
        <youtube
                :video-id="youtubeId"
                :player-width="'100%'"
                :player-height="310"></youtube>
    </panel>
</template>
<script>
export default {
  props: ['youtubeId']
}
</script>
<style scoped>

</style>
