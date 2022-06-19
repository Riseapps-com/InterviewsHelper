# ReactNativeInterviewsHelper

## :information_source: Description

A bunch of scripts on `node.js` aimed at improving the interview process. Could be reused between different departments (only the questions database should be prepared).

## :cat2::rat: It solves next problems

1. Automation of many manual processes;
2. More comprehensive evaluation;
3. Feedback standardization.

## :book: Prepare questions database

Export prepared [questions database](https://riseappsprojects.atlassian.net/l/c/tkXFm84w) as html files and save each page to the `data` folder (path could be configured through [data.json](https://github.com/Riseapps-com/ReactNativeInterviewsHelper/blob/master/src/config/data.json) file).

## :running: How to use it

1. Run `generateQuestions` script:
* Select `interview type` (available options are: `React`, `React-Native`, `Angular`, `Vue.js`, `Node.js`, `React + Node.js`, `React-Native + Node.js`, `Angular + Node.js` and `Vue.js + Node.js`). <img src="https://github.com/Riseapps-com/ReactNativeInterviewsHelper/blob/master/imgs/interviewType.jpg" height="180" />
* Select `interview mode` (available options are: `Department` and `Partnership`).
<img src="https://github.com/Riseapps-com/ReactNativeInterviewsHelper/blob/master/imgs/interviewType.jpg" height="180" />
* Select `candidate supposed level` (available options are: `Junior`, `Junior+`, `Middle-`, `Middle`, `Middle+` and `Senior`).
<img src="https://github.com/Riseapps-com/ReactNativeInterviewsHelper/blob/master/imgs/supposedLevel.jpg" height="180" />
* Select `topics` (options marked with `(*)` are required).
<img src="https://github.com/Riseapps-com/ReactNativeInterviewsHelper/blob/master/imgs/topics.jpg" height="180" />
* Enter `candidate firts name` (just leave it empty if you don't know the required information):
<img src="https://github.com/Riseapps-com/ReactNativeInterviewsHelper/blob/master/imgs/candidateFirstName.jpg" height="180" />
* Enter `candidate last name` (just leave it empty if you don't know the required information):
<img src="https://github.com/Riseapps-com/ReactNativeInterviewsHelper/blob/master/imgs/candidateLastName.jpg" height="180" />
* Enter `candidate email` (just leave it empty if you don't know the required information):
<img src="https://github.com/Riseapps-com/ReactNativeInterviewsHelper/blob/master/imgs/candidateEmail.jpg" height="180" />
* Enter `interviewer first name` (just leave it empty if you don't know the required information):
<img src="https://github.com/Riseapps-com/ReactNativeInterviewsHelper/blob/master/imgs/interviewerFirstName.jpg" height="180" />
* Enter `interviewer last name` (just leave it empty if you don't know the required information):
<img src="https://github.com/Riseapps-com/ReactNativeInterviewsHelper/blob/master/imgs/interviewerLasttName.jpg" height="180" />
* Enter `interviewer email` (just leave it empty if you don't know the required information):
<img src="https://github.com/Riseapps-com/ReactNativeInterviewsHelper/blob/master/imgs/interviewerEmail.jpg" height="180" />
* Enter `interviewer linkedin` (just leave it empty if you don't know the required information):
<img src="https://github.com/Riseapps-com/ReactNativeInterviewsHelper/blob/master/imgs/interviewerLinkedin.jpg" height="180" />
* Enter `interviewer first name` (just leave it empty if you don't know the required information):
<img src="https://github.com/Riseapps-com/ReactNativeInterviewsHelper/blob/master/imgs/interviewerFirstName.jpg" height="180" />
* Decide whether you would like to use `ready-to-use` question sets. In this case, the files with question will be generated with the pre-selected questions in order to save your time. You'll still be able to edit them.
<img src="https://github.com/Riseapps-com/ReactNativeInterviewsHelper/blob/master/imgs/questionSets.jpg" height="180" />

```ts
import { Input } from '../src/types';



2. Run `generateQuestions` script. The next file `outputs/questions.txt` will be generated:

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

3. Mark suitable questions with `"+ "` at the beginning (marker could be configured through `config/config.ts` file):

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

4. Run `generateInterviewPDF` script, and the next files will be generated:

- `outputs/forInterviewer.pdf`:

```txt
Will be used for the interview.
```

- `outputs/resultDraft.txt`:

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

- `outputs/resultNotesDraft.txt`:

```txt
@feedback@
-
@feedback@

@decision@
Recommend / Don't recommend
@decision@
```

5. Fill `outputs/resultDraft.txt` with the marks from `0` to `maxMark` (could be configured through `config/config.ts` file):

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

6. Fill `feedback` and `decision` fields in `outputs/resultDraft.txt` file:

```txt
@feedback@
Good theory.
@feedback@

@decision@
Recommend.
@decision@
```

7. Run `generateResultPDF` script and `outputs/result.pdf` file will be generated.

## :hammer: Scripts

| Script                 | Description                                                                                        |
| :--------------------- | :------------------------------------------------------------------------------------------------- |
| `validateDatabase`     | Validates the questions database. Checks for the correct format for each question in the database. |
| `generateQuestions`    | Generates suitable questions based on the input params and puts them to the .txt file.             |
| `generateInterviewPDF` | Generates a PDF document for the interview and .txt drafts for the result.                         |
| `generateResultPDF`    | Generates a PDF document with the interview result.                                                |

## :bar_chart: Output examples

|             For interviewer:             |         Result:          |
| :--------------------------------------: | :----------------------: |
| [forInterviewer.pdf](forInterviewer.pdf) | [result.pdf](result.pdf) |

## :ledger: TODO

- [ ] Prepare ready questions sets.
- [ ] Send files to email.
