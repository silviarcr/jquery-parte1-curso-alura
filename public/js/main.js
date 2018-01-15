// var frase = jQuery(".frase");  
//O atalho para a função jQuery é representado pelo símbolo $.

var frase = $(".frase").text(); 

var numPalavras = frase.split(" ").length;
var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(numPalavras);

var campo = $(".campo-digitacao");
// campo.on("click", function() {  //atualiza contador quando usuário clica
campo.on("input", function() {     //atualiza contador enquanto o usuário digita
    var conteudo = campo.val();

    // var qtdPalavras = conteudo.split(" ").length; //se apagarmos uma frase, ainda se conta uma 
                                                     //e se dermos vários espaços, conta como se cada espaço fosse uma palavra

    var qtdPalavras = conteudo.split(/\S+/).length - 1; //Regexp -> expressão regular que busca qualquer caractere, 
                                                        //exceto espaço vazio  /\S+/ e a contagem sempre mostra
                                                        // a quantidade de palavras mais uma -> subtrair 1
    $("#contador-palavras").text(qtdPalavras);
        
    var qtdCaracteres = conteudo.length;
    $("#contador-caracteres").text(qtdCaracteres);

});
