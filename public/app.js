// Function to load products from API
async function loadProducts() {
    try {
      // Display loading state
      const productsContainer = document.getElementById('products-container');
      productsContainer.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading NFTs from the metaverse...</div>';
      
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
          <i class="fas fa-exclamation-triangle"></i>
          <p>Failed to connect to the quantum network. Please realign your neural interface and try again.</p>
          <button onclick="loadProducts()"><i class="fas fa-sync-alt"></i> Reconnect</button>
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
    
    // Generate random rarity badge
    const rarityTypes = ['Legendary', 'Rare', 'Uncommon', 'Common'];
    const rarityColors = ['#ff7b00', '#9900ff', '#00ffaa', '#ffffff'];
    const rarityIndex = Math.floor(Math.random() * rarityTypes.length);
    const rarityBadge = `<span class="rarity-badge" style="color: ${rarityColors[rarityIndex]}">
                            <i class="fas fa-gem"></i> ${rarityTypes[rarityIndex]}
                          </span>`;
    
    // Create HTML structure for product card with enhanced UI
    productElement.innerHTML = `
      <div class="product-image-container">
        <img src="${product.gambar_url}" alt="${product.nama}" />
        <div class="hover-overlay">
          <button class="preview-btn"><i class="fas fa-eye"></i> Preview</button>
        </div>
      </div>
      <div class="price-badge">${product.harga} ETH</div>
      <div class="product-info">
        <div class="product-header">
          <h2>${product.nama}</h2>
          ${rarityBadge}
        </div>
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
      bidButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      
      setTimeout(() => {
        bidButton.innerHTML = '<i class="fas fa-check"></i> Bid Placed';
        bidButton.classList.add('bid-success');
        
        // Show a notification
        showNotification(`Bid placed for ${product.nama}!`);
        
        // Reset after 3 seconds
        setTimeout(() => {
          bidButton.innerHTML = 'Place Bid';
          bidButton.classList.remove('bid-success');
        }, 3000);
      }, 1500);
    });
    
    // Add click event to preview button
    const previewBtn = productElement.querySelector('.preview-btn');
    previewBtn.addEventListener('click', () => {
      openPreviewModal(product);
    });
    
    // Append product card to container
    productsContainer.appendChild(productElement);
  }
  
  // Function to show notification
  function showNotification(message) {
    // Create notification element if it doesn't exist
    if (!document.querySelector('.notification')) {
      const notif = document.createElement('div');
      notif.className = 'notification';
      document.body.appendChild(notif);
    }
    
    const notification = document.querySelector('.notification');
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
      </div>
    `;
    
    // Show notification
    notification.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }
  
  // Function to open preview modal
  function openPreviewModal(product) {
    // Create modal if it doesn't exist
    if (!document.querySelector('.preview-modal')) {
      const modal = document.createElement('div');
      modal.className = 'preview-modal';
      document.body.appendChild(modal);
    }
    
    const modal = document.querySelector('.preview-modal');
    modal.innerHTML = `
      <div class="modal-content">
        <button class="close-modal"><i class="fas fa-times"></i></button>
        <div class="modal-body">
          <div class="nft-preview">
            <img src="${product.gambar_url}" alt="${product.nama}" />
            <div class="nft-details">
              <h2>${product.nama}</h2>
              <p>${product.deskripsi}</p>
              <div class="nft-price">
                <span class="price-label">Current Price</span>
                <span class="price-value">${product.harga} ETH</span>
                <span class="price-usd">≈ $${(product.harga * 3245).toLocaleString()}</span>
              </div>
              <div class="nft-stats">
                <div class="nft-stat">
                  <span class="stat-label">Rarity</span>
                  <span class="stat-value">Top 12%</span>
                </div>
                <div class="nft-stat">
                  <span class="stat-label">Edition</span>
                  <span class="stat-value">#${Math.floor(Math.random() * 10000)}</span>
                </div>
                <div class="nft-stat">
                  <span class="stat-label">Collection</span>
                  <span class="stat-value">Quantum Ape</span>
                </div>
              </div>
              <button class="cta-button glow-effect full-width">BUY NOW</button>
              <button class="secondary-button full-width">MAKE OFFER</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Show modal
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
    
    // Close modal on click
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('show');
      setTimeout(() => {
        modal.remove();
      }, 300);
    });
    
    // Close modal when clicking outside content
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
        setTimeout(() => {
          modal.remove();
        }, 300);
      }
    });
  }
  
  // Initialize the application
  document.addEventListener('DOMContentLoaded', () => {
    // Create animated background particles
    createParticles();
    
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
        
        // Show loading state
        const productsContainer = document.getElementById('products-container');
        productsContainer.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Filtering entities...</div>';
        
        // In a real app, you would filter products here
        // For demo purposes, we'll just reload all products with a delay
        setTimeout(() => {
          loadProducts();
        }, 800);
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
    animateHeroSection();
    
    // Connect wallet button functionality
    document.querySelector('.wallet-btn button').addEventListener('click', () => {
      simulateWalletConnection();
    });
  });
  
  // Function to create background particles
  function createParticles() {
    const particlesContainer = document.querySelector('.cta-particles');
    
    if (particlesContainer) {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size
        const size = Math.random() * 8 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = `${duration}s`;
        
        // Random delay
        const delay = Math.random() * 5;
        particle.style.animationDelay = `${delay}s`;
        
        // Random color: primary or secondary
        const color = Math.random() > 0.5 ? 'var(--primary)' : 'var(--secondary)';
        particle.style.backgroundColor = color;
        
        particlesContainer.appendChild(particle);
      }
    }
  }
  
  // Function to animate hero section elements
  function animateHeroSection() {
    const heroContent = document.querySelector('.hero-content');
    const floatingNfts = document.querySelectorAll('.floating-nft');
    
    if (heroContent) {
      heroContent.style.opacity = '0';
      heroContent.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        heroContent.style.transition = 'all 1s ease-out';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
      }, 300);
    }
    
    // Animate floating NFTs
    floatingNfts.forEach((nft, index) => {
      nft.style.opacity = '0';
      nft.style.transform = 'scale(0.8) translateY(30px)';
      
      setTimeout(() => {
        nft.style.transition = 'all 1s ease-out';
        nft.style.opacity = '1';
        nft.style.transform = 'scale(1) translateY(0)';
      }, 600 + index * 200);
    });
  }
  
  // Simulate wallet connection
  function simulateWalletConnection() {
    const connectBtn = document.querySelector('.wallet-btn button');
    const originalText = connectBtn.innerHTML;
    
    // Show loading state
    connectBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> CONNECTING';
    connectBtn.disabled = true;
    
    // Simulate connection process
    setTimeout(() => {
      connectBtn.innerHTML = '<i class="fas fa-check"></i> CONNECTED';
      connectBtn.classList.add('connected');
      
      // Show notification
      showNotification('Neural wallet successfully connected!');
      
      // Update UI to show wallet info
      setTimeout(() => {
        connectBtn.innerHTML = '<i class="fas fa-wallet"></i> 3.45 ETH';
        
        // Add dropdown for wallet options
        const walletBtn = document.querySelector('.wallet-btn');
        const dropdown = document.createElement('div');
        dropdown.className = 'wallet-dropdown';
        dropdown.innerHTML = `
          <ul>
            <li><i class="fas fa-user-circle"></i> Profile</li>
            <li><i class="fas fa-cog"></i> Settings</li>
            <li><i class="fas fa-sign-out-alt"></i> Disconnect</li>
          </ul>
        `;
        walletBtn.appendChild(dropdown);
        
        // Toggle dropdown on click
        connectBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          dropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
          dropdown.classList.remove('show');
        });
      }, 2000);
    }, 2000);
  }