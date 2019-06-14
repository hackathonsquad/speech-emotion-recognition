#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import shutil
import numpy as np

# subdirectories in these directories should be named as name/emotion
audio_path = './input_audio'
data_path = './output_data_39'

name_list = os.listdir(audio_path)

for name in name_list:
    if (os.path.isfile(name)):
        continue

    audio_name_path = os.path.join(audio_path,name)
    data_name_path = os.path.join(data_path,name)

    emotion_list = os.listdir(audio_name_path)

    for emotion in emotion_list:  
        if (os.path.isfile(emotion)):
            continue

        audio_sub_path = os.path.join(audio_name_path,emotion)

        data_sub_path = os.path.join(data_name_path,emotion)
        shutil.rmtree(data_sub_path)
        os.mkdir(data_sub_path)

        audio_list = os.listdir(audio_sub_path)
        # generate the .txt file comprising the name and value of result features for each speech
        for audio in audio_list:
            if audio[-4:]=='.wav':
                this_path_input = os.path.join(audio_sub_path,audio)
                this_path_output = os.path.join(data_sub_path,audio[:-4]+'.txt')
                # the second argument .conf determines which features would be extracted
                cmd = './opensmile-2.3.0/SMILExtract -C ./opensmile-2.3.0/config/MFCC.conf -I '+this_path_input+' -O '+this_path_output
                os.system(cmd)

                f = open(this_path_output)
                # extract the feature values only
                last_line = f.readlines()[-1]
                f.close()
                os.remove(this_path_output)
                features = last_line.split(',') 

                label = 4;
                if emotion == 'angry':
                    label = 0
                elif emotion == 'fear':
                    label = 1
                elif emotion == 'sad':
                    label = 2
                elif emotion == 'happy':
                    label = 3
                elif emotion == 'neutral':
                    label = 4

                svm_format = "%d" % (label)  # add the emotion [label]
                # add [index1]:[value1] according to the libsvm format
                for i in range(1, len(features)-1):
                    svm_format = "%s %d:%s" % (svm_format,i,features[i])
                svm_format = svm_format + '\n'

                svm_data = open(this_path_output,'w')
                svm_data.write(svm_format)
                svm_data.close()



