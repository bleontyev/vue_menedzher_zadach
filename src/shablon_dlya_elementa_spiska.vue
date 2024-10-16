<script>
export default {
  props: {
    todo: Object
  }
}
</script>

<template>
  <li>id: {{ todo.id }} {{ todo.text.padEnd(50, "*") }}</li>
</template>

<!-- Vegetables****************************************
Cheese********************************************
Whatever else humans are supposed to eat********** -->