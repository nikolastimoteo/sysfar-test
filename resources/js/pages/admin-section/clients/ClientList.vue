<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Clientes
        <small>Listagem de todos os clientes</small>
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="#"><i class="fa fa-dashboard"></i> Dashboard</a>
        </li>
        <li class="active">Clientes</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <!-- Default box -->
      <div class="box">
        <div class="box-header with-border">
          <div class="row">
            <div class="col-xs-12 col-sm-3 pull-right" style="margin-bottom: 5px;">
              <div class="box-tools">
                <button type="button" class="btn btn-block btn-success btn-flat" @click="goToCreateClient()" title="Cadastrar Cliente"><i class="fa fa-plus"></i> Cadastrar</button>
              </div>
            </div>
            <div class="col-xs-12 col-sm-9">
              <div class="box-tools">
                <div class="input-group" style="width: 100%;">
                  <input type="text" name="search_query" class="form-control pull-right" v-model="searchQuery" placeholder="Pesquise clientes pelo nome ou data de nascimento...">

                  <div class="input-group-btn">
                    <button type="button" class="btn btn-default btn-flat" @click="searchClient()" title="Pesquisar"><i class="fa fa-search"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive">
          <table class="table table-hover table-bordered">
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Data de Nascimento (Idade)</th>
                <th>Telefone</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="client in paginatedClients.data" :key="client.id">
                <td>{{ client.name }}</td>
                <td>{{ client.email }}</td>
                <td v-if="client.birth_date">{{ client.birth_date | birthDateAndAge }}</td>
                <td v-else>(Não informado)</td>
                <td>{{ client.phone ? client.phone : "(Não informado)" }}</td>
                <td>
                  <div class="btn-group">
                    <button type="button" class="btn btn-primary btn-flat" @click="goToShowClient(client.id)" title="Visualizar Cliente"><i class="fa fa-eye"></i></button>
                    <button type="button" class="btn btn-warning btn-flat" @click="goToEditClient(client.id)" title="Editar Cliente"><i class="fa fa-edit"></i></button>
                    <button type="button" class="btn btn-danger btn-flat" @click="showDeleteConfirmationModal(client)" title="Excluir Cliente"><i class="fa fa-trash"></i></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- /.box-body -->
        <div class="box-footer">
          <pagination :data="paginatedClients" @pagination-change-page="loadClients"></pagination>
        </div>
        <!-- /.box-footer-->
      </div>
      <!-- /.box -->
    </section>
    <!-- /.content -->
    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal v-if="isDeleteConfirmationModalVisible" @close="closeDeleteConfirmationModal" @deleteObject="deleteClient">
      <template v-slot:body>
        <p>
          <strong>Nome:</strong> {{ selectedClient.name }}<br>
          <strong>E-mail:</strong> {{ selectedClient.email }}
        </p>
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
      paginatedClients: {},
      selectedClient: {},
      isDeleteConfirmationModalVisible: false,
      searchQuery: ""
    }
  },
  methods: {
    loadClients(page = 1) {
      if (!this.searchQuery) {
        clientService.list(page)
          .then(resp => {
            this.paginatedClients = resp.data.paginated_clients;
          });
      } else {
        clientService.search(this.searchQuery, page)
          .then((resp) => {
            this.paginatedClients = resp.data.paginated_clients;
          });
      }
    },
    goToCreateClient() {
      this.$router.push({ name: 'client-create' });
    },
    goToShowClient(id) {
      this.$router.push({ name: 'client-show', params: { id: id } });
    },
    goToEditClient(id) {
      this.$router.push({ name: 'client-edit', params: { id: id } });
    },
    showDeleteConfirmationModal(client) {
      this.selectedClient = client;
      this.isDeleteConfirmationModalVisible = true;
    },
    closeDeleteConfirmationModal() {
      this.selectedClient = {};
      this.isDeleteConfirmationModalVisible = false;
    },
    deleteClient() {
      clientService.destroy(this.selectedClient.id)
        .then(() => {
          this.closeDeleteConfirmationModal();
          this.loadClients();
        });
    },
    searchClient() {
      this.loadClients();
    }
  },
  mounted() {
    this.loadClients();
  }
};
</script>