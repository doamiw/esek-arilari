// ==========================================================
// 1. TOKEN SORGULAMA VERİSİ
// ==========================================================
const rewards = {
    "J8EP2": { prize: "Tebrikler! Özel Yapım Kokart Kazandınız!", type: "success" },
    "J63U9": { prize: "Sahne Arkası Turu Kazandınız!", type: "success" },
    "T83K6": { prize: "Bir Sonraki Oyun Bileti Kazandınız!", type: "success" },
    "03FE5": { prize: "Denemeye devam edin! Bir sonraki biletiniz şanslı olabilir.", type: "info" },
    "A6YV7": { prize: "Bu bilet için özel bir ödül yok, ancak gösterinin tadını çıkarın!", type: "info" }
};

// ==========================================================
// 2. TOKEN SORGULAMA DOM DEĞİŞKENLERİ
// ==========================================================
const tokenInput = document.getElementById('token-input');
const checkTokenBtn = document.getElementById('check-token-btn');
const resultBox = document.getElementById('result-box');
const resultMessage = document.getElementById('result-message'); 

// ==========================================================
// 3. KOŞULLU TOKEN SORGULAMA İŞLEVİ (SADECE index.html'de ÇALIŞIR)
// ==========================================================

// checkTokenBtn elementi sayfada mevcutsa, (yani index.html ise) çalıştır.
if (checkTokenBtn && tokenInput) { 
    
    // Token kontrol etme fonksiyonu
    function checkToken(event) {
        // Form olmasa bile varsayılan davranışı engellemek için
        if (event) {
            event.preventDefault(); 
        }

        const enteredToken = tokenInput.value.trim().toUpperCase(); 

        // Ödül kutusunun stilini sıfırla
        resultBox.style.backgroundColor = '#111';
        resultBox.style.borderColor = '#333';
        resultMessage.style.color = '#f0ebe3';

        // 1. Girdi Kontrolü
        if (enteredToken.length !== 5 || !/^[A-Z0-9]{5}$/.test(enteredToken)) {
             resultMessage.textContent = "Lütfen 5 haneli, harf ve rakam içeren geçerli bir token giriniz.";
             resultMessage.style.color = 'red';
             return; 
        }

        // 2. Ödül Sorgulama Mantığı
        if (rewards[enteredToken]) {
            const reward = rewards[enteredToken];
            resultMessage.textContent = reward.prize;
            
            // Ödül tipine göre stil
            if (reward.type === "success") {
                resultBox.style.backgroundColor = 'rgba(0, 128, 0, 0.3)';
                resultBox.style.borderColor = 'green';
                resultMessage.style.color = 'lightgreen';
            } else if (reward.type === "info") {
                resultBox.style.backgroundColor = 'rgba(255, 165, 0, 0.2)';
                resultBox.style.borderColor = 'orange';
                resultMessage.style.color = 'orange';
            }
        } else {
            resultMessage.textContent = "Girdiğiniz token numaranız listede bulunamadı. Lütfen numarayı kontrol ediniz.";
            resultBox.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
            resultBox.style.borderColor = 'red';
            resultMessage.style.color = 'lightcoral';
        }
    }

    // Olay Dinleyicisini Ekle
    checkTokenBtn.addEventListener('click', checkToken);

    // Enter tuşuna basıldığında sorgulama yapması için
    tokenInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            checkToken(event);
        }
    });

    // İlk başta mesajı yazdıralım
    document.addEventListener('DOMContentLoaded', () => {
        if (resultMessage) {
            resultMessage.textContent = "Lütfen token numaranızı giriniz.";
            resultMessage.style.color = '#999'; 
        }
    });
} 
// Token Sorgulama Bloğu burada biter.

// ==========================================================
// 4. MENÜ VE CAROUSEL KODLARI (TÜM SAYFALARDA ÇALIŞIR)
// ==========================================================

// Menüdeki linklere tıklanınca yumuşak kaydırma ekle
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); 
        const targetId = this.getAttribute('href'); 
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 90, 
                behavior: 'smooth' 
            });
        }
    });
});

// Ekip carousel (kaydırma) işlevselliği
document.addEventListener('DOMContentLoaded', () => {
    const setupCarousel = (carouselId) => {
        const carousel = document.getElementById(carouselId);
        if (!carousel) {
            return; 
        }

        const carouselContainer = carousel.closest('.carousel-container'); 
        if (!carouselContainer) {
            return;
        }

        const prevButton = carouselContainer.querySelector('.prev-btn');
        const nextButton = carouselContainer.querySelector('.next-btn');
        
        if (!prevButton || !nextButton) {
            return; 
        }

        // Buton click event'leri
        prevButton.addEventListener('click', () => {
            carousel.scrollBy({
                left: -carousel.offsetWidth / 2, 
                behavior: 'smooth'
            });
        });

        nextButton.addEventListener('click', () => {
            carousel.scrollBy({
                left: carousel.offsetWidth / 2, 
                behavior: 'smooth'
            });
        });

        // Buton görünürlüğü kontrolü (scroll yoksa gizle)
        const updateButtonVisibility = () => {
            if (carousel.scrollWidth <= carousel.clientWidth) {
                prevButton.style.display = 'none';
                nextButton.style.display = 'none';
            } else {
                prevButton.style.display = 'block'; 
                nextButton.style.display = 'block'; 
            }
        };

        updateButtonVisibility();
        window.addEventListener('resize', updateButtonVisibility);
        carousel.addEventListener('scroll', updateButtonVisibility);
    };

    // Her bir carousel için kurulumu çağır
    setupCarousel('players-carousel');
    setupCarousel('translators-carousel');
    setupCarousel('design-carousel');
});