import os
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    """Renders the main Typeform Smurfs quiz page."""
    return render_template('index.html')

@app.route('/health')
def health():
    """Health check endpoint for Oracle Cloud deployment."""
    return {"status": "healthy"}, 200

if __name__ == '__main__':
    # Run the server on port 5000, visible to all network interfaces (0.0.0.0)
    # perfect for local testing and easy binding on Oracle Cloud
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
