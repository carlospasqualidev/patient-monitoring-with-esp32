#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"
#include "sdkconfig.h"
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>
#include <DFRobot_DHT11.h>
DFRobot_DHT11 DHT;

//DIFICULDADES 

// Descobrir qual pino conectar aos sensores (Nenhum funcionava quando conectei o sensor DHT; Usei o pino RX, mas ele não gravava quando estava ligado, haha).
// A fila do sistema trava quando a quantidade de elementos é inserida incorretamente, e não há indicação visual para esse problema.
// Conectar o sistema com o React devido a um erro de CORS (Cross-Origin Resource Sharing); Usei a extenção"Access Control-Allow-Origin - Unblock" para resolver

//#DEFINES
#define ledRed 16
#define ledGreen 5
#define ledBlue 4
#define dht11 3

//VARS
AsyncWebServer server(80);
const char *ssid = "Rosemary";
const char *password = "996529424";

float temperature, humidity, heartBeats = 0;

//FUNCTIONS

void wifiConnection() {
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando ao WiFi...");
  }

  Serial.print("Conectado!!! - ESP32: ");
  Serial.println(WiFi.localIP());
}

void initPins() {
  Serial.begin(115200);
  Serial.println("Hello, ESP32!");

  pinMode(ledRed, OUTPUT);
  pinMode(ledGreen, OUTPUT);
  pinMode(ledBlue, OUTPUT);

  //define todos os leds como desligados
  digitalWrite(ledGreen, LOW);
  digitalWrite(ledGreen, LOW);
  digitalWrite(ledBlue, LOW);
}

void getTemperatureAndHumidity() {
  //Faz a leitura da temperatura e umidade
  DHT.read(dht11);
  temperature = DHT.temperature;
  humidity = DHT.humidity;
}

void getHeartBeats() {

  // Gera um valor simulado de ritmo cardíaco entre 60 e 100 batimentos por minuto
  int heartRate = random(60, 101);

  // Calcula o período de um batimento cardíaco em milissegundos
  int heartbeatPeriod = 60000 / heartRate;
  Serial.println(heartbeatPeriod);

  // Liga o LED para simular um batimento cardíaco
  digitalWrite(ledRed, HIGH);
  vTaskDelay((heartbeatPeriod / 2) / portTICK_PERIOD_MS);  // Metade do período
  digitalWrite(ledRed, LOW);
  vTaskDelay((heartbeatPeriod / 2) / portTICK_PERIOD_MS);  // Metade do período

  Serial.print("Ritmo cardíaco simulado: ");
  Serial.println(heartRate);

  heartBeats = heartRate;
}

//TASKS
TaskHandle_t taskGetSensorValues = NULL;
TaskHandle_t taskSendJson = NULL;


void getSensorValues(void *arg) {

  while (1) {
    getTemperatureAndHumidity();
    getHeartBeats();

    vTaskDelay(500 / portTICK_PERIOD_MS);
  }
}

void sendJson(void *arg) {
  while (1) {

    server.on("/json", HTTP_GET, [](AsyncWebServerRequest *request) {
    // Cria um objeto JSON com os valores recebidos
      DynamicJsonDocument doc(1024);
      doc["bpm"] = heartBeats;
      doc["temperature"] = temperature;
      doc["humidity"] = humidity;

      // Serializa JSON para string
      String jsonStr;
      serializeJson(doc, jsonStr);

      request->send(200, "application/json", jsonStr);
    });



    vTaskDelay(1000 / portTICK_PERIOD_MS);  // Envia a cada 1 segundos
  }
}

void initTasks() {
  xTaskCreatePinnedToCore(getSensorValues, "getSensorValues", 4096, NULL, 10, &taskGetSensorValues, 0);
  xTaskCreatePinnedToCore(sendJson, "sendJson", 4096, NULL, 10, &taskSendJson, 1);
}


//PROGRAM
void setup() {
  initPins();
  wifiConnection();
  initTasks();
  server.begin();
}

void loop() {}
