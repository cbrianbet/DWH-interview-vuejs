<template>
  <li class="dropdown user user-menu">
    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
      <!-- The user image in the navbar-->
      <img :src="user.avatar" class="user-image" alt="User Image">
      <!-- hidden-xs hides the username on small devices so only the image appears. -->
      <span class="hidden-xs">{{userinfo.firstName}} {{userinfo.lastName}}</span>
    </a>
    <!-- Account Info and Menu -->
    <ul class="dropdown-menu">
      <li class="user-header" style="height:auto;min-height:85px;padding-bottom:15px;">
        <p>
          <span>{{userinfo.firstName}}</span>
        </p>
      </li>
      <li class="user-footer">
        <button  @click.prevent="handleLogout" class="btn btn-default btn-flat btn-block">
          <i class="fa fa-sign-out"></i>
          <span>Logout</span>
        </button>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'UserMenu',
  props: ['user'],
  data () {
    return {
      userinfo: {}
    }
  },
  methods: {
    handleLogout() {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('user')
      this.$router.push('/login')
    }
  },
  mounted() {
    this.userinfo = JSON.parse(window.localStorage.getItem('user'))
  }
}
</script>
