# API de Games
Esta API é utilizada para armazenar dados de jogos no catálogo de uma loja virtual de games. Esta API também contém autenticação utilizando JWT.


# Endpoints

## Get /games

Este endpoint é responsável por listar todos os jogos cadastrados no Banco de Dados.

### Parâmetros

Nenhum

### Respostas

#### Ok ! 200

Caso receba esse resposta, será retornado uma lista com todos os jogos.

Exemplo de resposta:

```
[
    {
        "id": 1,
        "title": "Call of Duty MW",
        "year": 2019,
        "price": 60
    },
    {
        "id": 2,
        "title": "Dying Light",
        "year": 2015,
        "price": 30
    },
    {
        "id": 3,
        "title": "Counter Strike Source",
        "year": 2005,
        "price": 10
    }
]
```

#### Falha na autenticação ! 401

Caso receba essa resposta, significa que ocorreu uma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado.

Exemplo de resposta:
```
{ "err:" "Token inválido!" }
```
---
## Post /autenticacao

Este endpoint é responsável por retornar o token de validação de sessão do usuário logado.

### Parâmetros

- email: E-mail do usuário cadastrado no sistema

- password: Senha do usuário cadastrado no sistema, relacionada a este e-mail

Exemplo de parâmetros:
```
{
    "email": "lucasgostoso123@gmail.com",
    "password": "gostoso123"
}
```

### Respostas

#### Ok ! 200

Caso receba esta resposta, significa que será retornado o token do JWT para acessar endpoints protegidos pela API.

Exemplo de resposta:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJsdWNhc2dvc3Rvc28xMjNAZ21haWwuY29tIiwiaWF0IjoxNjI0MTYwMzM1LCJleHAiOjE2MjQzMzMxMzV9.DrwkLOcLspIACA0tXldb-v0OC_VAUGe5i8T1oxzq7ws"
}
```

#### Falha na autenticação ! 401

Caso receba essa resposta, significa que ocorreu uma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado.

Exemplo de resposta:
```
{ "err:" "Credenciais inválidas!" }
```