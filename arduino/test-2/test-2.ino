#include <SoftwareSerial.h>

//SoftwareSerial mySerial(7, 8); // RX, TX
SoftwareSerial mySerial(0, 1); // RX, TX

void setup() {
  Serial.begin(9600);
  Serial.println("Start");
  mySerial.begin(9600);
}

int code;
int code3[2];
bool readyFlag;

void loop() {
  code3[0] = -1;
  readyFlag = false;
  if (mySerial.available()) {
    code = mySerial.read();
    code3[1] = -1;
    if (code == 3) {
      readyFlag = true;
      code3[0] = code;
      while (code3[1] == -1) {
        code = mySerial.read();
        Serial.println(code);
        if (code != -1) {
          code3[1] = code;
        }
      }
      Serial.println(code3[2]);
      code3[2] = -1;
      while (code3[2] == -1) {
        code = mySerial.read();
        Serial.println(code);
        if (code != -1) {
          code3[2] = code;
        }
      }
    } else if (code == 2) {
      readyFlag = true;
      code3[0] = code;
      code3[1] = -1;
      while (code3[1] == -1) {
        code = mySerial.read();
        Serial.println(code);
        if (code != -1) {
          code3[1] = code;
        }
      }
    }
    if (readyFlag) {
      Serial.println('\n');
      if (code3[0] == 3) {
        if (abs(code3[2]-code3[1]) == 1) {
          code3[2] = code3[1];
        }
        if (code3[1] >= 110) {
          code3[1] = (code3[1] - 110) * (-1);
        }
        if (code3[2] >= 110) {
          code3[2] = (code3[2] - 110) * (-1);
        }
        Serial.println(code3[0]);
        Serial.write('l');
        Serial.println(code3[1]);
        Serial.write('r');
        Serial.println(code3[2]);
        // TODO: to lefr motor: code3[1]
        // TODO: to right motor: code3[2]
      } else if (code3[0] == 2) {
        Serial.println(code3[0]);
        Serial.write('i');
        Serial.println(code3[1]);
        // TODO: to led light: code3[1] * 255
      }
      Serial.println('\n');
    }
  }
}
