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