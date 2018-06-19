<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <a href="/" class="navbar-brand">MEVN Stack</a>
        </nav>
        <div class="container">
            <form @submit.prevent="sendShoes">
                <div class="row pt-3">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Nombre producto</label>
                            <input type="text" class="form-control" v-model="shoe.product">
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label>Precio</label>
                            <input type="text" class="form-control" v-model="shoe.price">
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label>Talla producto</label>
                            <select class="form-control" v-model="shoe.size"> 
                                <option value="26">26</option>
                                <option value="28">28</option>
                                <option value="30">30</option>
                                <option value="32">32</option>
                                <option value="34">34</option>
                                <option value="36">36</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label>Color</label>
                            <select class="form-control" v-model="shoe.color"> 
                                <option value="Rojo">Rojo</option>
                                <option value="Negro">Negro</option>
                                <option value="Blanco">Blanco</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label>Stock</label>
                            <input type="text" class="form-control" v-model="shoe.stock">
                        </div>
                    </div>

                    <div class="col-md-12">
                        <template v-if="edit === false">
                            <div class="form-group">
                                <button class="btn btn-primary">Guardar</button>
                            </div>
                        </template>
                        <template v-else>
                            <div class="form-group">
                                <button class="btn btn-success">Guardar cambios</button>
                            </div>
                        </template>
                    </div>
                </div>
            </form>
            <div class="row">
                <div class="col-md-12">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <td>Producto</td>
                                <td>Precio</td>
                                <td>Color</td>
                                <td>Talla</td>
                                <td>Stock</td>
                                <td>Opciones</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="shoe of shoes">
                                <td>{{shoe.product}}</td>
                                <td>{{shoe.price}}</td>
                                <td>{{shoe.color}}</td>
                                <td>{{shoe.size}}</td>
                                <td>{{shoe.stock}}</td>
                                <td>
                                    <button @click="deleteShoe(shoe._id)" class="btn btn-sm btn-danger">Eliminar</button>
                                    <button @click="updatedShoe(shoe._id)" class="btn btn-sm btn-success">Editar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      shoe: {
        product: "",
        price: "",
        color: "",
        stock: "",
        size: ""
      },
      shoes: [],
      edit: false,
      shoeEdit: ""
    };
  },
  created() {
    this.getShoes();
  },
  methods: {
    sendShoes() {
      if (this.edit === false) {
        fetch("/api/shoes", {
          method: "POST",
          body: JSON.stringify(this.shoe),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getShoes();
          });
      } else {
        fetch("/api/shoes/" + this.shoeEdit, {
          method: "PUT",
          body: JSON.stringify(this.shoe),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getShoes();
            this.edit = false;
          });
      }
      this.shoe.product = "";
      this.shoe.description = "";
      this.shoe.price = "";
      this.shoe.color = "";
      this.shoe.stock = "";
      this.shoe.size = "";
    },
    getShoes() {
      fetch("/api/shoes")
        .then(res => res.json())
        .then(data => {
          this.shoes = data;
          console.log(this.shoes);
        });
    },
    deleteShoe(id) {
      fetch("/api/shoes/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          this.getShoes();
        });
    },
    updatedShoe(id) {
      fetch("/api/shoes/" + id)
        .then(res => res.json())
        .then(data => {
          this.shoe = data;
          this.shoeEdit = data._id;
          this.edit = true;
        });
    }
  }
};
</script>

<style scoped>
</style>