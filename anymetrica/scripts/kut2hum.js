/* @flow */
const { exec } = require('child_process');

const mystemify = (input, generateAll = false) => new Promise((resolve, reject) => {
  exec(
    `echo "${input}" | ./DATA/utils/mystem-3-macos ${generateAll ? '--generate-all' : ''} --format json -nig`,
    (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        const lines = stdout.split('\n').filter(x => !!x.trim()).map(x => JSON.parse(x));
        const result = {};
        lines.forEach(({ text, analysis }) => {
          result[text] = analysis;
        });
        resolve(result);
      }
    });
});


mystemify('жопотные жопотульки')
  .then(res => console.log(JSON.stringify(res, null, 2)))
  .catch(console.error());


const EXAMPLE = `Word embedding is the collective name for a set of language modeling and feature learning techniques in natural language processing (NLP) where words or phrases from the vocabulary are mapped to vectors of real numbers. Conceptually it involves a mathematical embedding from a space with one dimension per word to a continuous vector space with a much lower dimension.
Methods to generate this mapping include neural networks, dimensionality reduction on the word co-occurrence matrix, probabilistic models, explainable knowledge base method, and explicit representation in terms of the context in which words appear.
Word and phrase embeddings, when used as the underlying input representation, have been shown to boost the performance in NLP tasks such as syntactic parsing and sentiment analysis.`;
