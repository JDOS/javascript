export function countWords(text){
    const paragraphs = extractParagraph(text);
    const cont = paragraphs
    .flatMap((paragraph) => {
        if(!paragraph) return [];
        return contadorPalavras(paragraph);
    })
    console.log(cont);
}

function extractParagraph(text){
    return text.toLowerCase().split('\n');
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

