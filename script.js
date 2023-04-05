import API_KEY from "./config.js";


document.getElementById('submitbutton').addEventListener("click",callGptApi);



async function callGptApi() {
    const promptInput = document.getElementById("name");
    const prompt = promptInput.value;
    const cl1 = document.getElementById("l1");
    const cl2 = document.getElementById("l2");
    const cl3 = document.getElementById("l3");

    cl1.innerHTML = "Loading...";
    cl2.innerHTML = "Loading...";
    cl3.innerHTML = "Loading...";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_KEY
      },
      body: JSON.stringify({
        "model" :"gpt-3.5-turbo",
        "messages" :[
            {"role": "system", "content": 
            `You are a programming teacher. Provide three projects based on the input and they are going to be different levels (level 1, 2 and 3).
            You must only return result in individual <ul> and should add "|"  after </ul> Only return below information.
            1. Title 
            2. Level
            3. Details
            `
          },
            {"role": "user", "content": prompt},
           
        ],
        "max_tokens": 4000,
        "temperature": 0.5
      })
    });
    const data = await response.json();

    const  sdata = data.choices[0].message.content;
    var sdatas = sdata.split("|");
    var l1=sdatas[0];
    var l2 = sdatas[1];
    var l3 = sdatas[2];

    cl1.innerHTML=l1;
    cl2.innerHTML=l2;
    cl3.innerHTML=l3;




    
    // console.log(data.choices[0].message.content);
    // output.innerHTML = data.choices[0].message.content;
  }
  