#include <Wire.h>
#include "SSD1306Wire.h"
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>

#include "images.h"

#define SERVICE_OXYMETER_UUID "65052f48-6410-40d9-901f-2a2077f4aada"
#define CHARACTERISTIC_PULSE_UUID "bd0c8283-1ef4-40d5-a9cf-418913f3bc37"
#define CHARACTERISTIC_SAT_UUID "6a840204-5b21-4866-a5a5-e349e2602d3e"

// Initialize the OLED display using Wire library
SSD1306Wire  display(0x3c, 5, 4);

#define DEMO_DURATION 3000
typedef void (*Demo)(void);

bool heartShow = true;

int sat = 100;
int pulse = 100;

int counter = 0;

BLECharacteristic *pulseCharacteristic;
BLECharacteristic *satCharacteristic;

class UpdatePulseValueCallbacks: public BLECharacteristicCallbacks {
    void onWrite(BLECharacteristic *pCharacteristic) {
        std::string rxValue = pCharacteristic->getValue();

        if (rxValue.length() != 1) {
            return;
        }
        
        pulse = (int) rxValue[0] ?: 1;
    }
};


class UpdateSatValueCallbacks: public BLECharacteristicCallbacks {
    void onWrite(BLECharacteristic *pCharacteristic) {
        std::string rxValue = pCharacteristic->getValue();

        if (rxValue.length() != 1) {
            return;
        }
        
        sat = (int) rxValue[0] ?: 1;
    }
};

void setup() {
  // Initialising the UI will init the display too.
  display.init();

  display.flipScreenVertically();
  display.setFont(ArialMT_Plain_10);

  BLEDevice::init("Oxymetre Formation");
  BLEServer *pServer = BLEDevice::createServer();
  BLEService *pService = pServer->createService(SERVICE_OXYMETER_UUID);
  
  pulseCharacteristic = pService->createCharacteristic(CHARACTERISTIC_PULSE_UUID, BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE);
  pulseCharacteristic->setValue(pulse);
  pulseCharacteristic->setCallbacks(new UpdatePulseValueCallbacks());
  satCharacteristic = pService->createCharacteristic(CHARACTERISTIC_SAT_UUID, BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE);
  satCharacteristic->setValue(sat);
  satCharacteristic->setCallbacks(new UpdateSatValueCallbacks());
  
  pService->start();
  
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_OXYMETER_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);  // functions that help with iPhone connections issue
  pAdvertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising();
}

void drawRectDemo(long sat, long pulse, bool heartShow) {
    String satStr = String(sat);
    String pulseStr = String(pulse);
  
    display.drawVerticalLine(64, 0, 64);
    
    display.setTextAlignment(TEXT_ALIGN_LEFT);
    display.setFont(ArialMT_Plain_10);
    display.drawString((64 -display.getStringWidth("Sp02 %"))/2, 10, "Sp02 %");
    
    display.setTextAlignment(TEXT_ALIGN_LEFT);
    display.setFont(ArialMT_Plain_24);
    display.drawString((64 -display.getStringWidth(satStr))/2, 35, satStr);
    
    display.setTextAlignment(TEXT_ALIGN_LEFT);
    display.setFont(ArialMT_Plain_24);
    display.drawString(64 + (64 -display.getStringWidth(pulseStr))/2, 35, pulseStr);

    if (heartShow)
    {
       display.drawXbm(78, 0, heart_logo_w, heart_logo_h, heart_logo);
    }
}

void loop() {
  display.clear();
  drawRectDemo(sat, pulse, heartShow);
  display.display();

  if (counter * 200 > 60*1000 / pulse) {
    heartShow = !heartShow;
    counter = 0;
  }

  counter++;
  delay(100);
}
