<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Clientes
        <small>Visualização</small>
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="#">
            <i class="fa fa-dashboard"></i> Dashboard
          </a>
        </li>
        <li>
          <router-link :to="{ name: 'client-list' }">Clientes</router-link>
        </li>
        <li class="active">Visualização</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <!-- Default box -->
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">Dados do Cliente</h3>
          <div class="box-tools">
            <button type="button" class="btn btn-flat btn-danger" @click="showDeleteConfirmationModal()" title="Excluir">Excluir</button>
          </div>
        </div>
					<!-- /.box-header -->
					<div class="box-body">
							<div class="form-group">
								<label class="control-label" for="name">Nome Completo</label>
								<input type="text" class="form-control" id="name" v-model="client.name" placeholder="Não informado" disabled />
							</div>
							<div class="form-group">
								<label class="control-label" for="email">E-mail</label>
								<input type="email" class="form-control" id="email" v-model="client.email" placeholder="Não informado" disabled />
							</div>
							<div class="form-group">
								<label class="control-label" for="birth_date">Data de Nascimento</label>
								<input type="text" class="form-control" id="birth_date" v-model="client.birth_date" placeholder="Não informado" disabled />
							</div>
							<div class="form-group">
								<label class="control-label" for="phone">Telefone</label>
								<input type="text" class="form-control" id="phone" v-model="client.phone" placeholder="Não informado" disabled />
							</div>
					</div>
					<!-- /.box-body -->
					<div class="box-footer">
						<button type="button" class="btn btn-flat btn-default" @click="$router.back()" title="Voltar">Voltar</button>
						<button type="submit" class="btn btn-flat btn-warning pull-right" @click="goToEditClient(client.id)" title="Editar">Editar</button>
					</div>
					<!-- /.box-footer-->
      </div>
      <!-- /.box -->
    </section>
    <!-- /.content -->
    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal v-if="isDeleteConfirmationModalVisible" @close="closeDeleteConfirmationModal" @deleteObject="deleteClient">
      <template v-slot:body>
        <p class="text-justify">Deseja confirmar a exclusão deste cliente?</p>
      </template>
    </DeleteConfirmationModal>
    <!-- /Delete Confirmation Modal -->
  </div>
  <!-- /.content-wrapper -->
</template>

<script>
import clientService from "../../../services/client.service";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";

export default {
  components: {
    DeleteConfirmationModal
  },
	data() {
		return {
      client: {},
      isDeleteConfirmationModalVisible: false
		}
	},
	methods: {
		loadClient() {
			clientService.getById(this.$route.params.id)
				.then(resp => {
					this.client = resp.data.client;
					if (this.client.birth_date) {
						this.client.birth_date = this.$options.filters.birthDateAndAge(this.client.birth_date);
					}
				})
				.catch(err => {
          if (err.response && err.response.data.message) {
            this.$notify({
              group: "geral",
              type: "error",
              title: "Erro!",
              text: err.response.data.message,
              duration: 5000,
              speed: 1000
            });
          }
					this.$router.back();
				});
    },
    goToEditClient(id) {
      this.$router.push({ name: 'client-edit', params: { id: id } });
    },
    showDeleteConfirmationModal() {
      this.isDeleteConfirmationModalVisible = true;
    },
    closeDeleteConfirmationModal() {
      this.isDeleteConfirmationModalVisible = false;
    },
    deleteClient() {
      clientService.destroy(this.client.id)
        .then(resp => {
          this.closeDeleteConfirmationModal();
          this.$notify({
            group: "geral",
            type: "success",
            title: "Sucesso!",
            text: resp.data.message,
            duration: 5000,
            speed: 1000
          });
          this.$router.push({ name: 'client-list' });
        })
        .catch(err => {
          if(err.response && err.response.data.message) {
            this.$notify({
              group: "geral",
              type: "error",
              title: "Erro!",
              text: err.response.data.message,
              duration: 5000,
              speed: 1000
            });
          } else {
            this.$notify({
              group: "geral",
              type: "error",
              title: "Erro!",
              text: "Erro ao excluir cliente. Tente novamente!",
              duration: 5000,
              speed: 1000
            });
          }
        });
    }
	},
	created() {
		this.loadClient();
	}
}
</script>