# ReactNativeInterviewsHelper

## :information_source: Description

A bunch of scripts on node.js aimed at improving the interview process. Could be reused between different departments (only the questions database should be prepared).

## :cat2::rat: It solves next problems

1. Automation of many manual processes;
2. More comprehensive evaluation;
3. Feedback standardization.

## :book: Prepare questions database

Export prepared [questions database](https://riseappsprojects.atlassian.net/l/c/ALXyNnsB) as html file and save it as **data/questionsDB.html** (path could be configured through **config/config.json** file).

## :running: How to use it

1. Fill **config/input.json** file:

```json
{
  "supposedLevel": "middle+",
  "includedTopics": [
    "javaScript",
    "react.basics",
    "react.redux",
    "react.hooks",
    "react.advanced",
    "reactNative",
    "nativePlatforms.ios",
    "nativePlatforms.android",
    "dataStructuresAndAlgorithms",
    "communicationSkills",
    "testTasks"
  ],
  "interviewee": {
    "firstname": "Ivan",
    "lastname": "Ivanov",
    "email": "i.ivanov@mail.com"
  },
  "interviewer": {
    "firstname": "Dmitry",
    "lastname": "Usik",
    "email": "d.usik@riseapps.biz"
  }
}
```

2. Run **generateQuestions** script. The next file **output/questions.txt** will be generated:

```txt
@topic@JavaScript@topic@ ≈7 questions
1. What is hoisting? (timeForAnswer: 3 min) (requiredFor: junior+) (key: @questionKey@j1@questionKey@)
2. What is scope? (timeForAnswer: 3 min) (requiredFor: junior+) (key: @questionKey@j2@questionKey@)
3. What are closures? (timeForAnswer: 3 min) (requiredFor: junior+) (key: @questionKey@j3@questionKey@)
@topic@TypeScript@topic@ ≈4 questions
1. What are the benefits of using TypeScript? (timeForAnswer: 3 min) (requiredFor: middle-) (key: @questionKey@t1@questionKey@)
2. What is tsconfig.json file? (timeForAnswer: 2 min) (requiredFor: middle-) (key: @questionKey@t3@questionKey@)
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
+ 2. What is tsconfig.json file? (timeForAnswer: 2 min) (requiredFor: middle-) (key: @questionKey@t3@questionKey@)
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

## :hammer: Scripts

| Script                 | Description                                                                                        |
| :--------------------- | :------------------------------------------------------------------------------------------------- |
| _validateQuestionsDB_  | Validates the questions database. Checks for the correct format for each question in the database. |
| _generateQuestions_    | Generates suitable questions based on the input params and puts them to the .txt file.             |
| _generateInterviewPDF_ | Generates a PDF document for the interview and .txt drafts for the result.                         |
| _generateResultPDF_    | Generates a PDF document with the interview result.                                                |

## :pencil: Input

Example:

```json
{
  "supposedLevel": "middle+",
  "includedTopics": [
    "javaScript",
    "react.basics",
    "react.redux",
    "react.hooks",
    "react.advanced",
    "reactNative",
    "nativePlatforms.ios",
    "nativePlatforms.android",
    "dataStructuresAndAlgorithms",
    "communicationSkills",
    "testTasks"
  ],
  "interviewee": {
    "firstname": "Ivan",
    "lastname": "Ivanov",
    "email": "i.ivanov@mail.com"
  },
  "interviewer": {
    "firstname": "Dmitry",
    "lastname": "Usik",
    "email": "d.usik@riseapps.biz"
  }
}
```

Allowed values for the level:

```typescript
type Level = 'junior' | 'junior+' | 'middle-' | 'middle' | 'middle+' | 'senior';
```

## :pencil: Config

Example:

```json
{
  "questionsDatabasePath": "data/questionsDB.html",
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
    "riseappsLogoPath": "assets/images/riseappsLogo.png",
    "logoWidth": 80,
    "logoMargin": 24,
    "regularFont": "Times-Roman",
    "foreignFontPath": "assets/fonts/NotoSans-Regular.ttf",
    "regularForeignFont": "NotoSans-Regular",
    "boldFont": "Times-Bold",
    "smallerFontSize": 12,
    "baseFontSize": 14,
    "biggerFontSize": 16
  },
  "topicKey": "@topic@",
  "notesKey": "@notes@",
  "recommendKey": "@recommend@",
  "questionKey": "@questionKey@",
  "maxMark": 5,
  "evaluation": {
    "1": "Doesn't have theoretical and practical skills in this area.",
    "2": "Has superficial theoretical or practical skills in this area.",
    "3": "Has enough practice and superficial theoretical skills in this area.",
    "4": "Has good theoretical and practice skills in this area.",
    "5": "Has excellent theoretical and practice skills in this area."
  }
}
```

## :bar_chart: Output examples

|                     For interviewer:                     |                 Result:                  |
| :------------------------------------------------------: | :--------------------------------------: |
| [forInterviewer_example.pdf](forInterviewer_example.pdf) | [result_example.pdf](result_example.pdf) |
|             ![](forInterviewer_preview.png)              |         ![](result_preview.png)          |

## :ledger: TODO

- [ ] Prepare ready questions sets.
- [ ] Send files to email.
