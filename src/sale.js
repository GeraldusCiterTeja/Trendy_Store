document.addEventListener("alpine:init", () => {
    Alpine.data("productsSale", () => ({
      items: [
        {
          id: 18,
          name: "Kemeja",
          img: "18.jpg",
          priceOld: 150000,
          price: 75000,
          info: "limited edition only 50pcs",
        },
        {
          id: 19,
          name: "Kemeja",
          img: "19.jpg",
          priceOld: 150000,
          price: 75000,
          info: "limited edition only 50pcs",
        },
        {
          id: 20,
          name: "Baju kaos",
          img: "20.jpg",
          priceOld: 150000,
          price: 75000,
          info: "limited edition only 50pcs",
        },
        {
          id: 21,
          name: "Baju kaos",
          img: "21.jpg",
          priceOld: 150000,
          price: 75000,
          info: "limited edition only 50pcs",
        },
        {
          id: 22,
          name: "Baju kaos",
          img: "22.jpg",
          priceOld: 150000,
          price: 75000,
          info: "limited edition only 50pcs",
        },
        {
          id: 23,
          name: "Baju kaos",
          img: "23.jpg",
          priceOld: 150000,
          price: 75000,
          info: "limited edition only 50pcs",
        },
         {
          id: 24,
          name: "Baju kaos",
          img: "24.jpg",
          priceOld: 150000,
          price: 75000,
          info: "limited edition only 50pcs",
        },
        {
          id: 25,
          name: "Baju wanita",
          img: "25.jpg",
          priceOld: 150000,
          price: 75000,
          info: "limited edition only 50pcs",
        },
        {
          id: 26,
          name: "Baju wanita",
          img: "26.jpg",
          priceOld: 150000,
          price: 75000,
          info: "limited edition only 50pcs",
        },
      ],
      searchQuery: "",
      get filteredItems() {
        return this.items.filter(item => 
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    }));
  
    Alpine.store("cart", {
      items: [],
      total: 0,
      quantity: 0,
      add(newItem) {
        // Cek apakah ada barang di cart
        const cartItem = this.items.find((item) => item.id === newItem.id);
  
        // Jika belum ada 
        if (!cartItem) {
          this.items.push({ ...newItem, quantity: 1, total: newItem.price });
          this.quantity++;
          this.total += newItem.price;
        } else {
          // }Jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada  di cart
          this.items = this.items.map((item) => {
            // Jika Barang berbeda
            if (item.id !== newItem.id) {
              return item;
            } else {
              // jika barang sudah ada
              item.quantity++;
              item.total = item.price * item.quantity;
              this.quantity++;
              this.total += item.price;
              return item;
            }
          });
        }
      },
  
      remove(id) {
        const cartItem = this.items.find((item) => item.id === id);
        // Jika Item lebih dari 1
        if (cartItem.quantity > 1) {
          // Telusuri 1 1
          this.items = this.items.map((item) => {
            if (item.id !== id) {
              return item;
            } else {
              item.quantity--;
              item.total = item.price * item.quantity;
              this.quantity--;
              this.total -= item.price;
              return item;
            } 
          });
        } else if(cartItem.quantity === 1){
          // Jika barangmya sisa 1
          this.items = this.items.filter((item) => item.id !== id);
          this.quantity --;
          this.total -= cartItem.price;
        }
      },
    });
  });
  
  // form Validation
  const checkoutButton = document.querySelector('.checkout-button');
  checkoutButton.disabled = true;
  
  const form = document.querySelector('#checkoutForm');
  form.addEventListener('keyup', function(){
      for(let i = 0 ; i < form.elements.length; i++){
          if(form.elements[i].value.length !== 0 ){
              checkoutButton.classList.remove('disabled');
              checkoutButton.classList.add('disabled');
          }else{
              return false;
          }
      }
      checkoutButton.disabled = false;
      checkoutButton.classList.remove('disabled');
  })
  
  // // Kirim data ketika tombol button di click
  checkoutButton.addEventListener('click', function(e){
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);
    console.log(objData)
    const message = formatMessage(objData);
    window.open('http://wa.me/6285752735600?text=' + encodeURIComponent(message));
  })
  
  // // Format Pesan Whatsapp
  const formatMessage = (obj) =>{
    return `Data Customer
      Nama: ${obj.name}
      Email: ${obj.email}
      Address: ${obj.address}
      No HP: ${obj.phone}
  Data Pesanan
    ${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`)}
  
  TOTAL: ${rupiah(obj.total)}
  Terima Kasih`;
  }
  
  // Konversi ke rupiah
  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  }