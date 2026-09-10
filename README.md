# Sentinel Dashboard (`sentinel-dashboard`)

**SENTINEL HEALTH INTELLIGENCE SYSTEM**  
*Operations Command Console, Geographic Surveillance & Field Analytics*  
**Phase 1 — Core Digital Platform • September 2026**

---

## 1. Overview

`sentinel-dashboard` is the administrative web operations console for the **Sentinel Health Intelligence System (SHIS)**. Built with Next.js 15 (App Router), React 19, and Tailwind CSS, it provides public health officials, epidemiologists, and surveillance officers with:
- Multi-scale Nigerian geographic hierarchy navigation (States, LGAs, Wards).
- Pathogen catalog monitoring (Malaria, Cholera, Acute Respiratory Infection).
- Live surveillance case tracking with state machine lifecycle inspection.
- Point-of-care rapid diagnostic test (RDT) result review with computer-vision verification metrics.
- User management and Role-Based Access Control (RBAC) governance.

---

## 2. Technical Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19, Tailwind CSS
- **Icons**: Lucide React
- **API Integration**: REST client communicating with `sentinel-api`
- **Language**: TypeScript

---

## 3. Getting Started

### 3.1 Local Development
```bash
# Clone repository
git clone https://github.com/Health-Sentinel/sentinel-dashboard.git
cd sentinel-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be accessible at `http://localhost:3000`.

### 3.2 Environment Variables
Create `.env.local`:
```ini
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```
