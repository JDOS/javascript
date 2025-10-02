import fs from 'fs';
import trataErros from './erros/functionErros.js';
import { countWords } from './index.js';

const pathFile = process.argv;
const link = pathFile[2];

fs.readFile(link,'utf-8', (erro, text) => {
    try{
        if (erro) throw erro
        countWords(text);
    }catch(erro){
        trataErros(erro)
    }
})