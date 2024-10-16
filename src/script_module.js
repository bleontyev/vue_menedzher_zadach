// import { createApp } from 'vue'

let vneshnyaya_peremennaya = "Xxxxxxx";
let parametr_interfejsa_modulya = 0;
// let prop_1 ="Zzzzzzz";

const counter = {
    props: ['title'] ,
    data() {
      return {
        count: 0,
      }
    },
  
    methods: {
      increase() {
        this.count++ ;
      },
      decrease() {
        this.count-- ;
      },
    } ,
    template: `
    <h2>{{ title }}</h2>
    <p>{{ count }} </p>
    <button v-on:click="increase">+</button>
    <button v-on:click="decrease">-</button>  
    `,
  } ;
  
  // Компонент зарегистрирован локально, только внутри данного экземпляра класса Vue.
//   const app = Vue.createApp({
//     components: {
//       "my-counter": counter,
//     } ,
//   }) ;
//   app.mount('#app') ;
  
  