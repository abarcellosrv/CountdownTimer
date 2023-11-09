# CountdownTimer

Foi um projeto realizado para consolidar os conteúdos estudados durante o treinamento de estágio na empresa e-Core.
Baseado em sugestão de projeto no repositório [App Ideas](https://github.com/florinpop17/app-ideas).


- **Countdown TImer**
  - **Instruções:**
      - Requisitos:
    - **Instalação**
    - **Execução**
    - **Opções**
      - **Adicionar timer** 
      - **Editar timer** 
      - **Remover timer**


## **Instruções:**

#### Requisitos:
 - Node.js versão: `v18.12.1`
 - npm versão: `8.19.2`
 - Java versão: `17`
 - Springboot versão: `3.0.2`
  
### **Instalação**

```bash
npm install
```
- Executar diretório Java em IDE
- Instalar JDK na versão indicada
- Instalar e criar banco de dados postgres e criar db
- Adicionar dados de ambiente na IDE (endereço do db, usuário e senha)

### **Running app**

```bash
npm run countdowntimer
```
- Executar projeto Java
- 
 ### **Funcionalidades**

 1. Adicionar Timer
    Adicionar nome, descrição, data e tempo (opcional) para o evento que gostaria de visualizar a contagem regressiva
 3. Editar Timer
    Clicar em "editar" para alterar os campos
 5. Remover Timer
    Clicar em "remover" para excluir um timer

### **Como funciona**

Esse projeto está estruturado da seguinte forma:
  - Ao criar um evento, é feito uma requisição POST para o backend que adiciona as informações do evento no banco de dados e calcula a diferença de tempo entre a data atual e a data desejada. O formulário valida se a data é futura.
  - A cada segundo o backend refaz o cálculo da diferença de tempo e retorna os valores de segundos, minutos, horas e dias faltantes para o frontend, que o exibe em um card. Isso foi feito dessa forma apenas para estudar como uma API Java trata múltiplas requisições repetidamente.
  - Para cada evento adicionado é exibido um card com os dados do formulário e a contagem regressiva. Essa contagem funciona por meio de uma requisição GET ao backend que envia a data e hora atuais a ser comparada com a data do event.



