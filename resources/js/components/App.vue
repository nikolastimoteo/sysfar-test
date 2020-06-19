<template>
  <div>
    <vue-page-transition name="fade">
      <router-view />
      
    </vue-page-transition>
    <notifications group="auth" animation-type="velocity" position="top right"/>
    <notifications group="geral" animation-type="velocity" position="bottom right"/>
  </div>
</template>
