import axios from "axios";

const URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const API_KEY = import.meta.env.VITE_API_KEY

export const generateResume = (
    message: string,
) => {

    return axios.post(URL, JSON.stringify({contents: [{role: "user",parts: [{ text:
                                            message }]}]}),
        {

            headers: {
                "X-goog-api-key": API_KEY,
                "Content-Type": "application/json"
            }
        });
}