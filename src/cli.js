import fs from 'fs';
import path from 'path';
import trataErros from './erros/functionErros.js';
import { countWords } from './index.js';
import { montaSaidaArquivo } from './helpers.js';
import { Command } from 'commander';

const program = new Command();

program
    .version('0.0.1')
    .option('-t, --texto <string>', 'caminho do texto a ser processado')//flags
    .option('-d, --destino <string>', 'caminho da pasta onde salvar o arquivo de resultados')
    .action((options) => {
        const { texto, destino } = options;
        if(!texto || !destino){
            console.error('erro: favor inserir caminho de origem e destino')
            program.help();
            return;
        }

        const caminhoTexto = path.resolve(texto);
        const caminhoDestino = path.resolve(destino);

        try {  
            processaArquivo(caminhoTexto, caminhoDestino);
            console.log("texto processado com sucesso!");
        } catch (erro){
            console.log('Ocorreu um erro no processamento',erro);
        }

    })

program.parse();

function processaArquivo(texto, destino){
    fs.readFile(texto,'utf-8', (erro, text) => {
        try{
            if (erro) throw erro
            const result = countWords(text);
            criaESalvaArquivo(result, destino)
        }catch(erro){
            trataErros(erro)
        }
    })
}



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
    const textoPalavras = montaSaidaArquivo(listaPalavras);


    fs.promises.writeFile(arquivoNovo, textoPalavras)
        .then(() => {
            // processamento feito com o resultado da promessa
            console.log("arquivo criado")
        }).catch((erro) =>{
            throw erro
        })
        .finally(() => console.log('operação finalizada'))

}