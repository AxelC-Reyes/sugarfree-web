// navigation.js - Sistema inteligente de navegación para Sugar-Free

class SugarNavigation {
    constructor() {
        this.userProfile = this.getUserProfile();
        this.init();
    }
    
    // Obtener perfil del usuario desde localStorage
    getUserProfile() {
        try {
            const profile = localStorage.getItem('userProfile');
            return profile ? JSON.parse(profile) : null;
        } catch (e) {
            console.error('Error al obtener perfil:', e);
            return null;
        }
    }
    
    // Guardar perfil del usuario
    saveUserProfile(profileData) {
        try {
            localStorage.setItem('userProfile', JSON.stringify(profileData));
            this.userProfile = profileData;
            return true;
        } catch (e) {
            console.error('Error al guardar perfil:', e);
            return false;
        }
    }
    
    // Inicializar navegación
    init() {
        this.setupNavigationLinks();
        this.checkUserAccess();
        this.setupWelcomeMessage();
    }
    
    // Configurar enlaces de navegación según el perfil
    setupNavigationLinks() {
        // Si el usuario es un Sugar Daddy/Mommy
        if (this.userProfile && (this.userProfile.type === 'daddy' || this.userProfile.type === 'mommy')) {
            this.updateLinksForSugar();
        }
        // Si el usuario es un Sugar Baby
        else if (this.userProfile && this.userProfile.type === 'baby') {
            this.updateLinksForBaby();
        }
    }
    
    // Actualizar enlaces para Sugar Daddies/Mommies
    updateLinksForSugar() {
        // Encontrar y actualizar todos los enlaces relevantes
        const links = document.querySelectorAll('a[href*="listing"]');
        links.forEach(link => {
            if (link.href.includes('listing-babies')) {
                link.href = 'listing-babies.html';
                link.title = 'Ver Sugar Babies';
            } else if (link.href.includes('listing-sugars')) {
                link.href = 'listing-sugars.html';
                link.title = 'Ver Sugar Daddies/Mommies';
            }
        });
        
        // Agregar botón de navegación si no existe
        this.addNavigationButton();
    }
    
    // Actualizar enlaces para Sugar Babies
    updateLinksForBaby() {
        const links = document.querySelectorAll('a[href*="listing"]');
        links.forEach(link => {
            if (link.href.includes('listing-sugars')) {
                link.href = 'listing-sugars.html';
                link.title = 'Ver Sugar Daddies/Mommies';
            } else if (link.href.includes('listing-babies')) {
                link.href = 'listing-babies.html';
                link.title = 'Ver Sugar Babies';
            }
        });
        
        this.addNavigationButton();
    }
    
    // Agregar botón de navegación inteligente
    addNavigationButton() {
        // Crear botón flotante de navegación
        const navButton = document.createElement('div');
        navButton.id = 'sugarNavButton';
        navButton.innerHTML = `
            <button style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                color: white;
                border: none;
                border-radius: 50px;
                padding: 12px 25px;
                font-family: 'Poppins', sans-serif;
                font-weight: 600;
                cursor: pointer;
                box-shadow: 0 5px 20px rgba(156, 39, 176, 0.3);
                z-index: 1000;
                display: flex;
                align-items: center;
                gap: 10px;
                transition: all 0.3s ease;
            ">
                <i class="fas fa-compass"></i>
                <span id="navButtonText">Ir a Matches</span>
            </button>
        `;
        
        document.body.appendChild(navButton);
        
        // Configurar acción del botón
        navButton.querySelector('button').addEventListener('click', () => {
            this.navigateToCorrectPage();
        });
        
        // Actualizar texto del botón según perfil
        this.updateNavButtonText();
    }
    
    // Actualizar texto del botón de navegación
    updateNavButtonText() {
        const buttonText = document.getElementById('navButtonText');
        if (!buttonText) return;
        
        if (this.userProfile) {
            if (this.userProfile.type === 'daddy' || this.userProfile.type === 'mommy') {
                buttonText.textContent = 'Ver Sugar Babies';
            } else if (this.userProfile.type === 'baby') {
                buttonText.textContent = 'Ver Sugar Daddies/Mommies';
            }
        }
    }
    
    // Navegar a la página correcta según perfil
    navigateToCorrectPage() {
        if (this.userProfile) {
            if (this.userProfile.type === 'daddy' || this.userProfile.type === 'mommy') {
                window.location.href = 'listing-babies.html';
            } else if (this.userProfile.type === 'baby') {
                window.location.href = 'listing-sugars.html';
            }
        } else {
            // Si no hay perfil, ir al inicio
            window.location.href = 'index.html';
        }
    }
    
    // Verificar acceso del usuario
    checkUserAccess() {
        const currentPage = window.location.pathname.split('/').pop();
        
        // Si el usuario no tiene perfil y está en listings, redirigir
        if (!this.userProfile && (currentPage.includes('listing') || currentPage.includes('matchmaking'))) {
            setTimeout(() => {
                alert('⚠️ Primero debes completar tu perfil');
                window.location.href = 'index.html';
            }, 1000);
            return false;
        }
        
        return true;
    }
    
    // Configurar mensaje de bienvenida
    setupWelcomeMessage() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('welcome') === 'true') {
            this.showWelcomeNotification();
        }
    }
    
    // Mostrar notificación de bienvenida
    showWelcomeNotification() {
        setTimeout(() => {
            const profileType = this.userProfile?.type;
            let message = '¡Bienvenido a Sugar-Free!';
            
            if (profileType === 'daddy') {
                message = '🎩 ¡Bienvenido Sugar Daddy! Comienza a conectar con Sugar Babies';
            } else if (profileType === 'mommy') {
                message = '💎 ¡Bienvenida Sugar Mommy! Encuentra tu Sugar Baby ideal';
            } else if (profileType === 'baby') {
                message = '🌟 ¡Bienvenido Sugar Baby! Los Sugar Daddies/Mommies te están esperando';
            }
            
            this.showNotification(message, 'success');
            
            // Limpiar parámetro de URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }, 1000);
    }
    
    // Mostrar notificación
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 
                       type === 'error' ? 'rgba(244, 67, 54, 0.9)' : 
                       'rgba(33, 150, 243, 0.9)'};
            color: white;
            padding: 15px 25px;
            border-radius: 12px;
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
            backdrop-filter: blur(10px);
            max-width: 300px;
        `;
        
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 
                              type === 'error' ? 'exclamation-circle' : 
                              'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
}

// Inicializar navegación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.sugarNav = new SugarNavigation();
});