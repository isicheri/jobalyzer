const descInput = document.querySelector(".descInput");
const descBtnInput = document.querySelector(".descBtn");
const cInput = document.querySelector(".wapper");

const api_url = "http://localhost:8000/user/upload-description";

const postData = async (url,input) => {
    try {
        const inputData = {
            desc: input,
            _csrf: cInput.value,
        }
        const response  = await fetch(url,{
            method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(inputData)
        })

      if(!response.ok) {
        const errorJson = await response.json();
        throw new Error(errorJson.message || "unknown error");
      }
      const data = await response.json()
      return data;
    } catch (error) {
        return error;
    }
};

descBtnInput.addEventListener("click",async () => {
  console.log("starting...")
    if(descInput.value === "") {
        console.log("input is empty");
        return;
    }
  const res = await postData(api_url,descInput.value);
   if(res instanceof Error) {
    console.log("failed....")
    console.log(res.cause)
    console.log("failed to submit: ",res.message);
      return;
   }
   console.log("response: ",res);
})
