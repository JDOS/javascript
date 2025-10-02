import fs from 'fs';
import trataErros from './erros/functionErros.js';
import { countWords } from './index.js';

const pathFile = process.argv;
const link = pathFile[2];
const path = pathFile[3];

fs.readFile(link,'utf-8', (erro, text) => {
    try{
        if (erro) throw erro
        const result = countWords(text);
        criaESalvaArquivo(result, path)
    }catch(erro){
        trataErros(erro)
    }
})

// async function criaESalvaArquivo(listaPalavras, path){
//     const arquivoNovo = `${path}/resultado.txt`;
//     const textoPalavras = JSON.stringify(listaPalavras);
//     try{
//        await fs.promises.writeFile(arquivoNovo, textoPalavras);
//        console.log("Arquivo criado!")
//     }catch(erro){
//         throw erro;
//     }
// }

function criaESalvaArquivo(listaPalavras, path){
    const arquivoNovo = `${path}/resultado.txt`;
    const textoPalavras = JSON.stringify(listaPalavras);


    fs.promises.writeFile(arquivoNovo, textoPalavras)
        .then(() => {
            // processamento feito com o resultado da promessa
            console.log("arquivo criado")
        }).catch((erro) =>{
            throw erro
        })
        .finally(() => console.log('operação finalizada'))

}