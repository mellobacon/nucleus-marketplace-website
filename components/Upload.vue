<template>
    <PrimeFileUpload :show-cancel-button="false" name="upload" :accept="accept" :pt="{
        root: {class: 'upload-container'},
        buttonbar: {class: 'top'},
        chooseButton: {class: 'button'},
        uploadButton: {class: 'button'},
        actions: {class: 'remove-file'},
        removeButton: {class: 'remove-file'},
        thumbnail: {class: 'thumbnail'}
    }">
        <template #empty>
            <p>Drag and drop files here or choose files to upload</p>
        </template>
    </PrimeFileUpload>
</template>

<script setup lang="ts">
defineProps({
    accept: {type: String, default: ".zip"},
})
</script>

<style lang="scss">
    @use "../assets/styles" as style;
    .upload-container {
        width: 100%;
        .top {
            background-color: transparent;
            .button, button {
                background-color: style.$primary;
                border: none;
            }
        }
        .remove-file button {
            border-radius: 0px;
            border: none;
            background-color: transparent;
        }
        .thumbnail {
            content: url("/favicon.ico");
        }
    }
</style>