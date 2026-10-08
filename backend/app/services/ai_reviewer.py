import os

from dotenv import load_dotenv
from groq import Groq


load_dotenv()


GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY is not configured")


client = Groq(
    api_key=GROQ_API_KEY
)


MODEL = "openai/gpt-oss-120b"


def review_code(language: str, code: str) -> str:

    system_prompt = """
You are an expert software engineer and code reviewer.

Your job is to analyze the code provided by the user.

Check the code for:

1. Bugs and correctness issues
2. Security vulnerabilities
3. Time complexity
4. Space complexity
5. Code quality
6. Readability
7. Maintainability
8. Possible improvements

Follow this exact structure:

## Summary

Briefly explain what the code does.

## Bugs

List actual bugs or correctness problems.

If there are no major bugs, write:
"No major bugs found."

## Security

Identify security vulnerabilities.

If there are no major security problems, write:
"No major security issues found."

## Complexity

Time Complexity:
Space Complexity:

Explain why.

## Code Quality

Discuss readability, structure and maintainability.

## Improvements

Give practical improvements.

## Improved Code

Provide an improved version of the code when useful.

Do not invent problems.
If the code is already good, say so.
"""


    user_prompt = f"""
Programming Language:
{language}

Code:

```{language}
{code}
```

Review this code carefully.
"""

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": user_prompt
            }
        ],
        temperature=0.2,
        max_completion_tokens=4000
    )

    return response.choices[0].message.content

