import express from 'express'
import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config()

const grammarRoute = express.Router()
const client = new OpenAI({apiKey: process.env.GRAMMAR_KEY})

grammarRoute.post('/grammarcheck', async (req, res) => {
    const {text} = req.body

    if (!text.trim()) {
        res.status(400).json({success: false, message: 'No text provided'})
    }
    try {
    // Ask the model to return only corrected text
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // choose model you have access to
      messages: [
        {
            role: "system",
            content: `You are a multilingual grammar correction assistant.
              Detect whether the text is in English or Vietnamese.
              Identify and correct grammar, punctuation, and phrasing errors.
              Respond using the same language as the input text.
              Format your response in **three sections** as follows, with each title centered and bold:
              
              **Văn bản sau khi sửa**
              [Provide the corrected text here]

              **Lỗi sai**
              [List all errors detected in the input, showing the original mistake and its correction]

              **Đề xuất cải thiện**
              [Provide short and clear suggestions for improving style, tone, or phrasing]`
        },
        {
            role: "user",
            content: `Please check this text and return the corrected version and list of errors:\n\n${text}`
        }
        ],
      max_tokens: 1500
    });

    const corrected = completion.choices?.[0]?.message?.content ?? "";
    res.json({ success: true, correction: corrected });
    } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({success: false, message: "AI service error" });
  }
});

export default grammarRoute