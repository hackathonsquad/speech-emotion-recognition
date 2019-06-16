from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, Http404
from django.views.decorators.csrf import ensure_csrf_cookie
import json
import os
from django import forms
from django.conf import settings


def download(request, path):
    file_path = os.path.join(settings.MEDIA_ROOT, path)
    if os.path.exists(file_path):
        with open(file_path, 'rb') as fh:
            response = HttpResponse(fh.read(), content_type="application/vnd.ms-excel")
            response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
            return response
    raise Http404


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
        file = open("/testResource/{}.wav".format(request.FILES["file"]), "wb")
        print("writing...")
        # file.write(data["content"])
        for chunk in (request.FILES['file']).chunks():
            file.write(chunk)
        file.close()
        print("echoing...")
        return JsonResponse({"dir": "/testResource/{}.wav".format(request.FILES["file"])})
