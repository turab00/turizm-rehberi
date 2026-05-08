document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const mekanId = urlParams.get('id');

    const loader = document.getElementById('loader');
    const homeScreen = document.getElementById('home-screen');
    const contentScreen = document.getElementById('content-screen');
    const errorScreen = document.getElementById('error-screen');

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            loader.classList.add('hidden');

            if (!mekanId) {
                // --- ANA SAYFAYI RENDER ET ---
                homeScreen.classList.remove('hidden');
                const liste = document.getElementById('mekan-listesi');
                data.forEach(mekan => {
                    const kart = document.createElement('a');
                    kart.href = `?id=${mekan.id}`;
                    kart.className = 'mekan-kart';
                    kart.innerHTML = `
                        <img src="${mekan.resimler[0]}" class="kart-resim">
                        <div class="kart-baslik">${mekan.baslik}</div>
                    `;
                    liste.appendChild(kart);
                });
            } else {
                // --- DETAY SAYFASINI RENDER ET (Eski Kodların) ---
                const mekan = data.find(item => item.id === mekanId);
                if (mekan) {
                    contentScreen.classList.remove('hidden');
                    document.getElementById('mekan-baslik').textContent = mekan.baslik;
                    document.getElementById('mekan-ozet').textContent = mekan.ozet;
                    document.getElementById('mekan-detay').textContent = mekan.detay;
                    document.getElementById('mekan-harita').href = mekan.harita_linki;
                    setupSlider(mekan);
                } else {
                    errorScreen.classList.remove('hidden');
                }
            }
        });

    function setupSlider(mekan) {
        const wrapper = document.getElementById('slider-wrapper');
        const prev = document.getElementById('prev-btn');
        const next = document.getElementById('next-btn');
        let index = 0;

        mekan.resimler.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            wrapper.appendChild(img);
        });

        if(mekan.resimler.length > 1) {
            prev.classList.remove('hidden');
            next.classList.remove('hidden');
        }

        const update = () => {
            wrapper.style.transform = `translateX(-${index * wrapper.clientWidth}px)`;
        };

        next.onclick = () => { index = (index + 1) % mekan.resimler.length; update(); };
        prev.onclick = () => { index = (index - 1 + mekan.resimler.length) % mekan.resimler.length; update(); };
        
        // Otomatik kaydır
        setInterval(() => { index = (index + 1) % mekan.resimler.length; update(); }, 5000);
    }
});
