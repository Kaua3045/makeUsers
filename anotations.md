[X] Olhar os produtos e ver se está tudo certo como eu queria
[X] Testar tudo amanhã, as rotas de criar, deletar, criar imagem, deletar imagem, pegar todos os produtos

[] Adicionar o redis
  - [] redis para os users
  - [X] redis para os produtos

[] Criar um middleware para interceptar os erros
  - [] colocar erro customizado para dados invalidos como no exemplo abaiaxo

[] Ver para tratar os erros do id não existente, nome etc na query do banco (https://www.youtube.com/watch?v=hBsIbHCITLk&ab_channel=LuizPedro-Programador)

-  Error uuid not found
```javascript
if (err.code === '22P02') {
    return res.status(400).json({
      message: 'Uuid invalid'
    })
  }
```

[] Talvez futuramente fazer o seguinte, inseri no redis, edita no redis e deleta no redis, ai depois disso, a cada por ex, 1h ele verifica o redis e manda tudo pro banco de dados, por ex, deletou produto x, deleta no banco dai, inseri todos os novos produtos etc, mas parece ser meio complexo, então é um talvez bem longe