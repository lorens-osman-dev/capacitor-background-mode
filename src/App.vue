<script setup lang="ts">
import { App } from '@capacitor/app';
import { LocalNotifications } from '@capacitor/local-notifications';
import { BackgroundTask } from '@capawesome/capacitor-background-task';
import { onMounted, onBeforeUnmount } from "vue";

onMounted(() => {

  App.addListener("backButton", async (ev) => {
    LocalNotifications.schedule({ notifications: [{ id: 1, title: "back", body: "back pressd" }] })
  })
  App.addListener("appStateChange", async (state) => {
    if (state.isActive) {
      return
    }
    LocalNotifications.schedule({ notifications: [{ id: 1, title: "exit", body: "exit" }] })
    const taskId = await BackgroundTask.beforeExit(async () => {
      LocalNotifications.schedule({ notifications: [{ id: 2, title: "exit222", body: "exit222" }] })
      // Run your code...
      // Finish the background task as soon as everything is done.
      BackgroundTask.finish({ taskId });
    });
  })
  App.addListener("resume", async () => {

    LocalNotifications.schedule({ notifications: [{ id: 1, title: "resume", body: "resume" }] })
  })

});

onBeforeUnmount(() => {
  App.removeAllListeners()
});


//- normal notification 
function ss() {
  LocalNotifications.schedule({ notifications: [{ id: 1, title: "normal", body: "normal" }] })
}
</script>

<template>
  hiiiiiiiiiii

  <button @click="ss">run</button>

</template>

<style scoped></style>
