#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include <FirebaseESP8266.h>
#include <NTP.h>
#include <DHT.h>
#include <config.h>

const char WIFI_SSID[] =  SSID;
const char WIFI_PASSWORD[]  = PASSWORD;
const char FIREBASE_HOST[]  = FIREBASE_PROJECT_ID;
const char FIREBASE_AUTH[]  = FIREBASE_DATABASE_SECRET;

#define DELAY 500 // Delay between two measurements in ms
#define VIN 3.3 // V power voltage
#define R 10000 //ohm resistance value

const int photoResistorPin = A0; 

FirebaseData firebaseData;

WiFiUDP wifiUdp;
NTP ntp(wifiUdp);

DHT dht(5, DHT11);

int sensorRawToPhys(int raw){
  // Conversion rule
  float Vout = float(raw) * (VIN / float(1023));// Conversion analog to voltage
  float RLDR = (R * (VIN - Vout))/Vout; // Conversion voltage to resistance
  int phys=500/(RLDR/1000); // Conversion resistance to lumen
  return phys;
}

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

  int sensorVal = analogRead(photoResistorPin);
  int lux=sensorRawToPhys(sensorVal);
  if(lux > 7000 || lux < 0) {
    lux = 7000;
  }

  FirebaseJson jsonDataLoad;
  jsonDataLoad.add("temperature", temperature).add("humidity", humidity).add("time", time).add("light", lux);
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