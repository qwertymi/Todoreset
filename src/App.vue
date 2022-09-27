<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" :to="{ name: 'Home' }"
        >My Todo list</RouterLink
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink
              class="nav-link active"
              aria-current="page"
              :to="{ name: 'Home' }"
              >Home</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'Todos' }"
              >Todo list</RouterLink
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="https://github.com/qwertymi/Todorest"
              target="_blank"
              >Github</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <RouterView />
</template>
<script></script>
<style>
#app {
}
</style>
