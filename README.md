# 🏠 Infiniti Casa - Luxury Boutique Rentals

A modern, responsive web application for luxury boutique property rentals in Mumbai. Built with React, TypeScript, Tailwind CSS, and Supabase.

## ✨ Features

### 🎨 **Modern UI/UX**
- Responsive design that works on all devices
- Beautiful animations and transitions
- Intuitive user interface
- Mobile-first approach

### 🏡 **Property Management**
- Browse curated luxury properties
- Detailed property pages with high-quality images
- Property comparison tool
- Advanced search and filtering

### 📅 **Booking System**
- Multi-step booking process
- Real-time availability checking
- Guest management
- Booking confirmation and tracking

### 👤 **User Experience**
- User authentication and profiles
- Favorite properties
- Booking history
- Social sharing capabilities

### 🔧 **Technical Features**
- TypeScript for type safety
- Tailwind CSS for styling
- Supabase for backend services
- PWA capabilities
- SEO optimized

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/infiniti-casa.git
   cd infiniti-casa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Project Structure

```
src/
├── components/          # React components
│   ├── PropertyDetail.tsx
│   ├── PropertyGrid.tsx
│   ├── BookingModal.tsx
│   └── ...
├── services/           # API services
│   ├── authService.ts
│   ├── propertyService.ts
│   └── ...
├── hooks/             # Custom React hooks
├── lib/               # Utility libraries
├── data/              # Static data
└── types/             # TypeScript type definitions
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository to Vercel**
2. **Add environment variables in Vercel dashboard**
3. **Deploy automatically on every push**

### Other Options

- **Netlify**: Drag and drop `dist` folder
- **GitHub Pages**: Use GitHub Actions for build
- **Firebase Hosting**: Use Firebase CLI

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📱 PWA Features

- Offline support
- Installable app
- Push notifications (coming soon)
- Background sync

## 🎨 Design System

Built with Tailwind CSS and custom design tokens:
- Color palette optimized for luxury feel
- Responsive breakpoints
- Consistent spacing and typography
- Dark/light mode support (coming soon)

## 🔒 Security

- Environment variables for sensitive data
- Supabase Row Level Security (RLS)
- Input validation and sanitization
- HTTPS enforcement

## 📊 Performance

- Lazy loading for images
- Code splitting
- Optimized bundle size
- CDN for static assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) for the UI framework
- [Vite](https://vitejs.dev/) for the build tool
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Supabase](https://supabase.com/) for backend services
- [Lucide React](https://lucide.dev/) for icons

## 📞 Support

For support, email support@infiniticasa.com or create an issue in this repository.

---

**Built with ❤️ for luxury hospitality** 