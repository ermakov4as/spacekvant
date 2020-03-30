#include <SoftwareSerial.h>

/////////////////////////////////////////////////////////////////////////

// Моторы подключаются к клеммам M1+, M1-, M2+, M2- 
// Если полюса моторов окажутся перепутаны при подключении, 
// можно изменить соответствующие константы CON_MOTOR с 0 на 1 
#define CON_MOTOR1 0 
#define CON_MOTOR2 0

// Motor shield использует четыре контакта 4, 5, 6, 7 для управления моторами 
// 4 и 7 — для направления, 5 и 6 — для скорости 
#define SPEED_1 5 
#define DIR_1 4 
#define SPEED_2 6 
#define DIR_2 7 
#define DIR_3 2 
#define DIR_4 3 

// Возможные направления движения робота 
//#define FORWARD 0 
//#define BACKWARD 1 
//#define LEFT 2 
//#define RIGHT 3

//SoftwareSerial mySerial(7, 8); // RX, TX
SoftwareSerial mySerial(0, 1); // RX, TX

int code;
int code3[2];
bool readyFlag;
bool l_mode = false;
bool r_mode = false;
bool l_modeREV = false;
bool r_modeREV = false;
int l_pwr = 0;
int r_pwr = 0;

void setup() {
  Serial.begin(9600);
  Serial.println("Start");
  mySerial.begin(9600);
  // Настраивает выводы платы 4, 5, 6, 7 на вывод сигналов 
  for(int i = 2; i <= 7; i++) pinMode(i, OUTPUT); 
  digitalWrite(DIR_1, l_mode); 
  digitalWrite(DIR_2, r_mode); 
  analogWrite(SPEED_1, l_pwr); 
  analogWrite(SPEED_2, r_pwr);
//  digitalWrite(DIR_3, !l_mode); 
//  digitalWrite(DIR_4, !r_mode);
  digitalWrite(DIR_3, l_modeREV); 
  digitalWrite(DIR_4, r_modeREV);
  pinMode(8, OUTPUT);
  analogWrite(8, 0);
} 


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
          // code3[1] = (code3[1] - 110) * (-1);
          code3[1] = (code3[1] - 110);
          l_mode = false;
        } else {
          l_mode = true;
        }
        l_modeREV = !l_mode;
        if (code3[2] >= 110) {
          // code3[2] = (code3[2] - 110) * (-1);
          code3[2] = (code3[2] - 110);
          r_mode = false;
        } else {
          r_mode = true;
        }
        r_modeREV = !r_mode;
        Serial.println(code3[0]);
        Serial.write('l');
        l_pwr = code3[1] * (250 / 100);
        Serial.println(code3[1]);
        Serial.write('r');
        r_pwr = code3[2] * (250 / 100);
        Serial.println(code3[2]);
        // TODO: to lefr motor: code3[1]
        // TODO: to right motor: code3[2]
      } else if (code3[0] == 2) {
        Serial.println(code3[0]);
        Serial.write('i');
        Serial.println(code3[1]);
        analogWrite(8, (code3[1] * 250));
        // TODO: to led light: code3[1] * 255
      }
      Serial.println('\n');
    }
  } 
  digitalWrite(DIR_1, l_mode); 
  digitalWrite(DIR_2, r_mode); 
  analogWrite(SPEED_1, l_pwr); 
  analogWrite(SPEED_2, r_pwr);
//  digitalWrite(DIR_3, !l_mode); 
//  digitalWrite(DIR_4, !r_mode); 
  digitalWrite(DIR_3, l_modeREV); 
  digitalWrite(DIR_4, r_modeREV);
}
