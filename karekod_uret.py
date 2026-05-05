import qrcode
import os

# Karekodların kaydedileceği klasörü oluştur
if not os.path.exists("karekodlar"):
    os.makedirs("karekodlar")

base_url = "https://havzaturizm-rehberi.vercel.app/?id=mekan-"

for i in range(1, 13):
    url = f"{base_url}{i}"
    
    # Karekodu oluştur
    qr = qrcode.QRCode(version=1, box_size=10, border=4)
    qr.add_data(url)
    qr.make(fit=True)
    
    # Görseli kaydet
    img = qr.make_image(fill_color="black", back_color="white")
    dosya_adi = f"karekodlar/mekan-{i}_qr.png"
    img.save(dosya_adi)
    print(f"{dosya_adi} oluşturuldu.")

print("Tüm karekodlar başarıyla üretildi!")