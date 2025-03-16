# Next.js Portfolio

A personal portfolio built with Next.js to showcase projects.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/your-portfolio.git
   cd your-portfolio
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Make a .env file using .env.example. You need to get Cloudflare Turnstile Keys and Resend Api keys to enable the form email notification.

   ```sh
   RESEND_API_KEY=
   NEXT_PUBLIC_CLOUDFLARE_SITE_KEY=
   CLOUDFLARE_SECRET_KEY=
   ```

4. Run the development server:

   ```sh
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Extra

All https links open as new tabs, except for subdomains. Force subdomains to open in new Tab by putting "/" at the end.

## License

MIT License
