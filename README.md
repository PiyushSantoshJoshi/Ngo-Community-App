# NGO Community App

A comprehensive web application built with React.js and Bootstrap for connecting NGOs with communities and managing requirements.

## 🚀 Features

### Core Functionality
- **User Authentication**: Login/Register for regular users and NGOs
- **NGO Management**: Registration, approval system, and profile management
- **Requirements System**: Post and search for NGO requirements
- **Search & Discovery**: Find NGOs by location, category, or name
- **Messaging System**: Direct communication between users and NGOs
- **Admin Dashboard**: Comprehensive administration panel

### Technical Features
- **React.js 19**: Modern React with hooks and functional components
- **Redux Toolkit**: State management with async thunks
- **React Router**: Client-side routing with protected routes
- **Bootstrap 5**: Responsive UI components and styling
- **Axios**: HTTP client for API communication
- **Custom Hooks**: Reusable authentication and data management hooks

## 🛠️ Tech Stack

- **Frontend**: React.js 19, Bootstrap 5, Redux Toolkit
- **Backend**: Firebase Functions (Node.js/Express)
- **Database**: Firestore
- **Authentication**: Custom auth system with localStorage
- **Deployment**: Vite build system

## 📁 Project Structure

```
src/
├── api/                    # API service files
│   ├── auth.js            # Authentication APIs
│   ├── ngo.js             # NGO management APIs
│   ├── requirements.js     # Requirements APIs
│   ├── messages.js        # Messaging APIs
│   └── index.js           # API exports
├── components/            # Reusable UI components
│   ├── Navbar.jsx         # Navigation component
│   ├── Footer.jsx         # Footer component
│   ├── ProtectedRoute.jsx # Route protection
│   └── CustomLink.jsx     # Custom navigation links
├── context/               # React Context
│   └── AuthContext.jsx    # Authentication context
├── hooks/                 # Custom hooks
│   └── useAuth.js         # Authentication hook
├── pages/                 # Page components
│   ├── Home.jsx           # Landing page
│   ├── Login.jsx          # User login
│   ├── Register.jsx       # User registration
│   ├── NgoRegister.jsx    # NGO registration
│   ├── Search.jsx         # NGO search
│   ├── Requirements.jsx   # Requirements management
│   ├── Messages.jsx       # Messaging system
│   └── AdminDashboard.jsx # Admin panel
├── redux/                 # Redux store and slices
│   ├── store.js           # Redux store configuration
│   ├── authSlice.js       # Authentication state
│   ├── ngoSlice.js        # NGO state management
│   └── requirementSlice.js # Requirements state
├── styles/                # Custom CSS
│   └── custom.css         # Enhanced styling
├── App.jsx                # Main app component
├── main.jsx               # Entry point
└── config.js              # Configuration constants
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ngo-community-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - Update `src/config.js` with your API endpoints
   - Ensure your backend is running and accessible

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🔧 Configuration

### API Configuration
Update `src/config.js` with your backend API URL:

```javascript
export const API_BASE_URL = 'https://your-api-endpoint.com';
```

### Backend Integration
This frontend is designed to work with the provided Firebase Functions backend. Ensure your backend is deployed and accessible.

## 📱 Features Overview

### 1. User Authentication
- **Login/Register**: Secure user authentication system
- **Role-based Access**: Different permissions for users, NGOs, and admins
- **Session Management**: Persistent login state with localStorage

### 2. NGO Management
- **Registration**: Comprehensive NGO registration form
- **Approval System**: Admin approval workflow for new NGOs
- **Profile Management**: NGO information and status tracking

### 3. Requirements System
- **Post Requirements**: NGOs can post what they need
- **Search & Filter**: Find requirements by category or description
- **Status Tracking**: Monitor requirement fulfillment status

### 4. Search & Discovery
- **Advanced Search**: Filter NGOs by city, category, and name
- **Real-time Results**: Instant search results with filtering
- **Responsive Design**: Works on all device sizes

### 5. Messaging System
- **Direct Communication**: Private messaging between users
- **Conversation Management**: Organized chat interface
- **Real-time Updates**: Instant message delivery

### 6. Admin Dashboard
- **Overview Statistics**: Platform usage metrics
- **NGO Approval**: Review and approve NGO registrations
- **System Monitoring**: Platform health and status

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Modern Interface**: Clean, professional design
- **Accessibility**: WCAG compliant with proper focus management
- **Custom Styling**: Enhanced Bootstrap components with custom CSS
- **Smooth Animations**: CSS transitions and hover effects

## 🔒 Security Features

- **Protected Routes**: Role-based access control
- **Input Validation**: Form validation and sanitization
- **Error Handling**: Comprehensive error management
- **Secure API Calls**: Proper authentication headers

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automatically on push

### Netlify
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Traditional Hosting
1. Run `npm run build`
2. Upload `dist` folder contents to your web server
3. Configure server for SPA routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- **Real-time Notifications**: Push notifications for updates
- **File Upload**: Support for document and image uploads
- **Advanced Analytics**: Detailed reporting and insights
- **Mobile App**: React Native mobile application
- **Multi-language Support**: Internationalization (i18n)
- **Advanced Search**: Elasticsearch integration
- **Payment Integration**: Donation and payment processing

---

**Built with ❤️ using React.js and Bootstrap**
