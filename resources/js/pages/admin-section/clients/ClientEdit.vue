<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Clientes
        <small>Edição</small>
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
        <li class="active">Edição</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <!-- Default box -->
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">Dados do Cliente</h3>
        </div>
        <!-- /.box-header -->
        <ValidationObserver ref="form" v-slot="{ handleSubmit, invalid }">
          <form autocomplete="off" @submit.prevent="handleSubmit(updateClient)">
            <div class="box-body">
              <div v-if="isPageLoading" class="text-center">
                <div class="spinner"><div></div><div></div><div></div><div></div></div>
              </div>
              <div v-else-if="form.id">
                <ValidationProvider v-slot="{ errors }" vid="name" name="name" rules="required|min:3">
                  <div class="form-group" :class="{ 'has-error': errors[0] }">
                    <label class="control-label" for="name">Nome Completo</label>
                    <input type="text" class="form-control" id="name" v-model="form.name" placeholder="Digite o nome completo do cliente" />
                    <span v-if="errors" class="help-block">
                      {{ errors[0] }}
                    </span>
                  </div>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" vid="email" name="email" rules="required|email">
                  <div class="form-group" :class="{ 'has-error': errors[0] }">
                    <label class="control-label" for="email">E-mail</label>
                    <input type="email" class="form-control" id="email" v-model="form.email" placeholder="Digite o e-mail do cliente" />
                    <span v-if="errors" class="help-block">
                      {{ errors[0] }}
                    </span>
                  </div>
                </ValidationProvider>
                <div class="row">
                  <div class="col-xs-12 col-md-6">
                    <ValidationProvider v-slot="{ errors }" vid="birth_date" name="birth_date" rules="date_format:dd/MM/yyyy">
                      <div class="form-group" :class="{ 'has-error': errors[0] }">
                        <label class="control-label" for="birth_date">Data de Nascimento</label>
                        <input type="tel" class="form-control" id="birth_date" v-mask="'##/##/####'" v-model="form.birth_date" placeholder="Digite a data de nascimento do cliente" />
                        <span v-if="errors" class="help-block">
                          {{ errors[0] }}
                        </span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="col-xs-12 col-md-6">
                    <ValidationProvider v-slot="{ errors }" vid="phone" name="phone" :rules="{ regex: /\+\d{2}\s\(\d{2}\)\s\d{4,5}\-\d{4}/ }">
                      <div class="form-group" :class="{ 'has-error': errors[0] }">
                        <label class="control-label" for="phone">Telefone</label>
                        <input type="tel" class="form-control" id="phone"  v-mask="['+55 (##) ####-####', '+55 (##) #####-####']" v-model="form.phone" placeholder="Digite o telefone do cliente" />
                        <span v-if="errors" class="help-block">
                          {{ errors[0] }}
                        </span>
                      </div>
                    </ValidationProvider>
                  </div>
                </div>
              </div>
            </div>
            <!-- /.box-body -->
            <div class="box-footer">
              <button type="button" class="btn btn-flat btn-danger" @click="$router.back()" title="Cancelar">Cancelar</button>
              <button type="submit" class="btn btn-flat btn-success pull-right" :disabled="invalid || loading" title="Cadastrar">Salvar Alterações</button>
            </div>
            <!-- /.box-footer-->
          </form>
        </ValidationObserver>
        <!-- form -->
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
        form: {
          id: "",
          name: "",
          email: "",
          birth_date: "",
          phone: ""
        },
        loading: false,
        isPageLoading: true
      }
    },
    methods: {
      loadClient() {
        clientService.getById(this.$route.params.id)
          .then(resp => {
            const client = resp.data.client;
            this.form.id = client.id;
            this.form.name = client.name;
            this.form.email = client.email;
            this.form.birth_date = client.birth_date ? this.$options.filters.birthDate(client.birth_date) : "";
            this.form.phone = client.phone;
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
          })
          .finally(() => {
            this.isPageLoading = false;
          });
      },
      updateClient() {
        this.loading = true;

        const { id, name, email, birth_date, phone } = this.form;

        clientService.update(id, name, email, birth_date, phone)
          .then(resp => {
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
            if(err.response && err.response.data.errors) {
              this.$refs.form.setErrors(err.response.data.errors);
            } else {
              this.$notify({
                group: "geral",
                type: "error",
                title: "Erro!",
                text: "Erro ao editar cliente. Tente novamente!",
                duration: 5000,
                speed: 1000
              });
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    mounted() {
      this.loadClient();
    }
};
</script>
