from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
import json
import os
from django import forms
import requests
import urllib.request as request
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile


class UploadFileForm(forms.Form):
    title = forms.CharField(max_length=50)
    file = forms.FileField()


@ensure_csrf_cookie
def index(requests):
    if (requests.method == 'GET'):
        return JsonResponse({"state": "received"})
    elif (requests.method == 'POST'):

        file = requests.FILES['file']
        path = default_storage.save('record.webm', ContentFile(file.read()))
        print(path)
        name = path[:-5]
        cmd = "ffmpeg -i {} -ac 1 -ar 16000 /testResource/{}.wav".format(path, name)
        os.system(cmd)
        os.remove(path)

    return JsonResponse({"dir": "/testResource/{}.wav".format(name)})
