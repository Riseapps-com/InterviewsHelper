# ReactNativeInterviewsHelper

## Description:

## It solves next problems:
1) 
2)
3)
4)
5)

## How to use it:

## :hammer: Scripts:
| Script | Description |
| :--- | :--- |
| validateQuestionsDB | Validates the questions database. Checks for the correct format for each question in the database. |
| findQuestions | Finds suitable questions based on the input params and puts them to the .txt file. |
| generateInterviewPDF | Generates a PDF document for the interview and .txt drafts for the result. | 
| generateResultPDF | Generates a PDF document with the interview result. |

## Input:
```json
{
    "role": "middle-",
    "includedTopics": [
        "javascript",
        "typescript",
        "react.redux",
        "reactNative",
        "nativePlatforms",
        "communicationSkills",
        "testTasks"
    ],
    "candidate": {
        "firstname": "Dmitry",
        "lastname": "Usik"
    }
}
```
```typescript
type Input = {
    role: Role
    includedTopics: string[]
    candidate: Candidate
}
type Candidate = {
    firstname: string
    lastname: string
}
type Role = 'trainee' | 'junior' | 'junior+' | 'middle-' | 'middle' | 'middle+' | 'senior'
```

## Config:

## Output examples:
