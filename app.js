document.addEventListener("DOMContentLoaded", () => {
    // 1. URL'den 'id' parametresini al (Örn: ?id=tashan)
    const urlParams = new URLSearchParams(window.location.search);
    const mekanId = urlParams.get('id');

    const loader = document.getElementById('loader');
    const contentScreen = document.getElementById('content-screen');
    const errorScreen = document.getElementById('error-screen');

    // Eğer URL'de ID yoksa direkt hata ver
    if (!mekanId) {
        loader.classList.add('hidden');
        errorScreen.classList.remove('hidden');
        return;
    }

    document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const mekanId = urlParams.get('id');

    const loader = document.getElementById('loader');
    const contentScreen = document.getElementById('content-screen');
    const errorScreen = document.getElementById('error-screen');

    if (!mekanId) {
        loader.classList.add('hidden');
        errorScreen.classList.remove('hidden');
        return;
    }

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const mekan = data.find(item => item.id === mekanId);
            loader.classList.add('hidden');

            if (mekan) {
                document.getElementById('mekan-baslik').textContent = mekan.baslik;
                document.getElementById('mekan-ozet').textContent = mekan.ozet;
                document.getElementById('mekan-detay').textContent = mekan.detay;
                document.getElementById('mekan-harita').href = mekan.harita_linki;
                
                // --- SLIDER İŞLEMLERİ BAŞLANGICI ---
                const sliderWrapper = document.getElementById('slider-wrapper');
                const prevBtn = document.getElementById('prev-btn');
                const nextBtn = document.getElementById('next-btn');
                
                sliderWrapper.innerHTML = ''; // Önceki resimleri temizle

                // Resimleri oluştur ve ekle
                if (mekan.resimler && mekan.resimler.length > 0) {
                    mekan.resimler.forEach(resimSrc => {
                        const img = document.createElement('img');
                        img.src = resimSrc;
                        img.alt = mekan.baslik;
                        sliderWrapper.appendChild(img);
                    });

                    // Eğer 1'den fazla resim varsa butonları göster
                    if (mekan.resimler.length > 1) {
                        prevBtn.classList.remove('hidden');
                        nextBtn.classList.remove('hidden');
                    }
                }

                // Kaydırma Mantığı
                let currentIndex = 0;
                const totalImages = mekan.resimler ? mekan.resimler.length : 0;

                function updateSlider() {
                    const width = sliderWrapper.clientWidth;
                    sliderWrapper.style.transform = `translateX(-${currentIndex * width}px)`;
                }

                prevBtn.onclick = () => {
                    if (currentIndex > 0) {
                        currentIndex--;
                    } else {
                        currentIndex = totalImages - 1; // Başa dönerse en sona git (Döngüsel)
                    }
                    updateSlider();
                };

                nextBtn.onclick = () => {
                    if (currentIndex < totalImages - 1) {
                        currentIndex++;
                    } else {
                        currentIndex = 0; // Sona gelirse en başa dön (Döngüsel)
                    }
                    updateSlider();
                };

                // Pencere boyutu değişirse slider'ı hizala (Telefon yan çevrilirse vb.)
                window.addEventListener('resize', updateSlider);
                // --- SLIDER İŞLEMLERİ BİTİŞİ ---

                contentScreen.classList.remove('hidden');
            } else {
                errorScreen.classList.remove('hidden');
            }
        })
        .catch(error => {
            console.error("Hata:", error);
            loader.textContent = "Bağlantı hatası.";
        });
});
});