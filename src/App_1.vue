<!--
Это компонент для списка дел.
-->

<script>
import shablon_dlya_elementa_spiska_1 from './shablon_dlya_elementa_spiska_1.vue'

let peremennaya_app_1_vue = 1234567;
let massiv_vne_export = [1, 2, 3];

export default {
  props: ['prop_1'],
  components: {
    shablon_dlya_elementa_spiska_1,
  },
  data() {
    return {
      massiv_zadach_seansa: [],
      massiv_zadach_seansa_sorted: [],      
      massiv_zadach_seansa_filtered: [],      
      massiv_zadach_istochnik: [],      
      massiv_id_zadach: [],
      massiv_id_zadach_sorted: [],
      massiv_userId: [], 
      massiv_title: [],
      massiv_completed: [],
      
      tek_id_sorted: 0,
      tek_userId_sorted: 0,
      tek_title_sorted: "",      
      tek_completed_sorted: false,      

      tek_id_filtered: 0,
      tek_userId_filtered: 0,
      tek_title_filtered: "",      
      tek_completed_filtered: false,      

      v_sostoyanii_filtratsii: false,

      index_dlya_udaleniya: -1,      
      massiv_zadach_seansa_rab: [],
      massiv_zadach: [],  
      
      dlina_massiva_zadach: 0,
      peremennaya_vnutri: 0,

// Добавляем переменные-маркеры состояния, отслеживающие выполнение блоков кода.
      sost_zadacha_dobavlena: false,
      sost_zadacha_udalena: false,
      sost_zadachi_otsortirovany: false,      
      sost_zadachi_otfiltrovany: false,      
      sost_filtr_snyat: false,      
//  Массив своих опеределенных локально задач.
      massiv_svoikh_zadach: [
          {
            userId: 1,                        
            id: 1, 
            title: "Протестировать подключение к Vue.js через CDN.",
            completed: true,
          },
          {
            userId: 1,                        
            id: 2,            
            title: "Протестировать подключение к Vue.js локально через ./vue/vue.global.js.",
            completed: true,
          },
          {
            userId: 1,                        
            id: 3,            
            title: "Исследовать работу директивы v-model.",
            completed: true,
          },
          {
            userId: 1,                        
            id: 4,            
            title: "Исследовать работу директивы v-if.",
            completed: true,
          },          
        ],
        formulirovka_tekushchej_zadachi: "",                          
          tek_id: 0,
          tek_userId: 0,
          tek_title: "",
          tek_completed: false,
    }
  },
  methods:{
      test(){
        this.list.push(this.name);
      },
      sort(){
         this.list.sort();
        },
    increaseCounter(){
        this.counter++ ;
      },
      decreaseCounter(){
        this.counter-- ;
      },
      dobavit_zadachu(){
        if( this.tek_title.trim() == "") {
          return ;
        }
        // Предействия.
        // Вычислить следующий по порядку id для задачи.
        this.massiv_id_zadach = this.massiv_id_zadach.splice( 0, 0);
        for( let i = 0; i<= this.massiv_zadach_istochnik.length - 1; i++ ) {
          this.massiv_id_zadach[i] = this.massiv_zadach_istochnik[i].id;
        }    
        // console.log( "this.massiv_id_zadach", this.massiv_id_zadach );
          this.massiv_id_zadach_sorted = this.massiv_id_zadach.toSorted( (a, b) => a - b );     
          // console.log( "this.massiv_id_zadach_sorted", this.massiv_id_zadach_sorted );
          // +
          this.dlina_massiva_zadach = this.massiv_id_zadach_sorted.length;
          this.tek_id = this.massiv_id_zadach_sorted[this.dlina_massiva_zadach - 1] + 1;        
          // console.log( "this.tek_id", this.tek_id );          
          // Теперь можно вдвигать добавляемый элемент в массив сеанса и в массив-источник.
          // this.massiv_zadach_seansa.unshift({        
          //   id: this.tek_id,            
          //   userId: 1,        
          //   title: this.tek_title,
          //   completed: true,
          // });
          this.massiv_zadach_istochnik.unshift({        
            id: this.tek_id,            
            userId: 1,        
            title: this.tek_title,
            completed: false,
          });
          // this.massiv_id_zadach.unshift(        
          //   this.tek_id,            
          // );        

        // Последействия.
        this.tek_title = "" ;
        this.tek_id = 0 ;        

        fetch('https://jsonplaceholder.typicode.com/todos', {
          method: 'POST',
          body: JSON.stringify({
          id: this.tek_id,            
          userId: this.tek_userId,        
          title: this.tek_title,
          completed: this.tek_completed,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch( (error) => console.log(error))  
    
    this.massiv_zadach_seansa = this.massiv_zadach_istochnik;
    this.sost_zadacha_dobavlena = true;
    this.sost_zadachi_otsortirovany = false;    
      },
// 
      udalit_zadachu(){
// Преддействия - отсутствуют.
        if( this.tek_id == 0) {
          return ;
        }
// Удаляем задачу из массива текущих задач.
        for( let i = 0; i<= this.massiv_zadach_seansa.length - 1; i++ ) {
          this.massiv_id_zadach[i] = this.massiv_zadach_seansa[i].id;
        }        
        this.index_dlya_udaleniya = this.massiv_id_zadach.indexOf( this.tek_id );

        this.massiv_zadach_seansa.splice( this.index_dlya_udaleniya, 1 ) ;
        this.massiv_id_zadach.splice( this.index_dlya_udaleniya, 1 ) ;        
        this.tek_id = 0;
// Удаляем задачу из массива-источника.
for( let i = 0; i<= this.massiv_zadach_istochnik.length - 1; i++ ) {
          this.massiv_id_zadach[i] = this.massiv_zadach_istochnik[i].id;
        }        
        this.index_dlya_udaleniya = this.massiv_id_zadach.indexOf( this.tek_id );

        this.massiv_zadach_istochnik.splice( this.index_dlya_udaleniya, 1 ) ;
        this.massiv_id_zadach.splice( this.index_dlya_udaleniya, 1 ) ;        
        this.tek_id = 0;
// Удаляем задачу в удаленном Web API сервисе.
        fetch('https://jsonplaceholder.typicode.com/todos/1', {
          method: 'DELETE',
        })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch( (error) => console.log(error));
// Последействия.
    this.sost_zadacha_udalena = true;
    this.sost_zadachi_otsortirovany = false;    
    this.sost_zadachi_otfiltrovany = false;    
      },
// 
    otsortirovat_zadachi(){
      if( !this.sost_zadachi_otsortirovany ){
        // console.log( "otsortirovat_zadachi" );
// Преддествия.
// Очистка массива _sorted.
    this.massiv_zadach_seansa_sorted = this.massiv_zadach_seansa_sorted.splice( 0, 0);
// Из массива задач сеанса создаем отдельные массивы с той же поледовательностью элементов.
      for( let i = 0; i<= this.massiv_zadach_seansa.length - 1; i++ ) {
          this.massiv_id_zadach[i] = this.massiv_zadach_seansa[i].id;
          this.massiv_userId[i] = this.massiv_zadach_seansa[i].userId; 
          this.massiv_title[i] = this.massiv_zadach_seansa[i].title;
          this.massiv_completed[i] = this.massiv_zadach_seansa[i].completed;          
        }      
      // Сортировка массива id задач с сипользованием функции сортировки. Ниже получается восходящий порядок.
      this.massiv_id_zadach_sorted = this.massiv_id_zadach.toSorted( (a, b) => b - a );
      // Для нисходящего порядка ниадо как ниже.
      // this.massiv_id_zadach_sorted = this.massiv_id_zadach.toSorted( (a, b) => b - a );      
      for( let i = 0; i<= this.massiv_id_zadach_sorted.length - 1; i++ ) {
        this.indeks_poiska =  this.massiv_id_zadach_sorted[i];
        this.indeks_v_massive_zadach =  this.massiv_id_zadach.indexOf(this.indeks_poiska);        
// Получаем объект, пригодный для того чтобы вставлять в отсортированный массив.
        this.tek_id_sorted = this.indeks_poiska;
        this.tek_iserId_sorted = this.massiv_userId[this.indeks_v_massive_zadach];
        this.tek_title_sorted = this.massiv_title[this.indeks_v_massive_zadach];
        this.tek_completed_sorted = this.massiv_completed[this.indeks_v_massive_zadach];        
// Вдвигаем объект в массив _sorted. 
        this.massiv_zadach_seansa_sorted.unshift({        
          id: this.tek_id_sorted,            
          userId: this.tek_iserId_sorted,        
          title: this.tek_title_sorted,
          completed: this.tek_completed_sorted,
        });
        }
        // console.log("this.massiv_zadach_seansa_sorted", this.massiv_zadach_seansa_sorted );
// Источниковый массив не изменился, изменился только массив задач сеанса.
        this.massiv_zadach_seansa = this.massiv_zadach_seansa_sorted;
        this.sost_zadachi_otsortirovany = true;
      }
    },
// 
otfiltrovat_zadachi(){
      // console.log( "otfiltrovat_zadachi" );
      this.massiv_zadach_seansa = this.massiv_zadach_istochnik;
      this.massiv_id_zadach = this.massiv_id_zadach.splice( 0, 0 );
      this.massiv_zadach_seansa_filtered = this.massiv_zadach_seansa_filtered.splice( 0, 0 );      

      // console.log( this.massiv_zadach_istochnik );

      for( let i = 0; i<= this.massiv_zadach_istochnik.length - 1; i++ ) {
          this.massiv_id_zadach[i] = this.massiv_zadach_istochnik[i].id;
          this.massiv_userId[i] = this.massiv_zadach_istochnik[i].userId; 
          this.massiv_title[i] = this.massiv_zadach_istochnik[i].title;
          this.massiv_completed[i] = this.massiv_zadach_istochnik[i].completed;          
        }  
        
      for( let i = 0; i<= this.massiv_id_zadach.length - 1; i++ ) {
        this.indeks_poiska =  this.massiv_id_zadach[i];
        if( this.indeks_poiska >= 5 && this.indeks_poiska <= 21 ){
          this.indeks_v_massive_zadach =  this.massiv_id_zadach.indexOf(this.indeks_poiska);        

          this.tek_id_filtered = this.indeks_poiska;
          this.tek_iserId_filtered = this.massiv_userId[this.indeks_v_massive_zadach];
          this.tek_title_filtered = this.massiv_title[this.indeks_v_massive_zadach];
          this.tek_completed_filtered = this.massiv_completed[this.indeks_v_massive_zadach];        

          this.massiv_zadach_seansa_filtered.unshift({        
            id: this.tek_id_filtered,            
            userId: this.tek_iserId_filtered,        
            title: this.tek_title_filtered,
            completed: this.tek_completed_filtered,
            });
        }

      }
        // console.log("this.massiv_zadach_seansa_filtered", this.massiv_zadach_seansa_filtered );
        this.massiv_zadach_seansa = this.massiv_zadach_seansa_filtered;
        this.v_sostoyanii_filtratsii = true;
// Последействия.
        this.sost_zadachi_otfiltrovany = true;
    },    
// 
snyat_filtr(){
  if( this.sost_zadachi_otfiltrovany ){
    // console.log( "snyat_filtr" );
    this.massiv_zadach_seansa = this.massiv_zadach_istochnik;    
  }
    this.sost_zadachi_otfiltrovany = false;
      }
    },  
// 
  mounted() {

    fetch('https://jsonplaceholder.typicode.com/todos/')
      .then(response => response.json())
      .then( (json) => {
        this.massiv_zadach_seansa = json;
        // console.log( "vneshnyaya_peremennaya", vneshnyaya_peremennaya );

        for( let i = 0; i<= this.massiv_zadach_seansa.length - 1; i++ ) {
          this.massiv_id_zadach[i] = this.massiv_zadach_seansa[i].id;
        }
      this.massiv_id_zadach_sorted = this.massiv_id_zadach.toSorted( (a, b) => a - b );
      this.dlina_massiva_zadach = this.massiv_id_zadach_sorted.length;
// 
// * Цикл добавления задач из локального массива.
// 
      this.tek_id = this.massiv_id_zadach_sorted[this.dlina_massiva_zadach - 1] + 1;
      for( let i = 0; i <= this.massiv_svoikh_zadach.length - 1; i++ ){
        this.tek_userId = this.massiv_svoikh_zadach[i].userId;
        this.tek_title = this.massiv_svoikh_zadach[i].title;         
        this.tek_completed = this.massiv_svoikh_zadach[i].completed;

        this.massiv_zadach_seansa.unshift({ id: this.tek_id, userId: this.tek_userId, title: this.tek_title, completed: this.tek_completed });
        this.massiv_id_zadach.unshift( this.tek_id );
        this.tek_id = this.tek_id + 1;
      }
      this.massiv_zadach_istochnik = this.massiv_zadach_seansa;
// *
      this.tek_id = 0;
      this.tek_userId = 0;      
      this.tek_title = "" ;
      this.tek_completed = false;
      })
      .catch( (error) => console.log(error)) ;

      for( let i = 0; i<= this.massiv_zadach_seansa.length - 1; i++ ) {
        massiv_vne_export[i] = this.massiv_zadach_seansa[i];
        }
  },
};
</script>

<template>

<div class="kornevoj-kontejner">
    <div class="blok-del">
    <div>
    <p>Список дел.</p>
    <ul>
      <shablon_dlya_elementa_spiska_1 
        v-for="item in this.massiv_zadach_seansa" :todo="item" :key="item.id" 
      >
      </shablon_dlya_elementa_spiska_1>
    </ul>
    </div>

</div>
<!-- block_del -->

<div class="sticky-forma">
  <br>
  <label for="tek_id">id:</label>
  <input type="number" v-model="tek_id">
  <br>
  <label for="tek_userId">userId:</label>
        <input class="knopka" type="number" v-model="tek_userId">
        <br>
        <label for="tek_title">Имя задачи:</label>        
        <input class="knopka" type="text" v-model="tek_title" style="width: 230px;">
        <br>
        <label for="tek_completed">Завершено:</label>        
        <input class="knopka" type="checkbox" v-model="tek_completed" value="false">        
        <br>
        <button class="knopka" v-on:click="dobavit_zadachu">Добавить задачу</button>
        <br>        
        <button class="knopka" v-on:click="udalit_zadachu">Удалить задачу</button>
        <br>        
        <button class="knopka" v-on:click="otsortirovat_zadachi">Отсортировать задачи в восходящем порядке по id</button>        
        <br>        
        <button class="knopka" v-on:click="otfiltrovat_zadachi">Отфильтровать задачи id >= 5 AND id <= 21 </button>
        <br>        
        <button class="knopka" v-on:click="snyat_filtr">Снять фильтр</button>        
</div>

</div>
<!-- kornevoj-kontejner -->  

</template>