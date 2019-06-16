from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
import json


def analyze(filename):
    return "happy"


@ensure_csrf_cookie
def index(request):
    if (request.method == 'GET'):
        return JsonResponse({"state": "received"})
    elif (request.method == 'POST'):
        data = json.loads(request.body.decode('utf-8'))
        emotion = analyze(data["path"])
        return JsonResponse({"emotion": emotion})
