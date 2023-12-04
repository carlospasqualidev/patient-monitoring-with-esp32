## Projeto ESP32 - Monitor de Sensores com Servidor Web Assíncrono

Este projeto utiliza um ESP32 e a biblioteca Arduino para monitorar valores de sensores (temperatura, umidade e taxa cardíaca simulada) e disponibilizá-los por meio de uma API JSON. Um servidor web assíncrono é implementado usando a biblioteca `ESPAsyncWebServer`.

### Bibliotecas Utilizadas:
- `WiFi.h`: Gerencia a conexão Wi-Fi do ESP32.
- `ESPAsyncWebServer.h`: Permite configurar um servidor web assíncrono.
- `ArduinoJson.h`: Facilita a serialização e desserialização de dados JSON.
- `DFRobot_DHT11.h`: Biblioteca para interagir com o sensor de temperatura e umidade DHT11.

### Configuração de Pinos:
- `ledRed`, `ledGreen`, `ledBlue`: Números dos pinos para os LEDs RGB.
- `dht11`: Número do pino para o sensor DHT11.

### Variáveis de Estado:
- `AsyncWebServer server(80)`: Instância do servidor web assíncrono.
- `ssid` e `password`: Credenciais Wi-Fi.
- `temperature`, `humidity`, `heartBeats`: Variáveis para armazenar os valores dos sensores.

### Funções Principais:
- `wifiConnection()`: Conecta-se ao Wi-Fi e exibe o endereço IP local do ESP32.
- `initPins()`: Inicializa os pinos GPIO para os LEDs e os define como baixos.
- `getTemperatureAndHumidity()`: Lê temperatura e umidade do sensor DHT11.
- `getHeartBeats()`: Simula uma taxa cardíaca, acende o LED vermelho para simular uma batida cardíaca.

### Tarefas em Paralelo:
1. **Leitura de Sensores:**
   - Tarefa: `getSensorValues`
   - Descrição: Lê continuamente os valores dos sensores.
   
2. **Envio de JSON:**
   - Tarefa: `sendJson`
   - Descrição: Envia continuamente os valores dos sensores através de uma API JSON.

### Configuração Inicial (`setup()`) e Loop Principal (`loop()`):
- `setup()`: Inicializa os pinos, realiza a conexão Wi-Fi, e inicia as tarefas e o servidor web.
- `loop()`: Vazio, pois as tarefas estão sendo gerenciadas em paralelo.

Para mais detalhes sobre o código e possíveis dificuldades encontradas, consulte os comentários no código-fonte.
