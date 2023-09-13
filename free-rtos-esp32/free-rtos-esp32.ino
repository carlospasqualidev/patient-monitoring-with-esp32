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

//Block insecure private network requests 

//dificuldades
//descobrir qual pino liga as coisas (nenhum funcionava quando ligava o sensor dht, usei o rx, mas nao gravava se tivesse ligado kk)
// fila trava ao colcoar a quantidade de elementos errada, e nao existe indicacao visual disso
// impossivel conectar com react (erro de cors) (lib aleatoria chamada Access Control-Allow-Origin - Unblock)
// https://randomnerdtutorials.com/esp32-websocket-server-arduino/


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

  digitalWrite(ledGreen, LOW);
  digitalWrite(ledGreen, LOW);
  digitalWrite(ledBlue, LOW);
}


//FUNCTIONS

void getTemperatureAndHumidity() {
  DHT.read(dht11);
  temperature = DHT.temperature;
  humidity = DHT.humidity;
}

void getHeartBeats() {

  // Gere um valor simulado de ritmo cardíaco entre 60 e 100 batimentos por minuto
  int heartRate = random(60, 101);

  // Calcule o período de um batimento cardíaco em milissegundos
  int heartbeatPeriod = 60000 / heartRate;
  Serial.println(heartbeatPeriod);

  // Ligue o LED para simular um batimento cardíaco
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
    // Crie um objeto JSON com os valores recebidos

    // Route for serving JSON
    server.on("/json", HTTP_GET, [](AsyncWebServerRequest *request) {
      DynamicJsonDocument doc(1024);
      doc["bpm"] = heartBeats;
      doc["temperature"] = temperature;
      doc["humidity"] = humidity;

      // Serialize JSON to a string
      String jsonStr;
      serializeJson(doc, jsonStr);

      request->send(200, "application/json", jsonStr);
    });



    vTaskDelay(1000 / portTICK_PERIOD_MS);  // Envie a cada 5 segundos
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
