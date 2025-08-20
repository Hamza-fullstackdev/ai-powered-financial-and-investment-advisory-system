<p align="center">
  <img src="/public/logo.png" alt="Company Logo" width="500"/>
</p>

---

# **AI-Powered Financial & Investment Advisory System**  

The AI-Powered Financial & Investment Advisory System is an innovative platform that leverages artificial intelligence to provide personalized investment insights, risk assessments, and financial planning strategies. By analyzing real-time market data, economic trends, and user preferences, the system delivers data-driven recommendations to help users optimize their investment decisions. Whether for beginners or experienced investors, this AI-driven solution ensures informed and strategic financial planning.

---

## **Table of Contents**  
1. [About the Project](#about-the-project)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Installation](#installation)  
5. [Folder Structure](#folder-structure)  
6. [Contributors](#contributors)  
7. [License](#license)  

---

## **About the Project**  
To develop an AI-powered advisory system that provides intelligent investment strategies, real-time risk analysis, and automated financial insights, helping users make data-driven investment decisions.  

Traditional financial advisory services often lack personalization, require high fees, and rely on manual assessments, making investment planning inefficient. Many investors struggle with market volatility, complex financial data, and limited access to expert advice. This project aims to solve these issues by utilizing AI for data-driven market analysis, automated financial planning, and personalized investment recommendations.

---

## **Features**    
- **User Portfolio Tracker:** Sign up, log in, and manage a personalized investment portfolio with real-time performance updates.  
- **AI-Based Financial Advice (via AI Modal):** Receive tailored financial guidance and investment recommendations based on your goals and risk profile.  
- **Risk Profile Assessment:** Complete an AI-driven risk assessment to better understand your risk tolerance and get personalized investment strategies.  
- **Goal-Based Planning:** Set and track financial goals such as retirement savings, wealth accumulation, or major purchases with AI-powered planning tools. 
- **Financial Health Score:** Get a personalized score based on your income, expenses, savings, debt, and investments — helping you understand and improve your overall financial well-being.
- **Investment Suggestions (AI Insights):** Get dynamic investment suggestions, rebalancing advice, and asset allocation tips based on market trends and your personal preferences.  
- **News & Alerts Section:** Stay informed with the latest financial news, market alerts, and AI-curated updates relevant to your investments..
- **Chat with AI Advisor:** Engage in real-time conversations with an AI financial advisor to get instant answers to investment questions and strategic advice.

---

## **Tech Stack**
- **Programing Languages:** Typescript
- **Framework:** Next.js, Tailwind Css, ShadCN, Redux Toolkit    
- **Database:** MongoDB, Firebase 
- **Cloud Storage:** Supabase (for image uploads)  
- **AI Modal:** Trained LLM
- **Authentication:** JSON Web Tokens (JWT), bcrypt  

---

## **Installation**  
Follow these steps to set up the project locally:

1. Clone the repository:  
   ```bash  
   git clone https://github.com/Hamza-fullstackdev/ai-powered-financial-and-investment-advisory-system.git  
   cd ai-powered-financial-and-investment-advisory-system 
   ```  

2. Install dependencies:  
   ```bash  
   npm install  
   ```  

3. Set up environment variables:  
   - Create a `.env` file in the `root` directory.  
   - Add the following variables:  
     ```env  
     MONGODB_URI=your-mongodb-url
     DATABASE=mongodb-database-name
     SALT_ROUNDS=salt-rounds-int
     JWT_SECRET_KEY=your-jwt-key
     FINANCIAL_LLM_API_KEY=LLM-api-key
     FINANCIAL_LLM_MODEL=model-name
     NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-URL
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anion-key
     NEXT_PUBLIC_GET_NEWS_API=your-news-api-key
     NEXT_PUBLIC_GET_NEWS_HOSTNAME=your-news-api-hostname 
     ```  

4. Start the application:  
   ```bash  
   # Start the project  
   npm run dev  
   ```  
---

## **Folder Structure**  
```plaintext
ai-powered-financial-and-investment-advisory-system/
├── .vscode/
├── app/
│   ├── page.tsx
│   └── (other routes)
├── components/
│   └── ui/
├── hooks/
├── lib/
├── public/
│   └── (static assets)
├── middleware.ts
├── .env.local
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
├── .gitignore
├── .prettierrc
├── components.json
├── README.md
```

---

## **Contributors**  
- **Hamza Ilyas:** (https://github.com/Hamza-fullstackdev)

---

## **License**  
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.  

---
