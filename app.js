import fs from "fs";
import PromptSync from "prompt-sync";
import axios from "axios";
const prompt = PromptSync();
const apiKey = "ALOC-9f6b088ca235a639f437";

let fetchQuestion = async (subject = "english", year = 2005) => {
  try {
    let listQuestion = await axios(
      `https://questions.aloc.com.ng/api/v2/m?subject=${subject}&year=${year.toString()}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          AccessToken: apiKey,
        },
        method: "GET",
      }
    );
    let i = 0;

    for (i = 1; i < 40; i++) {
      let { data, subject } = listQuestion.data;

      let question = data[i].question;
      let options = data[i].option;

      let optionString = "";
      Object.keys(options).forEach((key) => {
        optionString += `${key} : ${options[key]} \n`;
      });
      let fullQuestionString = `${i}. ${question} \n ${optionString}\n`;
      let fileName = subject + year + "Question.txt";
      fs.appendFileSync(fileName, fullQuestionString, function (err) {
        if (err) throw err;
      });
    }
    console.log(
      "Fetching complete. A file named " +
        subject +
        year +
        "Question.txt" +
        " has been created in your current directory containing 40 questions"
    );
  } catch (error) {
    console.log(error);
  }
};

let subject = prompt("Enter the subject name: ");
let year = prompt("Enter the year: ");
console.log("Fetching , Please wait ....");
fetchQuestion(subject, year);

// fetchQuestion();
