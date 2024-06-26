# Family Mode Mobile App 🌘
This app, designed for family mode, enables family members to conveniently view each other's sleep data on the Pod, offering insights into the sleep habits of your family members.

## Table of Contents
- [Family Mode Mobile App 🌘](#family-mode-mobile-app-)
  - [Table of Contents](#table-of-contents)
  - [Screenshot](#screenshot)
  - [How To Run](#how-to-run)
    - [Assumptions Made](#assumptions-made)
    - [Notes](#notes)
    - [Troubleshooting](#troubleshooting)

## Screenshot
<img width="394" alt="1" src="https://github.com/nayemalam/family_mode_sleep_data/assets/25883629/0bf6d57d-c1fe-4fd7-90a6-70b01914113c">

<details>
  <summary>More screenshots</summary>
<img width="1001" alt="2" src="https://github.com/nayemalam/family_mode_sleep_data/assets/25883629/1eae7ca9-1cb3-4aa0-842d-babc79ebc74f">
<img width="390" alt="3" src="https://github.com/nayemalam/family_mode_sleep_data/assets/25883629/24d261cd-b1c6-466b-a26a-5f1c16a55db0">
<img width="997" alt="4" src="https://github.com/nayemalam/family_mode_sleep_data/assets/25883629/e6aea2de-3bb7-4425-9374-6002341b6291">
<img width="994" alt="5" src="https://github.com/nayemalam/family_mode_sleep_data/assets/25883629/474cf020-32cd-491e-8cfa-debca8920749">
<img width="1003" alt="6" src="https://github.com/nayemalam/family_mode_sleep_data/assets/25883629/906dce4b-e010-469b-a411-e9b5dac94184">
<img width="1009" alt="7" src="https://github.com/nayemalam/family_mode_sleep_data/assets/25883629/e39587fd-6ce1-4416-9372-81fc8ccd6df1">
<img width="995" alt="8" src="https://github.com/nayemalam/family_mode_sleep_data/assets/25883629/04069939-74ff-4d53-b589-1ba5a49c41c5">
<img width="988" alt="9" src="https://github.com/nayemalam/family_mode_sleep_data/assets/25883629/836e2235-ed0a-4e5a-abb8-55b0aa13256b">
<img width="392" alt="10" src="https://github.com/nayemalam/family_mode_sleep_data/assets/25883629/1f956426-ba4e-46a0-b174-8ee5ba9bb0b2">
  <img width="996" alt="11" src="https://github.com/nayemalam/family_mode_sleep_data/assets/25883629/8b3bc140-1b37-4836-89d1-fb5e15755b10">
</details>

## How To Run
To run the application locally: 

1. Clone repo: 
```bash
git clone https://github.com/nayemalam/family_mode_sleep_data.git
```
2. cd into the folder:
```bash
cd family_mode_sleep_data
```
3. Install dependencies:
```bash
yarn # or yarn install
```
4. Install CocoaPods (for ios):
```bash
cd ios && pod install
```
5. Go back to root and run the metro server:
```bash
yarn start
```
6. Run app on ios:
```bash
react-native run-ios
```
or
```bash
yarn ios # this will run iPhone 15 as the simulator specified
```
7. Run app on android:
```bash
yarn android # or react-native run-android
```


### Assumptions Made
- based on the annotated example [here](https://gist.github.com/maghis/8c35fe1bb5c7810bdcc6ca389c6cd702), ignored heating
- there could be multiple intervals of sleep data for a single day, so the data is grouped by date (`screens/Profile` -> `groupedDaysByTsMap`)
- Assumed 8 hours as deep sleep and 6 hours as light sleep (`src/components/TimeSlept`)
- Created 3 fictitious family members locally all having an `id` attached to them (this is the challengeId), can be seen in `src/services/FamilyService.ts`

### Notes
- Dialogs are not implemented, but the UI is designed to show the dialog
- There is a Details screen which is implemented for one type of timeseries data, but it can be extended to show other types of data (types of data can be seen in `types/index.ts` -> `DetailsType`)
- Added two tabs on the bottom, but the second tab is not necessary, it was just added to show the UI design and also to test selecting a different family member
- For "tnt" I just counted the total number of tnt's there are, technically it should be extended to show how many were tosses and how many were turns, at this moment there is a Details view that shows at what time the tnt's happened and how many during that time
- Instead of adding a percentage of sleep fitness, I opted to create a sleep fitness status (`src/utils/index.ts` -> `sleepScoreLabel`), where 0-60 is "Poor", 61-80 is "Fair", 81-90 is "Good" and 91-100 is "Excellent" - I feel that this might provide the user better understanding and feedback
- No calendar picker - the days were implemented in `src/components/CircularDayScoreSelector` - though it would be better to have a calendar picker
- The timeframe selector (`src/components/TimeframeSelector`) on the top (DAYS, WEEKS, MONTHS, YEARS) is not implemented, but the UI is designed to show the selector
- There is definitely a lot of places for improvement, but I tried to keep it focused on the main features laid out on this [figma](https://www.figma.com/file/wDc9mTgq4Px1CKn57mNkrQ/Mobile-Eng-Take-Home?node-id=0%3A1)
- It will always show the current day's data and also handle when there is no data
- Built with the latest version of React Native (0.73.4) as of today's date (Feb 28, 2024)

### Troubleshooting
Sometimes 
```bash
yarn start --reset-cache
```
is needed to clear the cache and then run `yarn ios` or `yarn android` again

- if android simulator fails to boot up and it gives this error: "INSUFFICIENT STORAGE", then you can try the following:
  - open Android Studio
  - Under "More Actions" dropdown, click "AVD Manager"
  - Select your device (in my case it was "Pixel 3a API 31 arm64-v8a")
  - There is a dropdown on the right, click it and select "Edit"
  - Select "Show Advanced Settings", scroll down and adjust the "Memory and Storage" -> "RAM" to "2048" or back to "1024" and then click "Finish"
  - restart the simulator
- If above doesn't work, you can click the dropdown on the right and select "Wipe Data" or "Cool Boot Now" and then restart the simulator

- if ios simulator causes any issues, you can try the following:
   - General -> Storage Settings -> Developer -> Delete Cache

If all else doesn't work, I am more than happy to screen share/record the application and flow for both ios and android simulators.
___


This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started (React Native Generated README)

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
