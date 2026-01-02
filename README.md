# knot

Minimal AI-powered Document Intelligence and Contradiction Detection

---

## ⚙️ Setup & Installation (Start Here)

Follow these steps to run the project locally.

### 1️⃣ Clone this repository

You can fork it first or clone directly:

```sh
git clone https://github.com/satyam-mohanty/knot.git
cd knot
2️⃣ Install dependencies
npm install


or

yarn install

3️⃣ Add your Gemini API Key

Your project includes a utils folder.

Create or replace the file:

.env.local
Inside it, add:

GEMINI_API_KEY=your_real_api_key_here


🔒 Make sure .env.local stays out of GitHub.

4️⃣ Update the AI model for best results

Find the code where Gemini requests are made.
It will look like:

const response = await ai.models.generateContent({ 
  model: "gemini-2.5-flash",
  contents: {
    // your prompt or data
  }
});


Change it to:

model: "gemini-2.5-pro"


Ensure your API key is loaded correctly.

5️⃣ Run the development server
npm run dev


Then open:

http://localhost:3000


Your app should now be running.

🧠 What is knot?

knot is a minimal AI-driven web application that analyzes long policy and contract documents to detect contradictions between clauses. It is designed as a sharp, lightweight MVP suitable for hackathons and early product prototyping.

Users can upload documents, and the system:

Segments text into meaningful clauses

Finds semantically similar clauses

Detects contradictions

Classifies conflict types

Explains the issue in readable language

The goal is to make reviewing dense legal or policy text faster, clearer, and more reliable.

🚀 Core Features

Upload multiple documents

Automatic clause segmentation

Semantic contradiction detection

Classification of conflict types

Severity scoring

Human-readable explanations

Clean review dashboard

🛠 Tech Stack

Frontend: React / Next.js

Backend: Node / API routes

AI: Gemini API

Styling: Tailwind CSS

🧪 How It Works (High Level)

User uploads one or more documents

Text is extracted and split into clauses

Clauses are semantically analyzed

Similar clauses are matched

Logical and numerical contradictions are detected

Findings are displayed with severity and explanation

⚠️ Disclaimer

This tool does not replace legal review. It is intended as a decision-support assistant only.

🛤 Roadmap

PDF export for reports

Role-based access

Better clause scoring

Highlighting inside text

Domain-tuned improvements

🤝 Contributing

Contributions and issues are welcome.