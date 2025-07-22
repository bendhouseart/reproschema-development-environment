from http.server import HTTPServer, SimpleHTTPRequestHandler
import os
import argparse


class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        return super(CORSRequestHandler, self).end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()


parser = argparse.ArgumentParser(description="Simple HTTP server with CORS support.")
parser.add_argument(
    "--host", default="0.0.0.0", help="Host to bind to (default: 0.0.0.0)"
)
parser.add_argument(
    "--port", type=int, default=8000, help="Port to bind to (default: 8000)"
)
parser.add_argument(
    "--directory",
    default=os.getcwd(),
    help="Directory to serve (default: current directory)",
)
args = parser.parse_args()

print(f"Listening on {args.host}:{args.port}, serving from {args.directory}")
os.chdir(args.directory)
httpd = HTTPServer((args.host, args.port), CORSRequestHandler)
httpd.serve_forever()
