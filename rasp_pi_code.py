import picamera
import time
import requests
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)

TRIG = 23
ECHO = 24

GPIO.setup(TRIG, GPIO.OUT)
GPIO.setup(ECHO, GPIO.IN)


camera = picamera.PiCamera()
camera.vflip = True
camera.hflip = True

url_api = "https://smart-parking-project-iot.herokuapp.com/posts/"

print("Program is running")

def get_dist() :

    GPIO.output(TRIG, False)
    # print("Waiting for sensor")
    time.sleep(0.5)

    GPIO.output(TRIG, True)
    time.sleep(0.00001)
    GPIO.output(TRIG, False)

    while GPIO.input(ECHO) == 0:
        pulse_start = time.time()
    
    while GPIO.input(ECHO) == 1:
        pulse_end = time.time()

    pulse_duration = pulse_end - pulse_start
    distance = pulse_duration * 17000
    distance = round(distance, 2)

    if distance < 25 :
        return True
    else :
        return False
    
    
i = 0

while True :

    data_to_send = {
        "numberPlate" : "",
        "info" : "can't find number plate"
    }

    # waste = input("enter anything to capture pic : ")

    flag = get_dist()

    if flag :
    
        camera.capture(f'Desktop/captured/pic{i}.jpg')

        i = i+1
        
        try :
            
            with open(f'Desktop/captured/pic{i}.jpg', 'rb') as fp:
                response = requests.post(
                'https://api.platerecognizer.com/v1/plate-reader/',
                files=dict(upload=fp),
                headers={'Authorization': 'Token 6bf54583ccdeeb668ce564fd73f66156944685f4'})
            
            res = response.json()
            if(res["results"]) :
                print(res["results"][0]["plate"])
                data_to_send["numberPlate"] = res["results"][0]["plate"]
                data_to_send["info"] = "found number plate successfully"

            else :
                print("can't find the plate")
        except :
            print("Can't find the plate")

        try :
            # print(data_to_send)
            resp = requests.post(url_api, json=data_to_send)
            # print(resp.json())
        except :
            print("something went wrong")
    

