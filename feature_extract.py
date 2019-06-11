# -*- coding: utf-8 -*-
import os
import numpy as np

# subdirectories in these directories should be named as emotions
audio_path = './input_audio'
txt_path = './trans_data'
data_path = './output_data'

emotion_list = os.listdir(audio_path)

for emotion in emotion_list:  
    if (os.path.isfile(emotion)):
        continue

    audio_sub_path = os.path.join(audio_path,emotion)
    txt_sub_path = os.path.join(txt_path,emotion)
    data_sub_path = os.path.join(data_path,emotion)

    audio_list = os.listdir(audio_sub_path)
    # generate the .txt file comprising the name and value of result features for each speech
    for audio in audio_list:
        if audio[-4:]=='.wav':
            this_path_input = os.path.join(audio_sub_path,audio)
            this_path_txt = os.path.join(txt_sub_path,audio[:-4]+'.txt')
            # the second argument .conf determines which features would be extracted
            cmd = './opensmile-2.3.0/SMILExtract -C ./opensmile-2.3.0/config/ComParE_2016.conf -I '+this_path_input+' -O '+this_path_txt
            os.system(cmd) 
    
    txt_list = os.listdir(txt_sub_path)
    # parse each .txt file into libsvm format file
    for txt in txt_list:
        if txt[-4:]=='.txt':
            this_path = os.path.join(txt_sub_path,txt)
            f = open(this_path)
            # extract the feature values only
            last_line = f.readlines()[-1]
            f.close()
            features = last_line.split(',') 

            svm_format = "%s" % (emotion)  # add the emotion [label]
            # add [index1]:[value1] according to the libsvm format
            for i in range(1, len(features)-1):
                svm_format = "%s %d:%s" % (svm_format,i,features[i])
            svm_format = svm_format + '\n'

            svm_data = open(os.path.join(data_sub_path,txt),'w')
            svm_data.write(svm_format)

        svm_data.close()



