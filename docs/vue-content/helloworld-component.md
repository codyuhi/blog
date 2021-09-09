# Vue Components - A HelloWorld Component Case Study

## Intro

Vue allows you to break webpages down into components to more easily organize how the webpage is built.  In the previous tutorial, we created a default Vue application that came with some default components.  In this post, we will discuss how a default component is accessed in that app.

## How the Component is Accessed in App.vue

App.vue (at `app/src/App.vue` in your default Vue app that you created last time) is one of the top-level files in your Vue app.  In this file, you can define what content will appear on your app.

Before a component can be accessed in App.vue, you need to import the component from the file where you define it.  On line 7 of App.vue, you will see this code:

```
import HelloWorld from './components/HelloWorld.vue'
```

This line grabs the component definition from the file, `HelloWorld.vue` and makes the component available for use in the `<script>` tags.

Once you've imported a component from its external definition file, you need to make it available to the `<template>` tags by exporting it.  In lines 11-12, you see this code:

```
  components: {
    HelloWorld
  }
```

These lines make the `HelloWorld` component available within the `<template>` tags so you can display the component on the application in the browser.

Within the `<template>` tags on line 3, you see this code:

```
  <HelloWorld msg="Welcome to Your Vue.js App"/>
```

This code is essentially a self-closing tag that is defined in the `HelloWorld.vue` file.  We pass in the attribute `msg` with the value `Welcome to Your Vue.js App` and that is used by the `HelloWorld` component to determine what is rendered in the browser.

The combination of these code snippets make the HelloWorld component appear in the Vue app.  This means if we want to create our own custom Vue component, we can use the HelloWorld component as an example of what we need to do.

## Outtro

Thanks for joining this walkthrough of a Vue component!  Follow for more info about creating your own Vue components.