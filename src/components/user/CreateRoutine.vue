<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title>루틴 등록</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="createRoutine">
              <v-select v-model="routineType" :items="['2', '3']" label="운동 분할법 타입을 등록하세요"></v-select>
              
              <v-row v-if="dayOneItems.length > 0">
                <v-col cols="12">
                  <strong>첫째날 루틴:</strong>
                  {{ getFormattedItems(dayOneItems) }}
                </v-col>
              </v-row>
              <v-select v-model="dayOneItems" :items="['등', '어깨', '가슴', '이두', '삼두', '전완근', '복근', '하체']" label="항목" multiple></v-select>
              
              <v-row v-if="dayTwoItems.length > 0">
                <v-col cols="12">
                  <strong>둘째날 루틴:</strong>
                  {{ getFormattedItems(dayTwoItems) }}
                </v-col>
              </v-row>
              <v-select v-model="dayTwoItems" :items="['등', '어깨', '가슴', '이두', '삼두', '전완근', '복근', '하체']" label="항목" multiple></v-select>
              
              <v-row v-if="routineType !== '2' && dayThreeItems.length > 0">
                <v-col cols="12">
                  <strong>셋째날 루틴:</strong>
                  {{ getFormattedItems(dayThreeItems) }}
                </v-col>
              </v-row>
              <v-select v-if="routineType !== '2'" v-model="dayThreeItems" :items="['등', '어깨', '가슴', '이두', '삼두', '전완근', '복근', '하체']" label="항목" multiple></v-select>
              
              <v-btn color="primary" :disabled="!isAvailable" type="submit">루틴 등록</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import axios from "axios";

export default {
    name:'CreateRoutine',

  data() {
    return {
      routineType: "",
      dayOneItems: [],
      dayTwoItems: [],
      dayThreeItems: [],
      isAvailable: false
    };
  },
  watch: {
    dayOneItems: {
      handler() {
        this.updateAvailability();
      },
      deep: true
    },
    dayTwoItems: {
      handler() {
        this.updateAvailability();
      },
      deep: true
    },
    dayThreeItems: {
      handler() {
        this.updateAvailability();
      },
      deep: true
    }
  },
  methods: {
    getFormattedItems(items) {
      return items.join('');
    },
    updateAvailability() {
      if (this.routineType === "2") {
        this.isAvailable = this.dayOneItems.length > 0 && this.dayTwoItems.length > 0;
      } else if (this.routineType === "3") {
        this.isAvailable =
          this.dayOneItems.length > 0 &&
          this.dayTwoItems.length > 0 &&
          this.dayThreeItems.length > 0;
      } else {
        this.isAvailable = false;
      }
    },
    createRoutine(){
      const formData = new FormData();
      let myId = localStorage.getItem("myId")
      formData.append('myId', myId);
      formData.append('routineType', this.routineType);
      formData.append('dayOne', this.dayOneItems);
      formData.append('dayTwo', this.dayTwoItems);
      

      if (this.routineType !== '2') {
        formData.append('dayThree', this.dayThreeItems);
        formData.append('dayFour', '휴식');
      } else {
        formData.append('dayThree', '휴식');
        formData.append('dayFour', '여긴몰루');
      }
 

      axios
        .post("http://localhost:9999/api-routine/routine", formData, 
          { headers: {
            "Content-Type": "multipart/form-data",
          },
          }).then((response) => {
            console.log(response);
            console.log(response.data);
          if (response.data === 'Insert Complete!') {
            alert("나의 루틴 등록이 완료되었습니다")
            this.moveList();
          } else {
            alert(response.data);
          }
        });
    },
    moveList() {
      this.$router.push("/");
    },
  }
};
</script>

<style scoped>
.v-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.password-match-text {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.error-text {
  color: red;
}

.success-text {
  color: green;
}
</style>
