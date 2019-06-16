from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
import json
import os
from django import forms


class UploadFileForm(forms.Form):
    title = forms.CharField(max_length=50)
    file = forms.FileField()


@ensure_csrf_cookie
def index(request):
    if (request.method == 'GET'):
        return JsonResponse({"state": "received"})
    elif (request.method == 'POST'):
        print(request.FILES["file"])
        file_data = UploadFileForm(request.POST, request.FILES)

        print("receiving...")
        #data = json.loads(request.body.decode('utf-8'))
        home_path = "/testResource"
        if (not os.path.isdir(home_path)):
            os.mkdir(home_path, 755)
        file = open("/testResource/{}".format(request.FILES["file"]), "wb")
        print("writing...")
        # file.write(data["content"])
        for chunk in (request.FILES['file']).chunks():
            file.write(chunk)
        file.close()
        print("echoing...")
        return JsonResponse({"dir": "/testResource/{}".format(request.FILES["file"])})
