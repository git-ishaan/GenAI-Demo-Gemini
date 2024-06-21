import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";
import readlineSync from 'readline-sync';
import ora from 'ora';

// Load environment variables from .env file
config();

const genAi = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAi.getGenerativeModel({
  model: "gemini-1.5-pro",
});

// Ask a question from the user
const userQuestion = readlineSync.question('Please enter your question: ');

// Start the spinner
const spinner = ora('Processing your request...').start();

try {
  const r = await model.generateContent(userQuestion);
  // Stop the spinner when the request is done
  spinner.stop();
  console.log(r.response.text());
} catch (error) {
  // Stop the spinner and show the error if something goes wrong
  spinner.stop();
  console.error(error);
}