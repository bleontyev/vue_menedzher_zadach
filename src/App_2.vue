<!--
Этот компонент для овощей.
-->

<script>
import shablon_dlya_elementa_spiska from './shablon_dlya_elementa_spiska.vue'

export default {
  components: {
    shablon_dlya_elementa_spiska,
  },
  data() {
    return {
      groceryList: [
        { id: 0, text: 'Vegetables' },
        { id: 1, text: 'Cheese' },
        { id: 2, text: 'Whatever else humans are supposed to eat' }
      ]
    }
  }
}
</script>

<template>

<div style="width: 300px;">
  <p>Список из примера.</p>
  <!-- <div id="app">Первый</div> -->
  <!-- <br> -->
  <ul>
    <shablon_dlya_elementa_spiska 
    v-for="item in groceryList" :todo="item" :key="item.id" 
    >
    </shablon_dlya_elementa_spiska>
  </ul>
</div>

</template>