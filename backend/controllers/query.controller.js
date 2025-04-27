import mongoose from "mongoose";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv"

const ai = new GoogleGenerativeAI(process.env.API_KEY)
const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" })

function convertToJSON(responseString) {
    try {
        const jsonString = responseString.match(/```json\n([\s\S]*)\n```/)?.[1];
        if (!jsonString) {
            console.error("Could not extract JSON from response.");
            console.error("Full Response:", responseString);
            return null;
        }
        const sanitizedJson = jsonString.trim();
        return JSON.parse(sanitizedJson);
    } catch (error) {
        console.error("Error converting to JSON:", error);
        return null;
    }
}

const chat = async (req, res) => {
    try {
        const { text } = req.body;
        const prompt = 'Give 15 questions from the topic ' + text + ' ranging from beginning, intermediate and advanced. Provide questions with choices and provide a list of correct answers in the format '
            + "{{question(number):Question,Choices:{choice1,choice2,choice3,choice4},correct:correct_answer_number},}";
            const result = await model.generateContent(prompt);
            const response = result.response;
            const completion = await response.text(); // Fix: Await response.text()
    
            const jsontext = convertToJSON(completion);
            if (completion != null) {
            res.json({
                status: 200,
                data: jsontext
            });
        } else {
            res.json({
                status: 404,
                data: "Internal error"
            })
        }
    } catch (err) {
        res.json({
            status: 500,
            data: err.message
        })
    }
}

const correctAnswers = async (req, res) => {
    try {
        const { questions } = req.body
        const { answers } = req.body
        let level = 0;
        for (let index = 0; index < answers.length; index++) {
            const answer = answers[index];
            const correctAnswer = questions[index].correct
            if (answer == correctAnswer) level++;
        }
        const ret = { "score": level, "pace": null }
        if (level >= 11) {
            ret.pace = "fast"
            res.json({
                status: 200,
                message: ret
            })
        }
        else if (level >= 7) {
            ret.pace = "medium"
            res.json({
                status: 200,
                message: ret
            })
        }
        else if (level >= 0) {
            ret.pace = "slow"
            res.json({
                status: 200,
                message: ret
            })
        } else {
            res.json({
                status: 400,
                message: "Something is wrong with the input forms"
            })
        }
    } catch (err) {
        res.json({
            status: 500,
            message: err.message
        })
    }
}

export default { chat, correctAnswers }