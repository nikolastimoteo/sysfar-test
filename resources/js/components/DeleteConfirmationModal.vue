<template>
  <div class="modal modal-danger fade" id="delete-confirmation-modal" style="display: none;">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Fechar" @click="close">
            <span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title">Confirmar Exclusão</h4>
        </div>
        <div class="modal-body">
          <slot name="body">

          </slot>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline pull-left" data-dismiss="modal" title="Cancelar" @click="close">Cancelar</button>
          <button type="button" class="btn btn-outline" @click="deleteObject" title="Confirmar">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit("close");
    },
    deleteObject() {
      this.$emit("deleteObject");
    }
  },
  mounted() {
    // show modal
    $("#delete-confirmation-modal").modal({ backdrop: false, keyboard: false }, "show");
  },
  beforeDestroy() {
    // hide modal
    $("#delete-confirmation-modal").modal("hide");
  }
};
</script>

<style scoped>
p {
  font-size: 16px;
}
</style>