<template>
  <div>
    여기에 유저정보를 가져와보자
    <div v-if="users.length">
      <table id="user-list">
        <colgroup>
          <col style="width: 5%" />
          <col style="width: 20%" />
          <col style="width: 40%" />
          <col style="width: 20%" />
          <col style="width: 15%" />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>아이디</th>
            <th>유저네임</th>
            <th>성별</th>
            <th>나이</th>
          </tr>
        </thead>
        <tbody>
          <list-row
            v-for="(user, index) in users"
            :key="index"
            :userNo="user.userNo"
            :userId="user.userId"
            :userName="user.userName"
            :gender="user.gender"
            :age="user.age"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ListRow from "@/components/user/include/ListRow.vue";

export default {
name: "usersview",
components: {
    ListRow
  },
data() {
    return {
      users: []
    };
  },
created(){
    let mytoken = localStorage.getItem("access-token")

    axios({
      headers: {"access-token":mytoken},
      method:'get',
      url:`http://localhost:9999/api-user/users`,
      responseType:'json'
    }).then((response) => {
          console.log(response.data);
          this.users = response.data;
        })
    },
}
</script>

<style>
#user-list {
  border-collapse: collapse;
  width: 100%;
}

#user-list thead {
  background-color: #ccc;
  font-weight: bold;
}

#user-list td,
#user-list th {
  text-align: center;
  border-bottom: 1px solid #ddd;
  height: 50px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>