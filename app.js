document.addEventListener('DOMContentLoaded', function() {
  // Load header and footer components
  loadComponent('header-component', 'components/header.html');
  loadComponent('footer-component', 'components/footer.html');
  
  // Mobile menu toggle
  setTimeout(() => {
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener("click", function() {
        mobileMenu.classList.toggle("hidden");
      });
    }
  }, 100);
  
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Close mobile menu if open
        const mobileMenu = document.getElementById("mobile-menu");
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
        
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Form submission handling
  const contactForms = document.querySelectorAll('form');
  contactForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = form.querySelector('#name') ? form.querySelector('#name').value : '';
      const email = form.querySelector('#email') ? form.querySelector('#email').value : '';
      const subject = form.querySelector('#subject') ? form.querySelector('#subject').value : '';
      const message = form.querySelector('#message') ? form.querySelector('#message').value : '';
      const comment = form.querySelector('#comment') ? form.querySelector('#comment').value : '';
      
      // Basic validation
      if (name && email && !email.includes('@')) {
        showNotification('Please enter a valid email address', 'error');
        return;
      }
      
      // Simulate form submission
      if (form.closest('section') && form.closest('section').textContent.includes('Comment')) {
        showNotification('Posting comment...', 'info');
        setTimeout(() => {
          showNotification('Comment posted successfully!', 'success');
          form.reset();
        }, 1500);
      } else if (form.closest('section') && form.closest('section').textContent.includes('Update')) {
        showNotification('Adding update...', 'info');
        setTimeout(() => {
          showNotification('Update added successfully!', 'success');
          form.reset();
        }, 1500);
      } else if (form.closest('section') && form.closest('section').textContent.includes('Incident')) {
        showNotification('Reporting incident...', 'info');
        setTimeout(() => {
          showNotification('Incident reported successfully!', 'success');
          form.reset();
        }, 1500);
      } else {
        showNotification('Sending message...', 'info');
        setTimeout(() => {
          showNotification('Message sent successfully! We will contact you soon.', 'success');
          form.reset();
        }, 1500);
      }
    });
  });
  
  // View Details buttons for vehicles
  const vehicleButtons = document.querySelectorAll('#vehicles button, .vehicle-card button');
  vehicleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const vehicleName = this.closest('.vehicle-card') ? 
        this.closest('.vehicle-card').querySelector('h4').textContent : 
        'Vehicle';
      showNotification(`Showing details for ${vehicleName}`, 'info');
    });
  });
  
  // View All buttons
  const viewAllButtons = document.querySelectorAll('button');
  viewAllButtons.forEach(button => {
    if (button.textContent.includes('View All')) {
      button.addEventListener('click', function() {
        const section = this.closest('section') ? this.closest('section').id : 'section';
        showNotification(`Loading all ${section}...`, 'info');
      });
    }
  });
  
  // Download report buttons
  const downloadButtons = document.querySelectorAll('button');
  downloadButtons.forEach(button => {
    if (button.textContent.includes('Download')) {
      button.addEventListener('click', function() {
        showNotification('Preparing download...', 'info');
        setTimeout(() => {
          showNotification('Download started!', 'success');
        }, 1500);
      });
    }
  });
  
  // Newsletter subscription
  const newsletterForms = document.querySelectorAll('form');
  newsletterForms.forEach(form => {
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && form.closest('section') && form.closest('section').textContent.includes('Subscribe')) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = emailInput.value;
        
        if (email && email.includes('@')) {
          showNotification('Subscribing to newsletter...', 'info');
          setTimeout(() => {
            showNotification('Successfully subscribed to our newsletter!', 'success');
            form.reset();
          }, 1500);
        } else {
          showNotification('Please enter a valid email address', 'error');
        }
      });
    }
  });
  
  // Notification system
  function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Add close button
    notification.innerHTML = `
      <div class="flex justify-between items-center">
        <span>${message}</span>
        <button class="ml-4 text-white hover:text-gray-200 focus:outline-none">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
    
    // Add close functionality
    const closeButton = notification.querySelector('button');
    closeButton.addEventListener('click', () => {
      notification.classList.add('hide');
      setTimeout(() => notification.remove(), 300);
    });
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.classList.add('hide');
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }
  
  // Active navigation highlighting
  const currentPath = window.location.pathname;
  // const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath.split('/').pop()) {
      link.classList.add('font-bold', 'border-b-2', 'border-yellow-300');
    }
  });

  // Active navigation highlighting
function highlightActivePage() {
  const currentPath = window.location.pathname;
  const pageName = currentPath.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Remove existing active classes
    link.classList.remove('font-bold', 'border-b-2', 'border-yellow-300');
    
    // Add active class to current page
    if (href === pageName) {
      link.classList.add('font-bold', 'border-b-2', 'border-yellow-300');
    }
  });
}

// Call after components are loaded
setTimeout(() => {
  highlightActivePage();
}, 200);


// Fix mobile menu after component loading
function initializeMobileMenu() {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function() {
      mobileMenu.classList.toggle("hidden");
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

// Call after components are loaded
setTimeout(() => {
  initializeMobileMenu();
}, 200);
  
  // Tab functionality for detail pages
  const tabs = document.querySelectorAll('[id$="-tab"]');
  if (tabs.length > 0) {
    const contents = document.querySelectorAll('[id$="-content"]');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const tabId = this.id.replace('-tab', '');
        
        // Update tab styles
        tabs.forEach(t => {
          t.classList.remove('border-sea-blue-700', 'text-sea-blue-700');
          t.classList.add('border-transparent', 'text-blue-500');
        });
        
        this.classList.remove('border-transparent', 'text-blue-500');
        this.classList.add('border-sea-blue-700', 'text-sea-blue-700');
        
        // Show/hide content
        contents.forEach(content => {
          content.classList.add('hidden');
        });
        
        const contentElement = document.getElementById(`${tabId}-content`);
        if (contentElement) {
          contentElement.classList.remove('hidden');
        }
      });
    });
  }
});

// Function to load components
async function loadComponent(componentId, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Failed to load ${filePath}`);
    const html = await response.text();
    const element = document.getElementById(componentId);
    if (element) {
      element.innerHTML = html;
    }
  } catch (error) {
    console.error(`Error loading component ${componentId}:`, error);
  }
}