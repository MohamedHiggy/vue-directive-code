<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Built-in Directives</h1>
        <p v-text="'some Text'"></p>
        <p v-html="'<strong>some strong text</strong>'"></p>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Custom Directives</h1>
        <p v-highlight:background.delayed="'#ddd'">background from directive</p>
        <p
          v-local-highlight:background.blink="{
            mainColor: 'red',
            secondColor: 'green',
            delay: 1000
          }"
        >
          background from directive
        </p>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Filters & Mixins</h1>
        <hr />
        <button @click="fruits.push('Berries')">Add New Item</button>
        <input v-model="filterText" />
        <ul>
          <li v-for="(fruit, index) in filteredFruits" :key="index">
            {{ fruit }}
          </li>
        </ul>
        <hr />
        <app-list></app-list>
      </div>
    </div>
  </div>
</template>

<script>
import List from "./List";
import { fruitMixin } from "./fruitMixin";
export default {
  mixins: [fruitMixin],
  data() {
    return {
      text: "Hello there!"
    };
  },
  components: {
    appList: List
  },
  directives: {
    "local-highlight": {
      // eslint-disable-next-line no-unused-vars
      bind(el, binding, vnode) {
        //el.style.backgroundColor = "#dddddd";
        //el.style.backgroundColor = binding.value;
        var delay = 0;
        if (binding.modifiers["delayed"]) {
          delay = 3000;
        }
        if (binding.modifiers["blink"]) {
          let mainColor = binding.value.mainColor;
          let secondColor = binding.value.secondColor;
          let currentColor = mainColor;
          setTimeout(() => {
            setInterval(() => {
              currentColor == secondColor
                ? (currentColor = mainColor)
                : (currentColor = secondColor);
              if (binding.arg == "background") {
                el.style.backgroundColor = currentColor;
              } else {
                el.style.color = currentColor;
              }
            }, binding.value.delay);
          }, delay);
        } else {
          setTimeout(() => {
            if (binding.arg == "background") {
              el.style.backgroundColor = binding.value.mainColor;
            } else {
              el.style.color = binding.value.mainColor;
            }
          }, delay);
        }
      }
    }
  }
};
</script>

<style lang="scss"></style>
