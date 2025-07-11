
    let productos = JSON.parse(localStorage.getItem('productos')) || [];
    let editIndex = null;

    const form = document.getElementById('producto-form');
    const nombreInput = document.getElementById('nombre');
    const precioInput = document.getElementById('precio');
    const cantidadInput = document.getElementById('cantidad');
    const idInput = document.getElementById('producto-id');
    const tableBody = document.querySelector('#productos-table tbody');

    function saveToLocalStorage() {
      localStorage.setItem('productos', JSON.stringify(productos));
    }

    function renderProductos() {
      tableBody.innerHTML = '';
      productos.forEach((producto, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${producto.id}</td>
          <td>${producto.nombre}</td>
          <td>$${parseFloat(producto.precio).toFixed(2)}</td>
          <td>${producto.cantidad}</td>
          <td class="actions">
            <button class="btn btn-edit" onclick="editProducto(${index})">Editar</button>
            <button class="btn btn-delete" onclick="deleteProducto(${index})">Eliminar</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    }

    function resetForm() {
      nombreInput.value = '';
      precioInput.value = '';
      cantidadInput.value = '';
      idInput.value = '';
      editIndex = null;
    }

    function editProducto(index) {
      const producto = productos[index];
      nombreInput.value = producto.nombre;
      precioInput.value = producto.precio;
      cantidadInput.value = producto.cantidad;
      idInput.value = producto.id;
      editIndex = index;
    }

    function deleteProducto(index) {
      if (confirm("¿Estás seguro de eliminar este producto?")) {
        productos.splice(index, 1);
        saveToLocalStorage();
        renderProductos();
      }
    }

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const producto = {
        id: idInput.value || Date.now(),
        nombre: nombreInput.value,
        precio: parseFloat(precioInput.value),
        cantidad: parseInt(cantidadInput.value)
      };

      if (editIndex !== null) {
        productos[editIndex] = producto;
        editIndex = null;
      } else {
        productos.push(producto);
      }

      saveToLocalStorage();
      renderProductos();
      resetForm();
    });

    // Inicializar
    renderProductos();