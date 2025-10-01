const fs = require('fs');

const pathFile = process.argv;
const link = pathFile[2];

fs.readFile(link,'utf-8', (erro, texto) => {
    console.log(texto);
    splitParagraph(texto);
    //contadorPalavras(texto);

})

function splitParagraph(texto){
    const paragraphs = texto.toLowerCase().split('\n');

    const cont = paragraphs
    .flatMap((paragraph) => {
        if(!paragraph) return [];
        return contadorPalavras(paragraph);
    })


    console.log(cont);
}

function cleanWords(word){
    return word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
}

function contadorPalavras(texto){
    const listWords = texto.split(' ');
    const result = {}

    listWords.forEach(word => {
        if(word.length >= 3){
            const cleaningWord = cleanWords(word);
            result[cleaningWord] = (result[cleaningWord] || 0) + 1
        }

    })
    return result;
}