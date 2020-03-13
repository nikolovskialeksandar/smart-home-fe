#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include <FirebaseESP8266.h>
#include <NTP.h>
#include <DHT.h>

#define WIFI_SSID "<SSID>"
#define WIFI_PASSWORD "<password>"
#define FIREBASE_HOST "<firebase_project_id>"
#define FIREBASE_AUTH "<firebase_database_secret_or_token>"

FirebaseData firebaseData;

WiFiUDP wifiUdp;
NTP ntp(wifiUdp);

DHT dht(5, DHT11);

void setup() {
  Serial.begin(115200);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
  Firebase.setMaxRetry(firebaseData, 3);

  ntp.ruleDST("CEST", Last, Sun, Mar, 2, 120); // last sunday in march 2:00, timetone +120min (+1 GMT + 1h summertime offset)
  ntp.ruleSTD("CET", Last, Sun, Oct, 3, 60); // last sunday in october 3:00, timezone +60min (+1 GMT)
  ntp.begin();

  dht.begin();
}

void loop() {
  ntp.update();
  String time = ntp.formattedTime("%F %T");

  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  FirebaseJson jsonDataLoad;
  jsonDataLoad.add("temperature", temperature).add("humidity", humidity).add("time", time);
  if (Firebase.pushJSON(firebaseData, "/meteoData", jsonDataLoad)) {

    Serial.println(firebaseData.dataPath());

    Serial.println(firebaseData.pushName());

    Serial.println(firebaseData.dataPath() + "/"+ firebaseData.pushName());
  } 
  else {
      Serial.println(firebaseData.errorReason());
  }
  delay (600000);
}