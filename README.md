# InterviewsHelper

## ℹ️ Description

A bunch of scripts on `node.js` aimed at improving the interview process. Can be reused between different departments (only the questions database should be prepared).

## 🧐 It solves next problems

1. Automation of many manual processes.
2. A More comprehensive evaluation.
3. Feedback standardization.

## 📖 Prepare questions database

Export prepared [questions database](https://riseappsprojects.atlassian.net/l/c/tkXFm84w) as HTML files and save each page to the `data` folder (path could be configured through [data.json](https://github.com/Riseapps-com/ReactNativeInterviewsHelper/blob/master/src/config/data.json) file).

## 🧠 Interview format

The interview system supports 2 modes by default: `Department` and `Partnership`. Default durations are: `Department mode - 55 min` and `Partnership mode - 25 min`. In the case of the `Partnership` mode, it's enough to conduct a superficial interview. Usually, the main technical interview with the customer is the next step. So, it's important to double-check if everything is good with the candidate before the main technical interview. In the case of the `Department` mode, the interview must be deeper. The full responsibility for the candidate is on the interviewer. That's why the duration is longer. Moving forward, each interview contains 2 stages: `theory` and `practice`. For the practice part, the amazing resource [https://edabit.com/](edabit) is used. In the case of the `Partnership` mode, the candidate should just describe the possible solution for the provided task in order not to waste the time. In the case of the `Department` mode, the candidate should share his screen and resolve the task in real-time.

## 🏃 How to use it

1. Run `generateQuestions` script. The next file `outputs/output-${firstName}-${lastName}/questions.txt` will be generated:

| Step | Visualization |
| ---- | ------------- |
| Select `interview type` (available options are: `React`, `React-Native`, `Angular`, `Vue.js`, `Node.js`, `React + Node.js`, `React-Native + Node.js`, `Angular + Node.js` and `Vue.js + Node.js`). | <img src="https://github.com/Riseapps-com/ReactNativeInterviewsHelper/blob/master/imgs/interviewType.png" width="1024" /> |
| Select `interview mode` (available options are: `Department` and `Partnership`). | <img src="https://github.com/Riseapps-com/ReactNativeInterviewsHelper/blob/master/imgs/interviewMode.png" width="1024" /> |
| Select `candidate supposed level` (available options are: `Junior`, `Junior+`, `Middle-`, `Middle`, `Middle+` and `Senior`). | <img src="https://github.com/Riseapps-com/ReactNativeInterviewsHelper/blob/master/imgs/supposedLevel.png" width="1024" /> |
| Select `topics` (options marked with `(*)` are required). | <img src="https://github.com/Riseapps-com/ReactNativeInterviewsHelper/blob/master/imgs/topics.png" width="1024" /> |
| Enter `candidate firts name` (just leave it empty if you don't know the required information). | <img src="https://github.com/Riseapps-com/ReactNativeInterviewsHelper/blob/master/imgs/candidateFirstName.png" width="1024" /> |
| Enter `candidate last name` (just leave it empty if you don't know the required information). | <img src="https://github.com/Riseapps-com/ReactNativeInterviewsHelper/blob/master/imgs/candidateLastName.png" width="1024" /> |
| Enter `candidate email` (just leave it empty if you don't know the required information). | <img src="https://github.com/Riseapps-com/ReactNativeInterviewsHelper/blob/master/imgs/candidateEmail.png" width="1024" /> |
| Enter `interviewer first name` (just leave it empty if you don't know the required information). | <img src="https://github.com/Riseapps-com/ReactNativeInterviewsHelper/blob/master/imgs/interviewerFirstName.png" width="1024" /> |
| Enter `interviewer last name` (just leave it empty if you don't know the required information). | <img src="https://github.com/Riseapps-com/ReactNativeInterviewsHelper/blob/master/imgs/interviewerLastName.png" width="1024" /> |
| Enter `interviewer email` (just leave it empty if you don't know the required information). | <img src="https://github.com/Riseapps-com/ReactNativeInterviewsHelper/blob/master/imgs/interviewerEmail.png" width="1024" /> | 
| Enter `interviewer linkedin` (just leave it empty if you don't know the required information). | <img src="https://github.com/Riseapps-com/ReactNativeInterviewsHelper/blob/master/imgs/interviewerLinkedin.png" width="1024" /> | 
| Decide whether you would like to use `ready-to-use` question sets. In this case, the files with questions will be generated with the pre-selected questions in order to save your time. You'll still be able to edit them. | <img src="https://github.com/Riseapps-com/ReactNativeInterviewsHelper/blob/master/imgs/questionSets.png" width="1024" /> |

2. Check out the generated questions:

```txt
@topic@JavaScript@topic@ ≈7 questions
1.  What is hoisting? (requiredFor: junior) (key: @questionKey@js1@questionKey@)
2.  What is a scope? (requiredFor: junior) (key: @questionKey@js2@questionKey@)
3.  What are closures? (requiredFor: junior) (key: @questionKey@js3@questionKey@)
@topic@TypeScript@topic@ ≈3 questions
1.  What are the benefits and drawbacks of using TypeScript? (requiredFor: middle-) (key: @questionKey@ts1@questionKey@)
2.  What is the tsconfig.json file? (requiredFor: middle) (key: @questionKey@ts2@questionKey@)
3.  What are the components of TypeScript? (requiredFor: middle) (key: @questionKey@ts3@questionKey@)
```

3. Mark the suitable questions with `'+ '` at the beginning:

```txt
@topic@JavaScript@topic@ ≈7 questions
+ 1.  What is hoisting? (requiredFor: junior) (key: @questionKey@js1@questionKey@)
+ 2.  What is a scope? (requiredFor: junior) (key: @questionKey@js2@questionKey@)
3.  What are closures? (requiredFor: junior) (key: @questionKey@js3@questionKey@)
@topic@TypeScript@topic@ ≈3 questions
+ 1.  What are the benefits and drawbacks of using TypeScript? (requiredFor: middle-) (key: @questionKey@ts1@questionKey@)
2.  What is the tsconfig.json file? (requiredFor: middle) (key: @questionKey@ts2@questionKey@)
3.  What are the components of TypeScript? (requiredFor: middle) (key: @questionKey@ts3@questionKey@)
```

4. Run `generateInterviewPDF` script, and the next files will be generated:

- `outputs/output-${firstName}-${lastName}/forInterviewer.pdf`:

```txt
Will be used for the interview.
```

- `outputs/output-${firstName}-${lastName}/resultDraft.txt`:

```txt
@topic@JavaScript@topic@
1)
2)
3)
@topic@TypeScript@topic@
1)
2)
3)
```

- `outputs/output-${firstName}-${lastName}/resultNotesDraft.txt`:

```txt
@englishLevel@
Fluency: 0/3
Accuracy: 0/3
Coherence: 0/3
Range: 0/3
Pronunciation: 0/3
@englishLevel@

@softwareSkills@
-
@softwareSkills@

@technicalSkills@
-
@technicalSkills@

@supposedLevel@
-
@supposedLevel@

@recommend@
Yes / No
@recommend@
```

5. Fill `resultDraft.txt` file in:

```txt
@topic@JavaScript@topic@
1) 3
2) 5
3) 4
@topic@TypeScript@topic@
1) 2
2) 5
3) 3
```

6. Fill `resultDraft.txt` file in:

```txt
@englishLevel@
Fluency: 3/3
Accuracy: 2/3
Coherence: 1/3
Range: 3/3
Pronunciation: 3/3
@englishLevel@

@softwareSkills@
Pleasant in communicationю
@softwareSkills@

@technicalSkills@
Good theory and practical skills.
@technicalSkills@

@supposedLevel@
middle+
@supposedLevel@

@recommend@
Yes
@recommend@
```

7. Run `generateResultPDF` script and `outputs/output-${firstName}-${lastName}/result.pdf` file will be generated.

## 🔨 Scripts

| Script                 | Description                                                                                        |
| :--------------------- | :------------------------------------------------------------------------------------------------- |
| `validateDatabase`     | Validates the questions database. Checks for the correct format for each question in the database. |
| `generateQuestions`    | Generates suitable questions based on the input params and puts them to the .txt file.             |
| `generateInterviewPDF` | Generates a PDF document for the interview and .txt drafts for the result.                         |
| `generateResultPDF`    | Generates a PDF document with the interview result.                                                |

## 📊 Output examples

|             For interviewer:             |         Result:          |
| :--------------------------------------: | :----------------------: |
| [forInterviewer.pdf](forInterviewer.pdf) | [result.pdf](result.pdf) |

## 📒 TODO

- [ ] Finish ready-to-use question sets.
- [ ] Send files to `Slack`.
