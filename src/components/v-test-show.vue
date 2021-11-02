<template>
<div   v-if="isTestingVisible"
       class="v-test-"> 
<div   class="v-test-show"
           v-for="test in filteredTests"
           :key="test.number"
           :test="test"
           
            >

      <v-popup
          v-if="isPopupVisible"
          rightBtnTitle="ЗАНОВО"
          :popupTitle="title"
          @closePopup="closePopup"
          @rightBtnAction="restart"
      >
      
        <p><strong >Количество правильных ответов из {{totalOfTest+1}}:{{totalOfEstimate}}</strong></p>

      </v-popup>
      
        <h2 class="title"><strong >{{title}}</strong></h2>
        <img class=img_test :src="require('../assets/testImages/' + filteredTests[count].image)" > 
        <p><strong >Вопрос : {{filteredTests[count].question}} </strong></p>
        
        <select class="selection" 
                v-model="selected_answer"
                @change="estimateOfTest()" >
            <option disabled value="">Выбрать один ответ</option>
            <option>{{filteredTests[count].answer_1}}</option>
            <option>{{filteredTests[count].answer_2}}</option>
            <option>{{filteredTests[count].answer_3}}</option>
            <option>{{filteredTests[count].answer_4}}</option>
          </select>

      
    </div>

</div>
  <div v-if="!isTestingVisible"
       class="v-test-show">
          <img class=img_test :src="require('../assets/testImages/' + filteredTests[10].image)" > 
          <p><strong >Итог : {{totalOfEstimate}} правильных ответов </strong></p>
  </div>  
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import vPopup from './v-popup'
export default {
    name: 'v-test-show',
    components: {
      vPopup
    },
    data() {
      return {
        title: 'Test of skills JAVASCRIPT',
       
        selected_answer: {type: String,
        default: ''} ,
        count:0,
        totalOfTest:9,
        totalOfEstimate:0,
        sortedTests: [],
        isPopupVisible:false,
        isTestingVisible:true
       
        } 
       },
   
    computed: {
      ...mapGetters([
        'TESTS',
        'IS_MOBILE',
        'IS_DESKTOP'
        
      ]),
      filteredTests() {
        
        
        if (this.sortedTests.length) {
          return this.sortedTests
        } else {
          return this.TESTS
        }
      },
      
    },
    methods:{
      ...mapActions([
        'GET_TESTS_FROM_API'
        
      ]),
       estimateOfTest() {
        
        if(this.selected_answer==this.TESTS[this.count].good_answer) {
          this.totalOfEstimate++; 
        }
        if (this.count<this.totalOfTest){
          this.count++;
          return
        } else{
          this.isPopupVisible=true;
          return
        }
      },
    
      closePopup() {
        this.isPopupVisible = false;
        this.isTestingVisible=false; 
        this.count=0;
        this.selected_answer="";
      },
      restart(){
        this.isPopupVisible = false;
        this.count=0;
        this.totalOfEstimate=0;
        this.selected_answer="";
      }
    },
    
     mounted() {
      this.GET_TESTS_FROM_API()
      .then((response) => {
          if (response.data) {
            console.log('Ok')
          }
      })
     
     }
  
}
</script>

<style lang="scss">

  .v-test-show{
    position: absolute;
    top: 20px;
    right: 10px;
    left: 10px;
    justify-content:center;
    
  }
  .title{
      
      background:linear-gradient(to right, #00ff00, #493240);
      color:red;
      padding: 1.0rem ;
      text-align: center;
  }
  .img_test{
    width:400px;
    height:auto;
    padding:1rem 0;
   
    justify-content:center;
    
  }
  .selection{
    background: #ffffff;
    margin: 10px;
    border-color: #e7e7e7;
    padding: 10px;
    height: 50px;
    width: 500px;
    border: 50px;
   .img_itog{
    position: absolute;
    top: 2px;
    right: 10px;
    left: 10px;
    justify-content: center;
  }  
  }
  </style>