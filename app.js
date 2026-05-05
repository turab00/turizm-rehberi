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

    // 2. data.json dosyasını çek ve eşleşen veriyi bul
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Veritabanındaki mekanlar arasında bizim id'mizle eşleşeni bul
            const mekan = data.find(item => item.id === mekanId);

            loader.classList.add('hidden');

            if (mekan) {
                // Eşleşme başarılı! Ekrana bas.
                document.getElementById('mekan-baslik').textContent = mekan.baslik;
                document.getElementById('mekan-ozet').textContent = mekan.ozet;
                document.getElementById('mekan-detay').textContent = mekan.detay;
                document.getElementById('mekan-resim').src = mekan.resim;
                document.getElementById('mekan-resim').alt = mekan.baslik;
                document.getElementById('mekan-harita').href = mekan.harita_linki;
                
                contentScreen.classList.remove('hidden');
            } else {
                // ID json dosyasında yoksa
                errorScreen.classList.remove('hidden');
            }
        })
        .catch(error => {
            console.error("Veri çekilirken hata oluştu:", error);
            loader.textContent = "Bağlantı hatası oluştu. Lütfen tekrar deneyin.";
        });
});