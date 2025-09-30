document.querySelectorAll('#menu-toggle').forEach(toggle=>{
  toggle.addEventListener('change', () => {
    document.body.classList.toggle('overflow-hidden', toggle.checked);
  });
});

if (document.title.includes('Ecommerce')) {
  const searchInput = document.querySelector('input[placeholder="Search Products..."]');
  const categoryButtons = document.querySelectorAll('div.flex button');
  const products = document.querySelectorAll('.grid > div.bg-white');

  const filterProducts = () => {
    const text = searchInput.value.toLowerCase();
    products.forEach(prod => {
      const title = prod.querySelector('h2').textContent.toLowerCase();
      prod.style.display = title.includes(text) ? '' : 'none';
    });
  };
  
const cartButtons = document.querySelectorAll("button.bg-green-500");

cartButtons.forEach(button => {
  button.addEventListener("click", () => {
    const productCard = button.closest("div.p-5");
    const name = productCard.querySelector("h2").innerText;
    const price = productCard.querySelector("p.text-blue-600").innerText;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.some(item => item.name === name);

    if (exists) {
      alert(`${name} is already in your cart!`);
    } else {
      cart.push({ name, price });

      localStorage.setItem("cart", JSON.stringify(cart));


    }
  });
});


  searchInput?.addEventListener('input', filterProducts);

  categoryButtons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const cat = btn.textContent.trim().toLowerCase();
      products.forEach(prod=>{
        const title = prod.querySelector('h2').textContent.toLowerCase();
        if(cat==='all') prod.style.display='';
        else prod.style.display = title.includes(cat) ? '' : 'none';
      });
    });
  });

  document.querySelectorAll('button.bg-green-500').forEach(b=>b.addEventListener('click',()=>alert('Added to Cart!')));
  document.querySelectorAll('button.bg-red-500').forEach(b=>b.addEventListener('click',()=>alert('Added to Wishlist!')));
}

if (document.title.toLowerCase().includes('document') || document.title.toLowerCase().includes('login')) {
  const form = document.querySelector('form');
  form?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = form.email.value.trim();
    const pass = form.subject.value.trim();
    if(!email || !pass) return alert('Please fill all fields');
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return alert('Enter a valid email');
    alert('Login Successful (demo)');
  });
}

if (document.title.toLowerCase().includes('wishlist')) {
  document.querySelectorAll('button.bg-red-500').forEach(btn=>{
    btn.addEventListener('click', ()=> {
      btn.closest('article').remove();
    });
  });
  document.querySelectorAll('button.bg-green-500').forEach(btn=>{
    btn.addEventListener('click', ()=> alert('Item added to Cart!'));
  });
}

if (document.title.toLowerCase().includes('dashboard')) {
  document.querySelectorAll('button.bg-red-500').forEach(btn=>{
    btn.addEventListener('click', ()=> {
      btn.closest('tr').remove();
    });
  });
  document.querySelectorAll('button.bg-green-500').forEach(btn=>{
    btn.addEventListener('click', ()=> alert('Edit feature coming soon!'));
  });
}

if (location.pathname.endsWith('about.html')) {
  document.querySelector('a[href="#"]')?.addEventListener('click', e=>{
    e.preventDefault();
    alert('Redirecting to products (demo)');
  });
}

if (location.pathname.endsWith('admin.html')) {
  document.querySelectorAll('.bg-white.shadow-md').forEach(card=>{
    card.addEventListener('click', ()=> alert('Feature under construction'));
  });
}

if (location.pathname.endsWith('cart.html')) {
  const updateTotal = () => {
    let total = 0;
    document.querySelectorAll('tbody tr').forEach(row=>{
      const price = parseFloat(row.children[2].textContent.replace('$',''));
      const qty = parseInt(row.querySelector('span').textContent);
      row.children[4].textContent = `$${(price*qty).toFixed(2)}`;
      total += price*qty;
    });
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.some(item => item.name === name);
    document.querySelector('h2').textContent = `Total: $${total.toFixed(2)}`;
  };

  document.querySelectorAll('tbody tr').forEach(row=>{
    const minus = row.querySelector('button:nth-child(1)');
    const qtySpan = row.querySelector('span');
    const plus = row.querySelector('button:nth-child(3)');
    const remove = row.querySelector('button.bg-red-500');

    minus.addEventListener('click', ()=>{
      let q = parseInt(qtySpan.textContent);
      if(q>1){ qtySpan.textContent = --q; updateTotal(); }
    });
    plus.addEventListener('click', ()=>{
      let q = parseInt(qtySpan.textContent);
      qtySpan.textContent = ++q; updateTotal();
    });
    remove.addEventListener('click', ()=>{
      row.remove(); updateTotal();
    });
  });
  updateTotal();
}
