# Family Mode Mobile App 🌘
This app, designed for family mode, enables family members to conveniently view each other's sleep data on the Pod, offering insights into the sleep habits of your family members.

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
yarn i
```
4. Install pods:
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

### Notes
- Dialogs are not implemented, but the UI is designed to show the dialog
- There is a Details screen which is implemented for one type of timeseries data, but it can be extended to show other types of data (types of data can be seen in `types/index.ts` -> `DetailsType`)
- Added two tabs on the bottom, but the second tab is not necessary, it was just added to show the UI design and also to test selecting a different family member
- For "tnt" I just counted the total number of tnt's there are, technically it should be extended to show how many were tosses and how many were turns, at this moment there is a Details view that shows at what time the tnt's happened and how many during that time
- No calendar picker - the days were implemented in `src/components/CircularDayScoreSelector` - though it would be better to have a calendar picker
- The timeframe selector on the top (DAYS, WEEKS, MONTHS, YEARS) is not implemented, but the UI is designed to show the selector
- There is definitely a lot of places for improvement, but I tried to keep it focused on the main features laid out on this [figma](https://www.figma.com/file/wDc9mTgq4Px1CKn57mNkrQ/Mobile-Eng-Take-Home?node-id=0%3A1)
___


This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

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
