import API_KEY from "./config.js";


document.getElementById('submitbutton').addEventListener("click",callGptApi);


function test(){
    alert("hi");
}

async function callGptApi() {
    const promptInput = document.getElementById("name");
    const prompt = promptInput.value;
    const output = document.getElementById("output");
    output.innerHTML = "Loading...";
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_KEY
      },
      body: JSON.stringify({
        "model" :"gpt-3.5-turbo",
        "messages" :[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
           
        ],
        "max_tokens": 4000,
        "temperature": 0.5
      })
    });
    const data = await response.json();
    // console.log(data.choices[0].message.content)
    output.innerHTML = data.choices[0].message.content;
  }
  