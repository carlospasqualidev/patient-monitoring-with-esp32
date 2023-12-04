# Dashboard README

## Visão Geral

Este Dashboard React oferece uma visualização abrangente de dados relacionados à saúde de um paciente chamado Carlos Pasquali. O painel busca dados em tempo real de um ponto de extremidade de API especificado e os exibe em uma interface fácil de usar. As principais funcionalidades e componentes deste painel são destacados abaixo.

## Componentes

### 1. Navegação Principal

A barra de navegação principal inclui um Trocador de Equipe, um conjunto de Abas, um componente de Pesquisa e um componente de Navegação do Usuário.

### 2. Captura de Dados em Tempo Real

O painel utiliza o gancho `useEffect` para buscar periodicamente dados de saúde do servidor usando a biblioteca `axios`. Os dados incluem informações sobre BPM (Batimentos Por Minuto), temperatura e umidade.

### 3. Informações do Paciente

O nome do paciente, Carlos Pasquali, é exibido de forma proeminente no topo do painel. Opções adicionais, como imprimir uma receita, estão disponíveis por meio de botões de ação.

### 4. Cartões de Status de Saúde

Vários cartões de status de saúde fornecem uma visão geral do bem-estar do paciente. Esses cartões incluem informações sobre o estado de saúde, nível de assistência, avaliação de risco e o carimbo de data/hora da última verificação de saúde.

### 5. Dados Históricos e Analíticos

O painel inclui abas para diferentes visualizações, como "Dashboard" (Visão Geral), "Histórico" (Histórico), "Remédios" (Medicamentos) e "Horários" (Horários). No entanto, essas abas estão atualmente desabilitadas.

### 6. Gráfico de BPM

Um gráfico dinâmico de BPM é exibido em um cartão redimensionável, mostrando os dados históricos de BPM do paciente.

### 7. Gráfico de Temperatura e Umidade

Um gráfico representando dados de temperatura e umidade é exibido em um cartão separado. Este gráfico é atualizado em tempo real com base nos dados buscados.

## Uso

Para usar este painel, siga estas etapas:

1. Instale as dependências usando `npm install` ou `yarn install`.
2. Execute a aplicação usando `npm start` ou `yarn start`.
3. Acesse o painel em seu navegador da web no URL fornecido.

Observação: Certifique-se de que o ponto de extremidade da API especificado na solicitação `axios` (`http://192.168.0.75/json`) seja acessível e retorne os dados de saúde esperados.

Sinta-se à vontade para personalizar e estender este painel conforme suas necessidades específicas.

## Dependências

- React
- Axios
- Outros componentes de UI (Botões, Cartões, Gráficos)