<template>
    <panel title="Tab">
                <v-textarea readonly
                          v-model="song.tab"></v-textarea>
    </panel>
</template>
<script>
export default {
  props: ['song']
}
</script>
<style>
    textarea{
        width: 100%;
        font-family: monospace;
        border: none;
        height: 600px;
        border-style: none;
        border-color: transparent;
        overflow: auto;
        padding: 20px;
    }
</style>
