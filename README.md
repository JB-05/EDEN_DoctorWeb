# Smart Med Assistant - Doctor Portal

A modern, intuitive web portal for healthcare professionals to monitor patient medication adherence and manage care coordination.

## 🏥 Features

### Core Functionality
- **Patient Dashboard**: Monitor all assigned patients in one place
- **Medication Tracking**: Real-time medication adherence monitoring
- **Symptom Reports**: Review patient-reported symptoms and health status
- **Virtual Meetings**: Schedule and manage telehealth appointments
- **Clinical Notes**: Add and manage patient notes and care plans
- **PDF Reports**: Export comprehensive patient reports

### Key Benefits
- **Real-time Monitoring**: Live updates on patient medication status
- **Smart Alerts**: Automated notifications for missed doses or emergencies
- **Professional UI**: Clean, medical-grade interface designed for healthcare
- **Mobile Responsive**: Access from any device, anywhere
- **Secure**: HIPAA-compliant design with role-based access

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Supabase account and project
- Modern web browser

### Installation

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.local.example .env.local
   ```

3. **Configure Supabase**
   Add your Supabase credentials to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Open Browser**
   Navigate to `http://localhost:3000`

## 🎨 Design System

### Color Palette
- **Medical Blue**: Primary actions and navigation
- **Healthcare Green**: Success states and positive metrics
- **Alert Red**: Urgent notifications and missed medications
- **Neutral Grays**: Text and subtle UI elements

### Typography
- **Headers**: Poppins font family for professional appearance
- **Body**: Inter font family for excellent readability
- **UI Elements**: Carefully sized for accessibility

### Components
- **Medical Cards**: Elevated cards with subtle shadows
- **Status Badges**: Color-coded medication status indicators
- **Interactive Buttons**: Hover states and loading animations
- **Form Elements**: Consistent styling across all inputs

## 🏗️ Architecture

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Lucide Icons**: Consistent iconography

### Backend & Database
- **Supabase**: Authentication and real-time database
- **PostgreSQL**: Robust relational database
- **Row Level Security**: Secure data access

### Key Directories
```
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── lib/                # Utilities and configurations
├── types/              # TypeScript definitions
└── public/             # Static assets
```

## 📊 Data Structure

### Core Entities
- **Patients**: Senior citizens under care
- **Medications**: Prescribed drug regimens
- **Logs**: Medication adherence tracking
- **Reports**: Symptom and health status
- **Meetings**: Virtual appointments
- **Notes**: Clinical observations

## 🔐 Security Features

- **Authentication**: Supabase Auth with role-based access
- **Authorization**: Doctor-only access to assigned patients
- **Data Protection**: Encrypted data transmission
- **Session Management**: Secure session handling

## 🎯 User Experience

### Navigation Flow
1. **Login** → **Dashboard** → **Patient Selection**
2. **Patient Detail** → **Medication Review** → **Actions**
3. **Quick Actions** → **Reports** → **Meeting Scheduling**

### Responsive Design
- **Desktop**: Full-featured dashboard experience
- **Tablet**: Optimized layout for clinical rounds
- **Mobile**: Essential functions for on-the-go access

## 🚀 Getting Started for Development

### Project Structure
The portal is built with modularity and maintainability in mind:

- **Pages**: Located in `app/` directory using App Router
- **Components**: Reusable UI components in `components/`
- **Database**: Supabase integration in `lib/supabase.ts`
- **Types**: TypeScript interfaces in `types/index.ts`

### Development Workflow
1. Start with UI components
2. Integrate with Supabase
3. Test with sample data
4. Add real-time features
5. Deploy to production

## 📱 Mobile Optimization

The portal is fully responsive and optimized for:
- **iPads**: Perfect for clinical rounds
- **Smartphones**: Quick patient status checks
- **Tablets**: Comprehensive patient review

## 🎨 UI/UX Highlights

- **Clean Medical Aesthetic**: Professional healthcare styling
- **Intuitive Navigation**: Logical flow for medical workflows
- **Status Indicators**: Clear visual medication status
- **Quick Actions**: One-click common tasks
- **Data Visualization**: Charts and graphs for trends

---

**Built for Healthcare Professionals** | **Secure & Compliant** | **Modern & Intuitive** 