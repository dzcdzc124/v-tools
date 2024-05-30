<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Nav from './components/nav.vue'
import SideBar from './components/sidebar.vue'

import './assets/vendors/js/vendor.bundle.base.js'

import './assets/vendors/chart.js/chart.umd.js'
import './assets/vendors/datatables.net/jquery.dataTables.js'
import './assets/vendors/datatables.net-bs4/dataTables.bootstrap4.js'
//import './assets/js/off-canvas.js'
import './assets/js/hoverable-collapse.js'
import './assets/js/template.js'
import './assets/js/settings.js'
import './assets/js/todolist.js'
import './assets/js/dashboard.js'
import './assets/js/proBanner.js'
import './assets/js/jquery.cookie.js'

</script>

<style scoped>
  @import "./src/assets/vendors/mdi/css/materialdesignicons.min.css";
  @import "./src/assets/vendors/css/vendor.bundle.base.css";
  @import "./src/assets/css/style.css";
  @import "./src/assets/vendors/css/vendor.bundle.base.css";
</style>

<template>
  <div class="container-scroller">
    <!-- partial:partials/_navbar.html -->
    <Nav></Nav>
    <!-- partial -->
    <div class="container-fluid page-body-wrapper">      
      <!-- partial:partials/_sidebar.html -->
      <SideBar></SideBar>
      <!-- partial -->
      <div class="main-panel bg-light">
        <RouterView />
        <!-- content-wrapper ends -->
        <!-- partial:partials/_footer.html -->
      </div>
      <!-- main-panel ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
  <!-- container-scroller -->
</template>

