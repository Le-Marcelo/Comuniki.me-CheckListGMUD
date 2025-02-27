# Comuniki.me-CheckListGMUD

Projeto de um site voltado ao checklist pós atividade de GMUDs realizadas na Comuniki.me

## Descrição

Site feito com a ideia de padronizar os arquivos de pós atividade e ao mesmo tempo garantindo a eficiência das validações realizadas.

## Informações básicas

### Estrutura de Pastas

````
├── css
│  ├── footer.css  
│  ├── header.css
│  ├── main.css
│  ├── modal.css
│  ├── style.css
│  ├── uploadPDF.css
├── data
│  ├── ambiente.csv
│  ├── cliente.csv
│  ├── sistema.csv
│  ├── verificacoes.csv
├── html
│  ├── gerarRelatorio.html
│  ├── mainPage.html
├── img
│  ├── Logo-Comunikime.png
│  ├── dbml.png
├── js
│   ├── modules
│   │   ├── dataReader.js
│   │   ├── formGenerator.js
│   │   ├── pdfGenerator.js
│   │   ├── structureGenerator.js
│   ├── main.js
````

### Estrutura da "base de dados"

![Estrutura da base de dados](/img/dbml.png "Estrutura da base de dados")

## Autor

[Marcelo Temporini](https://github.com/Le-Marcelo)

## Agradecimentos

[Guilherme Castro](https://www.linkedin.com/in/guilherme-castro-068597168/) ─ Idealizador

[Parallax's jsPDF](https://github.com/parallax/jsPDF) ─ Biblioteca utilizada

## Licença

MIT License

Copyright (c) 2025 Marcelo Temporini

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.