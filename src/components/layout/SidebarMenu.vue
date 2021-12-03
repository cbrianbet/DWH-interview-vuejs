<template>
  <ul class="sidebar-menu">
    <li class="header">TOOLS</li>
    <router-link tag="li" class="pageLink" to="/">
      <a>
        <i class="fa fa-desktop"></i>
        <span class="page">Dashboard</span>
      </a>
    </router-link>
    <router-link v-if="user.accesslevel == 2" tag="li" class="pageLink" to="/patient/add">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">Add Patient</span>
      </a>
    </router-link>
<!--    <router-link tag="li" class="pageLink" to="/push/data">-->
<!--      <a>-->
<!--        <i class="fa fa-tasks"></i>-->
<!--        <span class="page">Push Data</span>-->
<!--      </a>-->
<!--    </router-link>-->
    <router-link tag="li" class="pageLink" to="/data">
      <a>
        <i class="fa fa-folder-o"></i>
        <span class="page">Push History</span>
      </a>
    </router-link>
  </ul>
</template>
<script>
export default {
  name: 'SidebarMenu',
  data () {
    return {
      user: {}
    }
  },
  mounted() {
    this.user = JSON.parse(window.localStorage.getItem('user'))
  }
}
</script>
<style>
/* override default */
.sidebar-menu > li > a {
  padding: 12px 15px 12px 15px;
}

.sidebar-menu li.active > a > .fa-angle-left,
.sidebar-menu li.active > a > .pull-right-container > .fa-angle-left {
  animation-name: rotate;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
}

.treeview-title {
  z-index: 1;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-90deg);
  }
}
</style>
