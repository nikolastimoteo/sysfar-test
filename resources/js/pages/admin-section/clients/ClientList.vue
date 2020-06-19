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
          <div class="box-tools">
            <button type="button" class="btn btn-block btn-success btn-flat" @click="goToCreateClient()" title="Cadastrar Usuário"><i class="fa fa-plus"></i> Cadastrar</button>
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
                    <button type="button" class="btn btn-warning btn-flat" title="Editar Cliente"><i class="fa fa-edit"></i></button>
                    <button type="button" class="btn btn-danger btn-flat" title="Excluir Cliente"><i class="fa fa-trash"></i></button>
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
  </div>
  <!-- /.content-wrapper -->
</template>

<script>
import clientService from "../../../services/client.service";

export default {
  data() {
    return {
      paginatedClients: {},
    }
  },
  methods: {
    loadClients(page = 1) {
      clientService.list(page)
        .then(resp => {
          this.paginatedClients = resp.data.paginated_clients;
        });
    },
    goToCreateClient() {
      this.$router.push({ name: 'client-create' });
    },
    goToShowClient(id) {
      this.$router.push({ name: 'client-show', params: { id: id } });
    }
  },
  created() {
    this.loadClients();
  }
};
</script>