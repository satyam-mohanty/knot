# Knot - Document Intelligence with Contradiction Detection

Knot is an advanced document analysis tool designed to identify contradictions, risks, and inconsistencies in contracts and other legal documents. Powered by AI, Knot provides a detailed analysis summary, highlights critical and moderate risks, and offers actionable recommendations to improve document integrity.

## Features

- **Document Analysis**: Automatically scans and analyzes contracts for contradictions and risks.
- **Severity Detection**: Categorizes issues into critical, moderate, and low severity levels.
- **Issue Summaries**: Provides detailed descriptions of detected issues, including conflicting clauses and recommendations.
- **Real-Time Feedback**: Displays results dynamically while processing documents.
- **User-Friendly Interface**: Intuitive design for easy navigation and understanding of results.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/knot-document-intelligence.git
   ```
2. Navigate to the project directory:
   ```bash
   cd "Knot - Document Intelligence with Contradiction Detection"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Add your API key:
   - Create a `.env` file in the root directory.
   - Add your API key to the file:
     ```
     API_KEY=your-api-key-here
     ```
   - Replace `your-api-key-here` with your actual API key.

## Usage

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```
3. Upload your document(s) for analysis and view the results.

## Project Structure

- **components/**: Contains reusable React components, such as `AnalysisResults`.
- **types/**: Defines TypeScript types and interfaces used throughout the project.
- **public/**: Static assets like images and icons.
- **styles/**: Global and component-specific styles.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **TypeScript**: Ensures type safety and improves code maintainability.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Lucide Icons**: Icon library for visual elements.
- **Node.js**: Backend runtime for development.

## Contributing

Contributions are welcome! If you'd like to improve this project, please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your commit message"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

