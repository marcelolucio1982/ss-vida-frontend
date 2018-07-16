# SsVidaApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.8.

node -version v8.5.0

npm -version 5.3.0

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

Criado módulo externo para build do front em pacote war e deploy de repositório utilizando maven(pré-requisito).
Para execução do módulo de build, a partir da raiz do projeto executar o comando `node mvn-package.js` que possui como parâmetros:

*  `install`: Executa o `mvn install` e realiza instalação no m2 local
* `deploy`:Executa o `mvn deploy` e realiza instalação no repositório remoto do Nexus
* Sem passagem de parâmetros realiza apenas o empacotamento do war

As configurações do Build se encontram no arquivo `build.json` que será sobrescrito pelo jenkins para cada ambiente.
Neste arquivo existem os parâmetros `backendAddress` e `frontendAddress` que referem ao endereço de backend dos serviços e o de frontend da aplicação, onde deve ser considerado como contextRoot no servidor o atributo `name` do arquivo `package.json`. É necessário configurar a variável de ambiente `BUILD_ENVIRONMENT` de acordo com o ambiente desejado. O jenkins atuará com arquivo `build.json` com as configurações corretas para cada ambiente:

* `set BUILD_ENVIRONMENT=local` ou `export BUILD_ENVIRONMENT=local`: Configuração de build para servidor local
* `set BUILD_ENVIRONMENT=desenvolvimento` ou `export BUILD_ENVIRONMENT=desenvolvimento`: Configuração de build para servidor de desenvolvimento
* `set BUILD_ENVIRONMENT=teste` ou `export BUILD_ENVIRONMENT=teste`: Configuração de build para servidor de teste
* `set BUILD_ENVIRONMENT=homologacao` ou `export BUILD_ENVIRONMENT=homologacao`: Configuração de build para servidor de homologacao
* `set BUILD_ENVIRONMENT=producao` ou `export BUILD_ENVIRONMENT=producao`: Configuração de build para servidor de producao
*
Além dessas propriedades se encontram as URL's para os repositórios de binário(Nexus)


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
