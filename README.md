# ReactNativeInterviewsHelper

## :information_source: Description:

A bunch of scripts on node.js aimed at improving the interview process. Could be reused between different departments (only the questions database should be prepared).

## :cat2::rat: It solves next problems:

1. Automation of many manual processes;
2. More comprehensive evaluation;
3. Feedback standardization.

## :running: How to use it:

1. Fill **config/input.json** file:

```json
{
  "role": "middle-",
  "includedTopics": ["javascript", "typescript"],
  "candidate": {
    "firstname": "Dmitry",
    "lastname": "Usik"
  }
}
```

2. Run **findQuestions** script. The next file **output/questions.txt** will be generated:

```txt
@topic@JavaScript@topic@ ≈7 questions
1. What is hoisting? (timeForAnswer: 3 min) (requiredFor: junior+) (key: @questionKey@j1@questionKey@)
2. What is scope? (timeForAnswer: 3 min) (requiredFor: junior+) (key: @questionKey@j2@questionKey@)
3. What are closures? (timeForAnswer: 3 min) (requiredFor: junior+) (key: @questionKey@j3@questionKey@)
@topic@TypeScript@topic@ ≈4 questions
1. What are the benefits of using TypeScript? (timeForAnswer: 3 min) (requiredFor: middle-) (key: @questionKey@t1@questionKey@)
2. What is “tsconfig.json” file? (timeForAnswer: 2 min) (requiredFor: middle-) (key: @questionKey@t3@questionKey@)
3. What is static typing in TypeScript? (timeForAnswer: 2 min) (requiredFor: middle-) (key: @questionKey@t5@questionKey@)
```

3. Mark suitable questions with **"+ "** at the beginning (marker could be configured through **config/config.json** file):

```txt
@topic@JavaScript@topic@ ≈7 questions
+ 1. What is hoisting? (timeForAnswer: 3 min) (requiredFor: junior+) (key: @questionKey@j1@questionKey@)
2. What is scope? (timeForAnswer: 3 min) (requiredFor: junior+) (key: @questionKey@j2@questionKey@)
+ 3. What are closures? (timeForAnswer: 3 min) (requiredFor: junior+) (key: @questionKey@j3@questionKey@)
@topic@TypeScript@topic@ ≈4 questions
+ 1. What are the benefits of using TypeScript? (timeForAnswer: 3 min) (requiredFor: middle-) (key: @questionKey@t1@questionKey@)
+ 2. What is “tsconfig.json” file? (timeForAnswer: 2 min) (requiredFor: middle-) (key: @questionKey@t3@questionKey@)
3. What is static typing in TypeScript? (timeForAnswer: 2 min) (requiredFor: middle-) (key: @questionKey@t5@questionKey@)
```

4. Run **generateInterviewPDF** script, and the next files will be generated:

- **outputs/forInterviewer.pdf**:

```txt
Will be used for the interview.
```

- **outputs/resultDraft.txt**:

```txt
@topic@JavaScript@topic@
1)
2)
3)
4)
5)
@topic@TypeScript@topic@
1)
2)
3)
4)
5)
```

- **outputs/resultNotesDraft.txt**:

```txt
@notes@
-
@notes@

@recommend@
Yes / No
@recommend@
```

5. Fill **outputs/resultDraft.txt** with the marks from **0** to **maxMark** (could be configured through **config/config.json** file):

```txt
@topic@JavaScript@topic@
1) 5
2) 4
3) 3
4) 2
5) 1
@topic@TypeScript@topic@
1) 5
2) 5
3) 5
4) 5
5) 5
```

6. Fill **notes** and **recommend** fields in **outputs/resultDraft.txt** file:

```txt
@notes@
Good theory.
@notes@

@recommend@
Yes
@recommend@
```

7. Run **generateResultPDF** script and **outputs/result.pdf** file will be generated.

## :hammer: Scripts:

| Script                 | Description                                                                                        |
| :--------------------- | :------------------------------------------------------------------------------------------------- |
| _validateQuestionsDB_  | Validates the questions database. Checks for the correct format for each question in the database. |
| _findQuestions_        | Finds suitable questions based on the input params and puts them to the .txt file.                 |
| _generateInterviewPDF_ | Generates a PDF document for the interview and .txt drafts for the result.                         |
| _generateResultPDF_    | Generates a PDF document with the interview result.                                                |

## :pencil: Input:

Example:

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

Allowed values for the role:

```typescript
type Role = 'junior' | 'junior+' | 'middle-' | 'middle' | 'middle+' | 'senior';
```

## :pencil: Config:

Example:

```json
{
  "notValidQuestionsFilename": "notValidQuestions.txt",
  "questionsFilename": "questions.txt",
  "pieChartFilename": "pieChart.png",
  "radarChartFilename": "radarChart.png",
  "forInterviewerFilename": "forInterviewer.pdf",
  "resultDraftFilename": "resultDraft.txt",
  "resultNotesDraftFilename": "resultNotesDraft.txt",
  "resultFilename": "result.pdf",
  "suitableQuestionMarker": "+ ",
  "pieChart": {
    "width": 700,
    "dataColors": [
      "rgb(254,74,73)",
      "rgb(42,183,202)",
      "rgb(254,215,102)",
      "rgb(246,171,182)",
      "rgb(0,91,150)",
      "rgb(123,192,67)",
      "rgb(243,119,54)",
      "rgb(79,55,45)",
      "rgb(255,119,170)",
      "rgb(74,78,77)"
    ],
    "fontColor": "rgb(74,78,77)",
    "fontSize": 12,
    "fontStyle": "bold",
    "centerFontSize": 32,
    "dataFontColor": "rgb(255, 255, 255)"
  },
  "radarChart": {
    "width": 700,
    "datasetColor": "rgb(0, 54, 167)",
    "datasetBackgroundColor": "rgba(0, 54, 167, 0.3)",
    "fontSize": 10,
    "fontColor": "rgb(74,78,77)",
    "fontStyle": "bold",
    "legendFontSize": 14,
    "gridColor": "rgb(187, 187, 187)",
    "ticksBackgroundColor": "rgba(255, 255, 255, 0.1)"
  },
  "pdfDocument": {
    "creator": "Dmitry Usik",
    "author": "Dmitry Usik",
    "verticalMargin": 64,
    "horizontalMargin": 48,
    "logoWidth": 80,
    "logoMargin": 24
  },
  "maxMark": 5,
  "topicKey": "@topic@",
  "notesKey": "@notes@",
  "recommendKey": "@recommend@",
  "questionKey": "@questionKey@",
  "evaluation": {
    "1": "Doesn't have theoretical and practical skills in this area.",
    "2": "Has superficial theoretical or practical skills in this area.",
    "3": "Has enough practice and superficial theoretical skills in this area.",
    "4": "Has good theoretical and practice skills in this area.",
    "5": "Has excellent theoretical and practice skills in this area."
  }
}
```

## :bar_chart: Output examples:

|                     For interviewer:                     |                 Result:                  |
| :------------------------------------------------------: | :--------------------------------------: |
| [forInterviewer_example.pdf](forInterviewer_example.pdf) | [result_example.pdf](result_example.pdf) |
|             ![](forInterviewer_preview.png)              |         ![](result_preview.png)          |

## :ledger: TODO:

- [ ] Ability to add a new question to the specific position.
- [ ] Prepare ready questions sets.
- [ ] Ability to find most suitable questions.
- [ ] Send files to email.
