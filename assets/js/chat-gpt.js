const OPENAI_API_KEY = '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';

export default class ChatGPT {
  constructor() {
    this.key = OPENAI_API_KEY;
  }

  send(textAreaValue) {
    return new Promise((resolve, reject) => {
      let outputWindowValue = '';
      const sQuestion = textAreaValue;

      const httpReq = new XMLHttpRequest();
      httpReq.open('POST', 'https://api.openai.com/v1/chat/completions'); // https://api.openai.com/v1/chat/completions
      httpReq.setRequestHeader('Accept', 'application/json');
      httpReq.setRequestHeader('Content-Type', 'application/json');
      httpReq.setRequestHeader('Authorization', `Bearer ${this.key}`);

      httpReq.onreadystatechange = function () {
        if (httpReq.readyState === 4) {
          // console.log(httpReq.status);
          let oJson = {};
          if (outputWindowValue !== '') outputWindowValue += '\n';

          try {
            oJson = JSON.parse(httpReq.responseText);
          } catch (ex) {
            outputWindowValue += `[Error] ${ex.message}`;
            reject(outputWindowValue);
          }

          if (oJson.error && oJson.error.message) {
            outputWindowValue += `[Error] ${oJson.error.message}`;
            reject(outputWindowValue);
          } else if (oJson.choices && oJson.choices[0].text) {
            let s = oJson.choices[0].text;

            if (s === '') s = 'No response';
            outputWindowValue += s;
            reject(outputWindowValue);
          }
          resolve(outputWindowValue);
        }
      };

      const sModel = 'gpt-3.5-turbo';// "gpt-3.5-turbo";
      const iMaxTokens = 1024;
      const dTemperature = 0.5;

      let sUserId = localStorage.getItem('userId');
      if (!sUserId) {
        sUserId = Math.floor(Math.random() * 1000);
        localStorage.setItem('userId', sUserId);
      }

      const data = {
        model: sModel,
        prompt: sQuestion,
        max_tokens: iMaxTokens,
        user: sUserId,
        temperature: dTemperature,
        frequency_penalty: 0.0, // Number between -2.0 and 2.0
        // Positive values decrease the model's likelihood
        // to repeat the same line verbatim.
        presence_penalty: 0.0, // Number between -2.0 and 2.0.
        // Positive values increase the model's likelihood
        // to talk about new topics.
        stop: ['#', ';'], // Up to 4 sequences where the API will stop
        // generating further tokens. The returned text
        // will not contain the stop sequence.
      };

      httpReq.send(JSON.stringify(data));

      // if (outputWindowValue != '') outputWindowValue += '\n';
      // outputWindowValue += 'Me: ' + sQuestion;
      // textAreaValue = '';
    });
  }
}
