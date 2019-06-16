from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
import json
import os


def analyze(filename):

	# our feature extraction algorithm here
    config_path = '../config/IS13_ComParE_Voc.conf'
    model_path = '../model/SuckerModel1'
    audio_path = filename
    data_path = '../output_data/data.txt'
    result_path = '../output_data/emotion.txt'
    emotion_path = '../output_data/result.txt'

    cmd = '../opensmile-2.3.0/SMILExtract -C '+config_path+' -I '+audio_path+' -O '+data_path
    os.system(cmd)

    f = open(data_path)
    last_line = f.readlines()[-1]
    f.close()

    features = last_line.split(',') 
    del features[0]; del features[-1]

    label = 3
    svm_format = "%d" % (label)  # add the emotion [label]
    # add [index1]:[value1] according to the libsvm format
    for i in range(0, len(features)):
        svm_format = "%s %d:%s" % (svm_format,i+1,features[i])
    svm_format = svm_format + '\n'

    svm_data = open(result_path,'w')
    svm_data.write(svm_format)
    svm_data.close()

    cmd = '../svm-predict '+result_path+' '+model_path+' '+emotion_path
    os.system(cmd)
    result_data = open(emotion_path,'r')
    emotion_index = result_data.readlines()[-1]
    result_data.close()

    emotion = 'happy'
    if int(emotion_index) == 0:
        emotion = 'angry'
    elif int(emotion_index) == 1:
    	emotion = 'fear'
    elif int(emotion_index) == 2:
    	emotion = 'sad'
    elif int(emotion_index) == 3:
    	emotion = 'happy'
    elif int(emotion_index) == 4:
    	emotion = 'neutral'
    
    return emotion


@ensure_csrf_cookie
def index(request):
    if (request.method == 'GET'):
        return JsonResponse({"state": "received"})
    elif (request.method == 'POST'):
        data = json.loads(request.body.decode('utf-8'))
        emotion = analyze(data["path"])
        return JsonResponse({"emotion": emotion})
