<script setup lang="ts">
import { App } from "@capacitor/app";
import { LocalNotifications } from "@capacitor/local-notifications";
import { onMounted, onBeforeUnmount } from "vue";
import { BackgroundMode } from "@anuradev/capacitor-background-mode";

onMounted(() => {
	App.addListener("appStateChange", async (state) => {
		// App in background
		if (!state.isActive) {
			// i want to enable background mode here
			await BackgroundMode.setSettings({
				channelName: "channelName",
				bigText: true,
				channelDescription: "channelDescription",
				closeTitle: "close",
				text: "text",
				subText: "subText",
				title: "title",
				visibility: "public",
			});

			await BackgroundMode.enable();
		} else {
			// App in foreground

			await BackgroundMode.requestNotificationsPermission();
		}
	});

	BackgroundMode.addListener("appInBackground", () => {
		// i want to run this task every 3 minutes
		setInterval(
			async () => {
				const battery = await BackgroundMode.checkBatteryOptimizations();
				const ForegroundPermission =
					await BackgroundMode.checkForegroundPermission();
				const noti = await BackgroundMode.checkNotificationsPermission();
				const isActive = await BackgroundMode.isActive();
				const isEnabled = await BackgroundMode.isEnabled();
				const data = `checkBatteryOptimizations : ${battery.disabled} ,checkForegroundPermission:${ForegroundPermission.display} , isActive:${isActive.activated}, isEnabled:${isEnabled.enabled}`;
				LocalNotifications.schedule({
					notifications: [
						{ id: 2, title: "exit222", body: data, largeBody: data },
					],
				});
			},
			1000 * 60 * 3,
		);
	});
});

//- normal notification
function fireNormalNotification() {
	LocalNotifications.schedule({
		notifications: [{ id: 1, title: "normal", body: "normal" }],
	});
}
</script>

<template>
  hiiiiiiiiiii
  <br>
  <button @click="fireNormalNotification">Fire Normal Notification</button>

</template>

<style scoped></style>async
