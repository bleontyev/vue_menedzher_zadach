<script>
export default {
  props: {
    todo: Object
  },
  Data(){
    return{ 
    }
},
}
</script>

<template>
<li>id: {{ todo.id }}; userId: {{ todo.userId }}; title: {{ todo.title }}; <input type="checkbox" :checked = "todo.completed" /></li>      
</template>
