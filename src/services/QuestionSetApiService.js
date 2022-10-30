const questionSetEndpoint = "https://localhost:44323/questionlist";
const questionSetNamesEndpoint = questionSetEndpoint + '/'+ 'names';

async function fetchApiEndpoint(url) {

    let payload;

    let response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
             'Content-Type': 'application/json; charset=utf-8'
          }
    });

    await response.json()
    .then((data) => {
        payload = data;
    })
    .catch((ex) => {
        console.log(ex);
    });

    return payload;
}

export const questionSetApiService = {
    getQuestionSet: async(questionSetId) => {
        return await fetchApiEndpoint(questionSetEndpoint + '/' + questionSetId);
    },
    getQuestionSetNames: async() => {
        return await fetchApiEndpoint(questionSetNamesEndpoint)
    }
}