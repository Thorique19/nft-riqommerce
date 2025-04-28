// Function to load products from API
async function loadProducts() {
    try {
      // Display loading state
      const productsContainer = document.getElementById('products-container');
      productsContainer.innerHTML = '<div class="loading">Loading NFTs...</div>';
      
      // Fetch products from API
      const response = await fetch('/api/products');
      const products = await response.json();
      
      // Clear loading state
      productsContainer.innerHTML = '';
      
      // Render each product
      products.forEach(product => {
        renderProduct(product);
      });
      
      // Add animation to products with a delay
      const productElements = document.querySelectorAll('.product');
      productElements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add('visible');
        }, index * 100);
      });
      
    } catch (error) {
      console.error('Error loading products:', error);
      document.getElementById('products-container').innerHTML = `
        <div class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          <p>Failed to load NFTs. Please try again later.</p>
          <button onclick="loadProducts()">Retry</button>
        </div>
      `;
  
      // For demo purposes, load placeholder data if API fails
      loadMockData();
    }
  }
  
  // Function to load mock data for demo purposes
  function loadMockData() {
    const mockProducts = [
      {
        id: 1,
        nama: "Cyber Ape #487",
        deskripsi: "Ultra rare cybernetic ape with neural implants and holographic eyes",
        harga: 2.5,
        gambar_url: "https://placehold.co/400x400/10121d/00ffaa?text=Cyber+Ape+%23487"
      },
      {
        id: 2,
        nama: "Neon Gorilla #032",
        deskripsi: "Luminescent primate with quantum computing capabilities",
        harga: 1.8,
        gambar_url: "https://placehold.co/400x400/10121d/9900ff?text=Neon+Gorilla"
      },
      {
        id: 3,
        nama: "Space Monkey #772",
        deskripsi: "Interstellar explorer with advanced genetic modifications",
        harga: 3.2,
        gambar_url: "https://placehold.co/400x400/10121d/00ffaa?text=Space+Monkey"
      },
      {
        id: 4,
        nama: "Digital Orangutan #114",
        deskripsi: "Sentient AI trapped in an orangutan's digital body",
        harga: 2.7,
        gambar_url: "https://placehold.co/400x400/10121d/9900ff?text=Digital+Orangutan"
      },
      {
        id: 5,
        nama: "Quantum Chimp #256",
        deskripsi: "Exists simultaneously across multiple metaverse dimensions",
        harga: 4.5,
        gambar_url: "https://placehold.co/400x400/10121d/00ffaa?text=Quantum+Chimp"
      },
      {
        id: 6,
        nama: "Hologram Baboon #629",
        deskripsi: "Projection entity with reality-altering capabilities",
        harga: 1.9,
        gambar_url: "https://placehold.co/400x400/10121d/9900ff?text=Hologram+Baboon"
      }
    ];
  
    // Clear container
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    
    // Render mock products with delay
    mockProducts.forEach((product, index) => {
      setTimeout(() => {
        renderProduct(product);
        document.querySelectorAll('.product')[index].classList.add('visible');
      }, index * 150);
    });
  }
  
  // Function to render a single product
  function renderProduct(product) {
    const productsContainer = document.getElementById('products-container');
    
    // Create product card element
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    
    // Generate random creator image for demo purposes
    const creatorId = Math.floor(Math.random() * 1000);
    const creatorImg = `https://placehold.co/100/10121d/00ffaa?text=User${creatorId}`;
    
    // Create HTML structure for product card with enhanced UI
    productElement.innerHTML = `
      <img src="${product.gambar_url}" alt="${product.nama}" />
      <div class="price-badge">${product.harga} ETH</div>
      <div class="product-info">
        <h2>${product.nama}</h2>
        <p>${product.deskripsi}</p>
        <div class="product-actions">
          <div class="creator">
            <img class="creator-avatar" src="${creatorImg}" alt="Creator" />
            <span class="creator-name">Artist_${creatorId}</span>
          </div>
          <button class="bid-btn">Place Bid</button>
        </div>
      </div>
    `;
    
    // Add click event to bid button
    const bidButton = productElement.querySelector('.bid-btn');
    bidButton.addEventListener('click', () => {
      alert(`Bid placed for ${product.nama}!`);
    });
    
    // Append product card to container
    productsContainer.appendChild(productElement);
  }
  
  // Initialize the application
  document.addEventListener('DOMContentLoaded', () => {
    // Load products
    loadProducts();
    
    // Add event listeners to filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        // In a real app, you would filter products here
        // For demo purposes, we'll just reload all products
        loadProducts();
      });
    });
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Add animation to the hero section
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      heroContent.style.transition = 'all 1s ease-out';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 300);
  });