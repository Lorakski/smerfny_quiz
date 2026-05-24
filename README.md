# 🍄 Quiz "Którym Smerfem Jesteś?" (Typeform-style)

Urocza, interaktywna aplikacja webowa w języku Python (Flask) stworzona z myślą o wspólnej zabawie rodziców z dziećmi. Quiz jest w pełni **anonimowy**, nie zbiera danych użytkowników, a jego nowoczesny, responsywny design w stylu platformy **Typeform** idealnie pasuje do smartfonów i tabletów.

Aplikacja automatycznie generuje **kod QR**, dzięki czemu inni gracze mogą błyskawicznie zeskanować go z ekranu telefonu i otworzyć quiz u siebie!

---

## 🌟 Główne Funkcje
- **Design Premium:** Wykorzystanie HSL, efektów *Glassmorphism*, nowoczesnej typografii (*Outfit* & *Inter*) oraz płynnych animacji przejść.
- **Wygoda na Telefonie:** Ogromne, dotykowe kafelki odpowiedzi dostosowane do małych i dużych rączek.
- **Śmieszne Elementy:** Zabawne uwagi, docinki i porady od różnych Smerfów (np. Marudy, Ważniaka) pod każdym pytaniem.
- **Dynamiczny Kod QR:** Automatyczne generowanie kodu QR na podstawie aktualnego adresu strony (`localhost`, IP serwera lub własna domena).
- **Zoptymalizowany Algorytm:** Błyskawiczne dopasowanie profilu Smerfa po stronie klienta (JavaScript) z dedykowanymi radami dla dziecka i dla rodzica.
- **Pełna Prywatność:** 100% anonimowości – brak cookies, baz danych czy logowania analitycznego.

---

## 💻 Uruchomienie Lokalne (Windows / macOS / Linux)

### Krok 1: Klonowanie/Przygotowanie
Upewnij się, że masz zainstalowanego Pythona (zalecana wersja 3.8 lub nowsza).

### Krok 2: Instalacja zależności
Otwórz terminal w folderze projektu i uruchom:
```bash
pip install -r requirements.txt
```

### Krok 3: Uruchomienie aplikacji
Uruchom serwer deweloperski Pythona:
```bash
python app.py
```

Serwer uruchomi się na adresie: **`http://localhost:5000`** (lub pod IP Twojego komputera w sieci lokalnej). Możesz otworzyć tę stronę w przeglądarce i cieszyć się quizem!

---

## ☁️ Wdrożenie na Darmowym Serwerze Oracle Cloud (Free Tier)

Darmowe instancje Oracle Cloud (np. VM.Standard.A1.Flex oparta na procesorach Ampere ARM lub AMD x86) są idealne do uruchomienia tej aplikacji na stałe w internecie.

### 1. Przygotowanie serwera (Ubuntu / Oracle Linux)
Zaloguj się na swoją instancję przez SSH i zainstaluj potrzebne pakiety:
```bash
sudo apt update
sudo apt install python3-pip python3-venv git -y
```

### 2. Pobranie kodu i utworzenie wirtualnego środowiska
```bash
git clone <URL_TWOJEGO_REPOZYTORIUM> smerfy-quiz
cd smerfy-quiz
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 3. Otwarcie portu w konsoli Oracle Cloud i na serwerze
Aby aplikacja była widoczna publicznie:
- **W konsoli Oracle Cloud:** Wejdź w konfigurację sieci (Virtual Cloud Network -> Security Lists -> Ingress Rules) i dodaj regułę zezwalającą na ruch TCP na port **5000** (lub 80, jeśli używasz reverse-proxy) dla źródła `0.0.0.0/0`.
- **Na serwerze (Ubuntu):** Otwórz port w lokalnej zaporze `iptables` / `ufw`:
  ```bash
  sudo ufw allow 5000/tcp
  ```
  *(Jeśli system używa standardowych reguł iptables w Oracle Cloud, może być konieczne ich zaktualizowanie: `sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 5000 -j ACCEPT`)*

### 4. Uruchomienie za pomocą Gunicorn w tle (Systemd)
Stwórz plik konfiguracyjny usługi systemowej, aby aplikacja działała zawsze, nawet po zamknięciu konsoli SSH.

Stwórz plik:
```bash
sudo nano /etc/systemd/system/smerfy.service
```

Wklej poniższą zawartość (dostosowując ścieżki):
```ini
[Unit]
Description=Gunicorn instance to serve Smurfs Quiz
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/smerfy-quiz
ExecStart=/home/ubuntu/smerfy-quiz/venv/bin/gunicorn --workers 3 --bind 0.0.0.0:5000 app:app
Restart=always

[Install]
WantedBy=multi-user.target
```

Zapisz plik (`Ctrl+O`, `Enter`, `Ctrl+X`) i uruchom usługę:
```bash
sudo systemctl daemon-reload
sudo systemctl start smerfy
sudo systemctl enable smerfy
```

Teraz aplikacja działa pod publicznym IP Twojego serwera Oracle, np.: **`http://<TWÓJ_PUBLICZNY_IP>:5000`**. Kod QR w quizie automatycznie dostosuje się do tego adresu!

---

## 🛠️ Technologie
- **Backend:** Python 3 + Flask (serwowanie plików, lekki serwer HTTP)
- **Serwer Produkcyjny:** Gunicorn
- **Frontend:** HTML5, CSS3 (Vanilla CSS, custom variable grids, Glassmorphic design), JavaScript ES6
- **QR Code:** QRious JS (generowany po stronie przeglądarki)
- **Czcionki & Ikony:** FontAwesome 6, Google Fonts (Outfit & Inter)
