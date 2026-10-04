An AI customer-support bot built for automation-first teams.

Solvio is a prototype support assistant designed for teams that already run their operations on tools like n8n and Make.com. The long-term vision is a bot that doesn't just answer questions but also triggers your existing workflows (create tickets, notify Slack, hand off to a human). This repository contains the working core: a grounded AI chatbot, a live workflow-pipeline visualization, and a waitlist for early users.

How It Works


The user sends a message from the demo page to POST /api/chat.
The server matches the message against a 36-topic knowledge base (fees, interest, late charges, EMI, rewards, UPI on RuPay, billing and more) using keyword matching.
The matched section is injected into a strict system prompt, together with the recent conversation history.
OpenAI generates a concise, cited answer. If the call fails, the stored answer is returned instead.
The response includes the reply, the source section, suggested follow-ups and the pipeline nodes triggered, which drive the animation.
