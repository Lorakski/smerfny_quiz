import os
import webbrowser
from threading import Timer
from flask import Flask, render_template
from werkzeug.middleware.proxy_fix import ProxyFix

app = Flask(__name__)

# Konfiguracja ProxyFix dla bezpiecznego działania za load balancerem / proxy w chmurze
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_port=1)

@app.route('/')
def home():
    """Renders the main Typeform Smurfs quiz page."""
    return render_template('index.html')

@app.route('/health')
def health():
    """Health check endpoint for Oracle Cloud deployment."""
    return {"status": "healthy"}, 200

@app.after_request
def add_security_headers(response):
    """Adds robust HTTP security headers to protect the application."""
    # CSP: Zezwalamy na lokalne zasoby oraz zaufane CDN-y (Google Fonts, FontAwesome, QRious)
    response.headers['Content-Security-Policy'] = (
        "default-src 'self'; "
        "script-src 'self' cdnjs.cloudflare.com 'unsafe-inline'; "
        "style-src 'self' fonts.googleapis.com cdnjs.cloudflare.com 'unsafe-inline'; "
        "font-src 'self' fonts.gstatic.com cdnjs.cloudflare.com; "
        "img-src 'self' data:; "
        "connect-src 'self';"
    )
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    return response

def open_browser(port):
    """Helper function to open the browser automatically to the HTTPS local address."""
    webbrowser.open(f"https://127.0.0.1:{port}")

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    
    # Domyślnie włączamy debug lokalnie, ale pozwalamy na sterowanie zmienną środowiskową
    debug_mode = os.environ.get('FLASK_DEBUG', 'true').lower() in ['true', '1']
    
    # Automatyczne otwieranie przeglądarki z opóźnieniem 1.5 sekundy.
    # Sprawdzamy 'WERZEUG_RUN_MAIN', by uniknąć podwójnego otwarcia przy restarcie przez auto-reloader Flaska.
    if os.environ.get('WERZEUG_RUN_MAIN') == 'true' or not debug_mode:
        Timer(1.5, lambda: open_browser(port)).start()
        
    # Uruchomienie lokalnego serwera Flask z obsługą HTTPS ad-hoc
    app.run(host='0.0.0.0', port=port, debug=debug_mode, ssl_context='adhoc')

