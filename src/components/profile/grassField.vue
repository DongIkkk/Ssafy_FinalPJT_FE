<template>
  <div class="grass-field">
    <div v-for="(week, weekIndex) in recentWeeks" :key="weekIndex" class="grass-week">
      <div v-for="(day, dayIndex) in week" :key="dayIndex" class="grass-day" :class="{ 'colored': !isColored(day) }"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'GrassField',
  data() {
    return {
      grass: ['2023-05-25', '2023-05-24', '2023-05-22', '2023-05-21', '2023-05-18', '2023-05-17', '2023-05-16'],
      columns: 21,
      rows: 7,
    };
  },
  created() {
    // this.fetchGrass();
    
  },
  computed: {
    recentWeeks() {
      console.log(this.grass);
      const today = new Date();

      const weeks = [];

      
        

        for (let row = 0; row < this.rows; row++) {
          const week = [];
          for (let col = -1; col < this.columns; col++) {
          const date = new Date(today);
          const offset = col * this.rows + row;
          date.setDate(today.getDate() - offset);
          week.unshift(date.toISOString().split('T')[0]);
        }

        weeks.unshift(week);
      } 
      console.log(weeks);
      return weeks;
    },
  },
  methods: {
    fetchGrass() {
      let mytoken = localStorage.getItem('access-token');

      axios({
        headers: { 'access-token': mytoken },
        method: 'get',
        url: 'http://localhost:9999/api-grass/grass',
        responseType: 'json',
      }).then((response) => {
        this.grass = response.data.map((item) => item.substring(0, 10)); // 추출된 날짜 부분만 저장
        
      });
    },
    isColored(day) {
      return this.grass.includes(day);
    },
  },
};
</script>



<style>
.grass-field {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.grass-week {
  display: flex;
}

.grass-day {
  width: 12px;
  height: 12px;
  margin: 1px;
  background-color: #ebedf0;
}

.colored {
  background-color: green;
}
</style>
