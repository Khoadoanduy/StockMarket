from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf

app = Flask(__name__)
CORS(app)

@app.route('/api/stock-data', methods=['GET'])
def get_stock_data():
    # Get the ticker symbols from the query parameters
    ticker_symbols = request.args.get('tickers')
    
    if not ticker_symbols:
        return jsonify({"error": "No tickers provided"}), 400

    ticker_symbols = ticker_symbols.split(',')

    stocks_data = []

    for ticker_symbol in ticker_symbols:
        # Get data for the ticker
        ticker_data = yf.Ticker(ticker_symbol)

        # Get historical market data
        hist = ticker_data.history(period="1y").reset_index().to_dict(orient='records')

        # Get stock info
        stock_info = ticker_data.info

        stocks_data.append({
            "ticker": ticker_symbol,
            "historical_data": hist,
            "stock_info": stock_info
        })

    return jsonify(stocks_data)

if __name__ == '__main__':
    app.run(debug=True)
